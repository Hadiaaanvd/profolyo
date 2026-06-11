"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import type { Testimonial } from "@/types/portfolio";
import { PanelHeader, EmptyState, FormHeader, SaveCancelRow, labelCls, inputCls } from "./shared";
import RichTextEditor from "@/components/editor/RichTextEditor";

export default function TestimonialsPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const testimonials = portfolio.testimonials ?? [];
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function save(draft: Testimonial, id: string | "new") {
    if (id === "new") updatePortfolio({ testimonials: [...testimonials, draft] });
    else updatePortfolio({ testimonials: testimonials.map((t) => (t.id === id ? draft : t)) });
    setEditingId(null);
  }
  function del(id: string) { updatePortfolio({ testimonials: testimonials.filter((t) => t.id !== id) }); setDeleteId(null); }

  if (editingId !== null) {
    const base = editingId === "new" ? undefined : testimonials.find((t) => t.id === editingId);
    return <TestimonialForm initial={base} onSave={(d) => save(d, editingId)} onCancel={() => setEditingId(null)} />;
  }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Testimonials" title="What people say" />
        <button type="button" onClick={() => setEditingId("new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>+ Add testimonial</button>
      </div>
      {testimonials.length === 0 ? (
        <EmptyState icon="💬" title="No testimonials yet" description="Add quotes from colleagues, managers, or clients." action="Add your first testimonial →" onAction={() => setEditingId("new")} />
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map((t) => (
            <div key={t.id} className="group flex items-start gap-3 p-4 rounded-xl border border-ink-150 bg-white hover:border-ink-300 transition-colors">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setEditingId(t.id)}>
                <p className="text-[13px] text-ink-700 italic leading-relaxed line-clamp-2">"{t.quote}"</p>
                <div className="text-[12px] font-medium text-ink-500 mt-1.5">
                  — {t.author}{t.role ? `, ${t.role}` : ""}{t.company ? ` · ${t.company}` : ""}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => setEditingId(t.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-100 cursor-pointer"><Pencil size={12} /></button>
                {deleteId === t.id ? (
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => del(t.id)} className="px-2.5 py-1 rounded bg-red-500 text-white text-[11px] font-medium cursor-pointer">Delete</button>
                    <button type="button" onClick={() => setDeleteId(null)} className="px-2 py-1 rounded text-ink-500 text-[11px] cursor-pointer">Cancel</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setDeleteId(t.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 size={12} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TestimonialForm({ initial, onSave, onCancel }: { initial?: Testimonial; onSave: (t: Testimonial) => void; onCancel: () => void }) {
  const isNew = !initial;
  const [quote,   setQuote]   = useState(initial?.quote ?? "");
  const [author,  setAuthor]  = useState(initial?.author ?? "");
  const [role,    setRole]    = useState(initial?.role ?? "");
  const [company, setCompany] = useState(initial?.company ?? "");

  function handleSave() {
    if (!quote || !author) return;
    onSave({ id: initial?.id ?? `test_${Date.now()}`, quote: quote.trim(), author: author.trim(), role: role.trim() || undefined, company: company.trim() || undefined });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <FormHeader eyebrow={isNew ? "Add testimonial" : "Edit testimonial"} title={isNew ? "New testimonial" : (author || "Untitled")} onBack={onCancel} />
      <div className="flex flex-col gap-5">
        <div><label className={labelCls}>Quote *</label><RichTextEditor value={quote} onChange={setQuote} placeholder="&ldquo;Hadia is one of the best engineers…&rdquo;" rows={4} /></div>
        <div><label className={labelCls}>Author *</label><input value={author} onChange={(e) => setAuthor(e.target.value)} className={inputCls} placeholder="Alex Kim" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Role</label><input value={role} onChange={(e) => setRole(e.target.value)} className={inputCls} placeholder="Engineering Manager" /></div>
          <div><label className={labelCls}>Company</label><input value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} placeholder="Stripe" /></div>
        </div>
      </div>
      <SaveCancelRow onSave={handleSave} onCancel={onCancel} saveLabel={isNew ? "Add testimonial" : "Save changes"} disabled={!quote || !author} />
    </div>
  );
}
