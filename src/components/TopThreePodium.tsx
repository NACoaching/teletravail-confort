import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Lightbulb, Sparkles, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { Product } from "@/lib/types";
import AmazonButton from "@/components/AmazonButton";

interface TopThreePodiumProps {
  products: Product[];
  categoryName: string;
}

export default function TopThreePodium({ products, categoryName }: TopThreePodiumProps) {
  if (!products || products.length < 3) return null;

  // Sélections intelligentes selon les badges ou les notes (sans doublons)
  const topPick =
    products.find((p) => p.badge?.includes("Best-Seller") || p.badge?.includes("Indispensable")) ||
    products[0];

  const valuePick =
    products.find(
      (p) =>
        p.id !== topPick.id &&
        (p.badge?.includes("Qualité/Prix") || p.badge?.includes("Accessible") || p.priceRange === "€")
    ) ||
    products.find((p) => p.id !== topPick.id) ||
    products[1];

  const favoritePick =
    products.find(
      (p) =>
        p.id !== topPick.id &&
        p.id !== valuePick.id &&
        (p.badge?.includes("Cœur") || p.badge?.includes("Polyvalence") || p.badge?.includes("Culte"))
    ) ||
    products.find((p) => p.id !== topPick.id && p.id !== valuePick.id) ||
    products[2];

  const podium = [
    {
      product: topPick,
      label: "Choix N°1 de la Rédaction",
      tagline: "Le plus plébiscité & testé",
      icon: Trophy,
      badgeStyle: "bg-amber-100 text-amber-900 border-amber-300",
      cardBorder: "border-amber-300 ring-2 ring-amber-100 bg-white",
      ribbonBg: "bg-amber-500 text-white",
    },
    {
      product: valuePick,
      label: "Meilleur Rapport Qualité/Prix",
      tagline: "Le bon compromis budget",
      icon: Lightbulb,
      badgeStyle: "bg-blue-100 text-blue-900 border-blue-300",
      cardBorder: "border-blue-200 bg-white",
      ribbonBg: "bg-blue-600 text-white",
    },
    {
      product: favoritePick,
      label: "Coup de Cœur Ergonomie",
      tagline: "Idéal pour bien débuter",
      icon: Sparkles,
      badgeStyle: "bg-indigo-100 text-indigo-900 border-indigo-200",
      cardBorder: "border-indigo-200 bg-white",
      ribbonBg: "bg-indigo-600 text-white",
    },
  ];

  return (
    <section className="mb-14">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Trophy className="w-3.5 h-3.5 text-blue-600" />
            <span>Verdict Express Ergonomie</span>
          </div>
          <h2 className="titre text-2xl sm:text-3xl font-bold text-slate-900">
            Le Top 3 des experts en {categoryName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pressé(e) ? Voici les 3 références les plus recommandées selon vos besoins d&apos;aménagement.
          </p>
        </div>
      </div>

      {/* Podium 3 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        {podium.map(({ product, label, tagline, icon: Icon, cardBorder, ribbonBg }) => {
          const firstPro = product.pros?.[0] || product.tagline;

          return (
            <div
              key={product.id}
              className={`rounded-3xl p-5 border-2 ${cardBorder} shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Top Ribbon */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${ribbonBg} shadow-2xs`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </span>
                <span className="text-[11px] font-medium text-slate-500">{product.priceIndication}</span>
              </div>

              {/* Product Visual */}
              <Link href={`/${product.slug}`} className="group/img block mb-3 relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {product.brand}
                  </span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span className="font-bold text-slate-900">{product.rating}</span>
                    <span>({product.reviewCount.toLocaleString("fr-FR")})</span>
                  </div>
                </div>

                <Link
                  href={`/${product.slug}`}
                  className="titre font-bold text-base text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2"
                >
                  {product.title}
                </Link>

                {/* Key Benefit */}
                <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-700 flex items-start gap-2 mb-4 mt-auto border border-slate-200/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-snug">{firstPro}</span>
                </div>

                {/* CTA Action */}
                <div className="space-y-2 pt-2">
                  <AmazonButton
                    url={product.affiliateUrl}
                    label="Voir sur Amazon"
                    size="sm"
                    className="w-full text-xs py-2.5 justify-center"
                  />
                  <Link
                    href={`/${product.slug}`}
                    className="inline-flex items-center justify-center gap-1 w-full text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors py-1"
                  >
                    <span>Lire le test complet & avis</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
