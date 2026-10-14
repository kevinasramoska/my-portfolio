import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, CodeXml } from "lucide-react";
import type { Project } from "@/types/content";
import ProjectArchitecture from "@/components/projects/ProjectArchitecture";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectPreview from "@/components/projects/ProjectPreview";

type ProjectCaseStudyProps = {
  project: Project;
};

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3 text-base leading-7 text-stone-300">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.08] px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-20">
        <div className="hero-grid absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb">
            <ol className="flex min-h-11 flex-wrap items-center gap-2 text-sm font-semibold text-stone-400">
              <li>
                <Link href="/" className="transition hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#projects" className="transition hover:text-blue-400">
                  Featured projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-stone-200">
                {project.title}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                {project.eyebrow} case study
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-stone-100 sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
                {project.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.links.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-400"
                >
                  <CodeXml aria-hidden="true" size={17} />
                  View repository
                </a>
                {project.links.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <ExternalLink aria-hidden="true" size={17} />
                    Open live demo
                  </a>
                ) : null}
              </div>
            </div>

            <ProjectPreview project={project} />
          </div>
        </div>
      </section>

      <div className="px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-20">
          <section aria-labelledby="evidence-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Verified evidence
            </p>
            <h2
              id="evidence-heading"
              className="mt-3 text-3xl font-bold text-stone-100"
            >
              Measured from the repository
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.035] p-6"
                >
                  <p className="text-4xl font-black tracking-tight text-white">
                    {metric.value}
                  </p>
                  <h3 className="mt-2 font-semibold text-emerald-200">
                    {metric.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-stone-400">
                    {metric.detail}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="context-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              At a glance
            </p>
            <h2 id="context-heading" className="mt-3 text-3xl font-bold text-stone-100">
              Problem, contribution, outcome
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {[
                { label: "The problem", text: project.problem },
                { label: "My contribution", text: project.role },
                { label: "The outcome", text: project.outcome },
              ].map((item, index) => (
                <article
                  key={item.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-stone-100">{item.label}</h3>
                    <span className="text-sm font-bold text-blue-400">0{index + 1}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-stone-400">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="gallery-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              Product screens
            </p>
            <h2
              id="gallery-heading"
              className="mt-3 text-3xl font-bold text-stone-100"
            >
              The running application
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
              Captured from the real application with local development data.
              Open any image to inspect it at full size.
            </p>
            <div className="mt-8">
              <ProjectGallery screenshots={project.screenshots} />
            </div>
          </section>

          <section aria-labelledby="architecture-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
              System view
            </p>
            <h2 id="architecture-heading" className="mt-3 text-3xl font-bold text-stone-100">
              How the pieces work together
            </h2>
            <div className="mt-8">
              <ProjectArchitecture architecture={project.architecture} />
            </div>
          </section>

          <section aria-labelledby="capabilities-heading" className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
                Delivered
              </p>
              <h2 id="capabilities-heading" className="mt-3 text-3xl font-bold text-stone-100">
                Major capabilities
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.capabilities.map((capability) => (
                <li key={capability} className="flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-sm leading-6 text-stone-300">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" size={17} />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="decisions-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
              Engineering judgement
            </p>
            <h2 id="decisions-heading" className="mt-3 text-3xl font-bold text-stone-100">
              Decisions and trade-offs
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {project.decisions.map((decision) => (
                <article key={decision.title} className="rounded-2xl border border-stone-800 bg-stone-900/50 p-6">
                  <h3 className="text-xl font-semibold text-stone-100">{decision.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-300">{decision.decision}</p>
                  <p className="mt-5 border-t border-stone-800 pt-5 text-sm leading-7 text-stone-400">
                    <span className="font-semibold text-stone-200">Trade-off: </span>
                    {decision.tradeOff}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="quality-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
              Quality and operations
            </p>
            <h2 id="quality-heading" className="mt-3 text-3xl font-bold text-stone-100">
              Testing and delivery
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-stone-800 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-stone-100">Testing strategy</h3>
                <BulletList items={project.testing} />
              </div>
              <div className="rounded-2xl border border-stone-800 p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-stone-100">Delivery and operations</h3>
                <BulletList items={project.delivery} />
              </div>
            </div>
          </section>

          <section aria-labelledby="reflection-heading" className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                Honest constraints
              </p>
              <h2 id="reflection-heading" className="mt-3 text-2xl font-bold text-stone-100">
                Limitations and future work
              </h2>
              <BulletList items={project.limitations} />
            </div>
            <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                Reflection
              </p>
              <h2 className="mt-3 text-2xl font-bold text-stone-100">Lessons learned</h2>
              <BulletList items={project.lessons} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-blue-400/20 bg-blue-400/[0.05] p-7 text-center sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              Keep exploring
            </p>
            <h2 className="mt-3 text-2xl font-bold text-stone-100 sm:text-3xl">
              See the other featured build
            </h2>
            <Link
              href="/#projects"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-stone-100 transition hover:border-white/20 hover:bg-white/[0.09]"
            >
              <ArrowLeft aria-hidden="true" size={17} />
              Back to selected projects
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
