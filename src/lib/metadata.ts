import { profile } from "@/content/profile";

export function absoluteUrl(path = "/") {
  return new URL(path, profile.siteUrl).toString();
}

export function projectPath(slug: string) {
  return `/projects/${slug}` as const;
}

export function projectSocialImagePath(slug: string) {
  return `${projectPath(slug)}/opengraph-image` as const;
}
