"use client";
import { useRef } from "react";
import { useEditor } from "@/contexts/EditorContext";
import { templates } from "@/lib/templates";
import { HEADING_FONTS, BODY_FONTS } from "@/lib/fonts";
import { Shuffle } from "lucide-react";
import TemplatePicker from "@/components/ui/TemplatePicker";
import { PanelHeader } from "./shared";

const ACCENT_PRESETS = [
  { label: "Coral",    color: "#E76F51" },
  { label: "Forest",   color: "#0A6E48" },
  { label: "Terminal", color: "#7BE38C" },
  { label: "Crimson",  color: "#C44536" },
  { label: "Ocean",    color: "#2A6FDB" },
  { label: "Violet",   color: "#7C5AFF" },
  { label: "Rust",     color: "#B45309" },
];

function randomAccent(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 65%, 45%)`;
}

export default function AppearancePanel() {
  const { templateId, accentColor, headingFont, bodyFont, setTemplateId, setAccentColor, setHeadingFont, setBodyFont, portfolio } = useEditor();
  const colorInputRef = useRef<HTMLInputElement>(null);
  const isPreset = ACCENT_PRESETS.some((p) => p.color === accentColor);

  return (
    <div className="max-w-[900px] mx-auto px-8 py-10">
      <PanelHeader eyebrow="Appearance" title="Template & colors" subtitle="Pick a starting point. You can switch at any time." />

      <TemplatePicker templates={templates} selected={templateId} onSelect={setTemplateId} portfolio={portfolio} />

      <div className="mt-10 pt-8 border-t border-ink-150">
        <h2 className="font-display font-semibold text-[16px] text-ink-800 mb-4">Accent color</h2>
        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_PRESETS.map((preset) => {
            const active = accentColor === preset.color;
            return (
              <button key={preset.color} type="button" onClick={() => setAccentColor(preset.color)}
                aria-label={preset.label} aria-pressed={active}
                className="w-8 h-8 rounded-full border-2 transition-all cursor-pointer hover:scale-110"
                style={{
                  background: preset.color,
                  borderColor: active ? "var(--color-ink-800)" : "transparent",
                  boxShadow: active ? "0 0 0 2px white, 0 0 0 4px var(--color-ink-800)" : undefined,
                }} />
            );
          })}
          <div className="relative">
            <input ref={colorInputRef} type="color" value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" aria-label="Custom color" />
            <div onClick={() => colorInputRef.current?.click()} title="Custom color"
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative overflow-hidden"
              style={{
                background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                borderColor: !isPreset ? "var(--color-ink-800)" : "transparent",
                boxShadow: !isPreset ? "0 0 0 2px white, 0 0 0 4px var(--color-ink-800)" : undefined,
              }}>
              <span className="text-white text-[12px] font-bold drop-shadow" style={{ lineHeight: 1 }}>✎</span>
            </div>
          </div>
          <button type="button" onClick={() => setAccentColor(randomAccent())}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink-200 text-ink-600 text-[12px] font-medium hover:bg-ink-100 transition-colors cursor-pointer"
            title="Random accent color">
            <Shuffle size={12} /> Random
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-ink-200" style={{ background: accentColor }} />
          <span className="font-mono text-[11px] text-ink-400">{accentColor}</span>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-ink-150">
        <h2 className="font-display font-semibold text-[16px] text-ink-800 mb-1">Typography</h2>
        <p className="text-[13px] text-ink-400 mb-6">Choose heading and body fonts. Resets when you switch templates.</p>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-ink-400 mb-3">Heading font</p>
            <div className="flex flex-wrap gap-2">
              {HEADING_FONTS.map((f) => {
                const active = headingFont === f.id;
                return (
                  <button key={f.id} type="button" onClick={() => setHeadingFont(f.id)}
                    className="px-3 py-2 rounded-lg border text-[13px] transition-all cursor-pointer"
                    style={{
                      fontFamily: f.stack,
                      borderColor: active ? "var(--color-brand-500)" : "var(--color-ink-200)",
                      background: active ? "var(--color-brand-50)" : "var(--color-ink-0)",
                      color: active ? "var(--color-brand-700)" : "var(--color-ink-700)",
                      boxShadow: active ? "0 0 0 1px var(--color-brand-300)" : undefined,
                    }}>
                    {f.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-widest text-ink-400 mb-3">Body font</p>
            <div className="flex flex-wrap gap-2">
              {BODY_FONTS.map((f) => {
                const active = bodyFont === f.id;
                return (
                  <button key={f.id} type="button" onClick={() => setBodyFont(f.id)}
                    className="px-3 py-2 rounded-lg border text-[13px] transition-all cursor-pointer"
                    style={{
                      fontFamily: f.stack,
                      borderColor: active ? "var(--color-brand-500)" : "var(--color-ink-200)",
                      background: active ? "var(--color-brand-50)" : "var(--color-ink-0)",
                      color: active ? "var(--color-brand-700)" : "var(--color-ink-700)",
                      boxShadow: active ? "0 0 0 1px var(--color-brand-300)" : undefined,
                    }}>
                    {f.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
