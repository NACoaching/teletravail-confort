"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  Star,
  CheckCircle2,
  Share2,
  ExternalLink,
  Monitor,
  Armchair,
  Layers,
  Mouse,
} from "lucide-react";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";

interface QuizState {
  priority: string;
  gearType: string;
  workspace: string;
  budget: string;
}

export default function ErgoQuiz() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizState>({
    priority: "",
    gearType: "",
    workspace: "",
    budget: "",
  });
  const [copied, setCopied] = useState<boolean>(false);

  // Étape 1 : Priorité & Gêne physique
  const priorities = [
    {
      id: "dos",
      label: "Mal de Dos & Lombaires",
      sub: "Douleurs en fin de journée, besoin d'un soutien d'assise dynamique et ferme",
      icon: "🪑",
      catSlug: "chaises-ergonomiques",
    },
    {
      id: "sedentarite",
      label: "Fatigue & Sédentarité (8h+ assis)",
      sub: "Besoin d'alterner assis et debout pour stimuler l'énergie et la circulation",
      icon: "🧍",
      catSlug: "bureaux-assis-debout",
    },
    {
      id: "nuque",
      label: "Tensions Nuque, Épaules & Yeux",
      sub: "Écran trop bas, posture voûtée vers l'avant, fatigue oculaire liée aux reflets",
      icon: "🖥️",
      catSlug: "supports-bras-ecrans",
    },
    {
      id: "tms",
      label: "Douleurs Poignets / TMS",
      sub: "Syndrome du canal carpien, tensions de la main sur la souris ou le clavier",
      icon: "🖱️",
      catSlug: "accessoires-ergonomie",
    },
    {
      id: "tous",
      label: "Aménagement Global du Set-Up",
      sub: "Créer un espace de travail complet, propre, agréable et productif",
      icon: "✨",
      catSlug: "",
    },
  ];

  // Étape 2 : Équipement ciblé
  const gearTypes = [
    {
      id: "bureau",
      label: "Bureau Assis-Debout Motorisé",
      sub: "Moteurs silencieux, mémoires de hauteur pour changer de position d'un clic",
      icon: "⚡",
      catSlug: "bureaux-assis-debout",
    },
    {
      id: "chaise",
      label: "Chaise de Bureau Ergonomique",
      sub: "Dossier mesh respirant, réglages lombaires, accoudoirs ajustables",
      icon: "💺",
      catSlug: "chaises-ergonomiques",
    },
    {
      id: "bras",
      label: "Bras d'Écran Articulé & Lampe Screenbar",
      sub: "Positionner l'écran exactement à hauteur des yeux et libérer le bureau",
      icon: "🦾",
      catSlug: "supports-bras-ecrans",
    },
    {
      id: "accessoires",
      label: "Souris Verticale, Clavier & Posture",
      sub: "Repose-pieds oscillant, tapis anti-fatigue, coussin coccyx, souris ergo",
      icon: "⌨️",
      catSlug: "accessoires-ergonomie",
    },
    {
      id: "pepite",
      label: "L'Équipement Prioritaire Recommandé",
      sub: "Laissez l'algorithme déterminer la meilleure amélioration pour votre cas",
      icon: "🎯",
      catSlug: "",
    },
  ];

  // Étape 3 : Configuration de l'espace
  const workspaces = [
    {
      id: "grand",
      label: "Pièce Dédiée / Grand Bureau",
      sub: "Espace généreux pour grand plateau (140-160 cm) et configuration multi-écrans",
      icon: "🏠",
    },
    {
      id: "compact",
      label: "Coin Bureau Compact (Chambre/Salon)",
      sub: "Espace restreint nécessitant un encombrement maîtrisé (100-120 cm)",
      icon: "📐",
    },
    {
      id: "nomade",
      label: "Télétravail Hybride / Espace Partagé",
      sub: "Besoin de solutions modulables, faciles à déplacer ou à ranger le week-end",
      icon: "🎒",
    },
    {
      id: "cadeau",
      label: "Cadeau Confort & Bien-Être",
      sub: "Pour offrir une solution ergonomique durable à un télétravailleur",
      icon: "🎁",
    },
  ];

  // Étape 4 : Budget
  const budgets = [
    { id: "under-50", label: "Moins de 50 €", sub: "Correction immédiate (souris, repose-pieds, support ordi)", icon: "🟢" },
    { id: "50-120", label: "50 € à 120 €", sub: "Bras d'écran vérin à gaz, screenbar ou accessoires haut de gamme", icon: "🟡" },
    { id: "120-300", label: "120 € à 300 €", sub: "Bureau assis-debout motorisé compact ou très bonne chaise ergo", icon: "🟠" },
    { id: "over-300", label: "Plus de 300 €", sub: "Équipement ergonomique professionnel pour 8h+ quotidiennes", icon: "💎" },
    { id: "any", label: "Budget libre", sub: "Priorité à ma santé et à ma posture sans compromis", icon: "⭐" },
  ];

  const handleSelect = (key: keyof QuizState, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setAnswers({ priority: "", gearType: "", workspace: "", budget: "" });
    setStep(1);
    setCopied(false);
  };

  // Algorithme de diagnostic et recommandation ergonomique
  const recommendations = useMemo(() => {
    if (step < 5) return [];

    const scored = products.map((prod) => {
      let score = 0;
      const allText = `${prod.title} ${prod.description} ${prod.tagline} ${prod.targetAudience} ${prod.subCategory || ""} ${prod.categorySlug}`.toLowerCase();

      // 1. Scoring Priorité
      const prio = priorities.find((p) => p.id === answers.priority);
      if (prio && prio.catSlug && prod.categorySlug === prio.catSlug) {
        score += 25;
      }

      if (answers.priority === "dos") {
        if (allText.includes("lombaire") || allText.includes("dos") || allText.includes("assise") || allText.includes("maintien")) score += 10;
      } else if (answers.priority === "sedentarite") {
        if (allText.includes("debout") || allText.includes("assis-debout") || allText.includes("moteur") || allText.includes("marche")) score += 12;
      } else if (answers.priority === "nuque") {
        if (allText.includes("écran") || allText.includes("hauteur") || allText.includes("regard") || allText.includes("lumière") || allText.includes("screenbar")) score += 12;
      } else if (answers.priority === "tms") {
        if (allText.includes("souris") || allText.includes("verticale") || allText.includes("poignet") || allText.includes("clavier") || allText.includes("tms")) score += 15;
      }

      // 2. Scoring Type d'équipement
      if (answers.gearType === "bureau") {
        if (prod.categorySlug === "bureaux-assis-debout") score += 30;
      } else if (answers.gearType === "chaise") {
        if (prod.categorySlug === "chaises-ergonomiques") score += 30;
      } else if (answers.gearType === "bras") {
        if (prod.categorySlug === "supports-bras-ecrans") score += 30;
      } else if (answers.gearType === "accessoires") {
        if (prod.categorySlug === "accessoires-ergonomie") score += 30;
      }

      // 3. Scoring Espace
      if (answers.workspace === "compact") {
        if (allText.includes("compact") || allText.includes("gain de place") || allText.includes("100") || allText.includes("120") || allText.includes("bras")) score += 10;
      } else if (answers.workspace === "grand") {
        if (allText.includes("140") || allText.includes("160") || allText.includes("double écran") || allText.includes("spacieux")) score += 10;
      } else if (answers.workspace === "nomade") {
        if (allText.includes("portable") || allText.includes("pliable") || allText.includes("nomade") || allText.includes("souris")) score += 10;
      }

      // 4. Scoring Budget
      const cleanPriceStr = (prod.priceIndication || "60").replace(/[^0-9,.]/g, "").replace(",", ".");
      const price = parseFloat(cleanPriceStr) || 60;

      if (answers.budget === "under-50") {
        if (price <= 55 || prod.priceRange === "€") score += 12;
        if (price > 75) score -= 15;
      } else if (answers.budget === "50-120") {
        if (price >= 45 && price <= 135) score += 10;
      } else if (answers.budget === "120-300") {
        if (price >= 110 && price <= 320) score += 10;
      } else if (answers.budget === "over-300") {
        if (price >= 280 || prod.priceRange === "€€€") score += 15;
        if (price < 120) score -= 10;
      }

      // 5. Note et avis
      score += (prod.rating || 4.5) * 2;

      return { prod, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((item) => item.prod);
  }, [step, answers]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section
      id="diagnostic-ergonomie-teletravail"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF] border-2 border-slate-200 p-5 sm:p-8 lg:p-10 shadow-lg text-slate-900"
    >
      {/* Background Decor */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-200/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-200/25 rounded-full blur-2xl pointer-events-none" />

      {/* Header du Quiz */}
      <div className="relative max-w-2xl mx-auto text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: "3s" }} />
          Diagnostic Ergonomie • Gratuit & Sans Inscription
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          Configurez votre Set-Up Idéal <span className="text-blue-600">en 4 Questions</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Soulagez le dos, la nuque et les poignets : notre algorithme identifie les équipements ergonomiques indispensables adaptés à votre espace et à votre budget.
        </p>

        {/* Progress Bar (Visible de l'étape 1 à 4) */}
        {step <= 4 && (
          <div className="mt-5 flex items-center justify-center gap-2 max-w-xs mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  i < step
                    ? "bg-emerald-500"
                    : i === step
                    ? "bg-blue-600 ring-2 ring-blue-200"
                    : "bg-slate-200"
                }`}
              />
            ))}
            <span className="text-xs font-bold text-slate-500 ml-2">Étape {step}/4</span>
          </div>
        )}
      </div>

      {/* Étape 1 : Priorité & Gêne physique */}
      {step === 1 && (
        <div className="max-w-3xl mx-auto">
          <h3 className="text-center font-bold text-lg text-slate-900 mb-4">
            1. Quelle est votre principale gêne ou priorité corporelle ?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {priorities.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect("priority", item.id)}
                className="group p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-600 hover:shadow-md transition-all text-left flex flex-col justify-between cursor-pointer"
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</span>
                <div>
                  <div className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">{item.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Étape 2 : Équipement ciblé */}
      {step === 2 && (
        <div className="max-w-3xl mx-auto">
          <h3 className="text-center font-bold text-lg text-slate-900 mb-4">
            2. Quel équipement prioritaire souhaitez-vous ajouter à votre bureau ?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {gearTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect("gearType", item.id)}
                className="group p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-600 hover:shadow-md transition-all text-left flex items-start gap-3.5 cursor-pointer"
              >
                <span className="text-2xl mt-0.5 group-hover:scale-110 transition-transform">{item.icon}</span>
                <div>
                  <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.sub}</div>
                </div>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-6 mx-auto block text-xs font-semibold text-slate-500 hover:text-slate-900 underline cursor-pointer"
          >
            ← Retour à l'étape précédente
          </button>
        </div>
      )}

      {/* Étape 3 : Configuration de l'espace */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center font-bold text-lg text-slate-900 mb-4">
            3. Comment est agencé votre espace de travail à domicile ?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {workspaces.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect("workspace", item.id)}
                className="group p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-600 hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer"
              >
                <span className="text-2xl mt-0.5 group-hover:scale-110 transition-transform">{item.icon}</span>
                <div>
                  <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.sub}</div>
                </div>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-6 mx-auto block text-xs font-semibold text-slate-500 hover:text-slate-900 underline cursor-pointer"
          >
            ← Retour à l'étape précédente
          </button>
        </div>
      )}

      {/* Étape 4 : Budget */}
      {step === 4 && (
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center font-bold text-lg text-slate-900 mb-4">
            4. Quel budget souhaitez-vous investir dans votre santé au travail ?
          </h3>
          <div className="space-y-2.5">
            {budgets.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect("budget", item.id)}
                className="w-full group p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-600 hover:shadow-md transition-all text-left flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600">
                      {item.label}
                    </span>
                    <span className="block text-xs text-slate-500">{item.sub}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="mt-6 mx-auto block text-xs font-semibold text-slate-500 hover:text-slate-900 underline cursor-pointer"
          >
            ← Retour à l'étape précédente
          </button>
        </div>
      )}

      {/* Étape 5 : Résultats personnalisés */}
      {step === 5 && (
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Votre configuration ergonomique idéale ({recommendations.length} matériels validés)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Équipements testés et recommandés pour prévenir les TMS et soulager durablement les tensions.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{copied ? "Lien copié !" : "Partager"}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-100 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recommencer</span>
              </button>
            </div>
          </div>

          {/* Grille de Recommandations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {recommendations.map((prod, idx) => {
              const badgeLabel =
                idx === 0
                  ? "⭐ Choix N°1 Ergonomie"
                  : idx === 1
                  ? "💎 Coup de Cœur Posture"
                  : idx === 2
                  ? "⚡ Meilleur Rapport Qualité/Prix"
                  : "✨ Alternative Idéale";
              const badgeClass =
                idx === 0
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : idx === 1
                  ? "bg-blue-100 text-blue-900 border-blue-300"
                  : "bg-emerald-100 text-emerald-900 border-emerald-300";

              return (
                <div
                  key={prod.id}
                  className="rounded-2xl bg-white border-2 border-slate-200 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                >
                  <div>
                    {/* Badge Recommandation */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeClass}`}
                      >
                        {badgeLabel}
                      </span>
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                        {prod.priceIndication}
                      </span>
                    </div>

                    {/* Visuel et Titre */}
                    <div className="flex gap-4 items-start mb-3">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
                        <Image
                          src={prod.imageUrl}
                          alt={prod.title}
                          fill
                          sizes="96px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {prod.brand}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                          <Link href={`/${prod.slug}`} className="hover:underline">
                            {prod.title}
                          </Link>
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{prod.rating}/5</span>
                          <span className="text-slate-400 font-normal">
                            ({prod.reviewCount?.toLocaleString("fr-FR")} avis)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Verdict Court */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 mb-3">
                      💡 <strong>Pourquoi ce choix :</strong> {prod.tagline || prod.description.slice(0, 110)}
                    </p>
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 mt-auto">
                    <Link
                      href={`/${prod.slug}`}
                      className="flex-1 text-center py-2 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      Détails & Avis
                    </Link>
                    <a
                      href={prod.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      data-product-name={prod.title}
                      data-asin={prod.amazonAsin}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-xs font-black hover:brightness-105 shadow-xs transition-all"
                    >
                      <span>Voir le prix</span>
                      <ExternalLink className="w-3 h-3 text-white" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-slate-200 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span>Tester une autre combinaison de recherche</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
