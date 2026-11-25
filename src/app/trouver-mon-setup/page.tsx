import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, HelpCircle, Monitor, ShieldCheck, CheckCircle2 } from "lucide-react";
import ErgoQuiz from "@/components/ErgoQuiz";
import AffiliateDisclaimer from "@/components/AffiliateDisclaimer";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Trouveur de Set-Up Télétravail Idéal en 4 Questions • Diagnostic Ergonomique Gratuit",
  description:
    "Mal de dos, tensions aux cervicales ou manque d'espace ? Répondez à 4 questions ciblées : notre assistant ergonomique sélectionne le bureau assis-debout, la chaise ou les accessoires idéaux pour votre santé.",
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
        "name": "Diagnostic Ergonomique Télétravail Confort",
        "operatingSystem": "All",
        "applicationCategory": "HealthApplication",
        "description":
          "Assistant interactif et diagnostic ergonomique gratuit pour concevoir un poste de télétravail sain, prévenant les TMS et le mal de dos selon votre morphologie et budget.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
        },
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
            "name": "Le diagnostic est-il gratuit et anonyme ?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Oui, l'outil est 100% gratuit, sans inscription, sans publicité intrusive et ne collecte aucune donnée personnelle.",
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
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'ariane" className="text-xs text-slate-500">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link href="/" className="hover:text-blue-600 underline">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-slate-800">Trouver mon Set-Up Ergonomique (Diagnostic)</li>
            </ol>
          </nav>

          {/* Intégration du Composant Quiz Interactif */}
          <ErgoQuiz />

          {/* Guide Pédagogique Ergonomie SEO & GEO */}
          <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Les 3 Règles Fondamentales d'un Poste Ergonomique en 2026
              </h2>
            </div>

            <div className="prose prose-sm max-w-none text-slate-600 space-y-4">
              <p>
                L'ergonomie au travail ne se résume pas à acheter du matériel onéreux, mais à respecter l'alignement biomécanique naturel de votre squelette tout au long de la journée de travail.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
                  <div className="font-black text-blue-900 text-sm mb-1">1. L'Angle à 90° des Coudes et Genoux</div>
                  <p className="text-xs text-slate-600">
                    Les pieds doivent reposer à plat sur le sol (ou sur repose-pieds), les genoux pliés à angle droit et les avant-bras soutenus parallèlement au plateau sans hausser les épaules.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
                  <div className="font-black text-emerald-900 text-sm mb-1">2. La Règle des 20-8-2 (Mobilité)</div>
                  <p className="text-xs text-slate-600">
                    Pour chaque demi-heure de travail : restez 20 minutes assis dans une position droite, 8 minutes debout en posture dynamique, et 2 minutes en mouvement ou étirement.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200">
                  <div className="font-black text-indigo-900 text-sm mb-1">3. L'Alignement des Poignets (Anti-TMS)</div>
                  <p className="text-xs text-slate-600">
                    Adoptez une souris verticale à 57° et un clavier avec repose-poignets pour éviter la torsion de l'avant-bras (pronation) et la compression du nerf médian (canal carpien).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Structurée SEO & GEO */}
          <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Questions Fréquentes sur l'Aménagement Ergonomique
              </h2>
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              <div className="pt-3 first:pt-0">
                <h3 className="font-bold text-base text-slate-900 mb-1">
                  Chaise gaming ou chaise ergonomique de bureau : que privilégier ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pour travailler plus de 6 heures par jour, la <strong>chaise ergonomique en maille respirante</strong> (mesh) surpasse largement la chaise gaming baquet. Elle s'adapte à la cambrure naturelle du dos, évite la sudation et propose un mécanisme synchrone qui accompagne les mouvements du bassin.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="font-bold text-base text-slate-900 mb-1">
                  Un tapis de marche sous bureau est-il vraiment praticable en travaillant ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Oui, à une vitesse comprise entre <strong>1,5 et 2,5 km/h</strong>. À cette allure de marche lente, vous pouvez facilement répondre aux emails, assister à des réunions visio ou lire des documents sans secousse, tout en brûlant 150 à 200 calories par heure.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="font-bold text-base text-slate-900 mb-1">
                  Quel budget minimum prévoir pour un bureau assis-debout fiable ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Comptez entre <strong>250 € et 400 €</strong> pour un bureau électrique double moteur robuste avec panneau de commande à mémoires de hauteur et détection anti-collision, garantissant une excellente stabilité même à hauteur maximale.
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
