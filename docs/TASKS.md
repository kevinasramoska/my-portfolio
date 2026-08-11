# Portfolio Task Backlog

Status values are intentionally omitted so this file can remain a planning source until implementation begins. Task phases are categories, not a strict execution order. In particular, `CASE-01` should be implemented early because project-card and case-study work depend on it.

Impact ratings describe expected portfolio value, not implementation urgency by themselves.

## Phase 1 — Recruiter UX / information hierarchy

### UX-01 — Reorder the home page around professional proof

- **Problem:** The long About section appears before General Motors experience and featured projects, delaying the strongest recruiter evidence.
- **Proposed improvement:** Order the page as Hero → Credibility → Professional Experience → Featured Projects → Technical Expertise → About → Contact. Add a concise credibility strip only with verified employer, degree, certification, and focus information.
- **Why it matters:** A recruiter should reach credible professional and project proof within the first scroll, not after personal narrative.
- **Files likely affected:** `src/app/page.tsx`, new `src/components/Credibility.tsx`, `src/components/About.tsx`, `src/components/ExperienceTimeline.tsx`.
- **Acceptance criteria:** General Motors and at least one featured project are visible before About; every header anchor points to the correct ordered section; the judo narrative remains available but does not interrupt the technical funnel.
- **Tests/checks:** DOM heading/order assertion; keyboard navigation through header anchors; visual review at 375, 1024, and 1440px; 30-second recruiter scan.
- **Complexity:** M
- **Dependencies:** CONTENT-01.
- **Can run in parallel:** No — owns `page.tsx` and the global section order.
- **Recruiter impact:** High
- **Technical portfolio value:** Medium
- **SEO impact:** Medium

### UX-02 — Define the primary and secondary conversion actions

- **Problem:** Resume actions behave inconsistently, project actions are placeholders/generic, and the header omits Experience and Resume.
- **Proposed improvement:** Keep View Projects as the dominant hero CTA, use View Resume or a true Download Resume as secondary, expose Experience/Projects/Resume/Contact in navigation, and make GitHub/LinkedIn tertiary but easy to reach.
- **Why it matters:** Clear action hierarchy reduces decision friction and moves visitors toward project validation, resume review, and contact.
- **Files likely affected:** `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/Footer.tsx`, `src/content/profile.ts`.
- **Acceptance criteria:** No high-intent destination is more than one click from the home page; wording matches actual action; all actions use canonical URLs; no `href="#"` remains.
- **Tests/checks:** Link inventory test; Playwright click/navigation checks; external link target/rel audit; preview-deployment manual verification.
- **Complexity:** S
- **Dependencies:** CONTENT-01, RESUME work within CONTENT-01.
- **Can run in parallel:** Yes — after canonical URLs are merged, provided one UI owner controls Header/Hero/Footer.
- **Recruiter impact:** High
- **Technical portfolio value:** Low
- **SEO impact:** Low

## Phase 2 — Content quality

### CONTENT-01 — Establish the canonical content inventory

- **Problem:** The deployed site, working tree, two resumes, README, and project repositories disagree on role positioning, email/LinkedIn/resume URLs, project list, technologies, dates, and engineering claims.
- **Proposed improvement:** Create an approved inventory covering identity, headline, availability, profile links, resume URL, General Motors roles/dates, education/certification, and publishable project facts. Choose one canonical resume and remove unverified claims from deployable content.
- **Why it matters:** Recruiter trust is damaged more by inconsistency than by a modest visual design.
- **Files likely affected:** new `src/content/profile.ts`, new `src/content/experience.ts`, new `src/types/content.ts`, `public/` resume asset, later all content consumers.
- **Acceptance criteria:** One email, LinkedIn URL, role label, resume filename, and set of project facts are signed off; Crypto and RentRight facts match current repositories; Personal Finance Manager is either evidenced or marked draft/excluded; obsolete resume removal is planned after link migration.
- **Tests/checks:** Manual cross-check against selected resume and repository READMEs; URL/status validation; repository search for published projects; content-owner sign-off.
- **Complexity:** M
- **Dependencies:** None.
- **Can run in parallel:** No — this is the content foundation for almost every other task.
- **Recruiter impact:** High
- **Technical portfolio value:** Medium
- **SEO impact:** High

### CONTENT-02 — Rewrite experience, expertise, and About copy around evidence

- **Problem:** Copy repeats “clean,” “secure,” “scalable,” “production-ready,” and “backend-first” while omitting stronger evidence such as APIs, Kafka, ELK, tests, CI/CD, authorisation boundaries, and data decisions.
- **Proposed improvement:** Use concise scope/evidence bullets for professional roles, reduce About to a short personal narrative, and reorganise expertise into Primary, Frontend, Testing/Quality, Delivery/Operations, and Architecture/Integration.
- **Why it matters:** Specific evidence is more credible and scannable than repeated capability adjectives.
- **Files likely affected:** `src/content/experience.ts`, `src/components/ExperienceTimeline.tsx`, `src/components/About.tsx`, `src/components/Skills.tsx`, optional new `src/content/skills.ts`.
- **Acceptance criteria:** Each role has a one-line scope plus 3–5 verified bullets; About is materially shorter; low-value items such as VS Code and generic workflow labels are removed; primary skills are visually distinct and tied to evidence.
- **Tests/checks:** Grammar/readability review; recruiter scan; factual comparison with approved inventory; heading/word-count check; confidentiality review.
- **Complexity:** M
- **Dependencies:** CONTENT-01.
- **Can run in parallel:** Yes — can run alongside case-study implementation if it owns only experience/about/skills content.
- **Recruiter impact:** High
- **Technical portfolio value:** Medium
- **SEO impact:** Medium

