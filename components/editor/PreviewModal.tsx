"use client";
import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { getTemplate, templates } from "@/lib/templates";
import PortfolioPage from "@/components/templates/PortfolioPage";

interface Props {
  onClose: () => void;
}

export default function PreviewModal({ onClose }: Props) {
  const { portfolio, templateId, accentColor, headingFont, bodyFont } = useEditor();
  const template = getTemplate(templateId) ?? templates[0];
  const handle = portfolio.user.handle;

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#fff" }}>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-ink-150 shrink-0"
        style={{ background: "var(--color-ink-0)" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-md text-ink-500 hover:text-ink-800 hover:bg-ink-100 transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <X size={15} />
          </button>
          <span className="text-[12px] font-mono text-ink-400">Preview</span>
        </div>
        {handle && (
          <a
            href={`/${handle}?t=${encodeURIComponent(templateId)}&a=${encodeURIComponent(accentColor)}&hf=${encodeURIComponent(headingFont)}&bf=${encodeURIComponent(bodyFont)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ink-200 bg-ink-50 text-[12px] font-medium text-ink-700 hover:border-ink-300 hover:bg-ink-100 transition-colors cursor-pointer"
          >
            Open in new tab <ExternalLink size={11} />
          </a>
        )}
      </div>

      {/* Full portfolio render — scrollable */}
      <div className="flex-1 overflow-y-auto">
        <PortfolioPage
          portfolio={portfolio}
          template={template}
          accentColor={accentColor}
        />
      </div>
    </div>
  );
}
