"use client";
import type { SectionProps } from "./types";

export default function SkillsSection({ portfolio, template, section, accentColor }: SectionProps) {
  const { tokens } = template;
  const opts = (section.options ?? {}) as Record<string, unknown>;
  const layout = section.layout;
  const skillGroups = portfolio.skills;

  const sectionTitle = (
    <h2
      className="font-semibold text-[12px] uppercase tracking-widest mb-6"
      style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}
    >
      Skills
    </h2>
  );

  const chipBase = {
    borderRadius: tokens.radius_button_px,
    border: `1px solid ${tokens.border}`,
    background: tokens.surface,
    color: tokens.ink_muted,
    fontFamily: template.typography.body.font_family,
  };

  /* ── category-rows (Folio) ───────────────────────────── */
  if (layout === "category-rows") {
    return (
      <section aria-label="Skills">
        {sectionTitle}
        <div className="flex flex-col">
          {skillGroups.map((g, i) => (
            <div
              key={i}
              className="flex items-baseline gap-6 py-4"
              style={{ borderTop: `1px solid ${tokens.border}` }}
            >
              <span
                className="text-[12px] font-medium w-28 shrink-0"
                style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
              >
                {g.category}
              </span>
              <p className="text-[14px] leading-relaxed" style={{ color: tokens.ink, fontFamily: template.typography.body.font_family }}>
                {opts.style === "comma_separated"
                  ? g.items.join(", ")
                  : g.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ── category-chips (Atelier, Index, Console, Quartz) ── */
  if (layout === "category-chips") {
    const isMono = opts.style === "mono_chips";
    const isSmall = opts.style === "small_chips";
    return (
      <section aria-label="Skills">
        {sectionTitle}
        <div className="flex flex-col gap-5">
          {skillGroups.map((g, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span
                className="text-[11px] font-semibold"
                style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
              >
                {g.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1"
                    style={{
                      ...chipBase,
                      fontSize: isSmall ? "11px" : "12px",
                      fontFamily: isMono ? template.typography.mono.font_family : template.typography.body.font_family,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ── marquee-row (Showcase) ──────────────────────────── */
  if (layout === "marquee-row") {
    const allItems = skillGroups.flatMap((g) => g.items);
    return (
      <section aria-label="Skills">
        {sectionTitle}
        <div className="flex flex-wrap gap-3">
          {allItems.map((item) => (
            <span
              key={item}
              className="px-4 py-2 text-[14px] font-medium"
              style={{
                ...chipBase,
                fontSize: opts.style === "large_chips" ? "15px" : "13px",
                borderRadius: tokens.radius_button_px,
                color: tokens.ink,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    );
  }

  /* ── comma-list (Press, Cover) ──────────────────────── */
  if (layout === "comma-list") {
    return (
      <section aria-label="Skills">
        <div className="flex flex-col gap-0" style={{ borderTop: `1px solid ${tokens.border}` }}>
          {skillGroups.map((g, i) => (
            <div
              key={i}
              className="flex items-baseline gap-6 py-4"
              style={{ borderBottom: `1px solid ${tokens.border}` }}
            >
              <span
                className="text-[11px] font-semibold w-28 shrink-0 uppercase tracking-wider"
                style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
              >
                {g.category}
              </span>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: tokens.ink, fontFamily: template.typography.body.font_family }}
              >
                {g.items.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ── inline-tags (Linear) ────────────────────────────── */
  if (layout === "inline-tags") {
    return (
      <section aria-label="Skills">
        <div className="flex flex-col gap-0">
          <div
            className="pb-1 mb-2"
            style={{ borderBottom: `1px solid ${tokens.ink}` }}
          >
            <h2
              className="font-bold text-[11px] tracking-[0.1em] uppercase"
              style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}
            >
              Skills
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillGroups.flatMap((g) => g.items).map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 text-[11px]"
                style={{
                  border: `1px solid ${tokens.border}`,
                  borderRadius: tokens.radius_card_px,
                  color: tokens.ink_muted,
                  fontFamily: template.typography.mono.font_family,
                  background: tokens.surface,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── fallback ─────────────────────────────────────────── */
  return (
    <section aria-label="Skills">
      {sectionTitle}
      <div className="flex flex-col gap-4">
        {skillGroups.map((g, i) => (
          <div key={i}>
            <span className="text-[12px] font-medium block mb-1" style={{ color: tokens.ink_muted }}>{g.category}</span>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span key={item} className="px-2 py-0.5 text-[12px]" style={chipBase}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
