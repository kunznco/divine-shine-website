import type { Metadata } from "next";
import { ALL_SERVICES } from "@/data/services";
import { CcAreaServicesGrid, CcCtaSection } from "@/components/public/cc/Sections";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Window cleaning, high-rise window cleaning, pressure washing, solar panel cleaning, house washing, and roof washing across Redding and Shasta County.",
  alternates: { canonical: "https://www.divine-shine.com/services" },
};

export default function ServicesIndexPage() {
  const serviceCards = ALL_SERVICES.map((s) => ({
    name: s.name,
    description: s.tagline,
    href: s.href,
    image: s.image,
  }));

  return (
    <div>
      {/* Page header — top padding clears the fixed navbar. */}
      <section className="bg-navy text-white pt-36 pb-16 sm:pt-40 sm:pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky mb-4">
            What We Do
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Our Services
          </h1>
          <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Professional window cleaning, pressure washing, and solar care for
            homes and businesses across Redding and Shasta County.
          </p>
        </div>
      </section>

      <CcAreaServicesGrid
        cityName="Redding"
        services={serviceCards}
        label="Services"
      />

      <CcCtaSection
        heading="Not sure which service you need?"
        subheading="Tell us about your property and we'll recommend the right approach. Call (530) 900-3156 or request a free estimate."
      />
    </div>
  );
}
