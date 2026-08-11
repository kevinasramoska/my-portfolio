# Software Engineering Portfolio Audit

Audit date: 11 August 2026  
Audience: recruiters, hiring managers, and software engineers  
Primary goal: earn interviews by making credible engineering evidence easy to find and act on

## Executive summary

The portfolio has a credible foundation: the positioning is clear, the visual direction is restrained, the application is statically rendered, TypeScript strict mode is enabled, and the two strongest public repositories contain substantially better engineering evidence than the website currently exposes.

The main problem is not aesthetics. It is trust and evidence flow. The deployed site, the working tree, two resume files, the README, and the public project repositories do not currently describe the same portfolio. The deployed site is the older committed version; the working tree contains a significant uncommitted redesign. The redesign improves the hero and project-card hierarchy, but it is not safe to deploy unchanged because it introduces broken/placeholder actions, removes a verified project in favour of an unverified one, preserves the broken mobile navigation, and creates horizontal overflow in the contact section.

The highest-value direction is:

1. establish one truthful content baseline across the site, resume, and public repositories;
2. move professional credibility ahead of the long About section;
3. make Crypto Portfolio Tracker and RentRight the featured evidence, with real repository links, screenshots, architecture, testing, and decisions;
4. fix mobile navigation, horizontal overflow, broken links, contrast, focus, and reduced-motion behaviour;
5. add the missing SEO, structured-data, quality-gate, and Vercel foundations;
6. reduce client-side animation and unused asset/font cost.

## Audit scope and verified baseline

This audit reviewed:

- every tracked source/configuration file in the repository;
- the current uncommitted working-tree changes without modifying them;
- the deployed site at `https://kevinasramoska-portfolio.vercel.app`;
- responsive behaviour at 320, 375, 768, 1024, 1440, and 1920 CSS pixels;
- both public resume PDFs, including visual rendering;
- the public README content for `crypto-portfolio-app` and `RentRight`;
- production build output, referenced JavaScript, fonts, and metadata;
- live HTTP status, caching, security-header, resume, robots, sitemap, manifest, and social-image responses;
- lint, TypeScript, build, and dependency-audit results.

### Important baseline mismatch

| Surface | Verified state |
| --- | --- |
| Framework | Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4; this is not a Vite application |
| Git/deployment | `main` and `origin/main` point at the older deployed design; the working tree contains substantial uncommitted redesign work |
| README | Incorrectly says Vite and documents a directory structure and setup flow that do not match the repository |
| Live site | Older hero, timeline, project cards, skills, and FormSubmit contact form |
| Working tree | New backend-focused hero, one General Motors role, two expanded project cards, grouped skills, and link-based contact section |
| Project evidence | Crypto Portfolio Tracker and RentRight have detailed public repository evidence; no public repository matching “Personal Finance Manager” was found |
| Resume | Two different PDFs with different copy, layouts, file sizes, dates, and technical details are publicly served |

Do not deploy the working tree until the content and link issues below are resolved.

### Automated and production checks

| Check | Result |
| --- | --- |
| `npm run lint` | Pass |
| `npx tsc --noEmit` | Pass |
| `npm run build` | Pass after the earlier transient `.next/lock` cleared |
| Build warnings | Next infers the workspace root from `/Users/kevinasramoska/package-lock.json`; `metadataBase` is missing; browser-baseline data is stale |
| `npm audit` | Fails: 10 advisories (9 high, 1 moderate) across production and development dependencies |
| `npm audit --omit=dev` | Fails: 4 high-severity production dependency findings, including the installed Next.js dependency chain |
| Tests | No test runner, test files, or test script |
| CI | No GitHub Actions workflow in this repository |

The audit results are a point-in-time signal. Dependency remediation should update to patched compatible versions and rerun lint, typecheck, tests, build, and audit rather than applying an unreviewed automatic fix.

## Recruiter and hiring-manager audit

### What is understood in the first 30–60 seconds

The working-tree hero quickly communicates the name, “Software Engineer,” a backend/full-stack focus, Java, Spring Boot, .NET, PostgreSQL, React, and General Motors experience. This is a strong positioning improvement over a generic developer introduction. “View Projects” is correctly the visually dominant action.

The flow immediately weakens after the hero:

