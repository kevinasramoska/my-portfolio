import {
  ArrowUpRight,
  Braces,
  CheckCircle2,
  FileText,
  FolderKanban,
  CodeXml,
  Sparkles,
} from "lucide-react";
import { profile } from "@/content/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-shell relative isolate min-h-[calc(100svh-4rem)] overflow-hidden px-6 pb-20 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pb-24"
    >
      <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
      <div className="hero-orb hero-orb-one absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" aria-hidden="true" />
      <div className="hero-orb hero-orb-two absolute -right-24 top-36 -z-10 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:gap-12">
        <div className="hero-copy flex flex-col items-start">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3.5 py-2 text-sm font-medium text-blue-200 shadow-[0_0_30px_rgba(96,165,250,0.08)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.role}
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Hi, I’m <span className="hero-name">{profile.name}</span>
            <span className="ml-2 inline-block origin-bottom-right animate-[wave_2.4s_ease-in-out_infinite] text-[0.72em]" aria-hidden="true">
              👋
            </span>
          </h1>

          <p className="mt-7 max-w-3xl text-xl font-semibold leading-relaxed text-zinc-100 sm:text-2xl">
            {profile.headline}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_40px_rgba(59,130,246,0.24)] transition duration-300 hover:-translate-y-1 hover:bg-blue-400 hover:shadow-[0_18px_50px_rgba(59,130,246,0.32)]"
            >
              <FolderKanban aria-hidden="true" size={18} />
              View Projects
              <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" size={17} />
            </a>

            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-200 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <CodeXml aria-hidden="true" size={18} />
              GitHub
            </a>

            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-200 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <FileText aria-hidden="true" size={18} />
              Resume
            </a>
          </div>

          <div className="hero-skills mt-10 flex flex-wrap gap-2.5" aria-label="Core skills">
            {profile.coreSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/[0.08] bg-zinc-900/70 px-3.5 py-2 text-sm text-zinc-300 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:text-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-card relative mx-auto w-full max-w-lg lg:mx-0 lg:justify-self-end">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-blue-500/30 via-violet-500/10 to-cyan-400/20 blur-xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
              <div className="flex gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                <Braces aria-hidden="true" size={14} />
                engineer.ts
              </div>
            </div>

            <div className="space-y-3 p-6 font-mono text-sm leading-7 sm:p-8 sm:text-[15px]">
              <p aria-hidden="true"><span className="text-violet-400">const</span> <span className="text-blue-300">kevinas</span> <span className="text-zinc-500">=</span> <span className="text-amber-200">&#123;</span></p>
              <dl aria-label="Engineering snapshot" className="space-y-3 pl-5">
                {[
                  { label: "role", value: profile.role },
                  { label: "stack", value: profile.coreSkills.slice(0, 3).join(", ") },
                  { label: "building", value: profile.engineeringSnapshot.building },
                  { label: "testsWith", value: profile.engineeringSnapshot.testing },
                ].map((item) => (
                  <div key={item.label} className="min-w-0 break-words">
                    <dt className="inline text-cyan-300">{item.label}<span aria-hidden="true" className="text-zinc-500">: </span></dt>{" "}
                    <dd className="inline text-emerald-300">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <p aria-hidden="true"><span className="text-amber-200">&#125;</span><span className="text-zinc-500">;</span></p>
            </div>

            <div className="grid grid-cols-2 border-t border-white/[0.08] bg-white/[0.025]">
              {profile.engineeringSnapshot.proofPoints.map((point, index) => (
                <div key={point.title} className={`min-w-0 p-5 ${index === 0 ? "border-r border-white/[0.08]" : ""}`}>
                  <div className="flex items-start gap-2 text-sm font-semibold text-zinc-100">
                    {index === 0 ? <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" size={17} /> : <Sparkles className="mt-0.5 shrink-0 text-violet-400" aria-hidden="true" size={17} />}
                    {point.title}
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-zinc-400">{point.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
