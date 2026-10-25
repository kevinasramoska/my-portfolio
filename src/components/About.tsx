import { ArrowDownRight, Award, Repeat2, Shield, Target } from "lucide-react";
import { about } from "@/content/career.json";
import { profile } from "@/content/profile";
import { fullTimeJudoExperience } from "@/content/judo";

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
              <p>I am a {profile.role}. {about[0]}</p>
              {about.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
              {fullTimeJudoExperience.highlights[0]}
            </p>
            <p className="mt-4 leading-7 text-stone-400">
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

            <a
              href="#judo"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
            >
              Explore my judo career
              <ArrowDownRight aria-hidden="true" size={17} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
