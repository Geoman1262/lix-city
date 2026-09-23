/* LIX CITY Cellix Shop Module - v0.58
   Product links remain admin-managed; players never enter URLs. */
window.CellixShop = {
  configUrl:"shop-config.json",
  load(){
    return fetch(this.configUrl,{cache:"no-store"}).then(r=>r.ok?r.json():{products:[]}).catch(()=>({products:[]}));
  }
};