- a long About block appears before professional experience;
- General Motors evidence is condensed into a generic paragraph and appears too late;
- project cards contain no screenshots, architecture, decisions, or case-study links;
- the working-tree project buttons lead to the GitHub profile and `#`, not to the projects;
- the skills area repeats technologies already shown instead of adding proof;
- there is no compact credibility strip for General Motors, degree, certification, testing, CI/CD, or backend specialisation;
- mobile users can lose the Contact navigation item entirely.

The result currently reads as “promising engineer with a polished section template,” not yet “engineer whose work is proven and easy to inspect.”

### Recommended section hierarchy

1. **Header:** name/wordmark, Experience, Projects, Skills, About, Resume, Contact.
2. **Hero:** specific backend/full-stack positioning, General Motors proof, primary View Projects CTA, secondary Resume CTA, tertiary GitHub/contact access.
3. **Credibility strip:** General Motors, BSc Computer Science & Software Engineering, Azure Fundamentals, and a concise core-stack statement. Include only verified items.
4. **Professional experience:** two General Motors roles if the distinction is accurate, with concise system/technology/testing/operations evidence.
5. **Featured projects:** Crypto Portfolio Tracker first, RentRight second, each with image, outcome/problem, engineering highlights, stack, repository, and case-study action.
6. **Technical expertise:** smaller, evidence-linked groups rather than a badge wall.
7. **About:** short personal context and international judo experience after technical proof.
8. **Contact:** direct email plus LinkedIn/GitHub/resume, with an explicit availability statement.
9. **Footer:** one canonical set of external/profile/resume links.

This order supports the desired funnel: understand the engineer, see professional credibility, inspect engineering work, validate depth, then contact.

## Hero audit

### Strengths

- “Backend-focused engineer” is specific and differentiated.
- The core technologies appear in both prose and a scannable row.
- General Motors is visible above the fold.
- View Projects is the primary visual CTA.
- The tone avoids “passionate developer” and similar filler.

### Issues and recommendations

- The fixed header also uses an `h1`, producing two top-level headings. Use a link or non-heading wordmark in the header and retain one page `h1` in the hero.
- The hero subheading is marked as `h2` even though it functions as supporting copy. A paragraph is a cleaner document outline; section headings can remain `h2`.
- All hero content starts at opacity zero. A production capture taken immediately after load showed a blank hero until the Framer Motion entrance completed. Render essential content visible by default and use transform-only progressive enhancement, or remove the entrance animation.
- “Production-ready,” “scalable,” “secure,” and “clean architecture” are repeated claims. Keep them only where the project/experience evidence immediately supports them.
- The primary CTA should remain **View Projects**. **View Resume** should be secondary. GitHub and Contact can be tertiary text/icon actions or header actions.
- “Download Resume” currently opens a new tab instead of downloading. Name the behaviour accurately.

## Professional experience audit

The working tree shows one combined General Motors internship paragraph. The resumes contain much stronger and more specific evidence, including separate intern/part-time periods, Spring Boot services, REST APIs, Kafka workflows, ELK observability, JUnit/Mockito, CI/CD, Docker, Azure AD/MSAL, code reviews, and production support. The site should use a verified subset of that evidence.

Recommended role-card hierarchy:

1. role, company, location, and dates;
2. one-line scope statement;
3. three to five concise evidence bullets grouped around systems, delivery, and quality;
4. compact technology row;
5. optional “More detail” disclosure only if the concise card cannot carry the evidence.

Do not publish the resume’s “90% coverage,” performance improvements, production responsibilities, or role/date distinctions until they are confirmed and non-confidential. The current site’s generic sentence “helped improve service performance” is weak because it supplies neither the problem nor the result.

The older live timeline mixes education, athletics, professional work, and personal projects under “Experience.” Separating Professional Experience from Education/About is more credible and easier to scan.

## Project-by-project audit

### Crypto Portfolio Tracker — strongest featured project

Verified public repository evidence supports a much stronger case study than the site presents:

- Java/Spring Boot REST backend, PostgreSQL/JPA/Hibernate/Flyway;
- Spring Security, JWT, and BCrypt;
- transaction-ledger behaviour, stored holdings, realised/unrealised P/L, snapshots, CSV export, and market-data integration;
- rate limiting, health/readiness/liveness endpoints, CORS and production-secret validation;
- JUnit, MockMvc, H2, PostgreSQL Testcontainers, Vitest, Testing Library, and Playwright configuration;
- Docker Compose, GitHub Actions, and a Next.js/React/TypeScript frontend.

