# Edubros — Study in Italy website

Lead-capture site for Edubros, the education-abroad consultancy in Ancona that helps international students apply to Italian universities.

Built with Next.js 16 (App Router), Tailwind CSS v4, Newsreader (serif) and Inter (sans).

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3001>.

## Where everything lives

- `src/lib/site.ts` — single source of truth for phone, email, Instagram, address, founder bio. Edit here to change globally.
- `src/app/page.tsx` — homepage. Each section is a function (`Hero`, `WhyItaly`, `Programs`, `Process`, `LeadFormSection`, `Founder`, `FAQ`, `FinalCTA`, `Footer`). Copy lives inline.
- `src/components/lead-form.tsx` — the lead form. On submit it builds a WhatsApp message and opens `wa.me/393513438159` with it pre-filled.
- `src/components/whatsapp-button.tsx` — reusable WhatsApp link + the floating bottom-right pill.
- `src/components/logo.tsx` — Edubros wordmark + cap badge SVG.
- `src/app/globals.css` — colors (navy, gold, paper) and typography tokens.

## What's still missing

1. **Real photography** — the hero is a navy gradient with an arch pattern; no photos anywhere. Photos of Italy (Ancona/Marche), Italian universities, and your students will lift the whole site. Drop them into `public/` and reference them.
2. **Success stories** — section is intentionally not built. Once you have 3 real testimonials (name, university, program, 1–2 sentence quote, photo), we'll add it.
3. **Real email** — `edubros@gmail.com` is in `site.ts` as a placeholder. Confirm or replace.
4. **Analytics** — no tracking yet. Add Vercel Analytics or Plausible when you deploy.
5. **OG image** — favicon is the Next.js default. Replace `src/app/favicon.ico` and add an OG image at `src/app/opengraph-image.png` (1200×630).

## Deploy

Push to GitHub, then import the repo at <https://vercel.com/new>. Set no env vars. Click deploy. Done.
