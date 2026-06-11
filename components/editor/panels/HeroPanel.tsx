"use client";
import { useRef } from "react";
import { useEditor } from "@/contexts/EditorContext";
import { FormField, inputCls, textareaCls, PanelHeader } from "./shared";
import SocialLinksEditor from "./SocialLinksEditor";

export default function HeroPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const { user } = portfolio;
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const patch = (field: string, value: string) =>
    updatePortfolio({ user: { ...user, [field]: value } });

  function handleAvatarFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updatePortfolio({ user: { ...user, avatar_url: reader.result as string } });
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleResumeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updatePortfolio({ user: { ...user, resume_url: reader.result as string } });
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <PanelHeader eyebrow="Hero" title="Your profile" subtitle="Shown on your portfolio hero and résumé header." />

      {/* Avatar */}
      <section className="mb-8 pb-8 border-b border-ink-150">
        <p className="text-[13px] font-medium text-ink-700 mb-3">Photo</p>
        <div className="flex items-center gap-4">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt="Your photo" className="w-16 h-16 rounded-full object-cover shrink-0 border border-ink-150" />
          ) : (
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg font-display shrink-0"
              style={{ background: "linear-gradient(135deg, #ffc9a8, #e76f51)" }}>
              {(user.name || "U").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
          )}
          <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarFile} />
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => avatarInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg border border-ink-200 text-ink-700 text-[13px] font-medium cursor-pointer hover:bg-ink-50 transition-colors">
              {user.avatar_url ? "Change photo" : "Upload photo"}
            </button>
            {user.avatar_url && (
              <button type="button" onClick={() => updatePortfolio({ user: { ...user, avatar_url: undefined } })}
                className="px-3 py-1.5 rounded-lg border border-ink-200 text-red-500 text-[13px] font-medium cursor-pointer hover:bg-red-50 transition-colors">
                Remove
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Resume */}
      <section className="mb-8 pb-8 border-b border-ink-150">
        <p className="text-[13px] font-medium text-ink-700 mb-1">Résumé</p>
        <p className="text-[12px] text-ink-400 mb-3">Upload a PDF to enable a "Download Résumé" button on your portfolio.</p>
        <div className="flex items-center gap-3">
          <input ref={resumeInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleResumeFile} />
          {user.resume_url ? (
            <>
              <span className="text-[13px] text-ink-600 font-mono bg-ink-50 border border-ink-200 rounded-lg px-3 py-1.5">résumé.pdf</span>
              <button type="button" onClick={() => resumeInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg border border-ink-200 text-ink-700 text-[13px] font-medium cursor-pointer hover:bg-ink-50 transition-colors">Replace</button>
              <button type="button" onClick={() => updatePortfolio({ user: { ...user, resume_url: undefined } })}
                className="px-3 py-1.5 rounded-lg border border-ink-200 text-red-500 text-[13px] font-medium cursor-pointer hover:bg-red-50 transition-colors">Remove</button>
            </>
          ) : (
            <button type="button" onClick={() => resumeInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg border border-ink-200 text-ink-700 text-[13px] font-medium cursor-pointer hover:bg-ink-50 transition-colors">
              Upload PDF
            </button>
          )}
        </div>
        <p className="text-[11px] text-ink-400 mt-2 italic">Profolyo-generated résumés coming soon.</p>
      </section>

      {/* Fields */}
      <div className="flex flex-col gap-5">
        <FormField label="Full name" required>
          <input value={user.name} onChange={(e) => patch("name", e.target.value)} placeholder="Hadia Naveed" className={inputCls} />
        </FormField>
        <FormField label="Handle" hint="Your public URL: profolyo.me/[handle]">
          <input value={user.handle} onChange={(e) => patch("handle", e.target.value)} placeholder="hadia" className={inputCls} />
        </FormField>
        <FormField label="Headline" required hint="One line — shown under your name.">
          <input value={user.headline} onChange={(e) => patch("headline", e.target.value)} placeholder="Frontend lead & design-systems engineer" className={inputCls} />
        </FormField>
        <FormField label="Pronouns">
          <input value={user.pronouns ?? ""} onChange={(e) => patch("pronouns", e.target.value)} placeholder="she/her" className={inputCls} />
        </FormField>
        <FormField label="Location">
          <input value={user.location} onChange={(e) => patch("location", e.target.value)} placeholder="Berlin, Germany" className={inputCls} />
        </FormField>
        <FormField label="Availability status" hint='Shown as a pill on your hero. e.g. "Available · Senior IC · Q3 2026"'>
          <input value={user.availability_text ?? ""} onChange={(e) => patch("availability_text", e.target.value)} placeholder="Available · Senior IC roles · Q3 2026" className={inputCls} />
        </FormField>
        <FormField label="Short bio" hint="~200–250 chars — shown in your hero block.">
          <textarea value={user.bio} onChange={(e) => patch("bio", e.target.value)} placeholder="One sentence about who you are." rows={3} className={textareaCls} />
          <p className="text-right text-[10px] font-mono mt-1" style={{ color: user.bio.length > 250 ? "#ef4444" : "var(--color-ink-400)" }}>
            {user.bio.length}/250
          </p>
        </FormField>
      </div>

      {/* Social links */}
      <div className="mt-8">
        <SocialLinksEditor />
      </div>
    </div>
  );
}
