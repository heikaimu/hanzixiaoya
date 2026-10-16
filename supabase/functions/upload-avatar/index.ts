import { createClient } from 'npm:@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...cors, 'Content-Type': 'application/json' },
});
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (req.method !== 'POST') return reply({ error: 'Method not allowed' }, 405);
  try {
    if (Number(req.headers.get('content-length')) > 300000) return reply({ error: '图片过大' }, 413);
    const form = await req.formData();
    const token = form.get('session_token');
    if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) return reply({ error: '请重新登录' }, 401);
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: account, error: authError } = await admin.rpc('read_protected_username_progress', { p_session_token: token });
    if (authError || !account?.username) return reply({ error: '登录已过期，请重新登录' }, 401);
    const file = form.get('avatar');
    if (!(file instanceof File) || file.type !== 'image/png' || file.size > 262144 || file.size < 33) {
      return reply({ error: '请上传 200×200 的 PNG 图片（最多 256 KB）' }, 400);
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    const view = new DataView(bytes.buffer);
    if (![137,80,78,71,13,10,26,10].every((v,i) => bytes[i] === v) ||
        view.getUint32(8) !== 13 || view.getUint32(12) !== 0x49484452 ||
        view.getUint32(16) !== 200 || view.getUint32(20) !== 200) {
      return reply({ error: '图片必须为 200×200 PNG' }, 400);
    }
    const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(account.username)));
    const owner = Array.from(hash, b => b.toString(16).padStart(2, '0')).join('');
    const path = `${owner}/${crypto.randomUUID()}.png`;
    const { error: uploadError } = await admin.storage.from('avatars').upload(path, bytes, { contentType: 'image/png', cacheControl: '31536000' });
    if (uploadError) throw uploadError;
    const { data: previous, error: readError } = await admin.from('username_learning_progress').select('avatar_path').eq('username', account.username).single();
    if (readError) { await admin.storage.from('avatars').remove([path]); throw readError; }
    const { error: saveError } = await admin.from('username_learning_progress').update({ avatar_path: path }).eq('username', account.username);
    if (saveError) { await admin.storage.from('avatars').remove([path]); throw saveError; }
    if (previous?.avatar_path) await admin.storage.from('avatars').remove([previous.avatar_path]);
    return reply({ path });
  } catch {
    return reply({ error: '头像上传失败，请稍后重试' }, 500);
  }
});
