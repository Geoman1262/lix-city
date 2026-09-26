/* LIX CITY v2.8.0 — Command layout + cumulative XP */
(function(){
  'use strict';
  const $=s=>document.querySelector(s);
  function hideLegacy(on){
    ['v25btn','lix24open','v26ArcadeBtn','v18btn','v21btn','v1HubBtn'].forEach(id=>{
      const e=document.getElementById(id); if(e)e.style.display=on?'none':'';
    });
    if(on){
      const p=$('#lix24panel'); if(p && !p.hidden)p.hidden=true;
      const a=$('#v26Arcade'); if(a)a.remove();
    }
  }
  function closeCommand(){const p=$('#v25panel');if(p)p.classList.remove('open');hideLegacy(false);document.body.classList.remove('command-open')}
  function openCommand(){const p=$('#v25panel');if(!p)return;p.classList.add('open');hideLegacy(true);document.body.classList.add('command-open');if(typeof window.LIX25?.open==='function')window.LIX25.open()}
  function patchRoute(){
    if(typeof window.route==='function'&&!window.__lix280Route){
      const old=window.route;
      window.route=function(r){closeCommand();try{
        if(r==='ach'&&window.LixV18?.achievements)return window.LixV18.achievements();
        if(r==='wardrobe'&&window.LixWardrobe?.open)return window.LixWardrobe.open();
        if(r==='pets'&&typeof show==='function')return show('pets');
        if(r==='games'&&typeof show==='function')return show('games');
        if(r==='city'&&typeof show==='function')return show('city');
        if(r==='house'&&window.LixHouse?.open)return window.LixHouse.open();
        return old(r);
      }catch(e){console.warn('LIX route',r,e)}};
      window.__lix280Route=true;
    }
  }
  function patchPanel(){
    const p=$('#v25panel');if(!p||p.__lix280)return;
    const ensure=()=>{
      const top=p.querySelector('.v25top');
      if(top&&top.dataset.lix280!=='1'){
        top.innerHTML='<div class="lix280-title">⚡ LIX CITY COMMAND</div><div class="lix280-actions"><button type="button" data-lix280="back">←</button><button type="button" data-lix280="close">✕</button></div>';
        top.dataset.lix280='1';
      }
      if(!p.querySelector('.lix280-footer')){
        const f=document.createElement('div');f.className='lix280-footer';
        f.innerHTML='<button type="button" data-lix280="back">← BACK</button><button type="button" data-lix280="close">✕ CLOSE COMMAND</button>';
        p.appendChild(f);
      }
    };
    ensure();
    p.addEventListener('click',e=>{const b=e.target.closest('[data-lix280]');if(!b)return;e.preventDefault();e.stopPropagation();closeCommand()},true);
    let queued=false;
    const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;ensure()})});
    observer.observe(p,{childList:true,subtree:true});
    p.__lix280=true;
  }
  function bind(){
    patchRoute();patchPanel();
    const cmd=$('#v25btn');
    if(cmd&&!cmd.__lix280){cmd.__lix280=true;cmd.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();openCommand()},true)}
    if(!document.__lix280Keys){document.__lix280Keys=true;document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCommand()});window.addEventListener('popstate',closeCommand)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(bind,100));else setTimeout(bind,100);
  window.LIX280={openCommand,closeCommand};
})();
