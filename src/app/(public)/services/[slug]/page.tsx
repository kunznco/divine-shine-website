import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALL_SERVICES } from "@/data/services";
import { getCarouselReviews } from "@techforthetrades/db";
import {
  BreadcrumbListSchema,
  ServiceSchema,
  FaqPageSchema,
} from "@/components/StructuredData";
import { CcServiceHero } from "@/components/public/cc/ServiceHero";
import {
  CcServiceBody,
  CcExpertProcess,
  CcFaqFlat,
  CcTestimonialsGrid,
  CcCtaSection,
} from "@/components/public/cc/Sections";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ALL_SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = ALL_SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const ogImage = service.image
    ? [{ url: service.image, width: 1200, height: 630, alt: service.name }]
    : undefined;
  return {
    title: { absolute: service.seoTitle },
    description: service.seoDescription,
    alternates: { canonical: `https://www.divine-shine.com/services/${slug}` },
    openGraph: ogImage ? { images: ogImage } : undefined,
    twitter: ogImage ? { images: ogImage.map((i) => i.url) } : undefined,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = ALL_SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const reviews = (await getCarouselReviews()).map((r) => ({
    name: r.name,
    rating: r.rating,
    text: r.text,
  }));

  const allServices = ALL_SERVICES.map((s) => ({
    slug: s.slug,
    name: s.name,
    href: s.href,
  }));

  return (
    <div className={`grab-services-${slug}`}>
      <BreadcrumbListSchema
        items={[
          ["Services", "/services"],
          [service.name, `/services/${slug}`],
        ]}
      />
      <ServiceSchema
        name={service.name}
        description={service.seoDescription}
        url={`https://www.divine-shine.com/services/${slug}`}
        image={service.image}
      />
      {service.faqs.length > 0 && <FaqPageSchema items={service.faqs} />}

      {/* 1. Hero */}
      <CcServiceHero
        heading={`Professional ${service.name} Services`}
        subheading={service.heroDescription}
        image={service.image}
        primaryCta={{ label: "Get a fast estimate", href: "/contact-us" }}
      />

      {/* 2. Body — sticky service nav + long-form content */}
      <CcServiceBody
        serviceName={service.name}
        sections={service.sections}
        bodyHtml=""
        allServices={allServices}
        activeSlug={slug}
      />

      {/* 3. Expert process */}
      <CcExpertProcess
        title={`Our Expert ${service.name} Process`}
        subtitle={service.processSubtitle}
        steps={service.processSteps}
      />

      {/* 4. Testimonials */}
      <CcTestimonialsGrid
        heading="What our customers are saying"
        subheading="Real reviews from Redding-area homes and businesses we've worked with."
        reviews={reviews}
      />

      {/* 5. FAQ */}
      <CcFaqFlat serviceName={service.name} items={service.faqs} />

      {/* 6. Closing CTA */}
      <CcCtaSection
        heading={service.ctaHeading}
        subheading={service.ctaSubheading}
        backgroundImage={service.image}
      />
    </div>
  );
}
