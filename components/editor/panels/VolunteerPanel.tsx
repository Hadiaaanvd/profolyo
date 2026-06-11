"use client";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import type { Volunteer } from "@/types/portfolio";
import { PanelHeader, EmptyState, FormHeader, SaveCancelRow, labelCls, inputCls } from "./shared";
import RichTextEditor from "@/components/editor/RichTextEditor";

export default function VolunteerPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const volunteer = portfolio.volunteer ?? [];
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function save(draft: Volunteer, id: string | "new") {
    if (id === "new") updatePortfolio({ volunteer: [...volunteer, draft] });
    else updatePortfolio({ volunteer: volunteer.map((v) => (v.id === id ? draft : v)) });
    setEditingId(null);
  }
  function del(id: string) { updatePortfolio({ volunteer: volunteer.filter((v) => v.id !== id) }); setDeleteId(null); }

  if (editingId !== null) {
    const base = editingId === "new" ? undefined : volunteer.find((v) => v.id === editingId);
    return <VolunteerForm initial={base} onSave={(d) => save(d, editingId)} onCancel={() => setEditingId(null)} />;
  }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Volunteer" title="Volunteer work" />
        <button type="button" onClick={() => setEditingId("new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>+ Add role</button>
      </div>
      {volunteer.length === 0 ? (
        <EmptyState icon="🤝" title="No volunteer work yet" description="Add community contributions, mentoring, or open source work." action="Add your first role →" onAction={() => setEditingId("new")} />
      ) : (
        <div className="flex flex-col gap-3">
          {volunteer.map((v) => (
            <div key={v.id} className="group flex items-start gap-3 p-4 rounded-xl border border-ink-150 bg-white hover:border-ink-300 transition-colors">
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setEditingId(v.id)}>
                <div className="text-[14px] font-semibold text-ink-800 font-display">{v.role} · {v.organization}</div>
                <div className="text-[12px] text-ink-500 mt-0.5">{v.period}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => setEditingId(v.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-100 cursor-pointer"><Pencil size={12} /></button>
                {deleteId === v.id ? (
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => del(v.id)} className="px-2.5 py-1 rounded bg-red-500 text-white text-[11px] font-medium cursor-pointer">Delete</button>
                    <button type="button" onClick={() => setDeleteId(null)} className="px-2 py-1 rounded text-ink-500 text-[11px] cursor-pointer">Cancel</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setDeleteId(v.id)} className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"><Trash2 size={12} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VolunteerForm({ initial, onSave, onCancel }: { initial?: Volunteer; onSave: (v: Volunteer) => void; onCancel: () => void }) {
  const isNew = !initial;
  const [org,    setOrg]    = useState(initial?.organization ?? "");
  const [role,   setRole]   = useState(initial?.role ?? "");
  const [period, setPeriod] = useState(initial?.period ?? "");
  const [desc,   setDesc]   = useState(initial?.description ?? "");

  function handleSave() {
    if (!role || !org) return;
    onSave({ id: initial?.id ?? `vol_${Date.now()}`, organization: org.trim(), role: role.trim(), period: period.trim(), description: desc.trim() || undefined });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <FormHeader eyebrow={isNew ? "Add volunteer role" : "Edit volunteer role"} title={isNew ? "New role" : (role || "Untitled")} onBack={onCancel} />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Role *</label><input value={role} onChange={(e) => setRole(e.target.value)} className={inputCls} placeholder="Workshop Mentor" /></div>
          <div><label className={labelCls}>Organization *</label><input value={org} onChange={(e) => setOrg(e.target.value)} className={inputCls} placeholder="Django Girls Berlin" /></div>
        </div>
        <div><label className={labelCls}>Period</label><input value={period} onChange={(e) => setPeriod(e.target.value)} className={inputCls} placeholder="2019 — present" /></div>
        <div><label className={labelCls}>Description</label><RichTextEditor value={desc} onChange={setDesc} placeholder="What you did and the impact it had." rows={3} /></div>
      </div>
      <SaveCancelRow onSave={handleSave} onCancel={onCancel} saveLabel={isNew ? "Add role" : "Save changes"} disabled={!role || !org} />
    </div>
  );
}
