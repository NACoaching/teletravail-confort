import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles, BookOpen } from "lucide-react";
import { categories } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#fff0ea] text-[#e05238] border-2 border-orange-200 shadow-sm mx-auto">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-[#e05238] border border-orange-200">
            Erreur 404
          </span>
          <h1 className="titre text-3xl sm:text-4xl font-bold text-[#241b16]">
            Oups ! Cette page s&apos;est égarée dans l&apos;atelier
          </h1>
          <p className="text-sm sm:text-base text-[#75645b] max-w-md mx-auto leading-relaxed">
            Le produit ou l&apos;article que vous cherchez a peut-être changé d&apos;adresse ou n&apos;est plus disponible.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#e05238] text-white font-bold text-sm hover:bg-[#c9452d] transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>
          <Link
            href="/guides"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#241b16] font-bold text-sm border border-[#efe4da] hover:bg-[#faf5ed] transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#e05238]" />
            <span>Consulter les guides</span>
          </Link>
        </div>

        {/* Popular categories quick jump */}
        <div className="pt-8 border-t border-[#efe4da]/70">
          <p className="text-xs font-bold text-[#8c786c] uppercase tracking-wider mb-3">
            Explorer les univers d&apos;atelier
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categorie/${cat.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-medium text-[#241b16] border border-[#efe4da] hover:border-orange-300 hover:text-[#e05238] transition-colors"
              >
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
