/* LIX CITY v1.0 — Major Build Core
   Adds a unified dashboard layer without resetting the existing player save. */
(function(){
  const KEY='lixcity_v1_major';
  const defs=[
    ['🏙️','City','Explore and develop your city','city',1],
    ['🏠','House','Rooms, furniture and Home Rating','house',1],
    ['🎮','Games','Target, Runner and Catch & Bomb','games',1],
    ['🐾','Pets','Stable, care and companions','pets',20],
    ['🛍️','Cellix Store','Cellix products and shop links','more',4],
    ['🎯','Missions','Daily missions and streak progress','home',1],
    ['🎡','Daily Spin','One reward every 24 hours','more',1],
    ['🏆','Leaderboard','Global and country foundation','more',10]
  ];
  function data(){
    if(!window.S)return {};
    S.v1=S.v1&&typeof S.v1==='object'?S.v1:{};
    S.v1.visits=Number(S.v1.visits)||0;
    S.v1.lastBonus=Number(S.v1.lastBonus)||0;
    S.v1.cityActions=Number(S.v1.cityActions)||0;
    S.v1.gameSessions=Number(S.v1.gameSessions)||0;
    return S.v1;
  }
  function persist(){try{if(typeof save==='function')save()}catch(e){}}
  function cityScore(){
    const lvl=Number(S.level)||1;
    const b=S.cityBuild||S.buildings||{};
    let buildingLevels=0;
    if(b&&typeof b==='object') Object.keys(b).forEach(k=>{buildingLevels+=Number(b[k]?.level||b[k])||0});
    const dev=S.cityDev||{};
    let devLevels=0; if(dev&&typeof dev==='object')Object.keys(dev).forEach(k=>devLevels+=Number(dev[k])||0);
    return Math.min(100,Math.round(Math.min(50,lvl*1.2)+Math.min(30,buildingLevels*2)+Math.min(20,devLevels*2)));
  }
  function homeRating(){
    const furniture=S.houseInterior?.owned||S.homeFurniture||S.furniture||[];
    const n=Array.isArray(furniture)?furniture.length:Number(S.homeFurnitureCount)||0;
    return Math.min(100,Math.round(20+Math.min(50,n*8)+Math.min(30,(Number(S.house)||1)*0.6)));
  }
  function petInfo(){
    const p=Number(S.pet)||1;
    return p>=20?'Stable unlocked':('Unlocks at Level 20');
  }
  function reward(){
    const d=data(), now=Date.now();
    if(now-d.lastBonus<86400000){toast('🎁 Daily v1 Bonus is already claimed');return;}
    d.lastBonus=now; S.coins=(Number(S.coins)||0)+25;
    if(typeof addXP==='function') addXP(10); else addXP(10);
    persist(); toast('🎁 v1 Daily Bonus: +25 Coins +10 XP');
    renderHub();
  }
  function renderHub(){
    const host=document.getElementById('v1Hub'); if(!host||!window.S)return;
    const d=data(), lvl=Number(S.level)||1, xp=Number(S.xp)||0, next=typeof need==='function'?need(lvl):500;
    const score=cityScore(), home=homeRating();
    const spinReady=Date.now()-(Number(S.lastSpin)||0)>=86400000;
    host.innerHTML=`
      <section class="v1-hub">
        <div class="v1-hub-head"><div><div class="v1-kicker">LIX CITY • MAJOR BUILD</div><h2>Your City Command Center</h2><p>Build • Play • Earn • Progress</p></div><div class="v1-level"><small>PLAYER</small><b>${lvl}</b></div></div>
        <div class="v1-xp"><div><b>XP Progress</b><span>${xp} / ${next} XP</span></div><i><em style="width:${Math.min(100,Math.round(xp/Math.max(1,next)*100))}%"></em></i></div>
        <div class="v1-metrics"><div><b>🏙️</b><strong>${score}</strong><small>City Score</small></div><div><b>🏠</b><strong>${home}</strong><small>Home Rating</small></div><div><b>⚡</b><strong>${S.energy}/${S.maxEnergy}</strong><small>Energy</small></div><div><b>🪙</b><strong>${S.coins}</strong><small>Coins</small></div></div>
        <div class="v1-actions"><button onclick="show('city')">🏙️ Enter City</button><button onclick="show('games')">🎮 Play</button><button onclick="show('pets')">🐾 Pets</button><button onclick="show('more')">☰ More</button></div>
        <div class="v1-systems"><div class="v1-section-title"><b>Systems</b><span>v1.0</span></div><div class="v1-system-grid">${defs.map(d=>{const locked=lvl<d[4];return `<button class="v1-system ${locked?'locked':''}" ${locked?'disabled':''} onclick="show('${d[3]}')"><span>${d[0]}</span><b>${d[1]}</b><small>${locked?'Unlock Lv. '+d[4]:d[2]}</small></button>`}).join('')}</div></div>
        <div class="v1-daily"><div><b>🎁 Daily v1 Bonus</b><small>+25 Coins +10 XP</small></div><button onclick="LixV1.claimBonus()" ${Date.now()-d.lastBonus<86400000?'disabled':''}>${Date.now()-d.lastBonus<86400000?'CLAIMED':'CLAIM'}</button></div>
        <div class="v1-goals"><div><b>Next goals</b><span>${lvl<2?'Reach Level 2 to open Game Center':lvl<4?'Reach Level 4 to open Cellix Store':lvl<20?'Reach Level 20 to open Stable':'Reach Level 30 to enter Social Cities'}</span></div><div class="v1-ready">${spinReady?'🎡 Spin ready':'⏱️ Daily Spin cooling down'}</div></div>
      </section>`;
  }
  const oldHome=window.home;
  if(typeof oldHome==='function'){
    window.home=function(){oldHome.apply(this,arguments);setTimeout(function(){
      const wrap=document.querySelector('.wrap'); if(!wrap)return;
      let h=document.getElementById('v1Hub'); if(!h){h=document.createElement('div');h.id='v1Hub';wrap.insertBefore(h,wrap.firstChild)}
      renderHub(); data().visits++; persist();
    },0)};
  }
  window.LixV1={render:renderHub,claimBonus:reward,cityScore,homeRating};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{if(typeof window.LixV1.render==='function' && document.querySelector('.wrap')){let h=document.getElementById('v1Hub');if(!h){h=document.createElement('div');h.id='v1Hub';document.querySelector('.wrap').insertBefore(h,document.querySelector('.wrap').firstChild)}renderHub()}},900));
})();
