// File: next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/mainpage',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;