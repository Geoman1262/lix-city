/* LIX CITY Save API - v0.58
   Central read/write helpers. Existing save() remains the source of truth. */
window.LixSave = {
  snapshot(){
    try { return window.S ? JSON.parse(JSON.stringify(window.S)) : null; } catch(e){ return null; }
  },
  commit(){
    try { if(typeof window.save === "function") window.save(); } catch(e){}
  },
  level(){ return Number(window.S?.level)||1; },
  coins(){ return Number(window.S?.coins)||0; },
  xp(){ return Number(window.S?.xp)||0; }
};
