// ─────────────────────────────────────────────────────────────────────────────
// Everything site-specific lives here. To launch a new blog, edit this file,
// replace the sample posts in content/blog/, and deploy. Nothing else in the
// codebase mentions a site name, domain, color, or CTA.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'es';

type Copy = {
  /** Default meta description for the whole site. */
  siteDescription: string;
  /** Byline shown on every article. */
  author: string;
  /** One line under the logo in the footer. */
  footerTagline: string;

  blog: {
    /** <title> of the blog index. */
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    intro: string;
    introSecondary?: string;
    /** Chips under the intro and the "Browse by topic" rail. First is highlighted. */
    topics: { label: string; desc: string }[];
  };

  /** The call to action every page pushes readers toward. */
  cta: {
    nav: string;
    heading: string;
    body: string;
    button: string;
    foot: string;
    /** Bullets on the index sidebar promo. */
    points: string[];
    inlineHeading: string;
    inlineBody: string;
    inlineButton: string;
  };
};

export const site = {
  name: 'Example Blog',
  /** Production origin, no trailing slash. Used for canonicals, sitemap, OG. */
  url: 'https://example.com',
  /** Copyright line in the footer. */
  legalName: 'Example LLC',
  /** Shown on the privacy and terms pages. */
  contactEmail: 'hello@example.com',

  /** Logo text: [gradient part, plain part], e.g. ['ai', 'braindocs']. */
  wordmark: ['example', 'blog'] as [string, string],
  /** 1-2 characters for the generated logo mark, favicon, and covers. */
  monogram: 'E',

  /** English lives at /blog and is always on. Keep 'es' to also publish Spanish at /es/blog. */
  languages: ['en', 'es'] as Lang[],

  /** Brand colors. Everything (buttons, gradients, promo, OG image, favicon) derives from these. */
  theme: {
    accent: '#0369a1',
    accentHover: '#075985',
    accentSoft: '#f0f9ff',
    accentFrom: '#38bdf8',
    accentTo: '#0369a1',
    accentDeep: '#0b3a5e',
  },

  /** Leave any of these empty to skip that tag entirely. */
  analytics: {
    googleAnalyticsId: '', // G-XXXXXXXXXX
    googleAdsId: '', // AW-XXXXXXXXXX
    metaPixelId: '',
  },

  /** Where the CTAs send readers. Every link gets utm_source + utm_content=<placement>. */
  cta: {
    url: 'https://example.com/',
    utmSource: 'example-blog',
  },

  copy: {
    en: {
      siteDescription: 'Practical guides for small business owners.',
      author: 'Example Blog Team',
      footerTagline: 'Practical guides for small business owners.',
      blog: {
        metaTitle: 'Example Blog: Practical Guides',
        metaDescription: 'Practical, plain-language guides for small business owners.',
        eyebrow: 'Example Blog',
        heading: 'Practical guides, not theory',
        intro: 'Plain-language guides for small business owners who want results without the jargon.',
        introSecondary: 'Step-by-step setups, real workflows, and honest comparisons.',
        topics: [
          { label: 'Getting started', desc: 'The basics, in order' },
          { label: 'Industry guides', desc: 'Guides for specific businesses' },
          { label: 'Tools', desc: 'What to use and why' },
        ],
      },
      cta: {
        nav: 'Get started',
        heading: 'Ready to put this to work?',
        body: 'A short description of what readers get when they click through.',
        button: 'Get started free',
        foot: 'Free · No card',
        points: ['First benefit', 'Second benefit', 'Third benefit'],
        inlineHeading: 'Want help with this?',
        inlineBody: 'One sentence that earns the click.',
        inlineButton: 'Learn more',
      },
    },
    es: {
      siteDescription: 'Guías prácticas para dueños de negocios.',
      author: 'Equipo de Example Blog',
      footerTagline: 'Guías prácticas para dueños de negocios.',
      blog: {
        metaTitle: 'Example Blog: Guías Prácticas',
        metaDescription: 'Guías prácticas y en lenguaje claro para dueños de negocios pequeños.',
        eyebrow: 'Blog de Example',
        heading: 'Guías prácticas, no teoría',
        intro: 'Guías en lenguaje claro para dueños de negocios que quieren resultados sin tecnicismos.',
        introSecondary: 'Configuraciones paso a paso, flujos reales y comparaciones honestas.',
        topics: [
          { label: 'Primeros pasos', desc: 'Lo básico, en orden' },
          { label: 'Guías por industria', desc: 'Guías para negocios específicos' },
          { label: 'Herramientas', desc: 'Qué usar y por qué' },
        ],
      },
      cta: {
        nav: 'Empezar',
        heading: '¿Listo para ponerlo en práctica?',
        body: 'Una descripción corta de lo que obtiene el lector al hacer clic.',
        button: 'Empezar gratis',
        foot: 'Gratis · Sin tarjeta',
        points: ['Primer beneficio', 'Segundo beneficio', 'Tercer beneficio'],
        inlineHeading: '¿Quieres ayuda con esto?',
        inlineBody: 'Una frase que se gane el clic.',
        inlineButton: 'Ver más',
      },
    },
  } satisfies Record<Lang, Copy>,
};

/** CTA link tagged with the placement it was clicked from. */
export function ctaUrl(placement: string): string {
  const url = new URL(site.cta.url);
  url.searchParams.set('utm_source', site.cta.utmSource);
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'blog');
  url.searchParams.set('utm_content', placement);
  return url.toString();
}

/** /blog for English, /es/blog for Spanish, with an optional post slug. */
export function blogPath(lang: Lang, slug?: string): string {
  const base = lang === 'en' ? '/blog' : '/es/blog';
  return slug ? `${base}/${slug}` : base;
}
