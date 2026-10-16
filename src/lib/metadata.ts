import { profile } from "@/content/profile";
import type { Metadata } from "next";

export function absoluteUrl(path = "/") {
  return new URL(path, profile.siteUrl).toString();
}

export function projectPath(slug: string) {
  return `/projects/${slug}` as const;
}

export function projectSocialImagePath(slug: string) {
  return `${projectPath(slug)}/opengraph-image` as const;
}

export function writingPath(slug: string) {
  return `/writing/${slug}` as const;
}

export function writingSocialImagePath(slug: string) {
  return `${writingPath(slug)}/opengraph-image` as const;
}

export function collectionMetadata(path: string, title: string, description: string): Metadata {
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name}, full-stack engineer` };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website", url: path, title, description,
      siteName: `${profile.name} Portfolio`, locale: "en_IE", images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
