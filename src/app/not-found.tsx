import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles, BookOpen } from "lucide-react";
import { categories } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 border-2 border-blue-200 shadow-sm mx-auto">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            Erreur 404
          </span>
          <h1 className="titre text-3xl sm:text-4xl font-bold text-slate-900">
            Oups ! Cette page est introuvable
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            Le produit ou le guide que vous cherchez a peut-être changé d&apos;adresse ou n&apos;est plus disponible.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>
          <Link
            href="/guides"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-slate-800 font-bold text-sm border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Consulter les guides</span>
          </Link>
        </div>

        {/* Popular categories quick jump */}
        <div className="pt-8 border-t border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Explorer les catégories
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categorie/${cat.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-medium text-slate-800 border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
