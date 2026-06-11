// Template 07 — Linear (résumé-first, compact, skim-optimized)
const LinearTemplate = ({ data, accent = "#2A6FDB" }) => {
  const { user, projects, experience, education, skills } = data;
  const ink = "#1F1E1A", muted = "#6F6D63", dim = "#A29F92";
  const bg = "#FFFFFF", surface = "#FAFAF7", border = "#ECEAE2";
  const sans = "'Inter', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  const statusDot = (s) => {
    const c = s === "live" ? "#16A34A" : s === "in_progress" ? "#D97706" : dim;
    return <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: c, marginRight: 6, verticalAlign: "middle" }} />;
  };

  const H2 = ({ children, count }) => (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "0 0 12px", paddingBottom: 6, borderBottom: `1px solid ${ink}` }}>
      <h2 style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, letterSpacing: "0.16em", textTransform: "uppercase", color: ink, margin: 0 }}>{children}</h2>
      {count != null && <span style={{ fontFamily: mono, fontSize: 11, color: dim }}>{count}</span>}
    </div>
  );

  return (
    <div style={{ background: bg, color: ink, fontFamily: sans, fontSize: 14, lineHeight: 1.55, minHeight: "100%" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "64px 32px 80px" }}>

        {/* HEADER */}
        <header style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 12 }}>
            <h1 style={{ fontFamily: sans, fontWeight: 700, fontSize: 32, letterSpacing: "-0.025em", margin: 0, color: ink, lineHeight: 1.05 }}>
              {user.name}<span style={{ color: accent }}>.</span>
            </h1>
            <div style={{ fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.06em" }}>
              {user.location} · {user.pronouns}
            </div>
          </div>
          <div style={{ fontSize: 15, color: ink, marginBottom: 14 }}>{user.headline}.</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontFamily: mono, fontSize: 11.5, color: muted, alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#14532D" }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#16A34A" }} />
              {user.availability_text}
            </span>
            <span>·</span>
            <a href={`mailto:${user.email}`} style={{ color: accent, textDecoration: "none" }}>{user.email}</a>
            <span>·</span>
            <span>profolyo.me/{user.handle}</span>
          </div>
        </header>

        {/* ABOUT — single line */}
        <section style={{ marginBottom: 36 }}>
          <H2>About</H2>
          <p style={{ fontSize: 14, color: muted, lineHeight: 1.65, margin: 0, maxWidth: "68ch" }}>{user.bio_long}</p>
        </section>

        {/* WORK — table rows */}
        <section style={{ marginBottom: 36 }}>
          <H2 count={`${projects.length} projects`}>Work</H2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {projects.map((p, i) => (
              <article key={p.id} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 16, padding: "10px 0", borderBottom: i < projects.length - 1 ? `1px dashed ${border}` : "none", alignItems: "baseline" }}>
                <div style={{ width: 32, height: 32, background: p.cover_color, borderRadius: 4, alignSelf: "center" }} />
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: ink }}>{p.title}</span>
                    <span style={{ fontSize: 12.5, color: muted }}>— {p.tagline}</span>
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.05em", marginTop: 3 }}>
                    {statusDot(p.status)}{p.tech_stack.join(" · ")}
                  </div>
                </div>
                <div style={{ fontFamily: mono, fontSize: 11, color: muted, whiteSpace: "nowrap", alignSelf: "center" }}>{p.period}</div>
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE — table rows with collapsible highlights */}
        <section style={{ marginBottom: 36 }}>
          <H2 count={`${experience.length} positions`}>Experience</H2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {experience.map((e, i) => (
              <div key={e.company} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "12px 0", borderBottom: i < experience.length - 1 ? `1px dashed ${border}` : "none" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 14, color: ink }}>{e.title}</span>
                    <span style={{ fontSize: 13, color: accent }}>· {e.company}</span>
                  </div>
                  {e.description && <p style={{ fontSize: 12.5, color: muted, margin: "2px 0 4px", lineHeight: 1.5 }}>{e.description}</p>}
                  {e.highlights?.length > 0 && (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 2 }}>
                      {e.highlights.map((h, j) => (
                        <li key={j} style={{ fontSize: 12.5, color: muted, paddingLeft: 14, position: "relative", lineHeight: 1.5 }}>
                          <span style={{ position: "absolute", left: 0, color: dim }}>›</span>{h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div style={{ fontFamily: mono, fontSize: 11, color: muted, whiteSpace: "nowrap", textAlign: "right" }}>
                  {e.period}<br /><span style={{ color: dim }}>{e.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section style={{ marginBottom: 36 }}>
          <H2>Education</H2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {education.map((ed, i) => (
              <div key={ed.institution} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "10px 0", borderBottom: i < education.length - 1 ? `1px dashed ${border}` : "none", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14, color: ink }}>{ed.degree}</span>
                  <span style={{ fontSize: 13, color: muted }}> · {ed.institution}</span>
                </div>
                <div style={{ fontFamily: mono, fontSize: 11, color: muted, whiteSpace: "nowrap" }}>{ed.period}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS — inline tags */}
        <section style={{ marginBottom: 36 }}>
          <H2>Skills</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {skills.map((s) => (
              <div key={s.category} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, alignItems: "baseline" }}>
                <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.category}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {s.items.map((it) => (
                    <span key={it} style={{ padding: "2px 8px", fontFamily: mono, fontSize: 11, color: ink, background: surface, border: `1px solid ${border}`, borderRadius: 4 }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT — footer line */}
        <footer style={{ borderTop: `1px solid ${ink}`, paddingTop: 16, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
          <div style={{ fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.06em" }}>
            <a href={`mailto:${user.email}`} style={{ color: accent, textDecoration: "none" }}>{user.email}</a>
          </div>
          <div style={{ display: "flex", gap: 16, fontFamily: mono, fontSize: 11.5, color: muted }}>
            {user.social.map((s) => (
              <a key={s.type} href={s.url} style={{ color: muted, textDecoration: "none" }}>{s.label}</a>
            ))}
          </div>
        </footer>

      </div>
    </div>
  );
};

Object.assign(window, { LinearTemplate });
