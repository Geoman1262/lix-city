/* LIX CITY Games Module - v0.58 */
window.LixGames = {
  list:[
    {id:"target",icon:"🎯",name:"Lix Target",desc:"Precision challenge"},
    {id:"runner",icon:"🏃",name:"Lix Runner",desc:"Run and dodge"},
    {id:"catch",icon:"🪙💣",name:"Lix Catch & Bomb",desc:"Collect coins, avoid bombs"}
  ],
  level(id){ return Number(window.S?.game?.[id])||1; },
  upgrade(id){ return Number(window.S?.gameUp?.[id])||1; },
  open(){
    try { if(typeof window.show==="function") window.show("games"); } catch(e){}
  }
};
