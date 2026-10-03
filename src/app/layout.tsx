import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Cursor } from "@/components/Cursor";
import {
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
    title: "Oyoto · Build your digital presence",
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
    default: "Oyoto · Build your digital presence",
    template: "%s · Oyoto",
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

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#f3f3f3",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script {...jsonLdScript(siteJsonLd())} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Cursor />
      </body>
    </html>
  );
}
