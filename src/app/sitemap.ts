import { MetadataRoute } from "next";
import { locales } from "@/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://marvellobrand.uz";

const ROUTES = ["", "/catalog", "/about", "/news", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of ROUTES) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/catalog" ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
