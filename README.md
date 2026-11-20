# Amoke Oge — Restaurant Website Concept

A premium, mobile-first website concept for **Amoke Oge**, the Lagos restaurant known for amala, ewedu and gbegiri, jollof, ofada rice and other Nigerian dishes. It was built to show management what the brand's online presence could look like.

> **Status: concept preview.** `conceptMode` is on (`src/config/site.ts`). While it is on, the site shows a small "website concept" ribbon, labels the photography as demonstration imagery and tells search engines not to index it. Turn it off only when management has approved the content and real photography is in place.

## Stack

- **Astro 5** — static output, no runtime server. It can be hosted on Netlify, Vercel, Cloudflare Pages or any static host.
- **TypeScript** with Astro's strict config.
- **Images:** `astro:assets` with sharp. Responsive AVIF and WebP files are generated at build time.
- **Fonts:** Fraunces (display) and Manrope (body), self-hosted through Fontsource. No third-party font requests.
- **JavaScript:** none beyond a few small progressive-enhancement scripts. Every button still works with JavaScript disabled.

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
npm test           # end-to-end checks against dist/ (needs Playwright + Chromium)
```

Set `SITE_URL` (see `.env.example`) to the confirmed domain before deploying. It is used for canonical URLs, Open Graph tags, structured data and the sitemap.

## Where to edit things

| What | File |
| --- | --- |
| **Today's Menu** — availability, prices, meal deals (update daily) | `src/data/todays-menu.ts` |
| WhatsApp number, concept mode, socials, delivery partners, nav | `src/config/site.ts` |
| Branches (address, hours, phone, per-branch WhatsApp, map query) | `src/data/branches.ts` |
| Menu categories and items (optional `price`) | `src/data/menu.ts` |
| Signature dishes and gallery | `src/data/dishes.ts` |
| Photos, alt text and credits | `src/data/photos.ts` and `src/assets/images/` |
| Colours, type scale, buttons | `src/styles/global.css` |

### Adding a branch

Append an entry to `branches` in `src/data/branches.ts`. Everything else updates automatically: the homepage cards, the footer, a new `/locations/<slug>` page, the branch picker in the order form, the sitemap and the structured data.

### Updating Today's Menu

Open `src/data/todays-menu.ts`, set `available: true/false` and `price` for each dish, change `updated` to today's date, then rebuild and deploy. The homepage board, the "available only" filter, the order form's prices and estimated total, and the WhatsApp messages all update together.

The current data is a real snapshot of Amoke Oge's Chowdeck store (Ikoyi) taken on 20 Nov 2026. Chowdeck prices can differ from walk-in prices, so management should confirm their counter prices.

### Activating the WhatsApp number

**Demo setting:** every WhatsApp button currently goes to **+234 814 125 0336**, the website builder's own number, so the demo can be tested end to end. Replace it with Amoke Oge's confirmed number before handover.

Set `site.whatsapp.number` to the confirmed number in international format, digits only (for example `234XXXXXXXXXX`). To route orders for one branch to a different number, set `whatsapp` on that branch. Until a number is set, every WhatsApp button opens WhatsApp with the order message prefilled and lets the customer choose who to send it to, so no button is ever broken.

## Features

- Sticky header that starts transparent over the hero and turns solid on scroll, with active-section highlighting. On phones, a full-height navigation drawer built on the native `<dialog>` element, with focus trapping, Esc to close and staggered animation.
- Editorial split hero with a priority-loaded AVIF/WebP image, a rotating "Abula" badge and both calls to action.
- Brand story, six signature dishes (a swipe carousel on phones, a staggered grid on desktop), and a tabbed menu with five categories. The menu tabs use the ARIA tabs pattern with arrow-key support and stick below the header on phones.
- **WhatsApp ordering:**
  - floating button on every page;
  - "Order this meal" on every dish and menu item;
  - branch-specific ordering;
  - an order-builder dialog: add dishes, set quantities, choose a branch and pickup, dine-in or delivery, add notes and a name, see a live message preview, then continue to WhatsApp.
- Scalable multi-location section with directions, per-branch ordering, and a dedicated SEO page for each branch with an embedded map.
- Gallery with a lightbox (keyboard and swipe), a closing call to action and a full footer.
- **SEO:**
  - per-page titles, descriptions and canonical URLs;
  - Open Graph and Twitter cards with a custom 1200×630 image;
  - Schema.org `Organization`, `Restaurant` per branch, and `BreadcrumbList`;
  - `sitemap.xml`, `robots.txt`, web manifest and icons.
  - No ratings, reviews, prices or unconfirmed phone numbers appear in the structured data.
- **Accessibility:** skip link, semantic landmarks, alt text on every image, visible focus states, `prefers-reduced-motion` support and tap targets of 42–52px.

## Business information status (researched November 2026)

**Verified**
- Official Instagram is [@amokefoodsng1](https://www.instagram.com/amokefoodsng1/). Its bio lists walk-in branches in Onipanu, Surulere, Obalende and Bawala, plus Chowdeck and Glovo ordering.
- **Ikoyi / Obalende:** 95–59 Moshalashi St, Ikoyi, Lagos 106104 (Chowdeck store and Foodie in Lagos).
- **Bawala:** 1 Bawala Street, Pedro, Lagos (several listings and Foodie in Lagos).
- **Menu items:** taken from the Amoke Oge Chowdeck store (Ikoyi) and published visit reviews.

**Needs confirmation from management**
- **WhatsApp number(s):** none confirmed. The demo uses the builder's own number (+234 814 125 0336).
- **Phone numbers:** listings conflict and none is published. Candidates are noted in the comments of `src/data/branches.ts`.
- **Street numbers** for Surulere (Babs Animashaun Road) and Onipanu (Oguntolu Street).
- **Opening hours** for every branch. Listings mostly agree on Tuesday–Sunday with Mondays closed. Chowdeck shows 8am–8pm for Ikoyi.
- **Glovo store link.**
- **Prices:** shown in Today's Menu from the Chowdeck listing; walk-in prices to be confirmed.
- **Official logo**, if one exists. The current wordmark is a concept.
- **Excluded listings:** "Amoke Oge Food Centre" in Mafoluku/Oshodi and "Amoke Ala Amala" in Oregun could not be linked to this brand, so they are left out.

## Photography

All photographs are **demonstration imagery** of Nigerian dishes from Wikimedia Commons (CC BY-SA, CC BY and CC0). They are **not** Amoke Oge's food or premises. Full credits are at `/photo-credits`. Replace them with Amoke Oge's own photography before launch: swap the files in `src/assets/images/` (menu thumbnails live in `src/assets/images/menu/`), update `src/data/photos.ts`, and set `credit: null` for in-house photos. Then run `python3 scripts/placeholders.py` to regenerate the blurred loading previews (needs Pillow).

**Image budget:** source photos are kept at 1600px or smaller, and every generated image must be 200 KB or less. `npm test` fails if any image is larger.

Every image shows a tiny blurred preview of itself while the full image loads, so no image box is ever empty on slow connections.
