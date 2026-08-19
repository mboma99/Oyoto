import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Book a free 30-minute discovery call or send a project brief to Oyoto, a digital product development firm.",
  path: "/contact",
  keywords: [
    "contact Oyoto",
    "hire software engineer UK",
    "book discovery call",
    "digital product studio London",
    "start a project Oyoto",
  ],
});

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
