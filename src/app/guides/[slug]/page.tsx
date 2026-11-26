import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Monitor,
  Armchair,
  Layers,
  Sparkles,
  Trophy,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { guides, getGuideBySlug, getCategoryBySlug, getProductBySlug, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import GuideStarProduct from "@/components/GuideStarProduct";
import GuideComparisonTable from "@/components/GuideComparisonTable";
import TopThreePodium from "@/components/TopThreePodium";
import CategoryFAQ from "@/components/CategoryFAQ";
import StickyProductBar from "@/components/StickyProductBar";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import CraftDoodles from "@/components/CraftDoodles";
import { SITE_CONFIG } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.seoTitle || `${guide.title} | ${SITE_CONFIG.name}`,
    description: guide.seoDescription || guide.excerpt,
    keywords: [
      guide.title,
      guide.categorySlug,
      "comparatif équipement télétravail",
      "guide achat bureau assis debout chaise ergonomique",
    ],
    alternates: {
      canonical: `${SITE_CONFIG.domain}/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.seoTitle || guide.title,
      description: guide.seoDescription || guide.excerpt,
      url: `${SITE_CONFIG.domain}/guides/${guide.slug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: guide.featuredImageUrl,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
      type: "article",
      publishedTime: guide.publishedAt,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const category = getCategoryBySlug(guide.categorySlug);

  // Products featured in this guide
  const featuredProducts = (guide.featuredProductSlugs || [])
    .map((pSlug) => getProductBySlug(pSlug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  // Star / Winner Product for this guide
  const starProduct = guide.starProductSlug
    ? getProductBySlug(guide.starProductSlug)
    : featuredProducts[0];

  // Sibling guides in the same category
  const siblingGuides = guides.filter(
    (g) => g.categorySlug === guide.categorySlug && g.id !== guide.id
  );

  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case "bureaux-assis-debout":
        return <Monitor className="w-3.5 h-3.5" />;
      case "chaises-ergonomiques":
        return <Armchair className="w-3.5 h-3.5" />;
      case "supports-bras-ecrans":
        return <Layers className="w-3.5 h-3.5" />;
      case "accessoires-ergonomie":
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  // JSON-LD Structured Data (Article)
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.seoTitle || guide.title,
    description: guide.seoDescription || guide.excerpt,
    image: [guide.featuredImageUrl],
    datePublished: guide.publishedAt,
    dateModified: guide.publishedAt,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
      jobTitle: (SITE_CONFIG as any).authorRole || "Rédacteur Spécialiste",
      url: `${SITE_CONFIG.domain}/a-propos`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.domain}/icon-512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.domain}/guides/${guide.slug}`,
    },
  };

  // JSON-LD Breadcrumb
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_CONFIG.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides & Comparatifs",
        item: `${SITE_CONFIG.domain}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${SITE_CONFIG.domain}/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <div className="relative min-h-screen craft-dot-pattern overflow-x-hidden pb-16">
      <CraftDoodles />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-10 relative z-10">
        {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Accueil</span>
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/categorie/${category.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <Link href="/guides" className="hover:text-blue-600 transition-colors">
          Guides
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
          {guide.title}
        </span>
      </nav>

      {/* Guide Header Banner */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <Link
            href={`/categorie/${guide.categorySlug}`}
            className="px-3 py-1 rounded-full bg-white text-blue-700 font-bold flex items-center gap-1.5 border border-blue-200 hover:bg-blue-50 transition-colors"
          >
            {getCategoryIcon(guide.categorySlug)}
            <span>{category?.name || "Catégorie d'Équipement"}</span>
          </Link>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{guide.readingTime} de lecture</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>Mis à jour en 2026</span>
          </span>
        </div>

        <h1 className="titre text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {guide.excerpt}
        </p>
      </header>

      {/* HERO STAR PRODUCT (Le Choix en Bref) */}
      {starProduct && (
        <div id="choix-redaction">
          <GuideStarProduct product={starProduct} guideTitle={guide.title} />
        </div>
      )}

      {/* TABLEAU COMPARATIF SYNTHETIQUE */}
      {featuredProducts.length >= 2 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-blue-600" />
            <h2 className="titre text-2xl font-bold text-slate-900">
              Tableau comparatif des modèles sélectionnés
            </h2>
          </div>
          <GuideComparisonTable products={featuredProducts} guideTitle={guide.title} />
        </section>
      )}

      {/* CONTENU PRINCIPAL DU DOSSIER D'ACHAT (HTML riche balisé & aéré) */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
        <div
          className="guide-article-content"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />
      </article>

      {/* TOP 3 PODIUM INLINE DE RAPPEL */}
      {featuredProducts.length >= 3 && category && (
        <section className="pt-6 border-t border-slate-200">
          <TopThreePodium products={featuredProducts} categoryName={category.name} />
        </section>
      )}

      {/* FAQ SPÉCIFIQUE DU GUIDE */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="pt-6 border-t border-slate-200">
          <CategoryFAQ
            categoryName={category?.name || "ce guide"}
            faqs={guide.faqs}
          />
        </section>
      )}

      {/* GUIDES LIÉS / SUR LA MÊME TECHNIQUE */}
      {siblingGuides.length > 0 && (
        <section className="pt-8 border-t border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="titre text-xl sm:text-2xl font-bold text-slate-900">
                Autres Guides & Comparatifs Recommandés
              </h2>
            </div>
            <Link
              href="/guides"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Tous les guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siblingGuides.map((sib) => (
              <article
                key={sib.id}
                className="p-5 rounded-3xl bg-white border-2 border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    Guide Comparatif
                  </span>
                  <h3 className="titre font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                    <Link href={`/guides/${sib.slug}`}>{sib.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {sib.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Lecture {sib.readingTime}</span>
                  <Link
                    href={`/guides/${sib.slug}`}
                    className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Consulter le guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Transparence & Affiliation placé discrètement en bas */}
      <AffiliateDisclaimer />

      {/* Signature Éditoriale & Charte E-E-A-T */}
      <section className="rounded-3xl p-6 sm:p-8 bg-white border-2 border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg shrink-0">
              {SITE_CONFIG.author[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{SITE_CONFIG.author}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ✓ Auteur Certifié
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{(SITE_CONFIG as any).authorRole || "Rédacteur Spécialiste"}</p>
            </div>
          </div>
          <Link
            href="/a-propos"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Notre méthodologie de test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <strong>Engagement d&apos;indépendance :</strong> Aucun fabricant ne rémunère nos sélections ni n&apos;influence nos verdicts. Chaque recommandation découle d&apos;une analyse rigoureuse des caractéristiques réelles, des retours d&apos;utilisateurs vérifiés et de tests en situation.
        </p>
      </section>

      {/* Mobile Sticky CTA Bar for the Star Product */}
      {starProduct && <StickyProductBar product={starProduct} />}
    </article>
  </div>
  );
}
