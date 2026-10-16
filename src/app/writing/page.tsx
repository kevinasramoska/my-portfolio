import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Writing from "@/components/Writing";
import JsonLd from "@/components/JsonLd";
import { articles } from "@/content/articles";
import { collectionMetadata, writingPath } from "@/lib/metadata";
import { collectionStructuredData } from "@/lib/structured-data";

export const metadata = collectionMetadata(
  "/writing",
  "Technical Writing on .NET, Testing and Kafka | Kevinas Ramoska",
  "Engineering notes by Kevinas Ramoska on transaction safety, ASP.NET Core authorization, Playwright testing and reliable Kafka workflows.",
);

export default function WritingIndex() {
  return (
    <div className="portfolio-page">
      <JsonLd data={collectionStructuredData("/writing", "Technical writing", articles.map((article) => ({ title: article.title, path: writingPath(article.slug) })))} />
      <Header />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-32 sm:px-10 lg:px-16">
          <Link href="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-violet-300">Back to portfolio</Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-100 sm:text-5xl">Technical writing</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
            Engineering notes by <Link href="/#about" className="text-violet-300">Kevinas Ramoska</Link>,
            a full-stack engineer working with C#/.NET, Java, and React. These articles
            explain transaction correction, resource-level authorization, browser
            testing, and event-driven workflows, with related project case studies.
          </p>
        </div>
        <Writing showIndexLink={false} />
      </main>
      <Footer />
    </div>
  );
}
