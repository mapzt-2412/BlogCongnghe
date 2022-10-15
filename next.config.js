/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['p16-sign-va.tiktokcdn.com', "www.google.com", "firebasestorage.googleapis.com", "play-lh.googleusercontent.com"],
  },
  env: {
    REACT_APP_GOOGLE_CLIENT_ID: "374867688758-8a47mqeb7k3rllj057udigbdq3gqhoib.apps.googleusercontent.com",
    REACT_APP_API_URL: "http://172.16.7.205:8080",
  },
}

module.exports = nextConfig
