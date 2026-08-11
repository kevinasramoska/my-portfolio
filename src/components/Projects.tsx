"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-stone-800 bg-stone-900/40 p-8 sm:p-10 lg:p-12">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-400"
        >
          Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl font-bold text-stone-100 sm:text-4xl"
        >
          Full-stack projects built with a backend-first approach
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-3xl text-lg leading-8 text-stone-300"
        >
          These projects reflect the way I like to build software: clean
          backend architecture, secure APIs, well-structured databases, and
          practical user-facing interfaces.
        </motion.p>

        <div className="mt-10 space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={`rounded-2xl border p-6 sm:p-8 ${
                project.featured
                  ? "border-blue-500/30 bg-stone-950/80"
                  : "border-stone-800 bg-stone-950/60"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-400">
                    {project.subtitle}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-stone-100">
                    {project.title}
                  </h3>
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.links.repository}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition hover:border-stone-500 hover:bg-stone-800"
                  >
                    <Github size={16} />
                    GitHub
                  </a>

                  {project.links.demo ? (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-400"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-8 text-stone-300">
                {project.description}
              </p>

              <ul className="mt-6 space-y-3 text-base leading-8 text-stone-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-stone-700 bg-stone-900 px-4 py-2 text-sm text-stone-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
