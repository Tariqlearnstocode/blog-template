import { ImageResponse } from 'next/og';
import { site } from '@/site.config';

// Generated from the monogram and brand gradient in site.config.ts. Replace
// with a static app/apple-icon.png when you have a real logo.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  const { accentFrom, accentTo } = site.theme;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
          background: `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)`,
          color: '#ffffff',
          fontSize: site.monogram.length > 1 ? 110 * 0.7 : 110,
          fontWeight: 800,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {site.monogram}
      </div>
    ),
    { ...size },
  );
}
