/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    TOKEN: process.env.TOKEN
  },
  eslint: { ignoreDuringBuilds: true },
}

module.exports = nextConfig
