/* LIX CITY v1.3 — Economy & Store Bundle */
(function(){
  const KEY='lixcity_economy_v1';
  const C={
    alfa:[{id:'a1',name:'Alfa $1',price:'120,000 LBP',coins:25},{id:'a5',name:'Alfa $5',price:'520,000 LBP',coins:110},{id:'a10',name:'Alfa $10 + 7GB',price:'1,050,000 LBP',coins:230}],
    touch:[{id:'t1',name:'touch $1',price:'120,000 LBP',coins:25},{id:'t5',name:'touch $5',price:'520,000 LBP',coins:110},{id:'t10',name:'touch $10 + package',price:'1,050,000 LBP',coins:230}]
  };
  function d(){
    if(!window.S)return {};
    S.econ=S.econ&&typeof S.econ==='object'?S.econ:{};
    S.econ.purchases=Number(S.econ.purchases)||0;
    S.econ.marketVisits=Number(S.econ.marketVisits)||0;
    S.econ.lastMarket=Number(S.econ.lastMarket)||0;
    S.econ.coinsSpent=Number(S.econ.coinsSpent)||0;
    return S.econ;
  }
  function saveNow(){try{if(typeof save==='function')save()}catch(e){}}
  function toastMsg(m){try{toast(m)}catch(e){alert(m)}}
  function shopLinks(){
    const cfg=window.__cellixConfig;
    return cfg&&cfg.products?cfg.products:[];
  }
  function buy(id){
    const e=d();
    const product=[...C.alfa,...C.touch].find(x=>x.id===id); if(!product)return;
    const links=shopLinks();
    const provider=id[0]==='a'?'Alfa':'touch';
    const found=links.find(x=>x.provider?.toLowerCase()===provider.toLowerCase()&&x.active&&x.url);
    if(found){window.open(found.url,'_blank','noopener');}
    e.purchases++; e.lastMarket=Date.now(); saveNow();
    toastMsg('🛍️ '+product.name+' opened');
    render();
  }
  function market(){
    const e=d(); e.marketVisits++; e.lastMarket=Date.now(); saveNow();
    render();
  }
  function render(){
    const host=document.getElementById('econHub'); if(!host||!window.S)return;
    const lvl=Number(S.level)||1, locked=lvl<4, e=d();
    host.innerHTML=`<section class="econ-shell">
      <div class="econ-head"><div><small>CELLIX ECONOMY</small><h2>Store & Market</h2><p>Recharge, shop and grow your city.</p></div><div class="econ-wallet"><b>🪙 ${Number(S.coins)||0}</b><span>Coins</span></div></div>
      ${locked?`<div class="econ-lock">🔒 Cellix Store unlocks at <b>Level 4</b>.</div>`:`<div class="econ-tabs"><button class="econ-tab active" onclick="LixEconomy.filter('all')">All</button><button class="econ-tab" onclick="LixEconomy.filter('alfa')">Alfa</button><button class="econ-tab" onclick="LixEconomy.filter('touch')">touch</button></div><div id="econProducts" class="econ-products"></div>`}
      <div class="econ-market"><div><b>🏬 Lix Market</b><small>Build your city economy • Visits ${e.marketVisits}</small></div><button onclick="LixEconomy.visitMarket()">ENTER MARKET</button></div>
      <div class="econ-note">Admin-managed shop links stay private from players. BUY NOW opens the configured external store.</div>
    </section>`;
    if(!locked)filter('all');
  }
  function filter(type){
    const host=document.getElementById('econProducts'); if(!host)return;
    let arr=type==='alfa'?C.alfa:type==='touch'?C.touch:[...C.alfa,...C.touch];
    host.innerHTML=arr.map(p=>`<article class="econ-product"><div class="econ-logo">${p.id[0]==='a'?'A':'T'}</div><div class="econ-info"><b>${p.name}</b><small>${p.price}</small><span>Bonus value • ${p.coins} Coins</span></div><button onclick="LixEconomy.buy('${p.id}')">BUY NOW</button></article>`).join('');
  }
  window.LixEconomy={render,buy,filter,visitMarket:market};
  document.addEventListener('DOMContentLoaded',()=>setTimeout(render,500));
})();
