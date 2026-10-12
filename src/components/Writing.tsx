import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { articles } from "@/content/articles";

export default function Writing() {
  return (
    <section id="writing" className="reveal-section px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Technical writing
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Notes from building and testing real workflows
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-stone-300 lg:justify-self-end">
            Short explanations of the engineering decisions I care about:
            correctness, authorization, test design, and operable integrations.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {articles.map((article, index) => (
            <article
              key={article.slug}
              className="group rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-300/20"
            >
              <div className="flex items-center justify-between gap-4">
                <BookOpen className="text-violet-300" aria-hidden="true" size={21} />
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  0{index + 1} · {article.readTime}
                </span>
              </div>
              <h3 className="mt-7 text-2xl font-bold tracking-tight text-stone-100">
                {article.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-stone-400">
                {article.summary}
              </p>
              <Link
                href={`/writing/${article.slug}`}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-violet-300 transition hover:text-violet-200"
              >
                Read article
                <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" size={16} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
