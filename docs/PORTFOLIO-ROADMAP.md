# Portfolio Improvement Roadmap

This roadmap converts the audit into an implementation sequence. It deliberately prioritises truth, recruiter flow, and engineering evidence before visual polish.

## Product principles

1. **Evidence before claims.** Every technology, outcome, and architecture statement must be supported by professional experience, a repository, a demo, or a confirmed resume fact.
2. **Recruiter speed.** Name, role, focus, professional credibility, strongest projects, resume, GitHub, LinkedIn, and contact must be understandable/reachable within 30–60 seconds.
3. **Server-first delivery.** Static content should remain server-rendered; client JavaScript is reserved for real interaction.
4. **Progressive enhancement.** Content is visible before animation/hydration, navigation works with keyboard and touch, and reduced motion is respected.
5. **One source of truth.** Projects, experience, profile links, and resume URL live in typed central content instead of being duplicated across components.
6. **No dead actions.** A button is rendered only when its target exists and has been verified.
7. **Measured quality.** Accessibility, bundle weight, links, metadata, and primary flows have explicit acceptance checks.

## Target information architecture

```text
/
├── Header
├── Hero
├── Credibility
├── Professional experience
├── Featured projects
├── Technical expertise
├── About
├── Contact
└── Footer

/projects/crypto-portfolio-tracker
/projects/rentright
```

The home page sells the next click. Project pages prove engineering depth. The About section supports the narrative but no longer delays professional evidence.

## Target content architecture

Create typed, repository-local content modules such as:

```text
src/content/profile.ts
src/content/experience.ts
src/content/projects.ts
src/types/content.ts
```

Recommended ownership:

- `profile.ts`: name, positioning, availability, canonical profile/contact/resume links, degree/certification proof.
- `experience.ts`: verified roles, dates, location, scope, evidence bullets, technologies.
- `projects.ts`: home-card summary plus case-study detail using one `Project` type.
- `content.ts` types: enforce required fields and optional demo/deployment content.

The render layer should never invent fallback `#` URLs. Draft projects remain in data with `status: "draft"` and are excluded from production paths.

## Case-study template

Each published project page should support:

1. title, one-line outcome, status, and direct actions;
2. problem and user/system context;
3. role and scope;
4. architecture overview and accessible diagram;
5. major capabilities, expressed as outcomes/workflows;
6. two to four engineering decisions with trade-offs;
7. data/security/integration details where relevant;
8. testing and quality strategy;
9. delivery/operations/CI/CD evidence;
10. responsive screenshots with descriptive captions;
11. limitations and future work;
12. lessons learned;
13. repository and optional live-demo links.

The template must allow sections to be omitted when evidence is unavailable. Empty headings and aspirational claims must not render.

## Recommended delivery sequence

### Gate 0 — Preserve and reconcile

- Preserve the current uncommitted redesign in its own branch/commit before parallel work.
- Choose one current resume, one email, one LinkedIn URL, and one role label.
- Reconcile website copy with the current Crypto and RentRight repositories.
- Decide whether Personal Finance Manager has publishable evidence; otherwise remove it.

Exit gate: a signed-off content inventory exists, and no deployable action points to a placeholder or ambiguous destination.

### Gate 1 — Recruiter-critical repair

- Fix every link and CTA.
- Implement a responsive header and contact wrapping.
- Fix one-`h1`, contrast, focus, skip-link, and reduced-motion issues.
- Reorder the home page to surface credibility and experience early.
- Shorten About and repeated positioning copy.

Exit gate: the home page is truthful, works at 320–1920px, and supports a complete keyboard journey.

### Gate 2 — Engineering evidence

- Introduce typed content.
- Build reusable project cards and `/projects/[slug]`.
- Publish Crypto Portfolio Tracker first, then RentRight.
- Add screenshots, diagrams, testing, decisions, and limitations.

