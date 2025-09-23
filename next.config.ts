import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['recharts', 'lucide-react'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression and optimization
  compress: true,

  // Bundle analyzer (uncomment for development)
  // webpack: (config, { dev, isServer }) => {
  //   if (dev && !isServer) {
  //     config.devtool = 'eval-source-map';
  //   }
  //   return config;
  // },

  // Tree shaking and dead code elimination
  modularizeImports: {
    '@/components/ui/button': {
      transform: '@/components/ui/button',
      skipDefaultConversion: true,
    },
    '@/components/ui/card': {
      transform: '@/components/ui/card',
      skipDefaultConversion: true,
    },
    '@/components/ui/dropdown-menu': {
      transform: '@/components/ui/dropdown-menu',
      skipDefaultConversion: true,
    },
  },

  // Headers for caching optimization
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
