import type { NextConfig } from 'next'

// Vérification de sécurité au démarrage
// Skip during Vercel build - env vars are configured post-build
const isVercelBuild = process.env.VERCEL === '1' && process.env.CI === '1';
const isBuildCommand = process.argv.some((arg) => arg.includes('build'));
const isStartCommand = process.argv.some((arg) => arg.includes('start'));
const isProduction = process.env.NODE_ENV === 'production';

const shouldRunSecurityCheck = isProduction
  ? isStartCommand && !isVercelBuild
  : process.env.NODE_ENV !== 'test' && !isBuildCommand;

if (shouldRunSecurityCheck) {
  require('./lib/security-check');
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
