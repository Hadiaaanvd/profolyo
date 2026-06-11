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

function StatusDot({ status }: { status: string }) {
  const dotColor: Record<string, string> = { live: "rgb(22,163,74)", in_progress: "rgb(217,119,6)", archived: "rgb(162,159,146)" };
  const [,,label] = STATUS_MAP[status] ?? STATUS_MAP.archived;
  return (
    <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", background: "rgba(255,255,255,0.92)", color: "rgb(31,30,26)", fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: dotColor[status] ?? dotColor.archived }} />
      {label}
    </div>
  );
}

export default function IndexTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const { user, projects, experience, education, skills, publications = [], testimonials = [], awards = [], certifications = [], languages = [], volunteer = [] } = portfolio;
  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";

  const bg = "#FAFAF7";
  const ink = "rgb(31,30,26)";
  const muted = "rgb(111,109,99)";
  const border = "rgb(236,234,226)";
  const subtle = "rgb(162,159,146)";
  const white = "#FFFFFF";
  const mono = "'JetBrains Mono', monospace";
  const maxW = "1440px";

  const m = useIsMobile();
  const px = m ? "20px" : "32px";

  const ordered = orderedBuiltInTypes(sections);
  const custom = customSections(sections);

  const initials = user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();
  const ratios = ["3 / 4", "1 / 1", "4 / 5", "5 / 4", "1 / 1", "4 / 3"];

  const SectionTitle = ({ label }: { label: string }) => (
    <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: m ? 28 : 40, letterSpacing: "-0.03em", margin: "0 0 28px", color: ink, lineHeight: 1 }}>{label}</h2>
  );

  const TwoCol = ({ children, label, ref: sRef }: { children: React.ReactNode; label: string; ref?: string }) => (
    <section data-section={sRef ?? label.toLowerCase()} style={{ marginBottom: 80, display: m ? "block" : "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
      <SectionTitle label={label} />
      <div>{children}</div>
    </section>
  );

  const renderSection = (type: string) => {
    switch (type) {
      case "about": {
        if (!sectionVisible(sections, "about")) return null;
        return (
          <TwoCol key="about" label={sectionLabel(sections, "about", "About")} ref="about">
            <p style={{ fontSize: m ? 16 : 18, lineHeight: 1.6, color: ink, margin: "0 0 16px", letterSpacing: "-0.005em", maxWidth: "56ch", fontFamily: body }} dangerouslySetInnerHTML={{ __html: user.bio }} />
            {user.bio_long && <div style={{ fontSize: 14.5, lineHeight: 1.65, color: muted, margin: 0, maxWidth: "60ch", fontFamily: body }} dangerouslySetInnerHTML={{ __html: user.bio_long }} />}
            <div style={{ display: "flex", gap: 16, fontSize: 12.5, color: muted, marginTop: 24, paddingTop: 20, borderTop: `1px solid ${border}`, flexWrap: "wrap" }}>
              <span><span style={{ color: subtle }}>Loc </span>{user.location}</span>
              {user.pronouns && <span><span style={{ color: subtle }}>Pronouns </span>{user.pronouns}</span>}
              {user.website && <span><span style={{ color: subtle }}>URL </span>{user.website}</span>}
            </div>
          </TwoCol>
        );
      }

      case "projects": {
        if (!sectionVisible(sections, "projects") || projects.length === 0) return null;
        return (
          <section key="projects" data-section="projects" style={{ marginBottom: 96 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
              <SectionTitle label={sectionLabel(sections, "projects", "Work")} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : projects.length === 1 ? "1fr" : projects.length === 2 ? "1fr 1fr" : "repeat(3, 1fr)", gap: 16 }}>
              {projects.map((p, i) => (
                <article key={p.id} style={{ background: white, borderRadius: 10, overflow: "hidden", border: `1px solid ${border}`, cursor: "pointer", display: "flex", flexDirection: "column" }}>
                  <div style={{ aspectRatio: ratios[i % ratios.length], background: p.cover_image_url ? `url(${p.cover_image_url}) center/cover` : (p.cover_color ?? COVER_COLOR_FALLBACK), position: "relative" }}>
                    <StatusDot status={p.status} />
                  </div>
                  <div style={{ padding: "14px 16px 16px" }}>
                    <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 17, letterSpacing: "-0.015em", margin: "0 0 4px", color: ink, lineHeight: 1.1 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: muted, lineHeight: 1.45, margin: 0, fontFamily: body }}>{p.tagline}</p>
                    {p.tech_stack.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
                        {p.tech_stack.slice(0, 4).map(t => (
                          <span key={t} style={{ padding: "2px 8px", fontSize: 11, color: muted, border: `1px solid ${border}`, borderRadius: 999, fontFamily: mono }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      }

      case "experience": {
        if (!sectionVisible(sections, "experience") || experience.length === 0) return null;
        return (
          <TwoCol key="experience" label={sectionLabel(sections, "experience", "Experience")} ref="experience">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {experience.map((e, i) => (
                <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "16px 0", borderBottom: i < experience.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 17, color: ink, letterSpacing: "-0.01em", marginBottom: 2 }}>{e.company}</div>
                    <div style={{ fontSize: 13, color: muted, fontFamily: body }}>{e.title}{e.location ? ` · ${e.location}` : ""}</div>
                    {e.description && <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.55, margin: "6px 0 0", maxWidth: "48ch", fontFamily: body }} dangerouslySetInnerHTML={{ __html: e.description }} />}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11.5, color: subtle, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{e.period}</div>
                </div>
              ))}
            </div>
          </TwoCol>
        );
      }

      case "education": {
        if (!sectionVisible(sections, "education") || education.length === 0) return null;
        return (
          <TwoCol key="education" label={sectionLabel(sections, "education", "Education")} ref="education">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {education.map((e, i) => (
                <div key={e.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "16px 0", borderBottom: i < education.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.01em", marginBottom: 2 }}>{e.degree}</div>
                    <div style={{ fontSize: 13, color: muted, fontFamily: body }}>{e.institution}{e.location ? ` · ${e.location}` : ""}</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11.5, color: subtle, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{e.period}</div>
                </div>
              ))}
            </div>
          </TwoCol>
        );
      }

      case "skills": {
        if (!sectionVisible(sections, "skills") || skills.length === 0) return null;
        return (
          <TwoCol key="skills" label={sectionLabel(sections, "skills", "Skills")} ref="skills">
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {skills.map((cat, i) => (
                <div key={i}>
                  {cat.category && <div style={{ fontFamily: mono, fontSize: 11, color: subtle, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{cat.category}</div>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {cat.items.map(skill => (
                      <span key={skill} style={{ padding: "4px 11px", fontSize: 12, color: ink, background: white, border: `1px solid ${border}`, borderRadius: 999, fontFamily: body }}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TwoCol>
        );
      }

      case "publications": {
        if (!sectionVisible(sections, "publications") || publications.length === 0) return null;
        return (
          <TwoCol key="publications" label={sectionLabel(sections, "publications", "Writing & talks")} ref="publications">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {publications.map((p, i) => (
                <div key={p.id} style={{ padding: "14px 0", borderBottom: i < publications.length - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 3, flexWrap: "wrap" }}>
                    <span style={{ padding: "2px 8px", fontFamily: mono, fontSize: 10.5, color: accent, border: `1px solid ${accent}40`, borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.08em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                    <span style={{ fontFamily: mono, fontSize: 11, color: subtle }}>{p.year}</span>
                  </div>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, textDecoration: "none", letterSpacing: "-0.01em" }}>{p.title}</a>
                  ) : (
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.01em" }}>{p.title}</div>
                  )}
                  <div style={{ fontSize: 13, color: muted, fontFamily: body, marginTop: 2 }}>{p.venue}</div>
                </div>
              ))}
            </div>
          </TwoCol>
        );
      }

      case "testimonials": {
        if (!sectionVisible(sections, "testimonials") || testimonials.length === 0) return null;
        return (
          <section key="testimonials" data-section="testimonials" style={{ marginBottom: 80 }}>
            <SectionTitle label={sectionLabel(sections, "testimonials", "Testimonials")} />
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : testimonials.length === 1 ? "1fr" : testimonials.length === 2 ? "1fr 1fr" : "repeat(3, 1fr)", gap: 16 }}>
              {testimonials.map(t => (
                <div key={t.id} style={{ background: white, border: `1px solid ${border}`, borderRadius: 10, padding: "20px 22px" }}>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: ink, margin: "0 0 14px", fontFamily: body, fontStyle: "italic" }} dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {t.avatar_url && <img src={t.avatar_url} alt={t.author} style={{ width: 30, height: 30, borderRadius: 999, objectFit: "cover" }} />}
                    <div>
                      <div style={{ fontFamily: display, fontWeight: 600, fontSize: 13.5, color: ink }}>{t.author}</div>
                      {(t.role || t.company) && <div style={{ fontSize: 12, color: muted, fontFamily: body }}>{[t.role, t.company].filter(Boolean).join(", ")}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "awards": {
        if (!sectionVisible(sections, "awards") || awards.length === 0) return null;
        return (
          <TwoCol key="awards" label={sectionLabel(sections, "awards", "Awards")} ref="awards">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {awards.map((a, i) => (
                <div key={a.id} style={{ padding: "14px 0", borderBottom: i < awards.length - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink }}>{a.title}</div>
                    <div style={{ fontFamily: mono, fontSize: 11, color: subtle }}>{a.year}</div>
                  </div>
                  <div style={{ fontSize: 13, color: muted, fontFamily: body }}>{a.issuer}</div>
                  {a.summary && <p style={{ fontSize: 13.5, color: muted, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: a.summary }} />}
                </div>
              ))}
            </div>
          </TwoCol>
        );
      }

      case "certifications": {
        if (!sectionVisible(sections, "certifications") || certifications.length === 0) return null;
        return (
          <TwoCol key="certifications" label={sectionLabel(sections, "certifications", "Certifications")} ref="certifications">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {certifications.map((c, i) => (
                <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "12px 0", borderBottom: i < certifications.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: muted, fontFamily: body }}>{c.issuer}</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: subtle, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{c.year}</div>
                </div>
              ))}
            </div>
          </TwoCol>
        );
      }

      case "languages": {
        if (!sectionVisible(sections, "languages") || languages.length === 0) return null;
        return (
          <TwoCol key="languages" label={sectionLabel(sections, "languages", "Languages")} ref="languages">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {languages.map(l => (
                <div key={l.id} style={{ background: white, border: `1px solid ${border}`, borderRadius: 999, padding: "6px 16px" }}>
                  <span style={{ fontFamily: body, fontSize: 13.5, color: ink }}>{l.name}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: subtle, marginLeft: 8 }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </TwoCol>
        );
      }

      case "volunteer": {
        if (!sectionVisible(sections, "volunteer") || volunteer.length === 0) return null;
        return (
          <TwoCol key="volunteer" label={sectionLabel(sections, "volunteer", "Volunteer")} ref="volunteer">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {volunteer.map((v, i) => (
                <div key={v.id} style={{ padding: "14px 0", borderBottom: i < volunteer.length - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 2 }}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink }}>{v.organization}</div>
                    <div style={{ fontFamily: mono, fontSize: 11, color: subtle }}>{v.period}</div>
                  </div>
                  <div style={{ fontSize: 13, color: muted, fontFamily: body }}>{v.role}</div>
                  {v.description && <p style={{ fontSize: 13.5, color: muted, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: v.description }} />}
                </div>
              ))}
            </div>
          </TwoCol>
        );
      }

      default: return null;
    }
  };

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 14.5, lineHeight: 1.55, minHeight: "100%" }}>
      {/* Header */}
      <header style={{ borderBottom: `1px solid ${border}`, background: white }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: m ? "20px" : "32px 32px 28px", display: m ? "flex" : "grid", gridTemplateColumns: "auto 1fr auto", flexDirection: m ? "column" : undefined, gap: m ? 16 : 32, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} style={{ width: 48, height: 48, borderRadius: 999, objectFit: "cover" }} />
            ) : (
              <div style={{ width: 48, height: 48, borderRadius: 999, background: accent, color: "white", fontFamily: display, fontWeight: 700, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>{initials}</div>
            )}
            <div>
              <h1 style={{ fontFamily: display, fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", margin: 0, color: ink, lineHeight: 1 }}>
                {user.name}<span style={{ color: accent }}>.</span>
              </h1>
              <div style={{ fontSize: 13, color: muted, marginTop: 3, fontFamily: body }}>{user.headline}</div>
            </div>
          </div>
          {!m && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {user.available && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 10px", borderRadius: 999, background: "#E8F8EE", color: "#14532D", fontSize: 12, fontWeight: 500, fontFamily: body }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: "rgb(22,163,74)", display: "inline-block" }} />
                  {user.availability_text ?? "Available"}
                </div>
              )}
            </div>
          )}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {user.social.map(s => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", fontSize: 12, fontWeight: 500, color: muted, border: `1px solid ${border}`, borderRadius: 999, textDecoration: "none", fontFamily: body, textTransform: "capitalize" }}>{s.label}</a>
            ))}
            <a href={`mailto:${user.email}`} style={{ padding: "8px 16px", fontSize: 12, fontWeight: 500, color: white, background: ink, borderRadius: 999, textDecoration: "none", fontFamily: body }}>Email →</a>
          </div>
        </div>
      </header>

      {/* Main */}
      <div style={{ maxWidth: maxW, margin: "0 auto", padding: m ? "40px 20px 80px" : "48px 32px 96px" }}>
        {ordered.map(type => renderSection(type))}

        {custom.map(sec => {
          if (!sec.visible || !sec.items?.length) return null;
          return (
            <TwoCol key={sec.id} label={sec.label} ref="custom">
              <div style={{ display: "flex", flexDirection: "column" }}>
                {sec.items.map((item, i) => (
                  <div key={item.id} style={{ padding: "14px 0", borderBottom: i < (sec.items?.length ?? 0) - 1 ? `1px solid ${border}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 2 }}>
                      <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink }}>{item.heading}</div>
                      {item.date && <div style={{ fontFamily: mono, fontSize: 11, color: subtle }}>{item.date}</div>}
                    </div>
                    {item.subheading && <div style={{ fontSize: 13, color: muted, fontFamily: body }}>{item.subheading}</div>}
                     {item.description && <p style={{ fontSize: 13.5, color: muted, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                    {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: accent, textDecoration: "none", marginTop: 4, display: "inline-block" }}>View ↗</a>}
                  </div>
                ))}
              </div>
            </TwoCol>
          );
        })}

        {sectionVisible(sections, "contact") && (
          <section data-section="contact" style={{ display: m ? "block" : "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start", paddingTop: 32, borderTop: `1px solid ${border}` }}>
            <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: m ? 28 : 40, letterSpacing: "-0.03em", margin: m ? "0 0 20px" : 0, color: ink, lineHeight: 1 }}>{sectionLabel(sections, "contact", "Contact")}</h2>
            <div>
              <a href={`mailto:${user.email}`} style={{ display: "inline-block", padding: "12px 20px", background: ink, color: white, borderRadius: 999, fontSize: 14, fontWeight: 500, textDecoration: "none", marginBottom: 20, fontFamily: body }}>{user.email} →</a>
              {user.contact_note && <p style={{ fontSize: 14.5, color: muted, lineHeight: 1.6, margin: "0 0 16px", fontFamily: body }}>{user.contact_note}</p>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {user.social.map(s => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 14px", fontSize: 12.5, color: muted, border: `1px solid ${border}`, borderRadius: 999, textDecoration: "none", fontFamily: body }}>{s.label} ↗</a>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Profolyo branding */}
      <div style={{ textAlign: "center", padding: "32px 24px 24px", marginTop: 40 }}>
        <p style={{ fontSize: 12, color: "rgba(128,128,128,0.6)", fontFamily: "'Inter', sans-serif", margin: 0 }}>
          Made with{" "}
          <a href="https://profolyo.me" target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(128,128,128,0.7)", textDecoration: "underline", textDecorationColor: "rgba(128,128,128,0.35)", textUnderlineOffset: 2 }}>
            Profolyo
          </a>
        </p>
      </div>
    </div>
  );
}
