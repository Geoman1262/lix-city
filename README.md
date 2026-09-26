LIX CITY v0.67 — Interactive Building Interiors

Buildings now open interactive in-city panels for House, Games, Cellix Store, Park, Energy Station, Workshop, Market, Studio, Stable, Plaza and Arena.

# LIX CITY v0.64 — House & Building Progression

Major update built on v0.63.

## Real changes
- Added `city-buildings.js` API.
- Added persistent `S.cityBuilds` building progression.
- Added per-building levels, unlock levels, upgrade costs and max levels.
- Added City Buildings management UI directly inside the City screen.
- House progression follows Player/House Level; other buildings can be upgraded with Coins once unlocked.
- Upgrades award XP and persist through the existing save system.
- Game Engine stats namespace advanced to v0.64.
- Service-worker cache version advanced to v0.64.

## Prototype note
Save is still localStorage-based. Cloud/server-side save and anti-cheat are not production-ready yet.


## v0.65 — Visible City Evolution
- Building upgrade levels now visibly change building scale, lighting, shadows, and facade highlights in the city.
- Building labels show their actual building level when unlocked.
- City buildings use a 0–5 visual stage based on their saved building level.
- House progression remains tied to Player/House Level with its existing 5-level exterior stages.

## v0.66 — Living City
- Added `city-life.js` for a lightweight living-city layer.
- Day / Sunset / Night city atmosphere.
- Moving residents and cars in the city scene.
- City exploration action grants +10 XP and tracks visits.
- Uses the existing Lix asset unchanged.
- Prototype save remains localStorage-based; server-side security/cloud save is still a future production step.


## v0.68 — Building Activity System
- Interactive building actions added to House, Market, Studio, Park, Plaza and Arena.
- Building interiors expose real upgrade controls tied to the existing city-buildings save state.
- Daily building activities persist in the player save.
- Added `building-activities.js` and bumped service-worker cache version.

## v0.70 — House Interior & Furniture
- Added `house-interior.js` with persistent furniture/decor purchases.
- Added three House rooms with level-gated access.
- Furniture purchases consume Coins and grant one-time XP.
- Added House Interior UI and mobile styling.
- Preserved the existing House/Player Level progression and save system.


## v0.70
Visual City Upgrade: replaced emoji NPCs/cars with CSS-rendered city residents and vehicles, added skyline/plaza/water layers, reduced empty sky, preserved exact Lix asset, and refreshed PWA cache.


## v0.72
Fixed the city renderer: building fronts were collapsed by a later CSS rule, leaving only roofs visible. Forced real building bodies and made the original Lix asset always visible above the city. Replaced emoji-only tree/lamp visuals with CSS scenery.


## v0.74 — City Interaction Layer
- Added City Rating derived from Player Level, building progression and city visits.
- Added Focus Lix camera action and daily Lix greeting (+5 XP once per 24h).
- Added visual tap target for the real Lix asset.
- Added distinct visual treatment for city buildings.
- Added `city-interaction.js` and updated service worker cache.


## v0.75 — Visual Game Center
- Added a dedicated visual Game Center arcade room using the exact `lix.png` asset.
- Added three visible arcade machines for Target, Runner, and Catch & Bomb.
- Added direct play buttons and room-level display.
- Existing game logic, upgrades, saves, and navigation remain intact.


## v0.76 — Visual Stable & Pets
- Added a visual Lix Stable scene with the original Lix asset.
- Added CSS-rendered Dog/Cat/Horse companions instead of emoji-only pet visuals.
- Added companion collection/unlock flow and pet XP/happiness presentation.
- Existing pet care, daily play, save, and energy logic preserved.


## v1.1 — Major Build
Unified dashboard layer added on top of the existing City, House, Games, Pets, Store, Missions, Spin, Leaderboard and Events systems. Existing player save key is preserved; no reset or migration overwrite is performed. Added v1-core.js and unified Command Center dashboard.


## v1.2 Critical UI/Render Fix
Inline critical CSS was added to guarantee the Major Build dashboard styling and stable Lix sizing even if style.css cache is stale.


## v1.5 Economy Build
Added Cellix Store/Market economy UI, provider filtering, admin-managed external-link opening, and mascot size safety bounds.


## v1.5 Pet Visual Assets
- Added real 3D pet artwork assets: dog.png, cat.png, horse.png.
- Pet cards, Stable companion, and City companion now use image assets instead of CSS/emoji animals.
- Lix and official coin assets remain unchanged.


## v1.5 Game Start Fix
- Fixed game start flow so consuming Energy never re-renders the Home screen.
- Added a guarded game session boot to prevent duplicate/hidden game sessions.
- Target, Runner and Catch & Bomb now enter the game screen after Energy is consumed.
- Existing save data and assets remain unchanged.
