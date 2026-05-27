import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICE_AREA_DATA } from "@/data/service-areas";
import { ALL_SERVICES } from "@/data/services";
import { getCarouselReviews } from "@techforthetrades/db";
import { googleMapsEmbed } from "@techforthetrades/shared/maps";
import { PHONE_DISPLAY, PHONE_HREF } from "@techforthetrades/shared/constants";
import { BreadcrumbListSchema } from "@/components/StructuredData";
import {
  CcServiceAreaHero,
  CcAreaContactCard,
  CcAreaServicesGrid,
  CcTestimonialsGrid,
  CcCtaSection,
} from "@/components/public/cc/Sections";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_AREA_DATA.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = SERVICE_AREA_DATA.find((a) => a.slug === slug);
  if (!area) return {};
  const title = `${area.city} Window Cleaning & Pressure Washing`;
  const description = `Professional window cleaning, pressure washing, solar panel cleaning, and more in ${area.displayName}. Locally owned, fully insured, 5.0 stars on Google. Free estimate.`;
  const url = `https://www.divine-shine.com/service-areas/${slug}`;
  const ogImage = [
    {
      url: area.heroImage,
      width: 1200,
      height: 630,
      alt: `${area.displayName} window cleaning by Divine Shine`,
    },
  ];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, images: ogImage },
    twitter: { images: ogImage.map((i) => i.url) },
  };
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = SERVICE_AREA_DATA.find((a) => a.slug === slug);
  if (!area) notFound();

  const reviews = (await getCarouselReviews()).map((r) => ({
    name: r.name,
    rating: r.rating,
    text: r.text,
  }));

  const serviceCards = ALL_SERVICES.map((s) => ({
    name: s.name,
    description: s.tagline,
    href: s.href,
    image: s.image,
  }));

  return (
    <div className={`grab-service-areas-${slug}`}>
      <BreadcrumbListSchema
        items={[
          ["Service Areas", "/service-areas"],
          [area.displayName, `/service-areas/${slug}`],
        ]}
      />

      {/* 1. Hero */}
      <CcServiceAreaHero
        heading={`${area.displayName} Window Cleaning & Pressure Washing`}
        subheading={`Professional window cleaning, pressure washing, solar panel cleaning, and more across ${area.city} — trusted by homes and businesses in the community.`}
        image={area.heroImage}
        primaryCta={{ label: "Get a fast estimate", href: "/contact-us" }}
      />

      {/* 2. Contact card — phone / email / local map */}
      <CcAreaContactCard
        phone={{ label: PHONE_DISPLAY, href: PHONE_HREF }}
        mapEmbedSrc={googleMapsEmbed(`${area.city}, CA`)}
      />

      {/* 3. Local expertise body */}
      <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-6 bg-sky-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-text mb-2">
              Local Expertise
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy">
              Your Local {area.city} Cleaning Team
            </h2>
          </div>
          <div className="space-y-8 sm:space-y-10">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-navy mb-3">
                The Beauty of {area.city}
              </h3>
              <p className="text-dark-muted text-base sm:text-lg leading-relaxed">
                {area.beautyDescription}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-navy mb-3">
                Services We Offer in {area.city}
              </h3>
              <p className="text-dark-muted text-base sm:text-lg leading-relaxed">
                Divine Shine brings the full range of exterior cleaning to{" "}
                {area.city}:
              </p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                {ALL_SERVICES.map((s) => (
                  <li
                    key={s.slug}
                    className="flex items-start gap-2 text-dark-muted text-sm sm:text-base"
                  >
                    <span className="text-sky-text mt-1">●</span>
                    <span>
                      <Link
                        href={s.href}
                        className="font-semibold text-navy hover:text-navy-light transition-colors"
                      >
                        {s.name}
                      </Link>{" "}
                      — {s.tagline}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-navy mb-3">
                Why Divine Shine?
              </h3>
              <p className="text-dark-muted text-base sm:text-lg leading-relaxed">
                We&apos;re a locally owned and operated team serving the North
                State — not a corporate chain. Our trained, insured technicians
                show up on time, work safely at any height, and back every job
                with a 100% satisfaction guarantee. It&apos;s why we&apos;ve
                earned a 5.0-star rating across 232+ Google reviews.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-navy mb-3">
                Your Local Partners in {area.city}
              </h3>
              <p className="text-dark-muted text-base sm:text-lg leading-relaxed">
                {area.neighborhoods}
              </p>
              <p className="mt-4 text-dark-muted text-base sm:text-lg leading-relaxed">
                Ready for spotless windows and surfaces? Call or text{" "}
                <Link
                  href={PHONE_HREF}
                  className="font-semibold text-navy hover:text-navy-light transition-colors"
                >
                  {PHONE_DISPLAY}
                </Link>{" "}
                for a free estimate and let&apos;s bring out the best in your{" "}
                {area.city} property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services grid */}
      <CcAreaServicesGrid cityName={area.city} services={serviceCards} />

      {/* 5. Testimonials */}
      <CcTestimonialsGrid
        heading="Trusted across the North State"
        subheading={`See why ${area.city}-area homes and businesses choose Divine Shine.`}
        reviews={reviews}
      />

      {/* 6. Closing CTA */}
      <CcCtaSection
        heading={`Book your ${area.city} cleaning today`}
        subheading={`Spotless windows and surfaces for your ${area.city} home or business. Call (530) 900-3156 for a fast, free estimate.`}
      />
    </div>
  );
}
