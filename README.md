# Vandy Menu

A mobile-first PWA that shows "what's for lunch" at Vanderbilt's dining halls, styled like a retro terminal (see `VandyMenuDesign.md`).

## What it does

- Displays the weekly menu for all 8 Vanderbilt dining halls, filterable by day / hall / meal.
- Read-only, no auth, no database — the whole app renders from one committed JSON file (`data/menu.json`).
- Installable to a phone home screen via the PWA manifest (`public/manifest.json`, `public/icons/`).
- A hall with no dishes for a given day/meal is genuinely closed (e.g. summer session) and shows "NO SERVICE" rather than being hidden.

## Requirements

- Node.js v20+

## How to run it

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. `page.tsx` is a server component that imports `data/menu.json` directly, so editing that file and refreshing is enough to see changes — no rebuild needed in dev.

```bash
npm run build   # production build, also catches type errors
npm run start   # serve the production build locally
```

### Refreshing the menu data

The menu data goes stale weekly and there's no cron job — it's refreshed manually by asking Claude Code to drive a browser against Vanderbilt's NetNutrition site and regenerate `data/menu.json` / `data/meta.json`. Then:

```bash
git add data/menu.json data/meta.json
git commit -m "chore: refresh menu data"
git push
```

Pushing to `main` auto-redeploys on Vercel.

## Architecture & design choices

- Next.js App Router, static-ish rendering — no client-side data fetching, the menu JSON is bundled at build time.
- `src/lib/types.ts` / `src/lib/menu.ts` — the `MenuData` schema and pure filtering helpers; `src/state/useMenuSelection.ts` holds the day/hall/meal selection state.
- `src/components/` — one component per UI piece (`Header`, `*Selector`, `MenuSection`, `DishCard`).
- Visual style follows `VandyMenuDesign.md` (monochrome + neon green accent, square corners, pixel/monospace type) — general architecture reasoning (component/state split) follows standard [React composition patterns](https://react.dev/learn/thinking-in-react), nothing bespoke.

## Todo

- [ ] Connect to GitHub + Vercel for live deployment.
- [ ] Automate the weekly scrape (currently a manual Claude Code session).

## Performance notes

Not yet measured in production — update this once deployed.
