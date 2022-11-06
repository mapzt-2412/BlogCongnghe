/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    // loader: 'imgix',
    // path: 'https://blogcongnghe-8c999.web.app',
    domains: ['p16-sign-va.tiktokcdn.com', "www.google.com", "firebasestorage.googleapis.com", "play-lh.googleusercontent.com", "storage.googleapis.com"],
  },
  env: {
    REACT_APP_GOOGLE_CLIENT_ID: "374867688758-8a47mqeb7k3rllj057udigbdq3gqhoib.apps.googleusercontent.com",
    REACT_APP_API_URL: "https://blog-cong-nghe.herokuapp.com",
    REACT_APP_MAPBOX_API_ACCESS_TOKEN: "pk.eyJ1IjoidG9hbnZvMjQxMiIsImEiOiJjbDgyb3Y2eGUwNnFiM3Bxa2d6dDA0YWpqIn0.zg3KoQGnQ-yDEsTmyoQAgg"
  },
}

module.exports = nextConfig
