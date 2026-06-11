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

function StatusPill({ status }: { status: string }) {
  const [bg, fg, label] = STATUS_MAP[status] ?? STATUS_MAP.archived;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, fontWeight: 500, borderRadius: 999, background: bg, color: fg, letterSpacing: "0.04em", textTransform: "uppercase" }}>
      <span style={{ width: 5, height: 5, borderRadius: 999, background: fg, display: "inline-block" }} />
      {label}
    </span>
  );
}

export default function HalcyonTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const { user, projects, experience, education, skills, publications = [], testimonials = [], awards = [], certifications = [], languages = [], volunteer = [] } = portfolio;
  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";

  const bg = "#0A0B0D";
  const ink = "#F4F4F0";
  const muted = "#9CA3AF";
  const border = "#1F2328";
  const dim = "#52555E";
  const surface = "#161A1F";

  const m = useIsMobile();
  const px = m ? "20px" : "32px";
  const maxW = "1080px";

  const mono = "'JetBrains Mono', monospace";

  const ordered = orderedBuiltInTypes(sections);
  const custom = customSections(sections);

  const SectionLabel = ({ num, label }: { num: string; label: string }) => (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32, paddingBottom: 14, borderBottom: `1px solid ${border}` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <span style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.16em" }}>{num}</span>
        <h2 style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 18 : 22, letterSpacing: "-0.02em", margin: 0, color: ink }}>{label}</h2>
      </div>
    </div>
  );

  const renderSection = (type: string) => {
    switch (type) {
      case "about": {
        if (!sectionVisible(sections, "about")) return null;
        const bio = user.bio_long || user.bio;
        if (!bio) return null;
        return (
          <section key="about" data-section="about" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="02" label={sectionLabel(sections, "about", "About")} />
            <div style={{ maxWidth: "62ch", fontSize: 16, color: muted, lineHeight: 1.7, fontFamily: body }} dangerouslySetInnerHTML={{ __html: bio }} />
          </section>
        );
      }

      case "projects": {
        if (!sectionVisible(sections, "projects") || projects.length === 0) return null;
        const featured = projects.find(p => p.featured) ?? projects[0];
        const rest = projects.filter(p => p.id !== featured.id);
        return (
          <section key="projects" data-section="projects" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="01" label={sectionLabel(sections, "projects", "Selected work")} />
            {/* Featured card */}
            <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
              <div style={{ height: m ? 200 : 280, background: featured.cover_image_url ? `url(${featured.cover_image_url}) center/cover` : (featured.cover_color ?? COVER_COLOR_FALLBACK), position: "relative" }}>
                <div style={{ position: "absolute", top: 16, right: 16 }}><StatusPill status={featured.status} /></div>
              </div>
              <div style={{ padding: m ? "20px" : "28px 32px" }}>
                <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 20 : 26, letterSpacing: "-0.02em", margin: "0 0 8px", color: ink }}>{featured.title}</h3>
                <p style={{ fontSize: 15, color: muted, lineHeight: 1.55, margin: "0 0 16px", fontFamily: body }}>{featured.tagline}</p>
                {featured.tech_stack.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {featured.tech_stack.map(t => (
                      <span key={t} style={{ padding: "3px 10px", fontFamily: mono, fontSize: 11, color: accent, background: `${accent}15`, border: `1px solid ${accent}30`, borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Grid of rest */}
            {rest.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : rest.length === 1 ? "1fr" : rest.length === 2 ? "1fr 1fr" : "repeat(3, 1fr)", gap: 12 }}>
                {rest.map(p => (
                  <div key={p.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: 140, background: p.cover_image_url ? `url(${p.cover_image_url}) center/cover` : (p.cover_color ?? COVER_COLOR_FALLBACK), position: "relative" }}>
                      <div style={{ position: "absolute", top: 10, right: 10 }}><StatusPill status={p.status} /></div>
                    </div>
                    <div style={{ padding: "16px 18px 18px" }}>
                      <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 16, letterSpacing: "-0.015em", margin: "0 0 4px", color: ink }}>{p.title}</h3>
                      <p style={{ fontSize: 13, color: muted, lineHeight: 1.45, margin: 0, fontFamily: body }}>{p.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      }

      case "experience": {
        if (!sectionVisible(sections, "experience") || experience.length === 0) return null;
        return (
          <section key="experience" data-section="experience" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="03" label={sectionLabel(sections, "experience", "Experience")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {experience.map((e, i) => (
                <div key={e.id} style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr auto", gap: 16, padding: "20px 0", borderBottom: i < experience.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: accent, display: "inline-block", flexShrink: 0 }} />
                      <div style={{ fontFamily: display, fontWeight: 600, fontSize: 17, color: ink, letterSpacing: "-0.01em" }}>{e.company}</div>
                    </div>
                    <div style={{ fontSize: 13.5, color: muted, fontFamily: body, marginLeft: 18 }}>{e.title}{e.location ? ` · ${e.location}` : ""}</div>
                    {e.description && <p style={{ fontSize: 14, color: dim, lineHeight: 1.6, margin: "8px 0 0", maxWidth: "56ch", fontFamily: body, marginLeft: 18 }} dangerouslySetInnerHTML={{ __html: e.description }} />}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11.5, color: dim, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", textAlign: m ? "left" : "right", marginLeft: m ? 18 : 0 }}>{e.period}</div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "education": {
        if (!sectionVisible(sections, "education") || education.length === 0) return null;
        return (
          <section key="education" data-section="education" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="04" label={sectionLabel(sections, "education", "Education")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {education.map((e, i) => (
                <div key={e.id} style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr auto", gap: 16, padding: "16px 0", borderBottom: i < education.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.01em", marginBottom: 3 }}>{e.degree}</div>
                    <div style={{ fontSize: 13.5, color: muted, fontFamily: body }}>{e.institution}{e.location ? ` · ${e.location}` : ""}</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11.5, color: dim, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", textAlign: m ? "left" : "right" }}>{e.period}</div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "skills": {
        if (!sectionVisible(sections, "skills") || skills.length === 0) return null;
        return (
          <section key="skills" data-section="skills" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="05" label={sectionLabel(sections, "skills", "Skills")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {skills.map((cat, i) => (
                <div key={i}>
                  {cat.category && (
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>{cat.category}</div>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {cat.items.map(skill => (
                      <span key={skill} style={{ padding: "5px 13px", fontFamily: body, fontSize: 13, color: ink, background: surface, border: `1px solid ${border}`, borderRadius: 6 }}>{skill}</span>
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
          <section key="publications" data-section="publications" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="06" label={sectionLabel(sections, "publications", "Writing & talks")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {publications.map((p, i) => (
                <div key={p.id} style={{ padding: "16px 0", borderBottom: i < publications.length - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: mono, fontSize: 10.5, color: accent, letterSpacing: "0.1em" }}>{p.year}</span>
                    <span style={{ padding: "1px 7px", fontFamily: mono, fontSize: 10, color: muted, border: `1px solid ${border}`, borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                  </div>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: display, fontWeight: 500, fontSize: 17, color: ink, letterSpacing: "-0.01em", textDecoration: "none" }}>{p.title}</a>
                  ) : (
                    <div style={{ fontFamily: display, fontWeight: 500, fontSize: 17, color: ink, letterSpacing: "-0.01em" }}>{p.title}</div>
                  )}
                  <div style={{ fontSize: 13, color: muted, marginTop: 2, fontFamily: body }}>{p.venue}</div>
                  {p.summary && <p style={{ fontSize: 13.5, color: dim, lineHeight: 1.55, margin: "6px 0 0", maxWidth: "60ch", fontFamily: body }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "testimonials": {
        if (!sectionVisible(sections, "testimonials") || testimonials.length === 0) return null;
        return (
          <section key="testimonials" data-section="testimonials" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="07" label={sectionLabel(sections, "testimonials", "Testimonials")} />
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : testimonials.length === 1 ? "1fr" : "repeat(2, 1fr)", gap: 16 }}>
              {testimonials.map(t => (
                <div key={t.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "24px 28px" }}>
                  <p style={{ fontSize: 15, color: ink, lineHeight: 1.65, margin: "0 0 16px", fontFamily: body, fontStyle: "italic" }} dangerouslySetInnerHTML={{ __html: t.quote }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {t.avatar_url && <img src={t.avatar_url} alt={t.author} style={{ width: 32, height: 32, borderRadius: 999, objectFit: "cover" }} />}
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
          <section key="awards" data-section="awards" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="08" label={sectionLabel(sections, "awards", "Awards")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {awards.map((a, i) => (
                <div key={a.id} style={{ padding: "14px 0", borderBottom: i < awards.length - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.01em" }}>{a.title}</div>
                    <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.08em" }}>{a.year}</div>
                  </div>
                  <div style={{ fontSize: 13, color: muted, fontFamily: body, marginTop: 2 }}>{a.issuer}</div>
                  {a.summary && <p style={{ fontSize: 13.5, color: dim, margin: "6px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: a.summary }} />}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "certifications": {
        if (!sectionVisible(sections, "certifications") || certifications.length === 0) return null;
        return (
          <section key="certifications" data-section="certifications" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="09" label={sectionLabel(sections, "certifications", "Certifications")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {certifications.map((c, i) => (
                <div key={c.id} style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1fr auto", gap: 16, padding: "14px 0", borderBottom: i < certifications.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: muted, fontFamily: body }}>{c.issuer}</div>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{c.year}</div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "languages": {
        if (!sectionVisible(sections, "languages") || languages.length === 0) return null;
        return (
          <section key="languages" data-section="languages" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="10" label={sectionLabel(sections, "languages", "Languages")} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {languages.map(l => (
                <div key={l.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 8, padding: "12px 18px" }}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 14, color: ink }}>{l.name}</div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, color: muted, letterSpacing: "0.08em", marginTop: 2 }}>{l.proficiency}</div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "volunteer": {
        if (!sectionVisible(sections, "volunteer") || volunteer.length === 0) return null;
        return (
          <section key="volunteer" data-section="volunteer" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="11" label={sectionLabel(sections, "volunteer", "Volunteer")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {volunteer.map((v, i) => (
                <div key={v.id} style={{ padding: "16px 0", borderBottom: i < volunteer.length - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 2 }}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink }}>{v.organization}</div>
                    <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.08em" }}>{v.period}</div>
                  </div>
                  <div style={{ fontSize: 13.5, color: muted, fontFamily: body }}>{v.role}</div>
                  {v.description && <p style={{ fontSize: 13.5, color: dim, margin: "6px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: v.description }} />}
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
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.6, minHeight: "100%" }}>
      {/* Sticky nav */}
      <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(10,11,13,0.9)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: maxW, margin: "0 auto", padding: `14px ${px}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: ink }}>
            {user.avatar_url && <img src={user.avatar_url} alt="" style={{ width: 28, height: 28, borderRadius: 999, objectFit: "cover" }} />}
            <span style={{ fontFamily: display, fontWeight: 600, fontSize: 15, letterSpacing: "-0.015em" }}>{user.name.split(" ")[0]}</span>
          </a>
          {!m && (
            <nav style={{ display: "flex", alignItems: "center", gap: 28, fontFamily: body, fontSize: 13.5, color: muted }}>
              {sectionVisible(sections, "projects") && <a href="#projects" style={{ color: muted, textDecoration: "none" }}>{sectionLabel(sections, "projects", "Work")}</a>}
              {sectionVisible(sections, "publications") && publications.length > 0 && <a href="#publications" style={{ color: muted, textDecoration: "none" }}>{sectionLabel(sections, "publications", "Writing")}</a>}
              {sectionVisible(sections, "about") && <a href="#about" style={{ color: muted, textDecoration: "none" }}>{sectionLabel(sections, "about", "About")}</a>}
              {sectionVisible(sections, "contact") && <a href="#contact" style={{ color: ink, textDecoration: "none", fontWeight: 500 }}>{sectionLabel(sections, "contact", "Contact")}</a>}
            </nav>
          )}
        </div>
      </header>

      <div id="top" />

      {/* Hero */}
      {sectionVisible(sections, "hero") && (
        <section data-section="hero" style={{ maxWidth: maxW, margin: "0 auto", padding: m ? "80px 20px 64px" : "120px 32px 96px" }}>
          {/* Availability pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
            <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: "rgb(34,197,94)", opacity: 0.4 }} />
              <span style={{ position: "absolute", inset: 1, borderRadius: 999, background: "rgb(34,197,94)" }} />
            </span>
            <span style={{ fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.14em" }}>
              {user.available ? (user.availability_text ?? "Available for new opportunities") : "Not currently available"}
            </span>
          </div>

          <h1 style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 48 : 84, letterSpacing: "-0.04em", lineHeight: 1, margin: "0 0 32px", color: ink, maxWidth: "16ch", wordBreak: "break-word", overflowWrap: "break-word" }}>
            {user.headline}<span style={{ color: accent }}>.</span>
          </h1>

          <p style={{ fontSize: m ? 16 : 19, color: muted, maxWidth: "60ch", lineHeight: 1.55, margin: "0 0 40px", fontFamily: body }}>{user.bio}</p>

          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <a href={`mailto:${user.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 16px", background: ink, color: bg, fontSize: 14, fontWeight: 500, borderRadius: 8, textDecoration: "none", fontFamily: body }}>
              Get in touch <span style={{ opacity: 0.6 }}>↗</span>
            </a>
            {user.social.slice(0, 3).map(s => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 14px", color: ink, fontSize: 14, fontWeight: 500, borderRadius: 8, textDecoration: "none", border: `1px solid ${border}`, fontFamily: body }}>
                {s.label} <span style={{ opacity: 0.5 }}>↗</span>
              </a>
            ))}
          </div>

          {/* Stat pills */}
          <div style={{ marginTop: 56, paddingTop: 28, borderTop: `1px solid ${border}`, display: "grid", gridTemplateColumns: m ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 24, fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <div>
              <div style={{ marginBottom: 4 }}>Based in</div>
              <div style={{ color: ink, fontFamily: body, fontSize: 13.5, fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>{user.location}</div>
            </div>
            {user.pronouns && (
              <div>
                <div style={{ marginBottom: 4 }}>Pronouns</div>
                <div style={{ color: ink, fontFamily: body, fontSize: 13.5, fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>{user.pronouns}</div>
              </div>
            )}
            {experience.length > 0 && (
              <div>
                <div style={{ marginBottom: 4 }}>Experience</div>
                <div style={{ color: ink, fontFamily: body, fontSize: 13.5, fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>{experience.length} roles</div>
              </div>
            )}
            {projects.length > 0 && (
              <div>
                <div style={{ marginBottom: 4 }}>Projects</div>
                <div style={{ color: ink, fontFamily: body, fontSize: 13.5, fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>{projects.length} shipped</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Currently card */}
      {user.availability_text && sectionVisible(sections, "hero") && (
        <section style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: m ? "24px" : "32px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(600px 200px at 0% 0%, ${accent}12, transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.22em", textTransform: "uppercase" }}>— Currently</span>
              <p style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 18 : 28, letterSpacing: "-0.025em", lineHeight: 1.3, margin: "16px 0 0", color: ink, maxWidth: "44ch" }}>
                {user.availability_text}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Ordered sections */}
      {ordered.map(type => renderSection(type))}

      {/* Custom sections */}
      {custom.map(sec => {
        if (!sec.visible || !sec.items?.length) return null;
        return (
          <section key={sec.id} data-section="custom" style={{ maxWidth: maxW, margin: "0 auto", padding: `0 ${px} 96px` }}>
            <SectionLabel num="—" label={sec.label} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {sec.items.map((item, i) => (
                <div key={item.id} style={{ padding: "16px 0", borderBottom: i < (sec.items?.length ?? 0) - 1 ? `1px solid ${border}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 2 }}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink }}>{item.heading}</div>
                    {item.date && <div style={{ fontFamily: mono, fontSize: 11, color: dim }}>{item.date}</div>}
                  </div>
                  {item.subheading && <div style={{ fontSize: 13.5, color: muted, fontFamily: body }}>{item.subheading}</div>}
                  {item.description && <p style={{ fontSize: 13.5, color: dim, margin: "6px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                  {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: accent, textDecoration: "none", marginTop: 6, display: "inline-block" }}>View ↗</a>}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Contact */}
      {sectionVisible(sections, "contact") && (
        <section id="contact" data-section="contact" style={{ maxWidth: maxW, margin: "0 auto", padding: m ? `0 ${px} 80px` : `0 ${px} 96px`, textAlign: "center" }}>
          <div style={{ paddingTop: 28, borderTop: `1px solid ${border}` }}>
            <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>— {sectionLabel(sections, "contact", "Get in touch")}</div>
            <h2 style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 28 : 42, letterSpacing: "-0.03em", margin: "0 0 16px", color: ink }}>Let's work together</h2>
            {user.contact_note && <p style={{ fontSize: 16, color: muted, maxWidth: "50ch", lineHeight: 1.6, margin: "0 auto 28px", fontFamily: body }}>{user.contact_note}</p>}
            <a href={`mailto:${user.email}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", background: accent, color: bg, fontSize: 15, fontWeight: 600, borderRadius: 10, textDecoration: "none", fontFamily: body, marginBottom: 24 }}>
              {user.email} <span>↗</span>
            </a>
            {user.social.length > 0 && (
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
                {user.social.map(s => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" style={{ padding: "7px 14px", fontSize: 13, color: muted, border: `1px solid ${border}`, borderRadius: 8, textDecoration: "none", fontFamily: body }}>{s.label} ↗</a>
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
