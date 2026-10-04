import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/projects/congraduation", destination: "/projects/river-life-church", permanent: true },
    ];
  },
  experimental: {
    viewTransition: true,
  },
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
