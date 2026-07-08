# Retro Dining Hall Mobile App UI Specification

## Overall Design Philosophy

Create a mobile-first web application with a **retro computer operating system aesthetic** inspired by early DOS interfaces, Game Boy menus, industrial control panels, and modern brutalist UI design.

The interface should feel like a futuristic cafeteria terminal rather than a traditional food app.

Avoid rounded modern mobile UI conventions entirely.

The application should prioritize:

- Extremely fast scanning of information
- Strong visual hierarchy
- Dense information layout
- Minimal visual clutter
- Tactile interface elements
- Pixel-perfect alignment
- Instant responsiveness

The UI should feel engineered rather than decorative.

---

# Color Palette

Use a nearly monochrome interface with a single vibrant accent color.

## Primary Background

Warm off-white.

```css
#F4F4F2
```

Avoid pure white.

---

## Cards

Very light gray.

```css
#EFEFEF
```

---

## Borders

Pure black.

```css
#111111
```

Use consistently.

- No gray borders
- No border opacity

---

## Accent Color

Bright neon green.

```css
#63FF6A
```

Use sparingly for:

- Active tabs
- Selected filters
- Status text
- Indicators
- Highlights

Nothing else.

The green should immediately attract the user's eye.

---

## Text

Primary:

- Black

Secondary:

- Dark gray

Avoid colorful text.

No gradients.

No transparency.

No glassmorphism.

No blur.

---

# Typography

Use two fonts.

## Display Font

Pixelated bitmap style.

Used for:

- Page titles
- Section titles
- Dining hall names
- Menu categories
- Tab labels

Characteristics:

- Uppercase only
- Bold
- High letter spacing
- Blocky
- Retro computer aesthetic

Suggested fonts:

- Press Start 2P
- Pixel Operator
- VT323
- Silkscreen

---

## Body Font

Readable monospace.

Suggested fonts:

- IBM Plex Mono
- Space Mono
- JetBrains Mono

Used for:

- Food names
- Descriptions
- Metadata

---

# Layout

Everything aligns to a strict grid.

No floating components.

Everything snaps into place.

Maintain equal spacing throughout.

The app should feel mechanical.

---

# Borders

Every interactive component should have:

- 2px solid black border

No shadows.

No elevation.

No blur.

No glow.

Hierarchy is created using:

- Spacing
- Border thickness
- Typography
- Alignment

---

# Corners

Everything has square corners.

```css
border-radius: 0;
```

No exceptions.

- Cards
- Buttons
- Tabs
- Selectors
- Inputs

---

# Spacing

Use a tight spacing system.

Outer page padding:

```text
16px
```

Component spacing:

```text
12–16px
```

Internal padding:

```text
12px
```

Cards should feel compact without feeling cramped.

---

# Visual Rhythm

Every section should feel like a control panel.

Repeated horizontal dividers create rhythm.

Example:

```text
LUNCH -----------------------

Card

Card

DINNER ----------------------

Card

Card
```

Section titles always align left.

Divider extends across the remaining width.

---

# Top Header

Simple.

Minimal.

Large pixel title.

Small version badge aligned right.

Example:

```text
DINING.SYS

v2.0
```

It should feel like software, not branding.

---

# Day Selector

Immediately below the header.

Horizontal row.

Equal-width buttons.

Each button contains:

- Weekday
- Large date number

Example:

```text
MON
12

TUE
13

WED
14
```

### Selected Day

- Filled neon green
- Black text
- Black border

### Unselected

- Light gray background
- Black border

Interaction should be nearly instantaneous.

---

# Dining Hall Selector

Located beneath the day selector.

Horizontally scrollable when necessary.

Rectangular buttons.

Uppercase labels.

Example:

```text
ALL

COMMONS

EBI

RAND

KISSAM
```

### Selected

- Green fill

### Unselected

- Light gray

---

# Meal Selector

Same visual style as the dining hall selector.

Example:

```text
BREAKFAST

LUNCH

DINNER
```

One active at a time.

No pills.

No rounded corners.

---

# Menu Sections

Each meal section contains:

- Large pixel heading
- Horizontal divider

Example:

```text
LUNCH -----------------------
```

Spacing above and below remains consistent.

---

# Food Cards

Cards are the primary UI component.

Characteristics:

- Bordered
- Rectangular
- No border radius
- Compact
- High information density

## MVP

Initially display only:

- Food name

Example:

```text
KOREAN BBQ
CAULIFLOWER
```

Food names should wrap naturally.

Never truncate.

---

# Expandable Cards

Cards expand vertically.

## Collapsed

Show only:

- Food name

## Expanded

Reveal:

- Description
- Calories
- Protein
- Dietary tags
- Station
- Availability

Expansion animation:

- ~150ms
- Height transition only
- No spring physics
- Immediate and responsive

---

# Icons

Avoid modern outlined icon libraries.

Prefer:

- Pixel icons
- Geometric icons
- Extremely minimal icons

Icons should never dominate the interface.

---

# Information Density

Prioritize displaying as many menu items as possible.

Users should scan vertically.

Avoid:

- Oversized cards
- Excessive whitespace
- Decorative graphics

---

# Button Style

Buttons should resemble physical terminal buttons.

Characteristics:

- Square
- Bordered
- Uppercase
- Compact
- No shadows
- No rounded corners

## Pressed State

Invert the background.

## Selected State

Fill with neon green.

---

# Motion

Overall feeling:

- Fast
- Mechanical
- Intentional

Avoid:

- Bounce
- Elasticity
- Large fades
- Sliding page transitions

Use:

- Instant state changes
- 100–200ms transitions
- Simple expand/collapse
- Quick color transitions

Nothing playful.

---

# Scroll Behavior

Vertical scrolling.

The following should remain sticky while scrolling:

- Day selector
- Dining hall selector
- Meal selector

Meal section headers may optionally become sticky as well.

---

# Alignment

Everything aligns to the same left edge.

Nothing should appear visually centered unless intentionally centered.

Text alignment:

- Mostly left

Numbers inside buttons may be centered.

---

# Design Language

Think of every component as a piece of industrial hardware.

The interface should feel:

- Engineered
- Modular
- Tactile
- Functional
- Timeless

Avoid:

- Gradients
- Floating cards
- Neumorphism
- Glassmorphism
- Material Design styling
- iOS Human Interface styling
- Oversized rounded corners
- Colorful illustrations
- Excessive animations

---

# Responsive Behavior

The application is mobile-first.

Desktop should preserve the exact same visual language.

Simply widen the content area while maintaining:

- Compact spacing
- Sharp edges
- Dense information layout
- Terminal-like appearance

The desktop experience should feel like a larger control console rather than a redesigned desktop application.

---

# UX Priorities

From highest to lowest priority:

1. Instantly scan today's menu.
2. Switch between dining halls with one tap.
3. Switch between breakfast, lunch, and dinner instantly.
4. Expand a food item only when additional information is desired.
5. Preserve the fast, compact, retro-computer aesthetic throughout the experience.

---

# Overall Inspiration

The visual language should closely resemble the provided reference image.

Recreate its aesthetic with high fidelity while adapting the information architecture specifically for a dining hall application.

Core components should include:

- Terminal-style header
- Horizontal day selector
- Horizontal dining hall selector
- Horizontal meal selector
- Expandable bordered food cards
- Dense, highly scannable content
- Pixel-inspired typography
- Sharp black borders
- Restrained monochrome palette with neon green as the sole accent

The finished product should feel like interacting with a polished retro operating system designed specifically for browsing a cafeteria menu quickly and efficiently, combining modern web responsiveness with almost no modern visual embellishments.