import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Web, App & AI Development Services, UK",
  description:
    "Websites, online stores, Flutter mobile apps, AI and data engineering from Oyoto, a UK web and app development studio. Each service backed by a case study.",
  path: "/services",
});

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
