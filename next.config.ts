import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mjnzrjkwayaskqqbkrid.supabase.co',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;
