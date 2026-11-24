import React from "react";

export default function CraftDoodles() {
  return (
    <div className="hidden xl:block pointer-events-none select-none z-0" aria-hidden="true">
      {/* ================= GAUCHE : ÉLÉMENTS SET-UP / HOME OFFICE ================= */}

      {/* 1. Écran d'ordinateur & Support (Haut gauche) */}
      <div className="absolute left-[max(14px,calc((100vw-1200px)/4))] top-32 opacity-70 transform -rotate-6 hover:opacity-100 transition-opacity">
        <svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Moniteur */}
          <rect x="14" y="14" width="52" height="36" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
          {/* Dalle intérieure */}
          <rect x="19" y="19" width="42" height="26" rx="2" fill="#dbeafe" opacity="0.6" />
          {/* Pied & Base */}
          <path d="M40 50V62" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <path d="M28 62H52" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. Souris ergonomique sans fil (Niveau Catégories) */}
      <div className="absolute left-[max(14px,calc((100vw-1200px)/4))] top-[650px] opacity-70 transform rotate-12 hover:opacity-100 transition-opacity">
        <svg width="60" height="70" viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Corps de souris verticale */}
          <path d="M24 16C36 12 52 24 50 48C48 64 38 68 26 66C16 64 14 48 16 34C18 24 20 18 24 16Z" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Molette */}
          <rect x="28" y="24" width="5" height="12" rx="2.5" fill="#3b82f6" />
          {/* Clic gauche/droite ligne de séparation */}
          <path d="M30 14V24" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 3. Tasse de café / thé bureau (Milieu gauche) */}
      <div className="absolute left-[max(14px,calc((100vw-1200px)/4))] top-[1400px] opacity-70 transform -rotate-8 hover:opacity-100 transition-opacity">
        <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Corps du mug */}
          <path d="M20 28H56V52C56 60 50 66 42 66H34C26 66 20 60 20 52V28Z" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Anse */}
          <path d="M56 34C64 34 66 46 56 48" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          {/* Volutes de chaleur */}
          <path d="M30 16C28 20 32 22 30 26" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 14C40 18 44 20 42 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ================= DROITE : ÉLÉMENTS CONFORT & BUREAU ================= */}

      {/* 4. Chaise ergonomique / Dossier (Haut droite) */}
      <div className="absolute right-[max(14px,calc((100vw-1200px)/4))] top-36 opacity-70 transform rotate-8 hover:opacity-100 transition-opacity">
        <svg width="68" height="78" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dossier mesh courbé */}
          <path d="M26 14C34 10 46 10 54 14C56 26 58 40 52 48C46 52 34 52 28 48C22 40 24 26 26 14Z" fill="#f0fdf4" stroke="#10b981" strokeWidth="2.5" />
          {/* Têtière */}
          <rect x="32" y="4" width="16" height="8" rx="4" fill="#dcfce7" stroke="#10b981" strokeWidth="2" />
          {/* Assise */}
          <path d="M20 52H60C62 58 58 64 50 64H30C22 64 18 58 20 52Z" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
          {/* Pied central vérin */}
          <path d="M40 64V76" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* 5. Lampe Screenbar d'écran (Milieu droite) */}
      <div className="absolute right-[max(14px,calc((100vw-1200px)/4))] top-[800px] opacity-70 transform -rotate-6 hover:opacity-100 transition-opacity">
        <svg width="74" height="60" viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Barre LED horizontale */}
          <rect x="12" y="16" width="66" height="8" rx="4" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          {/* Faisceau lumineux doux vers le bas */}
          <path d="M18 24L10 54H80L72 24" fill="#fef9c3" opacity="0.4" />
          {/* Support contrepoids */}
          <circle cx="45" cy="14" r="6" fill="#475569" />
        </svg>
      </div>

      {/* 6. Carnet de notes et stylo (Bas droite) */}
      <div className="absolute right-[max(14px,calc((100vw-1200px)/4))] top-[1600px] opacity-70 transform rotate-12 hover:opacity-100 transition-opacity">
        <svg width="66" height="66" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Carnet de notes relié */}
          <rect x="18" y="16" width="42" height="52" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />
          {/* Spirale */}
          <path d="M18 24H24M18 34H24M18 44H24M18 54H24" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
          {/* Lignes d'écriture */}
          <line x1="28" y1="28" x2="52" y2="28" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="38" x2="48" y2="38" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="48" x2="44" y2="48" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
