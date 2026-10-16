import { profile } from "@/content/profile";
import career from "@/content/career.json";
import type { Article } from "@/content/articles";
import type { Project } from "@/types/content";
import { absoluteUrl, projectPath, projectSocialImagePath, writingPath, writingSocialImagePath } from "@/lib/metadata";

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
      sameAs: [
        profile.links.github,
        profile.links.linkedin,
        profile.links.ijf,
        profile.links.judoInside,
      ],
      knowsAbout: profile.coreSkills,
      worksFor: {
        "@type": "Organization",
        name: career.experiences.find((experience) => experience.current)!.company,
      },
      alumniOf: { "@type": "CollegeOrUniversity", name: career.education.institution },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: `${career.certification.issuer} ${career.certification.title}`,
        credentialCategory: "Certification",
        url: career.certification.url,
      },
      mainEntityOfPage: { "@id": `${profile.siteUrl}/#profile` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${profile.siteUrl}/#profile`,
      url: absoluteUrl(),
      name: `${profile.name} - Full Stack Engineer in Ireland`,
      mainEntity: { "@id": personId },
      isPartOf: { "@id": websiteId },
      inLanguage: "en-IE",
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
        image: absoluteUrl(projectSocialImagePath(project.slug)),
        dateModified: project.updatedAt,
        mainEntityOfPage: { "@id": url },
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
            item: absoluteUrl("/projects"),
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

export function articleStructuredData(article: Article) {
  const url = absoluteUrl(writingPath(article.slug));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["BlogPosting", "TechArticle"],
        "@id": `${url}#article`,
        headline: article.title,
        description: article.summary,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        image: [absoluteUrl(writingSocialImagePath(article.slug))],
        url,
        inLanguage: "en-IE",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Person", "@id": personId, name: profile.name, url: absoluteUrl() },
        publisher: { "@type": "Person", "@id": personId, name: profile.name, url: absoluteUrl() },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
          { "@type": "ListItem", position: 2, name: "Technical writing", item: absoluteUrl("/writing") },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ],
  };
}

export function collectionStructuredData(path: string, name: string, items: readonly { title: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name,
    inLanguage: "en-IE",
    isPartOf: { "@id": websiteId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem", position: index + 1, name: item.title, url: absoluteUrl(item.path),
      })),
    },
  };
}
