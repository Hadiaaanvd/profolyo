"use client";
import type { SectionProps, Project } from "./types";

const STATUS_LABELS: Record<string, string> = {
  live: "LIVE",
  in_progress: "WIP",
  archived: "ARCHIVED",
};

function ProjectCover({ project, radius }: { project: Project; radius: number }) {
  if (project.cover_image_url) {
    return (
      <img
        src={project.cover_image_url}
        alt={project.title}
        className="w-full h-full object-cover"
        style={{ borderRadius: radius }}
      />
    );
  }
  return (
    <div
      className="w-full h-full"
      style={{
        background: project.cover_color ?? "#e5e5e5",
        borderRadius: radius,
      }}
      aria-hidden="true"
    />
  );
}

export default function ProjectsSection({ portfolio, template, section, accentColor }: SectionProps) {
  const { tokens } = template;
  const opts = (section.options ?? {}) as Record<string, unknown>;
  const layout = section.layout;
  const maxVisible = (opts.max_visible as number) ?? 6;
  const projects = portfolio.projects.slice(0, maxVisible);

  const sectionLabel = "Projects";

  const statusBadge = (status: string) => (
    <span
      className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wide rounded"
      style={{
        background: status === "live"
          ? `color-mix(in srgb, ${accentColor} 12%, transparent)`
          : status === "in_progress"
          ? `color-mix(in srgb, #F59E0B 12%, transparent)`
          : `color-mix(in srgb, ${tokens.ink_muted} 12%, transparent)`,
        color: status === "live" ? accentColor : status === "in_progress" ? "#B45309" : tokens.ink_muted,
      }}
    >
      {STATUS_LABELS[status] ?? status.toUpperCase()}
    </span>
  );

  const techChips = (stack: string[]) => (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((t) => (
        <span
          key={t}
          className="px-2 py-0.5 text-[10px] rounded"
          style={{ background: tokens.surface, color: tokens.ink_muted, border: `1px solid ${tokens.border}` }}
        >
          {t}
        </span>
      ))}
    </div>
  );

  /* ── horizontal-rows (Folio) ─────────────────────────── */
  if (layout === "horizontal-rows") {
    return (
      <section aria-label={sectionLabel}>
        <div className="flex flex-col">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="flex items-start gap-8 py-8"
              style={{ borderTop: `1px solid ${tokens.border}` }}
            >
              {/* Index */}
              <span
                className="text-[11px] shrink-0 mt-1 w-6"
                style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Cover */}
              <div
                className="shrink-0 overflow-hidden"
                style={{ width: 200, height: 130, borderRadius: tokens.radius_image_px }}
              >
                <ProjectCover project={p} radius={tokens.radius_image_px} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3
                    className="font-semibold text-[18px]"
                    style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family, letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.02}em` }}
                  >
                    {p.title}
                  </h3>
                  {!!opts.show_status && statusBadge(p.status)}
                </div>
                {!!opts.show_tagline && (
                  <p className="text-[14px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}>
                    {p.tagline}
                  </p>
                )}
                {p.period && (
                  <p className="text-[12px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                    {p.period}
                  </p>
                )}
                {!!opts.show_tech && techChips(p.tech_stack)}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── asymmetric-tiles (Showcase) ─────────────────────── */
  if (layout === "asymmetric-tiles") {
    return (
      <section aria-label={sectionLabel}>
        <div className="grid grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const isFeatured = i === 0;
            return (
              <article
                key={p.id}
                className={isFeatured ? "col-span-2" : "col-span-1"}
                style={{
                  borderRadius: tokens.radius_card_px,
                  overflow: "hidden",
                  border: `1px solid ${tokens.border}`,
                  background: tokens.surface,
                }}
              >
                <div style={{ height: isFeatured ? 360 : 220, position: "relative", overflow: "hidden" }}>
                  <ProjectCover project={p} radius={0} />
                  <div
                    className="absolute top-3 left-3 flex items-center gap-2"
                    aria-hidden="true"
                  >
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: "white", fontFamily: template.typography.mono.font_family, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {!!opts.show_status && (
                      <span
                        className="px-2 py-0.5 text-[10px] font-semibold rounded"
                        style={{ background: "rgba(0,0,0,0.5)", color: "white", backdropFilter: "blur(4px)" }}
                      >
                        {STATUS_LABELS[p.status]}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h3
                    className="font-bold text-[18px]"
                    style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family, letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.04}em` }}
                  >
                    {p.title}
                  </h3>
                  {!!opts.show_tagline && (
                    <p className="text-[13px]" style={{ color: tokens.ink_muted }}>{p.tagline}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  /* ── code-block-cards (Console) ──────────────────────── */
  if (layout === "code-block-cards") {
    return (
      <section aria-label={sectionLabel}>
        <div className="flex flex-col gap-4">
          {!!opts.ascii_separators && (
            <p
              className="text-[11px]"
              style={{ color: tokens.border, fontFamily: template.typography.mono.font_family }}
              aria-hidden="true"
            >
              {"─".repeat(60)}
            </p>
          )}
          {projects.map((p) => (
            <article
              key={p.id}
              className="p-5 flex flex-col gap-3"
              style={{
                borderRadius: tokens.radius_card_px,
                border: `1px solid ${tokens.border}`,
                background: tokens.surface,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h3
                      className="font-semibold text-[15px]"
                      style={{ color: accentColor, fontFamily: template.typography.heading.font_family }}
                    >
                      {p.title}
                    </h3>
                    {!!opts.show_status && statusBadge(p.status)}
                  </div>
                  {!!opts.show_tagline && (
                    <p className="text-[13px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}>
                      {p.tagline}
                    </p>
                  )}
                </div>
                {p.period && (
                  <span className="text-[11px] shrink-0" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                    {p.period}
                  </span>
                )}
              </div>
              {!!opts.show_tech && p.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {p.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 text-[10px]"
                      style={{ background: tokens.background, color: tokens.ink_muted, fontFamily: template.typography.mono.font_family, borderRadius: tokens.radius_card_px, border: `1px solid ${tokens.border}` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── vertical-cards (Atelier) ────────────────────────── */
  if (layout === "vertical-cards") {
    return (
      <section aria-label={sectionLabel}>
        <div className="flex flex-col gap-6">
          <h2
            className="font-semibold text-[12px] uppercase tracking-widest"
            style={{ color: accentColor, fontFamily: template.typography.mono.font_family }}
          >
            Work
          </h2>
          <div className="flex flex-col gap-4">
            {projects.map((p) => (
              <article
                key={p.id}
                className="flex flex-col gap-0 overflow-hidden"
                style={{
                  borderRadius: tokens.radius_card_px,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.surface,
                }}
              >
                <div style={{ height: 160, overflow: "hidden" }}>
                  <ProjectCover project={p} radius={0} />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <h3
                      className="font-semibold text-[15px]"
                      style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family, letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.02}em` }}
                    >
                      {p.title}
                    </h3>
                    {!!opts.show_status && statusBadge(p.status)}
                  </div>
                  {!!opts.show_tagline && (
                    <p className="text-[12px]" style={{ color: tokens.ink_muted }}>{p.tagline}</p>
                  )}
                  {!!opts.show_tech && techChips(p.tech_stack)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── masonry-grid (Index) ────────────────────────────── */
  if (layout === "masonry-grid") {
    return (
      <section aria-label={sectionLabel}>
        <div className="flex flex-col gap-4">
          {!!opts.filterable && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                className="px-3 py-1 text-[12px] font-medium rounded-full"
                style={{ background: accentColor, color: "white", borderRadius: tokens.radius_button_px }}
              >
                All
              </button>
              {["live", "in_progress", "archived"].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="px-3 py-1 text-[12px] font-medium rounded-full border"
                  style={{ borderColor: tokens.border, color: tokens.ink_muted, borderRadius: tokens.radius_button_px, background: "transparent" }}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          )}
          <div className="columns-3 gap-4">
            {projects.map((p, i) => (
              <article
                key={p.id}
                className="break-inside-avoid mb-4 overflow-hidden"
                style={{ borderRadius: tokens.radius_card_px, border: `1px solid ${tokens.border}`, background: tokens.surface }}
              >
                <div style={{ height: i % 2 === 0 ? 200 : 140, overflow: "hidden" }}>
                  <ProjectCover project={p} radius={0} />
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-[13px]" style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}>
                      {p.title}
                    </h3>
                    {!!opts.show_status && statusBadge(p.status)}
                  </div>
                  {!!opts.show_tagline && (
                    <p className="text-[12px]" style={{ color: tokens.ink_muted }}>{p.tagline}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── featured-plus-grid (Quartz) ─────────────────────── */
  if (layout === "featured-plus-grid") {
    const featuredIndex = (opts.featured_index as number) ?? 0;
    const featured = projects[featuredIndex];
    const rest = projects.filter((_, i) => i !== featuredIndex);
    return (
      <section aria-label={sectionLabel}>
        <div className="flex flex-col gap-6">
          {featured && (
            <article
              className="overflow-hidden"
              style={{ borderRadius: tokens.radius_card_px, border: `1px solid ${tokens.border}`, background: tokens.surface }}
            >
              <div style={{ height: 320, overflow: "hidden" }}>
                <ProjectCover project={featured} radius={0} />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h3
                    className="font-semibold text-[22px]"
                    style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family, letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.025}em` }}
                  >
                    {featured.title}
                  </h3>
                  {!!opts.show_status && statusBadge(featured.status)}
                </div>
                {!!opts.show_tagline && (
                  <p className="text-[15px]" style={{ color: tokens.ink_muted }}>{featured.tagline}</p>
                )}
                {!!opts.show_tech && techChips(featured.tech_stack)}
              </div>
            </article>
          )}
          <div className="grid grid-cols-3 gap-4">
            {rest.map((p) => (
              <article
                key={p.id}
                className="overflow-hidden"
                style={{ borderRadius: tokens.radius_card_px, border: `1px solid ${tokens.border}`, background: tokens.surface }}
              >
                <div style={{ height: 140, overflow: "hidden" }}>
                  <ProjectCover project={p} radius={0} />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[14px]" style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}>
                      {p.title}
                    </h3>
                    {!!opts.show_status && statusBadge(p.status)}
                  </div>
                  {!!opts.show_tagline && <p className="text-[12px]" style={{ color: tokens.ink_muted }}>{p.tagline}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── feature-rows (Press) ───────────────────────────── */
  if (layout === "feature-rows") {
    return (
      <section aria-label={sectionLabel}>
        <div className="flex flex-col gap-0">
          {/* Section label — newspaper style */}
          <div
            className="flex items-center gap-3 pb-3 mb-6"
            style={{ borderBottom: `2px solid ${tokens.ink}` }}
          >
            <h2
              className="font-bold text-[11px] tracking-[0.15em] uppercase"
              style={{ color: tokens.ink, fontFamily: template.typography.mono.font_family }}
            >
              Selected Work
            </h2>
          </div>
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="grid gap-6 py-6"
              style={{
                gridTemplateColumns: "1fr 2fr",
                borderBottom: `1px solid ${tokens.border}`,
              }}
            >
              {/* Left: cover + meta */}
              <div className="flex flex-col gap-3">
                <div style={{ height: 140, overflow: "hidden", borderRadius: tokens.radius_image_px }}>
                  <ProjectCover project={p} radius={tokens.radius_image_px} />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {!!opts.show_status && statusBadge(p.status)}
                  {p.period && (
                    <span className="text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                      {p.period}
                    </span>
                  )}
                </div>
              </div>
              {/* Right: headline + body */}
              <div className="flex flex-col gap-3 pt-1">
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-bold leading-tight"
                    style={{
                      fontFamily: template.typography.heading.font_family,
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.02}em`,
                      color: tokens.ink,
                    }}
                  >
                    {p.title}
                  </h3>
                </div>
                {!!opts.show_tagline && (
                  <p
                    className="text-[14px] leading-relaxed font-semibold"
                    style={{ color: tokens.ink, fontFamily: template.typography.body.font_family }}
                  >
                    {p.tagline}
                  </p>
                )}
                {p.description && (
                  <div
                    className="text-[13px] leading-relaxed"
                    style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
                    dangerouslySetInnerHTML={{ __html: p.description }}
                  />
                )}
                {!!opts.show_tech && p.tech_stack.length > 0 && (
                  <p className="text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                    {p.tech_stack.join(" · ")}
                  </p>
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
      <section aria-label={sectionLabel}>
        <div className="flex flex-col gap-0">
          {/* Section heading */}
          <div
            className="flex items-center gap-2 pb-1 mb-1"
            style={{ borderBottom: `1px solid ${tokens.ink}` }}
          >
            <h2
              className="font-bold text-[11px] tracking-[0.1em] uppercase"
              style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}
            >
              Projects
            </h2>
          </div>
          {projects.map((p) => (
            <article
              key={p.id}
              className="grid items-baseline py-2 gap-3"
              style={{
                gridTemplateColumns: "1fr auto",
                borderBottom: `1px solid ${tokens.border}`,
              }}
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className="font-semibold text-[13px]"
                    style={{ color: tokens.ink, fontFamily: template.typography.heading.font_family }}
                  >
                    {p.title}
                  </h3>
                  {!!opts.show_status && statusBadge(p.status)}
                  {p.role && (
                    <span className="text-[11px]" style={{ color: tokens.ink_muted }}>· {p.role}</span>
                  )}
                </div>
                {!!opts.show_tech && p.tech_stack.length > 0 && (
                  <p className="text-[11px]" style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}>
                    {p.tech_stack.join(", ")}
                  </p>
                )}
              </div>
              {p.period && (
                <span
                  className="text-[11px] shrink-0"
                  style={{ color: tokens.ink_muted, fontFamily: template.typography.mono.font_family }}
                >
                  {p.period}
                </span>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── story-sections (Story) ──────────────────────────── */
  if (layout === "story-sections") {
    return (
      <section aria-label={sectionLabel}>
        <div className="flex flex-col" style={{ gap: template.layout.section_gap_px }}>
          {projects.map((p, i) => (
            <article key={p.id} className="flex flex-col gap-8">
              {/* Full-width cover */}
              <div
                className="w-full overflow-hidden"
                style={{
                  height: "clamp(240px, 40vw, 480px)" as string,
                  borderRadius: tokens.radius_image_px,
                  marginLeft: `-${template.layout.page_padding_x_px}px`,
                  width: `calc(100% + ${template.layout.page_padding_x_px * 2}px)`,
                }}
              >
                <ProjectCover project={p} radius={0} />
              </div>

              {/* Content row */}
              <div className="grid gap-8" style={{ gridTemplateColumns: "auto 1fr" }}>
                {/* Index number */}
                <span
                  className="font-bold tabular-nums"
                  style={{
                    fontFamily: template.typography.mono.font_family,
                    fontSize: "clamp(40px, 5vw, 64px)",
                    color: tokens.border,
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3
                      className="font-extrabold leading-none"
                      style={{
                        fontFamily: template.typography.heading.font_family,
                        fontSize: "clamp(28px, 4vw, 48px)",
                        letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.035}em`,
                        color: tokens.ink,
                      }}
                    >
                      {p.title}
                    </h3>
                    {!!opts.show_status && statusBadge(p.status)}
                  </div>
                  <p
                    className="text-[16px] leading-relaxed font-medium"
                    style={{ color: tokens.ink_muted, fontFamily: template.typography.body.font_family }}
                  >
                    {p.tagline}
                  </p>
                  {p.description && (
                    <div className="text-[14px] leading-relaxed" style={{ color: tokens.ink_muted }} dangerouslySetInnerHTML={{ __html: p.description }} />
                  )}
                  <div className="flex items-center gap-4 flex-wrap text-[12px]" style={{ color: tokens.ink_muted }}>
                    {p.role && <span>{p.role}</span>}
                    {p.period && <span style={{ fontFamily: template.typography.mono.font_family }}>{p.period}</span>}
                    {p.team && <span>{p.team}</span>}
                  </div>
                  {!!opts.show_tech && p.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {p.tech_stack.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[11px]"
                          style={{
                            border: `1px solid ${tokens.border}`,
                            borderRadius: tokens.radius_button_px,
                            color: tokens.ink_muted,
                            fontFamily: template.typography.mono.font_family,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── gallery (Cover) ─────────────────────────────────── */
  if (layout === "gallery") {
    // Alternating: large (2/3) + small (1/3) pairs
    return (
      <section aria-label={sectionLabel}>
        <div className="flex flex-col gap-2">
          {/* Pair projects into rows of 2 */}
          {Array.from({ length: Math.ceil(projects.length / 2) }, (_, rowIdx) => {
            const a = projects[rowIdx * 2];
            const b = projects[rowIdx * 2 + 1];
            const flip = rowIdx % 2 === 1;
            return (
              <div
                key={rowIdx}
                className="flex gap-2"
                style={{ flexDirection: flip ? "row-reverse" : "row" }}
              >
                {/* Large tile */}
                {a && (
                  <article className="relative overflow-hidden group" style={{ flex: "2 0 0" }}>
                    <div style={{ height: 420, overflow: "hidden" }}>
                      <ProjectCover project={a} radius={0} />
                    </div>
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)" }}
                    >
                      <h3
                        className="font-medium text-[20px]"
                        style={{ color: "#FAFAF7", fontFamily: template.typography.heading.font_family, letterSpacing: `${template.typography.heading.letter_spacing_em ?? -0.03}em` }}
                      >
                        {a.title}
                      </h3>
                      <p className="text-[13px]" style={{ color: "rgba(250,250,247,0.7)" }}>{a.tagline}</p>
                    </div>
                  </article>
                )}
                {/* Small tile */}
                {b && (
                  <article className="relative overflow-hidden group" style={{ flex: "1 0 0" }}>
                    <div style={{ height: 420, overflow: "hidden" }}>
                      <ProjectCover project={b} radius={0} />
                    </div>
                    <div
                      className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)" }}
                    >
                      <h3
                        className="font-medium text-[18px]"
                        style={{ color: "#FAFAF7", fontFamily: template.typography.heading.font_family }}
                      >
                        {b.title}
                      </h3>
                      <p className="text-[12px]" style={{ color: "rgba(250,250,247,0.7)" }}>{b.tagline}</p>
                    </div>
                  </article>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  /* ── fallback ─────────────────────────────────────────── */
  return (
    <section aria-label={sectionLabel}>
      <div className="flex flex-col gap-4">
        {projects.map((p) => (
          <article key={p.id} className="flex flex-col gap-1">
            <h3 className="font-semibold text-[16px]" style={{ color: tokens.ink }}>{p.title}</h3>
            <p className="text-[14px]" style={{ color: tokens.ink_muted }}>{p.tagline}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
