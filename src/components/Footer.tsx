import { profile } from "@/content/profile";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-6 py-8 text-stone-400 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-stone-200">{profile.name}</p>
          <p className="mt-1 text-sm">&copy; {new Date().getFullYear()} · Built with care in Ireland.</p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold">
          <Link href="/projects" className="inline-flex min-h-11 items-center transition hover:text-blue-300">Projects</Link>
          <Link href="/writing" className="inline-flex min-h-11 items-center transition hover:text-blue-300">Writing</Link>
          <a
            href={profile.links.github}
            target="_blank"
            className="inline-flex min-h-11 items-center transition hover:text-blue-300"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href={profile.links.linkedin}
            target="_blank"
            className="inline-flex min-h-11 items-center transition hover:text-blue-300"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center transition hover:text-blue-300"
          >
            View Resume
          </a>
        </nav>
      </div>
    </footer>
  );
}
