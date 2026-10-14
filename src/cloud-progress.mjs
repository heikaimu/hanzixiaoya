const GUEST_KEY='hanzi-sprout-v1';
const USERNAME_KEY='hanzi-sprout-username-v1';
const SESSION_KEY='hanzi-sprout-session-v1';
const copy=value=>JSON.parse(JSON.stringify(value));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function normalizeUsername(value){
  const username=typeof value==='string'?value.normalize('NFKC').trim().toLowerCase():'';
  if(!/^[a-z0-9_\u4e00-\u9fff]{1,24}$/.test(username))throw new Error('用户名需为 1–24 个汉字、字母、数字或下划线。');
  return username;
}
export function validatePassword(password){
  if(typeof password!=='string'||[...password].length<8||new TextEncoder().encode(password).length>72)throw new Error('密码至少 8 位，最多 72 个 UTF-8 字节。');
}

export class CloudProgress {
  constructor({client,storage,empty,validate,delay=600,timeout=12000,randomId=()=>crypto.randomUUID()}){
    Object.assign(this,{client,storage,empty,validate,delay,timeout,randomId});
    this.user=null;this.session=null;this.needsLogin=false;this.epoch=0;this.busy=false;this.loading=false;this.conflict=null;this.localOK=true;
    this.listeners=new Set();this.mode='local';this.message='';this.envelope=this.newEnvelope(this.readGuest());
  }
  newEnvelope(data){return {data:copy(data),revision:0,dirty:false,pending:null,updatedAt:null};}
  readGuest(){
    try{const raw=this.storage.getItem(GUEST_KEY);if(raw){const data=JSON.parse(raw);if(this.validate(data))return data;}}catch(e){this.localOK=false;}
    return this.empty();
  }
  cacheKey(){return this.user?`${GUEST_KEY}:username:${this.user.username}`:GUEST_KEY;}
  getState(){return copy(this.envelope.data);}
  info(){return {configured:Boolean(this.client),user:this.user,needsLogin:this.needsLogin,mode:this.mode,message:this.message,localOK:this.localOK,dirty:this.envelope.dirty,updatedAt:this.envelope.updatedAt,loading:this.loading,conflict:this.conflict?copy(this.conflict):null};}
  subscribe(listener){this.listeners.add(listener);return ()=>this.listeners.delete(listener);}
  emit(type='status'){for(const listener of this.listeners)listener({type,data:type==='data'?this.getState():null,info:this.info()});}
  status(mode,message=''){this.mode=mode;this.message=message;this.emit();}
  persist(){
    try{this.storage.setItem(this.cacheKey(),JSON.stringify(this.user?this.envelope:this.envelope.data));this.localOK=true;}
    catch(e){this.localOK=false;}
  }
  async request(query){
    const controller=new AbortController();let timer;
    try{
      const value=typeof query.abortSignal==='function'?query.abortSignal(controller.signal):query;
      return await Promise.race([value,new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new Error('连接超时，进度会在网络恢复后重试。'));},this.timeout);})]);
    }finally{clearTimeout(timer);}
  }
  async initialize(){
    if(!this.client)return this.getState();
    try{
      const raw=this.storage.getItem(SESSION_KEY);
      if(raw){const session=JSON.parse(raw),username=normalizeUsername(session.username);
        if(!/^[a-f0-9]{64}$/.test(session.token)||Date.parse(session.expiresAt)<=Date.now()||!Number.isFinite(Date.parse(session.expiresAt))){this.storage.removeItem(SESSION_KEY);return this.getState();}
        this.session=session;await this.activate({id:username,username});
      }
    }catch(e){this.status('error','暂时无法恢复账号，请稍后重试登录。');}
    return this.getState();
  }
  start(){
    // 使用数据库签发的登录会话，不使用邮箱认证。
  }
  async activate(user){
    if((user?.id||null)===(this.user?.id||null)){if(user)this.user=user;return;}
    this.epoch++;clearTimeout(this.timer);this.busy=false;this.conflict=null;this.user=user;this.loading=Boolean(user);
    try{this.storage.removeItem(USERNAME_KEY);if(user)this.storage.setItem(SESSION_KEY,JSON.stringify(this.session));else{this.session=null;this.storage.removeItem(SESSION_KEY);}}catch(e){this.localOK=false;}
    let cached=false;
    if(user){
      try{
        const raw=this.storage.getItem(this.cacheKey());if(raw){
          const e=JSON.parse(raw);
          if(this.validate(e.data)&&Number.isSafeInteger(e.revision)&&e.revision>=0&&typeof e.dirty==='boolean'&&(!e.pending||(this.validate(e.pending.data)&&Number.isSafeInteger(e.pending.revision)&&e.pending.revision>=0&&typeof e.pending.id==='string'))){this.envelope=e;cached=true;}
        }
      }catch(e){this.localOK=false;}
      if(!cached){this.envelope=this.newEnvelope(this.readGuest());this.envelope.dirty=true;}
    }else this.envelope=this.newEnvelope(this.readGuest());
    this.persist();this.emit('data');this.status(user?'loading':'local');
    if(user)await this.refresh({preferRemote:!cached});
  }
  save(data){
    if(!this.validate(data))throw new Error('学习数据格式不正确，未保存。');
    if(same(data,this.envelope.data)){this.persist();this.emit();return this.localOK;}
    this.envelope.data=copy(data);if(this.user)this.envelope.dirty=true;
    this.persist();
    if(this.user){if(!this.conflict&&!this.loading&&!this.needsLogin)this.status('pending');this.schedule();}else this.status('local');
    return this.localOK;
  }
  schedule(){clearTimeout(this.timer);if(this.user&&!this.conflict&&!this.loading&&!this.needsLogin)this.timer=setTimeout(()=>void this.flush(),this.delay);}
  validRow(row){return row&&row.username===this.user?.username&&Number.isSafeInteger(row.revision)&&row.revision>0&&this.validate(row.state);}
  failure(error){
    const code=error?.code||'';
    if(code==='28000'){this.session=null;this.needsLogin=true;try{this.storage.removeItem(SESSION_KEY);}catch(e){}this.status('error','登录已过期，请重新输入用户名和密码；本机进度仍保留。');return;}
    const schema=['PGRST202','PGRST205','42P01','42883'].includes(code);
    this.status(schema?'error':'offline',schema?'云端数据接口尚未就绪，请检查建表和接口缓存设置。':this.localOK?'云端暂时无法连接，已保留本地进度，稍后会自动重试。':'云端连接和本地保存均未成功，请先导出进度备份。');
  }
  setConflict(row){this.conflict={record:row?copy(row):null};this.status('conflict','另一设备的进度已更新，请在家长设置中选择保留哪份进度。');}
  acknowledge(row,pending){
    this.envelope.revision=row.revision;this.envelope.updatedAt=row.updated_at;
    this.envelope.pending=null;this.envelope.dirty=!same(this.envelope.data,pending.data);this.persist();
  }
  adopt(row){
    this.envelope={data:copy(row.state),revision:row.revision,dirty:false,pending:null,updatedAt:row.updated_at};
    this.conflict=null;this.persist();this.emit('data');this.status('saved');
  }
  async refresh({preferRemote=false}={}){
    if(!this.user||this.busy)return;
    const epoch=this.epoch,userId=this.user.id;this.busy=true;
    try{
      if(!this.session){this.status('error','请先登录后同步。');return;}
      const {data:row,error}=await this.request(this.client.rpc('read_protected_username_progress',{p_session_token:this.session.token}));
      if(epoch!==this.epoch)return;if(error)throw error;
      if(row&&!this.validRow(row))throw new Error('Invalid cloud progress');
      if(this.conflict){this.setConflict(row);return;}
      if(row){
        const pending=this.envelope.pending;
        if(pending&&row.last_mutation_id===pending.id){this.acknowledge(row,pending);this.status(this.envelope.dirty?'pending':'saved');}
        else if(preferRemote||!this.envelope.dirty){if(!same(row.state,this.envelope.data)||this.envelope.revision!==row.revision)this.adopt(row);else this.status('saved');}
        else if(same(row.state,this.envelope.data)){this.adopt(row);}
        else if(row.revision!==this.envelope.revision){this.setConflict(row);return;}
      }else if(this.envelope.revision>0){this.setConflict(null);return;}
      else this.envelope.dirty=true;
    }catch(e){if(epoch===this.epoch)this.failure(e);return;}
    finally{if(epoch===this.epoch){this.busy=false;this.loading=false;this.emit();}}
    if(epoch===this.epoch&&this.envelope.dirty&&!this.conflict)await this.flush();
  }
  async flush(){
    clearTimeout(this.timer);
    if(!this.user||!this.session||this.busy||this.loading||this.conflict||!this.envelope.dirty)return;
    const epoch=this.epoch;this.busy=true;this.status('syncing');
    try{
      while(epoch===this.epoch&&this.envelope.dirty&&!this.conflict){
        if(!this.envelope.pending){this.envelope.pending={id:this.randomId(),revision:this.envelope.revision,data:copy(this.envelope.data)};this.persist();}
        const pending=copy(this.envelope.pending);
        const {data,error}=await this.request(this.client.rpc('save_protected_username_progress',{p_session_token:this.session.token,p_state:pending.data,p_expected_revision:pending.revision,p_mutation_id:pending.id}));
        if(epoch!==this.epoch)return;if(error)throw error;
        const row=data?.record;if(row&&!this.validRow(row))throw new Error('Invalid cloud response');
        if(data?.status==='conflict'||data?.status==='missing'){this.setConflict(row);return;}
        if(data?.status!=='saved'||!row)throw new Error('Invalid cloud response');
        this.acknowledge(row,pending);
      }
      if(epoch===this.epoch)this.status('saved');
    }catch(e){if(epoch===this.epoch)this.failure(e);}
    finally{if(epoch===this.epoch){this.busy=false;this.emit();}}
  }
  backup(data,label){
    const key=`${GUEST_KEY}:backup:${this.user?.id||'guest'}:${Date.now()}:${label}`;
    try{this.storage.setItem(key,JSON.stringify(data));}catch(e){throw new Error('无法保存冲突备份，请先导出进度再处理。');}
  }
  async resolve(choice){
    if(!this.conflict||this.busy)return;
    const row=this.conflict.record;
    if(choice==='cloud'){
      this.backup(this.envelope.data,'local');
      if(row)this.adopt(row);else{this.envelope=this.newEnvelope(this.empty());this.envelope.dirty=true;this.conflict=null;this.persist();this.emit('data');await this.flush();}
    }else if(choice==='local'){
      if(row)this.backup(row.state,'cloud');
      this.envelope.revision=row?.revision||0;this.envelope.pending=null;this.envelope.dirty=true;this.conflict=null;this.persist();await this.flush();
    }
  }
  async acceptSession(data,username){
    if(data?.username!==username||!/^[a-f0-9]{64}$/.test(data.session_token)||!this.validate(data.record?.state)||!Number.isFinite(Date.parse(data.expires_at)))throw new Error('登录响应不正确，请稍后重试。');
    const sameUser=this.user?.username===username;
    this.session={username,token:data.session_token,expiresAt:data.expires_at};this.needsLogin=false;
    await this.activate({id:username,username});
    if(sameUser){try{this.storage.setItem(SESSION_KEY,JSON.stringify(this.session));}catch(e){this.localOK=false;}await this.refresh();}
    return {user:this.user};
  }
  async signIn(name,password){
    if(!this.client)throw new Error('请先配置 Supabase 项目。');
    const username=normalizeUsername(name);
    validatePassword(password);
    const {data,error}=await this.request(this.client.rpc('login_username_account',{p_username:username,p_password:password}));if(error)throw error;
    if(data?.status==='password_required')throw new Error('旧用户名尚未设置密码，请由管理员在 Supabase 设置后再登录。');
    if(data?.status==='locked')throw new Error('密码错误次数过多，请 10 分钟后再试。');
    if(data?.status!=='authenticated')throw new Error('用户名或密码不正确。');
    return this.acceptSession(data,username);
  }
  async signUp(name,password){
    if(!this.client)throw new Error('请先配置 Supabase 项目。');
    const username=normalizeUsername(name);
    validatePassword(password);
    const {data,error}=await this.request(this.client.rpc('register_username_account',{p_username:username,p_password:password,p_state:this.getState(),p_mutation_id:this.randomId()}));if(error)throw error;
    if(data?.status==='exists')throw new Error('这个用户名已经存在，请点击“登录用户名”或换一个名称。');
    if(data?.status!=='created')throw new Error('注册未完成，请稍后重试。');
    return this.acceptSession(data,username);
  }
  async signOut(){
    if(!this.client||!this.user)return;
    await this.flush();
    const token=this.session?.token;
    if(token){try{await this.request(this.client.rpc('logout_username_session',{p_session_token:token}));}catch(e){/* 离线仍退出本机；服务端会话按到期时间失效。 */}}
    this.needsLogin=false;
    await this.activate(null);
  }
  dispose(){clearTimeout(this.timer);this.subscription?.unsubscribe();this.listeners.clear();}
}
