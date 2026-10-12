"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { profile } from "@/content/profile";

const navigation = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Writing", href: "/#writing" },
  { label: "About", href: "/#about" },
  { label: "Judo", href: "/#judo" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 text-stone-100 sm:px-6">
      <div className="relative mx-auto flex min-h-16 max-w-6xl items-center justify-between rounded-2xl border border-white/[0.08] bg-zinc-950/75 px-3 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-5">
        <Link
          href="/#home"
          className="group inline-flex min-h-11 items-center gap-3 rounded-xl pr-2 text-base font-bold tracking-wide sm:text-lg"
          onClick={closeMenu}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-black text-white shadow-[0_8px_24px_rgba(59,130,246,0.25)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            KR
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 text-stone-200 transition hover:border-white/20 hover:bg-white/[0.06] lg:hidden"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>

        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute left-0 top-[calc(100%+0.5rem)] w-full flex-col rounded-2xl border border-white/[0.08] bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-xl lg:static lg:flex lg:w-auto lg:flex-row lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 w-full items-center rounded-xl px-3 text-sm font-semibold text-stone-300 transition hover:bg-white/[0.06] hover:text-blue-300 lg:w-auto"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-white px-4 text-sm font-bold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-100 lg:ml-2 lg:mt-0 lg:w-auto"
                onClick={closeMenu}
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
