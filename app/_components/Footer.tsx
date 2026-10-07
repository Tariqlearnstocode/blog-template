import { BrandLockup } from './Brand';
import { blogPath, ctaUrl, site, type Lang } from '@/site.config';
import { ui } from '@/lib/i18n';

export default function Footer({ lang = 'en' }: { lang?: Lang }) {
  const t = ui[lang];
  const other: Lang = lang === 'es' ? 'en' : 'es';
  const cols = [
    {
      title: t.footerBlog,
      links: [
        { href: blogPath(lang), label: 'Blog' },
        ...(site.languages.includes('es') ? [{ href: blogPath(other), label: t.footerOtherBlog }] : []),
      ],
    },
    {
      title: t.footerLearn,
      links: [{ href: ctaUrl(`footer-${lang}`), label: site.copy[lang].cta.button }],
    },
    {
      title: t.footerSite,
      links: [
        { href: '/privacy', label: t.privacy },
        { href: '/terms', label: t.terms },
      ],
    },
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <BrandLockup />
            <p className="mt-4 max-w-xs text-sm text-ink-2 leading-relaxed">
              {site.copy[lang].footerTagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h2 className="text-xs font-medium uppercase tracking-wider text-ink-3">{c.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-ink-2 hover:text-ink transition rounded outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-ink-3">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
