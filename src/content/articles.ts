export type ArticleSection = {
  heading: string;
  paragraphs: readonly string[];
  points?: readonly string[];
  code?: { caption: string; language: string; value: string };
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  relatedProject?: string;
  sections: readonly ArticleSection[];
  sources: readonly { label: string; url: string }[];
};

const cryptoSource = "https://github.com/kevinasramoska/crypto-portfolio-app/blob/16bc72abccba44bb8b795bb4be295b5ede347139/backend/src";
const rentRightSource = "https://github.com/kevinasramoska/RentRight/blob/d8216bb011723b75e383e1e6fbc9801fddd85da6";

export const articles: readonly Article[] = [
  {
    slug: "designing-safe-transaction-correction",
    title: "Designing safe transaction correction",
    summary:
      "How the Crypto Portfolio Tracker preserves revisions, replays holdings, and rejects edits that would invalidate a later sale.",
    publishedAt: "2026-10-12",
    updatedAt: "2026-10-26",
    relatedProject: "crypto-portfolio-tracker",
    sections: [
      {
        heading: "Start with a correction that must fail",
        paragraphs: [
          "Suppose a portfolio records a purchase of one coin at $100, followed by a sale of that coin at $200. The holding is now empty. Changing the original purchase to half a coin would make the later sale impossible, even though the edited purchase looks valid in isolation.",
          "That is the problem my Crypto Portfolio Tracker has to solve. An edit changes the meaning of later transactions, realised profit and loss, and stored holdings. Validating only the submitted quantity would accept a history that no longer balances. The important contract is that an invalid correction leaves the previous history intact.",
        ],
      },
      {
        heading: "Keep the old revision and replay in order",
        paragraphs: [
          "The update service starts a database transaction and locks the current user's row before changing portfolio state. It loads a transaction owned by that user and rejects an already voided revision. This gives concurrent portfolio writes a shared coordination point and stops a stale edit from replacing an obsolete version.",
          "A valid edit marks the previous revision as voided, links it to a replacement, and gives the replacement the original ledger sequence and historical timestamp. Replay then visits active transactions in sequence, recalculates cost basis and realised profit, and rebuilds holdings. The replacement is not appended as a new purchase at the end of history.",
        ],
        code: {
          caption: "TransactionServiceImpl.updateTransaction — excerpt after the replacement is saved",
          language: "Java",
          value: [
            "currentRevision.setReplacementTransaction(savedReplacement);",
            "transactionRepository.save(currentRevision);",
            "",
            "replayActiveLedger(user,",
            '    "Transaction change would make a historical sell exceed available holdings");',
            "invalidateSnapshots(user, historicalCutoff);",
            "publishPortfolioChange(savedReplacement.getId(), user.getId());",
          ].join("\n"),
        },
      },
      {
        heading: "Assert the state after rejection",
        paragraphs: [
          "The integration test invalidHistoricalEdit_shouldRollbackAuditHoldingsAndSnapshots uses the one-coin purchase and sale scenario. It submits a half-coin correction and expects HTTP 409. It then inspects persistence: the original purchase is still active, has no replacement, the revision count remains two, holdings remain empty, and the snapshot IDs match those captured before the request.",
          "Those assertions matter more than the response code alone. Returning a conflict after partially voiding the original record would still corrupt the portfolio. The test checks the observable rollback contract across the audit trail, holdings, and snapshots. Separate cases cover successful replay, repeated corrections, stale revision IDs, and attempts to edit another user's transaction.",
        ],
      },
      {
        heading: "Separate financial state from chart freshness",
        paragraphs: [
          "Successful corrections invalidate snapshots from the affected historical timestamp inside the transaction. Creating a fresh snapshot happens through an after-commit listener. Its failure is logged without undoing an already committed portfolio change. This deliberately allows incomplete chart history while protecting the transaction result; it does not recreate every historical market valuation.",
          "Full replay is straightforward to inspect but makes writes more expensive as a ledger grows. I would measure that cost before introducing checkpoints or incremental recalculation, because either optimisation needs to preserve ordering, rounding, ownership, and rollback behaviour.",
        ],
      },
    ],
    sources: [
      { label: "Correction and replay implementation · commit 16bc72a", url: cryptoSource + "/main/java/com/kevinas/crypto_portfolio_backend/service/TransactionServiceImpl.java" },
      { label: "Transaction integration tests · commit 16bc72a", url: cryptoSource + "/test/java/com/kevinas/crypto_portfolio_backend/integration/TransactionControllerIntegrationTest.java" },
      { label: "After-commit snapshot listener · commit 16bc72a", url: cryptoSource + "/main/java/com/kevinas/crypto_portfolio_backend/event/PortfolioSnapshotListener.java" },
    ],
  },
  {
    slug: "role-based-authorization-beyond-roles",
    title: "Role-based authorization beyond user roles",
    summary:
      "RentRight's maintenance workflow shows why a role must be combined with ownership, active tenancy, and server-loaded facts.",
    publishedAt: "2026-10-12",
    updatedAt: "2026-10-26",
    relatedProject: "rentright",
    sections: [
      {
        heading: "The role gets you to the next question",
        paragraphs: [
          "Two users can both be tenants without being entitled to the same maintenance request. Likewise, a landlord's role does not establish ownership of a particular property. In RentRight, endpoint policies define the audience; the service and its queries decide whether the actor can perform the requested operation on the actual resource.",
          "The distinction also applies to administrators. An admin can manage properties without owning them, but the Admin role alone does not grant tenant-only actions or permission to accept an invitation for someone else. Giving every administrator every possible capability would erase a useful boundary between system management and a tenant's consent.",
        ],
      },
      {
        heading: "Scope the query to the relationship",
        paragraphs: [
          "TenantMaintenanceService first requires an authenticated user with a nonblank ID and the Tenant role. Its visible-request query then checks the persisted tenant ID, active status, start and end dates, and invitation acceptance. A guessed request ID is evaluated inside that scope. A missing or inaccessible item returns the same not-found outcome.",
          "The history query applies the visibility predicate again. Loading a permitted request once is not a permanent access grant: the tenancy may end before the next query. This repeated check reduces exposure between reads, while the write services retain their own transactional and concurrency checks.",
        ],
        code: {
          caption: "TenantMaintenanceService.Visible — the persisted visibility predicate, formatted for readability",
          language: "C#",
          value: [
            "return db.MaintenanceRequests.AsNoTracking().Where(r =>",
            "    r.Tenancy!.TenantId == user.UserId",
            "    && r.Tenancy.Status == TenancyStatus.Active",
            "    && r.Tenancy.StartDate <= today",
            "    && (r.Tenancy.EndDate == null || r.Tenancy.EndDate >= today)",
            "    && (r.Tenancy.InvitedUtc == null || r.Tenancy.AcceptedUtc != null));",
          ].join("\n"),
        },
      },
      {
        heading: "Do not accept ownership from the form",
        paragraphs: [
          "The tenant create operation accepts a description and derives the eligible tenancy on the server. It does not let a posted property ID or tenant ID decide whose tenancy receives the request. No eligible tenancy produces a distinct application outcome; multiple eligible tenancies produce a conflict rather than silently choosing one.",
          "For manager operations, shared resource rules use persisted ownership facts. Hiding a button is useful guidance, but the same request must remain forbidden when constructed manually. ASP.NET resource-based authorization supports this distinction: an endpoint attribute alone cannot inspect an entity that has not been loaded yet.",
        ],
      },
      {
        heading: "Test the boundary, including loss of access",
        paragraphs: [
          "The fast service tests exercise anonymous callers, blank IDs, and wrong roles before database access. The authorization suite checks resource decisions and multi-role combinations; SQL integration tests cover persistence-dependent behaviour. These layers answer different questions and should not be presented as interchangeable proof.",
          "The trade-off is repetition: audience checks, scoped reads, and guarded writes all need to agree. Shared decision functions help, but removing query scoping to reduce repeated conditions would weaken isolation. A review should follow one request all the way from the route to the data it returns.",
        ],
        points: [
          "Try another tenant's request ID and an unrelated landlord's property.",
          "End a tenancy or leave an invitation unaccepted, then retry access.",
          "Check list results, individual details, and status history independently.",
          "Keep role permission separate from valid status transitions and stale-write conflicts.",
        ],
      },
    ],
    sources: [
      { label: "RentRight authorization boundaries · commit d8216bb", url: rentRightSource + "/docs/AUTHORIZATION.md" },
      { label: "Tenant maintenance queries and creation · commit d8216bb", url: rentRightSource + "/Features/Maintenance/TenantMaintenanceService.cs" },
      { label: "Tenant service rejection tests · commit d8216bb", url: rentRightSource + "/RentRight.Tests/Maintenance/TenantMaintenanceServiceTests.cs" },
      { label: "Microsoft: resource-based authorization", url: "https://learn.microsoft.com/en-us/aspnet/core/security/authorization/resource-based?view=aspnetcore-10.0" },
    ],
  },
  {
    slug: "testing-aspnet-with-playwright",
    title: "Testing ASP.NET applications with Playwright",
    summary:
      "A practical test design for forms, persisted outcomes, and permission boundaries, with an illustrative Playwright for .NET example.",
    publishedAt: "2026-10-12",
    updatedAt: "2026-10-26",
    sections: [
      {
        heading: "Choose a journey with a meaningful failure",
        paragraphs: [
          "A maintenance form is a useful browser-test candidate because routing, authentication, validation, and persistence all meet there. I would start with a tenant submitting a request and finding it again after reloading. Seeing a success banner alone would not prove the saved request can be retrieved.",
          "This article describes a test design using a fictional fixture. The code below is illustrative, not an excerpt from a company system or a claim that RentRight has this exact browser test. The fixture supplies an isolated signed-in tenant, an active tenancy, and the application URL before the shown steps run.",
        ],
      },
      {
        heading: "Wait for an outcome the user can observe",
        paragraphs: [
          "Use labels and accessible roles to locate controls. Playwright's locator assertions retry until their condition holds or the timeout expires. An arbitrary sleep cannot make that guarantee: it may be wasteful on a fast run and still too short on a slow one.",
          "The example deliberately checks the saved item again after reload. In a real suite I would also arrange the initial data explicitly, so a leftover request from an earlier run could not satisfy the assertion. A unique description helps diagnosis, but it does not replace an isolated backend fixture.",
        ],
        code: {
          caption: "Illustrative C# test body — requires the signed-in fixture and matching app controls described above",
          language: "C#",
          value: [
            'var description = $"Kitchen tap leak {Guid.NewGuid():N}";',
            'await Page.GetByLabel("Description").FillAsync(description);',
            "await Page.GetByRole(AriaRole.Button,",
            '    new() { Name = "Submit request", Exact = true }).ClickAsync();',
            "",
            "await Expect(Page.GetByRole(AriaRole.Status))",
            '    .ToContainTextAsync("Request submitted");',
            "await Page.ReloadAsync();",
            "await Expect(Page.GetByText(description, new() { Exact = true }))",
            "    .ToBeVisibleAsync();",
          ].join("\n"),
        },
      },
      {
        heading: "Isolate browser state and server data separately",
        paragraphs: [
          "A fresh browser context isolates cookies and browser storage. It does not reset the ASP.NET database. Reusing the same mutable tenant or property across parallel tests can still create failures that depend on execution order. Give each test its own data, or deliberately serialise scenarios that must share a resource.",
          "For a real login journey, retain the application's authentication, cookie, and antiforgery path. Other workflow tests can reuse controlled authenticated state if their purpose is not to test login. State files contain credentials and should remain private, outside version control. Mocking every request to the application only demonstrates the frontend's response to those mocks.",
        ],
      },
      {
        heading: "Put each assertion at the right level",
        paragraphs: [
          "I would keep a small browser suite for complete journeys and use faster tests for the larger rule matrix. A browser test can catch an inaccessible submit button or a broken route. A service test can cheaply explore description limits. An integration test can prove that a foreign request ID does not leak database records.",
          "When a browser test fails, inspect its trace, request failures, and application logs together. Fix the failing boundary before increasing timeouts or adding retries. Traces can contain submitted data, so synthetic fixtures also make debugging artifacts safer to retain.",
        ],
        points: [
          "Success: submit, reload, and retrieve the saved request.",
          "Validation: submit invalid input and verify that no request is created.",
          "Authorization: use a second tenant and attempt direct access to the first tenant's record.",
          "Expired session: ensure the next protected operation requires authentication without losing the permission boundary.",
        ],
      },
    ],
    sources: [
      { label: "Playwright for .NET: retrying assertions", url: "https://playwright.dev/dotnet/docs/test-assertions" },
      { label: "Playwright for .NET: browser-context isolation", url: "https://playwright.dev/dotnet/docs/browser-contexts" },
      { label: "Playwright for .NET: authentication state", url: "https://playwright.dev/dotnet/docs/auth" },
    ],
  },
  {
    slug: "kafka-lessons-from-production-style-workflows",
    title: "Kafka lessons from production-style workflows",
    summary:
      "Reasoning about duplicate delivery, database side effects, ordering, and recovery through a fictional order-processing example.",
    publishedAt: "2026-10-12",
    updatedAt: "2026-10-26",
    sections: [
      {
        heading: "Look at the gap between two commits",
        paragraphs: [
          "Imagine a consumer receives an OrderAccepted event and records a reservation in a relational database. The database commit succeeds, but the process stops before committing its Kafka offset. After restart, the event can arrive again. Without a duplicate-handling rule, the reservation may be applied twice.",
          "Committing the offset first reverses the risk: the process might stop before recording the reservation, leaving the message marked as consumed with no business result. The order example is fictional; it illustrates the design trade-offs without using company code or data.",
        ],
      },
      {
        heading: "Make one local side effect repeatable",
        paragraphs: [
          "For this example, I would give each event a stable identifier and scope a deduplication record to the logical consumer. A unique constraint on that pair makes competing deliveries meet at the database boundary. Insert the marker and update the reservation in the same database transaction, so either both commit or neither does.",
          "Only acknowledge completed processing after that transaction succeeds. If a replay finds the committed marker, it can skip the already-applied effect. The marker has to survive for the supported replay window; deleting it early would let an old event apply again. Multiple workers must also avoid committing a partition offset past unfinished earlier records.",
        ],
        code: {
          caption: "Illustrative processing sequence for a single database side effect; not Kafka client API code",
          language: "Pseudocode",
          value: [
            "receive event",
            "begin database transaction",
            "  insert marker if absent (unique consumer_name, event_id)",
            "  if already committed: skip reservation update",
            "  otherwise: apply reservation update",
            "commit database transaction",
            "commit the next safe offset for the partition",
          ].join("\n"),
        },
      },
      {
        heading: "Be precise about the guarantee",
        paragraphs: [
          "Kafka transactions can coordinate consumed offsets with records produced back to Kafka. They do not automatically enlist an unrelated SQL write or an external email API in that same transaction. The local marker strategy above addresses one database effect; it does not make every downstream action exactly once.",
          "If the reservation must trigger another message, an outbox row written in the same database transaction is one option to investigate. Its publisher still needs retry and duplicate-handling behaviour. For an external API, a stable idempotency key may help if the provider supports it. Each additional boundary needs its own failure story.",
        ],
      },
      {
        heading: "Define recovery before tuning throughput",
        paragraphs: [
          "For the order example, I would key related events consistently when their relative order matters. Kafka ordering is within a partition, not across the entire topic. Moving a failed event to a separate retry path may let later events overtake it, so the business workflow must either tolerate that or deliberately hold processing back.",
          "An unavailable database and a malformed event need different responses. Use bounded retries for recoverable dependency failures, and an explicit quarantine and review process for unusable messages. A recovery record should identify the event and failure without copying sensitive payloads into general logs. Moving a message aside is only useful if someone can inspect and safely replay it.",
        ],
        points: [
          "Deliver the same event twice and check that the reservation changes once.",
          "Stop after the database commit but before the offset commit, then restart.",
          "Fail the reservation write and verify that no deduplication marker survives.",
          "Test an out-of-order update and a replay after the normal retention window.",
        ],
      },
    ],
    sources: [
      { label: "Apache Kafka: delivery semantics and transaction boundaries", url: "https://kafka.apache.org/41/design/design/#semantics" },
      { label: "Apache Kafka: consumer offset configuration", url: "https://kafka.apache.org/41/configuration/consumer-configs/#enable.auto.commit" },
    ],
  },
];

// An estimate at 200 words/minute, including examples and excluding navigation/references.
export function articleReadTime(article: Pick<Article, "summary" | "sections">) {
  const text = [article.summary, ...article.sections.flatMap((section) => [
    section.heading, ...section.paragraphs, ...(section.points ?? []),
    section.code?.caption ?? "", section.code?.value ?? "",
  ])].join(" ").trim();
  const words = text ? text.split(/\s+/).length : 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articleDate(value: string) {
  return new Intl.DateTimeFormat("en-IE", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(value));
}
