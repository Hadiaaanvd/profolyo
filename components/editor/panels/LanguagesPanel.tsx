"use client";
import { useEditor } from "@/contexts/EditorContext";
import type { Language, LanguageProficiency } from "@/types/portfolio";
import { PanelHeader, EmptyState, inputCls } from "./shared";
import { Trash2 } from "lucide-react";

const PROFICIENCY_OPTIONS: LanguageProficiency[] = ["Native", "Fluent", "Professional", "Conversational", "Beginner"];

export default function LanguagesPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const languages = portfolio.languages ?? [];

  function addLanguage() {
    const newLang: Language = { id: `lang_${Date.now()}`, name: "", proficiency: "Conversational" };
    updatePortfolio({ languages: [...languages, newLang] });
  }
  function patch(id: string, field: keyof Language, value: string) {
    updatePortfolio({ languages: languages.map((l) => l.id === id ? { ...l, [field]: value } : l) });
  }
  function del(id: string) { updatePortfolio({ languages: languages.filter((l) => l.id !== id) }); }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Languages" title="Languages" />
        <button type="button" onClick={addLanguage}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>+ Add language</button>
      </div>
      {languages.length === 0 ? (
        <EmptyState icon="🌐" title="No languages yet" description="Add languages you speak and your proficiency level." action="Add your first language →" onAction={addLanguage} />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[1fr_160px_32px] gap-3 px-3 pb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400">Language</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-400">Proficiency</span>
            <span />
          </div>
          {languages.map((lang) => (
            <div key={lang.id} className="grid grid-cols-[1fr_160px_32px] gap-3 items-center p-3 rounded-xl border border-ink-150 bg-white">
              <input value={lang.name} onChange={(e) => patch(lang.id, "name", e.target.value)} placeholder="Language name" className={inputCls} />
              <select value={lang.proficiency} onChange={(e) => patch(lang.id, "proficiency", e.target.value)} className={inputCls}>
                {PROFICIENCY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <button type="button" onClick={() => del(lang.id)}
                className="w-8 h-8 flex items-center justify-center rounded text-ink-300 hover:text-red-500 hover:bg-red-50 cursor-pointer">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addLanguage} className="mt-2 text-[13px] text-brand-600 hover:text-brand-700 font-medium cursor-pointer text-left">
            + Add another language
          </button>
        </div>
      )}
    </div>
  );
}
