import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Explore Oyoto case studies across ecommerce, AI career intelligence, digital strategy, web platforms, mobile apps, and cloud-backed product engineering.",
  path: "/projects",
  image: "/hero-images/congraduation-new.jpg",
  keywords: [
    "Oyoto projects",
    "software case studies",
    "AI career intelligence",
    "ecommerce development portfolio",
  ],
});

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
