/* LIX CITY v0.73 — City Interaction Layer */
(function(){
  const DAY=86400000;
  function state(){
    window.S=window.S||{};
    S.cityInteraction=S.cityInteraction&&typeof S.cityInteraction==='object'?S.cityInteraction:{};
    return S.cityInteraction;
  }
  function rating(){
    const defs=typeof ensureCityBuilds==='function'?ensureCityBuilds():{};
    let points=Math.min(100,Number(S.level||1)*1.2);
    Object.keys(defs).forEach(k=>{if(k!=='house')points+=Math.min(8,Number(S.cityBuilds?.[k]?.level||0)*1.6)});
    points+=Math.min(12,Number(S.cityLife?.visits||0)*0.5);
    return Math.max(1,Math.min(100,Math.round(points)));
  }
  function focus(){
    const v=document.getElementById('cityViewport'),l=document.getElementById('worldLix');
    if(!v||!l)return;
    const left=Math.max(0,l.offsetLeft-v.clientWidth/2+l.offsetWidth/2);
    const top=Math.max(0,l.offsetTop-v.clientHeight/2+l.offsetHeight/2);
    v.scrollTo({left,top,behavior:'smooth'});
    l.classList.remove('lix-focus'); void l.offsetWidth; l.classList.add('lix-focus');
    if(typeof toast==='function')toast('🤖 Lix is here!');
  }
  function greet(){
    const s=state(),now=Date.now();
    if(now-Number(s.greetedAt||0)<DAY){focus();return;}
    s.greetedAt=now;
    if(typeof addXP==='function')addXP(5); else S.xp=(Number(S.xp)||0)+5;
    if(typeof save==='function')save();
    focus();
    if(typeof toast==='function')toast('🤖 Lix says hello! +5 XP');
  }
  function refresh(){
    const host=document.getElementById('v73CityTools'); if(!host)return;
    const r=rating();
    host.innerHTML=`<div class="v73-tools"><div class="v73-rating"><span>🏙️ City Rating</span><b>${r}/100</b><i><em style="width:${r}%"></em></i></div><button class="btn alt" onclick="LixCityInteraction.focus()">🎯 FOCUS LIX</button><button class="btn" onclick="LixCityInteraction.greet()">🤖 HELLO LIX</button></div>`;
  }
  function buildingPulse(type){
    const el=document.querySelector('.b-'+type); if(!el)return;
    el.classList.remove('city-pulse'); void el.offsetWidth; el.classList.add('city-pulse');
  }
  window.LixCityInteraction={rating,focus,greet,refresh,buildingPulse};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(refresh,700));
})();
