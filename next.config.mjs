/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/_next/:path*',
        destination: '/_next/:path*',
      },
      {
        source: '/:path*',
        destination: '/api/hello',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.super.so',
        port: '',
      },
    ]
},
distDir:"build"
};

export default nextConfig;
