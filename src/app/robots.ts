import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { absoluteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: profile.siteUrl,
  };
}
