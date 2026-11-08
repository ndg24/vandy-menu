---
target: main menu screen
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\nilan\\OneDrive\\MyProjects\\inProgress\\vandy-menu\\src\\components\\MenuApp.tsx"
target_fingerprint: "sha256:aca4d3f0b7238e1c56af7727add53e2111899c402133ad70860117fd00213b4d"
target_path: "C:\\Users\\nilan\\OneDrive\\MyProjects\\inProgress\\vandy-menu\\src\\components\\MenuApp.tsx"
timestamp: 2026-11-08T18-06-11Z
slug: src-components-menuapp-tsx
---
Method: dual-agent (A: design review, B: detector + browser overlay)

## Design Health Score: 22/40 (Acceptable)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Badge/tints show live status even when viewing another day |
| 2 | Match System / Real World | 2 | "OPENS SUN 3PM" ambiguous; dish cards are " & "-joined bundles |
| 3 | User Control and Freedom | 3 | One-tap reversible; no undo on favorite removal |
| 4 | Consistency and Standards | 1 | Accent = selected + open + favorited; closed tint ~ pink selected |
| 5 | Error Prevention | 2 | Favorites keyed to joined strings |
| 6 | Recognition Rather Than Recall | 2 | ~2.5 of 10 hall chips visible at 390px; day row shown where inert |
| 7 | Flexibility and Efficiency | 2 | Always opens Rand; no last-hall memory / open-first |
| 8 | Aesthetic and Minimalist | 3 | Disciplined; sticky chrome ~270px (~32% of phone) |
| 9 | Error Recovery | 2 | NO SERVICE is a dead end |
| 10 | Help and Documentation | 3 | Little needed; empty-favorites copy teaches |

## Design Specificity Verdict
Skin authored (pixel font, mono, square borders, acid accent, clearly unofficial); skeleton generic (3 tab rows + card list). Detector: 0 findings (CLI src/components src/app exit 0; in-page overlay "No anti-patterns found").

## Priority Issues
- [P0] Default view doesn't answer "where to eat now": always opens Rand (useMenuSelection.ts:34) even when closed. Fix: default to first open hall / last viewed, or a NOW home view. Cmd: layout / shape.
- [P1] Open/closed ignores selected day/meal (HallStatusBadge.tsx:19, DiningHallSelector.tsx). Fix: show selected day's hours for selected meal off-today; drop live tints. Cmd: clarify.
- [P1] Accent overloaded; open/closed via red-green tint only visually. Fix: accent = selected only; visible ●/○ open marker; neutral badge with words. Cmd: colorize.
- [P2] Favorites on joined strings: 192/253 entries contain " & " (verified). Fix: split dishes, star each; migrate stored favorites. Cmd: harden.
- [P2] Hall row overflows, mixes views with halls; day row inert in Favorites/Quick Stops. Fix: 2-option view toggle, 4x2 hall grid, hide day row where inert. Cmd: layout.

## Persona Red Flags
- Casey: horizontal swipe at top; 32% sticky chrome; 2+ extra taps from closed default.
- Sam: selector rows lack group labels; badge lacks hall name; literal arrow read aloud; scroll-to-top doesn't move focus.
- Alex: no remembered state; no all-halls-this-meal view; favorites list past days.

## Minor Observations
Mixed-case "SYNCED Nov 8"; badge outside <main>; hours panel persists across halls; Pub tabs each one 7-item card; empty desktop margins.

## Questions to Consider
1. Why is the first screen a form instead of the answer?
2. Does the day row earn permanent sticky space?
3. Is a favorite a dish or a station?
