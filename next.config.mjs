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
    domains: ['assets.super.so'],
},
};

export default nextConfig;
