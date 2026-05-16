import type { MetadataRoute } from "next";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Oyoto - Digital Product Development",
    short_name: siteName,
    description:
      "UK digital product studio and software engineering portfolio by James Mboma.",
    start_url: "/",
    display: "standalone",
    background_color: "#161616",
    theme_color: "#86a68c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
