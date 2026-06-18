# Eagle Eye Rides — Theming Guide

This document explains how the Eagle Eye Rides UI Kit theme works and how to
**completely rebrand it** by changing a single file.

---

## TL;DR — How to rebrand

Open **`src/app/globals.css`** and edit the CSS custom properties (variables) in
the `:root` (light) and `.dark` (dark) blocks. Every component in the kit reads
colors from these variables — **no component file needs to change**.

```css
/* src/app/globals.css */
:root {
  --primary: oklch(0.55 0.2 262);        /* ← change the brand color here */
  --primary-foreground: oklch(0.99 0 0);
  /* ... */
}
.dark {
  --primary: oklch(0.62 0.18 262);       /* ← and here for dark mode */
  /* ... */
}
```

That's it. The entire UI kit (109 components) instantly adopts the new color.

---

## The token system

All colors are defined as **OKLCH** values in `globals.css` and exposed to
Tailwind via the `@theme inline` block. Every component uses semantic Tailwind
classes (`bg-primary`, `text-muted-foreground`, `border-border`, etc.) that
resolve to these variables.

### Core semantic tokens

| Tailwind class | CSS variable | Light value | Dark value | Used for |
|---|---|---|---|---|
| `bg-background` | `--background` | near-white navy | deep navy | page background |
| `text-foreground` | `--foreground` | dark navy | near-white | primary text |
| `bg-card` | `--card` | white | elevated navy | cards, surfaces |
| `text-card-foreground` | `--card-foreground` | dark navy | near-white | text on cards |
| `bg-popover` | `--popover` | white | elevated navy | dropdowns, popovers |
| `bg-primary` | `--primary` | **royal blue** | **royal blue** | primary actions, CTA |
| `text-primary-foreground` | `--primary-foreground` | white | white | text on primary |
| `bg-secondary` | `--secondary` | light navy | mid navy | secondary surfaces |
| `bg-muted` | `--muted` | light navy | mid navy | subtle backgrounds |
| `text-muted-foreground` | `--muted-foreground` | gray-blue | light gray | secondary text |
| `bg-accent` | `--accent` | light blue-gray | mid navy | hover, active states |
| `bg-destructive` | `--destructive` | red | red | errors, danger |
| `border-border` | `--border` | light gray | white/9% | all borders |
| `--input` | `--input` | light gray | white/12% | input borders |
| `--ring` | `--ring` | primary blue | primary blue | focus rings |

### Brand accent tokens (service-specific)

The kit defines **6 accent colors** beyond primary, each tied to a service or
status. These are what make a mobility app's UI scannable at a glance.

| Tailwind class | Light value | Dark value | Used for |
|---|---|---|---|
| `bg-brand` / `text-brand` | = primary | = primary | default accent |
| `bg-cyan` / `text-cyan` | `oklch(0.7 0.13 215)` | `oklch(0.68 0.13 210)` | **Reserve** service |
| `bg-amber` / `text-amber` | `oklch(0.72 0.16 55)` | `oklch(0.72 0.16 55)` | **Packages** service |
| `bg-magenta` / `text-magenta` | `oklch(0.6 0.22 330)` | `oklch(0.62 0.22 330)` | **Ads** service |
| `bg-gold` / `text-gold` | `oklch(0.82 0.15 90)` | `oklch(0.82 0.16 90)` | **Tow/Premium**, ratings |
| `bg-success` / `text-success` | `oklch(0.7 0.16 155)` | `oklch(0.72 0.16 155)` | completed, positive |

Each accent has a `-foreground` companion for text-on-color contrast.

### Sidebar tokens (admin)

The admin console uses a separate set so it can have its own surface tone:

| Class | Variable | Purpose |
|---|---|---|
| `bg-sidebar` | `--sidebar` | sidebar background |
| `text-sidebar-foreground` | `--sidebar-foreground` | sidebar text |
| `bg-sidebar-primary` | `--sidebar-primary` | active nav item |
| `bg-sidebar-accent` | `--sidebar-accent` | hover background |
| `border-sidebar-border` | `--sidebar-border` | sidebar borders |

### Chart tokens

`--chart-1` through `--chart-5` map to the 5 brand accents so charts stay
on-brand automatically.

### Radius tokens

```
--radius: 0.875rem  (base, = 14px)
--radius-sm … --radius-4xl  (computed multiples)
```
Change `--radius` to make the whole kit more or less rounded.

---

## How accents are applied in components

Components never hardcode `bg-cyan` etc. — they use the shared `Accent` type
and accent maps from `src/components/eer/accents.ts`:

```ts
import { accentSolid, accentSoft, type Accent } from "@/components/eer/accents";

// Solid: full-color tile (icons on service cards)
<div className={accentSolid[accent]} />

// Soft: tinted background (badges, subtle highlights)
<Badge className={accentSoft[accent]} />
```

