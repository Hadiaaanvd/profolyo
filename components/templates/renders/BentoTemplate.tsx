"use client";
import React from "react";
import type { Portfolio, SectionConfig } from "@/types/portfolio";
import { sectionVisible, sectionLabel, orderedBuiltInTypes, customSections, COVER_COLOR_FALLBACK, PUBLICATION_TYPE_LABEL } from "../utils";
import { useIsMobile } from "../hooks";

interface Props { portfolio: Portfolio; accent: string; sections: SectionConfig[]; headingFont?: string; bodyFont?: string; }

const CELL_BASE: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: 22,
  border: "1px solid #E1E1E6",
  padding: 26,
  display: "flex",
  flexDirection: "column",
};

export default function BentoTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const {
    user, projects, experience, education, skills,
    publications = [], testimonials = [], awards = [],
    certifications = [], languages = [], volunteer = [],
  } = portfolio;

  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";
  const mono = "'JetBrains Mono', monospace";
  const ink = "#17171A";
  const muted = "#6E6E78";
  const bg = "#ECECEE";
  const border = "#E1E1E6";
  const m = useIsMobile();

  const colSpan = (n: number) => m ? ("1" as const) : (`span ${n}` as const);

  const MonoLabel = ({ text }: { text: string }) => (
    <div style={{ fontFamily: mono, fontSize: 10.5, color: "#A6A6B0", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 14 }}>
      {text}
    </div>
  );

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  // Calculate years of experience from earliest experience entry
  const earliestYear = experience.length > 0
    ? Math.min(...experience.map((e) => {
        const m2 = e.period.match(/\d{4}/);
        return m2 ? parseInt(m2[0]) : new Date().getFullYear();
      }))
    : null;
  const yearsBuilding = earliestYear ? new Date().getFullYear() - earliestYear : null;

  const ordered = orderedBuiltInTypes(sections);
  let counter = 1;

  function onAccent(hex: string): string {
    const h = hex.replace(/^#/, "");
    if (h.length < 6) return "#FFFFFF";
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) > 0.55 ? "#111111" : "#FFFFFF";
  }
  const accentFg = onAccent(accent);

  const renderSection = (type: string) => {
    const num = String(counter++).padStart(2, "0");
    switch (type) {

      case "about": {
        const text = user.bio_long ?? user.bio;
        if (!text) { counter--; return null; }
        return (
          <React.Fragment key="about">
            <section data-section="about" style={{ ...CELL_BASE, gridColumn: colSpan(3) }}>
              <MonoLabel text={sectionLabel(sections, "about", "About")} />
              <p style={{ fontSize: 15, color: ink, lineHeight: 1.6, margin: 0 }} dangerouslySetInnerHTML={{ __html: text }} />
            </section>
            <div style={{ ...CELL_BASE, gridColumn: colSpan(1), justifyContent: "center", alignItems: "flex-start" }}>
              <div style={{ fontFamily: display, fontWeight: 600, fontSize: 44, letterSpacing: "-0.03em", color: accent, lineHeight: 1 }}>{projects.length}</div>
              <div style={{ fontSize: 12.5, color: muted, marginTop: 6 }}>shipped projects</div>
              <div style={{ height: 1, background: border, width: "100%", margin: "18px 0" }} />
              <div style={{ fontFamily: display, fontWeight: 600, fontSize: 44, letterSpacing: "-0.03em", color: ink, lineHeight: 1 }}>{yearsBuilding ?? "—"}</div>
              <div style={{ fontSize: 12.5, color: muted, marginTop: 6 }}>years building</div>
            </div>
          </React.Fragment>
        );
      }

      case "skills": {
        if (skills.length === 0) { counter--; return null; }
        const allItems = skills.flatMap((s) => s.items);
        return (
          <section key="skills" data-section="skills" style={{ ...CELL_BASE, gridColumn: colSpan(2) }}>
            <MonoLabel text={sectionLabel(sections, "skills", "Toolkit")} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {allItems.map((it) => (
                <span key={it} style={{ padding: "5px 11px", fontFamily: mono, fontSize: 11, color: ink, background: bg, borderRadius: 999 }}>{it}</span>
              ))}
            </div>
          </section>
        );
      }

      case "projects": {
        if (projects.length === 0) { counter--; return null; }
        const [featured, ...rest] = projects;
        return (
          <React.Fragment key="projects">
            {/* Featured project */}
            <section data-section="projects" style={{ ...CELL_BASE, gridColumn: colSpan(rest.length > 0 ? 4 : 6), padding: 0, overflow: "hidden", minHeight: 280 }}>
              <div style={{
                height: 150,
                background: featured.cover_color ?? COVER_COLOR_FALLBACK,
                position: "relative",
                overflow: "hidden",
                flexShrink: 0,
              }}>
                {featured.cover_image_url && (
                  <img src={featured.cover_image_url} alt={featured.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                )}
              </div>
              <div style={{ padding: 26 }}>
                <MonoLabel text="Featured" />
                <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 26, letterSpacing: "-0.02em", margin: "0 0 6px", color: ink }}>{featured.title}</h3>
                <p style={{ fontSize: 14.5, color: muted, margin: "0 0 16px", maxWidth: "52ch", lineHeight: 1.5 }}>{featured.tagline}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {featured.tech_stack.slice(0, 5).map((t) => (
                    <span key={t} style={{ padding: "4px 10px", fontFamily: mono, fontSize: 11, color: muted, background: bg, borderRadius: 999 }}>{t}</span>
                  ))}
                </div>
              </div>
            </section>
            {/* More work list */}
            {rest.length > 0 && (
            <div style={{ ...CELL_BASE, gridColumn: colSpan(2), gap: 12 }}>
              <MonoLabel text="More work" />
              {rest.slice(0, 5).map((p) => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: p.cover_color ?? COVER_COLOR_FALLBACK, flexShrink: 0, overflow: "hidden", position: "relative" }}>
                    {p.cover_image_url && (
                      <img src={p.cover_image_url} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13.5, color: ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
                    <div style={{ fontSize: 11.5, color: "#A6A6B0", fontFamily: mono }}>{p.period ?? ""}</div>
                  </div>
                </div>
              ))}
            </div>
            )}
          </React.Fragment>
        );
      }

      case "testimonials": {
        if (testimonials.length === 0) { counter--; return null; }
        const t = testimonials[0];
        return (
          <section key="testimonials" data-section="testimonials" style={{ ...CELL_BASE, gridColumn: colSpan(3), justifyContent: "space-between" }}>
            <MonoLabel text={sectionLabel(sections, "testimonials", "In their words")} />
            <p style={{ fontFamily: display, fontWeight: 500, fontSize: 19, letterSpacing: "-0.015em", lineHeight: 1.35, color: ink, margin: "0 0 16px" }}
               dangerouslySetInnerHTML={{ __html: t.quote }} />
            <div style={{ fontSize: 13, color: muted }}>
              <strong style={{ color: ink, fontWeight: 600 }}>{t.author}</strong>
              {t.role && <span> · {t.role}</span>}
              {t.company && <span>, {t.company}</span>}
            </div>
          </section>
        );
      }

      case "experience": {
        if (experience.length === 0) { counter--; return null; }
        return (
          <section key="experience" data-section="experience" style={{ ...CELL_BASE, gridColumn: colSpan(3) }}>
            <MonoLabel text={sectionLabel(sections, "experience", "Currently")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {experience.map((e, i) => (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, paddingBottom: i < experience.length - 1 ? 12 : 0, borderBottom: i < experience.length - 1 ? `1px solid ${border}` : "none" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{e.title}</div>
                    <div style={{ fontSize: 12.5, color: muted }}>{e.company}</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: "#A6A6B0", whiteSpace: "nowrap" }}>{e.period}</div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "education": {
        if (education.length === 0) { counter--; return null; }
        return (
          <section key="education" data-section="education" style={{ ...CELL_BASE, gridColumn: colSpan(3) }}>
            <MonoLabel text={sectionLabel(sections, "education", "Education")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {education.map((ed, i) => (
                <div key={ed.id} style={{ paddingBottom: i < education.length - 1 ? 12 : 0, borderBottom: i < education.length - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{ed.degree}</div>
                  <div style={{ fontSize: 12.5, color: muted }}>{ed.institution}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: "#A6A6B0", marginTop: 2 }}>{ed.period}</div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "languages": {
        if (languages.length === 0) { counter--; return null; }
        return (
          <section key="languages" data-section="languages" style={{ ...CELL_BASE, gridColumn: colSpan(2) }}>
            <MonoLabel text={sectionLabel(sections, "languages", "Languages")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {languages.map((l) => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 600, fontSize: 13.5, color: ink }}>{l.name}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: "#A6A6B0" }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "publications": {
        if (publications.length === 0) { counter--; return null; }
        return (
          <section key="publications" data-section="publications" style={{ ...CELL_BASE, gridColumn: colSpan(3) }}>
            <MonoLabel text={sectionLabel(sections, "publications", "Publications")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {publications.map((p) => (
                <div key={p.id} style={{ paddingBottom: 12, borderBottom: `1px solid ${border}` }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: mono, fontSize: 10, color: accent, textTransform: "uppercase", letterSpacing: "0.12em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                    {p.year && <span style={{ fontFamily: mono, fontSize: 10, color: muted }}>{p.year}</span>}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{p.title}</div>
                  {p.venue && <div style={{ fontSize: 12, color: muted }}>{p.venue}</div>}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "awards": {
        if (awards.length === 0) { counter--; return null; }
        return (
          <section key="awards" data-section="awards" style={{ ...CELL_BASE, gridColumn: colSpan(3) }}>
            <MonoLabel text={sectionLabel(sections, "awards", "Awards")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {awards.map((a) => (
                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 10, borderBottom: `1px solid ${border}` }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{a.title}</div>
                    {a.issuer && <div style={{ fontSize: 12, color: muted }}>{a.issuer}</div>}
                  </div>
                  {a.year && <span style={{ fontFamily: mono, fontSize: 11, color: "#A6A6B0" }}>{a.year}</span>}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "certifications": {
        if (certifications.length === 0) { counter--; return null; }
        return (
          <section key="certifications" data-section="certifications" style={{ ...CELL_BASE, gridColumn: colSpan(3) }}>
            <MonoLabel text={sectionLabel(sections, "certifications", "Certifications")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {certifications.map((c) => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{c.name}</div>
                    {c.issuer && <div style={{ fontSize: 12, color: muted }}>{c.issuer}</div>}
                  </div>
                  {c.year && <span style={{ fontFamily: mono, fontSize: 11, color: "#A6A6B0" }}>{c.year}</span>}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "volunteer": {
        if (volunteer.length === 0) { counter--; return null; }
        return (
          <section key="volunteer" data-section="volunteer" style={{ ...CELL_BASE, gridColumn: colSpan(3) }}>
            <MonoLabel text={sectionLabel(sections, "volunteer", "Volunteer")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {volunteer.map((v) => (
                <div key={v.id} style={{ paddingBottom: 12, borderBottom: `1px solid ${border}` }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: ink }}>{v.role}</div>
                  <div style={{ fontSize: 12.5, color: muted }}>{v.organization}{v.period ? ` · ${v.period}` : ""}</div>
                  {v.description && <p style={{ fontSize: 13, color: ink, lineHeight: 1.5, margin: "6px 0 0" }} dangerouslySetInnerHTML={{ __html: v.description }} />}
                </div>
              ))}
            </div>
          </section>
        );
      }

      default: return null;
    }
  };

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.55, minHeight: "100%", padding: m ? "16px" : "32px" }}>
      <div style={{
        maxWidth: 1160,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: m ? "1fr" : "repeat(6, 1fr)",
        gap: 18,
        gridAutoRows: "minmax(0, auto)",
      }}>

        {/* HERO CELLS */}
        {sectionVisible(sections, "hero") && (
          <>
            {/* Name + headline cell */}
            <div style={{ ...CELL_BASE, gridColumn: colSpan(4), justifyContent: "space-between", minHeight: 240 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} style={{ width: 56, height: 56, borderRadius: 16, objectFit: "cover" }} />
                ) : (
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${accent}, ${accent}99)`, color: accentFg, fontFamily: display, fontWeight: 600, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {initials}
                  </div>
                )}
                {user.available ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px 6px 10px", borderRadius: 999, background: "#EAF7EF", color: "#197A43", fontSize: 12, fontWeight: 500 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "#22A35A" }} />
                    {user.availability_text ?? "Available"}
                  </span>
                ) : null}
              </div>
              <div>
                <h1 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 32 : 46, letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 10px", wordBreak: "break-word", overflowWrap: "break-word" }}>
                  {user.name}<span style={{ color: accent }}>.</span>
                </h1>
                {user.headline && (
                  <p style={{ fontSize: 16.5, color: muted, margin: 0, maxWidth: "40ch" }}>{user.headline}</p>
                )}
              </div>
            </div>

            {/* Location / handle accent cell */}
            <div style={{ gridColumn: colSpan(2), background: accent, borderRadius: 22, padding: 26, display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 240, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: 999, background: "rgba(255,255,255,0.14)" }} />
              <div style={{ position: "absolute", top: 30, right: 30, width: 90, height: 90, borderRadius: 999, background: "rgba(255,255,255,0.12)" }} />
              <div style={{ position: "relative", color: accentFg }}>
                {user.location && (
                  <>
                    <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.8, marginBottom: 8 }}>Based in</div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 24, letterSpacing: "-0.02em" }}>{user.location}</div>
                  </>
                )}
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>
                  {user.pronouns && <span>{user.pronouns} · </span>}
                  {user.website && <span>{user.website.replace(/^https?:\/\//, "")}</span>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ORDERED SECTIONS */}
        {ordered.map(renderSection)}

        {/* CUSTOM SECTIONS */}
        {customSections(sections).filter((s) => s.visible && s.items && s.items.length > 0).map((section) => {
          counter++;
          return (
            <section key={section.id} style={{ ...CELL_BASE, gridColumn: colSpan(3) }}>
              <MonoLabel text={section.label} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {(section.items ?? []).map((item) => (
                  <div key={item.id} style={{ paddingBottom: 10, borderBottom: `1px solid ${border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: ink }}>{item.heading}</span>
                      {item.date && <span style={{ fontFamily: mono, fontSize: 11, color: "#A6A6B0", whiteSpace: "nowrap" }}>{item.date}</span>}
                    </div>
                    {item.subheading && <div style={{ fontSize: 12.5, color: muted }}>{item.subheading}</div>}
                    {item.description && <p style={{ fontSize: 13.5, color: ink, margin: "4px 0 0", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* CONTACT CELL */}
        {sectionVisible(sections, "contact") && (
          <section data-section="contact" style={{ gridColumn: colSpan(4), background: ink, borderRadius: 22, padding: 26, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10.5, color: "#A6A6B0", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 8 }}>
                {sectionLabel(sections, "contact", "Let's talk")}
              </div>
              <div style={{ fontFamily: display, fontWeight: 600, fontSize: 24, color: "white", letterSpacing: "-0.02em", wordBreak: "break-all" }}>{user.email}</div>
              {user.contact_note && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "6px 0 0" }}>{user.contact_note}</p>}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {user.email && (
                <a href={`mailto:${user.email}`} style={{ padding: "8px 14px", fontSize: 12.5, color: "white", background: `${accent}33`, borderRadius: 999, textDecoration: "none" }}>email ↗</a>
              )}
              {user.social.map((s) => (
                <a key={s.id} href={s.url} style={{ padding: "8px 14px", fontSize: 12.5, color: "white", background: "rgba(255,255,255,0.1)", borderRadius: 999, textDecoration: "none", textTransform: "capitalize" }}>
                  {s.type === "readcv" ? "Read.cv" : s.type}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

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


