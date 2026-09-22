# LIX CITY v0.37

## Cellix Shop — Admin Managed Links

The player-facing Cellix Shop is **read-only**. Players do not enter or edit store URLs.

Store products and external links are intended to be published by the **Cellix Admin Panel** through `shop-config.json` (or the production backend that replaces this file).

Each product supports:
- id
- name
- provider
- price (display only)
- url
- active

Only active products with a published URL are shown to players.

### Important
This GitHub Pages prototype is static. A real Admin Panel must write the shop configuration to a shared backend/database or publish the config file. Browser localStorage is not a cross-player Admin Panel connection.

The game keeps the existing save key and gameplay systems.
