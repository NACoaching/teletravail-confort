import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { Monitor, ShieldCheck, HeartHandshake, Sparkles, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                <Monitor className="w-3.5 h-3.5" />
              </div>
              <span className="font-extrabold text-sm text-white tracking-tight">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              {SITE_CONFIG.shortDescription}
            </p>
          </div>

          {/* Categories Col */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
              Rayons & Équipement
            </div>
            <ul className="space-y-1.5">
              <li>
                <Link href="/categorie/bureaux-assis-debout" className="hover:text-blue-400 transition">
                  Bureaux Assis-Debout
                </Link>
              </li>
              <li>
                <Link href="/categorie/chaises-ergonomiques" className="hover:text-blue-400 transition">
                  Chaises Ergonomiques
                </Link>
              </li>
              <li>
                <Link href="/categorie/supports-bras-ecrans" className="hover:text-blue-400 transition">
                  Supports & Bras d&apos;Écrans
                </Link>
              </li>
              <li>
                <Link href="/categorie/accessoires-ergonomie" className="hover:text-blue-400 transition">
                  Accessoires & Screenbars
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides Col */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
              Guides & Comparatifs
            </div>
            <ul className="space-y-1.5">
              <li>
                <Link href="/guides/meilleur-bureau-assis-debout-electrique-comparatif-avis" className="hover:text-blue-400 transition">
                  Meilleur Bureau Assis-Debout 2026
                </Link>
              </li>
              <li>
                <Link href="/guides/chaise-ergonomique-ou-fauteuil-gaming-comparatif-mal-de-dos" className="hover:text-blue-400 transition">
                  Chaise Ergonomique vs Gaming
                </Link>
              </li>
              <li>
                <Link href="/guides/guide-bras-articule-support-ecran-pc-double-moniteur" className="hover:text-blue-400 transition">
                  Bras Articulé & Double Écran
                </Link>
              </li>
              <li>
                <Link href="/guides/accessoires-indispensables-ergonomie-teletravail-screenbar-souris-verticale" className="hover:text-blue-400 transition">
                  Accessoires Ergonomie & Screenbar
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold">
                  <BookOpen className="w-3 h-3" />
                  Tous les guides & comparatifs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Transparency Col */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
              Transparence & Mentions
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {SITE_CONFIG.affiliateDisclaimer}
            </p>
            <div className="pt-2 flex flex-col gap-1 text-[11px]">
              <Link href="/mentions-legales" className="hover:text-white transition">
                Mentions Légales & Cookies
              </Link>
              <Link href="/a-propos" className="hover:text-white transition">
                À Propos & Méthodologie de Test
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {SITE_CONFIG.foundingYear} {SITE_CONFIG.name}. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Sélection Indépendante
            </span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Tests Produits Réels
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
