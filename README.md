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
