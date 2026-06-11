"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import type { Award } from "@/types/portfolio";
import { PanelHeader, EmptyState, FormHeader, SaveCancelRow, labelCls, inputCls } from "./shared";
import RichTextEditor from "@/components/editor/RichTextEditor";

export default function AwardsPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const awards = portfolio.awards ?? [];
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function save(draft: Award, id: string | "new") {
    if (id === "new") updatePortfolio({ awards: [...awards, draft] });
    else updatePortfolio({ awards: awards.map((a) => (a.id === id ? draft : a)) });
    setEditingId(null);
  }
  function del(id: string) { updatePortfolio({ awards: awards.filter((a) => a.id !== id) }); setDeleteId(null); }

  if (editingId !== null) {
    const base = editingId === "new" ? undefined : awards.find((a) => a.id === editingId);
    return <AwardForm initial={base} onSave={(d) => save(d, editingId)} onCancel={() => setEditingId(null)} />;
  }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Awards" title="Recognition" />
        <button type="button" onClick={() => setEditingId("new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>+ Add award</button>
      </div>
      {awards.length === 0 ? (
        <EmptyState icon="🏆" title="No awards yet" description="Add honours, prizes, or recognition you've received." action="Add your first award →" onAction={() => setEditingId("new")} />
      ) : (
        <div className="flex flex-col gap-3">
          {awards.map((a) => (
            <div key={a.id} className="group flex items-start gap-3 p-4 rounded-xl border border-ink-150 bg-white hover:border-ink-300 transition-colors">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setEditingId(a.id)}>
                <div className="text-[14px] font-semibold text-ink-800 font-display">{a.title}</div>
                <div className="text-[12px] text-ink-500 mt-0.5">{a.issuer}{a.year ? ` · ${a.year}` : ""}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => setEditingId(a.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-100 cursor-pointer"><Pencil size={12} /></button>
                {deleteId === a.id ? (
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => del(a.id)} className="px-2.5 py-1 rounded bg-red-500 text-white text-[11px] font-medium cursor-pointer">Delete</button>
                    <button type="button" onClick={() => setDeleteId(null)} className="px-2 py-1 rounded text-ink-500 text-[11px] cursor-pointer">Cancel</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setDeleteId(a.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 size={12} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AwardForm({ initial, onSave, onCancel }: { initial?: Award; onSave: (a: Award) => void; onCancel: () => void }) {
  const isNew = !initial;
  const [title,   setTitle]   = useState(initial?.title ?? "");
  const [issuer,  setIssuer]  = useState(initial?.issuer ?? "");
  const [year,    setYear]    = useState(initial?.year ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");

  function handleSave() {
    if (!title || !issuer || !year) return;
    onSave({ id: initial?.id ?? `award_${Date.now()}`, title: title.trim(), issuer: issuer.trim(), year: year.trim(), summary: summary.trim() || undefined });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <FormHeader eyebrow={isNew ? "Add award" : "Edit award"} title={isNew ? "New award" : (title || "Untitled")} onBack={onCancel} />
      <div className="flex flex-col gap-5">
        <div><label className={labelCls}>Award title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="Designer of the Year" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Issuer *</label><input value={issuer} onChange={(e) => setIssuer(e.target.value)} className={inputCls} placeholder="Awwwards" /></div>
          <div><label className={labelCls}>Year *</label><input value={year} onChange={(e) => setYear(e.target.value)} className={inputCls} placeholder="2024" /></div>
        </div>
        <div><label className={labelCls}>Summary</label><RichTextEditor value={summary} onChange={setSummary} placeholder="Brief description of the award." rows={3} /></div>
      </div>
      <SaveCancelRow onSave={handleSave} onCancel={onCancel} saveLabel={isNew ? "Add award" : "Save changes"} disabled={!title || !issuer || !year} />
    </div>
  );
}
