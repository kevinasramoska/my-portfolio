"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { profile } from "@/content/profile";

const navigation = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
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
    <header className="fixed top-0 z-20 w-full border-b border-stone-800 bg-stone-950/95 text-stone-100 backdrop-blur-md">
      <div className="relative mx-auto flex min-h-16 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-0">
        <Link
          href="/#home"
          className="inline-flex min-h-11 items-center text-lg font-bold tracking-wide sm:text-xl"
          onClick={closeMenu}
        >
          {profile.name}
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-stone-700 text-stone-200 transition hover:border-stone-500 hover:bg-stone-900 lg:hidden"
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
          } absolute left-0 top-full w-full flex-col border-b border-stone-800 bg-stone-950 px-6 py-4 shadow-xl sm:px-10 lg:static lg:flex lg:w-auto lg:flex-row lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 w-full items-center rounded-lg px-3 text-base font-medium text-stone-300 transition hover:bg-stone-900 hover:text-blue-400 lg:w-auto"
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
                className="mt-1 inline-flex min-h-11 w-full items-center rounded-lg border border-stone-700 px-3 text-base font-semibold text-stone-100 transition hover:border-stone-500 hover:bg-stone-900 lg:ml-2 lg:mt-0 lg:w-auto"
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
