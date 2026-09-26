const CACHE='lix-city-v2.2';
const ASSETS=[
  './index.html','./style.css','./v18.css','./v21.css','./manifest.json',
  './lix.png','./coin.png','./cat.png','./dog.png','./horse.png','./cellix-logo.webp',
  './save.js','./games.js','./city.js','./city-buildings.js','./pets.js','./missions.js',
  './events.js','./leaderboard.js','./shop.js','./achievements.js','./profile.js','./progression.js',
  './rewards.js','./notifications.js','./game-engine.js','./building-activities.js','./city-interaction.js',
  './content-v18.js','./v18-hub.js','./wardrobe-v19.js','./mega-v21.js','./city-life.js',
  './building-interiors.js','./house-interior.js','./v1-core.js','./economy-v1.js','./shop-config.json'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const copy=res.clone();
    caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
    return res;
  }).catch(()=>caches.match('./index.html'))));
});
