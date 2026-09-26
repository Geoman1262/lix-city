/* LIX CITY v2.8.2 — stable Command + cumulative XP
   No MutationObserver: Command rendering must never create a DOM-observer loop. */
(()=>{'use strict';
  const id=x=>document.getElementById(x);
  const hideLegacy=on=>{
    ['v25btn','lix24open','v26ArcadeBtn','v18btn','v21btn','v1HubBtn','lix23HubBtn'].forEach(k=>{const e=id(k);if(e)e.style.display=on?'none':'';});
    if(on){const p=id('lix24panel');if(p)p.hidden=true;const a=id('v26Arcade');if(a)a.remove();}
  };
  function closeCommand(){const p=id('v25panel');if(p)p.classList.remove('open');hideLegacy(false);document.body.classList.remove('command-open');}
  function installControls(){
    const p=id('v25panel'); if(!p)return;
    const top=p.querySelector('.v25top');
    if(top && top.dataset.lix282!=='1'){
      top.innerHTML='<div class="lix282-title">⚡ LIX CITY COMMAND</div><div class="lix282-actions"><button type="button" data-lix282="back">←</button><button type="button" data-lix282="close">✕</button></div>';
      top.dataset.lix282='1';
    }
    if(!p.querySelector('.lix282-footer')){
      const f=document.createElement('div');f.className='lix282-footer';
      f.innerHTML='<button type="button" data-lix282="back">← BACK</button><button type="button" data-lix282="close">✕ CLOSE COMMAND</button>';
      p.appendChild(f);
    }
  }
  function openCommand(){
    const p=id('v25panel');if(!p)return;
    hideLegacy(true);document.body.classList.add('command-open');p.classList.add('open');
    try{if(window.LIX25&&typeof window.LIX25.open==='function')window.LIX25.open();}catch(e){console.warn('LIX25 open',e)}
    requestAnimationFrame(()=>installControls());
  }
  function patchLIX25(){
    if(!window.LIX25 || window.LIX25.__lix282)return;
    const old=window.LIX25.open;
    if(typeof old==='function'){
      window.LIX25.open=function(){const r=old.apply(this,arguments);requestAnimationFrame(installControls);return r;};
    }
    window.LIX25.__lix282=true;
  }
  function patchRoute(){
    if(typeof window.route!=='function'||window.__lix282Route)return;
    const old=window.route;
    window.route=function(r){
      closeCommand();
      try{
        if(r==='ach'&&window.LixV18?.achievements)return window.LixV18.achievements();
        if(r==='wardrobe'&&window.LixWardrobe?.open)return window.LixWardrobe.open();
        if(r==='pets'&&typeof show==='function')return show('pets');
        if(r==='games'&&typeof show==='function')return show('games');
        if(r==='city'&&typeof show==='function')return show('city');
        if(r==='house'&&window.LixHouse?.open)return window.LixHouse.open();
        return old(r);
      }catch(e){console.warn('LIX route',r,e);}
    };
    window.__lix282Route=true;
  }
  function repairXP(){
    try{
      if(typeof S!=='object'||!S)return;
      const lvl=Math.max(1,Number(S.level)||1),xp=Math.max(0,Number(S.xp)||0);
      const threshold=window.xpThreshold;if(typeof threshold!=='function')return;
      const start=Math.max(0,Number(threshold(lvl))||0);
      if(S.xpCumulative!==true){S.xp=start+xp;S.xpCumulative=true;}
      if(typeof window.levelFromTotal==='function'){
        const lv=window.levelFromTotal(Number(S.xp)||0);
        if(lv!==S.level){S.level=lv;S.house=Math.max(Number(S.house)||1,lv);}
      }
      if(typeof save==='function')save();
    }catch(e){console.warn('XP repair',e)}
  }
  function bind(){
    patchLIX25();patchRoute();repairXP();
    const b=id('v25btn');
    if(b&&!b.__lix282){
      b.__lix282=true;
      b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();openCommand();},true);
    }
    const p=id('v25panel');
    if(p&&!p.__lix282){
      p.__lix282=true;
      p.addEventListener('click',e=>{
        const b=e.target.closest('[data-lix282]');if(!b)return;
        e.preventDefault();e.stopPropagation();closeCommand();
      });
    }
    if(!document.__lix282Keys){
      document.__lix282Keys=true;
      document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCommand();});
      window.addEventListener('popstate',closeCommand);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(bind,80));else setTimeout(bind,80);
  window.LIX282={openCommand,closeCommand,repairXP};
})();
