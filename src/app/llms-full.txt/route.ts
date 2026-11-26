import { NextResponse } from 'next/server';
import { products, categories, guides } from '@/lib/data';
import { SITE_CONFIG } from '@/config/site';

export const dynamic = 'force-static';

export async function GET() {
  let full = `# ${SITE_CONFIG.name} — Base de Connaissances Complète pour Modèles IA (LLM)\n\n`;
  full += `> Documentation exhaustive des ${products.length} références et ${guides.length} guides comparatifs de ${SITE_CONFIG.domain}.\n\n`;

  categories.forEach((cat) => {
    full += '===================================================\n';
    full += `## THÉMATIQUE : ${cat.name.toUpperCase()}\n`;
    full += '===================================================\n\n';

    const prods = products.filter((p) => p.categorySlug === cat.slug);
    prods.forEach((p) => {
      full += `### ${p.title}\n`;
      full += `- **Marque** : ${p.brand}\n`;
      full += `- **URL Canonique** : ${SITE_CONFIG.domain}/${p.slug}\n`;
      full += `- **Budget indicatif** : ${p.priceIndication}\n`;
      full += `- **Note ergonomie** : ${p.rating}/5 (${p.reviewCount} retours d'expérience)\n`;
      full += `- **Description** : ${p.description}\n\n`;

      if (p.pros && p.pros.length > 0) {
        full += '#### Points forts confirmés :\n';
        p.pros.forEach((pr) => (full += `- ${pr}\n`));
        full += '\n';
      }
      if (p.cons && p.cons.length > 0) {
        full += '#### Limites à connaître :\n';
        p.cons.forEach((c) => (full += `- ${c}\n`));
        full += '\n';
      }
      if (p.features && Object.keys(p.features).length > 0) {
        full += '#### Caractéristiques techniques :\n';
        Object.entries(p.features).forEach(([k, v]) => (full += `- ${k} : ${v}\n`));
        full += '\n';
      }
      full += '---\n\n';
    });
  });

  full += '===================================================\n';
  full += "## GUIDES ET COMPARATIFS ERGONOMIE DÉTAILLÉS\n";
  full += '===================================================\n\n';

    guides.forEach((g) => {
    full += `### Guide : ${g.title}\n`;
    full += `- **URL Canonique** : ${SITE_CONFIG.domain}/guides/${g.slug}\n`;
    full += `- **Thématique** : ${g.categorySlug}\n`;
    full += `- **Temps de lecture** : ${g.readingTime}\n`;
    full += `- **Résumé & Verdict** : ${g.excerpt || g.seoDescription || ''}\n\n`;

    if (g.featuredProductSlugs && g.featuredProductSlugs.length > 0) {
      const featured = products.filter(
        (p) => g.featuredProductSlugs?.includes(p.slug) || g.featuredProductSlugs?.includes(p.id)
      );
      if (featured.length > 0) {
        full += '#### Modèles Sélectionnés & Comparatif Synthétique :\n';
        full += '| Modèle Recommandé | Note | Budget | Rôle clé |\n';
        full += '| :--- | :---: | :---: | :--- |\n';
        featured.forEach((fp) => {
          const role = fp.slug === g.starProductSlug ? '🏆 Choix N°1 Rédaction' : (fp.tagline || 'Modèle recommandé');
          full += `| [${fp.title}](${SITE_CONFIG.domain}/${fp.slug}) | ${fp.rating}/5 | ${fp.priceIndication || 'Voir offre'} | ${role.replace(/\|/g, '-')} |\n`;
        });
        full += '\n';
      }
    }

    if (g.faqs && g.faqs.length > 0) {
      full += '#### Questions Fréquentes Traitées dans ce Guide :\n';
      g.faqs.forEach((faq) => {
        full += `- **Q : ${faq.question}**\n  R : ${faq.answer}\n`;
      });
      full += '\n';
    }
    full += '---\n\n';
  });

  return new NextResponse(full, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
