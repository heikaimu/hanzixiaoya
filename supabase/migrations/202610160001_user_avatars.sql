begin;
alter table public.username_learning_progress add column if not exists avatar_path text;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('avatars','avatars',true,262144,array['image/png'])
on conflict(id) do update set public=true,file_size_limit=262144,allowed_mime_types=array['image/png'];
-- No client write policies: uploads pass through the session-verifying Edge Function.
create or replace function public.read_username_avatar(p_session_token text)
returns text language sql security definer set search_path = '' as $$
  select avatar_path from public.username_learning_progress
  where username=public.require_username_session(p_session_token);
$$;
revoke all on function public.read_username_avatar(text) from public;
grant execute on function public.read_username_avatar(text) to anon,authenticated;
notify pgrst,'reload schema';
commit;
