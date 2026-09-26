/* LIX CITY v0.66 — Living City Layer */
(function(){
  const KEY='lixCityLivingV66';
  const npcDefs=[
    ['n1','🧑‍💼','Resident'],['n2','👩‍🦰','Resident'],['n3','🧑‍🔧','Worker'],['n4','🧒','Kid'],['n5','🧑‍🎨','Artist']
  ];
  function state(){
    if(!window.S)return {};
    S.cityLife=S.cityLife&&typeof S.cityLife==='object'?S.cityLife:{};
    if(!S.cityLife.mode)S.cityLife.mode='day';
    if(!Number.isFinite(Number(S.cityLife.visits)))S.cityLife.visits=0;
    return S.cityLife;
  }
  function cycle(){
    const s=state(); s.mode=s.mode==='day'?'sunset':s.mode==='sunset'?'night':'day';
    if(typeof save==='function')save(); apply(); toast('🌆 City time: '+s.mode); render();
  }
  function apply(){
    const s=state(),world=document.getElementById('cityWorld'); if(!world)return;
    world.classList.remove('city-day','city-sunset','city-night');world.classList.add('city-'+s.mode);
    const btn=document.getElementById('cityTimeBtn');if(btn)btn.textContent=s.mode==='day'?'☀️ Day':s.mode==='sunset'?'🌇 Sunset':'🌙 Night';
  }
  function visit(){
    const s=state();s.visits=(Number(s.visits)||0)+1;
    if(typeof addXP==='function')addXP(10); else addXP(10);
    if(typeof save==='function')save();toast('🏙️ City explored • +10 XP');
  }
  function render(){
    const host=document.getElementById('v66Living');if(!host||!window.S)return;
    state();
    host.innerHTML='<div class="v66-card"><div class="v66-head"><div><h3>🌆 Living City</h3><small>Explore, watch the city change, and keep your Lix moving.</small></div><button class="v66-time" id="cityTimeBtn" onclick="LixCityLife.cycle()"></button></div><div class="v66-actions"><button class="btn alt" onclick="LixCityLife.visit()">🗺️ Explore City <b>+10 XP</b></button><span class="v66-stat">Visits: '+Number(S.cityLife.visits||0)+'</span></div></div>';
    apply();
  }
  window.LixCityLife={cycle,visit,render,apply};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(render,900));
})();
