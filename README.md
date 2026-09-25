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
