const fs = require("fs");
const path = require("path");

const products = JSON.parse(fs.readFileSync("./src/data/products.json", "utf-8"));
const productMap = new Map(products.map(p => [p.slug, p]));

function getProd(slug) {
  const p = productMap.get(slug);
  if (!p) throw new Error("Product slug not found: " + slug);
  return p;
}

// Ensure all slugs used in our guides are validated
const existingGuides = JSON.parse(fs.readFileSync("./src/data/guides.json", "utf-8"));

// Update existing 3 scrapbooking guides with starProductSlug and faqs
existingGuides[0].starProductSlug = "album-photo-scrapbooking-papier-kraft-18x18-yopih";
existingGuides[0].faqs = [
  {
    question: "Quel budget prévoir pour débuter le scrapbooking sans se ruiner ?",
    answer: "Comptez entre 35 € et 55 € pour un kit de démarrage complet et durable : un mini-album carré de 18x18 cm en carton dense (autour de 15 €), un lot de colles roller sans acide (environ 10 €), une perforatrice d'angle 3-en-1 (10 €) et des feutres métalliques pour légender vos pages."
  },
  {
    question: "Pourquoi faut-il impérativement de la colle sans acide (acid-free) ?",
    answer: "La colle classique d'écolier contient des solvants acides qui jaunissent et dégradent chimiquement les émulsions des photos argentiques et numériques au bout de quelques mois. La colle sans acide garantit une conservation intacte de vos souvenirs pendant des décennies."
  },
  {
    question: "Quel format d'album choisir pour son premier projet ?",
    answer: "Privilégiez un format 18x18 cm ou 20x20 cm. Le format traditionnel américain 30x30 cm demande énormément de photos et d'embellissements pour ne pas paraître vide, ce qui décourage souvent les créatrices débutantes."
  }
];

existingGuides[1].starProductSlug = "lot-600-feuilles-papiers-scrapbooking-vintage-8x8-maehsab";
existingGuides[1].faqs = [
  {
    question: "Quelle est la différence entre un Junk Journal et un album photo classique ?",
    answer: "Le junk journal est un carnet d'inspiration artistique et poétique composé à partir de fragments de papiers chinés, chutes de dentelle, étiquettes rétro et pensées intimes, là où l'album de scrapbooking est centré sur la mise en valeur ordonnée de photographies."
  },
  {
    question: "Comment réussir l'effet de superposition (layering) sans alourdir la page ?",
    answer: "Superposez toujours les éléments du plus grand au plus petit : démarrez par un grand rectangle de papier déchiré, ajoutez une étiquette ou un ticket au milieu, puis terminez par un sticker translucide floral et une date manuscrite."
  },
  {
    question: "Pourquoi préférer les stickers en film PET transparent aux stickers papier classiques ?",
    answer: "Les stickers transparents en PET imitent à la perfection l'herbier végétal sans aucun contour blanc opaque, permettant aux motifs sous-jacents (textes manuscrits, papiers anciens) de rester visibles par transparence."
  }
];

existingGuides[2].starProductSlug = "perforatrice-angle-3-en-1-vaessen-creative-vert-menthe";
existingGuides[2].faqs = [
  {
    question: "Quel grammage de papier une perforatrice manuelle peut-elle couper ?",
    answer: "La plupart des perforatrices à levier de qualité (comme Vaessen Creative) coupent sans effort des papiers allant de 120 g/m² à 240 g/m². Évitez les cartons ondulés ou trop épais qui risquent d'émousser le mécanisme en acier trempé."
  },
  {
    question: "Comment entretenir et réaffûter une perforatrice de scrapbooking ?",
    answer: "Pour réaffûter les lames métalliques, perforez deux à trois fois une feuille de papier d'aluminium de cuisine pliée en deux. Pour lubrifier le mécanisme, perforez ensuite une feuille de papier sulfurisé paraffiné."
  },
  {
    question: "À quoi servent les 3 rayons (4 mm, 7 mm, 10 mm) d'une perforatrice d'angle ?",
    answer: "Le rayon 4 mm est discret pour les petits tickets et onglets. Le rayon 7 mm est le standard esthétique des photos 10x15 cm. Le rayon 10 mm offre un bel arrondi généreux idéal pour les couvertures de carnets et les intercalaires."
  }
];

