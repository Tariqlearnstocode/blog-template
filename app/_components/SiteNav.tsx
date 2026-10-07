'use client';

// Fixed top bar: transparent at the top of the page, frosting into a glass
// panel once scrolled. Brand, the blog in the current language, a language
// switch (when Spanish is enabled), and the CTA button.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BrandLockup } from './Brand';
import { btnGradientSm } from './ui';
import { blogPath, ctaUrl, site } from '@/site.config';
import { ui } from '@/lib/i18n';

const navLink =
  'text-sm font-medium text-ink-2 hover:text-accent transition rounded outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? '/';
  const lang = pathname.startsWith('/es') ? 'es' : 'en';
  const other = lang === 'es' ? 'en' : 'es';
  const bilingual = site.languages.includes('es');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel border-b shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-16 items-center gap-5">
          <Link
            href={blogPath(lang)}
            className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <BrandLockup />
          </Link>

          <div className="ml-auto hidden sm:flex items-center gap-5">
            <Link href={blogPath(lang)} className={navLink}>
              Blog
            </Link>
            {bilingual && (
              <Link href={blogPath(other)} className={navLink}>
                {ui[lang].switchLabel}
              </Link>
            )}
          </div>

          <a href={ctaUrl(`nav-${lang}`)} className={`${btnGradientSm} ml-auto sm:ml-0`}>
            {site.copy[lang].cta.nav}
          </a>
        </div>
      </div>
    </nav>
  );
}
