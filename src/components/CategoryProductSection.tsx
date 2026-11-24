"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Layers,
  Scissors,
  Palette,
  Brush,
  PenTool,
  Stamp,
  Shapes,
  Feather,
  LayoutGrid,
  CheckCircle2,
  Package,
  ArrowRight,
  Filter,
  BookOpen,
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
  accentColor = "#e05238",
}: CategoryProductSectionProps) {
  const [selectedSubCat, setSelectedSubCat] = useState<string>("tous");

  // Map subCategory icons
  const getSubIcon = (iconName?: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-4 h-4" />;
      case "Layers":
        return <Layers className="w-4 h-4" />;
      case "Scissors":
        return <Scissors className="w-4 h-4" />;
      case "Palette":
        return <Palette className="w-4 h-4" />;
      case "Brush":
        return <Brush className="w-4 h-4" />;
      case "PenTool":
        return <PenTool className="w-4 h-4" />;
      case "Stamp":
        return <Stamp className="w-4 h-4" />;
      case "Shapes":
        return <Shapes className="w-4 h-4" />;
      case "Feather":
        return <Feather className="w-4 h-4" />;
      case "BookOpen":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
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

  // Grouped products when viewing "tous" and subCategories exist
  const groupedSubCategories = useMemo(() => {
    return navTabs.filter((t) => t.id !== "tous");
  }, [navTabs]);

  return (
    <section className="space-y-6" id="produits">
      {/* INTEGRATED TABS & FILTER BAR - COMPACT & HIGH IMPACT */}
      {navTabs.length > 1 && (
        <div className="space-y-3">
          {/* Main Pill Tabs Bar */}
          <div className="bg-white/95 backdrop-blur-xs rounded-2xl sm:rounded-full border-2 border-[#eadfd3] p-1.5 shadow-xs overflow-x-auto scrollbar-none flex items-center justify-between gap-1 sm:gap-2">
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
                        ? "bg-[#e05238] text-white shadow-xs"
                        : "text-[#5a493e] hover:text-[#241b16] hover:bg-orange-50/80"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className={isActive ? "text-white" : "text-[#e05238]"}>
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
                          : "bg-[#f4ebe1] text-[#5a493e]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick count badge on desktop */}
            <div className="hidden lg:flex items-center gap-1.5 pr-3 text-xs text-[#8c786c] font-semibold">
              <span>{products.length} articles testés</span>
            </div>
          </div>

          {/* COMPACT ACTIVE SUB-THEME STRIP (WHEN A SPECIFIC TAB IS CHOSEN) */}
          {selectedSubCat !== "tous" && activeSubInfo && (
            <div className="rounded-xl bg-orange-50/70 border border-orange-200/80 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#5a493e]">
                <span className="font-bold text-[#241b16] flex items-center gap-1.5">
                  {getSubIcon(activeSubInfo.icon)}
                  <span>{activeSubInfo.label} :</span>
                </span>
                <span className="hidden sm:inline">
                  {activeSubInfo.description}
                </span>
                <span className="text-[#8c786c]">
                  ({filteredProducts.length} référence{filteredProducts.length > 1 ? "s" : ""})
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubCat("tous")}
                className="text-xs font-bold text-[#e05238] hover:underline shrink-0 cursor-pointer"
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
        <div className="p-12 text-center bg-white rounded-[2rem] border-2 border-[#eadfd3] text-[#5a493e] text-sm">
          <p className="font-bold text-[#241b16] mb-1">
            Aucun article dans cette sélection pour le moment.
          </p>
          <p className="text-xs text-[#8c786c]">
            Sélectionnez « Tout afficher » pour voir tous les produits du rayon.
          </p>
        </div>
      )}
    </section>
  );
}
