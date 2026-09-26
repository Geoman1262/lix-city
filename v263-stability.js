/* LIX CITY v2.6.3 — stability + legacy compatibility */
(function(){
  'use strict';
  // Legacy compatibility: some older bundles referenced window.adxXP.
  function syncXP(){
    if(typeof window.addXP === 'function' && typeof window.adxXP !== 'function'){
      window.adxXP = window.addXP;
    }
  }
  syncXP();
  setTimeout(syncXP,0); setTimeout(syncXP,300); setTimeout(syncXP,1200);

  // Keep old mission metadata JSON-safe. Functions are recreated by mega-v25.js.
  try{
    const k='lixcity_v25_meta';
    const raw=localStorage.getItem(k);
    if(raw){
      const d=JSON.parse(raw);
      if(!d || !Array.isArray(d.missions) || d.missions.length!==5 || d.missions.some(m=>Array.isArray(m)&&m.length<3)){
        // Let the current mission engine rebuild today's set.
        d.missions=[]; d.claimed=[];
        localStorage.setItem(k,JSON.stringify(d));
      }
    }
  }catch(e){}

  // Prevent duplicate floating launchers from old cached bundles.
  function cleanLaunchers(){
    const ids=['v18Launcher','lix23HubBtn'];
    ids.forEach(id=>document.getElementById(id)?.remove());
    const mega=document.getElementById('lix24open');
    if(mega) mega.setAttribute('aria-label','Open LIX Mega Hub');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',cleanLaunchers); else cleanLaunchers();
  setTimeout(cleanLaunchers,500);
})();
