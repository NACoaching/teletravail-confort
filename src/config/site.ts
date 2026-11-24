/**
 * Configuration Centrale du Site Télétravail Confort
 */

export const SITE_CONFIG = {
  // Identité de la marque (100% éditorial, expert & ergonomie)
  name: "Télétravail Confort",
  domain: "https://teletravail-confort.com",
  tagline: "Le Guide du Set-Up Ergonomique & Home Office 2026",
  shortDescription:
    "Guides d'achat complets, comparatifs clairs et sélections d'équipements pour aménager votre espace de télétravail : bureaux assis-debout, chaises ergonomiques, bras d'écrans, éclairages screenbars et accessoires de posture.",

  // Identité éditoriale (E-E-A-T)
  author: "L'Équipe Télétravail Confort",
  publisher: "Télétravail Confort Média",
  foundingYear: 2026,

  // Contact & Support
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact.nacoaching@gmail.com",

  // Programme Partenaires Amazon
  amazonTag: process.env.NEXT_PUBLIC_AMAZON_TAG || "teletravailconfort-21",
  amazonMarketplace: "amazon.fr",

  // SEO & Indexation Google Search Console (à remplir après création de la propriété)
  googleVerification: "",

  // Déclaration légale obligatoire Amazon
  affiliateDisclaimer:
    "En tant que Partenaire Amazon, Télétravail Confort réalise un bénéfice sur les achats remplissant les conditions requises. Les prix et la disponibilité des produits sont soumis à variations sur Amazon.",

  // Palette & Ambiance Ergonomie, Clarté & Focus
  theme: {
    accentColor: "#2563eb", // Bleu pro ergonomique
    accentLight: "#eff6ff",
    bgWarm: "#f8fafc",
    textDark: "#0f172a",
    textMuted: "#64748b",
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
