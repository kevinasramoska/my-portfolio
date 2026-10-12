import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { articles, getArticle } from "@/content/articles";
import { profile } from "@/content/profile";
import { absoluteUrl, writingPath } from "@/lib/metadata";

type WritingPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  const path = writingPath(article.slug);
  const title = `${article.title} | ${profile.name}`;

  return {
    title,
    description: article.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description: article.summary,
    },
    twitter: {
      card: "summary",
      title,
      description: article.summary,
    },
  };
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const url = absoluteUrl(writingPath(article.slug));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.summary,
    datePublished: "2026-10-12",
    url,
    author: {
      "@type": "Person",
      name: profile.name,
      url: profile.siteUrl,
    },
  };

  return (
    <div className="portfolio-page">
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <article className="px-6 pb-24 pt-32 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/#writing"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-stone-400 transition hover:text-violet-300"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Back to writing
            </Link>

            <header className="mt-8 border-b border-white/[0.08] pb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
                Engineering note
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-stone-100 sm:text-5xl lg:text-6xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
                {article.summary}
              </p>
              <p className="mt-6 text-sm font-medium text-stone-500">
                {article.published} · {article.readTime}
              </p>
            </header>

            <div className="mt-12 space-y-14">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-bold tracking-tight text-stone-100 sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5 text-base leading-8 text-stone-300 sm:text-lg">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.points ? (
                    <ul className="mt-7 space-y-3 rounded-2xl border border-violet-300/15 bg-violet-300/[0.04] p-6 text-base leading-7 text-stone-300">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {article.relatedProject ? (
              <aside className="mt-16 rounded-[2rem] border border-blue-400/20 bg-blue-400/[0.05] p-7 sm:p-9">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                  See it in context
                </p>
                <h2 className="mt-3 text-2xl font-bold text-stone-100">
                  Explore the related project case study
                </h2>
                <Link
                  href={`/projects/${article.relatedProject}`}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-400"
                >
                  Open case study
                  <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              </aside>
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
