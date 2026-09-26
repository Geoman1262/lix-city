/* LIX CITY v2.9.1 repair
   1) Repairs saves that were marked cumulative while still containing per-level XP.
   2) Keeps total XP cumulative forever.
*/
(()=>{
  'use strict';
  const KEY='lixcity_player_save_v1';
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}}
  function write(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}}
  function need(l){return Math.round(500*l+300*Math.pow(Math.max(0,l-1),1.35))}
  function threshold(level){let t=0;for(let l=1;l<level;l++)t+=need(l);return t}
  const s=read();
  if(s && typeof s==='object'){
    const level=Math.max(1,Number(s.level)||1);
    const xp=Math.max(0,Number(s.xp)||0);
    const minForLevel=threshold(level);
    // Previous builds could set xpCumulative=true before converting an old per-level value.
    if(s.xpCumulative===true && level>1 && xp<minForLevel){
      s.xp=minForLevel+xp;
      write(s);
    }
  }
  window.LIX291={repair:true};
})();
