(function (root) {
  const chars = typeof module!=='undefined' ? require('./characters') : root.Characters;
  const curriculum=chars.curriculum;
  const sentences = ['山上有水。','天上有月。','我是大人。','你是我的好妈妈。','我爱爸爸。','我爱妈妈。','我有一个家。','小鸟在天上。','山上有小树。','我看见小鱼了。','小鱼在水里。','天上有白云。','我爱我的家。','我吃米饭。','我喝水。','下雨了。','我和你去看花。','小鸟回家了。','我是小学生。','我爱读书。','我会写字。','我们是好朋友。','我和妈妈去看小鸟。','我很高兴。','我有三本书。','早上好。','我会跑也会走。','这是一只小鸟。','那里有大山。','我有一只小手。'].filter(s => [...s].every(c => !/[\u4e00-\u9fff]/.test(c) || chars.some(x => x.char===c)));
  const intervals = [1,3,7,14,30];
  const DEFAULT_DAILY_COUNT=5, MAX_DAILY_COUNT=20;
  function dateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
  function addDays(key,n) { const d = new Date(key+'T12:00:00'); d.setDate(d.getDate()+n); return dateKey(d); }
  function empty() { return {version:1, settings:{dailyNewCount:DEFAULT_DAILY_COUNT}, records:{}, days:{}}; }
  function resetLiteracy(state) {
    const fresh=empty();
    fresh.settings={...state.settings,dailyNewCount:dailyCount(state)};
    return fresh;
  }
  function validDailyCount(n) { return Number.isInteger(n)&&n>=1&&n<=MAX_DAILY_COUNT; }
  function dailyCount(state) { const n=state.settings?.dailyNewCount;return validDailyCount(n)?n:DEFAULT_DAILY_COUNT; }
  function dayStarted(day) { return Boolean(day&&(day.done||Object.keys(day.passes).length||day.failed)); }
  function setDailyCount(state,n,key=dateKey()) {
    if(!validDailyCount(n))return false;
    state.settings={...state.settings,dailyNewCount:n};
    if(state.days[key]&&!dayStarted(state.days[key]))delete state.days[key];
    return true;
  }
  function startAssessment(state,key=dateKey()) {
    if(!state.assessment || state.assessment.completed) state.assessment={answers:[],started:key,completed:null,applied:false,effective:null};
    return state.assessment;
  }
  function answerAssessment(state,known) {
    const a=state.assessment;
    if(!a || a.completed || a.answers.length>=chars.length || typeof known!=='boolean')return false;
    a.answers.push(known); return true;
  }
  function applyAssessment(state,key) {
    const a=state.assessment;
    if(!a?.completed || a.applied || a.effective>key)return false;
    chars.forEach((x,i)=>{
      if(a.answers[i]) state.records[x.char]={level:0,due:key,learned:state.records[x.char]?.learned||key};
      else delete state.records[x.char];
    });
    a.applied=true;return true;
  }
  function finishAssessment(state,key=dateKey()) {
    const a=state.assessment;
    if(!a || a.answers.length!==chars.length)return false;
    if(a.completed)return true;
    const locked=dayStarted(state.days[key]);
    a.completed=key;a.effective=locked?addDays(key,1):key;
    if(!locked){applyAssessment(state,key);delete state.days[key];}
    return true;
  }
  function plan(state,key=dateKey()) {
    applyAssessment(state,key);
    if (state.days[key]) return state.days[key];
    const target=dailyCount(state);
    const fresh = chars.filter(c=>!state.records[c.char]).slice(0,target).map(c=>c.char);
    const review = chars.filter(c=>state.records[c.char] && state.records[c.char].due<=key).map(c=>c.char);
    return state.days[key] = {fresh,review,target,passes:{},done:false,sentencePasses:[],created:key};
  }
  function continueLearning(state,key=dateKey()) {
    const day=plan(state,key);
    if(!day.done)return [];
    const fresh=chars.filter(c=>!state.records[c.char]&&!day.fresh.includes(c.char)).slice(0,dailyCount(state)).map(c=>c.char);
    if(!fresh.length)return [];
    day.credited=[...new Set([...(day.credited||[]),...day.fresh,...day.review])];
    day.fresh.push(...fresh);day.done=false;
    return fresh;
  }
  function eligible(state,day) {
    const known = new Set(Object.keys(state.records));
    day.fresh.filter(c=>(day.passes[c]||0)>=2).forEach(c=>known.add(c));
    return sentences.filter(s=>[...s].every(c=>!/[\u4e00-\u9fff]/.test(c)||known.has(c)));
  }
  function requiredSentences(state,day) { return eligible(state,day).slice(0,3); }
  function complete(state,key) {
    const day=plan(state,key);
    if(day.done) return true;
    if(![...day.fresh,...day.review].every(c=>(day.passes[c]||0)>=2)) return false;
    if(!requiredSentences(state,day).every(s=>day.sentencePasses.includes(s))) return false;
    [...day.fresh,...day.review].filter(c=>!(day.credited||[]).includes(c)).forEach(c=>{
      const old=state.records[c]; const level=old && !day.failed?.[c] ? Math.min(old.level+1,4) : 0;
      state.records[c]={level,due:addDays(key,intervals[level]),learned:old?.learned||key};
    });
    day.credited=[...day.fresh,...day.review];day.done=true; return true;
  }
  function validState(data){if(data?.version!==1||!data.records||!data.days||typeof data.records!=='object'||typeof data.days!=='object'||Array.isArray(data.records)||Array.isArray(data.days))return false;if(data.settings&&(typeof data.settings!=='object'||Array.isArray(data.settings)||!validDailyCount(data.settings.dailyNewCount)))return false;const isC=c=>chars.some(x=>x.char===c),date=d=>/^\d{4}-\d{2}-\d{2}$/.test(d);if(data.assessment){const a=data.assessment;if(!Array.isArray(a.answers)||a.answers.length>chars.length||!a.answers.every(v=>typeof v==='boolean')||!date(a.started)||typeof a.applied!=='boolean'||(a.completed!==null&&(!date(a.completed)||a.answers.length!==chars.length))||(a.effective!==null&&!date(a.effective))||(a.completed&&!a.effective)||(!a.completed&&(a.applied||a.effective)))return false;}return Object.entries(data.records).every(([c,r])=>isC(c)&&r&&Number.isInteger(r.level)&&r.level>=0&&r.level<=4&&date(r.due)&&date(r.learned))&&Object.entries(data.days).every(([d,v])=>date(d)&&v&&Array.isArray(v.fresh)&&v.fresh.length<=chars.length&&Array.isArray(v.review)&&[...v.fresh,...v.review].every(isC)&&new Set([...v.fresh,...v.review]).size===v.fresh.length+v.review.length&&v.passes&&Object.entries(v.passes).every(([c,n])=>isC(c)&&Number.isInteger(n)&&n>=0&&n<=2)&&Array.isArray(v.sentencePasses)&&v.sentencePasses.every(s=>sentences.includes(s))&&typeof v.done==='boolean'&&(v.credited===undefined||(Array.isArray(v.credited)&&v.credited.every(c=>[...v.fresh,...v.review].includes(c)&&(v.passes[c]||0)>=2)&&new Set(v.credited).size===v.credited.length))&&(v.target===undefined||validDailyCount(v.target)));}
  const api={chars,curriculum,sentences,dateKey,addDays,empty,plan,continueLearning,eligible,requiredSentences,complete,startAssessment,answerAssessment,finishAssessment,dailyCount,setDailyCount,dayStarted,validDailyCount,MAX_DAILY_COUNT,resetLiteracy,validState};
  if(typeof module!=='undefined') module.exports=api; else root.Learning=api;
})(typeof window!=='undefined'?window:globalThis);
