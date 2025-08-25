import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/metrics',
        destination: '/api/metrics',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
