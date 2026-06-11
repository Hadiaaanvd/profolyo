"use client";
import {
  createContext, useContext, useState, useCallback, useEffect,
  type ReactNode,
} from "react";
import type { Portfolio, SectionConfig } from "@/types/portfolio";
import { emptyPortfolio } from "@/lib/mock-data";
import { templates, getDefaultSections } from "@/lib/templates";

// ─── Active panel ─────────────────────────────────────────────────────────────
export type ActivePanel = string | "appearance" | null;

// ─── localStorage keys ────────────────────────────────────────────────────────
const KEY_PORTFOLIO    = "profolyo_portfolio_v1";
const KEY_TEMPLATE     = "profolyo_templateId_v1";
const KEY_ACCENT       = "profolyo_accentColor_v1";
const KEY_HEADING_FONT = "profolyo_headingFont_v1";
const KEY_BODY_FONT    = "profolyo_bodyFont_v1";
const KEY_ACTIVE_PANEL = "profolyo_activePanel_v1";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// ─── State shape ─────────────────────────────────────────────────────────────
interface EditorState {
  templateId: string;
  accentColor: string;
  headingFont: string;
  bodyFont: string;
  portfolio: Portfolio;
  activePanel: ActivePanel;
  hydrated: boolean;

  setTemplateId: (id: string) => void;
  setAccentColor: (color: string) => void;
  setHeadingFont: (id: string) => void;
  setBodyFont: (id: string) => void;

  updatePortfolio: (patch: Partial<Portfolio>) => void;
  setActivePanel: (panel: ActivePanel) => void;

  reorderSections: (orderedIds: string[]) => void;
  toggleSectionVisibility: (id: string) => void;
  renameSection: (id: string, label: string) => void;
  addCustomSection: (label: string) => void;
  deleteSection: (id: string) => void;
  updateSectionItems: (sectionId: string, items: SectionConfig["items"]) => void;
}

