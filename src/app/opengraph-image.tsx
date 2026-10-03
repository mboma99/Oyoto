import { brandName } from "@/lib/seo";
import { ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt = "Oyoto, a UK studio building web, mobile and AI products";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    kicker: brandName,
    title: "Web, mobile and AI products, built to last.",
    footer: "Digital product studio, UK",
  });
}
