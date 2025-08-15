/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: 'http://localhost:3001/cart/:path*',
      },
    ];
  },
};
export default nextConfig;
