"use client";
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
  const dotColor = status === "live" ? "rgb(52,211,153)" : status === "in_progress" ? "rgb(251,191,36)" : "rgb(139,139,149)";
  const [,, label] = STATUS_MAP[status] ?? STATUS_MAP.archived;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 12px 5px 10px", fontSize:11.5, fontWeight:500, borderRadius:999, background:"rgba(255,255,255,0.08)", color:"rgb(242,241,238)" }}>
      <span style={{ width:6, height:6, borderRadius:999, background:dotColor, display:"inline-block" }} />
      {label}
    </span>
  );
}

export default function ShowreelTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const { user, projects, experience, education, skills, publications = [], testimonials = [], awards = [], certifications = [], languages = [], volunteer = [] } = portfolio;
  const bg = "rgb(14,14,18)", fg = "rgb(242,241,238)", muted = "rgb(155,154,164)", dim = "rgb(94,94,104)";
  const border = "rgb(38,38,47)", cardBg = "rgb(23,23,30)";
  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";
  const mono = "'JetBrains Mono',monospace";
  const m = useIsMobile();
  const px = m ? "20px" : "56px";

  const ordered = orderedBuiltInTypes(sections);

  const renderSection = (type: string) => {
    switch (type) {
      case "projects": return projects.length === 0 ? null : (
        <section key="projects" data-section="projects" style={{ padding:"24px 0 16px" }}>
          <div style={{ maxWidth:1320, margin:"0 auto", padding:`0 ${px} 18px`, display:"flex", alignItems:"baseline", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
            <div style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.16em", textTransform:"uppercase" }}>
              {sectionLabel(sections, "projects", "The reel")} — {projects.length} projects
            </div>
            <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.1em", textTransform:"uppercase" }}>scroll →</div>
          </div>
          {/* Scrolling reel */}
          <div style={{ display:"flex", gap:20, overflowX:"auto", scrollSnapType:"x mandatory", padding:`8px ${px} 28px`, scrollbarWidth:"thin", WebkitOverflowScrolling:"touch" }}>
            {projects.map((p, i) => (
              <article key={p.id} style={{ flex:"0 0 auto", width:m?"calc(100vw - 48px)":560, scrollSnapAlign:"start", background:cardBg, border:`1px solid ${border}`, borderRadius:18, overflow:"hidden" }}>
                <div style={{ height:280, background:p.cover_color ?? COVER_COLOR_FALLBACK, position:"relative", overflow:"hidden" }}>
                  {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
                  <div style={{ position:"absolute", top:18, left:18 }}>
                    <StatusDot status={p.status} />
                  </div>
                  <div style={{ position:"absolute", top:18, right:20, fontFamily:mono, fontSize:12, color:"rgba(255,255,255,0.7)", letterSpacing:"0.1em" }}>
                    {String(i+1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}
                  </div>
                </div>
                <div style={{ padding:"24px 28px 28px" }}>
                  <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:12, marginBottom:8, flexWrap:"wrap" }}>
                    <h3 style={{ fontFamily:display, fontWeight:600, fontSize:26, letterSpacing:"-0.02em", margin:0, color:fg }}>{p.title}</h3>
                    {p.period && <span style={{ fontFamily:mono, fontSize:11, color:dim, whiteSpace:"nowrap" }}>{p.period}</span>}
                  </div>
                  <p style={{ fontSize:15, color:muted, lineHeight:1.55, margin:"0 0 16px" }}>{p.tagline}.</p>
                  {p.tech_stack.length > 0 && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {p.tech_stack.slice(0,6).map(t => (
                        <span key={t} style={{ padding:"4px 10px", fontFamily:mono, fontSize:10.5, color:muted, background:"rgba(255,255,255,0.04)", border:`1px solid ${border}`, borderRadius:999 }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
            {/* CTA card */}
            {sectionVisible(sections, "contact") && user.email && (
              <div style={{ flex:"0 0 auto", width:m?280:360, scrollSnapAlign:"start", background:accent, borderRadius:18, padding:32, display:"flex", flexDirection:"column", justifyContent:"space-between", color:"white" }}>
                <div style={{ fontFamily:mono, fontSize:11, letterSpacing:"0.16em", textTransform:"uppercase", opacity:0.8 }}>End of reel</div>
                <div>
                  <div style={{ fontFamily:display, fontWeight:600, fontSize:30, letterSpacing:"-0.025em", lineHeight:1.05, marginBottom:16 }}>Like what you see?</div>
                  <a href={`mailto:${user.email}`} style={{ display:"inline-block", padding:"12px 18px", background:"white", color:bg, borderRadius:10, fontSize:14, fontWeight:600, textDecoration:"none" }}>
                    {user.email} →
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      );

      case "about": return (!user.bio && !user.bio_long) ? null : (
        <section key="about" data-section="about" style={{ maxWidth:880, margin:"0 auto", padding:`${m?"40px":"64px"} ${px}`, textAlign:"center", borderTop:`1px solid ${border}` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:24 }}>
            {sectionLabel(sections, "about", "About")}
          </div>
          {user.bio && (
            <p style={{ fontFamily:display, fontWeight:500, fontSize:m?"clamp(18px,4vw,30px)":"clamp(20px,2.5vw,30px)", letterSpacing:"-0.02em", lineHeight:1.3, margin:"0 0 20px", color:fg }}>{user.bio}</p>
          )}
          {user.bio_long && (
            <div style={{ fontSize:16, color:muted, lineHeight:1.7, margin:"0 auto", maxWidth:"60ch" }} dangerouslySetInnerHTML={{ __html: user.bio_long }} />
          )}
        </section>
      );

      case "experience": return experience.length === 0 ? null : (
        <section key="experience" data-section="experience" style={{ maxWidth:1100, margin:"0 auto", padding:`0 ${px}` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:20 }}>
            {sectionLabel(sections, "experience", "Experience")}
          </div>
          <div style={{ display:"flex", flexDirection:"column" }}>
            {experience.map((e, i) => (
              <div key={e.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:16, padding:"14px 0", borderBottom:i < experience.length-1 ? `1px solid ${border}` : "none", flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:display, fontWeight:600, fontSize:16, color:fg }}>{e.title}</div>
                  <div style={{ fontSize:13, color:muted, marginTop:2 }}>{e.company}{e.location ? ` · ${e.location}` : ""}</div>
                </div>
                <div style={{ fontFamily:mono, fontSize:11, color:dim, whiteSpace:"nowrap" }}>{e.period}</div>
              </div>
            ))}
          </div>
        </section>
      );

      case "education": return education.length === 0 ? null : (
        <section key="education" data-section="education" style={{ maxWidth:1100, margin:"0 auto", padding:`32px ${px} 0` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:16 }}>
            {sectionLabel(sections, "education", "Education")}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {education.map(ed => (
              <div key={ed.id} style={{ marginBottom:4 }}>
                <div style={{ fontFamily:display, fontWeight:600, fontSize:15, color:fg }}>{ed.degree}</div>
                <div style={{ fontSize:13, color:muted }}>{ed.institution}</div>
                <div style={{ fontFamily:mono, fontSize:10.5, color:dim, marginTop:2 }}>{ed.period}</div>
              </div>
            ))}
          </div>
        </section>
      );

      case "skills": return skills.length === 0 ? null : (
        <section key="skills" data-section="skills" style={{ maxWidth:1100, margin:"0 auto", padding:`32px ${px} 0` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:16 }}>
            {sectionLabel(sections, "skills", "Skills")}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
            {skills.flatMap(s => s.items).map(it => (
              <span key={it} style={{ padding:"4px 10px", fontFamily:mono, fontSize:10.5, color:muted, background:cardBg, border:`1px solid ${border}`, borderRadius:999 }}>{it}</span>
            ))}
          </div>
        </section>
      );

      case "publications": return publications.length === 0 ? null : (
        <section key="publications" data-section="publications" style={{ maxWidth:1100, margin:"0 auto", padding:`32px ${px} 0` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:20 }}>
            {sectionLabel(sections, "publications", "Publications")}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {publications.map(p => (
              <div key={p.id} style={{ paddingBottom:14, borderBottom:`1px solid ${border}` }}>
                <div style={{ display:"flex", gap:10, marginBottom:4 }}>
                  <span style={{ fontFamily:mono, fontSize:10, color:accent, textTransform:"uppercase", letterSpacing:"0.12em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                  {p.year && <span style={{ fontFamily:mono, fontSize:10, color:dim }}>{p.year}</span>}
                </div>
                <div style={{ fontFamily:display, fontWeight:600, fontSize:16, color:fg }}>{p.title}</div>
                {p.venue && <div style={{ fontFamily:mono, fontSize:11, color:muted, marginTop:2 }}>{p.venue}</div>}
                {p.summary && <div style={{ fontSize:13, color:muted, lineHeight:1.55, margin:"4px 0 0" }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
              </div>
            ))}
          </div>
        </section>
      );

      case "testimonials": return testimonials.length === 0 ? null : (
        <section key="testimonials" data-section="testimonials" style={{ maxWidth:1100, margin:"0 auto", padding:`32px ${px} 0` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:20 }}>
            {sectionLabel(sections, "testimonials", "Testimonials")}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:m?"1fr":testimonials.length === 1 ? "1fr" : "1fr 1fr", gap:16 }}>
            {testimonials.map(t => (
              <blockquote key={t.id} style={{ margin:0, padding:"20px 24px", background:cardBg, borderRadius:12, border:`1px solid ${border}`, borderLeft:`3px solid ${accent}` }}>
                <div style={{ fontSize:14, lineHeight:1.7, color:fg, fontStyle:"italic", margin:"0 0 12px" }} dangerouslySetInnerHTML={{ __html: t.quote }} />
                <footer style={{ fontFamily:mono, fontSize:11, color:muted }}>
                  — {t.author}{t.role ? `, ${t.role}` : ""}{t.company ? ` @ ${t.company}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      );

      case "awards": return awards.length === 0 ? null : (
        <section key="awards" data-section="awards" style={{ maxWidth:1100, margin:"0 auto", padding:`32px ${px} 0` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:16 }}>
            {sectionLabel(sections, "awards", "Awards")}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {awards.map(a => (
              <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", paddingBottom:10, borderBottom:`1px solid ${border}`, gap:12, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:display, fontWeight:600, fontSize:16, color:fg }}>{a.title}</div>
                  {a.issuer && <div style={{ fontSize:13, color:muted, marginTop:2 }}>{a.issuer}</div>}
                  {a.summary && <div style={{ fontSize:13, color:muted, margin:"4px 0 0", lineHeight:1.5 }} dangerouslySetInnerHTML={{ __html: a.summary }} />}
                </div>
                {a.year && <span style={{ fontFamily:mono, fontSize:11, color:dim, flexShrink:0 }}>{a.year}</span>}
              </div>
            ))}
          </div>
        </section>
      );

      case "certifications": return certifications.length === 0 ? null : (
        <section key="certifications" data-section="certifications" style={{ maxWidth:1100, margin:"0 auto", padding:`32px ${px} 0` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:16 }}>
            {sectionLabel(sections, "certifications", "Certifications")}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {certifications.map(c => (
              <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", paddingBottom:8, borderBottom:`1px dashed ${border}`, gap:12 }}>
                <div>
                  <div style={{ fontFamily:display, fontWeight:600, fontSize:15, color:fg }}>{c.name}</div>
                  {c.issuer && <div style={{ fontSize:13, color:muted, marginTop:2 }}>{c.issuer}</div>}
                </div>
                {c.year && <span style={{ fontFamily:mono, fontSize:11, color:dim, flexShrink:0 }}>{c.year}</span>}
              </div>
            ))}
          </div>
        </section>
      );

      case "languages": return languages.length === 0 ? null : (
        <section key="languages" data-section="languages" style={{ maxWidth:1100, margin:"0 auto", padding:`32px ${px} 0` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:16 }}>
            {sectionLabel(sections, "languages", "Languages")}
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {languages.map(l => (
              <div key={l.id} style={{ display:"flex", gap:8, alignItems:"center", padding:"6px 14px", background:cardBg, border:`1px solid ${border}`, borderRadius:999 }}>
                <span style={{ fontFamily:display, fontWeight:600, fontSize:14, color:fg }}>{l.name}</span>
                <span style={{ fontFamily:mono, fontSize:10, color:dim, textTransform:"uppercase", letterSpacing:"0.08em" }}>{l.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      );

      case "volunteer": return volunteer.length === 0 ? null : (
        <section key="volunteer" data-section="volunteer" style={{ maxWidth:1100, margin:"0 auto", padding:`32px ${px} 0` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:16 }}>
            {sectionLabel(sections, "volunteer", "Volunteer")}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {volunteer.map(v => (
              <div key={v.id} style={{ paddingBottom:12, borderBottom:`1px solid ${border}` }}>
                <div style={{ fontFamily:display, fontWeight:600, fontSize:16, color:fg }}>{v.role}</div>
                <div style={{ fontFamily:mono, fontSize:11, color:dim, marginTop:2 }}>{v.organization}{v.period ? ` · ${v.period}` : ""}</div>
                {v.description && <div style={{ fontSize:13.5, color:muted, lineHeight:1.55, margin:"6px 0 0" }} dangerouslySetInnerHTML={{ __html: v.description }} />}
              </div>
            ))}
          </div>
        </section>
      );

      default: return null;
    }
  };

  return (
    <div style={{ background:bg, color:fg, fontFamily:body, fontSize:15, lineHeight:1.6, minHeight:"100%" }}>

      {/* HERO */}
      {sectionVisible(sections, "hero") && (
        <header style={{ maxWidth:1320, margin:"0 auto", padding:`${m?"48px":"72px"} ${px} 40px` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:32, flexWrap:"wrap" }}>
            <div>
              {user.available && (
                <span style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 12px 5px 10px", borderRadius:999, background:"rgba(255,255,255,0.06)", border:`1px solid ${border}`, fontSize:12, fontWeight:500, marginBottom:28, color:fg }}>
                  <span style={{ width:6, height:6, borderRadius:999, background:"rgb(52,211,153)", display:"inline-block" }} />
                  {user.availability_text ?? "Available for work"}
                </span>
              )}
              <h1 style={{ fontFamily:display, fontWeight:600, fontSize:m?"clamp(40px,10vw,88px)":"clamp(56px,6vw,88px)", letterSpacing:"-0.04em", lineHeight:0.92, margin:0, color:fg }}>
                {user.name}<span style={{ color:accent }}>.</span>
              </h1>
            </div>
            <div style={{ maxWidth:"32ch" }}>
              {user.headline && (
                <p style={{ fontSize:m?16:19, color:fg, lineHeight:1.5, margin:"0 0 10px", letterSpacing:"-0.01em" }}>{user.headline}.</p>
              )}
              {(user.location || user.handle) && (
                <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.12em", textTransform:"uppercase" }}>
                  {[user.location, user.handle ? `profolyo.me/${user.handle}` : null].filter(Boolean).join(" · ")}
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* SECTIONS */}
      {ordered.map(renderSection)}

      {/* EXPERIENCE + EDUCATION + SKILLS combined grid */}
      {/* Handled individually above in renderSection */}

      {/* CUSTOM SECTIONS */}
      {customSections(sections).filter(s => s.visible && s.items && s.items.length > 0).map(section => (
        <section key={section.id} style={{ maxWidth:1100, margin:"0 auto", padding:`32px ${px} 0` }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:20 }}>{section.label}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {(section.items ?? []).map(item => (
              <div key={item.id} style={{ padding:"16px 20px", background:cardBg, borderRadius:10, border:`1px solid ${border}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:12, flexWrap:"wrap", marginBottom:4 }}>
                  <span style={{ fontFamily:display, fontWeight:600, fontSize:15, color:fg }}>{item.heading}</span>
                  {item.date && <span style={{ fontFamily:mono, fontSize:11, color:dim, whiteSpace:"nowrap" }}>{item.date}</span>}
                </div>
                {item.subheading && <div style={{ fontSize:13, color:muted, marginBottom:4 }}>{item.subheading}</div>}
                {item.description && <div style={{ fontSize:13.5, color:muted, margin:0, lineHeight:1.6 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                {item.link && <a href={item.link} style={{ fontSize:12, color:accent, textDecoration:"underline", display:"inline-block", marginTop:6 }}>{item.link}</a>}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* SOCIAL LINKS */}
      {user.social.length > 0 && (
        <div style={{ display:"flex", justifyContent:"center", gap:24, marginTop:56, fontFamily:mono, fontSize:11.5, color:muted, letterSpacing:"0.1em", textTransform:"uppercase", flexWrap:"wrap", padding:`0 ${px}` }}>
          {user.social.map(s => (
            <a key={s.id} href={s.url} style={{ color:muted, textDecoration:"none" }}>{s.label}</a>
          ))}
        </div>
      )}

      {/* CONTACT */}
      {sectionVisible(sections, "contact") && user.email && (
        <section data-section="contact" style={{ maxWidth:880, margin:"0 auto", padding:`${m?"48px":"80px"} ${px}`, textAlign:"center" }}>
          <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:24 }}>
            {sectionLabel(sections, "contact", "Contact")}
          </div>
          {user.contact_note && (
            <p style={{ fontFamily:display, fontWeight:500, fontSize:m?18:24, letterSpacing:"-0.02em", lineHeight:1.3, margin:"0 0 24px", color:fg }}>{user.contact_note}</p>
          )}
          <a href={`mailto:${user.email}`} style={{ display:"inline-block", padding:"14px 28px", background:accent, color:"white", borderRadius:999, fontFamily:body, fontWeight:600, fontSize:15, textDecoration:"none", marginBottom:m?16:0 }}>
            {user.email} →
          </a>
        </section>
      )}

      {/* Profolyo branding footer */}
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
