/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '3.35.176.72',
        port: '8090',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@repo/ui'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
