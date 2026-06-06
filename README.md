# DragonSea MC — Official Website

The official website for **DragonSea Minecraft**, a modern city-building / railway / airports Minecraft server built on Forge (Arclight).

**Author:** [@leodenglovescode](https://github.com/leodenglovescode)

---

## Tech Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Vue I18n](https://vue-i18n.intlify.dev/) — auto-detects EN / ZH browser locale

## Features

- **4 selectable themes** — players vote for their preferred design via a floating THEME panel, saved to localStorage
- **Full i18n** — all UI text in English and Chinese
- **Live server status** — online player count and latency via Minecraft server API
- **Animated SVG city skyline** — buildings rise on page load in the Urban Survey theme

## Themes

| Command | Theme | Description |
|---|---|---|
| `npm run dev` | Blocky Brutalist | Original dark brutalist style |
| `npm run dev:metro` | Metro Map | Light transit-map aesthetic |
| `npm run dev:fids` | FIDS Board | Dark amber airport departure board |
| `npm run dev:survey` | Urban Survey | Warm paper engineering document style |

## Getting Started

```bash
npm install
npm run dev          # Brutalist (default)
npm run dev:survey   # Urban Survey theme
npm run build        # Production build
```

## Pages

- `/` — Home: server status, join links, modpack, dynmap, transit guide
- `/about` — About: server story, features, development timeline, team
- `/gallery` — Gallery: in-game screenshots

## Server Info

| | |
|---|---|
| **Address** | `mc.dragonseamc.com` |
| **China Relay** | `59.110.15.54:25565` |
| **Version** | Forge / Arclight 1.19.4 |
| **Modpack** | [Download](https://mcd.shutterwingphotos.cn/) (required) |
| **Dynmap** | [Live Map](http://103.236.71.249:8100/) |
| **Transit Guide** | [Network Map](http://103.236.71.249:8123/) |
