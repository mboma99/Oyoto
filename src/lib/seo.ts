import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const siteUrl = "https://oyoto.co.uk";
export const siteName = "Oyoto";
export const founderName = "James Mboma";
export const contactEmail = "oyotostudios@outlook.com";
export const defaultOgImage = "/hero-images/meta_thumbnail.jpg";

export const socialLinks = [
  "https://github.com/mboma99",
  "https://www.linkedin.com/in/james-mboma/",
];

export const serviceAreas = [
  "Full-stack development",
  "Cloud architecture",
  "UI/UX engineering",
  "AI integration",
  "Mobile apps",
  "Business intelligence",
  "Technical consulting",
];

const sharedKeywords = [
  "Oyoto",
  "Oyoto Studios",
  "James Mboma",
  "software engineer",
  "digital product development",
  "full-stack development",
  "cloud architecture",
  "AI integration",
  "mobile app development",
  "London software engineer",
  "UK digital product studio",
];

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = defaultOgImage,
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...sharedKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: imageUrl,
          alt: `${siteName} project showcase`,
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function jsonLdScript(data: JsonLdValue) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  };
}

export function projectUrl(slug: string) {
  return absoluteUrl(`/projects/${slug}`);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function projectJsonLd(slug: string): JsonLdValue | null {
  const project = getProjectBySlug(slug);

  if (!project) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl(project.slug)}#case-study`,
    name: project.title,
    headline: `${project.title} case study by ${siteName}`,
    description: project.description,
    url: projectUrl(project.slug),
    image: absoluteUrl(project.image),
    dateCreated: project.year,
    creator: {
      "@id": `${siteUrl}/#organization`,
    },
    about: project.tags,
    keywords: project.caseStudy.techStack,
    text: [
      project.caseStudy.overview,
      project.caseStudy.challenge,
      project.caseStudy.solution,
      project.caseStudy.outcome,
    ].join(" "),
  };
}

export function siteJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        alternateName: "Oyoto Studios",
        url: siteUrl,
        email: contactEmail,
        founder: {
          "@id": `${siteUrl}/#person`,
        },
        sameAs: socialLinks,
        knowsAbout: serviceAreas,
        makesOffer: serviceAreas.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
          },
        })),
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: founderName,
        jobTitle: "Software Engineer",
        url: siteUrl,
        email: contactEmail,
        sameAs: socialLinks,
        worksFor: {
          "@id": `${siteUrl}/#organization`,
        },
        knowsAbout: serviceAreas,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-GB",
      },
    ],
  };
}
