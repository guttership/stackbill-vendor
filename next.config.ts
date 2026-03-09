import type { NextConfig } from 'next'

// Vérification de sécurité au démarrage
if (process.env.NODE_ENV !== 'test') {
  require('./lib/security-check');
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
