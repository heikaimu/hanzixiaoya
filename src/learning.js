(function (root) {
  const chars = typeof module!=='undefined' ? require('./characters') : root.Characters;
  const curriculum=chars.curriculum;
  const readings=typeof module!=='undefined'?require('./sentences'):root.SentenceReadings;
  const sentences=[...new Set(readings)].filter(s=>[...s].every(c=>!/[\u4e00-\u9fff]/.test(c)||chars.some(x=>x.char===c)));
  const intervals = [1,3,7,14,30];
  const DEFAULT_DAILY_COUNT=5, MAX_DAILY_COUNT=20;
  const DIFFICULTIES={easy:{label:'轻松',fresh:5,review:10},normal:{label:'正常',fresh:10,review:20},hard:{label:'困难',fresh:20,review:40}};
  function difficulty(state){return Object.hasOwn(DIFFICULTIES,state.settings?.difficulty)?state.settings.difficulty:'easy';}
  function reviewCount(state){return DIFFICULTIES[difficulty(state)].review;}
  function setDifficulty(state,value,key=dateKey()){
    if(!Object.hasOwn(DIFFICULTIES,value))return false;
    state.settings={...state.settings,difficulty:value,dailyNewCount:DIFFICULTIES[value].fresh};
    if(state.days[key]&&!dayStarted(state.days[key]))delete state.days[key];
    return true;
  }
  const REQUIRED_PASSES=3;
  function mastered(day,c){return (day.passes[c]||0)>=REQUIRED_PASSES||(day.credited||[]).includes(c);}
  function shuffled(items,random=Math.random){
    const result=[...items];
    for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
    if(result.length>1&&result.every((c,i)=>c===items[i]))result.push(result.shift());
    return result;
  }
  function recognitionQueue(day,group,random=Math.random){
    const pending=chars.map(x=>x.char).filter(c=>group.includes(c)&&!mastered(day,c));
    const first=pending.filter(c=>!(day.attempted||[]).includes(c)&&!(day.passes[c]>0));
    return first.length?first:shuffled(pending,random);
  }
  function dateKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
  function addDays(key,n) { const d = new Date(key+'T12:00:00'); d.setDate(d.getDate()+n); return dateKey(d); }
  function empty() { return {version:1, settings:{dailyNewCount:DEFAULT_DAILY_COUNT,difficulty:'easy'}, records:{}, days:{}}; }
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
    const review = chars.filter(c=>state.records[c.char] && state.records[c.char].due<=key).sort((a,b)=>state.records[a.char].due.localeCompare(state.records[b.char].due)).slice(0,reviewCount(state)).map(c=>c.char);
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
  function creditReview(state,key,characters) {
    const day=plan(state,key);
    for(const c of characters){
      if(!day.review.includes(c)||!mastered(day,c)||(day.credited||[]).includes(c))continue;
      const old=state.records[c];
      if(!old)continue;
      const level=day.failed?.[c]?0:Math.min(old.level+1,4);
      state.records[c]={...old,level,due:addDays(key,intervals[level])};
      day.credited=[...(day.credited||[]),c];
    }
  }
  function eligible(state,day) {
    const known = new Set(Object.keys(state.records));
    day.fresh.filter(c=>mastered(day,c)).forEach(c=>known.add(c));
    return sentences.filter(s=>[...s].every(c=>!/[\u4e00-\u9fff]/.test(c)||known.has(c)));
  }
  function requiredSentences(state,day) {
    const usage=new Map();
    Object.entries(state.days).filter(([key])=>key<day.created).forEach(([,d])=>d.sentencePasses.forEach(s=>usage.set(s,(usage.get(s)||0)+1)));
    const hash=s=>{let value=0;for(const c of (day.created||'')+s)value=(value*31+c.charCodeAt(0))>>>0;return value;};
    return eligible(state,day).sort((a,b)=>(usage.get(a)||0)-(usage.get(b)||0)||hash(a)-hash(b)).slice(0,3);
  }
  const SENTENCE_PASSES=2;
  function sentenceCount(day,text){return day.sentencePasses.includes(text)?SENTENCE_PASSES:day.sentenceCounts?.[text]||0;}
  function answerSentence(day,text,assisted=false){
    if(!sentences.includes(text))return false;
    if(assisted)return day.sentencePasses.includes(text);
    day.sentenceCounts=day.sentenceCounts||{};
    day.sentenceCounts[text]=Math.min(SENTENCE_PASSES,sentenceCount(day,text)+1);
    if(day.sentenceCounts[text]>=SENTENCE_PASSES&&!day.sentencePasses.includes(text))day.sentencePasses.push(text);
    return day.sentencePasses.includes(text);
  }
  function complete(state,key) {
    const day=plan(state,key);
    if(day.done) return true;
    if(![...day.fresh,...day.review].every(c=>mastered(day,c))) return false;
    if(!requiredSentences(state,day).every(s=>day.sentencePasses.includes(s))) return false;
    [...day.fresh,...day.review].filter(c=>!(day.credited||[]).includes(c)).forEach(c=>{
      const old=state.records[c]; const level=old && !day.failed?.[c] ? Math.min(old.level+1,4) : 0;
      state.records[c]={level,due:addDays(key,intervals[level]),learned:old?.learned||key};
    });
    day.credited=[...day.fresh,...day.review];day.done=true; return true;
  }
  function validState(data){if(data?.version!==1||!data.records||!data.days||typeof data.records!=='object'||typeof data.days!=='object'||Array.isArray(data.records)||Array.isArray(data.days))return false;if(data.settings&&(typeof data.settings!=='object'||Array.isArray(data.settings)||!validDailyCount(data.settings.dailyNewCount)||(data.settings.difficulty!==undefined&&!Object.hasOwn(DIFFICULTIES,data.settings.difficulty))))return false;const isC=c=>chars.some(x=>x.char===c),date=d=>/^\d{4}-\d{2}-\d{2}$/.test(d);if(data.assessment){const a=data.assessment;if(!Array.isArray(a.answers)||a.answers.length>chars.length||!a.answers.every(v=>typeof v==='boolean')||!date(a.started)||typeof a.applied!=='boolean'||(a.completed!==null&&(!date(a.completed)||a.answers.length!==chars.length))||(a.effective!==null&&!date(a.effective))||(a.completed&&!a.effective)||(!a.completed&&(a.applied||a.effective)))return false;}return Object.entries(data.records).every(([c,r])=>isC(c)&&r&&Number.isInteger(r.level)&&r.level>=0&&r.level<=4&&date(r.due)&&date(r.learned))&&Object.entries(data.days).every(([d,v])=>date(d)&&v&&Array.isArray(v.fresh)&&v.fresh.length<=chars.length&&Array.isArray(v.review)&&[...v.fresh,...v.review].every(isC)&&new Set([...v.fresh,...v.review]).size===v.fresh.length+v.review.length&&v.passes&&Object.entries(v.passes).every(([c,n])=>isC(c)&&Number.isInteger(n)&&n>=0&&n<=REQUIRED_PASSES)&&Array.isArray(v.sentencePasses)&&v.sentencePasses.every(s=>sentences.includes(s))&&(v.sentenceCounts===undefined||(v.sentenceCounts&&typeof v.sentenceCounts==='object'&&!Array.isArray(v.sentenceCounts)&&Object.entries(v.sentenceCounts).every(([s,n])=>sentences.includes(s)&&Number.isInteger(n)&&n>=0&&n<=SENTENCE_PASSES)))&&typeof v.done==='boolean'&&(v.credited===undefined||(Array.isArray(v.credited)&&v.credited.every(c=>[...v.fresh,...v.review].includes(c)&&(v.passes[c]||0)>=2)&&new Set(v.credited).size===v.credited.length))&&(v.attempted===undefined||(Array.isArray(v.attempted)&&v.attempted.every(c=>[...v.fresh,...v.review].includes(c))&&new Set(v.attempted).size===v.attempted.length))&&(v.target===undefined||validDailyCount(v.target)));}
  const api={SENTENCE_PASSES,sentenceCount,answerSentence,REQUIRED_PASSES,mastered,shuffled,recognitionQueue,DIFFICULTIES,difficulty,reviewCount,setDifficulty,chars,curriculum,sentences,dateKey,addDays,empty,plan,continueLearning,creditReview,eligible,requiredSentences,complete,startAssessment,answerAssessment,finishAssessment,dailyCount,setDailyCount,dayStarted,validDailyCount,MAX_DAILY_COUNT,resetLiteracy,validState};
  if(typeof module!=='undefined') module.exports=api; else root.Learning=api;
})(typeof window!=='undefined'?window:globalThis);
