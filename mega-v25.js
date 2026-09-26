(()=>{'use strict';
const KEY='lixcity_v25_meta';
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch{return{}}};
let D=Object.assign({streak:0,lastDay:'',spinAt:0,missions:[],missionDay:'',claimed:[],inbox:[],cityXP:0,expansions:0,decor:0,likes:0,visits:0,sessionPlays:0,eventPoints:0},load());
const saveD=()=>localStorage.setItem(KEY,JSON.stringify(D));
const day=()=>new Date().toISOString().slice(0,10);
const player=()=>{try{return typeof S==='object'&&S?S:null}catch{return null}};
const notify=m=>{let n=document.getElementById('v25toast');if(n){n.textContent=m;n.classList.add('on');setTimeout(()=>n.classList.remove('on'),2200)}};
const coins=n=>{let p=player();if(!p)return false;if((p.coins||0)<n){notify('Not enough Coins');return false}p.coins-=n;typeof save==='function'&&save();return true};
const grantXP=n=>{const x=Number(n)||0;if(!x)return;if(typeof window.addXP==='function'){try{window.addXP(x);return}catch(e){}}const p=player();if(p){p.xp=(Number(p.xp)||0)+x;typeof save==='function'&&save()}};
function daily(){if(D.missionDay!==day()){D.missionDay=day();D.missions=[['Play 2 games',()=>plays()>=2,35],['Earn 150 Coins',()=>coinEarned()>=150,45],['Visit the City',()=>true,25],['Use Energy',()=>usedEnergy()>0,30],['Open Command Center',()=>true,20]];D.missionStart={plays:plays(),coins:coinTotal(),energy:energy()};saveD()}}
const plays=()=>{let p=player();return Number(p?.stats?.plays||p?.gameStats?.plays||D.sessionPlays||0)};
const coinTotal=()=>Number(player()?.coins||0);
const coinEarned=()=>Math.max(0,coinTotal()-(D.missionStart?.coins||coinTotal()));
const energy=()=>Number(player()?.energy||0);
const usedEnergy=()=>Math.max(0,(D.missionStart?.energy||energy())-energy());
function streak(){let t=day();if(D.lastDay!==t){let y=new Date(Date.now()-86400000).toISOString().slice(0,10);D.streak=D.lastDay===y?D.streak+1:1;D.lastDay=t;saveD();}}
function spin(){if(Date.now()-D.spinAt<86400000)return notify('Daily Spin is already claimed');let r=[20,30,50,75,100,1][Math.floor(Math.random()*6)],p=player();if(!p)return;D.spinAt=Date.now();if(r===1)p.tickets=(p.tickets||0)+1;else p.coins=(p.coins||0)+r;typeof save==='function'&&save();saveD();notify(r===1?'🎟️ +1 Ticket':'🪙 +'+r+' Coins');render();}
function missionOk(m){if(!m)return false;if(Array.isArray(m))return typeof m[1]==='function'&&!!m[1]();if(typeof m==='object')return !!m.done || Number(m.progress||0)>=Number(m.target||1);return false}
function missionTitle(m){return Array.isArray(m)?m[0]:(m?.t||m?.title||'Daily Mission')}
function missionXP(m){return Array.isArray(m)?Number(m[2])||0:Number(m?.xp)||0}
function normalizeMissions(){if(!Array.isArray(D.missions))D.missions=[];if(D.missions.length!==5||D.missions.some(m=>!Array.isArray(m)||typeof m[1]!=='function')){D.missions=[['Play 2 games',()=>plays()>=2,35],['Earn 150 Coins',()=>coinEarned()>=150,45],['Visit the City',()=>true,25],['Use Energy',()=>usedEnergy()>0,30],['Open Command Center',()=>true,20]];D.claimed=[];saveD();}}
function claimMission(i){daily();normalizeMissions();let m=D.missions[i];if(!m||D.claimed.includes(i))return;if(!missionOk(m))return notify('Mission not completed yet');D.claimed.push(i);saveD();grantXP(missionXP(m));notify('Mission claimed +'+missionXP(m)+' XP');render();}
function expand(){let cost=1000+(D.expansions*1500);if(!coins(cost))return;D.expansions++;D.cityXP+=100;saveD();notify('🏙️ City expanded');render();}
function decorate(){let cost=120+(D.decor*80);if(!coins(cost))return;D.decor++;saveD();notify('✨ Decoration placed');render();}
function like(){D.likes++;saveD();notify('❤️ City liked');render();}
function panel(){return document.getElementById('v25panel')}
function card(t,b){return `<section class="v25card"><div class="v25head"><h3>${t}</h3></div>${b}</section>`}
function render(){let el=panel();if(!el)return;daily();normalizeMissions();streak();let p=player()||{};let spinReady=Date.now()-D.spinAt>=86400000;let ms=D.missions||[];
el.innerHTML=`<div class="v25top"><b>⚡ LIX CITY COMMAND</b><button data-x="close">×</button></div><div class="v25stats"><span>🏠 <b>${p.level||1}</b><small>Level</small></span><span>🪙 <b>${p.coins||0}</b><small>Coins</small></span><span>⚡ <b>${p.energy||0}/${p.maxEnergy||10}</b><small>Energy</small></span><span>🔥 <b>${D.streak}</b><small>Streak</small></span></div>
<div class="v25grid">${[['🎮','Games','games'],['🏙️','City','city'],['👕','Wardrobe','wardrobe'],['🐾','Pets','pets'],['🏠','House','house'],['🏆','Achievements','ach']].map(x=>`<button data-x="route:${x[2]}">${x[0]}<b>${x[1]}</b></button>`).join('')}</div>
${card('🎡 DAILY SPIN',`<p>One free spin every 24 hours.</p><button class="v25primary" data-x="spin" ${spinReady?'':'disabled'}>${spinReady?'SPIN NOW':'READY TOMORROW'}</button>`)}
${card('📋 DAILY MISSIONS',ms.map((m,i)=>{const ok=missionOk(m),xpv=missionXP(m),title=missionTitle(m);return `<div class="v25row"><span>${title}<small>+${xpv} XP</small></span><button data-x="mission:${i}" ${D.claimed.includes(i)||!ok?'disabled':''}>${D.claimed.includes(i)?'CLAIMED':ok?'CLAIM':'IN PROGRESS'}</button></div>`}).join('')+`<small>5 missions refresh every 24h.</small>`)}
${card('🏙️ CITY DEVELOPMENT',`<div class="v25city"><div>🌳 🌳 🏠 🏪 🎮 🌳</div><strong>Expansion ${D.expansions}</strong><small>Decorations ${D.decor}</small><div><button data-x="expand">EXPAND · ${1000+D.expansions*1500} 🪙</button><button data-x="decor">DECORATE · ${120+D.decor*80} 🪙</button></div></div>`)}
${card('❤️ SOCIAL CITY',`<p>Visits ${D.visits} · Likes ${D.likes}</p><button data-x="like">LIKE MY CITY</button><button data-x="visit">VISIT CITY</button>`)}
${card('🎟️ EVENT TRACK',`<div class="v25event"><b>Monthly Challenge</b><span>${D.eventPoints} points</span><small>Event engine foundation — admin-managed rewards can be connected later.</small></div>`)}
${card('💾 SAVE & SETTINGS',`<button data-x="export">EXPORT SAVE</button><button data-x="resetmeta">RESET V25 META</button><small>Does not reset your main game save.</small>`)}</div><div id="v25toast"></div>`}
function route(r){document.getElementById('v25panel').classList.remove('open');try{if(r==='games'&&typeof show==='function')show('games');else if(r==='city'&&typeof show==='function')show('city');else if(r==='house'&&window.LixHouse?.open)LixHouse.open();else if(r==='wardrobe')window.LIX24?.open('wardrobe');else if(r==='pets')window.LIX24?.open('pets');else if(r==='ach')window.LIX24?.open('goals')}catch{notify('Section not available')}}
function mount(){if(document.getElementById('v25btn'))return;let b=document.createElement('button');b.id='v25btn';b.textContent='⚡ COMMAND';b.onclick=()=>{panel().classList.add('open');render()};document.body.append(b);let e=document.createElement('aside');e.id='v25panel';document.body.append(e);e.addEventListener('click',ev=>{let a=ev.target.closest('[data-x]');if(!a)return;let x=a.dataset.x;if(x==='close'){e.classList.remove('open');return}if(x==='spin'){spin();return}if(x.startsWith('mission:')){claimMission(+x.split(':')[1]);return}if(x==='expand'){expand();return}if(x==='decor'){decorate();return}if(x==='like'){like();return}if(x==='visit'){D.visits++;saveD();notify('👋 City visit recorded');render();return}if(x==='export'){let raw={version:'v25',date:new Date().toISOString(),main:localStorage.getItem('lixcity_player_save_v1'),meta:D};let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(raw,null,2)],{type:'application/json'}));a.download='lix-city-v25-backup.json';a.click();return}if(x==='resetmeta'){D={streak:0,lastDay:'',spinAt:0,missions:[],missionDay:'',claimed:[],inbox:[],cityXP:0,expansions:0,decor:0,likes:0,visits:0,sessionPlays:0,eventPoints:0};saveD();render();return}if(x.startsWith('route:'))route(x.slice(6))});daily();streak()}
window.LIX25={open:()=>{panel().classList.add('open');render()},addEventPoints:n=>{D.eventPoints+=Math.max(0,n);saveD()}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
