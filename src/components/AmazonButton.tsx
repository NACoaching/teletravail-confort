"use client";

import React from "react";
import { ShoppingBag, ExternalLink } from "lucide-react";
import { buildAmazonAffiliateUrl } from "@/config/affiliate";
import { trackAffiliateClick } from "@/lib/analytics";

interface AmazonButtonProps {
  url: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function AmazonButton({
  url,
  label = "Voir le prix sur Amazon",
  className = "",
  size = "md",
}: AmazonButtonProps) {
  const affiliateUrl = buildAmazonAffiliateUrl(url);

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5 font-bold",
  };

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={() => trackAffiliateClick(affiliateUrl, label)}
      className={`amazon-btn inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-95 ${sizeClasses[size]} ${className}`}
    >
      <ShoppingBag className={size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      <span>{label}</span>
      <ExternalLink className={size === "lg" ? "w-4 h-4 opacity-75" : "w-3.5 h-3.5 opacity-70"} />
    </a>
  );
}
