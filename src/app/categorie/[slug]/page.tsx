import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ArrowLeft,
  Monitor,
  Armchair,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { categories, getCategoryBySlug, getProductsByCategory, guides } from "@/lib/data";
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
      title: `${category.name} - Équipement Ergonomique & Comparatifs | ${SITE_CONFIG.name}`,
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

  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case "bureaux-assis-debout":
        return <Monitor className="w-5 h-5" />;
      case "chaises-ergonomiques":
        return <Armchair className="w-5 h-5" />;
      case "supports-bras-ecrans":
        return <Layers className="w-5 h-5" />;
      case "accessoires-ergonomie":
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getCategoryAccent = (categorySlug: string) => {
    switch (categorySlug) {
      case "bureaux-assis-debout":
        return {
          pill: "bg-blue-100 text-blue-800 border-blue-200",
          iconBg: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white",
          textAccent: "text-blue-600",
        };
      case "chaises-ergonomiques":
        return {
          pill: "bg-emerald-100 text-emerald-800 border-emerald-200",
          iconBg: "bg-gradient-to-br from-emerald-600 to-teal-600 text-white",
          textAccent: "text-emerald-600",
        };
      case "supports-bras-ecrans":
        return {
          pill: "bg-indigo-100 text-indigo-800 border-indigo-200",
          iconBg: "bg-gradient-to-br from-indigo-600 to-violet-600 text-white",
          textAccent: "text-indigo-600",
        };
      case "accessoires-ergonomie":
      default:
        return {
          pill: "bg-sky-100 text-sky-800 border-sky-200",
          iconBg: "bg-gradient-to-br from-sky-600 to-blue-600 text-white",
          textAccent: "text-sky-600",
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
          "item": SITE_CONFIG.domain,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category.name,
          "item": `${SITE_CONFIG.domain}/categorie/${category.slug}`,
        },
      ],
    },
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
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 flex items-center gap-1 font-semibold transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{category.name}</span>
        </nav>

        {/* Category Hero: Design Moderne, Épuré & Ergonomique */}
        <div className="mx-auto rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-blue-50/90 via-slate-50 to-indigo-50/70 border-2 border-blue-200/90 p-6 sm:p-8 lg:p-10 shadow-[0_16px_40px_-10px_rgba(37,99,235,0.12)] relative overflow-hidden text-slate-900">
          {/* Background image on mobile with light overlay */}
          <div className="absolute inset-0 lg:hidden pointer-events-none opacity-15">
            <Image
              src={heroImageSrc}
              alt={`Set-up ergonomique ${category.name} en arrière-plan`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Radial glow effects */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            {/* Left Column: Text & Context */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <div className={`w-9 h-9 rounded-xl ${accents.iconBg} flex items-center justify-center shadow-md`}>
                  {getCategoryIcon(category.slug)}
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Équipement Home Office • Sélection 2026</span>
                </span>
                <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                  • {categoryProducts.length} références testées
                </span>
              </div>

              <h1 className="titre text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 tracking-tight leading-[1.14]">
                {category.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                {category.description}
              </p>

              {/* Reassurance pills inline */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-200/90">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Sélections ergonomiques vérifiées</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Conseils pour bien débuter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Tests & avis indépendants</span>
                </div>
              </div>
            </div>

            {/* Right Column: Photograph with glowing frame & floating badge */}
            <div className="hidden lg:block lg:col-span-4 relative">
              <div className="relative mx-auto aspect-[4/3] rounded-2xl overflow-hidden border-2 border-blue-200/90 shadow-xl bg-blue-100/50 group">
                <Image
                  src={heroImageSrc}
                  alt={`Set-up ergonomique ${category.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-blue-200 text-blue-700 text-[11px] font-bold shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Télétravail Confort 2026</span>
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
          <section className="pt-8 border-t-2 border-slate-200 space-y-6">
            <h2 className="titre text-2xl font-bold text-slate-900">
              Guides & Tutoriels Liés à ce Rayon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categoryGuides.map((g) => (
                <div
                  key={g.id}
                  className="craft-card rounded-[2rem] p-6 flex flex-col justify-between group border-2 border-slate-200"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Lecture {g.readingTime}</span>
                    <h3 className="titre font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors mt-1 mb-2">
                      <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {g.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <Link
                      href={`/guides/${g.slug}`}
                      className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
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

        {/* FAQ Ergonomie avec Schema.org FAQPage */}
        {faqs.length > 0 && (
          <CategoryFAQ categoryName={category.name} faqs={faqs} />
        )}

        {/* Affiliate Disclaimer tout en bas de page */}
        <section id="transparence-selection" className="pt-4 border-t border-slate-200/80">
          <AffiliateDisclaimer />
        </section>
      </div>
    </div>
  );
}
