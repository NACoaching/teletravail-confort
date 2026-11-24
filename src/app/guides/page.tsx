import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  Scissors,
  Palette,
  PenTool,
  Stamp,
  Shapes,
  Feather,
  CheckCircle2,
  Award,
} from "lucide-react";
import { guides, categories, getProductBySlug } from "@/lib/data";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Guides d'Achat & Dossiers d'Atelier 2026 | ${SITE_CONFIG.name}`,
  description:
    "Comparatifs d'experts et guides pas-à-pas pour choisir votre matériel d'art et loisirs créatifs : scrapbooking, aquarelle, dessin, linogravure, modelage et carterie.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/guides`,
  },
};

export default function GuidesPage() {
  const getCategoryTheme = (slug: string) => {
    switch (slug) {
      case "scrapbooking":
        return {
          icon: Scissors,
          name: "Scrapbooking & Découpe",
          badgeBg: "bg-rose-100 text-rose-800 border-rose-200",
          accentBorder: "hover:border-rose-400",
        };
      case "aquarelle-peinture":
        return {
          icon: Palette,
          name: "Aquarelle & Lavis",
          badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
          accentBorder: "hover:border-amber-400",
        };
      case "dessin-feutres":
        return {
          icon: PenTool,
          name: "Dessin & Feutres",
          badgeBg: "bg-indigo-100 text-indigo-900 border-indigo-200",
          accentBorder: "hover:border-indigo-400",
        };
      case "linogravure":
        return {
          icon: Stamp,
          name: "Linogravure & Estampe",
          badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          accentBorder: "hover:border-emerald-400",
        };
      case "modelage-argile":
        return {
          icon: Shapes,
          name: "Modelage & Argile",
          badgeBg: "bg-sky-100 text-sky-900 border-sky-200",
          accentBorder: "hover:border-sky-400",
        };
      case "carterie-calligraphie":
      default:
        return {
          icon: Feather,
          name: "Carterie & Sceaux",
          badgeBg: "bg-purple-100 text-purple-900 border-purple-200",
          accentBorder: "hover:border-purple-400",
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Hero Banner: Lumineux, Chaleureux & Atelier Créatif */}
      <div className="rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#FFF5ED] via-[#FFEADB] to-[#FED6BF] p-7 sm:p-12 border-2 border-[#F9BA98] shadow-[0_16px_40px_-10px_rgba(224,82,56,0.18)] relative overflow-hidden text-[#2D1B13]">
        {/* Warm artistic radial glow effects */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-300/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-300/35 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#C2410C] text-xs font-bold border border-orange-300/80 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#E05238]" />
            <span>Bibliothèque d&apos;Atelier 2026</span>
          </div>

          <h1 className="titre text-3xl sm:text-5xl font-bold text-[#2D1B13] tracking-tight leading-tight">
            Les Guides d&apos;Achat & Comparatifs d&apos;Atelier.
          </h1>

          <p className="text-sm sm:text-base text-[#5C3C2C] leading-relaxed font-normal">
            Pour chaque discipline créative, nous comparons les outils indispensables, décryptons les pièges à éviter et vous sélectionnons le matériel au meilleur rapport qualité/prix réel sur table de travail.
          </p>

          {/* Quick jump pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => {
              const theme = getCategoryTheme(cat.slug);
              const Icon = theme.icon;
              return (
                <Link
                  key={cat.id}
                  href={`/categorie/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-[#2D1B13] border border-orange-200 hover:border-orange-400 hover:text-[#e05238] transition-colors shadow-xs"
                >
                  <Icon className="w-3.5 h-3.5 text-[#e05238]" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <AffiliateDisclaimer />

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {guides.map((guide) => {
          const theme = getCategoryTheme(guide.categorySlug);
          const Icon = theme.icon;
          const starProd = guide.starProductSlug ? getProductBySlug(guide.starProductSlug) : null;

          return (
            <article
              key={guide.id}
              className={`bg-white rounded-[2rem] border-2 border-[#eadfd3] overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-orange-500/10 ${theme.accentBorder}`}
            >
              <div>
                {/* Feature Image with Badges */}
                <div className="relative w-full h-52 bg-[#faf5ed] overflow-hidden">
                  <Image
                    src={guide.featuredImageUrl}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 border ${theme.badgeBg}`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{theme.name}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#241b16]/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>{guide.readingTime}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h2 className="titre font-bold text-lg text-[#241b16] group-hover:text-[#e05238] transition-colors leading-snug">
                    <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5a493e] leading-relaxed line-clamp-3">
                    {guide.excerpt}
                  </p>

                  {/* Star product spotlight pill */}
                  {starProd && (
                    <div className="p-3 rounded-2xl bg-[#faf5ed] border border-[#eadfd3] flex items-center gap-3 mt-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white border border-[#eadfd3]">
                        <Image
                          src={starProd.imageUrl}
                          alt={starProd.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#e05238] flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>Recommandé :</span>
                        </div>
                        <div className="text-xs font-bold text-[#241b16] truncate">
                          {starProd.title}
                        </div>
                        <div className="text-[10px] text-[#8c786c]">
                          {starProd.priceIndication}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#eadfd3] flex items-center justify-between">
                  <span className="text-[11px] text-[#8c786c] font-semibold">
                    {guide.featuredProductSlugs?.length || 0} produits comparés
                  </span>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-xs font-bold text-[#e05238] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Lire le guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
