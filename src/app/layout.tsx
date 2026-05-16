import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import {
  absoluteUrl,
  contactEmail,
  createMetadata,
  founderName,
  jsonLdScript,
  siteJsonLd,
  siteName,
  siteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: founderName, url: siteUrl }],
  creator: founderName,
  publisher: siteName,
  category: "Digital product development",
  classification: "Software engineering portfolio and digital product studio",
  ...createMetadata({
    title: "Oyoto | Build your digital presence",
    description:
      "Oyoto is a UK digital product studio founded by software engineer James Mboma, building full-stack platforms, AI integrations, mobile apps, and cloud systems.",
    path: "/",
    keywords: [
      "digital product studio",
      "software portfolio",
      "AI product development",
      "portfolio of James Mboma",
    ],
  }),
  title: {
    default: "Oyoto | Build your digital presence",
    template: "%s | Oyoto",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "contact:email": contactEmail,
    "ai-purpose":
      "Portfolio and digital product studio website for software engineering, cloud architecture, AI integration, mobile apps, and case studies.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#161616",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script {...jsonLdScript(siteJsonLd())} />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
