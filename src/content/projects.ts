type ExternalUrl = `https://${string}`;

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  highlights: readonly string[];
  technologies: readonly string[];
  links: {
    repository: ExternalUrl;
    demo?: ExternalUrl;
  };
  featured: boolean;
};

export const projects: readonly Project[] = [
  {
    title: "Crypto Portfolio Tracker",
    subtitle: "Featured Project",
    description:
      "A transaction-driven full-stack application for recording cryptocurrency trades, tracking holdings, and calculating realised and unrealised profit and loss.",
    highlights: [
      "Built REST APIs with Java, Spring Boot, Spring Security, JWT, and BCrypt.",
      "Modelled holdings and an auditable transaction ledger in PostgreSQL with JPA and Flyway migrations.",
      "Integrated external market-price data, portfolio snapshots, CSV export, and operational health endpoints.",
      "Tested backend behaviour with JUnit, MockMvc, and PostgreSQL Testcontainers, with frontend and CI coverage in the repository.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "Testcontainers",
    ],
    links: {
      repository: "https://github.com/kevinasramoska/crypto-portfolio-app",
    },
    featured: true,
  },
  {
    title: "RentRight Property Management",
    subtitle: "Featured Project",
    description:
      "An ASP.NET Core MVC property management application with role-specific workflows for administrators, landlords, and tenants.",
    highlights: [
      "Implemented authentication and role management with ASP.NET Core Identity.",
      "Built property, tenancy, and maintenance-request workflows with Entity Framework Core and SQL Server.",
      "Scoped landlord and tenant actions to owned properties and active tenancies.",
      "Kept current limitations explicit, including planned service-layer extraction and broader authorisation coverage.",
    ],
    technologies: [
      "C#",
      "ASP.NET Core MVC",
      "Identity",
      "Entity Framework Core",
      "SQL Server",
      "Razor Views",
    ],
    links: {
      repository: "https://github.com/kevinasramoska/RentRight",
    },
    featured: true,
  },
];
