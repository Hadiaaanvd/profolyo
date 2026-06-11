// Template 01 — Folio (editorial, single column, spacious)
const FolioTemplate = ({ data, accent = "#E76F51" }) => {
  const { user, projects, experience, education, skills } = data;
  const ink = "#1A1814";
  const muted = "#6B655A";
  const bg = "#FBF8F1";
  const border = "#E8E2D2";

  const Section = ({ eyebrow, title, children, gap = 28 }) => (
    <section style={{ paddingTop: 96, paddingBottom: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 28, paddingBottom: 18, borderBottom: `1px solid ${border}` }}>
        {eyebrow && (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: muted }}>
            {eyebrow}
          </span>
        )}
        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 36, lineHeight: 1.05, letterSpacing: "-0.025em", margin: 0, color: ink }}>
          {title}
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap }}>{children}</div>
    </section>
  );

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

  return (
    <div style={{ background: bg, color: ink, fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.6, minHeight: "100%" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "96px 32px 120px" }}>

        {/* HERO */}
        <header style={{ paddingBottom: 8 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 10px", borderRadius: 999, background: `${accent}14`, color: accent, fontSize: 12, fontWeight: 500, marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: accent }} />
            {user.availability_text}
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 0.96, letterSpacing: "-0.04em", margin: "0 0 24px", color: ink }}>
            {user.name}<span style={{ color: accent }}>.</span>
          </h1>
          <p style={{ fontSize: 22, lineHeight: 1.45, letterSpacing: "-0.01em", color: ink, margin: "0 0 28px", maxWidth: "32ch", fontWeight: 400 }}>
            {user.headline}.
          </p>
          <div style={{ display: "flex", gap: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            <span>{user.location}</span>
            <span>·</span>
            <span>{user.pronouns}</span>
            <span>·</span>
            <span style={{ color: ink }}>profolyo.me/{user.handle}</span>
          </div>
        </header>

        {/* ABOUT */}
        <Section eyebrow="01" title="About">
          <p style={{ fontSize: 19, lineHeight: 1.65, color: ink, margin: 0, maxWidth: "62ch", letterSpacing: "-0.005em" }}>
            {user.bio_long}
          </p>
        </Section>

        {/* WORK — horizontal rows */}
        <Section eyebrow="02" title="Selected work" gap={48}>
          {projects.map((p, i) => (
            <article key={p.id} style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 32, paddingTop: i === 0 ? 0 : 0 }}>
              <div style={{ aspectRatio: "4/3", borderRadius: 6, background: p.cover_color, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 14, top: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,.85)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 26, letterSpacing: "-0.02em", margin: 0, color: ink }}>
                    {p.title}
                  </h3>
                  {statusPill(p.status)}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: muted, margin: "0 0 16px", maxWidth: "48ch" }}>
                  {p.tagline}.
                </p>
                <div style={{ display: "flex", gap: 18, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>
                  <span>{p.role}</span>
                  <span>·</span>
                  <span>{p.period}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tech_stack.map((t) => (
                    <span key={t} style={{ padding: "3px 9px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: ink, border: `1px solid ${border}`, borderRadius: 999 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </Section>

        {/* EXPERIENCE */}
        <Section eyebrow="03" title="Experience" gap={32}>
          {experience.map((e) => (
            <div key={e.company} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 32, paddingBottom: 28, borderBottom: `1px solid ${border}` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", paddingTop: 4 }}>
                {e.period}
                {e.location && <div style={{ marginTop: 4 }}>{e.location}</div>}
              </div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 20, letterSpacing: "-0.015em", color: ink, marginBottom: 2 }}>
                  {e.title}, <span style={{ color: muted, fontWeight: 500 }}>{e.company}</span>
                </div>
                {e.description && (
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: ink, margin: "10px 0 0" }}>{e.description}</p>
                )}
                {e.highlights?.length > 0 && (
                  <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                    {e.highlights.map((h, i) => (
                      <li key={i} style={{ fontSize: 14, lineHeight: 1.55, color: muted, paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, top: 0, color: accent }}>—</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </Section>

        {/* EDUCATION */}
        <Section eyebrow="04" title="Education" gap={20}>
          {education.map((ed) => (
            <div key={ed.institution} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", paddingTop: 2 }}>
                {ed.period}
              </div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 18, color: ink, letterSpacing: "-0.01em" }}>{ed.degree}</div>
                <div style={{ fontSize: 14, color: muted, marginTop: 2 }}>{ed.institution} · {ed.location}</div>
              </div>
            </div>
          ))}
        </Section>

        {/* SKILLS */}
        <Section eyebrow="05" title="Skills" gap={18}>
          {skills.map((s) => (
            <div key={s.category} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 32, paddingBottom: 12, borderBottom: `1px dashed ${border}` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.category}</div>
              <div style={{ fontSize: 15, lineHeight: 1.65, color: ink }}>{s.items.join(" · ")}</div>
            </div>
          ))}
        </Section>

        {/* CONTACT */}
        <Section eyebrow="06" title="Get in touch" gap={28}>
          <p style={{ fontSize: 24, lineHeight: 1.4, color: ink, margin: 0, maxWidth: "38ch", letterSpacing: "-0.015em" }}>
            Have a project I'd be a fit for, or just want to say hello? <a href={`mailto:${user.email}`} style={{ color: accent, textDecoration: "underline", textDecorationThickness: 1.5, textUnderlineOffset: 4 }}>{user.email}</a>
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: muted, textTransform: "uppercase", letterSpacing: "0.1em", paddingTop: 24, borderTop: `1px solid ${border}` }}>
            {user.social.map((s) => (
              <a key={s.type} href={s.url} style={{ color: ink, textDecoration: "none" }}>
                {s.label} ↗
              </a>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
};

Object.assign(window, { FolioTemplate });
