"use client";
import type { SectionProps } from "./types";

export default function ExperienceSection({ portfolio, template, section, accentColor }: SectionProps) {
  const { tokens } = template;
  const opts = (section.options ?? {}) as Record<string, unknown>;
  const layout = section.layout;
  const entries = portfolio.experience;

  const sectionTitle = (
    <h2
      className="font-semibold text-[12px] uppercase tracking-widest mb-6"
      style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}
    >
      Experience
    </h2>
  );

  /* ── timeline (Folio, Console) ───────────────────────── */
  if (layout === "timeline") {
    return (
      <section aria-label="Experience">
        {sectionTitle}
        <div className="flex flex-col">
          {entries.map((e, i) => (
            <article
              key={i}
              className="flex gap-6 py-6"
              style={{ borderTop: `1px solid ${tokens.border}` }}
            >
              <div className="flex flex-col gap-0.5 w-32 shrink-0 text-right">
                <span className="text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                  {e.period}
                </span>
                {e.location && (
                  <span className="text-[11px]" style={{ color: tokens.ink_muted }}>{e.location}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-semibold text-[15px]" style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}>
                    {e.title}
                  </h3>
                  <p className="text-[13px] font-medium" style={{ color: accentColor }}>{e.company}</p>
                </div>
                {e.description && (
                  <div className="text-[13px] leading-relaxed" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }} dangerouslySetInnerHTML={{ __html: e.description }} />
                )}

              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── compact-grid (Showcase) ──────────────────────────── */
  if (layout === "compact-grid") {
    return (
      <section aria-label="Experience">
        {sectionTitle}
        <div className="grid grid-cols-2 gap-4">
          {entries.map((e, i) => (
            <article
              key={i}
              className="p-5 flex flex-col gap-2"
              style={{ borderRadius: tokens.radius_card_px, border: `1px solid ${tokens.border}`, background: tokens.surface }}
            >
              <p className="text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                {e.period}
              </p>
              <h3 className="font-bold text-[16px]" style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}>
                {e.company}
              </h3>
              <p className="text-[13px] font-medium" style={{ color: accentColor }}>{e.title}</p>
              {e.description && (
                <div className="text-[12px] leading-relaxed" style={{ color: tokens.ink_muted }} dangerouslySetInnerHTML={{ __html: e.description }} />
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── two-column-row (Atelier) ─────────────────────────── */
  if (layout === "two-column-row") {
    return (
      <section aria-label="Experience">
        {sectionTitle}
        <div className="flex flex-col">
          {entries.map((e, i) => (
            <article
              key={i}
              className="grid grid-cols-[1fr_2fr] gap-6 py-5"
              style={{ borderTop: `1px solid ${tokens.border}` }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold" style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}>
                  {e.company}
                </span>
                <span className="text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                  {e.period}
                </span>
                {e.location && (
                  <span className="text-[11px]" style={{ color: tokens.ink_muted }}>{e.location}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-[14px]" style={{ color: tokens.ink }}>
                  {e.title}
                </h3>
                {e.description && (
                  <div className="text-[12px] leading-relaxed" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }} dangerouslySetInnerHTML={{ __html: e.description }} />
                )}

              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── compact-list (Index) ─────────────────────────────── */
  if (layout === "compact-list") {
    return (
      <section aria-label="Experience">
        {sectionTitle}
        <div className="flex flex-col">
          {entries.map((e, i) => (
            <article
              key={i}
              className="flex items-start justify-between gap-4 py-3"
              style={{ borderTop: `1px solid ${tokens.border}` }}
            >
              <div className="flex flex-col gap-0.5">
                <h3 className="font-semibold text-[13px]" style={{ color: tokens.ink }}>{e.title}</h3>
                <p className="text-[12px]" style={{ color: accentColor }}>{e.company}</p>
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

  /* ── timeline-rows (Quartz) ──────────────────────────── */
  if (layout === "timeline-rows") {
    return (
      <section aria-label="Experience">
        {sectionTitle}
        <div className="flex flex-col">
          {entries.map((e, i) => (
            <article
              key={i}
              className="grid grid-cols-[140px_1fr] gap-8 py-6"
              style={{ borderTop: `1px solid ${tokens.border}` }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                  {e.period}
                </span>
                {e.location && (
                  <span className="text-[11px]" style={{ color: tokens.ink_muted }}>{e.location}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="font-semibold text-[15px]" style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}>
                    {e.title}
                  </h3>
                  <p className="text-[13px]" style={{ color: accentColor }}>{e.company}</p>
                </div>
              {e.description && (
                <div className="text-[13px] leading-relaxed" style={{ color: tokens.ink_muted }} dangerouslySetInnerHTML={{ __html: e.description }} />
              )}


              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── table-rows (Linear) ─────────────────────────────── */
  if (layout === "table-rows") {
    return (
      <section aria-label="Experience">
        <div className="flex flex-col gap-0">
          <div
            className="pb-1 mb-1"
            style={{ borderBottom: `1px solid ${tokens.ink}` }}
          >
            <h2
              className="font-bold text-[11px] tracking-[0.1em] uppercase"
              style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}
            >
              Experience
            </h2>
          </div>
          {entries.map((e, i) => (
            <article
              key={i}
              className="py-2 flex flex-col gap-1"
              style={{ borderBottom: `1px solid ${tokens.border}` }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                  <h3
                    className="font-semibold text-[13px]"
                    style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}
                  >
                    {e.title}
                  </h3>
                  <span className="text-[12px]" style={{ color: accentColor }}>{e.company}</span>
                  {e.location && (
                    <span className="text-[11px]" style={{ color: tokens.ink_muted }}>· {e.location}</span>
                  )}
                </div>
                <span
                  className="text-[11px] shrink-0"
                  style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
                >
                  {e.period}
                </span>
              </div>
              {e.description && (
                <div className="text-[12px] leading-relaxed" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }} dangerouslySetInnerHTML={{ __html: e.description }} />
              )}

            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── fallback ─────────────────────────────────────────── */
  return (
    <section aria-label="Experience">
      {sectionTitle}
      <div className="flex flex-col gap-4">
        {entries.map((e, i) => (
          <article key={i}>
            <h3 className="font-semibold text-[15px]" style={{ color: tokens.ink }}>{e.title} · {e.company}</h3>
            <p className="text-[12px]" style={{ color: tokens.ink_muted }}>{e.period}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