Exit gate: both featured projects have direct repositories, one meaningful image, one decision/trade-off, testing evidence, and route metadata.

### Gate 3 — Discoverability and delivery quality

- Add metadataBase, canonical, robots, sitemap, JSON-LD, and social art.
- Optimise fonts, OG/favicons, and project images.
- Reduce client component boundaries and motion cost.
- Add Vercel Analytics/Speed Insights and the agreed event taxonomy.

Exit gate: metadata validators pass, routes are discoverable, bundle/image budgets pass, and analytics records only approved high-level events.

### Gate 4 — Professional quality system

- Add targeted tests and accessibility smoke coverage.
- Add package scripts and GitHub Actions.
- Align and patch dependencies.
- Add practical security headers and document preview/promotion checks.

Exit gate: `npm ci`, lint, typecheck, tests, and build pass in CI; production dependency audit has no accepted high/critical finding without documentation.

### Gate 5 — Final recruiter review

- Run a cold 30-second scan with at least one technical and one non-technical reviewer.
- Validate every external link and resume asset on the preview deployment.
- Run Lighthouse, axe, keyboard, zoom/reflow, and requested breakpoint checks.
- Promote only after the preview content matches the approved resume and repositories.

## Visual direction

Keep:

- dark neutral background;
- blue accent with corrected contrast;
- generous desktop width and restrained typography;
- concise animation used only where it reinforces hierarchy.

Change:

- use full-width section rhythm and dividers so every section is not a rounded card;
- give featured projects a screenshot-led composition;
- reduce technology pills and repeated explanatory copy;
- make professional proof visually scannable;
- use one coherent type strategy;
- create a dedicated 1200×630 social asset rather than a hero screenshot.

Do not add gradients, terminal interfaces, carousels, background particles, skill-logo clouds, or animation libraries beyond what is justified.

## Accessibility strategy

- One page `h1`; sequential section headings.
- Skip link and semantic `header`, `nav`, `main`, `section`, and `footer` landmarks.
- Explicit `focus-visible` tokens with high contrast.
- Minimum 44px product-standard touch targets for primary navigation/actions.
- Content visible without animation; `prefers-reduced-motion` removes non-essential motion and smooth scrolling.
- Text/background combinations meet 4.5:1 for normal text and 3:1 for large text/UI boundaries.
- Images have meaningful alt text or empty alt when decorative; diagrams include an adjacent text explanation.
- Mobile menu exposes correct `aria-expanded`, label, focus order, Escape/close behaviour, and route/anchor handling.
- Test at 200% zoom, 400% reflow, keyboard-only, and one screen reader.

## Performance budgets

Set budgets after the first refactor measurement, then prevent regression. Initial goals:

- essential hero text visible in the first render;
- no unused font family or weight;
- social image substantially below the current 1.6 MB;
- favicon set substantially below the current 1.3 MB source asset;
- project screenshots compressed to an agreed per-image budget and served responsively;
- home-page client JavaScript materially below the current approximate 212 KB gzip;
- no third-party script except approved Vercel analytics/performance tooling;
- Lighthouse targets near 95+ without removing useful content.

## SEO and structured-data strategy

Home page:

- stable title and description aligned with the chosen backend/full-stack positioning;
- absolute canonical URL using `metadataBase`;
- Open Graph/Twitter metadata and 1200×630 image;
- `Person` linked to GitHub and LinkedIn;
- `WebSite` with canonical URL.

Project pages:

- unique title/description/canonical/OG metadata;
- `SoftwareSourceCode` only with supported fields such as name, description, code repository, programming language, author, and URL;
- descriptive internal link text and breadcrumbs;
- inclusion in the sitemap only when published.

Avoid fabricated ratings, dates, downloads, employers, skills, or deployment URLs.

## Analytics measurement plan

Use Vercel Web Analytics and Speed Insights if their data collection terms remain acceptable at implementation time. Track only:

