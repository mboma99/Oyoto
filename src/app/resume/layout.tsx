import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

// Unlisted: reachable by direct link only, kept out of the nav and search.
export const metadata: Metadata = {
  ...createMetadata({
    title: "James Mboma, Resume",
    description:
      "Resume of James Mboma, a backend-focused software engineer working in Java, Spring Boot, AWS, FastAPI, machine learning and secure cloud systems.",
    path: "/resume",
  }),
  robots: { index: false, follow: false },
};

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
