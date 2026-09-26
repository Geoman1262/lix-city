/* LIX CITY v1.8 — Content Catalog & Progression Data */
window.LixV18Content={
  catalog:[
    ['top','Sky Tee','👕',90,2,'Common'],['top','Blue Hoodie','🧥',140,2,'Common'],['top','Runner Jersey','🥋',180,3,'Common'],['top','City Bomber','🧥',260,4,'Common'],['top','Ocean Jacket','🌊',340,5,'Rare'],['top','Night Jacket','🌙',420,6,'Rare'],['top','Cloud Suit','☁️',520,7,'Rare'],['top','Royal Jacket','👑',700,9,'Epic'],['top','Neon Suit','💙',850,11,'Epic'],['top','Golden Suit','✨',1200,15,'Legendary'],
    ['shoe','Street Shoes','👟',80,2,'Common'],['shoe','Blue Runners','👟',120,3,'Common'],['shoe','Dash Shoes','⚡',190,4,'Common'],['shoe','Light Runners','💠',280,5,'Rare'],['shoe','Turbo Boots','🚀',400,7,'Rare'],['shoe','Sky Boots','☁️',520,9,'Epic'],['shoe','Golden Steps','✨',900,14,'Legendary'],
    ['acc','Lix Cap','🧢',70,2,'Common'],['acc','Cool Glasses','🕶️',110,3,'Common'],['acc','Blue Visor','🥽',150,4,'Common'],['acc','City Backpack','🎒',220,5,'Rare'],['acc','Headphones','🎧',260,6,'Rare'],['acc','Star Badge','⭐',300,7,'Rare'],['acc','Mini Crown','👑',600,10,'Epic'],['acc','Jet Pack','🎒',800,13,'Epic'],['acc','Champion Medal','🏅',1000,16,'Legendary'],
    ['effect','Blue Spark','✨',180,3,'Common'],['effect','Speed Trail','💨',260,5,'Rare'],['effect','Blue Glow','🔵',360,7,'Rare'],['effect','City Pulse','🌃',480,9,'Epic'],['effect','Royal Aura','💫',650,12,'Epic'],['effect','Legend Aura','🌟',1000,16,'Legendary'],
    ['top','Park Hoodie','🌳',300,7,'Rare'],['top','Workshop Jacket','🛠️',360,8,'Rare'],['top','Market Coat','🏬',440,10,'Rare'],['top','Studio Jacket','🎨',500,12,'Epic'],['top','Arena Jacket','🏆',900,20,'Legendary'],
    ['acc','Park Badge','🌳',180,7,'Rare'],['acc','Workshop Goggles','🥽',280,12,'Rare'],['acc','Market Bag','🛍️',300,15,'Epic'],['acc','Arena Medal','🏆',700,20,'Legendary'],
    ['effect','Park Leaves','🍃',300,7,'Rare'],['effect','Workshop Sparks','⚙️',420,12,'Epic'],['effect','Market Shine','💎',550,15,'Epic'],['effect','Arena Flame','🔥',900,20,'Legendary']
  ].map((x,i)=>({id:'v18_'+i,cat:x[0],name:x[1],icon:x[2],cost:x[3],lv:x[4],rarity:x[5]})),
  events:[
    {id:'halloween',name:'Halloween Night',icon:'🎃',styles:['Pumpkin Hoodie','Ghost Glow','Night Cap'],reward:250},
    {id:'winter',name:'Lix Winter Festival',icon:'🎄',styles:['Winter Coat','Snow Aura','Holiday Boots'],reward:300},
    {id:'summer',name:'Lix Summer Days',icon:'🏖️',styles:['Summer Tee','Beach Shades','Sun Glow'],reward:200},
    {id:'citycup',name:'Lix City Cup',icon:'🏆',styles:['Champion Top','Cup Medal','Victory Aura'],reward:500}
  ],
  achievements:[
    ['first_game','First Game','🎮','Finish your first game',1,50],['city_explorer','City Explorer','🏙️','Collect 5 city coins',5,75],['collector','Collector','👕','Own 5 customization items',5,100],['pet_friend','Pet Friend','🐾','Play with your pet',1,75],['builder','Builder','🏗️','Reach Player Level 5',5,150],['game_master','Game Master','🏆','Reach Game Center Level 3',3,150],['rich_city','Coin Collector','🪙','Hold 1000 Coins',1000,150],['streak','Hot Streak','🔥','Reach a 7-day streak',7,200],['event_runner','Event Runner','🎉','Earn event points',100,150],['social','City Visitor','🌐','Visit another city',1,100],['pet_level','Pet Expert','🐶','Reach Pet Level 5',5,200],['prestige_ready','Prestige Ready','⭐','Reach Player Level 50',50,1000]
  ]
};
