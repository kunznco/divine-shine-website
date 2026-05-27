/**
 * ServiceHero — hero for /services/[slug] pages. Matches the redesigned
 * `CcHomeHero` pattern (left-aligned headline, light overlays, text-shadow
 * glow on the h1, single uppercase primary CTA), but uses a shorter fixed
 * height — service pages have a lot more content below the hero, so the
 * viewport-filling 100vh treatment of the home hero would push that
 * content too far down. Mobile clears the 667px iPhone SE fold; desktop
 * settles around 700px for a confident presence without dominating.
 */

import Image from "next/image";
import Link from "next/link";

type CcServiceHeroProps = {
  heading: string;
  subheading?: string;
  image?: string;
  primaryCta?: { label: string; href: string };
  /** When the editor is active, set this to enable click-to-edit. */
  sectionId?: string;
};

export function CcServiceHero({
  heading,
  subheading,
  image,
  primaryCta = { label: "Get a fast quote", href: "/contact-us" },
  sectionId,
}: CcServiceHeroProps) {
  return (
    <section
      data-section-id={sectionId}
      // Fixed height: 640px mobile (clears the iPhone SE 667px fold for
      // CTA visibility) → 700px desktop. Deliberately shorter than the
      // home hero (876px) so the body content below reaches above the
      // fold faster on service pages.
      className="grab-service-hero relative min-h-[640px] md:min-h-[700px] md:h-[700px] overflow-hidden flex items-center justify-center bg-navy scroll-mt-24 sm:scroll-mt-28"
    >
      {image && (
        <Image
          src={image}
          alt="Hero image"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="grab-service-hero-background object-cover"
        />
      )}
      {/* Light overlays — matches the home hero redesign. Primary tint
          stays disabled (opacity-0) so the bg photo reads cleanly; the
          dark layer is a faint opacity-10 wash paired with a text-shadow
          on the headline below for legibility. */}
      <div className="grab-service-hero-overlay-primary absolute inset-0 bg-primary opacity-0" />
      <div className="grab-service-hero-overlay-dark absolute inset-0 bg-derivative-900 opacity-10" />

      <div className="grab-service-hero-container relative mx-auto w-full max-w-7xl px-5 pt-28 pb-12 sm:px-8 xl:px-12">
        <div className="grab-service-hero-container-content flex max-w-3xl flex-col items-start gap-6 text-left">
          {/* Headline — capped at text-7xl (96px). Smaller than the
              home hero's 88px ceiling because the service hero is
              shorter; balanced visual weight. text-shadow gives the
              headline lift against the now-much-lighter overlay.
              Mobile drops one step to text-4xl (36px) so the
              "Professional {Service} Services" pattern wraps to 2–3
              lines on 375 instead of 4 single-word lines. */}
          <h1
            className="grab-service-hero-container-content-header font-pairing-primary text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 0 30px rgba(0,0,0,0.8)" }}
          >
            {heading}
          </h1>
          {subheading && (
            // Mobile drops to text-base (16px) so subhead + CTA both
            // stay above the iPhone SE fold; sm:+ keeps the 24px
            // presence on tablet/desktop. Matches the home hero subhead.
            <p className="grab-service-hero-container-content-subheader max-w-2xl font-pairing-secondary text-base sm:text-2xl font-light text-white/90 leading-relaxed">
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
