/* LIX CITY v2.7 — Mega City & Player Bundle
   Additive module. Uses separate storage keys and does not rewrite the core save. */
(function(){
  'use strict';
  const SAVE='lixcity_player_save_v1';
  const HOME='lixcity_home_v27';
  const DATA='lixcity_meta_v27';
  const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??d}catch{return d}};
  const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
  const core=()=>get(SAVE,{level:1,xp:0,coins:0,energy:0,maxEnergy:10,pet:1});
  const meta=()=>get(DATA,{likes:0,visits:0,collection:0,cityGoals:0,claimed:{}});
  const home=()=>get(HOME,{owned:[],equipped:[]});
  const furniture=[
    ['sofa','🛋️','Blue Sofa',250,2],['table','🪑','City Table',180,2],['lamp','💡','Lix Lamp',140,3],
    ['tv','📺','Game Screen',450,4],['plant','🪴','City Plant',120,5],['bed','🛏️','Lix Bed',500,6],
    ['desk','🖥️','Lix Desk',650,8],['shelf','📚','City Shelf',350,9],['arcade','🕹️','Mini Arcade',900,10],
    ['trophy','🏆','Victory Trophy',1100,12],['petbed','🐾','Pet Bed',750,20],['studio','🎨','Lix Art Corner',1500,18]
  ];
  function toast(t){ if(typeof window.toast==='function'){window.toast(t);return} let e=document.querySelector('.toast'); if(e){e.textContent=t;e.style.display='block';clearTimeout(window.__v27t);window.__v27t=setTimeout(()=>e.style.display='none',1800)} }
  function saveHome(x){put(HOME,x)}
  function openModal(title,body){
    document.getElementById('v27modal')?.remove();
    const d=document.createElement('div'); d.id='v27modal'; d.className='v27shade';
    d.innerHTML='<div class="v27modal"><div class="v27head"><b>'+title+'</b><button id="v27close">✕</button></div><div class="v27body">'+body+'</div></div>';
    document.body.appendChild(d); d.querySelector('#v27close').onclick=()=>d.remove();
  }
  function housePanel(){
    const s=core(),h=home();
    const cards=furniture.map(f=>{const own=h.owned.includes(f[0]), eq=h.equipped.includes(f[0]), locked=s.level<f[4];return `<div class="v27item ${locked?'locked':''}"><div class="v27emoji">${f[1]}</div><div><b>${f[2]}</b><small>Lv.${f[4]} • ${f[3]} Coins</small></div><button ${locked||own?'disabled':''} data-buy="${f[0]}">${locked?'🔒':own?'OWNED':'BUY'}</button>${own?`<button class="alt" data-eq="${f[0]}">${eq?'EQUIPPED':'EQUIP'}</button>`:''}</div>`}).join('');
    openModal('🏠 LIX HOUSE INTERIOR',`<p class="v27muted">House Lv. ${s.level} • Furniture is saved separately from the core game save.</p><div class="v27grid">${cards}</div><div class="v27room">${h.equipped.length?'<b>✨ Equipped</b> '+h.equipped.map(id=>{const f=furniture.find(x=>x[0]===id);return f?f[1]+' '+f[2]:''}).join(' • '):'Your room is ready for its first furniture.'}</div>`);
    d27bind();
  }
  function d27bind(){const m=document.getElementById('v27modal');if(!m)return;m.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const id=b.dataset.buy,f=furniture.find(x=>x[0]===id),s=core(),h=home();if(!f||s.level<f[4])return;if((s.coins||0)<f[3]){toast('🪙 Not enough Coins');return}s.coins-=f[3];h.owned.push(id);saveHome(h);put(SAVE,s);toast('🏠 '+f[2]+' added!');housePanel()});m.querySelectorAll('[data-eq]').forEach(b=>b.onclick=()=>{const id=b.dataset.eq,h=home();h.equipped=h.equipped.includes(id)?h.equipped.filter(x=>x!==id):h.equipped.concat(id);saveHome(h);housePanel()})}
  function centerPanel(){
    const s=core(),m=meta(),h=home(),arc=get('lixcity_arcade_v26',{best:{target:0,runner:0,catch:0},plays:{target:0,runner:0,catch:0},wins:{target:0,runner:0,catch:0}});
    const totalWins=(arc.wins?.target||0)+(arc.wins?.runner||0)+(arc.wins?.catch||0);
    openModal('⚡ LIX CITY CENTER',`<div class="v27hero"><img src="lix.png"><div><h2>Player Level ${s.level}</h2><p>One place for your city, house, games and collection.</p></div></div>
      <div class="v27stats"><div>⭐ XP <b>${s.xp||0}</b></div><div>🪙 Coins <b>${s.coins||0}</b></div><div>⚡ Energy <b>${s.energy||0}/${s.maxEnergy||10}</b></div><div>🐾 Pet <b>Lv.${s.pet||1}</b></div><div>🏠 Furniture <b>${h.owned.length}/${furniture.length}</b></div><div>🏆 Wins <b>${totalWins}</b></div></div>
      <div class="v27actions"><button data-go="city">🏙️ CITY</button><button data-go="games">🎮 GAMES</button><button id="v27house">🏠 HOUSE</button><button data-go="pets">🐾 PETS</button><button id="v27goals">🎯 GOALS</button><button id="v27profile">👤 PROFILE</button></div>
      <div class="v27goals"><b>City Development</b><div class="v27progress"><i style="width:${Math.min(100,s.level*2)}%"></i></div><small>${s.level}/50 House Levels • ${m.cityGoals||0} city goals completed • ${m.collection||0} collection milestones</small></div>`);
    const el=document.getElementById('v27modal');el.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{el.remove();if(typeof window.show==='function')window.show(b.dataset.go)});el.querySelector('#v27house').onclick=housePanel;
    el.querySelector('#v27goals').onclick=()=>{el.remove();if(typeof window.show==='function')window.show('home');setTimeout(()=>document.querySelector('.v27centerCard')?.scrollIntoView({behavior:'smooth'}),100)};
    el.querySelector('#v27profile').onclick=()=>{el.remove();openProfile()};
  }
  function openProfile(){const s=core(),m=meta(),h=home();openModal('👤 LIX PLAYER',`<div class="v27profile"><img src="lix.png"><h2>Player ID</h2><p class="id">LIX-${String(Math.abs((s.level||1)*7919+(s.xp||0))).padStart(8,'0')}</p><div class="v27stats"><div>🏠 Level <b>${s.level}</b></div><div>⭐ XP <b>${s.xp}</b></div><div>🪙 Coins <b>${s.coins}</b></div><div>🎟️ Tickets <b>${s.tickets||0}</b></div><div>🐾 Pet <b>${s.pet||1}</b></div><div>🪑 Items <b>${h.owned.length}</b></div></div><p class="v27muted">Your Player ID is permanent for this browser save. Cloud account linking can be added later without changing this profile layout.</p></div>`)}
  function injectCard(){
    if(location.pathname.endsWith('/')){}
    const wrap=document.querySelector('.wrap');if(!wrap||document.querySelector('.v27centerCard'))return;
    const card=document.createElement('section');card.className='card v27centerCard';card.innerHTML=`<div class="title"><h2>⚡ LIX CITY CENTER</h2><small>Player • House • City • Games</small></div><div class="v27mini"><div>🏠 House <b>Lv.${core().level}</b></div><div>🪑 Furniture <b>${home().owned.length}</b></div><div>🏆 Arcade Wins <b>${(()=>{const a=get('lixcity_arcade_v26',{wins:{}});return (a.wins?.target||0)+(a.wins?.runner||0)+(a.wins?.catch||0)})()}</b></div></div><button class="btn" id="v27open">⚡ OPEN CITY CENTER</button><button class="btn alt" id="v27houseBtn">🏠 HOUSE INTERIOR</button>`;
    wrap.appendChild(card);card.querySelector('#v27open').onclick=centerPanel;card.querySelector('#v27houseBtn').onclick=housePanel;
  }
  function observe(){injectCard();const app=document.getElementById('app');if(!app)return;new MutationObserver(()=>{setTimeout(injectCard,0)}).observe(app,{childList:true,subtree:true})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observe);else observe();
})();
