/* LIX CITY Events Module - v0.58 */
window.LixEvents = {
  data(){
    if(!window.S) return {points:0};
    S.v57=S.v57||{};
    S.v57.eventPoints=Number(S.v57.eventPoints)||0;
    return {points:S.v57.eventPoints};
  },
  add(points=25){
    if(!window.S) return;
    S.v57=S.v57||{};
    S.v57.eventPoints=(Number(S.v57.eventPoints)||0)+points;
    addXP(20);
    if(typeof save==="function") save();
  }
};
