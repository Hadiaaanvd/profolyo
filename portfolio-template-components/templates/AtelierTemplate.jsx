// Template 02 — Atelier (studio split, sticky bio on left)
const AtelierTemplate = ({ data, accent = "#0A6E48" }) => {
  const { user, projects, experience, education, skills } = data;
  const ink = "#1F1E1A";
  const muted = "#6F6D63";
  const bg = "#FAFAF7";
  const surface = "#FFFFFF";
  const border = "#ECEAE2";

  const statusPill = (s) => {
    const map = { live: ["#E8F8EE", "#14532D"], in_progress: ["#FEF3C7", "#7C2D12"], archived: ["#EFEEE6", "#54514A"] };
    const [bgC, fg] = map[s] || map.archived;
    const label = s === "live" ? "Live" : s === "in_progress" ? "In progress" : "Archived";
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 9px 3px 8px", fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500, borderRadius: 999, background: bgC, color: fg }}>
        <span style={{ width: 5, height: 5, borderRadius: 999, background: fg }} />
        {label}
      </span>
    );
  };

  const SectionHead = ({ num, title }) => (
    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 32, paddingBottom: 14, borderBottom: `1px solid ${border}` }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: muted, letterSpacing: "0.14em", textTransform: "uppercase" }}>{num}</span>
      <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 28, letterSpacing: "-0.02em", margin: 0, color: ink, lineHeight: 1.05 }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ background: bg, color: ink, fontFamily: "'Inter', sans-serif", fontSize: 14.5, lineHeight: 1.55, minHeight: "100%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px 96px", display: "grid", gridTemplateColumns: "320px 1fr", gap: 80, alignItems: "start" }}>

        {/* STICKY BIO COLUMN */}
        <aside style={{ position: "sticky", top: 48, alignSelf: "start" }}>
          <div style={{ width: 56, height: 56, borderRadius: 999, background: `linear-gradient(135deg, ${accent}, ${accent}88)`, color: "white", fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 36, lineHeight: 1.04, letterSpacing: "-0.025em", margin: "0 0 12px", color: ink }}>
            {user.name}
          </h1>
          <p style={{ fontSize: 15.5, color: ink, lineHeight: 1.5, margin: "0 0 18px", maxWidth: "32ch" }}>
            {user.headline}.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 11px 5px 10px", borderRadius: 999, background: `${accent}14`, color: accent, fontSize: 12, fontWeight: 500, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: accent }} />
            {user.availability_text}
          </div>
          <div style={{ fontSize: 13.5, color: muted, lineHeight: 1.6, marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${border}` }}>
            <div style={{ marginBottom: 4 }}>{user.location}</div>
            <div>{user.pronouns}</div>
          </div>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: muted, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Contact</div>
            <a href={`mailto:${user.email}`} style={{ color: ink, fontSize: 14, textDecoration: "underline", textUnderlineOffset: 3, textDecorationColor: border }}>{user.email}</a>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: muted, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Elsewhere</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {user.social.map((s) => (
                <a key={s.type} href={s.url} style={{ color: ink, fontSize: 13.5, textDecoration: "none", display: "inline-flex", justifyContent: "space-between", maxWidth: 240 }}>
                  <span style={{ color: muted, textTransform: "capitalize" }}>{s.type === "readcv" ? "Read.cv" : s.type}</span>
                  <span>{s.label} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT SCROLLING COLUMN */}
        <main>
          {/* WORK */}
          <section style={{ marginBottom: 96 }}>
            <SectionHead num="01" title="Selected work" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
              {projects.map((p) => (
                <article key={p.id} style={{ background: surface, borderRadius: 10, border: `1px solid ${border}`, overflow: "hidden" }}>
                  <div style={{ aspectRatio: "16/10", background: p.cover_color, position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, bottom: 14 }}>{statusPill(p.status)}</div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 19, letterSpacing: "-0.015em", margin: "0 0 4px", color: ink }}>{p.title}</h3>
                    <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.5, margin: "0 0 12px" }}>{p.tagline}.</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {p.tech_stack.slice(0, 4).map((t) => (
                        <span key={t} style={{ padding: "3px 8px", fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: muted, background: bg, borderRadius: 999 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ABOUT */}
          <section style={{ marginBottom: 96 }}>
            <SectionHead num="02" title="About" />
            <p style={{ fontSize: 17, lineHeight: 1.65, color: ink, margin: 0, maxWidth: "62ch" }}>{user.bio_long}</p>
          </section>

          {/* EXPERIENCE */}
          <section style={{ marginBottom: 96 }}>
            <SectionHead num="03" title="Experience" />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {experience.map((e) => (
                <div key={e.company} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24, paddingBottom: 20, borderBottom: `1px dashed ${border}` }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: muted, letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: 4 }}>{e.period}</div>
                  <div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 17, color: ink, letterSpacing: "-0.01em" }}>
                      {e.title} · <span style={{ color: accent }}>{e.company}</span>
                    </div>
                    <div style={{ fontSize: 13, color: muted, marginTop: 2, marginBottom: 8 }}>{e.location}</div>
                    {e.description && <p style={{ fontSize: 14, color: ink, lineHeight: 1.55, margin: "0 0 8px" }}>{e.description}</p>}
                    {e.highlights?.length > 0 && (
                      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                        {e.highlights.map((h, i) => (
                          <li key={i} style={{ fontSize: 13.5, color: muted, paddingLeft: 14, position: "relative", lineHeight: 1.55 }}>
                            <span style={{ position: "absolute", left: 0, top: 0 }}>·</span>{h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section style={{ marginBottom: 96 }}>
            <SectionHead num="04" title="Education" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {education.map((ed) => (
                <div key={ed.institution} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 24 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{ed.period}</div>
                  <div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 16, color: ink, letterSpacing: "-0.005em" }}>{ed.degree}</div>
                    <div style={{ fontSize: 13.5, color: muted, marginTop: 2 }}>{ed.institution} · {ed.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section style={{ marginBottom: 64 }}>
            <SectionHead num="05" title="Skills" />
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {skills.map((s) => (
                <div key={s.category}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{s.category}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {s.items.map((it) => (
                      <span key={it} style={{ padding: "5px 11px", fontSize: 12.5, color: ink, background: surface, border: `1px solid ${border}`, borderRadius: 999 }}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

Object.assign(window, { AtelierTemplate });
