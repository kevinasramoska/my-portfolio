export type ExternalUrl = `https://${string}`;

export type ProjectStatus = "published" | "draft";

export type ArchitectureStep = {
  label: string;
  detail: string;
};

export type EngineeringDecision = {
  title: string;
  decision: string;
  tradeOff: string;
};

export type Project = {
  slug: string;
  status: ProjectStatus;
  title: string;
  eyebrow: string;
  summary: string;
  metaDescription: string;
  role: string;
  problem: string;
  featured: boolean;
  highlights: readonly string[];
  technologies: readonly string[];
  programmingLanguages: readonly string[];
  architecture: {
    summary: string;
    steps: readonly ArchitectureStep[];
  };
  capabilities: readonly string[];
  decisions: readonly EngineeringDecision[];
  testing: readonly string[];
  delivery: readonly string[];
  limitations: readonly string[];
  lessons: readonly string[];
  links: {
    repository: ExternalUrl;
    demo?: ExternalUrl;
  };
};
