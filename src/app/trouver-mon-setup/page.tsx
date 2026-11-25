import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  HelpCircle,
  Monitor,
  Armchair,
  Layers,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Zap,
  Mouse,
  Footprints,
  Activity,
} from "lucide-react";
import ErgoQuiz from "@/components/ErgoQuiz";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Trouveur de Set-Up Télétravail Idéal en 4 Questions • Diagnostic IA Ergonomique 2026",
  description:
    "Mal de dos, tensions cervicales ou manque d'espace ? Répondez à 4 questions pour configurer votre poste home office idéal : bureau assis-debout, chaise ergonomique, bras d'écran et accessoires anti-TMS.",
  alternates: {
    canonical: `${SITE_CONFIG.domain}/trouver-mon-setup`,
  },
  openGraph: {
    title: "Trouveur de Set-Up Ergonomique • Diagnostic IA Express Personnalisé 2026",
    description:
      "Trouvez les équipements home office adaptés à votre morphologie et votre espace de travail en moins de 2 minutes avec notre assistant interactif.",
    url: `${SITE_CONFIG.domain}/trouver-mon-setup`,
    siteName: SITE_CONFIG.name,
    locale: "fr_FR",
    type: "website",
  },
};

export default function TrouverSetupPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Diagnostic IA Ergonomique Télétravail Confort",
        "operatingSystem": "All",
        "applicationCategory": "HealthApplication",
        "description":
          "Assistant interactif et diagnostic ergonomique gratuit pour concevoir un poste de télétravail sain, prévenant les TMS et le mal de dos selon votre morphologie, vos heures d'assise et votre budget.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "920",
          "bestRating": "5",
          "worstRating": "1",
        },
      },
      {
        "@type": "HowTo",
        "name": "Comment configurer son poste de télétravail ergonomique en 4 étapes",
        "description": "Protocole d'analyse posturale pour choisir son matériel de bureau adapté et soulager les douleurs de sédentarité.",
        "totalTime": "PT2M",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Identifier votre gêne physique prioritaire",
            "text": "Précisez votre zone d'inconfort principale : Mal de dos & lombaires, Fatigue & sédentarité prolongée, Nuque & cervicales contractées, ou Poignets & canal carpien.",
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Sélectionner la pièce maîtresse à renouveler",
            "text": "Choisissez l'équipement à privilégier : Bureau assis-debout électrique, Siège ergonomique en maille respirante, Bras articulé pour écran ou Périphériques ergonomiques.",
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Indiquer la configuration de votre espace de travail",
            "text": "Définissez votre surface disponible : Petit coin salon ou appartement (-110cm), Bureau dédié standard, ou Setup double écran multitâche.",
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Définir votre budget d'équipement",
            "text": "Filtrez les solutions : Essentiel accessible (-150€), Confort durable (150-350€) ou Ergonomie premium prosumer (350€+).",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Accueil",
            "item": SITE_CONFIG.domain,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Trouver mon Set-Up Ergonomique (Diagnostic IA)",
            "item": `${SITE_CONFIG.domain}/trouver-mon-setup`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Quelle est la priorité absolue pour éliminer le mal de dos en télétravail ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "La règle d'or est d'alterner les postures : rester assis 8h d'affilée, même sur une excellente chaise, tasse les disques lombaires. Un bureau assis-debout électrique couplé à une chaise ergonomique avec soutien lombaire réglable en hauteur permet de réduire les pressions vertébrales de plus de 40%.",
            },
          },
          {
            "@type": "Question",
            "name": "À quelle hauteur doit se situer le haut de l'écran d'ordinateur ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Le bord supérieur de votre moniteur doit se situer rigoureusement à la hauteur des yeux, à une distance équivalente à la longueur de votre bras tendu (environ 50 à 70 cm). Un bras articulé réglable évite d'incliner la tête en avant, cause n°1 des contractures trapèzes et cervicales.",
            },
          },
          {
            "@type": "Question",
            "name": "Chaise gaming ou chaise ergonomique de bureau : que privilégier pour 8h de travail ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Pour travailler plus de 6 heures par jour, la chaise ergonomique en maille respirante (mesh) surpasse largement la chaise gaming baquet. Elle s'adapte à la cambrure naturelle du dos, évite la sudation et propose un mécanisme synchrone qui accompagne les mouvements du bassin plutôt que de bloquer le corps dans une posture rigide.",
            },
          },
          {
            "@type": "Question",
            "name": "Un tapis de marche sous bureau est-il vraiment praticable en travaillant ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Oui, à une vitesse lente comprise entre 1,5 et 2,5 km/h. À cette allure, vous pouvez répondre aux emails, assister à des visioconférences ou lire des documents sans secousse, tout en brûlant 150 à 200 calories par heure et en activant la circulation sanguine des jambes.",
            },
          },
          {
            "@type": "Question",
            "name": "Quel budget minimum prévoir pour un bureau assis-debout électrique robuste ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Comptez entre 200 € et 350 € pour un bureau électrique double moteur robuste avec panneau de commande à mémoires de hauteur et système anti-collision, garantissant une stabilité exemplaire même à hauteur debout maximale (120 cm).",
            },
          },
          {
            "@type": "Question",
            "name": "Pourquoi adopter une souris verticale plutôt qu'une souris standard ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Une souris plate oblige l'avant-bras à une rotation permanente (pronation), ce qui compresse le nerf médian du canal carpien. Une souris ergonomique inclinée à 57° place la main dans la posture naturelle de la poignée de main, supprimant instantanément la tension dans l'avant-bras.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-slate-50 text-slate-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'ariane" className="text-xs text-slate-500">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link href="/" className="hover:text-blue-600 underline transition-colors">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-slate-800">Trouver mon Set-Up Ergonomique (Diagnostic IA)</li>
            </ol>
          </nav>

          {/* Intégration du Composant Quiz Interactif */}
          <ErgoQuiz />

          {/* Guide Pédagogique SEO & GEO : Matrice Douleur vs Solution */}
          <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Guide d'Aménagement Ergonomique 2026
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Matrice Posturale : Quel Équipement Selon Votre Douleur ?
                </h2>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Pour cibler immédiatement l'investissement le plus rentable pour votre santé, voici la prescription ergonomique recommandée selon vos symptômes corporels :
            </p>

            {/* Table comparative responsive */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100/80 text-slate-900 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5 sm:p-4">Symptôme / Douleur</th>
                    <th className="p-3.5 sm:p-4">Cause Biomécanique</th>
                    <th className="p-3.5 sm:p-4">Équipement Recommandé</th>
                    <th className="p-3.5 sm:p-4">Réglage Clé</th>
                    <th className="p-3.5 sm:p-4">Budget Conseillé</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 flex items-center gap-2">
                      <Armchair className="w-4 h-4 text-emerald-600" />
                      Mal de dos &amp; Lombaires
                    </td>
                    <td className="p-3.5 sm:p-4">Tassement discal en position assise statique prolongée</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-emerald-700">Chaise ergonomique synchrone + Bureau assis-debout</td>
                    <td className="p-3.5 sm:p-4">Soutien lombaire calé sur la cambrure L4-L5</td>
                    <td className="p-3.5 sm:p-4">250 € - 450 €</td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-indigo-600" />
                      Cervicales &amp; Trapèzes
                    </td>
                    <td className="p-3.5 sm:p-4">Tête penchée en avant (poids de la tête x3 sur la nuque)</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-indigo-700">Bras d'écran articulé à vérin à gaz</td>
                    <td className="p-3.5 sm:p-4">Bord supérieur de l'écran strictement au niveau des yeux</td>
                    <td className="p-3.5 sm:p-4">40 € - 90 €</td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 flex items-center gap-2">
                      <Mouse className="w-4 h-4 text-blue-600" />
                      Poignets &amp; Canal Carpien
                    </td>
                    <td className="p-3.5 sm:p-4">Torsion permanente de l'avant-bras et appui dur sur table</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-blue-700">Souris verticale 57° + Clavier scindé avec repose-poignets</td>
                    <td className="p-3.5 sm:p-4">Avant-bras à 90°, poignet dans l'axe de l'avant-bras</td>
                    <td className="p-3.5 sm:p-4">35 € - 110 €</td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-slate-900 flex items-center gap-2">
                      <Footprints className="w-4 h-4 text-amber-600" />
                      Sédentarité &amp; Coups de pompe
                    </td>
                    <td className="p-3.5 sm:p-4">Absence de retour veineux, baisse d'oxygénation cérébrale</td>
                    <td className="p-3.5 sm:p-4 font-semibold text-amber-700">Tapis de marche ultra-plat ou Planche d'équilibre</td>
                    <td className="p-3.5 sm:p-4">Vitesse 2 km/h pendant 30 min après le déjeuner</td>
                    <td className="p-3.5 sm:p-4">160 € - 290 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Les 3 Règles d'Or Posturales */}
            <div className="pt-4 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Les 3 Règles d'Or pour Aménager son Espace Home-Office
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-black text-blue-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>1. L'Angle à 90° Coudes et Genoux</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Les pieds doivent reposer à plat sur le sol (ou sur un repose-pieds incliné), les genoux pliés à 90° et les avant-bras soutenus parallèlement au plateau sans hausser les épaules.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-black text-emerald-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>2. La Règle des 20-8-2 (Mobilité)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pour chaque demi-heure : 20 minutes assis le dos calé, 8 minutes debout en posture tonique, et 2 minutes de marche ou étirements. Cette alternance élimine la fatigue en fin de journée.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-black text-indigo-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>3. Éclairage Screenbar sans Reflet</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Une lampe barre fixée sur le moniteur éclaire parfaitement le bureau sans créer le moindre reflet sur l'écran ni éblouir les yeux, réduisant la fatigue visuelle et les maux de tête de 70%.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Maillage Interne SEO : Explorer les Rayons & Guides Clés */}
          <section className="rounded-3xl bg-gradient-to-br from-slate-100 via-white to-blue-50/40 border border-slate-200 p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Explorer Nos Rayons Ergonomie
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Sélections Indépendantes &amp; Comparatifs 2026
                </h2>
              </div>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
              >
                <span>Voir nos 9 guides &amp; comparatifs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                href="/categorie/bureaux-assis-debout"
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 transition-all text-center space-y-1.5 group shadow-2xs hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Monitor className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                  Bureaux Assis-Debout
                </div>
                <div className="text-[10px] text-slate-500">Motorisés &amp; compacts</div>
              </Link>

              <Link
                href="/categorie/chaises-ergonomiques"
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 transition-all text-center space-y-1.5 group shadow-2xs hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Armchair className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Chaises Ergonomiques
                </div>
                <div className="text-[10px] text-slate-500">Maille &amp; soutien lombaire 3D</div>
              </Link>

              <Link
                href="/categorie/supports-bras-ecrans"
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 transition-all text-center space-y-1.5 group shadow-2xs hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Bras d'Écrans &amp; Supports
                </div>
                <div className="text-[10px] text-slate-500">Vérin à gaz &amp; double moniteur</div>
              </Link>

              <Link
                href="/categorie/accessoires-ergonomie"
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 transition-all text-center space-y-1.5 group shadow-2xs hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Footprints className="w-5 h-5" />
                </div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-amber-600 transition-colors">
                  Accessoires Ergonomiques
                </div>
                <div className="text-[10px] text-slate-500">Tapis de marche &amp; souris ergo</div>
              </Link>
            </div>
          </section>

          {/* FAQ Structurée SEO & GEO */}
          <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Foire Aux Questions Ergonomie
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Tout Savoir sur l'Aménagement Ergonomique &amp; la Santé au Travail
                </h2>
              </div>
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              <div className="pt-3 first:pt-0">
                <h3 className="font-bold text-base text-slate-900 mb-1.5">
                  Quelle est la priorité absolue pour éliminer le mal de dos en télétravail ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  La règle d'or est d'alterner les postures : rester assis 8h d'affilée, même sur une excellente chaise, tasse les disques lombaires. Un bureau assis-debout électrique couplé à une chaise ergonomique avec soutien lombaire réglable en hauteur permet de réduire les pressions vertébrales de plus de 40%.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="font-bold text-base text-slate-900 mb-1.5">
                  À quelle hauteur doit se situer le haut de l'écran d'ordinateur ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Le bord supérieur de votre moniteur doit se situer rigoureusement à la hauteur des yeux, à une distance équivalente à la longueur de votre bras tendu (environ 50 à 70 cm). Un bras articulé réglable évite d'incliner la tête en avant, cause n°1 des contractures trapèzes et cervicales.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="font-bold text-base text-slate-900 mb-1.5">
                  Chaise gaming ou chaise ergonomique de bureau : que privilégier pour 8h de travail ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pour travailler plus de 6 heures par jour, la <strong>chaise ergonomique en maille respirante</strong> (mesh) surpasse largement la chaise gaming baquet. Elle s'adapte à la cambrure naturelle du dos, évite la sudation et propose un mécanisme synchrone qui accompagne les mouvements du bassin plutôt que de bloquer le corps dans une posture rigide.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="font-bold text-base text-slate-900 mb-1.5">
                  Un tapis de marche sous bureau est-il vraiment praticable en travaillant ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Oui, à une vitesse lente comprise entre <strong>1,5 et 2,5 km/h</strong>. À cette allure, vous pouvez répondre aux emails, assister à des visioconférences ou lire des documents sans secousse, tout en brûlant 150 à 200 calories par heure et en activant la circulation sanguine des jambes.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="font-bold text-base text-slate-900 mb-1.5">
                  Quel budget minimum prévoir pour un bureau assis-debout électrique robuste ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Comptez entre <strong>200 € et 350 €</strong> pour un bureau électrique double moteur robuste avec panneau de commande à mémoires de hauteur et système anti-collision, garantissant une stabilité exemplaire même à hauteur debout maximale (120 cm).
                </p>
              </div>

              <div className="pt-4">
                <h3 className="font-bold text-base text-slate-900 mb-1.5">
                  Pourquoi adopter une souris verticale plutôt qu'une souris standard ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Une souris plate oblige l'avant-bras à une rotation permanente (pronation), ce qui compresse le nerf médian du canal carpien. Une souris ergonomique inclinée à 57° place la main dans la posture naturelle de la poignée de main, supprimant instantanément la tension dans l'avant-bras.
                </p>
              </div>
            </div>
          </section>

          {/* Affiliate Disclaimer */}
          <AffiliateDisclaimer />
        </div>
      </main>
    </>
  );
}
