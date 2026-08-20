/**
 * Coastal Clarity production-faithful section components.
 *
 * Each component mirrors the markup of the corresponding section on the live
 * coastalclaritysd.com pages (snapshot from 2026-04-30) verbatim. Class names
 * and inline styles are taken directly from the scraped HTML so visual output
 * is byte-identical to production.
 *
 * Each section accepts a `sectionId` so it can be wired to the admin's
 * click-to-edit flow when ?editor=true is set.
 */

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { sanitizeHtml } from "@techforthetrades/shared/sanitize";
import { PHONE_HREF, PHONE_DISPLAY } from "@techforthetrades/shared/constants";
import { TestimonialsCarousel } from "./TestimonialsCarousel";
import { BrandCtaButton } from "@techforthetrades/ui/BrandCtaButton";

// =========================================================================
// Service body — sticky service-link nav + description body
// =========================================================================
type Service = { slug: string; name: string; href: string };
/** Structured long-form section (matches `ServiceSection` in
 *  `src/data/services.ts`). When present, takes priority over `bodyHtml`. */
export type CcServiceBodySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};
type CcServiceBodyProps = {
  /** h3 service name shown above the body */
  serviceName: string;
  /** Structured long-form sections from `src/data/services.ts`. When
   *  provided, renders as a stack of H3 + paragraphs + optional bulleted
   *  lists (PR 2 — replaces the truncated `bodyHtml` DB blob for the 9
   *  in-code services). */
  sections?: CcServiceBodySection[];
  /** Fallback rich-text HTML body (from a `text_block` DB section). Used
   *  when `sections` is omitted — preserves the existing admin workflow
   *  for pages created in the editor that aren't in `services.ts`. */
  bodyHtml?: string;
  /** All services for the sidebar; the active one gets the dot indicator */
  allServices: Service[];
  activeSlug: string;
  /** Enables click-to-edit on the body when the editor is active. */
  bodySectionId?: string;
};

