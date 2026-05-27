import type { Metadata } from "next";
import { PROMISE_VALUES, STATS } from "@techforthetrades/shared/constants";
import { CcCtaSection } from "@/components/public/cc/Sections";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Divine Shine is a locally trusted window cleaning and pressure washing company serving Redding and Shasta County, rated 5.0 across 232+ Google reviews.",
  alternates: { canonical: "https://www.divine-shine.com/about-us" },
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-navy text-white pt-36 pb-16 sm:pt-40 sm:pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky mb-4">
            About Divine Shine
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Trusted exterior cleaning in the North State
          </h1>
          <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            We brighten properties — and days — across Redding and Shasta County
            with professional window cleaning, pressure washing, and solar care.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy mb-6">
            Local, reliable, and detail-obsessed
          </h2>
          <p className="text-dark-muted leading-relaxed text-base sm:text-lg mb-4">
            Divine Shine is a locally owned exterior cleaning company serving
            Redding, Anderson, Red Bluff, and the surrounding North State
            communities. We specialize in commercial and residential window
            cleaning and pressure washing — and we&apos;ve built our reputation
            on showing up on time, working safely, and leaving every surface
            spotless.
          </p>
          <p className="text-dark-muted leading-relaxed text-base sm:text-lg">
            With a 5.0-star rating across 232+ Google reviews, our customers
            keep coming back because we treat every property like it&apos;s our
            own. From a single-story home to a multi-story commercial building,
            we bring the right equipment, trained technicians, and a
            satisfaction guarantee to every job.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-4 px-5 sm:px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-dynamic border border-gray-100 bg-white p-8 text-center shadow-sm"
            >
              <div className="font-heading text-4xl sm:text-5xl font-extrabold text-navy">
                {stat.value}
              </div>
              <div className="mt-2 font-semibold text-sky-text">{stat.label}</div>
              <p className="mt-3 text-sm text-dark-muted leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy text-center mb-12">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PROMISE_VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-sky-text mb-3">
                  {value.title}
                </h3>
                <p className="text-dark-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CcCtaSection
        heading="Ready to see the Divine Shine difference?"
        subheading="Get a free estimate today. Call (530) 900-3156 or send us a quick note."
      />
    </div>
  );
}
