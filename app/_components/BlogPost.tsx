// Article page, shared by /blog/[slug] and /es/blog/[slug]: left rail with
// the table of contents and CTA promo, the article, an end CTA, related posts,
// and a link to the other-language version when one exists.
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import {
  getAllPublishedPosts,
  getBlogPost,
  getBlogPosts,
  getTranslation,
  formatPostDate,
  readingTime,
} from '@/lib/blog';
import { blogPath, ctaUrl, site, type Lang } from '@/site.config';
import { ogLocale, ui } from '@/lib/i18n';
import SiteNav from './SiteNav';
import Footer from './Footer';
import { BrandMark } from './Brand';
import { BlogCover } from './BlogCover';
import { BlogPromo } from './BlogPromo';
import ArticleEnhancements from './ArticleEnhancements';

const otherOf = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

export async function blogPostParams(lang: Lang) {
  const posts = await getAllPublishedPosts();
  return posts.filter((p) => p.locale === lang).map((p) => ({ slug: p.slug }));
}

export async function blogPostMetadata(lang: Lang, slug: string): Promise<Metadata> {
  const post = await getBlogPost(slug, lang);
  if (!post) return { title: 'Not Found' };

  const title = post.meta_title ?? post.title;
  const description = post.meta_description || post.excerpt;
  const canonical = `${site.url}${blogPath(lang, slug)}`;

  const languages: Record<string, string> = { [lang]: canonical };
  const twin = await getTranslation(post.translation_key, otherOf(lang));
  if (twin) languages[twin.locale] = `${site.url}${blogPath(twin.locale, twin.slug)}`;

  return {
    title: `${title} | ${site.name}`,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      siteName: site.name,
      locale: ogLocale[lang],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export async function BlogPost({ lang, slug }: { lang: Lang; slug: string }) {
  const post = await getBlogPost(slug, lang);
  if (!post) notFound();

  const t = ui[lang];
  const cta = site.copy[lang].cta;
  const url = `${site.url}${blogPath(lang, post.slug)}`;
  const twin = await getTranslation(post.translation_key, otherOf(lang));
  const related = (await getBlogPosts(lang)).filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: lang,
  };

  return (
    <div className="blog-root min-h-screen bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ArticleEnhancements lang={lang} />
      <SiteNav />
      <main className="pt-24 pb-20" lang={lang}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="breadcrumb mb-6" aria-label={t.breadcrumb}>
            <Link href={blogPath(lang)}>Blog</Link>
            <span className="sep">/</span>
            <span className="text-ink-2">{post.title}</span>
          </nav>

          {/* Body: left rail (TOC + promo) | article */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-14 items-start">
            {/* LEFT RAIL */}
            <aside className="hidden lg:block" aria-label={t.sidebar}>
              <div className="rail-sticky rail">
                <nav className="toc" id="article-toc" aria-label={t.onThisPage}>
                  <h4>{t.onThisPage}</h4>
                  <ol />
                </nav>
                <BlogPromo variant="compact" lang={lang} />
              </div>
            </aside>

            {/* ARTICLE */}
            <div className="min-w-0 max-w-[760px]">
              <header className="article-head">
                {post.category && <span className="chip chip-accent">{post.category}</span>}
                <h1>{post.title}</h1>
                {post.excerpt && <p className="article-lede">{post.excerpt}</p>}

                <div className="flex items-center justify-between gap-4 flex-wrap py-4 border-t border-b border-border">
                  <div className="byline">
                    <span className="avatar" aria-hidden>
                      <BrandMark />
                    </span>
                    <div>
                      <div className="who">{site.copy[lang].author}</div>
                      <div className="when">
                        {t.updated} {formatPostDate(post.updated_at, lang)} · {readingTime(post.content)} {t.minRead}
                      </div>
                    </div>
                  </div>
                  <div className="share" aria-label={t.shareThis}>
                    <span className="s-label">{t.share}</span>
                    <a
                      className="s-btn"
                      aria-label={t.shareOnX}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.9 2H22l-7.3 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2l7.8-8.9L1.4 2H8l4.7 6.2L18.9 2Zm-2.3 18h1.8L7.5 3.8H5.6L16.6 20Z" />
                      </svg>
                    </a>
                    <a
                      className="s-btn"
                      aria-label={t.shareOnLinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 22 10.6 22 14v7h-4v-6.2c0-1.5-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.3V21H9V9Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </header>

              <BlogCover className="article-cover" tag={post.category ?? undefined} />

              <article className="prose-blog" id="article-body" lang={lang}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                  {post.content}
                </ReactMarkdown>
              </article>

              {/* End CTA */}
              <div className="end-cta">
                <h2>{cta.heading}</h2>
                <p>{cta.body}</p>
                <a href={ctaUrl(`end-${lang}`)} className="btn-gradient">
                  {cta.button}
                </a>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <section className="mt-16" aria-label={t.related}>
                  <div className="rule-label mb-6">
                    <span>{t.keepReading}</span>
                    <span className="line" />
                  </div>
                  <div className="related">
                    {related.map((p) => (
                      <Link key={p.slug} href={blogPath(lang, p.slug)} className="card card-hover pcard">
                        <BlogCover />
                        <div className="pcard-body">
                          <h3>{p.title}</h3>
                          <time className="post-date mt-auto" dateTime={p.published_at}>
                            {formatPostDate(p.published_at, lang)}
                          </time>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {twin && (
                <div className="mt-10 text-sm text-ink-2">
                  <Link href={blogPath(twin.locale, twin.slug)} className="text-accent hover:text-accent-hover">
                    {t.readInOther}
                  </Link>
                </div>
              )}

              <div className="mt-10 text-center">
                <Link href={blogPath(lang)} className="text-sm text-ink-3 hover:text-accent transition">
                  {t.allPosts}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
