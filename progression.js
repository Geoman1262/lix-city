/* LIX CITY Progression Module - v0.59 */
window.LixProgression={
  level(){return Number(window.S?.level)||1;},
  house(){return Number(window.S?.house)||this.level();},
  xp(){return Number(window.S?.xp)||0;},
  nextUnlock(){
    const l=this.level();
    const map=[[2,"Game Center"],[4,"Cellix Store"],[7,"Lix Park"],[8,"Energy Station"],[12,"Lix Workshop"],[15,"Lix Market"],[18,"Lix Studio"],[20,"Lix Stable"],[25,"Lix Plaza"],[30,"Social City"],[40,"Lix Arena"],[50,"Prestige"]];
    return map.find(x=>x[0]>l)||[50,"Prestige"];
  }
};
