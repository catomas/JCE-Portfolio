/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15 App Router configuration
  reactStrictMode: true,

  // Image optimization configuration for Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // Experimental features for Next.js 15
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Allow large file uploads via server actions
    },
  },
};

module.exports = nextConfig;
