import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Check, ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";
import AmazonButton from "./AmazonButton";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <article
      className={`craft-card rounded-[2rem] overflow-hidden flex flex-col justify-between relative transition-all border-2 ${
        featured ? "border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-200" : "border-slate-200"
      }`}
    >
      {/* Top Image + Badge */}
      <div className="relative w-full h-52 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
            {product.badge}
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
          {product.priceIndication}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-extrabold uppercase tracking-wider text-blue-600">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-slate-900">{product.rating}</span>
              <span className="text-slate-500 text-[10px]">({product.reviewCount.toLocaleString("fr-FR")})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="titre font-bold text-base text-slate-900 line-clamp-2 leading-snug mb-2 hover:text-blue-600 transition-colors">
            <Link href={`/${product.slug}`}>{product.title}</Link>
          </h3>

          {/* Tagline */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-normal">
            {product.tagline}
          </p>

          {/* Key Pros */}
          <ul className="space-y-2 mb-5 text-xs text-slate-900">
            {product.pros.slice(0, 2).map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/70">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1 font-medium">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
          <AmazonButton url={product.affiliateUrl} size="md" className="w-full rounded-full" />
          <Link
            href={`/${product.slug}`}
            className="text-xs text-center font-bold text-slate-600 hover:text-blue-600 py-1 transition-colors flex items-center justify-center gap-1 group"
          >
            <span>Lire le test & avis complet</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
