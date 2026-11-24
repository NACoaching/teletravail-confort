"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface CategoryFAQProps {
  categoryName: string;
  faqs: FAQItem[];
}

export default function CategoryFAQ({ categoryName, faqs }: CategoryFAQProps) {
  // Par défaut le premier élément est ouvert
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="pt-8 border-t-2 border-[#eadfd3] space-y-6">
      {/* Schema.org FAQPage Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#e05238] flex items-center justify-center shrink-0">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#e05238]">
            Questions fréquentes d&apos;atelier
          </span>
          <h2 className="titre text-2xl sm:text-3xl font-bold text-[#241b16]">
            Tout savoir pour bien débuter en {categoryName}
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-200 border-2 overflow-hidden bg-white ${
                isOpen
                  ? "border-orange-300 shadow-sm"
                  : "border-[#eadfd3] hover:border-orange-200"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="titre font-bold text-sm sm:text-base text-[#241b16] leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? "bg-orange-100 text-[#e05238] rotate-180"
                      : "bg-[#faf5ed] text-[#75645b]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-[#5c4940] leading-relaxed border-t border-[#faf0e6] pt-3 animate-in fade-in duration-150">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