## Phase 3 — Project showcase

### PROJECT-01 — Build evidence-led featured project cards

- **Problem:** Current cards lack screenshots, problem context, decisions, case-study links, and direct repositories; demo links are placeholders.
- **Proposed improvement:** Create a reusable featured card driven by the typed project model, showing an image, problem/outcome summary, 2–3 engineering highlights, compact stack, direct repository link, and case-study CTA. Render demo only when a real URL exists.
- **Why it matters:** Projects are the main proof that the candidate can design and deliver software.
- **Files likely affected:** new `src/components/projects/ProjectCard.tsx`, `src/components/Projects.tsx`, `src/content/projects.ts`, project image assets.
- **Acceptance criteria:** Crypto and RentRight render from shared data; repository actions go to exact repositories; case-study links use descriptive text; no placeholder actions exist; featured project is visually stronger without excessive copy.
- **Tests/checks:** Component test for conditional demo action; link validation; 320/375/768/1440 visual QA; keyboard/focus check; image alt review.
- **Complexity:** M
- **Dependencies:** CONTENT-01, CASE-01.
- **Can run in parallel:** Yes — project team can own project-only components after the content contract is merged.
- **Recruiter impact:** High
- **Technical portfolio value:** High
- **SEO impact:** Medium

### PROJECT-02 — Produce verified project screenshots and diagrams

- **Problem:** No project imagery exists in the portfolio, and placeholder screenshot blocks remain in unused code.
- **Proposed improvement:** Capture representative, current UI screenshots for Crypto and RentRight; create accessible architecture/data-flow diagrams from verified repository behaviour; export responsive AVIF/WebP assets with captions and dimensions.
- **Why it matters:** Real visuals make projects memorable and allow recruiters to understand scope before reading dense technical copy.
- **Files likely affected:** `public/projects/crypto-portfolio-tracker/*`, `public/projects/rentright/*`, project content data, optional diagram source files under `docs/diagrams/`.
- **Acceptance criteria:** Each featured project has at least one current screenshot; Crypto has a transaction/data-flow diagram; RentRight has a role/authorisation diagram; assets contain no secrets/test credentials/personal data; every image has useful alt/caption text.
- **Tests/checks:** Visual inspection at native and responsive sizes; file-size budget check; alt/caption review; repository/content-owner factual validation.
- **Complexity:** L
- **Dependencies:** CONTENT-01; current project applications must be runnable or provide approved captures.
- **Can run in parallel:** Yes — asset production can run independently from the portfolio UI once required shots are defined.
- **Recruiter impact:** High
- **Technical portfolio value:** High
- **SEO impact:** Medium

## Phase 4 — Visual polish

### VISUAL-01 — Replace the repeated section-card template with a coherent layout system

- **Problem:** Every section uses nearly identical rounded borders, surfaces, padding, and pills, making the page feel template-driven.
- **Proposed improvement:** Define section, container, surface, divider, spacing, and accent patterns; reserve prominent cards for projects/experience; let other sections use typography and whitespace hierarchy.
- **Why it matters:** A restrained but deliberate system looks more senior and keeps attention on evidence.
- **Files likely affected:** `src/app/globals.css`, `src/app/page.tsx`, all primary section components.
- **Acceptance criteria:** No more than the intentionally card-like content uses the large rounded-surface treatment; sections remain visually distinct without gradients/gimmicks; desktop rhythm is consistent; mobile padding is reduced appropriately.
- **Tests/checks:** Side-by-side full-page screenshots at 375 and 1440px; design-token review; contrast verification; recruiter visual review.
- **Complexity:** M
- **Dependencies:** UX-01, PROJECT-01.
- **Can run in parallel:** No — touches shared global styles and many section wrappers.
- **Recruiter impact:** Medium
- **Technical portfolio value:** Medium
- **SEO impact:** Low

### VISUAL-02 — Refine typography, icons, and interaction states

- **Problem:** Font loading and actual font usage conflict; pills and icons repeat heavily; hover states are more developed than focus/active states.
- **Proposed improvement:** Choose one font strategy, formalise type scale/line lengths, reduce decorative pills, standardise icon size/weight, and create hover/focus/active/disabled tokens.
- **Why it matters:** Consistent typography and states improve perceived quality and accessibility without decorative excess.
- **Files likely affected:** `src/app/layout.tsx`, `src/app/globals.css`, Header/Hero/Projects/Skills/Contact/Footer components.
- **Acceptance criteria:** Only used font files load; body/heading typography matches the chosen strategy; decorative icons do not create duplicate accessible names; focus is at least as visible as hover; pills are reserved for real metadata.
- **Tests/checks:** Production font/resource inspection; keyboard state review; visual QA; accessibility tree spot check.
- **Complexity:** M
- **Dependencies:** VISUAL-01, PERF-02 coordination.
- **Can run in parallel:** No — coordinate with performance and accessibility owners because `layout.tsx`/global CSS are shared.
- **Recruiter impact:** Medium
- **Technical portfolio value:** Medium
- **SEO impact:** Low

