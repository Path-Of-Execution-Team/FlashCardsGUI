import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['flagsapi.com'],
  },
  async rewrites() {
    const backendHost = process.env.NEXT_PUBLIC_API_URL || 'backend:8080';

    return [
      {
        source: '/metrics',
        destination: '/api/metrics',
      },
      {
        source: '/api/:path*',
        destination: `http://${backendHost}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
