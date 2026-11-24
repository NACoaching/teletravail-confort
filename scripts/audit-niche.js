/**
 * Script de Contrôle Qualité Universel pour le Template Niche (Coin Créatif / Niche Engine)
 *
 * Exécutez : `node scripts/audit-niche.js` ou `npm run audit`
 *
 * Vérifie instantanément :
 * 1. Configuration du site (src/config/site.ts)
 * 2. Catégories & images d'en-tête (src/data/categories.json)
 * 3. Produits, ASINs et photos présentes sur disque (src/data/products.json)
 * 4. FAQ de catégories (src/data/category-faqs.json)
 * 5. Guides et articles (src/data/guides.json)
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
let errors = 0;
let warnings = 0;

console.log('\n🔍 ====================================================');
console.log('    CONTRÔLE QUALITÉ & AUDIT DE DUPLICATION DE NICHE   ');
console.log('====================================================\n');

// 1. Audit site.ts
const siteConfigPath = path.join(rootDir, 'src/config/site.ts');
if (fs.existsSync(siteConfigPath)) {
  const content = fs.readFileSync(siteConfigPath, 'utf8');
  const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
  const domainMatch = content.match(/domain:\s*["']([^"']+)["']/);
  const tagMatch = content.match(/amazonTag:\s*[^"']*["']([^"']+)["']/);
  const emailMatch = content.match(/contactEmail:\s*[^"']*["']([^"']+)["']/);

  console.log('📌 1. Configuration de la Niche (src/config/site.ts) :');
  console.log(`   • Nom du site   : ${nameMatch ? nameMatch[1] : 'Inconnu'}`);
  console.log(`   • Domaine URL   : ${domainMatch ? domainMatch[1] : 'Inconnu'}`);
  console.log(`   • Tag Partenaire: ${tagMatch ? tagMatch[1] : 'Inconnu'}`);
  console.log(`   • Email Contact : ${emailMatch ? emailMatch[1] : 'Inconnu'}`);
  console.log('   ✓ Configuration chargée avec succès.\n');
} else {
  console.error('❌ Fichier src/config/site.ts introuvable !');
  errors++;
}

// 2. Audit categories.json
const catPath = path.join(rootDir, 'src/data/categories.json');
let categories = [];
if (fs.existsSync(catPath)) {
  categories = JSON.parse(fs.readFileSync(catPath, 'utf8'));
  console.log(`📁 2. Catégories & Rayons (${categories.length} trouvés) :`);
  categories.forEach((c) => {
    const heroPath = path.join(rootDir, 'public', c.heroImage || '');
    const heroExists = fs.existsSync(heroPath);
    if (!heroExists) {
      console.warn(`   ⚠️ Image d'en-tête manquante pour "${c.name}": public${c.heroImage}`);
      warnings++;
    } else {
      console.log(`   ✓ [${c.slug}] ${c.name} (${c.subCategories?.length || 0} sous-thèmes)`);
    }
  });
  console.log('');
} else {
  console.error('❌ Fichier src/data/categories.json introuvable !');
  errors++;
}

// 3. Audit products.json
const prodPath = path.join(rootDir, 'src/data/products.json');
if (fs.existsSync(prodPath)) {
  const products = JSON.parse(fs.readFileSync(prodPath, 'utf8'));
  console.log(`📦 3. Catalogue Produits (${products.length} références au total) :`);

  let missingImages = 0;
  let missingAsins = 0;
  let placeholders = 0;

  products.forEach((p) => {
    if (!p.amazonAsin && !p.affiliateUrl) missingAsins++;
    if (p.imageUrl?.includes('placeholder')) placeholders++;

    const imgDiskPath = path.join(rootDir, 'public', p.imageUrl || '');
    if (!fs.existsSync(imgDiskPath)) {
      missingImages++;
    }
  });

  if (missingImages === 0 && placeholders === 0) {
    console.log(`   ✓ 100% des ${products.length} photos existent sur disque dans public/products/`);
  } else {
    console.error(`   ❌ ${missingImages} photos manquantes sur disque !`);
    if (placeholders > 0) console.warn(`   ⚠️ ${placeholders} produits utilisent un placeholder.`);
    errors += missingImages;
  }

  if (missingAsins === 0) {
    console.log(`   ✓ 100% des produits possèdent un lien ou un ASIN affilié valide.`);
  } else {
    console.warn(`   ⚠️ ${missingAsins} produits n'ont pas de lien affilié configuré.`);
    warnings += missingAsins;
  }

  // Ventilation par catégorie
  const countByCat = {};
  products.forEach((p) => {
    countByCat[p.categorySlug] = (countByCat[p.categorySlug] || 0) + 1;
  });
  console.log('   • Répartition :', JSON.stringify(countByCat));
  console.log('');
} else {
  console.error('❌ Fichier src/data/products.json introuvable !');
  errors++;
}

// 4. Audit FAQ
const faqPath = path.join(rootDir, 'src/data/category-faqs.json');
if (fs.existsSync(faqPath)) {
  const faqs = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
  console.log('❓ 4. FAQ de Catégories (Schema.org FAQPage) :');
  const catWithFaq = Object.keys(faqs);
  console.log(`   ✓ ${catWithFaq.length} catégories équipées de questions/réponses.`);
  console.log('');
} else {
  console.warn('⚠️ Aucun fichier src/data/category-faqs.json trouvé.');
  warnings++;
}

// 5. Audit Guides
const guidesPath = path.join(rootDir, 'src/data/guides.json');
if (fs.existsSync(guidesPath)) {
  const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));
  console.log(`📚 5. Guides & Dossiers de Fond (${guides.length} articles) :`);
  guides.forEach((g) => {
    console.log(`   ✓ [${g.slug}] ${g.title.slice(0, 50)}...`);
  });
  console.log('');
}

// Verdict
console.log('====================================================');
if (errors === 0 && warnings === 0) {
  console.log('🎉 AUDIT PARFAIT : Le site est 100% prêt pour la production ou la duplication !');
} else if (errors === 0) {
  console.log(`✅ AUDIT RÉUSSI avec ${warnings} avertissement(s) mineur(s).`);
} else {
  console.error(`❌ ÉCHEC DE L'AUDIT : ${errors} erreur(s) critique(s) à corriger.`);
  process.exit(1);
}
console.log('====================================================\n');
