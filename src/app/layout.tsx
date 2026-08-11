import type { Metadata } from "next";
import { profile } from "@/content/profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  applicationName: `${profile.name} Portfolio`,
  title: `${profile.name} | Backend-Focused Software Engineer`,
  description: profile.metaDescription,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} | Backend-Focused Software Engineer`,
    description: profile.metaDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name}, backend-focused software engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Backend-Focused Software Engineer`,
    description: profile.metaDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name}, backend-focused software engineer`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
