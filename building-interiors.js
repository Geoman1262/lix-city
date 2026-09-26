/* LIX CITY v0.68 — Interactive Building Systems */
(function(){
  const defs={
    house:{req:1,icon:'🏠',name:'Lix House',tag:'Home & progression',desc:'The heart of your city. House Level = Player Level.',action:'house'},
    center:{req:2,icon:'🎮',name:'Game Center',tag:'Mini-games',desc:'Play the three core challenges and track their progress.',action:'games'},
    store:{req:4,icon:'🏪',name:'Cellix Store',tag:'Cellix',desc:'Admin-managed Cellix offers.',action:'shop'},
    park:{req:7,icon:'🌳',name:'Lix Park',tag:'City life',desc:'A daily walk with Lix.',action:'park'},
    energy:{req:8,icon:'⚡',name:'Energy Station',tag:'Energy',desc:'Restore Energy with Coins.',action:'energy'},
    workshop:{req:12,icon:'🛠️',name:'Lix Workshop',tag:'Upgrades',desc:'Upgrade your three mini-games.',action:'workshop'},
    market:{req:15,icon:'🏬',name:'Lix Market',tag:'City',desc:'Develop roads, lights, green spaces and services.',action:'market'},
    studio:{req:18,icon:'🎨',name:'Lix Studio',tag:'Customization',desc:'Customize Lix and your home.',action:'studio'},
    stable:{req:20,icon:'🐾',name:'Lix Stable',tag:'Pets',desc:'Feed, play with and name your companion.',action:'stable'},
    plaza:{req:25,icon:'🏙️',name:'Lix Plaza',tag:'Social',desc:'Prepare for city visits and social play.',action:'plaza'},
    arena:{req:40,icon:'🏆',name:'Lix Arena',tag:'Endgame',desc:'Leaderboard-focused endgame space.',action:'arena'}
  };
  const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const toastSafe=t=>{if(typeof toast==='function')toast(t)};
  const saveSafe=()=>{if(typeof save==='function')save()};
  const xp=n=>{if(typeof addXP==='function')addXP(n);else addXP(n)};
  const close=()=>document.getElementById('cityPanel')?.classList.remove('show');
  function state(type){const d=defs[type]||defs.house;return {d,unlocked:Number(S?.level||1)>=d.req,lv:Number(S?.cityBuilds?.[type]?.level||1)}}
  function shell(body){const p=document.getElementById('cityPanel');if(!p)return;p.innerHTML=`<div class="v68-modal"><button class="v68-close" onclick="LixBuildingInteriors.close()">×</button>${body}</div>`;p.classList.add('show')}
  function nav(label,fn){return `<button class="v68-btn" onclick="${fn}">${label}</button>`}
  function energy(){if(Number(S.coins||0)<250)return toastSafe('🪙 You need 250 Coins');if(Number(S.energy||0)>=Number(S.maxEnergy||10))return toastSafe('⚡ Energy is already full');S.coins-=250;S.energy=Math.min(Number(S.maxEnergy||10),Number(S.energy||0)+3);saveSafe();toastSafe('⚡ +3 Energy');open('energy')}
  function park(){S.cityLife=S.cityLife&&typeof S.cityLife==='object'?S.cityLife:{};const now=Date.now();if(now-Number(S.cityLife.parkVisit||0)<86400000)return toastSafe('🌳 Park visit available again tomorrow');S.cityLife.parkVisit=now;xp(15);saveSafe();toastSafe('🌳 Park visit • +15 XP');open('park')}
  function upgradeGame(id,name){
    S.gameUp=S.gameUp||{}; const cur=Number(S.gameUp[id]||1); if(cur>=5)return toastSafe('⭐ '+name+' is already MAX');
    const cost=[0,250,500,900,1400][cur]||1400; if(Number(S.coins||0)<cost)return toastSafe('🪙 Need '+cost+' Coins');
    S.coins-=cost;S.gameUp[id]=cur+1;xp(20);saveSafe();toastSafe('⬆️ '+name+' Upgrade '+(cur+1));open('workshop')
  }
  function petFeed(){if(Number(S.coins||0)<20)return toastSafe('🪙 Need 20 Coins');S.coins-=20;S.petData=S.petData||{name:'Lix Pet',petLevel:1};S.petData.petLevel=Math.min(10,Number(S.petData.petLevel||1)+1);S.petData.food=(Number(S.petData.food)||0)+1;xp(8);saveSafe();toastSafe('🍖 Pet Level '+S.petData.petLevel);open('stable')}
  function petName(){const current=S.petData?.name||'Lix Pet';const n=prompt('Name your pet:',current);if(n&&n.trim()){S.petData=S.petData||{};S.petData.name=n.trim().slice(0,18);saveSafe();open('stable');toastSafe('🐾 Pet named '+S.petData.name)}}
  function plaza(){if(Number(S.level||1)<30)return toastSafe('🏙️ Social City unlocks at Level 30');S.cityLife=S.cityLife||{};S.cityLife.plazaVisits=(Number(S.cityLife.plazaVisits)||0)+1;xp(10);saveSafe();toastSafe('🏙️ Plaza visit • +10 XP');open('plaza')}
  function arena(){if(Number(S.level||1)<40)return toastSafe('🏆 Arena unlocks at Level 40');shell(`<div class="v68-icon">🏆</div><h2>Lix Arena</h2><div class="v68-pill">ENDGAME</div><p>Leaderboard systems are available from Player Level 10. Arena content is being expanded here.</p><div class="v68-grid"><div><b>🏆 Leaderboard</b><span>${Number(S.level)>=10?'Unlocked':'Locked'}</span></div><div><b>⭐ Player Level</b><span>${S.level}</span></div></div>${nav('OPEN LEADERBOARDS',"LixBuildingInteriors.close();show('more')")}`)}
  function house(){const lv=Number(S.house||S.level||1),stage=Math.max(1,Math.floor(lv/5)*5||1);shell(`<div class="v68-icon">🏠</div><h2>Lix House</h2><div class="v68-feature"><b>House Level ${lv}</b><span>Stage ${stage}</span></div><div class="v68-grid"><div><b>⭐ XP</b><span>${S.xp}</span></div><div><b>🪙 Coins</b><span>${S.coins}</span></div><div><b>⚡ Energy</b><span>${S.energy}/${S.maxEnergy}</span></div><div><b>🏙️ City</b><span>Level ${S.level}</span></div></div><p>Every 5 House Levels changes the House exterior. Level 6+ opens deeper home customization.</p>${nav('OPEN HOME',"LixBuildingInteriors.close();show('home')")}`)}
  function games(){const ids=[['target','🎯','Lix Target'],['runner','🏃','Lix Runner'],['catch','🪙💣','Catch & Bomb']];const rows=ids.map(([id,ic,n])=>{const lv=Number(S.game?.[id]||S.gameLevels?.[id]||1),up=Number(S.gameUp?.[id]||1);return `<div class="v68-row"><div><b>${ic} ${n}</b><small>Game Lv ${lv} • Upgrade ${up}</small></div><button class="v68-small" onclick="LixBuildingInteriors.play('${id}')">PLAY</button></div>`}).join('');shell(`<div class="v68-icon">🎮</div><h2>Game Center</h2><p>Choose a challenge. Energy is shared across all three games.</p>${rows}${nav('OPEN FULL GAMES',"LixBuildingInteriors.close();show('games')")}`)}
  function play(id){close();if(id==='target'&&typeof targetGame==='function')targetGame();else if(id==='runner'&&typeof runnerGame==='function')runnerGame();else if(id==='catch'&&typeof catchGame==='function')catchGame();else show('games')}
  function workshop(){const ids=[['target','🎯','Lix Target'],['runner','🏃','Lix Runner'],['catch','🪙💣','Catch & Bomb']];const rows=ids.map(([id,ic,n])=>{const up=Number(S.gameUp?.[id]||1),cost=up<5?[0,250,500,900,1400][up]:0;return `<div class="v68-row"><div><b>${ic} ${n}</b><small>Upgrade ${up}/5 • ${up>=5?'MAX':'Next: '+cost+' Coins'}</small></div><button class="v68-small" ${up>=5?'disabled':''} onclick="LixBuildingInteriors.upgrade('${id}','${n.replace(/'/g,"\\'")}')">${up>=5?'MAX':'UPGRADE'}</button></div>`}).join('');shell(`<div class="v68-icon">🛠️</div><h2>Lix Workshop</h2><p>Upgrade the games to improve their progression bonus.</p>${rows}`)}
  function stable(){const pd=S.petData||{name:'Lix Pet',petLevel:1};const ready=Date.now()-Number(S.petPlayed||0)>=86400000;shell(`<div class="v68-icon">🐾</div><h2>Lix Stable</h2><div class="v68-feature"><b>${esc(pd.name||'Lix Pet')}</b><span>Pet Level ${Number(pd.petLevel||1)}/10</span></div><div class="v68-grid"><div><b>🍖 Food</b><span>${Number(pd.food||0)}</span></div><div><b>❤️ Daily Play</b><span>${ready?'READY':'TOMORROW'}</span></div></div><div class="v68-actions">${nav('🍖 FEED • 20 COINS','LixBuildingInteriors.feed()')}${nav('✏️ RENAME PET','LixBuildingInteriors.namePet()')}${nav(ready?'❤️ PLAY WITH PET':'❤️ PLAY TOMORROW',ready?'LixBuildingInteriors.playPet()':'void(0)')}</div>`)}
  function playPet(){if(Date.now()-Number(S.petPlayed||0)<86400000)return toastSafe('❤️ Pet play available tomorrow');S.petPlayed=Date.now();S.energy=Math.min(Number(S.maxEnergy||10),Number(S.energy||0)+1);xp(25+Number(S.petData?.petLevel||1)*5);saveSafe();toastSafe('❤️ Happy Pet! +1 Energy');open('stable')}
  function market(){close();if(typeof show==='function')show('city');toastSafe('🏬 City Management opened')}
  function studio(){close();if(typeof show==='function')show('home');toastSafe('🎨 Customization is in Home')}
  function shop(){close();if(typeof show==='function')show('home');setTimeout(()=>document.querySelector('.cellix-shop-card')?.scrollIntoView({behavior:'smooth',block:'center'}),250);toastSafe('🛍️ Cellix Shop opened')}
  function open(type){const {d,unlocked,lv}=state(type);if(!unlocked){shell(`<div class="v68-icon">${d.icon}</div><h2>${d.name}</h2><div class="v68-lock">🔒 Unlocks at Player Level ${d.req}</div><p>${d.desc}</p><div class="v68-feature"><b>Current Player Level</b><span>${S.level}</span></div>`);return}switch(type){case'house':return house();case'center':return games();case'workshop':return workshop();case'stable':return stable();case'park':return park();case'energy':return shell(`<div class="v68-icon">⚡</div><h2>Energy Station</h2><div class="v68-feature"><b>${S.energy}/${S.maxEnergy} Energy</b><span>+3 for 250 Coins</span></div>${nav('⚡ RESTORE 3 ENERGY','LixBuildingInteriors.energy()')}`);case'market':return market();case'studio':return studio();case'shop':return shop();case'plaza':return plaza();case'arena':return arena();default:return house()}}
  function upgradeBuildingUI(type){
    if(type==='house') return toastSafe('🏠 House level follows your Player Level');
    if(typeof upgradeBuilding==='function') return upgradeBuilding(type);
    const cfg=(typeof ensureCityBuilds==='function'?ensureCityBuilds():{})[type];
    if(!cfg)return toastSafe('Building data unavailable');
    const lv=Number(S.cityBuilds?.[type]?.level||0),cost=typeof buildingCost==='function'?buildingCost(type):0;
    if(Number(S.level||1)<Number(cfg.req||1))return toastSafe('🔒 Unlocks at Level '+cfg.req);
    if(lv>=Number(cfg.max||5))return toastSafe('⭐ '+cfg.name+' is MAX');
    if(Number(S.coins||0)<cost)return toastSafe('🪙 Need '+cost+' Coins');
    S.coins-=cost;S.cityBuilds=S.cityBuilds||{};S.cityBuilds[type]=S.cityBuilds[type]||{};S.cityBuilds[type].level=lv+1;
    xp(Math.max(20,Math.round(cost/100)));saveSafe();toastSafe(cfg.icon+' '+cfg.name+' upgraded to Lv.'+(lv+1));open(type);
  }
  function houseActivity(){
    const last=Number(S.buildingActivities?.house||0);
    if(Date.now()-last<86400000)return toastSafe('🏠 Home activity available tomorrow');
    if(Number(S.coins||0)<100)return toastSafe('🪙 Need 100 Coins');
    S.coins-=100;S.buildingActivities=S.buildingActivities||{};S.buildingActivities.house=Date.now();S.homeProgress=(Number(S.homeProgress)||0)+1;
    xp(20);saveSafe();toastSafe('🏠 Home upgraded • +20 XP');open('house');
  }
  function marketActivity(){
    const last=Number(S.buildingActivities?.market||0);
    if(Date.now()-last<86400000)return toastSafe('🏬 Market activity available tomorrow');
    if(Number(S.coins||0)<300)return toastSafe('🪙 Need 300 Coins');
    S.coins-=300;S.buildingActivities=S.buildingActivities||{};S.buildingActivities.market=Date.now();
    if(typeof upgradeBuilding==='function' && typeof buildingCost==='function' && Number(S.level||1)>=15){
      // Activity is separate from building upgrade: it develops the city economy track.
      S.marketProgress=(Number(S.marketProgress)||0)+1;
    }
    xp(30);saveSafe();toastSafe('🏬 Market run complete • +30 XP');open('market');
  }
  function studioActivity(){
    const last=Number(S.buildingActivities?.studio||0);
    if(Date.now()-last<86400000)return toastSafe('🎨 Studio activity available tomorrow');
    if(Number(S.coins||0)<150)return toastSafe('🪙 Need 150 Coins');
    S.coins-=150;S.buildingActivities=S.buildingActivities||{};S.buildingActivities.studio=Date.now();S.styleProjects=(Number(S.styleProjects)||0)+1;
    xp(20);saveSafe();toastSafe('🎨 Style project complete • +20 XP');open('studio');
  }
  // Wrap selected interiors with a shared upgrade/action footer without replacing the existing systems.
  const _open=open;
  open=function(type){
    _open(type);
    const p=document.getElementById('cityPanel'); if(!p||!p.classList.contains('show'))return;
    const d=defs[type]||defs.house, lv=Number(S.cityBuilds?.[type]?.level||1), max=Number((typeof ensureCityBuilds==='function'?ensureCityBuilds():{})[type]?.max||5);
    const unlocked=Number(S.level||1)>=Number(d.req||1);
    if(!unlocked)return;
    const host=p.querySelector('.v68-modal'); if(!host)return;
    const upgrade=(type!=='house' && lv<max)?`<button class="v68-btn" onclick="LixBuildingInteriors.upgradeBuilding('${type}')">⬆️ UPGRADE BUILDING</button>`:'';
    let action='';
    if(type==='house')action=`<button class="v68-btn" onclick="LixBuildingInteriors.houseActivity()">🏠 HOME PROJECT • 100 🪙</button>`;
    if(type==='market')action=`<button class="v68-btn" onclick="LixBuildingInteriors.marketActivity()">🏬 MARKET RUN • 300 🪙</button>`;
    if(type==='studio')action=`<button class="v68-btn" onclick="LixBuildingInteriors.studioActivity()">🎨 CREATE STYLE • 150 🪙</button>`;
    if(type==='park')action=`<button class="v68-btn" onclick="LixBuildingInteriors.park()">🌳 DAILY PARK WALK</button>`;
    if(type==='plaza' && Number(S.level||1)>=30)action=`<button class="v68-btn" onclick="LixBuildingInteriors.plaza()">🏙️ SOCIAL CITY VISIT</button>`;
    if(type==='arena' && Number(S.level||1)>=40)action=`<button class="v68-btn" onclick="LixBuildingInteriors.arena()">🏆 OPEN ARENA</button>`;
    if(upgrade||action){
      const box=document.createElement('div');box.className='v68-actions';box.innerHTML=`<div class="v68-feature"><b>Building Level ${lv}/${max}</b><span>${type==='house'?'Player Level driven':'Upgrade progression'}</span></div>${upgrade}${action}`;host.appendChild(box);
    }
  };
  window.LixBuildingInteriors={open,close,energy,park,upgrade:upgradeGame,upgradeBuilding:upgradeBuildingUI,feed:petFeed,namePet:petName,playPet,play,houseActivity,marketActivity,studioActivity,plaza,arena};

  window.openBuilding=open;
})();
