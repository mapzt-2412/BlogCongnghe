/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['p16-sign-va.tiktokcdn.com'],
  },
  env: {
    REACT_APP_GOOGLE_CLIENT_ID: "374867688758-8a47mqeb7k3rllj057udigbdq3gqhoib.apps.googleusercontent.com",
    REACT_APP_API_URL: "https://4f1c-2402-800-63af-a913-55e3-129a-17a6-587.ngrok.io/",
  }
}

module.exports = nextConfig
