export interface CategorySubtheme {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  count?: number;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  icon: string; // Lucide icon name
  badgeColor?: string;
  tagline?: string;
  heroImage?: string;
  subCategories?: CategorySubtheme[];
  itemCount?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  categorySlug: string;
  subCategory?: string; // e.g. "a-coller", "feuilles-papiers", "machines-decoupe"
  subCategoryLabel?: string; // e.g. "Stickers & À Coller"
  badge?: string; // e.g. "Choix n°1 Débutant", "Meilleur Rapport Qualité/Prix", "Coup de Coeur"
  tagline: string;
  description: string;
  priceRange: "€" | "€€" | "€€€" | "€€€€";
  priceIndication: string; // e.g. "Moins de 35 €", "Entre 150 € et 220 €"
  rating: number; // e.g. 4.8
  reviewCount: number;
  amazonAsin?: string;
  affiliateUrl: string; // Amazon affiliate link with tracking tag
  imageUrl: string;
  pros: string[];
  cons: string[];
  features: { [key: string]: string };
  targetAudience: string; // e.g. "Débutants complets et créateurs réguliers"
  verdict: string;
  updatedAt: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  featuredImageUrl: string;
  featuredProductSlugs: string[];
  starProductSlug?: string;
  faqs?: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  content: string; // Structured HTML or markdown
}

export interface CommunityCreation {
  id: string;
  creatorName: string;
  title: string;
  categorySlug: string;
  categoryLabel: string;
  imageUrl: string;
  description: string;
  toolsUsed?: string;
  date: string;
  featured?: boolean;
}

