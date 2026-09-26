/* LIX CITY v1.9 - Mix & Match Wardrobe */
(function(){
  const items=[
    ['tee','shirt','Lix T-Shirt','👕',80,2],['blue','shirt','Blue Jacket','🧥',120,2],['sport','shirt','Sport Top','🥋',150,3],['hoodie','shirt','Lix Hoodie','🧥',220,4],['city','shirt','City Jacket','🧥',300,6],['gold','shirt','Gold Style','✨',450,8],['neon','shirt','Neon Lix','💙',600,10],
    ['runner','shoe','Runner Shoes','👟',100,2],['blueStep','shoe','Blue Steps','👟',130,3],['speed','shoe','Speed Shoes','⚡',220,4],['light','shoe','Blue Light Shoes','💠',320,6],['dash','shoe','Dash Boots','🥾',420,8],['turbo','shoe','Turbo Boots','🚀',550,11],
    ['cap','acc','Lix Cap','🧢',100,2],['glasses','acc','Cool Glasses','🕶️',150,3],['visor','acc','Blue Visor','🥽',200,4],['backpack','acc','City Backpack','🎒',260,5],['headphones','acc','Lix Headphones','🎧',300,6],['star','acc','Star Badge','⭐',350,7],['crown','acc','Mini Crown','👑',700,12],
    ['spark','effect','Blue Spark','✨',250,5],['trail','effect','Speed Trail','💨',400,7],['glow','effect','Lix Glow','🔵',550,9],['royal','effect','Royal Aura','💫',800,13],['legend','effect','Legend Effect','🌟',1000,16]
  ].map(x=>({id:x[0],cat:x[1],name:x[2],icon:x[3],cost:x[4],lv:x[5]}));
  const names={shirt:'👕 Top',shoe:'👟 Shoes',acc:'🎒 Accessory',effect:'✨ Effect'};
  function ensure(){
    S.custom=S.custom||{};
    S.custom.owned=Array.isArray(S.custom.owned)?S.custom.owned:[];
    S.custom.equipped=S.custom.equipped&&typeof S.custom.equipped==='object'?S.custom.equipped:{};
    S.custom.home=Array.isArray(S.custom.home)?S.custom.home:[];
  }
  function item(id){return items.find(x=>x.id===id)}
  function equip(cat,id){ensure(); if(!S.custom.owned.includes(id)){toast('🔒 Buy this item first');return;} S.custom.equipped[cat]=S.custom.equipped[cat]===id?null:id; save(); render();}
  function buy(id){ensure();const x=item(id);if(!x)return;if(S.level<x.lv){toast('🔒 Unlocks at Level '+x.lv);return}if(S.custom.owned.includes(id)){equip(x.cat,id);return}if(!spend(x.cost))return;S.custom.owned.push(id);S.custom.equipped[x.cat]=id;addXP(Math.min(50,Math.round(x.cost/10)));save();toast('✨ '+x.name+' added and equipped');render();}
  function preview(){
    const eq=S.custom.equipped||{};
    const layers=['shirt','shoe','acc','effect'].map(cat=>{const x=item(eq[cat]);return x?`<span class="wardrobe-layer ${cat}" title="${x.name}">${x.icon}</span>`:''}).join('');
    const equipped=['shirt','shoe','acc','effect'].map(cat=>{const x=item(eq[cat]);return `<div class="wardrobe-slot"><span>${names[cat]}</span><b>${x?x.icon+' '+x.name:'— Nothing equipped'}</b>${x?`<button onclick="LixWardrobe.toggle('${cat}','${x.id}')">REMOVE</button>`:''}</div>`}).join('');
    return `<div class="wardrobe-stage"><div class="wardrobe-lix"><img src="lix.png"><div class="wardrobe-layers">${layers}</div></div><div class="wardrobe-slots">${equipped}</div></div>`;
  }
  function render(){
    ensure(); const owned=S.custom.owned; const q=window.lixWardrobeFilter||'all';
    const cats=['all','shirt','shoe','acc','effect'];
    const visible=items.filter(x=>q==='all'||x.cat===q);
    const cards=visible.map(x=>{
      const have=owned.includes(x.id), eq=S.custom.equipped[x.cat]===x.id, can=S.level>=x.lv;
      return `<article class="wardrobe-item ${!can?'locked':''} ${eq?'equipped':''}"><div class="wardrobe-icon">${x.icon}</div><div class="wardrobe-info"><b>${x.name}</b><small>Lv.${x.lv} • ${x.cost} 🪙</small></div>${eq?`<button class="wardrobe-action active" onclick="LixWardrobe.toggle('${x.cat}','${x.id}')">✓ EQUIPPED</button>`:have?`<button class="wardrobe-action" onclick="LixWardrobe.toggle('${x.cat}','${x.id}')">EQUIP</button>`:can?`<button class="wardrobe-action buy" onclick="LixWardrobe.buy('${x.id}')">BUY</button>`:`<button class="wardrobe-action disabled" disabled>Lv.${x.lv}</button>`}</article>`;
    }).join('');
    shell(`<section class="card wardrobe-head"><div class="title"><div><h2>👕 Lix Wardrobe</h2><small>Buy pieces separately • mix & match freely</small></div><b>${owned.length}/${items.length}</b></div>${preview()}</section><section class="card"><div class="wardrobe-tabs">${cats.map(c=>`<button class="${q===c?'on':''}" onclick="LixWardrobe.filter('${c}')">${c==='all'?'All':names[c]}</button>`).join('')}</div><div class="wardrobe-grid">${cards}</div></section><section class="card"><div class="title"><h2>🎉 Event Styles</h2><small>Limited items can be added without replacing your wardrobe</small></div><p class="muted">Event pieces use the same slots, so you can combine a standard Top with an Event Effect, Shoes, or Accessory.</p></section>`,'more');
  }
  window.LixWardrobe={open:render,filter:q=>{window.lixWardrobeFilter=q;render()},buy,toggle:equip};
  window.customization=render;
})();
