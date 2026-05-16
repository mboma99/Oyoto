import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about Oyoto, the UK digital product studio founded by James Mboma for full-stack development, cloud architecture, AI integration, and product engineering.",
  path: "/about",
  keywords: [
    "about Oyoto",
    "Oyoto services",
    "James Mboma studio",
    "technical consulting UK",
  ],
});

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
