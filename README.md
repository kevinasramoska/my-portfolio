# Kevinas Ramoska - Software Engineering Portfolio

Next.js portfolio for a Junior Full Stack Engineer at BWG Foods UC, with previous
General Motors experience, engineering case studies, technical writing, and an
international judo career.

[Live portfolio](https://kevinasramoska-portfolio.vercel.app)

## Stack and quality

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, and Vercel. Most
content renders as static server components; the responsive header is interactive.
Playwright and axe verify browser journeys and automated accessibility. CI checks
the resume, dependencies, lint, types, production build, and browser tests.

Use Node.js 24 LTS:

```bash
nvm use
npm ci
npm run dev
```

```bash
npm run check
npm run audit
npx playwright install chromium
CI=1 npm run test:e2e
```

The CI browser suite tests the production build. Local tests use the development
server unless `CI=1` is set.

## Content ownership

| Source | Controls |
| --- | --- |
| `src/content/career.json` | Identity, contact links, roles/dates/bullets, About, degree, credential, resume skills |
| `src/content/profile.ts` | Derived current role, canonical origin, public profile adapter |
| `src/content/projects.ts` | Project cards, case studies, screenshots, metrics, resume project bullets |
| `src/content/articles.ts` | Four technical articles |
| `src/content/current.ts` | Current working/learning interests |
| `src/content/judo.ts` | Judo career and profile links |
| `resume/template.html` | Print layout only |

Career details are shared by the website and resume generator. Update the canonical
content, not a second work-history list inside a React component or generated HTML.
The Microsoft credential link comes from the supplied resume JSON.

## Regenerating the resume

After editing career/project content or the print template:

```bash
npm run resume:build
npm run resume:check
```

The generator uses Chrome/Chromium; set `CHROME_PATH` if it is outside the standard
locations. It writes the HTML preview, tagged A4 PDF, and a content/PDF hash manifest.
Review the rendered PDF and commit all three generated artifacts.
CI fails when the HTML, PDF hash, or source content no longer matches the manifest.
It does not require Chrome merely to check an existing PDF.

The served asset is `public/kevinas-ramoska-resume.pdf`; links keep that stable URL.

## Domain and demos

The intended custom domain is `kevinasramoska.dev`; registration and DNS setup are
still required. The current Vercel origin remains canonical until the domain works
over HTTPS. Set `NEXT_PUBLIC_SITE_URL` when changing the production origin and use
the same value when rebuilding the resume. Metadata, structured data, sitemap,
robots, and social-image hostname derive from that origin.

Crypto and RentRight currently link to repositories and case studies. Live demo
buttons render only after verified deployment URLs are set in each project's
`links.demo`. Backend hosting and PostgreSQL/SQL Server accounts are still needed.
See [the release guide](docs/DEPLOYMENT.md) for environment settings and smoke checks.

## Maintenance

Dependabot checks npm dependencies and pinned GitHub Actions weekly. CI rejects
high/critical production dependency advisories. TypeScript remains on 6.0 and
ESLint on 9 while Next.js's lint plugins require these versions; Node types match
the Node 24 runtime. The full audit still reports the upstream development-only
`braces` chain. Do not force a downgrade of Next tooling to silence it.

The CSP preserves static generation and permits inline framework scripts/styles.
It restricts external resources but is not a strict nonce-based XSS policy.

[Current backlog](docs/TASKS.md) records delivered work and remaining dependencies.
The original August audit, roadmap, and task list are preserved under
[docs/archive](docs/archive/). [Performance measurements](docs/PERFORMANCE.md)
are historical baselines.

## Release flow

Push reviewed changes to `main`; GitHub runs CI and Vercel creates a production
deployment. Verify the deployed commit, resume, primary links, metadata, headers,
and one complete browser journey. Keep the previous deployment available for
rollback; database migrations need a separate compatibility and recovery plan.

## Author

[Kevinas Ramoska on GitHub](https://github.com/kevinasramoska) ·
[LinkedIn](https://www.linkedin.com/in/kramoska/)
