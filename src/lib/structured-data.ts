import { profile } from "@/content/profile";
import type { Project } from "@/types/content";
import { absoluteUrl, projectPath } from "@/lib/metadata";

const personId = `${profile.siteUrl}/#person`;
const websiteId = `${profile.siteUrl}/#website`;

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      jobTitle: profile.role,
      description: profile.metaDescription,
      url: profile.siteUrl,
      sameAs: [profile.links.github, profile.links.linkedin],
      knowsAbout: profile.coreSkills,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: `${profile.name} Portfolio`,
      description: profile.metaDescription,
      url: profile.siteUrl,
      publisher: {
        "@id": personId,
      },
    },
  ],
};

export function projectStructuredData(project: Project) {
  const path = projectPath(project.slug);
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${url}#software`,
        name: project.title,
        description: project.metaDescription,
        url,
        codeRepository: project.links.repository,
        programmingLanguage: project.programmingLanguages,
        author: {
          "@id": personId,
          "@type": "Person",
          name: profile.name,
          url: profile.siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: profile.siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Featured projects",
            item: absoluteUrl("/#projects"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: url,
          },
        ],
      },
    ],
  };
}
