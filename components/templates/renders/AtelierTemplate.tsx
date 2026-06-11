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

function StatusPill({ status }: { status: string }) {
  const [bg, fg, label] = STATUS_MAP[status] ?? STATUS_MAP.archived;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"3px 9px 3px 8px", fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:500, borderRadius:999, background:bg, color:fg }}>
      <span style={{ width:5, height:5, borderRadius:999, background:fg }} />
      {label}
    </span>
  );
}

export default function AtelierTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const { user, projects, experience, education, skills, publications = [], testimonials = [], awards = [], certifications = [], languages = [], volunteer = [] } = portfolio;
  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";
  const ink="#1F1E1A", muted="#6F6D63", bg="#FAFAF7", surface="#FFFFFF", border="#ECEAE2";
  const m = useIsMobile();

  const SectionHead = ({ num, title }: { num: string; title: string }) => (
    <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:32, paddingBottom:14, borderBottom:`1px solid ${border}` }}>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:muted, letterSpacing:"0.14em", textTransform:"uppercase" }}>{num}</span>
      <h2 style={{ fontFamily:display, fontWeight:600, fontSize:m?20:28, letterSpacing:"-0.02em", margin:0, color:ink, lineHeight:1.05 }}>{title}</h2>
    </div>
  );

  const ordered = orderedBuiltInTypes(sections);
  let counter = 1;

  const renderSection = (type: string) => {
    const num = String(counter++).padStart(2, "0");
    switch (type) {
      case "about": {
        if (!user.bio_long) { counter--; return null; }
        return (
          <section key="about" data-section="about" style={{ marginBottom:80 }}>
            <SectionHead num={num} title={sectionLabel(sections, "about", "About")} />
            <div style={{ fontSize:16, lineHeight:1.65, color:ink, margin:0, maxWidth:"62ch" }} dangerouslySetInnerHTML={{ __html: user.bio_long ?? "" }} />
          </section>
        );
      }
      case "projects": return projects.length === 0 ? null : (
        <section key="projects" data-section="projects" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "projects", "Selected work")} />
          <div style={{ display:"grid", gridTemplateColumns:m?"1fr":projects.length === 1 ? "1fr" : "1fr 1fr", gap:28 }}>
            {projects.map(p => (
              <article key={p.id} style={{ background:surface, borderRadius:10, border:`1px solid ${border}`, overflow:"hidden" }}>
                <div style={{ aspectRatio:"16/10", background:p.cover_color ?? COVER_COLOR_FALLBACK, position:"relative", overflow:"hidden" }}>
                  {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
                  <div style={{ position:"absolute", left:14, bottom:14 }}><StatusPill status={p.status} /></div>
                </div>
                <div style={{ padding:20 }}>
                  <h3 style={{ fontFamily:display, fontWeight:600, fontSize:19, letterSpacing:"-0.015em", margin:"0 0 4px", color:ink }}>{p.title}</h3>
                  <p style={{ fontSize:13.5, color:muted, lineHeight:1.5, margin:"0 0 12px" }}>{p.tagline}.</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {p.tech_stack.slice(0,4).map(t => (
                      <span key={t} style={{ padding:"3px 8px", fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:muted, background:bg, borderRadius:999 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      );
      case "experience": return experience.length === 0 ? null : (
        <section key="experience" data-section="experience" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "experience", "Experience")} />
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {experience.map(e => (
              <div key={e.company} style={{ display:"grid", gridTemplateColumns:m?"1fr":"120px 1fr", gap:m?6:24, paddingBottom:20, borderBottom:`1px dashed ${border}` }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:muted, letterSpacing:"0.1em", textTransform:"uppercase", paddingTop:4 }}>{e.period}</div>
                <div>
                  <div style={{ fontFamily:display, fontWeight:600, fontSize:17, color:ink, letterSpacing:"-0.01em" }}>
                    {e.title} · <span style={{ color:accent }}>{e.company}</span>
                  </div>
                  {e.location && <div style={{ fontSize:13, color:muted, marginTop:2, marginBottom:8 }}>{e.location}</div>}
                  {e.description && <div style={{ fontSize:14, color:ink, lineHeight:1.55, margin:"0 0 8px" }} dangerouslySetInnerHTML={{ __html: e.description }} />}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
      case "education": return education.length === 0 ? null : (
        <section key="education" data-section="education" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "education", "Education")} />
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {education.map(ed => (
              <div key={ed.institution} style={{ display:"grid", gridTemplateColumns:m?"1fr":"120px 1fr", gap:m?4:24 }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>{ed.period}</div>
                <div>
                  <div style={{ fontFamily:display, fontWeight:600, fontSize:16, color:ink, letterSpacing:"-0.005em" }}>{ed.degree}</div>
                  <div style={{ fontSize:13.5, color:muted, marginTop:2 }}>{ed.institution}{ed.location ? ` · ${ed.location}` : ""}</div>
                  {ed.description && <div style={{ fontSize:13, color:muted, lineHeight:1.55, marginTop:6 }} dangerouslySetInnerHTML={{ __html: ed.description }} />}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
      case "skills": return skills.length === 0 ? null : (
        <section key="skills" data-section="skills" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "skills", "Skills")} />
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {skills.map((s, i) => (
              <div key={i}>
                {s.category && <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:muted, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>{s.category}</div>}
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {s.items.map(it => (
                    <span key={it} style={{ padding:"5px 11px", fontSize:12.5, color:ink, background:surface, border:`1px solid ${border}`, borderRadius:999 }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
      case "publications": return publications.length === 0 ? null : (
        <section key="publications" data-section="publications" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "publications", "Publications")} />
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {publications.map(p => (
              <div key={p.id} style={{ background:surface, border:`1px solid ${border}`, borderRadius:8, padding:"16px 20px" }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:4 }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:accent, textTransform:"uppercase", letterSpacing:"0.12em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                  {p.year && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:muted }}>{p.year}</span>}
                </div>
                <div style={{ fontWeight:600, fontSize:15, color:ink, marginBottom:2 }}>{p.title}</div>
                {p.venue && <div style={{ fontSize:12.5, color:muted }}>{p.venue}</div>}
                {p.summary && <div style={{ fontSize:13, lineHeight:1.55, color:ink, margin:"8px 0 0" }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
              </div>
            ))}
          </div>
        </section>
      );
      case "testimonials": return testimonials.length === 0 ? null : (
        <section key="testimonials" data-section="testimonials" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "testimonials", "Testimonials")} />
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {testimonials.map(t => (
              <blockquote key={t.id} style={{ margin:0, background:surface, border:`1px solid ${border}`, borderRadius:8, padding:"20px 24px", borderLeft:`3px solid ${accent}` }}>
                <div style={{ fontSize:15, lineHeight:1.7, color:ink, margin:"0 0 12px", fontStyle:"italic" }} dangerouslySetInnerHTML={{ __html: t.quote }} />
                <footer style={{ fontSize:12.5, color:muted }}>
                  <span style={{ fontWeight:600, color:ink }}>{t.author}</span>
                  {t.role && <span> · {t.role}</span>}
                  {t.company && <span>, {t.company}</span>}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      );
      case "awards": return awards.length === 0 ? null : (
        <section key="awards" data-section="awards" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "awards", "Awards")} />
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {awards.map(a => (
              <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", paddingBottom:12, borderBottom:`1px dashed ${border}` }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:15, color:ink }}>{a.title}</div>
                  {a.issuer && <div style={{ fontSize:12.5, color:muted, marginTop:2 }}>{a.issuer}</div>}
                  {a.summary && <div style={{ fontSize:13, color:ink, lineHeight:1.5, margin:"6px 0 0" }} dangerouslySetInnerHTML={{ __html: a.summary }} />}
                </div>
                {a.year && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:muted }}>{a.year}</span>}
              </div>
            ))}
          </div>
        </section>
      );
      case "certifications": return certifications.length === 0 ? null : (
        <section key="certifications" data-section="certifications" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "certifications", "Certifications")} />
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {certifications.map(c => (
              <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:15, color:ink }}>{c.name}</div>
                  {c.issuer && <div style={{ fontSize:12.5, color:muted, marginTop:2 }}>{c.issuer}</div>}
                </div>
                {c.year && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:muted }}>{c.year}</span>}
              </div>
            ))}
          </div>
        </section>
      );
      case "languages": return languages.length === 0 ? null : (
        <section key="languages" data-section="languages" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "languages", "Languages")} />
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {languages.map(l => (
              <div key={l.name} style={{ background:surface, border:`1px solid ${border}`, borderRadius:999, padding:"6px 14px", display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ fontSize:14, fontWeight:600, color:ink }}>{l.name}</span>
                <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:muted, textTransform:"uppercase", letterSpacing:"0.08em" }}>{l.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      );
      case "volunteer": return volunteer.length === 0 ? null : (
        <section key="volunteer" data-section="volunteer" style={{ marginBottom:80 }}>
          <SectionHead num={num} title={sectionLabel(sections, "volunteer", "Volunteer")} />
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {volunteer.map(v => (
              <div key={v.organization} style={{ background:surface, border:`1px solid ${border}`, borderRadius:8, padding:"16px 20px" }}>
                <div style={{ fontWeight:600, fontSize:15, color:ink }}>{v.role}</div>
                <div style={{ fontSize:12.5, color:muted, marginTop:2, marginBottom:v.description ? 8 : 0 }}>
                  {v.organization}{v.period ? ` · ${v.period}` : ""}
                </div>
                {v.description && <div style={{ fontSize:13.5, lineHeight:1.55, color:ink, margin:0 }} dangerouslySetInnerHTML={{ __html: v.description }} />}
              </div>
            ))}
          </div>
        </section>
      );
      default: return null;
    }
  };

  return (
    <div style={{ background:bg, color:ink, fontFamily:body, fontSize:14.5, lineHeight:1.55, minHeight:"100%" }}>
      <div style={{
        maxWidth:1200, margin:"0 auto",
        padding:m?"48px 20px 80px":"80px 48px 96px",
        display:"grid",
        gridTemplateColumns:m?"1fr":"320px 1fr",
        gap:m?40:80,
        alignItems:"start",
      }}>

        {/* BIO SIDEBAR — sticky on desktop, stacked on mobile */}
        {sectionVisible(sections, "hero") && (
          <aside style={{ position:m?"static":"sticky", top:48, alignSelf:"start" }}>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} style={{ width:56, height:56, borderRadius:999, objectFit:"cover", marginBottom:24 }} />
            ) : (
              <div style={{ width:56, height:56, borderRadius:999, background:`linear-gradient(135deg, ${accent}, ${accent}88)`, color:"white", fontFamily:display, fontWeight:600, fontSize:22, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
                {user.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            <h1 style={{ fontFamily:display, fontWeight:600, fontSize:m?28:36, lineHeight:1.04, letterSpacing:"-0.025em", margin:"0 0 12px", color:ink, wordBreak:"break-word", overflowWrap:"break-word" }}>
              {user.name}
            </h1>
            {user.headline && <p style={{ fontSize:15.5, color:ink, lineHeight:1.5, margin:"0 0 18px", maxWidth:"32ch" }}>{user.headline}.</p>}
            {user.availability_text && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"5px 11px 5px 10px", borderRadius:999, background:`${accent}14`, color:accent, fontSize:12, fontWeight:500, marginBottom:24 }}>
                <span style={{ width:6, height:6, borderRadius:999, background:accent }} />
                {user.availability_text}
              </div>
            )}
            {(user.location || user.pronouns) && (
              <div style={{ fontSize:13.5, color:muted, lineHeight:1.6, marginBottom:24, paddingBottom:24, borderBottom:`1px solid ${border}` }}>
                {user.location && <div style={{ marginBottom:4 }}>{user.location}</div>}
                {user.pronouns && <div>{user.pronouns}</div>}
              </div>
            )}
            {user.email && (
              <div style={{ marginBottom:28 }}>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:10 }}>Contact</div>
                <a href={`mailto:${user.email}`} style={{ color:ink, fontSize:14, textDecoration:"underline", textUnderlineOffset:3, textDecorationColor:border }}>{user.email}</a>
              </div>
            )}
            {user.social.length > 0 && (
              <div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, color:muted, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:10 }}>Elsewhere</div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {user.social.map(s => (
                    <a key={s.id} href={s.url} style={{ color:ink, fontSize:13.5, textDecoration:"none", display:"inline-flex", justifyContent:"space-between", maxWidth:240 }}>
                      <span style={{ color:muted, textTransform:"capitalize" }}>{s.type === "readcv" ? "Read.cv" : s.type}</span>
                      <span>{s.label ?? s.url} ↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        )}

         {/* SCROLLABLE RIGHT COLUMN */}
        <main>
          {ordered.map(renderSection)}

          {/* CUSTOM SECTIONS */}
          {customSections(sections).filter(s => s.visible && s.items && s.items.length > 0).map((section) => {
            const num = String(counter++).padStart(2, "0");
            return (
              <section key={section.id} style={{ marginBottom:80 }}>
                <SectionHead num={num} title={section.label} />
                <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                  {(section.items ?? []).map((item) => (
                    <div key={item.id} style={{ paddingBottom:20, borderBottom:`1px solid ${border}` }}>
                      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:12, marginBottom:4 }}>
                        <span style={{ fontWeight:600, fontSize:15, color:ink }}>{item.heading}</span>
                        {item.date && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:muted, whiteSpace:"nowrap" }}>{item.date}</span>}
                      </div>
                      {item.subheading && <div style={{ fontSize:13, color:muted, marginBottom:4 }}>{item.subheading}</div>}
                      {item.description && <div style={{ fontSize:14, color:ink, margin:0, lineHeight:1.65 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                      {item.link && <a href={item.link} style={{ fontSize:12, color:accent, textDecoration:"underline", display:"inline-block", marginTop:6 }}>{item.link}</a>}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </main>

      </div>

      {/* Profolyo branding footer — outside the sidebar/main grid */}
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
