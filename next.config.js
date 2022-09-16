/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['p16-sign-va.tiktokcdn.com'],
  }
}

module.exports = nextConfig
