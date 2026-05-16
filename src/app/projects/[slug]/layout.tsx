import type { Metadata } from "next";
import {
  createMetadata,
  getProjectBySlug,
  jsonLdScript,
  projectJsonLd,
} from "@/lib/seo";

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
    title: `${project.title} Case Study`,
    description: `${project.description} ${project.caseStudy.outcome}`,
    path: `/projects/${project.slug}`,
    image: project.image,
    keywords: [
      project.title,
      project.client,
      project.role,
      ...project.tags,
      ...project.caseStudy.techStack,
    ],
  });
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { slug } = await params;
  const jsonLd = projectJsonLd(slug);

  return (
    <>
      {jsonLd ? <script {...jsonLdScript(jsonLd)} /> : null}
      {children}
    </>
  );
}
