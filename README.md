# LIX CITY v0.20 — Daily Missions

Built on the stable v0.19 save system.

- Permanent save key: `lixcity_player_save_v1`
- Energy regeneration and countdown preserved
- Daily Missions now track progress automatically
- 5 missions reset every 24 hours
- Missions give XP only when claimed
- No extra completion bonus
- Lix, Coin, Cellix logo and city assets preserved


## v0.21 Energy Fix
Energy uses a single nextEnergyAt timestamp: +1 Energy every 15 minutes, with no multi-point jump caused by repeated renders or reloads. Save key remains lixcity_player_save_v1.
