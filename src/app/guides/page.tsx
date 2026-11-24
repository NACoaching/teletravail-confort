import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  Monitor,
  Armchair,
  Layers,
  Award,
} from "lucide-react";
import { guides, categories, getProductBySlug } from "@/lib/data";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Guides d'Achat & Comparatifs Ergonomie 2026 | ${SITE_CONFIG.name}`,
  description:
    "Comparatifs d'experts et guides d'aménagement pour télétravailler dans un confort absolu : bureaux assis-debout, chaises ergonomiques, bras d'écrans et accessoires posturaux.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/guides`,
  },
};

export default function GuidesPage() {
  const getCategoryTheme = (slug: string) => {
    switch (slug) {
      case "bureaux-assis-debout":
        return {
          icon: Monitor,
          name: "Bureaux Assis-Debout",
          badgeBg: "bg-blue-100 text-blue-800 border-blue-200",
          accentBorder: "hover:border-blue-400",
        };
      case "chaises-ergonomiques":
        return {
          icon: Armchair,
          name: "Chaises Ergonomiques",
          badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          accentBorder: "hover:border-emerald-400",
        };
      case "supports-bras-ecrans":
        return {
          icon: Layers,
          name: "Supports Écrans",
          badgeBg: "bg-indigo-100 text-indigo-900 border-indigo-200",
          accentBorder: "hover:border-indigo-400",
        };
      case "accessoires-ergonomie":
      default:
        return {
          icon: Sparkles,
          name: "Accessoires & Confort",
          badgeBg: "bg-sky-100 text-sky-900 border-sky-200",
          accentBorder: "hover:border-sky-400",
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Hero Banner: Design Moderne & Ergonomique */}
      <div className="rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-blue-50/90 via-slate-50 to-indigo-50/70 p-7 sm:p-12 border-2 border-blue-200/90 shadow-[0_16px_40px_-10px_rgba(37,99,235,0.12)] relative overflow-hidden text-slate-900">
        {/* Radial glow effects */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-blue-700 text-xs font-bold border border-blue-200 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Centre de Guides & Comparatifs 2026</span>
          </div>

          <h1 className="titre text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Les Guides d&apos;Achat & Comparatifs Ergonomie & Home Office.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Pour chaque équipement de télétravail, nous comparons les options incontournables, décryptons les pièges posturaux et sélectionnons le matériel au meilleur rapport ergonomie/prix.
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors shadow-xs"
                >
                  <Icon className="w-3.5 h-3.5 text-blue-600" />
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
              className={`bg-white rounded-[2rem] border-2 border-slate-200 overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-blue-500/10 ${theme.accentBorder}`}
            >
              <div>
                {/* Feature Image with Badges */}
                <div className="relative w-full h-52 bg-slate-50 overflow-hidden">
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
                  <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>{guide.readingTime}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h2 className="titre font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {guide.excerpt}
                  </p>

                  {/* Star product spotlight pill */}
                  {starProd && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 mt-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white border border-slate-200">
                        <Image
                          src={starProd.imageUrl}
                          alt={starProd.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>Recommandé :</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {starProd.title}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {starProd.priceIndication}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {guide.featuredProductSlugs?.length || 0} produits comparés
                  </span>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
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
