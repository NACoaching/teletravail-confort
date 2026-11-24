"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Heart,
  Maximize2,
  X,
  Tag,
  Calendar,
  Layers,
  Scissors,
  Palette,
  PenTool,
  Stamp,
  Shapes,
  Feather,
} from "lucide-react";
import { CommunityCreation } from "@/lib/types";

interface CreationsGalleryProps {
  initialCreations: CommunityCreation[];
}

export default function CreationsGallery({ initialCreations }: CreationsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxCreation, setLightboxCreation] = useState<CommunityCreation | null>(null);

  const filterTabs = [
    { slug: "all", label: "Toutes les créations", icon: Sparkles },
    { slug: "scrapbooking", label: "Scrapbooking", icon: Scissors },
    { slug: "aquarelle-peinture", label: "Aquarelle", icon: Palette },
    { slug: "dessin-feutres", label: "Dessin & Feutres", icon: PenTool },
    { slug: "linogravure", label: "Linogravure", icon: Stamp },
    { slug: "carterie-calligraphie", label: "Carterie & DIY", icon: Feather },
    { slug: "modelage-argile", label: "Modelage", icon: Shapes },
  ];

  const filteredCreations =
    selectedCategory === "all"
      ? initialCreations
      : initialCreations.filter((c) => c.categorySlug === selectedCategory);

  const getCategoryColor = (slug: string) => {
    switch (slug) {
      case "scrapbooking":
        return "bg-orange-100 text-[#e05238] border-orange-200";
      case "aquarelle-peinture":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "dessin-feutres":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "linogravure":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "modelage-argile":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "carterie-calligraphie":
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  return (
    <div className="space-y-8" id="galerie">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedCategory === tab.slug;
          return (
            <button
              key={tab.slug}
              type="button"
              onClick={() => setSelectedCategory(tab.slug)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-[#e05238] text-white shadow-md shadow-orange-500/20"
                  : "bg-white text-[#5a493e] border border-[#eadfd3] hover:border-orange-200 hover:bg-[#fff9f6]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.slug === "all" && initialCreations.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-current">
                  {initialCreations.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Gallery Cards Grid */}
      {filteredCreations.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-3xl bg-white border-2 border-dashed border-orange-200 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#fff0ea] text-[#e05238] flex items-center justify-center mx-auto shadow-2xs">
            <Heart className="w-7 h-7 fill-current" />
          </div>
          <div>
            <h3 className="titre font-bold text-lg sm:text-xl text-[#241b16] mb-1">
              {selectedCategory === "all"
                ? "La galerie d'atelier ouvre ses portes !"
                : `Soyez la première personne à exposer en ${filterTabs.find((t) => t.slug === selectedCategory)?.label || "cette catégorie"} !`}
            </h3>
            <p className="text-xs sm:text-sm text-[#75645b] max-w-md mx-auto leading-relaxed">
              Vous avez réalisé un album, une carte, une aquarelle ou une gravure ? Déposez votre photo avec le formulaire ci-dessous. Dès réception, notre équipe l&apos;ajoutera avec fierté dans la galerie !
            </p>
          </div>
          <a
            href="#partager"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e05238] text-white font-bold text-xs hover:bg-[#c9452d] transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Déposer ma première création</span>
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreations.map((creation) => (
            <div
              key={creation.id}
              className="group bg-white rounded-3xl overflow-hidden border-2 border-[#efe4da] hover:border-orange-300 transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => setLightboxCreation(creation)}
                className="relative aspect-4/3 w-full bg-[#faf5ed] overflow-hidden cursor-pointer"
              >
                <Image
                  src={creation.imageUrl}
                  alt={creation.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badge Category Tag */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border shadow-xs backdrop-blur-xs ${getCategoryColor(
                      creation.categorySlug
                    )}`}
                  >
                    <Tag className="w-3 h-3" />
                    <span>{creation.categoryLabel}</span>
                  </span>
                </div>

                {/* Hover Maximize Overlay button */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#241b16] font-bold text-xs shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5 text-[#e05238]" />
                    <span>Agrandir</span>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px] text-[#8c786c] mb-1.5">
                    <span className="font-bold text-[#e05238] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Créé par {creation.creatorName}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {creation.date}
                    </span>
                  </div>

                  <h3 className="titre font-bold text-base text-[#241b16] leading-snug mb-2 group-hover:text-[#e05238] transition-colors">
                    {creation.title}
                  </h3>

                  <p className="text-xs text-[#75645b] leading-relaxed line-clamp-3 mb-3">
                    &laquo; {creation.description} &raquo;
                  </p>
                </div>

                {creation.toolsUsed && (
                  <div className="pt-3 border-t border-[#f3eae0] flex items-start gap-1.5 text-[11px] text-[#8c786c]">
                    <Layers className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1 italic">
                      Matériel : {creation.toolsUsed}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxCreation && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxCreation(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxCreation(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fermer la vue agrandie"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-16/10 w-full bg-[#1b1512]">
              <Image
                src={lightboxCreation.imageUrl}
                alt={lightboxCreation.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* Modal Description Footer */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(
                    lightboxCreation.categorySlug
                  )}`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>{lightboxCreation.categoryLabel}</span>
                </span>

                <div className="flex items-center gap-3 text-xs text-[#75645b]">
                  <span className="font-bold text-[#e05238]">
                    Créateur : {lightboxCreation.creatorName}
                  </span>
                  <span>•</span>
                  <span>{lightboxCreation.date}</span>
                </div>
              </div>

              <div>
                <h3 className="titre text-xl sm:text-2xl font-bold text-[#241b16]">
                  {lightboxCreation.title}
                </h3>
                <p className="mt-2 text-sm text-[#5a493e] leading-relaxed">
                  {lightboxCreation.description}
                </p>
              </div>

              {lightboxCreation.toolsUsed && (
                <div className="p-3.5 rounded-2xl bg-[#faf5ed] border border-[#eadfd3] text-xs text-[#5a493e] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#e05238] shrink-0" />
                  <div>
                    <span className="font-bold text-[#241b16]">Matériel mentionné : </span>
                    <span>{lightboxCreation.toolsUsed}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
