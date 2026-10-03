import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/about", destination: "/", permanent: true }];
  },
  experimental: {
    viewTransition: true,
  },
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
