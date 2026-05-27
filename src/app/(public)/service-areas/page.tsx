import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SERVICE_AREA_DATA } from "@/data/service-areas";
import { CcCtaSection } from "@/components/public/cc/Sections";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Divine Shine provides window cleaning, pressure washing, and solar panel cleaning across Redding, Anderson, Shasta Lake, Cottonwood, Palo Cedro, and the greater Shasta County area.",
  alternates: { canonical: "https://www.divine-shine.com/service-areas" },
};

export default function ServiceAreasIndexPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy text-white pt-36 pb-16 sm:pt-40 sm:pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky mb-4">
            Where We Work
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Service Areas
          </h1>
          <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Proudly serving Redding and the greater Shasta County area with
            professional window cleaning, pressure washing, and solar care.
          </p>
        </div>
      </section>

      {/* Area grid */}
      <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICE_AREA_DATA.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="group relative rounded-dynamic overflow-hidden h-56 flex items-end focus:outline-none focus:ring-2 focus:ring-sky"
            >
              <Image
                src={area.heroImage}
                alt={`${area.displayName} — Divine Shine service area`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent z-10 group-hover:from-navy/90 transition-colors" />
              <div className="relative z-20 p-6 w-full">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {area.displayName}
                </h2>
                <span className="mt-1 inline-flex items-center gap-1 text-sm text-white/90">
                  View {area.city} services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CcCtaSection
        heading="Don't see your town?"
        subheading="We serve the greater Shasta County area and beyond. Call (530) 900-3156 — chances are we cover you."
      />
    </div>
  );
}
