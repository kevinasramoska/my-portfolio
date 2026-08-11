import { FileText, FolderKanban, Github } from "lucide-react";
import { profile } from "@/content/profile";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-stone-950 px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
          {profile.role}
        </p>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Hi, I’m <span className="text-blue-400">{profile.name}</span>
        </h1>

        <p className="mt-6 max-w-4xl text-xl font-semibold leading-relaxed text-zinc-200 sm:text-2xl">
          {profile.headline}
        </p>

        <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
          {profile.summary}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FolderKanban aria-hidden="true" size={18} />
            View Projects
          </a>

          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            <Github aria-hidden="true" size={18} />
            GitHub
          </a>

          <a
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            <FileText aria-hidden="true" size={18} />
            View Resume
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {profile.coreSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
