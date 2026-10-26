import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { articles, articleDate, articleReadTime, getArticle } from "@/content/articles";
import { profile } from "@/content/profile";
import { writingPath, writingSocialImagePath } from "@/lib/metadata";
import { articleStructuredData } from "@/lib/structured-data";

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
  const image = { url: writingSocialImagePath(article.slug), width: 1200, height: 630, alt: article.title };

  return {
    title,
    description: article.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description: article.summary,
      siteName: `${profile.name} Portfolio`,
      locale: "en_IE",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [profile.siteUrl],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.summary,
      images: [image],
    },
  };
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="portfolio-page">
      <JsonLd data={articleStructuredData(article)} />
      <Header />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <article className="px-6 pb-24 pt-32 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/writing"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-stone-400 transition hover:text-violet-300"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Back to writing
            </Link>

            <nav aria-label="Breadcrumb" className="mt-6 text-sm text-stone-400">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/writing">Technical writing</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{article.title}</li>
              </ol>
            </nav>

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
              <p className="mt-6 text-sm font-medium text-stone-400">
                By <Link href="/#about" rel="author" className="text-violet-300">{profile.name}</Link>
                {" · "}<time dateTime={article.publishedAt}>{articleDate(article.publishedAt)}</time>
                {" · "}{articleReadTime(article)}
              </p>
              <p className="mt-2 text-xs text-stone-400">
                Updated <time dateTime={article.updatedAt}>{articleDate(article.updatedAt)}</time>
              </p>
            </header>

            <div className="mt-12 space-y-14">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-bold tracking-tight text-stone-100 sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5 [overflow-wrap:anywhere] text-base leading-8 text-stone-300 sm:text-lg">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.code ? (
                    <figure className="mt-7 min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
                      <figcaption className="border-b border-white/10 px-5 py-4 [overflow-wrap:anywhere] text-sm leading-6 text-stone-300">
                        <span className="font-semibold text-violet-300">{section.code.language}</span>
                        {" · "}{section.code.caption}
                      </figcaption>
                      <pre tabIndex={0} aria-label={`${section.heading}: code example`} className="overflow-x-auto p-5 text-sm leading-7 text-stone-200">
                        <code>{section.code.value}</code>
                      </pre>
                    </figure>
                  ) : null}
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

            <section aria-labelledby="article-sources" className="mt-14 border-t border-white/10 pt-8">
              <h2 id="article-sources" className="text-2xl font-bold text-stone-100">Sources and further reading</h2>
              <ul className="mt-5 space-y-3">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} className="inline-block py-2 text-sm leading-6 text-violet-300 underline decoration-violet-300/40 underline-offset-4 hover:text-violet-200">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

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
