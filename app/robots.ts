import type { MetadataRoute } from 'next';
import { site } from '@/site.config';

// Open to search engines and to the AI answer engines (being crawlable is what
// lets ChatGPT, Perplexity, Claude, and Gemini cite a page).
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'Google-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...AI_BOTS.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
