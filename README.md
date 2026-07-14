# Vandy Menu

> A mobile-first PWA showing the weekly dining hall menus at Vanderbilt, rendered entirely from a single committed JSON file with no backend or database.

## Overview

Vanderbilt's dining hall menus live on NetNutrition, a slow, non-mobile site most students don't bother checking. Vandy Menu re-publishes that data as a fast, installable PWA: a manual, agent-driven scrape pulls the week's menus into `data/menu.json`, which is committed to git and bundled directly into a statically-rendered Next.js site. There's no backend, no database, and no client-side fetching — the entire app is data-in, static-site-out, and a "deploy" is just a new commit to that file.

## Features

- **8-hall weekly menu grid** — every Vanderbilt dining hall's full week (breakfast/lunch/dinner) renders from `data/menu.json` via pure filtering helpers in `src/lib/menu.ts`, with no runtime API calls.
- **Day/hall/meal selection state** — `useMenuSelection` derives the list of available days from the data itself rather than hardcoding a week, defaults to today's date and the meal period computed from wall-clock time, and falls back to the first available day if today isn't in the dataset.
- **Explicit "NO SERVICE" states** — a hall with no dishes for a given day/meal (e.g. summer session closures) renders as genuinely closed instead of being silently hidden, so the UI reflects real dining hall status rather than an absence of data.
- **Installable PWA** — `public/manifest.json` and a generated icon set make it addable to a phone home screen as a standalone app ("DINING.SYS"), matching the site's terminal-inspired visual style.

## Architecture & Design Decisions

- **Static committed JSON over a database** — the app has no write path from end users; the only writes are a manual, agent-driven scrape you trigger yourself. With no concurrent writes to arbitrate, a database has nothing to protect. Next.js server components import `data/menu.json` directly at build time, so there's zero DB connection or query latency at runtime — the menu is just part of the deployed bundle, which fits Vercel's serverless model without a persistent connection to manage.
- **Next.js App Router, static-ish rendering** — no client-side data fetching; the menu JSON is bundled at build time and a push to `main` triggers a full redeploy. This trades "always instantly fresh" for simplicity, which is a reasonable tradeoff given how infrequently the source data actually changes.
- **Agent-driven scrape instead of a scheduled job** — refreshing `data/menu.json` means asking Claude Code to drive a browser against NetNutrition, rather than running a cron-scheduled scraper service. This avoids keeping an always-on ETL service running for something that only needs to happen about once a week.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Data | Static JSON (`data/menu.json`, `data/meta.json`), committed to git — no database |
| Infra / Deploy | Vercel, auto-deploy on push to `main` |
| Other | PWA manifest + icons, ESLint |

## Getting Started

### Prerequisites

- Node.js v20+

### Installation

```bash
git clone https://github.com/ndg24/vandy-menu.git
cd vandy-menu
npm install
```

### Run

```bash
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
