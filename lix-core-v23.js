/* LIX CITY v2.3 — Core Stability & Content Registry */
(function(){
  'use strict';
  const KEY='lix_city_v23_core';
  const ASSETS={
    character:'lix.png', coin:'coin.png', pets:{dog:'dog.png',cat:'cat.png',horse:'horse.png'},
    brand:'cellix-logo.webp'
  };
  const ROUTES=['home','city','games','house','pets','customize','store','missions','events','achievements','profile','social','more'];
  window.LIX_CORE={version:'2.3',assets:ASSETS,routes:ROUTES};

  function safeState(){
    if(!window.S) return false;
    const n=(v,d=0)=>Number.isFinite(Number(v))?Number(v):d;
    S.level=Math.max(1,n(S.level,1));
    S.xp=Math.max(0,n(S.xp,0)); S.coins=Math.max(0,n(S.coins,0));
    S.energy=Math.max(0,n(S.energy,10));
    S.maxEnergy=Math.max(10,n(S.maxEnergy,10));
    S.tickets=Math.max(0,n(S.tickets,0));
    S.custom=S.custom||{owned:[],equipped:{},home:[]};
    S.custom.owned=Array.isArray(S.custom.owned)?S.custom.owned:[];
    S.custom.equipped=S.custom.equipped&&typeof S.custom.equipped==='object'?S.custom.equipped:{};
    S.custom.home=Array.isArray(S.custom.home)?S.custom.home:[];
    S.events=S.events&&typeof S.events==='object'?S.events:{};
    S.visits=S.visits&&typeof S.visits==='object'?S.visits:{};
    return true;
  }
  window.lixCoreValidate=safeState;

  function remember(route){try{localStorage.setItem(KEY,JSON.stringify({route,scroll:window.scrollY||0,t:Date.now()}));}catch(e){}}
  function restore(){
    try{const x=JSON.parse(localStorage.getItem(KEY)||'null'); if(!x||!ROUTES.includes(x.route)) return;
      window.__LIX_LAST_ROUTE=x.route; window.__LIX_LAST_SCROLL=Number(x.scroll)||0;
    }catch(e){}
  }
  restore();

  // Keep the current page when a feature calls save(). Do not force a re-render here.
  const patchSave=()=>{
    if(typeof window.save!=='function'||window.__lixSavePatched) return;
    const original=window.save; window.save=function(){const r=original.apply(this,arguments); safeState(); return r}; window.__lixSavePatched=true;
  };
  const patchNavigation=()=>{
    if(typeof window.show!=='function'||window.__lixShowPatched) return;
    const original=window.show;
    window.show=function(route){
      const r=ROUTES.includes(route)?route:'home'; remember(r);
      try{return original.apply(this,[r].concat([].slice.call(arguments,1)));}
      catch(err){console.error('LIX route error',r,err); if(r!=='home') return original.call(this,'home');}
    };
    window.__lixShowPatched=true;
  };
  function boot(){
    safeState(); patchSave(); patchNavigation();
    if(window.__LIX_LAST_ROUTE && window.__LIX_LAST_ROUTE!=='home'){
      setTimeout(()=>{try{window.show(window.__LIX_LAST_ROUTE); setTimeout(()=>window.scrollTo(0,window.__LIX_LAST_SCROLL||0),60);}catch(e){}},180);
    }
  }
  window.lixCoreBoot=boot;
  document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,50));

  // Lightweight diagnostics; useful during development, invisible to normal players.
  window.lixDiagnostics=function(){
    const missing=[]; const list=[ASSETS.character,ASSETS.coin,ASSETS.brand,...Object.values(ASSETS.pets)];
    return Promise.all(list.map(u=>fetch(u,{method:'HEAD',cache:'no-store'}).then(r=>{if(!r.ok)missing.push(u)}).catch(()=>missing.push(u)))).then(()=>({version:'2.3',missing,stateValid:safeState(),route:window.__LIX_LAST_ROUTE||'home'}));
  };
})();
