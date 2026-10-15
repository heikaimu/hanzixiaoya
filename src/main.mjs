import './characters.js';
import './sentences.js';
import './learning.js';
import { createClient } from '@supabase/supabase-js';
import { CloudProgress } from './cloud-progress.mjs';

const url=import.meta.env.VITE_SUPABASE_URL;
const publicKey=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
const configured=Boolean(url&&publicKey&&!url.includes('your-project')&&!publicKey.includes('your-publishable'));
let client=null;
if(configured){
  try{client=createClient(url,publicKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});}catch(e){console.error('Supabase 配置无效，请检查环境变量。');}
}
window.ProgressStorage=new CloudProgress({client,storage:window.localStorage,empty:window.Learning.empty,validate:window.Learning.validState});
await import('./app.js');
