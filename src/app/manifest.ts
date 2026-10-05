import type { MetadataRoute } from "next";
import { siteName, siteTagline } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} | ${siteTagline}`,
    short_name: siteName,
    description:
      "UK studio designing and building web, mobile and AI products.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f3f3",
    theme_color: "#f3f3f3",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
