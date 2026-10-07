// Blog data access helpers.
// Posts are markdown files in content/blog/ (frontmatter + body), read at build
// time. Every page is statically generated — no database, no runtime reads.

import fs from 'fs';
import path from 'path';
import { site, type Lang } from '@/site.config';

export type BlogPost = {
  slug: string;
  locale: Lang;
  translation_key: string;
  title: string;
  /** Optional label shown as a chip on the article and its cover. */
  category: string | null;
  meta_title: string | null;
  meta_description: string;
  excerpt: string;
  content: string;
  published_at: string;
  updated_at: string;
};

const POSTS_DIR = path.join(process.cwd(), 'content/blog');

// Frontmatter is `key: value` lines. Values may be JSON-quoted or bare; an
// empty value ("" included) means null.
function parsePost(file: string): BlogPost {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${file}: no frontmatter block`);

  const fm: Record<string, string | null> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const raw = kv[2].trim();
    const value = raw.startsWith('"') ? JSON.parse(raw) : raw;
    fm[kv[1]] = value === '' ? null : value;
  }

  for (const field of ['slug', 'locale', 'translation_key', 'title', 'published_at']) {
    if (!fm[field]) throw new Error(`${file}: missing frontmatter field "${field}"`);
  }

  return {
    slug: fm.slug!,
    locale: fm.locale as Lang,
    translation_key: fm.translation_key!,
    title: fm.title!,
    category: fm.category,
    meta_title: fm.meta_title,
    meta_description: fm.meta_description ?? '',
    excerpt: fm.excerpt ?? '',
    content: match[2].trim(),
    published_at: fm.published_at!,
    updated_at: fm.updated_at ?? fm.published_at!,
  };
}

let cache: BlogPost[] | null = null;

/** Every published post, newest first. Files starting with "_" are templates. */
function allPosts(): BlogPost[] {
  if (!cache) {
    const now = new Date().toISOString();
    cache = fs
      .readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md')
      .map(parsePost)
      .filter((p) => p.published_at <= now && site.languages.includes(p.locale))
      .sort((a, b) => b.published_at.localeCompare(a.published_at));
  }
  return cache;
}

const UNRANKED = Number.MAX_SAFE_INTEGER;

// Search performance order, from content/blog/ranking.json
// (rebuilt by scripts/update-ranking.mjs from a Search Console export).
function rankOf(locale: Lang): Map<string, number> {
  const file = path.join(POSTS_DIR, 'ranking.json');
  const ranking: Partial<Record<Lang, string[]>> = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, 'utf8'))
    : {};
  return new Map((ranking[locale] ?? []).map((slug, i) => [slug, i]));
}

/**
 * List published posts for a locale, best-performing first. Posts missing
 * from the ranking follow, newest first.
 */
export async function getBlogPosts(locale: Lang, limit = Infinity): Promise<BlogPost[]> {
  const rank = rankOf(locale);
  return allPosts()
    .filter((p) => p.locale === locale)
    // Unranked posts tie, and the stable sort keeps them newest first.
    .sort((a, b) => (rank.get(a.slug) ?? UNRANKED) - (rank.get(b.slug) ?? UNRANKED))
    .slice(0, limit);
}

/** Fetch a single published post by slug + locale. Returns null if not found. */
export async function getBlogPost(slug: string, locale: Lang): Promise<BlogPost | null> {
  return allPosts().find((p) => p.slug === slug && p.locale === locale) ?? null;
}

/** Find the partner-locale post for hreflang generation. */
export async function getTranslation(
  translationKey: string,
  locale: Lang,
): Promise<BlogPost | null> {
  return allPosts().find((p) => p.translation_key === translationKey && p.locale === locale) ?? null;
}

/** All published posts — used by generateStaticParams and the sitemap. */
export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  return allPosts();
}

/** Format a published_at ISO string for display. */
export function formatPostDate(iso: string, locale: Lang): string {
  return new Date(iso).toLocaleDateString(locale === 'es' ? 'es-419' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Estimated reading time in minutes (~200 words per minute). */
export function readingTime(content: string): number {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}
