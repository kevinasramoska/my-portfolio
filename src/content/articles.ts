export type ArticleSection = {
  heading: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  readTime: string;
  published: string;
  relatedProject?: string;
  sections: readonly ArticleSection[];
};

export const articles: readonly Article[] = [
  {
    slug: "designing-safe-transaction-correction",
    title: "Designing safe transaction correction",
    summary:
      "Why changing an old financial transaction is a ledger operation, not a simple database update.",
    readTime: "5 min read",
    published: "12 October 2026",
    relatedProject: "crypto-portfolio-tracker",
    sections: [
      {
        heading: "The hidden cost of editing history",
        paragraphs: [
          "A transaction rarely stands alone. Later balances, realised profit and loss, snapshots, and validation decisions may all depend on the order that came before them. Updating one row in place can therefore leave the visible portfolio and its audit history describing different realities.",
          "The safer mental model is correction rather than mutation. Preserve what happened, record what replaced it, and recalculate every dependent state inside a boundary that either succeeds completely or changes nothing.",
        ],
      },
      {
        heading: "Replay the active ledger atomically",
        paragraphs: [
          "In my Crypto Portfolio Tracker, an edit voids the old record, retains its historical position, inserts the replacement, and replays the active transaction sequence. Holdings and realised P/L are rebuilt from the same ordered source.",
        ],
        points: [
          "Lock the user portfolio before replaying dependent records.",
          "Reject a correction if it makes a later sell historically impossible.",
          "Commit the replacement, holdings, and ledger state in one transaction.",
          "Treat analytics snapshots as a separate post-commit concern.",
        ],
      },
      {
        heading: "Make failure behaviour part of the design",
        paragraphs: [
          "The most important test is not the happy path. It is proving that an invalid correction returns a clear conflict and leaves transactions, holdings, and snapshots unchanged. That invariant gives users a result they can trust and gives engineers a precise contract to maintain.",
        ],
      },
    ],
  },
  {
    slug: "role-based-authorization-beyond-roles",
    title: "Role-based authorization beyond user roles",
    summary:
      "Roles describe the actor. Secure workflows must also verify the resource and relationship involved.",
    readTime: "5 min read",
    published: "12 October 2026",
    relatedProject: "rentright",
    sections: [
      {
        heading: "A role is only the first question",
        paragraphs: [
          "Knowing that someone is a landlord does not prove they can edit every property. Knowing that someone is a tenant does not prove they can view every maintenance request. The authorization decision needs both identity and context.",
          "This distinction matters whenever records belong to an owner, tenancy, team, account, or organisation. A broad role check at the controller is useful, but it cannot replace a resource-level rule in the application workflow.",
        ],
      },
      {
        heading: "Model the relationship explicitly",
        paragraphs: [
          "RentRight combines ASP.NET Core Identity roles with ownership and active-tenancy checks. Administrators can manage the whole system, landlords are limited to owned properties, and tenants are limited to requests connected to their own active tenancy.",
        ],
        points: [
          "Authenticate before loading protected workflow data.",
          "Authorize against the requested resource, not only the route.",
          "Use concealed not-found responses where revealing existence would leak data.",
          "Test unauthenticated, forbidden, missing, conflict, and success outcomes separately.",
        ],
      },
      {
        heading: "Keep the rule close to the workflow",
        paragraphs: [
          "Authorization is easier to review when the service method that performs the operation also owns the resource check. Views can hide unavailable actions, but the server remains the authority. That keeps security intact even if a URL or request is constructed manually.",
        ],
      },
    ],
  },
  {
    slug: "testing-aspnet-with-playwright",
    title: "Testing ASP.NET applications with Playwright",
    summary:
      "A practical browser-testing strategy for authentication, permissions, forms, and business workflows.",
    readTime: "6 min read",
    published: "12 October 2026",
    sections: [
      {
        heading: "Use browser tests for browser-sized risk",
        paragraphs: [
          "Playwright is most valuable where server, browser, identity, routing, and data all meet. A unit test can prove a validator works; a browser test can prove a user can reach the form, submit it, see the result, and remain inside the correct permission boundary.",
          "That makes authentication, permission-aware navigation, validation messages, and critical multi-step workflows better candidates than isolated formatting or every possible field combination.",
        ],
      },
      {
        heading: "Build deterministic test seams",
        paragraphs: [
          "Reliable suites start with controllable data and explicit state. Each test should know which user it owns, which records exist, and which external services have been replaced by stable test doubles.",
        ],
        points: [
          "Create isolated users or data for each scenario.",
          "Prefer accessible names and stable test IDs over CSS structure.",
          "Wait for user-visible outcomes instead of fixed delays.",
          "Capture traces and screenshots only when they help diagnose failure.",
        ],
      },
      {
        heading: "Keep the pyramid intact",
        paragraphs: [
          "Browser tests should not carry the whole quality strategy. Fast xUnit tests can cover validation and service branches, integration tests can verify data access and middleware, and Playwright can protect a smaller set of end-to-end journeys. Together they provide confidence without turning every change into a slow UI suite.",
        ],
      },
    ],
  },
  {
    slug: "kafka-lessons-from-production-style-workflows",
    title: "Kafka lessons from production-style workflows",
    summary:
      "Four habits that make event-driven services easier to operate, test, and recover.",
    readTime: "5 min read",
    published: "12 October 2026",
    sections: [
      {
        heading: "Design for delivery reality",
        paragraphs: [
          "A Kafka message is not proof that a business operation happened exactly once. Consumers can retry, processing can fail after a side effect, and messages can arrive later than expected. The workflow has to remain correct when delivery is repeated or delayed.",
        ],
      },
      {
        heading: "Make failure visible and recoverable",
        paragraphs: [
          "Production-style event work becomes much easier when the message contract, retry behaviour, and operational signals are deliberate from the beginning.",
        ],
        points: [
          "Give events stable identifiers so consumers can detect duplicates.",
          "Keep handlers idempotent where the business operation allows it.",
          "Log enough context to trace a message without exposing sensitive payloads.",
          "Separate transient retry from permanently invalid messages.",
        ],
      },
      {
        heading: "Test the awkward paths",
        paragraphs: [
          "The useful tests cover more than successful serialization. They exercise malformed messages, unavailable dependencies, handler exceptions, repeat delivery, and recovery after failure. Those cases turn event-driven code from an optimistic integration into an operable workflow.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
