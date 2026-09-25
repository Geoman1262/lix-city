/* LIX CITY Game Integration - v0.60 */
window.LixGameEngine={
  start(id){
    if(!window.S)return;
    S.v57=S.v57||{};
    S.v57.totalPlays=Number(S.v57.totalPlays)||0;
    S.v57.totalPlays++;
    S.v57.lastGame=id;
    try{if(typeof save==="function")save()}catch(e){}
  },
  finish(id,win,coins=0,xp=0){
    if(!window.S)return;
    S.v57=S.v57||{};
    S.v57.totalWins=Number(S.v57.totalWins)||0;
    if(win)S.v57.totalWins++;
    S.coins=(Number(S.coins)||0)+Math.max(0,Number(coins)||0);
    S.xp=(Number(S.xp)||0)+Math.max(0,Number(xp)||0);
    S.v57.lastGame=id;
    try{if(typeof save==="function")save()}catch(e){}
  },
  stats(){
    const s=window.S||{};
    return {plays:Number(s.v57?.totalPlays)||0,wins:Number(s.v57?.totalWins)||0};
  }
};
