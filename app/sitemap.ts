import type { MetadataRoute } from 'next';
import { getAllPublishedPosts } from '@/lib/blog';
import { blogPath, site } from '@/site.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...site.languages.map((lang, i) => ({
      url: `${site.url}${blogPath(lang)}`,
      changeFrequency: 'weekly' as const,
      priority: i === 0 ? 1 : 0.9,
    })),
    { url: `${site.url}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Posts, with hreflang alternates pairing each post with its translation
  // (matched by translation_key).
  const posts = await getAllPublishedPosts();
  const byKey = new Map<string, Partial<Record<string, string>>>();
  for (const post of posts) {
    const entry = byKey.get(post.translation_key) ?? {};
    entry[post.locale] = `${site.url}${blogPath(post.locale, post.slug)}`;
    byKey.set(post.translation_key, entry);
  }

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const pair = byKey.get(post.translation_key) ?? {};
    const languages: Record<string, string> = {};
    for (const [l, u] of Object.entries(pair)) if (u) languages[l] = u;
    if (pair.en) languages['x-default'] = pair.en;
    return {
      url: `${site.url}${blogPath(post.locale, post.slug)}`,
      lastModified: post.updated_at,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      ...(Object.keys(pair).length > 1 ? { alternates: { languages } } : {}),
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
