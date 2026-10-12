import {
  Blocks,
  Braces,
  FlaskConical,
  ServerCog,
  type LucideIcon,
} from "lucide-react";

type SkillGroup = {
  title: string;
  description: string;
  skills: readonly string[];
  signal: string;
  icon: LucideIcon;
  className: string;
  iconClassName: string;
};

const skillGroups = [
  {
    title: "Core Stack",
    description:
      "The technologies I use most across professional and personal full-stack work.",
    skills: [
      "C#",
      "ASP.NET Core",
      "Razor",
      "SQL Server",
      "React",
      "Next.js",
      "TypeScript",
      "Java",
      "Spring Boot",
    ],
    signal: "Production focus",
    icon: Braces,
    className: "md:col-span-2 lg:col-span-2 bg-blue-400/[0.06] border-blue-400/20",
    iconClassName: "bg-blue-400/10 text-blue-300",
  },
  {
    title: "Backend Development",
    description:
      "Technologies and concepts I use for APIs, authentication, services, and data-driven systems.",
    skills: [
      "REST APIs",
      "EF Core",
      "JPA / Hibernate",
      "PostgreSQL",
      "Kafka",
      "Authorization",
      "SSO",
      "JWT Authentication",
    ],
    signal: "Secure services",
    icon: ServerCog,
    className: "bg-violet-400/[0.05] border-violet-400/20",
    iconClassName: "bg-violet-400/10 text-violet-300",
  },
  {
    title: "Frontend Development",
    description:
      "Tools I use to build responsive interfaces and connect frontend experiences to backend systems.",
    skills: [
      "React",
      "Next.js",
      "Razor",
      ".NET MAUI",
      "Tailwind CSS",
      "Responsive UI",
    ],
    signal: "User-facing delivery",
    icon: Blocks,
    className: "bg-cyan-400/[0.05] border-cyan-400/20",
    iconClassName: "bg-cyan-400/10 text-cyan-300",
  },
  {
    title: "Testing & Delivery",
    description:
      "The tools I use to verify changes and deliver them safely.",
    skills: [
      "Playwright",
      "xUnit",
      "JUnit",
      "Mockito",
      "Testcontainers",
      "Azure DevOps",
      "GitHub Actions",
      "CI/CD",
      "Git",
      "Docker",
    ],
    signal: "Confidence to ship",
    icon: FlaskConical,
    className: "md:col-span-2 lg:col-span-2 bg-emerald-400/[0.05] border-emerald-400/20",
    iconClassName: "bg-emerald-400/10 text-emerald-300",
  },
] as const satisfies readonly SkillGroup[];

export default function Skills() {
  return (
    <section id="skills" className="reveal-section px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Technical toolkit
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
            Technologies I use to design, build, and ship software
          </h2>
          <p className="mt-6 text-lg leading-8 text-stone-300">
            I work across .NET and Java ecosystems, from interfaces and APIs to
            data, authentication, automated tests, and deployment pipelines.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = group.icon;

            return (
              <article
              key={group.title}
                className={`group rounded-[1.75rem] border p-6 transition duration-300 hover:-translate-y-1 sm:p-7 ${group.className}`}
            >
                <div className="flex items-start justify-between gap-4">
                  <div className={`grid h-11 w-11 place-items-center rounded-xl ${group.iconClassName}`}>
                    <Icon aria-hidden="true" size={21} />
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-black/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                    {group.signal}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-stone-100 sm:text-2xl">
                  {group.title}
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-stone-400">
                  {group.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/[0.08] bg-zinc-950/50 px-3.5 py-2 text-sm text-stone-300 transition group-hover:border-white/[0.13]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
