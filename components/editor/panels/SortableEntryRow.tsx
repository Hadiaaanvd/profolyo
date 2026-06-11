"use client";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  id: string;
  title: string;
  subtitle: string;
  onEdit: () => void;
  onDelete: () => void;
  deleteConfirm: boolean;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

export default function SortableEntryRow({ id, title, subtitle, onEdit, onDelete, deleteConfirm, onDeleteConfirm, onDeleteCancel }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  return (
    <div ref={setNodeRef} suppressHydrationWarning
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="group flex items-center gap-2 p-4 rounded-xl border border-ink-150 bg-white hover:border-ink-300 transition-colors">
      <button type="button" {...attributes} {...listeners}
        className="shrink-0 text-ink-300 hover:text-ink-500 cursor-grab active:cursor-grabbing touch-none"
        tabIndex={-1} suppressHydrationWarning>
        <GripVertical size={14} />
      </button>
      <div className="flex-1 min-w-0 cursor-pointer" onClick={onEdit}>
        <div className="text-[14px] font-semibold text-ink-800 font-display truncate">{title}</div>
        <div className="text-[12px] text-ink-500 mt-0.5 truncate">{subtitle}</div>
      </div>
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <button type="button" onClick={onEdit}
          className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors cursor-pointer">
          <Pencil size={12} />
        </button>
        {deleteConfirm ? (
          <div className="flex items-center gap-1">
            <button type="button" onClick={onDeleteConfirm}
              className="px-2.5 py-1 rounded bg-red-500 text-white text-[11px] font-medium cursor-pointer hover:bg-red-600">Delete</button>
            <button type="button" onClick={onDeleteCancel}
              className="px-2 py-1 rounded text-ink-500 text-[11px] cursor-pointer hover:bg-ink-100">Cancel</button>
          </div>
        ) : (
          <button type="button" onClick={onDelete}
            className="w-7 h-7 flex items-center justify-center rounded text-ink-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
            <Trash2 size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
