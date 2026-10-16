# Current portfolio backlog

Updated 16 October 2026. Historical audits and planning live in `docs/archive/`.

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

## Release dependencies

- [ ] Register `kevinasramoska.dev`; the owner confirmed it is not owned yet.
- [ ] Configure and verify DNS/TLS before switching the canonical origin. See `DEPLOYMENT.md`.
- [ ] Create backend hosting and database accounts; none are currently configured.
- [ ] Deploy the Crypto API, PostgreSQL database, and Next.js frontend; verify a complete user journey before adding a demo URL.
- [ ] Deploy the committed RentRight MVC/API route fix after hosting and SQL Server are available.
- [ ] Provision RentRight SQL Server, apply migrations, configure HTTPS and persistent Identity data-protection keys, and arrange demo-role access.

## Follow-up work

- [ ] Upgrade the upstream lint toolchain when it supports current ESLint and has a patched `braces` chain.
- [ ] Refresh project metrics after future project changes; record commit/date alongside measurements.
- [ ] Add remaining writing-route/metadata smoke coverage and a current performance baseline.
- [ ] Obtain permission for any recommendation quotes before publishing them.
- [ ] Add privacy-conscious usage measurement if it will inform a specific design decision.

Do not mark demos or the custom domain as delivered until the public destinations work.
