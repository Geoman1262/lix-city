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
