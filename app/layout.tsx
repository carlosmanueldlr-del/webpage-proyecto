import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { studio } from "@/lib/projects";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${studio.name} — ${studio.descriptor}`,
  description:
    "JOANA is an architecture and interior design studio focused on creating spaces that balance function, materiality and emotion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
