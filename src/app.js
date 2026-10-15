(async () => {
  const L=window.Learning, P=window.ProgressStorage;
  const $=s=>document.querySelector(s), dialog=$('#dialog');
  $('#content').innerHTML='<div class="empty">正在恢复学习进度…</div>';
  let state=await P.initialize(), view='today', filter='all', book='all', search='', queue=[], phase='', selected=new Set(), practice=null, reviewChars=[], activeGroup=[], assisted=false, roundNumber=1;
  let key=L.dateKey(); let day=L.plan(state,key);
  let readingFont='song';
  try{if(localStorage.getItem('hanzi-reading-font')==='yahei')readingFont='yahei';}catch(e){}
  document.documentElement.dataset.readingFont=readingFont;
  function save(){if(!P.save(state))toast('本地保存失败，请检查云端保存状态或导出备份。');updateStorageStatus();}
  function storageLabel(info=P.info()){
    if(info.mode==='saved')return info.localOK?'● 云端已保存':'● 云端已保存 · 本地不可用';
    if(!info.localOK)return '● 本地保存失败';
    return {local:info.configured?'● 本地已保存 · 登录同步':'● 本地已保存',loading:'● 正在恢复云端进度',pending:'● 本地已保存 · 待同步',syncing:'● 正在保存到云端',offline:'● 本地已保存 · 待联网',error:'● 本地已保存 · 同步未完成',conflict:'● 进度冲突 · 请处理'}[info.mode]||'● 本地已保存';
  }
  function updateStorageStatus(){
    const info=P.info();$('.local-badge').textContent=storageLabel(info);$('.local-badge').title=info.message||'';
    const entry=$('#account-entry');entry.textContent=info.user&&!info.needsLogin?info.user.username:'登录 / 注册';entry.dataset.action=info.user&&!info.needsLogin?'cloud-account':'cloud-auth';entry.disabled=!info.configured||info.loading;entry.title=info.user?info.user.username:info.configured?'登录家长账号，长期保存学习进度':'云端服务尚未配置';
    $('#content').inert=Boolean(info.loading);$('#content').setAttribute('aria-busy',String(info.loading));
    if($('#cloud-section'))$('#cloud-section').innerHTML=cloudPanel();
  }
  function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),3200);}
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function info(c){return L.chars.find(x=>x.char===c);}
  function count(){return [...day.fresh,...day.review].filter(c=>L.mastered(day,c)).length;}
  function streak(){let n=0,d=day.done?key:L.addDays(key,-1);while(state.days[d]?.done){n++;d=L.addDays(d,-1);}return n;}
  function totalKnown(){return new Set([...Object.keys(state.records),...day.fresh.filter(c=>L.mastered(day,c))]).size;}
  function dateLabel(){return new Date(key+'T12:00:00').toLocaleDateString('zh-CN',{month:'long',day:'numeric',weekday:'long'});}
  function rollover(){const now=L.dateKey();if(now!==key){key=now;day=L.plan(state,key);queue=[];dialog.close();save();render();toast('新的一天开始了，今日任务已更新。');}}
  function open(html){dialog.classList.toggle('recognition-dialog',html.includes('class="recognition"'));$('#dialog-content').innerHTML='<div class="modal">'+html+'</div>';if(!dialog.open)dialog.showModal();}
  function head(title){return `<div class="modal-head"><h2>${title}</h2><div class="modal-head-actions"><button class="close" data-action="close" aria-label="关闭">×</button></div></div>`;}
  function speech(text,quiet=false){
    if(!('speechSynthesis' in window)){if(!quiet)toast('当前浏览器不支持朗读，请由家长示范。');return;}
    speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='zh-CN';u.rate=.75;
    u.onerror=e=>{if(!quiet&&!['canceled','interrupted'].includes(e.error))toast('朗读未能播放，请由家长示范。');};
    try{speechSynthesis.speak(u);}catch(e){if(!quiet)toast('朗读未能播放，请由家长示范。');}
  }
  function listenCurrent(text,isChar){
    assisted=true;
    const x=isChar?info(text):null;
    speech(x?text+'，'+x.word:text,true);
  }
  dialog.addEventListener('close',()=>{if('speechSynthesis' in window)speechSynthesis.cancel();});
  function render(){
    $('#daily-target').textContent=L.DIFFICULTIES[L.difficulty(state)].label+' · 认字 '+L.dailyCount(state)+' / 复习 '+L.reviewCount(state);
    $('#breadcrumb').textContent='学习空间 / '+({today:'今日学习',library:'我的汉字库',history:'成长记录',review:'复习巩固'}[view]);
    document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
    const welcome=`<section class="welcome"><div><div class="eyebrow">GROW A LITTLE, EVERY DAY</div><h1>${view==='today'?'你好，小小识字家 <em>☀</em>':view==='library'?'每一个字，都是新朋友':view==='review'?'学过的字和句子，再读一读':'看，小芽在长大 🌱'}</h1><p>${view==='today'?'不着急，一个字一个字，把世界读给自己听。':view==='library'?'从第一次见面，到熟悉地读出来。':view==='review'?'每次复习一小组，慢慢记牢。':'把每天的小小努力，变成看得见的成长。'}</p><span class="curriculum-label">${L.curriculum.name} · ${L.chars.length} 字 · 按课次学习</span></div><span class="date">◷ ${dateLabel()}</span></section>`;
    if(view==='today')renderToday(welcome);else if(view==='library')renderLibrary(welcome);else if(view==='review')renderReview(welcome);else renderHistory(welcome);
  }
  function renderToday(welcome){
    const total=day.fresh.length+day.review.length,passed=count();
    $('#content').innerHTML=welcome+`<section class="hero"><div class="hero-copy"><span class="pill">🌿 每日识字小计划</span><h2>${day.done?'今天的识字小脚印，完成啦！':'每天 '+(day.target||L.dailyCount(state))+' 个字，<br>长出一点新本领。'}</h2><p>${day.done?'这组已经过关，还想认识更多字，可以继续下一组。':'按自己的节奏，一组一组认识新汉字。'}</p><button class="primary" data-action="${day.done?'continue-learning':'start'}">${day.done?'继续学习下一组':Object.keys(day.passes).length?'继续今日学习':'开始今日学习'} <span>→</span></button></div><div class="hero-art" aria-hidden="true"><div class="sun"></div><div class="hill"></div><div class="hill two"></div><div class="art-card">木</div><div class="art-card two">林</div><div class="art-sprout">🌱</div></div></section>
    <section class="stats"><div class="stat"><div class="stat-icon">✧</div><div><div class="stat-label">已经认识的汉字</div><div class="stat-number">${totalKnown()}<small>个小伙伴</small></div></div></div><div class="stat"><div class="stat-icon">⚑</div><div><div class="stat-label">连续学习</div><div class="stat-number">${streak()}<small>天</small></div></div></div><div class="stat"><div class="stat-icon daily-progress-icon ${total>0&&passed===total?'is-complete':''}" aria-label="${total>0&&passed===total?'今日汉字全部过关':'今日汉字尚未完成'}">✓</div><div><div class="stat-label">今日汉字进度</div><div class="stat-number">${passed}<small>/ ${total} 字过关</small></div></div></div></section>

    ${day.done?'<div class="completion-banner">✓ 今日全部过关 · 明天计划认识 '+L.dailyCount(state)+' 个新朋友</div>':''}`;
  }

  function renderLibrary(welcome){
    const known=new Set([...Object.keys(state.records),...day.fresh.filter(c=>L.mastered(day,c))]);
    const scoped=L.chars.filter(x=>book==='all'||x.semester===book),knownCount=scoped.filter(x=>known.has(x.char)).length;
    const items=scoped.filter(x=>(!search||x.char.includes(search)||x.pinyin.includes(search)||x.word.includes(search)||x.lesson.includes(search))&&(filter==='all'||(filter==='known'?known.has(x.char):!known.has(x.char))));
    $('#content').innerHTML=welcome+`<div class="library-toolbar"><input id="search" placeholder="搜索汉字、拼音、词语或课名" aria-label="搜索汉字" value="${esc(search)}"><select id="book-filter" aria-label="选择教材册别"><option value="all" ${book==='all'?'selected':''}>上下册 · ${L.chars.length} 字</option>${L.curriculum.semesters.map(s=>`<option value="${s.name}" ${book===s.name?'selected':''}>一年级${s.name} · ${s.count} 字</option>`).join('')}</select>${[['all','全部 '+scoped.length],['known','已认识 '+knownCount],['new','待认识 '+(scoped.length-knownCount)]].map(([f,t])=>`<button class="filter ${filter===f?'active':''}" data-filter="${f}">${t}</button>`).join('')}</div><p class="library-note">${L.curriculum.edition} · 识字表（会认字），含语文园地 · 按教材首次出现顺序排列</p><div class="library-grid">${items.map(x=>`<button class="library-cell ${known.has(x.char)?'known':''}" data-char="${x.char}" title="一年级${x.semester} · 第${x.unit}单元 · ${esc(x.lesson)}"><div class="hanzi">${x.char}</div><small>${known.has(x.char)?'✓ 已认识':x.pinyin}</small><small>${x.semester} · 第${x.unit}单元</small></button>`).join('')}</div>${items.length?'':'<div class="empty">没有找到这个字。</div>'}`;
  }
  function renderHistory(welcome){
    const days=Object.entries(state.days).sort((a,b)=>b[0].localeCompare(a[0]));
    $('#content').innerHTML=welcome+`<div class="panel"><h3>你的识字旅程 <span>累计完成 ${days.filter(([,d])=>d.done).length} 天</span></h3><p>选择一天，可以再次学习当天的新字和复习字。</p></div>`+days.map(([d,v])=>`<div class="history-row"><div class="history-copy"><b>${d}</b><small>新字 ${v.fresh.join('、')||'无'} · 复习 ${v.review.length} 字 · 句子 ${v.sentencePasses.length} 句</small></div><div class="history-actions"><span style="color:${v.done?'#67834f':'#ae9b72'}">${v.done?'🌱 全部过关':'◷ '+(d===key?'继续努力':'当日未完成')}</span><button class="secondary" data-action="history-practice" data-date="${d}" ${v.fresh.length+v.review.length?'':'disabled'}>再次学习 →</button></div></div>`).join('');
  }
  function showChar(c){const x=info(c);if(!x)return;open(head('认识一个新朋友')+`<div class="study-char"><div class="char-pinyin">${x.pinyin}</div><div class="hanzi">${c}</div><div class="study-word">${x.word}</div></div><p class="fine-print">一年级${x.semester} · 第${x.unit}单元 · ${x.lesson} · 第${x.page}页</p>${x.otherReadings?.length?'<div class="other-readings"><b>教材中的其他读音</b>'+x.otherReadings.map(r=>'<p>'+r.pinyin+' · '+r.word+' <button class="text-button" data-speak="'+r.word+'">♫ 听词语</button></p>').join('')+'</div>':''}<p class="fine-print">先听读音，再和家长一起读一遍。</p><div class="modal-actions"><button class="secondary" data-speak="${c+'，'+x.word}">♫ 听一听</button><button class="primary" data-action="close">认识你啦</button></div>`);}
  function introduction(){open(head('先和新朋友见个面')+`<p>点一个字听一听，和家长一起读。准备好后，开始逐字认读。</p><div class="review-chips">${day.fresh.map(c=>`<button class="chip" data-speak="${c+'，'+info(c).word}">${c}</button>`).join('')}</div><p class="fine-print">${day.review.length?'还有 '+day.review.length+' 个旧字要复习。<br>':''}请家长听孩子独立认读，再确认答案。第一轮按教材顺序，第二轮起打乱顺序。每个字需要连续认对三次。</p><div class="modal-actions"><button class="primary" data-action="begin">准备好了，开始认读 →</button></div>`);}
  function renderReview(welcome){
    const pending=day.review.filter(c=>!L.mastered(day,c)),known=Object.keys(state.records),sentencePool=L.eligible(state,day);
    $('#content').innerHTML=welcome+`<section class="panel"><h3>汉字复习 <span>已学 ${known.length} 字</span></h3><p>每组最多 ${L.reviewCount(state)} 个字，每字独立认对 3 次过关。</p><div class="review-chips">${(pending.length?pending:known).slice(0,10).map(c=>`<button class="chip" data-char="${c}">${c}</button>`).join('')}</div><div class="panel-bottom"><span>优先复习到期字，随时可以练习</span><button class="primary" data-action="review-begin" ${known.length?'':'disabled'}>开始汉字复习 →</button></div></section><section class="panel review-extra"><h3>句子复习 <span>可读 ${sentencePool.length} 句</span></h3><p>每组最多 ${L.sentenceLimit(state)} 句，每句独立读对 2 次过关。只使用已认识的字，不用先完成今日新字。</p><div class="sentence-preview">${sentencePool[0]||'先认识一些汉字，就能开始读句子啦。'}</div><div class="panel-bottom"><span>跟随当前难度 · 听过后的当次确认不计数</span><button class="primary" data-action="review-sentences" ${sentencePool.length?'':'disabled'}>开始句子复习 →</button></div></section>`;
  }
  function startRound(){
    queue=L.recognitionQueue(day,activeGroup);
    const pending=activeGroup.filter(c=>!L.mastered(day,c));
    const first=pending.some(c=>!(day.attempted||[]).includes(c)&&!(day.passes[c]>0));
    roundNumber=first?1:Math.max(2,1+Math.min(...pending.map(c=>day.passes[c]||0),L.REQUIRED_PASSES-1));
  }
  function reviewBegin(){
    rollover();practice=null;
    reviewChars=day.review.filter(c=>!L.mastered(day,c)).slice(0,L.reviewCount(state));
    if(!reviewChars.length){practiceBegin('all');return;}
    activeGroup=[...reviewChars];startRound();phase='review';next();
  }
  function begin(){activeGroup=[...day.fresh,...day.review].filter(c=>!(day.credited||[]).includes(c));startRound();phase='char';next();}
  function next(){
    assisted=false;if('speechSynthesis' in window)speechSynthesis.cancel();
    if(phase!=='sentence'&&!queue.length){queue=L.recognitionQueue(day,activeGroup);if(queue.length){roundNumber=Math.min(L.REQUIRED_PASSES,roundNumber+1);}}
    if(phase==='review'&&!queue.length){L.creditReview(state,key,reviewChars);save();render();open(head('这组复习完成')+'<div class="progress-track"><i style="width:100%"></i></div><p>这组 '+reviewChars.length+' 个字都过关了，下次复习已安排好。</p><div class="modal-actions"><button class="secondary" data-action="close">休息一下</button><button class="primary" data-action="review-begin">继续复习下一组 →</button></div>');return;}
    if(phase==='char'&&!queue.length){phase='sentence';queue=L.requiredSentences(state,day).filter(s=>!day.sentencePasses.includes(s));}
    if(!queue.length){if(L.complete(state,key)){save();render();success();}else toast('还有认读任务未完成，请继续练习。');return;}
    const c=queue[0],isChar=phase!=='sentence';
    const group=activeGroup;
    const total=isChar?group.length:L.requiredSentences(state,day).length;
    const passed=isChar?group.filter(c=>L.mastered(day,c)).length:total-queue.length;
    const sentenceRound=isChar?0:Math.min(1,...L.requiredSentences(state,day).map(s=>L.sentenceCount(day,s)));
    const progress=isChar?(roundNumber-1)/L.REQUIRED_PASSES:sentenceRound/L.SENTENCE_PASSES;
    open(head(isChar?'读给家长听':'把汉字读成一句话')+`<div class="progress-track"><i style="width:${progress*100}%"></i></div><div class="round-label">${isChar?(day.fresh.includes(c)?'新字':'复习')+' · 第 '+roundNumber+' / '+L.REQUIRED_PASSES+' 轮':'句子认读 · 第 '+(sentenceRound+1)+' / '+L.SENTENCE_PASSES+' 轮'}</div><p>${isChar?'自己试着读，还不熟可以反复听。':'每个字都认识了，试着连起来读出意思。'}</p><div class="recognition">${isChar?'<div class="char-pinyin">'+info(c).pinyin+'</div>':''}<div class="${isChar?'hanzi':'sentence'}">${c}</div></div><div class="modal-actions"><button class="secondary" data-action="wrong">♫ 听一听</button><button class="primary" data-action="right">✓ 家长确认：读对了</button></div><div class="fine-print">听过后本次确认不计入过关，稍后会再认。<br>${isChar?'每字连续读对三次过关 · 本组已过关 '+passed+' / '+total+' 字':'每句独立读对两次过关 · 本句已认对 '+L.sentenceCount(day,c)+' / '+L.SENTENCE_PASSES+' 次'}</div>`);
  }
  function answer(right){
    if(!queue.length)return;rollover();if(!queue.length)return;
    const c=queue[0],isChar=phase!=='sentence';
    if(!right){
      if(isChar){day.passes[c]=0;day.failed=day.failed||{};day.failed[c]=true;}else{day.sentenceCounts=day.sentenceCounts||{};day.sentenceCounts[c]=0;}
      listenCurrent(c,isChar);save();render();return;
    }
    queue.shift();
    if(isChar){
      day.attempted=[...new Set([...(day.attempted||[]),c])];
      if(!assisted)day.passes[c]=Math.min(L.REQUIRED_PASSES,(day.passes[c]||0)+1);
    }else if(!L.answerSentence(day,c,assisted))queue.push(c);
    if(phase==='review')L.creditReview(state,key,reviewChars);
    save();render();next();
  }
  function success(){open(head('今日学习完成')+`<div class="progress-track"><i style="width:100%"></i></div><div class="success-art">🌱</div><h2 class="success-title">小小的你，又长大了一点！</h2><p class="fine-print">${day.fresh.length} 个新字 · ${day.review.length} 个复习字 · ${day.sentencePasses.length} 句小句子<br>全部独立认读过关。还想学的话，可以继续下一组新字。</p><div class="modal-actions"><button class="secondary" data-action="close">收好今天的小成就 ✓</button><button class="primary" data-action="continue-learning">继续学习下一组 →</button></div>`);}
  function start(){rollover();if(day.done){open(head('今天已经全部过关')+'<p>可以继续学习下一组新字，也可以再次测试今天的新字、复习字和小句子。本次测试不计入学习进度，也不会改变复习安排。</p><div class="modal-actions"><button class="secondary" data-action="practice-begin">再次测试</button><button class="primary" data-action="continue-learning">继续学习下一组 →</button></div>');}else introduction();}
  function practiceBegin(mode='today',sourceDate=null){
    rollover();if(mode==='today'&&!day.done){start();return;}
    const historical=mode==='history'?state.days[sourceDate]:null;
    if(mode==='history'&&!historical){toast('没有找到这一天的学习记录。');return;}
    const chars=mode==='history'?[...new Set([...historical.fresh,...historical.review])]:mode==='sentences'?[]:mode==='all'?Object.keys(state.records).sort(()=>Math.random()-.5).slice(0,L.reviewCount(state)):[...new Set([...day.fresh,...day.review])].sort(()=>Math.random()-.5);
    const ordered=L.chars.map(x=>x.char).filter(c=>chars.includes(c));
    const items=[...ordered.map(text=>({text,isChar:true})),...(['all','history'].includes(mode)?[]:(mode==='sentences'?L.sentenceReview(state,day):L.requiredSentences(state,day)).map(text=>({text,isChar:false})))];
    if(!items.length){toast('先认识一些汉字，再来读句子。');return;}
    practice={key,mode,sourceDate,items,queue:items.filter(x=>x.isChar),passes:{},attempted:[],sentencePasses:[],round:1,total:items.length,passed:0,mistakes:new Set()};practiceNext();
  }
  function practiceNext(){
    assisted=false;if('speechSynthesis' in window)speechSynthesis.cancel();
    if(!practice)return;
    if(practice.key!==L.dateKey()){practice=null;rollover();return;}
    if(!practice.queue.length){
      const pending=L.recognitionQueue(practice,practice.items.filter(x=>x.isChar).map(x=>x.text));
      if(pending.length){practice.round=Math.min(L.REQUIRED_PASSES,practice.round+1);}
      practice.queue=pending.length?pending.map(text=>({text,isChar:true})):practice.items.filter(x=>!x.isChar&&!practice.sentencePasses.includes(x.text));
    }
    if(!practice.queue.length){
      open(head(practice.mode==='history'?'再次学习完成':practice.mode==='sentences'?'句子复习完成':'再次测试完成')+`<div class="progress-track"><i style="width:100%"></i></div><div class="success-art">🌱</div><h2 class="success-title">又练习了一遍，真棒！</h2><p class="practice-result">已完成 ${practice.total} 项认读${practice.mistakes.size?'，其中 '+practice.mistakes.size+' 项经过再次练习后读对了':'，全部一次读对'}。</p><p class="fine-print">本次测试未计入学习进度，今日成绩和复习安排保持不变。</p><div class="modal-actions"><button class="secondary" data-action="close">完成</button><button class="primary" data-action="${practice.mode==='history'?'history-practice':practice.mode==='sentences'?'review-sentences':practice.mode==='all'?'review-begin':'practice-begin'}" data-date="${practice.sourceDate||''}">再练一次 →</button></div>`);practice=null;return;
    }
    const item=practice.queue[0];
    const sentenceRound=item.isChar?0:Math.min(1,...practice.items.filter(x=>!x.isChar).map(x=>L.sentenceCount(practice,x.text)));
    const progress=item.isChar?(practice.round-1)/L.REQUIRED_PASSES:sentenceRound/L.SENTENCE_PASSES;
    open(head(practice.mode==='history'?practice.sourceDate+' · 再次学习':practice.mode==='sentences'?'句子复习':'再次测试 · '+(item.isChar?'汉字认读':'句子认读'))+`<p class="fine-print">仅用于巩固，不计入学习进度。请先独立读给家长听。</p><div class="progress-track"><i style="width:${progress*100}%"></i></div><div class="round-label">${item.isChar?(practice.mode==='history'?'当天汉字':day.fresh.includes(item.text)?'已学汉字':'复习汉字')+' · 第 '+practice.round+' / '+L.REQUIRED_PASSES+' 轮':'句子认读 · 第 '+(sentenceRound+1)+' / '+L.SENTENCE_PASSES+' 轮'}</div><div class="recognition">${item.isChar?'<div class="char-pinyin">'+info(item.text).pinyin+'</div>':''}<div class="${item.isChar?'hanzi':'sentence'}">${item.text}</div></div><div class="modal-actions"><button class="secondary" data-action="practice-wrong">♫ 听一听</button><button class="primary" data-action="practice-right">✓ 家长确认：读对了</button></div><p class="fine-print">已完成 ${practice.passed} / ${practice.total} 项</p>`);
  }
  function practiceAnswer(right){
    if(!practice?.queue.length)return;
    if(practice.key!==L.dateKey()){practice=null;rollover();return;}
    const item=practice.queue[0];
    if(!right){practice.mistakes.add(item.text);if(item.isChar)practice.passes[item.text]=0;else{practice.sentenceCounts=practice.sentenceCounts||{};practice.sentenceCounts[item.text]=0;}listenCurrent(item.text,item.isChar);return;}
    practice.queue.shift();
    if(item.isChar){
      practice.attempted=[...new Set([...practice.attempted,item.text])];
      if(!assisted)practice.passes[item.text]=Math.min(L.REQUIRED_PASSES,(practice.passes[item.text]||0)+1);
    }else if(!L.answerSentence(practice,item.text,assisted))practice.queue.push(item);
    practice.passed=practice.items.filter(x=>x.isChar?(practice.passes[x.text]||0)>=L.REQUIRED_PASSES:practice.sentencePasses.includes(x.text)).length;
    practiceNext();
  }
  function sentence(){if(count()<day.fresh.length+day.review.length){toast('先完成今天的汉字认读，再来读小句子。');start();return;}const ss=L.requiredSentences(state,day);if(!ss.length){toast('还没有能组成的句子。学会更多字就能解锁啦！');return;}if(day.done){open(head('今天的小句子')+ss.map(s=>`<p class="sentence-preview">${s}</p><button class="text-button" data-speak="${s}">♫ 听读音</button>`).join(''));return;}phase='sentence';queue=ss.filter(s=>!day.sentencePasses.includes(s));next();}
  function settings(){
    rollover();selected=new Set(Object.keys(state.records));const locked=L.dayStarted(day);
    open(head('家长设置')+'<section id="cloud-section" class="setting-section cloud-section">'+cloudPanel()+'</section>'+`<section class="font-settings"><h3>认读字体</h3><label for="reading-font">汉字字体</label> <select id="reading-font"><option value="song" ${readingFont==='song'?'selected':''}>宋体（默认）</option><option value="yahei" ${readingFont==='yahei'?'selected':''}>微软雅黑</option></select><p class="font-preview">天地人，你我他。</p><p>仅调整认读汉字的字体，切换后立即生效。设备未安装所选字体时，使用同类字体。</p></section><section class="daily-settings"><h3>学习难度</h3><p>选一个适合今天节奏的难度，默认轻松。复习优先安排最早到期的字，不足时按实际数量安排。</p><div class="difficulty-options">${Object.entries(L.DIFFICULTIES).map(([value,option])=>`<button class="filter ${L.difficulty(state)===value?'active':''}" data-action="set-difficulty" data-difficulty="${value}" aria-pressed="${L.difficulty(state)===value}"><b>${option.label}${value==='easy'?' · 默认':''}</b><span>认字 ${option.fresh} 个 · 复习 ${option.review} 个</span><span>句子 ${option.sentences} 句</span></button>`).join('')}</div><p>${locked?'当前已开始的任务保留；下一组新字和下一次复习使用新难度，明日计划也会采用新设置。':'切换后立即更新今日认字和复习数量。'}</p></section>`+`<div class="setting-section"><h3>重置识字数</h3><p>从头开始学习：清除已学汉字和复习进度，保留每日新字数量。</p><button class="secondary warning" data-action="reset-literacy">重置识字数</button></div><div class="setting-section"><p>登录后学习记录会自动同步到云端；也可以导出 JSON 备份。</p><button class="secondary" data-action="export">导出进度</button><button class="secondary" data-action="import">导入进度</button><input type="file" id="import-file" accept="application/json" hidden><button class="text-button warning" data-action="reset">清空学习记录</button></div>`);
  }
  function cloudPanel(){
    const info=P.info();
    if(!info.configured)return '<h3>云端保存</h3><p>尚未配置云端服务。请按项目说明配置 Supabase 后重启网页服务；当前进度保存在本浏览器。</p>';
    if(!info.user||info.needsLogin)return '<h3>长期保存学习进度</h3><p>输入用户名登录，将认读进度、复习安排和每日设置保存到云端。换设备后登录同一账号即可继续学习。</p>'+(info.message?'<p class="warning">'+esc(info.message)+'</p>':'')+'<button class="primary" data-action="cloud-auth">登录 / 注册家长账号</button>';
    let html=`<h3>云端保存</h3><p class="cloud-account">${esc(info.user.username||'家长账号')}</p><p>${storageLabel(info)}${info.updatedAt?'<br>上次云端保存：'+new Date(info.updatedAt).toLocaleString('zh-CN'):''}</p>${info.message?'<p class="warning">'+esc(info.message)+'</p>':''}`;
    if(info.conflict){
      const remote=info.conflict.record?.state;
      html+=`<div class="setting-note"><p>本机已认识 ${Object.keys(state.records).length} 字；云端已认识 ${Object.keys(remote?.records||{}).length} 字。选择前会在本机备份另一份进度。</p><button class="secondary" data-action="cloud-use-remote">使用云端进度</button><button class="secondary" data-action="cloud-use-local">保留本机进度并上传</button></div>`;
    }
    return html+`<div class="cloud-actions"><button class="secondary" data-action="cloud-sync" ${info.loading?'disabled':''}>立即同步</button><button class="text-button" data-action="cloud-signout">退出账号</button></div><p>退出后，本账号尚未同步的进度仍留在此浏览器，重新登录后会继续同步。退出会显示本机未登录时的学习进度。</p>`;
  }
  function authDialog(){
    open(head('用户名和密码登录 / 注册')+'<p>使用用户名和密码保存和恢复孩子的识字进度，无需邮箱验证。注册新名字会保存本机当前进度，登录已有名字会恢复对应记录。</p><form id="cloud-auth-form"><label for="cloud-username">用户名</label><input id="cloud-username" type="text" autocomplete="username" maxlength="24" required placeholder="例如：小芽_2026"><p class="fine-print">1–24 个汉字、字母、数字或下划线，英文字母不区分大小写。</p><label for="cloud-password">密码</label><input id="cloud-password" type="password" autocomplete="current-password" minlength="8" required placeholder="至少 8 位"><p id="cloud-auth-error" class="warning" role="alert"></p><div class="modal-actions"><button class="secondary" type="submit" name="intent" value="signup">注册账号</button><button class="primary" type="submit" name="intent" value="signin">登录账号</button></div></form><p class="fine-print">请记住用户名和密码。密码不会保存在浏览器中。</p>');
  }
  async function accountAction(action){
    try{
      if(action==='cloud-sync')await P.refresh();
      if(action==='cloud-signout')await P.signOut();
      if(action==='cloud-use-remote')await P.resolve('cloud');
      if(action==='cloud-use-local')await P.resolve('local');
      if(dialog.open&&action!=='cloud-signout')updateStorageStatus();
      if(action==='cloud-signout'){dialog.close();toast('已退出账号，本账号进度保留在本机缓存中。');}
    }catch(e){toast(e.message||'操作未完成，请稍后重试。');}
  }
  function changeDifficulty(value){
    rollover();const locked=L.dayStarted(day);
    if(!L.setDifficulty(state,value,key))return;
    day=L.plan(state,key);save();render();settings();
    toast(locked?'难度已保存，当前任务保留，下一组使用新设置。':'难度已切换，今日任务已更新。');
  }
  const valid=L.validState;
  document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.view){view=b.dataset.view;render();return;}if(b.dataset.char){showChar(b.dataset.char);return;}if(b.dataset.speak){speech(b.dataset.speak);return;}if(b.dataset.filter){filter=b.dataset.filter;render();return;}if(b.dataset.select){const c=b.dataset.select;selected.has(c)?selected.delete(c):selected.add(c);b.classList.toggle('selected',selected.has(c));b.setAttribute('aria-pressed',selected.has(c));return;}
    const action=b.dataset.action;switch(action){case 'cloud-account':settings();break;case 'cloud-auth':authDialog();break;case 'cloud-sync':case 'cloud-signout':case 'cloud-use-remote':case 'cloud-use-local':void accountAction(action);break;case 'set-difficulty':changeDifficulty(b.dataset.difficulty);break;case 'close':practice=null;dialog.close();break;case 'review-home':view='review';render();break;case 'review-begin':reviewBegin();break;case 'review-sentences':practiceBegin('sentences');break;case 'start':start();break;case 'continue-learning':{rollover();const fresh=L.continueLearning(state,key);if(!fresh.length){toast(day.done?'字库里的字都学过啦，可以再次测试巩固。':'先完成当前这组认读，再继续学习。');break;}queue=[];practice=null;save();render();open(head('继续学习下一组')+'<p>这次新学 '+fresh.length+' 个字，按教材顺序继续。完成后计入今天的学习记录，不提前增加学习天数。明天会复习今天学过的字，并安排新的汉字。</p><div class="review-chips">'+fresh.map(c=>'<button class="chip" data-speak="'+c+'，'+info(c).word+'">'+c+'</button>').join('')+'</div><div class="modal-actions"><button class="primary" data-action="begin">开始认读 →</button></div>');break;}case 'history-practice':practiceBegin('history',b.dataset.date);break;case 'practice-begin':practiceBegin();break;case 'practice-right':practiceAnswer(true);break;case 'practice-wrong':practiceAnswer(false);break;case 'practice-next':practiceNext();break;case 'learn-all':introduction();break;case 'begin':begin();break;case 'right':answer(true);break;case 'wrong':answer(false);break;case 'next':next();break;case 'sentence':sentence();break;case 'library':dialog.close();view='library';render();break;case 'export':{const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='汉字小芽-'+key+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);break;}case 'import':$('#import-file').click();break;case 'reset-literacy':open(head('重置识字数？')+'<p>已认识的汉字将归零，并清除识字检查、复习进度和成长记录。每日新字数量会保留，今日任务将重新安排。'+(P.info().user?'重置也会同步到当前家长账号的云端记录。':'')+'</p><div class="modal-actions"><button class="secondary" data-action="cancel-reset-literacy">取消</button><button class="primary" data-action="confirm-reset-literacy">确认重置</button></div>');break;case 'cancel-reset-literacy':settings();break;case 'confirm-reset-literacy':key=L.dateKey();state=L.resetLiteracy(state);day=L.plan(state,key);queue=[];phase='';selected=new Set();pendingImport=null;save();dialog.close();render();toast('识字数已重置，可以从第一组开始学习。');break;case 'reset':open(head('清空学习记录？')+'<p>这会清空当前学习进度并恢复默认设置。'+(P.info().user?'清空也会同步到当前家长账号。':'')+'建议先导出备份。</p><div class="modal-actions"><button class="secondary" data-action="close">保留记录</button><button class="primary" data-action="confirm-reset">确认清空</button></div>');break;case 'confirm-reset':key=L.dateKey();state=L.empty();day=L.plan(state,key);queue=[];phase='';pendingImport=null;save();dialog.close();render();toast('记录已清空，可以重新开始。');break;}
  });
  document.addEventListener('input',e=>{if(e.target.id==='search'){search=e.target.value;const pos=e.target.selectionStart;render();$('#search').focus();$('#search').setSelectionRange(pos,pos);}});
  let pendingImport=null;
  document.addEventListener('submit',async e=>{
    if(e.target.id!=='cloud-auth-form')return;e.preventDefault();
    const form=e.target,username=form.querySelector('#cloud-username').value,password=form.querySelector('#cloud-password').value;
    const intent=e.submitter?.value||'signin';
    const buttons=[...form.querySelectorAll('button')];buttons.forEach(b=>b.disabled=true);
    const errorNode=form.querySelector('#cloud-auth-error');errorNode.textContent='正在连接账号…';
    try{
      if(intent==='signup')await P.signUp(username,password);else await P.signIn(username,password);
      dialog.close();toast(P.info().mode==='saved'?'进度已恢复并保存到云端。':'用户名已打开，进度会自动同步。');
    }catch(err){
      errorNode.textContent=/用户名|密码|管理员|云端进度|注册未完成/.test(err.message||'')?err.message:err.code==='PGRST202'?'用户名功能尚未初始化，请先执行新的数据库脚本。':'暂时无法连接，请稍后再试。';
    }finally{form.querySelector('#cloud-password').value='';buttons.forEach(b=>b.disabled=false);}
  });
  document.addEventListener('change',async e=>{if(e.target.id==='reading-font'){readingFont=e.target.value==='yahei'?'yahei':'song';document.documentElement.dataset.readingFont=readingFont;try{localStorage.setItem('hanzi-reading-font',readingFont);}catch(err){toast('字体已切换，但无法保存，下次打开需重新选择。');}return;}if(e.target.id==='book-filter'){book=e.target.value;render();return;}if(e.target.id!=='import-file'||!e.target.files[0])return;try{const data=JSON.parse(await e.target.files[0].text());if(!valid(data))throw Error();pendingImport=data;open(head('恢复备份？')+'<p>导入将替换当前学习记录。'+(P.info().user?'替换后的进度也会同步到当前家长账号。':'')+'</p><div class="modal-actions"><button class="secondary" data-action="close">取消</button><button class="primary" id="confirm-import">确认恢复</button></div>');$('#confirm-import').onclick=()=>{state=pendingImport;day=L.plan(state,key);queue=[];save();dialog.close();render();toast('进度已恢复。');};}catch(err){toast('备份格式不正确，请使用本项目导出的 JSON 文件。');}});
  $('#parent').onclick=settings;
  $('#parent-mobile').onclick=settings;
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)rollover();});
  setInterval(rollover,60000);
  P.subscribe(({type,data})=>{
    if(type==='data'){
      state=data;key=L.dateKey();day=L.plan(state,key);queue=[];phase='';selected=new Set();pendingImport=null;
      if(dialog.open)dialog.close();render();save();
    }
    updateStorageStatus();
  });
  P.start();
  window.addEventListener('online',()=>void P.refresh());
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)void P.refresh();});
  setInterval(()=>{if(P.info().user&&P.info().dirty&&!P.info().conflict)void P.refresh();},30000);
  save();render();updateStorageStatus();
})();
