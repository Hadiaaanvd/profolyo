"use client";
import type { Portfolio, SectionConfig } from "@/types/portfolio";
import { sectionVisible, sectionLabel, orderedBuiltInTypes, customSections, COVER_COLOR_FALLBACK, PUBLICATION_TYPE_LABEL } from "../utils";
import { useIsMobile } from "../hooks";

interface Props { portfolio: Portfolio; accent: string; sections: SectionConfig[]; headingFont?: string; bodyFont?: string; }

const CONSOLE_STATUS: Record<string, [string, string, string]> = {
  live:        ["rgba(123,227,140,0.12)", "rgb(123,227,140)", "● live"],
  in_progress: ["rgba(245,158,11,0.14)",  "rgb(245,158,11)",  "◐ wip"],
  archived:    ["rgba(138,143,158,0.14)", "rgb(138,143,158)", "○ archived"],
};

export default function ConsoleTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const {
    user, projects, experience, education, skills,
    publications = [], testimonials = [], awards = [],
    certifications = [], languages = [], volunteer = [],
  } = portfolio;

  const display = headingFont ?? "'JetBrains Mono', monospace";
  const body = bodyFont ?? "'JetBrains Mono', monospace";
  const mono = "'JetBrains Mono', monospace";
  const bg = "#0B1020";
  const fg = "rgb(230,228,223)";
  const dim = "rgb(138,143,158)";
  const faint = "rgb(92,99,118)";
  const surface = "rgb(17,23,43)";
  const surfaceBorder = "rgb(31,38,64)";
  const m = useIsMobile();

  const Divider = () => (
    <div style={{ fontFamily: mono, fontSize: 11, color: faint, padding: "48px 0", textAlign: "center", letterSpacing: "0.4em" }}>
      ─ ─ ─ ─ ─ ─ ─
    </div>
  );

  const SectionCmd = ({ cmd, label }: { cmd: string; label: string }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: mono, fontSize: 12, color: faint, marginBottom: 6 }}>
        <span style={{ color: accent }}>$</span>&nbsp;<span style={{ color: dim }}>profolyo</span>{" "}
        <span style={{ color: fg }}>{cmd}</span>
      </div>
      <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 18 : 24, letterSpacing: "-0.005em", margin: 0, color: fg }}>
        <span style={{ color: accent }}>## </span>{label}
      </h2>
    </div>
  );

  const ordered = orderedBuiltInTypes(sections);
  let counter = 1;

  const renderSection = (type: string) => {
    const num = String(counter++).padStart(2, "0");
    switch (type) {

      case "about": {
        const text = user.bio_long ?? user.bio;
        if (!text) { counter--; return null; }
        return (
          <section key="about" data-section="about">
            <SectionCmd cmd="cat about.md" label={sectionLabel(sections, "about", "About")} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15.5, color: fg, lineHeight: 1.7, margin: 0, maxWidth: "62ch" }}
               dangerouslySetInnerHTML={{ __html: text }} />
          </section>
        );
      }

      case "projects": {
        if (projects.length === 0) { counter--; return null; }
        return (
          <section key="projects" data-section="projects">
            <SectionCmd cmd="ls projects/" label={sectionLabel(sections, "projects", "Selected work")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {projects.map((p, i) => {
                const [statusBg, statusFg, statusLabel] = CONSOLE_STATUS[p.status] ?? CONSOLE_STATUS.archived;
                return (
                  <article key={p.id} style={{ background: surface, border: `1px solid ${surfaceBorder}`, borderRadius: 4, overflow: "hidden" }}>
                    {/* Terminal bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${surfaceBorder}`, fontSize: 11.5, fontFamily: mono }}>
                      <span style={{ color: faint }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ color: dim }}>—</span>
                      <span style={{ color: accent }}>~/projects/{p.slug}</span>
                      <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", padding: "2px 8px", fontSize: 10.5, fontWeight: 500, borderRadius: 3, background: statusBg, color: statusFg, letterSpacing: "0.02em" }}>
                        {statusLabel}
                      </span>
                    </div>
                    <div style={{ padding: "20px 24px 22px" }}>
                      <h3 style={{ fontFamily: mono, fontWeight: 600, fontSize: 19, margin: "0 0 6px", color: fg }}>{p.title}</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: dim, lineHeight: 1.55, margin: "0 0 16px" }}>{p.tagline}</p>
                      {(p.role || p.period) && (
                        <div style={{ display: "flex", gap: 16, fontSize: 11, fontFamily: mono, color: faint, marginBottom: 14 }}>
                          {p.role && <span><span style={{ color: dim }}>role:</span> <span style={{ color: fg }}>{p.role}</span></span>}
                          {p.period && <span><span style={{ color: dim }}>period:</span> <span style={{ color: fg }}>{p.period}</span></span>}
                        </div>
                      )}
                      {p.tech_stack.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, fontSize: 11 }}>
                          {p.tech_stack.map((t) => (
                            <span key={t} style={{ padding: "2px 8px", fontFamily: mono, color: accent, background: `${accent}14`, border: `1px solid ${accent}2E`, borderRadius: 3 }}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      }

      case "experience": {
        if (experience.length === 0) { counter--; return null; }
        return (
          <section key="experience" data-section="experience">
            <SectionCmd cmd="git log --experience" label={sectionLabel(sections, "experience", "Experience")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
              {experience.map((e, i) => (
                <div key={e.id} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 16, position: "relative" }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 10, height: 10, borderRadius: 999, background: accent, border: `2px solid ${accent}`, marginTop: 6 }} />
                    {i < experience.length - 1 && (
                      <div style={{ position: "absolute", left: 4, top: 18, bottom: -28, width: 2, background: surfaceBorder }} />
                    )}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                      <span style={{ fontFamily: mono, fontSize: 13, color: fg, fontWeight: 600 }}>{e.title}</span>
                      <span style={{ fontFamily: mono, fontSize: 12, color: accent }}>@ {e.company}</span>
                      <span style={{ fontFamily: mono, fontSize: 11, color: faint, marginLeft: "auto" }}>{e.period}</span>
                    </div>
                    {e.location && <div style={{ fontFamily: mono, fontSize: 11, color: faint, marginBottom: 6 }}>{e.location}</div>}
                    {e.description && (
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: dim, lineHeight: 1.55 }}
                           dangerouslySetInnerHTML={{ __html: e.description }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "education": {
        if (education.length === 0) { counter--; return null; }
        return (
          <section key="education" data-section="education">
            <SectionCmd cmd="cat education.json" label={sectionLabel(sections, "education", "Education")} />
            <div style={{ background: surface, border: `1px solid ${surfaceBorder}`, borderRadius: 4, padding: "20px 24px", fontFamily: mono }}>
              <div style={{ color: faint, fontSize: 12, marginBottom: 8 }}>{"{"}</div>
              {education.map((ed, i) => (
                <div key={ed.id} style={{ marginLeft: 20, marginBottom: i < education.length - 1 ? 16 : 0 }}>
                  <div style={{ fontSize: 13, color: accent, marginBottom: 3 }}>"{ed.degree}"</div>
                  <div style={{ fontSize: 12, color: faint, paddingLeft: 16 }}>
                    institution: <span style={{ color: fg }}>"{ed.institution}"</span>
                  </div>
                  <div style={{ fontSize: 12, color: faint, paddingLeft: 16 }}>
                    period: <span style={{ color: fg }}>"{ed.period}"</span>
                  </div>
                  {ed.location && (
                    <div style={{ fontSize: 12, color: faint, paddingLeft: 16 }}>
                      location: <span style={{ color: fg }}>"{ed.location}"</span>
                    </div>
                  )}
                </div>
              ))}
              <div style={{ color: faint, fontSize: 12, marginTop: 8 }}>{"}"}</div>
            </div>
          </section>
        );
      }

      case "skills": {
        if (skills.length === 0) { counter--; return null; }
        return (
          <section key="skills" data-section="skills">
            <SectionCmd cmd="cat skills.txt" label={sectionLabel(sections, "skills", "Skills")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {skills.map((s, i) => (
                <div key={i}>
                  {s.category && (
                    <div style={{ fontFamily: mono, fontSize: 11, color: faint, marginBottom: 6 }}>
                      <span style={{ color: accent }}># </span>{s.category}
                    </div>
                  )}
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: dim, lineHeight: 1.75 }}>
                    {s.items.join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "publications": {
        if (publications.length === 0) { counter--; return null; }
        return (
          <section key="publications" data-section="publications">
            <SectionCmd cmd="ls publications/" label={sectionLabel(sections, "publications", "Publications")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {publications.map((p) => (
                <div key={p.id} style={{ background: surface, border: `1px solid ${surfaceBorder}`, borderRadius: 4, padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: mono, fontSize: 10, color: accent, textTransform: "uppercase", letterSpacing: "0.12em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                    {p.year && <span style={{ fontFamily: mono, fontSize: 10, color: faint }}>{p.year}</span>}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: fg, marginBottom: 2 }}>{p.title}</div>
                  {p.venue && <div style={{ fontSize: 12, color: dim }}>{p.venue}</div>}
                  {p.summary && (
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: dim, lineHeight: 1.55, marginTop: 8 }}
                         dangerouslySetInnerHTML={{ __html: p.summary }} />
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "testimonials": {
        if (testimonials.length === 0) { counter--; return null; }
        return (
          <section key="testimonials" data-section="testimonials">
            <SectionCmd cmd="cat testimonials.md" label={sectionLabel(sections, "testimonials", "Testimonials")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {testimonials.map((t) => (
                <blockquote key={t.id} style={{ margin: 0, background: surface, border: `1px solid ${surfaceBorder}`, borderLeft: `3px solid ${accent}`, borderRadius: 4, padding: "16px 20px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: fg, lineHeight: 1.65, margin: "0 0 10px", fontStyle: "italic" }} dangerouslySetInnerHTML={{ __html: t.quote }} />
                  <footer style={{ fontFamily: mono, fontSize: 12, color: dim }}>
                    <span style={{ fontWeight: 600, color: fg }}>{t.author}</span>
                    {t.role && <span>, {t.role}</span>}
                    {t.company && <span> @ {t.company}</span>}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        );
      }

      case "awards": {
        if (awards.length === 0) { counter--; return null; }
        return (
          <section key="awards" data-section="awards">
            <SectionCmd cmd="ls awards/" label={sectionLabel(sections, "awards", "Awards")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {awards.map((a) => (
                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 10, borderBottom: `1px solid ${surfaceBorder}` }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: fg }}>{a.title}</div>
                    {a.issuer && <div style={{ fontSize: 12, color: dim, marginTop: 2 }}>{a.issuer}</div>}
                  </div>
                  {a.year && <span style={{ fontFamily: mono, fontSize: 11, color: faint }}>{a.year}</span>}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "certifications": {
        if (certifications.length === 0) { counter--; return null; }
        return (
          <section key="certifications" data-section="certifications">
            <SectionCmd cmd="ls certs/" label={sectionLabel(sections, "certifications", "Certifications")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {certifications.map((c) => (
                <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 10, borderBottom: `1px solid ${surfaceBorder}` }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: fg }}>{c.name}</div>
                    {c.issuer && <div style={{ fontSize: 12, color: dim, marginTop: 2 }}>{c.issuer}</div>}
                  </div>
                  {c.year && <span style={{ fontFamily: mono, fontSize: 11, color: faint }}>{c.year}</span>}
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "languages": {
        if (languages.length === 0) { counter--; return null; }
        return (
          <section key="languages" data-section="languages">
            <SectionCmd cmd="cat languages.json" label={sectionLabel(sections, "languages", "Languages")} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {languages.map((l) => (
                <div key={l.id} style={{ background: surface, border: `1px solid ${surfaceBorder}`, borderRadius: 3, padding: "8px 14px", fontFamily: mono }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: fg }}>{l.name}</span>
                  <span style={{ fontSize: 11, color: faint, marginLeft: 8 }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case "volunteer": {
        if (volunteer.length === 0) { counter--; return null; }
        return (
          <section key="volunteer" data-section="volunteer">
            <SectionCmd cmd="cat volunteer.md" label={sectionLabel(sections, "volunteer", "Volunteer")} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {volunteer.map((v) => (
                <div key={v.id} style={{ background: surface, border: `1px solid ${surfaceBorder}`, borderRadius: 4, padding: "14px 18px" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: fg }}>{v.role}</div>
                  <div style={{ fontFamily: mono, fontSize: 12, color: dim, marginTop: 2 }}>{v.organization}{v.period ? ` · ${v.period}` : ""}</div>
                   {v.description && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: dim, lineHeight: 1.55, margin: "8px 0 0" }} dangerouslySetInnerHTML={{ __html: v.description }} />}
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
    <div style={{ background: bg, color: fg, fontFamily: body, fontSize: 14.5, lineHeight: 1.6, minHeight: "100%" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: m ? "48px 20px 80px" : "64px 32px 96px" }}>

        {/* HERO */}
        {sectionVisible(sections, "hero") && (
          <header style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: mono, fontSize: 12, color: faint, marginBottom: 16 }}>
              <span style={{ color: accent }}>~/profolyo.me/{user.handle ?? user.name.toLowerCase().replace(/\s+/g, "")}</span>{" "}
              <span style={{ color: dim }}>$</span>{" "}
              <span style={{ color: fg }}>whoami</span>
              <span style={{ display: "inline-block", width: 8, height: 14, background: accent, marginLeft: 4, verticalAlign: "middle" }} />
            </div>
            <h1 style={{ fontFamily: display, fontWeight: 700, fontSize: m ? 32 : 48, letterSpacing: "-0.02em", margin: "0 0 16px", color: fg, lineHeight: 1.05, wordBreak: "break-word", overflowWrap: "break-word" }}>
              {user.name.toLowerCase().replace(/\s+/g, "_")}<span style={{ color: accent }}>.</span>
            </h1>
            {user.headline && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: fg, lineHeight: 1.5, margin: "0 0 20px", maxWidth: "44ch" }}>
                <span style={{ color: dim }}>// </span>{user.headline}
              </p>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontFamily: mono, fontSize: 11.5, color: dim, alignItems: "center" }}>
              {user.location && (
                <span>
                  <span style={{ color: faint }}>loc</span> = <span style={{ color: fg }}>"{user.location}"</span>
                </span>
              )}
              {user.available && (
                <span>
                  <span style={{ color: faint }}>status</span> = <span style={{ color: accent }}>"{user.availability_text ?? "available"}"</span>
                </span>
              )}
              {user.pronouns && (
                <span>
                  <span style={{ color: faint }}>pronouns</span> = <span style={{ color: fg }}>"{user.pronouns}"</span>
                </span>
              )}
            </div>
          </header>
        )}

        {/* ORDERED SECTIONS with dividers between them */}
        {ordered.map((type, i) => (
          <div key={type}>
            {(sectionVisible(sections, "hero") || i > 0) && <Divider />}
            {renderSection(type)}
          </div>
        ))}

        {/* CUSTOM SECTIONS */}
        {customSections(sections).filter((s) => s.visible && s.items && s.items.length > 0).map((section) => {
          counter++;
          return (
            <div key={section.id}>
              <Divider />
              <section data-section="custom">
                <SectionCmd
                  cmd={`cat ${section.label.toLowerCase().replace(/\s+/g, "-")}.md`}
                  label={section.label}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {(section.items ?? []).map((item) => (
                    <div key={item.id} style={{ background: surface, border: `1px solid ${surfaceBorder}`, borderRadius: 4, padding: "14px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: fg }}>{item.heading}</span>
                        {item.date && <span style={{ fontFamily: mono, fontSize: 11, color: faint }}>{item.date}</span>}
                      </div>
                      {item.subheading && <div style={{ fontFamily: mono, fontSize: 12, color: dim, marginBottom: 4 }}>{item.subheading}</div>}
                      {item.description && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: dim, margin: 0, lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                      {item.link && <a href={item.link} style={{ fontFamily: mono, fontSize: 12, color: accent, textDecoration: "none", display: "inline-block", marginTop: 6 }}>{item.link} ↗</a>}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          );
        })}

        {/* CONTACT */}
        {sectionVisible(sections, "contact") && (
          <>
            <Divider />
            <section data-section="contact">
              <div style={{ fontFamily: mono, fontSize: 12, color: faint, marginBottom: 16 }}>
                <span style={{ color: accent }}>$</span>&nbsp;<span style={{ color: dim }}>profolyo</span>{" "}
                <span style={{ color: fg }}>echo "get in touch"</span>
              </div>
              <h2 style={{ fontFamily: display, fontWeight: 600, fontSize: m ? 18 : 24, letterSpacing: "-0.005em", margin: "0 0 24px", color: fg }}>
                <span style={{ color: accent }}>## </span>{sectionLabel(sections, "contact", "Contact")}
              </h2>
              {user.contact_note && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: dim, lineHeight: 1.65, margin: "0 0 24px", maxWidth: "52ch" }}>{user.contact_note}</p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontFamily: mono, fontSize: 13 }}>
                {user.email && (
                  <div>
                    <span style={{ color: faint }}>$ echo </span>
                    <a href={`mailto:${user.email}`} style={{ color: accent, textDecoration: "none" }}>"{user.email}"</a>
                  </div>
                )}
                {user.website && (
                  <div>
                    <span style={{ color: faint }}>$ open </span>
                    <a href={user.website} style={{ color: accent, textDecoration: "none" }}>"{user.website}"</a>
                  </div>
                )}
              </div>
              {user.social.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                  {user.social.map((s) => (
                    <a key={s.id} href={s.url} style={{ padding: "6px 14px", fontFamily: mono, fontSize: 12, color: accent, background: `${accent}14`, border: `1px solid ${accent}2E`, borderRadius: 3, textDecoration: "none" }}>
                      {s.type === "readcv" ? "Read.cv" : s.type} ↗
                    </a>
                  ))}
                </div>
              )}
            </section>
          </>
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
