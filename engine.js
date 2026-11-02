(function (global) {
 'use strict';
 const normalize = value => String(value).normalize('NFKC').trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ').replace(/[.!?]+$/,'');
 function shuffle(items, random=Math.random) { const out=[...items]; for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out; }
 function available(bank,unit,focus){return bank.filter(q=>(unit==='all'||q.unit===Number(unit))&&(focus==='all'||q.category===focus));}
 function pick(bank,{unit='all',focus='all',length='2'}={}){
  const pool=available(bank,unit,focus); if(length==='all')return shuffle(pool);
  const groups=[...new Set(pool.map(q=>q.lesson))].map(id=>pool.filter(q=>q.lesson===id));
  const n=Number(length);let required=[];
  if(focus==='all'){
   const tokens=new Set(['type:mc','type:tf','type:fix','category:Vocabulary','category:Grammar','category:Content']);
   function cover(selected,missing){
    if(!missing.size)return selected;
    const candidates=shuffle(pool).filter(q=>!selected.includes(q)&&selected.filter(x=>x.lesson===q.lesson).length<n);
    const token=[...missing].sort((a,b)=>candidates.filter(q=>a===`type:${q.type}`||a===`category:${q.category}`).length-candidates.filter(q=>b===`type:${q.type}`||b===`category:${q.category}`).length)[0];
    for(const q of candidates.filter(q=>token===`type:${q.type}`||token===`category:${q.category}`)){
     const rest=new Set(missing);rest.delete(`type:${q.type}`);rest.delete(`category:${q.category}`);
     const result=cover([...selected,q],rest);if(result)return result;
    }
    return null;
   }
   required=cover([],tokens)||[];
  }
  const chosen=groups.flatMap(group=>{const forced=required.filter(q=>q.lesson===group[0].lesson);return [...forced,...shuffle(group.filter(q=>!forced.includes(q))).slice(0,Math.max(0,n-forced.length))];});
  return shuffle(chosen);
 }
 function correct(q,value){return (q.accepted||[q.answer]).some(answer=>normalize(answer)===normalize(value));}
 function score(records){let goals=0,xp=0,streak=0,best=0; for(const r of records){if(r.correct){goals++;streak++;best=Math.max(best,streak);xp+=100+Math.min(streak-1,4)*25;}else streak=0;}return {goals,saves:records.length-goals,xp,streak,best,accuracy:records.length?Math.round(goals/records.length*100):0};}
 function breakdown(records){return ['Vocabulary','Grammar','Content'].map(category=>{const rows=records.filter(r=>r.category===category);return {category,total:rows.length,correct:rows.filter(r=>r.correct).length};});}
 function report(state){const s=score(state.records),p=state.player;return [
  'PENALTY ARENA | CONNECT PLUS PRIMARY 5',
  'Designed & programmed by Mr.Mohamed Farid',
  `Player: ${p.name} | Class: ${p.class}`,
  `Student number: ${p.number||'Not supplied'} | School: ${p.school||'Not supplied'}`,
  `Attempt: ${state.attemptId}${state.practice?' | Retry practice (separate attempt)':''}`,
  `Date: ${new Date(state.started).toLocaleString('en-GB',{timeZone:'Asia/Riyadh'})} (Riyadh)`,
  `Scope: ${state.scope} | ${state.records.length} questions | ${new Set(state.records.map(r=>r.lesson)).size} lessons`,
  `Goals: ${s.goals}/${state.records.length} | Accuracy: ${s.accuracy}% | XP: ${s.xp} | Best streak: ${s.best}`,
  `Active time: ${Math.floor(state.elapsed/60)}m ${state.elapsed%60}s`,
  'Skills: '+breakdown(state.records).map(x=>`${x.category} ${x.correct}/${x.total}`).join(' | '),
  'Browser-generated practice report. First-attempt answers in this match.',
  '',...state.records.flatMap((r,i)=>[
    `${i+1}. [${r.correct?'GOAL':'SAVED'}] ${r.id} | ${r.category} | pp. ${r.pages}`,
    r.prompt,`Your answer: ${r.value}`,`Correct answer: ${r.answer}`,`Why: ${r.explanation}`,''
  ])].join('\n');}
 function splitReport(full,max=2600){const lines=full.split('\n');const parts=[];let part='';for(const line of lines){if((part+'\n'+line).length>max&&part){parts.push(part);part='';}part+=(part?'\n':'')+line;}if(part)parts.push(part);return parts.map((p,i)=>`PENALTY ARENA — REPORT PART ${i+1}/${parts.length}\n${p}`);}
 const api={normalize,shuffle,available,pick,correct,score,breakdown,report,splitReport};
 global.ArenaEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
