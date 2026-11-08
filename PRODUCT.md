# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The owner and a small group of friends at Vanderbilt who already know campus dining: hall names, rough hours, and the usual stations. They use it on their phones, often installed to the home screen as a PWA.

## Product Purpose

Re-publishes the week's Vanderbilt dining menus and hours from NetNutrition, which is slow and hard to use on a phone, as a fast mobile app. It serves two jobs equally:

- **Deciding where to eat now.** Which halls are open, and what's on at the next meal, in a few seconds.
- **Planning ahead.** Browsing the rest of the week and seeing when favorite dishes show up.

Success means opening the app is faster and clearer than asking a friend or checking NetNutrition.

## Positioning

A personal, unofficial tool built for a small group that knows campus. The whole week is bundled into the app, so it loads instantly with no backend, no account, and no network fetch. Favorites follow a dish across every hall and day.

## Operating Context

- Mostly one-handed phone use while walking or between classes. Also used for longer planning sessions.
- Data is refreshed about once a week by a manual, agent-driven scrape into `data/menu.json`, `data/hours.json`, and `data/quickStops.json`, then committed. A push to `main` redeploys on Vercel.
- Open/closed status and "today" use campus time (America/Chicago).

## Capabilities and Constraints

- 8 dining halls with a week of Breakfast/Lunch/Dinner. Pub uses Mains/Sides/Drinks. Roth and Carmichael serve Sunday Brunch.
- Quick stops (grab-and-go locations) show open/closed status and hours only, not menus.
- Favorites and the accent choice are stored on the device in localStorage. There are no accounts and no sync between devices.
- Data can be up to a week stale. The app shows the last sync date.
- A day or meal with no dishes is shown as "NO SERVICE", never hidden.
- Stack: Next.js 16 App Router, React 19, Tailwind CSS 4. Static, no client-side data fetching.

## Brand Commitments

- **Unofficial.** It must never look or read like an official Vanderbilt or Campus Dining product: no Vanderbilt marks or official-looking branding.
- **User-choosable accent.** The pink/green accent toggle is a feature to keep.
- The "DINING.SYS" name and the terse all-caps copy are current choices, not binding.

## Evidence on Hand

- Real menu, hours, and quick-stop data in `data/`.
- PWA manifest and icons in `public/`.
- No testimonials, usage numbers, or press. Don't invent any.

## Product Principles

1. **Seconds to an answer.** "What's open and what's on" must be readable right after the app opens.
2. **Honest data.** Show closures, no-service meals, and staleness plainly rather than hiding gaps.
3. **Now and later, both first-class.** The quick check and week planning both get first-class paths.
4. **Personal, not official.** It's a friend's tool, so it can be opinionated, but it must never pretend to be the university.
