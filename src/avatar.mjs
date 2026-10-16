import { avatarUploadError } from './avatar-errors.mjs';

export function installAvatar({ progress, open, head, settings, toast, escape }) {
  let avatarURL='', owner=null, generation=0, busy=false;
  const markup = () => avatarURL ? `<img class="user-avatar" src="${escape(avatarURL)}" alt="用户头像">` : '<span class="user-avatar avatar-placeholder" aria-hidden="true">🌱</span>';
  function paint() {
    const entry=document.querySelector('#account-entry');
    if(progress.info().user&&!progress.info().needsLogin) entry.innerHTML=markup()+`<span>${escape(progress.info().user.username)}</span>`;
    const panel=document.querySelector('#avatar-profile');
    if(panel)panel.innerHTML=markup()+'<label class="secondary avatar-picker">更换头像<input id="avatar-file" type="file" accept="image/jpeg,image/png,image/webp" hidden></label><span class="fine-print">裁剪为 200×200 · 头像公开可见</span>';
  }
  progress.subscribe(async () => {
    const user=progress.info().needsLogin?null:progress.info().user?.username;
    if(user!==owner){
      owner=user;avatarURL='';const version=++generation;
      if(user)try{
        const {data,error}=await progress.client.rpc('read_username_avatar',{p_session_token:progress.session.token});
        if(!error&&version===generation&&data)avatarURL=progress.client.storage.from('avatars').getPublicUrl(data).data.publicUrl;
      }catch { /* Avatar availability must not interrupt progress syncing. */ }
    }
    paint();
  });
  // Initialization may have completed before the subscription was installed.
  progress.emit();
  document.addEventListener('change',async event=>{
    if(event.target.id!=='avatar-file')return;
    const file=event.target.files?.[0];event.target.value='';if(!file)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>10*1024*1024){toast('请选择不超过 10 MB 的 JPG、PNG 或 WebP 图片。');return;}
    const version=generation, username=owner;
    let image;
    try { image=await createImageBitmap(file); }catch{toast('无法读取这张图片，请换一张图片。');return;}
    if(version!==generation){image.close();return;}
    if(image.width*image.height>40000000){image.close();toast('图片尺寸过大，请选择较小的图片。');return;}
    open(head('裁剪头像')+'<p>调整缩放和位置，方框内的内容会保存为 200×200 头像。</p><canvas id="avatar-canvas" width="200" height="200" aria-label="头像裁剪预览"></canvas><div class="avatar-controls"><label>缩放<input id="avatar-zoom" type="range" min="1" max="3" step="0.01" value="1"></label><label>左右位置<input id="avatar-x" type="range" min="0" max="100" value="50"></label><label>上下位置<input id="avatar-y" type="range" min="0" max="100" value="50"></label></div><p id="avatar-error" class="warning" role="alert"></p><div class="modal-actions"><button id="avatar-cancel" class="secondary">取消</button><button id="avatar-save" class="primary">保存头像</button></div>');
    const canvas=document.querySelector('#avatar-canvas'),context=canvas.getContext('2d');
    const controls=['zoom','x','y'].map(id=>document.querySelector('#avatar-'+id));
    const draw=()=>{
      const scale=Math.max(200/image.width,200/image.height)*Number(controls[0].value);
      const width=200/scale,height=200/scale;
      context.clearRect(0,0,200,200);
      context.drawImage(image,(image.width-width)*Number(controls[1].value)/100,(image.height-height)*Number(controls[2].value)/100,width,height,0,0,200,200);
    };
    controls.forEach(control=>control.oninput=draw);draw();
    const dialog=document.querySelector('#dialog');
    const release=()=>image.close();dialog.addEventListener('close',release,{once:true});
    document.querySelector('#avatar-cancel').onclick=()=>{if(!busy){release();settings();}};
    const button=document.querySelector('#avatar-save'),error=document.querySelector('#avatar-error');
    button.onclick=async()=>{
      if(busy)return;
      if(version!==generation||owner!==username){error.textContent='账号已切换，请重新选择图片。';return;}
      busy=true;button.disabled=true;button.textContent='正在上传…';error.textContent='';
      try{
        const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));
        if(!blob)throw Error('图片生成失败，请重新选择。');
        const body=new FormData();body.append('avatar',blob,'avatar.png');body.append('session_token',progress.session.token);
        const {data,error:uploadError}=await progress.client.functions.invoke('upload-avatar',{body});
        if(uploadError||!data?.path)throw Error(await avatarUploadError(uploadError,data));
        if(version!==generation||owner!==username)return;
        avatarURL=progress.client.storage.from('avatars').getPublicUrl(data.path).data.publicUrl;
        if(document.querySelector('#avatar-save')===button){release();settings();}paint();toast('头像已更新。');
      }catch(err){error.textContent=err.message;}
      finally{busy=false;button.disabled=false;button.textContent='保存头像';}
    };
  });
  return {paint};
}
