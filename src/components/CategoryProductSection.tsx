"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Layers,
  Monitor,
  Armchair,
  Sliders,
  CheckCircle2,
  Package,
  LayoutGrid,
} from "lucide-react";
import { Product, CategorySubtheme } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

interface CategoryProductSectionProps {
  categorySlug: string;
  categoryName: string;
  products: Product[];
  subCategories?: CategorySubtheme[];
  accentColor?: string;
  pillColor?: string;
}

export default function CategoryProductSection({
  categorySlug,
  categoryName,
  products,
  subCategories = [],
  accentColor = "#2563eb",
}: CategoryProductSectionProps) {
  const [selectedSubCat, setSelectedSubCat] = useState<string>("tous");

  // Sync with URL query parameter ?sub=...
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sub = params.get("sub");
      if (sub && subCategories.some((s) => s.id === sub)) {
        setSelectedSubCat(sub);
      }
    }
  }, [subCategories]);

  // Map subCategory icons
  const getSubIcon = (iconName?: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-4 h-4" />;
      case "Layers":
        return <Layers className="w-4 h-4" />;
      case "Monitor":
        return <Monitor className="w-4 h-4" />;
      case "Armchair":
        return <Armchair className="w-4 h-4" />;
      case "Sliders":
        return <Sliders className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  // Calculate count for each subCategory
  const subCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      tous: products.length,
    };
    products.forEach((p) => {
      if (p.subCategory) {
        counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  // Build full subCategories list including fallback if not provided
  const navTabs: CategorySubtheme[] = useMemo(() => {
    if (subCategories && subCategories.length > 0) {
      return subCategories;
    }
    return [{ id: "tous", label: "Tout afficher", icon: "LayoutGrid" }];
  }, [subCategories]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    if (selectedSubCat === "tous") {
      return products;
    }
    return products.filter((p) => p.subCategory === selectedSubCat);
  }, [products, selectedSubCat]);

  // Current active sub-category info
  const activeSubInfo = useMemo(() => {
    return navTabs.find((t) => t.id === selectedSubCat);
  }, [navTabs, selectedSubCat]);

  return (
    <section className="space-y-6" id="produits">
      {/* INTEGRATED TABS & FILTER BAR - COMPACT & HIGH IMPACT */}
      {navTabs.length > 1 && (
        <div className="space-y-3">
          {/* Main Pill Tabs Bar */}
          <div className="bg-white/95 backdrop-blur-xs rounded-2xl sm:rounded-full border-2 border-slate-200 p-1.5 shadow-xs overflow-x-auto scrollbar-none flex items-center justify-between gap-1 sm:gap-2">
            <div className="flex items-center gap-1 sm:gap-2">
              {navTabs.map((tab) => {
                const isActive = selectedSubCat === tab.id;
                const count = subCategoryCounts[tab.id] || 0;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedSubCat(tab.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-blue-50/80"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className={isActive ? "text-white" : "text-blue-600"}>
                      {tab.id === "tous" ? (
                        <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        getSubIcon(tab.icon)
                      )}
                    </span>
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full font-black ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick count badge on desktop */}
            <div className="hidden lg:flex items-center gap-1.5 pr-3 text-xs text-slate-500 font-semibold">
              <span>{products.length} articles testés</span>
            </div>
          </div>

          {/* COMPACT ACTIVE SUB-THEME STRIP (WHEN A SPECIFIC TAB IS CHOSEN) */}
          {selectedSubCat !== "tous" && activeSubInfo && (
            <div className="rounded-xl bg-blue-50/70 border border-blue-200/80 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  {getSubIcon(activeSubInfo.icon)}
                  <span>{activeSubInfo.label} :</span>
                </span>
                <span className="hidden sm:inline">
                  {activeSubInfo.description}
                </span>
                <span className="text-slate-500">
                  ({filteredProducts.length} référence{filteredProducts.length > 1 ? "s" : ""})
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubCat("tous")}
                className="text-xs font-bold text-blue-600 hover:underline shrink-0 cursor-pointer"
              >
                Tout réafficher
              </button>
            </div>
          )}
        </div>
      )}

      {/* PRODUCTS DISPLAY - UNIFIED SIDE-BY-SIDE GRID */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((p, idx) => (
            <ProductCard
              key={p.id}
              product={p}
              featured={selectedSubCat === "tous" ? idx === 0 : false}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-[2rem] border-2 border-slate-200 text-slate-600 text-sm">
          <p className="font-bold text-slate-900 mb-1">
            Aucun article dans cette sélection pour le moment.
          </p>
          <p className="text-xs text-slate-500">
            Sélectionnez « Tout afficher » pour voir tous les produits du rayon.
          </p>
        </div>
      )}
    </section>
  );
}
