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

export default function StudioTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
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

  const ink    = "rgb(22, 21, 20)";
  const muted  = "rgb(96, 92, 87)";
  const dim    = "rgb(156, 152, 143)";
  const bg     = "rgb(246, 245, 241)";
  const border = "rgb(229, 226, 218)";
  const surface = "#FFFFFF";

  const m = useIsMobile();

  // ── Section heading style shared across sections ──
  const MonoLabel = ({ text }: { text: string }) => (
    <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>
      {text}
    </div>
  );

  const H2WithRule = ({ id, fallback, count }: { id: string; fallback: string; count?: string }) => (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40, paddingBottom: 16, borderBottom: `2px solid ${ink}` }}>
      <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 22 : 32, letterSpacing: "-0.025em", margin: 0, color: ink }}>
        {sectionLabel(sections, id as Parameters<typeof sectionLabel>[1], fallback)}
      </h2>
      {count != null && (
        <span style={{ fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{count}</span>
      )}
    </div>
  );

  const ordered = orderedBuiltInTypes(sections);

  // Track which projects and testimonials we've already rendered inside the main projects/testimonials sections
  // so that renderSection can handle the remaining section types.

  const renderSection = (type: string) => {
    switch (type) {

      case "about":
        return !user.bio && !user.bio_long ? null : (
          <section key="about" data-section="about" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "40px 24px" : "40px 48px" }}>
            <div>
              <MonoLabel text={sectionLabel(sections, "about", "About")} />
              <p
                style={{ fontSize: 18, color: ink, lineHeight: 1.6, margin: "0 0 16px", letterSpacing: "-0.005em" }}
                dangerouslySetInnerHTML={{ __html: user.bio_long ?? user.bio ?? "" }}
              />
            </div>
          </section>
        );

      case "projects":
        return projects.length === 0 ? null : (
          <section key="projects" data-section="projects" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "24px 24px 32px" : "24px 48px 32px" }}>
            <H2WithRule id="projects" fallback="Selected work" count={projects.length === 1 ? "1 case study" : `${projects.length} case studies`} />
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {projects.length === 1 ? (
                (() => {
                  const p = projects[0];
                  const [, , statusLabel] = STATUS_MAP[p.status] ?? ["#EFEEE6", "#54514A", p.status];
                  const statusDotColor = p.status === "live" ? "rgb(34,163,90)" : p.status === "in_progress" ? "rgb(217,119,6)" : "rgb(156,163,175)";
                  const coverStyle: React.CSSProperties = p.cover_image_url
                    ? { background: `url(${p.cover_image_url}) center/cover` }
                    : { background: p.cover_color ?? COVER_COLOR_FALLBACK };
                  return (
                    <article key={p.id} style={{
                      background: surface,
                      border: `1px solid ${border}`,
                      borderRadius: 20,
                      overflow: "hidden",
                      display: m ? "flex" : "grid",
                      gridTemplateColumns: m ? undefined : "1.4fr 1fr",
                      flexDirection: m ? "column" : undefined,
                      boxShadow: "rgba(20,20,18,0.04) 0px 1px 2px, rgba(20,20,18,0.3) 0px 18px 40px -28px",
                    }}>
                      {/* Cover */}
                      <div style={{ minHeight: m ? 220 : 360, position: "relative", ...coverStyle }}>
                        <div style={{ position: "absolute", top: 20, left: 20 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 10px", fontSize: 11.5, fontWeight: 500, borderRadius: 999, background: "rgba(255,255,255,0.92)", color: ink }}>
                            <span style={{ width: 6, height: 6, borderRadius: 999, background: statusDotColor }} />
                            {statusLabel}
                          </span>
                        </div>
                      </div>
                      {/* Info */}
                      <div style={{ padding: m ? "28px 24px" : 40, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        {(p.role || p.period) && (
                          <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
                            {[p.role, p.period].filter(Boolean).join(" · ")}
                          </div>
                        )}
                        <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 26 : 34, letterSpacing: "-0.025em", lineHeight: 1.05, margin: "0 0 12px" }}>{p.title}</h3>
                        <p style={{ fontSize: 16, color: muted, lineHeight: 1.55, margin: "0 0 24px" }}>{p.tagline}</p>
                        {p.tech_stack.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                            {p.tech_stack.map(t => (
                              <span key={t} style={{ padding: "4px 11px", fontFamily: mono, fontSize: 11, color: muted, background: bg, border: `1px solid ${border}`, borderRadius: 999 }}>{t}</span>
                            ))}
                          </div>
                        )}
                        {p.links && p.links.length > 0 && (
                          <a href={p.links[0].url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: body, fontWeight: 500, fontSize: 14, color: ink, textDecoration: "none", borderBottom: `2px solid ${accent}`, paddingBottom: 3, width: "fit-content" }}>
                            {p.links[0].label ?? "View project"} →
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })()
              ) : (
              projects.map((p, idx) => {
                const imageLeft = idx % 2 === 0;
                const [, , statusLabel] = STATUS_MAP[p.status] ?? ["#EFEEE6", "#54514A", p.status];
                const statusDotColor = p.status === "live" ? "rgb(34,163,90)" : p.status === "in_progress" ? "rgb(217,119,6)" : "rgb(156,163,175)";
                const coverStyle: React.CSSProperties = p.cover_image_url
                  ? { background: `url(${p.cover_image_url}) center/cover` }
                  : { background: p.cover_color ?? COVER_COLOR_FALLBACK };

                return (
                  <article
                    key={p.id}
                    style={{
                      background: surface,
                      border: `1px solid ${border}`,
                      borderRadius: 20,
                      overflow: "hidden",
                      display: m ? "flex" : "grid",
                      gridTemplateColumns: m ? undefined : "1.25fr 1fr",
                      flexDirection: m ? "column" : undefined,
                      boxShadow: "rgba(20,20,18,0.04) 0px 1px 2px, rgba(20,20,18,0.3) 0px 18px 40px -28px",
                    }}
                  >
                    {/* Image area */}
                    <div
                      style={{
                        gridArea: m ? undefined : imageLeft ? "1 / 1" : "1 / 2",
                        minHeight: m ? 200 : 320,
                        position: "relative",
                        order: m ? 0 : undefined,
                        ...coverStyle,
                      }}
                    >
                      {/* Status pill */}
                      <div style={{ position: "absolute", top: 20, left: 20 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 10px", fontSize: 11.5, fontWeight: 500, borderRadius: 999, background: "rgba(255,255,255,0.92)", color: ink }}>
                          <span style={{ width: 6, height: 6, borderRadius: 999, background: statusDotColor }} />
                          {statusLabel}
                        </span>
                      </div>
                      {/* Big index number watermark */}
                      <div style={{ position: "absolute", bottom: 20, right: 20, fontFamily: mono, fontSize: 64, fontWeight: 700, color: "rgba(255,255,255,0.22)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Text area */}
                    <div
                      style={{
                        gridArea: m ? undefined : imageLeft ? "1 / 2" : "1 / 1",
                        padding: m ? "28px 24px" : 40,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {(p.role || p.period) && (
                        <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
                          {[p.role, p.period].filter(Boolean).join(" · ")}
                        </div>
                      )}
                      <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 26 : 34, letterSpacing: "-0.025em", lineHeight: 1.05, margin: "0 0 12px" }}>{p.title}</h3>
                      <p style={{ fontSize: 16, color: muted, lineHeight: 1.55, margin: "0 0 24px" }}>{p.tagline}</p>
                      {p.tech_stack.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                          {p.tech_stack.map(t => (
                            <span key={t} style={{ padding: "4px 11px", fontFamily: mono, fontSize: 11, color: muted, background: bg, border: `1px solid ${border}`, borderRadius: 999 }}>{t}</span>
                          ))}
                        </div>
                      )}
                      {p.links && p.links.length > 0 && (
                        <a
                          href={p.links[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontFamily: body, fontWeight: 500, fontSize: 14, color: ink, textDecoration: "none", borderBottom: `2px solid ${accent}`, paddingBottom: 3, width: "fit-content" }}
                        >
                          {p.links[0].label ?? "View project"} →
                        </a>
                      )}
                    </div>
                  </article>
                );
              }))}
            </div>
          </section>
        );

      case "testimonials":
        return testimonials.length === 0 ? null : (
          <section key="testimonials" data-section="testimonials" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "32px 24px" : "56px 48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {testimonials.map(t => (
                <div key={t.id} style={{ background: ink, borderRadius: 20, padding: m ? "40px 32px" : "56px", color: bg }}>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 24 }}>
                    {sectionLabel(sections, "testimonials", "What people say")}
                  </div>
                  <p
                    style={{ fontFamily: display, fontWeight: 500, fontSize: m ? 22 : 30, letterSpacing: "-0.02em", lineHeight: 1.3, margin: "0 0 24px", maxWidth: "40ch" }}
                    dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }}
                  />
                  <div style={{ fontSize: 14, color: dim }}>
                    <strong style={{ color: bg, fontWeight: 600 }}>{t.author}</strong>
                    {(t.role || t.company) && (
                      <> — {[t.role, t.company].filter(Boolean).join(", ")}</>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "experience":
        return experience.length === 0 ? null : (
          <section key="experience" data-section="experience" style={{ padding: m ? "0 24px" : "0 48px", maxWidth: 1240, margin: "0 auto" }}>
            <MonoLabel text={sectionLabel(sections, "experience", "Experience")} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {experience.map((e, i) => (
                <div
                  key={e.id}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "14px 0", borderBottom: i < experience.length - 1 ? `1px solid ${border}` : "none" }}
                >
                  <div>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink }}>{e.title}</div>
                    <div style={{ fontSize: 13, color: muted }}>
                      {e.company}{e.location ? ` · ${e.location}` : ""}
                    </div>
                    {e.description && (
                      <p style={{ fontSize: 13, color: muted, lineHeight: 1.5, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: e.description }} />
                    )}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, whiteSpace: "nowrap" }}>{e.period}</div>
                </div>
              ))}
            </div>
          </section>
        );

      case "education":
        return education.length === 0 ? null : (
          <section key="education" data-section="education" style={{ padding: m ? "0 24px" : "0 48px", maxWidth: 1240, margin: "0 auto" }}>
            <MonoLabel text={sectionLabel(sections, "education", "Education")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {education.map(ed => (
                <div key={ed.id}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink }}>{ed.degree}</div>
                  <div style={{ fontSize: 13, color: muted }}>{ed.institution}{ed.period ? ` · ${ed.period}` : ""}</div>
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
          <section key="skills" data-section="skills" style={{ padding: m ? "0 24px" : "0 48px", maxWidth: 1240, margin: "0 auto" }}>
            <MonoLabel text={sectionLabel(sections, "skills", "Skills")} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {skills.flatMap(cat => cat.items).map(it => (
                <span key={it} style={{ padding: "5px 12px", fontSize: 13, color: ink, background: surface, border: `1px solid ${border}`, borderRadius: 999 }}>{it}</span>
              ))}
            </div>
          </section>
        );

      case "publications":
        return publications.length === 0 ? null : (
          <section key="publications" data-section="publications" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "32px 24px" : "40px 48px" }}>
            <H2WithRule id="publications" fallback="Publications" count={`${publications.length}`} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {publications.map(p => (
                <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "12px 0", borderBottom: `1px solid ${border}` }}>
                  <div>
                    <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontFamily: mono, fontSize: 10.5, color: accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: ink }}>{p.title}</div>
                    {p.venue && <div style={{ fontFamily: mono, fontSize: 12, color: muted }}>{p.venue}</div>}
                    {p.summary && <p style={{ fontSize: 13, color: muted, lineHeight: 1.55, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
                  </div>
                  {p.year && <div style={{ fontFamily: mono, fontSize: 11, color: dim, whiteSpace: "nowrap" }}>{p.year}</div>}
                </div>
              ))}
            </div>
          </section>
        );

      case "awards":
        return awards.length === 0 ? null : (
          <section key="awards" data-section="awards" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "32px 24px" : "40px 48px" }}>
            <H2WithRule id="awards" fallback="Awards" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {awards.map(a => (
                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: ink }}>{a.title}</div>
                    {a.issuer && <div style={{ fontSize: 13, color: muted }}>{a.issuer}</div>}
                    {a.summary && <p style={{ fontSize: 13, color: muted, lineHeight: 1.5, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: a.summary }} />}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, whiteSpace: "nowrap" }}>{a.year}</div>
                </div>
              ))}
            </div>
          </section>
        );

      case "certifications":
        return certifications.length === 0 ? null : (
          <section key="certifications" data-section="certifications" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "32px 24px" : "40px 48px" }}>
            <H2WithRule id="certifications" fallback="Certifications" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {certifications.map(c => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: ink }}>{c.name}</div>
                    <div style={{ fontSize: 13, color: muted }}>{c.issuer}</div>
                    {c.url && <a href={c.url} style={{ fontFamily: mono, fontSize: 12, color: accent, textDecoration: "none" }} target="_blank" rel="noopener noreferrer">View credential ↗</a>}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, whiteSpace: "nowrap" }}>{c.year}</div>
                </div>
              ))}
            </div>
          </section>
        );

      case "languages":
        return languages.length === 0 ? null : (
          <section key="languages" data-section="languages" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "32px 24px" : "40px 48px" }}>
            <MonoLabel text={sectionLabel(sections, "languages", "Languages")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {languages.map(l => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 0", borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink }}>{l.name}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: dim }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        );

      case "volunteer":
        return volunteer.length === 0 ? null : (
          <section key="volunteer" data-section="volunteer" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "32px 24px" : "40px 48px" }}>
            <H2WithRule id="volunteer" fallback="Volunteer" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {volunteer.map(v => (
                <div key={v.id} style={{ padding: "12px 0", borderBottom: `1px solid ${border}` }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: ink }}>{v.role}</div>
                  <div style={{ fontSize: 13, color: muted }}>{v.organization}{v.period ? ` · ${v.period}` : ""}</div>
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

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.6, minHeight: "100%" }}>

      {/* ── HEADER ── */}
      {sectionVisible(sections, "hero") && (
        <header style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "48px 24px 40px" : "80px 48px 56px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
            {/* Left: availability + name */}
            <div style={{ flex: "1 1 auto", minWidth: 0 }}>
              {user.available && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 10px", borderRadius: 999, background: surface, border: `1px solid ${border}`, fontSize: 12, fontWeight: 500, marginBottom: 28 }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: "rgb(34,163,90)" }} />
                  {user.availability_text ?? "Available"}
                </span>
              )}
              <h1 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 56 : 80, letterSpacing: "-0.04em", lineHeight: 0.94, margin: 0, wordBreak: "break-word", overflowWrap: "break-word" }}>
                {user.name}<span style={{ color: accent }}>.</span>
              </h1>
            </div>
            {/* Right: headline + bio + location */}
            <div style={{ maxWidth: m ? "100%" : "34ch", paddingTop: 12 }}>
              {user.headline && (
                <p style={{ fontSize: 20, color: ink, lineHeight: 1.5, margin: "0 0 16px", letterSpacing: "-0.01em" }}>{user.headline}</p>
              )}
              {user.bio && (
                <p style={{ fontSize: 15, color: muted, lineHeight: 1.65, margin: 0 }}>{user.bio}</p>
              )}
              {(user.location || user.pronouns) && (
                <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 20 }}>
                  {[user.location, user.pronouns].filter(Boolean).join(" · ")}
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* ── ORDERED SECTIONS ── */}
      {ordered.map(renderSection)}

      {/* ── CUSTOM SECTIONS ── */}
      {customSections(sections).filter(s => s.visible && s.items && s.items.length > 0).map(section => (
        <section key={section.id} data-section="custom" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "32px 24px" : "40px 48px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 40, paddingBottom: 16, borderBottom: `2px solid ${ink}` }}>
            <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: 32, letterSpacing: "-0.025em", margin: 0 }}>{section.label}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {(section.items ?? []).map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "12px 0", borderBottom: `1px solid ${border}` }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: ink }}>{item.heading}</div>
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
        <section data-section="contact" style={{ maxWidth: 1240, margin: "0 auto", padding: m ? "40px 24px 60px" : "40px 48px 80px" }}>
          <div style={{ textAlign: "center", paddingTop: 32 }}>
            <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 36 : 48, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
              {sectionLabel(sections, "contact", "Let's make something")}<span style={{ color: accent }}>.</span>
            </h2>
            <a
              href={`mailto:${user.email}`}
              style={{ display: "inline-block", padding: "14px 24px", background: ink, color: bg, borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none", marginBottom: 24 }}
            >
              {user.email} →
            </a>
            {user.social.length > 0 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 24, fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.1em", textTransform: "uppercase", flexWrap: "wrap" }}>
                {user.social.map(s => (
                  <a key={s.id} href={s.url} style={{ color: muted, textDecoration: "none" }} target="_blank" rel="noopener noreferrer">{s.label}</a>
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