Current issues:

- the working-tree GitHub button points to the profile, not the repository;
- Live Demo points to `#` and should not be rendered unless a working demo exists;
- no screenshots or case-study link exist;
- the card repeats implementation bullets but does not explain the central ledger/data-consistency problem or important decisions;
- “real time” is imprecise; “external market-price integration” is safer unless the update model is explained;
- the website omits the project’s strongest proof: testing, migrations, operational health, rate limiting, data-correction rules, and CI.

Recommendation: make this the lead case study at `/projects/crypto-portfolio-tracker` with a transaction/data-flow diagram, two or three product screenshots, a testing/quality section, and one carefully explained decision such as replaying the active ledger atomically after edits/deletes.

### RentRight — verified second featured project

The public repository supports ASP.NET Core MVC, Identity, Entity Framework Core, SQL Server, Razor Views, role-aware Admin/Landlord/Tenant flows, property/tenancy workflows, and scoped maintenance requests.

Current issues:

- the live card uses stale claims such as ASP.NET Core MVC 9, Azure App Service, and fully containerised local development that are not reflected in the current README baseline;
- the working tree removes RentRight entirely in favour of Personal Finance Manager;
- there is no case study, architecture diagram, permissions model, screenshot, or direct repository action.

Recommendation: keep RentRight as the second featured project, accurately label it as an MVC/Razor application, and make authorisation boundaries the case-study centrepiece. The repository explicitly lists future React/API work as a gap; do not imply it already has a React client or REST API.

### Personal Finance Manager — not ready for publication

The working tree presents a Personal Finance Manager with ASP.NET Core, Entity Framework, SQL Server, Azure deployment, authentication, and responsive budgeting UI, but links only to the general GitHub profile. No matching public repository was found during the audit.

This may be private or local work, so the finding is not that the project is false. The finding is that the public portfolio provides no evidence for it. Remove it from the deployable content or supply a verifiable repository/demo/case study and confirm every claim. Until then, RentRight is the stronger and safer project.

### Unused project components

`FeaturedProject.tsx` and `GitHubActivity.tsx` are not rendered. They contain placeholder screenshots, stale styling, and overlapping project data. Remove them after the new shared project model is established rather than maintaining multiple sources of truth.

## Technical skills audit

The working-tree grouping is better than the live badge grid, but it still contains 30+ pills and repeats React/Next.js across groups. “Agile,” “VS Code,” “Backend Feature Development,” and “Frontend Integration” add little differentiation.

Recommended groups:

- **Primary:** Java, Spring Boot, C#, ASP.NET Core, SQL/PostgreSQL/SQL Server, REST APIs.
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS.
- **Testing and quality:** JUnit, Mockito, MockMvc, Testcontainers, xUnit, Vitest/Testing Library/Playwright only where verified.
- **Delivery and operations:** GitHub Actions, Docker, CI/CD, Azure, ELK/Kafka where professional disclosure is appropriate.
- **Architecture/integration:** authentication/authorisation, relational data modelling, event-driven workflows, third-party API integration.

Link major skills to the role/project where they are demonstrated. Remove generic tooling and do not visually weight every item equally.

## Visual-design audit

### Strengths

- dark neutral palette is restrained and professional;
- working-tree blue accent is clearer than the live brown accent;
- typography scale and content widths are generally comfortable from tablet upward;
- featured-project border treatment creates useful hierarchy;
- animations are short rather than theatrical.

### Weaknesses

- every major section uses the same large rounded bordered container, creating a template-like stack of cards;
- project cards lack real product imagery, diagrams, outcomes, and visual identity;
- the page uses large vertical gaps and long paragraphs, particularly on mobile;
- the fixed navigation is unchanged from the older design and does not belong to the responsive polish level of the new sections;
- chip/pill styling is repeated for hero skills, project technologies, dates, and skill groups;
- the square OG art looks like a generic hero screenshot and uses older “Full-Stack Developer” positioning rather than the stronger backend focus.

Use section rhythm, typography, dividers, and selective surfaces instead of placing every section inside the same card. Preserve the restrained palette and avoid adding gradients, terminal gimmicks, carousels, or decorative animation.

## Responsive-design audit

### Verified deployed-site behaviour

