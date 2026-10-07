// The sidebar CTA banner. Server-safe (no hooks). Two variants: the index rail
// shows the bullet list, the article rail is compact.
import { BrandMark } from './Brand';
import { ctaUrl, site, type Lang } from '@/site.config';

export function BlogPromo({
  variant = 'full',
  lang = 'en',
}: {
  variant?: 'full' | 'compact';
  lang?: Lang;
}) {
  const t = site.copy[lang].cta;
  return (
    <div className="promo">
      <span className="promo-mark" aria-hidden>
        <BrandMark />
      </span>
      <h3>{t.heading}</h3>
      <p>{t.body}</p>
      {variant === 'full' && t.points.length > 0 && (
        <ul className="promo-files" aria-hidden>
          {t.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      <a href={ctaUrl(`promo-${variant}-${lang}`)} className="btn-white">
        {t.button}
      </a>
      <p className="promo-foot">{t.foot}</p>
    </div>
  );
}
