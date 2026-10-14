const assert=require('assert');
const L=require('../src/learning');
const clone=value=>JSON.parse(JSON.stringify(value));
const stateWith=count=>{const state=L.empty();state.settings.dailyNewCount=count;return state;};
const storage=()=>{const data=new Map();return {getItem:key=>data.get(key)||null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key),data};};
function backend(){
  const rows=new Map(),sessions=new Map();let tokenCounter=0;
  const server={rows,offline:false,loseResponse:false,beforeSave:null,writes:0};
  server.client=()=>({rpc:async(name,args)=>{
    if(server.offline)throw Error('offline');
    const username=args.p_username||sessions.get(args.p_session_token);
    let row=rows.get(username);
    if(name==='logout_username_session'){sessions.delete(args.p_session_token);return {data:null,error:null};}
    if(name==='login_username_account'){if(!row||row.password!==args.p_password)return {data:{status:'invalid_credentials'},error:null};const token=(++tokenCounter).toString(16).padStart(64,'0');sessions.set(token,username);return {data:{status:'authenticated',username,session_token:token,expires_at:'2099-01-01T00:00:00Z',record:clone(row)},error:null};}
    if(name==='read_protected_username_progress'){if(!username)return {data:null,error:{code:'28000'}};return {data:row?clone(row):null,error:null};}
    if(name==='register_username_account'){
      if(row)return {data:{status:'exists'},error:null};
      row={username,password:args.p_password,state:clone(args.p_state),revision:1,last_mutation_id:args.p_mutation_id,updated_at:'2026-10-14T08:00:00Z'};
      rows.set(username,row);server.writes++;
      const token=(++tokenCounter).toString(16).padStart(64,'0');sessions.set(token,username);return {data:{status:'created',username,session_token:token,expires_at:'2099-01-01T00:00:00Z',record:clone(row)},error:null};
    }
    if(name!=='save_protected_username_progress')throw Error('unexpected RPC');
    if(!username)return {data:null,error:{code:'28000'}};
    if(server.beforeSave)await server.beforeSave(args);
    if(!row)return {data:{status:'missing'},error:null};
    if(row.last_mutation_id!==args.p_mutation_id){
      if(row.revision!==args.p_expected_revision)return {data:{status:'conflict',record:clone(row)},error:null};
      row={...row,state:clone(args.p_state),revision:row.revision+1,last_mutation_id:args.p_mutation_id};rows.set(username,row);server.writes++;
    }
    if(server.loseResponse){server.loseResponse=false;throw Error('response lost');}
    return {data:{status:'saved',record:clone(row)},error:null};
  }});
  return server;
}
(async()=>{
  const {CloudProgress,normalizeUsername,validatePassword}=await import('../src/cloud-progress.mjs');
  let counter=0;
  const make=(client,local)=>new CloudProgress({client,storage:local,empty:L.empty,validate:L.validState,delay:60000,timeout:1000,randomId:()=>`mutation-${++counter}`});
  const userA={id:'parent_a'},userB={id:'parent_b'};
  assert.equal(normalizeUsername(' Ａｌｉｃｅ_小芽 '),'alice_小芽');
  for(const name of ['', 'a b','a@b','x'.repeat(25),null])assert.throws(()=>normalizeUsername(name));
  for(const password of ['short','x'.repeat(73),'😀'.repeat(4)])assert.throws(()=>validatePassword(password));
  let local=storage(),p=make(null,local);
  await p.initialize();p.save(stateWith(7));
  assert.equal(JSON.parse(local.getItem('hanzi-sprout-v1')).settings.dailyNewCount,7);
  assert.equal(p.info().mode,'local');p.dispose();

  // 第一次登录新账号，将当前本机进度保存到该账号。
  let server=backend();p=make(server.client(),local);await p.initialize();await p.signUp(userA.id,'test-password');
  await assert.rejects(()=>p.signUp('PARENT_A','test-password'),/已经存在/);
  await assert.rejects(()=>p.signIn(userA.id,'wrong-password'),/密码不正确/);
  assert.equal((await server.client().rpc('read_protected_username_progress',{p_session_token:null})).error.code,'28000');
  assert.equal((await server.client().rpc('save_protected_username_progress',{p_session_token:null,p_state:stateWith(9)})).error.code,'28000');
  assert(![...local.data.values()].some(raw=>raw.includes('test-password')),'不在本机保存密码');
  assert.equal(server.rows.get(userA.id).state.settings.dailyNewCount,7);
  assert.equal(p.info().mode,'saved');assert.equal(server.writes,1);
  p.save(stateWith(10));await p.flush();assert.equal(server.rows.get(userA.id).state.settings.dailyNewCount,10);

  // 第二台设备从云端恢复，不能以本机空数据覆盖。
  const secondDevice=make(server.client(userA),storage());await secondDevice.initialize();await secondDevice.signIn(userA.id,'test-password');
  assert.equal(secondDevice.getState().settings.dailyNewCount,10);assert.equal(server.writes,2);secondDevice.dispose();

  // 断网时保存本机，刷新后仍可以重试同一个操作。
  server.offline=true;p.save(stateWith(3));await p.flush();assert.equal(p.info().mode,'offline');
  assert.equal(server.rows.get(userA.id).state.settings.dailyNewCount,10);p.dispose();
  p=make(server.client(userA),local);await p.initialize();assert.equal(p.getState().settings.dailyNewCount,3);
  server.offline=false;await p.refresh();assert.equal(server.rows.get(userA.id).state.settings.dailyNewCount,3);

  // 服务端已写入但响应丢失，重试不能重复更新版本或丢掉后续修改。
  server.loseResponse=true;p.save(stateWith(8));await p.flush();
  const acceptedRevision=server.rows.get(userA.id).revision;assert(p.envelope.pending);
  p.save(stateWith(9));p.dispose();p=make(server.client(userA),local);await p.initialize();
  assert.equal(server.rows.get(userA.id).state.settings.dailyNewCount,9);
  assert.equal(server.rows.get(userA.id).revision,acceptedRevision+1);

  // 写入期间继续学习，新快照排在已在途的快照后，不会倒序覆盖。
  let release,arrived;
  const arrivedPromise=new Promise(resolve=>arrived=resolve),held=new Promise(resolve=>release=resolve);
  server.beforeSave=async()=>{server.beforeSave=null;arrived();await held;};
  p.save(stateWith(6));const writing=p.flush();await arrivedPromise;p.save(stateWith(11));release();await writing;
  assert.equal(server.rows.get(userA.id).state.settings.dailyNewCount,11);assert(!p.info().dirty);

  // 另一设备先更新：阻止覆盖，显式选择云端并留下本地备份。
  const other=make(server.client(userA),storage());await other.initialize();await other.signIn(userA.id,'test-password');other.save(stateWith(12));await other.flush();
  p.save(stateWith(4));await p.flush();assert.equal(p.info().mode,'conflict');
  assert.equal(server.rows.get(userA.id).state.settings.dailyNewCount,12);
  await p.resolve('cloud');assert.equal(p.getState().settings.dailyNewCount,12);
  assert([...local.data.keys()].some(key=>key.includes(':backup:parent_a:')&&key.endsWith(':local')));
  // 选择本机时也要基于云端最新版本保存，并备份云端那一份。
  other.save(stateWith(13));await other.flush();p.save(stateWith(14));await p.flush();
  assert.equal(p.info().mode,'conflict');await p.resolve('local');assert.equal(server.rows.get(userA.id).state.settings.dailyNewCount,14);
  assert([...local.data.keys()].some(key=>key.endsWith(':cloud')));other.dispose();

  // 重置也是一份新快照，云端不能恢复旧识字检查。
  const learned=p.getState();learned.records['天']={level:0,due:'2026-10-15',learned:'2026-10-14'};
  L.startAssessment(learned,'2026-10-14');L.answerAssessment(learned,true);p.save(learned);await p.flush();
  p.save(L.resetLiteracy(learned));await p.flush();assert.deepEqual(server.rows.get(userA.id).state.records,{});
  assert.equal(server.rows.get(userA.id).state.assessment,undefined);

  // 不同账号的缓存分别保存，退出不将家长账号记录写回游客数据。
  p.dispose();const guestBefore=local.getItem('hanzi-sprout-v1');
  const b=make(server.client(userB),local);await b.initialize();await b.signUp(userB.id,'test-password');b.save(stateWith(2));await b.flush();await b.signOut();
  assert.equal(local.getItem('hanzi-sprout-v1'),guestBefore);assert.equal(b.getState().settings.dailyNewCount,7);b.dispose();
  const aAgain=make(server.client(userA),local);await aAgain.initialize();await aAgain.signIn(userA.id,'test-password');assert.equal(aAgain.getState().settings.dailyNewCount,14);aAgain.dispose();

  const token=aAgain.session.token;await aAgain.signOut();
  assert.equal((await server.client().rpc('read_protected_username_progress',{p_session_token:token})).error.code,'28000','退出后旧令牌失效');
  const oldLocal=storage();oldLocal.setItem('hanzi-sprout-username-v1',userA.id);
  const oldLogin=make(server.client(),oldLocal);await oldLogin.initialize();assert.equal(oldLogin.info().user,null,'旧版仅用户名的记住登录不能绕过密码');oldLogin.dispose();

  await assert.rejects(()=>aAgain.signIn('not_registered','test-password'),/密码不正确/);
  // 存储失败时不能宣称已保存在本机。
  p=make(null,{getItem:()=>null,setItem:()=>{throw Error('quota');}});p.save(stateWith(3));assert(!p.info().localOK);p.dispose();
  console.log('PASS: 用户名密码校验、无密码禁止读取、重名保护、云端保存、跨设备恢复、离线续传、在途排队、幂等重试、冲突备份、重置和账号隔离');
})().catch(error=>{console.error(error);process.exitCode=1;});