- At 320px, Skills and Contact are clipped outside the navigation viewport.
- At 375px, Contact is clipped.
- Navigation links have approximately 21px-high interactive boxes.
- At 768px and above, no major horizontal overflow was detected.

### Verified working-tree production build

- The same 320/375 navigation clipping remains.
- At 320 and 375 widths, contact cards force the document to approximately 404px wide, creating a horizontal scrollbar.
- Long email/GitHub/LinkedIn strings do not wrap safely.
- At 320px, the first viewport is text-heavy and the horizontal scrollbar is visible.
- At 768px and above, the main layout no longer overflows, but several desktop actions remain only 38px high and header/footer links remain about 21–28px high.
- Project cards become extremely tall on narrow screens because every highlight and technology is shown inline.

Required fixes:

- implement a keyboard-accessible mobile menu or a deliberately reduced mobile header;
- use `min-width: 0`, safe wrapping, and responsive card padding in contact rows;
- guarantee at least 44px touch-friendly navigation/action sizing as a product standard;
- test full flows at each requested width, not only screenshots;
- reduce mobile copy density and vertical padding without hiding substantive evidence.

## Accessibility audit

Target WCAG 2.1 AA and adopt useful WCAG 2.2 target/focus guidance.

### Definite issues

- two `h1` elements exist: the navigation name and hero heading;
- the live form labels are not associated with controls because labels have `htmlFor` values but the inputs/text area lack matching IDs;
- the live accent `#5C3D2E` on `#121212` has approximately 1.93:1 contrast;
- working-tree white text on Tailwind blue-500 is approximately 3.68:1, below 4.5:1 for normal-size button text;
- there is no skip link;
- mobile navigation content is clipped;
- no reduced-motion handling exists, while smooth scrolling and multiple entrance animations are enabled;
- no explicit consistent `focus-visible` system exists;
- several visible “download” actions do not match their actual open-in-new-tab behaviour.

### Risks to verify with automation and assistive technology

- essential content initially hidden by animation may be confusing under slow hydration or unusual user settings;
- icon-only SVG behaviour should be checked to ensure decorative icons remain hidden and meaningful icons are named through their links;
- sticky-header anchor destinations and focus position should be tested;
- the project bullet marker is an empty visual `span`; the semantic `ul` is correct, but screen-reader output should be verified;
- content should remain usable at 200% zoom and 400% reflow.

Add automated axe checks to a small Playwright suite, but retain keyboard and VoiceOver/NVDA spot checks.

## Performance audit

The page is statically prerendered and contains no large project screenshots yet, which is a strong starting point. The current architecture still sends more JavaScript and font data than this content needs.

Verified local production output:

- the home page references seven JavaScript chunks totalling about 694 KB raw and about 212 KB gzip;
- the generated HTML is about 37 KB raw / 6.8 KB gzip;
- all content-heavy sections except Header and Footer are client components, primarily to support Framer Motion;
- `About.tsx` is a client component despite using no client feature;
- the page loads Geist and Geist Mono through `next/font`, while global CSS overrides the body with a system font stack; the mono font is not visibly used;
- public `og.png` is about 1.6 MB and 1024×1024;
- public `favicon.png` is about 1.3 MB and 1024×1024.

Recommendations:

- keep content components as React Server Components and isolate only genuinely interactive/animated wrappers;
- remove entrance animation from essential hero content and reduce/reuse motion elsewhere;
- use one intentional font strategy and remove unused font families/weights;
- export an approximately 1200×630 compressed OG image and appropriately sized favicon set;
- add responsive AVIF/WebP project images with dimensions, `next/image`, and below-fold lazy loading;
- capture Lighthouse/Web Vitals only after real images and final routing are present;
- set performance budgets in CI (for example, no unexpected home-page client bundle growth and compressed project images under an agreed threshold).

## Technical SEO audit

### Existing strengths

- useful page title and meta description exist;
- Open Graph and Twitter card tags render on the deployed site;
- the home page is statically rendered and indexable;
- `<html lang="en">` is present;
- the production page uses descriptive visible text for most links.

### Missing or incorrect

