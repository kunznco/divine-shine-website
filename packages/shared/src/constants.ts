// Divine Shine — business constants (NAP, services, areas, social).
// Single source of truth for the marketing chrome.

export const PHONE_NUMBER = "5309003156";
export const PHONE_DISPLAY = "(530) 900-3156";
export const PHONE_HREF = `tel:${PHONE_NUMBER}`;
export const SMS_HREF = `sms:${PHONE_NUMBER}`;
export const EMAIL = "info@divine-shine.com";
export const ADDRESS = "Redding, CA";
export const CITY_STATE_ZIP = "Shasta County, CA";

// Business hours shown on the contact page.
export const BUSINESS_HOURS = [
  { day: "Monday", hours: "8:00 AM – 6:00 PM" },
  { day: "Tuesday", hours: "8:00 AM – 6:00 PM" },
  { day: "Wednesday", hours: "8:00 AM – 6:00 PM" },
  { day: "Thursday", hours: "8:00 AM – 6:00 PM" },
  { day: "Friday", hours: "8:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
] as const;

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Divine+Shine+Redding+reviews";
export const GOOGLE_REVIEW_COUNT = 232;
export const GOOGLE_RATING = 5.0;

export const SERVICES = [
  { name: "Window Cleaning", slug: "window-cleaning", href: "/services/window-cleaning" },
  { name: "High-Rise Window Cleaning", slug: "high-rise-window-cleaning", href: "/services/high-rise-window-cleaning" },
  { name: "Pressure Washing", slug: "pressure-washing", href: "/services/pressure-washing" },
  { name: "Solar Panel Cleaning", slug: "solar-panel-cleaning", href: "/services/solar-panel-cleaning" },
  { name: "House Washing", slug: "house-washing", href: "/services/house-washing" },
  { name: "Roof Washing", slug: "roof-washing", href: "/services/roof-washing" },
] as const;

// Divine Shine doesn't offer a lighting line — kept as a typed empty array so
// the Navbar's optional lighting dropdown markup type-checks without a
// separate code path.
export const LIGHTING_SERVICES: { name: string; slug: string; href: string }[] = [];

// About Us is rendered explicitly in Navbar.tsx; the rest live here.
export const NAV_LINKS = [
  { name: "Service Areas", href: "/service-areas" },
  { name: "Contact", href: "/contact-us" },
] as const;

export const SERVICE_AREAS = [
  "Redding, CA",
  "Anderson, CA",
  "Red Bluff, CA",
  "Cottonwood, CA",
  "Palo Cedro, CA",
  "Shasta Lake, CA",
  "Happy Valley, CA",
  "Bella Vista, CA",
] as const;

export const STATS = [
  { value: "232+", label: "5-star reviews", description: "Rated 5.0 across 232+ Google reviews from Redding-area homes and businesses." },
  { value: "1000s", label: "Windows cleaned", description: "Streak-free glass for homes and commercial properties across the North State." },
  { value: "100%", label: "Satisfaction focus", description: "We're not done until you're happy with the shine." },
] as const;

export const PROMISE_VALUES = [
  { title: "SAFETY FIRST", description: "Trained, insured technicians and the right equipment for every height and surface." },
  { title: "INTEGRITY", description: "We do what we say we'll do, show up on time, and treat your property with respect." },
  { title: "EXCELLENCE", description: "Spotless, streak-free results — every window, every wash, every time." },
] as const;

export const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com/divineshineredding/", icon: "facebook" },
  { name: "Instagram", href: "https://instagram.com/divineshineredding/", icon: "instagram" },
] as const;
