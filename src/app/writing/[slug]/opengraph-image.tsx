import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/articles";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Technical writing by Kevinas Ramoska";
export const size = socialImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleSocialImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return createSocialImage({
    eyebrow: "Engineering notes",
    title: article.title,
    subtitle: article.summary,
    tags: ["Kevinas Ramoska", "Full-stack engineering"],
  });
}
