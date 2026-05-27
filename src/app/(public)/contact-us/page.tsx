import type { Metadata } from "next";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  SMS_HREF,
  EMAIL,
  BUSINESS_HOURS,
  SERVICE_AREAS,
} from "@techforthetrades/shared/constants";
import { REGIONAL_MAP } from "@techforthetrades/shared/maps";
import { JobberEmbed } from "@/components/JobberEmbed";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Request a free estimate from Divine Shine. Window cleaning, pressure washing, and solar panel cleaning across Redding and Shasta County. Call or text (530) 900-3156.",
  alternates: { canonical: "https://www.divine-shine.com/contact-us" },
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy text-white pt-36 pb-16 sm:pt-40 sm:pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky mb-4">
            Get In Touch
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Request a Free Estimate
          </h1>
          <p className="mt-5 text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Fill out the form below or call, text, or email us — we&apos;ll get
            you a fast, no-pressure estimate for your home or business.
          </p>
        </div>
      </section>

      {/* Form + contact methods */}
      <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-6">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          {/* Jobber lead form */}
          <div className="lg:col-span-3">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy mb-6">
              Request Your Estimate
            </h2>
            <div className="rounded-dynamic border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
              <JobberEmbed />
            </div>
          </div>

          {/* Contact methods + hours */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy mb-6">
              Prefer to Talk?
            </h2>
            <div className="space-y-3">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 w-full rounded-dynamic bg-sky text-navy font-bold uppercase tracking-wide px-6 py-4 shadow-sm hover:bg-navy hover:text-white transition-colors"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                href={SMS_HREF}
                className="flex items-center justify-center gap-2 w-full rounded-dynamic border-2 border-navy text-navy font-bold uppercase tracking-wide px-6 py-4 hover:bg-navy hover:text-white transition-colors"
              >
                Text Us
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center justify-center gap-2 w-full rounded-dynamic border-2 border-navy text-navy font-bold uppercase tracking-wide px-6 py-4 hover:bg-navy hover:text-white transition-colors"
              >
                Email Us
              </a>
            </div>

            <h3 className="font-heading text-lg font-bold text-navy mt-10 mb-4">
              Business Hours
            </h3>
            <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-100 overflow-hidden">
              {BUSINESS_HOURS.map((row) => (
                <li
                  key={row.day}
                  className="flex items-center justify-between px-5 py-3 text-dark-muted"
                >
                  <span className="font-medium text-navy">{row.day}</span>
                  <span>{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Map + areas */}
      <section className="pb-16 sm:pb-20 md:pb-24 px-5 sm:px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-dynamic shadow-sm">
            <iframe
              src={REGIONAL_MAP}
              title="Divine Shine service area — Redding & Shasta County"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy mb-4">
              Areas We Serve
            </h2>
            <p className="text-dark-muted mb-5">
              Proudly serving Redding and the greater Shasta County area:
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-dark-muted">
              {SERVICE_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2">
                  <span aria-hidden className="text-sky-text">
                    ✓
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
