"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import type { Portfolio } from "@/types/portfolio";
import { mockPortfolio, emptyPortfolio } from "@/lib/mock-data";
import { getTemplate, templates } from "@/lib/templates";
import PortfolioPage from "@/components/templates/PortfolioPage";

const KEY_PORTFOLIO    = "profolyo_portfolio_v1";
const KEY_TEMPLATE     = "profolyo_templateId_v1";
const KEY_ACCENT       = "profolyo_accentColor_v1";
const KEY_HEADING_FONT = "profolyo_headingFont_v1";
const KEY_BODY_FONT    = "profolyo_bodyFont_v1";

const DEMO_HANDLE        = "hadia";
const DEFAULT_TEMPLATE_ID = templates[0].id;
const DEFAULT_ACCENT      = "#E76F51";

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

interface Props {
  username: string;
  templateOverride?: string;
  accentOverride?: string;
  headingFontOverride?: string;
  bodyFontOverride?: string;
}

type ViewState =
  | { status: "loading" }
  | { status: "found"; portfolio: Portfolio; templateId: string; accentColor: string; headingFont: string; bodyFont: string }
  | { status: "demo"; portfolio: Portfolio; templateId: string; accentColor: string; headingFont: string; bodyFont: string }
  | { status: "not_found" };

export default function PublicPortfolioView({ username, templateOverride, accentOverride, headingFontOverride, bodyFontOverride }: Props) {
  const [view, setView] = useState<ViewState>({ status: "loading" });

  useEffect(() => {
    const storedPortfolio  = readStorage<Portfolio | null>(KEY_PORTFOLIO, null);
    const storedTemplate   = readStorage<string>(KEY_TEMPLATE, DEFAULT_TEMPLATE_ID);
    const storedAccent     = readStorage<string>(KEY_ACCENT, DEFAULT_ACCENT);
    const storedHeadingFont = readStorage<string>(KEY_HEADING_FONT, "bricolage");
    const storedBodyFont    = readStorage<string>(KEY_BODY_FONT, "inter");

    const templateId   = templateOverride  ?? storedTemplate;
    const accentColor  = accentOverride    ?? storedAccent;
    const headingFont  = headingFontOverride ?? storedHeadingFont;
    const bodyFont     = bodyFontOverride    ?? storedBodyFont;

    if (storedPortfolio && storedPortfolio.user.handle === username) {
      setView({ status: "found", portfolio: storedPortfolio, templateId, accentColor, headingFont, bodyFont });
      return;
    }

    if (storedPortfolio && templateOverride) {
      setView({ status: "found", portfolio: storedPortfolio, templateId, accentColor, headingFont, bodyFont });
      return;
    }

    if (username === DEMO_HANDLE) {
      setView({ status: "demo", portfolio: mockPortfolio, templateId, accentColor, headingFont, bodyFont });
      return;
    }

    setView({ status: "not_found" });
  }, [username, templateOverride, accentOverride]);

  if (view.status === "loading") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--color-surface)" }}
      >
        <span className="font-mono text-[13px] text-ink-400 tracking-widest uppercase animate-pulse">
          Loading…
        </span>
      </div>
    );
  }

  if (view.status === "not_found") {
    // Trigger the Next.js not-found boundary
    notFound();
  }

  const template = getTemplate(view.templateId) ?? templates[0];

  return (
    <PortfolioPage
      portfolio={view.portfolio}
      template={template}
      accentColor={view.accentColor}
      headingFont={view.headingFont}
      bodyFont={view.bodyFont}
    />
  );
}
