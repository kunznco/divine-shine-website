# divine-shine-website

Marketing site for Divine Shine, a window cleaning and pressure washing company in Redding, CA. Next.js App Router, Tailwind v4, deployed on Vercel.

## Run locally

```bash
pnpm install
pnpm dev
```

Opens on http://localhost:3000.

## Checks

```bash
pnpm lint && pnpm build
```

## Tracking

Google Tag Manager is the only tag loaded from code. Set the container ID in `src/data/tracking.ts` (`GTM_CONTAINER_ID`). While it is empty, GTM does not load at all.

The Meta Pixel and Google Analytics 4 are tags inside the GTM container. `tracking/gtm-container.json` is an importable container (GTM Admin > Import Container > Merge) with:

- Meta Pixel base tag on all pages, plus Contact events on call, text, and email clicks
- GA4 Google tag on all pages, plus `phone_call`, `sms_click`, and `email_click` events

After import, set the `Const - GA4 Measurement ID` variable to the GA4 stream's ID. The Meta Pixel ID is prefilled.

## Deploy

Merge to `main`. Vercel auto-deploys. Branch previews live at `divine-shine-website-git-<branch>-kunzncos-projects.vercel.app`.
