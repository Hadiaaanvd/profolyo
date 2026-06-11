"use client";
import { useState } from "react";
import { useEditor } from "@/contexts/EditorContext";
import type { SectionConfig, CustomSectionItem } from "@/types/portfolio";
import { PanelHeader, EmptyState, FormHeader, SaveCancelRow, labelCls, inputCls } from "./shared";
import RichTextEditor from "@/components/editor/RichTextEditor";
import SortableEntryRow from "./SortableEntryRow";
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

export default function CustomSectionPanel({ section }: { section: SectionConfig }) {
  const { updateSectionItems } = useEditor();
  const items = section.items ?? [];
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function saveItem(draft: CustomSectionItem) {
    if (editingId === "new") updateSectionItems(section.id, [...items, draft]);
    else updateSectionItems(section.id, items.map((it) => it.id === draft.id ? draft : it));
    setEditingId(null);
  }
  function deleteItem(id: string) { updateSectionItems(section.id, items.filter((it) => it.id !== id)); setDeleteId(null); }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((it) => it.id === String(active.id));
    const newIndex = items.findIndex((it) => it.id === String(over.id));
    if (oldIndex !== -1 && newIndex !== -1) updateSectionItems(section.id, arrayMove(items, oldIndex, newIndex));
  }

  if (editingId !== null) {
    const base = editingId === "new" ? undefined : items.find((it) => it.id === editingId);
    return <CustomItemForm initial={base} onSave={saveItem} onCancel={() => setEditingId(null)} />;
  }

  return (
    <div className="max-w-[720px] mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <PanelHeader eyebrow="Custom section" title={section.label} />
        <button type="button" onClick={() => setEditingId("new")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer"
          style={{ boxShadow: "var(--shadow-brand)" }}>+ Add item</button>
      </div>
      {items.length === 0 ? (
        <EmptyState icon="✦" title="No items yet" description="Add the first item to this section." action="Add item →" onAction={() => setEditingId("new")} />
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((it) => it.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <SortableEntryRow key={item.id} id={item.id}
                  title={item.heading}
                  subtitle={[item.subheading, item.date].filter(Boolean).join(" · ")}
                  onEdit={() => setEditingId(item.id)}
                  onDelete={() => setDeleteId(item.id)}
                  deleteConfirm={deleteId === item.id}
                  onDeleteConfirm={() => deleteItem(item.id)}
                  onDeleteCancel={() => setDeleteId(null)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

function CustomItemForm({ initial, onSave, onCancel }: { initial?: CustomSectionItem; onSave: (item: CustomSectionItem) => void; onCancel: () => void }) {
  const isNew = !initial;
  const [heading,     setHeading]     = useState(initial?.heading ?? "");
  const [subheading,  setSubheading]  = useState(initial?.subheading ?? "");
  const [date,        setDate]        = useState(initial?.date ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [link,        setLink]        = useState(initial?.link ?? "");

  function handleSave() {
    if (!heading.trim()) return;
    onSave({ id: initial?.id ?? `item_${Date.now()}`, heading: heading.trim(), subheading: subheading.trim() || undefined, date: date.trim() || undefined, description: description.trim() || undefined, link: link.trim() || undefined });
  }

  return (
    <div className="max-w-2xl mx-auto px-8 py-10">
      <FormHeader eyebrow={isNew ? "Add item" : "Edit item"} title={isNew ? "New item" : (heading || "Untitled")} onBack={onCancel} />
      <div className="flex flex-col gap-5">
        <div><label className={labelCls}>Heading *</label><input value={heading} onChange={(e) => setHeading(e.target.value)} className={inputCls} placeholder="Title of this item" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Subheading</label><input value={subheading} onChange={(e) => setSubheading(e.target.value)} className={inputCls} placeholder="Role, company, location…" /></div>
          <div><label className={labelCls}>Date</label><input value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} placeholder="2023 or Jan 2023" /></div>
        </div>
        <div><label className={labelCls}>Description</label><RichTextEditor value={description} onChange={setDescription} placeholder="Optional description" rows={3} /></div>
        <div><label className={labelCls}>Link URL</label><input type="url" value={link} onChange={(e) => setLink(e.target.value)} className={inputCls} placeholder="https://…" /></div>
      </div>
      <SaveCancelRow onSave={handleSave} onCancel={onCancel} saveLabel={isNew ? "Add item" : "Save changes"} disabled={!heading.trim()} />
    </div>
  );
}
