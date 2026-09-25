/* LIX CITY Game Engine Integration - v0.61
   Telemetry/session layer only. Rewards remain controlled by game logic.
*/
(function(){
  const KEY='lixCityGameStatsV61';
  function blank(){return {target:{plays:0,wins:0,losses:0,best:0},runner:{plays:0,wins:0,losses:0,best:0},catch:{plays:0,wins:0,losses:0,best:0},lastGame:'',lastResult:'',session:null};}
  function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||'null');return Object.assign(blank(),x||{}, {target:Object.assign(blank().target,x?.target||{}),runner:Object.assign(blank().runner,x?.runner||{}),catch:Object.assign(blank().catch,x?.catch||{})});}catch(e){return blank()}}
  function save(x){try{localStorage.setItem(KEY,JSON.stringify(x))}catch(e){}}
  function start(id){const s=load();if(!s[id])return;s[id].plays++;s.lastGame=id;s.lastResult='playing';s.session={id,startedAt:Date.now()};save(s);try{if(window.S){S.v57=S.v57||{};S.v57.totalPlays=(Number(S.v57.totalPlays)||0)+1;S.v57.lastGame=id;window.save?.()}}catch(e){}}
  function finish(id,win,score=0){const s=load();if(!s[id])return;s[id].wins+=win?1:0;s[id].losses+=win?0:1;s[id].best=Math.max(Number(s[id].best)||0,Number(score)||0);s.lastGame=id;s.lastResult=win?'win':'loss';s.session=null;save(s);try{if(window.S){S.v57=S.v57||{};if(win)S.v57.totalWins=(Number(S.v57.totalWins)||0)+1;S.v57.lastGame=id;window.save?.()}}catch(e){}}
  function stats(){return load()}
  function active(){return load().session}
  window.LixGameEngine={start,finish,stats,active};
})();
