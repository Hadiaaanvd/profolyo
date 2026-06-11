// Template 08 — Story (long-form scroll, each project a hero)
const StoryTemplate = ({ data, accent = "#1A30B8" }) => {
  const { user, projects, experience, education, skills } = data;
  const ink = "#0A0A09", muted = "#54514A", dim = "#A29F92";
  const bg = "#FAFAF7", surface = "#FFFFFF", border = "#ECEAE2";

  const display = "'Bricolage Grotesque', sans-serif";
  const body = "'Inter', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  const statusPill = (s) => {
    const label = s === "live" ? "Live" : s === "in_progress" ? "In progress" : "Archived";
    const fg = s === "live" ? "#14532D" : s === "in_progress" ? "#7C2D12" : muted;
    const bgC = s === "live" ? "#E8F8EE" : s === "in_progress" ? "#FEF3C7" : "#EFEEE6";
    return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", fontFamily: body, fontSize: 11, fontWeight: 500, borderRadius: 999, background: bgC, color: fg }}><span style={{ width: 5, height: 5, borderRadius: 999, background: fg }} />{label}</span>;
  };

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.6, minHeight: "100%" }}>

      {/* HERO — fullscreen intro */}
      <section style={{ minHeight: 600, padding: "120px 48px 80px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ fontFamily: mono, fontSize: 12, color: accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 32 }}>
          ── A Portfolio
        </div>
        <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 128, lineHeight: 0.92, letterSpacing: "-0.04em", margin: "0 0 32px", color: ink }}>
          {user.name.split(" ")[0]}<br />
          <span style={{ color: accent }}>{user.name.split(" ")[1]}.</span>
        </h1>
        <p style={{ fontSize: 24, lineHeight: 1.45, color: ink, margin: "0 0 32px", maxWidth: "40ch", letterSpacing: "-0.015em", fontWeight: 400 }}>
          {user.headline}.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 11px 5px 10px", borderRadius: 999, background: `${accent}10`, color: accent, fontSize: 12, fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: accent }} />
            {user.availability_text}
          </span>
          <span style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Scroll for the work ↓
          </span>
        </div>
      </section>

      {/* ABOUT — centered prose */}
      <section style={{ padding: "120px 48px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>Chapter 01</div>
        <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 48, letterSpacing: "-0.035em", margin: "0 0 40px", lineHeight: 1.05 }}>About</h2>
        <p style={{ fontSize: 22, lineHeight: 1.5, color: ink, margin: 0, letterSpacing: "-0.01em" }}>{user.bio_long}</p>
      </section>

      {/* WORK — each project a story section */}
      {projects.map((p, i) => (
        <section key={p.id} style={{ padding: "120px 48px", maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ borderTop: `1px solid ${border}`, paddingTop: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {i === 0 ? "Chapter 02 · Work" : `№ ${String(i + 1).padStart(2, "0")}`}
              </span>
              {statusPill(p.status)}
              <span style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.period}</span>
            </div>
            <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 96, letterSpacing: "-0.045em", margin: "0 0 24px", color: ink, lineHeight: 0.9 }}>
              {p.title}<span style={{ color: accent }}>.</span>
            </h2>
            <p style={{ fontSize: 24, lineHeight: 1.4, color: muted, margin: "0 0 40px", maxWidth: "44ch", letterSpacing: "-0.015em", fontWeight: 400 }}>
              {p.tagline}.
            </p>
            <div style={{ aspectRatio: "16/9", background: p.cover_color, marginBottom: 32 }} />
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 48, alignItems: "start" }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Role</div>
                <div style={{ fontSize: 14, color: ink, fontWeight: 500, marginBottom: 24 }}>{p.role}</div>
                <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Stack</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {p.tech_stack.map((t) => (
                    <span key={t} style={{ padding: "2px 8px", fontFamily: mono, fontSize: 11, color: muted, border: `1px solid ${border}`, borderRadius: 4 }}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: ink, margin: 0, maxWidth: "60ch" }}>
                  {p.title} was {p.tagline.toLowerCase()}. {p.status === "live" ? "Still shipping." : p.status === "in_progress" ? "Work in progress, building in public." : "Archived but still proud of it."}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* EXPERIENCE */}
      <section style={{ padding: "120px 48px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ borderTop: `1px solid ${border}`, paddingTop: 64 }}>
          <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>Chapter 03</div>
          <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 48, letterSpacing: "-0.035em", margin: "0 0 48px", lineHeight: 1.05, textAlign: "center" }}>The path here</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {experience.map((e, i) => (
              <div key={e.company} style={{ paddingBottom: 20, borderBottom: i < experience.length - 1 ? `1px solid ${border}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
                  <div style={{ fontFamily: display, fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em" }}>{e.title} · <span style={{ color: accent }}>{e.company}</span></div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{e.period}</div>
                </div>
                <div style={{ fontSize: 14, color: muted }}>{e.location}{e.description ? ` · ${e.description}` : ""}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDU + SKILLS combined */}
      <section style={{ padding: "0 48px 120px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, paddingTop: 32, borderTop: `1px solid ${border}` }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Education</div>
            {education.map((ed) => (
              <div key={ed.institution} style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: display, fontWeight: 600, fontSize: 15, color: ink }}>{ed.degree}</div>
                <div style={{ fontSize: 13, color: muted }}>{ed.institution} · {ed.period}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {skills.flatMap(s => s.items).map((it) => (
                <span key={it} style={{ padding: "3px 9px", fontFamily: mono, fontSize: 11, color: muted, background: surface, border: `1px solid ${border}`, borderRadius: 999 }}>{it}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT — centered CTA */}
      <section style={{ padding: "160px 48px", textAlign: "center", background: surface, borderTop: `1px solid ${border}` }}>
        <div style={{ fontFamily: mono, fontSize: 11, color: accent, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>The End — or the beginning</div>
        <h2 style={{ fontFamily: display, fontWeight: 800, fontSize: 88, letterSpacing: "-0.04em", margin: "0 0 32px", lineHeight: 0.95 }}>
          Let's build something<span style={{ color: accent }}>.</span>
        </h2>
        <a href={`mailto:${user.email}`} style={{ display: "inline-block", padding: "16px 28px", background: ink, color: bg, borderRadius: 6, fontFamily: body, fontWeight: 600, fontSize: 16, textDecoration: "none", marginBottom: 24 }}>
          {user.email} →
        </a>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, fontFamily: mono, fontSize: 12, color: muted, letterSpacing: "0.08em" }}>
          {user.social.map((s) => (
            <a key={s.type} href={s.url} style={{ color: muted, textDecoration: "none" }}>{s.label}</a>
          ))}
        </div>
      </section>

    </div>
  );
};

Object.assign(window, { StoryTemplate });
