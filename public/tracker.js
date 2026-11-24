/**
 * Affiliate Pulse Tracker - Universal Affiliate Script (< 2KB)
 * Zéro cookie, conforme RGPD, avec Heatmap de position du clic.
 * 
 * Usage:
 * <script defer src="https://mon-tracker.vercel.app/tracker.js" data-site="tonideecadeau.com"></script>
 */
(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  var currentScript = document.currentScript || document.querySelector('script[data-site]');
  var site = (currentScript && currentScript.getAttribute('data-site')) || window.location.hostname;
  var endpoint = (currentScript && currentScript.getAttribute('data-endpoint')) || 
                 (currentScript && currentScript.src ? new URL(currentScript.src).origin + '/api/track' : '/api/track');

  // Résolution et mémorisation de la source d'acquisition initiale (Google, Direct, ChatGPT, etc.)
  var initialSource = 'Direct';
  try {
    var storedSource = window.sessionStorage && sessionStorage.getItem('outcliq_source');
    if (storedSource) {
      initialSource = storedSource;
    } else {
      var rawRef = document.referrer;
      if (rawRef) {
        var refHost = new URL(rawRef).hostname.toLowerCase();
        if (/chatgpt|openai/i.test(refHost)) initialSource = 'ChatGPT';
        else if (/qwant\./i.test(refHost)) initialSource = 'Qwant';
        else if (/google\./i.test(refHost)) initialSource = 'Google';
        else if (/bing\./i.test(refHost)) initialSource = 'Bing';
        else if (/ecosia\./i.test(refHost)) initialSource = 'Ecosia';
        else if (/yahoo\./i.test(refHost)) initialSource = 'Yahoo';
        else if (/duckduckgo\./i.test(refHost)) initialSource = 'DuckDuckGo';
        else if (/facebook|instagram|fb\.com|tiktok|twitter|t\.co|pinterest|reddit/i.test(refHost)) initialSource = 'Réseaux Sociaux';
        else if (refHost !== window.location.hostname && refHost.indexOf(window.location.hostname) === -1) {
          initialSource = refHost;
        }
      }
      if (window.location.search) {
        var params = new URLSearchParams(window.location.search);
        var utmSource = params.get('utm_source');
        if (utmSource) initialSource = utmSource;
        else if (params.get('gclid')) initialSource = 'Google Ads';
      }
      if (window.sessionStorage) {
        sessionStorage.setItem('outcliq_source', initialSource);
      }
    }
  } catch (e) {}

  function extractAsin(url) {
    if (!url) return '';
    var match = url.match(/(?:\/dp\/|\/gp\/product\/|\/asin\/|ASIN=|\/d\/)([A-Z0-9]{10})/i);
    return match ? match[1].toUpperCase() : '';
  }

  function getScrollDepth() {
    try {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      var totalHeight = Math.max(1, (document.documentElement.scrollHeight - window.innerHeight));
      return Math.min(100, Math.max(0, Math.round((scrollY / totalHeight) * 100)));
    } catch (e) {
      return 0;
    }
  }

  function detectPositionZone(link, target, scrollDepth) {
    var explicitZone = link.getAttribute('data-zone') || (link.closest('[data-zone]') && link.closest('[data-zone]').getAttribute('data-zone'));
    if (explicitZone) return explicitZone;

    if (link.closest('.podium, [class*="podium"], [class*="TopThree"], [class*="podium-item"]')) {
      return 'Podium Top 3';
    }
    if (link.closest('.sticky, [class*="sticky"], [class*="Sticky"], [class*="sticky-bar"]')) {
      return 'Barre Sticky Mobile';
    }
    if (link.closest('table, [class*="table"], [class*="comparatif"], [class*="comparison"]')) {
      return 'Tableau Comparatif';
    }
    if (target.tagName === 'IMG' || link.querySelector('img') === target) {
      return 'Photo du Produit';
    }
    if (link.closest('[data-product], .product-card, article, [class*="ProductCard"]')) {
      return 'Fiche Produit (Corps)';
    }

    if (scrollDepth < 25) return 'Haut de page (0-25%)';
    if (scrollDepth < 65) return 'Milieu d\'article (25-65%)';
    return 'Fin d\'article (65-100%)';
  }

  function sendPayload(payload) {
    try {
      var data = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, data);
      } else {
        fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
        }).catch(function () {});
      }
    } catch (e) {}
  }

  function handleLinkClick(e) {
    var target = e.target;
    var link = target.closest('a');
    if (!link || !link.href) return;

    var href = link.href;
    var isAmazon = /amazon\.[a-z.]+|amzn\.to/i.test(href);
    if (!isAmazon) return;

    var asin = extractAsin(href) || link.getAttribute('data-asin') || '';
    
    var productName = link.getAttribute('data-product-name') ||
                      link.getAttribute('data-track-product') ||
                      link.getAttribute('title');

    if (!productName) {
      var container = link.closest('[data-product], .product-card, article, .card, [itemscope]');
      if (container) {
        var heading = container.querySelector('h1, h2, h3, h4, .product-title, .title');
        if (heading) productName = heading.innerText.trim();
      }
    }

    if (!productName && target.tagName === 'IMG') {
      productName = target.getAttribute('alt');
    }

    if (!productName) {
      productName = document.title ? document.title.split('|')[0].split('-')[0].trim() : 'Produit Amazon';
    }

    var scrollDepth = getScrollDepth();
    var positionZone = detectPositionZone(link, target, scrollDepth);

    var buttonType = 'cta_button';
    var label = link.innerText.trim();
    if (target.tagName === 'IMG' || link.querySelector('img') === target) {
      buttonType = 'image';
      label = 'Image Produit';
    } else if (positionZone === 'Barre Sticky Mobile') {
      buttonType = 'sticky_bar';
    } else if (!label || label.length > 50) {
      buttonType = 'text_link';
      label = label.substring(0, 40) + '...';
    }

    sendPayload({
      type: 'click',
      site: site,
      pagePath: window.location.pathname,
      pageTitle: document.title,
      asin: asin,
      productName: productName,
      buttonLabel: label || 'Voir sur Amazon',
      buttonType: buttonType,
      positionZone: positionZone,
      scrollDepth: scrollDepth,
      affiliateUrl: href,
      device: device,
      referrer: initialSource,
      timestamp: new Date().toISOString(),
    });
  }

  // Tracking des impressions (produits vus dans l'écran)
  var seenAsins = {};
  if ('IntersectionObserver' in window) {
    var impressionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          var el = entry.target;
          var link = el.querySelector('a[href*="amazon."], a[href*="amzn.to"]') || el.closest('a');
          if (link) {
            var asin = extractAsin(link.href) || el.getAttribute('data-asin');
            if (asin && !seenAsins[asin]) {
              seenAsins[asin] = true;
              var name = el.getAttribute('data-product-name') || 
                         (el.querySelector('h2, h3, h4') ? el.querySelector('h2, h3, h4').innerText.trim() : '');
              sendPayload({
                type: 'impression',
                site: site,
                pagePath: window.location.pathname,
                asin: asin,
                productName: name || 'Produit',
                timestamp: new Date().toISOString(),
              });
            }
          }
        }
      });
    }, { threshold: 0.5 });

    function observeProducts() {
      var elements = document.querySelectorAll('[data-track-product], [data-product], .product-card, article');
      elements.forEach(function (el) {
        impressionObserver.observe(el);
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeProducts);
    } else {
      observeProducts();
    }
  }

  // --- EXPOSE GLOBAL REFERRAL TRACKER ---
  window.trackReferral = function (opts) {
    if (!opts) return;
    sendPayload({
      type: 'referral',
      site: site,
      pagePath: window.location.pathname,
      pageTitle: document.title,
      device: device,
      referrer: initialSource,
      timestamp: new Date().toISOString(),
      action: opts.action || 'copy_code',
      referralName: opts.referralName || opts.name || 'Offre Partenaire',
      referralCode: opts.referralCode || opts.code || '',
      referralCategory: opts.referralCategory || opts.category || 'Général',
      advantage: opts.advantage || '',
      sourceComponent: opts.sourceComponent || opts.source || 'card',
      referralId: opts.referralId || opts.slug || '',
    });
  };

  // --- AUTOMATIC REFERRAL COPY & LINK LISTENER ---
  function handleReferralInteractions(e) {
    var target = e.target;
    var btn = target.closest('button');
    var link = target.closest('a');

    // Detect Copy Button clicks
    if (btn) {
      var isCopyButton = btn.getAttribute('aria-label') === 'Copier' ||
                          btn.getAttribute('aria-label') === 'Copier le code' ||
                          btn.getAttribute('data-action') === 'copy' ||
                          btn.innerText.indexOf('Copier') !== -1 ||
                          btn.innerText.indexOf('Copié') !== -1 ||
                          btn.closest('[data-referral-code]') ||
                          btn.querySelector('svg.lucide-copy');

      if (isCopyButton) {
        var card = btn.closest('.glass-card, article, [data-referral], .referral-card, section');
        var stickyBar = btn.closest('.fixed, [class*="Sticky"], [class*="sticky"]');
        var codeEl = card ? card.querySelector('.font-mono, [data-code], span.truncate') : null;
        var code = btn.getAttribute('data-code') || (codeEl ? codeEl.innerText.trim() : '');

        var name = '';
        var advantage = '';
        var category = '';

        if (card) {
          var titleEl = card.querySelector('h1, h2, h3, .brand-name');
          if (titleEl) {
            name = titleEl.innerText.replace(/Avis\s+/i, '').replace(/Parrainage\s+/i, '').trim();
          }
          var advEl = card.querySelector('[class*="emerald"], [class*="primary"], .advantage');
          if (advEl) advantage = advEl.innerText.trim();
        }

        if (stickyBar) {
          var stickyTitle = stickyBar.querySelector('span.font-bold');
          if (stickyTitle) name = stickyTitle.innerText.trim();
        }

        if (!name && document.title) {
          name = document.title.split('🎁')[0].split('—')[0].replace(/Avis\s+/i, '').replace(/Parrainage\s+/i, '').trim();
        }

        var sourceComponent = stickyBar ? 'sticky_bar' : (window.location.pathname.startsWith('/parrainage-') ? 'detail_hero' : 'card');

        window.trackReferral({
          action: stickyBar ? 'sticky_copy' : 'copy_code',
          referralName: name || 'Code Partenaire',
          referralCode: code,
          advantage: advantage,
          sourceComponent: sourceComponent,
        });
      }
    }

    // Detect Outbound Referral Link clicks ("Profiter de l'offre" or external affiliate link)
    if (link && link.href) {
      var isOutbound = link.hostname && link.hostname !== window.location.hostname;
      var isOfferLink = link.innerText.indexOf('Profiter') !== -1 ||
                         link.innerText.indexOf("l'offre") !== -1 ||
                         link.getAttribute('data-referral-link');

      if (isOutbound || isOfferLink) {
        var cardEl = link.closest('.glass-card, article, section');
        var offerName = '';
        if (cardEl) {
          var h = cardEl.querySelector('h1, h2, h3');
          if (h) offerName = h.innerText.replace(/Avis\s+/i, '').replace(/Parrainage\s+/i, '').trim();
        }
        if (!offerName) offerName = document.title.split('🎁')[0].split('—')[0].trim();

        window.trackReferral({
          action: 'click_link',
          referralName: offerName || 'Lien Partenaire',
          advantage: link.innerText.trim(),
          sourceComponent: link.closest('.fixed') ? 'sticky_bar' : 'card',
        });
      }
    }
  }

  document.addEventListener('click', handleLinkClick, { capture: true, passive: true });
  document.addEventListener('click', handleReferralInteractions, { capture: true, passive: true });

  sendPayload({
    type: 'pageview',
    site: site,
    pagePath: window.location.pathname,
    pageTitle: document.title,
    device: device,
    referrer: initialSource,
    timestamp: new Date().toISOString(),
  });
})();
