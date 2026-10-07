---
slug: "writing-a-post"
locale: "en"
translation_key: "writing-a-post"
title: "How to Write and Publish a Post"
category: "Writing"
meta_title: ""
meta_description: "How to add a post to this blog: the frontmatter fields, Spanish versions, categories, and how deleted posts should redirect."
excerpt: "Copy a template, fill in the frontmatter, write in markdown, and push. Here is what each field does and the few rules worth following."
published_at: "2026-10-06T12:00:00.000Z"
updated_at: "2026-10-06T12:00:00.000Z"
---

## Start from a template

Copy `_template-en.md` (or `_template-es.md`), rename it, and fill in the frontmatter. Files that start with an underscore are never published.

## The fields that matter

- **slug** becomes the URL: `/blog/your-slug`.
- **translation_key** pairs an English post with its Spanish version. Use the same value in both files.
- **category** is optional. It shows as a chip on the article and as the label on its cover.
- **published_at** controls the date shown and hides the post until that date passes and the site rebuilds.

## Headings build the table of contents

Every `##` and `###` heading becomes an entry in the "On this page" rail, and the mid-article call to action is inserted at the heading nearest the middle. Write in clear sections and both work on their own.

## Deleting a post

Never leave a dead URL behind. Add a permanent redirect in `next.config.ts` from the old slug to the closest surviving post, so links and rankings carry over.
