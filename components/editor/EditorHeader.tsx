"use client";
import { useState, useEffect, useRef } from "react";
import { useEditor } from "@/contexts/EditorContext";

function useSaveIndicator(portfolio: object, hydrated: boolean) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const prevRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    const serialized = JSON.stringify(portfolio);
    // Skip the very first render after hydration (no real change yet)
    if (prevRef.current === null) {
      prevRef.current = serialized;
      return;
    }
    if (serialized === prevRef.current) return;
    prevRef.current = serialized;

    setStatus("saving");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus("saved"), 600);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio, hydrated]);

  return status;
}

export default function EditorHeader() {
  const { templateId, accentColor, headingFont, bodyFont, portfolio, hydrated } = useEditor();
  const handle = portfolio.user.handle;
  const saveStatus = useSaveIndicator(portfolio, hydrated);

  const fontParams = `&hf=${encodeURIComponent(headingFont)}&bf=${encodeURIComponent(bodyFont)}`;
  const previewUrl = `/${handle || "_preview"}?t=${encodeURIComponent(templateId)}&a=${encodeURIComponent(accentColor)}${fontParams}`;
  const liveUrl = handle
    ? `/${handle}?t=${encodeURIComponent(templateId)}&a=${encodeURIComponent(accentColor)}${fontParams}`
    : null;

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-ink-150 bg-ink-0 shrink-0">
      <div className="flex items-center gap-3">
        {handle ? (
          <a
            href={`https://profolyo.me/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-ink-400 font-mono hover:text-ink-600 transition-colors"
            style={{ textDecoration: "none" }}
          >
            profolyo.me/{handle}
          </a>
        ) : (
          <span className="text-[13px] text-ink-400 font-mono italic">Set a handle to get your URL</span>
        )}
        {/* Auto-save indicator */}
        {saveStatus !== "idle" && (
          <span
            className={[
              "text-[11px] font-medium transition-opacity duration-300",
              saveStatus === "saving" ? "text-ink-400" : "text-green-600",
            ].join(" ")}
          >
            {saveStatus === "saving" ? "Saving…" : "Saved"}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* Preview */}
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-ink-200 bg-ink-50 text-[12px] font-medium text-ink-700 hover:border-ink-300 hover:bg-ink-100 transition-colors cursor-pointer"
        >
          Preview ↗
        </a>

        {/* Live site — only when handle is set */}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-brand-300 bg-brand-50 text-[12px] font-medium text-brand-700 hover:border-brand-400 hover:bg-brand-100 transition-colors cursor-pointer"
          >
            View Live Site ↗
          </a>
        )}

        <button
          type="button"
          disabled
          title="PDF export coming soon"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-ink-200 text-ink-400 text-[12px] font-medium cursor-not-allowed"
        >
          Download Résumé PDF
        </button>
      </div>
    </header>
  );
}
