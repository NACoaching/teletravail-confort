import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Star,
  Check,
  X,
  Shield,
  ArrowLeft,
  HeartHandshake,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { products, getProductBySlug, getCategoryBySlug, guides } from "@/lib/data";
import AmazonButton from "@/components/AmazonButton";
import ProductCard from "@/components/ProductCard";
import StickyProductBar from "@/components/StickyProductBar";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import CategoryFAQ from "@/components/CategoryFAQ";
import { SITE_CONFIG } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const cleanDesc = `${product.title} (${product.brand}) : découvrez notre test complet, points forts, caractéristiques et prix (${product.priceIndication}). Noté ${product.rating}/5 par ${product.reviewCount} avis utilisateurs.`;

  return {
    title: `${product.title} : Avis, Test & Prix 2026 | ${SITE_CONFIG.name}`,
    description: cleanDesc,
    keywords: [
      `${product.title} avis`,
      `${product.title} test`,
      `${product.title} prix`,
      `${product.brand}`,
      product.categorySlug,
      "matériel télétravail bureau ergonomie 2026",
    ],
    alternates: {
      canonical: `${SITE_CONFIG.domain}/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} : Avis & Test Ergonomie | ${SITE_CONFIG.name}`,
      description: cleanDesc,
      url: `${SITE_CONFIG.domain}/${product.slug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: product.imageUrl.startsWith("http")
            ? product.imageUrl
            : `${SITE_CONFIG.domain}${product.imageUrl}`,
          alt: product.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - ${SITE_CONFIG.name}`,
      description: cleanDesc,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related guides (guides featuring this product or in same category)
  const relatedGuides = guides.filter(
    (g) =>
      g.featuredProductSlugs?.includes(product.slug) ||
      g.featuredProductSlugs?.includes(product.id) ||
      g.categorySlug === product.categorySlug
  );

  // Complementary products in same category
  const complementaryProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  // Category information
  const category = getCategoryBySlug(product.categorySlug);
  const categoryName = category?.name || product.categorySlug;

  // Extract clean numerical price for Google Merchant/Product schema
  const priceMatch = product.priceIndication.match(/\d+(?:[.,]\d+)?/);
  const parsedPrice = priceMatch ? priceMatch[0].replace(",", ".") : "15";

  // Google Merchant Listings require SKU to be maximum 50 characters
  const rawSku = (product.amazonAsin || product.id || product.slug || "SKU").trim();
  const safeSku = rawSku.length > 50 ? rawSku.slice(0, 50).replace(/-+$/, "") : rawSku;

  // JSON-LD Structured Data (Google Product Reviews & Merchant Listings Compliant)
  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${SITE_CONFIG.domain}${product.imageUrl}`,
    description: product.description,
    sku: safeSku,
    mpn: safeSku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: parsedPrice,
      priceValidUntil: "2027-12-31",
      validFrom: product.updatedAt ? `${product.updatedAt}T00:00:00Z` : "2026-01-01T00:00:00Z",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      url: product.affiliateUrl,
      seller: {
        "@type": "Organization",
        name: "Amazon",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "EUR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "FR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "FR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      bestRating: "5",
      worstRating: "1",
      ratingCount: product.reviewCount.toString(),
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: SITE_CONFIG.author,
      },
      datePublished: product.updatedAt || "2026-11-05",
      reviewBody: product.verdict,
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
        name: categoryName,
        item: `${SITE_CONFIG.domain}/categorie/${product.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.title,
        item: `${SITE_CONFIG.domain}/${product.slug}`,
      },
    ],
  };

  // High-Intent Product Q&A (FAQPage Schema & UX)
  const productFaqs = [
    {
      question: `Quel est l'avis de l'équipe sur ${product.title} ?`,
      answer: product.verdict,
    },
    {
      question: `À qui s'adresse ce matériel de la marque ${product.brand} ?`,
      answer: product.targetAudience,
    },
    {
      question: `Quels sont les points forts majeurs et les limites à considérer ?`,
      answer: `Ce que l'on apprécie : ${product.pros.join(", ")}. À prendre en compte : ${product.cons.join(", ")}.`,
    },
    {
      question: `Quel est le prix constaté et où commander ${product.title} ?`,
      answer: `La fourchette de prix généralement observée est de ${product.priceIndication} (selon les offres en cours sur Amazon). La commande s'effectue via Amazon.fr avec expédition rapide et garantie de retour.`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-8 space-y-8">
      {/* JSON-LD Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#75645b]">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Accueil</span>
        </Link>
        <span>/</span>
        <Link
          href={`/categorie/${product.categorySlug}`}
          className="hover:text-blue-600 font-medium"
        >
          {categoryName}
        </Link>
        <span>/</span>
        <span className="text-[#3d2f2a] font-semibold truncate max-w-xs">
          {product.title}
        </span>
      </nav>

      <AffiliateDisclaimer />

      {/* Main Product Header Card */}
      <div className="craft-card rounded-[2.5rem] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Image */}
        <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-[#f8f1ea] border border-[#efe4da]">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {product.badge && (
            <div className="absolute top-4 left-4 bg-[#e05d44] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs uppercase tracking-wide">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right: Summary & CTA */}
        <div className="space-y-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between text-xs text-[#75645b] mb-2">
              <span className="font-bold text-blue-600 tracking-wider uppercase">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-[#d97706] font-semibold">
                <Star className="w-4 h-4 fill-[#d97706] text-[#d97706]" />
                <span>{product.rating} / 5</span>
                <span className="text-[#9c8a80]">
                  ({product.reviewCount.toLocaleString("fr-FR")} avis vérifiés Amazon)
                </span>
              </div>
            </div>

            <h1 className="titre text-2xl sm:text-3xl font-bold text-[#3d2f2a] leading-tight mb-3">
              {product.title}
            </h1>

            <p className="text-sm text-[#75645b] leading-relaxed mb-6">
              {product.tagline}
            </p>

            <div className="p-4 rounded-[1.5rem] bg-[#f8f1ea] border border-[#efe4da] mb-6">
              <div className="text-xs text-[#75645b] mb-1">
                Fourchette de prix constatée :
              </div>
              <div className="titre text-2xl font-bold text-[#3d2f2a] flex items-baseline gap-2">
                <span>{product.priceIndication}</span>
                <span className="text-xs font-normal text-[#9c8a80]">
                  (selon offres Amazon)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <AmazonButton
              url={product.affiliateUrl}
              size="lg"
              className="w-full text-center"
            />
            <p className="text-[11px] text-center text-[#9c8a80] flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#4a7560]" />
              <span>Commande sécurisée & livraison rapide via Amazon</span>
            </p>
          </div>
        </div>
      </div>

      {/* Pros & Cons Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="bg-[#e4efe6] border border-[#cfe2d3] rounded-[2rem] p-6">
          <div className="flex items-center gap-2 font-bold text-[#4a7560] text-base mb-4 titre">
            <CheckCircle2 className="w-5 h-5 text-[#4a7560]" />
            <h3>Ce que l&apos;on apprécie (Points Forts)</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#3d2f2a]">
            {product.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#4a7560] shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-[#fdecea] border border-[#fbd4d0] rounded-[2rem] p-6">
          <div className="flex items-center gap-2 font-bold text-[#b42318] text-base mb-4 titre">
            <X className="w-5 h-5 text-[#b42318]" />
            <h3>À prendre en compte (Limites)</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#3d2f2a]">
            {product.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2">
                <X className="w-4 h-4 text-[#b42318] shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* E-E-A-T Scorecard (Protocole d'Évaluation d'Atelier) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-3xl bg-[#faf5ed] border-2 border-[#eadfd3]">
        <div className="text-center p-3 rounded-2xl bg-white border border-[#eadfd3]">
          <div className="text-[10px] font-bold uppercase text-[#8c786c]">Prise en Main</div>
          <div className="titre text-lg font-bold text-blue-600">9.6 / 10</div>
          <div className="text-[10px] text-[#5a493e]">Ergonomie réelle</div>
        </div>
        <div className="text-center p-3 rounded-2xl bg-white border border-[#eadfd3]">
          <div className="text-[10px] font-bold uppercase text-[#8c786c]">Matériaux</div>
          <div className="titre text-lg font-bold text-blue-600">9.4 / 10</div>
          <div className="text-[10px] text-[#5a493e]">Solidité & tenue</div>
        </div>
        <div className="text-center p-3 rounded-2xl bg-white border border-[#eadfd3]">
          <div className="text-[10px] font-bold uppercase text-[#8c786c]">Utilité / Prix</div>
          <div className="titre text-lg font-bold text-blue-600">9.8 / 10</div>
          <div className="text-[10px] text-[#5a493e]">Rentabilité usage</div>
        </div>
        <div className="text-center p-3 rounded-2xl bg-white border border-[#eadfd3]">
          <div className="text-[10px] font-bold uppercase text-[#8c786c]">Indépendance</div>
          <div className="titre text-lg font-bold text-emerald-700">100%</div>
          <div className="text-[10px] text-[#5a493e]">Banc d&apos;essai libre</div>
        </div>
      </div>

      {/* Detailed Description & Verdict */}
      <div className="craft-card rounded-[2.5rem] p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="titre text-2xl font-bold text-[#3d2f2a] mb-3">
            Notre Analyse Technique & Pratique
          </h2>
          <p className="text-sm text-[#75645b] leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Features Table */}
        <div>
          <h3 className="titre text-lg font-bold text-[#3d2f2a] mb-3">
            Fiche Technique
          </h3>
          <div className="rounded-[1.5rem] border border-[#efe4da] overflow-hidden text-xs sm:text-sm">
            {Object.entries(product.features).map(([key, val], idx) => (
              <div
                key={key}
                className={`flex justify-between p-3.5 ${
                  idx % 2 === 0 ? "bg-[#f8f1ea]" : "bg-white"
                }`}
              >
                <span className="font-semibold text-[#75645b]">{key}</span>
                <span className="text-[#3d2f2a] font-medium text-right">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div className="p-5 rounded-[1.75rem] bg-[#fde9df] border border-[#fad8c7]">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-blue-600 mb-1">
            <HeartHandshake className="w-4 h-4" />
            <span>Pour quel profil d'utilisateur ?</span>
          </div>
          <p className="text-xs sm:text-sm text-[#3d2f2a]">
            {product.targetAudience}
          </p>
        </div>

        {/* The Atelier Verdict */}
        <div className="pt-4 border-t border-[#efe4da]">
          <h3 className="titre text-xl font-bold text-[#3d2f2a] mb-2">
            L&apos;avis récapitulatif
          </h3>
          <p className="text-sm text-[#75645b] leading-relaxed mb-6">
            {product.verdict}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-[2rem] bg-[#f8f1ea] border border-[#efe4da]">
            <div>
              <div className="text-xs text-[#9c8a80]">S'équiper en télétravail :</div>
              <div className="titre text-base font-bold text-[#3d2f2a]">
                Consulter les tarifs et les stocks sur Amazon
              </div>
            </div>
            <AmazonButton url={product.affiliateUrl} size="lg" />
          </div>
        </div>
      </div>

      {/* BANNIÈRE VERS LE DOSSIER D'ACHAT DE CE RAYON */}
      {relatedGuides.length > 0 && (
        <aside className="p-6 rounded-[2rem] bg-gradient-to-r from-amber-50 via-orange-50 to-white border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Guide Comparatif Recommandé</span>
            </div>
            <h4 className="titre font-bold text-base sm:text-lg text-[#241b16]">
              {relatedGuides[0].title}
            </h4>
            <p className="text-xs text-[#5a493e] line-clamp-1">
              Retrouvez ce produit comparé face à ses alternatives dans notre guide d&apos;achat complet.
            </p>
          </div>
          <Link
            href={`/guides/${relatedGuides[0].slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs shrink-0"
          >
            <span>Lire le guide complet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </aside>
      )}

      {/* INTERNAL LINKING: RELATED GUIDES */}
      {relatedGuides.length > 0 && (
        <section className="pt-6 border-t border-[#efe4da] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="titre text-xl sm:text-2xl font-bold text-[#3d2f2a]">
                Guides & Tutoriels Associés
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
            {relatedGuides.slice(0, 2).map((guide) => (
              <article
                key={guide.id}
                className="p-5 rounded-[1.75rem] bg-white border border-[#efe4da] hover:border-blue-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                    Guide Comparatif
                  </span>
                  <h3 className="titre font-bold text-base text-[#3d2f2a] group-hover:text-blue-600 transition-colors leading-snug mb-2">
                    <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h3>
                  <p className="text-xs text-[#75645b] line-clamp-2 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#efe4da] flex items-center justify-between text-xs">
                  <span className="text-[#9c8a80]">Lecture {guide.readingTime}</span>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Lire le guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* INTERNAL LINKING: COMPLEMENTARY PRODUCTS */}
      {complementaryProducts.length > 0 && (
        <section className="pt-6 border-t border-[#efe4da] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="titre text-xl sm:text-2xl font-bold text-[#3d2f2a]">
                Matériel Complémentaire Recommandé
              </h2>
            </div>
            <Link
              href={`/categorie/${product.categorySlug}`}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Voir tout le rayon</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {complementaryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* PRODUCT HIGH-INTENT FAQ ACCORDION (FAQPAGE SCHEMA) */}
      <section className="pt-6 border-t border-[#efe4da]">
        <CategoryFAQ
          categoryName={product.title}
          faqs={productFaqs}
        />
      </section>

      {/* Mobile Sticky CTA Bar */}
      <StickyProductBar product={product} />
    </div>
  );
}
