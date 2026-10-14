-- 在 Supabase SQL Editor 中完整执行一次。前端只使用 Publishable / anon 公钥。
begin;

create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null check (jsonb_typeof(state) = 'object'),
  revision bigint not null default 1 check (revision > 0),
  last_mutation_id uuid not null,
  updated_at timestamptz not null default now()
);

alter table public.learning_progress enable row level security;
drop policy if exists "Parents read own learning progress" on public.learning_progress;
create policy "Parents read own learning progress" on public.learning_progress
  for select to authenticated using ((select auth.uid()) = user_id);

revoke all on table public.learning_progress from anon, authenticated;
grant select on table public.learning_progress to authenticated;

-- 所有写入在事务内比较版本。重试同一个 mutation_id 不重复更新版本。
-- SECURITY DEFINER 为了限制直接写表；账号只能取自当前 JWT 的 auth.uid()。
create or replace function public.save_learning_progress(
  p_state jsonb,
  p_expected_revision bigint,
  p_mutation_id uuid
) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_row public.learning_progress%rowtype;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;
  if p_state is null or jsonb_typeof(p_state) <> 'object'
    or p_state->>'version' is distinct from '1'
    or jsonb_typeof(p_state->'records') is distinct from 'object'
    or jsonb_typeof(p_state->'days') is distinct from 'object'
    or p_expected_revision is null or p_expected_revision < 0
    or p_mutation_id is null then
    raise exception 'Invalid learning progress' using errcode = '22023';
  end if;

  if p_expected_revision = 0 then
    insert into public.learning_progress(user_id,state,revision,last_mutation_id)
    values(v_user_id,p_state,1,p_mutation_id)
    on conflict(user_id) do nothing;
  end if;

  select * into v_row from public.learning_progress
  where user_id = v_user_id for update;

  if not found then
    return jsonb_build_object('status','conflict','record',null);
  end if;
  if v_row.last_mutation_id = p_mutation_id then
    return jsonb_build_object('status','saved','record',to_jsonb(v_row));
  end if;
  if v_row.revision <> p_expected_revision then
    return jsonb_build_object('status','conflict','record',to_jsonb(v_row));
  end if;

  update public.learning_progress
  set state = p_state, revision = revision + 1,
      last_mutation_id = p_mutation_id, updated_at = now()
  where user_id = v_user_id returning * into v_row;
  return jsonb_build_object('status','saved','record',to_jsonb(v_row));
end;
$$;

revoke all on function public.save_learning_progress(jsonb,bigint,uuid) from public,anon;
grant execute on function public.save_learning_progress(jsonb,bigint,uuid) to authenticated;

notify pgrst, 'reload schema';
commit;
