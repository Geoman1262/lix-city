/* LIX CITY v1.8 — Mega Content Hub */
(function(){
  const C=()=>window.LixV18Content||{catalog:[],events:[],achievements:[]};
  function ensure(){
    S.v18=S.v18||{}; S.v18.owned=Array.isArray(S.v18.owned)?S.v18.owned:[];
    S.v18.equipped=S.v18.equipped&&typeof S.v18.equipped==='object'?S.v18.equipped:{};
    S.v18.events=S.v18.events&&typeof S.v18.events==='object'?S.v18.events:{};
    S.v18.ach=Array.isArray(S.v18.ach)?S.v18.ach:[];
    S.v18.claimedGoals=Array.isArray(S.v18.claimedGoals)?S.v18.claimedGoals:[];
    S.v18.visits=Number(S.v18.visits)||0; S.v18.games=Number(S.v18.games)||0;
    return S.v18;
  }
  function persist(){save();}
  const goals=[
    ['level5','Reach Level 5','⭐',()=>S.level>=5,150],['coins500','Hold 500 Coins','🪙',()=>S.coins>=500,100],['coins1000','Hold 1000 Coins','💰',()=>S.coins>=1000,200],['custom5','Own 5 styles','👕',()=>ensure().owned.length>=5,150],['pet5','Pet Level 5','🐾',()=>Number(S.pet||1)>=5,200],['city5','Collect 5 city coins','🏙️',()=>Array.isArray(S.city?.collected)&&S.city.collected.length>=5,100],['event100','Earn 100 event points','🎉',()=>Number(S.v57?.eventPoints||0)>=100,150],['visit1','Visit a city','🌐',()=>ensure().visits>=1,100]
  ];
  function open(){ensure();shell(`<section class="v18-hero"><div><small>LIX CITY 1.8</small><h1>🚀 LIX HUB</h1><p>More content. More goals. More reasons to play.</p></div><div class="v18-level">Lv.${S.level}<span>Player</span></div></section>
    <section class="v18-grid"><button onclick="LixV18.catalog()"><b>👕</b><span>Style Catalog</span><small>${C().catalog.length} standard items</small></button><button onclick="LixV18.events()"><b>🎉</b><span>Event Center</span><small>${C().events.length} event templates</small></button><button onclick="LixV18.achievements()"><b>🏆</b><span>Achievements</span><small>${C().achievements.length} achievements</small></button><button onclick="LixV18.goals()"><b>🎯</b><span>City Goals</span><small>8 long-term goals</small></button></section>
    <section class="card"><div class="title"><h2>📊 Lix Hub Stats</h2><small>Saved locally</small></div><div class="v18-stats"><div><b>${ensure().owned.length}</b><span>Styles</span></div><div><b>${ensure().visits}</b><span>Visits</span></div><div><b>${S.v57?.eventPoints||0}</b><span>Event Pts</span></div><div><b>${ensure().ach.length}</b><span>Achievements</span></div></div></section>`, 'more');}
  function catalog(){ensure();const q=window.v18filter||'all';const arr=C().catalog.filter(x=>q==='all'||x.cat===q);shell(`<section class="card"><div class="title"><h2>👕 Style Catalog 1.8</h2><small>${ensure().owned.length}/${C().catalog.length} owned</small></div><div class="v18-tabs">${['all','top','shoe','acc','effect'].map(k=>`<button class="${q===k?'on':''}" onclick="LixV18.filter('${k}')">${k==='all'?'All':k==='top'?'Tops':k==='shoe'?'Shoes':k==='acc'?'Accessories':'Effects'}</button>`).join('')}</div><div class="v18-items">${arr.map(x=>{const own=ensure().owned.includes(x.id),can=S.level>=x.lv;return `<article class="v18-item ${!can?'locked':''}"><div class="v18-icon">${x.icon}</div><div><b>${x.name}</b><small>Lv.${x.lv} • ${x.rarity}</small></div>${own?`<button class="owned" disabled>OWNED</button>`:can?`<button onclick="LixV18.buy('${x.id}')">${x.cost} 🪙</button>`:`<button disabled>Lv.${x.lv}</button>`}</article>`}).join('')}</div></section>`, 'more');}
  function buy(id){ensure();const x=C().catalog.find(a=>a.id===id);if(!x)return;if(S.level<x.lv){toast('🔒 Unlocks at Level '+x.lv);return}if(ensure().owned.includes(id)){toast('Already owned');return}if(!spend(x.cost))return;ensure().owned.push(id);addXP(Math.min(50,Math.round(x.cost/10)));toast('✨ '+x.name+' added to your collection');catalog();}
  function events(){ensure();shell(`<section class="card"><div class="title"><h2>🎉 Event Center</h2><small>Limited content framework</small></div><p class="muted">Events can rotate their styles, objectives and rewards without changing the core game.</p></section>${C().events.map(e=>{const d=ensure().events[e.id]||{points:0,claimed:false};return `<section class="card v18-event"><div class="title"><h2>${e.icon} ${e.name}</h2><span class="badge ${d.active?'now':''}">${d.active?'ACTIVE':'READY'}</span></div><p>${e.styles.map(s=>`<span class="v18-chip">${s}</span>`).join('')}</p><div class="v18-event-row"><span>Event Points <b>${d.points||0}</b></span><button onclick="LixV18.startEvent('${e.id}')">${d.active?'ACTIVE':'START PREVIEW'}</button></div><small>Reward pool: ${e.reward} XP</small></section>`}).join('')}`,'more');}
  function startEvent(id){ensure();ensure().events[id]={...(ensure().events[id]||{}),active:true,points:Number(ensure().events[id]?.points)||0};persist();toast('🎉 Event activated: '+id);events();}
  function achievements(){
    ensure();
    const a=C().achievements;
    const scroll=Number(window.scrollY||document.documentElement.scrollTop||0);
    const rows=a.map(x=>{const id=x[0],done=ensure().ach.includes(id),ok=achievementOK(x);return `<div class="v18-ach ${done?'done':''}" data-ach="${id}"><div class="v18-ach-icon">${x[2]}</div><div class="v18-ach-copy"><b>${x[1]}</b><small>${x[3]}</small></div>${done?'<span class="ach-done">✓</span>':ok?`<button onclick="LixV18.claimAch('${id}')">CLAIM +${x[5]} XP</button>`:'<span class="ach-lock">🔒</span>'}</div>`}).join('');
    shell(`<section class="card v18-ach-page">
      <div class="title"><h2>🏆 Achievements</h2><small>${ensure().ach.length}/${a.length}</small></div>
      <div class="ach-player"><img src="lix.png" alt="Lix"><div><b>PLAYER • LEVEL ${S.level}</b><small>⭐ ${S.xp} XP • 🪙 ${S.coins} Coins • ⚡ ${S.energy}/${S.maxEnergy}</small></div></div>
      <div class="ach-summary"><b>${ensure().ach.length}</b><span>completed</span><i></i><b>${a.length-ensure().ach.length}</b><span>remaining</span></div>
      <div id="achievementsList">${rows}</div>
    </section>`,'more');
    requestAnimationFrame(()=>window.scrollTo(0,scroll));
  }
  function achievementOK(x){const id=x[0];if(id==='first_game')return Number(S.v57?.totalPlays||0)>=1;if(id==='city_explorer')return (S.city?.collected||[]).length>=5;if(id==='collector')return ensure().owned.length>=5;if(id==='pet_friend')return Number(S.petPlayed||0)>0;if(id==='builder')return S.level>=5;if(id==='game_master')return Number(S.game?.target||1)>=3;if(id==='rich_city')return S.coins>=1000;if(id==='streak')return Number(S.streakDay||0)>=7;if(id==='event_runner')return Number(S.v57?.eventPoints||0)>=100;if(id==='social')return ensure().visits>=1;if(id==='pet_level')return Number(S.pet||1)>=5;if(id==='prestige_ready')return S.level>=50;return false;}
  function claimAch(id){
    ensure();
    const x=C().achievements.find(a=>a[0]===id);
    if(!x||ensure().ach.includes(id)||!achievementOK(x))return;
    const keepY=Number(window.scrollY||document.documentElement.scrollTop||0);
    ensure().ach.push(id);
    addXP(x[5]);
    toast('🏆 Achievement unlocked! +'+x[5]+' XP');
    achievements();
    requestAnimationFrame(()=>window.scrollTo(0,keepY));
  }
  function goalsPage(){ensure();shell(`<section class="card"><div class="title"><h2>🎯 City Goals</h2><small>Long-term progression</small></div>${goals.map(g=>{const done=ensure().claimedGoals.includes(g[0]),ok=g[3]();return `<div class="v18-goal"><span class="goal-icon">${g[2]}</span><div><b>${g[1]}</b><small>${ok?'Ready to claim':'Keep playing'}</small></div>${done?'<span class="badge now">DONE</span>':ok?`<button onclick="LixV18.claimGoal('${g[0]}')">CLAIM +${g[4]} XP</button>`:'<span class="badge">IN PROGRESS</span>'}</div>`}).join('')}</section>`,'more');}
  function claimGoal(id){ensure();const g=goals.find(x=>x[0]===id);if(!g||ensure().claimedGoals.includes(id)||!g[3]())return;ensure().claimedGoals.push(id);addXP(g[4]);toast('🎯 Goal complete! +'+g[4]+' XP');goalsPage();}
  window.LixV18={open,catalog,events,achievements,goals:goalsPage,buy,startEvent,claimAch,claimGoal,filter:k=>{window.v18filter=k;catalog()}};
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{const m=document.querySelector('.wrap');if(m&&!document.getElementById('v18Launcher')){const b=document.createElement('button');b.id='v18Launcher';b.className='btn';b.textContent='🚀 OPEN LIX HUB 1.8';b.onclick=()=>LixV18.open();document.body.appendChild(b)}},900)});
})();
