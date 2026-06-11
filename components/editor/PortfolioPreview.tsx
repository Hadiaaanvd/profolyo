"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { useEditor } from "@/contexts/EditorContext";
import { getTemplate } from "@/lib/templates";
import PortfolioPage from "@/components/templates/PortfolioPage";

const DEFAULT_WIDTH = 500;
const MIN_WIDTH = 280;
const MAX_WIDTH = 960;

export default function PortfolioPreview() {
  const { templateId, accentColor, headingFont, bodyFont, portfolio, setActivePanel, activePanel } = useEditor();
  const template = getTemplate(templateId);

  const [panelWidth, setPanelWidth] = useState(DEFAULT_WIDTH);
  const [scaledHeight, setScaledHeight] = useState<number>(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(DEFAULT_WIDTH);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      dragging.current = true;
      startX.current = e.clientX;
      startWidth.current = panelWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [panelWidth]
  );

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current) return;
      const delta = startX.current - e.clientX;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta));
      setPanelWidth(next);
    }
    function onMouseUp() {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // Track inner content height so the scaled wrapper collapses correctly
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setScaledHeight(el.scrollHeight);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll to + briefly highlight the section corresponding to activePanel
  useEffect(() => {
    if (!activePanel || !innerRef.current || !scrollRef.current) return;
    const el = innerRef.current.querySelector<HTMLElement>(`[data-section="${activePanel}"]`);
    if (!el) return;

    const renderWidth = template?.layout.container_max_px ?? 1;
    const scale = panelWidth / renderWidth;
    const scrollTop = el.offsetTop * scale - 16;
    scrollRef.current.scrollTo({ top: Math.max(0, scrollTop), behavior: "smooth" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePanel]);

  if (!template) return null;

  const isEmpty = portfolio.user.name === "";
  const renderWidth = template.layout.container_max_px;
  const scale = panelWidth / renderWidth;
  const collapsedHeight = scaledHeight * scale;

  return (
    <aside
      className="hidden xl:flex flex-col shrink-0 border-l border-ink-150 bg-ink-50 relative"
      style={{ width: panelWidth, overflow: "hidden" }}
    >
      {/* Drag handle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 z-20 cursor-col-resize group"
        onMouseDown={onMouseDown}
        role="separator"
        aria-label="Resize preview panel"
        aria-orientation="vertical"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 transition-colors group-hover:bg-brand-400 group-active:bg-brand-500" />
      </div>

      {/* Label strip */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-ink-150 bg-ink-50 shrink-0 relative z-10">
        <span className="text-[11px] text-ink-400 font-medium">Preview</span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-ink-300 font-mono tabular-nums">{panelWidth}px</span>
          <span className="text-[11px] text-ink-400 font-mono">{template.name}</span>
        </div>
      </div>

      {isEmpty ? (
        /* ── Empty state placeholder ── */
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
            style={{ background: "var(--color-brand-100, #ede9fe)" }}
          >
            <span className="text-[18px]" aria-hidden>✦</span>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-ink-700 mb-1">Nothing to preview yet</p>
            <p className="text-[12px] text-ink-400 leading-relaxed">
              Fill in your details and your portfolio will appear here live.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const sec = portfolio.sections.find((s) => s.id === "hero");
              if (sec) setActivePanel(sec.id);
            }}
            className="mt-1 px-4 py-2 rounded-full text-[12px] font-medium bg-brand-500 text-white hover:bg-brand-600 transition-colors cursor-pointer"
            style={{ boxShadow: "var(--shadow-brand)" }}
          >
            Fill in your details →
          </button>
        </div>
      ) : (
        /* ── Live template preview ── */
        <div
          ref={scrollRef}
          className="flex-1"
          style={{ overflowY: "auto", overflowX: "hidden" }}
          aria-label="Portfolio preview"
          aria-hidden="true"
        >
          {/*
            Collapsed wrapper drives the scroll height.
            The inner div is position:absolute so transform:scale doesn't
            bleed into layout — without this the scroll container would scroll
            into empty space equal to the unscaled content height.
          */}
          <div style={{ height: collapsedHeight || "100%", position: "relative" }}>
            <div
              ref={innerRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: renderWidth,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              <PortfolioPage
                portfolio={portfolio}
                template={template}
                accentColor={accentColor}
                headingFont={headingFont}
                bodyFont={bodyFont}
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
