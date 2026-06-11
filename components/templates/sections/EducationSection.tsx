"use client";
import type { SectionProps } from "./types";

export default function EducationSection({ portfolio, template, section, accentColor }: SectionProps) {
  const { tokens } = template;
  const layout = section.layout;
  const entries = portfolio.education;

  const sectionTitle = (
    <h2
      className="font-semibold text-[12px] uppercase tracking-widest mb-6"
      style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}
    >
      Education
    </h2>
  );

  /* ── compact-list (Folio, Console, Index, Showcase) ───── */
  if (layout === "compact-list") {
    return (
      <section aria-label="Education">
        {sectionTitle}
        <div className="flex flex-col">
          {entries.map((e, i) => (
            <article
              key={i}
              className="flex items-start justify-between gap-4 py-4"
              style={{ borderTop: `1px solid ${tokens.border}` }}
            >
              <div className="flex flex-col gap-0.5">
                <h3 className="font-semibold text-[14px]" style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}>
                  {e.institution}
                </h3>
                <p className="text-[12px]" style={{ color: tokens.ink_muted }}>{e.degree}</p>
                {e.location && (
                  <p className="text-[11px]" style={{ color: tokens.ink_muted }}>{e.location}</p>
                )}
              </div>
              <span className="text-[11px] shrink-0 mt-0.5" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                {e.period}
              </span>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── two-column-row (Atelier) ─────────────────────────── */
  if (layout === "two-column-row") {
    return (
      <section aria-label="Education">
        {sectionTitle}
        <div className="flex flex-col">
          {entries.map((e, i) => (
            <article
              key={i}
              className="grid grid-cols-[1fr_2fr] gap-6 py-4"
              style={{ borderTop: `1px solid ${tokens.border}` }}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[12px] font-semibold" style={{ color: tokens.ink }}>{e.institution}</span>
                <span className="text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>{e.period}</span>
              </div>
              <div>
                <p className="text-[13px]" style={{ color: tokens.ink }}>{e.degree}</p>
                {e.location && <p className="text-[11px]" style={{ color: tokens.ink_muted }}>{e.location}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── side-by-side (Quartz) ───────────────────────────── */
  if (layout === "side-by-side") {
    return (
      <section aria-label="Education">
        {sectionTitle}
        <div className="grid grid-cols-2 gap-6">
          {entries.map((e, i) => (
            <article
              key={i}
              className="p-5 flex flex-col gap-2"
              style={{ borderRadius: tokens.radius_card_px, border: `1px solid ${tokens.border}`, background: tokens.surface }}
            >
              <span className="text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                {e.period}
              </span>
              <h3 className="font-semibold text-[14px]" style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}>
                {e.institution}
              </h3>
              <p className="text-[13px]" style={{ color: tokens.ink_muted }}>{e.degree}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── table-rows (Linear) ─────────────────────────────── */
  if (layout === "table-rows") {
    return (
      <section aria-label="Education">
        <div className="flex flex-col gap-0">
          <div
            className="pb-1 mb-1"
            style={{ borderBottom: `1px solid ${tokens.ink}` }}
          >
            <h2
              className="font-bold text-[11px] tracking-[0.1em] uppercase"
              style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}
            >
              Education
            </h2>
          </div>
          {entries.map((e, i) => (
            <article
              key={i}
              className="py-2 flex items-baseline justify-between gap-4"
              style={{ borderBottom: `1px solid ${tokens.border}` }}
            >
              <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                <h3
                  className="font-semibold text-[13px]"
                  style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}
                >
                  {e.institution}
                </h3>
                <span className="text-[12px]" style={{ color: tokens.ink_muted }}>· {e.degree}</span>
              </div>
              <span
                className="text-[11px] shrink-0"
                style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
              >
                {e.period}
              </span>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── fallback ─────────────────────────────────────────── */
  return (
    <section aria-label="Education">
      {sectionTitle}
      <div className="flex flex-col gap-3">
        {entries.map((e, i) => (
          <article key={i}>
            <h3 className="font-semibold text-[14px]" style={{ color: tokens.ink }}>{e.institution}</h3>
            <p className="text-[12px]" style={{ color: tokens.ink_muted }}>{e.degree} · {e.period}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
