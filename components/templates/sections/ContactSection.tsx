"use client";
import type { SectionProps } from "./types";

export default function ContactSection({ portfolio, template, section, accentColor }: SectionProps) {
  const { user } = portfolio;
  const { tokens } = template;
  const opts = (section.options ?? {}) as Record<string, unknown>;
  const layout = section.layout;

  const socials = user.social.map((s) => (
    <a
      key={s.type}
      href={s.url}
      className="text-[12px] underline underline-offset-2 transition-opacity hover:opacity-70"
      style={{ color: tokens.ink_muted }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {s.label ?? s.type}
    </a>
  ));

  /* ── large-cta (Folio) ───────────────────────────────── */
  if (layout === "large-cta") {
    return (
      <footer aria-label="Contact">
        <div className="flex flex-col gap-6" style={{ borderTop: `1px solid ${tokens.border}`, paddingTop: 48 }}>
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(32px, 4vw, 56px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.025}em`,
              color: tokens.ink,
            }}
          >
            Let's work together.
          </h2>
          <a
            href={`mailto:${user.email}`}
            className="text-[18px] underline underline-offset-4"
            style={{ color: accentColor }}
          >
            {user.email}
          </a>
          {!!opts.show_socials && user.social.length > 0 && (
            <div className="flex items-center gap-4 flex-wrap">{socials}</div>
          )}
        </div>
      </footer>
    );
  }

  /* ── fullbleed-cta (Showcase) ────────────────────────── */
  if (layout === "fullbleed-cta") {
    return (
      <footer
        aria-label="Contact"
        className="w-full"
        style={{
          background: opts.background === "accent" ? accentColor : tokens.surface,
          padding: "80px 40px",
          marginLeft: "calc(-1 * var(--page-padding-x, 40px))",
          width: "calc(100% + 2 * var(--page-padding-x, 40px))",
        }}
      >
        <div className="flex flex-col gap-6 items-start max-w-2xl">
          <h2
            className="font-extrabold leading-tight"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.04}em`,
              color: opts.background === "accent" ? "white" : tokens.ink,
            }}
          >
            Let's work together.
          </h2>
          <a
            href={`mailto:${user.email}`}
            className="inline-flex items-center px-6 py-3 font-semibold text-[14px] transition-opacity hover:opacity-80"
            style={{
              background: opts.background === "accent" ? "white" : accentColor,
              color: opts.background === "accent" ? accentColor : "white",
              borderRadius: tokens.radius_button_px,
            }}
          >
            {user.email} →
          </a>
          {user.social.length > 0 && (
            <div className="flex items-center gap-4 flex-wrap">
              {user.social.map((s) => (
                <a
                  key={s.type}
                  href={s.url}
                  className="text-[12px] underline underline-offset-2 hover:opacity-70"
                  style={{ color: opts.background === "accent" ? "rgba(255,255,255,0.8)" : tokens.ink_muted }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label ?? s.type}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    );
  }

  /* ── command-list (Console) ──────────────────────────── */
  if (layout === "command-list") {
    return (
      <footer aria-label="Contact">
        <div className="flex flex-col gap-4">
          <p
            className="text-[13px]"
            style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
          >
            ~/contact
          </p>
          <div
            className="p-5 flex flex-col gap-3"
            style={{ borderRadius: tokens.radius_card_px, border: `1px solid ${tokens.border}`, background: tokens.surface }}
          >
            <div className="flex items-center gap-3">
              <span className="text-[12px]" style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}>email</span>
              <a href={`mailto:${user.email}`} className="text-[13px] underline underline-offset-2" style={{ color: tokens.ink, fontFamily: template.typography.mono.font_family }}>
                {user.email}
              </a>
            </div>
            {user.social.map((s) => (
              <div key={s.type} className="flex items-center gap-3">
                <span className="text-[12px]" style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}>{s.type}</span>
                <a href={s.url} className="text-[13px] underline underline-offset-2" style={{ color: tokens.ink, fontFamily: template.typography.mono.font_family }} target="_blank" rel="noopener noreferrer">
                  {s.label ?? s.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  /* ── inline-list (Atelier, Index) ────────────────────── */
  if (layout === "inline-list") {
    return (
      <footer aria-label="Contact">
        <div className="flex flex-col gap-3" style={{ borderTop: `1px solid ${tokens.border}`, paddingTop: 32 }}>
          <h2
            className="font-semibold text-[12px] uppercase tracking-widest"
            style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}
          >
            Contact
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            <a href={`mailto:${user.email}`} className="text-[13px] underline underline-offset-2" style={{ color: tokens.ink }}>
              {user.email}
            </a>
            {user.social.length > 0 && (
              <><span style={{ color: tokens.border }}>·</span><div className="flex items-center gap-3 flex-wrap">{socials}</div></>
            )}
          </div>
        </div>
      </footer>
    );
  }

  /* ── centered-cta (Quartz) ───────────────────────────── */
  if (layout === "centered-cta") {
    return (
      <footer aria-label="Contact" className="text-center">
        <div className="flex flex-col items-center gap-5" style={{ borderTop: `1px solid ${tokens.border}`, paddingTop: 64 }}>
          <h2
            className="font-semibold leading-tight"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.025}em`,
              color: tokens.ink,
            }}
          >
            Get in touch
          </h2>
          <a
            href={`mailto:${user.email}`}
            className="inline-flex items-center px-6 py-3 font-medium text-[14px] transition-opacity hover:opacity-80"
            style={{
              background: accentColor,
              color: "white",
              borderRadius: tokens.radius_button_px,
            }}
          >
            {user.email}
          </a>
          {user.social.length > 0 && (
            <div className="flex items-center gap-4 flex-wrap justify-center">{socials}</div>
          )}
        </div>
      </footer>
    );
  }

  /* ── byline (Press) ─────────────────────────────────── */
  if (layout === "byline") {
    return (
      <footer aria-label="Contact">
        <div
          className="flex items-start justify-between gap-8 py-6"
          style={{ borderTop: `2px solid ${tokens.ink}`, borderBottom: `1px solid ${tokens.border}` }}
        >
          {/* Left — name + headline as byline */}
          <div className="flex flex-col gap-1">
            <p
              className="text-[11px] tracking-[0.12em] uppercase"
              style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
            >
              About the author
            </p>
            <p
              className="font-bold text-[18px]"
              style={{
                fontFamily: template.typography.heading.font_family,
                color: tokens.ink,
                letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.02}em`,
              }}
            >
              {user.name}
            </p>
            <p className="text-[13px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}>
              {user.headline} · {user.location}
            </p>
          </div>

          {/* Right — contact details */}
          <div className="flex flex-col items-end gap-2 text-right">
            <a
              href={`mailto:${user.email}`}
              className="text-[13px] underline underline-offset-2"
              style={{ color: accentColor }}
            >
              {user.email}
            </a>
            <div className="flex items-center gap-3 flex-wrap justify-end">
              {user.social.map((s) => (
                <a
                  key={s.type}
                  href={s.url}
                  className="text-[11px] underline underline-offset-2"
                  style={{ color: tokens.ink_muted }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label ?? s.type}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  /* ── footer-line (Linear) ────────────────────────────── */
  if (layout === "footer-line") {
    return (
      <footer aria-label="Contact">
        <div
          className="flex items-center justify-between gap-6 flex-wrap pt-3"
          style={{ borderTop: `1px solid ${tokens.ink}` }}
        >
          <div className="flex items-center gap-4 flex-wrap text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
            <a href={`mailto:${user.email}`} className="underline underline-offset-2" style={{ color: accentColor }}>
              {user.email}
            </a>
            <span style={{ color: tokens.border }}>·</span>
            <span>{user.location}</span>
          </div>
          {user.social.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              {user.social.map((s) => (
                <a
                  key={s.type}
                  href={s.url}
                  className="text-[11px] underline underline-offset-2"
                  style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label ?? s.type}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    );
  }

  /* ── fallback ─────────────────────────────────────────── */
  return (
    <footer aria-label="Contact">
      <div className="flex flex-col gap-3" style={{ borderTop: `1px solid ${tokens.border}`, paddingTop: 24 }}>
        <a href={`mailto:${user.email}`} className="text-[14px] underline underline-offset-2" style={{ color: accentColor }}>
          {user.email}
        </a>
      </div>
    </footer>
  );
}
