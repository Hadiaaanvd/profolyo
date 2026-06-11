"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import type { SocialLink } from "@/types/portfolio";
import { inputCls } from "./shared";

const QUICK_ADD_LINKS: { label: string; type: string; placeholder: string }[] = [
  { label: "GitHub",   type: "github",   placeholder: "https://github.com/username" },
  { label: "LinkedIn", type: "linkedin", placeholder: "https://linkedin.com/in/username" },
  { label: "Twitter",  type: "twitter",  placeholder: "https://twitter.com/username" },
  { label: "Read.cv",  type: "readcv",   placeholder: "https://read.cv/username" },
];

export default function SocialLinksEditor() {
  const { portfolio, updatePortfolio } = useEditor();
  const social = portfolio.user.social;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftLabel, setDraftLabel] = useState("");
  const [draftUrl, setDraftUrl] = useState("");

  function startEdit(link: SocialLink) {
    setEditingId(link.id);
    setDraftLabel(link.label);
    setDraftUrl(link.url);
  }

  function commitEdit(id: string) {
    updatePortfolio({
      user: {
        ...portfolio.user,
        social: social.map((s) =>
          s.id === id ? { ...s, label: draftLabel.trim() || s.label, url: draftUrl.trim() } : s
        ),
      },
    });
    setEditingId(null);
  }

  function deleteLink(id: string) {
    updatePortfolio({ user: { ...portfolio.user, social: social.filter((s) => s.id !== id) } });
    if (editingId === id) setEditingId(null);
  }

  function addQuick(preset: typeof QUICK_ADD_LINKS[number]) {
    if (social.some((s) => s.type === preset.type)) return;
    const newLink: SocialLink = { id: `sl_${Date.now()}`, label: preset.label, type: preset.type, url: "" };
    updatePortfolio({ user: { ...portfolio.user, social: [...social, newLink] } });
    setEditingId(newLink.id);
    setDraftLabel(newLink.label);
    setDraftUrl("");
  }

  function addCustom() {
    const newLink: SocialLink = { id: `sl_${Date.now()}`, label: "", url: "" };
    updatePortfolio({ user: { ...portfolio.user, social: [...social, newLink] } });
    setEditingId(newLink.id);
    setDraftLabel("");
    setDraftUrl("");
  }

  const addedTypes = new Set(social.map((s) => s.type).filter(Boolean));

  return (
    <div className="pt-4 border-t border-ink-150">
      <p className="font-mono text-[11px] text-ink-400 uppercase tracking-[0.1em] mb-3">Social &amp; links</p>
      {social.length > 0 && (
        <div className="flex flex-col gap-2 mb-3">
          {social.map((link) =>
            editingId === link.id ? (
              <div key={link.id} className="p-3 rounded-xl border border-brand-300 bg-brand-50 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-1">Label</label>
                    <input value={draftLabel} onChange={(e) => setDraftLabel(e.target.value)} placeholder="Platform name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-ink-400 mb-1">URL</label>
                    <input type="url" value={draftUrl} onChange={(e) => setDraftUrl(e.target.value)} placeholder="https://..." className={inputCls} />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setEditingId(null)}
                    className="px-3 py-1 rounded-lg border border-ink-200 text-ink-600 text-[11px] font-medium hover:bg-ink-100 transition-colors cursor-pointer">Cancel</button>
                  <button type="button" onClick={() => commitEdit(link.id)}
                    className="px-3 py-1 rounded-lg bg-brand-500 text-white text-[11px] font-medium hover:bg-brand-600 transition-colors cursor-pointer">Save</button>
                </div>
              </div>
            ) : (
              <div key={link.id} className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-ink-150 bg-white hover:border-ink-300 transition-colors">
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => startEdit(link)}>
                  <span className="text-[13px] font-medium text-ink-800">{link.label || <span className="text-ink-300 italic">Unnamed link</span>}</span>
                  {link.url && <span className="text-[11px] text-ink-400 ml-2 truncate">{link.url}</span>}
                </div>
                <button type="button" onClick={() => startEdit(link)}
                  className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-all cursor-pointer">
                  <Pencil size={11} />
                </button>
                <button type="button" onClick={() => deleteLink(link.id)}
                  className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded text-ink-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer">
                  <Trash2 size={11} />
                </button>
              </div>
            )
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-2">
        {QUICK_ADD_LINKS.filter((p) => !addedTypes.has(p.type)).map((preset) => (
          <button key={preset.type} type="button" onClick={() => addQuick(preset)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-ink-200 text-ink-600 text-[11px] font-medium hover:bg-ink-100 hover:border-ink-300 transition-colors cursor-pointer">
            ＋ {preset.label}
          </button>
        ))}
        <button type="button" onClick={addCustom}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-ink-300 text-ink-400 text-[11px] font-medium hover:bg-ink-50 hover:text-ink-700 transition-colors cursor-pointer">
          ＋ Custom link
        </button>
      </div>
    </div>
  );
}
