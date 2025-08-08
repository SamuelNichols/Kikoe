## Shadowing Buddy

A Vite + React + TypeScript app with a lightweight global store (Zustand). Current features:
- Theme toggle with persistence (light/dark)
- YouTube URL/ID input (extracts the 11‑char video id)
- Clean dev tooling for debugging and performance

### Prerequisites
- Node 18+ (LTS recommended)
- npm (bundled with Node)

### Install
```bash
npm install
```

### Run (development)
```bash
npm run dev
# open the printed localhost URL (default http://localhost:5173)
```

### Build (production)
```bash
npm run build
npm run preview   # serve the production build locally
```

### Project Scripts
- `dev`: start Vite dev server with HMR
- `build`: type-check and build for production
- `preview`: serve the built assets

---

## Debug / Monitoring Toolkit

All tools are free and already wired where applicable.

### 1) React Developer Tools (browser extension)
- Inspect component tree, props, hooks, and use the Profiler.
- Install from your browser’s extension store (Chrome/Edge/Firefox).

### 2) Zustand Devtools (Redux DevTools integration)
- Already enabled in `src/store.ts` for development only.
- Open the Redux DevTools panel in your browser → select `ZustandStore`.
- Time‑travel actions (`setVideoId`, `toggleTheme`) and view diffs.

### 3) Vite Plugin Inspect (optional)
- Configured in `vite.config.ts` to load only in development.
- Visit `http://localhost:5173/__inspect/` for module graph and plugin transforms.

---

## Key Files
- `src/store.ts`: Zustand store with `persist` (localStorage) + devtools in dev
- `src/components/ThemeToggle.tsx`: theme switcher (uses store)
- `src/components/YoutubeURLInput.tsx`: parses YouTube URLs/IDs
- `src/main.tsx`: app entry, loads global styles and dev helpers
- `vite.config.ts`: Vite plugins (React, Inspect in dev)

---

## Notes
- Theme is persisted under localStorage key `jp-shadow-settings`.
- Devtools are stripped in production builds.


