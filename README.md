# EduSoft System Solutions — website

Next.js (App Router) rebuild of [edusoftsolutions.com](https://edusoftsolutions.com): dark/light themes, 3D hero, smooth scrolling and page-by-page motion.
All copy, products, client lists, testimonials, team and contact details come from the live site (see **Content** below).

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP + Lenis · React Three Fiber (hero orb)

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy on Vercel
1. Import this repository in Vercel (framework preset: **Next.js**, no extra settings).
2. Optional environment variable:
   - `INQUIRY_WEBHOOK_URL` — Contact / Free Offer submissions are POSTed here as JSON (Zapier, Make, Slack, your own endpoint…).
     Without it, submissions are only written to the server log. To send e-mail instead, edit `src/app/api/inquiry/route.ts`.
3. Set your domain; update `SITE.url` in `src/lib/site.ts` so the sitemap, robots and structured data use it.

## Project map
| Path | What lives there |
| --- | --- |
| `src/app` | Routes: home, `about/*`, `solutions/[category]/[product]`, `services/[slug]`, `portfolio`, `contact`, `free-offer`, `login`, `feedback`, `sitemap`, API `api/inquiry` |
| `src/components` | UI: navbar, hero, product/category views, forms, animations |
| `src/lib/site.ts` | Brand constants, navigation labels, exact hero copy, team, About text, CEO message |
| `src/lib/data.ts` / `content.ts` | Typed access to the scraped JSON (`content.ts` is the small, client-safe subset) |
| `src/data/*.json` | Scraped content (products, services, testimonials, privacy policy…) |
| `public/img`, `public/downloads` | Images and brochure PDFs mirrored from the live site |

## Content
Content was copied from the live site with `scripts/scrape.mjs`; re-run it to refresh the JSON and images:
```bash
npm run scrape
```
Other helper scripts: `npm run qa` (crawls a running site for broken links/images, missing titles, alt text…) and `npm run logo`
(rebuilds the high-resolution logo files from the original artwork).

## Notes
- Theme (dark/light) is stored in `localStorage` and follows the OS setting on first visit.
- The login pages post directly to edusoftsolutions.com; authentication stays on the existing server.
- Rate-limiting on `/api/inquiry` is in-memory (per server instance). Use a shared store (e.g. Upstash Redis) if you need it across instances.
