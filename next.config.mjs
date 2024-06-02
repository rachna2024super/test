/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
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
