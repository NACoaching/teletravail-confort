import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ExternalLink, Table2, ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";

interface GuideComparisonTableProps {
  products: Product[];
  guideTitle: string;
}

export default function GuideComparisonTable({ products, guideTitle }: GuideComparisonTableProps) {
  if (!products || products.length === 0) return null;

  // Prenez jusqu'à 6 produits pour la table de synthèse
  const tableProducts = products.slice(0, 6);

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return {
        label: "🏆 Choix N°1",
        bg: "bg-amber-100 text-amber-900 border-amber-300",
      };
    }
    if (index === 1) {
      return {
        label: "⚡ Meilleur Rapport Q/P",
        bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
      };
    }
    if (index === 2) {
      return {
        label: "💎 Coup de Cœur",
        bg: "bg-rose-100 text-rose-900 border-rose-300",
      };
    }
    return {
      label: `Alternative #${index + 1}`,
      bg: "bg-stone-100 text-stone-700 border-stone-200",
    };
  };

  return (
    <section id="tableau-comparatif" className="pt-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#ffede6] text-[#e05238] flex items-center justify-center shrink-0">
            <Table2 className="w-4 h-4" />
          </div>
          <h2 className="titre text-xl sm:text-2xl font-bold text-[#241b16]">
            Tableau Comparatif : Coup d'Œil Rapide
          </h2>
        </div>
        <span className="text-[11px] font-semibold text-[#8c786c] bg-[#f5ede3] px-2.5 py-1 rounded-full self-start sm:self-auto sm:hidden">
          ← Faire défiler pour comparer →
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border-2 border-[#eadfd3] bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-[680px]">
          <thead>
            <tr className="bg-[#fcf7f0] border-b-2 border-[#eadfd3] text-[12px] font-bold uppercase tracking-wider text-[#7a6a5d]">
              <th scope="col" className="py-3 px-4 w-[280px]">Produit & Référence</th>
              <th scope="col" className="py-3 px-4 w-[180px]">Idéal pour...</th>
              <th scope="col" className="py-3 px-4 w-[110px] text-center">Note Avis</th>
              <th scope="col" className="py-3 px-4 w-[110px] text-center">Budget</th>
              <th scope="col" className="py-3 px-4 w-[150px] text-center">Offre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0e7dd] text-xs text-[#241b16]">
            {tableProducts.map((p, idx) => {
              const badge = getRankBadge(idx);
              const amazonUrl = p.affiliateUrl || `https://www.amazon.fr/dp/${p.amazonAsin || ""}?tag=coincreatif-21`;

              return (
                <tr
                  key={p.id || p.slug}
                  className={`hover:bg-[#fff9f4] transition ${
                    idx === 0 ? "bg-[#fffbf7]" : ""
                  }`}
                >
                  {/* Produit */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#eadfd3] shrink-0 p-1 flex items-center justify-center">
                        <Image
                          src={p.imageUrl}
                          alt={p.title}
                          width={56}
                          height={56}
                          className="object-contain max-h-full max-w-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                        <Link
                          href={`/${p.slug}`}
                          className="block font-semibold text-[#241b16] hover:text-[#e05238] line-clamp-2 leading-tight text-xs transition"
                          title={p.title}
                        >
                          {p.title}
                        </Link>
                        {p.brand && (
                          <span className="text-[10px] text-[#8c786c] font-medium block">
                            Par {p.brand}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Idéal pour */}
                  <td className="py-3.5 px-4 text-[#5c4a3e] leading-snug">
                    <span className="font-medium">
                      {p.targetAudience || p.tagline || "Créatifs débutants à confirmés"}
                    </span>
                  </td>

                  {/* Note */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1 font-bold text-[#241b16]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{p.rating || 4.7}</span>
                      <span className="text-[10px] text-[#8c786c]">/5</span>
                    </div>
                    {p.reviewCount && (
                      <span className="block text-[10px] text-[#8c786c]">
                        ({p.reviewCount} avis)
                      </span>
                    )}
                  </td>

                  {/* Prix */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#fdf2e9] text-[#b34024] font-bold text-xs border border-[#fad8ca]">
                      {p.priceIndication || p.priceRange || "Voir offre"}
                    </span>
                  </td>

                  {/* CTA */}
                  <td className="py-3.5 px-4 text-center">
                    <a
                      href={amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      data-affiliate-link="true"
                      data-product-name={p.title}
                      data-site="teletravail-confort.com"
                      data-asin={p.amazonAsin || ""}
                      data-position-zone="Tableau Comparatif Guide"
                      className="inline-flex items-center justify-center gap-1 w-full py-2 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xs hover:shadow transition transform active:scale-95"
                    >
                      <span>Voir le prix</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
