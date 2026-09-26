/* LIX CITY v2.1 — Mega Progression & Player Center
   Adds long-term goals, collection, event calendar, profile, notifications,
   social foundation and settings without replacing the existing save schema. */
(function(){
  const KEY='lixcity_v21';
  const defaults={goals:{},claimedGoals:{},seen:{},settings:{music:true,sfx:true},stats:{},lastDaily:0};
  function ensure(){
    S.v21=S.v21&&typeof S.v21==='object'?S.v21:{};
    if(!S.v21.goals)S.v21.goals={};
    if(!S.v21.claimedGoals)S.v21.claimedGoals={};
    if(!S.v21.seen)S.v21.seen={};
    if(!S.v21.settings)S.v21.settings={music:true,sfx:true};
    if(!S.v21.stats)S.v21.stats={hubOpens:0};
  }
  function save21(){try{save()}catch(e){}}
  const goals=[
    ['play10','🎮 Game Starter','Finish 10 game rounds',()=>Number(S.v57?.totalPlays||0),10,100,'XP'],
    ['wins10','🏆 Winning Lix','Win 10 game rounds',()=>Number(S.v57?.totalWins||0),10,150,'XP'],
    ['coins1000','🪙 Coin Collector','Earn or hold 1,000 Coins',()=>Number(S.coins||0),1000,100,'XP'],
    ['level10','🏙️ City Builder','Reach Player Level 10',()=>Number(S.level||1),10,250,'XP'],
    ['style10','👕 Style Hunter','Own 10 customization pieces',()=>Number(S.custom?.owned?.length||0),10,150,'XP'],
    ['pet3','🐾 Pet Companion','Reach Pet Level 3',()=>Number(S.petData?.petLevel||S.pet||1),3,100,'XP'],
    ['city5','🌆 City Explorer','Collect 5 city Coins',()=>Number(S.city?.collected?.length||0),5,100,'XP'],
    ['spin5','🎡 Lucky Lix','Use Daily Spin 5 times',()=>Number(S.v21?.stats?.spins||0),5,125,'XP'],
    ['build3','🏗️ Developer','Upgrade 3 city buildings',()=>{const b=S.cityBuilds||{};return Object.values(b).reduce((n,x)=>n+Math.max(0,(Number(x?.level)||0)-(x?.spent?0:0)),0)},3,150,'XP'],
    ['visit3','🌐 Social Explorer','Visit 3 different cities',()=>Object.keys(S.visits||{}).length,3,120,'XP'],
    ['events2','🎉 Event Player','Complete 2 event objectives',()=>Number(S.v21?.stats?.eventObjectives||0),2,150,'XP'],
    ['daily7','🔥 Consistent Lix','Reach a 7-day streak',()=>Number(S.streakDay||0),7,250,'XP']
  ];
  function progress(g){let v=0;try{v=Math.max(0,Number(g[3]())||0)}catch(e){}return Math.min(g[4],v)}
  function completed(id){return !!S.v21.claimedGoals[id]}
  function claim(id){ensure();const g=goals.find(x=>x[0]===id);if(!g)return; if(completed(id)){toast('Already claimed');return}if(progress(g)<g[4]){toast('🎯 Goal not complete yet');return}S.v21.claimedGoals[id]=Date.now();addXP(g[5]);save21();toast('🎁 '+g[1]+' • +'+g[5]+' XP');renderHub('goals')}
  function profile(){
    ensure();
    const plays=Number(S.v57?.totalPlays||0),wins=Number(S.v57?.totalWins||0);
    return `<section class="v21-card v21-profile"><div class="v21-profile-head"><img src="lix.png" alt="Lix"><div><span class="v21-kicker">PLAYER PROFILE</span><h2>${esc(S.nickname||'Lix Player')}</h2><p>${esc(S.playerId||'LIX-PLAYER')} • ${esc(S.country||'Lebanon')}</p></div><span class="v21-level">LV.${S.level}</span></div><div class="v21-statgrid"><div><b>${S.xp}</b><small>XP</small></div><div><b>${S.coins}</b><small>Coins</small></div><div><b>${plays}</b><small>Plays</small></div><div><b>${wins}</b><small>Wins</small></div></div></section>`;
  }
  function goalsView(){
    ensure();
    const done=goals.filter(g=>completed(g[0])).length;
    return `<section class="v21-card"><div class="v21-head"><div><span class="v21-kicker">LONG-TERM PROGRESSION</span><h2>🎯 City Goals</h2><p>Goals stay here until you complete and claim them.</p></div><b>${done}/${goals.length}</b></div><div class="v21-goals">${goals.map(g=>{const p=progress(g),ok=p>=g[4],claimed=completed(g[0]);return `<article class="v21-goal ${ok?'ready':''} ${claimed?'claimed':''}"><div class="v21-goal-icon">${g[1].split(' ')[0]}</div><div class="v21-goal-main"><b>${g[1].replace(/^\S+\s/,'')}</b><small>${g[2]}</small><div class="progress"><div class="bar" style="width:${Math.round(p/g[4]*100)}%"></div></div><span>${p}/${g[4]} • +${g[5]} XP</span></div><button class="btn ${ok&&!claimed?'':'alt'}" ${ok&&!claimed?'':'disabled'} onclick="LixV21.claim('${g[0]}')">${claimed?'CLAIMED':ok?'CLAIM':'LOCKED'}</button></article>`}).join('')}</div></section>`;
  }
  function collection(){
    ensure();
    const owned=(S.custom?.owned||[]).length, pets=(S.petData?.owned||['dog']).length, ach=window.LixAchievements?.unlocked?.()||0;
    const items=[['👕','Wardrobe',owned,'pieces'],['🐾','Pets',pets,'companions'],['🏆','Achievements',ach,'unlocked'],['🎟️','Tickets',Number(S.tickets||0),'tickets']];
    return `<section class="v21-card"><div class="v21-head"><div><span class="v21-kicker">COLLECTION</span><h2>📚 My Collection</h2><p>Everything you have collected across Lix City.</p></div></div><div class="v21-collection">${items.map(x=>`<div class="v21-collection-item"><span>${x[0]}</span><b>${x[2]}</b><small>${x[1]} • ${x[3]}</small></div>`).join('')}</div><div class="v21-collection-note">💡 Standard items stay available permanently. Event items can be added later without replacing your collection.</div></section>`;
  }
  function eventsView(){
    ensure();
    const season=[
      ['🌸','Lix Spring Festival','Standard seasonal event template','City challenges • limited styles'],
      ['☀️','Lix Summer Days','Seasonal event template','Pet activities • beach styles'],
      ['🎃','Lix Halloween','Seasonal event template','Limited effects • special rewards'],
      ['🎄','Lix Winter','Seasonal event template','Limited outfits • city decorations'],
      ['🏆','Lix City Cup','Competitive event template','Game scores • event leaderboard']
    ];
    return `<section class="v21-card"><div class="v21-head"><div><span class="v21-kicker">EVENT CENTER</span><h2>🎉 Events</h2><p>Event content is separate from the permanent game systems.</p></div></div><div class="v21-events">${season.map((e,i)=>`<article class="v21-event"><div class="v21-event-icon">${e[0]}</div><div><b>${e[1]}</b><small>${e[2]}</small><span>${e[3]}</span></div><label>${i===0?'NEXT':'PLANNED'}</label></article>`).join('')}</div><div class="v21-locked-note">🔒 Event dates, rewards and limited items can later be controlled from the Admin Panel without changing the core game.</div></section>`;
  }
  function notifications(){
    const list=[];
    if(Number(S.energy||0)<Number(S.maxEnergy||10))list.push(['⚡','Energy is regenerating','Come back when your Energy is ready.']);
    if(window.LixAchievements?.unlocked?.()>0)list.push(['🏆','Achievements available','Check your achievements and claim rewards.']);
    if((S.custom?.owned||[]).length>0)list.push(['👕','Your wardrobe is growing','Mix and match your owned pieces.']);
    list.push(['🏙️','Your city is waiting','Build, explore and collect Coins.']);
    return `<section class="v21-card"><div class="v21-head"><div><span class="v21-kicker">PLAYER INBOX</span><h2>🔔 Notifications</h2><p>Important reminders from your city.</p></div></div><div class="v21-notices">${list.map(x=>`<div class="v21-notice"><span>${x[0]}</span><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join('')}</div></section>`;
  }
  function settings(){ensure();return `<section class="v21-card"><div class="v21-head"><div><span class="v21-kicker">GAME SETTINGS</span><h2>⚙️ Settings</h2><p>Basic preferences are saved locally with your player.</p></div></div><div class="v21-setting"><div><b>🔊 Sound Effects</b><small>UI and gameplay sounds</small></div><button class="v21-toggle ${S.v21.settings.sfx?'on':''}" onclick="LixV21.toggle('sfx')">${S.v21.settings.sfx?'ON':'OFF'}</button></div><div class="v21-setting"><div><b>🎵 Music</b><small>Background music preference</small></div><button class="v21-toggle ${S.v21.settings.music?'on':''}" onclick="LixV21.toggle('music')">${S.v21.settings.music?'ON':'OFF'}</button></div><div class="v21-setting"><div><b>💾 Save Status</b><small>Local save is active on this device.</small></div><span class="badge now">SAVED</span></div></section>`}
  function social(){return `<section class="v21-card"><div class="v21-head"><div><span class="v21-kicker">SOCIAL FOUNDATION</span><h2>🌐 Social Cities</h2><p>Multiplayer city visits unlock at Player Level 30.</p></div></div><div class="v21-social-lock ${S.level>=30?'open':''}">${S.level>=30?'🟢 Social access unlocked.':'🔒 Unlocks at Level 30.'}</div><div class="v21-social-grid"><div><b>🏙️ City Visits</b><strong>${Object.keys(S.visits||{}).length}</strong><small>unique cities</small></div><div><b>❤️ Likes</b><strong>${S.likes||0}</strong><small>received</small></div><div><b>🪪 Player ID</b><strong>${esc(S.playerId||'LIX-PLAYER')}</strong><small>permanent ID</small></div></div></section>`}
  function renderHub(tab){
    ensure(); S.v21.stats.hubOpens=(S.v21.stats.hubOpens||0)+1; save21();
    const tabs=[['profile','👤 Profile'],['goals','🎯 Goals'],['collection','📚 Collection'],['events','🎉 Events'],['social','🌐 Social'],['notifications','🔔 Inbox'],['settings','⚙️ Settings']];
    let body=tab==='profile'?profile():tab==='goals'?goalsView():tab==='collection'?collection():tab==='events'?eventsView():tab==='social'?social():tab==='notifications'?notifications():settings();
    shell(`<section class="v21-hub"><div class="v21-hero"><div><span class="v21-kicker">LIX CITY PLAYER CENTER</span><h1>Everything in one place</h1><p>Progress, goals, collection, events and your player settings.</p></div><img src="lix.png" alt="Lix"></div><div class="v21-tabs">${tabs.map(t=>`<button class="${t[0]===tab?'on':''}" onclick="LixV21.open('${t[0]}')">${t[1]}</button>`).join('')}</div>${body}</section>`,'more');
  }
  function open(tab='profile'){renderHub(tab)}
  function toggle(k){ensure();S.v21.settings[k]=!S.v21.settings[k];save21();renderHub('settings')}
  window.LixV21={open,claim,toggle,goals,renderHub};
  const oldMore=window.more;
  window.more=function(){
    if(typeof oldMore==='function')oldMore();
    setTimeout(()=>{
      const host=document.querySelector('.wrap');
      if(!host)return;
      const card=document.createElement('section');card.className='v21-entry card';
      card.innerHTML='<div class="title"><div><h2>🧭 Lix Player Center</h2><small>All long-term systems in one persistent page</small></div><button class="btn" onclick="LixV21.open(\'profile\')">OPEN HUB</button></div><p class="muted">Profile • Goals • Collection • Events • Social • Inbox • Settings</p>';
      host.appendChild(card);
    },0);
  };
  window.addEventListener('load',()=>{try{ensure();save21()}catch(e){}});
})();
