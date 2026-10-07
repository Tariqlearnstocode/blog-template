import { ImageResponse } from 'next/og';
import { site } from '@/site.config';

// Default social share image (1200×630), built from site.config.ts. Every
// route inherits it. ImageResponse can't read CSS vars, so colors come from
// the config directly.
const c = site.copy.en.blog;

export const alt = `${site.name}: ${c.heading}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG = '#f8fafc';
const SURFACE = '#ffffff';
const INK = '#0f172a';
const INK2 = '#475569';
const INK3 = '#94a3b8';
const BORDER = '#e2e8f0';
const { accent: ACCENT, accentFrom: FROM, accentTo: TO } = site.theme;

export default function OpengraphImage() {
  const [accentWord, restWord] = site.wordmark;
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: `linear-gradient(90deg, ${FROM} 0%, ${TO} 100%)`,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -100,
            width: 700,
            height: 560,
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${FROM}1f 0%, transparent 70%)`,
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 80px 60px',
            flex: 1,
            position: 'relative',
          }}
        >
          {/* Brand lockup */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${FROM} 0%, ${TO} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: site.monogram.length > 1 ? 22 : 30,
                fontWeight: 800,
              }}
            >
              {site.monogram}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: 30, fontWeight: 700, color: ACCENT, letterSpacing: '-0.01em' }}>{accentWord}</span>
              <span style={{ fontSize: 30, fontWeight: 700, color: INK, letterSpacing: '-0.01em' }}>{restWord}</span>
            </div>
          </div>

          {/* Headline + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                fontSize: 68,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: INK,
                maxWidth: 1000,
              }}
            >
              {c.heading}
            </div>
            <div style={{ display: 'flex', marginTop: 26, fontSize: 28, lineHeight: 1.4, color: INK2, maxWidth: 1000 }}>
              {c.intro}
            </div>
          </div>

          {/* Topics + domain */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {c.topics.slice(0, 4).map((topic) => (
              <div
                key={topic.label}
                style={{
                  display: 'flex',
                  padding: '9px 20px',
                  borderRadius: 999,
                  border: `1.5px solid ${BORDER}`,
                  background: SURFACE,
                  fontSize: 19,
                  fontWeight: 500,
                  color: INK2,
                }}
              >
                {topic.label}
              </div>
            ))}
            <div style={{ display: 'flex', marginLeft: 'auto', fontSize: 18, color: INK3 }}>
              {new URL(site.url).host}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
