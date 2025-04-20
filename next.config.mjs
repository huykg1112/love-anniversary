/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // basePath: "/love-anniversary",
  // assetPrefix: "/love-anniversary",
  // output: "export",
};

export default nextConfig;
