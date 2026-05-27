import type { MetadataRoute } from "next";
import { ALL_SERVICES } from "@/data/services";
import { SERVICE_AREA_DATA } from "@/data/service-areas";

const BASE_URL = "https://www.divine-shine.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/service-areas",
    "/about-us",
    "/contact-us",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = ALL_SERVICES.map((service) => ({
    url: `${BASE_URL}${service.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const areaRoutes = SERVICE_AREA_DATA.map((area) => ({
    url: `${BASE_URL}/service-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...areaRoutes];
}
