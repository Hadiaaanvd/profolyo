"use client";
import type { Portfolio, SectionConfig } from "@/types/portfolio";
import { sectionVisible, sectionLabel, orderedBuiltInTypes, customSections, firstName, lastName, COVER_COLOR_FALLBACK, yearRange, PUBLICATION_TYPE_LABEL } from "../utils";
import { useIsMobile } from "../hooks";

interface Props { portfolio: Portfolio; accent: string; sections: SectionConfig[]; headingFont?: string; bodyFont?: string; }

const STATUS_MAP: Record<string, [string, string, string]> = {
  live:        ["rgba(15,14,11,.9)", "#FFFFFF", "Live"],
  in_progress: ["#FEF3C7", "#7C2D12", "WIP"],
  archived:    ["rgba(15,14,11,.08)", "#54514A", "Archived"],
};

function StatusPill({ status }: { status: string }) {
  const [bg, fg, label] = STATUS_MAP[status] ?? STATUS_MAP.archived;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", padding:"5px 12px", fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, fontWeight:500, borderRadius:999, background:bg, color:fg, letterSpacing:"0.04em", textTransform:"uppercase" }}>
      {label}
    </span>
  );
}

const TILE_SIZES = [
  { col:"1 / 4", aspect:"5/4" },
  { col:"4 / 7", aspect:"1/1" },
  { col:"1 / 3", aspect:"1/1" },
  { col:"3 / 5", aspect:"1/1" },
  { col:"5 / 7", aspect:"5/6" },
  { col:"1 / 7", aspect:"21/9" },
];

