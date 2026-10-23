const assert = require('assert');
const L = require('../src/learning');
const key='2026-10-14',first=L.chars[0].char,second=L.chars[1].char;
let s=L.empty(),d=L.plan(s,key);
assert.equal(d.fresh.length,5);
assert.equal(new Set(L.chars.map(x=>x.char)).size,690);
assert.equal(L.chars.length,690,'完整收录上下册690个会认字');
assert.equal(L.chars.filter(x=>x.semester==='上册').length,280);
assert.equal(L.chars.filter(x=>x.semester==='下册').length,410);
assert.equal(L.curriculum.id,'pep-g1-2024-2025');
assert.equal(L.chars.slice(0,6).map(x=>x.char).join(''),'天地人你我他','第一课按教材字序开始');
assert.equal(L.chars.slice(280,288).map(x=>x.char).join(''),'霜吹落降飘游池入','下册从春夏秋冬开始');
assert.equal(L.chars.slice(-8).map(x=>x.char).join(''),'吵现顶胖票户交父','包含下册最后一个语文园地');
assert(L.chars.some(x=>x.char==='党'&&x.lesson==='阅读 1 热爱中国共产党'),'包含现行下册新增课文');
assert(L.chars.some(x=>x.char==='迈'&&x.lesson==='阅读 11 浪花'));
assert.equal(L.curriculum.lessons.length,74);
const orderedNew=L.curriculum.lessons.flatMap(l=>l.entries.filter(x=>x.new).map(x=>x.char));
assert.deepEqual(orderedNew,L.chars.map(x=>x.char),'每日新字按含园地的课次字序安排');
assert(L.chars.every(x=>L.curriculum.lessons.some(l=>l.id===x.lessonId&&l.lesson===x.lesson&&l.semester===x.semester&&l.unit===x.unit&&l.page===x.page)),'每字可定位到册别单元课次与页码');
const alternativeReadings=L.chars.flatMap(x=>(x.otherReadings||[]).map(r=>({...r,char:x.char})));
assert.equal(alternativeReadings.length,13,'教材重复出现的多音字作为读音保存，不重复计数');
assert(alternativeReadings.every(x=>x.word.includes(x.char)&&/^[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+$/.test(x.pinyin)));
assert(L.chars.find(x=>x.char==='背').otherReadings.some(r=>r.pinyin==='bēi'&&r.word==='背包'));
assert(L.chars.every(x=>/^[\u4e00-\u9fff]$/.test(x.char)&&/^[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+$/.test(x.pinyin)&&x.word.length>=2&&x.word.includes(x.char)),'每个字都有合法拼音和包含该字的例词');
assert.strictEqual(L.plan(s,key),d,'每日计划不能在刷新时改变');
assert.equal(L.complete(s,key),false);
for(const c of d.fresh)d.passes[c]=1;
assert.equal(L.complete(s,key),false,'必须完成三次');
for(const c of d.fresh)d.passes[c]=2;
assert.equal(L.complete(s,key),false,'认对两次仍未过关');
for(const c of d.fresh)d.passes[c]=3;
assert.equal(L.complete(s,key),true);
assert.equal(s.records[first].due,'2026-10-15');
let tomorrow=L.plan(s,'2026-10-15');
assert.equal(tomorrow.fresh.length,5);
assert.equal(tomorrow.review.length,5);
assert(!tomorrow.fresh.some(c=>tomorrow.review.includes(c)));
for(const c of [...tomorrow.fresh,...tomorrow.review])tomorrow.passes[c]=3;
tomorrow.failed={[first]:true};
assert(L.complete(s,'2026-10-15'));
assert.equal(s.records[second].due,'2026-10-18');
assert.equal(s.records[first].due,'2026-10-16','答错后缩短复习间隔');
s=L.empty();for(const c of ['山','上','有','水'])s.records[c]={level:0,due:key,learned:key};
d=L.plan(s,key);
assert(L.eligible(s,d).includes('山上有水。'));
assert(!L.eligible(s,d).includes('我爱妈妈。'));
for(const c of [...d.fresh,...d.review])d.passes[c]=3;
assert(!L.complete(s,key),'句子也是当天过关条件');
d.sentencePasses=L.requiredSentences(s,d);
assert(L.complete(s,key));
const before=JSON.stringify(s.records);L.complete(s,key);assert.equal(JSON.stringify(s.records),before,'重复完成不应改变复习日期');
s=L.empty();for(const x of L.chars)s.records[x.char]={level:0,due:key,learned:key};d=L.plan(s,key);
assert.equal(d.fresh.length,0);assert.equal(d.review.length,10);
assert.equal(L.addDays('2026-12-31',1),'2027-01-01');
assert.equal(L.addDays('2028-02-28',1),'2028-02-29');
s=L.empty();d=L.plan(s,key);
let a=L.startAssessment(s,key);
assert(!L.finishAssessment(s,key),'未检查所有字不能确认');
L.answerAssessment(s,true);L.answerAssessment(s,false);
const resumed=JSON.parse(JSON.stringify(s));
assert.equal(L.startAssessment(resumed,'2026-10-15').answers.length,2,'刷新或跨天继续原检查');
for(let i=a.answers.length;i<L.chars.length;i++)L.answerAssessment(s,i<10);
assert.equal(Object.keys(s.records).length,0,'检查确认前不改变学习记录');
assert(!L.answerAssessment(s,true),'不可多记录一个字');
assert(L.finishAssessment(s,key));
assert.equal(Object.keys(s.records).length,9);
d=L.plan(s,key);
assert.equal(d.fresh.length,5);
assert(!d.fresh.includes(first));
assert(d.fresh.includes(second));
assert.equal(d.review.length,9);
assert.equal(a.applied,true);
assert.equal(L.startAssessment(s,key).answers.length,0,'重新检查重新计数');
s=L.empty();d=L.plan(s,key);d.passes[first]=1;
a=L.startAssessment(s,key);
for(let i=0;i<L.chars.length;i++)L.answerAssessment(s,i===0);
L.finishAssessment(s,key);
assert.strictEqual(L.plan(s,key),d,'当天已开始的学习任务保持原样');
assert.equal(Object.keys(s.records).length,0);
assert.equal(a.effective,'2026-10-15');
d=L.plan(s,'2026-10-15');
assert.deepEqual(d.review,[first]);
assert(!d.fresh.includes(first));
assert(a.applied);
const applied=JSON.stringify(s.records);L.plan(s,'2026-10-16');assert.equal(JSON.stringify(s.records),applied,'检查结果只应用一次');
s=L.empty();d=L.plan(s,key);
assert.equal(L.dailyCount(s),5);
assert(L.setDailyCount(s,3,key));
d=L.plan(s,key);assert.equal(d.fresh.length,3);assert.equal(d.target,3);
assert.equal(L.dailyCount(JSON.parse(JSON.stringify(s))),3,'每日设置可持久保存');
for(const invalid of [0,-1,21,2.5,NaN,'5'])assert(!L.setDailyCount(s,invalid,key),'拒绝无效数量');
assert.equal(L.dailyCount(s),3,'无效设置不改变原目标');
d.passes[d.fresh[0]]=1;
assert(L.setDailyCount(s,10,key));
assert.strictEqual(L.plan(s,key),d,'已开始任务不能因设置修改被重置');
assert.equal(d.target,3);
assert.equal(d.fresh.length,3);
assert.equal(L.plan(s,'2026-10-15').fresh.length,10,'次日采用新数量');
s=L.empty();L.setDailyCount(s,1,key);d=L.plan(s,key);d.failed={'一':true};d.passes[first]=0;
L.setDailyCount(s,7,key);assert.strictEqual(L.plan(s,key),d,'答错的任务也算已开始');
s=L.empty();L.setDailyCount(s,20,key);d=L.plan(s,key);assert.equal(d.fresh.length,20);
d.done=true;L.setDailyCount(s,2,key);assert.strictEqual(L.plan(s,key),d,'当天完成后不新增任务');
assert.equal(L.plan(s,'2026-10-15').fresh.length,2);
s=L.empty();L.setDailyCount(s,10,key);
for(const x of L.chars.slice(0,L.chars.length-3))s.records[x.char]={level:0,due:key,learned:key};
d=L.plan(s,key);assert.equal(d.fresh.length,3,'剩余未认识的字不足目标时只安排剩余字');assert.equal(d.review.length,10,'旧版数量设置的复习使用默认轻松上限');
assert.equal(L.dailyCount({records:{},days:{}}),5,'没有设置时默认5');
s=L.empty();L.setDailyCount(s,7,key);
s.records[first]={level:2,due:key,learned:key};
d=L.plan(s,key);d.passes[second]=1;
L.startAssessment(s,key);L.answerAssessment(s,true);
const reset=L.resetLiteracy(s);
assert.equal(L.dailyCount(reset),7,'重置识字数保留每日新字设置');
assert.deepEqual(reset.records,{});
assert.deepEqual(reset.days,{});
assert.equal(reset.assessment,undefined,'旧检查结果不能在重置后重新生效');
assert.equal(L.plan(reset,key).fresh.length,7);
assert.equal(L.plan(reset,key).review.length,0);
assert(s.records[first],'构造重置状态前不修改已有数据');
console.log('PASS: 统编教材690字数据、初始检查、学习规则、每日数量和识字数重置');

{
 const s=L.empty(),d=L.plan(s,key);
 assert.deepEqual(L.continueLearning(s,key),[],'未完成当前组不能继续');
 const finish=()=>{for(const c of [...d.fresh,...d.review])d.passes[c]=3;d.sentencePasses=L.requiredSentences(s,d);assert(L.complete(s,key));};
 finish();const firstRecords=JSON.stringify(s.records);const original={...s.records[d.fresh[0]]};
 const added=L.continueLearning(s,key);assert.equal(added.length,5);assert.equal(d.fresh.length,10);assert.equal(d.done,false);
 assert.equal(JSON.stringify(s.records),firstRecords,'开启新一组不改变已学记录');
 assert(L.validState(JSON.parse(JSON.stringify(s))),'额外任务可恢复');finish();assert.deepEqual(s.records[d.fresh[0]],original,'旧字不重复升级');
 assert.equal(Object.keys(s.records).length,10);assert.equal(Object.keys(s.days).length,1,'不提前增加日期');
 const next=L.plan(s,L.addDays(key,1));assert.equal(next.review.length,10);assert(!next.fresh.some(c=>d.fresh.includes(c)));
 for(let i=0;i<4;i++){L.continueLearning(s,key);finish();}assert.equal(d.fresh.length,30);assert(L.validState(s),'一天多组可超过20字');
}

{
 const s=L.empty();
 for(const x of L.chars.slice(0,8))s.records[x.char]={level:1,due:key,learned:'2026-10-01'};
 const d=L.plan(s,key),[a,b,c]=d.review;
 d.passes[a]=3;d.passes[b]=1;d.passes[c]=3;d.failed={[c]:true};
 L.creditReview(s,key,[a,b,c,...d.fresh]);
 assert.equal(s.records[a].due,L.addDays(key,7),'独立复习无需完成新字即可更新复习日期');
 assert.equal(s.records[b].due,key,'未过关字仍到期待复习');
 assert.equal(s.records[c].due,L.addDays(key,1),'答错字次日复习');
 assert.equal(Object.keys(s.records).length,8,'复习不增加识字数');
 assert(!d.done,'独立复习不冒充完成今日新字');
 const record=JSON.stringify(s.records[a]);L.creditReview(s,key,[a]);
 assert.equal(JSON.stringify(s.records[a]),record,'重复进入不会重复升级');
 assert(L.validState(JSON.parse(JSON.stringify(s))),'复习进度支持保存恢复');
 for(const ch of [...d.fresh,...d.review])d.passes[ch]=3;
 d.sentencePasses=L.requiredSentences(s,d);assert(L.complete(s,key));
 assert.equal(JSON.stringify(s.records[a]),record,'完成整日时不重复结算独立复习');
 console.log('PASS: 独立复习、暂停保存、错字复习间隔和防重复结算');
}

{
 for(const [value,fresh,review] of [['easy',5,10],['normal',10,20],['hard',20,40]]){
  const s=L.empty();for(const x of L.chars.slice(0,60))s.records[x.char]={level:0,due:key,learned:key};
  assert(L.setDifficulty(s,value,key));const d=L.plan(s,key);
  assert.equal(d.fresh.length,fresh);assert.equal(d.review.length,review);
  assert.equal(L.reviewCount(s),review);assert(L.validState(JSON.parse(JSON.stringify(s))));
  d.passes[d.fresh[0]]=1;L.setDifficulty(s,'easy',key);
  assert.strictEqual(L.plan(s,key),d,'切换难度保留已开始任务');
  assert.equal(L.plan(s,L.addDays(key,1)).fresh.length,5);
 }
 assert.equal(L.difficulty(L.empty()),'easy');assert.equal(L.reviewCount({settings:{dailyNewCount:7}}),10);
 assert(!L.setDifficulty(L.empty(),'invalid',key));
 console.log('PASS: 三档难度、新字与复习上限、旧数据兼容和已开始任务保护');
}

{
 const s=L.empty(),d=L.plan(s,key),group=[...d.fresh],random=()=>0;
 assert.deepEqual(L.recognitionQueue(d,[...group].reverse(),random),group,'第一轮按教材原始顺序');
 d.attempted=[group[0]];d.passes[group[0]]=0;
 assert.deepEqual(L.recognitionQueue(d,group,random),group.slice(1),'听过并确认的字不插入第一轮剩余字');
 const restored=JSON.parse(JSON.stringify(s));
 assert.deepEqual(L.recognitionQueue(restored.days[key],group,random),group.slice(1),'刷新继续第一轮剩余顺序');
 d.attempted=[...group];for(const c of group)d.passes[c]=1;
 const round2=L.recognitionQueue(d,group,random);
 assert.notDeepEqual(round2,group,'第二轮打乱');assert.deepEqual([...round2].sort(),[...group].sort(),'每轮没有丢字或重复字');
 for(const c of group)d.passes[c]=2;
 assert(!L.complete(s,key),'两次不算过关');assert(group.every(c=>!L.mastered(d,c)));
 assert.notDeepEqual(L.recognitionQueue(d,group,random),group,'第三轮也打乱');
 for(const c of group)d.passes[c]=3;
 assert.deepEqual(L.recognitionQueue(d,group),[]);assert(L.complete(s,key));assert(L.validState(s));
 const legacy=JSON.parse(JSON.stringify(s));for(const c of group)legacy.days[key].passes[c]=2;
 assert(L.validState(legacy),'兼容旧版两次已结算记录');assert(group.every(c=>L.mastered(legacy.days[key],c)),'旧版已完成字不被撤销');
 d.passes[group[0]]=4;assert(!L.validState(s),'拒绝超过三次的进度');
 console.log('PASS: 首轮教材顺序、后续乱序、三次过关、听读重试、刷新恢复和旧记录兼容');
}

{
 const s=L.empty();for(const x of L.chars.slice(0,110))s.records[x.char]={level:0,due:L.addDays(key,1),learned:key};
 const d=L.plan(s,key),known=new Set(Object.keys(s.records)),available=L.eligible(s,d),selected=L.requiredSentences(s,d);
 assert(available.length>=80,'前110字必须有足够的自然短句覆盖');
 assert(available.includes('我读书。'));assert(available.includes('学校开学了。'));
 assert(available.every(sentence=>[...sentence].every(c=>!/[\u4e00-\u9fff]/.test(c)||known.has(c))),'不能为了凑句数加入未学字');
 assert.equal(selected.length,2);assert.equal(new Set(selected).size,2);
 assert.deepEqual(L.requiredSentences(s,d),selected,'同组重新渲染不改变句子');
 d.sentencePasses=[...selected];
 const tomorrow=L.plan(s,L.addDays(key,1));
 assert(L.requiredSentences(s,tomorrow).every(sentence=>!selected.includes(sentence)),'优先选择以往没有读过的句子');
 assert(L.validState(s),'新增句子学习记录可以保存恢复');
 assert.equal(new Set(L.sentences).size,L.sentences.length,'句库去重');
 console.log('PASS: 前110字句子覆盖、已学字约束、按难度安排句数、避免重复和进度兼容');
}

{
 const s=L.empty();for(const x of L.chars.slice(0,110))s.records[x.char]={level:0,due:key,learned:key};
 const d=L.plan(s,key);for(const c of [...d.fresh,...d.review])d.passes[c]=L.REQUIRED_PASSES;
 const selected=L.requiredSentences(s,d);
 for(const sentence of selected){assert(!L.answerSentence(d,sentence,true),'听后确认不计数');assert.equal(L.sentenceCount(d,sentence),0);assert(!L.answerSentence(d,sentence),'第一次读对不算过关');}
 assert(!L.complete(s,key),'所有句子只读一次不能完成');
 assert(L.validState(JSON.parse(JSON.stringify(s))),'句子第一次读对进度可保存恢复');
 for(const sentence of selected){assert(L.answerSentence(d,sentence));assert.equal(L.sentenceCount(d,sentence),2);}
 assert(L.complete(s,key));const count=d.sentencePasses.length;L.answerSentence(d,selected[0]);assert.equal(d.sentencePasses.length,count,'重复确认不重复计数');
 const legacy={sentencePasses:[selected[0]]};assert.equal(L.sentenceCount(legacy,selected[0]),2,'旧版已过关句子保持完成');
 d.sentenceCounts[selected[0]]=3;assert(!L.validState(s),'拒绝超过两次的句子计数');
 console.log('PASS: 句子两次过关、听后不计数、暂停恢复及旧记录兼容');
}

{
 for(const [mode,expected] of [['easy',2],['normal',4],['hard',8]]){
  const s=L.empty();for(const x of L.chars.slice(0,110))s.records[x.char]={level:0,due:L.addDays(key,1),learned:key};
  L.setDifficulty(s,mode,key);const d=L.plan(s,key),before=JSON.stringify(s);
  assert.equal(L.sentenceLimit(s),expected);assert.equal(L.requiredSentences(s,d).length,expected);
  const review=L.sentenceReview(s,d,()=>0);
  assert.equal(review.length,expected);assert.equal(new Set(review).size,expected);
  assert(review.every(sentence=>L.eligible(s,d).includes(sentence)),'句子复习只用已学字');
  assert.equal(JSON.stringify(s),before,'独立句子复习不修改新字任务和记录');
  d.passes[d.fresh[0]]=1;L.setDifficulty(s,'hard',key);
  assert.equal(L.requiredSentences(s,d).length,expected,'已开始学习的句子数量不被中途改变');
  assert.equal(L.sentenceReview(s,d).length,8,'独立复习立即采用新难度');
  assert(L.validState(JSON.parse(JSON.stringify(s))));
 }
 const s=L.empty(),d=L.plan(s,key);assert.deepEqual(L.sentenceReview(s,d),[],'没有可读句子时不生成未学内容');
 console.log('PASS: 句子难度2/4/8、独立复习、数量不足和当前任务保护');
}

{
 const pool=['天。','人！','山','水','天地人','山水田','日月山','天地水'];
 const batch=L.sentenceBatch(pool,[],()=>0.3);
 const size=s=>(s.match(/[\u4e00-\u9fff]/g)||[]).length;
 assert.equal(batch.length,4);
 assert.equal(batch.filter(s=>size(s)===1).length,2,'每批搭配两句短句');
 assert.equal(batch.filter(s=>size(s)===3).length,2,'每批搭配两句长句');
 assert(L.sentenceBatch(pool,batch,()=>0.3).every(s=>!batch.includes(s)),'各长度组优先避开上一批');
 assert.equal(L.sentenceBatch(['天','天地人','天地山','天地水'],[],()=>0).length,4,'某组不足两句时从另一组补足');
 assert.deepEqual(L.sentenceBatch([],[],()=>0),[]);
 assert.equal(new Set(L.sentenceBatch(['天','天','人'],[],()=>0)).size,2);
}

{
 const s=L.empty(),d=L.plan(s,key),c=L.chars[100].char;
 assert(L.learnFreely(s,c,key));
 assert.deepEqual(d.freeLearned,[c]);
 assert.equal(s.records[c].learned,key);
 assert.equal(s.records[c].due,L.addDays(key,1));
 assert(!L.learnFreely(s,c,key),'重复点击不重复记账');
 assert(!L.learnFreely(s,'龘',key),'仅允许教材字库');
 assert(L.validState(JSON.parse(JSON.stringify(s))),'自由学习记录可以备份恢复');
 assert(!L.plan(s,L.addDays(key,1)).fresh.includes(c),'后续新字跳过已认识字');
 const current=d.fresh[0];
 assert(L.learnFreely(s,current,key));
 assert(L.mastered(d,current),'当前计划里的字也可以直接标为认识');
 assert(d.credited.includes(current),'完成今日任务时不重复升级复习间隔');
 assert(L.validState(s));
 const completed=L.empty(),today=L.plan(completed,key);today.done=true;
 assert(L.learnFreely(completed,c,key));assert(today.done,'完成后自由学习保留今日完成状态');
 console.log('PASS: 自由学习记录、去重、备份校验、复习安排和计划兼容');
}
