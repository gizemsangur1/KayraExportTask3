import type { NextConfig } from 'next'

const CART_ORIGIN = process.env.CART_ORIGIN || 'http://cart:3000'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/cart', destination: `${CART_ORIGIN}/cart` },
      { source: '/cart/:path*', destination: `${CART_ORIGIN}/cart/:path*` },
    ]
  },
}

export default nextConfig
