import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        // This makes your Render backend look like it's part of your Vercel frontend
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_BASE_URL as string,
      },
    ];
  },
};

export default nextConfig;
