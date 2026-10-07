// Shared blue-SaaS UI primitives (transplanted from MarketingGuide.ai's design
// system). Exposed as class-name constants so they compose with Next's <Link>,
// plain <button>, and <a> without any polymorphic wrapper.

// Primary CTA: rounded-full blue gradient pill that lifts on hover.
export const btnGradient =
  'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-accent ' +
  'px-6 py-3 font-medium text-white shadow-lg shadow-accent/25 ' +
  'transition-transform duration-200 hover:scale-105 ' +
  'outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

// Smaller variant for nav / inline use.
export const btnGradientSm =
  'inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-accent ' +
  'px-5 py-2 text-sm font-medium text-white shadow-md shadow-accent/25 ' +
  'transition-transform duration-200 hover:scale-105 ' +
  'outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

// Secondary CTA: soft blue pill with a hairline border.
export const btnSoft =
  'inline-flex items-center justify-center gap-2 rounded-full border border-accent/20 ' +
  'bg-accent-soft px-6 py-3 font-medium text-accent ' +
  'transition-all duration-200 hover:scale-105 hover:shadow-md ' +
  'outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

// Ghost link used for "Log in" style actions.
export const btnGhost =
  'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium ' +
  'text-ink-2 transition-colors hover:text-accent ' +
  'outline-none focus-visible:ring-2 focus-visible:ring-accent ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

// Frosted white card with a hover lift — the workhorse surface.
export function Card({
  children,
  className = '',
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={
        'rounded-2xl border border-border bg-white/80 backdrop-blur-sm shadow-lg ' +
        (hover ? 'transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ' : '') +
        className
      }
    >
      {children}
    </div>
  );
}
