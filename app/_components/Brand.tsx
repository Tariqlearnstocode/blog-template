// Brand mark + wordmark lockup. The mark is a gradient tile with the site's
// monogram; swap BrandMark for an inline SVG of a real logo when you have one.
// Gradient stops read the accent CSS vars, so it recolors with site.config.ts.
import { site } from '@/site.config';

export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brandMarkGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-from)" />
          <stop offset="100%" stopColor="var(--color-accent-to)" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="url(#brandMarkGrad)" />
      <text
        x="256"
        y="256"
        dy="0.35em"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize={site.monogram.length > 1 ? 230 : 300}
      >
        {site.monogram}
      </text>
    </svg>
  );
}

export function BrandLockup() {
  const [accent, rest] = site.wordmark;
  return (
    <span className="flex items-center gap-2">
      <BrandMark className="size-7 rounded-md shadow-sm shadow-accent/30" />
      <span className="text-base font-bold tracking-tight text-ink whitespace-nowrap">
        <span className="text-gradient">{accent}</span>
        {rest}
      </span>
    </span>
  );
}
