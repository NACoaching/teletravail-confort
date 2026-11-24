/**
 * Utilitaire de tracking des clics d'affiliation (Amazon Analytics)
 *
 * Fonctionne automatiquement avec :
 * - Google Analytics 4 (si window.gtag existe)
 * - Plausible Analytics (si window.plausible existe)
 * - Sans aucune erreur ni ralentissement si aucun outil d'analytics n'est configuré
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

export function trackAffiliateClick(url: string, label?: string) {
  if (typeof window === "undefined") return;

  const eventData = {
    destination_url: url,
    button_label: label || "Voir sur Amazon",
    timestamp: new Date().toISOString(),
  };

  // 1. Google Analytics 4
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", "affiliate_click", {
        event_category: "Monetization",
        event_label: label || url,
        value: 1,
        ...eventData,
      });
    } catch (e) {
      // fail silent
    }
  }

  // 2. Plausible Analytics
  if (typeof window.plausible === "function") {
    try {
      window.plausible("Affiliate Click", {
        props: {
          url,
          label: label || "Voir sur Amazon",
        },
      });
    } catch (e) {
      // fail silent
    }
  }
}
