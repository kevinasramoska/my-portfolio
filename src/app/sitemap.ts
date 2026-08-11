import type { MetadataRoute } from "next";
import { publishedProjects } from "@/content/projects";
import { absoluteUrl, projectPath } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...publishedProjects.map((project) => ({
      url: absoluteUrl(projectPath(project.slug)),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}
