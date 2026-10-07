import { ImageResponse } from 'next/og';
import { site } from '@/site.config';

// Generated from the monogram and brand gradient in site.config.ts. Replace
// with a static app/icon.png when you have a real logo.
export const size = { width: 32, height: 32 };
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
          borderRadius: 7,
          background: `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)`,
          color: '#ffffff',
          fontSize: site.monogram.length > 1 ? 20 * 0.7 : 20,
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
