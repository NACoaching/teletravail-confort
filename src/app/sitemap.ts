import { MetadataRoute } from "next";
import { products, guides, categories } from "@/lib/data";
import { SITE_CONFIG } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trouver-mon-setup`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  const productPages = products.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: new Date(p.updatedAt || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guidePages = guides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(g.updatedAt || Date.now()),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${baseUrl}/categorie/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...guidePages, ...categoryPages];
}
