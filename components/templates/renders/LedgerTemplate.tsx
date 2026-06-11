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

export default function LedgerTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const { user, projects, experience, education, skills, publications = [], testimonials = [], awards = [], certifications = [], languages = [], volunteer = [] } = portfolio;
  const display = headingFont ?? "'Source Serif 4', serif";
  const body = bodyFont ?? "'Inter', sans-serif";

  const bg = "#F7F5F0";
  const ink = "rgb(26,24,21)";
  const muted = "rgb(117,112,106)";
  const border = "rgb(219,214,204)";
  const subtle = "rgb(174,168,158)";
  const mono = "'JetBrains Mono', monospace";

  const m = useIsMobile();
  const px = m ? "24px" : "40px";

  const ordered = orderedBuiltInTypes(sections);
  const custom = customSections(sections);

  // Ledger grid: date col 130px + content
  const DateGrid = ({ date, children }: { date: string; children: React.ReactNode }) => (
    <div style={{ display: m ? "block" : "grid", gridTemplateColumns: "130px 1fr", gap: 32, padding: "18px 0", borderBottom: `1px solid ${border}`, alignItems: "baseline" }}>
      {!m ? (
        <div style={{ fontFamily: mono, fontSize: 11.5, color: subtle, letterSpacing: "0.06em", textTransform: "uppercase", paddingTop: 3 }}>{date}</div>
      ) : (
        <div style={{ fontFamily: mono, fontSize: 11, color: subtle, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{date}</div>
      )}
      <div>{children}</div>
    </div>
  );

  const SectionHead = ({ label }: { label: string }) => (
    <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>{label}</div>
  );

  const renderSection = (type: string) => {
    switch (type) {
      case "about": {
        if (!sectionVisible(sections, "about")) return null;
        const bio = user.bio_long || user.bio;
        if (!bio) return null;
        return (
          <section key="about" data-section="about" style={{ marginBottom: 64 }}>
            <p style={{ fontFamily: display, fontSize: m ? 18 : 21, lineHeight: 1.65, color: ink, margin: 0, maxWidth: "60ch" }} dangerouslySetInnerHTML={{ __html: bio }} />
          </section>
        );
      }

      case "projects": {
        if (!sectionVisible(sections, "projects") || projects.length === 0) return null;
        return (
          <section key="projects" data-section="projects" style={{ marginBottom: 80 }}>
            <SectionHead label={sectionLabel(sections, "projects", "Recent work")} />
            {/* Preview grid: 3 cols */}
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : Math.min(projects.length, 3) === 1 ? "1fr" : Math.min(projects.length, 3) === 2 ? "1fr 1fr" : "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
              {projects.slice(0, 3).map(p => (
                <div key={p.id}>
                  <div style={{ aspectRatio: "4 / 3", background: p.cover_image_url ? `url(${p.cover_image_url}) center/cover` : (p.cover_color ?? COVER_COLOR_FALLBACK), borderRadius: 4, marginBottom: 10 }} />
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.01em" }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: muted, lineHeight: 1.4, marginTop: 2, fontFamily: body }}>{p.tagline}.</div>
                </div>
              ))}
            </div>
            {/* Selected work ledger rows */}
            <div style={{ marginBottom: 8 }}>
              <SectionHead label="Selected work" />
            </div>
            <div>
              {projects.map((p, i) => {
                const [,,statusLabel] = STATUS_MAP[p.status] ?? STATUS_MAP.archived;
                return (
                  <div key={p.id} style={{ display: m ? "block" : "grid", gridTemplateColumns: "130px 1fr", gap: 32, padding: "18px 0", borderBottom: i < projects.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                    {!m ? (
                      <div style={{ fontFamily: mono, fontSize: 11.5, color: subtle, letterSpacing: "0.06em", textTransform: "uppercase", paddingTop: 3 }}>{p.period ?? "—"}</div>
                    ) : (
                      <div style={{ fontFamily: mono, fontSize: 11, color: subtle, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{p.period ?? "—"}</div>
                    )}
                    <div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                        <div style={{ width: 56, height: 42, borderRadius: 4, background: p.cover_color ?? COVER_COLOR_FALLBACK, flexShrink: 0, marginTop: 2, overflow: "hidden" }}>
                          {p.cover_image_url && <img src={p.cover_image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                        </div>
                        <div style={{ flex: "1 1 0", minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                            <div>
                              <span style={{ fontFamily: display, fontWeight: 600, fontSize: 21, color: ink, letterSpacing: "-0.01em" }}>{p.title}</span>
                              <span style={{ fontSize: 15, color: muted, fontFamily: body }}> — {p.tagline}.</span>
                            </div>
                            <span style={{ fontFamily: mono, fontSize: 10.5, color: subtle, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{statusLabel}</span>
                          </div>
                          {(p.role || p.tech_stack.length > 0) && (
                            <div style={{ fontFamily: mono, fontSize: 11, color: subtle, marginTop: 6 }}>
                              {p.role && <span>{p.role}</span>}
                              {p.role && p.tech_stack.length > 0 && <span> · </span>}
                              {p.tech_stack.slice(0, 5).join(" / ")}
                            </div>
                          )}
                        </div>
                      </div>
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
          <section key="experience" data-section="experience" style={{ marginBottom: 72 }}>
            <SectionHead label={sectionLabel(sections, "experience", "Experience")} />
            {experience.map((e, i) => (
              <div key={e.id} style={{ borderBottom: i < experience.length - 1 ? `1px solid ${border}` : "none" }}>
                <DateGrid date={e.period}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 19, color: ink, letterSpacing: "-0.01em" }}>{e.title}, {e.company}</div>
                  {e.location && <div style={{ fontSize: 13.5, color: subtle, marginBottom: 6, fontFamily: body }}>{e.location}</div>}
                  {e.description && <p style={{ fontSize: 14.5, color: muted, margin: 0, lineHeight: 1.55, maxWidth: "58ch", fontFamily: body }} dangerouslySetInnerHTML={{ __html: e.description }} />}
                </DateGrid>
              </div>
            ))}
          </section>
        );
      }

      case "publications": {
        if (!sectionVisible(sections, "publications") || publications.length === 0) return null;
        return (
          <section key="publications" data-section="publications" style={{ marginBottom: 72 }}>
            <SectionHead label={sectionLabel(sections, "publications", "Writing & talks")} />
            {publications.map((p, i) => (
              <div key={p.id} style={{ borderBottom: i < publications.length - 1 ? `1px solid ${border}` : "none" }}>
                <DateGrid date={p.year}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: display, fontWeight: 600, fontSize: 18, color: ink, letterSpacing: "-0.005em", textDecoration: "none" }}>{p.title}</a>
                  ) : (
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 18, color: ink, letterSpacing: "-0.005em" }}>{p.title}</div>
                  )}
                  <div style={{ fontSize: 13.5, color: muted, marginTop: 2, fontFamily: body }}>
                    {p.venue} · <span style={{ fontStyle: "italic" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                  </div>
                  {p.summary && <p style={{ fontSize: 13.5, color: muted, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
                </DateGrid>
              </div>
            ))}
          </section>
        );
      }

      case "education": {
        if (!sectionVisible(sections, "education") || education.length === 0) return null;
        return (
          <section key="education" data-section="education" style={{ marginBottom: 72 }}>
            <SectionHead label={sectionLabel(sections, "education", "Education")} />
            {education.map((e, i) => (
              <div key={e.id} style={{ borderBottom: i < education.length - 1 ? `1px solid ${border}` : "none" }}>
                <DateGrid date={e.period}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 18, color: ink }}>{e.degree}</div>
                  <div style={{ fontSize: 13.5, color: muted, fontFamily: body }}>{e.institution}{e.location ? `, ${e.location}` : ""}</div>
                  {e.description && <p style={{ fontSize: 13.5, color: muted, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: e.description }} />}
                </DateGrid>
              </div>
            ))}
          </section>
        );
      }

      case "skills": {
        if (!sectionVisible(sections, "skills") || skills.length === 0) return null;
        return (
          <section key="skills" data-section="skills" style={{ marginBottom: 72 }}>
            <SectionHead label={sectionLabel(sections, "skills", "Toolkit")} />
            {skills.map((cat, i) => (
              <div key={i} style={{ borderBottom: i < skills.length - 1 ? `1px solid ${border}` : "none" }}>
                <DateGrid date={cat.category ?? "Skills"}>
                  <div style={{ fontSize: 15, color: ink, lineHeight: 1.7, fontFamily: body }}>{cat.items.join(", ")}</div>
                </DateGrid>
              </div>
            ))}
          </section>
        );
      }

      case "testimonials": {
        if (!sectionVisible(sections, "testimonials") || testimonials.length === 0) return null;
        return (
          <section key="testimonials" data-section="testimonials" style={{ marginBottom: 72 }}>
            <SectionHead label={sectionLabel(sections, "testimonials", "Testimonials")} />
            <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : testimonials.length === 1 ? "1fr" : "1fr 1fr", gap: 28 }}>
              {testimonials.map(t => (
                <div key={t.id} style={{ borderLeft: `2px solid ${border}`, paddingLeft: 24 }}>
                  <p style={{ fontFamily: display, fontSize: 18, lineHeight: 1.6, color: ink, margin: "0 0 12px", fontStyle: "italic" }} dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {t.avatar_url && <img src={t.avatar_url} alt={t.author} style={{ width: 28, height: 28, borderRadius: 999, objectFit: "cover" }} />}
                    <div>
                      <span style={{ fontFamily: body, fontWeight: 600, fontSize: 13.5, color: ink }}>{t.author}</span>
                      {(t.role || t.company) && <span style={{ fontSize: 13, color: muted, marginLeft: 6, fontFamily: body }}>{[t.role, t.company].filter(Boolean).join(", ")}</span>}
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
          <section key="awards" data-section="awards" style={{ marginBottom: 72 }}>
            <SectionHead label={sectionLabel(sections, "awards", "Awards")} />
            {awards.map((a, i) => (
              <div key={a.id} style={{ borderBottom: i < awards.length - 1 ? `1px solid ${border}` : "none" }}>
                <DateGrid date={a.year}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 18, color: ink }}>{a.title}</div>
                  <div style={{ fontSize: 13.5, color: muted, fontFamily: body }}>{a.issuer}</div>
                  {a.summary && <p style={{ fontSize: 13.5, color: muted, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: a.summary }} />}
                </DateGrid>
              </div>
            ))}
          </section>
        );
      }

      case "certifications": {
        if (!sectionVisible(sections, "certifications") || certifications.length === 0) return null;
        return (
          <section key="certifications" data-section="certifications" style={{ marginBottom: 72 }}>
            <SectionHead label={sectionLabel(sections, "certifications", "Certifications")} />
            {certifications.map((c, i) => (
              <div key={c.id} style={{ borderBottom: i < certifications.length - 1 ? `1px solid ${border}` : "none" }}>
                <DateGrid date={c.year}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 17, color: ink }}>{c.name}</div>
                  <div style={{ fontSize: 13.5, color: muted, fontFamily: body }}>{c.issuer}</div>
                  {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: accent, textDecoration: "none", marginTop: 4, display: "inline-block" }}>View ↗</a>}
                </DateGrid>
              </div>
            ))}
          </section>
        );
      }

      case "languages": {
        if (!sectionVisible(sections, "languages") || languages.length === 0) return null;
        return (
          <section key="languages" data-section="languages" style={{ marginBottom: 72 }}>
            <SectionHead label={sectionLabel(sections, "languages", "Languages")} />
            <div style={{ borderBottom: `1px solid ${border}` }}>
              <DateGrid date="Languages">
                <div style={{ fontSize: 15, color: ink, lineHeight: 1.7, fontFamily: body }}>
                  {languages.map(l => `${l.name} (${l.proficiency})`).join(", ")}
                </div>
              </DateGrid>
            </div>
          </section>
        );
      }

      case "volunteer": {
        if (!sectionVisible(sections, "volunteer") || volunteer.length === 0) return null;
        return (
          <section key="volunteer" data-section="volunteer" style={{ marginBottom: 72 }}>
            <SectionHead label={sectionLabel(sections, "volunteer", "Volunteer")} />
            {volunteer.map((v, i) => (
              <div key={v.id} style={{ borderBottom: i < volunteer.length - 1 ? `1px solid ${border}` : "none" }}>
                <DateGrid date={v.period}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 18, color: ink }}>{v.role}, {v.organization}</div>
                  {v.description && <p style={{ fontSize: 13.5, color: muted, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: v.description }} />}
                </DateGrid>
              </div>
            ))}
          </section>
        );
      }

      default: return null;
    }
  };

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.6, minHeight: "100%" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: m ? "80px 24px 80px" : "120px 40px 100px" }}>

        {/* Header */}
        {sectionVisible(sections, "hero") && (
          <header data-section="hero" style={{ marginBottom: 88 }}>
            <h1 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 40 : 56, letterSpacing: "-0.02em", lineHeight: 1.02, margin: "0 0 24px", color: ink, wordBreak: "break-word", overflowWrap: "break-word" }}>
              {user.name}<span style={{ color: accent }}>.</span>
            </h1>
            <p style={{ fontFamily: display, fontSize: m ? 18 : 24, fontStyle: "italic", color: muted, lineHeight: 1.45, margin: "0 0 32px", maxWidth: "34ch" }}>{user.headline}.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {user.available && <span style={{ color: ink }}>● {user.availability_text ?? "Available"}</span>}
              {user.location && <span>{user.location}</span>}
              {user.website && <span>{user.website}</span>}
              {user.pronouns && <span>{user.pronouns}</span>}
            </div>
          </header>
        )}

        {ordered.map(type => renderSection(type))}

        {/* Custom sections */}
        {custom.map(sec => {
          if (!sec.visible || !sec.items?.length) return null;
          return (
            <section key={sec.id} data-section="custom" style={{ marginBottom: 72 }}>
              <SectionHead label={sec.label} />
              {sec.items.map((item, i) => (
                <div key={item.id} style={{ borderBottom: i < (sec.items?.length ?? 0) - 1 ? `1px solid ${border}` : "none" }}>
                  <DateGrid date={item.date ?? "—"}>
                    <div style={{ fontFamily: display, fontWeight: 600, fontSize: 17, color: ink }}>{item.heading}</div>
                    {item.subheading && <div style={{ fontSize: 13.5, color: muted, fontFamily: body }}>{item.subheading}</div>}
                    {item.description && <p style={{ fontSize: 13.5, color: muted, margin: "4px 0 0", lineHeight: 1.55, fontFamily: body }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                    {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: accent, textDecoration: "none", marginTop: 4, display: "inline-block" }}>View ↗</a>}
                  </DateGrid>
                </div>
              ))}
            </section>
          );
        })}

        {/* Footer / Contact */}
        {sectionVisible(sections, "contact") && (
          <footer data-section="contact" style={{ paddingTop: 40, borderTop: `2px solid ${ink}` }}>
            <p style={{ fontFamily: display, fontSize: m ? 18 : 24, fontStyle: "italic", color: ink, margin: "0 0 16px", lineHeight: 1.4 }}>
              {user.contact_note ?? "Currently open to new opportunities. Say hello —"}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontFamily: mono, fontSize: 12.5, color: muted, letterSpacing: "0.04em" }}>
              <a href={`mailto:${user.email}`} style={{ color: accent, textDecoration: "none" }}>{user.email}</a>
              {user.social.map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: muted, textDecoration: "none" }}>{s.label}</a>
              ))}
            </div>
          </footer>
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
    </div>
  );
}
