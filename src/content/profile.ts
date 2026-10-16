import career from "@/content/career.json";
import { siteUrl } from "@/lib/site-url.mjs";

const currentRole = career.experiences.find((experience) => experience.current)!;

export const profile = {
  ...career.profile,
  role: `${currentRole.title} at ${currentRole.company}`,
  siteUrl: siteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? career.profile.siteUrl),
  links: {
    ...career.profile.links,
    certification: career.certification.url,
  },
} as const;
