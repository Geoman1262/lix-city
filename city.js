/* LIX CITY City Module - v0.66 */
window.LixCity = {
  level(){ return Number(window.S?.level)||1; },
  house(){ return Number(window.S?.house)||this.level(); },
  collect(amount=5){
    if(!window.S) return;
    S.coins=(Number(S.coins)||0)+amount;
    addXP(5);
    try { if(typeof save==="function") save(); } catch(e){}
  }
};
