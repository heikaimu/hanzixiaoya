# Supabase 用户名和密码

页面用用户名 + 密码注册和登录，不需要邮箱，也不发送验证邮件。用户名 1–24 个汉字、字母、数字或下划线，英文字母不区分大小写；密码至少 8 个字符、最多 72 个 UTF-8 字节。

## 初始化

在 [Supabase SQL Editor](https://supabase.com/dashboard/project/zzmbjjgdcfqwflulutvv/sql/new) 完整执行：

[`supabase/migrations/202610140003_username_passwords.sql`](../supabase/migrations/202610140003_username_passwords.sql)

该脚本基于已经建立的用户名进度表，增加密码哈希、登录失败限制和会话表，保留已有进度，并撤销旧版三个无密码接口的调用权限。只有执行此迁移后，原来的无密码 API 才会关闭。脚本内部自动验证注册、正确/错误密码、无令牌读取、保存、注销和旧接口关闭；临时测试记录会删除。

如果是全新数据库，先依次执行 001、002，再执行 003。迁移可重跑，但不要在完成 003 后重新执行 002：002 是历史上的无密码实现，会重新授权旧接口。

## 已有无密码用户名

旧用户名不会开放“输入一个新密码就认领”的公共接口，因为任何知道名字的人都可能抢占。由项目管理员在 SQL Editor 使用 [supabase/set-existing-password.sql](../supabase/set-existing-password.sql)，将占位用户名和密码替换后执行。之后可以在网页用原用户名和新密码登录，已有学习进度不变。

忘记密码也由管理员使用同一个函数重置。`admin_set_username_password` 不向前端公钥开放；重置时会清除该用户名全部会话。不要把实际密码提交到代码仓库或发送到聊天中。

## 验证与存储

- 密码经 HTTPS 发给数据库校验，使用 pgcrypto bcrypt、随机盐和工作因子 12 保存哈希，不保存明文。算法依据：[PostgreSQL pgcrypto 文档](https://www.postgresql.org/docs/current/pgcrypto.html)。
- 正确密码才能取得 256 位随机会话令牌。服务器只存令牌 SHA-256 哈希，会话 30 天到期；浏览器只记住用户名、令牌和到期时间，不保存密码。
- 读取和保存进度必须验证令牌，用户名不再是访问凭据；API 响应不会返回密码哈希。
- 连续 5 次密码错误后，该用户名暂停登录 10 分钟。该限制针对用户名，不是按客户端 IP 计数。
- 进度表与会话表都禁止公钥直接读取；内部辅助函数和管理员重置函数不开放。
- 退出会注销当前令牌并清除本机登录选择。断网时仍退出本机，远端令牌在到期或管理员重置密码后失效。
- 已有浏览器缓存继续保留；旧的“只记住用户名”登录状态失效，需要输入密码。未登录时显示游客进度，不加载其他用户名的缓存。

## 运行与同步

需要 Node.js 22.12 或更新版本：`npm install`，然后 `npm run dev`。`npm run build` 构建到 `dist/`。本机 `.env` 已配置 URL 和 Publishable Key；部署配置 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_PUBLISHABLE_KEY`。不需要邮件服务或登录回调地址，不能在前端使用 service_role key。

每次学习先存本机，再自动上传。离线未同步修改保留在对应用户名的独立缓存，下次有效会话登录后重试；在途请求排队、重复请求去重和多设备冲突选择沿用原流程。只有“云端已保存”表示最新数据已上传。

`npm test` 验证密码格式、错误密码拒绝、无令牌访问拒绝、注销、旧登录状态失效，以及保存、恢复、断网和冲突。迁移内验证检查真实数据库函数；浏览器测试使用模拟接口，不生成真实家长账号。

## 用户头像

登录后在家长设置点击“更换头像”，选择不超过 10 MB 的 JPG、PNG 或 WebP，调整缩放和左右/上下位置，保存后生成 200×200 PNG。头像在账号按钮和家长设置中显示。头像为公开资源，请勿上传敏感图片。

启用步骤（在 003 之后）：

1. 在 SQL Editor 执行 [`supabase/migrations/202610160001_user_avatars.sql`](../supabase/migrations/202610160001_user_avatars.sql)，创建公开的 `avatars` Bucket（256 KB、仅 PNG）及头像路径字段和读取接口。
2. 使用 Supabase CLI 登录，在项目目录部署：

   ```sh
   supabase functions deploy upload-avatar --project-ref zzmbjjgdcfqwflulutvv --no-verify-jwt
   ```

`supabase/config.toml` 已关闭该函数的平台 JWT 检查：本项目使用自定义用户名会话，函数内部必须通过现有 `read_protected_username_progress` 校验会话后才允许上传。该配置依据 [Supabase 函数配置文档](https://supabase.com/docs/guides/functions/function-configuration)。函数使用 Supabase 托管环境自动提供的 `SUPABASE_URL` 和 `SUPABASE_SERVICE_ROLE_KEY`；service role key 仅在函数端使用，不要添加到任何 `VITE_` 环境变量。

不要添加允许匿名写入 `storage.objects` 的策略。上传函数校验 PNG 签名、200×200 尺寸和 256 KB 上限，根据已验证的账号生成对象目录，保存新路径后删除旧图片。头像独立于学习进度，重置/恢复学习记录不会覆盖头像。新文件使用独立 URL，避免浏览器缓存旧头像。

本地代码检查不代表已部署：需完成上述迁移和函数部署，再用实际账号检查上传、刷新和跨设备读取。
