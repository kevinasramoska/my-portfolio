import { ArrowUpRight, FileText, CodeXml, ContactRound, Mail } from "lucide-react";
import { profile } from "@/content/profile";

const contactLinks = [
  {
    title: "GitHub",
    value: profile.links.github.replace("https://", ""),
    href: profile.links.github,
    icon: CodeXml,
    newTab: true,
  },
  {
    title: "LinkedIn",
    value: profile.links.linkedin.replace("https://www.", ""),
    href: profile.links.linkedin,
    icon: ContactRound,
    newTab: true,
  },
  {
    title: "Resume",
    value: "View PDF",
    href: profile.links.resume,
    icon: FileText,
    newTab: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="reveal-section px-6 pb-24 pt-16 sm:px-10 lg:px-16 lg:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-blue-400/20 bg-[radial-gradient(circle_at_15%_10%,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_90%_85%,rgba(139,92,246,0.18),transparent_30%),rgba(24,24,27,0.78)] p-7 shadow-2xl shadow-blue-950/10 sm:p-10 lg:p-14">
        <div className="hero-grid absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              Let’s connect
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let’s build something useful.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              {profile.availability} If you would like to discuss engineering,
              collaborate on a project, or simply say hello, my inbox is open.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-zinc-950 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-100"
            >
              <Mail aria-hidden="true" size={18} />
              Email me
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" size={17} />
            </a>
            <p className="mt-3 break-all text-sm text-stone-400">{profile.email}</p>
          </div>

          <div className="space-y-3">
            {contactLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                key={link.title}
                href={link.href}
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noreferrer" : undefined}
                  className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/[0.09] bg-black/15 p-4 transition duration-300 hover:translate-x-1 hover:border-white/[0.16] hover:bg-white/[0.06]"
              >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-400/10 text-blue-300">
                    <Icon aria-hidden="true" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                      {link.title}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-stone-100 transition group-hover:text-blue-300 sm:text-base">
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight className="shrink-0 text-stone-500 transition group-hover:text-blue-300" aria-hidden="true" size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
