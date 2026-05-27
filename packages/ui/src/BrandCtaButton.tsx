import Link from "next/link";

/**
 * BrandCtaButton — the canonical primary-CTA button used across the
 * site. Replaces the ad-hoc per-section button styles that had
 * drifted to different colors / casings / shapes.
 *
 * Variants pick the contrast pairing:
 *   - "dark-bg" (default): sky-blue pill with navy text and shadow.
 *     Use on dark sections (hero overlays, navy CTA bands, footer
 *     adjacents).
 *   - "light-bg": navy pill with white text. Use on white/sky-light
 *     sections (memberships, owners cards, services grid).
 *
 * Always uppercase, always pill, always with a right-arrow glyph —
 * the consistency itself is part of the brand. If you find yourself
 * needing to deviate, talk to design first.
 */

type Props = {
  href: string;
  /** Button text. Will be uppercased via CSS. */
  children: React.ReactNode;
  /** Visual variant — picks pill color based on background contrast. */
  variant?: "dark-bg" | "light-bg";
  /** Open in a new tab when set. */
  external?: boolean;
  /** Sizing — `lg` is for hero use; `md` (default) is for inline CTAs. */
  size?: "md" | "lg";
  /** Extra classes for one-off layout tweaks (margins etc.). */
  className?: string;
};

export function BrandCtaButton({
  href,
  children,
  variant = "dark-bg",
  external = false,
  size = "md",
  className = "",
}: Props) {
  const isDarkBg = variant === "dark-bg";
  const palette = isDarkBg
    ? "bg-sky text-navy hover:bg-white shadow-lg"
    : "bg-navy text-white hover:bg-navy-light shadow-md";
  const sizing =
    size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm sm:text-base";

  const classes = `inline-flex items-center gap-2 rounded-dynamic font-pairing-secondary font-bold uppercase tracking-wide transition-colors ${palette} ${sizing} ${className}`.trim();

  const arrow = (
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
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