const EditorContext = createContext<EditorState | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export function EditorProvider({ children }: { children: ReactNode }) {
  const firstTemplate = templates[0];

  // Use server-safe defaults for all state — localStorage is loaded in a
  // useEffect after hydration to avoid server/client HTML mismatches.
  const [templateId, setTemplateIdState] = useState<string>(firstTemplate.id);
  const [accentColor, setAccentColorState] = useState<string>(firstTemplate.defaults.accent_color);
  const [headingFont, setHeadingFontState] = useState<string>("bricolage");
  const [bodyFont, setBodyFontState] = useState<string>("inter");
  const [portfolio, setPortfolio] = useState<Portfolio>(emptyPortfolio);
  const [activePanel, setActivePanelState] = useState<ActivePanel>(null);
  const [hydrated, setHydrated] = useState(false);

  // ── Hydrate from localStorage after first client render ─────────────────
  useEffect(() => {
    const storedTemplateId = readStorage(KEY_TEMPLATE, firstTemplate.id);
    const storedAccent     = readStorage(KEY_ACCENT, firstTemplate.defaults.accent_color);
    const storedHeading    = readStorage(KEY_HEADING_FONT, "bricolage");
    const storedBody       = readStorage(KEY_BODY_FONT, "inter");
    const storedPortfolio  = readStorage(KEY_PORTFOLIO, emptyPortfolio);
    const storedPanel      = readStorage<ActivePanel>(KEY_ACTIVE_PANEL, null);

    setTemplateIdState(storedTemplateId);
    setAccentColorState(storedAccent);
    setHeadingFontState(storedHeading);
    setBodyFontState(storedBody);
    setPortfolio(storedPortfolio);
    setActivePanelState(storedPanel);
    setHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Persist (only after hydration to avoid overwriting with defaults) ────
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY_PORTFOLIO, JSON.stringify(portfolio)); } catch {}
  }, [portfolio, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY_TEMPLATE, JSON.stringify(templateId)); } catch {}
  }, [templateId, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY_ACCENT, JSON.stringify(accentColor)); } catch {}
  }, [accentColor, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY_HEADING_FONT, JSON.stringify(headingFont)); } catch {}
  }, [headingFont, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY_BODY_FONT, JSON.stringify(bodyFont)); } catch {}
  }, [bodyFont, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY_ACTIVE_PANEL, JSON.stringify(activePanel)); } catch {}
  }, [activePanel, hydrated]);

  // ── Template switching — also resets accent + fonts to template defaults ─
  const setTemplateId = useCallback((id: string) => {
    setTemplateIdState(id);
    const t = templates.find((t) => t.id === id);
    if (t) {
      setAccentColorState(t.defaults.accent_color);
      // Reset fonts to what the template JSON declares
      const hFont = t.typography?.heading?.font_family;
      const bFont = t.typography?.body?.font_family;
      if (hFont) {
        const headingId = fontNameToId(hFont);
        if (headingId) setHeadingFontState(headingId);
      }
      if (bFont) {
        const bodyId = fontNameToId(bFont);
        if (bodyId) setBodyFontState(bodyId);
      }
      const defaults = getDefaultSections(t);
      setPortfolio((prev) => {
        const existingMap = new Map(prev.sections.map((s) => [s.id, s]));
        const merged = defaults.map((d) => existingMap.get(d.id) ?? d);
        const customSections = prev.sections.filter((s) => s.type === "custom");
        return { ...prev, sections: [...merged, ...customSections] };
      });
    }
  }, []);

  const setAccentColor  = useCallback((color: string) => setAccentColorState(color), []);
  const setHeadingFont  = useCallback((id: string) => setHeadingFontState(id), []);
  const setBodyFont     = useCallback((id: string) => setBodyFontState(id), []);

  const updatePortfolio = useCallback((patch: Partial<Portfolio>) => {
    setPortfolio((prev) => ({ ...prev, ...patch }));
  }, []);

  const setActivePanel = useCallback((panel: ActivePanel) => {
    setActivePanelState(panel);
  }, []);

  const updateSections = useCallback((updater: (prev: SectionConfig[]) => SectionConfig[]) => {
    setPortfolio((prev) => ({ ...prev, sections: updater(prev.sections) }));
  }, []);

  const reorderSections = useCallback((orderedIds: string[]) => {
    updateSections((prev) =>
      prev.map((s) => {
        const newOrder = orderedIds.indexOf(s.id);
        if (newOrder === -1) return s;
        return { ...s, order: newOrder + 1 };
      })
    );
  }, [updateSections]);

  const toggleSectionVisibility = useCallback((id: string) => {
    updateSections((prev) => prev.map((s) => s.id === id ? { ...s, visible: !s.visible } : s));
  }, [updateSections]);

  const renameSection = useCallback((id: string, label: string) => {
    updateSections((prev) => prev.map((s) => s.id === id ? { ...s, label } : s));
  }, [updateSections]);

  const addCustomSection = useCallback((label: string) => {
    const id = `custom_${Date.now()}`;
    const maxOrder = Math.max(
      ...portfolio.sections.filter((s) => s.order < 999).map((s) => s.order),
      0
    );
    updateSections((prev) => [
      ...prev,
      { id, type: "custom", label, visible: true, order: maxOrder + 1, items: [] },
    ]);
    setActivePanelState(id);
  }, [portfolio.sections, updateSections]);

  const deleteSection = useCallback((id: string) => {
    updateSections((prev) => prev.filter((s) => s.id !== id));
    setActivePanelState((panel) => (panel === id ? null : panel));
  }, [updateSections]);

  const updateSectionItems = useCallback((sectionId: string, items: SectionConfig["items"]) => {
    updateSections((prev) =>
      prev.map((s) => s.id === sectionId ? { ...s, items } : s)
    );
  }, [updateSections]);

  return (
    <EditorContext.Provider
      value={{
        templateId, accentColor, headingFont, bodyFont,
        portfolio, activePanel, hydrated,
        setTemplateId, setAccentColor, setHeadingFont, setBodyFont,
        updatePortfolio, setActivePanel,
        reorderSections, toggleSectionVisibility, renameSection,
        addCustomSection, deleteSection, updateSectionItems,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor(): EditorState {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}

// ─── Helper: map Google Font name → font ID ──────────────────────────────────
function fontNameToId(name: string): string | null {
  const map: Record<string, string> = {
    "Bricolage Grotesque": "bricolage",
    "Inter": "inter",
    "Playfair Display": "playfair",
    "Space Grotesk": "space-grotesk",
    "Fraunces": "fraunces",
    "DM Serif Display": "dm-serif-display",
    "DM Sans": "dm-sans",
    "Source Serif 4": "source-serif-4",
  };
  return map[name] ?? null;
}

