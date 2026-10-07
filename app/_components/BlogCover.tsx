// Branded gradient cover tile — replaces photo thumbnails with an on-brand
// gradient + faint grid texture and the brand mark. No image data needed.
// Used on the blog index (featured + list) and on article pages.
import { BrandMark } from './Brand';

export function BlogCover({
  tag,
  className = '',
}: {
  tag?: string;
  className?: string;
}) {
  return (
    <div className={`cover ${className}`}>
      <span className="cover-glyph" aria-hidden>
        <BrandMark />
      </span>
      {tag && <p className="cover-tag">{tag}</p>}
    </div>
  );
}
