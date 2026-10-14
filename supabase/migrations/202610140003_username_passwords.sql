-- 用户名 + 密码，无邮箱验证。完整执行本文件后，旧的无密码接口不再可调用。
begin;
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

alter table public.username_learning_progress add column if not exists password_hash text;
alter table public.username_learning_progress add column if not exists failed_logins integer not null default 0;
alter table public.username_learning_progress add column if not exists locked_until timestamptz;

create table if not exists public.username_sessions (
  token_hash text primary key,
  username text not null references public.username_learning_progress(username) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists username_sessions_owner_idx on public.username_sessions(username);
alter table public.username_sessions enable row level security;
revoke all on table public.username_sessions from public,anon,authenticated;
revoke all on table public.username_learning_progress from public,anon,authenticated;
-- 不能留下可绕过密码的旧函数权限。
revoke all on function public.read_username_progress(text) from public,anon,authenticated;
revoke all on function public.register_username_progress(text,jsonb,uuid) from public,anon,authenticated;
revoke all on function public.save_username_progress(text,jsonb,bigint,uuid) from public,anon,authenticated;

-- 内部辅助函数不开放给前端。响应不返回密码哈希、失败次数等字段。
create or replace function public.username_progress_record(p_username text)
returns jsonb language sql security definer set search_path = ''
as $$
  select jsonb_build_object('username',username,'state',state,'revision',revision,
    'last_mutation_id',last_mutation_id,'updated_at',updated_at)
  from public.username_learning_progress where username=p_username;
$$;
create or replace function public.issue_username_session(p_username text)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare v_token text := encode(extensions.gen_random_bytes(32),'hex');
  v_expires timestamptz := now()+interval '30 days';
begin
  delete from public.username_sessions where expires_at<=now();
  insert into public.username_sessions(token_hash,username,expires_at)
  values(encode(extensions.digest(v_token,'sha256'),'hex'),p_username,v_expires);
  return jsonb_build_object('username',p_username,'session_token',v_token,'expires_at',v_expires,
    'record',public.username_progress_record(p_username));
end;
$$;
create or replace function public.require_username_session(p_session_token text)
returns text language plpgsql security definer set search_path = ''
as $$
declare v_name text;
begin
  if p_session_token is null or p_session_token !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid session' using errcode='28000';
  end if;
  select username into v_name from public.username_sessions
  where token_hash=encode(extensions.digest(p_session_token,'sha256'),'hex') and expires_at>now();
  if v_name is null then raise exception 'Session expired' using errcode='28000'; end if;
  return v_name;
end;
$$;

create or replace function public.register_username_account(p_username text,p_password text,p_state jsonb,p_mutation_id uuid)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare v_name text := lower(btrim(p_username)); v_inserted text;
begin
  if v_name is null or v_name !~ '^[a-z0-9_一-鿿]{1,24}$'
    or p_password is null or char_length(p_password)<8 or octet_length(p_password)>72
    or p_state is null or jsonb_typeof(p_state)<>'object'
    or p_state->>'version' is distinct from '1'
    or jsonb_typeof(p_state->'records') is distinct from 'object'
    or jsonb_typeof(p_state->'days') is distinct from 'object' or p_mutation_id is null then
    raise exception 'Invalid registration' using errcode='22023';
  end if;
  insert into public.username_learning_progress(username,state,last_mutation_id,password_hash)
  values(v_name,p_state,p_mutation_id,extensions.crypt(p_password,extensions.gen_salt('bf',12)))
  on conflict(username) do nothing returning username into v_inserted;
  if v_inserted is null then return jsonb_build_object('status','exists'); end if;
  return public.issue_username_session(v_name)||jsonb_build_object('status','created');
end;
$$;

create or replace function public.login_username_account(p_username text,p_password text)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare v_name text := lower(btrim(p_username)); v_row public.username_learning_progress%rowtype;
begin
  if v_name is null or v_name !~ '^[a-z0-9_一-鿿]{1,24}$' or p_password is null or octet_length(p_password)>72 then
    return jsonb_build_object('status','invalid_credentials');
  end if;
  select * into v_row from public.username_learning_progress where username=v_name for update;
  if not found then return jsonb_build_object('status','invalid_credentials'); end if;
  if v_row.password_hash is null then return jsonb_build_object('status','password_required'); end if;
  if v_row.locked_until>now() then return jsonb_build_object('status','locked'); end if;
  if extensions.crypt(p_password,v_row.password_hash) is distinct from v_row.password_hash then
    update public.username_learning_progress set
      failed_logins=case when locked_until is not null and locked_until<=now() then 1 else failed_logins+1 end,
      locked_until=case when (case when locked_until is not null and locked_until<=now() then 1 else failed_logins+1 end)>=5 then now()+interval '10 minutes' else null end
    where username=v_name;
    return jsonb_build_object('status','invalid_credentials');
  end if;
  update public.username_learning_progress set failed_logins=0,locked_until=null where username=v_name;
  return public.issue_username_session(v_name)||jsonb_build_object('status','authenticated');
end;
$$;

create or replace function public.read_protected_username_progress(p_session_token text)
returns jsonb language plpgsql security definer set search_path = ''
as $$
begin return public.username_progress_record(public.require_username_session(p_session_token)); end;
$$;
create or replace function public.save_protected_username_progress(p_session_token text,p_state jsonb,p_expected_revision bigint,p_mutation_id uuid)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare v_name text := public.require_username_session(p_session_token);
  v_row public.username_learning_progress%rowtype;
begin
  if p_state is null or jsonb_typeof(p_state)<>'object' or p_state->>'version' is distinct from '1'
    or jsonb_typeof(p_state->'records') is distinct from 'object'
    or jsonb_typeof(p_state->'days') is distinct from 'object'
    or p_expected_revision is null or p_expected_revision<0 or p_mutation_id is null then
    raise exception 'Invalid progress' using errcode='22023';
  end if;
  select * into v_row from public.username_learning_progress where username=v_name for update;
  if v_row.last_mutation_id=p_mutation_id then
    return jsonb_build_object('status','saved','record',public.username_progress_record(v_name));
  end if;
  if v_row.revision<>p_expected_revision then
    return jsonb_build_object('status','conflict','record',public.username_progress_record(v_name));
  end if;
  update public.username_learning_progress set state=p_state,revision=revision+1,
    last_mutation_id=p_mutation_id,updated_at=now() where username=v_name;
  return jsonb_build_object('status','saved','record',public.username_progress_record(v_name));
end;
$$;
create or replace function public.logout_username_session(p_session_token text)
returns void language sql security definer set search_path = ''
as $$
  delete from public.username_sessions where token_hash=encode(extensions.digest(p_session_token,'sha256'),'hex');
$$;

-- 仅 SQL Editor 管理员可以给旧账号设置/重置密码，不能被知道用户名的人抢占。
create or replace function public.admin_set_username_password(p_username text,p_password text)
returns void language plpgsql security definer set search_path = ''
as $$
declare v_name text := lower(btrim(p_username));
begin
  if p_password is null or char_length(p_password)<8 or octet_length(p_password)>72 then
    raise exception 'Password requires at least 8 characters and at most 72 UTF-8 bytes';
  end if;
  update public.username_learning_progress set password_hash=extensions.crypt(p_password,extensions.gen_salt('bf',12)),
    failed_logins=0,locked_until=null where username=v_name;
  if not found then raise exception 'Username not found'; end if;
  delete from public.username_sessions where username=v_name;
end;
$$;

revoke all on function public.username_progress_record(text) from public,anon,authenticated;
revoke all on function public.issue_username_session(text) from public,anon,authenticated;
revoke all on function public.require_username_session(text) from public,anon,authenticated;
revoke all on function public.admin_set_username_password(text,text) from public,anon,authenticated;
revoke all on function public.register_username_account(text,text,jsonb,uuid) from public;
revoke all on function public.login_username_account(text,text) from public;
revoke all on function public.read_protected_username_progress(text) from public;
revoke all on function public.save_protected_username_progress(text,jsonb,bigint,uuid) from public;
revoke all on function public.logout_username_session(text) from public;
grant execute on function public.register_username_account(text,text,jsonb,uuid) to anon,authenticated;
grant execute on function public.login_username_account(text,text) to anon,authenticated;
grant execute on function public.read_protected_username_progress(text) to anon,authenticated;
grant execute on function public.save_protected_username_progress(text,jsonb,bigint,uuid) to anon,authenticated;
grant execute on function public.logout_username_session(text) to anon,authenticated;

-- 实际执行校验：错误密码无会话；没有令牌不可读；旧接口权限确实撤销。
do $validation$
declare v_name text := '校验_'||substr(replace(gen_random_uuid()::text,'-',''),1,12);
  v_result jsonb; v_token text; v_pass text := encode(extensions.gen_random_bytes(12),'hex');
  v_state jsonb := '{"version":1,"records":{},"days":{}}'::jsonb; v_denied boolean := false;
begin
  v_result:=public.register_username_account(v_name,v_pass,v_state,gen_random_uuid());
  if v_result->>'status' is distinct from 'created' then raise exception 'Registration validation failed'; end if;
  v_token:=v_result->>'session_token';
  if v_result::text like '%password_hash%' then raise exception 'Password hash exposed'; end if;
  v_result:=public.login_username_account(v_name,'incorrect-password');
  if v_result->>'status' is distinct from 'invalid_credentials' or v_result ? 'session_token' then raise exception 'Invalid password accepted'; end if;
  v_result:=public.login_username_account(v_name,v_pass);
  if v_result->>'status' is distinct from 'authenticated' then raise exception 'Login validation failed'; end if;
  if public.read_protected_username_progress(v_token)->>'username' is distinct from v_name then raise exception 'Read validation failed'; end if;
  begin perform public.read_protected_username_progress(null); exception when sqlstate '28000' then v_denied:=true; end;
  if not v_denied then raise exception 'Unauthenticated read allowed'; end if;
  v_result:=public.save_protected_username_progress(v_token,v_state,1,gen_random_uuid());
  if v_result->>'status' is distinct from 'saved' then raise exception 'Save validation failed'; end if;
  perform public.logout_username_session(v_token); v_denied:=false;
  begin perform public.read_protected_username_progress(v_token); exception when sqlstate '28000' then v_denied:=true; end;
  if not v_denied then raise exception 'Logout validation failed'; end if;
  if has_function_privilege('anon','public.read_username_progress(text)','EXECUTE')
    or has_function_privilege('anon','public.register_username_progress(text,jsonb,uuid)','EXECUTE')
    or has_function_privilege('anon','public.save_username_progress(text,jsonb,bigint,uuid)','EXECUTE') then raise exception 'Passwordless access still allowed'; end if;
  delete from public.username_learning_progress where username=v_name;
end;
$validation$;
notify pgrst,'reload schema';
commit;
