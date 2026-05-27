import { PHONE_DISPLAY, EMAIL } from "@techforthetrades/shared/constants";
import { getGoogleRating } from "@techforthetrades/shared/google/places";

const SITE_URL = "https://www.divine-shine.com";

/**
 * LocalBusinessSchema — global business JSON-LD, injected once via the
 * public layout. Includes live Google rating + count for AggregateRating
 * so rich-result eligibility kicks in for the brand search box.
 */
export async function LocalBusinessSchema() {
  // Live rating + count from Places API (24h cache, falls back to
  // hardcoded constants when the GOOGLE_PLACES_API_KEY env isn't set).
  const google = await getGoogleRating();
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Divine Shine",
    description:
      "Professional window cleaning, high-rise window cleaning, pressure washing, solar panel cleaning, house washing, and roof washing in Redding and Shasta County.",
    url: SITE_URL,
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Redding",
      addressRegion: "CA",
      postalCode: "96001",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.5865,
      longitude: -122.3917,
    },
    image: `${SITE_URL}/images/divine-shine-logo.png`,
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: google.rating,
      reviewCount: google.count,
      bestRating: 5,
    },
    areaServed: [
      { "@type": "City", name: "Redding" },
      { "@type": "City", name: "Anderson" },
      { "@type": "City", name: "Red Bluff" },
      { "@type": "City", name: "Cottonwood" },
      { "@type": "City", name: "Palo Cedro" },
      { "@type": "City", name: "Shasta Lake" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Window Cleaning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "High-Rise Window Cleaning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pressure Washing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solar Panel Cleaning" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "House Washing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Roof Washing" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbListSchema — JSON-LD for breadcrumb trails on nested pages.
 *
 * Pass an ordered array of `[name, path]` tuples representing the trail
 * from Home → … → current page. The component appends the site origin
 * to each `path`. Google uses this to surface breadcrumb chips in the
 * SERP listing in place of the raw URL.
 *
 * Example:
 *   <BreadcrumbListSchema items={[
 *     ["Services", "/services"],
 *     ["Window Cleaning", "/services/window-cleaning"],
 *   ]} />
 *
 * The "Home" root crumb is injected automatically, so callers only need
 * to pass the trail below Home.
 */
export function BreadcrumbListSchema({
  items,
}: {
  items: ReadonlyArray<readonly [name: string, path: string]>;
}) {
  const list = [["Home", "/"] as const, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map(([name, path], idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * ServiceSchema — JSON-LD describing a single service offered.
 *
 * Renders on /services/[slug] pages so each service has its own
 * Service entity tied back to the LocalBusiness provider. Google
 * uses this to power "Services" rich results when the brand is
 * searched directly.
 */
export function ServiceSchema({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    ...(image ? { image: image.startsWith("http") ? image : `${SITE_URL}${image}` } : {}),
    provider: {
      "@type": "LocalBusiness",
      name: "Divine Shine",
      url: SITE_URL,
      telephone: PHONE_DISPLAY,
    },
    areaServed: {
      "@type": "City",
      name: "Redding",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BlogPostingSchema — JSON-LD for an individual blog post.
 *
 * Makes posts eligible for Google's Article rich-result treatment.
 * `image` is optional but strongly recommended — passes through any
 * relative `/images/...` path; Google resolves against the page's URL.
 */
export function BlogPostingSchema({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
}: {
  url: string;
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Organization", name: "Coastal Clarity" },
    publisher: {
      "@type": "Organization",
      name: "Coastal Clarity",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/divine-shine-logo.png`,
      },
    },
  };
  if (image) schema.image = image;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FaqPageSchema — JSON-LD wrapping a list of Q&A items.
 *
 * Used on service detail pages that ship a FAQ section. Eligible for
 * Google's FAQ rich-result treatment when the same Q&A is visible on
 * the page. We pass the same items rendered by `<CcFaqFlat>` so the
 * schema and the DOM stay in sync.
 */
export function FaqPageSchema({
  items,
}: {
  items: ReadonlyArray<{ question: string; answer: string }>;
}) {
  if (items.length === 0) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