This means if you add a new accent, you only extend `accents.ts` + the CSS
variables — every component that takes an `accent` prop picks it up.

---

## What does NOT change with the brand (intentional)

A few colors are **semantic, not brand** — they should stay constant across
rebrands because they communicate universal meaning:

1. **Surge pricing gradient** (`surge-pricing-card.tsx`): green→amber→red heat
   scale. This is a universal "danger increases" signal, not a brand color.
2. **Destructive/red** for errors and SOS alerts.
3. **Status colors** (success=green, pending=amber) — these are conventional.

If you want these to also follow the brand, replace the hardcoded Tailwind
palette classes (e.g. `from-emerald-500`) with your own CSS variables.

---

## Step-by-step: create a new theme variant

Let's say you want an **"Emerald Night"** theme (emerald primary, dark green
navy neutrals).

### 1. Edit `src/app/globals.css`

```css
:root {
  --primary: oklch(0.6 0.15 160);              /* emerald */
  --primary-foreground: oklch(0.99 0 0);
  --ring: oklch(0.6 0.15 160);
  --brand: oklch(0.6 0.15 160);
  /* keep the rest, or tweak neutrals toward green: */
  --background: oklch(0.17 0.02 160);
  --card: oklch(0.23 0.025 160);
  /* ... */
}
.dark {
  --primary: oklch(0.68 0.16 160);
  --brand: oklch(0.68 0.16 160);
  /* ... */
}
```

### 2. (Optional) Rebind service accents

If emerald is now your primary, reassign `--cyan` (Reserve) to a contrasting
hue so services stay distinguishable, e.g.:
```css
--cyan: oklch(0.7 0.13 250);   /* shift cyan toward blue */
```

### 3. Done

No component files change. The whole kit — mobile screens, admin dashboard,
emails (emails hardcode oklch values for email-client safety, see below),
charts, badges — all reflect the new theme.

---

## Email templates — special case

Emails can't use CSS variables (email clients don't support them), so the 10
email components in `src/components/eer/emails/` hardcode the **light-theme
oklch values** as inline styles (defined in `email-primitives.tsx` as
`emailColors`). To rebrand emails:

1. Open `src/components/eer/emails/email-primitives.tsx`.
2. Edit the `emailColors` object (mirrors the light-theme tokens):
   ```ts
   export const emailColors = {
     brand: "oklch(0.55 0.2 262)",   // ← change to your new primary
     // ...
   };
   ```
3. All 10 emails update.

---

## Dark mode

The kit uses `next-themes` with `attribute="class"` and `defaultTheme="dark"`.
The toggle is `src/components/eer/theme-toggle.tsx`. To change the default:

```tsx
// src/app/layout.tsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
```

Dark mode is applied via the `.dark` class on `<html>`, which overrides the
`:root` variables. Both palettes are defined in the same `globals.css`.

---

## Adding a new accent color

1. In `globals.css`, add the variable to both `:root` and `.dark`:
   ```css
   --violet: oklch(0.6 0.2 300);
   --violet-foreground: oklch(0.99 0 0);
   ```
2. In `globals.css` `@theme inline`, expose it to Tailwind:
   ```css
   --color-violet: var(--violet);
   --color-violet-foreground: var(--violet-foreground);
   ```
3. In `src/components/eer/accents.ts`, add `"violet"` to the `Accent` type and
   to both `accentSolid` and `accentSoft` maps:
   ```ts
   export type Accent = "brand" | "cyan" | "amber" | "magenta" | "gold" | "success" | "violet";
   export const accentSolid = { /* ... */ violet: "bg-violet text-violet-foreground" } as const;
   ```
4. Done — every `ServiceCard`, `StatusBadge`, `RideOption`, etc. can now take
   `accent="violet"`.

---

## Quick reference: file responsibilities

| File | Responsibility |
|---|---|
| `src/app/globals.css` | **All color + radius tokens.** This is the only file to edit for rebranding. |
| `src/app/layout.tsx` | ThemeProvider config (default theme, attribute) |
| `src/components/eer/accents.ts` | Accent type + maps (add new accents here) |
| `src/components/eer/theme-toggle.tsx` | Light/dark switch button |
| `src/components/theme-provider.tsx` | next-themes wrapper |
| `src/components/eer/emails/email-primitives.tsx` | Hardcoded email colors (separate from CSS vars) |

---

## Verification checklist after rebranding

- [ ] Primary buttons, badges and the center CTA reflect the new color
- [ ] Focus rings use the new color
- [ ] Active sidebar nav item uses the new color
- [ ] Charts use the new chart-1 token
- [ ] Dark mode still has sufficient contrast (check `--muted-foreground`)
- [ ] Service accent colors are still distinguishable from the new primary
- [ ] Email CTA buttons (in `email-primitives.tsx`) updated to match
