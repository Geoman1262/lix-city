/* LIX CITY v2.8.1 — Command layout + truly cumulative XP */
(function(){
  'use strict';

  function byId(id){ return document.getElementById(id); }

  function hideLegacy(on){
    ['v25btn','lix24open','v26ArcadeBtn','v18btn','v21btn','v1HubBtn','lix23HubBtn'].forEach(function(id){
      var e=byId(id); if(e) e.style.display=on?'none':'';
    });
    if(on){
      var p=byId('lix24panel'); if(p && !p.hidden) p.hidden=true;
      var a=byId('v26Arcade'); if(a) a.remove();
    }
  }

  function closeCommand(){
    var p=byId('v25panel');
    if(p) p.classList.remove('open');
    hideLegacy(false);
    document.body.classList.remove('command-open');
  }

  function openCommand(){
    var p=byId('v25panel');
    if(!p) return;
    p.classList.add('open');
    hideLegacy(true);
    document.body.classList.add('command-open');
    if(window.LIX25 && typeof window.LIX25.open==='function') window.LIX25.open();
  }

  function patchRoute(){
    if(typeof window.route==='function' && !window.__lix281Route){
      var old=window.route;
      window.route=function(r){
        closeCommand();
        try{
          if(r==='ach' && window.LixV18 && typeof window.LixV18.achievements==='function') return window.LixV18.achievements();
          if(r==='wardrobe' && window.LixWardrobe && typeof window.LixWardrobe.open==='function') return window.LixWardrobe.open();
          if(r==='pets' && typeof window.show==='function') return window.show('pets');
          if(r==='games' && typeof window.show==='function') return window.show('games');
          if(r==='city' && typeof window.show==='function') return window.show('city');
          if(r==='house' && window.LixHouse && typeof window.LixHouse.open==='function') return window.LixHouse.open();
          return old(r);
        }catch(e){ console.warn('LIX route',r,e); }
      };
      window.__lix281Route=true;
    }
  }

  function patchPanel(){
    var p=byId('v25panel');
    if(!p || p.__lix281) return;

    function ensureControls(){
      var top=p.querySelector('.v25top');
      if(top && top.dataset.lix281!=='1'){
        top.innerHTML='<div class="lix281-title">⚡ LIX CITY COMMAND</div><div class="lix281-actions"><button type="button" data-lix281="back" aria-label="Back">←</button><button type="button" data-lix281="close" aria-label="Close">✕</button></div>';
        top.dataset.lix281='1';
      }
      if(!p.querySelector('.lix281-footer')){
        var f=document.createElement('div');
        f.className='lix281-footer';
        f.innerHTML='<button type="button" data-lix281="back">← BACK</button><button type="button" data-lix281="close">✕ CLOSE COMMAND</button>';
        p.appendChild(f);
      }
    }

    ensureControls();
    p.addEventListener('click',function(e){
      var b=e.target.closest('[data-lix281]');
      if(!b) return;
      e.preventDefault();
      e.stopPropagation();
      closeCommand();
    },true);

    var queued=false;
    var observer=new MutationObserver(function(){
      if(queued) return;
      queued=true;
      requestAnimationFrame(function(){ queued=false; ensureControls(); });
    });
    observer.observe(p,{childList:true,subtree:true});
    p.__lix281=true;
  }

  /* Repair saves where an older build stored XP as per-level progress.
     Example: Level 4 + 173 XP becomes the continuous total
     threshold(Level 4) + 173, without losing any progress. */
  function repairCumulativeXP(){
    try{
      if(typeof S!=='object' || !S) return;
      var lvl=Math.max(1,Number(S.level)||1);
      var xp=Math.max(0,Number(S.xp)||0);
      var threshold=(typeof window.xpThreshold==='function') ? window.xpThreshold :
        (typeof xpThreshold==='function' ? xpThreshold : null);
      if(!threshold) return;

      var start=Math.max(0,Number(threshold(lvl))||0);
      var changed=false;

      /* If the saved XP is below the minimum cumulative XP for its level,
         it is a legacy per-level counter. Convert it once. */
      if(xp<start){
        S.xp=start+xp;
        S.xpCumulative=true;
        changed=true;
      }else if(S.xpCumulative!==true){
        S.xpCumulative=true;
        changed=true;
      }

      var total=Math.max(0,Number(S.xp)||0);
      if(typeof window.levelFromTotal==='function'){
        var computed=window.levelFromTotal(total);
        if(computed!==lvl){
          S.level=computed;
          S.house=Math.max(Number(S.house)||1,computed);
          changed=true;
        }
      }

      if(changed && typeof window.save==='function') window.save();
    }catch(e){ console.warn('LIX cumulative XP repair',e); }
  }

  function bind(){
    patchRoute();
    patchPanel();
    repairCumulativeXP();

    var cmd=byId('v25btn');
    if(cmd && !cmd.__lix281){
      cmd.__lix281=true;
      cmd.addEventListener('click',function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        openCommand();
      },true);
    }

    if(!document.__lix281Keys){
      document.__lix281Keys=true;
      document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeCommand(); });
      window.addEventListener('popstate',closeCommand);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ setTimeout(bind,60); });
  else setTimeout(bind,60);

  window.LIX281={openCommand:openCommand,closeCommand:closeCommand,repairXP:repairCumulativeXP};
})();
