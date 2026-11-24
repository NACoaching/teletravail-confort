"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Monitor,
  Armchair,
  Layers,
  Sparkles,
  BookOpen,
  Menu,
  X,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Flame,
  Footprints,
  Keyboard,
  Mouse,
  Headphones,
  Video,
  Cable,
} from "lucide-react";
import SearchModal from "./SearchModal";

interface SubCategoryItem {
  id: string;
  label: string;
  desc: string;
  badge?: string;
}

interface RayonItem {
  slug: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  subCategories: SubCategoryItem[];
  featuredGuide?: {
    slug: string;
    title: string;
  };
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>("accessoires-ergonomie");
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Quick Trends Bar Carousel state & ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollTrends = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Global shortcut Cmd+K or Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (slug: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(slug);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const rayons: RayonItem[] = [
    {
      slug: "bureaux-assis-debout",
      name: "Bureaux Assis-Debout",
      shortName: "Bureaux",
      icon: Monitor,
      featuredGuide: {
        slug: "meilleur-bureau-assis-debout-electrique-comparatif-avis",
        title: "Meilleur bureau assis-debout électrique 2026",
      },
      subCategories: [
        { id: "electriques-motorises", label: "Électriques Motorisés", desc: "Moteurs silencieux & mémoires" },
        { id: "petits-espaces", label: "Petits Espaces (Compact)", desc: "Plateaux 100x60 à 120x60 cm" },
        { id: "convertisseurs-a-poser", label: "Convertisseurs à Poser", desc: "Vérins à gaz sans changer de meuble" },
      ],
    },
    {
      slug: "chaises-ergonomiques",
      name: "Chaises Ergonomiques",
      shortName: "Chaises",
      icon: Armchair,
      featuredGuide: {
        slug: "soulager-mal-de-dos-teletravail-sans-changer-chaise-coussins-repose-pieds",
        title: "Soulager le mal de dos sans changer de fauteuil",
      },
      subCategories: [
        { id: "soutien-lombaire", label: "Soutien Lombaire & Coussins", desc: "Mousse mémoire & maintien du creux" },
        { id: "sieges-assis-genoux", label: "Sièges Assis-Genoux", desc: "Bois naturel et redressement naturel", badge: "Nouveau" },
        { id: "maille-mesh", label: "Maille Mesh Respirante", desc: "Dossiers aérés anti-transpiration" },
        { id: "compactes-accoudoirs-relevables", label: "Accoudoirs Relevables", desc: "Gain de place sous le bureau" },
      ],
    },
    {
      slug: "supports-bras-ecrans",
      name: "Supports & Bras d'Écrans",
      shortName: "Bras Écrans",
      icon: Layers,
      featuredGuide: {
        slug: "guide-bras-articule-support-ecran-pc-double-moniteur",
        title: "Bras articulé & support double écran PC",
      },
      subCategories: [
        { id: "bras-verin-gaz", label: "Bras Vérin à Gaz", desc: "Ajustement d'un seul doigt 360°" },
        { id: "double-ecran", label: "Supports Double Écran", desc: "Porte deux écrans 24 à 32 pouces" },
        { id: "supports-laptop", label: "Supports PC Portables", desc: "Stands aluminium ventilés" },
      ],
    },
    {
      slug: "accessoires-ergonomie",
      name: "Accessoires & Confort",
      shortName: "Accessoires",
      icon: Sparkles,
      featuredGuide: {
        slug: "tapis-de-marche-sous-bureau-assis-debout-avis-comparatif",
        title: "Tapis de marche sous bureau : test & avis",
      },
      subCategories: [
        { id: "tapis-marche-mobilite", label: "Tapis de Marche & Mobilité", desc: "Walking pads ultra-pliables & planches", badge: "Tendance" },
        { id: "claviers-ergonomiques", label: "Claviers Ergonomiques", desc: "Scindés et en vague avec repose-poignets", badge: "Anti-TMS" },
        { id: "souris-ergonomiques", label: "Souris Ergonomiques", desc: "Modèles verticaux 57° anti-canal carpien" },
        { id: "repose-pieds-tapis", label: "Repose-pieds & Posture", desc: "Kensington SoleMate & coussins coccyx" },
        { id: "cable-management-hubs", label: "Câbles & Organisation", desc: "Goulottes sans percer & hubs 10-en-1" },
        { id: "audio-video-visio", label: "Visio & Concentration", desc: "Webcams Full HD & casques anti-bruit" },
        { id: "lampes-screenbar", label: "Lampes d'Écran Screenbar", desc: "Éclairage sans reflet sur moniteur" },
      ],
    },
  ];

  const quickTrends = [
    { label: "Tapis de Marche", href: "/guides/tapis-de-marche-sous-bureau-assis-debout-avis-comparatif", icon: Footprints, badge: "Guide" },
    { label: "Claviers Ergo", href: "/guides/clavier-souris-ergonomiques-anti-tms-canal-carpien", icon: Keyboard, badge: "Guide" },
    { label: "Souris Verticales", href: "/guides/clavier-souris-ergonomiques-anti-tms-canal-carpien", icon: Mouse, badge: "Guide" },
    { label: "Repose-Pieds & Coccyx", href: "/guides/soulager-mal-de-dos-teletravail-sans-changer-chaise-coussins-repose-pieds", icon: Sparkles, badge: "Guide" },
    { label: "Cable Management", href: "/guides/cable-management-bureau-assis-debout-guide-organisation-cables", icon: Cable, badge: "Guide" },
    { label: "Webcams & Visio", href: "/guides/materiel-visioconference-teletravail-webcam-casque-micro-anti-bruit", icon: Video, badge: "Guide" },
    { label: "Casques Anti-Bruit", href: "/guides/materiel-visioconference-teletravail-webcam-casque-micro-anti-bruit", icon: Headphones, badge: "Guide" },
    { label: "Sièges Assis-Genoux", href: "/guides/soulager-mal-de-dos-teletravail-sans-changer-chaise-coussins-repose-pieds", icon: Armchair, badge: "Guide" },
    { label: "Bureaux Motorisés", href: "/guides/meilleur-bureau-assis-debout-electrique-comparatif-avis", icon: Monitor, badge: "Guide" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs text-slate-800">
      {/* Main Top Header Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2 lg:gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 py-1 pl-1.5 pr-3 text-white no-underline shrink-0 transition-all hover:brightness-110 shadow-sm border border-blue-400/30 group"
          aria-label="Télétravail Confort"
        >
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 bg-white/20 rounded-full p-1 border border-white/30">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-white">
              <rect width="18" height="12" x="3" y="4" rx="2" />
              <line x1="2" x2="22" y1="20" y2="20" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xs sm:text-sm tracking-tight leading-none text-white font-sans">
              Télétravail Confort
            </span>
            <span className="text-[9px] text-blue-100 font-medium tracking-wide hidden sm:block">
              Ergonomie & Home Office
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Hover Dropdown */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold relative">
          {rayons.map((r) => {
            const Icon = r.icon;
            const isActive = pathname.startsWith(`/categorie/${r.slug}`);
            const isMenuOpen = activeDropdown === r.slug;

            return (
              <div
                key={r.slug}
                className="relative"
                onMouseEnter={() => handleMouseEnter(r.slug)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={`/categorie/${r.slug}`}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                      : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{r.shortName}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isMenuOpen ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
                </Link>

                {/* Desktop Dropdown Mega-Card */}
                {isMenuOpen && (
                  <div className={`absolute top-full left-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${r.slug === "accessoires-ergonomie" ? "w-96" : "w-80"}`}>
                    <div className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-2xl p-3 space-y-2">
                      <div className="flex items-center justify-between px-2 pb-1.5 border-b border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {r.name}
                        </span>
                        <Link
                          href={`/categorie/${r.slug}`}
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
                        >
                          <span>Voir tout</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 gap-1">
                        {r.subCategories.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/categorie/${r.slug}?sub=${sub.id}#produits`}
                            className="flex items-start justify-between p-2 rounded-xl hover:bg-blue-50/70 transition-colors group"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-800 text-xs group-hover:text-blue-700 transition-colors">
                                  {sub.label}
                                </span>
                                {sub.badge && (
                                  <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${sub.badge === "Tendance" ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-emerald-100 text-emerald-800"}`}>
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-500 line-clamp-1">
                                {sub.desc}
                              </p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 mt-1 shrink-0 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        ))}
                      </div>

                      {r.featuredGuide && (
                        <div className="pt-2 border-t border-slate-100">
                          <Link
                            href={`/guides/${r.featuredGuide.slug}`}
                            className="flex items-center gap-2 p-2 rounded-xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/60 text-blue-900 transition-colors group"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block leading-tight">
                                Guide d'achat conseillé
                              </span>
                              <span className="text-[11px] font-semibold text-slate-800 group-hover:text-blue-800 line-clamp-1">
                                {r.featuredGuide.title}
                              </span>
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/guides"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ml-1 border ${
              pathname.startsWith("/guides")
                ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                : "bg-blue-50/80 text-blue-700 border-blue-200/70 hover:bg-blue-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guides & Tests (9)</span>
          </Link>
        </nav>

        {/* Right Search Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 text-xs transition cursor-pointer"
            aria-label="Rechercher"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Rechercher...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-white rounded border border-slate-200">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-700"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Quick Trending Subnav Bar: Direct Access with Smooth Interactive Carousel */}
      <div className="bg-slate-50/95 border-t border-slate-200/80 py-1.5 px-3 sm:px-6 relative shadow-2xs select-none">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[11px]">
          {/* Label Tag */}
          <div className="flex items-center gap-1 font-bold text-blue-700 shrink-0 pr-2 border-r border-slate-200">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span className="hidden sm:inline">Guides &amp; Sélections :</span>
            <span className="sm:hidden font-extrabold">Guides :</span>
          </div>

          {/* Interactive Carousel Wrapper with Arrows */}
          <div className="relative flex-1 min-w-0 flex items-center overflow-hidden">
            {/* Left Scroll Arrow */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center bg-gradient-to-r from-slate-50 via-slate-50/95 to-transparent pr-4 pl-0.5">
                <button
                  type="button"
                  onClick={() => scrollTrends("left")}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:scale-105 active:scale-95 transition cursor-pointer"
                  aria-label="Défiler vers la gauche"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Scrollable Items Container */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 px-1 scroll-smooth w-full"
            >
              {quickTrends.map((trend) => {
                const Icon = trend.icon;
                return (
                  <Link
                    key={trend.label}
                    href={trend.href}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 font-medium transition-all shadow-2xs shrink-0 whitespace-nowrap active:scale-95 group"
                  >
                    <Icon className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <span>{trend.label}</span>
                    {trend.badge && (
                      <span className="text-[8px] font-extrabold uppercase px-1 rounded-sm bg-blue-600 text-white leading-none py-0.5">
                        {trend.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Scroll Arrow & Hint */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center gap-1 bg-gradient-to-l from-slate-50 via-slate-50/95 to-transparent pl-5 pr-0.5">
                <span className="hidden md:inline text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  Défiler
                </span>
                <button
                  type="button"
                  onClick={() => scrollTrends("right")}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center text-slate-700 hover:text-blue-600 hover:border-blue-400 hover:scale-105 active:scale-95 transition cursor-pointer"
                  aria-label="Défiler vers la droite"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Accordions */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-3 max-h-[85vh] overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Rayons & Équipements Ergonomiques
          </div>

          <div className="space-y-1">
            {rayons.map((r) => {
              const Icon = r.icon;
              const isExpanded = mobileExpandedCat === r.slug;

              return (
                <div key={r.slug} className="border border-slate-200/80 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setMobileExpandedCat(isExpanded ? null : r.slug)}
                    className="w-full flex items-center justify-between p-2.5 bg-slate-50/70 hover:bg-slate-100/70 text-left font-bold text-xs text-slate-800 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-600" />
                      <span>{r.name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  {isExpanded && (
                    <div className="p-2 bg-white space-y-1 border-t border-slate-100">
                      <Link
                        href={`/categorie/${r.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-2.5 py-1.5 rounded-lg text-xs font-bold text-blue-700 bg-blue-50/50"
                      >
                        👉 Voir tous les produits de ce rayon
                      </Link>
                      {r.subCategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/categorie/${r.slug}?sub=${sub.id}#produits`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50"
                        >
                          <span>{sub.label}</span>
                          {sub.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Tous nos 9 Guides d'Achat & Tests</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
