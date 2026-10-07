'use client';

// Client-side reading enhancements for the article page:
//   1. Top reading-progress bar.
//   2. Builds the "On this page" TOC from the rendered <article> headings
//      (ids are added by rehype-slug) and runs scroll-spy highlighting.
//   3. Inserts the inline mid-article CTA after the heading nearest the middle.
//
// The article headings themselves are server-rendered (good for SEO); only the
// convenience TOC nav and progress UI are hydrated here.
import { useEffect, useRef } from 'react';
import { ctaUrl, site } from '@/site.config';

export default function ArticleEnhancements({
  bodySelector = '#article-body',
  tocSelector = '#article-toc ol',
  lang = 'en',
}: {
  bodySelector?: string;
  tocSelector?: string;
  lang?: 'en' | 'es';
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.querySelector<HTMLElement>(bodySelector);
    const tocOl = document.querySelector<HTMLOListElement>(tocSelector);
    if (!body) return;

    const heads = Array.from(body.querySelectorAll<HTMLElement>('h2[id], h3[id]'));

    // 1. Build TOC.
    if (tocOl && heads.length) {
      tocOl.innerHTML = heads
        .map(
          (h) =>
            `<li class="${h.tagName === 'H3' ? 'sub' : ''}"><a href="#${h.id}">${h.textContent ?? ''}</a></li>`,
        )
        .join('');
    }
    const tocLinks = tocOl
      ? Array.from(tocOl.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
      : [];

    // 2. Inline mid-article CTA (insert once, after the midpoint heading).
    if (heads.length && !body.querySelector('.inline-cta')) {
      const mid = heads[Math.min(heads.length - 1, Math.ceil(heads.length / 2))];
      if (mid) {
        const c = site.copy[lang].cta;
        const cta = document.createElement('div');
        cta.className = 'inline-cta';
        cta.innerHTML = `
          <span class="ic-mark" aria-hidden></span>
          <div class="ic-text">
            <h3>${c.inlineHeading}</h3>
            <p>${c.inlineBody}</p>
          </div>
          <a href="${ctaUrl(`inline-${lang}`)}" class="btn-gradient-sm" style="flex:none">${c.inlineButton}</a>`;
        mid.parentNode?.insertBefore(cta, mid);
      }
    }

    // 3. Progress + scroll-spy.
    const onScroll = () => {
      if (barRef.current) {
        const start = body.offsetTop;
        const end = start + body.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
        barRef.current.style.width = p * 100 + '%';
      }
      if (tocLinks.length) {
        const y = window.scrollY + 96;
        let cur = heads[0];
        for (const h of heads) if (h.offsetTop <= y) cur = h;
        tocLinks.forEach((a) =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + (cur && cur.id)),
        );
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [bodySelector, tocSelector, lang]);

  return <div className="progress-bar" ref={barRef} aria-hidden />;
}
