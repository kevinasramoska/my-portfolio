const skillGroups = [
  {
    title: "Core Stack",
    description:
      "The technologies I am most focused on for building backend-heavy and full-stack applications.",
    skills: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "C#",
      "ASP.NET Core",
      "React",
      "Next.js",
      "TypeScript",
    ],
  },
  {
    title: "Backend Development",
    description:
      "Technologies and concepts I use for APIs, authentication, services, and data-driven systems.",
    skills: [
      "REST APIs",
      "JWT Authentication",
      "Authorization",
      "Database Design",
      "Hibernate / JPA",
      "Entity Framework Core",
      "Service Architecture",
      "Backend Feature Development",
    ],
  },
  {
    title: "Frontend Development",
    description:
      "Tools I use to build responsive interfaces and connect frontend experiences to backend systems.",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Responsive UI Design",
      "Component-Based Architecture",
      "Frontend Integration",
    ],
  },
  {
    title: "Tools & Platform",
    description:
      "The tools and platforms I use for development, deployment, collaboration, and workflow.",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Azure",
      "Linux",
      "Vercel",
      "Agile",
      "VS Code",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-stone-800 bg-stone-900/40 p-8 sm:p-10 lg:p-12">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
          Skills
        </p>

        <h2 className="text-3xl font-bold text-stone-100 sm:text-4xl">
          Technologies I use to design, build, and ship software
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
          My strongest focus is backend and full-stack development using Java,
          Spring Boot, .NET, PostgreSQL, React, and modern tooling for building
          practical, production-ready applications.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-stone-800 bg-stone-950/60 p-6 sm:p-7"
            >
              <h3 className="text-xl font-semibold text-stone-100">
                {group.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-stone-400">
                {group.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-stone-700 bg-stone-900 px-4 py-2 text-sm text-stone-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
