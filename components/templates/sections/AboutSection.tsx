"use client";
import type { SectionProps } from "./types";

export default function AboutSection({ portfolio, template, section, accentColor }: SectionProps) {
  const { user } = portfolio;
  const { tokens } = template;
  const opts = (section.options ?? {}) as Record<string, unknown>;
  const layout = section.layout;

  const headingStyle = {
    fontFamily: template.typography.heading.font_family,
    letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.02}em`,
    color: tokens.ink,
  };

  /* ── single-prose (Folio, Console) ──────────────────── */
  if (layout === "single-prose") {
    const glyph = opts.show_heading_glyph as string | undefined;
    return (
      <section aria-label="About">
        <div className="flex flex-col gap-5" style={{ maxWidth: opts.max_width_ch ? `${opts.max_width_ch}ch` : undefined }}>
          {glyph && (
            <p
              className="text-[13px] font-semibold"
              style={{ fontFamily: template.typography.mono.font_family, color: accentColor }}
            >
              {glyph} about
            </p>
          )}
          <div
            className="text-[16px] leading-relaxed"
            style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
            dangerouslySetInnerHTML={{ __html: user.bio_long ?? "" }}
          />
        </div>
      </section>
    );
  }

  /* ── two-column-prose (Showcase, Quartz) ─────────────── */
  if (layout === "two-column-prose") {
    const heading = (opts.show_heading as string) ?? "About";
    return (
      <section aria-label="About">
        <div className="grid grid-cols-[1fr_2fr] gap-12 items-start">
          <h2
            className="font-bold text-[clamp(28px,4vw,48px)] leading-none sticky top-8"
            style={headingStyle}
          >
            {heading}
          </h2>
          <div
            className="text-[16px] leading-relaxed"
            style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
            dangerouslySetInnerHTML={{ __html: user.bio_long ?? "" }}
          />
        </div>
      </section>
    );
  }

  /* ── section-heading (Atelier, Index) ────────────────── */
  if (layout === "section-heading") {
    return (
      <section aria-label="About">
        <div className="flex flex-col gap-4">
          <h2
            className="font-semibold text-[13px] uppercase tracking-widest"
            style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}
          >
            About
          </h2>
          <div
            className="text-[15px] leading-relaxed"
            style={{
              color: tokens.ink_muted,
              fontFamily: template.typography.body.font_family,
              maxWidth: opts.max_width_ch ? `${opts.max_width_ch}ch` : "60ch",
            }}
            dangerouslySetInnerHTML={{ __html: user.bio_long ?? "" }}
          />
        </div>
      </section>
    );
  }

  /* ── drop-cap (Press) ───────────────────────────────── */
  if (layout === "drop-cap") {
    return (
      <section aria-label="About">
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${tokens.border}`, paddingTop: 32 }}
        >
          {/* Left col: section label + bio_long as HTML */}
          <div className="flex flex-col gap-4">
            <h2
              className="text-[11px] font-semibold tracking-[0.15em] uppercase"
              style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
            >
              About
            </h2>
            <div
              className="leading-relaxed text-[15px]"
              style={{ color: tokens.ink, fontFamily: template.typography.body.font_family, lineHeight: template.typography.body.line_height }}
              dangerouslySetInnerHTML={{ __html: user.bio_long ?? "" }}
            />
          </div>
          {/* Right col: bio_short + contact strip */}
          <div className="flex flex-col gap-4 pt-8">
            <p
              className="text-[14px] leading-relaxed italic"
              style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
            >
              {user.bio}
            </p>
            <div
              className="flex flex-col gap-1 pt-4 text-[12px]"
              style={{ borderTop: `1px solid ${tokens.border}`, color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
            >
              <span>{user.location}</span>
              <a href={`mailto:${user.email}`} className="underline underline-offset-2" style={{ color: accentColor }}>
                {user.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── single-line (Linear) ────────────────────────────── */
  if (layout === "single-line") {
    return (
      <section aria-label="About">
        <p
          className="text-[13px] leading-snug"
          style={{
            color: tokens.ink_muted,
            fontFamily: template.typography.body.font_family,
            borderLeft: `2px solid ${accentColor}`,
            paddingLeft: 10,
          }}
        >
          {user.bio}
        </p>
      </section>
    );
  }

  /* ── centered-prose (Story, Cover) ──────────────────── */
  if (layout === "centered-prose") {
    return (
      <section aria-label="About" className="text-center">
        <div className="flex flex-col items-center gap-6">
          <h2
            className="font-semibold text-[12px] uppercase tracking-widest"
            style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}
          >
            About
          </h2>
          <div
            className="text-[16px] leading-relaxed"
            style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
            dangerouslySetInnerHTML={{ __html: user.bio_long ?? "" }}
          />
        </div>
      </section>
    );
  }

  /* ── fallback ─────────────────────────────────────────── */
  return (
    <section aria-label="About">
      <div className="text-[15px] leading-relaxed" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }} dangerouslySetInnerHTML={{ __html: user.bio_long ?? "" }} />
    </section>
  );
}
