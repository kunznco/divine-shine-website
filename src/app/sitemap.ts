import type { MetadataRoute } from "next";
import { ALL_SERVICES } from "@/data/services";
import { SERVICE_AREA_DATA } from "@/data/service-areas";

const BASE_URL = "https://www.divine-shine.com";

// Stable last-modified date for every route. A fixed content date (instead of
// `new Date()` per request) keeps sitemap <lastmod> honest so Google trusts it.
// Bump this when site content materially changes.
const LAST_MODIFIED = new Date("2026-05-29");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/service-areas",
    "/about-us",
    "/contact-us",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = ALL_SERVICES.map((service) => ({
    url: `${BASE_URL}${service.href}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const areaRoutes = SERVICE_AREA_DATA.map((area) => ({
    url: `${BASE_URL}/service-areas/${area.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes];
}
