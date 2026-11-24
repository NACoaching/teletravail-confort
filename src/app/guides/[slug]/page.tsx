import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Scissors,
  Palette,
  PenTool,
  Stamp,
  Shapes,
  Feather,
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
    alternates: {
      canonical: `${SITE_CONFIG.domain}/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.seoTitle || guide.title,
      description: guide.seoDescription || guide.excerpt,
      url: `${SITE_CONFIG.domain}/guides/${guide.slug}`,
      siteName: SITE_CONFIG.name,
      images: [{ url: guide.featuredImageUrl }],
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt || guide.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.seoTitle || guide.title,
      description: guide.seoDescription || guide.excerpt,
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

  // Find star product if designated, or fallback to first featured product
  const starProduct = guide.starProductSlug
    ? getProductBySlug(guide.starProductSlug)
    : guide.featuredProductSlugs?.length > 0
    ? getProductBySlug(guide.featuredProductSlugs[0])
    : null;

  // Find all featured products in this guide
  const featuredProducts = products.filter((p) =>
    guide.featuredProductSlugs?.includes(p.id) || guide.featuredProductSlugs?.includes(p.slug)
  );

  // Sibling guides in the same category
  const siblingGuides = guides.filter(
    (g) => g.categorySlug === guide.categorySlug && g.id !== guide.id
  );

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "scrapbooking":
        return <Scissors className="w-3.5 h-3.5" />;
      case "aquarelle-peinture":
        return <Palette className="w-3.5 h-3.5" />;
      case "dessin-feutres":
        return <PenTool className="w-3.5 h-3.5" />;
      case "linogravure":
        return <Stamp className="w-3.5 h-3.5" />;
      case "modelage-argile":
        return <Shapes className="w-3.5 h-3.5" />;
      case "carterie-calligraphie":
      default:
        return <Feather className="w-3.5 h-3.5" />;
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
    dateModified: guide.updatedAt || guide.publishedAt,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
      url: `${SITE_CONFIG.domain}/a-propos`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.domain}/icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.domain}/guides/${guide.slug}`,
    },
  };

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
        name: category?.name || "Rayon",
        item: `${SITE_CONFIG.domain}/categorie/${guide.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Guides & Dossiers",
        item: `${SITE_CONFIG.domain}/guides`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: guide.title,
        item: `${SITE_CONFIG.domain}/guides/${guide.slug}`,
      },
    ],
  };

  // JSON-LD Structured Data (FAQPage)
  const jsonLdFaq = guide.faqs && guide.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}

      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-[#8c786c] flex-wrap">
        <Link href="/" className="hover:text-[#e05238] flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Accueil</span>
        </Link>
        <span>/</span>
        <Link
          href={`/categorie/${guide.categorySlug}`}
          className="hover:text-[#e05238] transition-colors"
        >
          {category?.name || "Rayon"}
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-[#e05238] transition-colors">
          Guides
        </Link>
        <span>/</span>
        <span className="text-[#241b16] font-semibold truncate max-w-xs">
          {guide.title}
        </span>
      </nav>

      {/* Guide Header Banner */}
      <header className="rounded-[2.5rem] bg-gradient-to-br from-white via-[#fffaf5] to-[#f7eee4] p-7 sm:p-10 border-2 border-[#eadfd3] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#75645b]">
          <Link
            href={`/categorie/${guide.categorySlug}`}
            className="px-3 py-1 rounded-full bg-white text-[#e05238] font-bold flex items-center gap-1.5 border border-orange-200 hover:bg-[#fff0ea] transition-colors"
          >
            {getCategoryIcon(guide.categorySlug)}
            <span>{category?.name || "Rayon d'Atelier"}</span>
          </Link>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{guide.readingTime} de lecture</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>Mis à jour en 2026</span>
          </span>
        </div>

        <h1 className="titre text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#241b16] leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-[#5a493e] leading-relaxed">
          {guide.excerpt}
        </p>
      </header>

      {/* HERO STAR PRODUCT (Le Choix en Bref) */}
      {starProduct && (
        <div id="choix-atelier">
          <GuideStarProduct product={starProduct} guideTitle={guide.title} />
        </div>
      )}

      {/* TABLEAU COMPARATIF SYNTHETIQUE */}
      {featuredProducts.length >= 2 && (
        <GuideComparisonTable
          products={featuredProducts}
          guideTitle={guide.title}
        />
      )}

      {/* Article Content */}
      <article
        id="guide-analyse"
        className="prose max-w-none text-[#241b16] leading-relaxed space-y-4 bg-white p-7 sm:p-10 rounded-[2rem] border-2 border-[#eadfd3] [&>h2]:titre [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#241b16] [&>h2]:pt-8 [&>h2]:border-t [&>h2]:border-[#eadfd3] [&>h2:first-of-type]:pt-0 [&>h2:first-of-type]:border-t-0 [&>p]:leading-relaxed [&>p]:text-[#5a493e] [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:text-[#5a493e] [&>ol]:space-y-3 [&>ol]:pl-5 [&>ol]:list-decimal [&>ol]:text-[#5a493e] [&>strong]:text-[#241b16] [&>strong]:font-bold"
        dangerouslySetInnerHTML={{ __html: guide.content }}
      />

      {/* PODIUM COMPARATIF TOP 3 */}
      {featuredProducts.length >= 3 && (
        <section id="podium-comparatif" className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#e05238]" />
            <h2 className="titre text-2xl sm:text-3xl font-bold text-[#241b16]">
              Podium Comparatif : Les 3 Meilleures Options
            </h2>
          </div>
          <TopThreePodium
            products={featuredProducts}
            categoryName={category?.name || "ce guide"}
          />
        </section>
      )}

      {/* All Featured Products in this guide */}
      {featuredProducts.length > 0 && (
        <section id="tout-le-materiel" className="pt-8 border-t-2 border-[#eadfd3] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#e05238]" />
              <h2 className="titre text-2xl font-bold text-[#241b16]">
                Tout le Matériel Recommandé dans ce Dossier
              </h2>
            </div>
            <span className="text-xs text-[#8c786c] font-semibold">
              {featuredProducts.length} articles testés
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ Accordion with Schema.org */}
      {guide.faqs && guide.faqs.length > 0 && (
        <div id="questions-frequentes">
          <CategoryFAQ
            categoryName={category?.name || guide.title}
            faqs={guide.faqs}
          />
        </div>
      )}

      {/* Sibling guides in the same category */}
      {siblingGuides.length > 0 && (
        <section className="pt-8 border-t-2 border-[#eadfd3] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#e05238]" />
              <h2 className="titre text-2xl font-bold text-[#241b16]">
                À lire aussi dans le rayon {category?.name || "associé"}
              </h2>
            </div>
            <Link
              href="/guides"
              className="text-xs font-bold text-[#e05238] hover:underline flex items-center gap-1"
            >
              <span>Tous les guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {siblingGuides.slice(0, 2).map((sib) => (
              <article
                key={sib.id}
                className="p-5 rounded-3xl bg-white border-2 border-[#eadfd3] hover:border-orange-300 transition-all flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#e05238] uppercase tracking-wider block mb-1">
                    Dossier d&apos;Atelier
                  </span>
                  <h3 className="titre font-bold text-base text-[#241b16] group-hover:text-[#e05238] transition-colors leading-snug mb-2">
                    <Link href={`/guides/${sib.slug}`}>{sib.title}</Link>
                  </h3>
                  <p className="text-xs text-[#5a493e] line-clamp-2 leading-relaxed">
                    {sib.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#eadfd3] flex items-center justify-between text-xs">
                  <span className="text-[#8c786c]">Lecture {sib.readingTime}</span>
                  <Link
                    href={`/guides/${sib.slug}`}
                    className="font-bold text-[#e05238] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
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

      {/* Author note / CTA box */}
      <div className="rounded-3xl p-7 bg-white border-2 border-[#eadfd3] space-y-2">
        <h3 className="titre font-bold text-[#241b16] text-base">
          Notre Engagement d&apos;Impartialité en Atelier
        </h3>
        <p className="text-xs sm:text-sm text-[#5a493e] leading-relaxed">
          Aucune marque ne sponsorise nos comparatifs. Chaque produit cité dans ce guide a été sélectionné pour sa robustesse, sa régularité et son rapport qualité/prix réel sur votre table de travail afin de vous éviter tout gaspillage d&apos;outillage.
        </p>
      </div>

      {/* Mobile Sticky CTA Bar for the Star Product */}
      {starProduct && <StickyProductBar product={starProduct} />}
    </div>
  );
}
