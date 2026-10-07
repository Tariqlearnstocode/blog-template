// Blog index, shared by /blog (English) and /es/blog (Spanish). Posts arrive
// in search-performance order (see lib/blog.ts): the first is featured, the
// first four feed "Start here".
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPosts, formatPostDate, readingTime } from '@/lib/blog';
import { blogPath, site, type Lang } from '@/site.config';
import { ogLocale, ui } from '@/lib/i18n';
import SiteNav from './SiteNav';
import Footer from './Footer';
import { BlogCover } from './BlogCover';
import { BlogPromo } from './BlogPromo';

export function blogIndexMetadata(lang: Lang): Metadata {
  const c = site.copy[lang].blog;
  const canonical = `${site.url}${blogPath(lang)}`;
  const languages: Record<string, string> = {};
  for (const l of site.languages) languages[l] = `${site.url}${blogPath(l)}`;
  return {
    title: `${c.metaTitle} | ${site.name}`,
    description: c.metaDescription,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      url: canonical,
      title: `${c.metaTitle} | ${site.name}`,
      description: c.metaDescription,
      siteName: site.name,
      locale: ogLocale[lang],
    },
  };
}

export async function BlogIndex({ lang }: { lang: Lang }) {
  if (!site.languages.includes(lang)) notFound();
  const t = ui[lang];
  const c = site.copy[lang].blog;
  const other: Lang = lang === 'es' ? 'en' : 'es';
  const posts = await getBlogPosts(lang);
  const [featured, ...rest] = posts;

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: c.metaTitle,
    description: c.metaDescription,
    url: `${site.url}${blogPath(lang)}`,
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    inLanguage: lang,
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${site.url}${blogPath(lang, p.slug)}`,
      datePublished: p.published_at,
      dateModified: p.updated_at,
      author: { '@type': 'Organization', name: site.name },
    })),
  };

  return (
    <div className="blog-root min-h-screen bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <SiteNav />
      <main className="pt-24 pb-20" lang={lang}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <header className="max-w-3xl mb-11">
            <p className="eyebrow mb-3.5">{c.eyebrow}</p>
            <h1 className="text-4xl font-extrabold text-ink leading-[1.12] tracking-tight mb-4">{c.heading}</h1>
            <p className="text-lg text-ink-2 leading-relaxed mb-3.5">{c.intro}</p>
            {c.introSecondary && <p className="text-[15px] text-ink-2 leading-relaxed">{c.introSecondary}</p>}
            <div className="flex flex-wrap gap-2 mt-6">
              {c.topics.map((topic, i) => (
                <span key={topic.label} className={i === 0 ? 'chip chip-accent' : 'chip'} title={topic.desc}>
                  {topic.label}
                </span>
              ))}
              {site.languages.includes(other) && (
                <Link href={blogPath(other)} className="chip ml-auto">
                  {t.otherLanguage}
                </Link>
              )}
            </div>
          </header>

          {/* Body: list + right rail */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12 items-start">
            {/* MAIN */}
            <div className="min-w-0">
              {featured && (
                <>
                  <p className="eyebrow text-ink-3 mb-3.5">{t.featured}</p>
                  <Link href={blogPath(lang, featured.slug)} className="card card-hover feat-split mb-10">
                    <BlogCover tag={featured.category ?? t.featuredTag} />
                    <div className="feat-body">
                      <time className="post-date" dateTime={featured.published_at}>
                        {formatPostDate(featured.published_at, lang)} · {readingTime(featured.content)} {t.minRead}
                      </time>
                      <h2>{featured.title}</h2>
                      {featured.excerpt && <p className="clamp-3">{featured.excerpt}</p>}
                      <span className="read-more mt-1">{t.readArticle}</span>
                    </div>
                  </Link>
                </>
              )}

              <div className="rule-label mb-2">
                <span>{t.allArticles}</span>
                <span className="line" />
              </div>

              {!featured ? (
                <p className="text-ink-3 text-center py-16">{t.noPosts}</p>
              ) : (
                <ul className="post-list">
                  {rest.map((post) => (
                    <li key={post.slug}>
                      <Link href={blogPath(lang, post.slug)} className="post-row">
                        <time className="post-date" dateTime={post.published_at}>
                          {formatPostDate(post.published_at, lang)} · {readingTime(post.content)} {t.minRead}
                        </time>
                        <h3>{post.title}</h3>
                        {post.excerpt && <p className="clamp-2">{post.excerpt}</p>}
                        <span className="read-more">{t.readMore}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* RIGHT RAIL */}
            <aside aria-label={t.sidebar}>
              <div className="rail-sticky rail">
                <BlogPromo variant="full" lang={lang} />

                {posts.length > 1 && (
                  <div className="rail-card">
                    <h4>{t.startHere}</h4>
                    <ol className="mini-list">
                      {posts.slice(0, 4).map((p) => (
                        <li key={p.slug}>
                          <span className="num" aria-hidden />
                          <Link href={blogPath(lang, p.slug)}>{p.title}</Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="rail-card">
                  <h4>{t.browseByTopic}</h4>
                  <ul className="topic-nav">
                    {c.topics.map((topic) => (
                      <li key={topic.label}>
                        <a href="#" title={topic.desc}>
                          {topic.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
