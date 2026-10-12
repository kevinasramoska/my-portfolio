import { ArrowUpRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    period: "Sep 2026 – Present",
    title: "Junior Full Stack Engineer",
    company: "BWG Foods UC",
    location: "Dublin · Hybrid",
    current: true,
    milestone: "Promoted from internship",
    highlights: [
      "Develop and maintain ShopLinkPOS retailer and administration applications with C#, ASP.NET Core MVC, Razor, and SQL Server.",
      "Build Playwright for .NET end-to-end tests and xUnit unit tests, backed by Azure DevOps pull-request validation and CI pipelines.",
      "Improve single sign-on, permission-aware navigation, authentication, and production workflows while partnering with QA to validate fixes.",
    ],
  },
  {
    period: "May 2026 – Sep 2026",
    title: "Full Stack Developer Intern",
    company: "BWG Foods UC",
    location: "Dublin · Hybrid",
    current: false,
    milestone: "Joined BWG engineering",
    highlights: [
      "Delivered ShopLinkPOS features for event registration, document management, and retailer news and content publishing.",
      "Upgraded a cross-platform .NET MAUI application from .NET 8 to .NET 10 for Android and iOS.",
      "Contributed to Just Eat Q-commerce integration, consent-management migration, analytics changes, database updates, and UAT fixes.",
    ],
  },
  {
    period: "Jan 2023 – May 2024",
    title: "Software Engineer Intern / Part-Time",
    company: "General Motors",
    location: "Dublin",
    current: false,
    milestone: "Enterprise foundation",
    highlights: [
      "Engineered Java Spring Boot REST and data-sync functionality using PostgreSQL, JPA/Hibernate, and external API integrations.",
      "Implemented and debugged Kafka producer and consumer workflows, message handling, failure scenarios, and service tests.",
      "Created React and JavaScript screens with Ant Design and Azure AD/MSAL authentication for an internal application.",
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="reveal-section px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Career journey
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              From internship to production full-stack engineering
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-stone-300 lg:justify-self-end">
            I build and test software used in real business workflows, working
            across interfaces, backend services, data, authentication, and
            delivery pipelines.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute bottom-8 left-[1.15rem] top-8 w-px bg-gradient-to-b from-emerald-400 via-blue-400/60 to-white/10 sm:left-[12.7rem]" aria-hidden="true" />

          <div className="space-y-7">
            {experiences.map((item, index) => (
              <article
              key={`${item.company}-${item.title}`}
                className="relative grid gap-4 pl-12 sm:grid-cols-[11rem_2rem_1fr] sm:gap-5 sm:pl-0"
              >
                <div className="hidden pt-7 text-right sm:block">
                  <p className="text-sm font-semibold text-stone-300">{item.period}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-stone-500">
                    {item.milestone}
                  </p>
                </div>

                <div className="absolute left-0 top-7 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-zinc-950 text-blue-300 shadow-[0_0_0_7px_rgba(9,9,11,0.95)] sm:static">
                  {item.current ? (
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                    </span>
                  ) : index === 1 ? (
                    <ArrowUpRight aria-hidden="true" size={17} />
                  ) : (
                    <BriefcaseBusiness aria-hidden="true" size={16} />
                  )}
                </div>

                <div
                  className={`group rounded-[1.5rem] border p-6 transition duration-300 hover:-translate-y-1 sm:p-8 ${
                    item.current
                      ? "border-blue-400/30 bg-[linear-gradient(135deg,rgba(59,130,246,0.1),rgba(24,24,27,0.7))] shadow-[0_20px_70px_rgba(59,130,246,0.08)]"
                      : "border-white/[0.08] bg-white/[0.025] hover:border-white/[0.14]"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-stone-100 sm:text-2xl">
                          {item.title}
                        </h3>
                        {item.current && (
                          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-base font-semibold text-blue-300">
                        {item.company}
                      </p>
                      <p className="mt-1 text-sm text-stone-500">{item.location}</p>
                    </div>
                    <div className="sm:hidden">
                      <p className="text-sm font-semibold text-stone-300">{item.period}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-stone-500">
                        {item.milestone}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm leading-7 text-stone-300 sm:text-base">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <CheckCircle2 className="mt-1.5 shrink-0 text-emerald-400/90" aria-hidden="true" size={16} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
