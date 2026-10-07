import SiteNav from './SiteNav';
import Footer from './Footer';

// Shared shell for /privacy and /terms.
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="blog-root min-h-screen bg-bg">
      <SiteNav />
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-ink leading-[1.12] tracking-tight mb-2">{title}</h1>
          <p className="text-sm text-ink-3 mb-10">Last updated {updated}</p>
          <div className="prose-blog">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
