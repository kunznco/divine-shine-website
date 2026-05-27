/**
 * Static data layer for the Divine Shine sample.
 *
 * Mirrors the query-helper API the components expect, but reads from in-repo
 * constants instead of Supabase. Reviews are a mix of two real quotes pulled
 * from Divine Shine's Google profile plus clearly-placeholder sample
 * testimonials — replace with live Google reviews before launch.
 */

export type Review = {
  id: string;
  name: string;
  initial: string;
  text: string;
  rating: number;
  source: string;
  display_order: number;
  featured?: boolean;
  location?: string | null;
  review_date?: string | null;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  headings: { tag: string; text: string }[];
  paragraphs: string[];
  images: { src: string; alt: string }[];
  content: string;
  published: boolean;
  serviceSlugs: string[];
  created_at: string;
  updated_at: string;
};

export type Page = {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
};

export type PageSection = {
  id: string;
  page_id: string;
  type: string;
  position: number;
  content: Record<string, unknown>;
};

const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Redding Equipment",
    initial: "R",
    text: "Jonas was wonderful! He was excellent to work with, kind, very informative, and our windows look pristine.",
    rating: 5,
    source: "google",
    display_order: 1,
    featured: true,
    location: "Redding, CA",
  },
  {
    id: "r2",
    name: "Lauren Bruce",
    initial: "L",
    text: "Jonas was absolutely polite and professional from the beginning to the end of the process. Our windows have never looked better — highly recommend Divine Shine.",
    rating: 5,
    source: "google",
    display_order: 2,
    featured: true,
    location: "Redding, CA",
  },
  // --- Placeholder sample testimonials — replace with real Google reviews ---
  {
    id: "r3",
    name: "Marina F.",
    initial: "M",
    text: "Booked a full house wash and window cleaning before listing our home. The team was on time, careful around the landscaping, and the difference was night and day. Worth every penny.",
    rating: 5,
    source: "google",
    display_order: 3,
    featured: true,
    location: "Palo Cedro, CA",
  },
  {
    id: "r4",
    name: "David S.",
    initial: "D",
    text: "Had our solar panels cleaned after a dusty summer and our production noticeably bounced back. Professional, friendly, and fairly priced.",
    rating: 5,
    source: "google",
    display_order: 4,
    location: "Anderson, CA",
  },
  {
    id: "r5",
    name: "Karen H.",
    initial: "K",
    text: "Divine Shine pressure washed our driveway and pool deck and they look brand new. Showed up exactly when they said they would.",
    rating: 5,
    source: "google",
    display_order: 5,
    location: "Red Bluff, CA",
  },
  {
    id: "r6",
    name: "Tom R.",
    initial: "T",
    text: "We manage several commercial properties and Divine Shine is now our go-to for storefront and high-rise window cleaning. Safe, reliable, and spotless results.",
    rating: 5,
    source: "google",
    display_order: 6,
    location: "Redding, CA",
  },
];

export async function getReviews(): Promise<Review[]> {
  return [...REVIEWS].sort((a, b) => a.display_order - b.display_order);
}

export async function getFeaturedReviews(): Promise<Review[]> {
  return REVIEWS.filter((r) => r.featured).sort((a, b) => a.display_order - b.display_order);
}

export async function getCarouselReviews(limit = 12): Promise<Review[]> {
  return REVIEWS.filter((r) => r.rating === 5)
    .sort((a, b) => a.display_order - b.display_order)
    .slice(0, limit);
}

// The sample ships without a project gallery; these return empty so any
// section that reads projects renders nothing rather than breaking.
export async function getProjects(_opts?: { serviceSlug?: string }): Promise<Project[]> {
  void _opts;
  return [];
}

export async function getPageBySlug(_slug: string): Promise<Page | undefined> {
  void _slug;
  return undefined;
}

export async function getPageSections(_pageId: string): Promise<PageSection[]> {
  void _pageId;
  return [];
}
