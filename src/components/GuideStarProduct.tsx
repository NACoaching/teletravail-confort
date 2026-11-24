import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShieldCheck, ArrowRight, Award, CheckCircle2, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import AmazonButton from "@/components/AmazonButton";

interface GuideStarProductProps {
  product: Product;
  guideTitle?: string;
}

export default function GuideStarProduct({ product }: GuideStarProductProps) {
  if (!product) return null;

  return (
    <aside
      aria-label="Le Choix N°1 de la Rédaction"
      className="relative rounded-[2.5rem] p-6 sm:p-8 bg-gradient-to-br from-blue-50/90 via-slate-50 to-white border-2 border-blue-200/90 shadow-lg shadow-blue-500/5 my-8 overflow-hidden"
    >
      {/* Decorative top ribbon */}
      <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase tracking-wider py-1.5 px-6 rounded-bl-2xl shadow-xs flex items-center gap-1.5">
        <Award className="w-3.5 h-3.5" />
        <span>Le Choix N°1 de la Rédaction</span>
      </div>

      <div className="flex items-center gap-2 mb-4 pt-1 sm:pt-0">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Notre Recommandation en Bref</span>
        </span>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Testé & validé par l&apos;équipe
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Product Image */}
        <div className="md:col-span-4 relative aspect-square w-full max-w-[240px] mx-auto md:max-w-none rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 240px, 280px"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          {product.badge && (
            <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right: Product Details & CTA */}
        <div className="md:col-span-8 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-extrabold text-blue-600 uppercase tracking-wider">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-slate-900">{product.rating} / 5</span>
                <span className="text-slate-500 text-[10px]">
                  ({product.reviewCount.toLocaleString("fr-FR")} avis)
                </span>
              </div>
            </div>

            <h3 className="titre text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              <Link href={`/${product.slug}`} className="hover:text-blue-600 transition-colors">
                {product.title}
              </Link>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
              {product.tagline}
            </p>
          </div>

          {/* Pros bullet list */}
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-900">
            {product.pros.slice(0, 3).map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>

          {/* Pricing & CTA Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200">
            <div>
              <div className="text-[11px] text-slate-500">Fourchette constatée :</div>
              <div className="titre text-xl font-bold text-slate-900">
                {product.priceIndication}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/${product.slug}`}
                className="text-xs font-bold text-slate-600 hover:text-blue-600 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Fiche test</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <AmazonButton
                url={product.affiliateUrl}
                size="md"
                className="shadow-md shadow-blue-500/10"
              />
            </div>
          </div>

          <p className="text-[10px] text-center sm:text-left text-slate-500 flex items-center justify-center sm:justify-start gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Tarifs vérifiés & commande sécurisée sur Amazon.fr</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
