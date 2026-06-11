"use client";
import React from "react";
import type { Portfolio, SectionConfig } from "@/types/portfolio";
import { sectionVisible, sectionLabel, orderedBuiltInTypes, customSections, COVER_COLOR_FALLBACK, PUBLICATION_TYPE_LABEL } from "../utils";
import { useIsMobile } from "../hooks";

interface Props { portfolio: Portfolio; accent: string; sections: SectionConfig[]; headingFont?: string; bodyFont?: string; }

const STATUS_MAP: Record<string, [string, string, string]> = {
  live:        ["#E8F8EE", "#14532D", "Live"],
  in_progress: ["#FEF3C7", "#7C2D12", "In progress"],
  archived:    ["#EFEEE6", "#54514A", "Archived"],
};

// Colors for timeline node types (fixed — not accent)
const TIMELINE_ROLE_COLOR      = "#6366F1"; // indigo — roles/experience
const TIMELINE_PROJECT_COLOR   = "rgb(194,65,12)"; // orange-700 — projects
const TIMELINE_EDUCATION_COLOR = "rgb(124,90,255)"; // violet — education
const TIMELINE_AWARD_COLOR     = "rgb(180,83,9)"; // amber-700 — awards

type TimelineItemType = "role" | "project" | "education" | "award";

interface TimelineItem {
  id: string;
  kind: TimelineItemType;
  title: string;
  subtitle: string;
  period?: string;
  description?: string;
  coverColor?: string;
  coverImage?: string;
  tags?: string[];
}

