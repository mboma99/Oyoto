import type { Metadata } from "next";
import { createMetadata, jsonLdScript, projectListJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Case studies from Oyoto: AI career tracking, machine learning at Nike, data and AI reporting at Lloyds Banking Group, and ecommerce.",
  path: "/projects",
});

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script {...jsonLdScript(projectListJsonLd())} />
      {children}
    </>
  );
}
