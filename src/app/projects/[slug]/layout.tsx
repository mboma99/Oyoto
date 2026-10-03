import type { Metadata } from "next";
import {
  createMetadata,
  getProjectBySlug,
  jsonLdScript,
  projectBreadcrumbJsonLd,
  projectJsonLd,
} from "@/lib/seo";
import { titleCase } from "@/lib/text";

type ProjectLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({
  params,
}: ProjectLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createMetadata({
    title: `${titleCase(project.title)} Case Study`,
    description: `${project.description} ${project.category} case study by Oyoto, ${project.year}.`,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { slug } = await params;
  const jsonLd = projectJsonLd(slug);
  const breadcrumb = projectBreadcrumbJsonLd(slug);

  return (
    <>
      {jsonLd ? <script {...jsonLdScript(jsonLd)} /> : null}
      {breadcrumb ? <script {...jsonLdScript(breadcrumb)} /> : null}
      {children}
    </>
  );
}
