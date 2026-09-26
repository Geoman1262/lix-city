/* LIX CITY v2.10.1 — Command button routing fix
   Uses direct per-button handlers. Does not rely on the global legacy `route()` function. */
(()=>{
  'use strict';
  function panel(){return document.getElementById('lix29panel')}
  function closeCommand(){ const p=panel(); if(p)p.remove(); document.body.classList.remove('command-open'); const b=document.getElementById('v25btn'); if(b)b.style.display=''; }
  function go(name){
    closeCommand();
    try{
      if(name==='games') return typeof window.show==='function' ? window.show('games') : null;
      if(name==='city') return typeof window.show==='function' ? window.show('city') : null;
      if(name==='pets') return typeof window.show==='function' ? window.show('pets') : null;
      if(name==='wardrobe') return window.LixWardrobe?.open ? window.LixWardrobe.open() : null;
      if(name==='house') return window.LixHouse?.open ? window.LixHouse.open() : null;
      if(name==='ach') return window.LixV18?.achievements ? window.LixV18.achievements() : null;
    }catch(err){ console.warn('LIX command navigation',name,err); }
  }
  function bind(){
    const p=panel(); if(!p || p.dataset.routefix==='1') return;
    p.dataset.routefix='1';
    p.querySelectorAll('[data-route]').forEach(btn=>{
      btn.type='button';
      btn.onclick=(ev)=>{ ev.preventDefault(); ev.stopPropagation(); go(btn.getAttribute('data-route')); };
    });
    p.querySelectorAll('[data-a="close"]').forEach(btn=>{btn.type='button';btn.onclick=(ev)=>{ev.preventDefault();ev.stopPropagation();closeCommand();}});
  }
  function watch(){
    bind();
    const p=panel();
    if(p && !p.dataset.routefixWatch){
      p.dataset.routefixWatch='1';
      const obs=new MutationObserver(()=>bind());
      obs.observe(p,{childList:true,subtree:true});
      setTimeout(()=>obs.disconnect(),1500);
    }
  }
  window.LIX29_NAV={go,close:closeCommand,bind:watch};
  const oldOpen=window.LIX29?.open;
  if(typeof oldOpen==='function') window.LIX29.open=function(){ oldOpen(); setTimeout(watch,0); };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(watch,150));
  else setTimeout(watch,150);
})();
