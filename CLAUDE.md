# CLAUDE.md — Blog Template

@AGENTS.md

This repo is a **reusable blog template**, and copies of it run individual
sites. See README.md for setup and the post format.

## Rules

- **All site-specific values live in `site.config.ts`.** Never hardcode a site
  name, domain, color, analytics ID, or CTA copy in components. If something new
  needs to vary per site, add it to the config.
- **EN and ES share one implementation.** Page logic lives in
  `app/_components/BlogIndex.tsx` and `BlogPost.tsx`; the route files only pass
  `lang`. Interface words go in `lib/i18n.ts` for both languages.
- **Fully static.** No database, API routes, or env vars. Posts are read from
  `content/blog/` at build time.
- **Brand colors are CSS variables** overridden from `site.theme` in
  `app/layout.tsx`. Use the `accent-*` tokens or `color-mix()` on them in CSS,
  never raw brand hex values.
- **Deleted or renamed posts get a permanent redirect** in `next.config.ts`.
- **Voice rules for copy and sample posts:** no em dashes, no exclamation marks,
  no corporate filler; plain language for non-technical readers.
