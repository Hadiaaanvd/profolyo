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

export default function MarqueeTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const { user, projects, experience, education, skills, publications = [], testimonials = [], awards = [], certifications = [], languages = [], volunteer = [] } = portfolio;
  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";

  const bg = "#F7F2EA";
  const ink = "rgb(26,19,16)";
  const warm = "rgb(90,78,71)";
  const border = "rgb(229,221,205)";
  const subtle = "rgb(160,149,139)";
  const cream = "rgb(255,249,238)";
  const mono = "'JetBrains Mono', monospace";
  const maxW = "1320px";

  const m = useIsMobile();
  const px = m ? "24px" : "40px";

  const ordered = orderedBuiltInTypes(sections);
  const custom = customSections(sections);

  const SectionLabel = ({ label }: { label: string }) => (
    <div style={{ marginBottom: 10 }}>
      <span style={{ fontFamily: mono, fontSize: 11.5, color: accent, letterSpacing: "0.22em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );

  const SectionHeading = ({ label }: { label: string }) => (
    <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 26 : 36, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.1, color: ink }}>{label}.</h2>
  );

  const renderSection = (type: string) => {
    switch (type) {
      case "about": {
        if (!sectionVisible(sections, "about")) return null;
        const bio = user.bio_long || user.bio;
        if (!bio) return null;
        return (
          <section key="about" data-section="about" style={{ maxWidth: 920, margin: "0 auto", padding: `64px ${px}` }}>
            <div style={{ marginBottom: 28 }}>
              <SectionLabel label={sectionLabel(sections, "about", "About")} />
            </div>
            <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 28 : 42, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 32px", color: ink }}>A short biography.</h2>
            <div style={{ fontSize: m ? 16 : 19, color: ink, lineHeight: 1.6, margin: 0, letterSpacing: "-0.005em", fontFamily: body }} dangerouslySetInnerHTML={{ __html: bio }} />
          </section>
        );
      }

      case "projects": {
        if (!sectionVisible(sections, "projects") || projects.length === 0) return null;
        return (
          <section key="projects" data-section="projects" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}`, flexWrap: "wrap", gap: 12 }}>
              <div>
                <SectionLabel label={sectionLabel(sections, "projects", "Work")} />
                <SectionHeading label="Selected projects" />
              </div>
              <span style={{ fontFamily: mono, fontSize: 11, color: warm, letterSpacing: "0.14em", textTransform: "uppercase" }}>{projects.length} projects</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {projects.map((p, i) => {
                const [,,statusLabel] = STATUS_MAP[p.status] ?? STATUS_MAP.archived;
                return (
                  <div key={p.id} style={{ display: m ? "block" : "grid", gridTemplateColumns: "200px 1fr", gap: 32, padding: "28px 0", borderBottom: i < projects.length - 1 ? `1px solid ${border}` : "none", alignItems: "start" }}>
                    {/* Thumbnail */}
                    <div style={{ aspectRatio: "4 / 3", borderRadius: 6, overflow: "hidden", background: p.cover_color ?? COVER_COLOR_FALLBACK, marginBottom: m ? 16 : 0 }}>
                      {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                    </div>
                    {/* Content */}
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                        <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 20 : 26, letterSpacing: "-0.02em", margin: 0, color: ink }}>{p.title}</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          {p.period && <span style={{ fontFamily: mono, fontSize: 11, color: warm, letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.period}</span>}
                          <span style={{ fontFamily: mono, fontSize: 10.5, color: subtle, letterSpacing: "0.1em", textTransform: "uppercase" }}>{statusLabel}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: 15, color: warm, lineHeight: 1.55, margin: "0 0 12px", fontFamily: body }}>{p.tagline}</p>
                      {p.description && <p style={{ fontSize: 14, color: warm, lineHeight: 1.55, margin: "0 0 12px", fontFamily: body }} dangerouslySetInnerHTML={{ __html: p.description }} />}
                      {(p.role || p.team) && (
                        <div style={{ fontFamily: mono, fontSize: 11, color: subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                          {p.role && <span>{p.role}</span>}
                          {p.role && p.team && <span> · </span>}
                          {p.team && <span>Team: {p.team}</span>}
                        </div>
                      )}
                      {p.tech_stack.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {p.tech_stack.map(t => (
                            <span key={t} style={{ padding: "3px 10px", fontFamily: mono, fontSize: 11, color: warm, border: `1px solid ${border}`, borderRadius: 999, letterSpacing: "0.04em" }}>{t}</span>
                          ))}
                        </div>
                      )}
                      {p.links && p.links.length > 0 && (
                        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                          {p.links.map((l, li) => (
                            <a key={li} href={l.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: 11, color: accent, textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>{l.label ?? l.type} ↗</a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      }

      case "experience": {
        if (!sectionVisible(sections, "experience") || experience.length === 0) return null;
        return (
          <section key="experience" data-section="experience" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}`, flexWrap: "wrap", gap: 12 }}>
              <div>
                <SectionLabel label={sectionLabel(sections, "experience", "Career")} />
                <SectionHeading label="Experience" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {experience.map((e, i) => (
                <div key={e.id} style={{ display: m ? "block" : "grid", gridTemplateColumns: "180px 1fr", gap: 40, padding: "24px 0", borderBottom: i < experience.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div style={{ fontFamily: mono, fontSize: 11.5, color: warm, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: m ? 8 : 0 }}>{e.period}</div>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 17 : 20, letterSpacing: "-0.015em", color: ink, marginBottom: 3 }}>{e.title}</div>
                    <div style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 15 : 17, color: warm, marginBottom: e.description ? 8 : 0 }}>{e.company}{e.location ? ` · ${e.location}` : ""}</div>
                    {e.description && <p style={{ fontSize: 14.5, color: warm, lineHeight: 1.55, margin: 0, maxWidth: "56ch", fontFamily: body }} dangerouslySetInnerHTML={{ __html: e.description }} />}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "education": {
        if (!sectionVisible(sections, "education") || education.length === 0) return null;
        return (
          <section key="education" data-section="education" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}`, flexWrap: "wrap", gap: 12 }}>
              <div>
                <SectionLabel label={sectionLabel(sections, "education", "Background")} />
                <SectionHeading label="Education" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {education.map((e, i) => (
                <div key={e.id} style={{ display: m ? "block" : "grid", gridTemplateColumns: "180px 1fr", gap: 40, padding: "24px 0", borderBottom: i < education.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div style={{ fontFamily: mono, fontSize: 11.5, color: warm, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: m ? 8 : 0 }}>{e.period}</div>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 16 : 19, letterSpacing: "-0.01em", color: ink, marginBottom: 3 }}>{e.degree}</div>
                    <div style={{ fontSize: 14, color: warm, fontFamily: body }}>{e.institution}{e.location ? ` · ${e.location}` : ""}</div>
                    {e.description && <p style={{ fontSize: 14, color: warm, lineHeight: 1.55, margin: "6px 0 0", fontFamily: body }} dangerouslySetInnerHTML={{ __html: e.description }} />}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "skills": {
        if (!sectionVisible(sections, "skills") || skills.length === 0) return null;
        return (
          <section key="skills" data-section="skills" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}`, flexWrap: "wrap", gap: 12 }}>
              <div>
                <SectionLabel label={sectionLabel(sections, "skills", "Expertise")} />
                <SectionHeading label="Skills" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {skills.map((cat, i) => (
                <div key={i}>
                  {cat.category && <div style={{ fontFamily: mono, fontSize: 11, color: subtle, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>{cat.category}</div>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {cat.items.map(skill => (
                      <span key={skill} style={{ padding: "5px 14px", fontFamily: body, fontSize: 14, color: ink, background: cream, border: `1px solid ${border}`, borderRadius: 4 }}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "publications": {
        if (!sectionVisible(sections, "publications") || publications.length === 0) return null;
        return (
          <section key="publications" data-section="publications" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}`, flexWrap: "wrap", gap: 12 }}>
              <div>
                <SectionLabel label="Talks · podcasts · writing" />
                <SectionHeading label={sectionLabel(sections, "publications", "Speaking & published")} />
              </div>
              <span style={{ fontFamily: mono, fontSize: 11, color: warm, letterSpacing: "0.14em", textTransform: "uppercase" }}>{publications.length} pieces</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {publications.map((p, i) => (
                <div key={p.id} style={{ display: m ? "block" : "grid", gridTemplateColumns: "80px 1fr auto", gap: 24, padding: "24px 0", borderBottom: i < publications.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div style={{ fontFamily: mono, fontSize: 11.5, color: warm, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: m ? 6 : 0 }}>{p.year}</div>
                  <div>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 18 : 22, letterSpacing: "-0.02em", color: ink, marginBottom: 4, lineHeight: 1.25, textDecoration: "none", display: "block" }}>{p.title}</a>
                    ) : (
                      <div style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 18 : 22, letterSpacing: "-0.02em", color: ink, marginBottom: 4, lineHeight: 1.25 }}>{p.title}</div>
                    )}
                    <div style={{ fontSize: 14, color: warm, marginBottom: 6, fontFamily: body }}>
                      <span style={{ fontFamily: mono, fontSize: 10.5, color: accent, letterSpacing: "0.16em", textTransform: "uppercase", marginRight: 10, padding: "2px 8px", border: `1px solid ${accent}40`, borderRadius: 999 }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                      {p.venue}
                    </div>
                    {p.summary && <p style={{ fontSize: 14, color: warm, margin: 0, lineHeight: 1.55, maxWidth: "70ch", fontFamily: body }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
                  </div>
                  {p.url && !m && <span style={{ fontFamily: mono, fontSize: 14, color: subtle, alignSelf: "center" }}>↗</span>}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "testimonials": {
        if (!sectionVisible(sections, "testimonials") || testimonials.length === 0) return null;
        return (
          <section key="testimonials" data-section="testimonials" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}` }}>
              <SectionLabel label={sectionLabel(sections, "testimonials", "Testimonials")} />
              <SectionHeading label="What people say" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : testimonials.length === 1 ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
              {testimonials.map(t => (
                <div key={t.id} style={{ background: cream, border: `1px solid ${border}`, borderRadius: 6, padding: "28px 32px" }}>
                  <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 18, marginBottom: 20 }}>
                    <p style={{ fontFamily: display, fontStyle: "normal", fontWeight: 500, fontSize: m ? 16 : 18, lineHeight: 1.5, margin: 0, color: warm, letterSpacing: "-0.01em" }} dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {t.avatar_url && <img src={t.avatar_url} alt={t.author} style={{ width: 32, height: 32, borderRadius: 999, objectFit: "cover" }} />}
                    <div>
                      <div style={{ fontFamily: display, fontWeight: 600, fontSize: 14, color: ink }}>{t.author}</div>
                      {(t.role || t.company) && <div style={{ fontFamily: mono, fontSize: 10.5, color: subtle, letterSpacing: "0.14em", textTransform: "uppercase" }}>{[t.role, t.company].filter(Boolean).join(", ")}</div>}
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
          <section key="awards" data-section="awards" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}` }}>
              <SectionLabel label={sectionLabel(sections, "awards", "Recognition")} />
              <SectionHeading label="Awards" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {awards.map((a, i) => (
                <div key={a.id} style={{ display: m ? "block" : "grid", gridTemplateColumns: "80px 1fr", gap: 24, padding: "20px 0", borderBottom: i < awards.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div style={{ fontFamily: mono, fontSize: 11.5, color: warm, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: m ? 6 : 0 }}>{a.year}</div>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em", color: ink, marginBottom: 3 }}>{a.title}</div>
                    <div style={{ fontSize: 14, color: warm, fontFamily: body }}>{a.issuer}</div>
                    {a.summary && <p style={{ fontSize: 14, color: warm, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: a.summary }} />}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "certifications": {
        if (!sectionVisible(sections, "certifications") || certifications.length === 0) return null;
        return (
          <section key="certifications" data-section="certifications" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}` }}>
              <SectionLabel label={sectionLabel(sections, "certifications", "Credentials")} />
              <SectionHeading label="Certifications" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {certifications.map((c, i) => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, padding: "16px 0", borderBottom: i < certifications.length - 1 ? `1px solid ${border}` : "none", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", color: ink }}>{c.name}</div>
                    <div style={{ fontSize: 14, color: warm, fontFamily: body }}>{c.issuer}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: mono, fontSize: 11, color: warm, letterSpacing: "0.12em", textTransform: "uppercase" }}>{c.year}</span>
                    {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: 11, color: accent, textDecoration: "none" }}>View ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "languages": {
        if (!sectionVisible(sections, "languages") || languages.length === 0) return null;
        return (
          <section key="languages" data-section="languages" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}` }}>
              <SectionLabel label={sectionLabel(sections, "languages", "Communication")} />
              <SectionHeading label="Languages" />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {languages.map(l => (
                <div key={l.id} style={{ background: cream, border: `1px solid ${border}`, borderRadius: 6, padding: "14px 20px" }}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink }}>{l.name}</div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, color: subtle, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 3 }}>{l.proficiency}</div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "volunteer": {
        if (!sectionVisible(sections, "volunteer") || volunteer.length === 0) return null;
        return (
          <section key="volunteer" data-section="volunteer" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}` }}>
              <SectionLabel label={sectionLabel(sections, "volunteer", "Giving back")} />
              <SectionHeading label="Volunteer" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {volunteer.map((v, i) => (
                <div key={v.id} style={{ display: m ? "block" : "grid", gridTemplateColumns: "180px 1fr", gap: 40, padding: "24px 0", borderBottom: i < volunteer.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div style={{ fontFamily: mono, fontSize: 11.5, color: warm, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: m ? 8 : 0 }}>{v.period}</div>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em", color: ink, marginBottom: 3 }}>{v.role}</div>
                    <div style={{ fontSize: 14, color: warm, fontFamily: body }}>{v.organization}</div>
                    {v.description && <p style={{ fontSize: 14, color: warm, margin: "6px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: v.description }} />}
                  </div>
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
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15.5, lineHeight: 1.6, minHeight: "100%" }}>

      {/* Hero: large photo left + text right */}
      {sectionVisible(sections, "hero") && (
        <section data-section="hero" style={{ position: "relative" }}>
          <div style={{ maxWidth: maxW, margin: "0 auto", padding: m ? "40px 24px 0" : `56px ${px} 0`, display: m ? "block" : "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "stretch", minHeight: m ? "auto" : 660 }}>
            {/* Photo */}
            <div style={{ position: "relative", marginBottom: m ? 32 : 0 }}>
              <div style={{ aspectRatio: "4 / 5", borderRadius: 8, overflow: "hidden", background: cream, border: `1px solid ${border}`, position: "relative" }}>
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : user.cover_image_url ? (
                  <img src={user.cover_image_url} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${accent}22, ${accent}55)` }} />
                )}
                {/* Availability badge */}
                {user.available && (
                  <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.96)", padding: "6px 12px 6px 10px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: body, fontSize: 11.5, fontWeight: 500, color: ink, boxShadow: "rgba(0,0,0,0.15) 0px 8px 24px -8px" }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "rgb(22,163,74)", display: "inline-block" }} />
                    {user.availability_text ?? "Currently available"}
                  </div>
                )}
                {/* Location + pronouns footer */}
                {(user.location || user.pronouns) && (
                  <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, background: "rgba(255,253,247,0.95)", padding: "14px 18px", borderRadius: 4, fontFamily: mono, fontSize: 10.5, color: warm, letterSpacing: "0.16em", textTransform: "uppercase", display: "flex", justifyContent: "space-between" }}>
                    {user.location && <span>{user.location}</span>}
                    {user.pronouns && <span>{user.pronouns}</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Text side */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 16, paddingBottom: 16 }}>
              {user.headline && (
                <span style={{ fontFamily: mono, fontSize: 11.5, color: accent, letterSpacing: "0.22em", textTransform: "uppercase" }}>— {user.headline}</span>
              )}
              <h1 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 48 : 80, letterSpacing: "-0.035em", lineHeight: 0.96, margin: "20px 0 24px", color: ink, wordBreak: "break-word", overflowWrap: "break-word" }}>{user.name}</h1>
              <div style={{ fontSize: m ? 16 : 21, lineHeight: 1.5, color: ink, margin: "0 0 28px", maxWidth: "32ch", fontWeight: 400, letterSpacing: "-0.01em", fontFamily: body }} dangerouslySetInnerHTML={{ __html: user.bio }} />

              {/* Testimonial pull quote (first testimonial if available) */}
              {testimonials.length > 0 && (
                <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 18, marginBottom: 32, maxWidth: "36ch" }}>
                  <p style={{ fontFamily: display, fontStyle: "normal", fontWeight: 500, fontSize: m ? 14 : 18, lineHeight: 1.45, margin: 0, color: warm, letterSpacing: "-0.01em" }} dangerouslySetInnerHTML={{ __html: `"${testimonials[0].quote}"` }} />
                  <div style={{ marginTop: 10, fontFamily: mono, fontSize: 10.5, color: subtle, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    — {testimonials[0].author}{testimonials[0].company ? `, ${testimonials[0].company}` : ""}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a href={`mailto:${user.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 22px", background: ink, color: cream, fontSize: 14.5, fontWeight: 500, borderRadius: 4, textDecoration: "none", letterSpacing: "-0.005em", fontFamily: body }}>Get in touch →</a>
                {user.resume_url && (
                  <a href={user.resume_url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 22px", background: "transparent", color: ink, fontSize: 14.5, fontWeight: 500, borderRadius: 4, textDecoration: "none", border: `1px solid ${ink}`, fontFamily: body }}>Résumé ↗</a>
                )}
              </div>
            </div>
          </div>

          {/* Company banner */}
          {experience.length > 0 && (
            <div style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, marginTop: 56, background: cream }}>
              <div style={{ maxWidth: maxW, margin: "0 auto", padding: `24px ${px}`, display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", justifyContent: "space-between" }}>
                <span style={{ fontFamily: mono, fontSize: 11, color: warm, letterSpacing: "0.2em", textTransform: "uppercase" }}>Built & led teams at —</span>
                <div style={{ display: "flex", gap: 36, flexWrap: "wrap", alignItems: "center" }}>
                  {experience.slice(0, 4).map(e => (
                    <span key={e.id} style={{ fontFamily: display, fontWeight: 600, fontSize: 18, color: warm, letterSpacing: "-0.02em", opacity: 0.85 }}>{e.company}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Stats bar */}
      {sectionVisible(sections, "hero") && (
        <section style={{ maxWidth: maxW, margin: "0 auto", padding: `80px ${px} 56px` }}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 8, background: "#FFFFFF", border: `1px solid ${border}`, borderRadius: 6, overflow: "hidden" }}>
            {[
              [projects.length > 0 ? `${projects.length}` : "—", "Projects"],
              [experience.length > 0 ? `${experience.length}` : "—", "Companies"],
              [publications.length > 0 ? `${publications.length}` : "—", "Talks & writing"],
              [testimonials.length > 0 ? `${testimonials.length}` : "—", "Endorsements"],
            ].map(([val, lbl], i, arr) => (
              <div key={i} style={{ padding: "32px 24px", borderRight: (m ? i % 2 === 0 : i < arr.length - 1) ? `1px solid ${border}` : "none", borderBottom: (m && i < 2) ? `1px solid ${border}` : "none" }}>
                <div style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 40 : 56, letterSpacing: "-0.04em", lineHeight: 1, color: ink, marginBottom: 8 }}>{val}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: warm, letterSpacing: "0.18em", textTransform: "uppercase" }}>{lbl}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {ordered.map(type => renderSection(type))}

      {/* Custom sections */}
      {custom.map(sec => {
        if (!sec.visible || !sec.items?.length) return null;
        return (
          <section key={sec.id} data-section="custom" style={{ maxWidth: maxW, margin: "0 auto", padding: `56px ${px}` }}>
            <div style={{ marginBottom: 32, paddingBottom: 12, borderBottom: `1px solid ${ink}` }}>
              <SectionLabel label={sec.label} />
              <SectionHeading label={sec.label} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {sec.items.map((item, i) => (
                <div key={item.id} style={{ padding: "20px 0", borderBottom: i < (sec.items?.length ?? 0) - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 4, flexWrap: "wrap" }}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 18, color: ink, letterSpacing: "-0.01em" }}>{item.heading}</div>
                    {item.date && <div style={{ fontFamily: mono, fontSize: 11, color: warm, letterSpacing: "0.12em", textTransform: "uppercase" }}>{item.date}</div>}
                  </div>
                  {item.subheading && <div style={{ fontSize: 14, color: warm, fontFamily: body }}>{item.subheading}</div>}
                  {item.description && <p style={{ fontSize: 14, color: warm, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                  {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: 11, color: accent, textDecoration: "none", marginTop: 6, display: "inline-block", letterSpacing: "0.06em", textTransform: "uppercase" }}>View ↗</a>}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Contact */}
      {sectionVisible(sections, "contact") && (
        <section data-section="contact" style={{ maxWidth: maxW, margin: "0 auto", padding: `80px ${px}`, textAlign: "center" }}>
          <div style={{ paddingTop: 56, borderTop: `1px solid ${border}` }}>
            <SectionLabel label={sectionLabel(sections, "contact", "Get in touch")} />
            <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 32 : 56, letterSpacing: "-0.035em", margin: "16px 0 24px", lineHeight: 0.96, color: ink }}>Let's work together.</h2>
            {user.contact_note && <p style={{ fontSize: 17, color: warm, maxWidth: "44ch", lineHeight: 1.6, margin: "0 auto 28px", fontFamily: body }}>{user.contact_note}</p>}
            <a href={`mailto:${user.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: ink, color: cream, fontSize: 16, fontWeight: 500, borderRadius: 4, textDecoration: "none", marginBottom: 28, fontFamily: body }}>{user.email} →</a>
            {user.social.length > 0 && (
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
                {user.social.map(s => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: mono, fontSize: 11.5, color: warm, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label} ↗</a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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
