import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, CodeXml } from "lucide-react";
import type { Project } from "@/types/content";
import ProjectPreview from "@/components/projects/ProjectPreview";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  reverse?: boolean;
};

export default function ProjectCard({
  project,
  priority = false,
  reverse = false,
}: ProjectCardProps) {
  return (
    <article className="project-showcase-card group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-zinc-950/75 shadow-2xl shadow-black/15 backdrop-blur">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <div className={`p-4 sm:p-6 ${reverse ? "lg:order-2" : ""}`}>
          <ProjectPreview project={project} compact />
        </div>

        <div className={`flex flex-col p-7 sm:p-9 lg:p-10 ${reverse ? "lg:order-1" : ""}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
            {priority ? "Featured case study · 01" : "Featured case study · 02"}
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-8 text-stone-300">
            {project.summary}
          </p>

          <div className="mt-6 space-y-3">
            {project.highlights.map((highlight) => (
              <div key={highlight} className="flex gap-3 text-sm leading-6 text-stone-400">
                <CheckCircle2 className="mt-1 shrink-0 text-emerald-400" aria-hidden="true" size={16} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-stone-400"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <Link
              href={`/projects/${project.slug}`}
              className="group/link inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-400"
            >
              Explore case study
              <ArrowRight className="transition-transform group-hover/link:translate-x-1" aria-hidden="true" size={16} />
            </Link>
            <a
              href={project.links.repository}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <CodeXml aria-hidden="true" size={16} />
              Repository
            </a>
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-stone-200 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <ExternalLink aria-hidden="true" size={16} />
                Live demo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
