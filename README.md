# Reset Detox — website v1

Astro 7 (static) + TypeScript. Spec: the Website Requirement Document in Claude Docs. Design rules: `DESIGN.md`. Product context: `PRODUCT.md`.

## Run

Astro 7 needs Node 22.23 or newer. This machine has Node 20, so the build uses a portable Node 22 (path saved in `.n22`):

```bash
source .n22
"$N22" node_modules/astro/bin/astro.mjs dev      # http://localhost:4321
"$N22" node_modules/astro/bin/astro.mjs build    # output in dist/
"$N22" node_modules/astro/bin/astro.mjs preview
```

With Node 22 installed system-wide: `npm install`, then `npm run dev` / `npm run build`.

## Where things live

| What | File |
| --- | --- |
| Prices, SKUs, programs, flavours | `src/data/catalog.json` |
| WhatsApp number, cut-off rules, zones, schedule, contraindications, FAQ | `src/data/site.json` |
| Testimonials (all `consent: false` until written permission exists) | `src/data/stories.json` |
| Cart, dates, WhatsApp message | `src/scripts/cart.ts` |
| Tokens and shared components | `src/styles/global.css`, `src/layouts/Base.astro` |
| Program page template | `src/components/ProgramPage.astro` |

## Before launch

- Confirm every value marked "konfirmasi" in the WRD (2026 prices, cut-off, zones, WhatsApp number, schedule hours, nutrition from lab tests).
- Written consent for every story, then set `consent: true` (the "Draf" chip disappears).
- Official favicon/icon file from the brand team (`public/favicon.svg` is a placeholder dot).
- Legal review of claims and of `/privasi`.
