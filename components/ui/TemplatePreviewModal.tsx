"use client";
import { useEffect } from "react";
import { X, Check } from "lucide-react";
import type { TemplateWithMeta } from "@/types/template";
import type { Portfolio } from "@/types/portfolio";
import { mockPortfolio } from "@/lib/mock-data";
import PortfolioPage from "@/components/templates/PortfolioPage";

interface TemplatePreviewModalProps {
  template: TemplateWithMeta;
  isSelected: boolean;
  onSelect: () => void;
  onClose: () => void;
  portfolio?: Portfolio;
}

export default function TemplatePreviewModal({
  template,
  isSelected,
  onSelect,
  onClose,
  portfolio: portfolioProp,

}: TemplatePreviewModalProps) {
  const portfolio = portfolioProp ?? mockPortfolio;
  const renderWidth = template.layout.container_max_px;
  const DISPLAY_WIDTH = 900;
  const zoom = DISPLAY_WIDTH / renderWidth;

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Trap scroll — prevent body from scrolling behind the modal
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      {/* Modal shell — stop propagation so clicks inside don't close */}
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden shadow-2xl"
        style={{ width: "min(90vw, 900px)", maxHeight: "90vh", background: "#ffffff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b shrink-0"
          style={{ background: "#ffffff", borderColor: "var(--color-ink-200)" }}
        >
          <div>
            <span className="text-[15px] font-semibold text-ink-800">{template.name}</span>
            <span className="ml-2 font-mono text-[10px] text-ink-400 tracking-widest uppercase">
              {template.tag}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (!isSelected) onSelect(); onClose(); }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer"
              style={{
                background: isSelected ? "var(--color-ink-100)" : "var(--color-brand-500)",
                color: isSelected ? "var(--color-ink-600)" : "#fff",
              }}
            >
              {isSelected && <Check size={13} strokeWidth={2.5} />}
              {isSelected ? "Selected" : "Use this template"}
            </button>
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-ink-500 hover:text-ink-800 hover:bg-ink-100 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable preview area */}
        <div className="overflow-y-auto flex-1">
          <div
            style={{
              width: renderWidth,
              zoom,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <PortfolioPage
              portfolio={mockPortfolio}
              template={template}
              accentColor={template.defaults.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
