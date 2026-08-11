import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types/content";
import ProjectArchitecture from "@/components/projects/ProjectArchitecture";

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
      <section className="border-b border-stone-800 bg-stone-950 px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-stone-300 transition hover:text-blue-400"
          >
            <ArrowLeft aria-hidden="true" size={17} />
            Back to featured projects
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            {project.eyebrow} case study
          </p>
          <h1 className="mt-3 max-w-5xl text-4xl font-bold leading-tight text-stone-100 sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-stone-300 sm:text-xl">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.links.repository}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Github aria-hidden="true" size={17} />
              View repository
            </a>
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-stone-500 hover:bg-stone-900"
              >
                <ExternalLink aria-hidden="true" size={17} />
                Open live demo
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <div className="px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-20">
          <section aria-labelledby="context-heading" className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
                Context
              </p>
              <h2 id="context-heading" className="mt-3 text-3xl font-bold text-stone-100">
                Problem and scope
              </h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-stone-100">The problem</h3>
                <p className="mt-3 text-base leading-8 text-stone-300">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-100">My role</h3>
                <p className="mt-3 text-base leading-8 text-stone-300">{project.role}</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="architecture-heading">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
              System view
            </p>
            <h2 id="architecture-heading" className="mt-3 text-3xl font-bold text-stone-100">
              Architecture
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
            <BulletList items={project.capabilities} />
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
        </div>
      </div>
    </>
  );
}
