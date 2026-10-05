import type { Metadata } from "next";
import { createMetadata, jsonLdScript, projectListJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Case Studies",
  description:
    "Case studies from Oyoto: AI career tracking with Trakr, machine learning at Nike, data and AI reporting at Lloyds Banking Group, and a self-managed website for River Life Church.",
  path: "/case-studies",
});

export default function CaseStudiesLayout({
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
