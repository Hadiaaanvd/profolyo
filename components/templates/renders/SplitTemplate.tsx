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

export default function SplitTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const {
    user,
    projects,
    experience,
    education,
    skills,
    publications  = [],
    testimonials  = [],
    awards        = [],
    certifications = [],
    languages     = [],
    volunteer     = [],
  } = portfolio;

  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body    = bodyFont    ?? "'Inter', sans-serif";
  const mono    = "'JetBrains Mono', monospace";

  /** Returns #111111 or #FFFFFF depending on which is more legible over `hex`. */
  function onAccent(hex: string): string {
    const h = hex.replace(/^#/, "");
    if (h.length < 6) return "#FFFFFF";
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) > 0.55 ? "#111111" : "#FFFFFF";
  }
  const sidebarFg = onAccent(accent);

  const ink    = "rgb(28, 26, 25)";
  const muted  = "rgb(106, 101, 95)";
  const dim    = "rgb(162, 158, 150)";
  const border = "rgb(235, 231, 224)";

  const m = useIsMobile();

  const initials = user.name
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Pre-compute which section types actually have data so we can assign sequential numbers
  const hasData = (type: string): boolean => {
    switch (type) {
      case "about":          return !!(user.bio || user.bio_long);
      case "projects":       return projects.length > 0;
      case "experience":     return experience.length > 0;
      case "education":      return education.length > 0;
      case "skills":         return skills.length > 0;
      case "publications":   return publications.length > 0;
      case "testimonials":   return testimonials.length > 0;
      case "awards":         return awards.length > 0;
      case "certifications": return certifications.length > 0;
      case "languages":      return languages.length > 0;
      case "volunteer":      return volunteer.length > 0;
      default:               return false;
    }
  };

  const ordered = orderedBuiltInTypes(sections);

  const sectionNumbers = ordered
    .filter(hasData)
    .reduce<Record<string, string>>((acc, type, i) => {
      acc[type] = String(i + 1).padStart(2, "0");
      return acc;
    }, {});

  const H2 = ({ type, fallback }: { type: string; fallback: string }) => (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24, paddingBottom: 10, borderBottom: `1px solid ${border}` }}>
      <span style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.14em" }}>{sectionNumbers[type] ?? "–"}</span>
      <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em", margin: 0, color: ink }}>
        {sectionLabel(sections, type as Parameters<typeof sectionLabel>[1], fallback)}
      </h2>
    </div>
  );

  const renderSection = (type: string) => {
    switch (type) {
      case "about":
        return !user.bio && !user.bio_long ? null : (
          <section key="about" data-section="about" style={{ marginBottom: 56 }}>
            <H2 type="about" fallback="About" />
            <p
              style={{ fontSize: 17, lineHeight: 1.65, color: ink, margin: 0, maxWidth: "60ch" }}
              dangerouslySetInnerHTML={{ __html: user.bio_long ?? user.bio ?? "" }}
            />
          </section>
        );

      case "projects":
        return projects.length === 0 ? null : (
          <section key="projects" data-section="projects" style={{ marginBottom: 56 }}>
            <H2 type="projects" fallback="Selected work" />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {projects.map(p => {
                const [, textColor, label] = STATUS_MAP[p.status] ?? ["#EFEEE6", "#54514A", p.status];
                const coverStyle: React.CSSProperties = p.cover_image_url
                  ? { background: `url(${p.cover_image_url}) center/cover` }
                  : { background: p.cover_color ?? COVER_COLOR_FALLBACK };
                return (
                  <article key={p.id} style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: 18, alignItems: "center" }}>
                    <div style={{ width: 84, height: 64, borderRadius: 10, flexShrink: 0, ...coverStyle }} />
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 2 }}>
                        <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 18, letterSpacing: "-0.015em", margin: 0 }}>{p.title}</h3>
                        <span style={{ fontFamily: mono, fontSize: 10.5, color: textColor, letterSpacing: "0.08em", textTransform: "uppercase" }}>● {label}</span>
                      </div>
                      <p style={{ fontSize: 14, color: muted, margin: "0 0 6px", lineHeight: 1.45 }}>{p.tagline}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {p.tech_stack.map(t => (
                          <span key={t} style={{ fontFamily: mono, fontSize: 10.5, color: dim }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );

      case "experience":
        return experience.length === 0 ? null : (
          <section key="experience" data-section="experience" style={{ marginBottom: 56 }}>
            <H2 type="experience" fallback="Experience" />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {experience.map(e => (
                <div key={e.id} style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "110px 1fr", gap: 20 }}>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.08em", paddingTop: 3 }}>{e.period}</div>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16.5, color: ink }}>
                      {e.title}{" · "}<span style={{ color: accent }}>{e.company}</span>
                    </div>
                    {e.description && (
                      <p style={{ fontSize: 13.5, color: muted, margin: "4px 0 0", lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: e.description }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "education":
        return education.length === 0 ? null : (
          <section key="education" data-section="education" style={{ marginBottom: 56 }}>
            <H2 type="education" fallback="Education" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {education.map(ed => (
                <div key={ed.id}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink }}>{ed.degree}</div>
                  <div style={{ fontSize: 13, color: muted }}>{ed.institution}</div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, marginTop: 2 }}>{ed.period}</div>
                  {ed.description && (
                    <p style={{ fontSize: 13, color: muted, lineHeight: 1.5, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: ed.description }} />
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "skills":
        return skills.length === 0 ? null : (
          <section key="skills" data-section="skills" style={{ marginBottom: 56 }}>
            <H2 type="skills" fallback="Skills" />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {skills.map((s, i) => (
                <div key={i}>
                  {s.category && (
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{s.category}</div>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {s.items.map(it => (
                      <span key={it} style={{ padding: "4px 10px", fontSize: 12, color: ink, background: "#FFFFFF", border: `1px solid ${border}`, borderRadius: 999 }}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "publications":
        return publications.length === 0 ? null : (
          <section key="publications" data-section="publications" style={{ marginBottom: 56 }}>
            <H2 type="publications" fallback="Publications" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {publications.map(p => (
                <div key={p.id} style={{ paddingBottom: 12, borderBottom: `1px solid ${border}` }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 2 }}>
                    <span style={{ fontFamily: mono, fontSize: 10.5, color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                    {p.year && <span style={{ fontFamily: mono, fontSize: 10.5, color: dim }}>{p.year}</span>}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{p.title}</div>
                  {p.venue && <div style={{ fontFamily: mono, fontSize: 11, color: muted }}>{p.venue}</div>}
                  {p.summary && (
                    <div style={{ fontSize: 13, color: muted, lineHeight: 1.55, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: p.summary }} />
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "testimonials":
        return testimonials.length === 0 ? null : (
          <section key="testimonials" data-section="testimonials" style={{ marginBottom: 56 }}>
            <H2 type="testimonials" fallback="Testimonials" />
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

      case "awards":
        return awards.length === 0 ? null : (
          <section key="awards" data-section="awards" style={{ marginBottom: 56 }}>
            <H2 type="awards" fallback="Awards" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {awards.map(a => (
                <div key={a.id} style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "110px 1fr", gap: 20, paddingBottom: 8, borderBottom: `1px dashed ${border}` }}>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, paddingTop: 2 }}>{a.year}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{a.title}</div>
                    {a.issuer && <div style={{ fontFamily: mono, fontSize: 11, color: muted }}>{a.issuer}</div>}
                    {a.summary && (
                      <p style={{ fontSize: 13, color: muted, margin: "4px 0 0", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: a.summary }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "certifications":
        return certifications.length === 0 ? null : (
          <section key="certifications" data-section="certifications" style={{ marginBottom: 56 }}>
            <H2 type="certifications" fallback="Certifications" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {certifications.map(c => (
                <div key={c.id} style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "110px 1fr", gap: 20, paddingBottom: 8, borderBottom: `1px dashed ${border}` }}>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, paddingTop: 2 }}>{c.year}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{c.name}</div>
                    {c.issuer && <div style={{ fontFamily: mono, fontSize: 11, color: muted }}>{c.issuer}</div>}
                    {c.url && (
                      <a href={c.url} style={{ fontFamily: mono, fontSize: 11, color: accent, textDecoration: "none" }} target="_blank" rel="noopener noreferrer">View ↗</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "languages":
        return languages.length === 0 ? null : (
          <section key="languages" data-section="languages" style={{ marginBottom: 56 }}>
            <H2 type="languages" fallback="Languages" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {languages.map(l => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 600, fontSize: 13.5, color: ink }}>{l.name}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: dim }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case "volunteer":
        return volunteer.length === 0 ? null : (
          <section key="volunteer" data-section="volunteer" style={{ marginBottom: 56 }}>
            <H2 type="volunteer" fallback="Volunteer" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {volunteer.map(v => (
                <div key={v.id} style={{ paddingBottom: 12, borderBottom: `1px solid ${border}` }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{v.role}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: muted, marginTop: 2 }}>
                    {v.organization}{v.period ? ` · ${v.period}` : ""}
                  </div>
                  {v.description && (
                    <div style={{ fontSize: 13, color: muted, lineHeight: 1.55, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: v.description }} />
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  const wrapperStyle: React.CSSProperties = m
    ? { display: "flex", flexDirection: "column" }
    : { display: "grid", gridTemplateColumns: "minmax(340px, 42%) 1fr" };

  return (
    <div style={{ background: "rgb(252, 251, 249)", color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.6, minHeight: "100%", ...wrapperStyle }}>

      {/* ── SIDEBAR ── */}
      {sectionVisible(sections, "hero") && (
        <aside
          style={{
            background: accent,
            color: sidebarFg,
            position: m ? "relative" : "sticky",
            top: 0,
            height: m ? "auto" : "100vh",
            maxHeight: m ? undefined : 920,
            padding: m ? "40px 32px" : "56px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            gap: m ? 40 : 0,
          }}
        >
          {/* decorative circle */}
          <div style={{ position: "absolute", bottom: -80, right: -80, width: 280, height: 280, borderRadius: 999, background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

          {/* top: avatar + name + headline + availability */}
          <div style={{ position: "relative" }}>
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name}
                style={{ width: 56, height: 56, borderRadius: 16, objectFit: "cover", marginBottom: 40, display: "block" }}
              />
            ) : (
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(255,255,255,0.16)", color: sidebarFg, fontFamily: display, fontWeight: 600, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
                {initials}
              </div>
            )}
            <h1 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 38 : 52, letterSpacing: "-0.035em", lineHeight: 0.98, margin: "0 0 20px", wordBreak: "break-word", overflowWrap: "break-word" }}>
              {user.name}<span style={{ opacity: 0.6 }}>.</span>
            </h1>
            {user.headline && (
              <p style={{ fontSize: 18, lineHeight: 1.5, opacity: 0.92, margin: "0 0 28px", maxWidth: "30ch" }}>{user.headline}</p>
            )}
            {user.available && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 10px", borderRadius: 999, background: "rgba(255,255,255,0.14)", fontSize: 12, fontWeight: 500 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "rgb(124,227,160)" }} />
                {user.availability_text ?? "Available"}
              </span>
            )}
          </div>

          {/* bottom: location + email + social */}
          <div style={{ position: "relative" }}>
            {(user.location || user.pronouns) && (
              <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.6, marginBottom: 12 }}>
                {[user.location, user.pronouns].filter(Boolean).join(" · ")}
              </div>
            )}
            {user.email && (
              <a
                href={`mailto:${user.email}`}
                style={{ color: sidebarFg, fontSize: 15, textDecoration: "none", display: "block", marginBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: 4, width: "fit-content" }}
              >
                {user.email}
              </a>
            )}
            {user.social.length > 0 && (
              <div style={{ display: "flex", gap: 16, fontFamily: mono, fontSize: 11.5, opacity: 0.85, flexWrap: "wrap" }}>
                {user.social.map(s => (
                  <a key={s.id} href={s.url} style={{ color: sidebarFg, textDecoration: "none" }} target="_blank" rel="noopener noreferrer">
                    {s.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </aside>
      )}

      {/* ── MAIN ── */}
      <main style={{ padding: m ? "40px 24px 60px" : "56px 56px 80px" }}>

        {ordered.map(renderSection)}

        {/* Custom sections */}
        {customSections(sections).filter(s => s.visible && s.items && s.items.length > 0).map(section => (
          <section key={section.id} data-section="custom" style={{ marginBottom: 56 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24, paddingBottom: 10, borderBottom: `1px solid ${border}` }}>
              <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em", margin: 0, color: ink }}>{section.label}</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {(section.items ?? []).map(item => (
                <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, paddingBottom: 12, borderBottom: `1px solid ${border}` }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{item.heading}</div>
                    {item.subheading && <div style={{ fontSize: 13, color: muted }}>{item.subheading}</div>}
                    {item.description && <div style={{ fontSize: 13, color: muted, margin: "4px 0 0", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                    {item.link && <a href={item.link} style={{ fontSize: 12, color: accent, textDecoration: "underline", display: "inline-block", marginTop: 4 }}>{item.link}</a>}
                  </div>
                  {item.date && <span style={{ fontFamily: mono, fontSize: 11, color: dim, whiteSpace: "nowrap", textAlign: "right" }}>{item.date}</span>}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Contact */}
        {sectionVisible(sections, "contact") && user.email && (
          <section data-section="contact" style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24, paddingBottom: 10, borderBottom: `1px solid ${border}` }}>
              <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em", margin: 0, color: ink }}>
                {sectionLabel(sections, "contact", "Contact")}
              </h2>
            </div>
            <a href={`mailto:${user.email}`} style={{ color: accent, fontSize: 18, fontWeight: 500, textDecoration: "none", display: "block", marginBottom: 12 }}>{user.email} →</a>
            {user.phone && <div style={{ fontFamily: mono, fontSize: 13, color: muted, marginBottom: 8 }}>{user.phone}</div>}
            {user.contact_note && <p style={{ fontSize: 14, color: muted, lineHeight: 1.6, margin: 0 }}>{user.contact_note}</p>}
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

      </main>
    </div>
  );
}
