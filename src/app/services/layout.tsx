import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "What Oyoto builds: Next.js websites with a CMS, Flutter mobile apps, AI and machine learning, and data pipelines and reporting.",
  path: "/services",
});

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
