// Template 03 — Console (developer terminal, dark, mono)
const ConsoleTemplate = ({ data, accent = "#7BE38C" }) => {
  const { user, projects, experience, education, skills } = data;
  const bg = "#0B1020";
  const surface = "#11172B";
  const ink = "#E6E4DF";
  const muted = "#8A8F9E";
  const border = "#1F2640";
  const dim = "#5C6376";

  const mono = "'JetBrains Mono', monospace";
  const sans = "'Inter', sans-serif";

  const statusPill = (s) => {
    const map = { live: ["rgba(123,227,140,.12)", accent], in_progress: ["rgba(245,158,11,.14)", "#F59E0B"], archived: ["rgba(138,143,158,.14)", muted] };
    const [bgC, fg] = map[s] || map.archived;
    const label = s === "live" ? "● live" : s === "in_progress" ? "◐ wip" : "○ archived";
    return (
      <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", fontFamily: mono, fontSize: 10.5, fontWeight: 500, borderRadius: 3, background: bgC, color: fg, letterSpacing: "0.02em" }}>
        {label}
      </span>
    );
  };

  const SectionHead = ({ cmd, title }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: mono, fontSize: 12, color: dim, marginBottom: 6 }}>
        <span style={{ color: accent }}>$</span>&nbsp;
        <span style={{ color: muted }}>profolyo</span>{" "}
        <span style={{ color: ink }}>{cmd}</span>
      </div>
      <h2 style={{ fontFamily: mono, fontWeight: 600, fontSize: 24, letterSpacing: "-0.005em", margin: 0, color: ink }}>
        <span style={{ color: accent }}>## </span>{title}
      </h2>
    </div>
  );

  const Separator = () => (
    <div style={{ fontFamily: mono, fontSize: 11, color: dim, padding: "48px 0", textAlign: "center", letterSpacing: "0.4em" }}>
      ─ ─ ─ ─ ─ ─ ─
    </div>
  );

  return (
    <div style={{ background: bg, color: ink, fontFamily: sans, fontSize: 14.5, lineHeight: 1.6, minHeight: "100%" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "64px 32px 96px" }}>

        {/* HERO — terminal prompt */}
        <header style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: mono, fontSize: 12, color: dim, marginBottom: 16 }}>
            <span style={{ color: accent }}>~/profolyo.me/{user.handle}</span>{" "}
            <span style={{ color: muted }}>$</span>{" "}
            <span style={{ color: ink }}>whoami</span>
            <span style={{ display: "inline-block", width: 8, height: 14, background: accent, marginLeft: 4, verticalAlign: "middle", animation: "blink 1s steps(2) infinite" }} />
          </div>
          <h1 style={{ fontFamily: mono, fontWeight: 700, fontSize: 48, letterSpacing: "-0.02em", margin: "0 0 16px", color: ink, lineHeight: 1.05 }}>
            {user.name.toLowerCase().replace(" ", "_")}
            <span style={{ color: accent }}>.</span>
          </h1>
          <p style={{ fontFamily: sans, fontSize: 17, color: ink, lineHeight: 1.5, margin: "0 0 20px", maxWidth: "44ch" }}>
            <span style={{ color: muted }}>// </span>{user.headline}.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontFamily: mono, fontSize: 11.5, color: muted, alignItems: "center" }}>
            <span><span style={{ color: dim }}>loc</span> = <span style={{ color: ink }}>"{user.location}"</span></span>
            <span><span style={{ color: dim }}>status</span> = <span style={{ color: accent }}>"available"</span></span>
            <span><span style={{ color: dim }}>role</span> = <span style={{ color: ink }}>"Senior IC, Q3 2026"</span></span>
          </div>
        </header>

        <Separator />

        {/* ABOUT */}
        <section>
          <SectionHead cmd="cat about.md" title="About" />
          <p style={{ fontSize: 15.5, color: ink, lineHeight: 1.7, margin: 0, maxWidth: "62ch" }}>{user.bio_long}</p>
        </section>

        <Separator />

        {/* WORK — code-block cards */}
        <section>
          <SectionHead cmd="ls projects/" title="Selected work" />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {projects.map((p, i) => (
              <article key={p.id} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 4, overflow: "hidden", fontFamily: mono }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "rgba(255,255,255,.02)", borderBottom: `1px solid ${border}`, fontSize: 11.5 }}>
                  <span style={{ color: dim }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ color: muted }}>—</span>
                  <span style={{ color: accent }}>~/projects/{p.slug}</span>
                  <span style={{ marginLeft: "auto" }}>{statusPill(p.status)}</span>
                </div>
                <div style={{ padding: "20px 24px 22px" }}>
                  <h3 style={{ fontFamily: mono, fontWeight: 600, fontSize: 19, margin: "0 0 6px", color: ink }}>{p.title}</h3>
                  <p style={{ fontFamily: sans, fontSize: 14, color: muted, lineHeight: 1.55, margin: "0 0 16px" }}>{p.tagline}.</p>
                  <div style={{ display: "flex", gap: 16, fontSize: 11, color: dim, marginBottom: 14 }}>
                    <span><span style={{ color: muted }}>role:</span> <span style={{ color: ink }}>{p.role}</span></span>
                    <span><span style={{ color: muted }}>period:</span> <span style={{ color: ink }}>{p.period}</span></span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, fontSize: 11 }}>
                    {p.tech_stack.map((t) => (
                      <span key={t} style={{ padding: "2px 8px", color: accent, background: "rgba(123,227,140,.08)", border: `1px solid rgba(123,227,140,.18)`, borderRadius: 3 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Separator />

        {/* EXPERIENCE */}
        <section>
          <SectionHead cmd="git log --experience" title="Experience" />
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {experience.map((e, i) => (
              <div key={e.company} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 16, position: "relative" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 999, background: i === 0 ? accent : surface, border: `2px solid ${i === 0 ? accent : border}`, marginTop: 6 }} />
                  {i < experience.length - 1 && <div style={{ position: "absolute", left: 4, top: 18, bottom: -28, width: 2, background: border }} />}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <span style={{ fontFamily: mono, fontSize: 13, color: ink, fontWeight: 600 }}>{e.title}</span>
                    <span style={{ fontFamily: mono, fontSize: 12, color: accent }}>@ {e.company}</span>
                    <span style={{ fontFamily: mono, fontSize: 11, color: dim, marginLeft: "auto" }}>{e.period}</span>
                  </div>
                  {e.description && <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.55, margin: "0 0 6px" }}>{e.description}</p>}
                  {e.highlights?.length > 0 && (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {e.highlights.map((h, j) => (
                        <li key={j} style={{ fontFamily: mono, fontSize: 11.5, color: muted, paddingLeft: 14, position: "relative", lineHeight: 1.6 }}>
                          <span style={{ position: "absolute", left: 0, color: accent }}>+</span>{h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* EDUCATION */}
        <section>
          <SectionHead cmd="cat education.json" title="Education" />
          <div style={{ fontFamily: mono, fontSize: 12.5, color: ink, background: surface, border: `1px solid ${border}`, borderRadius: 4, padding: "16px 20px", lineHeight: 1.7 }}>
            <div style={{ color: dim }}>{`[`}</div>
            {education.map((ed, i) => (
              <div key={ed.institution} style={{ paddingLeft: 16 }}>
                <span style={{ color: dim }}>{`{ `}</span>
                <span style={{ color: muted }}>degree:</span> <span style={{ color: accent }}>"{ed.degree}"</span>,{" "}
                <span style={{ color: muted }}>school:</span> <span style={{ color: ink }}>"{ed.institution}"</span>,{" "}
                <span style={{ color: muted }}>years:</span> <span style={{ color: ink }}>"{ed.period}"</span>
                <span style={{ color: dim }}>{` }`}</span>{i < education.length - 1 ? "," : ""}
              </div>
            ))}
            <div style={{ color: dim }}>{`]`}</div>
          </div>
        </section>

        <Separator />

        {/* SKILLS */}
        <section>
          <SectionHead cmd="cat skills.json" title="Skills" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {skills.map((s) => (
              <div key={s.category}>
                <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  <span style={{ color: accent }}>›</span> {s.category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {s.items.map((it) => (
                    <span key={it} style={{ padding: "3px 9px", fontFamily: mono, fontSize: 11, color: ink, background: surface, border: `1px solid ${border}`, borderRadius: 3 }}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* CONTACT */}
        <section style={{ paddingBottom: 32 }}>
          <SectionHead cmd="contact --available" title="Get in touch" />
          <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 4, padding: "20px 24px", fontFamily: mono, fontSize: 13, lineHeight: 1.8 }}>
            <div><span style={{ color: dim }}># Email</span></div>
            <div><span style={{ color: accent }}>$</span> mail <a href={`mailto:${user.email}`} style={{ color: ink }}>{user.email}</a></div>
            <div style={{ marginTop: 16 }}><span style={{ color: dim }}># Elsewhere</span></div>
            {user.social.map((s) => (
              <div key={s.type}>
                <span style={{ color: accent }}>$</span> open <span style={{ color: muted }}>--{s.type}</span> <a href={s.url} style={{ color: ink, textDecoration: "none" }}>{s.label}</a>
              </div>
            ))}
          </div>
        </section>

      </div>
      <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
    </div>
  );
};

Object.assign(window, { ConsoleTemplate });
