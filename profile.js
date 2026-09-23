/* LIX CITY Profile Module - v0.59 */
window.LixProfile={
  get(){
    const s=window.S||{};
    s.profile=s.profile||{};
    return {
      nickname:s.profile.nickname||"Lix Player",
      playerId:s.profile.playerId||("LIX-"+String(Math.floor(100000+Math.random()*900000))),
      joined:s.profile.joined||Date.now()
    };
  },
  ensure(){
    if(!window.S)return;
    S.profile=S.profile||{};
    if(!S.profile.playerId)S.profile.playerId="LIX-"+String(Math.floor(100000+Math.random()*900000));
    if(!S.profile.nickname)S.profile.nickname="Lix Player";
    if(!S.profile.joined)S.profile.joined=Date.now();
    try{if(typeof save==="function")save()}catch(e){}
  }
};