- no canonical URL;
- no `metadataBase` in source; local production generation resolves OG/Twitter images to `http://localhost:3000/og.png` and emits a build warning;
- `/robots.txt` returns 404;
- `/sitemap.xml` returns 404;
- no JSON-LD structured data;
- no project-detail routes or project-specific metadata;
- no manifest (optional, low priority for a portfolio);
- duplicate `h1` hierarchy;
- live project/resume destinations include broken, generic, or inconsistent URLs;
- README and site disagree on framework and project details;
- metadata calls the candidate “Full-Stack Software Engineer,” while the strongest positioning and newer resume emphasise backend engineering.

Use Next.js metadata routes (`robots.ts`, `sitemap.ts`) and route-level `generateMetadata`. Add conservative `Person` + `WebSite` JSON-LD on the home page, and `SoftwareSourceCode` or `CreativeWork` only on project pages with supported properties. Do not list every technology as structured data without meaningful page content.

## Social-sharing audit

The live site serves valid absolute Open Graph/Twitter image URLs, but the source relies on environment fallback because `metadataBase` is absent. The 1024×1024, 1.6 MB image is the wrong aspect ratio for a standard large link preview, contains a button-like “Get in Touch” element that is not interactive, uses older positioning, and looks like a generic site mockup.

Recommended OG composition:

- 1200×630;
- “Kevinas Ramoska”;
- “Backend-Focused Software Engineer” or the final chosen role label;
- “Java • Spring Boot • .NET • React”;
- one restrained proof line such as “General Motors experience” if approved;
- high-contrast typography and no fake UI controls.

## Analytics and conversion audit

No analytics integration or event taxonomy exists. Privacy-conscious Vercel Web Analytics and Speed Insights are reasonable because the site is already deployed on Vercel. Do not add session replay, fingerprinting, or invasive marketing scripts.

Useful events:

- `resume_view` or `resume_download` (choose the real behaviour);
- `github_profile_click`;
- `linkedin_click`;
- `email_click`;
- `project_case_study_click` with project slug;
- `project_github_click` with project slug;
- `project_demo_click` only when a real demo exists.

Primary funnel measures: project-case-study click-through, resume action rate, outbound project repository rate, and contact action rate. Treat low traffic carefully; use analytics to find broken journeys, not to over-optimise tiny samples.

## Vercel and deployment audit

- The project is a Next.js application, so no SPA catch-all redirect is needed.
- No `vercel.json` exists. Do not add one unless a requirement cannot be expressed through Next.js configuration or Vercel project settings.
- Static page caching is working on the deployed site (`x-nextjs-prerender: 1`, Vercel cache hit, HSTS).
- The deployed site is behind the working tree, so preview-deployment review should become a required step.
- Workspace-root inference is incorrect because another lockfile exists above the repository. Configure the appropriate Next.js root/output tracing setting if the external lockfile cannot be removed.
- No Analytics or Speed Insights integration exists.
- No documented environment-variable contract exists because the current site needs none; keep it that way unless a future feature genuinely requires configuration.
- Resume cache/update behaviour is ambiguous because two public filenames exist. A single stable public URL is preferable; if stale browser/CDN caching becomes an issue, use content versioning intentionally rather than accumulating files.

## Security and code-quality audit

### Strengths

- TypeScript `strict` is enabled;
- external links generally use `rel="noreferrer"`, which also protects against opener access in current browsers;
- no secrets or active environment files were found;
- the working-tree contact section removes the live third-party form submission;
- lint and typecheck pass.

### Issues

- four high-severity production dependency findings are reported by `npm audit --omit=dev`; remediate with reviewed compatible upgrades;
- `next` is 16.0.7 while `eslint-config-next` is 15.5.6; align framework tooling versions;
- `npm ls --depth=0` reports several extraneous local packages, suggesting the install state should be recreated with `npm ci` in CI;
- no security headers beyond Vercel HSTS were observed on the live home page (for example, no explicit content-type, referrer, permissions, framing, or CSP policy);
- no CI quality gate, Dependabot/Renovate policy, or audit step exists;
- no Prettier/format check exists;
- unused components retain placeholder content and duplicate data;
- `allowJs` is enabled although the repository is TypeScript-only;
- a Tailwind config remains while Tailwind 4 theme usage is primarily CSS-based; confirm it is necessary and valid rather than maintaining dead configuration.

Use a practical header set in `next.config.ts`. Introduce CSP only after testing Next.js production behaviour and every external resource; a broken or overly broad CSP is worse than a documented staged plan.

## Testing and CI/CD audit

Useful portfolio tests are few and high-value:

