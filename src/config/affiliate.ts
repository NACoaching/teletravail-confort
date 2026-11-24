import { SITE_CONFIG } from "./site";

/**
 * Configuration centrale de l'affiliation
 * Héritée automatiquement de SITE_CONFIG ou via NEXT_PUBLIC_AMAZON_TAG
 */
export const AFFILIATE_CONFIG = {
  amazonTrackingTag: SITE_CONFIG.amazonTag,
  defaultMarketplace: SITE_CONFIG.amazonMarketplace,
};

/**
 * Génère automatiquement l'URL d'affiliation Amazon avec votre tag partenaire officiel
 * Accepte :
 * - Un lien raccourci SiteStripe (ex: "https://amzn.to/3xxx") -> conservé tel quel
 * - Un ASIN simple (ex: "B00004THXI") -> génère https://www.amazon.fr/dp/B00004THXI?tag=nacoaching06-21
 * - Une URL Amazon directe (ex: "https://www.amazon.fr/dp/B00004THXI/...") -> extrait l'ASIN et applique le tag
 */
export function buildAmazonAffiliateUrl(
  asinOrUrl: string,
  customTag?: string
): string {
  const tag = customTag || AFFILIATE_CONFIG.amazonTrackingTag;
  if (!asinOrUrl) return "";

  const trimmed = asinOrUrl.trim();

  // 1. Si c'est déjà un lien court d'affiliation officiel (amzn.to, link.amazon, a.co), le conserver directement
  if (
    trimmed.includes("amzn.to/") ||
    trimmed.includes("link.amazon/") ||
    trimmed.includes("a.co/")
  ) {
    return trimmed;
  }

  // 2. Si c'est un ASIN brut de 10 caractères (ex: B08P1XSKRP ou 2295016621)
  if (/^[A-Z0-9]{10}$/i.test(trimmed)) {
    return `https://www.amazon.fr/dp/${trimmed}?tag=${tag}`;
  }

  // 3. Si c'est une URL Amazon directe, extraire l'ASIN pour générer un lien propre
  const asinMatch = trimmed.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
  if (asinMatch && asinMatch[1]) {
    return `https://www.amazon.fr/dp/${asinMatch[1]}?tag=${tag}`;
  }

  // 4. Si c'est une URL Amazon valide avec paramètres, s'assurer que le tag est présent
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const url = new URL(trimmed);
      if (url.hostname.includes("amazon.")) {
        url.searchParams.set("tag", tag);
        return url.toString();
      }
    } catch {
      // Ignorer et basculer sur le fallback
    }
  }

  // 5. Fallback de sécurité : si l'identifiant est incomplet ou non-URL, générer une recherche Amazon.fr avec le tag
  return `https://www.amazon.fr/s?k=${encodeURIComponent(trimmed)}&tag=${tag}`;
}
