import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: `Mentions Légales & Contact | ${SITE_CONFIG.name}`,
  description: `Informations légales, contact de l'éditeur et transparence sur le programme d'affiliation de ${SITE_CONFIG.name}.`,
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#75645b] hover:text-[#e05d44]">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Retour à l&apos;accueil</span>
      </Link>

      <div className="bandeau-doux rounded-[2.5rem] p-7 sm:p-10 border border-[#efe4da]">
        <h1 className="titre text-3xl font-bold text-[#3d2f2a] mb-2">
          Mentions Légales & Transparence
        </h1>
        <p className="text-sm text-[#75645b]">
          Informations légales, hébergement et fonctionnement des partenariats d&apos;affiliation.
        </p>
      </div>

      <div className="craft-card rounded-[2rem] p-6 sm:p-8 text-xs sm:text-sm leading-relaxed space-y-6 text-[#75645b]">
        <section>
          <h2 className="titre text-lg font-bold text-[#3d2f2a] mb-2">1. Éditeur du site & Contact</h2>
          <p>
            Le site <strong>{SITE_CONFIG.name}</strong> ({SITE_CONFIG.domain}) est un média indépendant d&apos;information et de guides d&apos;achat édité par {SITE_CONFIG.publisher}.
          </p>
          <ContactForm defaultEmail={SITE_CONFIG.contactEmail} />
        </section>

        <section className="pt-4 border-t border-[#efe4da]">
          <h2 className="titre text-lg font-bold text-[#3d2f2a] mb-2">2. Hébergement</h2>
          <p>
            Le site est hébergé par la société <strong>Cloudflare, Inc.</strong><br />
            Adresse : 101 Townsend St, San Francisco, CA 94107, États-Unis.<br />
            Site web : https://www.cloudflare.com
          </p>
        </section>

        <section className="pt-4 border-t border-[#efe4da]">
          <h2 className="titre text-lg font-bold text-[#3d2f2a] mb-2">3. Programme d&apos;Affiliation Amazon & Transparence</h2>
          <p>
            <strong>{SITE_CONFIG.name}</strong> ({SITE_CONFIG.domain.replace("https://", "")}) participe au <strong>Programme Partenaires d&apos;Amazon EU</strong>, un programme d&apos;affiliation conçu pour permettre à des sites de percevoir une rémunération grâce à la création de liens vers Amazon.fr.
          </p>
          <p className="mt-2">
            En tant que Partenaire Amazon, <strong>{SITE_CONFIG.name}</strong> réalise un bénéfice sur les achats remplissant les conditions requises. Cela n&apos;entraîne aucun coût supplémentaire pour le visiteur. Amazon et le logo Amazon sont des marques commerciales d&apos;Amazon.com, Inc. ou de ses affiliés.
          </p>
          <p className="mt-2">
            Les recommandations sont basées sur l&apos;analyse des caractéristiques techniques, les fiches constructeurs et les avis d&apos;utilisateurs. Aucun fabricant ne rémunère le site pour figurer dans nos comparatifs.
          </p>
        </section>

        <section className="pt-4 border-t border-[#efe4da]">
          <h2 className="titre text-lg font-bold text-[#3d2f2a] mb-2">4. Propriété intellectuelle</h2>
          <p>
            Les textes, guides, synthèses et analyses publiés sur <strong>{SITE_CONFIG.name}</strong> ({SITE_CONFIG.domain.replace("https://", "")}) sont protégés par le droit d&apos;auteur. Toute reproduction totale ou partielle sans autorisation préalable est interdite.
          </p>
        </section>
      </div>
    </div>
  );
}
