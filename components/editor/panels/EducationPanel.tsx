"use client";
import { useState } from "react";
import { useEditor } from "@/contexts/EditorContext";
import type { Education } from "@/types/portfolio";
import { PanelHeader, EmptyState, FormHeader, SaveCancelRow, labelCls, inputCls } from "./shared";
import RichTextEditor from "@/components/editor/RichTextEditor";
import SortableEntryRow from "./SortableEntryRow";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

export default function EducationPanel() {
  const { portfolio, updatePortfolio } = useEditor();
  const { education } = portfolio;
  const [editingIndex, setEditingIndex] = useState<number | "new" | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const ids = education.map((e) => e.id);

  function saveEdu(draft: Omit<Education, "id">, index: number | "new") {
    if (index === "new") updatePortfolio({ education: [...education, { ...draft, id: crypto.randomUUID() }] });
    else updatePortfolio({ education: education.map((e, i) => (i === index ? { ...draft, id: e.id } : e)) });
    setEditingIndex(null);
  }

  function deleteEdu(index: number) {
    updatePortfolio({ education: education.filter((_, i) => i !== index) });
    setDeleteIndex(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = education.findIndex((e) => e.id === active.id);
    const newIdx = education.findIndex((e) => e.id === over.id);
    if (oldIdx !== -1 && newIdx !== -1) updatePortfolio({ education: arrayMove(education, oldIdx, newIdx) });
  }

  if (editingIndex !== null) {
    const base = editingIndex === "new" ? undefined : education[editingIndex];
    return <EducationForm initial={base} onSave={(d) => saveEdu(d, editingIndex)} onCancel={() => setEditingIndex(null)} />;
  }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Education" title="Academic background" />
        <button type="button" onClick={() => setEditingIndex("new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>
          + Add education
        </button>
      </div>
      {education.length === 0 ? (
        <EmptyState icon="🎓" title="No education yet" description="Add your degrees, courses, or bootcamps." action="Add your education →" onAction={() => setEditingIndex("new")} />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-3">
              {education.map((ed, i) => (
                <SortableEntryRow key={ed.id} id={ed.id}
                  title={ed.degree}
                  subtitle={`${ed.institution}${ed.location ? ` · ${ed.location}` : ""}${ed.period ? ` · ${ed.period}` : ""}`}
                  onEdit={() => setEditingIndex(i)}
                  onDelete={() => setDeleteIndex(i)}
                  deleteConfirm={deleteIndex === i}
                  onDeleteConfirm={() => deleteEdu(i)}
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

function EducationForm({ initial, onSave, onCancel }: { initial?: Education; onSave: (e: Omit<Education, "id">) => void; onCancel: () => void }) {
  const isNew = !initial;
  const [degree,      setDegree]      = useState(initial?.degree ?? "");
  const [institution, setInstitution] = useState(initial?.institution ?? "");
  const [period,      setPeriod]      = useState(initial?.period ?? "");
  const [location,    setLocation]    = useState(initial?.location ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");

  function handleSave() {
    if (!degree.trim() || !institution.trim()) return;
    onSave({ degree: degree.trim(), institution: institution.trim(), period: period.trim(), location: location.trim() || undefined, description: description || undefined });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <FormHeader eyebrow={isNew ? "Add education" : "Edit education"} title={isNew ? "New entry" : (degree || "Untitled")} onBack={onCancel} />
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div><label className={labelCls}>Degree *</label><input value={degree} onChange={(e) => setDegree(e.target.value)} className={inputCls} placeholder="M.S. Human-Computer Interaction" /></div>
        <div><label className={labelCls}>Institution *</label><input value={institution} onChange={(e) => setInstitution(e.target.value)} className={inputCls} placeholder="TU Berlin" /></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div><label className={labelCls}>Period</label><input value={period} onChange={(e) => setPeriod(e.target.value)} className={inputCls} placeholder="2017 — 2019" /></div>
        <div><label className={labelCls}>Location</label><input value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} placeholder="Berlin" /></div>
      </div>
      <div className="mb-8"><label className={labelCls}>Description</label><RichTextEditor value={description} onChange={setDescription} placeholder="Thesis topic, relevant coursework, honours…" rows={3} /></div>
      <SaveCancelRow onSave={handleSave} onCancel={onCancel} saveLabel={isNew ? "Add entry" : "Save changes"} disabled={!degree.trim() || !institution.trim()} />
    </div>
  );
}
