/**
 * PageHeader — compact navy header used at the top of list pages
 * (/projects, /reviews, /blog). Visually consistent with the new
 * image-bg heros (same typography sizing, same brand navy palette,
 * left-aligned) but only ~30vh tall so the list of items stays
 * visible above the fold.
 *
 * Why not a full-viewport image-bg hero on list pages: visitors land
 * on these pages to browse the items. Forcing a full-screen scroll
 * before showing any items is bad UX. This compact treatment keeps
 * the brand voice without that cost.
 */

type Props = {
  /** Optional eyebrow text above the headline (small caps, sky-blue accent). */
  eyebrow?: string;
  /** The page title — h1, big bold white text. */
  heading: string;
  /** Optional supporting line below the headline. */
  subheading?: string;
};

export function PageHeader({ eyebrow, heading, subheading }: Props) {
  return (
    <section className="bg-navy px-5 sm:px-8 xl:px-12 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        {eyebrow && (
          <p className="font-pairing-secondary text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky mb-4">
            {eyebrow}
          </p>
        )}
        {/* Mobile-first responsive sizing: 32px → 40px → 48px → 60px → 72px.
            Was raw `text-5xl` (48px fixed) which wrapped long titles like
            "Reviews from real San Diego homeowners" or "Latest articles from
            the team" to 3–4 single-word lines at 375. The scale below matches
            the `.section-heading` utility used elsewhere on the site. */}
        <h1 className="font-pairing-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-white max-w-3xl">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-5 max-w-2xl font-pairing-secondary text-lg text-white/80 sm:text-xl leading-relaxed">
            {subheading}
          </p>
        )}
      </div>
    </section>
  );
}
