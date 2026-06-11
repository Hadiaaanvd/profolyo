"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";

interface Props {
  onClose: () => void;
}

export default function CreateSectionModal({ onClose }: Props) {
  const { addCustomSection } = useEditor();
  const [label, setLabel] = useState("");

  function handleCreate() {
    const trimmed = label.trim();
    if (!trimmed) return;
    addCustomSection(trimmed);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-150">
          <h2 className="text-[15px] font-semibold font-display text-ink-900">Add section</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-5 py-5">
          <label className="block text-[12px] font-medium text-ink-700 mb-1.5" htmlFor="section-label">
            Section title
          </label>
          <input
            id="section-label"
            autoFocus
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); if (e.key === "Escape") onClose(); }}
            placeholder="e.g. Speaking, Open Source, Residencies…"
            className="w-full text-[13px] px-3 py-2 rounded-lg border border-ink-200 text-ink-800 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
          />
          <p className="mt-2 text-[11px] text-ink-400">
            Each item has a heading, subheading, date, description, and optional link.
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 text-[13px] font-medium py-2 rounded-lg bg-ink-100 text-ink-600 hover:bg-ink-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={!label.trim()}
            className="flex-1 text-[13px] font-medium py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Create section
          </button>
        </div>
      </div>
    </div>
  );
}
