import type { Project } from "@/types/content";

export const projects = [
  {
    slug: "crypto-portfolio-tracker",
    status: "published",
    title: "Crypto Portfolio Tracker",
    eyebrow: "Java + Spring Boot",
    summary:
      "A transaction-driven application for recording cryptocurrency trades, tracking stored holdings, and calculating realised and unrealised profit and loss.",
    metaDescription:
      "Case study of a Java, Spring Boot, PostgreSQL, and Next.js crypto portfolio tracker with ledger replay, authentication, testing, and operational health checks.",
    role:
      "Designed and implemented the backend, data model, security boundaries, automated tests, operational checks, and the Next.js user interface.",
    problem:
      "A portfolio tracker has to preserve an auditable history while keeping current holdings and profit-and-loss calculations consistent when transactions are created, corrected, or removed.",
    featured: true,
    highlights: [
      "Atomic ledger replay keeps holdings and realised P/L consistent after transaction corrections.",
      "JWT authentication, per-user data boundaries, rate limits, and production secret validation protect the API.",
      "JUnit, MockMvc, PostgreSQL Testcontainers, Vitest, and Playwright cover backend and frontend behaviour.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "Testcontainers",
    ],
    programmingLanguages: ["Java", "TypeScript"],
    architecture: {
      summary:
        "The Next.js client calls a secured Spring MVC API. Transaction writes update PostgreSQL holdings and the audit ledger atomically, while a separate post-commit path records portfolio snapshots. Market prices come from a CoinGecko-compatible API.",
      steps: [
        {
          label: "Next.js client",
          detail: "Authentication, transaction workflows, holdings, allocation, and performance views.",
        },
        {
          label: "Spring Boot API",
          detail: "JWT security, validation, portfolio calculations, ledger rules, and market integration.",
        },
        {
          label: "PostgreSQL",
          detail: "Flyway-managed transactions, stored holdings, users, and portfolio snapshots.",
        },
      ],
    },
    capabilities: [
      "Register and authenticate users with Spring Security, JWT, and BCrypt.",
      "Record BUY and SELL transactions while preventing sales beyond the stored holding quantity.",
      "Calculate invested value, market value, realised P/L, unrealised P/L, and total P/L.",
      "Paginate transaction history, export CSV, and display portfolio performance snapshots.",
      "Expose health, readiness, and liveness endpoints while keeping operational metrics authenticated.",
    ],
    decisions: [
      {
        title: "Stored holdings with an audit ledger",
        decision:
          "Use holdings as the source of truth for open positions while retaining transactions as the audit log and realised-P/L source.",
        tradeOff:
          "The duplicated state makes reads efficient but creates consistency risk, so transaction and holding updates are committed atomically and correction flows rebuild the active ledger.",
      },
      {
        title: "Atomic replay for corrections",
        decision:
          "Void edited rows, retain their ledger position, and replay active transactions whenever an edit or deletion could change later balances.",
        tradeOff:
          "Replay adds write-time work, but it prevents silent drift. A correction that would make a later SELL invalid returns 409 without changing holdings, transactions, or snapshots.",
      },
      {
        title: "Post-commit snapshots",
        decision:
          "Create performance snapshots after a successful transaction commit and through a scheduled backend job.",
        tradeOff:
          "Snapshot history is deliberately best-effort so an analytics failure cannot roll back a valid financial record; missed runtime can therefore leave gaps in history.",
      },
    ],
    testing: [
      "JUnit and MockMvc integration coverage for authentication, transactions, portfolio calculations, market data, and health endpoints.",
      "PostgreSQL Testcontainers checks Flyway history, constraints, rollback behaviour, and persisted numeric precision against the real database engine.",
      "Vitest and Testing Library cover key frontend forms and data handling, with a Playwright end-to-end workflow.",
    ],
    delivery: [
      "GitHub Actions separates backend, frontend, and Playwright jobs and publishes Java and TypeScript coverage reports.",
      "Docker Compose provides PostgreSQL and pgAdmin locally; the backend also includes a production Dockerfile.",
      "CORS origins, JWT secrets, database credentials, rate limits, and runtime ports are environment-configured.",
    ],
    limitations: [
      "The supported market-symbol list is fixed in backend code; unsupported symbols remain recordable but are excluded from known market-value totals.",
      "The in-memory rate limiter is per application instance and needs a shared store or edge control before horizontal scaling.",
      "Deployment promotion, database backup and restore, and rollback procedures are not yet documented.",
      "Portfolio snapshots are best-effort and can contain gaps when the backend is offline.",
    ],
    lessons: [
      "Financial calculations are easier to trust when correction rules and failure behaviour are explicit, transactional, and tested against the production database engine.",
      "Operational constraints such as missing prices, stale sessions, and partial analytics failures should be visible states rather than silent zero values or broad errors.",
    ],
    links: {
      repository: "https://github.com/kevinasramoska/crypto-portfolio-app",
    },
  },
  {
    slug: "rentright",
    status: "published",
    title: "RentRight Property Management",
    eyebrow: ".NET + ASP.NET Core MVC",
    summary:
      "An ASP.NET Core MVC property management application with role-specific workflows for administrators, landlords, and tenants.",
    metaDescription:
      "Case study of a .NET 10 ASP.NET Core MVC property application using Identity, Entity Framework Core, SQL Server, Razor Views, and role-scoped workflows.",
    role:
      "Designed and implemented the MVC application, relational model, Identity roles, property and tenancy workflows, maintenance boundaries, and xUnit test coverage.",
    problem:
      "Property management joins public listings with sensitive tenancy and maintenance data. Each workflow must expose the right records and actions to administrators, property owners, and active tenants without leaking another user's data.",
    featured: true,
    highlights: [
      "ASP.NET Core Identity separates Admin, Landlord, and Tenant capabilities.",
      "Ownership and active-tenancy rules scope property and maintenance workflows.",
      "xUnit coverage exercises services, controller outcomes, validation, and access-control behaviour.",
    ],
    technologies: [
      "C#",
      ".NET 10",
      "ASP.NET Core MVC",
      "Identity",
      "Entity Framework Core",
      "SQL Server",
      "Razor Views",
    ],
    programmingLanguages: ["C#"],
    architecture: {
      summary:
        "Razor Views submit server-rendered MVC workflows. ASP.NET Core Identity provides authentication and roles, application logic scopes actions by role and resource ownership, and Entity Framework Core persists property, tenancy, maintenance, and Identity data in SQL Server.",
      steps: [
        {
          label: "Razor Views",
          detail: "Public listings and role-specific dashboards, forms, and maintenance queues.",
        },
        {
          label: "ASP.NET Core MVC",
          detail: "Identity roles, validation, ownership checks, and workflow coordination.",
        },
        {
          label: "SQL Server",
          detail: "Entity Framework Core models for properties, tenancies, maintenance, and users.",
        },
      ],
    },
    capabilities: [
      "Serve public property listings and property detail pages.",
      "Seed and manage Admin, Landlord, and Tenant roles with ASP.NET Core Identity.",
      "Let landlords manage their own properties while administrators manage all properties and tenancies.",
      "Scope tenant maintenance requests to their own active tenancies.",
      "Give landlords a maintenance queue only for owned properties, with controlled status transitions.",
    ],
    decisions: [
      {
        title: "Role and resource boundaries",
        decision:
          "Combine coarse Identity roles with resource-level ownership and active-tenancy checks instead of treating a role as sufficient authorisation.",
        tradeOff:
          "The checks add workflow complexity, but they prevent one landlord or tenant from reaching another user's property or maintenance records.",
      },
      {
        title: "Server-rendered MVC first",
        decision:
          "Deliver the current workflows with Razor Views and MVC rather than introducing a separate REST API and React client.",
        tradeOff:
          "This keeps the application and validation path compact, but an API/client split remains future work if multiple clients or richer interactions become necessary.",
      },
      {
        title: "Explicit workflow outcomes",
        decision:
          "Model unauthenticated, forbidden, missing, concealed, validation, conflict, and success outcomes for maintenance actions.",
        tradeOff:
          "More outcome types require more tests and mapping code, but make access failures and invalid status transitions deliberate rather than incidental.",
      },
    ],
    testing: [
      "xUnit tests cover property and maintenance services, MVC controller results, validation paths, and role/ownership outcomes.",
      "Tests distinguish unauthenticated, forbidden, concealed-not-found, conflict, and successful workflow results.",
      "SQL Server-backed integration tests and broader end-to-end authorisation coverage remain documented gaps.",
    ],
    delivery: [
      "The repository pins the .NET 10 SDK and provides repeatable restore, build, test, migration, and run commands.",
      "Local secrets provide database and optional development-admin configuration without checked-in credentials.",
      "Entity Framework migrations version the SQL Server schema.",
    ],
    limitations: [
      "A REST API and React client have not been built; the current application is MVC with Razor Views.",
      "SQL Server-backed integration tests and broader authorisation coverage are still planned.",
      "Tenant invitation, immutable maintenance status history, optimistic concurrency, and pagination remain future work.",
      "Application/service-layer extraction is still listed in the repository roadmap.",
    ],
    lessons: [
      "Roles answer what kind of user is acting; secure workflows also need to verify which property, tenancy, or request that user is allowed to access.",
      "Documenting missing architecture and test coverage is more useful than implying that roadmap work is already delivered.",
    ],
    links: {
      repository: "https://github.com/kevinasramoska/RentRight",
    },
  },
] as const satisfies readonly Project[];

const projectSlugs = new Set<string>();

for (const project of projects as readonly Project[]) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
    throw new Error(`Invalid project slug: ${project.slug}`);
  }

  if (projectSlugs.has(project.slug)) {
    throw new Error(`Duplicate project slug: ${project.slug}`);
  }

  if (
    project.status === "published" &&
    (!project.summary.trim() ||
      !project.metaDescription.trim() ||
      project.highlights.length === 0 ||
      project.decisions.length === 0 ||
      project.testing.length === 0 ||
      project.limitations.length === 0)
  ) {
    throw new Error(`Published project is missing required evidence: ${project.slug}`);
  }

  projectSlugs.add(project.slug);
}

export const publishedProjects = projects.filter(
  (project) => project.status === "published",
);

export const featuredProjects = publishedProjects.filter(
  (project) => project.featured,
);

export function getPublishedProject(slug: string) {
  return publishedProjects.find((project) => project.slug === slug);
}
