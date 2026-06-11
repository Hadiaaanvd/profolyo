"use client";
import type { Portfolio, SectionConfig } from "@/types/portfolio";
import { sectionVisible, sectionLabel, orderedBuiltInTypes, customSections, firstName, COVER_COLOR_FALLBACK, yearRange, PUBLICATION_TYPE_LABEL } from "../utils";
import { useIsMobile } from "../hooks";

interface Props { portfolio: Portfolio; accent: string; sections: SectionConfig[]; headingFont?: string; bodyFont?: string; }

export default function PressTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const { user, projects, experience, education, skills, publications = [], testimonials = [], awards = [], certifications = [], languages = [], volunteer = [] } = portfolio;
  const ink="#1A1814", muted="#5C544A", dim="#8A8170", bg="#FAF7EE", border="#D9D2BD";
  const serif="'Source Serif 4','Source Serif Pro',Georgia,serif";
  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";
  const mono="'JetBrains Mono',monospace";
  const m = useIsMobile();
  const px = m ? "20px" : "40px";
  const range = yearRange([...projects.map(p => p.period ?? ""), ...experience.map(e => e.period)]);

  const StatusPill = ({ status }: { status: string }) => {
    const label = status === "live" ? "Live" : status === "in_progress" ? "In progress" : "Archived";
    return <span style={{ fontFamily:mono, fontSize:10, color:muted, letterSpacing:"0.12em", textTransform:"uppercase", border:`1px solid ${border}`, padding:"2px 7px" }}>{label}</span>;
  };

  const ordered = orderedBuiltInTypes(sections);
  let sectionCounter = 0;

  const renderSection = (type: string) => {
    sectionCounter++;
    switch (type) {
      case "about": {
        if (!user.bio_long && !user.bio) { sectionCounter--; return null; }
        return (
          <section key="about" data-section="about" style={{ paddingTop:m?40:64, borderTop:`1px solid ${border}` }}>
            <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?24:36, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, textAlign:"center" }}>
              {sectionLabel(sections, "about", "The Story So Far")}
            </h2>
            {m ? (
              <div style={{ fontSize:16, lineHeight:1.7, color:ink, margin:0 }} dangerouslySetInnerHTML={{ __html: user.bio_long ?? user.bio ?? "" }} />
            ) : (
              <div style={{ columnCount:2, columnGap:48, fontSize:17, lineHeight:1.7, color:ink }}>
                <div dangerouslySetInnerHTML={{ __html: user.bio_long ?? user.bio ?? "" }} />
                {user.contact_note && (
                  <p style={{ marginTop:16 }}>{user.contact_note}</p>
                )}
              </div>
            )}
          </section>
        );
      }
      case "projects": return projects.length === 0 ? null : (
        <section key="projects" data-section="projects" style={{ paddingTop:m?40:64 }}>
          <div style={{ borderBottom:`1px solid ${ink}`, paddingBottom:8, marginBottom:32, display:"flex", alignItems:"baseline", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
            <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:0, color:ink }}>
              {sectionLabel(sections, "projects", "Features")}
            </h2>
            <span style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.12em", textTransform:"uppercase" }}>
              {projects.length} pieces{range ? ` · ${range}` : ""}
            </span>
          </div>
          {projects.map((p, i) => (
            <article key={p.id} style={{ display:"grid", gridTemplateColumns:m?"1fr":"1fr 280px", gap:m?16:32, padding:"28px 0", borderBottom:i < projects.length-1 ? `1px solid ${border}` : "none" }}>
              <div>
                <div style={{ fontFamily:mono, fontSize:10, color:dim, letterSpacing:"0.16em", textTransform:"uppercase", marginBottom:8 }}>
                  Issue {String(i+1).padStart(2,"0")}{p.role ? ` · ${p.role}` : ""}{p.period ? ` · ${p.period}` : ""}
                </div>
                <h3 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:32, letterSpacing:"-0.025em", lineHeight:1.05, margin:"0 0 8px", color:ink }}>{p.title}</h3>
                <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:m?15:18, color:muted, margin:"0 0 12px", lineHeight:1.45 }}>{p.tagline}.</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"center" }}>
                  <StatusPill status={p.status} />
                  {p.tech_stack.length > 0 && (
                    <span style={{ fontFamily:mono, fontSize:10, color:muted, letterSpacing:"0.12em", textTransform:"uppercase" }}>{p.tech_stack.slice(0,4).join(" · ")}</span>
                  )}
                </div>
              </div>
              <div style={{ aspectRatio:"5/4", background:p.cover_color ?? COVER_COLOR_FALLBACK, position:"relative", overflow:"hidden" }}>
                {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
                <div style={{ position:"absolute", inset:0, border:`1px solid ${ink}`, mixBlendMode:"multiply", pointerEvents:"none" }} />
              </div>
            </article>
          ))}
        </section>
      );
      case "experience": return experience.length === 0 ? null : (
        <section key="experience" data-section="experience" style={{ paddingTop:m?40:64 }}>
          <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, paddingBottom:8, borderBottom:`1px solid ${ink}` }}>
            {sectionLabel(sections, "experience", "Curriculum")}
          </h2>
          {experience.map((e, i) => (
            <div key={e.company} style={{ display:"grid", gridTemplateColumns:m?"1fr":"140px 1fr", gap:m?6:32, padding:"20px 0", borderBottom:i < experience.length-1 ? `1px dashed ${border}` : "none" }}>
              <div style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                {e.period}
                {e.location && <><br/>{e.location}</>}
              </div>
              <div>
                <div style={{ fontFamily:display, fontWeight:700, fontSize:17, color:ink, marginBottom:4 }}>{e.title}, {e.company}</div>
                {e.description && <div style={{ fontFamily:serif, fontSize:15.5, color:muted, fontStyle:"italic", margin:0, lineHeight:1.55 }} dangerouslySetInnerHTML={{ __html: e.description }} />}
              </div>
            </div>
          ))}
        </section>
      );
      case "education": return education.length === 0 ? null : (
        <section key="education" data-section="education" style={{ paddingTop:m?40:64 }}>
          <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, paddingBottom:8, borderBottom:`1px solid ${ink}` }}>
            {sectionLabel(sections, "education", "Schooling")}
          </h2>
          {education.map((ed, i) => (
            <div key={ed.institution} style={{ display:"grid", gridTemplateColumns:m?"1fr":"140px 1fr", gap:m?4:32, padding:"16px 0", borderBottom:i < education.length-1 ? `1px dashed ${border}` : "none" }}>
              <div style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>{ed.period}</div>
              <div>
                <div style={{ fontFamily:display, fontWeight:700, fontSize:16, color:ink, marginBottom:2 }}>{ed.degree}</div>
                <div style={{ fontFamily:serif, fontSize:14.5, color:muted, fontStyle:"italic" }}>
                  {ed.institution}{ed.location ? `, ${ed.location}` : ""}
                </div>
                {ed.description && <div style={{ fontFamily:serif, fontSize:14, color:muted, lineHeight:1.55, marginTop:6 }} dangerouslySetInnerHTML={{ __html: ed.description }} />}
              </div>
            </div>
          ))}
        </section>
      );
      case "skills": return skills.length === 0 ? null : (
        <section key="skills" data-section="skills" style={{ paddingTop:m?40:64 }}>
          <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, paddingBottom:8, borderBottom:`1px solid ${ink}` }}>
            {sectionLabel(sections, "skills", "The Toolkit")}
          </h2>
          {skills.map((s, i) => (
            <p key={i} style={{ margin:"0 0 14px", fontSize:15.5, lineHeight:1.7, color:ink }}>
              {s.category && <span style={{ fontFamily:display, fontWeight:700, color:ink }}>{s.category}: </span>}
              <span style={{ fontFamily:serif, fontStyle:"italic", color:muted }}>{s.items.join(", ")}.</span>
            </p>
          ))}
        </section>
      );
      case "publications": return publications.length === 0 ? null : (
        <section key="publications" data-section="publications" style={{ paddingTop:m?40:64 }}>
          <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, paddingBottom:8, borderBottom:`1px solid ${ink}` }}>
            {sectionLabel(sections, "publications", "On the Record")}
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {publications.map(p => (
              <div key={p.id} style={{ paddingBottom:16, borderBottom:`1px solid ${border}` }}>
                <div style={{ fontFamily:mono, fontSize:11, color:muted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>
                  {PUBLICATION_TYPE_LABEL[p.type] ?? p.type}{p.year ? `, ${p.year}` : ""}
                </div>
                <div style={{ fontFamily:display, fontWeight:700, fontSize:19, color:ink, marginBottom:4, letterSpacing:"-0.015em" }}>{p.title}</div>
                {p.venue && <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:muted, marginBottom:6 }}>{p.venue}</div>}
                {p.summary && <div style={{ fontFamily:serif, fontSize:15, lineHeight:1.65, color:ink, margin:0 }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
              </div>
            ))}
          </div>
        </section>
      );
      case "testimonials": return testimonials.length === 0 ? null : (
        <section key="testimonials" data-section="testimonials" style={{ paddingTop:m?40:64 }}>
          <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, paddingBottom:8, borderBottom:`1px solid ${ink}` }}>
            {sectionLabel(sections, "testimonials", "What They Said")}
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {testimonials.map(t => (
              <blockquote key={t.id} style={{ margin:0, paddingLeft:20, borderLeft:`3px solid ${ink}` }}>
                <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, lineHeight:1.7, color:ink, margin:"0 0 10px" }} dangerouslySetInnerHTML={{ __html: t.quote }} />
                <footer style={{ fontFamily:display, fontWeight:600, fontSize:13, color:muted }}>
                  — {t.author}{t.role ? `, ${t.role}` : ""}{t.company ? ` @ ${t.company}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      );
      case "awards": return awards.length === 0 ? null : (
        <section key="awards" data-section="awards" style={{ paddingTop:m?40:64 }}>
          <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, paddingBottom:8, borderBottom:`1px solid ${ink}` }}>
            {sectionLabel(sections, "awards", "Recognition")}
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {awards.map(a => (
              <div key={a.id} style={{ paddingBottom:10, borderBottom:`1px dashed ${border}` }}>
                <div style={{ display:"flex", gap:16, alignItems:"baseline" }}>
                  <span style={{ fontFamily:display, fontWeight:700, fontSize:16, color:ink }}>{a.title}</span>
                  {a.year && <span style={{ fontFamily:mono, fontSize:11, color:muted }}>{a.year}</span>}
                </div>
                {a.issuer && <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:13.5, color:muted, marginTop:2 }}>{a.issuer}</div>}
                {a.summary && <div style={{ fontFamily:serif, fontSize:14, color:ink, margin:"4px 0 0", lineHeight:1.55 }} dangerouslySetInnerHTML={{ __html: a.summary }} />}
              </div>
            ))}
          </div>
        </section>
      );
      case "certifications": return certifications.length === 0 ? null : (
        <section key="certifications" data-section="certifications" style={{ paddingTop:m?40:64 }}>
          <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, paddingBottom:8, borderBottom:`1px solid ${ink}` }}>
            {sectionLabel(sections, "certifications", "Credentials")}
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {certifications.map(c => (
              <div key={c.id}>
                <span style={{ fontFamily:display, fontWeight:700, fontSize:15, color:ink }}>{c.name}</span>
                {c.issuer && <span style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:muted }}> — {c.issuer}</span>}
                {c.year && <span style={{ fontFamily:mono, fontSize:12, color:muted }}>, {c.year}</span>}
              </div>
            ))}
          </div>
        </section>
      );
      case "languages": return languages.length === 0 ? null : (
        <section key="languages" data-section="languages" style={{ paddingTop:m?40:64 }}>
          <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, paddingBottom:8, borderBottom:`1px solid ${ink}` }}>
            {sectionLabel(sections, "languages", "Languages")}
          </h2>
          <p style={{ fontFamily:serif, fontSize:16, color:ink, lineHeight:1.7, margin:0 }}>
            {languages.map((l, i) => (
              <span key={l.name}>
                <strong>{l.name}</strong>
                <span style={{ fontStyle:"italic", color:muted }}> ({l.proficiency})</span>
                {i < languages.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </section>
      );
      case "volunteer": return volunteer.length === 0 ? null : (
        <section key="volunteer" data-section="volunteer" style={{ paddingTop:m?40:64 }}>
          <h2 style={{ fontFamily:display, fontWeight:700, fontSize:m?22:28, letterSpacing:"-0.02em", margin:"0 0 24px", color:ink, paddingBottom:8, borderBottom:`1px solid ${ink}` }}>
            {sectionLabel(sections, "volunteer", "Giving Back")}
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {volunteer.map(v => (
              <div key={v.organization}>
                <div style={{ fontFamily:display, fontWeight:700, fontSize:17, color:ink }}>{v.role}</div>
                <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:muted, marginTop:2 }}>
                  {v.organization}{v.period ? ` · ${v.period}` : ""}
                </div>
                {v.description && <div style={{ fontFamily:serif, fontSize:15, lineHeight:1.65, color:ink, margin:"6px 0 0" }} dangerouslySetInnerHTML={{ __html: v.description }} />}
              </div>
            ))}
          </div>
        </section>
      );
      default: return null;
    }
  };

  const vol = experience.length > 0 ? experience.length + 5 : 1;

  return (
    <div style={{ background:bg, color:ink, fontFamily:serif, fontSize:16, lineHeight:1.65, minHeight:"100%" }}>
      <div style={{ maxWidth:1080, margin:"0 auto", padding:`${m?"40px":"64px"} ${px} 96px` }}>

        {/* MASTHEAD */}
        {sectionVisible(sections, "hero") && (
          <>
            <header style={{ borderTop:`4px double ${ink}`, borderBottom:`1px solid ${ink}`, padding:"20px 0 16px", marginBottom:48, display:"flex", alignItems:"baseline", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
              <div style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.16em", textTransform:"uppercase" }}>
                The {firstName(user.name)} Quarterly · Vol. {vol}
              </div>
              <div style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.16em", textTransform:"uppercase" }}>
                {user.location} · {new Date().getFullYear()} Edition
              </div>
            </header>

            <section style={{ marginBottom:80 }}>
              <div style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:16, textAlign:"center" }}>— A portrait, in their own words —</div>
              <h1 style={{ fontFamily:display, fontWeight:700, fontSize:"clamp(36px, 6vw, 88px)", lineHeight:1, letterSpacing:"-0.035em", margin:"0 0 24px", color:ink, textAlign:"center", wordBreak:"break-word", overflowWrap:"break-word" }}>
                {user.name}<span style={{ color:accent }}>.</span>
              </h1>
              {user.bio && (
                <p style={{ fontFamily:serif, fontSize:m?17:22, fontStyle:"italic", color:muted, textAlign:"center", margin:"0 auto 24px", maxWidth:"44ch", lineHeight:1.5 }}>
                  &ldquo;{user.bio}&rdquo;
                </p>
              )}
              {(user.headline || user.location || user.availability_text) && (
                <div style={{ textAlign:"center", fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.12em", textTransform:"uppercase" }}>
                  {[user.headline, user.location, user.availability_text].filter(Boolean).join(" · ")}
                </div>
              )}
            </section>
          </>
        )}

        {ordered.map(renderSection)}

        {/* CUSTOM SECTIONS */}
        {customSections(sections).filter(s => s.visible && s.items && s.items.length > 0).map((section) => (
          <section key={section.id} style={{ paddingTop:m?40:64, borderTop:`1px solid ${border}` }}>
            <h2 style={{ fontFamily:serif, fontWeight:700, fontSize:28, letterSpacing:"-0.01em", margin:"0 0 28px", color:ink }}>{section.label}</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {(section.items ?? []).map((item) => (
                <div key={item.id} style={{ paddingBottom:20, borderBottom:`1px solid ${border}` }}>
                  <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:12, marginBottom:4 }}>
                    <span style={{ fontWeight:700, fontSize:16, color:ink, fontFamily:serif }}>{item.heading}</span>
                    {item.date && <span style={{ fontFamily:mono, fontSize:10, color:muted, whiteSpace:"nowrap" }}>{item.date}</span>}
                  </div>
                  {item.subheading && <div style={{ fontSize:13, color:muted, marginBottom:4, fontStyle:"italic" }}>{item.subheading}</div>}
                  {item.description && <div style={{ fontSize:15, color:ink, margin:0, lineHeight:1.7 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                  {item.link && <a href={item.link} style={{ fontSize:12, color:accent, textDecoration:"underline", display:"inline-block", marginTop:6 }}>{item.link}</a>}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CONTACT */}
        {sectionVisible(sections, "contact") && user.email && (
          <section style={{ borderTop:`4px double ${ink}`, paddingTop:28, textAlign:"center" }}>
            <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:m?16:19, color:ink, margin:"0 0 14px", lineHeight:1.5 }}>
              Correspondence welcome at{" "}
              <a href={`mailto:${user.email}`} style={{ color:accent, textDecoration:"underline" }}>{user.email}</a>
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"4px 20px", fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.16em", textTransform:"uppercase" }}>
              {user.social.map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" style={{ color:muted, textDecoration:"none" }}>{s.label}</a>
              ))}
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
    </div>
  );
}
