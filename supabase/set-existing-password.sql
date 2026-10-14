-- 仅在 Supabase SQL Editor 由管理员执行。不要把实际密码提交到仓库或发到聊天里。
-- 将下面两个占位内容替换成自己的旧用户名和新密码，然后执行。
-- 已有进度不会被修改；重置密码会注销该用户名全部已登录会话。
select public.admin_set_username_password('替换成旧用户名','替换成至少8位的新密码');
