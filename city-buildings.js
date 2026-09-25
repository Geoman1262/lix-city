/* LIX CITY v0.65 — City Buildings API */
window.LixCityBuildings={
  ensure(){ if(typeof ensureCityBuilds==='function') return ensureCityBuilds(); return {}; },
  level(type){ return Number(window.S?.cityBuilds?.[type]?.level)||0; },
  cost(type){ return typeof buildingCost==='function'?buildingCost(type):0; },
  upgrade(type){ return typeof upgradeBuilding==='function'?upgradeBuilding(type):false; }
};
