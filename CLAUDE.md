# divine-shine-website

Next.js site (pnpm). Deploys to Vercel.

## Checks, verify & deploy (this repo)
Global ship flow applies (`feat/*`/`fix/*` → checks → `reviewer` → handoff → "ship it" → squash to `main`). Repo specifics:
- **Checks:** `pnpm lint && pnpm build` (no test or typecheck script)
- **Verify (UI):** Vercel preview at `divine-shine-website-git-<branch>-kunzncos-projects.vercel.app`
- **Goes live:** merge to `main` → Vercel auto-deploys (Next.js on Vercel; no `vercel.json`, zero-config). GitHub `kunznco/divine-shine-website`.
