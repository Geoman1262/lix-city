/* LIX CITY Leaderboard Module - v0.58 */
window.LixLeaderboard = {
  unlocked(){ return (Number(window.S?.level)||1)>=10; },
  mode(){ return this.unlocked() ? "GLOBAL + COUNTRY" : "LOCKED UNTIL LEVEL 10"; }
};