export default function TimelineTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const {
    user,
    projects,
    experience,
    education,
    skills,
    publications   = [],
    testimonials   = [],
    awards         = [],
    certifications = [],
    languages      = [],
    volunteer      = [],
  } = portfolio;

  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body    = bodyFont    ?? "'Inter', sans-serif";
  const mono    = "'JetBrains Mono', monospace";

  const bg       = "rgb(251, 251, 249)";
  const ink      = "rgb(22, 32, 30)";
  const muted    = "rgb(95, 107, 104)";
  const dim      = "rgb(154, 163, 160)";
  const border   = "rgb(230, 232, 228)";
  const surface  = "#FFFFFF";

  const m = useIsMobile();

  const ordered = orderedBuiltInTypes(sections);

  // ── Build merged timeline items from visible timeline-type sections ──
  const timelineTypes = new Set(["projects", "experience", "education", "awards"]);

  const timelineItems: TimelineItem[] = [];

  for (const type of ordered) {
    if (!timelineTypes.has(type)) continue;
    switch (type) {
      case "experience":
        experience.forEach(e => {
          timelineItems.push({
            id: `exp-${e.id}`,
            kind: "role",
            title: e.title,
            subtitle: e.company,
            period: e.period,
            description: e.description,
          });
        });
        break;
      case "projects":
        projects.forEach(p => {
          timelineItems.push({
            id: `proj-${p.id}`,
            kind: "project",
            title: p.title,
            subtitle: p.tagline,
            period: p.period,
            coverColor: p.cover_color,
            coverImage: p.cover_image_url ?? undefined,
            tags: p.tech_stack,
          });
        });
        break;
      case "education":
        education.forEach(ed => {
          timelineItems.push({
            id: `edu-${ed.id}`,
            kind: "education",
            title: ed.degree,
            subtitle: ed.institution,
            period: ed.period,
            description: ed.description,
          });
        });
        break;
      case "awards":
        awards.forEach(a => {
          timelineItems.push({
            id: `award-${a.id}`,
            kind: "award",
            title: a.title,
            subtitle: a.issuer,
            period: String(a.year),
            description: a.summary,
          });
        });
        break;
    }
  }

  const nodeColor = (kind: TimelineItemType): string => {
    switch (kind) {
      case "role":      return accent;
      case "project":   return TIMELINE_PROJECT_COLOR;
      case "education": return TIMELINE_EDUCATION_COLOR;
      case "award":     return TIMELINE_AWARD_COLOR;
    }
  };

  const kindLabel = (kind: TimelineItemType): string => {
    switch (kind) {
      case "role":      return "Role";
      case "project":   return "Project";
      case "education": return "Education";
      case "award":     return "Award";
    }
  };

  // ── Timeline card ──
  const TimelineCard = ({ item, side }: { item: TimelineItem; side: "left" | "right" }) => {
    const hasCover = !!(item.coverImage || (item.kind === "project" && item.coverColor));
    const coverStyle: React.CSSProperties = item.coverImage
      ? { background: `url(${item.coverImage}) center/cover` }
      : { background: item.coverColor ?? COVER_COLOR_FALLBACK };

    return (
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: side === "left" ? "flex-end" : "flex-start",
          background: surface,
          border: `1px solid ${border}`,
          borderRadius: 14,
          overflow: "hidden",
          textAlign: "left",
          maxWidth: m ? "100%" : 420,
          width: "100%",
          boxShadow: "rgba(15,20,18,0.04) 0px 1px 2px, rgba(15,20,18,0.18) 0px 8px 24px -16px",
        }}
      >
        {hasCover && (
          <div style={{ width: "100%", height: 116, ...coverStyle }} />
        )}
        <div style={{ padding: "16px 18px 18px", width: "100%" }}>
          {/* Type + period row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, justifyContent: side === "left" ? "flex-end" : "flex-start" }}>
            <span style={{ fontFamily: mono, fontSize: 10, color: nodeColor(item.kind), letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
              {kindLabel(item.kind)}
            </span>
            {item.period && (
              <>
                <span style={{ width: 3, height: 3, borderRadius: 999, background: dim }} />
                <span style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.06em" }}>{item.period}</span>
              </>
            )}
          </div>
          <div style={{ fontFamily: display, fontWeight: 600, fontSize: 19, letterSpacing: "-0.015em", color: ink, lineHeight: 1.18, marginBottom: 3 }}>{item.title}</div>
          <div style={{ fontSize: 14, color: muted, lineHeight: 1.4 }}>{item.subtitle}</div>
          {item.description && (
            <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.55, margin: "10px 0 0" }} dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
          {item.tags && item.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12, justifyContent: side === "left" ? "flex-end" : "flex-start" }}>
              {item.tags.map(t => (
                <span key={t} style={{ fontFamily: mono, fontSize: 10, color: dim }}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── Non-timeline sections rendered via renderSection ──
  const renderSection = (type: string): React.ReactNode => {
    // Timeline types are handled as a merged block below
    if (timelineTypes.has(type)) return null;

    const sectionPad: React.CSSProperties = { maxWidth: 1000, margin: "0 auto", padding: m ? "32px 24px" : "40px 40px" };

    const H2 = ({ fallback }: { fallback: string }) => (
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${border}` }}>
        <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em", margin: 0, color: ink }}>
          {sectionLabel(sections, type as Parameters<typeof sectionLabel>[1], fallback)}
        </h2>
      </div>
    );

    switch (type) {
      case "about":
        return !user.bio && !user.bio_long ? null : (
          <section key="about" data-section="about" style={sectionPad}>
            <H2 fallback="About" />
            <p style={{ fontSize: 17, lineHeight: 1.65, color: ink, margin: 0, maxWidth: "60ch" }} dangerouslySetInnerHTML={{ __html: user.bio_long ?? user.bio ?? "" }} />
          </section>
        );

      case "skills":
        return skills.length === 0 ? null : (
          <section key="skills" data-section="skills" style={{ background: surface, borderTop: `1px solid ${border}` }}>
            <div style={{ maxWidth: 880, margin: "0 auto", padding: m ? "40px 24px" : "56px 40px" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 16 }}>
                {sectionLabel(sections, "skills", "Toolkit")}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {skills.flatMap(cat => cat.items).map(it => (
                  <span key={it} style={{ padding: "5px 11px", fontFamily: mono, fontSize: 11.5, color: ink, background: bg, border: `1px solid ${border}`, borderRadius: 999 }}>{it}</span>
                ))}
              </div>
            </div>
          </section>
        );

      case "publications":
        return publications.length === 0 ? null : (
          <section key="publications" data-section="publications" style={sectionPad}>
            <H2 fallback="Publications" />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {publications.map(p => (
                <div key={p.id} style={{ padding: "12px 0", borderBottom: `1px solid ${border}` }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: mono, fontSize: 10.5, color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                    {p.year && <span style={{ fontFamily: mono, fontSize: 10.5, color: dim }}>{p.year}</span>}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: ink }}>{p.title}</div>
                  {p.venue && <div style={{ fontFamily: mono, fontSize: 12, color: muted }}>{p.venue}</div>}
                  {p.summary && <p style={{ fontSize: 13, color: muted, lineHeight: 1.55, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
                </div>
              ))}
            </div>
          </section>
        );

      case "testimonials":
        return testimonials.length === 0 ? null : (
          <section key="testimonials" data-section="testimonials" style={sectionPad}>
            <H2 fallback="Testimonials" />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {testimonials.map(t => (
                <blockquote key={t.id} style={{ margin: 0, paddingLeft: 16, borderLeft: `2px solid ${accent}` }}>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: ink, fontStyle: "italic", margin: "0 0 8px" }} dangerouslySetInnerHTML={{ __html: t.quote }} />
                  <footer style={{ fontFamily: mono, fontSize: 11.5, color: muted }}>
                    — {t.author}{t.role ? `, ${t.role}` : ""}{t.company ? ` @ ${t.company}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        );

      case "certifications":
        return certifications.length === 0 ? null : (
          <section key="certifications" data-section="certifications" style={sectionPad}>
            <H2 fallback="Certifications" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {certifications.map(c => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: `1px solid ${border}` }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{c.name}</div>
                    <div style={{ fontFamily: mono, fontSize: 11, color: muted }}>{c.issuer}</div>
                    {c.url && <a href={c.url} style={{ fontFamily: mono, fontSize: 11, color: accent, textDecoration: "none" }} target="_blank" rel="noopener noreferrer">Credential ↗</a>}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, whiteSpace: "nowrap" }}>{c.year}</div>
                </div>
              ))}
            </div>
          </section>
        );

      case "languages":
        return languages.length === 0 ? null : (
          <section key="languages" data-section="languages" style={sectionPad}>
            <H2 fallback="Languages" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {languages.map(l => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "6px 0", borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: ink }}>{l.name}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: dim }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case "volunteer":
        return volunteer.length === 0 ? null : (
          <section key="volunteer" data-section="volunteer" style={sectionPad}>
            <H2 fallback="Volunteer" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {volunteer.map(v => (
                <div key={v.id} style={{ padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{v.role}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: muted }}>{v.organization}{v.period ? ` · ${v.period}` : ""}</div>
                  {v.description && <div style={{ fontSize: 13, color: muted, lineHeight: 1.55, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: v.description }} />}
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  // ── Which timeline-type sections appear in ordered (i.e. are visible)? ──
  const hasTimelineContent = timelineItems.length > 0;

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.6, minHeight: "100%" }}>

      {/* ── HERO HEADER ── */}
      {sectionVisible(sections, "hero") && (
        <header style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${border}` }}>
          {/* radial gradient background */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(700px 320px at 50% -40%, ${accent}18, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ maxWidth: 880, margin: "0 auto", padding: m ? "60px 24px 48px" : "88px 40px 64px", textAlign: "center", position: "relative" }}>
            {/* availability pill */}
            {user.available && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 10px", borderRadius: 999, background: surface, border: `1px solid ${border}`, fontSize: 12, fontWeight: 500, marginBottom: 28 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "rgb(34,163,90)" }} />
                {user.availability_text ?? "Available"}
              </span>
            )}
            <h1 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 48 : 72, letterSpacing: "-0.04em", lineHeight: 0.98, margin: "0 0 18px", wordBreak: "break-word", overflowWrap: "break-word" }}>
              {user.name}<span style={{ color: accent }}>.</span>
            </h1>
            {user.headline && (
              <p style={{ fontSize: 20, color: muted, margin: "0 auto 8px", maxWidth: "42ch", lineHeight: 1.5 }}>{user.headline}</p>
            )}
            {(user.location || user.handle) && (
              <div style={{ fontFamily: mono, fontSize: 11.5, color: dim, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 16 }}>
                {[user.location, user.handle ? `profolyo.me/${user.handle}` : null].filter(Boolean).join(" · ")}
              </div>
            )}
          </div>
        </header>
      )}

      {/* ── ABOUT (if appears before timeline in ordering) ── */}
      {ordered.filter(t => !timelineTypes.has(t) && t === "about").map(t => renderSection(t))}

      {/* ── TIMELINE ── */}
      {hasTimelineContent && (
        <section data-section="timeline" style={{ maxWidth: 1000, margin: "0 auto", padding: m ? "40px 24px 56px" : "56px 40px 72px" }}>

          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 48, justifyContent: "center", flexWrap: "wrap" }}>
            {([
              ["role", accent, "Role"],
              ["project", TIMELINE_PROJECT_COLOR, "Project"],
              ["education", TIMELINE_EDUCATION_COLOR, "Education"],
              ["award", TIMELINE_AWARD_COLOR, "Award"],
            ] as [TimelineItemType, string, string][]).map(([kind, color, label]) => {
              const hasKind = timelineItems.some(i => i.kind === kind);
              if (!hasKind) return null;
              return (
                <span key={kind} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: mono, fontSize: 10.5, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  <span style={{ width: 9, height: 9, borderRadius: 999, background: color }} />
                  {label}
                </span>
              );
            })}
          </div>

          {/* Timeline list */}
          {m ? (
            /* Mobile: single column, all cards below center dot */
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {timelineItems.map((item, idx) => (
                <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6, flexShrink: 0 }}>
                    <span style={{ width: 14, height: 14, borderRadius: 999, background: surface, border: `4px solid ${nodeColor(item.kind)}`, boxShadow: `${bg} 0px 0px 0px 3px`, zIndex: 1 }} />
                    {idx < timelineItems.length - 1 && (
                      <div style={{ width: 2, flexGrow: 1, background: border, marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 8 }}>
                    <TimelineCard item={item} side="right" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: alternating left/right around center line */
            <div style={{ position: "relative" }}>
              {/* Center vertical line */}
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: border, transform: "translateX(-50%)" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {timelineItems.map((item, idx) => {
                  const side: "left" | "right" = idx % 2 === 0 ? "left" : "right";
                  return (
                    <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", alignItems: "start" }}>
                      {/* Left cell */}
                      <div style={{ gridColumn: 1, paddingRight: 28, textAlign: "right", visibility: side === "left" ? "visible" : "hidden" }}>
                        {side === "left" && <TimelineCard item={item} side="left" />}
                      </div>

                      {/* Center dot */}
                      <div style={{ gridColumn: 2, display: "flex", justifyContent: "center", paddingTop: 6 }}>
                        <span style={{
                          width: 16, height: 16, borderRadius: 999,
                          background: surface,
                          border: `4px solid ${nodeColor(item.kind)}`,
                          boxShadow: `${bg} 0px 0px 0px 4px`,
                          zIndex: 1,
                          display: "block",
                        }} />
                      </div>

                      {/* Right cell */}
                      <div style={{ gridColumn: 3, paddingLeft: 28, textAlign: "left", visibility: side === "right" ? "visible" : "hidden" }}>
                        {side === "right" && <TimelineCard item={item} side="right" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── REMAINING SECTIONS (non-timeline, non-about) ── */}
      {ordered
        .filter(t => !timelineTypes.has(t) && t !== "about")
        .map(renderSection)}

      {/* ── CUSTOM SECTIONS ── */}
      {customSections(sections).filter(s => s.visible && s.items && s.items.length > 0).map(section => (
        <section key={section.id} data-section="custom" style={{ maxWidth: 1000, margin: "0 auto", padding: m ? "32px 24px" : "40px 40px" }}>
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${border}` }}>
            <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em", margin: 0, color: ink }}>{section.label}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {(section.items ?? []).map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{item.heading}</div>
                  {item.subheading && <div style={{ fontSize: 13, color: muted }}>{item.subheading}</div>}
                  {item.description && <div style={{ fontSize: 13, color: muted, margin: "4px 0 0", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                  {item.link && <a href={item.link} style={{ fontSize: 12, color: accent, textDecoration: "underline", display: "inline-block", marginTop: 4 }}>{item.link}</a>}
                </div>
                {item.date && <span style={{ fontFamily: mono, fontSize: 11, color: dim, whiteSpace: "nowrap" }}>{item.date}</span>}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ── CONTACT ── */}
      {sectionVisible(sections, "contact") && user.email && (
        <section data-section="contact" style={{ background: surface, borderTop: `1px solid ${border}` }}>
          <div style={{ maxWidth: 880, margin: "0 auto", padding: m ? "40px 24px 48px" : "56px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, paddingTop: 32, borderTop: `1px solid ${border}` }}>
              <a
                href={`mailto:${user.email}`}
                style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 20 : 24, color: ink, textDecoration: "none", letterSpacing: "-0.02em" }}
              >
                {user.email} →
              </a>
              {user.social.length > 0 && (
                <div style={{ display: "flex", gap: 18, fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.06em", flexWrap: "wrap" }}>
                  {user.social.map(s => (
                    <a key={s.id} href={s.url} style={{ color: muted, textDecoration: "none" }} target="_blank" rel="noopener noreferrer">{s.url.replace(/^https?:\/\//, "")}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Profolyo branding footer */}
      <div style={{ textAlign: "center", padding: "32px 24px 24px", marginTop: 40 }}>
        <p style={{ fontSize: 12, color: "rgba(128,128,128,0.6)", fontFamily: "'Inter', sans-serif", margin: 0 }}>
          Made with{" "}
          <a
            href="https://profolyo.me"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(128,128,128,0.7)", textDecoration: "underline", textDecorationColor: "rgba(128,128,128,0.35)", textUnderlineOffset: 2 }}
          >
            Profolyo
          </a>
        </p>
      </div>

    </div>
  );
}
