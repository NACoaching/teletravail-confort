"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import SearchModal from "./SearchModal";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  const rayons = [
    { slug: "bureaux-assis-debout", name: "Bureaux Assis-Debout", shortName: "Bureaux", icon: Monitor },
    { slug: "chaises-ergonomiques", name: "Chaises Ergonomiques", shortName: "Chaises", icon: Armchair },
    { slug: "supports-bras-ecrans", name: "Supports & Bras d'Écrans", shortName: "Bras Écrans", icon: Layers },
    { slug: "accessoires-ergonomie", name: "Accessoires & Confort", shortName: "Accessoires", icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs text-slate-800">
      {/* Main Top Header Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2 lg:gap-3">
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
          {rayons.map((r) => {
            const Icon = r.icon;
            const isActive = pathname.startsWith(`/categorie/${r.slug}`);
            return (
              <Link
                key={r.slug}
                href={`/categorie/${r.slug}`}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                    : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                <span>{r.shortName}</span>
              </Link>
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
            <span>Guides & Comparatifs</span>
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

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
            Rayons du Set-Up
          </div>
          {rayons.map((r) => {
            const Icon = r.icon;
            const isActive = pathname.startsWith(`/categorie/${r.slug}`);
            return (
              <Link
                key={r.slug}
                href={`/categorie/${r.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold ${
                  isActive ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4 text-blue-600" />
                <span>{r.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 mt-2">
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-blue-50 text-blue-700"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Tous nos guides d'achat</span>
            </Link>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
