"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import type { Publication } from "@/types/portfolio";
import { PanelHeader, EmptyState, FormHeader, SaveCancelRow, labelCls, inputCls } from "./shared";
import RichTextEditor from "@/components/editor/RichTextEditor";

const PUBLICATION_TYPES = ["article", "talk", "podcast", "paper", "book", "other"] as const;
const PUB_TYPE_LABEL: Record<string, string> = { article: "Article", talk: "Talk", podcast: "Podcast", paper: "Paper", book: "Book", other: "Other" };

export default function PublicationsPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const pubs = portfolio.publications ?? [];
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function save(draft: Publication, id: string | "new") {
    if (id === "new") updatePortfolio({ publications: [...pubs, draft] });
    else updatePortfolio({ publications: pubs.map((p) => (p.id === id ? draft : p)) });
    setEditingId(null);
  }
  function del(id: string) {
    updatePortfolio({ publications: pubs.filter((p) => p.id !== id) });
    setDeleteId(null);
  }

  if (editingId !== null) {
    const base = editingId === "new" ? undefined : pubs.find((p) => p.id === editingId);
    return <PublicationForm initial={base} onSave={(d) => save(d, editingId)} onCancel={() => setEditingId(null)} />;
  }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Publications" title="Writing & talks" />
        <button type="button" onClick={() => setEditingId("new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>+ Add publication</button>
      </div>
      {pubs.length === 0 ? (
        <EmptyState icon="📝" title="No publications yet" description="Add articles, talks, podcasts, or papers." action="Add your first publication →" onAction={() => setEditingId("new")} />
      ) : (
        <div className="flex flex-col gap-3">
          {pubs.map((p) => (
            <div key={p.id} className="group flex items-start gap-3 p-4 rounded-xl border border-ink-150 bg-white hover:border-ink-300 transition-colors">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setEditingId(p.id)}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[14px] font-semibold text-ink-800 font-display">{p.title}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-ink-100 text-ink-500">{PUB_TYPE_LABEL[p.type]}</span>
                </div>
                <div className="text-[12px] text-ink-500 mt-0.5">{p.venue}{p.year ? ` · ${p.year}` : ""}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => setEditingId(p.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-100 cursor-pointer"><Pencil size={12} /></button>
                {deleteId === p.id ? (
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => del(p.id)} className="px-2.5 py-1 rounded bg-red-500 text-white text-[11px] font-medium cursor-pointer hover:bg-red-600">Delete</button>
                    <button type="button" onClick={() => setDeleteId(null)} className="px-2 py-1 rounded text-ink-500 text-[11px] cursor-pointer hover:bg-ink-100">Cancel</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setDeleteId(p.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 size={12} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PublicationForm({ initial, onSave, onCancel }: { initial?: Publication; onSave: (p: Publication) => void; onCancel: () => void }) {
  const isNew = !initial;
  const [title,   setTitle]   = useState(initial?.title ?? "");
  const [venue,   setVenue]   = useState(initial?.venue ?? "");
  const [year,    setYear]    = useState(initial?.year ?? "");
  const [type,    setType]    = useState<Publication["type"]>(initial?.type ?? "article");
  const [url,     setUrl]     = useState(initial?.url ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");

  function handleSave() {
    if (!title || !venue || !year) return;
    onSave({ id: initial?.id ?? `pub_${Date.now()}`, title: title.trim(), venue: venue.trim(), year: year.trim(), type, url: url.trim() || undefined, summary: summary.trim() || undefined });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <FormHeader eyebrow={isNew ? "Add publication" : "Edit publication"} title={isNew ? "New publication" : (title || "Untitled")} onBack={onCancel} />
      <div className="flex flex-col gap-5">
        <div><label className={labelCls}>Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="The Future of Design Systems" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Venue *</label><input value={venue} onChange={(e) => setVenue(e.target.value)} className={inputCls} placeholder="Smashing Magazine" /></div>
          <div><label className={labelCls}>Year *</label><input value={year} onChange={(e) => setYear(e.target.value)} className={inputCls} placeholder="2024" /></div>
        </div>
        <div><label className={labelCls}>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as Publication["type"])} className={inputCls}>
            {PUBLICATION_TYPES.map((t) => <option key={t} value={t}>{PUB_TYPE_LABEL[t]}</option>)}
          </select>
        </div>
        <div><label className={labelCls}>URL</label><input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls} placeholder="https://..." /></div>
        <div><label className={labelCls}>Summary</label><RichTextEditor value={summary} onChange={setSummary} placeholder="A short description of the piece." rows={3} /></div>
      </div>
      <SaveCancelRow onSave={handleSave} onCancel={onCancel} saveLabel={isNew ? "Add publication" : "Save changes"} disabled={!title || !venue || !year} />
    </div>
  );
}
