/* LIX CITY v0.67 — Interactive Building Interiors */
(function(){
  const defs={
    house:{req:1,icon:'🏠',name:'Lix House',tag:'Home & customization',desc:'The heart of your city. Your House Level is your Player Level.',action:'home'},
    center:{req:2,icon:'🎮',name:'Game Center',tag:'Mini-games',desc:'Play the three core Lix challenges and improve their upgrades.',action:'games'},
    store:{req:4,icon:'🏪',name:'Cellix Store',tag:'Cellix',desc:'Open Cellix offers managed by the game admin.',action:'shop'},
    park:{req:7,icon:'🌳',name:'Lix Park',tag:'City life',desc:'A relaxing city zone with a once-a-day visit bonus.',action:'park'},
    energy:{req:8,icon:'⚡',name:'Energy Station',tag:'Energy',desc:'Manage your Energy and restore some Energy with Coins.',action:'energy'},
    workshop:{req:12,icon:'🛠️',name:'Lix Workshop',tag:'Upgrades',desc:'Improve your mini-games and make progression more efficient.',action:'workshop'},
    market:{req:15,icon:'🏬',name:'Lix Market',tag:'City',desc:'Manage your city development and unlock new city systems.',action:'market'},
    studio:{req:18,icon:'🎨',name:'Lix Studio',tag:'Customization',desc:'Your creative space for Lix style and city decoration.',action:'studio'},
    stable:{req:20,icon:'🐾',name:'Lix Stable',tag:'Pets',desc:'Care for your pets, buy food and play with your active companion.',action:'pets'},
    plaza:{req:25,icon:'🏙️',name:'Lix Plaza',tag:'Social',desc:'A central social zone. City visits become available from Level 30.',action:'plaza'},
    arena:{req:40,icon:'🏆',name:'Lix Arena',tag:'Endgame',desc:'Competitive city space with leaderboard-focused challenges.',action:'arena'}
  };
  function toastSafe(t){if(typeof toast==='function')toast(t);}
  function close(){document.getElementById('cityPanel')?.classList.remove('show');}
  function buildingState(type){
    const d=defs[type]||defs.house;
    const unlocked=Number(S?.level||1)>=d.req;
    const lv=Number(S?.cityBuilds?.[type]?.level||0);
    return {d,unlocked,lv};
  }
  function spendEnergy(){
    if(Number(S.coins||0)<250){toastSafe('🪙 You need 250 Coins');return;}
    if(Number(S.energy||0)>=Number(S.maxEnergy||10)){toastSafe('⚡ Energy is already full');return;}
    S.coins-=250;S.energy=Math.min(Number(S.maxEnergy||10),Number(S.energy||0)+3);if(typeof save==='function')save();toastSafe('⚡ +3 Energy');open('energy');
  }
  function parkVisit(){
    S.cityLife=S.cityLife&&typeof S.cityLife==='object'?S.cityLife:{};
    const now=Date.now(), last=Number(S.cityLife.parkVisit||0);
    if(now-last<86400000){toastSafe('🌳 Park visit available again tomorrow');return;}
    S.cityLife.parkVisit=now;if(typeof addXP==='function')addXP(15);else S.xp=(Number(S.xp)||0)+15;
    if(typeof save==='function')save();toastSafe('🌳 Park visit • +15 XP');open('park');
  }
  function actionButton(type,label){
    const d=defs[type];
    if(d.action==='games')return `<button class="v67-main" onclick="close();show('games')">🎮 PLAY GAMES</button>`;
    if(d.action==='shop')return `<button class="v67-main" onclick="close();show('home')">🛍️ OPEN CELLIX SHOP</button>`;
    if(d.action==='pets')return `<button class="v67-main" onclick="close();show('pets')">🐾 OPEN STABLE</button>`;
    if(d.action==='home')return `<button class="v67-main" onclick="close();show('home')">🏠 OPEN HOME</button>`;
    if(d.action==='energy')return `<button class="v67-main" onclick="LixBuildingInteriors.energy()">⚡ RESTORE ENERGY</button>`;
    if(d.action==='park')return `<button class="v67-main" onclick="LixBuildingInteriors.park()">🌳 VISIT PARK</button>`;
    if(d.action==='workshop')return `<button class="v67-main" onclick="close();show('games')">🛠️ GAME UPGRADES</button>`;
    if(d.action==='market')return `<button class="v67-main" onclick="close();show('city')">🏬 CITY MANAGEMENT</button>`;
    if(d.action==='studio')return `<button class="v67-main" onclick="close();show('home')">🎨 CUSTOMIZE LIX</button>`;
    if(d.action==='plaza')return `<button class="v67-main" onclick="LixBuildingInteriors.social()">🏙️ EXPLORE PLAZA</button>`;
    if(d.action==='arena')return `<button class="v67-main" onclick="LixBuildingInteriors.arena()">🏆 ENTER ARENA</button>`;
    return '';
  }
  function open(type){
    const p=document.getElementById('cityPanel');if(!p)return;
    const {d,unlocked,lv}=buildingState(type);
    if(!unlocked){
      p.innerHTML=`<div class="v67-modal"><button class="v67-close" onclick="LixBuildingInteriors.close()">×</button><div class="v67-icon">${d.icon}</div><h2>${d.name}</h2><div class="v67-lock">🔒 Unlocks at Player Level ${d.req}</div><p>${d.desc}</p><div class="v67-road"><span>Current Level</span><b>${S.level}</b></div></div>`;
      p.classList.add('show');return;
    }
    let body='';
    if(type==='house') body=`<div class="v67-feature"><b>🏠 House Level ${S.house}</b><span>Player Level ${S.level}</span></div><p>Your home grows with you. Visual House stages change every 5 levels.</p><div class="v67-mini-grid"><div><b>⭐ XP</b><span>${S.xp}</span></div><div><b>🪙 Coins</b><span>${S.coins}</span></div><div><b>⚡ Energy</b><span>${S.energy}/${S.maxEnergy}</span></div></div>`;
    if(type==='center') body=`<div class="v67-game-row"><b>🎯 Lix Target</b><span>Game Lv ${S.gameLevels?.target||1}</span></div><div class="v67-game-row"><b>🏃 Lix Runner</b><span>Game Lv ${S.gameLevels?.runner||1}</span></div><div class="v67-game-row"><b>🪙💣 Catch & Bomb</b><span>Game Lv ${S.gameLevels?.catch||1}</span></div>`;
    if(type==='store') body=`<div class="v67-feature"><b>Cellix Shop</b><span>Admin-managed offers</span></div><p>Shop products and external links are controlled from the admin configuration. Players do not enter shop links here.</p>`;
    if(type==='park') body=`<div class="v67-feature"><b>🌳 Peaceful Zone</b><span>Daily XP visit</span></div><p>Take Lix for a walk in the park once every 24 hours.</p>`;
    if(type==='energy') body=`<div class="v67-energy"><b>⚡ ${S.energy}/${S.maxEnergy}</b><small>Restore 3 Energy for 250 Coins.</small></div><p>Energy also regenerates automatically over time.</p>`;
    if(type==='workshop') body=`<div class="v67-feature"><b>🛠️ Upgrade Station</b><span>Improve game performance</span></div><p>Use the Games section to upgrade Target, Runner and Catch & Bomb.</p>`;
    if(type==='market') body=`<div class="v67-feature"><b>🏬 City Market</b><span>Development</span></div><p>Open City Management to upgrade roads, lights, green spaces and services.</p>`;
    if(type==='studio') body=`<div class="v67-feature"><b>🎨 Lix Studio</b><span>Style & creativity</span></div><p>Customize Lix and keep developing your city identity.</p>`;
    if(type==='stable') body=`<div class="v67-feature"><b>🐾 Active Pet</b><span>Level ${S.pet||1}</span></div><p>Your active companion can be fed, played with and brought into the city.</p>`;
    if(type==='plaza') body=`<div class="v67-feature"><b>🏙️ Lix Plaza</b><span>${S.level>=30?'Social unlocked':'Social unlocks at Level 30'}</span></div><p>${S.level>=30?'Visit other cities and use the social city systems.':'Keep progressing until Level 30 to unlock social city visits.'}</p>`;
    if(type==='arena') body=`<div class="v67-feature"><b>🏆 Lix Arena</b><span>Endgame</span></div><p>Competitive systems and leaderboard content are unlocked through the Arena.</p>`;
    p.innerHTML=`<div class="v67-modal"><button class="v67-close" onclick="LixBuildingInteriors.close()">×</button><div class="v67-icon">${d.icon}</div><div class="v67-title"><div><h2>${d.name}</h2><small>${d.tag} • Building Lv ${Math.max(1,lv)}</small></div><span class="v67-open">OPEN</span></div>${body}<div class="v67-action">${actionButton(type)}</div></div>`;
    p.classList.add('show');
  }
  function social(){
    if(Number(S.level||1)<30){toastSafe('🏙️ Social City unlocks at Level 30');return;}
    toastSafe('🌐 Social City is unlocked — city visits are next.');open('plaza');
  }
  function arena(){
    if(Number(S.level||1)<40){toastSafe('🏆 Arena unlocks at Level 40');return;}
    if(typeof show==='function')show('more');toastSafe('🏆 Arena opened — leaderboard content is available from Level 10.');
  }
  window.LixBuildingInteriors={open,close,energy:spendEnergy,park:parkVisit,social,arena};
  window.openBuilding=open;
  document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{
    document.querySelectorAll('.city-build-hit').forEach(btn=>{
      const old=btn.getAttribute('onclick');
      const m=old&&old.match(/openBuilding\('([^']+)'\)/);if(m)btn.setAttribute('onclick',`LixBuildingInteriors.open('${m[1]}')`);
    });
  },50));
})();
