import type { NextConfig } from 'next'

// Vérification de sécurité au démarrage
// Skip during Vercel build - env vars are configured post-build
const isVercelBuild = process.env.VERCEL === '1' && process.env.CI === '1';

if (process.env.NODE_ENV !== 'test' && !isVercelBuild) {
  require('./lib/security-check');
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
