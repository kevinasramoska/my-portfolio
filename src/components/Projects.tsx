import { featuredProjects } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-stone-800 bg-stone-900/40 p-8 sm:p-10 lg:p-12">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
          Projects
        </p>

        <h2 className="text-3xl font-bold text-stone-100 sm:text-4xl">
          Engineering evidence, not just technology lists
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
          Explore the data models, security boundaries, testing strategies,
          trade-offs, and current limitations behind two working applications.
        </p>

        <div className="mt-10 space-y-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