export default function ShowcaseTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const { user, projects, experience, education, skills, publications = [], testimonials = [], awards = [], certifications = [], languages = [], volunteer = [] } = portfolio;
  const ink="#0F0E0B", muted="#54514A", bg="#F4F1EB", surface="#FFFFFF", border="#D9D4C5";
  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";
  const mono="'JetBrains Mono',monospace";
  const fName = firstName(user.name);
  const lName = lastName(user.name);
  const range = yearRange([...projects.map(p => p.period ?? ""), ...experience.map(e => e.period)]);
  const m = useIsMobile();
  const px = m ? "20px" : "40px";

  const ordered = orderedBuiltInTypes(sections);

  function onAccent(hex: string): string {
    const h = hex.replace(/^#/, "");
    if (h.length < 6) return "#FFFFFF";
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) > 0.55 ? "#111111" : "#FFFFFF";
  }
  const accentFg = onAccent(accent);

  const renderSection = (type: string) => {
    switch (type) {
      case "projects": return projects.length === 0 ? null : (
        <section key="projects" data-section="projects" style={{ padding:`0 ${px} 80px`, maxWidth:1320, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
            <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(32px,4.5vw,64px)", letterSpacing:"-0.04em", margin:0, color:ink, lineHeight:0.95 }}>
              {sectionLabel(sections, "projects", "Work")}.
            </h2>
            <span style={{ fontFamily:mono, fontSize:12, color:muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>{projects.length} projects{range ? ` · ${range}` : ""}</span>
          </div>
          {m ? (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {projects.map((p, i) => (
                <article key={p.id} style={{ borderRadius:12, overflow:"hidden", background:surface }}>
                  <div style={{ aspectRatio:TILE_SIZES[i % TILE_SIZES.length].aspect, background:p.cover_color ?? COVER_COLOR_FALLBACK, position:"relative", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:20, overflow:"hidden" }}>
                    {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }} />}
                    <div style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <span style={{ fontFamily:mono, fontSize:11, color:"rgba(255,255,255,.7)", letterSpacing:"0.12em" }}>{String(i+1).padStart(2,"0")}</span>
                      <StatusPill status={p.status} />
                    </div>
                    <div style={{ position:"relative", zIndex:1 }}>
                      <h3 style={{ fontFamily:display, fontWeight:700, fontSize:24, color:"#FFFFFF", letterSpacing:"-0.03em", margin:"0 0 6px", lineHeight:0.95, textShadow:"0 2px 30px rgba(0,0,0,.18)" }}>{p.title}</h3>
                      <p style={{ fontSize:13, color:"rgba(255,255,255,.85)", margin:0, maxWidth:"32ch", lineHeight:1.4, fontWeight:500 }}>{p.tagline}.</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : projects.length === 1 ? (
            <article key={projects[0].id} style={{ borderRadius:12, overflow:"hidden", background:surface }}>
              <div style={{ aspectRatio:"21/9", background:projects[0].cover_color ?? COVER_COLOR_FALLBACK, position:"relative", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:24, overflow:"hidden" }}>
                {projects[0].cover_image_url && <img src={projects[0].cover_image_url} alt={projects[0].title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }} />}
                <div style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <span style={{ fontFamily:mono, fontSize:11, color:"rgba(255,255,255,.7)", letterSpacing:"0.12em" }}>01 / 01</span>
                  <StatusPill status={projects[0].status} />
                </div>
                <div style={{ position:"relative", zIndex:1 }}>
                  <h3 style={{ fontFamily:display, fontWeight:700, fontSize:32, color:"#FFFFFF", letterSpacing:"-0.03em", margin:"0 0 6px", lineHeight:0.95, textShadow:"0 2px 30px rgba(0,0,0,.18)" }}>{projects[0].title}</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,.85)", margin:0, maxWidth:"32ch", lineHeight:1.4, fontWeight:500 }}>{projects[0].tagline}.</p>
                </div>
              </div>
            </article>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:16 }}>
              {projects.map((p, i) => (
                <article key={p.id} style={{ gridColumn:TILE_SIZES[i % TILE_SIZES.length].col, position:"relative", borderRadius:12, overflow:"hidden", background:surface }}>
                  <div style={{ aspectRatio:TILE_SIZES[i % TILE_SIZES.length].aspect, background:p.cover_color ?? COVER_COLOR_FALLBACK, position:"relative", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:24, overflow:"hidden" }}>
                    {p.cover_image_url && <img src={p.cover_image_url} alt={p.title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }} />}
                    <div style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <span style={{ fontFamily:mono, fontSize:11, color:"rgba(255,255,255,.7)", letterSpacing:"0.12em" }}>{String(i+1).padStart(2,"0")} /{String(projects.length).padStart(2,"0")}</span>
                      <StatusPill status={p.status} />
                    </div>
                    <div style={{ position:"relative", zIndex:1 }}>
                      <h3 style={{ fontFamily:display, fontWeight:700, fontSize:i===5?56:32, color:"#FFFFFF", letterSpacing:"-0.03em", margin:"0 0 6px", lineHeight:0.95, textShadow:"0 2px 30px rgba(0,0,0,.18)" }}>{p.title}</h3>
                      <p style={{ fontSize:14, color:"rgba(255,255,255,.85)", margin:0, maxWidth:"32ch", lineHeight:1.4, fontWeight:500 }}>{p.tagline}.</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      );
      case "about": return (!user.bio && !user.bio_long) ? null : (
        <section key="about" data-section="about" style={{ background:surface, padding:`80px ${px}`, borderTop:`1px solid ${border}`, borderBottom:`1px solid ${border}` }}>
          <div style={{ maxWidth:1320, margin:"0 auto", display:"grid", gridTemplateColumns: m ? "1fr" : "1fr 2fr", gap: m ? 24 : 80, alignItems:"start" }}>
            <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(40px,7vw,96px)", letterSpacing:"-0.05em", margin:0, color:ink, lineHeight:0.9 }}>
              {sectionLabel(sections, "about", "Hello")}<span style={{ color:accent }}>.</span>
            </h2>
            <div>
              <p style={{ fontSize:"clamp(16px,1.5vw,22px)", lineHeight:1.5, color:ink, margin:"0 0 24px", letterSpacing:"-0.01em", fontWeight:500 }}>{user.bio}</p>
              <div style={{ fontSize:17, lineHeight:1.65, color:muted, margin:0, maxWidth:"60ch" }} dangerouslySetInnerHTML={{ __html: user.bio_long ?? "" }} />
            </div>
          </div>
        </section>
      );
      case "experience": return experience.length === 0 ? null : (
        <section key="experience" data-section="experience" style={{ padding:`80px ${px} 0`, maxWidth:1320, margin:"0 auto" }}>
          <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(28px,4vw,64px)", letterSpacing:"-0.04em", margin:"0 0 48px", color:ink, lineHeight:0.95 }}>
            {sectionLabel(sections, "experience", "Experience")}.
          </h2>
          <div style={{ display:"grid", gridTemplateColumns: m ? "1fr" : "repeat(2, 1fr)", gap:24 }}>
            {experience.map(e => (
              <div key={e.company} style={{ background:surface, border:`1px solid ${border}`, borderRadius:12, padding:"24px 28px" }}>
                <div style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12 }}>{e.period}{e.location ? ` · ${e.location}` : ""}</div>
                <div style={{ fontFamily:display, fontWeight:700, fontSize:24, color:ink, letterSpacing:"-0.025em", marginBottom:4 }}>{e.company}</div>
                <div style={{ fontSize:14, color:accent, fontWeight:500, marginBottom:12 }}>{e.title}</div>
                {e.description && <div style={{ fontSize:14, color:muted, lineHeight:1.55, margin:0 }} dangerouslySetInnerHTML={{ __html: e.description }} />}
              </div>
            ))}
          </div>
        </section>
      );
      case "education": return education.length === 0 ? null : (
        <section key="education" data-section="education" style={{ padding:`80px ${px} 0`, maxWidth:1320, margin:"0 auto" }}>
          <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.04em", margin:"0 0 32px", color:ink, lineHeight:0.95 }}>
            {sectionLabel(sections, "education", "Education")}.
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {education.map(ed => (
              <div key={ed.institution} style={{ paddingBottom:18, borderBottom:`1px solid ${border}` }}>
                <div style={{ fontFamily:display, fontWeight:600, fontSize:16, color:ink, letterSpacing:"-0.01em", marginBottom:4 }}>{ed.degree}</div>
                <div style={{ fontSize:13, color:muted }}>{ed.institution}</div>
                <div style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.1em", textTransform:"uppercase", marginTop:4 }}>{ed.period}</div>
                {ed.description && <div style={{ fontSize:13, color:muted, lineHeight:1.55, marginTop:8 }} dangerouslySetInnerHTML={{ __html: ed.description }} />}
              </div>
            ))}
          </div>
        </section>
      );
      case "skills": return skills.length === 0 ? null : (
        <section key="skills" data-section="skills" style={{ padding:`80px ${px} 0`, maxWidth:1320, margin:"0 auto" }}>
          <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.04em", margin:"0 0 32px", color:ink, lineHeight:0.95 }}>
            {sectionLabel(sections, "skills", "Skills")}.
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {skills.map((s, i) => (
              <div key={i}>
                {s.category && <div style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:10 }}>{s.category}</div>}
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {s.items.map(it => (
                    <span key={it} style={{ padding:"6px 14px", fontSize:14, fontWeight:500, color:ink, background:surface, border:`1px solid ${border}`, borderRadius:999 }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      );
      case "publications": return publications.length === 0 ? null : (
        <section key="publications" data-section="publications" style={{ padding:`80px ${px} 0`, maxWidth:1320, margin:"0 auto" }}>
          <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.04em", margin:"0 0 32px", color:ink, lineHeight:0.95 }}>
            {sectionLabel(sections, "publications", "Publications")}.
          </h2>
          <div style={{ display:"grid", gridTemplateColumns: m ? "1fr" : "1fr 1fr", gap:20 }}>
            {publications.map(p => (
              <div key={p.id} style={{ background:surface, border:`1px solid ${border}`, borderRadius:12, padding:"20px 24px" }}>
                <div style={{ display:"flex", gap:10, marginBottom:6 }}>
                  <span style={{ fontFamily:mono, fontSize:10, color:accent, textTransform:"uppercase", letterSpacing:"0.12em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                  {p.year && <span style={{ fontFamily:mono, fontSize:10, color:muted }}>{p.year}</span>}
                </div>
                <div style={{ fontFamily:display, fontWeight:700, fontSize:17, color:ink, marginBottom:4 }}>{p.title}</div>
                {p.venue && <div style={{ fontSize:12.5, color:muted }}>{p.venue}</div>}
                {p.summary && <div style={{ fontSize:13.5, color:muted, lineHeight:1.55, margin:"8px 0 0" }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
              </div>
            ))}
          </div>
        </section>
      );
      case "testimonials": return testimonials.length === 0 ? null : (
        <section key="testimonials" data-section="testimonials" style={{ padding:`80px ${px} 0`, maxWidth:1320, margin:"0 auto" }}>
          <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.04em", margin:"0 0 32px", color:ink, lineHeight:0.95 }}>
            {sectionLabel(sections, "testimonials", "Testimonials")}.
          </h2>
          <div style={{ display:"grid", gridTemplateColumns: m ? "1fr" : testimonials.length === 1 ? "1fr" : "1fr 1fr", gap:20 }}>
            {testimonials.map(t => (
              <blockquote key={t.id} style={{ margin:0, background:surface, border:`1px solid ${border}`, borderRadius:12, padding:"20px 24px", borderLeft:`3px solid ${accent}` }}>
                <div style={{ fontSize:15, lineHeight:1.7, color:ink, fontStyle:"italic", margin:"0 0 12px" }} dangerouslySetInnerHTML={{ __html: t.quote }} />
                <footer style={{ fontSize:13, color:muted }}>
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
        <section key="awards" data-section="awards" style={{ padding:`80px ${px} 0`, maxWidth:1320, margin:"0 auto" }}>
          <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.04em", margin:"0 0 32px", color:ink, lineHeight:0.95 }}>
            {sectionLabel(sections, "awards", "Awards")}.
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {awards.map(a => (
              <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", paddingBottom:12, borderBottom:`1px solid ${border}`, gap:12, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:display, fontWeight:700, fontSize:17, color:ink }}>{a.title}</div>
                  {a.issuer && <div style={{ fontSize:13, color:muted, marginTop:2 }}>{a.issuer}</div>}
                  {a.summary && <div style={{ fontSize:13.5, color:muted, margin:"4px 0 0", lineHeight:1.5 }} dangerouslySetInnerHTML={{ __html: a.summary }} />}
                </div>
                {a.year && <span style={{ fontFamily:mono, fontSize:11, color:muted, flexShrink:0 }}>{a.year}</span>}
              </div>
            ))}
          </div>
        </section>
      );
      case "certifications": return certifications.length === 0 ? null : (
        <section key="certifications" data-section="certifications" style={{ padding:`80px ${px} 0`, maxWidth:1320, margin:"0 auto" }}>
          <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.04em", margin:"0 0 32px", color:ink, lineHeight:0.95 }}>
            {sectionLabel(sections, "certifications", "Certifications")}.
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {certifications.map(c => (
              <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", paddingBottom:8, borderBottom:`1px dashed ${border}`, gap:12, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:display, fontWeight:700, fontSize:16, color:ink }}>{c.name}</div>
                  {c.issuer && <div style={{ fontSize:13, color:muted, marginTop:2 }}>{c.issuer}</div>}
                </div>
                {c.year && <span style={{ fontFamily:mono, fontSize:11, color:muted, flexShrink:0 }}>{c.year}</span>}
              </div>
            ))}
          </div>
        </section>
      );
      case "languages": return languages.length === 0 ? null : (
        <section key="languages" data-section="languages" style={{ padding:`80px ${px} 0`, maxWidth:1320, margin:"0 auto" }}>
          <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.04em", margin:"0 0 32px", color:ink, lineHeight:0.95 }}>
            {sectionLabel(sections, "languages", "Languages")}.
          </h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
            {languages.map(l => (
              <div key={l.name} style={{ background:surface, border:`1px solid ${border}`, borderRadius:999, padding:"8px 18px", display:"flex", gap:10, alignItems:"center" }}>
                <span style={{ fontFamily:display, fontWeight:700, fontSize:15, color:ink }}>{l.name}</span>
                <span style={{ fontFamily:mono, fontSize:10, color:muted, textTransform:"uppercase", letterSpacing:"0.1em" }}>{l.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      );
      case "volunteer": return volunteer.length === 0 ? null : (
        <section key="volunteer" data-section="volunteer" style={{ padding:`80px ${px} 0`, maxWidth:1320, margin:"0 auto" }}>
          <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.04em", margin:"0 0 32px", color:ink, lineHeight:0.95 }}>
            {sectionLabel(sections, "volunteer", "Volunteer")}.
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {volunteer.map(v => (
              <div key={v.organization} style={{ paddingBottom:16, borderBottom:`1px solid ${border}` }}>
                <div style={{ fontFamily:display, fontWeight:700, fontSize:18, color:ink }}>{v.role}</div>
                <div style={{ fontFamily:mono, fontSize:11, color:muted, textTransform:"uppercase", letterSpacing:"0.08em", marginTop:4 }}>{v.organization}{v.period ? ` · ${v.period}` : ""}</div>
                {v.description && <div style={{ fontSize:14, color:muted, lineHeight:1.55, margin:"8px 0 0" }} dangerouslySetInnerHTML={{ __html: v.description }} />}
              </div>
            ))}
          </div>
        </section>
      );
      default: return null;
    }
  };

  return (
    <div style={{ background:bg, color:ink, fontFamily:body, fontSize:15, lineHeight:1.5, minHeight:"100%" }}>

      {/* HERO */}
      {sectionVisible(sections, "hero") && (
        <header style={{ padding:`clamp(40px,5vw,64px) ${px} clamp(48px,6vw,80px)`, maxWidth:1320, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns: m ? "1fr" : "2fr 1fr", gap: m ? 32 : 48, alignItems:"end", marginBottom:32 }}>
            <div style={{ order: m ? 1 : 0 }}>
              {user.availability_text && (
                <div style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"6px 14px 6px 12px", borderRadius:999, background:accent, color:accentFg, fontSize:12, fontWeight:600, letterSpacing:"0.04em", marginBottom:32, textTransform:"uppercase" }}>
                  <span style={{ width:6, height:6, borderRadius:999, background:accentFg, opacity:0.7 }} />
                  {user.availability_text}
                </div>
              )}
              <h1 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(48px,11vw,168px)", lineHeight:0.88, letterSpacing:"-0.05em", margin:0, color:ink, wordBreak:"break-word", overflowWrap:"break-word" }}>
                {fName}<br />
                {lName && <span style={{ color:accent }}>{lName}.</span>}
                {!lName && <span style={{ color:accent }}>.</span>}
              </h1>
            </div>
            <div style={{ order: m ? 0 : 1 }}>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} style={{ width:m?64:88, height:m?64:88, borderRadius:999, objectFit:"cover", marginBottom:20 }} />
              ) : (
                <div style={{ width:m?64:88, height:m?64:88, borderRadius:999, background:`linear-gradient(135deg, ${accent}, #FF9F4A)`, color:"white", fontFamily:display, fontWeight:700, fontSize:m?26:36, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
              )}
              {user.headline && <p style={{ fontSize:m?15:18, lineHeight:1.45, color:ink, margin:0, fontWeight:500, letterSpacing:"-0.01em" }}>{user.headline}.</p>}
              {(user.location || user.social.find(s => s.type === "linkedin")?.url || user.handle) && (
                <div style={{ marginTop:16, fontFamily:mono, fontSize:11.5, color:muted, textTransform:"uppercase", letterSpacing:"0.12em" }}>
                  {(() => {
                    const linkedinUrl = user.social.find(s => s.type === "linkedin")?.url;
                    const profileUrl  = linkedinUrl ?? (user.handle ? `profolyo.me/${user.handle}` : null);
                    const parts = [user.location, profileUrl].filter(Boolean);
                    return parts.join(" · ");
                  })()}
                </div>
              )}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8, height:m?8:16, marginTop:24 }}>
            <div style={{ background:accent }} />
            <div style={{ background:ink }} />
            <div style={{ background:"#FDB044" }} />
            <div style={{ background:"#FFD8B0" }} />
          </div>
        </header>
      )}

      {/* BODY SECTIONS */}
      <div style={{ paddingBottom:96 }}>
        {ordered.map(renderSection)}
      </div>

      {/* CUSTOM SECTIONS */}
      {customSections(sections).filter(s => s.visible && s.items && s.items.length > 0).map((section) => (
        <section key={section.id} style={{ background:surface, padding:`clamp(48px,6vw,96px) ${px}`, borderTop:`1px solid ${border}` }}>
          <div style={{ maxWidth:1320, margin:"0 auto" }}>
            <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(24px,3.5vw,48px)", letterSpacing:"-0.03em", margin:"0 0 40px", color:ink }}>{section.label}</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {(section.items ?? []).map((item) => (
                <div key={item.id} style={{ padding:"24px", borderRadius:12, border:`1px solid ${border}`, background:"#fff" }}>
                  <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:12, marginBottom:4, flexWrap:"wrap" }}>
                    <span style={{ fontWeight:700, fontSize:16, color:ink }}>{item.heading}</span>
                    {item.date && <span style={{ fontFamily:mono, fontSize:11, color:muted, whiteSpace:"nowrap" }}>{item.date}</span>}
                  </div>
                  {item.subheading && <div style={{ fontSize:13, color:muted, marginBottom:4 }}>{item.subheading}</div>}
                  {item.description && <div style={{ fontSize:14, color:muted, margin:0, lineHeight:1.6 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                  {item.link && <a href={item.link} style={{ fontSize:12, color:accent, textDecoration:"underline", display:"inline-block", marginTop:6 }}>{item.link}</a>}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CONTACT */}
      {sectionVisible(sections, "contact") && user.email && (
        <section style={{ background:accent, color:"white", padding:`clamp(60px,8vw,120px) ${px}` }}>
          <div style={{ maxWidth:1320, margin:"0 auto", display:"grid", gridTemplateColumns: m ? "1fr" : "2fr 1fr", gap: m ? 32 : 64, alignItems:"end" }}>
            <h2 style={{ fontFamily:display, fontWeight:800, fontSize:"clamp(36px,8vw,120px)", letterSpacing:"-0.05em", margin:0, lineHeight:0.85, color:"white" }}>
              {sectionLabel(sections, "contact", "Let's work together")}.
            </h2>
            <div>
                <a href={`mailto:${user.email}`} style={{ display:"inline-block", padding:"16px 28px", background:ink, color:bg, borderRadius:999, fontFamily:body, fontWeight:600, fontSize:m?14:16, textDecoration:"none", marginBottom:32, wordBreak:"break-all" }}>
                {user.email} →
              </a>
              <div style={{ display:"flex", flexDirection:"column", gap:8, fontFamily:mono, fontSize:13, color:"rgba(255,255,255,.85)" }}>
                {user.social.map(s => (
                  <a key={s.id} href={s.url} style={{ color:"white", textDecoration:"none", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                    ↗ {s.label}
                  </a>
                ))}
              </div>
            </div>
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
