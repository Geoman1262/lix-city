/* LIX CITY Achievements Module - v0.58 */
window.LixAchievements = {
  list(){
    const S0=window.S||{};
    return [
      ["first","First Steps",(Number(S0.v57?.totalPlays)||0)>=1],
      ["win5","Rising Lix",(Number(S0.v57?.totalWins)||0)>=5],
      ["coin500","Coin Collector",(Number(S0.coins)||0)>=500],
      ["level5","City Builder",(Number(S0.level)||1)>=5],
      ["pet5","Pet Friend",(Number(S0.petData?.petLevel)||1)>=5],
      ["decor3","City Decorator",(S0.v55?.decor?.length||0)>=3]
    ];
  },
  unlocked(){ return this.list().filter(x=>x[2]).length; }
};
