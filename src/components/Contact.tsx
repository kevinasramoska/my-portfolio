import { Mail, Github, Linkedin, FileText } from "lucide-react";
import { profile } from "@/content/profile";

const contactLinks = [
  {
    title: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    newTab: false,
  },
  {
    title: "GitHub",
    value: profile.links.github.replace("https://", ""),
    href: profile.links.github,
    icon: Github,
    newTab: true,
  },
  {
    title: "LinkedIn",
    value: profile.links.linkedin.replace("https://www.", ""),
    href: profile.links.linkedin,
    icon: Linkedin,
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
    <section id="contact" className="px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-stone-800 bg-stone-900/40 p-8 sm:p-10 lg:p-12">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
          Contact
        </p>

        <h2 className="text-3xl font-bold text-stone-100 sm:text-4xl">
          Let’s connect
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
          {profile.availability}
        </p>

        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-400">
          If you would like to discuss an opportunity, collaborate on a project,
          or connect professionally, feel free to reach out.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {contactLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.title}
                href={link.href}
                target={link.newTab ? "_blank" : undefined}
                rel={link.newTab ? "noreferrer" : undefined}
                className="group min-w-0 rounded-2xl border border-stone-800 bg-stone-950/60 p-6 transition hover:border-stone-600 hover:bg-stone-900/70"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <div className="rounded-xl border border-stone-700 bg-stone-900 p-3 text-blue-400">
                    <Icon aria-hidden="true" size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-stone-400">
                      {link.title}
                    </p>
                    <p className="mt-2 break-words text-base font-medium text-stone-100 transition group-hover:text-blue-400">
                      {link.value}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
