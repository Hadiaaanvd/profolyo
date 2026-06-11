// Template 04 — Showcase (bold designer, asymmetric, color-forward)
const ShowcaseTemplate = ({ data, accent = "#FF4B3E" }) => {
  const { user, projects, experience, education, skills } = data;
  const ink = "#0F0E0B";
  const muted = "#54514A";
  const bg = "#F4F1EB";
  const surface = "#FFFFFF";
  const border = "#D9D4C5";

  const display = "'Bricolage Grotesque', sans-serif";
  const body = "'Inter', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  const statusPill = (s) => {
    const map = { live: ["rgba(15,14,11,.9)", "#FFFFFF"], in_progress: ["#FEF3C7", "#7C2D12"], archived: ["rgba(15,14,11,.08)", muted] };
    const [bgC, fg] = map[s] || map.archived;
    const label = s === "live" ? "Live" : s === "in_progress" ? "WIP" : "Archived";
    return (
      <span style={{ display: "inline-flex", alignItems: "center", padding: "5px 12px", fontFamily: mono, fontSize: 10.5, fontWeight: 500, borderRadius: 999, background: bgC, color: fg, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </span>
    );
  };

  // Project tile sizes for varied grid — 6 projects laid out asymmetrically
  const tileSizes = [
    { col: "1 / 4", aspect: "5/4" },
    { col: "4 / 7", aspect: "1/1" },
    { col: "1 / 3", aspect: "1/1" },
    { col: "3 / 5", aspect: "1/1" },
    { col: "5 / 7", aspect: "5/6" },
    { col: "1 / 7", aspect: "21/9" },
  ];

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.5, minHeight: "100%" }}>

      {/* HERO — asymmetric mega */}
      <header style={{ padding: "64px 40px 80px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, alignItems: "end", marginBottom: 32 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px 6px 12px", borderRadius: 999, background: accent, color: "white", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", marginBottom: 32, textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "white" }} />
              {user.availability_text}
            </div>
            <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 168, lineHeight: 0.88, letterSpacing: "-0.05em", margin: 0, color: ink }}>
              {user.name.split(" ")[0]}<br />
              <span style={{ color: accent }}>{user.name.split(" ")[1]}.</span>
            </h1>
          </div>
          <div>
            <div style={{ width: 88, height: 88, borderRadius: 999, background: `linear-gradient(135deg, ${accent}, #FF9F4A)`, color: "white", fontFamily: display, fontWeight: 700, fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.45, color: ink, margin: 0, fontWeight: 500, letterSpacing: "-0.01em" }}>
              {user.headline}.
            </p>
            <div style={{ marginTop: 16, fontFamily: mono, fontSize: 11.5, color: muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {user.location} · profolyo.me/{user.handle}
            </div>
          </div>
        </div>

        {/* Accent block strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, height: 16, marginTop: 24 }}>
          <div style={{ background: accent }} />
          <div style={{ background: ink }} />
          <div style={{ background: "#FDB044" }} />
          <div style={{ background: "#FFD8B0" }} />
        </div>
      </header>

      {/* WORK — asymmetric tiles */}
      <section style={{ padding: "0 40px 120px", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 64, letterSpacing: "-0.04em", margin: 0, color: ink, lineHeight: 0.95 }}>Work.</h2>
          <span style={{ fontFamily: mono, fontSize: 12, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{projects.length} projects · 2019–now</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {projects.map((p, i) => (
            <article key={p.id} style={{ gridColumn: tileSizes[i].col, position: "relative", cursor: "pointer", borderRadius: 12, overflow: "hidden", background: surface }}>
              <div style={{ aspectRatio: tileSizes[i].aspect, background: p.cover_color, position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,.7)", letterSpacing: "0.12em" }}>{String(i + 1).padStart(2, "0")} /{String(projects.length).padStart(2, "0")}</span>
                  {statusPill(p.status)}
                </div>
                <div>
                  <h3 style={{ fontFamily: display, fontWeight: 700, fontSize: i === 5 ? 56 : 32, color: "#FFFFFF", letterSpacing: "-0.03em", margin: "0 0 6px", lineHeight: 0.95, textShadow: "0 2px 30px rgba(0,0,0,.18)" }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,.85)", margin: 0, maxWidth: "32ch", lineHeight: 1.4, fontWeight: 500 }}>
                    {p.tagline}.
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT — two column */}
      <section style={{ background: surface, padding: "120px 40px", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 96, letterSpacing: "-0.05em", margin: 0, color: ink, lineHeight: 0.9 }}>
            Hello<span style={{ color: accent }}>.</span>
          </h2>
          <div>
            <p style={{ fontSize: 22, lineHeight: 1.5, color: ink, margin: "0 0 24px", letterSpacing: "-0.01em", fontWeight: 500 }}>
              {user.bio_short}
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: muted, margin: 0, maxWidth: "60ch" }}>
              {user.bio_long}
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE — compact grid */}
      <section style={{ padding: "120px 40px", maxWidth: 1320, margin: "0 auto" }}>
        <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 64, letterSpacing: "-0.04em", margin: "0 0 48px", color: ink, lineHeight: 0.95 }}>Experience.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {experience.map((e) => (
            <div key={e.company} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "24px 28px" }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>{e.period} · {e.location}</div>
              <div style={{ fontFamily: display, fontWeight: 700, fontSize: 24, color: ink, letterSpacing: "-0.025em", marginBottom: 4 }}>{e.company}</div>
              <div style={{ fontSize: 14, color: accent, fontWeight: 500, marginBottom: 12 }}>{e.title}</div>
              <p style={{ fontSize: 14, color: muted, lineHeight: 1.55, margin: 0 }}>{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION + SKILLS row */}
      <section style={{ padding: "0 40px 120px", maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}>
        <div>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 48, letterSpacing: "-0.04em", margin: "0 0 32px", color: ink, lineHeight: 0.95 }}>Education.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {education.map((ed) => (
              <div key={ed.institution} style={{ paddingBottom: 18, borderBottom: `1px solid ${border}` }}>
                <div style={{ fontFamily: display, fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.01em", marginBottom: 4 }}>{ed.degree}</div>
                <div style={{ fontSize: 13, color: muted }}>{ed.institution}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{ed.period}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 48, letterSpacing: "-0.04em", margin: "0 0 32px", color: ink, lineHeight: 0.95 }}>Skills.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {skills.map((s) => (
              <div key={s.category}>
                <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>{s.category}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.items.map((it) => (
                    <span key={it} style={{ padding: "6px 14px", fontSize: 14, fontWeight: 500, color: ink, background: surface, border: `1px solid ${border}`, borderRadius: 999 }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT — full-bleed accent CTA */}
      <section style={{ background: accent, color: "white", padding: "120px 40px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 64, alignItems: "end" }}>
          <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 120, letterSpacing: "-0.05em", margin: 0, lineHeight: 0.85, color: "white" }}>
            Let's<br />work<br />together.
          </h2>
          <div>
            <a href={`mailto:${user.email}`} style={{ display: "inline-block", padding: "16px 28px", background: ink, color: bg, borderRadius: 999, fontFamily: body, fontWeight: 600, fontSize: 16, textDecoration: "none", marginBottom: 32 }}>
              {user.email} →
            </a>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: mono, fontSize: 13, color: "rgba(255,255,255,.85)" }}>
              {user.social.map((s) => (
                <a key={s.type} href={s.url} style={{ color: "white", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  ↗ {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

Object.assign(window, { ShowcaseTemplate });
