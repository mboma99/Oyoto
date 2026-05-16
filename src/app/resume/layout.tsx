import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "James Mboma Resume",
  description:
    "Resume for James Mboma, a backend-focused software engineer with experience in Java, Spring Boot, AWS, FastAPI, machine learning, and secure cloud systems.",
  path: "/resume",
  keywords: [
    "James Mboma resume",
    "backend software engineer",
    "Java Spring Boot engineer",
    "AWS software engineer",
  ],
});

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
