"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import type { Certification } from "@/types/portfolio";
import { PanelHeader, EmptyState, FormHeader, SaveCancelRow, labelCls, inputCls } from "./shared";

export default function CertificationsPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const certs = portfolio.certifications ?? [];
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function save(draft: Certification, id: string | "new") {
    if (id === "new") updatePortfolio({ certifications: [...certs, draft] });
    else updatePortfolio({ certifications: certs.map((c) => (c.id === id ? draft : c)) });
    setEditingId(null);
  }
  function del(id: string) { updatePortfolio({ certifications: certs.filter((c) => c.id !== id) }); setDeleteId(null); }

  if (editingId !== null) {
    const base = editingId === "new" ? undefined : certs.find((c) => c.id === editingId);
    return <CertificationForm initial={base} onSave={(d) => save(d, editingId)} onCancel={() => setEditingId(null)} />;
  }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Certifications" title="Credentials" />
        <button type="button" onClick={() => setEditingId("new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>+ Add certification</button>
      </div>
      {certs.length === 0 ? (
        <EmptyState icon="🎖️" title="No certifications yet" description="Add licenses, certificates, and credentials." action="Add your first certification →" onAction={() => setEditingId("new")} />
      ) : (
        <div className="flex flex-col gap-3">
          {certs.map((c) => (
            <div key={c.id} className="group flex items-start gap-3 p-4 rounded-xl border border-ink-150 bg-white hover:border-ink-300 transition-colors">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setEditingId(c.id)}>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-ink-800 font-display">{c.name}</span>
                  {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[11px] text-brand-600 hover:underline">↗</a>}
                </div>
                <div className="text-[12px] text-ink-500 mt-0.5">{c.issuer}{c.year ? ` · ${c.year}` : ""}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => setEditingId(c.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-100 cursor-pointer"><Pencil size={12} /></button>
                {deleteId === c.id ? (
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => del(c.id)} className="px-2.5 py-1 rounded bg-red-500 text-white text-[11px] font-medium cursor-pointer">Delete</button>
                    <button type="button" onClick={() => setDeleteId(null)} className="px-2 py-1 rounded text-ink-500 text-[11px] cursor-pointer">Cancel</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setDeleteId(c.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 size={12} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CertificationForm({ initial, onSave, onCancel }: { initial?: Certification; onSave: (c: Certification) => void; onCancel: () => void }) {
  const isNew = !initial;
  const [name,   setName]   = useState(initial?.name ?? "");
  const [issuer, setIssuer] = useState(initial?.issuer ?? "");
  const [year,   setYear]   = useState(initial?.year ?? "");
  const [url,    setUrl]    = useState(initial?.url ?? "");

  function handleSave() {
    if (!name || !issuer || !year) return;
    onSave({ id: initial?.id ?? `cert_${Date.now()}`, name: name.trim(), issuer: issuer.trim(), year: year.trim(), url: url.trim() || undefined });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <FormHeader eyebrow={isNew ? "Add certification" : "Edit certification"} title={isNew ? "New certification" : (name || "Untitled")} onBack={onCancel} />
      <div className="flex flex-col gap-5">
        <div><label className={labelCls}>Name *</label><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="AWS Solutions Architect" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Issuer *</label><input value={issuer} onChange={(e) => setIssuer(e.target.value)} className={inputCls} placeholder="Amazon Web Services" /></div>
          <div><label className={labelCls}>Year *</label><input value={year} onChange={(e) => setYear(e.target.value)} className={inputCls} placeholder="2024" /></div>
        </div>
        <div><label className={labelCls}>Certificate URL</label><input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls} placeholder="https://..." /></div>
      </div>
      <SaveCancelRow onSave={handleSave} onCancel={onCancel} saveLabel={isNew ? "Add certification" : "Save changes"} disabled={!name || !issuer || !year} />
    </div>
  );
}
