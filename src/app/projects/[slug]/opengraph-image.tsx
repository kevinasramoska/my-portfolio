import { notFound } from "next/navigation";
import {
  getPublishedProject,
  publishedProjects,
} from "@/content/projects";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Engineering project case study";
export const size = socialImageSize;
export const contentType = "image/png";

type ProjectSocialImageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectSocialImage({
  params,
}: ProjectSocialImageProps) {
  const { slug } = await params;
  const project = getPublishedProject(slug);

  if (!project) {
    notFound();
  }

  return createSocialImage({
    eyebrow: `${project.eyebrow} case study`,
    title: project.title,
    subtitle: project.summary,
    tags: project.technologies,
  });
}
