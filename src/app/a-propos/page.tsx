import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Search,
  Scale,
  Award,
  ArrowRight,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Monitor,
  Zap,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: `À Propos & Méthodologie Ergonomique | ${SITE_CONFIG.name}`,
  description:
    `Découvrez la mission de ${SITE_CONFIG.name}, notre protocole de test de matériel et nos 4 critères stricts pour aménager un espace de télétravail sain et confortable.`,
  alternates: {
    canonical: `${SITE_CONFIG.domain}/a-propos`,
  },
};

export default function AProposPage() {
  const pillars = [
    {
      icon: Search,
      title: "1. Stabilité & Bruit en conditions réelles",
      desc: "Nous analysons la rigidité des châssis de bureaux assis-debout en position haute (110-120 cm), le niveau sonore des moteurs (< 50 dB) et l'absence de tremblement lors de la frappe.",
      badge: "Stabilité & Silence",
    },
    {
      icon: ShieldCheck,
      title: "2. Ergonomie & Soutien Postural 3D",
      desc: "Chaque chaise et accessoire est évalué sur sa capacité à maintenir la courbure lombaire naturelle, la respirabilité des matériaux (mesh vs mousse) et l'adaptabilité aux différentes morphologies.",
      badge: "Santé du Dos",
    },
    {
      icon: Scale,
      title: "3. Rapport Qualité / Prix Réel",
      desc: "Le confort de travail ne doit pas être réservé aux budgets de plusieurs milliers d'euros. Nous traquons les pépites sous les 200-250 € qui rivalisent avec les marques de bureau haut de gamme.",
      badge: "Budget Maîtrisé",
    },
    {
      icon: Award,
      title: "4. Adaptabilité aux Petits Espaces",
      desc: "Parce que tout le monde n'a pas une pièce dédiée au télétravail, nous sélectionnons des formats compacts (100x60 cm), des bras d'écran et des chaises aux accoudoirs escamotables.",
      badge: "Spécial Appartements",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20 font-sans">
      {/* Top Banner Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à l&apos;accueil</span>
        </Link>
      </div>

      {/* Hero Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Notre Mission &amp; Notre Démarche</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Aider les télétravailleurs à travailler sans douleur et sans s&apos;encombrer.
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            {SITE_CONFIG.name} est un guide indépendant dédié à l&apos;ergonomie du poste de travail à la maison. Face à la jungle des bureaux électriques et des chaises de bureau aux promesses marketing exagérées, nous sélectionnons le matériel réellement efficace, durable et simple à monter.
          </p>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
            Notre Protocole de Sélection
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Les 4 critères qui guident nos comparatifs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-xs hover:border-blue-400 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

            {/* Équipe Éditoriale & Auteur Référent */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Expertise &amp; Responsabilité Éditoriale</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-black shrink-0">
              {SITE_CONFIG.author[0]}
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">{SITE_CONFIG.author}</h3>
              <p className="text-xs font-semibold text-blue-700">{(SITE_CONFIG as any).authorRole}</p>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">{(SITE_CONFIG as any).authorBio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Amazon Affiliate */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>Transparence &amp; Modèle Économique</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            Comment ce site reste 100% gratuit et sans bannières de pub intrusives
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Pour maintenir ce site gratuit sans bannières publicitaires qui ralentissent votre navigation, {SITE_CONFIG.name} participe au <strong>Programme Partenaires d&apos;Amazon EU</strong>.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Lorsque vous cliquez sur l&apos;un de nos liens et effectuez un achat sur Amazon, nous pouvons percevoir une commission de quelques pourcents. <strong>Cela ne change absolument rien au prix que vous payez</strong>, mais cela finance le temps de recherche, la rédaction de nos comparatifs et l&apos;hébergement de la plateforme.
          </p>
        </div>
      </section>
    </div>
  );
}
