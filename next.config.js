/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15 App Router configuration
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Optimize image formats for better LCP performance
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images (matches common breakpoints)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for the `sizes` attribute optimization
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for Next.js 15
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Allow large file uploads via server actions
    },
  },
};

module.exports = nextConfig;
