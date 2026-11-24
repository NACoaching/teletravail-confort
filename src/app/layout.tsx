import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_CONFIG } from "@/config/site";

const fredoka = Fredoka({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fredoka",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.shortDescription,
  keywords: [
    "télétravail",
    "bureau assis debout",
    "chaise ergonomique",
    "bureau electrique",
    "bras ecran pc",
    "screenbar",
    "ergonomie bureau",
    "home office",
    "amenagement teletravail",
    "setup bureau",
  ],
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.publisher,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: SITE_CONFIG.googleVerification,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fredoka.variable} ${jakarta.variable}`}>
      <head>
        {/* LLM & AI Search discovery */}
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Context" />

        {/* Amazon Preconnect & DNS Prefetch pour clics instantanés */}
        <link rel="preconnect" href="https://m.media-amazon.com" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
        <link rel="preconnect" href="https://www.amazon.fr" />
        <link rel="dns-prefetch" href="https://www.amazon.fr" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-[#dbeafe] selection:text-[#1d4ed8]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Affiliate Pulse Tracker */}
        <script
          defer
          src={`${process.env.NEXT_PUBLIC_TRACKER_URL || "https://affiliate-tracker-nacoachings-projects.vercel.app"}/tracker.js`}
          data-site="teletravail-confort.com"
        />
      </body>
    </html>
  );
}
