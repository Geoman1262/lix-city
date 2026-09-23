/* LIX CITY Rewards Module - v0.59 */
window.LixRewards={
  grantCoins(amount){
    if(!window.S)return;
    S.coins=(Number(S.coins)||0)+Number(amount||0);
    try{if(typeof save==="function")save()}catch(e){}
  },
  grantXP(amount){
    if(!window.S)return;
    S.xp=(Number(S.xp)||0)+Number(amount||0);
    try{if(typeof save==="function")save()}catch(e){}
  }
};
