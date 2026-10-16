# Portfolio and project demo releases

## Current status

The portfolio runs on Vercel. The desired domain is `kevinasramoska.dev`, but it is
not registered. Neither project demo has backend/database hosting configured.
The public project buttons must remain hidden until a complete deployed workflow
has been verified. The existing Vercel frontend account does not host Java/.NET
servers or supply the two relational databases.

## Custom domain

1. Register the chosen domain in the owner's registrar account.
2. Add the domain to the existing Vercel portfolio project.
3. Add exactly the DNS records Vercel reports for that project/domain. Do not copy
   IP addresses from an old guide or replace unrelated DNS records.
4. Wait for Vercel to verify domain ownership and issue TLS. Verify the domain
   resolves and serves the portfolio over HTTPS.
5. Set `NEXT_PUBLIC_SITE_URL=https://kevinasramoska.dev` for the production build.
   Set the same value locally when running `npm run resume:build`, commit the
   generated resume artifacts, and redeploy. Leave previews using the production
   canonical origin rather than indexing preview hostnames.
6. Check canonical tags, sitemap, robots, JSON-LD, resume links, and social images.
   Configure the old Vercel hostname and any `www` alias to redirect to the chosen
   canonical domain. Test for redirect loops before promoting the release.

Until DNS/TLS are verified, the current Vercel origin remains the canonical URL.
The default origin is stored once in `src/content/career.json`; the social-image
hostname is derived from `profile.siteUrl`.

## Crypto Portfolio Tracker

Use the existing `crypto-portfolio-app/backend/Dockerfile` for the Spring Boot API,
a managed PostgreSQL database, and a separate Next.js frontend project in Vercel.
Run frontend dependency auditing and tests before deployment; the app repository
has its own dependency versions, independent of this portfolio.

Backend secret settings (configure in the hosting dashboard, never in Git):

| Setting | Value |
| --- | --- |
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `DB_URL` | PostgreSQL JDBC URL using provider-required TLS |
| `DB_USERNAME`, `DB_PASSWORD` | Managed database credentials |
| `JWT_SECRET` | Random signing secret of at least 32 bytes |
| `APP_CORS_ALLOWED_ORIGINS` | Exact HTTPS frontend origin |
| `PORT` | Assigned by backend hosting |

Set `NEXT_PUBLIC_API_BASE_URL=https://<api-host>/api` in the frontend production
build. Flyway runs the versioned migrations; use an isolated demo database and
verify backup/restore and migration failure behavior before promotion.

Verify `/api/health`, registration/login, transaction creation, correction and
rollback on invalid corrections, persistence after restart, and exact-origin CORS.
Use self-registration with synthetic data first; publish shared credentials only
after defining data reset, isolation, and abuse controls. Never seed personal or
company data. The in-memory rate limiter assumes a single API instance.

## RentRight

Use the RentRight repository's .NET 10 container and a managed SQL Server database.
Set `ASPNETCORE_ENVIRONMENT=Production` and `ConnectionStrings__DefaultConnection`
using an encrypted connection with certificate validation. Apply a reviewed EF
migration script to the isolated demo database before starting the app.

Configure the host's HTTPS termination and trusted forwarded-header handling.
Persist ASP.NET Identity data-protection keys across restarts/instances. The
development `SeedAdmin` options deliberately do not create a production admin;
arrange role assignment privately before opening authenticated demo access.
Do not run the public deployment in Development to bypass this restriction.

Verify public property listings, Identity login, the MVC create form, JSON property
API, and Admin/Landlord/Tenant resource boundaries. The form must post to
`/Properties/Create`, not `/api/v1/properties`. The tests cover this collision.
Keep demo users and seeded property/tenancy data synthetic.

## Promotion and rollback

Record each deployed Git commit. Run build/tests and a browser journey on the
preview, then promote. Keep the previous deployment available for rollback.
Database schema changes require their own backup and compatibility plan; rolling
back application code does not undo a migration.

Add verified demo URLs to `links.demo` in `src/content/projects.ts` only after the
whole application works. Existing project components then render the live buttons.
