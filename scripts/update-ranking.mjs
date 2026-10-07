// Rebuild content/blog/ranking.json from a Google Search Console "Pages" export.
//
// Usage:
//   npm run rank -- ~/Downloads/<gsc-export>/Pages.csv
//
// Posts are ordered by clicks, then impressions. The blog index, "Start here"
// rail, featured post, and related posts all follow this order; posts missing
// from the export fall in after the ranked ones, newest first.

import fs from 'fs';
import path from 'path';

const csvPath = process.argv[2];
if (!csvPath) {
  console.error('Usage: npm run rank -- <Pages.csv>');
  process.exit(1);
}

const postsDir = path.join(process.cwd(), 'content/blog');
const live = { en: new Set(), es: new Set() };
for (const f of fs.readdirSync(postsDir)) {
  if (!f.endsWith('.md') || f.startsWith('_') || f === 'README.md') continue;
  const fm = fs.readFileSync(path.join(postsDir, f), 'utf8');
  const slug = fm.match(/^slug: "?([^"\n]+)"?$/m)?.[1];
  const locale = fm.match(/^locale: "?([^"\n]+)"?$/m)?.[1];
  if (slug && live[locale]) live[locale].add(slug);
}

// GSC rows: url,clicks,impressions,ctr,position. Anchor (#...) rows fold into
// their page so a post's total counts once.
const totals = new Map();
for (const line of fs.readFileSync(csvPath, 'utf8').split('\n').slice(1)) {
  const [url, clicks, impressions] = line.split(',');
  const m = url?.match(/^https?:\/\/[^/]+\/(es\/)?blog\/([^#?/]+)/);
  if (!m) continue;
  const key = `${m[1] ? 'es' : 'en'}:${m[2]}`;
  const t = totals.get(key) ?? { clicks: 0, impressions: 0 };
  t.clicks += Number(clicks) || 0;
  t.impressions += Number(impressions) || 0;
  totals.set(key, t);
}

const ranked = { en: [], es: [] };
for (const [key, t] of [...totals].sort(
  ([, a], [, b]) => b.clicks - a.clicks || b.impressions - a.impressions,
)) {
  const [locale, slug] = key.split(':');
  if (live[locale].has(slug)) ranked[locale].push(slug);
}

const out = { source: path.basename(csvPath), updated: new Date().toISOString().slice(0, 10), ...ranked };
fs.writeFileSync(path.join(postsDir, 'ranking.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`Ranked ${ranked.en.length} EN + ${ranked.es.length} ES posts → content/blog/ranking.json`);
console.log('Top EN:', ranked.en.slice(0, 4).join(', '));
console.log('Top ES:', ranked.es.slice(0, 4).join(', '));
