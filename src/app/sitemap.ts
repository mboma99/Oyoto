import type { MetadataRoute } from "next";
import { absoluteUrl, defaultOgImage } from "@/lib/seo";
import { projects } from "@/data/projects";

// Stamped at build; the site is static, so a deploy is the content change.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(defaultOgImage)],
    },
    {
      url: absoluteUrl("/projects"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: projects.map((project) => absoluteUrl(project.image)),
    },
    {
      url: absoluteUrl("/resume"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(project.image)],
  }));

  return [...staticRoutes, ...projectRoutes];
}
