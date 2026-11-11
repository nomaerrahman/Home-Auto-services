# APEX Craftsmen & Studio: High-Ticket Services Template

A hybrid demo site for high-ticket service businesses ($1k–$250k jobs). The **Industry Mode** switcher in the header swaps the content, imagery, pricing, estimator logic and accent colour live, which makes it easy to show the right version to each prospect on a demo call.

**Trades:** Auto Detailing · Home Remodeling · Outdoor Living / Landscaping · Interior Design

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

**Demo tip:** link straight to a trade with `?trade=auto`, `?trade=remodel`, `?trade=landscape` or `?trade=interior`. The last trade you chose is also remembered in the browser.

## Stack

Next.js 14 (App Router, TypeScript) · Tailwind CSS 3 · Framer Motion 11 · Lucide React · self-hosted fonts via Fontsource (Big Shoulders Display, Manrope, JetBrains Mono), so the build needs no Google Fonts network call.

UI primitives (`components/ui/button.tsx`, `badge.tsx`) follow the shadcn pattern (variant maps plus `cn()`), restyled with APEX tokens. You can run `npx shadcn@latest init` later to add more primitives; they will pick up the same Tailwind tokens.

## Directory structure

```
app/
  layout.tsx              Fonts, metadata, <TradeProvider>
  page.tsx                Section composition
  globals.css             Base styles, CSS accent variables, range-slider styling
  api/lead/route.ts       Lead endpoint (stub: connect to your CRM here)
components/
  providers/trade-provider.tsx    Global trade + booking-drawer state; sets --accent vars
  layout/   navbar.tsx · trade-switcher.tsx · footer.tsx
  sections/ hero · packages · craftsmanship · transformations · estimator
            portfolio · standards · reviews · contact
  interactive/ before-after-slider · project-modal · booking-drawer
  ui/       button · badge · logo · smart-image · reveal · section-heading · animated-number
lib/
  data/  trades.ts · services.ts · projects.ts · reviews.ts
         transformations.ts · estimator.ts · images.ts
  types.ts · utils.ts · nav.ts
tailwind.config.ts        Industrial-luxury palette + dynamic accent tokens
```

## Theme tokens

| Token | Hex | Use |
|---|---|---|
| `titanium` | `#121316` | Page background |
| `carbon` | `#1C1E22` | Panels and cards |
| `copper` | `#D97706` | Brand accent (Auto mode default) |
| `bronze` | `#B45309` | Deep accent |
| `bone` | `#F3F4F6` | Text |
| `accent` / `accent-deep` / `accent-soft` | CSS vars | Re-tinted per trade in `lib/data/trades.ts` |

## Customising for a client

1. **Brand:** edit `BRAND` in `lib/data/trades.ts` and replace the SVG mark in `components/ui/logo.tsx`.
2. **Photos:** replace the Unsplash URLs in `lib/data/images.ts` with the client's own job photos. If an image fails to load, it falls back to a branded placeholder, so the layout never shows a broken image.
3. **Before/after:** in `lib/data/transformations.ts`, add real before and after photos taken from the same angle, and set `simulateBefore: false`. The demo uses one photo with a "weathered" filter on the before side.
4. **Pricing:** set tier prices in `services.ts` and the estimator formula inputs in `estimator.ts`.
5. **Reviews:** `reviews.ts` contains **sample reviews for demo use only**. Replace them with the client's real, verified reviews before going live.
6. **Leads:** `app/api/lead/route.ts` currently only logs the lead. Connect it to HubSpot, Jobber, ServiceTitan, GoHighLevel or an email service. Photo uploads are captured in the drawer (with previews) but not sent anywhere yet; add S3 or Uploadthing to send them.
7. **Currency:** change `CURRENCY` in `lib/utils.ts` (for example `{ code: "GBP", locale: "en-GB" }`).
