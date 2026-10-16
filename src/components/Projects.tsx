import { featuredProjects } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import Link from "next/link";

export default function Projects({ showIndexLink = true }: { showIndexLink?: boolean }) {
  return (
    <section id="projects" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
              Selected work · {featuredProjects.length} deep dives
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Engineering evidence, not just technology lists
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-stone-300 lg:justify-self-end">
            Explore the product thinking, data models, security boundaries,
            tests, trade-offs, and honest limitations behind two working
            applications.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
        {showIndexLink && <Link href="/projects" className="mt-8 inline-flex min-h-11 items-center text-sm font-semibold text-blue-300 hover:text-blue-200">
          Browse all project case studies
        </Link>}
      </div>
    </section>
  );
}
