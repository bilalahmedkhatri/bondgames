import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      ...(process.env.BLOG_MEDIA_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean).map(value => {
        const url = new URL(value);
        if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('Invalid BLOG_MEDIA_ORIGINS');
        return { protocol: 'https' as const, hostname: url.hostname, port: url.port, pathname: '/**', search: '' };
      }),
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
