// Template 06 — Press (newsprint editorial, serif body, drop caps)
const PressTemplate = ({ data, accent = "#7C2D12" }) => {
  const { user, projects, experience, education, skills } = data;
  const ink = "#1A1814", muted = "#5C544A", dim = "#8A8170";
  const bg = "#FAF7EE", border = "#D9D2BD";

  const serif = "'Source Serif 4', 'Source Serif Pro', Georgia, serif";
  const display = "'Bricolage Grotesque', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  const statusPill = (s) => {
    const label = s === "live" ? "Live" : s === "in_progress" ? "In progress" : "Archived";
    return <span style={{ fontFamily: mono, fontSize: 10, color: muted, letterSpacing: "0.12em", textTransform: "uppercase", border: `1px solid ${border}`, padding: "2px 7px" }}>{label}</span>;
  };

  return (
    <div style={{ background: bg, color: ink, fontFamily: serif, fontSize: 16, lineHeight: 1.65, minHeight: "100%" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 40px 96px" }}>

        {/* MASTHEAD */}
        <header style={{ borderTop: `4px double ${ink}`, borderBottom: `1px solid ${ink}`, padding: "20px 0 16px", marginBottom: 48, display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase" }}>The {user.name.split(" ")[0]} Quarterly · Vol. 9</div>
          <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase" }}>Berlin · 2026 Edition · No. 01</div>
        </header>

        {/* HERO */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>— A portrait, in their own words —</div>
          <h1 style={{ fontFamily: display, fontWeight: 700, fontSize: 88, lineHeight: 1, letterSpacing: "-0.035em", margin: "0 0 24px", color: ink, textAlign: "center" }}>
            {user.name}<span style={{ color: accent }}>.</span>
          </h1>
          <p style={{ fontFamily: serif, fontSize: 22, fontStyle: "italic", color: muted, textAlign: "center", margin: "0 auto 24px", maxWidth: "44ch", lineHeight: 1.5 }}>
            "{user.bio_short}"
          </p>
          <div style={{ textAlign: "center", fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {user.headline} · {user.location} · {user.availability_text}
          </div>
        </section>

        {/* ABOUT — drop cap, multi-column */}
        <section style={{ marginBottom: 80, borderTop: `1px solid ${border}`, paddingTop: 48 }}>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 36, letterSpacing: "-0.02em", margin: "0 0 24px", color: ink, textAlign: "center" }}>The Story So Far</h2>
          <div style={{ columnCount: 2, columnGap: 48, fontSize: 17, lineHeight: 1.7, color: ink }}>
            <p style={{ margin: 0, textIndent: 0 }}>
              <span style={{ float: "left", fontFamily: display, fontWeight: 700, fontSize: 78, lineHeight: 0.85, color: accent, paddingRight: 10, paddingTop: 4 }}>
                {user.bio_long[0]}
              </span>
              {user.bio_long.slice(1)}
            </p>
            <p style={{ marginTop: 16 }}>
              Today, the work is about building the small, careful things — the editor's auto-save, the empty-state copy, the way a chart loads. The {user.headline.split(" ")[0].toLowerCase()} part is the title; the design-systems-nerd part is the discipline.
            </p>
          </div>
        </section>

        {/* WORK — feature rows */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ borderBottom: `1px solid ${ink}`, paddingBottom: 8, marginBottom: 32, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", margin: 0, color: ink }}>Features</h2>
            <span style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>{projects.length} pieces · 2019—Now</span>
          </div>
          {projects.map((p, i) => (
            <article key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 32, padding: "28px 0", borderBottom: i < projects.length - 1 ? `1px solid ${border}` : "none" }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 10, color: dim, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 8 }}>
                  Issue {String(i + 1).padStart(2, "0")} · {p.role} · {p.period}
                </div>
                <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: 32, letterSpacing: "-0.025em", lineHeight: 1.05, margin: "0 0 8px", color: ink }}>{p.title}</h3>
                <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 18, color: muted, margin: "0 0 12px", lineHeight: 1.45 }}>{p.tagline}.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                  {statusPill(p.status)}
                  <span style={{ fontFamily: mono, fontSize: 10, color: muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>{p.tech_stack.slice(0, 4).join(" · ")}</span>
                </div>
              </div>
              <div style={{ aspectRatio: "5/4", background: p.cover_color, position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, border: `1px solid ${ink}`, mixBlendMode: "multiply", pointerEvents: "none" }} />
              </div>
            </article>
          ))}
        </section>

        {/* EXPERIENCE */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", margin: "0 0 24px", color: ink, paddingBottom: 8, borderBottom: `1px solid ${ink}` }}>Curriculum</h2>
          {experience.map((e, i) => (
            <div key={e.company} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 32, padding: "20px 0", borderBottom: i < experience.length - 1 ? `1px dashed ${border}` : "none" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{e.period}<br/>{e.location}</div>
              <div>
                <div style={{ fontFamily: display, fontWeight: 700, fontSize: 17, color: ink, marginBottom: 4 }}>{e.title}, {e.company}</div>
                {e.description && <p style={{ fontFamily: serif, fontSize: 15.5, color: muted, fontStyle: "italic", margin: 0, lineHeight: 1.55 }}>{e.description}</p>}
              </div>
            </div>
          ))}
        </section>

        {/* EDUCATION */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", margin: "0 0 24px", color: ink, paddingBottom: 8, borderBottom: `1px solid ${ink}` }}>Schooling</h2>
          {education.map((ed) => (
            <div key={ed.institution} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 32, padding: "16px 0", borderBottom: `1px dashed ${border}` }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{ed.period}</div>
              <div>
                <div style={{ fontFamily: display, fontWeight: 700, fontSize: 16, color: ink, marginBottom: 2 }}>{ed.degree}</div>
                <div style={{ fontFamily: serif, fontSize: 14.5, color: muted, fontStyle: "italic" }}>{ed.institution}, {ed.location}</div>
              </div>
            </div>
          ))}
        </section>

        {/* SKILLS */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em", margin: "0 0 24px", color: ink, paddingBottom: 8, borderBottom: `1px solid ${ink}` }}>The Toolkit</h2>
          {skills.map((s) => (
            <p key={s.category} style={{ margin: "0 0 14px", fontSize: 15.5, lineHeight: 1.7, color: ink }}>
              <span style={{ fontFamily: display, fontWeight: 700, color: ink }}>{s.category}: </span>
              <span style={{ fontFamily: serif, fontStyle: "italic", color: muted }}>{s.items.join(", ")}.</span>
            </p>
          ))}
        </section>

        {/* CONTACT — byline */}
        <section style={{ borderTop: `4px double ${ink}`, paddingTop: 28, textAlign: "center" }}>
          <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: 19, color: ink, margin: "0 0 14px", lineHeight: 1.5 }}>
            Correspondence welcome at <a href={`mailto:${user.email}`} style={{ color: accent, textDecoration: "underline" }}>{user.email}</a>
          </p>
          <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {user.social.map(s => s.label).join(" · ")}
          </div>
        </section>

      </div>
    </div>
  );
};

Object.assign(window, { PressTemplate });
