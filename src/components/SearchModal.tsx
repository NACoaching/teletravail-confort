"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Sparkles, ArrowRight, Tag } from "lucide-react";
import { products, categories } from "@/lib/data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter products by search query
  const filteredProducts = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return products
      .filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.categorySlug.toLowerCase().includes(q) ||
          (p.subCategoryLabel && p.subCategoryLabel.toLowerCase().includes(q))
        );
      })
      .slice(0, 8);
  }, [query]);

  // Filter matching categories
  const matchingCategories = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline?.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [query]);

  const quickPills = [
    "Stickers",
    "Washi tape",
    "Papier 30x30",
    "Aquarelle",
    "Feutres à alcool",
    "Argile sans cuisson",
    "Gouges",
    "Sizzix",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-2 border-[#eadfd3] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#eadfd3] flex items-center gap-3 bg-[#faf5ed]">
          <Search className="w-5 h-5 text-[#e05238] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher du matériel, un papier, une marque (ex: stickers, Cotman, Cricut...)"
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#241b16] placeholder-[#8c786c] outline-hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-white text-[#8c786c] hover:text-[#241b16]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-[#8c786c] bg-white border border-[#eadfd3] rounded-md shadow-2xs">
              ESC
            </kbd>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-orange-100 text-[#5a493e] hover:text-[#e05238] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Results */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Default Suggestions when input is empty */}
          {!query && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8c786c] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#e05238]" />
                <span>Recherches populaires en atelier :</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPills.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setQuery(pill)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#faf5ed] border border-[#eadfd3] text-[#241b16] hover:bg-[#e05238] hover:text-white hover:border-[#e05238] transition-all cursor-pointer"
                  >
                    {pill}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#eadfd3]">
                <p className="text-xs text-[#8c786c]">
                  42 références d&apos;atelier et 6 rayons créatifs disponibles.
                </p>
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="space-y-4">
              {/* Matching Categories */}
              {matchingCategories.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c786c]">
                    Rayon créatif correspondant :
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingCategories.map((c) => (
                      <Link
                        key={c.id}
                        href={`/categorie/${c.slug}`}
                        onClick={onClose}
                        className="p-3 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex items-center justify-between text-xs font-bold text-[#241b16] hover:bg-orange-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-[#e05238]" />
                          <span>{c.name}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#e05238]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Products */}
              {filteredProducts.length > 0 ? (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c786c]">
                    Produits ({filteredProducts.length}) :
                  </span>
                  <div className="space-y-2">
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl hover:bg-[#faf5ed] border border-transparent hover:border-[#eadfd3] transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-[#eadfd3] shrink-0">
                            <Image
                              src={p.imageUrl}
                              alt={p.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase text-[#e05238] tracking-wider">
                                {p.brand}
                              </span>
                              {p.subCategoryLabel && (
                                <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#f4ebe1] text-[#5a493e] hidden sm:inline">
                                  {p.subCategoryLabel}
                                </span>
                              )}
                            </div>
                            <h4 className="titre font-bold text-xs sm:text-sm text-[#241b16] truncate group-hover:text-[#e05238] transition-colors">
                              {p.title}
                            </h4>
                            <p className="text-[11px] text-[#5a493e] line-clamp-1">
                              {p.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#241b16] block">
                            {p.priceIndication}
                          </span>
                          <span className="text-[10px] font-semibold text-[#e05238] group-hover:underline flex items-center justify-end gap-0.5">
                            <span>Voir le test</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                matchingCategories.length === 0 && (
                  <div className="py-8 text-center text-[#5a493e] space-y-2">
                    <p className="text-sm font-semibold">
                      Aucun article trouvé pour &quot;{query}&quot;.
                    </p>
                    <p className="text-xs text-[#8c786c]">
                      Essayez un terme plus général comme &quot;stickers&quot;, &quot;argile&quot;, &quot;papier&quot; ou &quot;feutres&quot;.
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
