import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import guidesData from "@/data/guides.json";
import creationsData from "@/data/creations.json";
import { ProductCategory, Product, Guide, CommunityCreation } from "./types";

export function replaceDatePlaceholders(str?: string): string {
  if (!str) return "";
  const currentYear = new Date().getFullYear().toString();
  return str.replace(/\{year\}/g, currentYear);
}

export const categories: ProductCategory[] = categoriesData as ProductCategory[];

export const products: Product[] = (productsData as any[]).map((p) => ({
  ...p,
  title: replaceDatePlaceholders(p.title),
  tagline: replaceDatePlaceholders(p.tagline),
  description: replaceDatePlaceholders(p.description),
  verdict: replaceDatePlaceholders(p.verdict),
  targetAudience: replaceDatePlaceholders(p.targetAudience),
  pros: (p.pros || []).map((pro: string) => replaceDatePlaceholders(pro)),
  cons: (p.cons || []).map((con: string) => replaceDatePlaceholders(con)),
}));

export const guides: Guide[] = (guidesData as any[]).map((g) => ({
  ...g,
  title: replaceDatePlaceholders(g.title),
  excerpt: replaceDatePlaceholders(g.excerpt),
  seoTitle: replaceDatePlaceholders(g.seoTitle),
  seoDescription: replaceDatePlaceholders(g.seoDescription),
  content: replaceDatePlaceholders(g.content),
}));

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export const creations: CommunityCreation[] = (creationsData as any[]).map((c) => ({
  ...c,
  title: replaceDatePlaceholders(c.title),
  description: replaceDatePlaceholders(c.description),
  toolsUsed: replaceDatePlaceholders(c.toolsUsed),
}));

export function getFeaturedCreations(): CommunityCreation[] {
  return creations.filter((c) => c.featured);
}

export function getCreationsByCategory(categorySlug: string): CommunityCreation[] {
  return creations.filter((c) => c.categorySlug === categorySlug);
}

