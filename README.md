# DragonSea MC — Official Website

The official website for **DragonSea Minecraft**, a modern city-building / railway / airports Minecraft server built on Forge (Arclight).

**Author:** [@leodenglovescode](https://github.com/leodenglovescode)

---

## Tech Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Vue I18n](https://vue-i18n.intlify.dev/) — auto-detects EN / ZH browser locale

## Features

- **Urban Survey design** — city planning blueprint aesthetic, warm paper and Prussian blue ink
- **Light / dark mode** — toggle in the navbar (☀ / ☾), saved to localStorage; dark mode swaps to a "night blueprint" palette
- **Full i18n** — all UI text in English and Chinese
- **Live server status** — online player count and latency via Minecraft server API
- **Animated SVG city skyline** — buildings rise on page load
- **Gallery lightbox** — click a screenshot to zoom in, click outside the image to close

## Getting Started

```bash
npm install
npm run dev          # Start dev server
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
