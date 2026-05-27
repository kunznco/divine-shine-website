"use client";

/**
 * 3-up rotating testimonials carousel — production parity with Rebolt's
 * `grab-testimonials-carousel`. Auto-advances every 6 seconds, pauses
 * on hover/focus, exposes manual prev/next + page-indicator dots.
 *
 * Renders 3 cards per page on `lg` (and 2 on `sm`, 1 on mobile, matching
 * the original `CcTestimonials` grid breakpoints). When fewer reviews
 * are passed than fit on a page, falls back to the static layout —
 * cycling 3 reviews into a 3-card grid would just spin in place.
 *
 * Card markup (svg stars, blockquote, "by" + author) is verbatim from
 * the previous static `CcTestimonials` so visual diff vs prod is zero.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type TestimonialEntry = { name: string; rating: number; text: string };

type Props = {
  reviews: TestimonialEntry[];
  /** Auto-advance interval in ms. Set to 0 to disable rotation. */
  intervalMs?: number;
};

const CARDS_PER_PAGE = 3;

export function TestimonialsCarousel({ reviews, intervalMs = 6000 }: Props) {
  const [pageIndex, setPageIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Group reviews into pages of 3. The last page may be shorter, but we
  // still let it land — prevents content from disappearing.
  const pages = useMemo(() => {
    const out: TestimonialEntry[][] = [];
    for (let i = 0; i < reviews.length; i += CARDS_PER_PAGE) {
      out.push(reviews.slice(i, i + CARDS_PER_PAGE));
    }
    return out;
  }, [reviews]);

  const totalPages = pages.length;

  // Keep the active page index in range when reviews shrink (e.g. an
  // admin unfeatures a review while the carousel is open).
  if (pageIndex >= totalPages && totalPages > 0) {
    // Derive during render — see React docs "Adjusting state based on props"
    setPageIndex(0);
  }

  const goNext = useCallback(() => {
    setPageIndex((i) => (totalPages === 0 ? 0 : (i + 1) % totalPages));
  }, [totalPages]);
  const goPrev = useCallback(() => {
    setPageIndex((i) => (totalPages === 0 ? 0 : (i - 1 + totalPages) % totalPages));
  }, [totalPages]);

  // Auto-rotate. Pause when (a) user hovers/focuses inside the section,
  // (b) the document is hidden (battery + correctness — don't fire timers
  // for a tab nobody is looking at), (c) only one page would be shown.
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!intervalMs || paused || totalPages <= 1) return;
    if (typeof document !== "undefined" && document.hidden) return;
    timerRef.current = setTimeout(goNext, intervalMs);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pageIndex, paused, intervalMs, totalPages, goNext]);

  if (reviews.length === 0) return null;

  // ≤ CARDS_PER_PAGE — render static, no controls. Cycling 3 cards into
  // 3 slots is just animated noise.
  if (reviews.length <= CARDS_PER_PAGE) {
    return (
      <div
        className="grab-testimonials-grid grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        aria-label="Customer testimonials"
        role="region"
      >
        {reviews.map((r, i) => (
          <Card review={r} key={i} />
        ))}
      </div>
    );
  }

  const currentPage = pages[pageIndex] ?? pages[0];

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Live region so SRs announce the page change without re-reading
          the heading + subhead each cycle. */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing reviews {pageIndex * CARDS_PER_PAGE + 1} through{" "}
        {pageIndex * CARDS_PER_PAGE + currentPage.length} of {reviews.length}
      </div>

      <div className="grab-testimonials-grid grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {currentPage.map((r, i) => (
          <Card review={r} key={`${pageIndex}-${i}`} />
        ))}
      </div>

      {/* Manual controls + page indicator dots */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous testimonials"
          className="rounded-full bg-white p-2 shadow border border-derivative-200 hover:bg-derivative-50 transition-colors"
        >
          <ArrowSvg direction="left" />
        </button>

        <div className="flex items-center gap-1" role="tablist" aria-label="Testimonials pages">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === pageIndex}
              aria-label={`Go to testimonials page ${i + 1}`}
              onClick={() => setPageIndex(i)}
              // Outer button = 24×24 minimum to meet WCAG AA target-size.
              // Visible dot is the inner span — small dot for inactive
              // pages, longer pill for the active page.
              className="group flex h-6 items-center justify-center transition-all"
              style={{ width: i === pageIndex ? "2.5rem" : "1.5rem" }}
            >
              <span
                aria-hidden
                className={`block h-2 rounded-full transition-all ${
                  i === pageIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-derivative-300 group-hover:bg-derivative-400"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next testimonials"
          className="rounded-full bg-white p-2 shadow border border-derivative-200 hover:bg-derivative-50 transition-colors"
        >
          <ArrowSvg direction="right" />
        </button>
      </div>
    </div>
  );
}

function Card({ review }: { review: TestimonialEntry }) {
  return (
    <figure className="grab-testimonial-card flex grow basis-0 flex-col justify-between rounded-dynamic bg-white p-5 shadow sm:p-9">
      <blockquote className="grab-testimonial-content mb-4 line-clamp-[12] font-pairing-secondary leading-[1.8] tracking-tight text-derivative-900">
        {review.text}
      </blockquote>
      <figcaption className="flex gap-1">
        <div
          className="grab-testimonial-stars mr-1 mt-1.5 flex gap-1"
          role="img"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: review.rating }).map((_, j) => (
            <StarSvg key={j} />
          ))}
        </div>
        <i className="grab-testimonial-by mt-0.5 font-pairing-secondary tracking-tight text-derivative-700">
          by
        </i>
        &nbsp;
        <span className="grab-testimonial-author mt-0.5 font-pairing-primary font-semibold uppercase tracking-tight text-derivative-900">
          {review.name}
        </span>
      </figcaption>
    </figure>
  );
}

function StarSvg() {
  return (
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
      className="grab-testimonial-star h-4 w-4 fill-current text-primary"
      aria-hidden
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ArrowSvg({ direction }: { direction: "left" | "right" }) {
  return (
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
      className="text-derivative-700"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}
