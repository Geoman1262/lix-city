LIX CITY v2.6.4 — BOOT + UI FIX

- Restores the main app boot by loading app.js explicitly.
- Keeps the existing local save key untouched.
- Bumps service-worker cache to v2.6.4.
- Separates floating launchers from the mobile bottom navigation.
- Preserves Lix, Coin and pet assets.

Upload every file directly to the repository root. Do not clear browser storage.


## v2.6.5 Hub Fix
- Fixed `esc is not defined` inside Lix Player Center / Open Hub.
- Added local HTML escaping helper to mega-v21.js.
- Reduced floating-button overlap and kept them above bottom navigation.
- Save schema and player data unchanged.

## v2.7 Mega City & Player Bundle
- LIX CITY CENTER dashboard
- Player profile and stable Player ID display
- House Interior with 12 furniture items, purchases and equip/unequip
- Separate storage keys for v2.7 additions; core save remains untouched
- City/Game/Pet quick navigation from City Center
- Mobile responsive modal UI

## v2.7.1 UI / Navigation Fix
- Command Center now has persistent Back and Close controls.
- Command Center uses a full-screen scrollable layout so all sections remain reachable.
- Legacy floating launchers are hidden while Command is open.
- Command route for Achievements now opens the actual Achievements page instead of the Goals/Wardrobe route.
- Wardrobe, Pets, Games, City and House routes use their intended modules when available.
- No core save reset.
