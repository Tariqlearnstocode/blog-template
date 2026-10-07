import type { NextConfig } from 'next';

// The site is the blog, so the root sends readers to it. When you delete or
// rename a post, add a permanent redirect here to its closest surviving post
// so links and rankings carry over:
//   { source: '/blog/old-slug', destination: '/blog/new-slug', permanent: true },
const nextConfig: NextConfig = {
  // Pin the project root so a stray lockfile in a parent folder isn't picked up.
  turbopack: { root: process.cwd() },
  async redirects() {
    return [{ source: '/', destination: '/blog', permanent: true }];
  },
};

export default nextConfig;