## Phase 5 — Responsive design

### RESPONSIVE-01 — Implement a robust mobile header and contact layout

- **Problem:** Navigation is clipped at 320/375px, contact cards force the page to about 404px wide, and long URLs do not wrap safely.
- **Proposed improvement:** Add a keyboard-accessible mobile menu or reduced mobile header, provide 44px targets, use `min-width: 0`/safe wrapping for contact rows, and tune small-screen padding/type sizes.
- **Why it matters:** Recruiters frequently open portfolios on phones; current failures hide Contact and create an obvious horizontal scrollbar.
- **Files likely affected:** `src/components/Header.tsx`, `src/components/Contact.tsx`, `src/components/Footer.tsx`, `src/app/globals.css`.
- **Acceptance criteria:** No clipped navigation or horizontal document overflow at 320/375; all contact text wraps; menu reports open state, closes with Escape and after selection, and restores focus; touch targets meet the 44px product standard.
- **Tests/checks:** Playwright 320/375 overflow assertion; keyboard menu test; touch-target measurement; screenshots at 320/375/768.
- **Complexity:** M
- **Dependencies:** UX-02, A11Y-01.
- **Can run in parallel:** Yes — one responsive/accessibility owner may do this while project routes are built.
- **Recruiter impact:** High
- **Technical portfolio value:** High
- **SEO impact:** Low

### RESPONSIVE-02 — Complete breakpoint and reflow QA

- **Problem:** Existing styling has not been verified as a complete flow across all required breakpoints, zoom, and content lengths.
- **Proposed improvement:** Tune hero, credibility, experience, project media/actions, skills, case studies, and footer at 320, 375, 768, 1024, 1440, and 1920+, including 200% zoom and 400% reflow.
- **Why it matters:** A professional portfolio should remain readable and operable under real viewport and magnification conditions.
- **Files likely affected:** responsive classes across all public components and `src/app/globals.css`.
- **Acceptance criteria:** No horizontal overflow; readable line lengths; no clipped actions/images; stable project media aspect ratios; fixed header does not obscure anchor/focus targets; large desktop does not produce overly wide text.
- **Tests/checks:** Automated overflow checks; breakpoint screenshot matrix; manual 200% zoom/400% reflow; device touch check.
- **Complexity:** M
- **Dependencies:** RESPONSIVE-01, PROJECT-01, CASE-01, VISUAL-01.
- **Can run in parallel:** No — final responsive pass should occur after main UI composition stabilises.
- **Recruiter impact:** High
- **Technical portfolio value:** High
- **SEO impact:** Low

## Phase 6 — Accessibility

### A11Y-01 — Correct semantic structure, focus, and keyboard behaviour

