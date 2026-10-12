import { ArrowUpRight, Award, ExternalLink, Flag, Timer, Trophy } from "lucide-react";
import { judoProfile } from "@/content/judo";

const accentClasses = {
  emerald: "border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-300",
  amber: "border-amber-300/25 bg-amber-300/[0.06] text-amber-200",
  blue: "border-blue-400/25 bg-blue-400/[0.06] text-blue-300",
  green: "border-green-400/25 bg-green-400/[0.06] text-green-300",
} as const;

const accentTextClasses = {
  emerald: "text-emerald-300",
  amber: "text-amber-200",
  blue: "text-blue-300",
  green: "text-green-300",
} as const;

export default function Judo() {
  return (
    <section id="judo" className="reveal-section px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Judo career
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              On the mat since six. Competing for Ireland.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-300">
              {judoProfile.summary}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <Timer className="text-emerald-300" aria-hidden="true" size={19} />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  Started
                </p>
                <p className="mt-1 font-bold text-stone-100">Age {judoProfile.startedAge}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <Flag className="text-blue-300" aria-hidden="true" size={19} />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  Nation
                </p>
                <p className="mt-1 font-bold text-stone-100">{judoProfile.nation}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <Trophy className="text-amber-300" aria-hidden="true" size={19} />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  Category
                </p>
                <p className="mt-1 font-bold text-stone-100">{judoProfile.weightClass}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <Award className="text-violet-300" aria-hidden="true" size={19} />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  Status
                </p>
                <p className="mt-1 font-bold text-stone-100">
                  {judoProfile.status}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={judoProfile.links.ijf}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-100"
              >
                Official IJF profile
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" size={16} />
              </a>
              <a
                href={judoProfile.links.judoInside}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <ExternalLink aria-hidden="true" size={16} />
                JudoInside results
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.12),transparent_35%),rgba(24,24,27,0.68)] p-5 sm:p-8">
            <div className="absolute -right-8 top-3 select-none text-[8rem] font-black leading-none text-white/[0.025] sm:text-[11rem]" aria-hidden="true">
              柔道
            </div>
            <div className="relative flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Career progression
                </p>
                <p className="mt-1 text-lg font-semibold text-stone-100">
                  Club mat to international circuit
                </p>
              </div>
              <div
                className="flex h-3 w-24 overflow-hidden rounded-full"
                role="img"
                aria-label="Irish tricolour"
              >
                <span className="flex-1 bg-[#169b62]" />
                <span className="flex-1 bg-white" />
                <span className="flex-1 bg-[#ff883e]" />
              </div>
            </div>

            <ol className="relative mt-6 space-y-4">
              <div className="absolute bottom-8 left-[1.15rem] top-8 w-px bg-gradient-to-b from-emerald-400/60 via-amber-300/40 to-blue-400/50" aria-hidden="true" />
              {judoProfile.milestones.map((milestone, index) => (
                <li key={`${milestone.period}-${milestone.title}`} className="relative grid grid-cols-[2.5rem_1fr] gap-4">
                  <div className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border bg-zinc-950 text-xs font-black ${accentClasses[milestone.accent]}`}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <article className="rounded-2xl border border-white/[0.07] bg-black/10 p-5 transition duration-300 hover:border-white/[0.14] hover:bg-white/[0.035]">
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.16em] ${accentTextClasses[milestone.accent]}`}
                    >
                      {milestone.period}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-stone-100">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-stone-400">
                      {milestone.description}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
