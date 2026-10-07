---
slug: "welcome"
locale: "en"
translation_key: "welcome"
title: "Welcome to Your New Blog"
category: "Getting started"
meta_title: ""
meta_description: "A tour of this blog template: where the posts live, how the layout is configured, and what to change before you launch."
excerpt: "A quick tour of the template. Where posts live, what the config file controls, and the short list of things to change before launch."
published_at: "2026-10-07T12:00:00.000Z"
updated_at: "2026-10-07T12:00:00.000Z"
---

## Everything is a file

Posts are markdown files in `content/blog/`. There is no database and no admin panel. To publish, add a file, commit, and push; the host rebuilds and every page is generated as static HTML.

## One config file runs the site

`site.config.ts` holds the site name, domain, logo text, brand colors, analytics IDs, and every word of the call to action. Change a color there and the buttons, gradients, sidebar promo, favicon, and social image all follow.

## What to change before launch

1. Edit `site.config.ts`: name, url, wordmark, monogram, theme, cta, and copy.
2. Delete these sample posts and add your own.
3. Read the privacy and terms pages and adjust them for the site.
4. Deploy, then submit `/sitemap.xml` in Search Console.

## The calls to action

Every article links readers to the destination in `site.cta.url` from five places: the nav button, the sidebar promo, a box inserted mid-article, the block at the end, and the footer. Each link is tagged with `utm_content` naming its placement, so your analytics show which one earns the clicks.
