/* LIX CITY Missions Module - v0.58 */
window.LixMissions = {
  all(){ return Array.isArray(window.S?.missions) ? window.S.missions : []; },
  completed(){ return this.all().filter(m=>m&&m.claimed).length; },
  count(){ return this.all().length; }
};
