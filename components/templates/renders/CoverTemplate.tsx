"use client";
import type { Portfolio, SectionConfig } from "@/types/portfolio";
import { sectionVisible, sectionLabel, orderedBuiltInTypes, customSections, COVER_COLOR_FALLBACK, PUBLICATION_TYPE_LABEL } from "../utils";
import { useIsMobile } from "../hooks";

interface Props { portfolio: Portfolio; accent: string; sections: SectionConfig[]; headingFont?: string; bodyFont?: string; }

export default function CoverTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const {
    user, projects, experience, education, skills,
    publications = [], testimonials = [], awards = [],
    certifications = [], languages = [], volunteer = [],
  } = portfolio;

  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";
  const mono = "'JetBrains Mono', monospace";
  const bg = "#0F0E0B";
  const ink = "rgb(250,250,247)";
  const muted = "rgb(162,159,146)";
  const dim = "rgb(111,109,99)";
  const border = "rgb(52,51,46)";
  const m = useIsMobile();
  const px = m ? "20px" : "32px";

  // Cover hero background: use cover image or accent-based gradient
  const heroBg = user.cover_image_url
    ? `url(${user.cover_image_url}) center/cover no-repeat`
    : `linear-gradient(135deg, ${accent}CC 0%, ${accent} 60%, ${accent}DD 100%)`;

  const ordered = orderedBuiltInTypes(sections);
  let counter = 1;

  const renderSection = (type: string) => {
    const num = String(counter++).padStart(2, "0");
    switch (type) {

      case "about": {
        const text = user.bio_long ?? user.bio;
        if (!text) { counter--; return null; }
        return (
          <section key="about" data-section="about" id="about" style={{ padding: `${m ? "60px" : "120px"} ${px}`, borderTop: `1px solid ${border}` }}>
            <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
                {sectionLabel(sections, "about", "About")}
              </div>
              {user.headline && (
                <h2 style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 28 : 44, letterSpacing: "-0.035em", margin: "0 0 32px", lineHeight: 1.1, color: ink }}>
                  {user.headline}
                </h2>
              )}
              <p style={{ fontFamily: body, fontSize: 16, color: muted, margin: 0, lineHeight: 1.7 }}
                 dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          </section>
        );
      }

      case "projects": {
        if (projects.length === 0) { counter--; return null; }
        return (
          <section key="projects" data-section="projects" id="work" style={{ padding: `${m ? "60px" : "120px"} ${px} ${m ? "48px" : "80px"}` }}>
            <div style={{ maxWidth: 1480, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 64, paddingBottom: 24, borderBottom: `1px solid ${border}` }}>
                <h2 style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 32 : 56, letterSpacing: "-0.035em", margin: 0, lineHeight: 1, color: ink }}>
                  {sectionLabel(sections, "projects", "Selected work")}
                </h2>
                <span style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  {projects.length} {projects.length === 1 ? "piece" : "pieces"}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
                {projects.map((p, i) => {
                  // Alternate: even = image left (2:1), odd = image right (1:2)
                  const isImageLeft = i % 2 === 0;
                  const coverBg = p.cover_color ?? COVER_COLOR_FALLBACK;
                  const imageEl = (
                    <div style={{ aspectRatio: "16/10", background: coverBg, position: "relative", overflow: "hidden" }}>
                      {p.cover_image_url && (
                        <img src={p.cover_image_url} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                    </div>
                  );
                  const infoEl = (
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12 }}>
                        № {String(i + 1).padStart(2, "0")}{p.period ? ` · ${p.period}` : ""}
                      </div>
                      <h3 style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 24 : 36, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 12px", color: ink }}>
                        {p.title}
                      </h3>
                      <p style={{ fontSize: 15, color: muted, margin: "0 0 16px", lineHeight: 1.5, maxWidth: "32ch" }}>{p.tagline}</p>
                      {p.role && (
                        <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.role}</div>
                      )}
                      {p.tech_stack.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                          {p.tech_stack.slice(0, 4).map((t) => (
                            <span key={t} style={{ padding: "4px 10px", fontFamily: mono, fontSize: 10.5, color: dim, border: `1px solid ${border}`, borderRadius: 3 }}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                  return (
                    <article key={p.id} style={
                      m || projects.length === 1
                        ? { display: "flex", flexDirection: "column", gap: 24 }
                        : { display: "grid", gridTemplateColumns: isImageLeft ? "2fr 1fr" : "1fr 2fr", gap: 48, alignItems: "end" }
                    }>
                      {isImageLeft ? <>{imageEl}{infoEl}</> : <>{infoEl}{imageEl}</>}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      }

      case "experience": {
        if (experience.length === 0) { counter--; return null; }
        return (
          <section key="experience" data-section="experience" style={{ padding: `0 ${px} 80px` }}>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>
                {sectionLabel(sections, "experience", "Experience")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {experience.map((e) => (
                  <div key={e.id}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink, marginBottom: 2, letterSpacing: "-0.01em" }}>{e.company}</div>
                    <div style={{ fontSize: 13, color: muted, marginBottom: 2 }}>{e.title}</div>
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.08em" }}>{e.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case "education": {
        if (education.length === 0) { counter--; return null; }
        return (
          <section key="education" data-section="education" style={{ padding: `0 ${px} 80px` }}>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>
                {sectionLabel(sections, "education", "Education")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {education.map((ed) => (
                  <div key={ed.id}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink, marginBottom: 2, letterSpacing: "-0.01em" }}>{ed.degree}</div>
                    <div style={{ fontSize: 13, color: muted, marginBottom: 2 }}>{ed.institution}</div>
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.08em" }}>{ed.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case "skills": {
        if (skills.length === 0) { counter--; return null; }
        return (
          <section key="skills" data-section="skills" style={{ padding: `0 ${px} 80px` }}>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>
                {sectionLabel(sections, "skills", "Skills")}
              </div>
              {skills.map((s, i) => (
                <div key={i} style={{ marginBottom: i < skills.length - 1 ? 16 : 0 }}>
                  {s.category && (
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, marginBottom: 6, letterSpacing: "0.08em" }}>{s.category}</div>
                  )}
                  <div style={{ fontSize: 13.5, color: muted, lineHeight: 1.75 }}>{s.items.join(" · ")}</div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "testimonials": {
        if (testimonials.length === 0) { counter--; return null; }
        return (
          <section key="testimonials" data-section="testimonials" style={{ padding: `80px ${px}`, borderTop: `1px solid ${border}` }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 48, textAlign: "center" }}>
                {sectionLabel(sections, "testimonials", "Testimonials")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                {testimonials.map((t) => (
                  <blockquote key={t.id} style={{ margin: 0, textAlign: "center" }}>
                    <p style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 20 : 28, letterSpacing: "-0.02em", lineHeight: 1.3, color: ink, margin: "0 0 20px" }}
                       dangerouslySetInnerHTML={{ __html: t.quote }} />
                    <footer style={{ fontSize: 13, color: muted }}>
                      <span style={{ color: ink, fontWeight: 600 }}>{t.author}</span>
                      {t.role && <span> · {t.role}</span>}
                      {t.company && <span>, {t.company}</span>}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case "publications": {
        if (publications.length === 0) { counter--; return null; }
        return (
          <section key="publications" data-section="publications" style={{ padding: `80px ${px}`, borderTop: `1px solid ${border}` }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40, textAlign: "center" }}>
                {sectionLabel(sections, "publications", "Publications")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {publications.map((p) => (
                  <div key={p.id} style={{ paddingBottom: 24, borderBottom: `1px solid ${border}` }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontFamily: mono, fontSize: 10, color: accent, textTransform: "uppercase", letterSpacing: "0.12em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                      {p.year && <span style={{ fontFamily: mono, fontSize: 10, color: dim }}>{p.year}</span>}
                    </div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 18, color: ink, letterSpacing: "-0.01em", marginBottom: 4 }}>{p.title}</div>
                    {p.venue && <div style={{ fontSize: 13, color: muted }}>{p.venue}</div>}
                    {p.summary && (
                      <div style={{ fontSize: 14, color: muted, lineHeight: 1.6, marginTop: 8 }} dangerouslySetInnerHTML={{ __html: p.summary }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case "awards": {
        if (awards.length === 0) { counter--; return null; }
        return (
          <section key="awards" data-section="awards" style={{ padding: `80px ${px}`, borderTop: `1px solid ${border}` }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40, textAlign: "center" }}>
                {sectionLabel(sections, "awards", "Awards")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {awards.map((a) => (
                  <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 16, borderBottom: `1px solid ${border}` }}>
                    <div>
                      <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.01em" }}>{a.title}</div>
                      {a.issuer && <div style={{ fontSize: 13, color: muted, marginTop: 2 }}>{a.issuer}</div>}
                    </div>
                    {a.year && <span style={{ fontFamily: mono, fontSize: 11, color: dim }}>{a.year}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case "certifications": {
        if (certifications.length === 0) { counter--; return null; }
        return (
          <section key="certifications" data-section="certifications" style={{ padding: `80px ${px}`, borderTop: `1px solid ${border}` }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40, textAlign: "center" }}>
                {sectionLabel(sections, "certifications", "Certifications")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {certifications.map((c) => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 12, borderBottom: `1px solid ${border}` }}>
                    <div>
                      <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink }}>{c.name}</div>
                      {c.issuer && <div style={{ fontSize: 13, color: muted, marginTop: 2 }}>{c.issuer}</div>}
                    </div>
                    {c.year && <span style={{ fontFamily: mono, fontSize: 11, color: dim }}>{c.year}</span>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case "languages": {
        if (languages.length === 0) { counter--; return null; }
        return (
          <section key="languages" data-section="languages" style={{ padding: `0 ${px} 80px` }}>
            <div style={{ maxWidth: 1080, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>
                {sectionLabel(sections, "languages", "Languages")}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {languages.map((l) => (
                  <div key={l.id} style={{ paddingBottom: 8, borderBottom: `1px solid ${border}`, minWidth: 120 }}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 14, color: ink, marginBottom: 2 }}>{l.name}</div>
                    <div style={{ fontFamily: mono, fontSize: 10.5, color: dim }}>{l.proficiency}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case "volunteer": {
        if (volunteer.length === 0) { counter--; return null; }
        return (
          <section key="volunteer" data-section="volunteer" style={{ padding: `80px ${px}`, borderTop: `1px solid ${border}` }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40, textAlign: "center" }}>
                {sectionLabel(sections, "volunteer", "Volunteer")}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {volunteer.map((v) => (
                  <div key={v.id} style={{ paddingBottom: 18, borderBottom: `1px solid ${border}` }}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, marginBottom: 2 }}>{v.role}</div>
                    <div style={{ fontSize: 13, color: muted, marginBottom: 2 }}>{v.organization}{v.period ? ` · ${v.period}` : ""}</div>
                    {v.description && <p style={{ fontSize: 14, color: muted, margin: "6px 0 0", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: v.description }} />}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      default: return null;
    }
  };

  // Collect which of experience/education/skills are visible for the 3-col info grid
  const hasExp = experience.length > 0;
  const hasEdu = education.length > 0;
  const hasSkills = skills.length > 0;
  const showInfoGrid = hasExp || hasEdu || hasSkills;
  const infoColCount = [hasExp, hasEdu, hasSkills].filter(Boolean).length;
  const infoGridCols = infoColCount === 1 ? "1fr" : infoColCount === 2 ? "1fr 1fr" : "1fr 1fr 1fr";

  // Filter out experience/education/skills from ordered since we render them in the info grid
  const orderedFiltered = ordered.filter((t) => t !== "experience" && t !== "education" && t !== "skills");

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.6, minHeight: "100%" }}>

      {/* HERO — full-width cover */}
      {sectionVisible(sections, "hero") && (
        <section data-section="hero" style={{ position: "relative", minHeight: m ? 480 : 720, background: heroBg, overflow: "hidden" }}>
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)" }} />

          {/* Nav bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: m ? "28px 20px" : "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "white", zIndex: 2 }}>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
              {user.name}<span style={{ opacity: 0.7 }}>.</span>
            </div>
            {!m && (
            <div style={{ display: "flex", gap: 28, fontFamily: mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              <a href="#work" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>Work</a>
              <a href="#about" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>About</a>
              <a href="#contact" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none" }}>Contact</a>
            </div>
            )}
          </div>

          {/* Bottom content */}
          <div style={{ position: "absolute", left: m ? 20 : 40, right: m ? 20 : 40, bottom: 40, color: "white", zIndex: 2, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
                — A portfolio · {new Date().getFullYear()}
              </div>
              <h1 style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 52 : 96, letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0, color: "white", wordBreak: "break-word", overflowWrap: "break-word" }}>
                {user.name}<span style={{ opacity: 0.7 }}>.</span>
              </h1>
              {user.headline && (
                <p style={{ fontFamily: body, fontSize: 20, color: "rgba(255,255,255,0.9)", margin: "16px 0 0", maxWidth: "36ch", fontWeight: 400 }}>{user.headline}</p>
              )}
            </div>
            <div style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.16em", textTransform: "uppercase", textAlign: "right" }}>
              {user.location && <div style={{ marginBottom: 6 }}>{user.location}</div>}
              {user.available && <div>{user.availability_text ?? "Available"}</div>}
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: "absolute", left: "50%", bottom: 16, transform: "translateX(-50%)", fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: "0.3em", textTransform: "uppercase", zIndex: 2 }}>
            ↓ Scroll
          </div>
        </section>
      )}

      {/* PROJECT SECTION — rendered first from ordered if present */}
      {ordered.includes("projects") && (() => {
        const sectionResult = renderSection("projects");
        return sectionResult;
      })()}

      {/* ABOUT */}
      {ordered.includes("about") && (() => {
        const sectionResult = renderSection("about");
        return sectionResult;
      })()}

      {/* INFO GRID — experience + education + skills side by side */}
      {showInfoGrid && (
        <section style={{ padding: `0 ${px} ${m ? "60px" : "120px"}` }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", display: m ? "flex" : "grid", flexDirection: "column", gridTemplateColumns: infoGridCols, gap: m ? 32 : 64, paddingTop: m ? 40 : 64, borderTop: `1px solid ${border}` }}>
            {hasExp && (
              <div data-section="experience">
                <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>
                  {sectionLabel(sections, "experience", "Experience")}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {experience.map((e) => (
                    <div key={e.id}>
                      <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink, marginBottom: 2, letterSpacing: "-0.01em" }}>{e.company}</div>
                      <div style={{ fontSize: 13, color: muted, marginBottom: 2 }}>{e.title}</div>
                      <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.08em" }}>{e.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {hasEdu && (
              <div data-section="education">
                <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>
                  {sectionLabel(sections, "education", "Education")}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {education.map((ed) => (
                    <div key={ed.id}>
                      <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink, marginBottom: 2, letterSpacing: "-0.01em" }}>{ed.degree}</div>
                      <div style={{ fontSize: 13, color: muted, marginBottom: 2 }}>{ed.institution}</div>
                      <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.08em" }}>{ed.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {hasSkills && (
              <div data-section="skills">
                <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>
                  {sectionLabel(sections, "skills", "Skills")}
                </div>
                {skills.map((s, i) => (
                  <div key={i} style={{ marginBottom: i < skills.length - 1 ? 12 : 0 }}>
                    {s.category && (
                      <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, marginBottom: 4 }}>{s.category}</div>
                    )}
                    <div style={{ fontSize: 13.5, color: muted, lineHeight: 1.75 }}>{s.items.join(" · ")}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* REMAINING ORDERED SECTIONS (skip projects, about, experience, education, skills — handled above) */}
      {orderedFiltered.filter((t) => t !== "projects" && t !== "about").map((type) => renderSection(type))}

      {/* CUSTOM SECTIONS */}
      {customSections(sections).filter((s) => s.visible && s.items && s.items.length > 0).map((section) => {
        counter++;
        return (
          <section key={section.id} style={{ padding: `80px ${px}`, borderTop: `1px solid ${border}` }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 40, textAlign: "center" }}>
                {section.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {(section.items ?? []).map((item) => (
                  <div key={item.id} style={{ paddingBottom: 20, borderBottom: `1px solid ${border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                      <span style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.01em" }}>{item.heading}</span>
                      {item.date && <span style={{ fontFamily: mono, fontSize: 11, color: dim, whiteSpace: "nowrap" }}>{item.date}</span>}
                    </div>
                    {item.subheading && <div style={{ fontSize: 13, color: muted, marginBottom: 6 }}>{item.subheading}</div>}
                    {item.description && <p style={{ fontSize: 14, color: muted, margin: 0, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                    {item.link && <a href={item.link} style={{ fontSize: 13, color: accent, textDecoration: "underline", display: "inline-block", marginTop: 6 }}>{item.link} ↗</a>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CONTACT */}
      {sectionVisible(sections, "contact") && (
        <section data-section="contact" id="contact" style={{ padding: m ? `80px ${px}` : "120px 32px 96px", borderTop: `1px solid ${border}` }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
              {sectionLabel(sections, "contact", "Contact")}
            </div>
            <h2 style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 36 : 56, letterSpacing: "-0.035em", margin: "0 0 32px", lineHeight: 1, color: ink }}>
              Let&rsquo;s make<br />something good.
            </h2>
            {user.contact_note && (
              <p style={{ fontSize: 15, color: muted, margin: "0 0 24px", lineHeight: 1.6, maxWidth: "48ch", marginLeft: "auto", marginRight: "auto" }}>{user.contact_note}</p>
            )}
            {user.email && (
              <a href={`mailto:${user.email}`} style={{ display: "inline-block", padding: "14px 28px", border: `1px solid ${ink}`, color: ink, borderRadius: 999, fontFamily: body, fontWeight: 500, fontSize: 15, textDecoration: "none", marginBottom: 32 }}>
                {user.email} ↗
              </a>
            )}
            {user.social.length > 0 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 32, fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.12em", textTransform: "uppercase", flexWrap: "wrap" }}>
                {user.social.map((s) => (
                  <a key={s.id} href={s.url} style={{ color: muted, textDecoration: "none" }}>
                    {s.type === "readcv" ? "Read.cv" : s.type}
                  </a>
                ))}
              </div>
            )}
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
