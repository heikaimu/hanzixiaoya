-- 在同一项目 SQL Editor 执行：检查对象是否存在，并刷新 Data API 的结构缓存。
select
  current_database() as database_name,
  to_regclass('public.username_learning_progress') is not null as table_exists,
  to_regprocedure('public.read_protected_username_progress(text)') is not null as read_function_exists,
  to_regprocedure('public.register_username_account(text,text,jsonb,uuid)') is not null as register_function_exists,
  to_regprocedure('public.save_protected_username_progress(text,jsonb,bigint,uuid)') is not null as save_function_exists,
  not has_function_privilege('anon','public.read_username_progress(text)','EXECUTE') as passwordless_read_disabled;

notify pgrst, 'reload schema';
