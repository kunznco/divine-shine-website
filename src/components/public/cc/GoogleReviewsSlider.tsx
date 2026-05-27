"use client";

/**
 * CcGoogleReviewsSlider — Google-branded reviews marquee for the
 * home page. A single horizontal row of review cards that scrolls
 * continuously left at a slow drift (no discrete page jumps).
 *
 * Reviews come from our Supabase `reviews` table — they're the
 * customer-curated subset that mirrors what's on our Google Business
 * Profile, just stored locally so we can render server-side without
 * hitting Google on every load. The live count / rating headline is
 * pulled separately via Places API (see lib/google/places.ts).
 *
 * 2026-05-12: Chris asked for true infinite auto-scroll instead of
 * the previous 9-card page-jump rotation. Implementation:
 *   - Cards render in a single flex row (fixed width per card).
 *   - The row is duplicated (`[...reviews, ...reviews]`) so the
 *     second copy slides into view as the first slides off-screen.
 *   - A CSS keyframe (defined in a scoped <style> tag below)
 *     translates the row from 0 → -50% — at -50% the second copy
 *     is now exactly where the first copy started, and the animation
 *     loops seamlessly.
 *   - Pause on hover via :hover { animation-play-state: paused }.
 *   - Honors prefers-reduced-motion: motion-safe users get the
 *     animation; reduced-motion users get a static horizontal
 *     overflow-x-auto row they can scroll themselves.
 */

export type GoogleReviewEntry = {
  name: string;
  rating: number;
  text: string;
  /** Optional: when the review was posted. Shown in the small footer. */
  date?: string | null;
};

type Props = {
  reviews: GoogleReviewEntry[];
  /** Total Google review count for the header strip. */
  googleCount?: number;
  /** Average rating for the header strip (e.g. 4.9). */
  googleRating?: number;
  /** Direct link to the Google reviews page. */
  reviewsUrl?: string;
  /**
   * Marquee duration in seconds for one full loop. Higher = slower drift.
   * 60s = ~17px/s on a 1024px viewport, slow enough to read individual
   * cards as they pass.
   */
  durationSeconds?: number;
};

export function CcGoogleReviewsSlider({
  reviews,
  googleCount,
  googleRating,
  reviewsUrl = "https://search.google.com/local/reviews?placeid=ChIJu0aLGqEysaQRPkKdQ2gvRcc",
  durationSeconds = 60,
}: Props) {
  if (reviews.length === 0) return null;

  // Render the list twice back-to-back so the marquee can loop at -50%
  // without a visible jump. Keys include a copy index so React doesn't
  // complain about duplicate keys across the two halves.
  const doubled = [...reviews, ...reviews];

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Google-branded header strip */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            {/* Google G logo (inline SVG, 4-color) */}
            <GoogleGSvg className="w-6 h-6" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-dark-muted">
              Reviews from our Google customers
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy">
            What North State customers are saying
          </h2>

          {/* Rating + count line */}
          {(googleRating || googleCount) && (
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-dark-muted hover:text-navy transition-colors"
            >
              {googleRating !== undefined && (
                <span className="font-bold text-navy">{googleRating.toFixed(1)}</span>
              )}
              <span className="flex items-center gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarSvg key={i} />
                ))}
              </span>
              {googleCount !== undefined && (
                <span>· {googleCount} Google reviews</span>
              )}
            </a>
          )}
        </div>

        {/*
          Marquee viewport — overflow-hidden contains the doubled track.
          Soft mask on the left+right edges so cards fade in/out instead
          of hard-clipping at the container edge.
        */}
        <div
          className="cc-reviews-marquee group relative overflow-hidden"
          style={{
            // Tailwind doesn't have a built-in mask utility we can rely on
            // here; this keeps the fade scoped to the marquee viewport.
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
          }}
          aria-label="Google reviews carousel"
          role="region"
        >
          <div
            className="cc-reviews-track flex w-max gap-5 sm:gap-6"
            style={{ animationDuration: `${durationSeconds}s` }}
          >
            {doubled.map((r, i) => (
              <div
                key={`${i}-${r.name}`}
                className="w-72 sm:w-80 lg:w-96 shrink-0"
                aria-hidden={i >= reviews.length}
              >
                <ReviewCard review={r} />
              </div>
            ))}
          </div>

          {/*
            Scoped CSS for the marquee keyframe + reduced-motion fallback.
            Keeping this inline in the component avoids touching globals.css
            (per the scope rules for this fix) and keeps the animation
            colocated with the only component that uses it.
          */}
          <style>{`
            .cc-reviews-track {
              animation-name: cc-reviews-scroll;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
              will-change: transform;
            }
            .cc-reviews-marquee:hover .cc-reviews-track,
            .cc-reviews-marquee:focus-within .cc-reviews-track {
              animation-play-state: paused;
            }
            @keyframes cc-reviews-scroll {
              from { transform: translate3d(0, 0, 0); }
              to   { transform: translate3d(-50%, 0, 0); }
            }
            @media (prefers-reduced-motion: reduce) {
              .cc-reviews-marquee {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
              }
              .cc-reviews-track {
                animation: none !important;
                transform: none !important;
              }
            }
          `}</style>
        </div>

        {/* Leave-us-a-review CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:underline"
          >
            <GoogleGSvg className="w-4 h-4" />
            See all reviews on Google
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: GoogleReviewEntry }) {
  return (
    <figure className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col h-full">
      {/* Stars row + small Google G */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="flex gap-0.5 text-gold"
          role="img"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: review.rating }).map((_, i) => (
            <StarSvg key={i} />
          ))}
        </div>
        <GoogleGSvg className="w-4 h-4 opacity-70" />
      </div>

      <blockquote className="flex-1 mb-4 line-clamp-5 text-sm text-dark-muted leading-relaxed">
        {review.text}
      </blockquote>

      <figcaption className="border-t border-gray-100 pt-3">
        <div className="text-sm font-bold uppercase tracking-wide text-navy">
          {review.name}
        </div>
        {review.date && (
          <div className="text-xs text-gray-400 mt-0.5">{review.date}</div>
        )}
      </figcaption>
    </figure>
  );
}

function StarSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-4 w-4"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function GoogleGSvg({ className = "w-5 h-5" }: { className?: string }) {
  // Google's 4-color "G" logo (canonical SVG paths).
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      aria-hidden
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}