- **Problem:** The page has duplicate `h1` headings, no skip link, weak/implicit focus styling, and a navigation component not designed for mobile keyboard interaction.
- **Proposed improvement:** Add semantic `header`/named nav, one hero `h1`, sequential headings, a skip link, explicit `focus-visible` styles, correct action semantics, and tested menu focus management.
- **Why it matters:** These are foundational WCAG and usability requirements and visible evidence of frontend quality.
- **Files likely affected:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/Header.tsx`, all heading/action components, `src/app/globals.css`.
- **Acceptance criteria:** Exactly one `h1`; skip link reaches `main`; all interactive elements are reachable in logical order; focus is always visible; new-tab/download wording is accurate; landmarks and accessible names are meaningful.
- **Tests/checks:** Heading/landmark automated test; keyboard-only journey; browser accessibility-tree review; screen-reader spot check.
- **Complexity:** M
- **Dependencies:** UX-01, UX-02.
- **Can run in parallel:** Yes — with project case-study work, but shared layout/header files require one owner.
- **Recruiter impact:** Medium
- **Technical portfolio value:** High
- **SEO impact:** Medium

### A11Y-02 — Fix colour, motion, media, and automated accessibility coverage

- **Problem:** Live brown contrast is 1.93:1, working-tree white-on-blue button text is about 3.68:1, animations ignore reduced-motion preferences, and essential hero content is initially invisible.
- **Proposed improvement:** Choose AA-compliant colour pairs, keep essential content visible, respect `prefers-reduced-motion`, disable smooth scrolling when appropriate, and define image/diagram text alternatives.
- **Why it matters:** Contrast and motion failures directly exclude users and the blank animated hero creates a poor first impression even for sighted users.
- **Files likely affected:** `src/app/globals.css`, motion-using components, project media components, test files.
- **Acceptance criteria:** Normal text reaches 4.5:1 and relevant UI boundaries/large text reach 3:1; hero is visible before hydration; reduced-motion mode removes nonessential movement/smooth scroll; screenshots/diagrams have correct alternatives.
- **Tests/checks:** Contrast calculations; reduced-motion browser test; Playwright + axe smoke; manual screen-reader/keyboard review.
- **Complexity:** M
- **Dependencies:** VISUAL-01, PERF-01, PROJECT-02.
- **Can run in parallel:** Yes — after colour tokens and media contracts are agreed.
- **Recruiter impact:** Medium
- **Technical portfolio value:** High
- **SEO impact:** Low

## Phase 7 — SEO

### SEO-01 — Complete root metadata and canonical identity

- **Problem:** `metadataBase` and canonical URL are missing; source builds resolve social images against localhost; role positioning varies across public surfaces.
- **Proposed improvement:** Add production `metadataBase`, canonical, accurate title/description, complete Open Graph/Twitter data, authors/creator where useful, and one consistent role/focus phrase.
- **Why it matters:** Search engines and social platforms need an unambiguous canonical identity and absolute asset URLs.
- **Files likely affected:** `src/app/layout.tsx`, `src/content/profile.ts`, optional metadata helper.
- **Acceptance criteria:** Production build emits no metadataBase warning; canonical and social image URLs are absolute; title/description match approved content; no unsupported claims appear in metadata.
- **Tests/checks:** Inspect generated HTML; Next production build; social/meta validator; canonical URL assertion.
- **Complexity:** S
- **Dependencies:** CONTENT-01.
- **Can run in parallel:** Yes — SEO owner can work after canonical identity is approved.
- **Recruiter impact:** Medium
- **Technical portfolio value:** Medium
- **SEO impact:** High

### SEO-02 — Add robots, sitemap, structured data, and internal discovery

- **Problem:** `/robots.txt` and `/sitemap.xml` return 404, no JSON-LD exists, and projects have no crawlable detail routes.
- **Proposed improvement:** Add Next metadata routes for robots/sitemap, conservative Person + WebSite JSON-LD, project entries for published slugs, and descriptive internal project links/breadcrumbs.
- **Why it matters:** These changes improve indexability and let search engines understand the person, site, and engineering work.
- **Files likely affected:** new `src/app/robots.ts`, new `src/app/sitemap.ts`, JSON-LD component/helper, project route/layout files.
- **Acceptance criteria:** Robots and sitemap return 200 with the canonical host; only published routes are listed; JSON-LD validates and uses supported fields; every project page is linked from home.
- **Tests/checks:** HTTP status/content tests; schema validator; sitemap snapshot focused on route list; crawl/link check.
- **Complexity:** M
- **Dependencies:** SEO-01, CASE-01, CONTENT-01.
- **Can run in parallel:** Yes — coordinate only on the central project slug list.
- **Recruiter impact:** Low
- **Technical portfolio value:** Medium
- **SEO impact:** High

### SEO-03 — Replace social art and add route-specific sharing metadata

- **Problem:** The 1.6 MB square OG image uses stale/generic positioning and a fake button; project routes have no unique preview.
- **Proposed improvement:** Create a compressed 1200×630 home OG asset with approved backend-focused copy and project-specific images/metadata using reusable metadata helpers.
- **Why it matters:** Shared portfolio/project links should communicate identity and technical focus before a visitor opens them.
- **Files likely affected:** `public/og.*`, optional `public/projects/*/og.*`, root and project metadata code.
- **Acceptance criteria:** Home preview contains name, role, concise stack, and no fake control; each published project has a distinct title/description/image; file sizes meet the asset budget.
- **Tests/checks:** Open Graph/Twitter preview validators; image dimension/size check; contrast/safe-area visual review; generated HTML inspection.
- **Complexity:** M
- **Dependencies:** CONTENT-01, PROJECT-02, SEO-01, CASE-01.
- **Can run in parallel:** Yes — asset design can run beside implementation after copy is approved.
- **Recruiter impact:** Medium
- **Technical portfolio value:** Medium
- **SEO impact:** High

## Phase 8 — Performance

### PERF-01 — Reduce client component and animation cost

- **Problem:** Most content sections are client components solely for Framer Motion; the home page references about 212 KB gzip JavaScript and essential hero content starts hidden.
- **Proposed improvement:** Convert static sections to Server Components, isolate true interactive islands, remove unnecessary `use client`, and replace/reduce entrance animation with CSS/progressive enhancement where justified.
- **Why it matters:** A mostly static portfolio should ship minimal JavaScript and show its core message immediately.
- **Files likely affected:** Hero/About/Experience/Projects/Skills/Contact components, optional small motion wrapper, `package.json` if Framer Motion becomes unnecessary.
- **Acceptance criteria:** Static content renders without client hydration; hero is visible in initial HTML/CSS; home client JavaScript is materially below baseline; behaviour and visual hierarchy remain intact.
- **Tests/checks:** Production build asset comparison; JS-disabled content check; hydration/console check; Lighthouse/Web Vitals comparison.
- **Complexity:** M
- **Dependencies:** A11Y-02, VISUAL-02.
- **Can run in parallel:** No — this refactor overlaps most UI components and motion behaviour.
- **Recruiter impact:** Medium
- **Technical portfolio value:** High
- **SEO impact:** Medium

### PERF-02 — Optimise fonts, favicons, social images, and project media

- **Problem:** Geist/Geist Mono load while global CSS uses system fonts; the favicon is 1.3 MB; the OG image is 1.6 MB; future project images need a responsive strategy.
- **Proposed improvement:** Use one font strategy, remove unused weights/families, generate appropriate favicon sizes, compress OG assets, and serve project media with `next/image`, dimensions, modern formats, and below-fold lazy loading.
- **Why it matters:** Asset discipline improves loading, Core Web Vitals, and technical credibility.
- **Files likely affected:** `src/app/layout.tsx`, `src/app/globals.css`, `public/favicon*`, `public/og*`, project image components/assets.
- **Acceptance criteria:** No unused font preload; favicon/OG meet agreed budgets; project images avoid layout shift and use responsive sources; only the lead above-fold image receives priority.
- **Tests/checks:** Network/resource inspection; image metadata/file-size script; Lighthouse; CLS check; visual quality review.
- **Complexity:** M
- **Dependencies:** VISUAL-02, PROJECT-02, SEO-03.
- **Can run in parallel:** Yes — asset optimisation can proceed while tests/CI are configured, but one owner controls `layout.tsx`.
- **Recruiter impact:** Medium
- **Technical portfolio value:** High
- **SEO impact:** Medium

### PERF-03 — Establish performance measurement and budgets

- **Problem:** There is no repeatable Lighthouse/Web Vitals baseline or regression threshold.
- **Proposed improvement:** Record production preview metrics after real content/assets land, define pragmatic bundle/image/Core Web Vitals budgets, and add lightweight CI reporting where stable.
- **Why it matters:** Measured optimisation is more credible than claiming a fast site or chasing synthetic scores blindly.
- **Files likely affected:** documentation, optional CI configuration, optional budget script/config.
- **Acceptance criteria:** Baseline records environment/date/routes; budgets cover client JS and image sizes at minimum; regressions fail or clearly warn in CI; UX is not removed solely to inflate scores.
- **Tests/checks:** Repeat Lighthouse runs; bundle-size script; Vercel Speed Insights after production traffic exists.
- **Complexity:** M
- **Dependencies:** PERF-01, PERF-02, CASE-02, CASE-03.
- **Can run in parallel:** No — measurement is meaningful only after final representative pages/assets exist.
- **Recruiter impact:** Low
- **Technical portfolio value:** High
- **SEO impact:** Medium

## Phase 9 — Vercel optimisation

### VERCEL-01 — Correct Next/Vercel build roots and add practical security headers

- **Problem:** Next infers a parent workspace root because of another lockfile, and the live page exposes only Vercel HSTS without an explicit application header policy.
- **Proposed improvement:** Configure the correct Turbopack/output tracing root and add tested headers such as content-type options, referrer policy, permissions policy, and framing protection; stage CSP separately if justified.
- **Why it matters:** Deterministic builds and a practical header baseline reduce deployment surprises and demonstrate production awareness.
- **Files likely affected:** `next.config.ts`; `vercel.json` only if a requirement cannot be expressed through Next.
- **Acceptance criteria:** Build/start no longer warn about incorrect workspace root; headers appear on production preview; no application asset/navigation is broken; no unnecessary SPA rewrite is added.
- **Tests/checks:** `npm run build`; preview `curl -I`; browser route/media checks; security-header review; CSP report/test if introduced.
- **Complexity:** M
- **Dependencies:** SEO-01, dependency upgrades in CI-02 may need coordination.
- **Can run in parallel:** Yes — Vercel owner can work independently if `next.config.ts` ownership is exclusive.
- **Recruiter impact:** Low
- **Technical portfolio value:** High
- **SEO impact:** Low

### VERCEL-02 — Document preview, resume cache, and production promotion workflow

- **Problem:** The deployed site lags the working tree, two resume files are cached publicly, and there is no release checklist or rollback/promotion documentation.
- **Proposed improvement:** Document preview-deployment review, canonical resume update/version policy, environment expectations, analytics verification, and production promotion/rollback steps.
- **Why it matters:** A repeatable release flow prevents stale content and broken high-intent assets from reaching recruiters.
- **Files likely affected:** `README.md`, optional `docs/DEPLOYMENT.md`, Vercel project settings documentation.
- **Acceptance criteria:** README accurately describes Next.js setup/build/deployment; preview checklist includes links, metadata, breakpoints, resume, headers, and analytics; canonical resume cache strategy is explicit.
- **Tests/checks:** Fresh-clone setup exercise; preview deployment dry run; resume status/content-type check; rollback path review.
- **Complexity:** S
- **Dependencies:** CONTENT-01, VERCEL-01, CI-01.
- **Can run in parallel:** Yes — documentation can proceed while UI features finish, then be finalised at release.
- **Recruiter impact:** Medium
- **Technical portfolio value:** Medium
- **SEO impact:** Low

## Phase 10 — Analytics

### ANALYTICS-01 — Add privacy-conscious Vercel measurement

- **Problem:** No usage or Web Vitals data exists, so broken/ignored recruiter journeys cannot be distinguished from assumptions.
- **Proposed improvement:** Integrate Vercel Web Analytics and Speed Insights after confirming current terms/configuration, with no session replay or invasive third-party tracking.
- **Why it matters:** Lightweight measurement can identify whether visitors inspect projects, resumes, or contact paths and surface real performance issues.
- **Files likely affected:** `package.json`, `package-lock.json`, `src/app/layout.tsx`, privacy/README documentation.
- **Acceptance criteria:** Analytics and Speed Insights load only in intended environments; no personal form content is captured; privacy disclosure is accurate; local development remains clean.
- **Tests/checks:** Production preview network check; Vercel dashboard event/pageview verification; consent/privacy review appropriate to the chosen tools.
- **Complexity:** S
- **Dependencies:** SEO-01; coordinate `layout.tsx`/package ownership with PERF-02 and CI-02.
- **Can run in parallel:** No — package/layout changes should have one integration owner.
- **Recruiter impact:** Low
- **Technical portfolio value:** Medium
- **SEO impact:** Low

### ANALYTICS-02 — Implement a typed high-intent event taxonomy

- **Problem:** Raw page views do not explain resume, repository, case-study, demo, LinkedIn, or contact conversion.
- **Proposed improvement:** Create a tiny typed event helper for the approved event names/properties and instrument only high-level outbound/conversion actions.
- **Why it matters:** Consistent event names enable useful funnel analysis without invasive tracking.
- **Files likely affected:** new `src/lib/analytics.ts`, CTA/link components, analytics documentation.
- **Acceptance criteria:** Events include project slug/placement only where approved; duplicate events are not emitted; demo events cannot fire when no demo exists; no email address or free-form content is sent.
- **Tests/checks:** Unit tests for event payloads; preview dashboard verification; browser check with analytics disabled/unavailable.
- **Complexity:** M
- **Dependencies:** ANALYTICS-01, UX-02, PROJECT-01, CASE-01.
- **Can run in parallel:** Yes — after the event API and owning files are agreed.
- **Recruiter impact:** Low
- **Technical portfolio value:** High
- **SEO impact:** Low

## Phase 11 — Testing

### TEST-01 — Add minimal Vitest and React Testing Library coverage

- **Problem:** No test runner or tests exist, but conditional project actions and responsive-menu state contain meaningful behaviour.
- **Proposed improvement:** Configure Vitest/RTL and test mobile menu state/focus, project demo conditionality, canonical CTA/link rendering, and core content validation.
- **Why it matters:** A small behaviour-focused suite demonstrates judgement better than many trivial presentational snapshots.
- **Files likely affected:** `package.json`, `package-lock.json`, test config/setup, focused `*.test.tsx` files.
- **Acceptance criteria:** Tests run through `npm test`; no broad snapshot tests; menu and conditional actions have meaningful assertions; tests are deterministic.
- **Tests/checks:** Run test suite locally and in CI; mutation/manual sanity check that tests fail when behaviour is intentionally broken.
- **Complexity:** M
- **Dependencies:** RESPONSIVE-01, PROJECT-01, CASE-01.
- **Can run in parallel:** Yes — quality owner can add tests after stable component APIs, with exclusive package ownership.
- **Recruiter impact:** Low
- **Technical portfolio value:** High
- **SEO impact:** Low

### TEST-02 — Add Playwright smoke, link, overflow, and axe coverage

- **Problem:** The current failures are integration issues—broken URLs, mobile overflow, metadata routes, focus, and route accessibility—that unit tests will not catch.
- **Proposed improvement:** Add a small Playwright suite for home/project navigation, canonical resume content type, direct repositories, conditional demos, 320/375 overflow, headings, and axe scans.
- **Why it matters:** These tests protect the exact recruiter journeys and regressions found in the audit.
- **Files likely affected:** Playwright config, `tests/e2e/*`, package scripts, optional axe package.
- **Acceptance criteria:** Suite covers home plus both project routes; asserts no horizontal overflow at 320/375; validates resume/robots/sitemap responses; axe has no serious/critical unreviewed violations.
- **Tests/checks:** Local production-server run; CI smoke job; intentional failure verification for one broken link/overflow case.
- **Complexity:** M
- **Dependencies:** TEST-01 setup decisions, RESPONSIVE-02, SEO-02, CASE-02, CASE-03.
- **Can run in parallel:** Yes — test authoring can follow completed routes while performance work proceeds.
- **Recruiter impact:** Low
- **Technical portfolio value:** High
- **SEO impact:** Medium

## Phase 12 — CI/CD

### CI-01 — Add explicit quality scripts and GitHub Actions workflow

- **Problem:** There is no `typecheck`/`test` script or CI gate before Vercel deploys from GitHub.
- **Proposed improvement:** Add scripts and a GitHub Actions workflow for `npm ci`, lint, typecheck, tests, and build; add an optional Playwright smoke job with sensible caching/artifacts.
- **Why it matters:** Automated quality checks demonstrate professional delivery practices and prevent broken previews/production deploys.
- **Files likely affected:** `package.json`, `package-lock.json`, new `.github/workflows/ci.yml`, test configs.
- **Acceptance criteria:** Clean checkout passes all jobs; failures block merge; workflow uses supported Node version and lockfile caching; browser job does not slow every trivial iteration unnecessarily.
- **Tests/checks:** Run scripts locally; open a test PR/branch; inspect successful and intentionally failing workflow behaviour.
- **Complexity:** M
- **Dependencies:** TEST-01; TEST-02 for the optional browser job.
- **Can run in parallel:** Yes — after test commands are stable; one quality owner controls package/workflow files.
- **Recruiter impact:** Low
- **Technical portfolio value:** High
- **SEO impact:** Low

### CI-02 — Remediate dependency findings and align Next tooling

- **Problem:** Production audit reports four high-severity findings; full audit reports ten findings; Next 16.0.7 is paired with eslint-config-next 15.5.6; local install reports extraneous packages.
- **Proposed improvement:** Upgrade to reviewed patched compatible releases, align Next/eslint-config-next versions, recreate installation with `npm ci`, and document/automate dependency review.
- **Why it matters:** Publishing a portfolio on a known vulnerable/misaligned stack undermines the production-quality story.
- **Files likely affected:** `package.json`, `package-lock.json`, CI workflow, optional Dependabot configuration.
- **Acceptance criteria:** Lint/typecheck/tests/build pass after upgrades; production audit has no high/critical finding unless explicitly documented; `npm ls --depth=0` has no unexplained extraneous packages; deployment preview behaves correctly.
- **Tests/checks:** `npm ci`; `npm audit --omit=dev`; full audit; lint; typecheck; tests; build; preview smoke.
- **Complexity:** M
- **Dependencies:** CI-01, stable test suite.
- **Can run in parallel:** No — runtime/tooling upgrades should be isolated from feature branches.
- **Recruiter impact:** Low
- **Technical portfolio value:** High
- **SEO impact:** Low

### CI-03 — Add formatting and maintenance policy

- **Problem:** Formatting is inconsistent, several files lack final newlines, README is stale, and no dependency-update policy exists.
- **Proposed improvement:** Add a minimal Prettier configuration/format check only if the team wants enforcement, remove dead components/config after migrations, and configure a low-noise dependency update policy.
- **Why it matters:** Consistent maintenance supports future project additions without adding architecture for its own sake.
- **Files likely affected:** formatting config/ignore, scripts, `.github/dependabot.yml` if chosen, stale components/config, README.
- **Acceptance criteria:** Formatting check is deterministic; unrelated generated files are ignored; dead components are removed only after replacement; update PR cadence is manageable.
- **Tests/checks:** Format check; lint/typecheck/build; dependency update dry run/review.
- **Complexity:** S
- **Dependencies:** PROJECT-01, CASE-01, CI-02.
- **Can run in parallel:** No — cleanup should follow feature migrations to avoid deleting active work.
- **Recruiter impact:** Low
- **Technical portfolio value:** Medium
- **SEO impact:** Low

## Phase 13 — Project case-study architecture

### CASE-01 — Create the typed project model and reusable dynamic route

- **Problem:** Project arrays are hardcoded inside components, duplicate data exists in unused files, and there is no scalable case-study route.
- **Proposed improvement:** Define a strict `Project` type, central project data, publication validation, reusable sections, static params, and `/projects/[slug]` metadata/routing.
- **Why it matters:** This is the strongest opportunity for the portfolio itself to demonstrate React/TypeScript/Next.js architecture and maintainability.
- **Files likely affected:** new `src/types/content.ts`, new `src/content/projects.ts`, new `src/app/projects/[slug]/page.tsx`, new project section components, `src/components/Projects.tsx`.
- **Acceptance criteria:** Home cards and detail pages use the same source; draft projects do not generate routes; invalid/missing slug returns not found; demo is optional; adding a project requires data/assets rather than a copied page.
- **Tests/checks:** Typecheck; content validation tests; static params/metadata tests; build route output; not-found smoke test.
- **Complexity:** L
- **Dependencies:** CONTENT-01.
- **Can run in parallel:** No — establish and merge the shared contract before other project work.
- **Recruiter impact:** High
- **Technical portfolio value:** High
- **SEO impact:** High

### CASE-02 — Publish the Crypto Portfolio Tracker case study

- **Problem:** The strongest project’s ledger consistency, security, testing, operations, and CI depth are absent from the portfolio.
- **Proposed improvement:** Build a verified case study covering problem, transaction-driven model, architecture/data flow, auth/security, market data, atomic replay decision, testing strategy, health/rate limiting, delivery, screenshots, limitations, repository, and optional demo.
- **Why it matters:** This single page can demonstrate backend, frontend, data, test, and delivery judgement more effectively than a technology list.
- **Files likely affected:** `src/content/projects.ts`, `public/projects/crypto-portfolio-tracker/*`, shared case-study components.
- **Acceptance criteria:** Every statement matches current repository evidence; repository link is direct; no demo renders without a working URL; at least one decision includes trade-offs; tests/limitations are explicit; metadata/structured data are unique.
- **Tests/checks:** Repository README/code-owner fact review; route/metadata/link test; responsive/keyboard/axe check; screenshot/diagram QA.
- **Complexity:** L
- **Dependencies:** CASE-01, PROJECT-02, SEO-01.
- **Can run in parallel:** Yes — after CASE-01, Crypto and RentRight content/assets can be owned separately if shared components are frozen.
- **Recruiter impact:** High
- **Technical portfolio value:** High
- **SEO impact:** High

### CASE-03 — Publish the RentRight case study

- **Problem:** RentRight is verified but either stale on the live site or absent from the redesign, and its strongest authorisation/workflow evidence is not shown.
- **Proposed improvement:** Build a case study covering role model, property/tenancy/maintenance workflows, Identity/EF Core/SQL Server architecture, authorisation boundaries, current tests, known gaps, screenshots, repository, and future API/React work clearly labelled as future.
- **Why it matters:** It balances the Java project with substantial .NET evidence and shows honest handling of incomplete architecture.
- **Files likely affected:** `src/content/projects.ts`, `public/projects/rentright/*`, shared case-study components.
- **Acceptance criteria:** Current .NET/feature facts match the repository; no Azure/Docker/REST/React claims render unless verified; role access is understandable; limitations/future work are explicit; repository and metadata are direct/unique.
- **Tests/checks:** Repository README/code-owner fact review; route/metadata/link test; responsive/keyboard/axe check; diagram authorisation review.
- **Complexity:** L
- **Dependencies:** CASE-01, PROJECT-02, SEO-01.
- **Can run in parallel:** Yes — can run beside CASE-02 after the shared route/components stabilise.
- **Recruiter impact:** High
- **Technical portfolio value:** High
- **SEO impact:** High

## Phase 14 — Final recruiter review

### REVIEW-01 — Run structured 30-second and deep technical reviews

- **Problem:** The current portfolio has been evaluated mostly from the builder’s perspective, allowing important proof to remain buried and generic wording to persist.
- **Proposed improvement:** Ask at least one recruiter/non-technical reviewer and one engineer to complete scripted cold reviews, then address only repeated or high-impact confusion.
- **Why it matters:** The site succeeds only if unfamiliar visitors understand the positioning and find credible evidence quickly.
- **Files likely affected:** Content/UI files based on findings; review notes under `docs/` if useful.
- **Acceptance criteria:** Reviewers can state role/focus, employer proof, strongest project, stack, and contact/resume path after 30 seconds; engineers can find architecture/testing/decisions without guidance; no reviewer encounters a dead action.
- **Tests/checks:** Record timed prompts and observations; compare responses; regression-check any resulting edits.
- **Complexity:** S
- **Dependencies:** All recruiter-facing content and case-study tasks.
- **Can run in parallel:** Yes — recruiter and engineer reviews can run simultaneously against the same preview.
- **Recruiter impact:** High
- **Technical portfolio value:** Medium
- **SEO impact:** Low

### REVIEW-02 — Complete production-preview launch audit

- **Problem:** Local success does not guarantee correct Vercel metadata, caching, headers, analytics, external links, or responsive behaviour.
- **Proposed improvement:** Run the full release checklist against a production-like Vercel preview, resolve blockers, then promote and perform a short post-deploy verification.
- **Why it matters:** The deployed URL is the product recruiters see; deployment drift and stale assets are current proven risks.
- **Files likely affected:** Any scoped blocker found; deployment/release documentation.
- **Acceptance criteria:** All requested breakpoints pass; lint/typecheck/tests/build/CI pass; dependency policy passes; resume/robots/sitemap/canonical/OG/structured data validate; analytics and headers work; every external link is verified; Lighthouse targets are approached without UX regressions.
- **Tests/checks:** Automated CI/Playwright/axe; Lighthouse; HTTP/header/status audit; social preview; keyboard/screen-reader/zoom/reflow; recruiter smoke; post-production check.
- **Complexity:** M
- **Dependencies:** All prior release-critical tasks.
- **Can run in parallel:** No — final integration and promotion require one accountable lead.
- **Recruiter impact:** High
- **Technical portfolio value:** High
- **SEO impact:** High

## Recommended first implementation batch

1. `CONTENT-01` — canonical content and resume truth.
2. `CASE-01` — typed project/content contract.
3. `UX-02` — repair action hierarchy and links.
4. `RESPONSIVE-01` + `A11Y-01` under one UI owner.
5. `UX-01` + `CONTENT-02` — recruiter ordering and evidence copy.
6. `PROJECT-01`, followed by `CASE-02` and `CASE-03` in parallel.
7. `SEO-01` and `SEO-02` after the route list is stable.
8. Quality/performance/Vercel tracks after the representative UI and assets exist.

## Parallel execution rules

- Preserve the current uncommitted redesign before creating worktrees.
- Merge `CONTENT-01` and `CASE-01` before parallel project/UI/SEO work.
- Assign one owner at a time to `layout.tsx`, `page.tsx`, `globals.css`, `package.json`, `package-lock.json`, `next.config.ts`, and central content files.
- Project, SEO, responsive/accessibility, and test work can run concurrently only when their file ownership is non-overlapping.
- Keep dependency upgrades isolated from feature branches.
- Rebase/merge shared contracts before adding more project content rather than resolving large conflicts at the end.
