import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/resume", destination: "/", permanent: true },
      { source: "/projects/congraduation", destination: "/case-studies/river-life-church", permanent: true },
      { source: "/projects", destination: "/case-studies", permanent: true },
      { source: "/projects/:slug", destination: "/case-studies/:slug", permanent: true },
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
