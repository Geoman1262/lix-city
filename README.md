# LIX CITY v0.40

Mobile-first standalone web game by Cellix.

## v0.40 — Installable Web Game
- Added PWA manifest.
- Added service worker for faster repeat loading and basic offline fallback.
- Added installable standalone display on supported browsers.
- Kept Cellix Shop admin-managed through `shop-config.json`.
- Kept existing save system, Energy, games, missions, spin, streak, pets, social and progression unchanged.

## Run
Open the GitHub Pages URL. On supported Android browsers use **Add to Home screen / Install app**.


## v0.40
- Added an in-game Install LIX CITY button.
- Uses the browser install prompt when available; otherwise shows Android browser instructions.
- Does not change player save data.


## v0.58 Major Architecture
Core systems are separated into feature modules:
save.js, games.js, city.js, pets.js, missions.js, events.js, leaderboard.js, shop.js, achievements.js.
The existing save/recovery logic remains the source of truth.

## v0.59 Progression Layer
Added profile.js, progression.js, rewards.js, notifications.js and integrated profile/progression/notification UI.

## v0.60 Game Integration
Added game-engine.js for centralized play/win stats and reward persistence, plus Game Performance UI.
