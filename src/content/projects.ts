import type { Project } from "@/types/content";

export const projects = [
  {
    slug: "crypto-portfolio-tracker",
    status: "published",
    title: "Crypto Portfolio Tracker",
    updatedAt: "2026-10-16",
    eyebrow: "Java + Spring Boot",
    summary:
      "A transaction-driven application for recording cryptocurrency trades, tracking stored holdings, and calculating realised and unrealised profit and loss.",
    metaDescription:
      "Case study of a Java, Spring Boot, PostgreSQL, and Next.js crypto portfolio tracker with ledger replay, authentication, testing, and operational health checks.",
    role:
      "Designed and implemented the backend, data model, security boundaries, automated tests, operational checks, and the Next.js user interface.",
    problem:
      "A portfolio tracker has to preserve an auditable history while keeping current holdings and profit-and-loss calculations consistent when transactions are created, corrected, or removed.",
    outcome:
      "The finished workflow keeps stored holdings, realised profit and loss, and the audit ledger aligned—even when an older transaction is corrected or removed.",
    featured: true,
    highlights: [
      "Built a Java 25/Spring Boot 4 API with Next.js 16, React/TypeScript and PostgreSQL; secured authentication with JWT and migrations with Flyway.",
      "Designed an auditable BUY/SELL ledger with atomic replay, precise cost-basis/P&L and validation of historical corrections.",
      "Added market-price freshness, performance snapshots and CSV export, with JUnit, MockMvc, PostgreSQL Testcontainers, Vitest and CI.",
    ],
    screenshots: [
      {
        src: "/projects/crypto-portfolio-tracker/dashboard.png",
        alt: "CryptoTracker dashboard showing market prices and portfolio profit and loss",
        caption: "Portfolio dashboard with market prices, holdings, and profit-and-loss totals.",
        width: 1440,
        height: 1000,
      },
      {
        src: "/projects/crypto-portfolio-tracker/transaction-workflow.png",
        alt: "CryptoTracker transaction correction form for a Bitcoin purchase",
        caption: "Transaction correction workflow with validated asset, quantity, and price fields.",
        width: 1230,
        height: 146,
      },
      {
        src: "/projects/crypto-portfolio-tracker/authentication.png",
        alt: "CryptoTracker login screen",
        caption: "JWT-backed authentication entry point.",
        width: 1440,
        height: 1000,
      },
    ],
    metrics: [
      {
        value: "80",
        label: "passing checks",
        detail: "57 backend tests, 22 frontend tests, and one full-stack E2E flow verified locally.",
      },
      {
        value: "17",
        label: "documented routes",
        detail: "Health, authentication, market, portfolio, and transaction API operations.",
      },
      {
        value: "3",
        label: "CI jobs",
        detail: "Separate backend, frontend, and full-stack Playwright jobs in GitHub Actions.",
      },
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
    updatedAt: "2026-10-24",
    eyebrow: "React + ASP.NET Core",
    summary:
      "A rental workflow application connecting property management, tenancy invitations, and maintenance tracking through React and ASP.NET Core.",
    metaDescription:
      "RentRight: React, TypeScript and ASP.NET Core rental workflows with resource-aware authorization, maintenance history, concurrency checks and SQL Server tests.",
    role:
      "Built the React workspaces, ASP.NET Core APIs, tenancy and maintenance workflows, resource-level authorization, database safeguards, and automated checks.",
    problem:
      "Property management joins public listings with sensitive tenancy and maintenance data. Each workflow must expose the right records and actions to administrators, property owners, and active tenants without leaking another user's data.",
    outcome:
      "Tenants can report and follow a repair, owning landlords manage its progress, and administrators oversee the portfolio. Invitations, recorded history, and conflict checks protect the workflow.",
    featured: true,
    highlights: [
      "Built versioned tenancy/maintenance APIs with ASP.NET Core Identity and EF Core: ownership checks, CSRF protection, immutable history and concurrency controls.",
      "CI runs 596 .NET, 248 SQL integration and 91 frontend tests; Docker-based SQL workflows.",
    ],
    screenshots: [
      {
        src: "/projects/rentright/resident-overview.png",
        alt: "RentRight React resident overview with tenancy details, maintenance counts, and a guided walkthrough",
        caption: "Resident overview using the real React presentation components with fictional, in-memory demo data.",
        width: 1440,
        height: 1455,
      },
      {
        src: "/projects/rentright/repair-timeline.png",
        alt: "RentRight maintenance detail showing a kitchen-tap repair and its chronological status timeline",
        caption: "The simulated repair timeline illustrates the tenant UI; it does not demonstrate a live backend transition.",
        width: 1440,
        height: 1151,
      },
      {
        src: "/projects/rentright/resident-mobile.png",
        alt: "RentRight resident overview adapted to a narrow mobile screen with visible portfolio-demo disclosure",
        caption: "Mobile resident workspace with synthetic data and visible demo disclosure.",
        width: 390,
        height: 2241,
      },
    ],
    screenshotContext:
      "These browser captures show the tenant UI simulation with synthetic data. They do not authenticate users, call the backend, or demonstrate landlord/admin workflows. Public hosting remains deferred.",
    metrics: [
      {
        value: "596",
        label: "fast .NET tests passed",
        detail: "Unit and HTTP checks passed in main-branch CI on 24 October 2026; zero failures or skips.",
      },
      {
        value: "248",
        label: "SQL integration tests passed",
        detail: "Disposable SQL Server suite in the same CI run: 248 passed, one skipped, zero failed. The skipped test is not counted as passing.",
      },
      {
        value: "91",
        label: "frontend tests passed",
        detail: "Five Vitest test files passed in CI. These are component/integration checks, not 91 real-browser end-to-end journeys.",
      },
    ],
    evidence: {
      url: "https://github.com/kevinasramoska/RentRight/actions/runs/40082766420",
      label: "Inspect verified CI results · 24 October 2026 · commit d8216bb",
    },
    technologies: [
      "React",
      "TypeScript",
      "C#",
      ".NET 10",
      "ASP.NET Core",
      "Identity",
      "Entity Framework Core",
      "SQL Server",
      "Razor Views",
    ],
    programmingLanguages: ["C#", "TypeScript"],
    architecture: {
      summary:
        "React business workspaces call versioned APIs in the same ASP.NET Core host. Identity uses server-managed cookies and antiforgery protection; application services enforce role, ownership, and active-tenancy boundaries. EF Core and SQL Server persist workflows and protect history and concurrent writes. Identity screens and MVC compatibility routes remain server-rendered.",
      steps: [
        {
          label: "React workspaces",
          detail: "Public listings, tenant maintenance, and landlord/admin business screens; server-rendered Identity account pages.",
        },
        {
          label: "ASP.NET Core API",
          detail: "Same-origin Identity cookies, antiforgery, named policies, resource checks, and application services.",
        },
        {
          label: "SQL Server",
          detail: "EF Core migrations, tenancy relationships, immutable maintenance history, and optimistic concurrency safeguards.",
        },
      ],
    },
    capabilities: [
      "Serve public property listings and property detail pages.",
      "Seed and manage Admin, Landlord, and Tenant roles with ASP.NET Core Identity.",
      "Let landlords manage their own properties while administrators manage all properties and tenancies.",
      "Scope tenant maintenance requests to their own active tenancies.",
      "Give landlords a maintenance queue only for owned properties, with controlled status transitions.",
      "Expose versioned property JSON endpoints with pagination, OpenAPI, antiforgery, and role/resource authorization.",
      "Invite tenants, record their explicit acceptance, and end tenancies through controlled workflows.",
      "Record immutable maintenance status history and reject stale updates rather than silently overwriting concurrent changes.",
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
        title: "One host, explicit presentation boundaries",
        decision:
          "Serve React business workspaces and versioned APIs from one ASP.NET Core application, retaining Identity screens and MVC compatibility routes.",
        tradeOff:
          "Same-origin cookies and antiforgery avoid a separate browser token service, while retained server-rendered routes require clear testing and maintenance boundaries.",
      },
      {
        title: "Recorded history and safe concurrent writes",
        decision:
          "Keep maintenance status events immutable and require version checks for conflicting property, tenancy, and maintenance updates.",
        tradeOff:
          "Conflicts require an explicit reload or resolution, and retained history limits deletion. Database constraints and SQL integration tests complement application checks.",
      },
    ],
    testing: [
      "Fast .NET unit and HTTP tests cover services, validation, authorization, Identity, API outcomes, and the actual React static host.",
      "Disposable SQL Server integration tests exercise real persistence, migrations, constraints, ownership isolation, and concurrency behavior.",
      "Vitest component/integration checks cover React journeys, errors, session boundaries, and the isolated tenant UI simulation. They do not replace a full browser or assistive-technology audit.",
    ],
    delivery: [
      "GitHub Actions checks React, .NET/SQL, and the application container before a required quality gate succeeds.",
      "Local secrets provide database and optional development-admin configuration without checked-in credentials.",
      "Entity Framework migrations version the SQL Server schema.",
      "A combined React/.NET non-root container and local HTTPS Compose environment are verified in CI. Image publication is separate from hosting and database migration.",
    ],
    limitations: [
      "There is no public full-stack deployment. Hosting, production database provisioning, persistent key storage, and operational readiness remain release work.",
      "External sign-in and a working confirmation/recovery email service are not delivered; production self-registration remains closed until onboarding is available.",
      "The standalone tenant UI simulation uses fictional in-memory data. It does not prove backend authentication, persistence, or landlord/admin behavior.",
      "CI reported one skipped SQL integration test; passing counts exclude it. Broader real-device and screen-reader review remains manual work.",
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