// 9 New targeted guides across the other 5 categories
const newGuides = [
  // AQUARELLE 1
  {
    id: "guide-debuter-aquarelle-materiel-indispensable",
    slug: "debuter-aquarelle-materiel-indispensable-guide-complet",
    title: "Débuter l'Aquarelle en 2026 : Le Guide Complet du Matériel & Pas-à-Pas pour ses Premiers Lavis",
    excerpt: "Papier 100% coton ou cellulose ? Pinceaux lavis ou à réservoir ? Boîte d'aquarelle fine ou extra-fine ? Découvrez notre sélection stricte d'atelier pour réussir ses mélanges sans voir son papier gondoler.",
    categorySlug: "aquarelle-peinture",
    readingTime: "9 min",
    publishedAt: "2026-11-06",
    updatedAt: "2026-11-09",
    featuredImageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    starProductSlug: "boite-aquarelle-50-couleurs-pinceaux-precision-grabie",
    featuredProductSlugs: [
      "boite-aquarelle-50-couleurs-pinceaux-precision-grabie",
      "bloc-papier-aquarelle-clairefontaine-aquapad-goldline-a5-300g-70-feuilles",
      "set-10-pinceaux-aquarelle-poil-ecureuil-synthetique-fuumuui",
      "papier-arches-aquarelle-bloc-a4-300g-grain-fin-100-coton",
      "boite-aquarelle-winsor-newton-cotman-set-de-poche-12-godets"
    ],
    seoTitle: "Matériel Aquarelle Débutant : Pinceaux, Papiers 300g & Boîtes (Guide 2026)",
    seoDescription: "Quel matériel acheter pour débuter l'aquarelle ? Découvrez notre comparatif des meilleures boîtes de godets, papiers 300g et pinceaux lavis pour réussir ses dégradés.",
    faqs: [
      {
        question: "Pourquoi mon papier aquarelle gondole-t-il dès que j'applique de l'eau ?",
        answer: "Le gondolage survient lorsque le papier est trop léger (inférieur à 300 g/m²) ou composé uniquement de pâte de bois non collée. Un papier aquarelle de 300 g/m² encollé 4 côtés ou fixé avec du ruban de masquage reste parfaitement plan."
      },
      {
        question: "Faut-il commencer par des godets secs ou des tubes d'aquarelle ?",
        answer: "Pour les débutants, les godets en demi-godets sont bien plus pratiques, économiques et faciles à transporter. Les tubes d'aquarelle liquide sont réservés aux très grands formats et aux lavis très concentrés."
      },
      {
        question: "Quelle est la différence entre papier cellulose et papier 100% coton ?",
        answer: "Le papier cellulose sèche très vite et pardonne moins les retouches. Le papier 100% coton (comme Arches) absorbe l'eau au cœur de la fibre, offrant des fusions de pigments magiques et un temps de travail plus long."
      }
    ],
    content: `<h2>1. Pourquoi le choix du papier conditionne 80% de votre réussite</h2><p>Contrairement au dessin où le crayon prime, à l'aquarelle, <strong>le papier est le véritable maître du jeu</strong>. Si vous peignez sur un papier machine ou un carnet de dessin classique à 120 g/m², l'eau fera pelucher les fibres, la couleur stagnera en flaques disgracieuses et votre enthousiasme sera anéanti en cinq minutes.</p><p>Pour démarrer avec le meilleur rapport plaisir/prix :</p><ul><li><a href="/bloc-papier-aquarelle-clairefontaine-aquapad-goldline-a5-300g-70-feuilles" class="font-bold text-[#e05d44] hover:underline">Le Bloc Clairefontaine Goldline Aquapad A5 300 g/m² (70 feuilles)</a> : l'incontournable d'atelier pour s'entraîner quotidiennement sans culpabiliser. Son grammage lourd résiste vaillamment à l'eau, et son grain fin convient aussi bien aux lavis qu'aux croquis urbains à l'encre.</li><li>Pour les projets finaux et les illustrations florales exigeantes, <a href="/papier-arches-aquarelle-bloc-a4-300g-grain-fin-100-coton" class="font-bold text-[#e05d44] hover:underline">Le Bloc Arches A4 300 g Grain Fin 100% Coton</a> représente le Graal des peintres : les pigments s'y diffusent avec une subtilité et une luminosité incomparables.</li></ul><h2>2. Les couleurs : Palette 50 teintes Grabie ou boîte de poche Winsor & Newton ?</h2><p>Le choix de la boîte d'aquarelle dépend de votre façon de créer :</p><ul><li><a href="/boite-aquarelle-50-couleurs-pinceaux-precision-grabie" class="font-bold text-[#e05d44] hover:underline">La Boîte Aquarelle 50 Couleurs Grabie avec 5 Pinceaux de Précision</a> : notre recommandation N°1 pour débuter dans le confort absolu. Vous disposez immédiatement de toutes les nuances florales, métalliques et paysagères sans devoir passer des heures à chercher vos mélanges sur une palette séparée.</li><li>Pour les nomades et les carnets de voyage en plein air, <a href="/boite-aquarelle-winsor-newton-cotman-set-de-poche-12-godets" class="font-bold text-[#e05d44] hover:underline">Le Coffret Pocket Plus Winsor & Newton Cotman 12 Godets</a> reste la référence mondiale indémodable, ultra-compacte et dotée de godets interchangeables d'une pureté pigmentaire éprouvée.</li></ul><h2>3. Les pinceaux : bannissez les poils durs, privilégiez le lavis doux</h2><p>Un bon pinceau aquarelle doit être une réserve d'eau généreuse tout en conservant une pointe effilée ultra-précise au contact du papier. <a href="/set-10-pinceaux-aquarelle-poil-ecureuil-synthetique-fuumuui" class="font-bold text-[#e05d44] hover:underline">Le Set de 10 Pinceaux Aquarelle Poil Écureuil Synthétique Fuumuui</a> réunit pinceaux ronds, brosses plates et pinceaux traceurs pour réaliser des aplats de ciel immenses comme des nervures de feuilles microscopiques.</p>`
  },

  // AQUARELLE 2
  {
    id: "guide-drawing-gum-reserves-aquarelle",
    slug: "drawing-gum-reserves-aquarelle-technique-materiel",
    title: "Gomme de Masquage (Drawing Gum) à l'Aquarelle : Réserver les Blancs et Maîtriser la Lumière",
    excerpt: "Comment préserver l'éclat des blancs purs sans devoir contourner minutieusement vos sujets au pinceau ? Découvrez le secret du marqueur de masquage Drawing Gum et les techniques de réserve d'atelier.",
    categorySlug: "aquarelle-peinture",
    readingTime: "7 min",
    publishedAt: "2026-11-06",
    updatedAt: "2026-11-09",
    featuredImageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    starProductSlug: "marqueur-drawing-gum-pebeo-0-7mm-gomme-a-masquer-aquarelle",
    featuredProductSlugs: [
      "marqueur-drawing-gum-pebeo-0-7mm-gomme-a-masquer-aquarelle",
      "ruban-de-masquage-artiste-papier-aquarelle-jusart-faible-adherence",
      "aquarelle-japonaise-kuretake-gansai-tambi-starry-colors-6-or",
      "bloc-papier-aquarelle-clairefontaine-aquapad-goldline-a5-300g-70-feuilles"
    ],
    seoTitle: "Drawing Gum Aquarelle : Technique, Marqueur Pébéo & Masquage (2026)",
    seoDescription: "Comment utiliser le Drawing Gum à l'aquarelle pour garder des blancs lumineux ? Guide du feutre de masquage 0,7 mm, rubans doux et conseils de retrait sans déchirer le papier.",
    faqs: [
      {
        question: "Pourquoi ne faut-il pas utiliser un pinceau ordinaire pour le fluide de masquage ?",
        answer: "Le latex liquide sèche extrêmement vite et durcit entre les soies du pinceau, le rendant irrécupérable après une seule utilisation. Utiliser un feutre calibré comme le marqueur Pébéo évite de détruire vos coûteux pinceaux."
      },
      {
        question: "Combien de temps peut-on laisser le Drawing Gum sur une aquarelle ?",
        answer: "Retirez-le dans les 24 à 48 heures maximum. Si vous laissez le masque plusieurs semaines, le latex durcit avec la lumière et les UV, risquant d'arracher les fibres du papier lors du pelage."
      },
      {
        question: "Comment retirer la gomme sans abîmer le papier aquarelle ?",
        answer: "Attendez que votre aquarelle soit totalement sèche à cœur. Frottez délicatement avec la pulpe de l'index propre ou une gomme plastique souple : le film se détache en un ruban élastique continu."
      }
    ],
    content: `<h2>1. Le dilemme de la lumière à l'aquarelle</h2><p>À l'aquarelle, le blanc n'existe pas dans la boîte : <strong>le blanc, c'est le papier vierge</strong>. Pour représenter les reflets de l'eau, les nervures de pétales, la neige ou les étincelles d'un regard, il faut protéger la feuille blanche des lavis colorés qui la submergent.</p><h2>2. La révolution du feutre applicateur</h2><p>Fini les pots de latex qui empuantissent l'atelier et massacrent vos pinceaux en poil naturel :</p><ul><li><a href="/marqueur-drawing-gum-pebeo-0-7mm-gomme-a-masquer-aquarelle" class="font-bold text-[#e05238] hover:underline">Le Marqueur Drawing Gum Pébéo 0,7 mm</a> : sa pointe calibrée dépose un trait bleuté précis comme un stylo bille. On trace, on laisse sécher 5 minutes, on peint librement par-dessus à grande eau, et une fois sec, on pèle au doigt pour retrouver un blanc étincelant.</li><li>Pour délimiter les bordures nettes d'un tableau et garder des marges impeccables, <a href="/ruban-de-masquage-artiste-papier-aquarelle-jusart-faible-adherence" class="font-bold text-[#e05238] hover:underline">Le Ruban de Masquage d'Artiste JusArt</a> à faible adhérence se décolle sans jamais arracher le grain de votre papier.</li><li>Une fois vos réserves blanches révélées, apportez une touche féerique avec <a href="/aquarelle-japonaise-kuretake-gansai-tambi-starry-colors-6-or" class="font-bold text-[#e05238] hover:underline">Le Coffret Kuretake Gansai Tambi Starry Colors</a> pour des rehauts dorés scintillants.</li></ul>`
  },

  // DESSIN 1
  {
    id: "guide-marqueurs-alcool-feutres-illustration",
    slug: "marqueurs-alcool-feutres-illustration-guide-achat",
    title: "Feutres à Alcool & Marqueurs d'Illustration : Comparatif, Papier Layout & Dégradés Sans Traces",
    excerpt: "Comment obtenir des aplats parfaits sans traits de reprise ni bavures ? Découvrez notre guide d'achat complet sur les marqueurs à alcool Ohuhu, Posca et les feutres liners d'encrage.",
    categorySlug: "dessin-feutres",
    readingTime: "8 min",
    publishedAt: "2026-11-06",
    updatedAt: "2026-11-09",
    featuredImageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80",
    starProductSlug: "feutres-alcool-ohuhu-oahu-set-40-couleurs",
    featuredProductSlugs: [
      "feutres-alcool-ohuhu-oahu-set-40-couleurs",
      "bloc-papier-layout-feutres-alcool-canson-xl-marker-a4-100-feuilles",
      "feutres-calibres-sakura-pigma-micron-set-6-noirs",
      "stylos-gel-blanc-sakura-gelly-roll-set-3-pointes",
      "marqueurs-peinture-posca-pc3m-etui-8-couleurs"
    ],
    seoTitle: "Feutres à Alcool & Marqueurs Dessin : Comparatif Ohuhu & Guide (2026)",
    seoDescription: "Quels feutres à alcool choisir pour le dessin et le manga ? Comparatif Ohuhu, papier layout Canson anti-transpercement et stylos d'encrage Sakura Micron.",
    faqs: [
      {
        question: "Pourquoi les feutres à alcool traversent-ils les feuilles de papier classiques ?",
        answer: "L'alcool isopropylique contenu dans les marqueurs a une tension superficielle très basse qui pénètre immédiatement les fibres du papier standard. Il est indispensable d'utiliser un papier Layout traité avec barrière imperméable comme le Canson XL Marker."
      },
      {
        question: "Comment réussir un dégradé fluide entre deux couleurs sans démarcation ?",
        answer: "Travaillez rapidement 'humide sur humide' en appliquant d'abord la teinte la plus claire, puis la plus sombre sur la zone d'ombre, avant de repasser immédiatement avec la teinte claire à la jonction pour fusionner les encres."
      },
      {
        question: "Quelle encre utiliser pour le contour (line-art) sans que le feutre à alcool ne bave ?",
        answer: "Utilisez impérativement des feutres calibrés à base d'encre pigmentée à l'eau comme les Sakura Pigma Micron. L'encre pigmentée sèche de façon totalement étanche et ne se dissout pas au contact de l'alcool."
      }
    ],
    content: `<h2>1. Pourquoi les feutres à alcool révolutionnent le coloriage artistique</h2><p>Contrairement aux feutres d'écolier à l'eau qui laissent des traces de hachures et détrempent la feuille, les <strong>feutres à alcool sèchent en quelques secondes</strong> et fusionnent entre eux comme de la véritable peinture, créant des dégradés fondus dignes d'une impression numérique.</p><h2>2. Notre banc d'essai : Ohuhu face aux feutres professionnels</h2><ul><li><a href="/feutres-alcool-ohuhu-oahu-set-40-couleurs" class="font-bold text-[#e05238] hover:underline">Le Set 40 Marqueurs à Alcool Ohuhu Oahu</a> : le maître incontesté du rapport qualité/prix. Avec sa double pointe biseautée et fine, ses pigments saturés et son nuancier riche, il rivalise directement avec des marques trois fois plus chères.</li><li>Pour stopper net les traversées d'encre sur le bureau, <a href="/bloc-papier-layout-feutres-alcool-canson-xl-marker-a4-100-feuilles" class="font-bold text-[#e05238] hover:underline">Le Bloc Canson XL Marker A4 100 Feuilles</a> est impératif : son papier Layout 70 g ultra-lisse intègre une barrière étanche anti-fuite.</li><li>Pour l'encrage des contours avant mise en couleur, <a href="/feutres-calibres-sakura-pigma-micron-set-6-noirs" class="font-bold text-[#e05238] hover:underline">Le Set de 6 Feutres Sakura Pigma Micron</a> à encre d'archive indélébile ne bave absolument jamais.</li><li>Pour poser les reflets de lumière et les étincelles dans les pupilles, <a href="/stylos-gel-blanc-sakura-gelly-roll-set-3-pointes" class="font-bold text-[#e05238] hover:underline">Les Stylos Gel Blanc Sakura Gelly Roll</a> apportent une opacité parfaite sur les aplats sombres.</li></ul>`
  },

  // DESSIN 2
  {
    id: "guide-carnet-croquis-crayons-graphite",
    slug: "carnet-croquis-crayons-graphite-dessin-debutant",
    title: "Carnet de Croquis & Crayons Graphite : Quel Matériel Choisir pour Dessiner au Quotidien",
    excerpt: "Dureté des mines (HB, 2B, 6B), grain du carnet et accessoires d'estompe : notre sélection d'atelier pour démarrer le croquis nomade et l'illustration au crayon.",
    categorySlug: "dessin-feutres",
    readingTime: "7 min",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-09",
    featuredImageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    starProductSlug: "carnet-croquis-talens-art-creation-couverture-rigide-noir-13x21-140g",
    featuredProductSlugs: [
      "carnet-croquis-talens-art-creation-couverture-rigide-noir-13x21-140g",
      "crayons-croquis-graphite-drawlish-set-8-mines-graduees",
      "crayons-couleur-faber-castell-polychromos-boite-metal-12",
      "stylo-gomme-precision-tombow-mono-zero-pointe-ronde-2-3-mm",
      "gomme-mie-de-pain-faber-castell-avec-boite-protection-gris"
    ],
    seoTitle: "Carnet de Croquis & Matériel Dessin Graphite : Guide Débutant (2026)",
    seoDescription: "Quel carnet de croquis et quels crayons de graphite acheter pour progresser en dessin ? Guide pratique des mines 2B-6B, gommes de précision et carnets 140g.",
    faqs: [
      {
        question: "Pourquoi posséder plusieurs graduations de mines graphite (HB, 2B, 6B) ?",
        answer: "La mine HB est dure et claire, idéale pour les tracés préparatoires. Les mines B (2B, 4B, 6B) sont douces et riches en carbone, parfaites pour les ombrages profonds et les contrastes percutants."
      },
      {
        question: "À quoi sert la gomme mie de pain comparée à une gomme blanche classique ?",
        answer: "La gomme mie de pain s'assouplit comme de la pâte à modeler et absorbe le graphite par tapotement sans frotter ni faire de miettes, ce qui permet d'éclaircir un dégradé sans abîmer les fibres du papier."
      }
    ],
    content: `<h2>1. Le plaisir du carnet nomade toujours dans le sac</h2><p>Pour progresser en dessin, la régularité compte cent fois plus que le talent inné. Avoir sur soi un carnet solide et quelques crayons bien choisis permet de croquer une scène sur le vif dès qu'un quart d'heure de liberté se présente.</p><ul><li><a href="/carnet-croquis-talens-art-creation-couverture-rigide-noir-13x21-140g" class="font-bold text-[#e05238] hover:underline">Le Carnet de Croquis Talens Art Creation 13x21 cm (140 g/m²)</a> : avec sa couverture rigide protectrice, son ruban marque-page et ses 80 feuilles ivoire épaisses, il prend aussi bien le graphite que l'encre et les lavis légers.</li><li><a href="/crayons-croquis-graphite-drawlish-set-8-mines-graduees" class="font-bold text-[#e05238] hover:underline">Le Set de 8 Crayons Graphite Gradués Drawlish</a> : l'assortiment idéal de mines douces pour donner du volume et du relief à vos ombrages.</li><li>Pour corriger les micro-détails avec une précision chirurgicale, <a href="/stylo-gomme-precision-tombow-mono-zero-pointe-ronde-2-3-mm" class="font-bold text-[#e05238] hover:underline">Le Stylo Gomme Tombow MONO Zéro 2,3 mm</a> permet de 'gommer en dessinant' les rehauts de lumière.</li></ul>`
  },

  // LINOGRAVURE 1
  {
    id: "guide-materiel-linogravure-debutant",
    slug: "materiel-linogravure-debutant-kit-gouges-rouleau",
    title: "Débuter la Linogravure en 2026 : Le Matériel Indispensable (Gouges, Plaques & Encreurs)",
    excerpt: "L'art de l'estampe artisanale vous attire ? Découvrez notre sélection d'atelier pour choisir vos premières gouges, vos plaques de gomme souple et vos rouleaux encreurs sans danger.",
    categorySlug: "linogravure",
    readingTime: "8 min",
    publishedAt: "2026-11-07",
    updatedAt: "2026-11-09",
    featuredImageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    starProductSlug: "kit-initiation-linogravure-complet-essdee-linocut-taster-kit",
    featuredProductSlugs: [
      "kit-initiation-linogravure-complet-essdee-linocut-taster-kit",
      "set-manche-5-gouges-interchangeables-linogravure-essdee",
      "rouleau-encreur-linogravure-essdee-ink-roller-75mm",
      "plaques-gomme-a-graver-essdee-softcut-200x150mm-lot-de-2",
      "baren-manuel-en-bois-linogravure-artway-70mm-semelle-feutre"
    ],
    seoTitle: "Matériel Linogravure Débutant : Kit, Gouges & Rouleaux (Guide 2026)",
    seoDescription: "Quel matériel acheter pour débuter la linogravure à la maison ? Comparatif des kits complets Essdee, plaques SoftCut faciles à graver et rouleaux encreurs.",
    faqs: [
      {
        question: "Faut-il commencer par du vrai linoléum ou de la gomme à graver SoftCut ?",
        answer: "Pour les débutants complets, la gomme SoftCut (ou plaque vinyle) est infiniment recommandée : elle se grave avec la douceur du beurre, sans nécessiter de chauffer la matière et sans risque de dérapage brusque de la gouge."
      },
      {
        question: "Comment éviter de se couper avec les gouges de linogravure ?",
        answer: "La règle fondamentale de l'atelier : gardez TOUJOURS vos deux mains derrière le tranchant de la gouge. Ne tenez jamais la plaque devant la lame, ou utilisez une butée d'atelier en bois."
      },
      {
        question: "À quoi sert un baren manuel lors de l'impression ?",
        answer: "Le baren permet d'exercer une pression circulaire uniforme et puissante avec la paume de la main sur le dos de la feuille, transférant 100% de l'encre sans avoir besoin d'une presse métallique lourde et coûteuse."
      }
    ],
    content: `<h2>1. La magie de l'estampe manuelle à la maison</h2><p>La linogravure est l'un des rares arts manuels où un seul motif gravé permet d'imprimer à l'infini des séries de cartes de vœux, des affiches d'art, des ex-libris et des tote bags textiles personnalisés.</p><h2>2. Le kit complet pour débuter sereinement</h2><ul><li><a href="/kit-initiation-linogravure-complet-essdee-linocut-taster-kit" class="font-bold text-[#e05238] hover:underline">Le Kit d'Initiation Linocut Taster Kit Essdee</a> : tout ce qu'il faut dans une seule boîte. Manche ergonomique, 5 gouges en acier trempé, rouleau encreur 65 mm, tube d'encre noire à l'eau et blocs de gomme Softcut prêts à l'emploi.</li><li>Pour des impressions plus grandes sans forcer sur la main, <a href="/rouleau-encreur-linogravure-essdee-ink-roller-75mm" class="font-bold text-[#e05238] hover:underline">Le Rouleau Encreur Professionnel Essdee 75 mm</a> étale un film d'encre satiné parfaitement régulier.</li><li>Pour assurer un transfert d'encre dense et opaque sans presse, <a href="/baren-manuel-en-bois-linogravure-artway-70mm-semelle-feutre" class="font-bold text-[#e05238] hover:underline">Le Baren Manuel en Bois Artway 70 mm</a> démultiplie l'appui de votre paume.</li></ul>`
  },

  // LINOGRAVURE 2
  {
    id: "guide-encre-linogravure-base-eau",
    slug: "encre-linogravure-choisir-base-eau-comparatif",
    title: "Encres de Linogravure : Base Eau ou Base Huile ? Guide d'Achat & Temps de Séchage",
    excerpt: "Nettoyage facile à l'évier ou intensité maximale des pigments ? Découvrez comment choisir votre encre d'impression selon votre espace d'atelier et vos supports papier.",
    categorySlug: "linogravure",
    readingTime: "7 min",
    publishedAt: "2026-11-08",
    updatedAt: "2026-11-09",
    featuredImageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80",
    starProductSlug: "encre-linogravure-schmincke-college-linol-noir-75ml-base-eau",
    featuredProductSlugs: [
      "encre-linogravure-schmincke-college-linol-noir-75ml-base-eau",
      "coffret-5-encres-linogravure-base-eau-essdee-100ml-couleurs-primaires",
      "plaques-linoleum-traditionnel-artway-format-a3-paquet-de-3",
      "rouleau-encreur-linogravure-essdee-ink-roller-75mm"
    ],
    seoTitle: "Encre Linogravure Base Eau : Comparatif & Temps de Séchage (2026)",
    seoDescription: "Quelle encre choisir pour la linogravure à la maison ? Comparatif des encres Schmincke et Essdee à base d'eau faciles à nettoyer au savon.",
    faqs: [
      {
        question: "L'encre à l'eau est-elle moins résistante que l'encre à l'huile ?",
        answer: "Sur papier d'art, les encres modernes à base d'eau de qualité d'atelier (comme Schmincke) offrent des noirs profonds et des pigments très résistants aux UV, avec l'avantage inestimable de se nettoyer simplement à l'eau tiède sans essence de térébenthine."
      }
    ],
    content: `<h2>1. Pourquoi l'encre à base d'eau est reine à la maison</h2><p>L'encre de linogravure à l'huile traditionnelle demande des solvants toxiques et plusieurs jours de séchage. Pour un atelier d'appartement, les encres modernes hydro-solubles offrent une finition professionnelle avec un nettoyage à l'eau tiède et au savon en deux minutes.</p><ul><li><a href="/encre-linogravure-schmincke-college-linol-noir-75ml-base-eau" class="font-bold text-[#e05238] hover:underline">L'Encre Linogravure Schmincke College Linol 75 ml Noir</a> : le noir le plus velouté du marché, d'une onctuosité remarquable au rouleau.</li><li>Pour explorer la quadrichromie et les tirages multicolores, <a href="/coffret-5-encres-linogravure-base-eau-essdee-100ml-couleurs-primaires" class="font-bold text-[#e05238] hover:underline">Le Coffret 5 Encres Primaires Essdee 100 ml</a> offre une réserve généreuse pour des dizaines d'impressions.</li></ul>`
  },

  // MODELAGE 1
  {
    id: "guide-debuter-argile-autodurcissante-sans-cuisson",
    slug: "debuter-argile-autodurcissante-sans-cuisson-guide-outils",
    title: "Argile Autodurcissante sans Cuisson : Guide Débutant, Séchage sans Fissure & Vernissage",
    excerpt: "Envie de sculpter coupelles, bougeoirs et petits vases sans posséder de four de potier ? Suivez notre méthode pas-à-pas pour travailler l'argile autodurcissante DAS et réussir vos finitions.",
    categorySlug: "modelage-argile",
    readingTime: "8 min",
    publishedAt: "2026-11-08",
    updatedAt: "2026-11-09",
    featuredImageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
    starProductSlug: "argile-blanche-autodurcissante-sans-cuisson-das-1kg",
    featuredProductSlugs: [
      "argile-blanche-autodurcissante-sans-cuisson-das-1kg",
      "swpeet-kit-16-outils-modelage-argile-poterie",
      "cleopatre-vernis-glassificateur-protection-brillant-100g",
      "sculpey-rouleau-acrylique-argile-anti-adhesif",
      "terre-glaise-autodurcissante-rayher-beige-1kg"
    ],
    seoTitle: "Argile Autodurcissante sans Cuisson : Guide Débutant & Séchage (2026)",
    seoDescription: "Comment travailler l'argile autodurcissante DAS sans qu'elle fissure ? Choix des outils de modelage, temps de séchage et vernis glassificateur étanche.",
    faqs: [
      {
        question: "Pourquoi l'argile autodurcissante fissure-t-elle parfois au séchage ?",
        answer: "Les fissures apparaissent quand l'épaisseur est inégale (moins de 4 mm ou plus de 2 cm) ou quand la pièce sèche trop vite près d'un radiateur. Laissez sécher à température ambiante douce pendant 24 à 48 heures."
      },
      {
        question: "Une coupelle en argile sans cuisson peut-elle contenir de l'eau ?",
        answer: "Non, l'argile sans cuisson n'est pas vitrifiée à 1 000 °C comme la faïence. Même vernie avec un vernis glassificateur, elle résiste aux éclaboussures et petites gouttes mais ne doit pas servir de vase immergé ou de plat alimentaire."
      }
    ],
    content: `<h2>1. La poterie moderne sans four professionnel</h2><p>L'argile autodurcissante minérale a révolutionné les loisirs créatifs : elle se modèle à l'eau comme la terre de potier traditionnelle, mais durcit toute seule à l'air libre en 24 heures pour donner un objet solide prêt à peindre et vernir.</p><ul><li><a href="/argile-blanche-autodurcissante-sans-cuisson-das-1kg" class="font-bold text-[#e05238] hover:underline">Le Pain d'Argile Blanche Autodurcissante DAS 1 kg</a> : la référence absolue mondiale. Pâte fine, ne colle pas aux doigts et offre une couleur blanche calcaire d'une grande pureté.</li><li>Pour étaler vos plaques avec une épaisseur parfaitement calibrée sans coller, <a href="/sculpey-rouleau-acrylique-argile-anti-adhesif" class="font-bold text-[#e05238] hover:underline">Le Rouleau Acrylique Sculpey 20 cm</a> est indispensable.</li><li>Pour donner un rendu céramique laqué et protéger vos coupelles à bijoux, <a href="/cleopatre-vernis-glassificateur-protection-brillant-100g" class="font-bold text-[#e05238] hover:underline">Le Vernis Glassificateur Cléopâtre 100 g</a> offre une brillance miroir époustouflante.</li></ul>`
  },

  // CARTERIE 1
  {
    id: "guide-sceaux-de-cire-cachet-laiton",
    slug: "sceau-de-cire-cachet-laiton-faire-part-guide",
    title: "Sceaux de Cire & Cachets Artisanaux : Comment Réussir ses Empreintes sur Cartes & Faire-Part",
    excerpt: "Le geste noble pour sceller correspondances et enveloppes de mariage. Découvrez comment doser les perles de cire, éviter l'adhérence et créer des marbrures bicolores spectaculaires.",
    categorySlug: "carterie-calligraphie",
    readingTime: "7 min",
    publishedAt: "2026-11-08",
    updatedAt: "2026-11-09",
    featuredImageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80",
    starProductSlug: "biteyi-coffret-tampon-sceau-de-cire-cuillere-perles-laiton",
    featuredProductSlugs: [
      "biteyi-coffret-tampon-sceau-de-cire-cuillere-perles-laiton",
      "japun-lot-51-cartes-pliantes-enveloppes-a6-c6-230g",
      "tombow-fudenosuke-duo-feutres-pinceaux-calligraphie",
      "naebro-lot-5600-carres-mousse-adhesive-double-face-3d"
    ],
    seoTitle: "Sceaux de Cire & Cachet Laiton : Guide Réussite Faire-Part (2026)",
    seoDescription: "Comment faire de magnifiques sceaux de cire sans bulles ? Guide complet des coffrets laiton, perles de cire souples et astuces pour enveloppes de mariage.",
    faqs: [
      {
        question: "Combien de perles de cire faut-il pour un sceau rond standard de 25 mm ?",
        answer: "Comptez exactement 3 à 4 perles de cire selon l'épaisseur du rebord souhaitée. Trois perles donnent un bord fin et net ; quatre perles créent un large bourrelet organique très chic."
      },
      {
        question: "La cire moderne casse-t-elle lors du transport par La Poste ?",
        answer: "Non, les perles de cire modernes contiennent une résine souple et flexible. Contrairement aux vieux bâtons de cire cassants du XIXe siècle, les cachets souples traversent les trieuses postales sans se briser."
      }
    ],
    content: `<h2>1. L'élégance intemporelle du cachet de cire</h2><p>Apposer un sceau de cire transforme une simple enveloppe d'invitation ou un paquet cadeau en un objet précieux chargé d'émotion.</p><ul><li><a href="/biteyi-coffret-tampon-sceau-de-cire-cuillere-perles-laiton" class="font-bold text-[#e05238] hover:underline">Le Coffret Cachet & Sceau de Cire BITEYI</a> : réunit un manche en bois avec tête en laiton massif gravée, une cuillère de fusion en cuivre et un assortiment de perles de cire souple aux reflets chatoyants.</li><li>Pour une papeterie coordonnée haut de gamme, <a href="/japun-lot-51-cartes-pliantes-enveloppes-a6-c6-230g" class="font-bold text-[#e05238] hover:underline">Le Coffret 51 Cartes & Enveloppes Kraft Japun (230 g/m²)</a> offre un support noble et chaleureux.</li><li>Pour calligraphier les adresses au pinceau souple, <a href="/tombow-fudenosuke-duo-feutres-pinceaux-calligraphie" class="font-bold text-[#e05238] hover:underline">Le Duo Tombow Fudenosuke</a> assure des déliés d'une finesse remarquable.</li></ul>`
  },

  // CARTERIE 2
  {
    id: "guide-embossage-a-chaud-poudre-embosser",
    slug: "embossage-a-chaud-poudre-embosser-pistolet-chaleur",
    title: "Embossage à Chaud en Carterie : Pistolet à Chaleur, Encre VersaMark & Poudres Métalliques",
    excerpt: "Comment créer des lettrages et motifs en relief doré brillant comme chez un imprimeur d'art ? Le guide complet du matériel d'embossage thermique à la maison.",
    categorySlug: "carterie-calligraphie",
    readingTime: "7 min",
    publishedAt: "2026-11-08",
    updatedAt: "2026-11-09",
    featuredImageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    starProductSlug: "seekone-mini-decapeur-thermique-pistolet-air-chaud-embossage-350w",
    featuredProductSlugs: [
      "seekone-mini-decapeur-thermique-pistolet-air-chaud-embossage-350w",
      "tsukineko-versamark-encreur-transparent-embossage-filigrane",
      "aladine-poudre-embosser-izink-or-extra-fine-25ml",
      "vaessen-creative-planche-rainurage-creation-cartes-enveloppes"
    ],
    seoTitle: "Embossage à Chaud : Pistolet Chaleur & Poudre à Embosser (Guide 2026)",
    seoDescription: "Comment réussir l'embossage à chaud sur vos cartes de vœux ? Guide du pistolet thermique 350W, encreur VersaMark et poudres dorées Izink.",
    faqs: [
      {
        question: "Peut-on utiliser un sèche-cheveux à la place d'un pistolet à embosser ?",
        answer: "Non, le sèche-cheveux souffle beaucoup trop fort et pas assez chaud : il dispersera vos poudres précieuses partout dans la pièce sans les faire fondre. Un pistolet à embosser souffle un flux d'air chaud doux et concentré à plus de 200 °C."
      }
    ],
    content: `<h2>1. La magie du relief métallisé instantané</h2><p>L'embossage à chaud est l'une des techniques les plus gratifiantes de la carterie : on tamponne un motif à l'encre collante, on saupoudre de poudre dorée, et sous le souffle chaud du pistolet thermique, la poudre fond en direct sous vos yeux pour former un relief émaillé brillant permanent.</p><ul><li><a href="/seekone-mini-decapeur-thermique-pistolet-air-chaud-embossage-350w" class="font-bold text-[#e05238] hover:underline">Le Mini Décapeur Thermique SEEKONE 350 W</a> : silencieux, compact et muni d'un déflecteur de protection pour faire fondre la poudre sans brûler le papier.</li><li>Pour retenir la poudre avec une adhérence parfaite, <a href="/tsukineko-versamark-encreur-transparent-embossage-filigrane" class="font-bold text-[#e05238] hover:underline">L'Encreur Transparent VersaMark Tsukineko</a> reste la référence mondiale incontournable.</li><li>Pour un or pur étincelant, <a href="/aladine-poudre-embosser-izink-or-extra-fine-25ml" class="font-bold text-[#e05238] hover:underline">La Poudre à Embosser Izink Gold Extra-Fine Aladine</a> fond en une pellicule dorée sans aucun grain visible.</li></ul>`
  }
];

const allGuides = [...existingGuides, ...newGuides];
fs.writeFileSync("./src/data/guides.json", JSON.stringify(allGuides, null, 2) + "\n", "utf-8");
console.log(`Successfully written ${allGuides.length} full guides into src/data/guides.json`);
