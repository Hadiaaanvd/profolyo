"use client";
import { useState } from "react";
import { useEditor } from "@/contexts/EditorContext";
import type { Experience } from "@/types/portfolio";
import { PanelHeader, EmptyState, FormHeader, SaveCancelRow, labelCls, inputCls } from "./shared";
import RichTextEditor from "@/components/editor/RichTextEditor";
import SortableEntryRow from "./SortableEntryRow";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

export default function ExperiencePanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const { experience } = portfolio;
  const [editingIndex, setEditingIndex] = useState<number | "new" | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const ids = experience.map((e) => e.id);

  function saveExp(draft: Omit<Experience, "id">, index: number | "new") {
    if (index === "new") updatePortfolio({ experience: [...experience, { ...draft, id: crypto.randomUUID() }] });
    else updatePortfolio({ experience: experience.map((e, i) => (i === index ? { ...draft, id: e.id } : e)) });
    setEditingIndex(null);
  }

  function deleteExp(index: number) {
    updatePortfolio({ experience: experience.filter((_, i) => i !== index) });
    setDeleteIndex(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = experience.findIndex((e) => e.id === active.id);
    const newIdx = experience.findIndex((e) => e.id === over.id);
    if (oldIdx !== -1 && newIdx !== -1) updatePortfolio({ experience: arrayMove(experience, oldIdx, newIdx) });
  }

  if (editingIndex !== null) {
    const base = editingIndex === "new" ? undefined : experience[editingIndex];
    return <ExperienceForm initial={base} onSave={(d) => saveExp(d, editingIndex)} onCancel={() => setEditingIndex(null)} />;
  }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Experience" title="Work history" />
        <button type="button" onClick={() => setEditingIndex("new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>
          + Add role
        </button>
      </div>
      {experience.length === 0 ? (
        <EmptyState icon="💼" title="No experience yet" description="Add your first role to get started." action="Add your first role →" onAction={() => setEditingIndex("new")} />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-3">
              {experience.map((exp, i) => (
                <SortableEntryRow key={exp.id} id={exp.id}
                  title={`${exp.title} · ${exp.company}`}
                  subtitle={`${exp.period}${exp.location ? ` · ${exp.location}` : ""}`}
                  onEdit={() => setEditingIndex(i)}
                  onDelete={() => setDeleteIndex(i)}
                  deleteConfirm={deleteIndex === i}
                  onDeleteConfirm={() => deleteExp(i)}
                  onDeleteCancel={() => setDeleteIndex(null)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

function ExperienceForm({ initial, onSave, onCancel }: { initial?: Experience; onSave: (e: Omit<Experience, "id">) => void; onCancel: () => void }) {
  const isNew = !initial;
  const [title,       setTitle]       = useState(initial?.title ?? "");
  const [company,     setCompany]     = useState(initial?.company ?? "");
  const [period,      setPeriod]      = useState(initial?.period ?? "");
  const [location,    setLocation]    = useState(initial?.location ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");

  function handleSave() {
    if (!title.trim() || !company.trim()) return;
    onSave({ title: title.trim(), company: company.trim(), period: period.trim(), location: location.trim() || undefined, description: description.trim() || undefined });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <FormHeader eyebrow={isNew ? "Add role" : "Edit role"} title={isNew ? "New role" : (title || "Untitled")} onBack={onCancel} />
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div><label className={labelCls}>Title *</label><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="Frontend Lead" /></div>
        <div><label className={labelCls}>Company *</label><input value={company} onChange={(e) => setCompany(e.target.value)} className={inputCls} placeholder="Acme Inc." /></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div><label className={labelCls}>Period</label><input value={period} onChange={(e) => setPeriod(e.target.value)} className={inputCls} placeholder="2021 — 2024" /></div>
        <div><label className={labelCls}>Location</label><input value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} placeholder="Berlin" /></div>
      </div>
      <div className="mb-5"><label className={labelCls}>Description</label><RichTextEditor value={description} onChange={setDescription} placeholder="What you did and why it mattered" rows={3} /></div>
      <SaveCancelRow onSave={handleSave} onCancel={onCancel} saveLabel={isNew ? "Add role" : "Save changes"} disabled={!title.trim() || !company.trim()} />
    </div>
  );
}