- home page renders one `h1` and the expected section landmarks;
- all primary navigation anchors and mobile-menu behaviour work;
- canonical resume URL returns a PDF and the CTA wording matches behaviour;
- featured projects render direct repository and case-study links;
- placeholder `#` demo links are impossible through the data model;
- contact links are correct;
- 320/375 layouts have no horizontal overflow;
- one Playwright + axe smoke test covers the home page and each project case study;
- a not-found route behaves correctly.

Recommended CI sequence:

```text
npm ci
→ npm run lint
→ npm run typecheck
→ npm test
→ npm run build
→ optional Playwright smoke/axe job
```

Do not write snapshot tests for static markup or one test per presentational component.

## Project case-study architecture

Use one typed content source and a reusable route, not hand-authored pages with copied layout.

Suggested model:

```ts
type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  status: "featured" | "secondary" | "draft";
  technologies: string[];
  highlights: string[];
  architecture?: {
    summary: string;
    diagram?: string;
    components: string[];
  };
  decisions: Array<{ title: string; context: string; decision: string; tradeoff: string }>;
  testing?: string[];
  delivery?: string[];
  screenshots: Array<{ src: string; alt: string; caption?: string }>;
  links: { repository: string; demo?: string };
  lessons?: string[];
  future?: string[];
};
```

Validation rules should prevent publishing a featured project without a direct repository, substantive summary, at least one engineering decision, and real image/alt text. Demo actions must be conditional. Use static params and route metadata for `/projects/[slug]`.

## Resume audit

Three different URLs are referenced in source:

- `/kevinas-ramoska_Resume.pdf` — exists;
- `/Kevinas-Ramoska-Resume.pdf` — exists and is a different document;
- `/Kevinas_Ramoska_Resume.pdf` — does not exist and returns 404 in the working-tree production build.

The two existing PDFs are visually legible but materially different. One is tagged for accessibility and one is not. They disagree on role positioning, project database technology, experience detail, contact email presentation, and overall content. The older live hero also links through `public/...`, which returns 404 in production.

Choose one current resume, confirm its content against the portfolio/project repositories, give it one stable lowercase filename such as `/kevinas-ramoska-resume.pdf`, update every CTA, and remove the obsolete asset after rollout. Use “View Resume” for an inline/new-tab action or configure a real download and keep “Download Resume.” Add an automated status/content-type check.

## Content-quality audit

Repeated weak phrases include “production-ready,” “clean architecture,” “practical software,” “modern tooling,” “scalable,” and “backend-first.” These are useful positioning terms once, but repetition makes them feel unearned.

Prefer evidence:

- “Replayed active transactions atomically after edits to preserve valid holdings” over “clean backend architecture.”
- “Used Testcontainers for PostgreSQL integration coverage” over “production-ready engineering.”
- “Scoped maintenance requests to the tenant’s active tenancy and landlord-owned properties” over “secure authorisation.”

Copy must be reconciled against the current repositories and chosen resume. Avoid publishing project technology versions unless there is a reason; versions become stale quickly.

## Conversion funnel diagnosis

| Funnel stage | Current disruption | Recommended measure |
| --- | --- | --- |
| Discover | Missing sitemap/canonical/structured data; weak OG asset | Search impressions, social preview validation |
| Understand | Good hero, but backend vs full-stack labels vary | Hero-to-project scroll/click rate |
| Trust | General Motors detail is buried/generic | Experience visibility and resume clicks |
| Inspect | No case studies/screenshots; broken/generic actions | Case-study and repository click-through |
| Validate | Skills are not linked to proof | Project depth/scroll completion as a soft signal |
| Act | Resume inconsistency, clipped mobile Contact nav | Resume, LinkedIn, email action rate |

## Final prioritised output

### 10 highest-priority improvements

1. Reconcile the deployable content with one resume and the two verified project repositories.
2. Fix all broken/placeholder/generic actions, especially resume, project GitHub, demo, LinkedIn, and email destinations.
3. Restore RentRight or prove the Personal Finance Manager before deployment.
4. Reorder the page so professional experience and credibility appear before the long About section.
5. Build reusable case studies for Crypto Portfolio Tracker and RentRight with screenshots, architecture, decisions, testing, and direct links.
6. Replace the fixed desktop nav on small screens and eliminate 320/375 horizontal overflow.
7. Fix definite accessibility issues: one `h1`, contrast, labels/live-form removal, focus, skip link, reduced motion, and target sizes.
8. Complete technical SEO: `metadataBase`, canonical, robots, sitemap, project metadata, and truthful structured data.
9. Remediate vulnerable/misaligned dependencies and add lint/typecheck/test/build CI.
10. Reduce unnecessary client JavaScript, animation-hidden content, duplicate fonts, and oversized OG/favicon assets.

