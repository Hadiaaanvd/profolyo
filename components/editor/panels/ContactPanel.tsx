"use client";
import { useEditor } from "@/contexts/EditorContext";
import { FormField, inputCls, textareaCls, PanelHeader } from "./shared";
import SocialLinksEditor from "./SocialLinksEditor";

export default function ContactPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const { user } = portfolio;
  const patch = (field: string, value: string) =>
    updatePortfolio({ user: { ...user, [field]: value } });

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <PanelHeader eyebrow="Contact" title="Contact section" subtitle="What visitors see at the bottom of your portfolio." />
      <div className="flex flex-col gap-5">
        <FormField label="Contact note" hint='The call-to-action line. e.g. "Open to senior IC roles and design-systems projects."'>
          <textarea rows={2} value={user.contact_note ?? ""} onChange={(e) => patch("contact_note", e.target.value)}
            placeholder="Open to senior IC roles, design-systems projects…" className={textareaCls} />
        </FormField>
        <FormField label="Email" required>
          <input type="email" value={user.email} onChange={(e) => patch("email", e.target.value)} placeholder="you@example.com" className={inputCls} />
        </FormField>
        <FormField label="Phone" hint="Optional. Shown in the contact section if set.">
          <input type="tel" value={user.phone ?? ""} onChange={(e) => patch("phone", e.target.value)} placeholder="+1 555 000 0000" className={inputCls} />
        </FormField>
        <FormField label="Website" hint="Your personal site, blog, or portfolio link.">
          <input type="url" value={user.website ?? ""} onChange={(e) => patch("website", e.target.value)} placeholder="https://yoursite.com" className={inputCls} />
        </FormField>
      </div>
      <div className="mt-8 pt-8 border-t border-ink-150">
        <SocialLinksEditor />
      </div>
    </div>
  );
}
