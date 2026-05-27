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
            Call, text, or email and we&apos;ll get you a fast, no-pressure
            estimate for your home or business.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: contact methods + hours */}
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy mb-6">
              Talk to Divine Shine
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
                Email {EMAIL}
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

          {/* Right: map + areas */}
          <div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-dynamic shadow-sm">
              <iframe
                src={REGIONAL_MAP}
                title="Divine Shine service area — Redding & Shasta County"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <h3 className="font-heading text-lg font-bold text-navy mt-8 mb-4">
              Areas We Serve
            </h3>
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
