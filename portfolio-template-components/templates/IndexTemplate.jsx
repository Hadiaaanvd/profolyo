// Template 05 — Index (visual-first masonry grid)
const IndexTemplate = ({ data, accent = "#C44536" }) => {
  const { user, projects, experience, education, skills } = data;
  const ink = "#1F1E1A";
  const muted = "#6F6D63";
  const dim = "#A29F92";
  const bg = "#FAFAF7";
  const surface = "#FFFFFF";
  const border = "#ECEAE2";

  const display = "'Bricolage Grotesque', sans-serif";
  const body = "'Inter', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  const statusDot = (s) => {
    const map = { live: "#16A34A", in_progress: "#D97706", archived: dim };
    return <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: map[s] || dim }} />;
  };

  // Varied masonry heights: 6 projects in a 3-col grid with different aspect ratios
  const tileAspects = ["3/4", "1/1", "4/5", "5/4", "1/1", "4/3"];

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 14.5, lineHeight: 1.55, minHeight: "100%" }}>

      {/* COMPACT HERO STRIP */}
      <header style={{ borderBottom: `1px solid ${border}`, background: surface }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "32px 32px 28px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 999, background: `linear-gradient(135deg, ${accent}, #FF9F4A)`, color: "white", fontFamily: display, fontWeight: 700, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h1 style={{ fontFamily: display, fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", margin: 0, color: ink, lineHeight: 1 }}>
                {user.name}<span style={{ color: accent }}>.</span>
              </h1>
              <div style={{ fontSize: 13, color: muted, marginTop: 3 }}>{user.headline}</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 10px", borderRadius: 999, background: "#E8F8EE", color: "#14532D", fontSize: 12, fontWeight: 500 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#16A34A" }} />
              {user.availability_text}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {user.social.map((s) => (
              <a key={s.type} href={s.url} style={{ padding: "8px 12px", fontSize: 12, fontWeight: 500, color: muted, border: `1px solid ${border}`, borderRadius: 999, textDecoration: "none", textTransform: "capitalize" }}>
                {s.type === "readcv" ? "Read.cv" : s.type}
              </a>
            ))}
            <a href={`mailto:${user.email}`} style={{ padding: "8px 16px", fontSize: 12, fontWeight: 500, color: surface, background: ink, borderRadius: 999, textDecoration: "none" }}>
              Email →
            </a>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "48px 32px 96px" }}>

        {/* WORK — masonry grid with filter chips */}
        <section style={{ marginBottom: 96 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 40, letterSpacing: "-0.03em", margin: 0, color: ink, lineHeight: 1 }}>Work</h2>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, color: surface, background: ink, borderRadius: 999 }}>All · {projects.length}</span>
              <span style={{ padding: "6px 12px", fontSize: 12, color: muted, border: `1px solid ${border}`, borderRadius: 999 }}>Live</span>
              <span style={{ padding: "6px 12px", fontSize: 12, color: muted, border: `1px solid ${border}`, borderRadius: 999 }}>In progress</span>
              <span style={{ padding: "6px 12px", fontSize: 12, color: muted, border: `1px solid ${border}`, borderRadius: 999 }}>Archived</span>
              <span style={{ padding: "6px 12px", fontSize: 12, color: muted, border: `1px solid ${border}`, borderRadius: 999 }}>Frontend</span>
              <span style={{ padding: "6px 12px", fontSize: 12, color: muted, border: `1px solid ${border}`, borderRadius: 999 }}>OSS</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {projects.map((p, i) => (
              <article key={p.id} style={{ background: surface, borderRadius: 10, overflow: "hidden", border: `1px solid ${border}`, cursor: "pointer", display: "flex", flexDirection: "column" }}>
                <div style={{ aspectRatio: tileAspects[i], background: p.cover_color, position: "relative" }}>
                  <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", background: "rgba(255,255,255,.92)", color: ink, fontSize: 10.5, fontFamily: mono, fontWeight: 500, borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {statusDot(p.status)}
                    {p.status === "in_progress" ? "WIP" : p.status}
                  </div>
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <h3 style={{ fontFamily: display, fontWeight: 600, fontSize: 17, letterSpacing: "-0.015em", margin: "0 0 4px", color: ink, lineHeight: 1.1 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: muted, lineHeight: 1.45, margin: 0 }}>{p.tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section style={{ marginBottom: 80, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 40, letterSpacing: "-0.03em", margin: 0, color: ink, lineHeight: 1 }}>About</h2>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: ink, margin: "0 0 16px", letterSpacing: "-0.005em", maxWidth: "56ch" }}>{user.bio_short}</p>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: muted, margin: 0, maxWidth: "60ch" }}>{user.bio_long}</p>
            <div style={{ display: "flex", gap: 16, fontSize: 12.5, color: muted, marginTop: 24, paddingTop: 20, borderTop: `1px solid ${border}` }}>
              <span><span style={{ color: dim }}>Loc</span> {user.location}</span>
              <span><span style={{ color: dim }}>Pronouns</span> {user.pronouns}</span>
              <span><span style={{ color: dim }}>URL</span> profolyo.me/{user.handle}</span>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section style={{ marginBottom: 80, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 40, letterSpacing: "-0.03em", margin: 0, color: ink, lineHeight: 1 }}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((e, i) => (
              <div key={e.company} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "16px 0", borderBottom: i < experience.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                <div>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 17, color: ink, letterSpacing: "-0.01em", marginBottom: 2 }}>
                    {e.company}
                  </div>
                  <div style={{ fontSize: 13, color: muted }}>{e.title} · {e.location}</div>
                </div>
                <div style={{ fontFamily: mono, fontSize: 11.5, color: dim, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{e.period}</div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section style={{ marginBottom: 80, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 40, letterSpacing: "-0.03em", margin: 0, color: ink, lineHeight: 1 }}>Education</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {education.map((ed, i) => (
              <div key={ed.institution} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "16px 0", borderBottom: i < education.length - 1 ? `1px solid ${border}` : "none", alignItems: "baseline" }}>
                <div>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.01em", marginBottom: 2 }}>{ed.degree}</div>
                  <div style={{ fontSize: 13, color: muted }}>{ed.institution} · {ed.location}</div>
                </div>
                <div style={{ fontFamily: mono, fontSize: 11.5, color: dim, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{ed.period}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section style={{ marginBottom: 80, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 40, letterSpacing: "-0.03em", margin: 0, color: ink, lineHeight: 1 }}>Skills</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {skills.map((s) => (
              <div key={s.category}>
                <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{s.category}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.items.map((it) => (
                    <span key={it} style={{ padding: "4px 11px", fontSize: 12, color: ink, background: surface, border: `1px solid ${border}`, borderRadius: 999 }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start", paddingTop: 32, borderTop: `1px solid ${border}` }}>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 40, letterSpacing: "-0.03em", margin: 0, color: ink, lineHeight: 1 }}>Contact</h2>
          <div>
            <a href={`mailto:${user.email}`} style={{ display: "inline-block", padding: "12px 20px", background: ink, color: surface, borderRadius: 999, fontSize: 14, fontWeight: 500, textDecoration: "none", marginBottom: 20 }}>
              {user.email} →
            </a>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {user.social.map((s) => (
                <a key={s.type} href={s.url} style={{ padding: "8px 14px", fontSize: 12.5, color: muted, border: `1px solid ${border}`, borderRadius: 999, textDecoration: "none" }}>
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

Object.assign(window, { IndexTemplate });
