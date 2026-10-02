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
    background_color: "#f3f3f3",
    theme_color: "#f3f3f3",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
