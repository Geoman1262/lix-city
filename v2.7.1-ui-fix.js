/* LIX CITY v2.7.1 — Command / Navigation / Legacy UI Fix */
(function(){
  'use strict';
  const $=s=>document.querySelector(s);
  function hideLegacy(on){
    ['v25btn','lix24open','v26ArcadeBtn','v18btn','v21btn','v1HubBtn'].forEach(id=>{
      const e=document.getElementById(id); if(e) e.style.display=on?'none':'';
    });
    // Hide legacy floating panels if they are only decorative/entry overlays.
    if(on){
      const p=document.getElementById('lix24panel'); if(p && !p.hidden) p.hidden=true;
      const a=document.getElementById('v26Arcade'); if(a) a.remove();
    }
  }
  function closeCommand(){
    const p=$('#v25panel');
    if(p) p.classList.remove('open');
    hideLegacy(false);
    document.body.classList.remove('command-open');
  }
  function openCommand(){
    const p=$('#v25panel'); if(!p)return;
    p.classList.add('open');
    hideLegacy(true);
    document.body.classList.add('command-open');
    if(typeof window.LIX25?.open==='function') window.LIX25.open();
  }
  function patchRoute(){
    if(typeof window.route==='function' && !window.__lix271RoutePatched){
      const old=window.route;
      window.route=function(r){
        // Command is a modal; leave it cleanly before navigating.
        closeCommand();
        try{
          if(r==='ach'){
            if(window.LixV18?.achievements) return window.LixV18.achievements();
            if(typeof show==='function') return show('more');
          }
          if(r==='wardrobe'){
            if(window.LixWardrobe?.open) return window.LixWardrobe.open();
            if(window.LIX24?.open) return window.LIX24.open('wardrobe');
          }
          if(r==='pets' && typeof show==='function') return show('pets');
          if(r==='games' && typeof show==='function') return show('games');
          if(r==='city' && typeof show==='function') return show('city');
          if(r==='house' && window.LixHouse?.open) return window.LixHouse.open();
          return old(r);
        }catch(e){ console.warn('LIX route',r,e); }
      };
      window.__lix271RoutePatched=true;
    }
  }
  function patchCommand(){
    const p=$('#v25panel'); if(!p)return;
    // Rebuild the command header/footer without changing the underlying mission data.
    const oldRender=window.__lix271Render;
    if(!oldRender && typeof window.LIX25?.open==='function'){
      // Existing v25 render is intentionally left intact; we inject persistent controls after each render.
      window.__lix271Render=true;
    }
    const ensureControls=()=>{
      const panel=$('#v25panel'); if(!panel)return;
      const top=panel.querySelector('.v25top');
      if(top){
        top.innerHTML='<div class="v271-command-title">⚡ LIX CITY COMMAND</div><div class="v271-head-actions"><button type="button" data-v271="back">←</button><button type="button" data-v271="close">✕</button></div>';
      }
      let foot=panel.querySelector('.v271-footer');
      if(!foot){
        foot=document.createElement('div'); foot.className='v271-footer';
        foot.innerHTML='<button type="button" data-v271="back">← BACK</button><button type="button" data-v271="close">✕ CLOSE COMMAND</button>';
        panel.appendChild(foot);
      }
    };
    ensureControls();
    if(!p.__v271Bound){
      p.addEventListener('click',e=>{
        const b=e.target.closest('[data-v271]'); if(!b)return;
        e.preventDefault(); e.stopPropagation();
        if(b.dataset.v271==='close'||b.dataset.v271==='back') closeCommand();
      },true);
      p.__v271Bound=true;
      new MutationObserver(()=>ensureControls()).observe(p,{childList:true,subtree:true});
    }
  }
  function bind(){
    patchRoute();
    patchCommand();
    const cmd=$('#v25btn');
    if(cmd && !cmd.__v271){cmd.__v271=true;cmd.addEventListener('click',openCommand,true);}
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCommand()});
    window.addEventListener('popstate',closeCommand);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bind,80)); else setTimeout(bind,80);
  window.LIX271={openCommand,closeCommand};
})();
