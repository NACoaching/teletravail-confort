"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import AmazonButton from "./AmazonButton";

interface StickyProductBarProps {
  product: Product;
}

export default function StickyProductBar({ product }: StickyProductBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past ~350px
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t-2 border-[#eadfd3] px-4 py-2.5 shadow-[0_-8px_25px_-5px_rgba(36,27,22,0.12)] transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Left: Thumbnail & Short Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#faf5ed] border border-[#eadfd3] shrink-0">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="titre font-bold text-xs text-[#241b16] truncate">
              {product.title}
            </h4>
            <div className="text-[11px] font-semibold text-[#e05238]">
              {product.priceIndication}
            </div>
          </div>
        </div>

        {/* Right: Direct CTA Button */}
        <div className="shrink-0">
          <AmazonButton
            url={product.affiliateUrl}
            label="Voir l'offre"
            size="sm"
            className="shadow-sm font-bold text-xs py-2 px-3.5"
          />
        </div>
      </div>
    </div>
  );
}
