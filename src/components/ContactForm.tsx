"use client";

import React, { useState } from "react";
import { Mail, Send, Copy, Check, ExternalLink, MessageSquare, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ContactFormProps {
  defaultEmail?: string;
}

export default function ContactForm({
  defaultEmail = SITE_CONFIG.contactEmail,
}: ContactFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState(`Question / Contact - ${SITE_CONFIG.name}`);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(defaultEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const buildBody = () => {
    const parts: string[] = [];
    if (name.trim()) parts.push(`Nom : ${name.trim()}`);
    if (senderEmail.trim()) parts.push(`Email de contact : ${senderEmail.trim()}`);
    parts.push(`Date : ${new Date().toLocaleDateString("fr-FR")}`);
    parts.push("\n--- Message ---");
    parts.push(message.trim() || "(Message vide)");
    parts.push(`\n---\nEnvoyé depuis le formulaire de contact ${SITE_CONFIG.name} (${SITE_CONFIG.domain.replace("https://", "")})`);
    return parts.join("\n");
  };

  const handleSendMailto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Veuillez saisir votre message avant d'envoyer.");
      return;
    }
    const fullBody = buildBody();
    const mailtoUrl = `mailto:${defaultEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(fullBody)}`;

    window.location.href = mailtoUrl;
    setSentSuccess(true);
  };

  const handleSendGmailWeb = () => {
    if (!message.trim()) {
      alert("Veuillez saisir votre message avant d'envoyer.");
      return;
    }
    const fullBody = buildBody();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      defaultEmail
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSentSuccess(true);
  };

  return (
    <div className="mt-4 pt-4 border-t border-[#efe4da]" id="contact">
      {!isOpen ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#fff8f5] p-4 rounded-2xl border border-orange-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e05238] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#241b16] text-sm">Une question ou une remarque ?</p>
              <p className="text-xs text-[#75645b]">
                Écrivez directement à notre équipe : <span className="font-mono text-[#e05238] font-semibold">{defaultEmail}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#e05238] text-white font-bold text-xs hover:bg-[#c9452d] transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contactez-nous</span>
          </button>
        </div>
      ) : (
        <div className="rounded-3xl bg-[#fffaf6] p-6 border-2 border-orange-200/90 shadow-sm space-y-5 animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#e05238] text-white flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="titre font-bold text-[#241b16] text-base">Écrire à l&apos;équipe {SITE_CONFIG.name}</h3>
                <p className="text-xs text-[#75645b]">
                  Votre message sera envoyé à <span className="font-semibold text-[#e05238]">{defaultEmail}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-[#75645b] hover:bg-orange-100 hover:text-[#241b16] transition-colors"
              aria-label="Fermer le formulaire"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {sentSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Votre application de messagerie a été ouverte avec votre texte pré-rempli. Il ne vous reste plus qu&apos;à cliquer sur <strong>Envoyer</strong> !
              </span>
            </div>
          )}

          <form onSubmit={handleSendMailto} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3d2f2a] mb-1">
                  Votre nom ou pseudo <span className="text-gray-400 font-normal">(facultatif)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Marie, Paul..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#eadfd3] text-xs text-[#241b16] focus:outline-none focus:ring-2 focus:ring-[#e05238]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3d2f2a] mb-1">
                  Votre email de réponse <span className="text-gray-400 font-normal">(facultatif)</span>
                </label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="ex : vous@exemple.fr"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#eadfd3] text-xs text-[#241b16] focus:outline-none focus:ring-2 focus:ring-[#e05238]/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3d2f2a] mb-1">
                Sujet de votre demande
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#eadfd3] text-xs text-[#241b16] focus:outline-none focus:ring-2 focus:ring-[#e05238]/40"
              >
                <option value={`Question sur un article / matériel - ${SITE_CONFIG.name}`}>
                  Question sur un article ou matériel
                </option>
                <option value={`Suggestion de produit ou guide - ${SITE_CONFIG.name}`}>
                  Suggestion de produit ou guide
                </option>
                <option value={`Remarque technique ou correction - ${SITE_CONFIG.name}`}>
                  Remarque technique ou correction
                </option>
                <option value={`Proposition de partenariat - ${SITE_CONFIG.name}`}>
                  Proposition de partenariat
                </option>
                <option value="Autre demande - Télétravail Confort">Autre demande</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3d2f2a] mb-1">
                Votre message <span className="text-[#e05238]">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Rédigez votre message ici..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#eadfd3] text-xs text-[#241b16] focus:outline-none focus:ring-2 focus:ring-[#e05238]/40 resize-y"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#eadfd3] text-xs text-[#75645b] hover:text-[#241b16] hover:bg-gray-50 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Adresse copiée !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier l&apos;adresse</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSendGmailWeb}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-orange-200 text-[#e05238] font-semibold text-xs hover:bg-orange-50 transition-colors"
                  title="Ouvrir directement dans Gmail sur le web"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ouvrir dans Gmail</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e05238] text-white font-bold text-xs hover:bg-[#c9452d] transition-colors shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Envoyer par email</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
