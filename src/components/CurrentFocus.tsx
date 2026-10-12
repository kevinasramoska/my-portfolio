import {
  ArrowUpRight,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import { currentFocus } from "@/content/current";
import { profile } from "@/content/profile";

const focusGroups = [
  {
    label: "Working with",
    items: currentFocus.workingWith,
    icon: BriefcaseBusiness,
    accent: "text-blue-300",
  },
  {
    label: "Learning",
    items: currentFocus.learning,
    icon: BookOpenCheck,
    accent: "text-violet-300",
  },
  {
    label: "Interested in",
    items: currentFocus.interestedIn,
    icon: Lightbulb,
    accent: "text-amber-200",
  },
] as const;

export default function CurrentFocus() {
  return (
    <section id="current" className="reveal-section px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Currently
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl">
              Building reliable business software and sharpening the systems around it
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {focusGroups.map((group) => {
                const Icon = group.icon;

                return (
                  <article
                    key={group.label}
                    className="rounded-2xl border border-white/[0.08] bg-zinc-950/45 p-5"
                  >
                    <Icon className={group.accent} aria-hidden="true" size={20} />
                    <h3 className="mt-4 font-semibold text-stone-100">
                      {group.label}
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-400">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-600" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-blue-400/20 bg-blue-400/[0.05] p-7">
              <Award className="text-blue-300" aria-hidden="true" size={25} />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
                Microsoft certification
              </p>
              <h3 className="mt-2 text-xl font-bold text-stone-100">
                Azure Fundamentals (AZ-900)
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                Issued February 2023 · Credential ID 26A7611366EB82F2
              </p>
              <a
                href={profile.links.certification}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200"
              >
                View credential
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>

            <div className="rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-7">
              <GraduationCap className="text-emerald-300" aria-hidden="true" size={25} />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Education
              </p>
              <h3 className="mt-2 text-lg font-bold text-stone-100">
                BSc Computer Science &amp; Software Engineering
              </h3>
              <p className="mt-2 text-sm text-stone-400">
                Maynooth University · 2020–2024
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
