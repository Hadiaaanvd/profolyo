// Template 10 — Cover (full-bleed photo hero, dark gallery aesthetic)
const CoverTemplate = ({ data, accent = "#FFFFFF" }) => {
  const { user, projects, experience, education, skills } = data;
  const ink = "#FAFAF7", muted = "#A29F92", dim = "#6F6D63";
  const bg = "#0F0E0B", surface = "#1A1814", border = "#34332E";

  const display = "'Bricolage Grotesque', sans-serif";
  const body = "'Inter', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.6, minHeight: "100%" }}>

      {/* COVER — full-bleed hero */}
      <section style={{ position: "relative", minHeight: 720, background: projects[0].cover_color, overflow: "hidden" }}>
        {/* Vignette overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.0) 30%, rgba(0,0,0,.6) 100%)" }} />
        {/* Top nav */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", color: "white", zIndex: 2 }}>
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
            {user.name}<span style={{ opacity: 0.7 }}>.</span>
          </div>
          <div style={{ display: "flex", gap: 28, fontFamily: mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            <a href="#work" style={{ color: "rgba(255,255,255,.85)", textDecoration: "none" }}>Work</a>
            <a href="#about" style={{ color: "rgba(255,255,255,.85)", textDecoration: "none" }}>About</a>
            <a href="#contact" style={{ color: "rgba(255,255,255,.85)", textDecoration: "none" }}>Contact</a>
          </div>
        </div>
        {/* Bottom block */}
        <div style={{ position: "absolute", left: 40, right: 40, bottom: 40, color: "white", zIndex: 2, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,.7)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
              ── A portfolio · 2026
            </div>
            <h1 style={{ fontFamily: display, fontWeight: 500, fontSize: 96, letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0, color: "white" }}>
              {user.name}<span style={{ opacity: 0.7 }}>.</span>
            </h1>
            <p style={{ fontSize: 20, color: "rgba(255,255,255,.9)", margin: "16px 0 0", maxWidth: "36ch", fontWeight: 400 }}>
              {user.headline}.
            </p>
          </div>
          <div style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,.7)", letterSpacing: "0.16em", textTransform: "uppercase", textAlign: "right" }}>
            <div style={{ marginBottom: 6 }}>{user.location}</div>
            <div>{user.availability_text}</div>
          </div>
        </div>
        {/* Scroll cue */}
        <div style={{ position: "absolute", left: "50%", bottom: 16, transform: "translateX(-50%)", fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,.6)", letterSpacing: "0.3em", textTransform: "uppercase", zIndex: 2 }}>
          ↓ Scroll
        </div>
      </section>

      {/* WORK — gallery */}
      <section id="work" style={{ padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1480, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 64, paddingBottom: 24, borderBottom: `1px solid ${border}` }}>
            <h2 style={{ fontFamily: display, fontWeight: 500, fontSize: 56, letterSpacing: "-0.035em", margin: 0, lineHeight: 1, color: ink }}>Selected work</h2>
            <span style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase" }}>{projects.length} pieces · 2019—2026</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
            {projects.map((p, i) => (
              <article key={p.id} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "2fr 1fr" : "1fr 2fr", gap: 48, alignItems: "end" }}>
                {i % 2 === 0 ? (
                  <>
                    <div style={{ aspectRatio: "16/10", background: p.cover_color, position: "relative", overflow: "hidden" }} />
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12 }}>
                        № {String(i + 1).padStart(2, "0")} · {p.period}
                      </div>
                      <h3 style={{ fontFamily: display, fontWeight: 500, fontSize: 36, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 12px", color: ink }}>{p.title}</h3>
                      <p style={{ fontSize: 15, color: muted, margin: "0 0 16px", lineHeight: 1.5, maxWidth: "32ch" }}>{p.tagline}.</p>
                      <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.role}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12 }}>
                        № {String(i + 1).padStart(2, "0")} · {p.period}
                      </div>
                      <h3 style={{ fontFamily: display, fontWeight: 500, fontSize: 36, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 12px", color: ink }}>{p.title}</h3>
                      <p style={{ fontSize: 15, color: muted, margin: "0 0 16px", lineHeight: 1.5, maxWidth: "32ch" }}>{p.tagline}.</p>
                      <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.role}</div>
                    </div>
                    <div style={{ aspectRatio: "16/10", background: p.cover_color, position: "relative", overflow: "hidden" }} />
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "120px 32px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>About</div>
          <h2 style={{ fontFamily: display, fontWeight: 500, fontSize: 44, letterSpacing: "-0.035em", margin: "0 0 32px", lineHeight: 1.1 }}>{user.bio_short}</h2>
          <p style={{ fontSize: 16, color: muted, margin: 0, lineHeight: 1.7 }}>{user.bio_long}</p>
        </div>
      </section>

      {/* EXPERIENCE + EDUCATION + SKILLS — clean three-column or list */}
      <section style={{ padding: "0 32px 120px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 64, paddingTop: 64, borderTop: `1px solid ${border}` }}>

          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>Experience</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {experience.map((e) => (
                <div key={e.company}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink, marginBottom: 2, letterSpacing: "-0.01em" }}>{e.company}</div>
                  <div style={{ fontSize: 13, color: muted, marginBottom: 2 }}>{e.title}</div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.08em" }}>{e.period}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>Education</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {education.map((ed) => (
                <div key={ed.institution}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink, marginBottom: 2, letterSpacing: "-0.01em" }}>{ed.degree}</div>
                  <div style={{ fontSize: 13, color: muted, marginBottom: 2 }}>{ed.institution}</div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.08em" }}>{ed.period}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>Skills</div>
            <div style={{ fontSize: 13.5, color: muted, lineHeight: 1.75 }}>
              {skills.flatMap(s => s.items).join(" · ")}
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px 32px 96px", borderTop: `1px solid ${border}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>Contact</div>
          <h2 style={{ fontFamily: display, fontWeight: 500, fontSize: 56, letterSpacing: "-0.035em", margin: "0 0 32px", lineHeight: 1 }}>
            Let's make<br/>something good.
          </h2>
          <a href={`mailto:${user.email}`} style={{ display: "inline-block", padding: "14px 28px", border: `1px solid ${ink}`, color: ink, borderRadius: 999, fontFamily: body, fontWeight: 500, fontSize: 15, textDecoration: "none", marginBottom: 32 }}>
            {user.email} ↗
          </a>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {user.social.map((s) => (
              <a key={s.type} href={s.url} style={{ color: muted, textDecoration: "none" }}>{s.type === "readcv" ? "Read.cv" : s.type}</a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

Object.assign(window, { CoverTemplate });
