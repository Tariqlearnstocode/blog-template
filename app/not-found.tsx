import Link from 'next/link';
import { ctaUrl, site } from '@/site.config';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] grid place-items-center px-6 text-center">
      <div className="max-w-md">
        <div className="text-sm font-medium uppercase tracking-wider text-accent">404</div>
        <h1 className="mt-3 text-3xl font-semibold text-ink">We couldn&apos;t find that page</h1>
        <p className="mt-3 text-ink-2">The link may be broken, or the page may have moved.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-full bg-gradient-accent text-white font-medium shadow-md shadow-accent/25 hover:scale-105 transition-transform"
          >
            Browse the blog
          </Link>
          <a
            href={ctaUrl('not-found')}
            className="px-5 py-2.5 rounded-full border border-border text-ink font-medium hover:bg-border/30 transition"
          >
            {site.copy.en.cta.nav}
          </a>
        </div>
      </div>
    </main>
  );
}
