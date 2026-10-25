# Current portfolio backlog

Updated 25 October 2026. Historical audits and planning live in `docs/archive/`.

## Delivered

- [x] BWG Foods junior engineer and internship history, with General Motors experience.
- [x] Shared career, contact, education, and credential content in `src/content/career.json`.
- [x] Resume generated from shared career/project content, with a CI check against stale HTML/PDF artifacts.
- [x] Direct Microsoft Learn AZ-900 credential link.
- [x] Two project case studies, real screenshots, architecture, measured evidence, and limitations.
- [x] Current focus, four technical articles, and judo career sections.
- [x] Responsive navigation, keyboard support, reduced motion, and automated accessibility tests.
- [x] Canonical metadata, robots, sitemap, JSON-LD, and generated social images.
- [x] Node 24, compatible dependency updates, CSP, security headers, audit CI, and Dependabot.
- [x] Configurable canonical origin and social-image hostname derived from shared configuration.
- [x] RentRight MVC/API route collision fixed, with 241 passing tests and a patched transitive PKCS dependency.
- [x] SEO index pages, article bylines/dates/share images, richer structured data, and crawler regression checks.
- [x] Owner-confirmed full-time judo period (2024-2026) in shared career content, website timeline/About, and regenerated one-page resume. Exact months are intentionally unspecified.
- [x] Hero engineering snapshot and proof points sourced from shared profile content.
- [x] RentRight case study refreshed against commit `d8216bb`, with CI-linked test counts, current synthetic-data screenshots, and explicit simulation/deployment limits.
- [x] GitHub homepage link, description, topics, and screenshot-led README presentation corrected.

## Deferred release work

Public demos and domain registration remain deferred by the owner. Neither blocks
publishing the career and case-study improvements.

- [ ] Register `kevinasramoska.dev`; the owner confirmed it is not owned yet.
- [ ] Configure and verify DNS/TLS before switching the canonical origin. See `DEPLOYMENT.md`.
- [ ] Create backend hosting and database accounts; none are currently configured.
- [ ] Deploy the Crypto API, PostgreSQL database, and Next.js frontend; verify a complete user journey before adding a demo URL.
- [ ] Deploy the current RentRight application after hosting and SQL Server are available; the route fix is already merged into its source repository.
- [ ] Provision RentRight SQL Server, apply migrations, configure HTTPS and persistent Identity data-protection keys, and arrange demo-role access.

## Follow-up work

- [ ] Upgrade the upstream lint toolchain when it supports current ESLint and has a patched `braces` chain.
- [x] Refresh RentRight metrics with a source commit/date and linked successful CI run; exclude skips from passing totals.
- [ ] Refresh Crypto metrics when its code changes; keep the existing verified measurement until then.
- [ ] Verify Search Console ownership and submit the sitemap from the owner's Google account.
- [x] Record a current production-build mobile baseline with repeatable conditions and documented limits in `PERFORMANCE.md`.
- [ ] Investigate variable mobile LCP under controlled host conditions and collect production field evidence; the baseline is not a speed-optimization claim.
- [ ] Obtain approved BWG/GM impact evidence before adding retailer counts, time savings, defect reductions, or ownership/leadership claims. Existing contributions are retained without invented metrics.
- [ ] Obtain permission for any recommendation quotes before publishing them.
- [ ] Add privacy-conscious usage measurement if it will inform a specific design decision.

Do not mark demos or the custom domain as delivered until the public destinations work.
