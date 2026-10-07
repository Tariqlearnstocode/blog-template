# Blog Template

A fast, static, bilingual (EN/ES) blog: editorial index, article pages with a
sticky table of contents and reading progress, a branded sidebar promo, and
calls to action that send readers to your main site. Posts are markdown files;
there is no database. Extracted from aibraindocs.com.

**Stack:** Next.js 16 (App Router, fully static), Tailwind CSS 4, react-markdown.
Seven runtime dependencies, no environment variables.

## Launch a new blog

1. **Copy the template.**
   ```bash
   cp -R ~/Coding/blog-template ~/Coding/my-new-blog && cd ~/Coding/my-new-blog
   rm -rf .git && git init
   npm install
   ```
2. **Edit `site.config.ts`.** It's the only file with site-specific values:
   name, domain, logo text and monogram, brand colors, analytics IDs, the CTA
   destination, and all the copy (EN + ES). Remove `'es'` from `languages` for
   an English-only site.
3. **Replace the sample posts** in `content/blog/` (keep the `_template-*.md`
   files).
4. **Check the privacy and terms pages** (`app/privacy`, `app/terms`). They're
   generic starters for a content site with analytics and ads.
5. **Preview:** `npm run dev`, then open http://localhost:3000.
6. **Deploy** to Vercel (import the repo; no settings needed). Then submit
   `https://your-domain/sitemap.xml` in Google Search Console.

## Writing posts

Copy `content/blog/_template-en.md`, fill in the frontmatter, write markdown,
commit, push.

| Field | Required | Notes |
|---|---|---|
| `slug` | yes | URL: `/blog/<slug>` (or `/es/blog/<slug>`) |
| `locale` | yes | `en` or `es` |
| `translation_key` | yes | Same value in an EN and ES file pairs them (hreflang, language links) |
| `title` | yes | 50-65 characters is ideal |
| `category` | no | Chip on the article + label on its cover |
| `meta_title` | no | Overrides the `<title>` |
| `meta_description` | no | 140-155 characters; falls back to `excerpt` |
| `excerpt` | yes | 2-3 plain sentences for the index card |
| `published_at` | yes | ISO date; future dates stay hidden until a rebuild after that date |
| `updated_at` | no | Defaults to `published_at` |

Values are quoted strings. `##` and `###` headings build the table of contents.
Don't write CTAs into posts; the layout adds them.

**Deleting or renaming a post:** add a permanent redirect in `next.config.ts`
to its closest surviving post.

## Ordering by search performance

The index, featured post, "Start here" rail, and related posts follow
`content/blog/ranking.json`. Refresh it from a Search Console Pages export:

```bash
npm run rank -- ~/Downloads/your-export/Pages.csv
```

Unranked posts (new ones) come after ranked posts, newest first.

## Customizing the look

- **Colors:** `site.theme` in `site.config.ts`. Neutrals (background, ink,
  borders) are the `@theme` tokens at the top of `app/globals.css`.
- **Logo:** the mark is a gradient tile with `site.monogram`. For a real logo,
  replace `BrandMark` in `app/_components/Brand.tsx` with your SVG and drop an
  `app/icon.png` / `app/apple-icon.png` in place of the generated ones.
- **Interface words** ("Featured", "Keep reading", "min read"...):
  `lib/i18n.ts`.

## Where things are

```
site.config.ts                 all site-specific values
content/blog/                  posts (*.md), templates (_*.md), ranking.json
app/_components/BlogIndex.tsx  blog index (shared by EN + ES)
app/_components/BlogPost.tsx   article page (shared by EN + ES)
app/_components/               nav, footer, promo, covers, TOC/progress/inline CTA
app/blog, app/es/blog          thin route files
lib/blog.ts                    reads and orders posts at build time
lib/i18n.ts                    interface labels per language
app/globals.css                design tokens + blog styles
scripts/update-ranking.mjs     Search Console → ranking.json
```
