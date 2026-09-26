/* LIX CITY v2.10 — core state bridge
   Exposes the permanent player state through window.S for modular systems.
   Does not replace or reset the underlying save. */
(()=>{
  'use strict';
  try{
    if(typeof S !== 'undefined') window.S = S;
    if(typeof save === 'function') window.save = save;
    if(typeof addXP === 'function') window.addXP = addXP;
    if(typeof xpThreshold === 'function') window.xpThreshold = xpThreshold;
    if(typeof show === 'function') window.show = show;
    window.LIXCORE10 = {ready:true};
  }catch(e){ console.warn('LIX v2.10 core bridge',e); }
})();
