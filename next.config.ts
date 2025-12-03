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
    return [
      {
        source: '/metrics',
        destination: '/api/metrics',
      },
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://backend:8080'}/:path*`, // proxy do backendu w sieci Dockera
      },
    ];
  },
};

export default withNextIntl(nextConfig);
