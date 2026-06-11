"use client";
import type { SectionProps } from "./types";

export default function HeroSection({ portfolio, template, section, accentColor }: SectionProps) {
  const { user } = portfolio;
  const { tokens } = template;
  const opts = (section.options ?? {}) as Record<string, unknown>;
  const layout = section.layout;

  const availabilityPill = !!opts.show_availability_pill && user.available && (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-full border"
      style={{
        borderColor: accentColor,
        color: accentColor,
        background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: accentColor }}
      />
      {user.availability_text ?? "Available for work"}
    </span>
  );

  const avatar = user.avatar_url ? (
    <img
      src={user.avatar_url}
      alt={user.name}
      className="rounded-full object-cover"
      style={{ width: 64, height: 64, borderRadius: tokens.radius_image_px }}
    />
  ) : (
    <div
      className="flex items-center justify-center text-[22px] font-bold"
      style={{
        width: 64,
        height: 64,
        borderRadius: tokens.radius_image_px,
        background: `color-mix(in srgb, ${accentColor} 15%, ${tokens.surface})`,
        color: accentColor,
      }}
    >
      {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
    </div>
  );

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

  /* ── stacked-large (Folio) ───────────────────────────── */
  if (layout === "stacked-large") {
    return (
      <section aria-label="Hero">
        <div className="flex flex-col gap-6">
          {availabilityPill}
          <h1
            className="font-bold leading-none"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(48px, 6vw, 80px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.025}em`,
              color: tokens.ink,
            }}
          >
            {user.name}
          </h1>
          <p
            className="text-[18px] leading-snug max-w-xl"
            style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
          >
            {user.headline}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[13px]" style={{ color: tokens.ink_muted }}>{user.location}</span>
            <span style={{ color: tokens.border }}>·</span>
            <a
              href={`mailto:${user.email}`}
              className="text-[13px] underline underline-offset-2"
              style={{ color: tokens.ink_muted }}
            >
              {user.email}
            </a>
          </div>
          {user.social.length > 0 && (
            <div className="flex items-center gap-4 flex-wrap">{socials}</div>
          )}
        </div>
      </section>
    );
  }

  /* ── asymmetric-mega (Showcase) ──────────────────────── */
  if (layout === "asymmetric-mega") {
    const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
    return (
      <section aria-label="Hero" className="relative overflow-hidden">
        {/* accent color bar */}
        {!!opts.accent_block && (
          <div
            className="absolute top-0 right-0 w-2 h-full"
            style={{ background: accentColor }}
            aria-hidden="true"
          />
        )}
        <div className="flex flex-col gap-8 pr-8">
          <div className="flex items-start justify-between gap-4">
            {availabilityPill}
            {!!opts.show_avatar && (
              <div
                className="flex items-center justify-center shrink-0 text-[32px] font-bold"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: tokens.radius_card_px,
                  background: `color-mix(in srgb, ${accentColor} 12%, ${tokens.surface})`,
                  color: accentColor,
                  fontFamily: template.typography.heading.font_family,
                }}
              >
                {initials}
              </div>
            )}
          </div>
          <h1
            className="font-extrabold leading-none"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(56px, 8vw, 112px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.04}em`,
              color: tokens.ink,
              lineHeight: template.typography.heading.line_height,
            }}
          >
            {user.name}
          </h1>
          <p
            className="text-[20px] font-medium max-w-2xl"
            style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
          >
            {user.headline}
          </p>
          <div className="flex items-center gap-4 flex-wrap text-[13px]" style={{ color: tokens.ink_muted }}>
            <span>{user.location}</span>
            {user.pronouns && <><span style={{ color: tokens.border }}>·</span><span>{user.pronouns}</span></>}
            <span style={{ color: tokens.border }}>·</span>
            <a href={`mailto:${user.email}`} className="underline underline-offset-2" style={{ color: accentColor }}>
              {user.email}
            </a>
          </div>
        </div>
      </section>
    );
  }

  /* ── terminal-prompt (Console) ───────────────────────── */
  if (layout === "terminal-prompt") {
    const prefix = (opts.command_prefix as string) ?? "~/";
    return (
      <section aria-label="Hero">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-[13px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
              {prefix}whoami
            </p>
            <h1
              className="font-semibold"
              style={{
                fontFamily: template.typography.heading.font_family,
                fontSize: "clamp(28px, 4vw, 48px)",
                letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.005}em`,
                color: tokens.ink,
                lineHeight: template.typography.heading.line_height,
              }}
            >
              {user.name}
              {!!opts.show_cursor_blink && (
                <span
                  className="inline-block w-[3px] h-[0.85em] ml-1 align-middle animate-pulse"
                  style={{ background: accentColor }}
                  aria-hidden="true"
                />
              )}
            </h1>
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}>
            {user.headline}
          </p>
          {availabilityPill}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[12px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
              {user.location}
            </span>
            <span style={{ color: tokens.border }}>·</span>
            <a
              href={`mailto:${user.email}`}
              className="text-[12px] underline underline-offset-2"
              style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}
            >
              {user.email}
            </a>
          </div>
        </div>
      </section>
    );
  }

  /* ── sidebar-bio (Atelier) — rendered inside sticky sidebar, not here ── */
  if (layout === "sidebar-bio") {
    return (
      <div className="flex flex-col gap-6 h-full">
        {!!opts.show_avatar && (
          <div>
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                className="object-cover"
                style={{ width: 56, height: 56, borderRadius: tokens.radius_image_px }}
              />
            ) : (
              <div
                className="flex items-center justify-center text-[18px] font-bold"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: tokens.radius_image_px,
                  background: `color-mix(in srgb, ${accentColor} 15%, ${tokens.surface})`,
                  color: accentColor,
                }}
              >
                {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h1
            className="font-semibold leading-tight"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(20px, 2.5vw, 28px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.02}em`,
              color: tokens.ink,
            }}
          >
            {user.name}
          </h1>
          <p className="text-[13px] leading-snug" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}>
            {user.headline}
          </p>
        </div>
        {availabilityPill}
        <p className="text-[13px] leading-relaxed" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}>
          {user.bio}
        </p>
        <div className="flex flex-col gap-2 text-[12px]" style={{ color: tokens.ink_muted }}>
          <span>{user.location}</span>
          <a href={`mailto:${user.email}`} className="underline underline-offset-2" style={{ color: accentColor }}>
            {user.email}
          </a>
        </div>
        {!!opts.show_socials && user.social.length > 0 && (
          <div className="flex flex-col gap-2 mt-auto">{socials}</div>
        )}
      </div>
    );
  }

  /* ── compact-strip (Index) ───────────────────────────── */
  if (layout === "compact-strip") {
    return (
      <section aria-label="Hero">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-4">
            {!!opts.show_avatar && avatar}
            <div className="flex flex-col gap-1">
              <h1
                className="font-bold leading-tight"
                style={{
                  fontFamily: template.typography.heading.font_family,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.02}em`,
                  color: tokens.ink,
                }}
              >
                {user.name}
              </h1>
              <p className="text-[13px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}>
                {user.headline}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {availabilityPill}
            {!!opts.show_socials && <div className="flex items-center gap-3 flex-wrap">{socials}</div>}
          </div>
        </div>
      </section>
    );
  }

  /* ── centered-confident (Quartz) ─────────────────────── */
  if (layout === "centered-confident") {
    return (
      <section aria-label="Hero" className="text-center">
        <div className="flex flex-col items-center gap-6">
          {availabilityPill}
          <h1
            className="font-semibold leading-tight"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(40px, 5vw, 72px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.025}em`,
              color: tokens.ink,
            }}
          >
            {user.name}
          </h1>
          <p
            className="text-[18px] max-w-xl mx-auto leading-relaxed"
            style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
          >
            {user.headline}
          </p>
          {!!opts.show_meta_strip && (
            <div
              className="flex items-center gap-4 text-[11px] flex-wrap justify-center"
              style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
            >
              <span>{user.location}</span>
              <span style={{ color: tokens.border }}>·</span>
              {user.pronouns && <><span>{user.pronouns}</span><span style={{ color: tokens.border }}>·</span></>}
              <a href={`mailto:${user.email}`} className="underline underline-offset-2" style={{ color: accentColor }}>
                {user.email}
              </a>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ── masthead (Press) ────────────────────────────────── */
  if (layout === "masthead") {
    return (
      <section aria-label="Hero">
        {/* Newspaper nameplate */}
        <div
          className="flex flex-col items-center text-center gap-0 pb-6"
          style={{ borderBottom: `3px double ${tokens.border}` }}
        >
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-3"
            style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
          >
            {user.location} · {new Date().getFullYear()}
          </p>
          <h1
            className="font-bold leading-none"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(52px, 7vw, 96px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.02}em`,
              color: tokens.ink,
            }}
          >
            {user.name}
          </h1>
          <div
            className="w-full my-3"
            style={{ borderTop: `1px solid ${tokens.border}`, borderBottom: `1px solid ${tokens.border}`, padding: "6px 0" }}
          >
            <p
              className="text-[13px] tracking-[0.08em] uppercase"
              style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
            >
              {user.headline}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
            <a href={`mailto:${user.email}`} style={{ color: accentColor }} className="underline underline-offset-2">{user.email}</a>
            <span style={{ color: tokens.border }}>|</span>
            {user.social.map((s, i) => (
              <span key={s.type}>
                {i > 0 && <span style={{ color: tokens.border }} className="mr-4">|</span>}
                <a href={s.url} className="underline underline-offset-2" style={{ color: tokens.ink_muted }} target="_blank" rel="noopener noreferrer">
                  {s.label ?? s.type}
                </a>
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── compact-header (Linear) ─────────────────────────── */
  if (layout === "compact-header") {
    return (
      <section aria-label="Hero">
        <div className="flex items-end justify-between gap-6 pb-4" style={{ borderBottom: `2px solid ${tokens.ink}` }}>
          <div className="flex flex-col gap-1">
            <h1
              className="font-bold leading-none"
              style={{
                fontFamily: template.typography.heading.font_family,
                fontSize: "clamp(26px, 3vw, 36px)",
                letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.01}em`,
                color: tokens.ink,
              }}
            >
              {user.name}
            </h1>
            <p className="text-[13px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}>
              {user.headline}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0 text-right">
            <a href={`mailto:${user.email}`} className="text-[12px] underline underline-offset-2" style={{ color: accentColor }}>
              {user.email}
            </a>
            <div className="flex items-center gap-3 flex-wrap justify-end">
              <span className="text-[11px]" style={{ color: tokens.ink_muted }}>{user.location}</span>
              {user.social.slice(0, 3).map((s) => (
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
      </section>
    );
  }

  /* ── fullscreen-intro (Story) ────────────────────────── */
  if (layout === "fullscreen-intro") {
    return (
      <section
        aria-label="Hero"
        className="relative flex flex-col justify-end"
        style={{
          minHeight: "100vh",
          padding: `${template.layout.page_padding_y_px + 96}px ${template.layout.page_padding_x_px}px 80px`,
        }}
      >
        {/* Thin accent rule at top */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accentColor }} aria-hidden="true" />

        <div className="flex flex-col gap-6 max-w-4xl">
          {availabilityPill}
          <h1
            className="font-extrabold leading-none"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(64px, 9vw, 128px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.035}em`,
              color: tokens.ink,
              lineHeight: template.typography.heading.line_height,
            }}
          >
            {user.name}
          </h1>
          <p
            className="text-[20px] leading-snug max-w-2xl"
            style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
          >
            {user.headline}
          </p>
          <div className="flex items-center gap-6 flex-wrap text-[13px]" style={{ color: tokens.ink_muted }}>
            <span>{user.location}</span>
            {user.pronouns && <span>{user.pronouns}</span>}
            <a href={`mailto:${user.email}`} className="underline underline-offset-2" style={{ color: accentColor }}>
              {user.email}
            </a>
          </div>
        </div>

        {/* Scroll nudge */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${tokens.border}, transparent)` }} />
        </div>
      </section>
    );
  }

  /* ── fullbleed-photo (Cover) ─────────────────────────── */
  if (layout === "fullbleed-photo") {
    return (
      <section
        aria-label="Hero"
        className="relative flex flex-col justify-end"
        style={{ minHeight: "100vh", overflow: "hidden" }}
      >
        {/* Background — cover image or ink surface */}
        <div
          className="absolute inset-0"
          style={{
            background: user.cover_image_url
              ? `url(${user.cover_image_url}) center/cover no-repeat`
              : `linear-gradient(160deg, ${tokens.surface} 0%, ${tokens.background} 100%)`,
          }}
          aria-hidden="true"
        />
        {/* Dark scrim at bottom for legibility */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)" }}
          aria-hidden="true"
        />

        {/* Text over image */}
        <div
          className="relative z-10 flex flex-col gap-4 px-10 pb-16"
        >
          <h1
            className="font-medium leading-tight"
            style={{
              fontFamily: template.typography.heading.font_family,
              fontSize: "clamp(40px, 6vw, 80px)",
              letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.03}em`,
              color: "#FAFAF7",
            }}
          >
            {user.name}
          </h1>
          <p className="text-[16px]" style={{ color: "rgba(250,250,247,0.7)", fontFamily: template.typography.body.font_family }}>
            {user.headline}
          </p>
          {user.available && (
            <span
              className="self-start inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-full border"
              style={{ borderColor: "rgba(250,250,247,0.3)", color: "rgba(250,250,247,0.8)", background: "rgba(250,250,247,0.1)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
              {user.availability_text ?? "Available for work"}
            </span>
          )}
        </div>
      </section>
    );
  }

  /* ── fallback ─────────────────────────────────────────── */
  return (
    <section aria-label="Hero">
      <div className="flex flex-col gap-4">
        {availabilityPill}
        <h1
          className="font-bold"
          style={{
            fontFamily: template.typography.heading.font_family,
            fontSize: "clamp(32px, 4vw, 56px)",
            color: tokens.ink,
          }}
        >
          {user.name}
        </h1>
        <p className="text-[16px]" style={{ color: tokens.ink_muted }}>{user.headline}</p>
        <p className="text-[13px]" style={{ color: tokens.ink_muted }}>{user.location}</p>
      </div>
    </section>
  );
}
