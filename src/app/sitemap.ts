import type { MetadataRoute } from "next";
import { absoluteUrl, defaultOgImage } from "@/lib/seo";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

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
      url: absoluteUrl("/services"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/case-studies"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: projects.map((project) => absoluteUrl(project.image)),
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/case-studies/${project.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [absoluteUrl(project.image)],
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
