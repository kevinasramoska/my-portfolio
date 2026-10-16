# SEO maintenance

Updated 16 October 2026. This work improves crawlability, page identity, and the
information available to search engines. Rankings and rich-result display are
not guaranteed by metadata or structured data.

## Implemented

- Homepage title and description identify Kevinas Ramoska, full-stack engineering,
  BWG Foods UC, and Ireland, using existing verified profile content.
- `/projects` and `/writing` are crawlable index pages with unique canonicals,
  descriptions, collection structured data, and links to the published content.
- The homepage and footer link to both indexes. Project/article breadcrumbs
  reference real parent pages.
- Home JSON-LD describes the profile, current employer, education, and Microsoft
  certification. No ratings, reviews, or unrelated keywords are fabricated.
- Articles display their author, publication date, and modification date. Those
  values feed Open Graph, BlogPosting/TechArticle JSON-LD, and the sitemap.
- Each article has a generated 1200x630 PNG sharing image.
- Sitemap entries contain maintained modification dates and project image URLs.
  Dates are explicit content values, not the time of each build.
- Optional Search Console HTML-tag verification is available through
  `GOOGLE_SITE_VERIFICATION` in the production environment.
- Browser checks cover all nine public pages, canonical identity, unique metadata,
  structured-data syntax, image responses, sitemap/robots, and genuine 404s.

## Search Console setup (owner account required)

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Add the URL-prefix property `https://kevinasramoska-portfolio.vercel.app/`.
3. Choose HTML-tag verification. Set only the tag's `content` token as the
   `GOOGLE_SITE_VERIFICATION` environment variable in Vercel, redeploy, and verify.
4. Submit `https://kevinasramoska-portfolio.vercel.app/sitemap.xml`.
5. Inspect the homepage and the two index pages. Request indexing if appropriate.
6. Review indexing and search performance after Google has crawled the pages.

No verification token was supplied, so property ownership and sitemap submission
have not been completed. If a custom domain is registered later, verify it as a
separate property, configure redirects and the canonical origin, and submit its
sitemap after DNS/TLS are working.

## Content updates

Use `publishedAt` for the original article publication date and `updatedAt` for a
meaningful content, link, or structured-data edit. Keep the visible dates truthful.
Projects have their own `updatedAt`. Update the homepage/index dates in the
sitemap when those pages materially change. Do not bump all dates on every deploy.

Keep titles and summaries specific to the page. New articles should add original,
useful engineering examples. Connect relevant articles and projects with ordinary
links; avoid publishing near-duplicate pages for keyword variations.

## Files changed

| File | Purpose |
| --- | --- |
| `src/content/career.json` | Clearer identity/role/location search description. |
| `src/app/layout.tsx` | Homepage title, locale, robots preview setting, and optional verification. |
| `src/content/articles.ts` | Explicit publication/modification dates and consistent display formatting. |
| `src/types/content.ts`, `src/content/projects.ts` | Maintained project modification dates. |
| `src/lib/metadata.ts` | Collection metadata and article image paths. |
| `src/lib/structured-data.ts` | Profile, credential, article, collection, and breadcrumb relationships. |
| `src/app/projects/page.tsx` | Project index with distinct metadata and collection data. |
| `src/app/writing/page.tsx` | Article index with distinct metadata and collection data. |
| `src/app/projects/[slug]/page.tsx` | Complete locale/site/date/author social metadata. |
| `src/app/writing/[slug]/page.tsx` | Byline, visible dates, breadcrumbs, article schema, and social metadata. |
| `src/app/writing/[slug]/opengraph-image.tsx` | Dedicated article sharing images. |
| `src/components/Projects.tsx`, `src/components/Writing.tsx` | Homepage links to the new indexes. |
| `src/components/Footer.tsx` | Persistent crawlable index links. |
| `src/components/projects/ProjectCaseStudy.tsx` | Breadcrumb and return links to the project index. |
| `src/app/sitemap.ts` | Index routes, actual modification dates, and project images. |
| `tests/e2e/portfolio.spec.ts` | Accessibility coverage for every published page. |
| `tests/e2e/seo.spec.ts` | Metadata, article-image/schema, crawler-route, and missing-page regressions. |
| `README.md`, `docs/TASKS.md`, `docs/SEO.md` | Current SEO behavior and owner-side indexing steps. |

Google references:
[Article markup](https://developers.google.com/search/docs/appearance/structured-data/article),
[ProfilePage markup](https://developers.google.com/search/docs/appearance/structured-data/profile-page),
[Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
