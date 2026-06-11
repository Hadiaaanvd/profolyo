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
    <span style={{ display:"inline-flex", alignItems:"center", padding:"3px 10px", fontFamily:"'JetBrains Mono',monospace", fontSize:10, fontWeight:500, borderRadius:999, background:bg, color:fg, letterSpacing:"0.06em", textTransform:"uppercase" }}>
      {label}
    </span>
  );
}

// Browser chrome mock for project cards
function BrowserChrome({ url, coverColor, coverImage }: { url?: string; coverColor: string; coverImage?: string | null }) {
  return (
    <div style={{ background:"#FFFFFF", borderRadius:12, overflow:"hidden", border:"1px solid rgb(225,221,210)", boxShadow:"0 32px 80px -32px rgba(0,0,0,.18), 0 12px 24px -12px rgba(0,0,0,.08)", cursor:"pointer" }}>
      <div style={{ height:34, background:"rgb(244,242,236)", borderBottom:"1px solid rgb(225,221,210)", display:"flex", alignItems:"center", padding:"0 12px", gap:14 }}>
        <div style={{ display:"flex", gap:6 }}>
          <span style={{ width:10, height:10, borderRadius:999, background:"rgb(255,98,89)", display:"inline-block" }} />
          <span style={{ width:10, height:10, borderRadius:999, background:"rgb(254,188,46)", display:"inline-block" }} />
          <span style={{ width:10, height:10, borderRadius:999, background:"rgb(43,201,64)", display:"inline-block" }} />
        </div>
        {url && (
          <div style={{ flex:1, height:20, background:"#FFFFFF", borderRadius:4, fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"rgb(162,159,146)", padding:"3px 10px", letterSpacing:"0.04em", display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ color:"rgb(34,197,94)" }}>●</span>{url}
          </div>
        )}
      </div>
      <div style={{ aspectRatio:"16/10", background:coverColor, position:"relative" }}>
        {coverImage && <img src={coverImage} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
      </div>
    </div>
  );
}

// Grid column spans for secondary projects
const GRID_SPANS = ["span 4","span 2","span 2","span 3","span 3","span 4"];

export default function PrismTemplate({ portfolio, accent, sections, headingFont, bodyFont }: Props) {
  const { user, projects, experience, education, skills, publications = [], testimonials = [], awards = [], certifications = [], languages = [], volunteer = [] } = portfolio;
  const ink = "rgb(15,14,11)", muted = "rgb(84,81,74)", dim = "rgb(162,159,146)";
  const bg = "rgb(241,238,230)", surface = "#FFFFFF", border = "rgb(225,221,210)";
  const display = headingFont ?? "'Bricolage Grotesque', sans-serif";
  const body = bodyFont ?? "'Inter', sans-serif";
  const mono = "'JetBrains Mono',monospace";
  const m = useIsMobile();
  const px = m ? "20px" : "40px";

  const ordered = orderedBuiltInTypes(sections);

  // Split projects: first is "featured", rest are secondary
  const [featuredProject, ...secondaryProjects] = projects;

  const renderSection = (type: string) => {
    switch (type) {
      case "projects": return projects.length === 0 ? null : (
        <div key="projects" data-section="projects">
          {/* Featured project */}
          {featuredProject && (
            <section style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"40px":"64px"} ${px} 32px` }}>
              <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:8 }}>
                <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
                  Case Study № 01 · Featured
                </span>
                {featuredProject.period && (
                  <span style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.14em", textTransform:"uppercase" }}>{featuredProject.period}</span>
                )}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:m?"1fr":"1fr 1fr", gap:m?32:56, alignItems:"center", marginBottom:28 }}>
                <div>
                  <h2 style={{ fontFamily:display, fontWeight:500, fontSize:m?"clamp(36px,8vw,72px)":"clamp(40px,5vw,72px)", letterSpacing:"-0.04em", lineHeight:0.98, margin:"0 0 20px", color:ink }}>
                    {featuredProject.title}<span style={{ color:accent }}>.</span>
                  </h2>
                  <p style={{ fontSize:m?16:20, color:muted, margin:"0 0 24px", lineHeight:1.45, letterSpacing:"-0.01em", maxWidth:"32ch" }}>{featuredProject.tagline}.</p>
                  <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"6px 24px", fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.06em", marginBottom:32, alignContent:"start" }}>
                    {featuredProject.role && (
                      <>
                        <span style={{ color:dim, letterSpacing:"0.18em", textTransform:"uppercase", fontSize:10.5 }}>ROLE</span>
                        <span style={{ color:ink }}>{featuredProject.role}</span>
                      </>
                    )}
                    {featuredProject.period && (
                      <>
                        <span style={{ color:dim, letterSpacing:"0.18em", textTransform:"uppercase", fontSize:10.5 }}>YEAR</span>
                        <span style={{ color:ink }}>{featuredProject.period}</span>
                      </>
                    )}
                    {featuredProject.tech_stack.length > 0 && (
                      <>
                        <span style={{ color:dim, letterSpacing:"0.18em", textTransform:"uppercase", fontSize:10.5 }}>STACK</span>
                        <span style={{ color:ink }}>{featuredProject.tech_stack.slice(0,5).join(" · ")}</span>
                      </>
                    )}
                  </div>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                    <StatusPill status={featuredProject.status} />
                  </div>
                </div>
                {!m && (
                  <BrowserChrome
                    url={featuredProject.links?.find(l => l.type === "live")?.url?.replace(/^https?:\/\//, "") ?? featuredProject.slug}
                    coverColor={featuredProject.cover_color ?? COVER_COLOR_FALLBACK}
                    coverImage={featuredProject.cover_image_url}
                  />
                )}
              </div>
            </section>
          )}

          {/* Secondary projects grid */}
          {secondaryProjects.length > 0 && (
            <section style={{ maxWidth:1400, margin:"0 auto", padding:`16px ${px} ${m?"40px":"96px"}` }}>
              <div style={{ marginBottom:32, paddingBottom:12, borderBottom:`1px solid ${border}`, display:"flex", alignItems:"baseline", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
                <span style={{ fontFamily:mono, fontSize:11, color:muted, letterSpacing:"0.22em", textTransform:"uppercase" }}>
                  More projects · {String(secondaryProjects.length).padStart(2,"0")}
                </span>
                <span style={{ fontFamily:display, fontWeight:500, fontSize:16, color:ink, letterSpacing:"-0.015em" }}>
                  {sectionLabel(sections, "projects", "Selected work")}
                </span>
              </div>
              {m ? (
                <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
                  {secondaryProjects.map((p, i) => (
                    <div key={p.id}>
                      <BrowserChrome
                        url={p.links?.find(l => l.type === "live")?.url?.replace(/^https?:\/\//, "") ?? p.slug}
                        coverColor={p.cover_color ?? COVER_COLOR_FALLBACK}
                        coverImage={p.cover_image_url}
                      />
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginTop:12, padding:"0 4px", flexWrap:"wrap", gap:8 }}>
                        <div>
                          <div style={{ fontFamily:display, fontWeight:600, fontSize:17, color:ink, letterSpacing:"-0.02em", marginBottom:3 }}>{p.title}</div>
                          <div style={{ fontSize:13, color:muted, lineHeight:1.45 }}>{p.tagline}</div>
                        </div>
                        <span style={{ fontFamily:mono, fontSize:10, color:dim, letterSpacing:"0.1em", textTransform:"uppercase" }}>№ {String(i+2).padStart(2,"0")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:20 }}>
                  {secondaryProjects.map((p, i) => (
                    <div key={p.id} style={{ gridColumn:GRID_SPANS[i % GRID_SPANS.length] }}>
                      <BrowserChrome
                        url={p.links?.find(l => l.type === "live")?.url?.replace(/^https?:\/\//, "") ?? p.slug}
                        coverColor={p.cover_color ?? COVER_COLOR_FALLBACK}
                        coverImage={p.cover_image_url}
                      />
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginTop:16, padding:"0 4px", flexWrap:"wrap", gap:8 }}>
                        <div>
                          <div style={{ fontFamily:display, fontWeight:600, fontSize:18, color:ink, letterSpacing:"-0.02em", marginBottom:3 }}>{p.title}</div>
                          <div style={{ fontSize:13.5, color:muted, lineHeight:1.45 }}>{p.tagline}</div>
                        </div>
                        <span style={{ fontFamily:mono, fontSize:10.5, color:dim, letterSpacing:"0.1em", textTransform:"uppercase", whiteSpace:"nowrap", marginLeft:16 }}>№ {String(i+2).padStart(2,"0")}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      );

      case "about": return (!user.bio && !user.bio_long) ? null : (
        <section key="about" data-section="about" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"40px":"96px"} ${px} ${m?"40px":"56px"}` }}>
          <div style={{ display:"grid", gridTemplateColumns:m?"1fr":"1.2fr 2fr", gap:m?32:80, alignItems:"start" }}>
            <div>
              {user.avatar_url ? (
                <div style={{ position:"relative", width:"100%", maxWidth:280, aspectRatio:"4/5", borderRadius:12, overflow:"hidden", border:`1px solid ${border}`, marginBottom:20 }}>
                  <img src={user.avatar_url} alt={user.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                </div>
              ) : (
                <div style={{ width:m?80:120, height:m?80:120, borderRadius:12, background:`linear-gradient(135deg, ${accent}, ${accent}88)`, color:"white", fontFamily:display, fontWeight:600, fontSize:m?30:44, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
              )}
              <div style={{ fontFamily:mono, fontSize:10.5, color:dim, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:4 }}>The designer</div>
              <div style={{ fontFamily:display, fontWeight:600, fontSize:18, color:ink, letterSpacing:"-0.015em" }}>{user.name}</div>
              {(user.pronouns || user.location) && (
                <div style={{ fontSize:14, color:muted, marginTop:2 }}>
                  {[user.pronouns, user.location].filter(Boolean).join(" · ")}
                </div>
              )}
            </div>
            <div>
              <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
                {sectionLabel(sections, "about", "About")}
              </span>
              <h2 style={{ fontFamily:display, fontWeight:500, fontSize:m?"clamp(28px,6vw,48px)":"clamp(32px,3.5vw,48px)", letterSpacing:"-0.035em", lineHeight:1.05, margin:"20px 0 28px", color:ink }}>
                Short version<span style={{ color:accent }}>.</span>
              </h2>
              {user.bio && (
                <div style={{ fontSize:m?16:19, color:ink, lineHeight:1.55, margin:"0 0 20px", letterSpacing:"-0.005em" }} dangerouslySetInnerHTML={{ __html: user.bio }} />
              )}
              {user.bio_long && (
                <div style={{ fontSize:15.5, color:muted, lineHeight:1.7, margin:0, maxWidth:"60ch" }} dangerouslySetInnerHTML={{ __html: user.bio_long }} />
              )}
            </div>
          </div>
        </section>
      );

      case "experience": return experience.length === 0 ? null : (
        <section key="experience" data-section="experience" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"32px":"56px"} ${px}` }}>
          <div style={{ marginBottom:32, paddingBottom:12, borderBottom:`1px solid ${border}`, display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"wrap", gap:8 }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {sectionLabel(sections, "experience", "The receipts")}
            </span>
            <span style={{ fontFamily:display, fontWeight:500, fontSize:16, color:ink }}>
              {sectionLabel(sections, "experience", "Where I've worked")}
            </span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:m?"1fr":"repeat(2, 1fr)", gap:m?16:24 }}>
            {experience.map(e => (
              <div key={e.id} style={{ background:surface, borderRadius:12, border:`1px solid ${border}`, padding:"24px 28px" }}>
                <div style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:12 }}>
                  {e.period}{e.location ? ` · ${e.location}` : ""}
                </div>
                <div style={{ fontFamily:display, fontWeight:600, fontSize:22, color:ink, letterSpacing:"-0.025em", marginBottom:4 }}>{e.company}</div>
                <div style={{ fontSize:13.5, color:accent, fontWeight:500, marginBottom:e.description ? 12 : 0 }}>{e.title}</div>
                {e.description && (
                  <div style={{ fontSize:13.5, color:muted, lineHeight:1.55, margin:0 }} dangerouslySetInnerHTML={{ __html: e.description }} />
                )}
              </div>
            ))}
          </div>
        </section>
      );

      case "education": return education.length === 0 ? null : (
        <section key="education" data-section="education" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"32px":"56px"} ${px}` }}>
          <div style={{ marginBottom:24, paddingBottom:12, borderBottom:`1px solid ${border}` }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {sectionLabel(sections, "education", "Education")}
            </span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {education.map((ed, i) => (
              <div key={ed.id} style={{ display:"grid", gridTemplateColumns:m?"1fr":"auto 1fr", gap:m?4:32, paddingBottom:16, borderBottom:i < education.length-1 ? `1px solid ${border}` : "none", alignItems:"baseline" }}>
                <div style={{ fontFamily:mono, fontSize:11, color:dim, textTransform:"uppercase", letterSpacing:"0.1em", whiteSpace:"nowrap", minWidth:m?undefined:130 }}>{ed.period}</div>
                <div>
                  <div style={{ fontFamily:display, fontWeight:600, fontSize:17, color:ink, letterSpacing:"-0.015em" }}>{ed.degree}</div>
                  <div style={{ fontSize:13.5, color:muted, marginTop:2 }}>{ed.institution}{ed.location ? `, ${ed.location}` : ""}</div>
                  {ed.description && <div style={{ fontSize:13, color:muted, marginTop:6, lineHeight:1.55 }} dangerouslySetInnerHTML={{ __html: ed.description }} />}
                </div>
              </div>
            ))}
          </div>
        </section>
      );

      case "skills": return skills.length === 0 ? null : (
        <section key="skills" data-section="skills" style={{ background:ink, color:"rgb(241,238,230)", padding:`${m?"40px":"80px"} 0`, margin:"0" }}>
          <div style={{ maxWidth:1400, margin:"0 auto", padding:`0 ${m?"20px":"80px"}` }}>
            <span style={{ fontFamily:mono, fontSize:11, color:dim, letterSpacing:"0.22em", textTransform:"uppercase" }}>— Practice</span>
            <h2 style={{ fontFamily:display, fontWeight:500, fontSize:m?"clamp(28px,6vw,64px)":"clamp(32px,4.5vw,64px)", letterSpacing:"-0.035em", lineHeight:1.05, margin:"20px 0 56px", color:"rgb(241,238,230)", maxWidth:"16ch" }}>
              {sectionLabel(sections, "skills", "What I do, and how")}<span style={{ color:accent }}>.</span>
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:m?"1fr":`repeat(${Math.min(skills.length, 3)}, 1fr)`, gap:m?32:48 }}>
              {skills.map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:16 }}>
                    {String(i+1).padStart(2,"0")}
                  </div>
                  {s.category && (
                    <h3 style={{ fontFamily:display, fontWeight:500, fontSize:28, letterSpacing:"-0.025em", lineHeight:1.1, margin:"0 0 14px", color:"rgb(241,238,230)" }}>{s.category}</h3>
                  )}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {s.items.map(it => (
                      <span key={it} style={{ padding:"4px 12px", fontFamily:mono, fontSize:11, color:"rgba(241,238,230,0.68)", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:999 }}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

      case "publications": return publications.length === 0 ? null : (
        <section key="publications" data-section="publications" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"32px":"56px"} ${px}` }}>
          <div style={{ marginBottom:24, paddingBottom:12, borderBottom:`1px solid ${border}` }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {sectionLabel(sections, "publications", "Publications")}
            </span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:m?"1fr":"repeat(2, 1fr)", gap:16 }}>
            {publications.map(p => (
              <div key={p.id} style={{ background:surface, borderRadius:12, border:`1px solid ${border}`, padding:"20px 24px" }}>
                <div style={{ display:"flex", gap:10, marginBottom:8 }}>
                  <span style={{ fontFamily:mono, fontSize:10, color:accent, textTransform:"uppercase", letterSpacing:"0.12em" }}>{PUBLICATION_TYPE_LABEL[p.type] ?? p.type}</span>
                  {p.year && <span style={{ fontFamily:mono, fontSize:10, color:dim }}>{p.year}</span>}
                </div>
                <div style={{ fontFamily:display, fontWeight:600, fontSize:17, color:ink, marginBottom:4 }}>{p.title}</div>
                {p.venue && <div style={{ fontSize:13, color:muted }}>{p.venue}</div>}
                {p.summary && <div style={{ fontSize:13, color:muted, lineHeight:1.55, marginTop:8 }} dangerouslySetInnerHTML={{ __html: p.summary }} />}
              </div>
            ))}
          </div>
        </section>
      );

      case "testimonials": return testimonials.length === 0 ? null : (
        <section key="testimonials" data-section="testimonials" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"32px":"56px"} ${px}` }}>
          <div style={{ marginBottom:24, paddingBottom:12, borderBottom:`1px solid ${border}` }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {sectionLabel(sections, "testimonials", "Testimonials")}
            </span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:m?"1fr":"repeat(2, 1fr)", gap:20 }}>
            {testimonials.map(t => (
              <blockquote key={t.id} style={{ margin:0, background:surface, borderRadius:12, border:`1px solid ${border}`, padding:"20px 24px", borderLeft:`3px solid ${accent}` }}>
                <div style={{ fontSize:15, lineHeight:1.7, color:ink, fontStyle:"italic", margin:"0 0 12px" }} dangerouslySetInnerHTML={{ __html: t.quote }} />
                <footer style={{ fontFamily:mono, fontSize:11, color:muted }}>
                  — {t.author}{t.role ? `, ${t.role}` : ""}{t.company ? ` @ ${t.company}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      );

      case "awards": return awards.length === 0 ? null : (
        <section key="awards" data-section="awards" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"32px":"56px"} ${px}` }}>
          <div style={{ marginBottom:24, paddingBottom:12, borderBottom:`1px solid ${border}` }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {sectionLabel(sections, "awards", "Awards")}
            </span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {awards.map(a => (
              <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", paddingBottom:12, borderBottom:`1px solid ${border}`, gap:12, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:display, fontWeight:600, fontSize:17, color:ink }}>{a.title}</div>
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
        <section key="certifications" data-section="certifications" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"32px":"56px"} ${px}` }}>
          <div style={{ marginBottom:24, paddingBottom:12, borderBottom:`1px solid ${border}` }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {sectionLabel(sections, "certifications", "Certifications")}
            </span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {certifications.map(c => (
              <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", paddingBottom:8, borderBottom:`1px dashed ${border}`, gap:12, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontFamily:display, fontWeight:600, fontSize:16, color:ink }}>{c.name}</div>
                  {c.issuer && <div style={{ fontSize:13, color:muted, marginTop:2 }}>{c.issuer}</div>}
                </div>
                {c.year && <span style={{ fontFamily:mono, fontSize:11, color:dim, flexShrink:0 }}>{c.year}</span>}
              </div>
            ))}
          </div>
        </section>
      );

      case "languages": return languages.length === 0 ? null : (
        <section key="languages" data-section="languages" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"32px":"56px"} ${px}` }}>
          <div style={{ marginBottom:24, paddingBottom:12, borderBottom:`1px solid ${border}` }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {sectionLabel(sections, "languages", "Languages")}
            </span>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {languages.map(l => (
              <div key={l.id} style={{ background:surface, borderRadius:999, border:`1px solid ${border}`, padding:"8px 18px", display:"flex", gap:10, alignItems:"center" }}>
                <span style={{ fontFamily:display, fontWeight:600, fontSize:15, color:ink }}>{l.name}</span>
                <span style={{ fontFamily:mono, fontSize:10, color:dim, textTransform:"uppercase", letterSpacing:"0.1em" }}>{l.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      );

      case "volunteer": return volunteer.length === 0 ? null : (
        <section key="volunteer" data-section="volunteer" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"32px":"56px"} ${px}` }}>
          <div style={{ marginBottom:24, paddingBottom:12, borderBottom:`1px solid ${border}` }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {sectionLabel(sections, "volunteer", "Volunteer")}
            </span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {volunteer.map(v => (
              <div key={v.id} style={{ paddingBottom:14, borderBottom:`1px solid ${border}` }}>
                <div style={{ fontFamily:display, fontWeight:600, fontSize:17, color:ink }}>{v.role}</div>
                <div style={{ fontFamily:mono, fontSize:11, color:muted, marginTop:2 }}>{v.organization}{v.period ? ` · ${v.period}` : ""}</div>
                {v.description && <div style={{ fontSize:14, color:muted, lineHeight:1.55, margin:"6px 0 0" }} dangerouslySetInnerHTML={{ __html: v.description }} />}
              </div>
            ))}
          </div>
        </section>
      );

      default: return null;
    }
  };

  return (
    <div style={{ background:bg, color:ink, fontFamily:body, fontSize:15, lineHeight:1.6, minHeight:"100%" }}>

      {/* STICKY NAV */}
      {sectionVisible(sections, "hero") && (
        <header style={{ position:"sticky", top:0, zIndex:10, background:"rgba(241,238,230,0.88)", backdropFilter:"blur(10px)", borderBottom:`1px solid ${border}` }}>
          <div style={{ maxWidth:1400, margin:"0 auto", padding:`16px ${px}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} style={{ width:32, height:32, borderRadius:8, objectFit:"cover" }} />
              ) : (
                <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg, ${accent}, ${accent}88)`, color:"white", fontFamily:display, fontWeight:700, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
              )}
              <div>
                <div style={{ fontFamily:display, fontWeight:600, fontSize:14.5, letterSpacing:"-0.015em" }}>{user.name}</div>
                {user.headline && (
                  <div style={{ fontFamily:mono, fontSize:9.5, color:muted, letterSpacing:"0.16em", textTransform:"uppercase", marginTop:1, maxWidth:"24ch", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.headline}</div>
                )}
              </div>
            </div>
            <nav style={{ display:"flex", gap:28, fontFamily:body, fontSize:13.5, color:muted }}>
              {projects.length > 0 && <a href="#work" style={{ color:muted, textDecoration:"none" }}>Work</a>}
              {(user.bio || user.bio_long) && <a href="#about" style={{ color:muted, textDecoration:"none" }}>About</a>}
              {user.email && (
                <a href={`mailto:${user.email}`} style={{ color:bg, textDecoration:"none", padding:"6px 14px", background:ink, borderRadius:6 }}>Contact</a>
              )}
            </nav>
          </div>
        </header>
      )}

      {/* HERO */}
      {sectionVisible(sections, "hero") && (
        <section style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"48px":"96px"} ${px} ${m?"32px":"56px"}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:36, flexWrap:"wrap" }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
              — Portfolio · {new Date().getFullYear()}
            </span>
            {user.available && (
              <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"3px 10px 3px 9px", borderRadius:999, fontFamily:body, fontSize:11.5, color:ink, background:surface, border:`1px solid ${border}` }}>
                <span style={{ width:6, height:6, borderRadius:999, background:"rgb(34,197,94)", display:"inline-block" }} />
                {user.availability_text ?? "Available for work"}
              </span>
            )}
          </div>
          <h1 style={{ fontFamily:display, fontWeight:500, fontSize:m?"clamp(36px,10vw,80px)":"clamp(48px,8vw,120px)", letterSpacing:"-0.045em", lineHeight:0.94, margin:"0 0 32px", color:ink, maxWidth:"14ch" }}>
            {user.headline}<span style={{ color:accent }}>.</span>
          </h1>
          <div style={{ display:"grid", gridTemplateColumns:m?"1fr":"1fr 1fr", gap:m?24:64, marginTop:48, paddingTop:32, borderTop:`1px solid ${border}` }}>
            {user.bio && (
              <div style={{ fontSize:m?16:19, color:muted, lineHeight:1.55, margin:0, letterSpacing:"-0.005em" }} dangerouslySetInnerHTML={{ __html: user.bio }} />
            )}
            <div style={{ fontFamily:mono, fontSize:11.5, color:muted, letterSpacing:"0.06em", lineHeight:1.8, display:"grid", gridTemplateColumns:"auto 1fr", gap:"4px 24px", alignContent:"start" }}>
              {user.location && (
                <>
                  <span style={{ color:dim, letterSpacing:"0.18em", textTransform:"uppercase", fontSize:10.5 }}>BASED</span>
                  <span>{user.location}</span>
                </>
              )}
              {user.headline && (
                <>
                  <span style={{ color:dim, letterSpacing:"0.18em", textTransform:"uppercase", fontSize:10.5 }}>FOCUS</span>
                  <span>{user.headline}</span>
                </>
              )}
              {user.email && (
                <>
                  <span style={{ color:dim, letterSpacing:"0.18em", textTransform:"uppercase", fontSize:10.5 }}>EMAIL</span>
                  <a href={`mailto:${user.email}`} style={{ color:accent, textDecoration:"none" }}>{user.email}</a>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* BODY */}
      <div id="work">
        {ordered.map(renderSection)}
      </div>

      {/* CUSTOM SECTIONS */}
      {customSections(sections).filter(s => s.visible && s.items && s.items.length > 0).map(section => (
        <section key={section.id} style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"32px":"56px"} ${px}` }}>
          <div style={{ marginBottom:24, paddingBottom:12, borderBottom:`1px solid ${border}` }}>
            <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>{section.label}</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {(section.items ?? []).map(item => (
              <div key={item.id} style={{ background:surface, borderRadius:12, border:`1px solid ${border}`, padding:"20px 24px" }}>
                <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:12, flexWrap:"wrap", marginBottom:4 }}>
                  <span style={{ fontFamily:display, fontWeight:600, fontSize:16, color:ink }}>{item.heading}</span>
                  {item.date && <span style={{ fontFamily:mono, fontSize:11, color:dim, whiteSpace:"nowrap" }}>{item.date}</span>}
                </div>
                {item.subheading && <div style={{ fontSize:13, color:muted, marginBottom:4 }}>{item.subheading}</div>}
                {item.description && <div style={{ fontSize:14, color:muted, margin:0, lineHeight:1.6 }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                {item.link && <a href={item.link} style={{ fontSize:12, color:accent, textDecoration:"underline", display:"inline-block", marginTop:6 }}>{item.link}</a>}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* CONTACT */}
      {sectionVisible(sections, "contact") && user.email && (
        <section id="about" style={{ maxWidth:1400, margin:"0 auto", padding:`${m?"40px":"80px"} ${px}`, borderTop:`1px solid ${border}` }}>
          <div style={{ display:"grid", gridTemplateColumns:m?"1fr":"1fr 1fr", gap:m?24:56, alignItems:"end" }}>
            <div>
              <span style={{ fontFamily:mono, fontSize:11, color:accent, letterSpacing:"0.22em", textTransform:"uppercase" }}>
                {sectionLabel(sections, "contact", "Contact")}
              </span>
              <h2 style={{ fontFamily:display, fontWeight:500, fontSize:m?"clamp(28px,7vw,56px)":"clamp(32px,4vw,56px)", letterSpacing:"-0.04em", lineHeight:0.95, margin:"16px 0 0", color:ink }}>
                {user.contact_note ?? "Let's build something together"}<span style={{ color:accent }}>.</span>
              </h2>
            </div>
            <div>
              <a href={`mailto:${user.email}`} style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 22px", background:ink, color:bg, borderRadius:999, fontFamily:body, fontWeight:500, fontSize:14, textDecoration:"none", marginBottom:24, wordBreak:"break-all" }}>
                {user.email} →
              </a>
              {user.social.length > 0 && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:16, fontFamily:mono, fontSize:12, color:muted }}>
                  {user.social.map(s => (
                    <a key={s.id} href={s.url} style={{ color:muted, textDecoration:"none" }}>{s.label}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
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
