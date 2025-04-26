import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/.' : '',
  output: 'export',
  trailingSlash: true,
  experimental: {
    appDir: true, // Use the app router
  },
};

export default nextConfig;
