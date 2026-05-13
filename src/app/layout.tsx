import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oyoto Portfolio",
  description: "Portfolio website by James Mboma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