| Event | Property | Decision supported |
| --- | --- | --- |
| `project_case_study_click` | `project` | Which project earns deeper interest |
| `project_github_click` | `project` | Whether technical validation continues off-site |
| `project_demo_click` | `project` | Whether demos add value |
| `resume_view`/`resume_download` | none | Resume conversion |
| `github_profile_click` | `placement` | Profile interest |
| `linkedin_click` | `placement` | Professional-network conversion |
| `email_click` | `placement` | Contact intent |

Do not track typed form content, email addresses, fine-grained scroll behaviour, fingerprints, or cross-site profiles.

## Vercel strategy

- Keep native Next.js routing; do not add an SPA rewrite.
- Prefer Next.js metadata routes and `next.config.ts` headers over `vercel.json` where equivalent.
- Correct workspace-root/output tracing configuration.
- Use preview deployments as the review surface for content, social previews, headers, and external links.
- Document the production promotion checklist in the README.
- Use a stable resume URL and deliberate cache/version policy.
- Add Analytics and Speed Insights only after package/tooling ownership is assigned to avoid `package.json` conflicts.

## Test strategy

### Fast checks

- ESLint;
- TypeScript no-emit typecheck;
- content validation for required project fields and valid URLs;
- focused React tests only for mobile navigation or conditional action logic.

### Browser smoke checks

- home navigation and mobile menu;
- featured project links and routes;
- canonical resume response/content type;
- conditional demo action;
- contact/profile links;
- no horizontal overflow at 320 and 375;
- one automated accessibility scan per public route.

### Manual release checks

- keyboard and focus order;
- VoiceOver/NVDA spot check;
- 200% zoom and 400% reflow;
- social-card preview;
- Lighthouse and Web Vitals review;
- mobile and desktop visual QA;
- all external destinations on the deployed preview.

## Parallel worktree plan

Parallel work starts only after Gate 0 content decisions and shared contracts are merged.

| Worktree/chat | Owned files/areas | Must avoid | Can begin after |
| --- | --- | --- | --- |
| Lead | content contract, page order, integration, final review | doing feature work owned elsewhere | Gate 0 |
| UI/UX | Header, Hero, Experience, home layout, responsive styles | project route internals, metadata files | content inventory |
| Projects | `projects.ts`, project components, `/projects/[slug]`, project assets | root metadata, global analytics | project type contract |
| SEO/Performance | root metadata, robots, sitemap, JSON-LD, fonts, OG/favicons | editing project data contract | canonical identity + route list |
| Quality | test config/files, scripts, GitHub Actions | runtime dependency upgrades unless assigned | stable component APIs |
| Vercel | analytics wrapper, Speed Insights, headers/deployment docs | competing edits to `layout.tsx`/`package.json` | event taxonomy + SEO integration plan |

High-conflict files require one owner at a time:

- `src/app/layout.tsx`;
- `src/app/page.tsx`;
- `src/app/globals.css`;
- `package.json` and `package-lock.json`;
- the central project data/type files;
- `next.config.ts`.

## Release checklist

- [ ] Working tree changes are preserved and reviewed.
- [ ] One canonical resume is selected and all resume actions pass.
- [ ] Email, LinkedIn, GitHub, repository, and demo links are verified.
- [ ] Crypto and RentRight claims match current public evidence.
- [ ] No draft/unverified project renders in production.
- [ ] 320, 375, 768, 1024, 1440, and 1920 layouts pass without overflow.
- [ ] Keyboard, focus, reduced motion, zoom/reflow, contrast, and automated accessibility checks pass.
- [ ] Lint, typecheck, tests, and production build pass in CI.
- [ ] Dependency findings are remediated or explicitly risk-reviewed.
- [ ] Canonical, robots, sitemap, metadata, structured data, and social preview validate.
- [ ] Client bundle, fonts, favicons, OG image, and project images meet budgets.
- [ ] Preview deployment passes recruiter and technical review.
- [ ] Analytics captures only the approved events.
