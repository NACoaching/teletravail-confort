"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Send,
  CheckCircle2,
  Image as ImageIcon,
  X,
  Mail,
  ExternalLink,
  Sparkles,
  Heart,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface CreationSubmissionFormProps {
  recipientEmail?: string;
}

export default function CreationSubmissionForm({
  recipientEmail = SITE_CONFIG.contactEmail,
}: CreationSubmissionFormProps) {
  const [creatorName, setCreatorName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("scrapbooking");
  const [toolsUsed, setToolsUsed] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoriesOptions = [
    { value: "scrapbooking", label: "Scrapbooking & Découpe" },
    { value: "aquarelle-peinture", label: "Aquarelle" },
    { value: "dessin-feutres", label: "Dessin & Feutres" },
    { value: "linogravure", label: "Linogravure & Estampe" },
    { value: "modelage-argile", label: "Modelage & Argile" },
    { value: "carterie-calligraphie", label: "Carterie & Calligraphie" },
    { value: "autre", label: "Autre création créative" },
  ];

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner un fichier image valide (JPG, PNG, WebP).");
      return;
    }

    // Limite à 10 Mo pour éviter les soucis de messagerie
    if (file.size > 10 * 1024 * 1024) {
      alert("L'image est un peu trop volumineuse (limite max : 10 Mo). Vous pouvez la compresser ou l'envoyer directement par email.");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const buildMailBody = () => {
    const lines = [
      `Bonjour à l'équipe ! Voici une nouvelle création pour la galerie "Vos Créations" :`,
      ``,
      `--- INFORMATIONS CRÉATION ---`,
      `• Nom / Pseudo : ${creatorName.trim() || "Anonyme"}`,
      `• Email de l'auteur(e) : ${email.trim() || "Non renseigné"}`,
      `• Titre de la création : ${title.trim() || "Sans titre"}`,
      `• Rayon créatif : ${categoriesOptions.find((c) => c.value === category)?.label || category}`,
      `• Matériel utilisé : ${toolsUsed.trim() || "Non précisé"}`,
      ``,
      `--- MESSAGE / ANECDOTE ---`,
      `${message.trim() || "Aucun message particulier"}`,
      ``,
      `--- PIÈCE JOINTE ---`,
      `Pensez à bien joindre la photo de votre création à cet email !`,
      ``,
      `Envoyé depuis le site ${SITE_CONFIG.name} (${SITE_CONFIG.domain.replace("https://", "")})`,
    ];
    return lines.join("\n");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!creatorName.trim()) {
      alert("Merci d'indiquer votre prénom ou pseudo pour que nous puissions signer votre création !");
      return;
    }

    if (!selectedFile) {
      alert("N'oubliez pas d'ajouter la photo de votre création avant d'envoyer !");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Préparation du FormData pour FormSubmit
      const formData = new FormData();
      formData.append("name", creatorName);
      formData.append("email", email || `visiteur@${SITE_CONFIG.domain.replace(/^https?:\/\//, "")}`);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("toolsUsed", toolsUsed);
      formData.append("message", message);
      formData.append("attachment", selectedFile);
      formData.append("_subject", `🎨 [Vos Créations] Nouvelle création de ${creatorName} : "${title || "Sans titre"}"`);
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      // Envoi sécurisé sans backend/Supabase via l'endpoint AJAX FormSubmit
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        throw new Error("L'envoi automatique a rencontré une indisponibilité momentanée.");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMessage(
        "L'envoi automatique a échoué. Pas d'inquiétude : vous pouvez ouvrir directement votre messagerie en un clic ci-dessous avec tout le texte pré-rempli !"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenMailto = () => {
    const subject = `[Vos Créations] Partage de ${creatorName.trim() || "création"} - ${title.trim() || SITE_CONFIG.name}`;
    const body = buildMailBody();
    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleOpenGmail = () => {
    const subject = `[Vos Créations] Partage de ${creatorName.trim() || "création"} - ${title.trim() || SITE_CONFIG.name}`;
    const body = buildMailBody();
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipientEmail
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const resetForm = () => {
    setCreatorName("");
    setEmail("");
    setTitle("");
    setToolsUsed("");
    setMessage("");
    handleRemovePhoto();
    setSubmitStatus("idle");
  };

  return (
    <div className="rounded-3xl bg-white border-2 border-orange-200/90 p-6 sm:p-10 shadow-lg relative overflow-hidden" id="partager">
      {/* Decorative top accent badge */}
      <div className="flex items-center gap-2 text-xs font-bold text-[#e05238] uppercase tracking-wider mb-2">
        <Sparkles className="w-4 h-4" />
        <span>Espace de partage atelier</span>
      </div>

      <h2 className="titre text-2xl sm:text-3xl font-bold text-[#241b16] mb-3">
        Envoyez votre création à l&apos;atelier
      </h2>
      <p className="text-sm text-[#75645b] max-w-2xl leading-relaxed mb-8">
        Partagez la fierté de vos réalisations ! Que vous ayez confectionné un album scrapbooking, testé un nouveau feutre ou gravé votre premier tampon, déposez votre photo et quelques mots. Notre équipe la recevra directement et l&apos;ajoutera à la galerie.
      </p>

      {submitStatus === "success" ? (
        <div className="p-8 sm:p-10 rounded-2xl bg-[#f0f9f3] border-2 border-emerald-300 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="titre text-2xl font-bold text-emerald-900">
            Merci beaucoup, votre création est bien envoyée ! 🎉
          </h3>
          <p className="text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
            Notre équipe a bien reçu votre photo et votre message sur sa boîte mail. Dès validation, votre création sera mise à l&apos;honneur dans la galerie avec votre prénom.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
            >
              Envoyer une autre création
            </button>
            <a
              href="#galerie"
              className="px-6 py-2.5 rounded-full bg-white text-emerald-800 border border-emerald-300 font-bold text-xs hover:bg-emerald-50 transition-colors"
            >
              Retourner à la galerie
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {submitStatus === "error" && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Option d&apos;envoi direct par email :</span>
              </div>
              <p>{errorMessage}</p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleOpenGmail}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Ouvrir dans Gmail</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenMailto}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e05238] text-white font-bold text-xs hover:bg-[#c9452d] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Ouvrir mon application de messagerie</span>
                </button>
              </div>
            </div>
          )}

          {/* Section 1 : Coordonnées & Titre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3d2f2a] mb-1.5">
                Votre prénom ou pseudo d&apos;artiste <span className="text-[#e05238]">*</span>
              </label>
              <input
                type="text"
                required
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                placeholder="Ex : Camille, L'Atelier de Sarah..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ed] border border-[#eadfd3] text-sm text-[#241b16] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e05238]/40 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3d2f2a] mb-1.5">
                Votre email <span className="text-gray-400 font-normal">(pour vous prévenir quand c&apos;est en ligne)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex : vous@exemple.fr"
                className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ed] border border-[#eadfd3] text-sm text-[#241b16] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e05238]/40 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Section 2 : Rayon & Titre */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#3d2f2a] mb-1.5">
                Rayon créatif / Technique <span className="text-[#e05238]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ed] border border-[#eadfd3] text-sm text-[#241b16] focus:outline-none focus:ring-2 focus:ring-[#e05238]/40 focus:bg-white transition-all"
              >
                {categoriesOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3d2f2a] mb-1.5">
                Titre de votre projet <span className="text-[#e05238]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex : Mon premier mini-album vintage de vacances"
                className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ed] border border-[#eadfd3] text-sm text-[#241b16] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e05238]/40 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Section 3 : Matériel utilisé */}
          <div>
            <label className="block text-xs font-bold text-[#3d2f2a] mb-1.5">
              Matériel & fournitures utilisés <span className="text-gray-400 font-normal">(facultatif, inspire les autres lecteurs !)</span>
            </label>
            <input
              type="text"
              value={toolsUsed}
              onChange={(e) => setToolsUsed(e.target.value)}
              placeholder="Ex : Papier kraft 250g, colle roller Secopad, stickers botaniques..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#faf5ed] border border-[#eadfd3] text-sm text-[#241b16] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e05238]/40 focus:bg-white transition-all"
            />
          </div>

          {/* Section 4 : Message / Anecdote */}
          <div>
            <label className="block text-xs font-bold text-[#3d2f2a] mb-1.5">
              Votre petit mot, anecdote ou conseil d&apos;atelier <span className="text-[#e05238]">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Racontez-nous ce qui vous a inspiré, comment s'est passée la réalisation, ce que vous en avez pensé..."
              className="w-full px-4 py-3 rounded-xl bg-[#faf5ed] border border-[#eadfd3] text-sm text-[#241b16] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e05238]/40 focus:bg-white transition-all resize-y"
            />
          </div>

          {/* Section 5 : Dépôt de la photo */}
          <div>
            <label className="block text-xs font-bold text-[#3d2f2a] mb-1.5">
              Photo de votre création <span className="text-[#e05238]">*</span>
            </label>

            {!previewUrl ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? "border-[#e05238] bg-orange-50/80 scale-[1.01]"
                    : "border-orange-200/90 bg-[#fffaf6] hover:bg-[#fff5ee] hover:border-[#e05238]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileChange(e.target.files[0]);
                    }
                  }}
                />
                <div className="w-14 h-14 rounded-full bg-orange-100 text-[#e05238] flex items-center justify-center mx-auto mb-3 shadow-2xs">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="font-bold text-sm text-[#241b16] mb-1">
                  Glissez-déposez la photo de votre création ici
                </p>
                <p className="text-xs text-[#75645b]">
                  ou <span className="text-[#e05238] underline font-semibold">cliquez pour parcourir vos fichiers</span>
                </p>
                <p className="text-[11px] text-gray-400 mt-2">
                  Formats acceptés : JPG, PNG, WebP (max 10 Mo)
                </p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border-2 border-orange-200 bg-[#faf5ed] p-3 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-36 h-36 rounded-xl overflow-hidden bg-white shrink-0 shadow-xs border border-[#eadfd3]">
                  <Image
                    src={previewUrl}
                    alt="Aperçu de la création"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-700 text-xs font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Photo sélectionnée avec succès</span>
                  </div>
                  <p className="text-xs font-medium text-[#241b16] truncate max-w-xs">
                    {selectedFile?.name}
                  </p>
                  <p className="text-[11px] text-[#75645b]">
                    {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} Mo` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Changer la photo</span>
                </button>
              </div>
            )}
          </div>

          {/* Note de réassurance */}
          <div className="p-3.5 rounded-xl bg-[#fff8f5] border border-orange-200 text-xs text-[#75645b] flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-[#e05238] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#241b16]">Comment ça se passe ensuite ?</p>
              <p className="text-[11px] mt-0.5">
                Votre création arrive directement dans la boîte email de l&apos;Atelier (<span className="font-mono text-[#e05238] font-bold">{recipientEmail}</span>). Une fois vérifiée, elle est publiée dans la galerie pour inspirer les amoureux d&apos;art créatif !
              </p>
            </div>
          </div>

          {/* Actions & Bouton d'envoi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#eadfd3]">
            <div className="flex items-center gap-2 text-xs text-[#75645b]">
              <HelpCircle className="w-4 h-4 text-[#e05238]" />
              <span>Besoin d&apos;aide ? Écrivez à {recipientEmail}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenGmail}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#eadfd3] text-xs font-semibold text-[#5a493e] hover:bg-orange-50 hover:text-[#e05238] hover:border-orange-200 transition-colors cursor-pointer"
                title="Préférer envoyer directement via votre boîte Gmail"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Option Gmail</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#e05238] text-white font-bold text-sm hover:bg-[#c9452d] transition-all shadow-md hover:shadow-lg cursor-pointer ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer ma création</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
