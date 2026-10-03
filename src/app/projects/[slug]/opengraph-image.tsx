import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { brandName, getProjectBySlug } from "@/lib/seo";
import { titleCase } from "@/lib/text";
import { ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt = "Oyoto case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return renderOgCard({
    kicker: `${brandName} case study`,
    title: titleCase(project.title),
    footer: `${project.category}, ${project.year}`,
  });
}
