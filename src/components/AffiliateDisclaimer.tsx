import React from "react";
import { Info } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AffiliateDisclaimer() {
  return (
    <div className="bg-[#f8f1ea] border border-[#efe4da] rounded-2xl p-4 text-xs text-[#75645b] flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-[#fde9df] text-[#e05d44] flex items-center justify-center shrink-0 mt-0.5">
        <Info className="w-3.5 h-3.5" />
      </div>
      <p className="leading-relaxed">
        <strong className="text-[#3d2f2a]">Transparence & sélection :</strong> {SITE_CONFIG.name} participe au Programme Partenaires d&apos;Amazon EU. Lorsque vous commandez via nos liens recommandés, nous pouvons percevoir une commission d&apos;affiliation sans aucun surcoût pour vous. Ce soutien nous aide à financer l&apos;analyse des fiches fabricants, la comparaison des caractéristiques techniques et la rédaction de guides clairs pour vos projets créatifs.
      </p>
    </div>
  );
}
