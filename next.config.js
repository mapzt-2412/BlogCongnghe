/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true,
      domains: ['p16-sign-va.tiktokcdn.com', "www.google.com", "firebasestorage.googleapis.com", "play-lh.googleusercontent.com", "storage.googleapis.com"],
    },
  },
  env: {
    REACT_APP_GOOGLE_CLIENT_ID: "374867688758-8a47mqeb7k3rllj057udigbdq3gqhoib.apps.googleusercontent.com",
    REACT_APP_API_URL: "https://blog-cong-nghe.herokuapp.com",
    REACT_APP_BASE_URL: "https://www.hcmut-bkblog.tech",
    REACT_APP_MAPBOX_API_ACCESS_TOKEN: "pk.eyJ1IjoidG9hbnZvMjQxMiIsImEiOiJjbDgyb3Y2eGUwNnFiM3Bxa2d6dDA0YWpqIn0.zg3KoQGnQ-yDEsTmyoQAgg",
    REACT_APP_APPROVE_URL : "https://blog-cong-nghe-approve-server.herokuapp.com",
  },
  exportPathMap: async function (defaultPathMap) {
    // 🚩the only difference is here, we spread the default pathMap
    const pathMap = { ...defaultPathMap };

    for (const [path, config] of Object.entries(defaultPathMap)) {
      pathMap[path] = config;
    }

    return pathMap;
  }
}

module.exports = nextConfig
