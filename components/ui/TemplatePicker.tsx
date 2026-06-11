"use client";
import { useState } from "react";
import { Expand } from "lucide-react";
import type { TemplateWithMeta } from "@/types/template";
import type { Portfolio } from "@/types/portfolio";
import TemplatePreview from "./TemplatePreview";
import TemplatePreviewModal from "./TemplatePreviewModal";

interface TemplatePickerProps {
  templates: TemplateWithMeta[];
  selected: string;
  onSelect: (id: string) => void;
  portfolio?: Portfolio;
}

export default function TemplatePicker({ templates, selected, onSelect, portfolio }: TemplatePickerProps) {
  const [previewTemplate, setPreviewTemplate] = useState<TemplateWithMeta | null>(null);

  return (
    <>
      <div
        role="radiogroup"
        aria-label="Choose a template"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {templates.map((template) => {
          const isSelected = template.id === selected;
          return (
            <div
              key={template.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Select ${template.name} template`}
              tabIndex={0}
              onClick={() => onSelect(template.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(template.id);
                }
              }}
              className="group text-left cursor-pointer outline-none"
            >
              {/* Preview thumbnail */}
              <div
                className="relative aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all duration-150"
                style={{
                  borderColor: isSelected ? "var(--color-brand-500)" : "var(--color-ink-150)",
                  boxShadow: isSelected ? "0 0 0 3px var(--color-brand-200)" : undefined,
                }}
              >
                <TemplatePreview template={template} />

                {/* Hover overlay: Expand button */}
                <button
                  type="button"
                  aria-label={`Preview ${template.name} template`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewTemplate(template);  // open preview only, don't select
                  }}
                  className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 40%, transparent)" }}
                >
                  <span
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-white"
                    style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
                  >
                    <Expand size={11} strokeWidth={2} />
                    Preview
                  </span>
                </button>

                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center pointer-events-none">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Labels */}
              <p className={`mt-2 text-[13px] font-medium ${isSelected ? "text-brand-700" : "text-ink-800"}`}>
                {template.name}
              </p>
              <p className="font-mono text-[10px] text-ink-400 tracking-wide uppercase mt-0.5">
                {template.tag}
              </p>
            </div>
          );
        })}
      </div>

      {/* Full-page preview modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          isSelected={previewTemplate.id === selected}
          onSelect={() => onSelect(previewTemplate.id)}
          onClose={() => setPreviewTemplate(null)}
          portfolio={portfolio}
        />
      )}
    </>
  );
}
