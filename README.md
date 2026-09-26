# LIX CITY v1.9 — Mix & Match Wardrobe

Major customization upgrade based on v1.8.

## Wardrobe
- Buy individual Top, Shoes, Accessory and Effect items.
- Owned pieces are kept separately.
- One item per slot can be equipped, removed, and replaced independently.
- Visual dressing-room preview keeps the original Lix asset untouched and shows equipped pieces as separate visual badges.
- Event styles use the same slots and can be combined with standard pieces.

## Assets
Lix, Coin, Dog, Cat and Horse remain separate files. Replacing an asset file does not change the game logic.

## Save
Uses the existing save/localStorage system. Existing progress is preserved.


## v2.0 Persistent Achievements
- Achievements is a persistent first-class screen.
- Player summary remains visible while browsing achievements.
- Claiming an achievement keeps the player on the page and restores scroll position.
- Full achievement list remains mounted as one page.


## v2.1 Mega Progression
- Player Center: Profile, Goals, Collection, Events, Social foundation, Inbox, Settings.
- 12 long-term goals with persistent claim state.
- Event calendar/templates separated from permanent systems.
- Collection summary and notifications.
- Preferences saved in S.v21 without replacing the existing save key.


## v2.2 Deployment Repair
- Fixed service-worker reference to the non-existent `wardrobe-v20.js`; current file is `wardrobe-v19.js`.
- Service worker now precaches all local JS/CSS/assets used by `index.html`.
- Manifest start URL is version-neutral (`./`) to reduce stale-cache launches.
- Legacy files are retained but not injected into the page unless referenced by `index.html`.
- Upload the entire package contents, preserving filenames.
