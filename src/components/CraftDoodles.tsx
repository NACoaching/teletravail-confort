import React from "react";

export default function CraftDoodles() {
  return (
    <div className="hidden xl:block pointer-events-none select-none z-0" aria-hidden="true">
      {/* ================= GAUCHE : DESSINS CRÉATIFS ================= */}

      {/* 1. Ciseaux de découpe & tracé pointillé (Haut gauche - Hero) */}
      <div className="absolute left-[max(14px,calc((100vw-1200px)/4))] top-32 opacity-80 transform -rotate-12 hover:opacity-100 transition-opacity">
        <svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Poignées ciseaux */}
          <ellipse cx="24" cy="58" rx="10" ry="14" transform="rotate(-30 24 58)" stroke="#e05238" strokeWidth="2.5" fill="#ffede6" />
          <ellipse cx="50" cy="62" rx="10" ry="14" transform="rotate(30 50 62)" stroke="#e05238" strokeWidth="2.5" fill="#ffede6" />
          {/* Lames */}
          <path d="M28 50L54 18C55 16 57 17 56 19L38 46" stroke="#5a493e" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M46 52L22 18C21 16 19 17 20 19L36 46" stroke="#5a493e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Rivet */}
          <circle cx="37" cy="46" r="2.5" fill="#d97706" />
          {/* Ligne pointillée de coupe */}
          <path d="M12 12C18 10 24 14 30 10" stroke="#8c786c" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. Tube de peinture avec goutte (Niveau Catégories) */}
      <div className="absolute left-[max(14px,calc((100vw-1200px)/4))] top-[650px] opacity-80 transform rotate-6 hover:opacity-100 transition-opacity">
        <svg width="66" height="66" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bouchon */}
          <rect x="52" y="16" width="10" height="8" rx="2" transform="rotate(45 52 16)" fill="#241b16" stroke="#241b16" strokeWidth="2" />
          {/* Col */}
          <path d="M44 24L50 30" stroke="#5a493e" strokeWidth="3" strokeLinecap="round" />
          {/* Corps du tube de gouache */}
          <path d="M42 22L18 46C15 49 16 54 20 58L22 60C26 64 31 65 34 62L58 38L42 22Z" fill="#ffedd5" stroke="#e05238" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Étiquette peinture */}
          <path d="M36 34L26 44L30 48L40 38L36 34Z" fill="#e05238" />
          {/* Gouttes de pigment */}
          <circle cx="64" cy="14" r="3.5" fill="#e05238" />
          <circle cx="70" cy="22" r="2" fill="#d97706" />
        </svg>
      </div>

      {/* 3. Gouge et copeau de linogravure (Niveau Scrapbooking) */}
      <div className="absolute left-[max(14px,calc((100vw-1200px)/4))] top-[1380px] opacity-80 transform -rotate-6 hover:opacity-100 transition-opacity">
        <svg width="66" height="66" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Manche champignon en bois */}
          <path d="M16 66C12 60 14 50 22 46C30 42 38 48 38 56C38 64 24 72 16 66Z" fill="#f4ebd9" stroke="#5a493e" strokeWidth="2.5" />
          {/* Tige métallique */}
          <path d="M30 46L54 26" stroke="#5a493e" strokeWidth="3" strokeLinecap="round" />
          {/* Lame profil V affûtée */}
          <path d="M52 24L64 14L66 18L56 28" fill="#dcfce7" stroke="#15803d" strokeWidth="2" strokeLinejoin="round" />
          {/* Copeau de lino enroulé */}
          <path d="M58 36C64 34 68 40 62 44C58 46 54 42 56 38" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 4. Vase d'argile modelé à la main (Niveau Modelage) */}
      <div className="absolute left-[max(14px,calc((100vw-1200px)/4))] top-[2150px] opacity-80 transform rotate-8 hover:opacity-100 transition-opacity">
        <svg width="65" height="75" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Silhouette de vase céramique fait main */}
          <path d="M30 18C28 26 16 36 18 54C20 70 30 76 40 76C50 76 60 70 62 54C64 36 52 26 50 18H30Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Col */}
          <ellipse cx="40" cy="18" rx="10" ry="3" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
          {/* Petite tige végétale */}
          <path d="M40 18C40 6 36 2 34 0" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" />
          <path d="M37 10C33 8 32 4 34 2" stroke="#2d6a4f" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M40 6C44 5 46 2 44 0" stroke="#2d6a4f" strokeWidth="1.8" strokeLinecap="round" />
          {/* Lignes de tournage / modelage */}
          <path d="M26 46C30 48 36 48 38 46" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M38 56C42 58 48 58 52 56" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>

      {/* 5. Carnet à croquis relié et crayon (Niveau Guides d'Atelier) */}
      <div className="absolute left-[max(14px,calc((100vw-1200px)/4))] top-[2950px] opacity-80 transform -rotate-10 hover:opacity-100 transition-opacity">
        <svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Carnet de croquis */}
          <rect x="18" y="14" width="44" height="52" rx="4" fill="#faf5ed" stroke="#5a493e" strokeWidth="2.5" />
          {/* Reliure spirale */}
          <circle cx="24" cy="22" r="2" fill="#d97706" />
          <circle cx="24" cy="32" r="2" fill="#d97706" />
          <circle cx="24" cy="42" r="2" fill="#d97706" />
          <circle cx="24" cy="52" r="2" fill="#d97706" />
          {/* Lignes de croquis */}
          <path d="M32 26H54M32 36H50M32 46H46" stroke="#8c786c" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Crayon taillé posé dessus */}
          <path d="M44 60L66 38L70 42L48 64L42 66L44 60Z" fill="#ffedd5" stroke="#e05238" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>


      {/* ================= DROITE : DESSINS CRÉATIFS ================= */}

      {/* 6. Pinceau fin & Palette aquarelle (Haut droite - Hero) */}
      <div className="absolute right-[max(14px,calc((100vw-1200px)/4))] top-36 opacity-80 transform rotate-12 hover:opacity-100 transition-opacity">
        <svg width="72" height="72" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Palette ovale avec pigments */}
          <path d="M62 48C66 34 54 18 38 18C22 18 12 30 14 46C16 62 32 68 48 64C54 62 58 56 62 48Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
          {/* Trou de pouce */}
          <ellipse cx="50" cy="52" rx="4" ry="6" fill="#fcf9f5" stroke="#d97706" strokeWidth="2" />
          {/* Taches d'aquarelle */}
          <circle cx="24" cy="34" r="4.5" fill="#e05238" />
          <circle cx="34" cy="26" r="4.5" fill="#d97706" />
          <circle cx="46" cy="28" r="4.5" fill="#2d6a4f" />
          <circle cx="26" cy="48" r="4.5" fill="#4338ca" />
          {/* Pinceau lavis en diagonale */}
          <path d="M10 70L46 34" stroke="#5a493e" strokeWidth="3" strokeLinecap="round" />
          <path d="M46 34L54 26C56 24 58 26 56 28L48 36" fill="#5a493e" />
          <path d="M52 28L58 22C60 20 61 21 60 23L55 29" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 7. Plume de calligraphie avec volute d'encre (Niveau Scrapbooking / Aquarelle) */}
      <div className="absolute right-[max(14px,calc((100vw-1200px)/4))] top-[820px] opacity-80 transform -rotate-12 hover:opacity-100 transition-opacity">
        <svg width="66" height="66" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Manche de plume d'écriture */}
          <path d="M68 12L42 38" stroke="#5a493e" strokeWidth="3.5" strokeLinecap="round" />
          {/* Bague dorée */}
          <path d="M42 38L38 42" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
          {/* Bec de plume biseauté */}
          <path d="M38 42L24 56C22 58 20 60 18 64C22 62 24 60 26 58L40 44" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" strokeLinejoin="round" />
          <line x1="28" y1="52" x2="21" y2="61" stroke="#7e22ce" strokeWidth="1.5" />
          <circle cx="28" cy="52" r="1.5" fill="#7e22ce" />
          {/* Volute d'encre fluide */}
          <path d="M16 68C22 64 26 70 32 68C36 66 38 60 34 58" stroke="#7e22ce" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 8. Rouleau de masking tape washi déroulé (Niveau Aquarelle / Dessin) */}
      <div className="absolute right-[max(14px,calc((100vw-1200px)/4))] top-[1650px] opacity-80 transform rotate-8 hover:opacity-100 transition-opacity">
        <svg width="72" height="60" viewBox="0 0 85 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rouleau de scotch créatif */}
          <ellipse cx="26" cy="35" rx="14" ry="20" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
          <ellipse cx="26" cy="35" rx="6" ry="10" fill="#fcf9f5" stroke="#d97706" strokeWidth="2" />
          {/* Bande de papier washi déroulée */}
          <path d="M26 55C40 55 55 48 78 48L76 28C55 28 40 35 26 35" fill="#ffedd5" stroke="#e05238" strokeWidth="2" />
          {/* Découpe crantée à la main */}
          <path d="M78 48L76 43L78 38L76 33L78 28" stroke="#e05238" strokeWidth="2" strokeLinecap="round" />
          {/* Petits pois décoratifs sur le masking tape */}
          <circle cx="42" cy="42" r="1.8" fill="#e05238" />
          <circle cx="56" cy="39" r="1.8" fill="#e05238" />
          <circle cx="68" cy="37" r="1.8" fill="#e05238" />
        </svg>
      </div>

      {/* 9. Tampon encreur en bois (Niveau Duel Découpe / Modelage) */}
      <div className="absolute right-[max(14px,calc((100vw-1200px)/4))] top-[2480px] opacity-80 transform -rotate-8 hover:opacity-100 transition-opacity">
        <svg width="65" height="65" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Poignée ronde de tampon */}
          <circle cx="40" cy="20" r="10" fill="#f4ebd9" stroke="#5a493e" strokeWidth="2.5" />
          {/* Corps en bois sculpté */}
          <path d="M36 30L22 46H58L44 30Z" fill="#f4ebd9" stroke="#5a493e" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Semelle en caoutchouc */}
          <rect x="18" y="46" width="44" height="8" rx="2" fill="#ffede6" stroke="#e05238" strokeWidth="2" />
          {/* Empreinte de feuille imprimée */}
          <path d="M30 62C30 58 35 56 40 58C45 56 50 58 50 62C50 68 40 72 40 72C40 72 30 68 30 62Z" fill="#e05238" opacity="0.8" />
        </svg>
      </div>

      {/* 10. Étoiles et étincelles d'artisan (Niveau FAQ / Bas de page) */}
      <div className="absolute right-[max(14px,calc((100vw-1200px)/4))] top-[3200px] opacity-80 transform rotate-6 hover:opacity-100 transition-opacity">
        <svg width="60" height="60" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Étoile 4 branches artisanale */}
          <path d="M35 10C35 24 25 32 12 35C25 38 35 46 35 60C35 46 45 38 58 35C45 32 35 24 35 10Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
          {/* Petite étincelle dorée */}
          <path d="M54 16C54 20 50 23 46 24C50 25 54 28 54 32C54 28 58 25 62 24C58 23 54 20 54 16Z" fill="#ffede6" stroke="#e05238" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="20" cy="18" r="2.5" fill="#2d6a4f" />
          <circle cx="50" cy="54" r="2" fill="#7e22ce" />
        </svg>
      </div>
    </div>
  );
}
