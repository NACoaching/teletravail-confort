import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ArrowLeft,
  Scissors,
  Palette,
  PenTool,
  Stamp,
  Shapes,
  Feather,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Package,
} from "lucide-react";
import { categories, getCategoryBySlug, getProductsByCategory, guides } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import CategoryProductSection from "@/components/CategoryProductSection";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import CraftDoodles from "@/components/CraftDoodles";
import TopThreePodium from "@/components/TopThreePodium";
import CategoryFAQ from "@/components/CategoryFAQ";
import categoryFaqsData from "@/data/category-faqs.json";
import { SITE_CONFIG } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} : Matériel, Guides & Comparatifs 2026 | ${SITE_CONFIG.name}`,
    description: category.description,
    alternates: {
      canonical: `${SITE_CONFIG.domain}/categorie/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} - Matériel d'Atelier & Comparatifs | ${SITE_CONFIG.name}`,
      description: category.description,
      url: `${SITE_CONFIG.domain}/categorie/${category.slug}`,
      siteName: SITE_CONFIG.name,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(slug);
  const categoryGuides = guides.filter((g) => g.categorySlug === slug);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Scissors":
        return <Scissors className="w-5 h-5" />;
      case "Palette":
        return <Palette className="w-5 h-5" />;
      case "PenTool":
        return <PenTool className="w-5 h-5" />;
      case "Stamp":
        return <Stamp className="w-5 h-5" />;
      case "Shapes":
        return <Shapes className="w-5 h-5" />;
      case "Feather":
        return <Feather className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getCategoryAccent = (slug: string) => {
    switch (slug) {
      case "scrapbooking":
        return {
          pill: "bg-orange-100 text-[#e05238] border-orange-200",
          iconBg: "bg-gradient-to-br from-orange-500 to-[#e05238] text-white",
          textAccent: "text-[#e05238]",
        };
      case "aquarelle-peinture":
        return {
          pill: "bg-amber-100 text-amber-800 border-amber-200",
          iconBg: "bg-gradient-to-br from-amber-500 to-amber-600 text-white",
          textAccent: "text-[#d97706]",
        };
      case "dessin-feutres":
        return {
          pill: "bg-indigo-100 text-indigo-800 border-indigo-200",
          iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white",
          textAccent: "text-[#4338ca]",
        };
      case "linogravure":
        return {
          pill: "bg-emerald-100 text-emerald-800 border-emerald-200",
          iconBg: "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white",
          textAccent: "text-[#15803d]",
        };
      case "modelage-argile":
        return {
          pill: "bg-sky-100 text-sky-800 border-sky-200",
          iconBg: "bg-gradient-to-br from-sky-500 to-cyan-600 text-white",
          textAccent: "text-[#0284c7]",
        };
      case "carterie-calligraphie":
      default:
        return {
          pill: "bg-purple-100 text-purple-800 border-purple-200",
          iconBg: "bg-gradient-to-br from-purple-500 to-purple-600 text-white",
          textAccent: "text-[#7e22ce]",
        };
    }
  };

  const accents = getCategoryAccent(category.slug);
  const heroImageSrc = category.heroImage || "/hero-bg.jpg";
  const faqs = (categoryFaqsData as Record<string, any>)[category.slug] || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} - Matériel & Guides 2026`,
    "description": category.description,
    "url": `${SITE_CONFIG.domain}/categorie/${category.slug}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": SITE_CONFIG.domain
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category.name,
          "item": `${SITE_CONFIG.domain}/categorie/${category.slug}`
        }
      ]
    }
  };

  return (
    <div className="relative space-y-8 pb-16 craft-dot-pattern overflow-x-hidden">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CraftDoodles />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#5a493e]">
          <Link href="/" className="hover:text-[#e05238] flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </Link>
          <span>/</span>
          <span className="text-[#241b16] font-bold">{category.name}</span>
        </nav>

        {/* Category Hero: Lumineux, Chaleureux & Atelier Créatif (même style que la page principale) */}
        <div className="mx-auto rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#FFF5ED] via-[#FFEADB] to-[#FED6BF] border-2 border-[#F9BA98] p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_-10px_rgba(224,82,56,0.18)] relative overflow-hidden text-[#2D1B13]">
          {/* Background image on mobile with light warm overlay */}
          <div className="absolute inset-0 lg:hidden pointer-events-none opacity-20">
            <Image
              src={heroImageSrc}
              alt={`Atelier créatif ${category.name} en arrière-plan`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Warm artistic radial glow effects */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-300/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-300/35 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            {/* Left Column: Text & Context */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <div className={`w-9 h-9 rounded-xl ${accents.iconBg} flex items-center justify-center shadow-md`}>
                  {getCategoryIcon(category.icon)}
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-orange-300/80 text-[#C2410C] text-xs font-bold tracking-wide shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#E05238]" />
                  <span>Rayon d&apos;Atelier • Sélection 2026</span>
                </span>
                <span className="text-xs text-[#5C3C2C] font-semibold hidden sm:inline">
                  • {categoryProducts.length} références testées
                </span>
              </div>

              <h1 className="titre text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#2D1B13] tracking-tight leading-[1.14]">
                {category.name}
              </h1>

              <p className="text-sm sm:text-base text-[#5C3C2C] leading-relaxed max-w-2xl font-normal">
                {category.description}
              </p>

              {/* Reassurance pills inline */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5C3C2C] pt-2 border-t border-orange-200/90">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sélections d&apos;atelier vérifiées</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Conseils pour bien débuter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>Tests & avis indépendants</span>
                </div>
              </div>
            </div>

            {/* Right Column: Theme Dedicated Photograph with glowing frame & floating badge */}
            <div className="hidden lg:block lg:col-span-4 relative">
              <div className="relative mx-auto aspect-[4/3] rounded-2xl overflow-hidden border-3 border-[#F9BA98] shadow-xl bg-orange-100 group">
                <Image
                  src={heroImageSrc}
                  alt={`Atelier créatif ${category.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-orange-200 text-[#C2410C] text-[11px] font-bold shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-[#E05238]" />
                    <span>Coin Créatif Atelier 2026</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Quick Verdict Podium (High Conversion) */}
        <TopThreePodium products={categoryProducts} categoryName={category.name} />

        {/* Interactive Products Section with Sub-theme bar */}
        <CategoryProductSection
          categorySlug={category.slug}
          categoryName={category.name}
          products={categoryProducts}
          subCategories={category.subCategories}
          accentColor={accents.textAccent}
        />

        {/* Related Guides for this category */}
        {categoryGuides.length > 0 && (
          <section className="pt-8 border-t-2 border-[#eadfd3] space-y-6">
            <h2 className="titre text-2xl font-bold text-[#241b16]">
              Guides & Tutoriels Liés à ce Rayon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryGuides.map((g) => (
                <div
                  key={g.id}
                  className="craft-card rounded-[2rem] p-6 flex flex-col justify-between group border-2 border-[#eadfd3]"
                >
                  <div>
                    <span className="text-xs font-semibold text-[#8c786c]">Lecture {g.readingTime}</span>
                    <h3 className="titre font-bold text-lg text-[#241b16] group-hover:text-[#e05238] transition-colors mt-1 mb-2">
                      <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5a493e] line-clamp-2 leading-relaxed">
                      {g.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#eadfd3]">
                    <Link
                      href={`/guides/${g.slug}`}
                      className="text-xs font-bold text-[#e05238] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Consulter le guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ d'Atelier avec Schema.org FAQPage */}
        {faqs.length > 0 && (
          <CategoryFAQ categoryName={category.name} faqs={faqs} />
        )}

        {/* Affiliate Disclaimer tout en bas de page */}
        <section id="transparence-selection" className="pt-4 border-t border-[#eadfd3]/60">
          <AffiliateDisclaimer />
        </section>
      </div>
    </div>
  );
}
