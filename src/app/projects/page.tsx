import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import JsonLd from "@/components/JsonLd";
import { publishedProjects } from "@/content/projects";
import { collectionMetadata, projectPath } from "@/lib/metadata";
import { collectionStructuredData } from "@/lib/structured-data";

export const metadata = collectionMetadata(
  "/projects",
  "Software Engineering Projects | Kevinas Ramoska",
  "Explore Kevinas Ramoska's Java Spring Boot and ASP.NET Core projects, with real screenshots, architecture, testing evidence and engineering decisions.",
);

export default function ProjectsIndex() {
  return (
    <div className="portfolio-page">
      <JsonLd data={collectionStructuredData("/projects", "Software engineering projects", publishedProjects.map((project) => ({ title: project.title, path: projectPath(project.slug) })))} />
      <Header />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-32 sm:px-10 lg:px-16">
          <Link href="/" className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-300">Back to portfolio</Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-stone-100 sm:text-5xl">Software engineering projects</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-300">
            Two full-stack applications built by Kevinas Ramoska: a Java Spring Boot
            cryptocurrency portfolio tracker and an ASP.NET Core property management
            system. Each case study explains the problem, implementation, security
            boundaries, automated tests, and current limitations.
          </p>
        </div>
        <Projects showIndexLink={false} />
      </main>
      <Footer />
    </div>
  );
}
