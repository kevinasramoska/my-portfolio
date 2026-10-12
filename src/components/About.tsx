import { Award, GraduationCap, Repeat2, Shield, Target } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="reveal-section px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-7 sm:p-10 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              About me
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Full-stack delivery with strong backend foundations
            </h2>

            <div className="mt-7 space-y-6 text-base leading-8 text-stone-300 sm:text-lg">
              <p>
                I am a Junior Full Stack Engineer at BWG Foods, where I develop
                and maintain retailer and administration applications using C#,
                ASP.NET Core, Razor, and SQL Server. My work spans product
                features, authentication, automated testing, production fixes,
                and CI/CD.
              </p>

              <p>
                Before joining BWG full-time, I completed a full-stack
                internship there and worked with Java Spring Boot, React,
                PostgreSQL, and Kafka at General Motors. Those roles taught me
                to move comfortably between interfaces, services, data,
                testing, and delivery workflows.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-zinc-950/45 p-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-400/10 text-blue-300">
                <GraduationCap aria-hidden="true" size={21} />
              </div>
              <div>
                <p className="font-semibold text-stone-100">BSc Computer Science &amp; Software Engineering</p>
                <p className="mt-1 text-sm text-stone-500">Maynooth University · 2020–2024</p>
              </div>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.16),transparent_42%),linear-gradient(145deg,rgba(16,31,28,0.92),rgba(9,9,11,0.95))] p-7 sm:p-10">
            <div className="absolute right-0 top-0 h-1 w-full bg-gradient-to-r from-emerald-500 via-white to-amber-400 opacity-80" aria-hidden="true" />
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
              <Award aria-hidden="true" size={27} />
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Beyond the keyboard
            </p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
              International judo competitor
            </h3>
            <p className="mt-3 text-lg font-semibold text-stone-200">
              Represented Ireland
            </p>
            <p className="mt-5 leading-7 text-stone-400">
              Competitive judo shaped how I approach engineering: stay composed,
              learn from every round, and improve through consistent practice.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { label: "Discipline", icon: Shield },
                { label: "Focus under pressure", icon: Target },
                { label: "Continuous iteration", icon: Repeat2 },
              ].map((value) => {
                const Icon = value.icon;

                return (
                  <div key={value.label} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/10 px-4 py-3 text-sm font-semibold text-stone-200">
                    <Icon className="text-emerald-300" aria-hidden="true" size={17} />
                    {value.label}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
