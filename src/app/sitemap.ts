import type { MetadataRoute } from "next";
import { publishedProjects } from "@/content/projects";
import { articles } from "@/content/articles";
import { absoluteUrl, projectPath, writingPath } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(),
      lastModified: "2026-10-16",
    },
    { url: absoluteUrl("/projects"), lastModified: "2026-10-16" },
    { url: absoluteUrl("/writing"), lastModified: "2026-10-16" },
    ...publishedProjects.map((project) => ({
      url: absoluteUrl(projectPath(project.slug)),
      lastModified: project.updatedAt,
      images: project.screenshots.map((screenshot) => absoluteUrl(screenshot.src)),
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(writingPath(article.slug)),
      lastModified: article.updatedAt,
    })),
  ];
}