### 5 biggest weaknesses

1. The deployed site, working tree, README, resumes, and project repositories disagree.
2. Projects do not yet expose the engineering depth present in their repositories.
3. Mobile navigation and contact layouts fail at the most important small widths.
4. Multiple high-intent links are broken, placeholders, generic, or behaviourally mislabeled.
5. SEO, accessibility, testing, CI, and dependency hygiene are incomplete.

### 5 strongest existing elements

1. Clear backend-focused hero positioning with a concrete core stack.
2. Credible General Motors experience and a strong discipline narrative from international judo.
3. Two substantial public projects with real backend, data, security, and testing depth.
4. Restrained visual direction and good desktop content widths in the redesign.
5. Static rendering, strict TypeScript, passing lint/typecheck/build, and a maintainable component baseline.

### First implementation tasks

1. Freeze and verify the content inventory; choose the canonical resume and profile URLs.
2. Repair links and remove conditional actions that have no real target.
3. Fix mobile header/contact overflow and accessibility blockers.
4. Reorder Hero → Credibility → Experience → Featured Projects.
5. Introduce the typed project model and build the Crypto case study first.
6. Add metadataBase/canonical/robots/sitemap and the new OG asset.
7. Add CI scripts/tests and then address dependency upgrades.

### Tasks safe to run simultaneously in separate worktrees

After the content inventory and typed project contract are merged:

- **Project case studies:** project data, `/projects/[slug]`, project-only components/assets.
- **SEO/social:** metadata, robots, sitemap, JSON-LD, OG/favicons; avoid project route files until the route contract is stable.
- **Responsive/accessibility:** Header, skip link, focus/motion styles, contact wrapping; coordinate any shared layout edits.
- **Quality:** test configuration, tests, package scripts, and GitHub Actions; do not independently upgrade runtime dependencies at the same time.
- **Vercel/analytics:** Analytics, Speed Insights, measured event wrapper, and documented deployment settings after event names are agreed.

Do not run multiple chats against `page.tsx`, `layout.tsx`, `package.json`, or the central project data file without explicit ownership; those are the main merge-conflict surfaces.

### Changes most likely to improve recruiter engagement

- professional evidence directly after the hero;
- case studies with screenshots and decisions;
- direct, working project/resume/contact actions;
- shorter, evidence-led copy;
- a credibility strip with verified employer/degree/certification proof.

### Changes most likely to improve SEO/discoverability

- canonical URL, sitemap, robots, metadataBase, project routes, project-specific metadata, and conservative JSON-LD;
- faster image/font/client-JS delivery;
- descriptive internal linking from the home page to project pages;
- an accurate README and consistent entity/project names across public surfaces.

### Changes most valuable as frontend-engineering evidence

- typed content-driven dynamic routes;
- accessible responsive navigation with robust focus/motion behaviour;
- `next/image` responsive media and Core Web Vitals budgets;
- meaningful Playwright/axe coverage and CI gates;
- analytics events with a small typed API;
- server-first component boundaries and measured bundle reduction.

### Elements currently making the site look generic or junior

- identical rounded containers around every section;
- a wall of technology pills;
- placeholder Live Demo buttons;
- project buttons leading to a profile rather than the project;
- no screenshots or diagrams;
- repeated unproven adjectives;
- unused placeholder project components;
- a square hero-style OG image with a fake button;
- a desktop-only navigation row squeezed onto mobile.

### Remove rather than improve

- placeholder `#` demo actions;
- stale/unused `FeaturedProject` and `GitHubActivity` components after migration;
- the unverified Personal Finance Manager card unless evidence is supplied;
- duplicated resume assets after selecting the canonical version;
- low-value skills such as VS Code and generic process labels;
- the third-party live contact form if the direct-contact redesign is retained;
- unused font loading and redundant Tailwind configuration;
- repeated “production-ready/clean/scalable” filler where evidence can replace it.
