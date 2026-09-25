/* LIX CITY v0.74 — Visual House Interior */
(function(){
  const ITEMS={
    sofa:{icon:'🛋️',name:'Lix Sofa',room:'Living Room',cost:250,xp:25,req:1,cls:'sofa'},
    rug:{icon:'🟦',name:'City Rug',room:'Living Room',cost:180,xp:18,req:1,cls:'rug'},
    plant:{icon:'🪴',name:'Lix Plant',room:'Living Room',cost:120,xp:12,req:1,cls:'plant'},
    tv:{icon:'📺',name:'Lix TV',room:'Living Room',cost:500,xp:40,req:3,cls:'tv'},
    bed:{icon:'🛏️',name:'Lix Bed',room:'Bedroom',cost:450,xp:35,req:6,cls:'bed'},
    lamp:{icon:'💡',name:'Blue Lamp',room:'Bedroom',cost:100,xp:10,req:6,cls:'lamp'},
    desk:{icon:'🖥️',name:'Lix Desk',room:'Lix Corner',cost:300,xp:28,req:12,cls:'desk'},
    wall:{icon:'🖼️',name:'City Wall Art',room:'Lix Corner',cost:350,xp:30,req:12,cls:'wall'}
  };
  const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const saveSafe=()=>{if(typeof window.save==='function')window.save()};
  const toast=t=>{if(typeof window.toast==='function'&&window.toast)window.toast(t)};
  const addxp=n=>{if(typeof window.addXP==='function')window.addXP(n);else S.xp=(Number(S.xp)||0)+n};
  function ensure(){S.homeItems=S.homeItems&&typeof S.homeItems==='object'?S.homeItems:{};return S.homeItems}
  function homeRating(){
    const owned=Object.keys(ensure()).filter(k=>S.homeItems[k]).length;
    const lv=Number(S.house||S.level||1);
    return Math.min(100,20+lv+owned*8);
  }
  function roomFor(item,room){return item.room===room}
  function furnitureVisual(room){
    const owned=ensure();
    const pieces=Object.entries(ITEMS).filter(([id,it])=>owned[id]&&it.room===room);
    return pieces.map(([id,it])=>`<div class="v74-piece ${it.cls}" title="${esc(it.name)}"></div>`).join('');
  }
  function open(room='Living Room'){
    ensure();
    const lv=Number(S.house||S.level||1);
    const rooms=[['Living Room',1],['Bedroom',6],['Lix Corner',12]];
    if(!rooms.some(r=>r[0]===room))room='Living Room';
    const owned=Object.keys(S.homeItems).filter(k=>S.homeItems[k]);
    const total=owned.reduce((a,k)=>a+(ITEMS[k]?.xp||0),0);
    const cards=Object.entries(ITEMS).filter(([id,it])=>it.room===room).map(([id,it])=>{
      const have=!!S.homeItems[id], unlocked=lv>=it.req;
      return `<div class="v74-item ${have?'owned':''} ${!unlocked?'locked':''}">
        <div class="v74-item-icon">${it.icon}</div><div class="v74-item-info"><b>${it.name}</b><small>${it.cost} 🪙 • +${it.xp} XP</small></div>
        ${have?'<span class="v74-owned">OWNED</span>':unlocked?`<button class="v74-buy" onclick="LixHouse.buy('${id}')">BUY</button>`:`<span class="v74-lock">Lv.${it.req}</span>`}
      </div>`;
    }).join('');
    const tabs=rooms.map(([name,req])=>`<button class="v74-tab ${room===name?'active':''} ${lv<req?'locked':''}" ${lv<req?'disabled':''} onclick="LixHouse.open('${name}')">${name}${lv<req?' 🔒':''}</button>`).join('');
    const p=document.getElementById('cityPanel');if(!p)return;
    p.innerHTML=`<div class="v74-modal"><button class="v74-close" onclick="LixHouse.close()">×</button>
      <div class="v74-head"><div><div class="v74-kicker">LIX HOUSE</div><h2>${room}</h2><p>Your home grows with you.</p></div><div class="v74-rating"><b>${homeRating()}</b><span>HOME RATING</span></div></div>
      <div class="v74-tabs">${tabs}</div>
      <div class="v74-room" data-room="${esc(room)}">
        <div class="v74-wall"><span class="v74-window"></span><span class="v74-window second"></span></div>
        <div class="v74-floor"></div><div class="v74-light"></div>
        ${furnitureVisual(room)}
        <img class="v74-lix" src="lix.png" alt="Lix">
        <div class="v74-room-label">${room} • House Lv.${lv}</div>
      </div>
      <div class="v74-stats"><div><b>🏠 Level</b><span>${lv}</span></div><div><b>🪑 Furniture</b><span>${owned.length}/${Object.keys(ITEMS).length}</span></div><div><b>⭐ Home XP</b><span>${total}</span></div></div>
      <h3 class="v74-title">Furniture & Decor</h3><div class="v74-list">${cards||'<p class="muted">This room has no items yet.</p>'}</div>
      <p class="v74-note">Buy an item and it appears inside the room immediately. Items are permanent and add XP once.</p>
    </div>`;
    p.classList.add('show');
  }
  function buy(id){
    const it=ITEMS[id];if(!it)return;
    ensure();if(S.homeItems[id])return toast('🪑 You already own '+it.name);
    if(Number(S.level||1)<it.req)return toast('🔒 Unlocks at Level '+it.req);
    if(Number(S.coins||0)<it.cost)return toast('🪙 Need '+it.cost+' Coins');
    S.coins-=it.cost;S.homeItems[id]=true;addxp(it.xp);saveSafe();toast('🏠 '+it.name+' added • +'+it.xp+' XP');open(it.room);
  }
  function close(){document.getElementById('cityPanel')?.classList.remove('show')}
  window.LixHouse={open,buy,close,homeRating};
})();
