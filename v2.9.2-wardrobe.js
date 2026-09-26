/* LIX CITY v2.9.2 — wardrobe overflow guard */
(()=>{
  'use strict';
  function fix(){
    document.querySelectorAll('.wardrobe-lix').forEach(box=>{
      box.style.overflow='hidden';
      const img=box.querySelector('img');
      if(img){
        img.style.setProperty('width','auto','important');
        img.style.setProperty('height',innerWidth<=520?'230px':'245px','important');
        img.style.setProperty('max-width',innerWidth<=520?'175px':'190px','important');
        img.style.setProperty('max-height',innerWidth<=520?'230px':'245px','important');
        img.style.setProperty('min-width','0','important');
        img.style.setProperty('object-fit','contain','important');
      }
    });
  }
  window.LIX292={fix};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(fix,80));
  window.addEventListener('resize',fix,{passive:true});
})();