export function CcServiceBody({ serviceName, sections, bodyHtml, allServices, activeSlug, bodySectionId }: CcServiceBodyProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-0 grab-service-details py-16 sm:py-24 scroll-mt-24 sm:scroll-mt-28">
      <div className="grab-service-details-container flex flex-col justify-between gap-12 px-4 md:flex-row">
        {/* Service nav (rendered first; ordered to the right on desktop
            via md:order-2). Polished 2026-05-12 to align with the design
            system: small medium-weight links, sky-blue for the active
            entry, navy on hover. Sticky inside the lg+ right column.
            Hidden below md so mobile users don't see a 441px wall of
            jump-links above the body content (audit blocker — the
            sticky-rail layout only exists at md+ anyway). */}
        <div className="hidden md:block min-w-[280px] md:order-2 md:w-[320px]">
          <ul className="sticky top-24 flex flex-col">
            {allServices.map((s) => {
              const active = s.slug === activeSlug;
              return (
                <li key={s.slug}>
                <Link
                  href={s.href}
                  className="grab-service-link group flex items-center justify-between border-b border-gray-200 py-3.5 font-pairing-secondary text-sm font-medium transition-colors"
                >
                  <div className="grab-service-link-content flex items-center gap-2 pr-6">
                    {active && (
                      <div
                        aria-hidden
                        className="grab-service-link-active-indicator mr-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky"
                      />
                    )}
                    <span
                      className={`grab-service-link-title ${
                        active
                          ? "text-sky-text font-semibold"
                          : "text-dark-muted group-hover:text-navy"
                      }`}
                    >
                      {s.name}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="grab-service-link-arrow block h-4 w-4 flex-shrink-0 text-gray-300 transition-transform group-hover:translate-y-1 group-hover:text-sky-text sm:hidden"
                    aria-hidden
                  >
                    <path d="M12 5v14" />
                    <path d="m19 12-7 7-7-7" />
                  </svg>
                  {!active && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="grab-service-link-arrow-right hidden h-4 w-4 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-sky-text sm:block"
                      aria-hidden
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  )}
                </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Body — applies the design system: section-heading utility for
            the service-name h2 (56px navy 800wt), body paragraphs at
            text-base sm:text-lg with dark-muted color, sky-blue
            checkmark bullets with generous line spacing. */}
        <div
          className="grab-service-details-history flex-1 min-w-0"
          data-section-id={bodySectionId}
        >
          <div className="grab-service-details-header">
            {/* h2 (not h3) so the heading order H1 → H2 stays sequential
                after the page hero's H1. Uses `.section-heading` from
                the design tokens; falls back to inline Tailwind weights
                so the visual stays correct if utilities aren't loaded. */}
            <h2 className="section-heading font-pairing-primary">{serviceName}</h2>
          </div>

          {sections && sections.length > 0 ? (
            // Mint's service-details pattern: a single "What's Included"
            // block — intro paragraphs + checklist of bullets. We render
            // only the FIRST structured section (the introductory "what we
            // do" content). The remaining `sections[]` entries from
            // `src/data/services.ts` are intentionally skipped on the
            // service template; that content lives elsewhere (process,
            // FAQs, related projects, CTA).
            (() => {
              const first = sections[0];
              return (
                <div className="font-pairing-secondary text-base sm:text-lg leading-relaxed text-dark-muted">
                  <h3 className="font-pairing-primary text-2xl sm:text-3xl font-bold text-navy mb-5">
                    {first.heading}
                  </h3>
                  {first.paragraphs.map((p, i) => (
                    <p key={i} className="mb-5 whitespace-pre-line">
                      {p}
                    </p>
                  ))}
                  {first.bullets && first.bullets.length > 0 && (
                    <ul className="mt-6 mb-2 space-y-3">
                      {first.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <svg
                            className="mt-1.5 h-5 w-5 flex-shrink-0 text-sky"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                            aria-hidden
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-base text-dark-muted">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })()
          ) : (
            // Fallback: legacy `text_block` HTML blob, used for admin-created
            // pages that don't have a matching `services.ts` entry.
            <div
              className="font-pairing-secondary text-base sm:text-lg leading-relaxed text-dark-muted [&_p]:mb-5 [&_a]:text-sky-text [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(bodyHtml ?? "") }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Related Projects — eyebrow + 56px navy heading + 3-up image grid with
// services-grid hover pattern (matches `ProjectsShowcase` from the home
// redesign and `CcAreaServicesGrid`): pre-zoomed image (scale-110) →
// translate + blur on hover, title-glow → arrow badge fade-in. Closes
// with a navy pill "View All Projects" CTA.
// =========================================================================
type ProjectCard = { slug: string; title: string; image: string };
type CcRelatedProjectsProps = {
  heading?: string;
  projects: ProjectCard[];
};

export function CcRelatedProjects({ heading = "Related Projects", projects }: CcRelatedProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="grab-service-projects bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 scroll-mt-24 sm:scroll-mt-28">
      <div className="mx-auto max-w-7xl">
        {/* Centered header — matches the redesigned ProjectsShowcase on
            the home page (sky eyebrow + 56px navy heading). */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-eyebrow">Recent Work</span>
          <h2 className="section-heading grab-service-projects-header font-pairing-primary">
            {heading}
          </h2>
        </div>

        <div className="grab-service-projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.slice(0, 6).map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group relative flex h-56 sm:h-64 items-center justify-center overflow-hidden rounded-dynamic bg-navy focus:outline-none focus:ring-2 focus:ring-sky"
            >
              {p.image && (
                // Services-grid hover pattern: pre-zoom (scale-110) at
                // rest, slide + blur on hover. eslint-disable-next-line
                // for plain <img> — keeping next/image off this layer
                // matches CcAreaServicesGrid's pattern (fast CSS-only
                // positioning, no LCP overhead inside an absolute layer).
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-110 object-cover transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:blur-sm"
                  style={{ color: "transparent" }}
                />
              )}
              {/* Gradient overlay — darkens slightly on hover so the
                  title (rest) and arrow badge (hover) stay legible. */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent group-hover:from-navy/95 transition-colors" />
              {/* Title (rest) → swap with arrow on hover. */}
              <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-5 sm:px-6 text-center">
                <h3 className="font-pairing-primary text-2xl font-bold tracking-tight text-white shadow-derivative-900 [text-shadow:_0_0_20px_var(--tw-shadow-color)] group-hover:hidden sm:text-3xl">
                  {p.title}
                </h3>
              </div>
              {/* Arrow-up-right badge — fades in on group-hover. */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="grab-service-projects-view-all-button inline-block rounded-full bg-navy px-8 py-3 font-pairing-secondary font-semibold text-white hover:bg-navy-light transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// Expert Process — eyebrow title + big subtitle + 4-card grid
// =========================================================================
type ProcessStep = { title: string; description: string };
type CcExpertProcessProps = {
  /** Used as the eyebrow above the subtitle (rendered tiny + uppercase via `.section-intro`). */
  title: string;
  /** The big visible heading. */
  subtitle?: string;
  steps: ProcessStep[];
};

export function CcExpertProcess({ title, subtitle, steps }: CcExpertProcessProps) {
  return (
    <section className="grab-process-section bg-gray-50 py-16 sm:py-20 md:py-24 px-4 sm:px-6 scroll-mt-24 sm:scroll-mt-28">
      <div className="mx-auto max-w-7xl">
        {/* Header — matches the design system. `title` renders as the
            sky-blue eyebrow, `subtitle` as the 56px navy heading. */}
        <div className="grab-process-header text-center mb-10 sm:mb-14">
          <span className="section-eyebrow grab-process-title">{title}</span>
          {subtitle && (
            <h2 className="section-heading grab-process-subtitle font-pairing-primary">
              {subtitle}
            </h2>
          )}
        </div>

        {/* Step cards — 4-up at lg+. Premium tile feel: white bg,
            rounded-dynamic, soft shadow, big sky-blue floating step
            number behind the content. */}
        <div className="grab-process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="grab-process-step relative overflow-hidden rounded-dynamic bg-white p-6 sm:p-7 shadow-md"
            >
              {/* Big translucent step number floats in the upper-right
                  corner — gives the card weight without crowding the
                  copy. */}
              <span
                aria-hidden
                className="grab-process-step-number pointer-events-none absolute -right-1 -top-2 font-pairing-primary text-7xl font-extrabold text-sky/20 leading-none select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="grab-process-step-title mb-3 font-pairing-primary text-xl sm:text-2xl font-bold text-navy">
                  {step.title}
                </h3>
                <p className="grab-process-step-description font-pairing-secondary text-base text-dark-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// FAQ flat list — Mint pattern. Every Q&A is fully visible (no
// click-to-expand). Numbered prefix in sky blue, question heading, plain
// answer text. The previous accordion variant was only used on the
// service slug page; no consumer-side compat layer needed.
// =========================================================================
type FaqItem = { question: string; answer: string };
type CcFaqFlatProps = {
  serviceName: string;
  items: FaqItem[];
  sectionId?: string;
};

export function CcFaqFlat({ serviceName, items, sectionId }: CcFaqFlatProps) {
  return (
    <div className="grab-faqs-v1 relative overflow-hidden bg-white scroll-mt-24 sm:scroll-mt-28" data-section-id={sectionId}>
      <div className="grab-faqs-v1-container relative mx-auto w-full max-w-7xl px-4 pt-12 pb-28 sm:px-6 sm:pb-20 md:py-16 xl:px-0">
        <div className="grab-faqs-v1-header mb-10 flex flex-col gap-4 text-center">
          <span className="grab-faqs-v1-overline text-base font-semibold uppercase leading-5 tracking-tight text-gray-500 lg:text-xl lg:leading-6">
            FAQ
          </span>
          <h2 className="grab-faqs-v1-title font-pairing-primary text-3xl font-bold leading-10 tracking-tight text-gray-900 lg:text-5xl lg:leading-[3.5rem]">
            {serviceName} FAQs
          </h2>
          <p className="grab-faqs-v1-description mx-auto max-w-2xl text-xl font-normal leading-7 tracking-tight text-gray-600 lg:text-2xl lg:leading-8">
            Common questions, straight answers.
          </p>
        </div>
        <ol className="mx-auto flex max-w-3xl flex-col gap-8">
          {items.map((q, i) => (
            <li key={i} className="grab-faqs-v1-item">
              <h3 className="grab-faqs-v1-question mb-2 flex items-baseline gap-3 font-pairing-primary text-xl font-semibold leading-8 tracking-tight text-gray-900 md:text-2xl">
                <span className="font-bold text-sky-text">{i + 1}.</span>
                <span>{q.question}</span>
              </h3>
              <div
                className="ml-7 font-pairing-secondary text-base text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(q.answer) }}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// =========================================================================
// Coastal Promise — verbatim custom-code block from production. Inline
// <style> + inline-SVG icons (formerly Font Awesome via cdnjs, switched
// to inline SVG to drop a 940ms render-blocking external stylesheet).
// =========================================================================

// Inline-SVG replacements for the 4 Font Awesome icons used in CcPromise.
// Paths copied from FA Solid v6 (free set). Inheriting `currentColor` so
// the existing CSS color rules in COASTAL_PROMISE_STYLE keep working.
function PromiseIconWater() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      fill="currentColor"
      aria-hidden
      style={{ width: "1em", height: "1em" }}
    >
      <path d="M269.5 69.9c11.1-7.9 25.9-7.9 37 0C329 85.4 356.5 96 384 96c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 149.7 417 160 384 160c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4C42.8 92.6 61 83.5 75.4 71.6c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 85.2 165.1 96 192 96c27.5 0 55-10.6 77.5-26.1zm0 160c11.1-7.9 25.9-7.9 37 0C329 245.4 356.5 256 384 256c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25c-29 15.6-61.5 25.8-94.5 25.8c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 245.2 165.1 256 192 256c27.5 0 55-10.6 77.5-26.1zm37 320c-22.5 15.5-50 26.1-77.5 26.1c-26.9 0-55.4-10.8-77.4-26.1l0 0c-11.9-8.5-28.1-7.8-39.2 1.7C97.9 405.6 79.7 414.7 61.6 418.9c-17.2 4-27.9 21.2-23.9 38.4s21.2 27.9 38.4 23.9c24.5-5.7 44.9-16.5 58.2-25c29 15.6 61.5 25.8 94.5 25.8c31.9 0 60.6-9.9 80.4-18.9c5.8-2.7 11.1-5.3 15.6-7.7c4.5 2.4 9.7 5.1 15.6 7.7c19.8 9 48.5 18.9 80.4 18.9c33 0 65.5-10.3 94.5-25.8c13.4 8.4 33.7 19.3 58.2 25c17.2 4 34.4-6.7 38.4-23.9s-6.7-34.4-23.9-38.4c-18.1-4.2-36.2-13.3-50.6-25.2c-11.1-9.4-27.3-10.1-39.2-1.7l0 0C439.4 405.4 411 416 384 416c-27.5 0-55-10.6-77.5-26.1c-11.1-7.9-25.9-7.9-37 0z" />
    </svg>
  );
}

function PromiseIconClock() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden
      style={{ width: "1em", height: "1em" }}
    >
      <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
    </svg>
  );
}

function PromiseIconCircleCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden
      style={{ width: "1em", height: "1em" }}
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
  );
}

function PromiseIconStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      fill="currentColor"
      aria-hidden
      style={{ width: "1em", height: "1em" }}
    >
      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
    </svg>
  );
}


const COASTAL_PROMISE_STYLE = `
.coastal-promise-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, rgb(var(--derivative-color-50)) 0%, rgb(var(--derivative-color-100)) 100%);
  position: relative;
  overflow: hidden;
}
.coastal-promise-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  width: 150%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
}
.coastal-promise-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.coastal-promise-header { text-align: center; margin-bottom: 60px; }
.coastal-promise-icon {
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
  background: linear-gradient(135deg, rgb(var(--primary-color)) 0%, rgb(var(--secondary-color)) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  animation: coastal-float 3s ease-in-out infinite;
}
@keyframes coastal-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
.coastal-promise-icon i { font-size: 60px; color: white; }
.coastal-promise-title {
  font-family: var(--font-pairing-primary), sans-serif;
  font-size: 3rem;
  font-weight: 800;
  color: rgb(var(--derivative-color-900));
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.coastal-promise-subtitle {
  font-family: var(--font-pairing-secondary), sans-serif;
  font-size: 1.25rem;
  color: rgb(var(--derivative-color-700));
  margin: 0 0 10px 0;
  line-height: 1.6;
}
.coastal-promise-tagline {
  font-family: var(--font-pairing-secondary), sans-serif;
  font-size: 1.1rem;
  color: rgb(var(--derivative-color-700));
  font-style: italic;
}
.coastal-promise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
}
.coastal-promise-card {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}
.coastal-promise-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg, rgb(var(--primary-color)) 0%, rgb(var(--secondary-color)) 100%);
}
.coastal-promise-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}
.coastal-promise-card-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  background: linear-gradient(135deg, rgb(var(--derivative-color-200)) 0%, rgb(var(--derivative-color-100)) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid rgb(var(--primary-color));
}
.coastal-promise-card-icon i { font-size: 36px; color: rgb(var(--derivative-color-900)); }
.coastal-promise-card-number {
  font-family: var(--font-pairing-primary), sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: rgb(var(--derivative-color-900));
  margin: 0 0 15px 0;
  letter-spacing: 1px;
}
.coastal-promise-card-text {
  font-family: var(--font-pairing-secondary), sans-serif;
  font-size: 1rem;
  color: rgb(var(--derivative-color-700));
  line-height: 1.6;
  margin: 0;
}
@media (max-width: 768px) {
  .coastal-promise-section { padding: 60px 15px; }
  .coastal-promise-title { font-size: 2rem; }
  .coastal-promise-subtitle { font-size: 1.1rem; }
  .coastal-promise-grid { grid-template-columns: 1fr; gap: 30px; }
}
`;

export function CcPromise() {
  return (
    <div className="custom-code-container">
      <div className="coastal-promise-section">
        <style dangerouslySetInnerHTML={{ __html: COASTAL_PROMISE_STYLE }} />
        <div className="coastal-promise-container">
          <div className="coastal-promise-header">
            <div className="coastal-promise-icon">
              <PromiseIconWater />
            </div>
            <h2 className="coastal-promise-title">The Coastal Clarity Promise</h2>
            <p className="coastal-promise-subtitle">Your time should never be taken for granted.</p>
            <p className="coastal-promise-tagline">That&apos;s why we&apos;ll always:</p>
          </div>
          <div className="coastal-promise-grid">
            <div className="coastal-promise-card">
              <div className="coastal-promise-card-icon"><PromiseIconClock /></div>
              <div className="coastal-promise-card-number">PUNCTUALITY</div>
              <p className="coastal-promise-card-text">
                Show up on time (which really means 10 minutes early).
              </p>
            </div>
            <div className="coastal-promise-card">
              <div className="coastal-promise-card-icon"><PromiseIconCircleCheck /></div>
              <div className="coastal-promise-card-number">INTEGRITY</div>
              <p className="coastal-promise-card-text">
                Do what we say we&apos;re going to do. Our word is everything, and we aim to exceed expectations in all aspects of the job.
              </p>
            </div>
            <div className="coastal-promise-card">
              <div className="coastal-promise-card-icon"><PromiseIconStar /></div>
              <div className="coastal-promise-card-number">EXCELLENCE</div>
              <p className="coastal-promise-card-text">
                Leave your home better than we found it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Testimonials strip — verbatim production cards (svg star icons, line-clamp,
// "by" italic) on bg-derivative-50.
// =========================================================================
type TestimonialEntry = { name: string; rating: number; text: string };
type CcTestimonialsProps = {
  heading?: string;
  subheading?: string;
  reviews: TestimonialEntry[];
};

export function CcTestimonials({ heading = "Peek Into Happy Home Views", subheading, reviews }: CcTestimonialsProps) {
  return (
    <div className="grab-testimonials-section border-b bg-derivative-50 py-16 sm:px-4 sm:py-24 xl:px-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-0 grab-testimonials-container">
        <div className="mx-auto mb-8 max-w-xl text-center sm:mb-14">
          <h2 className="grab-testimonials-title mb-3 font-pairing-primary text-3xl font-bold text-derivative-900">
            {heading}
          </h2>
          {subheading && (
            <p className="grab-testimonials-subheader font-pairing-secondary text-xl text-derivative-700">
              {subheading}
            </p>
          )}
        </div>
        {/* Carousel handles single-page (≤3 reviews) and multi-page
            (rotates 3-up, auto-advance + manual controls) cases. */}
        <TestimonialsCarousel reviews={reviews} />
      </div>
    </div>
  );
}

// =========================================================================
// Testimonials grid — Mint's `.grab-testimonials-section` 3-up static
// variant used on service pages. No carousel mechanics, no autoplay, no
// pagination — just the first 3 reviews laid out in a clean responsive
// grid against a light-gray background. Adopts the redesign tokens
// (`.section-eyebrow` / `.section-heading` / `.section-subtitle`) so the
// section header matches the rest of the redesigned page system.
//
// CcTestimonials (carousel) is intentionally preserved alongside this —
// it's used on about-us / service-areas / contact-us, where a rotation
// is still desired. Service pages flip to the static grid per Mint.
// =========================================================================
type CcTestimonialsGridProps = {
  heading?: string;
  subheading?: string;
  /** Optional eyebrow above the heading. Defaults to "Reviews". */
  eyebrow?: string;
  reviews: TestimonialEntry[];
};

export function CcTestimonialsGrid({
  heading = "What our neighbors are saying",
  subheading,
  eyebrow = "Reviews",
  reviews,
}: CcTestimonialsGridProps) {
  // Static 3-up — Mint's pattern. Take the first 3 reviews; if the caller
  // passes fewer, render what we have so the section never disappears.
  const visible = reviews.slice(0, 3);
  if (visible.length === 0) return null;

  return (
    <div className="grab-testimonials-section bg-gray-50 py-16 sm:py-24 px-4 sm:px-6 scroll-mt-24 sm:scroll-mt-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 sm:mb-14 max-w-2xl text-center">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="section-heading">{heading}</h2>
          {subheading && (
            <p className="section-subtitle">{subheading}</p>
          )}
        </div>

        <div className="grab-testimonials-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visible.map((r, i) => (
            <figure
              key={i}
              className="grab-testimonial-card flex min-h-[200px] sm:min-h-[240px] flex-col justify-between rounded-dynamic bg-white p-5 sm:p-9 shadow-md"
            >
              <blockquote className="grab-testimonial-content mb-6 line-clamp-[12] font-pairing-secondary text-base sm:text-lg leading-[1.8] tracking-tight text-derivative-900">
                {r.text}
              </blockquote>
              <figcaption className="flex flex-wrap items-baseline gap-x-1.5">
                <div
                  className="grab-testimonial-stars mr-1.5 flex gap-1"
                  role="img"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <svg
                      key={j}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="grab-testimonial-star h-4 w-4 fill-current text-yellow-400"
                      aria-hidden
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <i className="grab-testimonial-by font-pairing-secondary tracking-tight text-derivative-700">
                  by
                </i>
                <span className="grab-testimonial-author font-pairing-primary font-semibold uppercase tracking-tight text-derivative-900">
                  {r.name}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Home Hero — verbatim grab-hero-section. Full-bleed image bg with primary +
// dark double overlays, 5-star Google rating row, big heading, dual CTAs.
// =========================================================================
type CcHomeHeroProps = {
  heading: string;
  /** Optional supporting line under the h1. Rendered as a paragraph. */
  subheading?: string;
  /** Star-rating link target (Google reviews). */
  reviewsHref?: string;
  /** Visible rating count, e.g. "5 stars on Google" */
  reviewsLabel?: string;
  image?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Enables click-to-edit when the editor is active. */
  sectionId?: string;
};

export function CcHomeHero({
  heading,
  subheading,
  reviewsHref = "https://search.google.com/local/reviews?placeid=ChIJu0aLGqEysaQRPkKdQ2gvRcc",
  reviewsLabel = "5 stars on Google",
  image,
  primaryCta = { label: "Get a fast quote", href: "/contact-us" },
  secondaryCta = { label: "Call Us", href: PHONE_HREF },
  sectionId,
}: CcHomeHeroProps) {
  return (
    // Full-viewport hero. Section min-height = 100vh so the hero
    // image and headline dominate the first screen the way dirtymint
    // and other modern home-service sites do. Content is vertically
    // centered within that area; overlays stay absolute behind the
    // text so the bg photo bleeds edge-to-edge.
    <section
      data-section-id={sectionId}
      // Mobile-first height: 640px keeps the CTA above the iPhone SE
      // 667px fold (audit 2026-05-12). md+ uses min-h (was a fixed
      // h-[876px]) so when the oversized headline makes the content
      // taller than 876px it grows instead of clipping.
      //
      // pt-28 sm:pt-32 (112/128px) is the fixed-navbar safe-area: the
      // floating nav capsule is ~92px tall on mobile / ~101px at sm+,
      // so this top padding guarantees the rating row clears it. The
      // padding lives on the SECTION (not the centered content) so that
      // even when `items-center` has no slack — i.e. content ≥ section
      // height, the common case for this hero — the content still
      // starts below the nav instead of tucking under it (audit
      // 2026-06-18: the 5-star row was rendering 6px behind the nav).
      className="grab-hero-section relative min-h-[640px] md:min-h-[876px] overflow-hidden flex items-center justify-center bg-navy pt-28 sm:pt-32 scroll-mt-24 sm:scroll-mt-28"
    >
      {image && (
        // Next/Image generates a responsive srcset so mobile devices get
        // a ~750w / 828w variant instead of the full ~3840w original.
        // Lighthouse on home was flagging ~1MB of "Improve image delivery"
        // savings before this swap; with `priority` + `sizes="100vw"`,
        // the browser pre-fetches the right-sized variant eagerly for LCP.
        <Image
          src={image}
          alt="Divine Shine window cleaning and pressure washing in Redding"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="grab-hero-background object-cover"
        />
      )}
      {/* Primary tint disabled (opacity-0) per Mint redesign — the bg
          photo reads through cleaner without the navy wash. The dark
          overlay is dropped to opacity-10 so the photo stays bright
          while still giving the headline enough contrast (paired with
          the text-shadow on the h1 below). */}
      <div className="grab-hero-overlay-primary absolute inset-0 bg-primary opacity-0" />
      <div className="grab-hero-overlay-dark absolute inset-0 bg-derivative-900 opacity-10" />

      {/* Left-aligned content like dirtymint.com — rating row →
          oversized headline → subhead → single primary CTA. The
          secondary "Call Us" button was dropped from the hero
          2026-05-11 (sticky bottom bar covers that need). */}
      <div className="grab-hero-content relative mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 xl:px-12">
        <div className="grab-hero-text-container flex max-w-3xl flex-col items-start gap-6 text-left">
          {/* Rating row — wrapped in a single frosted pill so the stars
              + count read as a discrete UI element on busy hero photos.
              Audit 2026-05-12: without a wrapper bg the row vanished on
              bright sections of the photo. The inner stars div is
              transparent now (was bg-white/30) so the white/15 wash
              isn't double-tinted. */}
          <div className="grab-hero-rating inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-2">
            <div className="inline-flex gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 fill-current"
                  aria-hidden
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              href={reviewsHref}
              className="grab-hero-rating-text inline-block font-pairing-secondary text-sm text-white"
            >
              {reviewsLabel}
            </a>
            {/* Google logo PNG removed per Mint redesign — the stars +
                "5 stars on Google" label carry enough signal without
                the external Wikimedia asset. */}
          </div>

          {/* Oversized headline — capped at 88px at lg+ (Mint's measured
              ceiling). text-shadow gives the headline lift against the
              now-much-lighter overlay (we dropped the dark layer to
              opacity-10 so the bg photo reads cleanly).
              Mobile base is text-4xl (36px), not text-5xl: the long
              geo-keyword H1 wraps to 6 lines at 48px and shoves the CTA
              below the iPhone SE 667px fold. 36px fits it in 4 lines with
              the CTA ~90px above the fold. sm:+ keeps the original sizing. */}
          <h1
            className="grab-hero-headline font-pairing-primary text-4xl font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[88px]"
            style={{ textShadow: "0 0 30px rgba(0,0,0,0.8)" }}
          >
            {heading}
          </h1>

          {subheading && (
            // Mobile drops to text-base (16px) so subhead + CTA both sit
            // above the iPhone SE fold (audit 2026-05-12). sm:+ keeps
            // the original 24px presence for tablet/desktop.
            <p className="grab-hero-subheading max-w-2xl font-pairing-secondary text-base sm:text-2xl font-light text-white/90 leading-relaxed">
              {subheading}
            </p>
          )}

          {/* Single primary CTA — pill, uppercase, mint-style arrow.
              Larger than the rest of the page's CTAs because it's the
              first conversion ask. */}
          <div className="grab-hero-buttons mt-2">
            <Link
              href={primaryCta.href}
              className="grab-cta-buttons-primary inline-flex items-center gap-2 rounded-dynamic bg-sky px-8 py-4 font-pairing-secondary text-base font-bold uppercase tracking-wide text-navy shadow-lg hover:bg-white transition-colors"
            >
              {primaryCta.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// About / Our Story — verbatim grab-about-section. Two-column with text on
// primary navy bg (60%) and image (40%) with rounded-dynamic corners.
// =========================================================================
type CcAboutProps = {
  heading?: string;
  bodyHtml: string;
  image?: string;
  imageAlt?: string;
  sectionId?: string;
};

export function CcAbout({
  heading = "Our Story",
  bodyHtml,
  image,
  imageAlt = "Our Story",
  sectionId,
}: CcAboutProps) {
  return (
    <div className="grab-about-section bg-white" data-section-id={sectionId}>
      <div className="mx-auto max-w-7xl px-4 sm:px-0 grab-about-container py-12 md:px-3 md:py-20 xl:px-0">
        <div className="grab-about-wrapper mx-auto flex max-w-7xl flex-col text-primaryContrast md:flex-row">
          <div className="grab-about-content bg-primary py-12 md:w-3/5 md:rounded-dynamic md:py-20 order-1 px-8 md:pl-12 md:pr-20">
            <h2 className="grab-about-header mb-6 font-pairing-primary text-3xl font-medium md:text-4xl">
              {heading}
            </h2>
            <div
              className="grab-about-text prose font-pairing-secondary text-primaryContrast"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(bodyHtml) }}
            />
          </div>
          <div className="grab-about-image-wrapper relative h-auto grow md:w-2/5 md:basis-0 order-2">
            <div className="grab-about-image-background absolute inset-0 rounded-dynamic md:rounded-r-dynamic" />
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={imageAlt}
                src={image}
                width={500}
                height={500}
                loading="lazy"
                className="grab-about-image top-0 z-10 h-full w-full object-cover shadow-xl md:absolute md:top-4 md:h-[calc(100%_-_32px)] md:rounded-dynamic md:-left-6"
                style={{ color: "transparent" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Map Section — verbatim grab-map-section. Google Map background (full bleed
// on desktop) with a sticky info panel on the right listing service areas.
// =========================================================================
// `number` is kept for type-compat with existing call sites but no
// longer rendered — the new "Proudly Serving" layout uses a clean
// list without numeric prefixes.
type AreaListItem = { number?: string; name: string; href: string };
type CcMapSectionProps = {
  heading?: string;
  /** Embed src for the map iframe — usually a Google Maps share URL. */
  mapEmbedSrc?: string;
  areas: AreaListItem[];
};

export function CcMapSection({
  heading = "Proudly Serving",
  mapEmbedSrc,
  areas,
}: CcMapSectionProps) {
  return (
    // "PROUDLY SERVING" layout — a contained map on the left + clean
    // area list on the right under a centered header. Replaces the
    // previous full-bleed Rebolt-style map that dominated the
    // viewport. Inspired by dirtymint.com's treatment.
    <section className="grab-map-section bg-white pt-16 pb-28 sm:py-20 md:py-24 px-5 sm:px-6 scroll-mt-24 sm:scroll-mt-28">
      <div className="mx-auto max-w-7xl">
        {/* Centered header — eyebrow + heading via the new utility
            classes from the redesign tokens (Agent 1 PR). Literal
            Tailwind classes alongside act as a safe fallback. */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-eyebrow block text-sky-text text-sm font-semibold capitalize tracking-[0.3em]">
            Service Areas
          </span>
          <h2 className="section-heading grab-map-title mt-3 font-heading text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-navy">
            {heading}
          </h2>
          <p className="mt-3 text-dark-muted text-base sm:text-lg">
            Professional exterior cleaning across Redding & Shasta County
          </p>
        </div>

        {/* Two-column: map left, list right (stacks on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Map — contained, rounded card. Square-ish aspect so it
              doesn't dominate any one viewport. */}
          <div className="grab-map-container relative aspect-[4/3] w-full overflow-hidden rounded-dynamic shadow-sm">
            {mapEmbedSrc ? (
              <iframe
                src={mapEmbedSrc}
                title="Redding service area map"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="h-full w-full bg-derivative-50" />
            )}
          </div>

          {/* Area list — two columns on sm+ when there's a 2nd-tier
              column to render. The split is done in JS rather than CSS
              multi-column so each <ul> can have its own divide-y border
              (CSS columns can break divider behavior across the gap). */}
          <AreaList areas={areas} />
        </div>
      </div>
    </section>
  );
}

function AreaList({ areas }: { areas: AreaListItem[] }) {
  // First half (or all, if <= 8) in column 1; the rest in column 2.
  const splitAt = Math.ceil(areas.length / 2);
  const col1 = areas.slice(0, splitAt);
  const col2 = areas.slice(splitAt);

  // Single column when 8 or fewer areas — no need for the grid.
  if (col2.length === 0) {
    return (
      <ul className="grab-service-areas-list divide-y divide-gray-200">
        {col1.map((a, i) => (
          <AreaRow key={i} area={a} />
        ))}
      </ul>
    );
  }

  return (
    <div className="grab-service-areas-list grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
      <ul className="divide-y divide-gray-200">
        {col1.map((a, i) => (
          <AreaRow key={i} area={a} />
        ))}
      </ul>
      <ul className="divide-y divide-gray-200 border-t border-gray-200 sm:border-t-0">
        {col2.map((a, i) => (
          <AreaRow key={i} area={a} />
        ))}
      </ul>
    </div>
  );
}

function AreaRow({ area }: { area: AreaListItem }) {
  return (
    <li className="grab-service-area-item">
      <Link
        href={area.href}
        className="group flex items-center justify-between gap-3 py-4 sm:py-4 font-pairing-secondary font-medium tracking-normal text-navy hover:text-navy-light transition-colors"
      >
        <span className="grab-service-area-name text-sm sm:text-base">
          {area.name}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="grab-service-area-arrow shrink-0 text-navy/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-navy"
          aria-hidden
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </li>
  );
}

// =========================================================================
// Single Featured Testimonial — verbatim grab-testimonial-section (singular).
// Big quote on primaryDarker bg with 5 yellow stars + author + decorative
// quote glyph in the bottom-right.
// =========================================================================
type CcSingleTestimonialProps = {
  text: string;
  author: string;
  rating?: number;
};

export function CcSingleTestimonial({ text, author, rating = 5 }: CcSingleTestimonialProps) {
  return (
    // Mint navy + optional photo background pattern. Quote sits in front
    // of the photo with z-10; decorative quote glyph absolute-positioned
    // bottom-right at z-0 behind the text. Photo path is a sensible
    // default — Chris will swap to a final asset later.
    <section className="grab-testimonial-section relative flex w-full flex-col gap-4 overflow-hidden bg-navy px-6 sm:px-12 py-24 scroll-mt-24 sm:scroll-mt-28">
      {/* Placeholder background photo — replace with final testimonial
          shot when Chris sources one. eslint-disable for plain <img> is
          intentional here: we want fast CSS-only positioning and to
          avoid Next/Image's layout overhead inside an absolute layer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        src="/images/divine-shine/house-washing.webp"
        loading="lazy"
        aria-hidden
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-30"
      />
      <div className="mx-auto max-w-3xl relative">
        <div className="grab-testimonial-wrapper">
          <p className="relative z-10 line-clamp-6 font-pairing-secondary text-2xl sm:text-3xl font-light text-white">
            &ldquo;{text}&rdquo;
          </p>
          <div className="grab-testimonial-rating relative z-10 mt-10 flex items-center gap-4">
            <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
              {Array.from({ length: rating }).map((_, j) => (
                <svg
                  key={j}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 fill-current text-yellow-400"
                  aria-hidden
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p className="grab-testimonial-author font-pairing-primary text-xl text-white">
              {author}
            </p>
          </div>
          {/* Decorative 128px quote glyph behind text (z-0). */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            fill="none"
            aria-hidden
            viewBox="0 0 134 84"
            className="grab-testimonial-quote-icon pointer-events-none absolute -bottom-2 right-0 z-0 h-32 w-32 fill-current text-navy-dark opacity-80"
          >
            <path d="M104.303 0c8.853 0 16.015 3.186 21.488 9.557C131.264 15.93 134 24.097 134 34.063c0 25.323-17.464 55.302-52.393 89.937l-2.414-2.451c6.277-8.168 11.267-16.664 14.97-25.486 3.54-8.822 5.31-16.582 5.31-23.28 0-4.412-1.287-8.087-3.862-11.028-2.737-2.94-5.634-5.228-8.692-6.862-3.22-1.633-6.117-4.574-8.692-8.822-2.736-4.084-4.105-9.394-4.105-15.929 0-8.495 2.898-15.683 8.692-21.565C88.61 2.86 95.772 0 104.303 0zM29.697 0c9.014 0 16.257 3.186 21.73 9.557 5.312 6.372 7.97 14.539 7.97 24.506 0 25.323-17.464 55.302-52.393 89.937l-2.414-2.451c6.277-8.168 11.267-16.664 14.97-25.486 3.541-8.822 5.311-16.582 5.311-23.28 0-4.412-1.288-8.087-3.863-11.028-2.736-2.94-5.634-5.228-8.692-6.862-3.22-1.633-6.117-4.574-8.692-8.822C.886 41.987-.402 36.677-.402 30.142c0-8.495 2.898-15.683 8.692-21.565C14.003 2.86 21.166 0 29.697 0z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// Service-Area Hero — radial gradient bg + image side-panel + heading.
// Service-area hero — matches the new CcHomeHero pattern: full-viewport
// height, left-aligned big headline + subhead, single uppercase primary
// CTA, no rating row (Google rating only on the home page). Restyled
// 2026-05-11 from the old Rebolt-port (gradient bg with split image/
// text columns).
// =========================================================================
type CcServiceAreaHeroProps = {
  heading: string;
  subheading?: string;
  image?: string;
  primaryCta?: { label: string; href: string };
  /** Enables click-to-edit when the editor is active. */
  sectionId?: string;
};

export function CcServiceAreaHero({
  heading,
  subheading,
  image,
  primaryCta = { label: "Get a fast quote", href: "/contact-us" },
  sectionId,
}: CcServiceAreaHeroProps) {
  return (
    <section
      data-section-id={sectionId}
      // pt-28 sm:pt-32 is the fixed-navbar safe-area (see CcHomeHero) so
      // the centered headline never tucks under the floating nav capsule
      // on short viewports.
      className="grab-service-area-hero relative min-h-screen overflow-hidden flex items-center justify-center bg-navy pt-28 sm:pt-32 scroll-mt-24 sm:scroll-mt-28"
    >
      {image && (
        <Image
          src={image}
          alt="Hero image"
          fill
          priority
          sizes="100vw"
          className="grab-service-area-hero-image object-cover"
        />
      )}
      <div className="absolute inset-0 bg-primary opacity-30" />
      <div className="absolute inset-0 bg-derivative-900 opacity-25" />

      <div className="grab-service-area-hero-content relative mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 xl:px-12">
        <div className="flex max-w-3xl flex-col items-start gap-6 text-left">
          {/* H1 — sized smaller than CcHomeHero (start at text-4xl on
              mobile, scale to text-6xl on desktop) since service-area
              headlines are typically longer "{City}, CA Window Cleaning"
              strings. text-shadow matches CcHomeHero for legibility
              against the photo bg. */}
          <h1
            className="grab-service-area-hero-header font-pairing-primary text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl"
            style={{ textShadow: "0 0 30px rgba(0,0,0,0.8)" }}
          >
            {heading}
          </h1>
          {subheading && (
            <p className="grab-service-area-hero-subheader max-w-2xl font-pairing-secondary text-base font-light text-white/90 sm:text-xl leading-relaxed">
              {subheading}
            </p>
          )}
          <div className="mt-2">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-dynamic bg-sky px-8 py-4 font-pairing-secondary text-base font-bold uppercase tracking-wide text-navy shadow-lg hover:bg-white transition-colors"
            >
              {primaryCta.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// Service-Area Contact Card — phone / email / map 3-column floating card.
// Sits with negative top margin to overlap the hero. Verbatim grab-service-area-map.
// =========================================================================
type CcAreaContactCardProps = {
  phone?: { label: string; href: string };
  /** Embed src for the map iframe (e.g. Google Maps share URL). */
  mapEmbedSrc?: string;
};

export function CcAreaContactCard({
  phone = { label: PHONE_DISPLAY, href: PHONE_HREF },
  mapEmbedSrc,
}: CcAreaContactCardProps) {
  return (
    <div className="grab-service-area-map relative z-10 -mt-12 grid max-w-full divide-y overflow-hidden bg-white shadow-lg md:mx-4 md:h-56 md:grid-cols-3 md:divide-x md:rounded-dynamic md:shadow-2xl lg:mx-8 xl:mx-auto xl:max-w-6xl">
      {/* Phone */}
      <div className="grab-service-area-map-phone-number flex h-48 flex-col items-center justify-center md:h-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="grab-service-area-map-phone-number-icon mb-6 h-8 w-8 text-primary"
          aria-hidden
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <strong className="grab-service-area-map-phone-number-header mb-1 font-pairing-primary text-lg font-medium">
          Phone Number
        </strong>
        <a
          href={phone.href}
          className="grab-service-area-map-phone-number-link font-pairing-secondary font-medium text-primary"
        >
          {phone.label}
        </a>
      </div>
      {/* Email */}
      <div className="flex h-48 flex-col items-center justify-center md:h-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="grab-service-area-map-email-us-icon mb-6 h-8 w-8 text-primary"
          aria-hidden
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <strong className="grab-service-area-map-email-us-header mb-1 font-pairing-primary text-lg font-medium">
          Email us
        </strong>
        <Link
          href="/contact-us"
          // The visible text reads "Click here" for prod parity, but it
          // sits below an "Email us" header. WCAG label-content-name
          // rule requires the accessible name to contain the visible
          // text, so the aria-label leads with "Click here" too.
          aria-label="Click here to email us via the contact form"
          className="grab-service-area-map-email-us-primary font-pairing-secondary font-medium text-primary"
        >
          Click here
        </Link>
      </div>
      {/* Map */}
      <div className="h-48 md:h-full col-span-1">
        {mapEmbedSrc ? (
          <iframe
            src={mapEmbedSrc}
            title="Service area map"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="h-full w-full bg-derivative-100" />
        )}
      </div>
    </div>
  );
}

// =========================================================================
// Service Area: Services Grid — eyebrow label + h2 + grid of service image
// cards with hover blur/translate effect. Verbatim grab-services-section.
// =========================================================================
type AreaServiceItem = {
  name: string;
  description?: string;
  href: string;
  image: string;
};
type CcAreaServicesGridProps = {
  cityName: string;
  services: AreaServiceItem[];
  label?: string;
};

// Bento layout — 2 flagship tiles share row 1 (Window + Solar), and every
// other service tile is a uniform `col-span-3` (4 per row). At lg+ the grid
// is a 12-col rhythm with all rows at 400px (no row-spans). Mobile collapses
// to single column, sm uses a 2-col layout.
//
// Visual target (lg+, 12-col grid, auto-rows 400px to match Mint's tile
// presence):
//   [ WINDOW (6x1)         ][ SOLAR (6x1)              ]
//   [ PRESSURE (3x1) ][ ROOF (3x1) ][ SOFT (3x1) ][ HOUSE (3x1) ]
//   [ GUTTER (3x1) ][ HOLIDAY (3x1) ][ PERMANENT (3x1) ][ ...    ]
// Audit 2026-05-12 found tablets sitting at 1-tile-per-row because the
// flagship tiles (Window + Solar) were spanning both columns at `sm`,
// which visually presents as a single column at the top of the grid.
// At sm/md (640–1023px) every tile is now col-span-1 so the user sees
// a clean 2-col rhythm. Bento with flagship-6 / others-3 is preserved
// at lg+ where there's enough horizontal room to read.
const SERVICE_BENTO_SPANS: Record<string, string> = {
  "window-cleaning":      "sm:col-span-1 lg:col-span-6 lg:row-span-1",
  "solar-panel-cleaning": "sm:col-span-1 lg:col-span-6 lg:row-span-1",
  "pressure-washing":     "sm:col-span-1 lg:col-span-3 lg:row-span-1",
  "roof-cleaning":        "sm:col-span-1 lg:col-span-3 lg:row-span-1",
  "soft-washing":         "sm:col-span-1 lg:col-span-3 lg:row-span-1",
  "house-washing":        "sm:col-span-1 lg:col-span-3 lg:row-span-1",
  "gutter-cleaning":      "sm:col-span-1 lg:col-span-3 lg:row-span-1",
  "holiday-lighting":     "sm:col-span-1 lg:col-span-3 lg:row-span-1",
  "permanent-lighting":   "sm:col-span-1 lg:col-span-3 lg:row-span-1",
};
const SERVICE_BENTO_FALLBACK = "sm:col-span-1 lg:col-span-3 lg:row-span-1";

/**
 * Derive the service slug from its href (e.g. "/services/window-cleaning"
 * → "window-cleaning"). Used to look up bento spans without changing the
 * AreaServiceItem shape (all call sites pass `{ name, description, href,
 * image }` so we avoid threading a new field through every caller).
 */
function slugFromHref(href: string): string {
  const parts = href.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
}

export function CcAreaServicesGrid({
  // `cityName` retained for backward-compat with existing call sites but
  // no longer rendered in the heading — the home redesign moves to a
  // generic "Our Services" header per the Mint pattern.
  cityName: _cityName,
  services,
  label = "Services",
}: CcAreaServicesGridProps) {
  return (
    <div className="grab-services-section bg-white py-16 sm:py-20 scroll-mt-24 sm:scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-0">
        <div className="grab-services-header text-center mb-10 md:mb-12">
          {/* Eyebrow + heading — Mint pattern. The `section-eyebrow` /
              `section-heading` utility classes come from the global
              redesign tokens (Agent 1 PR). Literal Tailwind classes
              alongside act as a safe fallback until those land. */}
          <span className="section-eyebrow grab-services-label block text-sky-text text-sm font-semibold capitalize tracking-[0.3em]">
            {label}
          </span>
          <h2 className="section-heading grab-services-title mt-3 font-pairing-primary text-4xl font-extrabold text-navy md:text-5xl lg:text-[56px]">
            Our Services
          </h2>
        </div>
        {/* Bento grid — 400px uniform rows at lg+ to match Mint's heavier
            tile presence. 8px gap (gap-2). h-full on the card stretches
            it to fill whatever spans its wrapper claims. */}
        <div className="grab-services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 auto-rows-[20rem] sm:auto-rows-[22rem] lg:auto-rows-[400px]">
          {services.map((s, i) => {
            const span = SERVICE_BENTO_SPANS[slugFromHref(s.href)] ?? SERVICE_BENTO_FALLBACK;
            return (
            <div key={i} className={span}>
              <Link
                href={s.href}
                className="grab-service-card group relative flex h-full w-full shrink-0 grow basis-full overflow-hidden rounded-dynamic border-2 border-transparent md:border-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${s.name} image`}
                  src={s.image}
                  loading="lazy"
                  className="grab-service-image inset-0 z-0 scale-110 object-cover transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:blur-sm"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    color: "transparent",
                  }}
                />
                <div className="grab-service-overlay absolute inset-0 z-10 flex h-full w-full flex-col items-center justify-center bg-derivative-900/20 px-8 py-6 text-center hover:bg-derivative-900/25 lg:px-10">
                  <h3 className="grab-service-name font-pairing-primary text-2xl font-bold tracking-tight text-white shadow-derivative-900 [text-shadow:_0_0_20px_var(--tw-shadow-color)] group-hover:hidden sm:text-3xl">
                    {s.name}
                  </h3>
                  {s.description && (
                    <p className="grab-service-description hidden font-pairing-secondary font-medium text-white shadow-derivative-900 [text-shadow:_0_0_3px_var(--tw-shadow-color)] group-hover:block">
                      {s.description}
                    </p>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="grab-service-arrow absolute bottom-6 left-1/2 mt-4 h-8 w-8 -translate-x-1/2 rounded-dynamic border border-white p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </div>
              </Link>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Free-Form Body — h2 + prose-lg HTML (used by area pages for SEO copy).
// Verbatim grab-free-form section.
// =========================================================================
type CcFreeFormBodyProps = {
  heading: string;
  bodyHtml: string;
  sectionId?: string;
};

export function CcFreeFormBody({ heading, bodyHtml, sectionId }: CcFreeFormBodyProps) {
  return (
    <div className="grab-free-form bg-white scroll-mt-24 sm:scroll-mt-28" data-section-id={sectionId}>
      <div className="mx-auto max-w-7xl px-4 sm:px-0 grab-free-form-container py-12 md:py-20">
        <div className="grab-free-form-content mx-auto max-w-3xl">
          {/* Header uses the global section-header system
              (`.section-eyebrow` + `.section-heading`) to match the
              redesigned home / service pages. */}
          <div className="mb-10 text-center">
            <span className="section-eyebrow">Local Roots</span>
            <h2 className="section-heading grab-free-form-header font-pairing-primary">
              {heading}
            </h2>
          </div>
          <div className="grab-free-form-content-wrapper flex flex-col gap-2">
            <div
              className="grab-free-form-content-text prose-lg font-pairing-secondary text-derivative-900 [&_h3]:font-semibold [&_img]:mx-auto [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(bodyHtml) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Team Grid — verbatim grab-team. About-us "Our Awesome Team" 2-up grid
// with square photos, name, title, bio.
// =========================================================================
type TeamMember = {
  name: string;
  title: string;
  bio?: string;
  image: string;
};
type CcTeamGridProps = {
  heading?: string;
  subheading?: string;
  members: TeamMember[];
  sectionId?: string;
};

export function CcTeamGrid({
  heading = "Our Awesome Team",
  subheading = "We are a team of professionals.",
  members,
  sectionId,
}: CcTeamGridProps) {
  return (
    <div className="grab-team bg-white" data-section-id={sectionId}>
      <div className="grab-team-container max-w-screen-3xl py-17 mx-auto px-10">
        <div className="mb-9 flex flex-col gap-4">
          {/* Mobile-first responsive sizing: 30px → 36px → 48px. Was raw
              `text-5xl` (48px) with no responsive prefix, which wrapped
              "Our Awesome Team" to 3 single-word lines at 375 ("Our /
              Awesome / Team"). Matches the .section-heading scaling
              pattern used elsewhere on the site. */}
          <h2 className="grab-team-header font-pairing-primary text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.25] text-derivative-900">
            {heading}
          </h2>
          <p className="grab-team-subheader font-pairing-secondary text-lg leading-[1.25] text-derivative-600">
            {subheading}
          </p>
        </div>
        <div className="grab-team-grid grid gap-8 grid-cols-1 md:grid-cols-2">
          {members.map((m, i) => (
            <div key={i} className="grab-team-grid-item flex w-full flex-col gap-6">
              <div className="grab-team-grid-item-image relative isolate aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={m.name}
                  src={m.image}
                  width={200}
                  height={350}
                  loading="lazy"
                  className="grab-team-grid-item-image-image aspect-square h-full w-full rounded-2xl object-cover"
                  style={{ color: "transparent" }}
                />
              </div>
              <div className="flex flex-col gap-3 p-3">
                <div className="flex flex-col gap-1">
                  <p className="grab-team-grid-item-name font-pairing-primary text-2xl font-semibold leading-[1.3] text-derivative-900">
                    {m.name}
                  </p>
                  <p className="grab-team-grid-item-title block font-pairing-secondary leading-[1.5] text-derivative-700">
                    {m.title}
                  </p>
                </div>
                {m.bio && (
                  <p className="grab-team-grid-item-bio font-pairing-secondary leading-[1.5] text-derivative-700">
                    {m.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Contact Section — verbatim grab-contact-section. Background image with
// dark overlay, h1 + subheader, then Jobber embedded work-request form.
// =========================================================================
type CcContactSectionProps = {
  heading?: string;
  subheading?: string;
  bgImage?: string;
  /** Jobber clienthub_id, e.g. "23960646-12b5-4391-8fc6-39540b25270f-1345667" */
  jobberClientHubId?: string;
  /** Jobber form_url. */
  jobberFormUrl?: string;
};

export function CcContactSection({
  heading = "Contact us",
  subheading = "We'd love to hear from you and answer any questions you may have.",
  bgImage,
  jobberClientHubId = "23960646-12b5-4391-8fc6-39540b25270f-1345667",
  jobberFormUrl = "https://clienthub.getjobber.com/client_hubs/23960646-12b5-4391-8fc6-39540b25270f/public/work_request/embedded_work_request_form?form_id=1345667&utm_source=Website&source=Website",
}: CcContactSectionProps) {
  return (
    // Symmetric mobile padding so the form card centers cleanly. Was
    // `pl-2 md:px-4` (asymmetric — 8px left, 0px right) combined with
    // `mr-5` on the form card, which left 60px of empty space on the
    // right at 375 and compressed the Jobber iframe to 267px wide.
    <div className="grab-contact-section relative py-24 px-4 sm:px-6">
      {bgImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt="Contact form background"
          src={bgImage}
          width={1200}
          height={800}
          loading="lazy"
          className="grab-contact-bg-image absolute inset-0 h-full w-full object-cover"
          style={{ color: "transparent" }}
        />
      )}
      <div className="grab-contact-bg-overlay absolute inset-0 bg-derivative-900/70" />
      <div className="mx-auto max-w-7xl px-4 sm:px-0">
        <div className="grab-contact-content relative flex flex-col items-center gap-10">
          <div className="grab-contact-header-wrapper mb-12 flex flex-col justify-center text-center text-white">
            <h1 className="grab-contact-header mb-4 font-pairing-primary text-4xl font-bold lg:text-6xl">
              {heading}
            </h1>
            <p className="grab-contact-subheader font-pairing-secondary text-xl md:text-2xl">
              {subheading}
            </p>
          </div>
          <div className="grab-contact-form-wrapper relative z-[1] w-full sm:w-2/3 md:w-1/2">
            {/* Drop `mr-5` so the form card sits centered in its column
                with symmetric gutters on both sides — was pushing the
                card 20px left, compounding the asymmetric section padding. */}
            <div className="grab-contact-form-card relative rounded-dynamic bg-white p-6">
              <h3 className="grab-contact-form-title mb-8 mt-4 font-pairing-primary text-2xl font-semibold">
                Get in touch!
              </h3>
              <form
                className="grab-contact-form relative flex select-none flex-col gap-1 grab-jobber-embed"
                style={{ width: "100%", maxWidth: "100%" }}
              >
                {/* No min-height reservation. Tried `min-h-[1100px]` to
                    flatten the ~0.07 CLS from Jobber's mount; reverted because
                    Jobber's initial render is only ~158px (the form expands on
                    interaction), and the over-reservation caused everything
                    below the form to shift up ~942px when Jobber settled —
                    pushing CLS to 1.22 ("Bad"). Original 0.07 is already
                    inside the Core Web Vitals "Good" threshold (<0.10). */}
                <div
                  id={jobberClientHubId}
                  className="jobber-inline-work-request"
                />
                {/* Jobber loader reads clienthub_id + form_url off itself when
                    it boots. next/script with custom attrs does the right thing. */}
                <Script
                  src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"
                  strategy="afterInteractive"
                  // @ts-expect-error — Jobber reads these as DOM attributes
                  clienthub_id={jobberClientHubId}
                  form_url={jobberFormUrl}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// Closing CTA — verbatim production: <strong> headline with text-shadow,
// linear-gradient overlay, large secondary-bg primary button, bordered
// outline secondary button with phone icon BEFORE the label.
// =========================================================================
type CcCtaSectionProps = {
  heading: string;
  subheading?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundImage?: string;
};

export function CcCtaSection({
  heading,
  subheading,
  primaryCta = { label: "Get a fast quote", href: "/contact-us" },
  secondaryCta = { label: "Call Us", href: PHONE_HREF },
  // Default to an existing project hero photo so the closing CTA never
  // renders against an empty gradient when callers don't pass an image.
  backgroundImage = "/images/divine-shine/trucks-fleet.webp",
}: CcCtaSectionProps) {
  const sectionStyle: React.CSSProperties = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : { backgroundImage: "none" };

  return (
    // Restored `bg-fixed` parallax. A 12rem (192px) solid-navy spacer
    // bridges from the section into the footer (fixes the visible seam
    // when scrolling past into the footer — parallax-jank workaround).
    // The spacer renders as a SIBLING below the section, NOT as an
    // absolutely-positioned child, so it can't overlap the CTA buttons.
    // The section is min-h-[80vh] so content centers vertically inside
    // ~690px+ on desktop.
    <>
    <div
      className="grab-cta-section relative bg-cover bg-center bg-fixed flex items-center min-h-[80vh] px-4 py-20 sm:px-6 sm:py-24 md:py-28 scroll-mt-24 sm:scroll-mt-28"
      style={sectionStyle}
    >
      <div
        className="grab-cta-gradient absolute left-0 top-0 h-full w-full bg-transparent"
        style={{ backgroundImage: "linear-gradient(180deg, #223461B3 0%, #223461 100%)" }}
      />
      <div className="grab-cta-wrapper relative z-10 mx-auto flex h-full w-full max-w-4xl flex-col justify-center text-center">
        <strong
          className="grab-cta-header mb-2 font-pairing-primary text-4xl font-black text-primaryContrast sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ textShadow: "0 0 30px rgba(0,0,0,0.4)" }}
        >
          {heading}
        </strong>
        {subheading && (
          <p className="grab-cta-subheader my-6 font-pairing-secondary text-xl leading-relaxed text-primaryContrast sm:text-2xl">
            {subheading}
          </p>
        )}
        {/* Two-button Mint pattern — primary pill CTA + secondary
            outlined pill (phone icon before label). The sticky bottom
            bar still covers Call/Text/Email/Book persistently, but the
            closing CTA gets the two-button treatment to give the
            "Call Us" affordance more visual weight on the final ask. */}
        <div className="grab-cta-buttons mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <BrandCtaButton href={primaryCta.href} variant="dark-bg" size="lg">
            {primaryCta.label}
          </BrandCtaButton>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3 font-pairing-secondary font-medium text-white transition-colors hover:bg-white/15"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </div>
    {/* Seam-fix spacer — 12rem of solid navy AFTER the section so the
        parallax photo never butts up against the footer with a visible
        boundary on scroll. Lives as a sibling (not an absolute child)
        so it can never overlap the section's CTA buttons. Matches the
        footer's `from-primary` navy `#223461`. */}
    <div aria-hidden className="h-48 bg-primary" />
    </>
  );
}
