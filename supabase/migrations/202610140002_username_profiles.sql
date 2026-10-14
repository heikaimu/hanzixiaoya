-- 用户名即进度入口，无邮箱、密码或身份验证。知道用户名即可访问该份进度。
-- 保留原邮箱账号表，不删除原有数据。新流程使用独立的用户名进度表。
begin;
-- 防止已经启用密码的项目误重跑旧脚本，再次开放无密码接口。
do $guard$
begin
  if exists(select 1 from information_schema.columns where table_schema='public'
    and table_name='username_learning_progress' and column_name='password_hash') then
    raise exception 'Password protection is already installed; do not rerun the passwordless migration';
  end if;
end;
$guard$;

create table if not exists public.username_learning_progress (
  username text primary key check (username ~ '^[a-z0-9_一-鿿]{1,24}$'),
  state jsonb not null check (jsonb_typeof(state) = 'object'),
  revision bigint not null default 1 check (revision > 0),
  last_mutation_id uuid not null,
  updated_at timestamptz not null default now()
);
alter table public.username_learning_progress enable row level security;
revoke all on table public.username_learning_progress from public,anon,authenticated;

create or replace function public.read_username_progress(p_username text)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare
  v_username text := lower(btrim(p_username));
  v_row public.username_learning_progress%rowtype;
begin
  if v_username is null or v_username !~ '^[a-z0-9_一-鿿]{1,24}$' then
    raise exception 'Invalid username' using errcode = '22023';
  end if;
  select * into v_row from public.username_learning_progress where username = v_username;
  if not found then return null; end if;
  return to_jsonb(v_row);
end;
$$;

create or replace function public.register_username_progress(p_username text,p_state jsonb,p_mutation_id uuid)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare
  v_username text := lower(btrim(p_username));
  v_row public.username_learning_progress%rowtype;
begin
  if v_username is null or v_username !~ '^[a-z0-9_一-鿿]{1,24}$'
    or p_state is null or jsonb_typeof(p_state) <> 'object'
    or p_state->>'version' is distinct from '1'
    or jsonb_typeof(p_state->'records') is distinct from 'object'
    or jsonb_typeof(p_state->'days') is distinct from 'object'
    or p_mutation_id is null then
    raise exception 'Invalid registration' using errcode = '22023';
  end if;
  insert into public.username_learning_progress(username,state,last_mutation_id)
  values(v_username,p_state,p_mutation_id)
  on conflict(username) do nothing returning * into v_row;
  if not found then return jsonb_build_object('status','exists'); end if;
  return jsonb_build_object('status','created','record',to_jsonb(v_row));
end;
$$;

create or replace function public.save_username_progress(p_username text,p_state jsonb,p_expected_revision bigint,p_mutation_id uuid)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare
  v_username text := lower(btrim(p_username));
  v_row public.username_learning_progress%rowtype;
begin
  if v_username is null or v_username !~ '^[a-z0-9_一-鿿]{1,24}$'
    or p_state is null or jsonb_typeof(p_state) <> 'object'
    or p_state->>'version' is distinct from '1'
    or jsonb_typeof(p_state->'records') is distinct from 'object'
    or jsonb_typeof(p_state->'days') is distinct from 'object'
    or p_expected_revision is null or p_expected_revision < 0
    or p_mutation_id is null then
    raise exception 'Invalid progress' using errcode = '22023';
  end if;

  select * into v_row from public.username_learning_progress where username = v_username for update;
  if not found then return jsonb_build_object('status','missing'); end if;
  if v_row.last_mutation_id = p_mutation_id then
    return jsonb_build_object('status','saved','record',to_jsonb(v_row));
  end if;
  if v_row.revision <> p_expected_revision then
    return jsonb_build_object('status','conflict','record',to_jsonb(v_row));
  end if;

  update public.username_learning_progress
  set state=p_state, revision=revision+1, last_mutation_id=p_mutation_id,updated_at=now()
  where username=v_username returning * into v_row;
  return jsonb_build_object('status','saved','record',to_jsonb(v_row));
end;
$$;

revoke all on function public.read_username_progress(text) from public;
revoke all on function public.register_username_progress(text,jsonb,uuid) from public;
revoke all on function public.save_username_progress(text,jsonb,bigint,uuid) from public;
grant execute on function public.read_username_progress(text) to anon,authenticated;
grant execute on function public.register_username_progress(text,jsonb,uuid) to anon,authenticated;
grant execute on function public.save_username_progress(text,jsonb,bigint,uuid) to anon,authenticated;

-- 在迁移事务中验证新流程，验证用的随机用户名会立即删除，不留下测试进度。
do $validation$
declare
  v_name text := '校验_' || substr(replace(gen_random_uuid()::text,'-',''),1,12);
  v_state jsonb := '{"version":1,"records":{},"days":{}}'::jsonb;
  v_result jsonb;
  v_mutation uuid := gen_random_uuid();
begin
  v_result := public.register_username_progress(v_name,v_state,gen_random_uuid());
  if v_result->>'status' is distinct from 'created' then raise exception 'Username registration check failed'; end if;
  if public.read_username_progress(v_name)->>'username' is distinct from v_name then raise exception 'Username read check failed'; end if;
  v_result := public.register_username_progress(v_name,v_state,gen_random_uuid());
  if v_result->>'status' is distinct from 'exists' then raise exception 'Duplicate username check failed'; end if;
  v_result := public.save_username_progress(v_name,v_state,1,v_mutation);
  if v_result->>'status' is distinct from 'saved' or v_result->'record'->>'revision' is distinct from '2' then raise exception 'Username save check failed'; end if;
  v_result := public.save_username_progress(v_name,v_state,1,v_mutation);
  if v_result->'record'->>'revision' is distinct from '2' then raise exception 'Idempotent save check failed'; end if;
  v_result := public.save_username_progress(v_name,v_state,1,gen_random_uuid());
  if v_result->>'status' is distinct from 'conflict' then raise exception 'Concurrent save check failed'; end if;
  delete from public.username_learning_progress where username=v_name;
end;
$validation$;

notify pgrst, 'reload schema';
commit;
