const experiences = [
  {
    year: "2023 – 2024",
    title: "Software Engineering Intern",
    place: "General Motors",
    description:
      "Worked on enterprise backend systems using Java, Spring Boot, and PostgreSQL. Contributed to REST API development, implemented new backend features, and helped improve service performance. Collaborated within an Agile engineering team and gained experience working with production codebases and internal engineering tools.",
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-stone-800 bg-stone-900/40 p-8 sm:p-10 lg:p-12">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
          Experience
        </p>

        <h2 className="text-3xl font-bold text-stone-100 sm:text-4xl">
          Enterprise software experience with a backend focus
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
          My professional experience so far has centered on backend engineering,
          APIs, and working within real software delivery environments.
        </p>

        <div className="mt-10 space-y-8">
          {experiences.map((item) => (
            <div
              key={`${item.place}-${item.year}`}
              className="rounded-2xl border border-stone-800 bg-stone-950/60 p-6 sm:p-8"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xl font-semibold text-stone-100">
                    {item.title}
                  </p>
                  <p className="mt-1 text-base font-medium text-blue-400">
                    {item.place}
                  </p>
                </div>

                <div className="shrink-0 rounded-full border border-stone-700 bg-stone-900 px-4 py-2 text-sm font-medium text-stone-300">
                  {item.year}
                </div>
              </div>

              <p className="mt-6 text-base leading-8 text-stone-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
