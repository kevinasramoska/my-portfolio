import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.name} | Backend-Focused Software Engineer`,
  description: profile.metaDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} | Backend-Focused Software Engineer`,
    description: profile.metaDescription,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Backend-Focused Software Engineer`,
    description: profile.metaDescription,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-50 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white focus:not-sr-only"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
