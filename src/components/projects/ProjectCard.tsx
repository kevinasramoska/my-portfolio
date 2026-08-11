import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types/content";
import ProjectArchitecture from "@/components/projects/ProjectArchitecture";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-blue-500/25 bg-stone-950/80">
      <div className="border-b border-stone-800 bg-stone-900/50 p-5 sm:p-6">
        <ProjectArchitecture architecture={project.architecture} compact />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-400">
              {priority ? "Lead case study" : project.eyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-stone-100 sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-stone-300">
              {project.summary}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore case study
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <a
              href={project.links.repository}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-700 px-4 py-2 text-sm font-medium text-stone-200 transition hover:border-stone-500 hover:bg-stone-800"
            >
              <Github aria-hidden="true" size={16} />
              Repository
            </a>
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-700 px-4 py-2 text-sm font-medium text-stone-200 transition hover:border-stone-500 hover:bg-stone-800"
              >
                <ExternalLink aria-hidden="true" size={16} />
                Live demo
              </a>
            ) : null}
          </div>
        </div>

        <ul className="mt-7 grid gap-3 lg:grid-cols-3">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-xl border border-stone-800 bg-stone-900/70 p-4 text-sm leading-6 text-stone-300"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-400">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
