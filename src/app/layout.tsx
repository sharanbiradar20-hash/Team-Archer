import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClubNexus — Centralised Platform for College Technical Clubs",
  description: "A centralised, professional web platform for college technical clubs that replaces fragmented WhatsApp groups, Google Forms, and social media pages with a single, polished hub.",
  keywords: [
    "college technical clubs",
    "student platform",
    "club management",
    "hackathons",
    "coding challenges",
    "project showcase",
    "student collaboration",
    "university clubs",
    "technical events",
    "student competitions"
  ],
  authors: [{ name: "ClubNexus Team" }],
  creator: "ClubNexus",
  publisher: "ClubNexus",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clubnexus.app",
    title: "ClubNexus — Centralised Platform for College Technical Clubs",
    description: "A centralised, professional web platform for college technical clubs that replaces fragmented WhatsApp groups, Google Forms, and social media pages with a single, polished hub.",
    siteName: "ClubNexus",
    images: [
      {
        url: "https://clubnexus.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClubNexus Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClubNexus — Centralised Platform for College Technical Clubs",
    description: "A centralised, professional web platform for college technical clubs that replaces fragmented WhatsApp groups, Google Forms, and social media pages with a single, polished hub.",
    images: ["https://clubnexus.app/og-image.png"],
    creator: "@clubnexus",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#6366f1",
      },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://clubnexus.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#6366f1" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-bg-primary text-text-primary min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: "glass border-border",
              title: "text-text-primary",
              description: "text-text-secondary",
            },
          }}
        />
      </body>
    </html>
  );
}
