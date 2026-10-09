import type { Metadata } from "next";
import { getServiceBySlug } from "@/data/services";
import { createMetadata, jsonLdScript, serviceJsonLd } from "@/lib/seo";

type ServiceLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: ServiceLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return createMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceLayout({ children, params }: ServiceLayoutProps) {
  const { slug } = await params;
  const jsonLd = serviceJsonLd(slug);

  return (
    <>
      {jsonLd ? <script {...jsonLdScript(jsonLd)} /> : null}
      {children}
    </>
  );
}
