/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  distDir: "dist",
  images: {
    unoptimized: true,
    domains: ["localhost", "backend.buildmorocco"],
  },
  env: {
    BACK_API: "http://localhost:8082",
    // BACK_API: "https://backend.buildinmorocco.com/",
  },
};

module.exports = nextConfig;
