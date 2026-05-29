/**
 * CcHowItWorks — 4-step "how it works" process for the home page.
 *
 * Visual model (2026-05-12 Mint-aligned redesign): heavy restyle of the
 * previous flat-white-card version. Content (4 STEPS) unchanged.
 *
 *   - Section sits on a dark "premium" navy field (rgba 27,58,92 / 0.92).
 *     Our navy (#1B3A5C) is darker than Mint's, so we use 92% opacity to
 *     match the same dark-premium feel Mint hits with their lighter navy
 *     at 50%.
 *   - Each step is a "premium tile": photo on top, sky-blue circle badge
 *     with the step number floating over the photo's bottom edge, big
 *     uppercase sky-blue title beneath, then a one-liner body in white.
 *   - Static 4-up grid (no carousel) — `grid-cols-1 sm:grid-cols-2
 *     lg:grid-cols-4`. The existing single CTA below the grid stays.
 *   - Photos are real Divine Shine job photos (online request form, solar
 *     panel cleaning, multi-story window cleaning, and a finished-window shot).
 *
 * Sky-blue accent uses `#5BAADC` directly. The codebase's `text-sky`
 * token resolves to `#CAE5F7` (very light), which doesn't read on the
 * dark navy field. Agent 1's CSS-token PR is expected to introduce a
 * proper `.section-eyebrow` / `.section-heading` / `.card-frosted`
 * utility set; this file uses inline Tailwind as a fallback so it can
 * ship independently.
 */

import Image from "next/image";
import { BrandCtaButton } from "@techforthetrades/ui/BrandCtaButton";

type Step = {
  num: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Get a Free Estimate",
    body: "Tell us about your property — what you want cleaned and anything specific we should know. We get you a clear, up-front price fast.",
    image: "/images/divine-shine/request-form.webp",
    imageAlt:
      "Divine Shine online estimate request form shown on a laptop and phone",
  },
  {
    num: "02",
    title: "Pick a Time",
    body: "Choose a time that works for you. We confirm ahead of time and show up on time on the day of service — every time.",
    image: "/images/divine-shine/solar-panel-cleaning.webp",
    imageAlt:
      "Divine Shine technician cleaning rooftop solar panels with a soft brush",
  },
  {
    num: "03",
    title: "We Get to Work",
    body: "Our trained, insured crew handles the job start to finish. Eco-friendly products, careful prep, and respect for your property throughout.",
    image: "/images/divine-shine/window-cleaning.webp",
    imageAlt:
      "Divine Shine technician cleaning multi-story windows with a water-fed pole",
  },
  {
    num: "04",
    title: "Spotless Results",
    body: "We walk the job with you before we leave. If anything isn't right, we make it right — that's our satisfaction guarantee.",
    image: "/images/divine-shine/hero.webp",
    imageAlt:
      "Sparkling clean windows reflecting blue sky after a Divine Shine service",
  },
];

export function CcHowItWorks() {
  return (
    <section
      className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 bg-[rgba(27,58,92,0.92)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Centered header — section-heading system (fallback inline
            Tailwind until Agent 1's utility classes land). Eyebrow and
            heading colors are lightened for legibility on the dark
            navy background. */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-sky mb-4">
            How It Works
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
            How a Divine Shine job goes
          </h2>
          <p className="mt-5 text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Getting your property cleaned shouldn&apos;t be hard. Here&apos;s
            what to expect, start to finish.
          </p>
        </div>

        {/* 4-up grid of premium photo tiles. Each tile: photo (16:9
            top) → floating sky-blue circle badge with step number →
            uppercase sky-blue title → white body copy. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {STEPS.map((step) => (
            <article
              key={step.num}
              className="group relative flex flex-col rounded-[28px] bg-white/5 backdrop-blur-xl border-[3px] border-white/15 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] hover:border-sky hover:-translate-y-2 hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out"
            >
              {/* Photo block — 4:3-ish. Top-only rounding + its own
                  overflow-hidden so the photo never bleeds past the
                  card's rounded corners, while the card root keeps
                  `overflow: visible` for the circle badge below. */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[25px]">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Soft dark bottom gradient so the floating badge has
                    contrast no matter what photo's behind it. */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
                />
              </div>

              {/* Text block — circle badge lives here as the first
                  child with negative top margin so it partially
                  overlaps the photo edge. Card root is now
                  `overflow: visible`, so the entire badge renders
                  even where it crosses the photo/content seam. */}
              <div className="relative flex-1 flex flex-col px-6 pb-7 text-center">
                {/* 80px sky-blue circle badge — sits halfway over the
                    photo/content seam so both number and circle are
                    fully visible. The ring matches the section's
                    rgba navy so the badge reads as a clean disc on
                    either background. */}
                <div className="-mt-10 mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-sky flex items-center justify-center shadow-lg ring-4 ring-[rgba(27,58,92,0.92)]">
                    {/* A11y: number was `text-white` on `bg-sky` (#5BAADC) =
                        ~2.55:1 contrast, fails AA even as large text (3:1
                        threshold). Swap to navy for ~4.75:1 — matches the
                        `bg-sky text-navy` pairing used in hero/CTA pills. */}
                    <span className="font-heading text-[32px] font-bold text-navy leading-none">
                      {step.num}
                    </span>
                  </div>
                </div>
                {/*
                 * Reserve uniform vertical space for the title so the
                 * description below starts at the same Y offset across
                 * all 4 cards. "PICK A TIME" is one line; the other
                 * three wrap to two — without a min-height, the
                 * one-line card's body sits ~1em higher than its
                 * siblings, which reads as broken rhythm at desktop
                 * widths. min-h-[2em] sm:min-h-[2.4em] approximates two
                 * lines of the configured heading size at each
                 * breakpoint.
                 */}
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-bold uppercase text-sky leading-tight mb-3 min-h-[2em] sm:min-h-[2.4em] flex items-center justify-center">
                  {step.title}
                </h3>
                <p className="text-base text-white/85 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Single CTA below — keeps the conversion ask close.
            dark-bg variant since the section background is navy. */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <BrandCtaButton href="/contact-us" variant="dark-bg">
            Get a Free Quote
          </BrandCtaButton>
        </div>
      </div>
    </section>
  );
}
