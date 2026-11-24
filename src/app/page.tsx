import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Monitor,
  Armchair,
  Layers,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Flame,
  HelpCircle,
  Star,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { products, guides, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";

export default function HomePage() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers":
        return <Monitor className="w-5 h-5" />;
      case "Sparkles":
        return <Armchair className="w-5 h-5" />;
      case "PenTool":
        return <Layers className="w-5 h-5" />;
      case "Palette":
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getCategoryStyles = (slug: string) => {
    switch (slug) {
      case "bureaux-assis-debout":
        return {
          cardBg: "bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40",
          border: "border-blue-200/80 hover:border-blue-500",
          hoverShadow: "hover:shadow-[0_16px_32px_-8px_rgba(37,99,235,0.2)]",
          pillBg: "bg-blue-600 text-white shadow-xs",
          iconBg: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/25",
          tag: "01 / BUREAUX",
          accentColor: "#2563eb",
          arrowHover: "group-hover:text-blue-600",
          toolsCount: "Motorisés, compacts & bureaux d'angle",
        };
      case "chaises-ergonomiques":
        return {
          cardBg: "bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/40",
          border: "border-emerald-200/80 hover:border-emerald-500",
          hoverShadow: "hover:shadow-[0_16px_32px_-8px_rgba(16,185,129,0.2)]",
          pillBg: "bg-emerald-600 text-white shadow-xs",
          iconBg: "bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-500/25",
          tag: "02 / CHAISES",
          accentColor: "#10b981",
          arrowHover: "group-hover:text-emerald-600",
          toolsCount: "Soutien lombaire 3D & maille respirante",
        };
      case "supports-bras-ecrans":
        return {
          cardBg: "bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/40",
          border: "border-indigo-200/80 hover:border-indigo-500",
          hoverShadow: "hover:shadow-[0_16px_32px_-8px_rgba(99,102,241,0.2)]",
          pillBg: "bg-indigo-600 text-white shadow-xs",
          iconBg: "bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-md shadow-indigo-500/25",
          tag: "03 / SUPPORTS",
          accentColor: "#6366f1",
          arrowHover: "group-hover:text-indigo-600",
          toolsCount: "Bras articulés vérin à gaz & supports laptop",
        };
      case "accessoires-ergonomie":
      default:
        return {
          cardBg: "bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40",
          border: "border-amber-200/80 hover:border-amber-500",
          hoverShadow: "hover:shadow-[0_16px_32px_-8px_rgba(245,158,11,0.2)]",
          pillBg: "bg-amber-600 text-white shadow-xs",
          iconBg: "bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-md shadow-amber-500/25",
          tag: "04 / ACCESSOIRES",
          accentColor: "#d97706",
          arrowHover: "group-hover:text-amber-600",
          toolsCount: "Lampes screenbars, repose-pieds & passe-câbles",
        };
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen text-slate-900 bg-[#f8fafc]">
      {/* Hero Section: Design Sobre, Épuré & Centré */}
      <section className="pt-6 pb-10 px-4 sm:px-6 relative">
        <div className="mx-auto max-w-5xl rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-white via-slate-50 to-blue-50/30 border border-slate-200/90 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.05)] relative overflow-hidden text-center">
          {/* Subtle radial glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Le Guide du Set-Up Ergonomique &amp; Home Office 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-black text-slate-900 tracking-tight leading-[1.18]">
              Travaillez sans douleur, libérez votre espace et{" "}
              <span className="text-blue-600">
                adoptez la bonne posture.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Bureaux assis-debout silencieux, chaises en maille respirante, tapis de marche, bras d&apos;écrans et périphériques ergonomiques : nos sélections testées et comparatifs indépendants pour aménager un poste de travail sain et productif.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/categorie/bureaux-assis-debout"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Monitor className="w-4 h-4" />
                <span>Explorer les Bureaux Assis-Debout</span>
              </Link>

              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-sm transition-all shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Tous nos guides &amp; comparatifs (9)</span>
              </Link>
            </div>

            {/* Badges Trust */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-500 border-t border-slate-200/80 max-w-xl mx-auto">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Tests de stabilité et niveau sonore
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Spécial petits espaces &amp; appartements
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                100% sélections indépendantes 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Les 4 Piliers du Set-Up</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Choisissez votre équipement par priorité
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Du bureau motorisé au support d&apos;écran, découvrez nos comparatifs complets par catégorie.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const styles = getCategoryStyles(cat.slug);
            const Icon = getCategoryIcon(cat.icon);
            return (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className={`group relative rounded-2xl p-5 border transition-all duration-300 ${styles.cardBg} ${styles.border} ${styles.hoverShadow} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {styles.tag}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${styles.iconBg}`}>
                      {Icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition mb-1.5">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-3">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition">
                  <span>Voir la sélection</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>Sélection Vérifiée Amazon</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Les références les plus fiables en 2026
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-xs">
            Des produits plébiscités par des milliers d&apos;avis vérifiés, avec livraison rapide et garantie de retour.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Guides & Comparatifs Section */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Dossiers Conseils</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Nos guides d&apos;achat pour ne pas vous tromper
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((g) => (
            <Link
              key={g.id}
              href={`/guides/${g.slug}`}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
                <Image
                  src={g.featuredImageUrl}
                  alt={g.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    {g.readingTime} de lecture
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2">
                    {g.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1.5">
                    {g.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Lire le comparatif</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Affiliate Transparency Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <AffiliateDisclaimer />
      </section>
    </div>
  );
}
