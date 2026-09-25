/* LIX CITY v0.69 — House Interior & Furniture */
(function(){
  const ITEMS={
    sofa:{icon:'🛋️',name:'Lix Sofa',room:'Living Room',cost:250,xp:25,req:1},
    rug:{icon:'🟦',name:'City Rug',room:'Living Room',cost:180,xp:18,req:1},
    plant:{icon:'🪴',name:'Lix Plant',room:'Living Room',cost:120,xp:12,req:1},
    tv:{icon:'📺',name:'Lix TV',room:'Living Room',cost:500,xp:40,req:3},
    bed:{icon:'🛏️',name:'Lix Bed',room:'Bedroom',cost:450,xp:35,req:6},
    lamp:{icon:'💡',name:'Blue Lamp',room:'Bedroom',cost:100,xp:10,req:6},
    desk:{icon:'🖥️',name:'Lix Desk',room:'Lix Corner',cost:300,xp:28,req:12},
    wall:{icon:'🖼️',name:'City Wall Art',room:'Lix Corner',cost:350,xp:30,req:12}
  };
  const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const save=()=>{if(typeof window.save==='function')window.save()};
  const toast=t=>{if(typeof window.toast==='function')window.toast(t)};
  const xp=n=>{if(typeof window.addXP==='function')window.addXP(n);else window.S.xp=(Number(window.S.xp)||0)+n};
  function ensure(){S.homeItems=S.homeItems&&typeof S.homeItems==='object'?S.homeItems:{};return S.homeItems}
  function open(){
    ensure();
    const lv=Number(S.house||S.level||1);
    const owned=Object.keys(S.homeItems).filter(k=>S.homeItems[k]);
    const total=owned.reduce((a,k)=>a+(ITEMS[k]?.xp||0),0);
    const cards=Object.entries(ITEMS).map(([id,it])=>{
      const have=!!S.homeItems[id], unlocked=lv>=it.req;
      return `<div class="v69-item ${have?'owned':''} ${!unlocked?'locked':''}">
        <div class="v69-item-icon">${it.icon}</div><div class="v69-item-info"><b>${it.name}</b><small>${it.room} • ${it.cost} 🪙 • +${it.xp} XP</small></div>
        ${have?'<span class="v69-owned">OWNED</span>':unlocked?`<button class="v68-small" onclick="LixHouse.buy('${id}')">BUY</button>`:`<span class="v69-lock">Lv.${it.req}</span>`}
      </div>`;
    }).join('');
    const rooms=[['Living Room',1],['Bedroom',6],['Lix Corner',12]].map(([n,r])=>`<div class="v69-room"><b>${n}</b><span>${lv>=r?'OPEN':'🔒 Lv.'+r}</span></div>`).join('');
    const p=document.getElementById('cityPanel');if(!p)return;
    p.innerHTML=`<div class="v68-modal"><button class="v68-close" onclick="LixHouse.close()">×</button>
      <div class="v69-hero"><div class="v68-icon">🏠</div><div><h2>Lix House Interior</h2><p>Your home grows with you.</p></div></div>
      <div class="v68-grid"><div><b>🏠 House Lv.</b><span>${lv}</span></div><div><b>🪑 Furniture</b><span>${owned.length}/${Object.keys(ITEMS).length}</span></div><div><b>⭐ Home XP</b><span>${total}</span></div></div>
      <h3 class="v69-title">Rooms</h3><div class="v69-rooms">${rooms}</div>
      <h3 class="v69-title">Furniture & Decor</h3><div class="v69-list">${cards}</div>
      <p class="v69-note">Buy furniture with Coins. Each item is permanent and adds XP once.</p>
    </div>`;
    p.classList.add('show');
  }
  function buy(id){
    const it=ITEMS[id];if(!it)return;
    ensure();if(S.homeItems[id])return toast('🪑 You already own '+it.name);
    if(Number(S.level||1)<it.req)return toast('🔒 Unlocks at Level '+it.req);
    if(Number(S.coins||0)<it.cost)return toast('🪙 Need '+it.cost+' Coins');
    S.coins-=it.cost;S.homeItems[id]=true;xp(it.xp);save();toast('🏠 '+it.name+' added • +'+it.xp+' XP');open();
  }
  function close(){document.getElementById('cityPanel')?.classList.remove('show')}
  window.LixHouse={open,buy,close};
})();
