---
slug: "how-posts-are-ordered"
locale: "en"
translation_key: "how-posts-are-ordered"
title: "How Posts Are Ordered on the Blog"
category: "Growth"
meta_title: ""
meta_description: "The blog index orders posts by real search performance from Search Console, so your best pages are featured automatically."
excerpt: "Your best-performing posts lead the index, fill the Start here rail, and show up as related reading. The order comes from your own Search Console data."
published_at: "2026-10-05T12:00:00.000Z"
updated_at: "2026-10-05T12:00:00.000Z"
---

## Search performance, not dates

The index features the post that earns the most search clicks, and the rest follow in order of clicks, then impressions. New posts with no data yet appear after the ranked ones, newest first.

## Refreshing the order

Export the Pages report from Google Search Console (last three months works well), then run:

```bash
npm run rank -- ~/Downloads/your-export/Pages.csv
```

That rewrites `content/blog/ranking.json`. Commit it and push.

## Where the order shows up

The featured post, the full list, the "Start here" rail, and the related posts under each article all use it, so readers always land on the pages that already work.
