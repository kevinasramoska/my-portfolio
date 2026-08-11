import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import {
  getPublishedProject,
  publishedProjects,
} from "@/content/projects";
import { profile } from "@/content/profile";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);

  if (!project) {
    return {};
  }

  const canonicalPath = `/projects/${project.slug}`;
  const title = `${project.title} Case Study | ${profile.name}`;

  return {
    title,
    description: project.metaDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title,
      description: project.metaDescription,
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.metaDescription,
      images: ["/og.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getPublishedProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <ProjectCaseStudy project={project} />
      </main>
      <Footer />
    </div>
  );
}
