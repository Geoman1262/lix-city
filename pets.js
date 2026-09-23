/* LIX CITY Pets Module - v0.58 */
window.LixPets = {
  data(){
    return window.S?.petData || {name:"Lix Pet",petLevel:1};
  },
  level(){ return Number(this.data().petLevel)||1; },
  feed(cost=20){
    if(!window.S || (Number(S.coins)||0)<cost) return false;
    S.coins-=cost;
    S.petData=S.petData||{name:"Lix Pet",petLevel:1};
    S.petData.food=(Number(S.petData.food)||0)+1;
    S.petData.petLevel=Math.min(10,(Number(S.petData.petLevel)||1)+1);
    if(typeof save==="function") save();
    return true;
  }
};
