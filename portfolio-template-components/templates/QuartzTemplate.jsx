// Template 09 — Quartz (sleek modern minimalism, premium feel)
const QuartzTemplate = ({ data, accent = "#2F5D3A" }) => {
  const { user, projects, experience, education, skills } = data;
  const bg = "#FAF8F2";
  const surface = "#FFFFFF";
  const ink = "#1B1F1A";
  const muted = "#6B7066";
  const dim = "#A5A89E";
  const border = "#E5E3D8";

  const display = "'Bricolage Grotesque', sans-serif";
  const body = "'Inter', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  const featured = projects[0];
  const rest = projects.slice(1);

  const statusPill = (s, opts = {}) => {
    const onDark = opts.onDark;
    const dot = s === "live" ? "#16A34A" : s === "in_progress" ? "#D97706" : "#9CA3AF";
    const label = s === "live" ? "Live" : s === "in_progress" ? "In progress" : "Archived";
    return (
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "4px 10px 4px 9px",
        fontFamily: body, fontSize: 11.5, fontWeight: 500,
        borderRadius: 999,
        background: onDark ? "rgba(255,255,255,.92)" : surface,
        color: ink,
        border: `1px solid ${onDark ? "transparent" : border}`,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: dot }} />
        {label}
      </span>
    );
  };

  const Eyebrow = ({ children }) => (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: mono, fontSize: 11, fontWeight: 500,
      letterSpacing: "0.18em", textTransform: "uppercase", color: muted,
    }}>
      <span style={{ width: 14, height: 1, background: accent }} />
      {children}
    </span>
  );

  const SectionHead = ({ eyebrow, title, rightSlot }) => (
    <div style={{ marginBottom: 40, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
      <div>
        <div style={{ marginBottom: 16 }}><Eyebrow>{eyebrow}</Eyebrow></div>
        <h2 style={{
          fontFamily: display, fontWeight: 600,
          fontSize: 40, letterSpacing: "-0.03em", lineHeight: 1.05,
          margin: 0, color: ink,
        }}>{title}</h2>
      </div>
      {rightSlot && <div style={{ fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{rightSlot}</div>}
    </div>
  );

  return (
    <div style={{ background: bg, color: ink, fontFamily: body, fontSize: 15, lineHeight: 1.6, minHeight: "100%" }}>

      {/* HERO */}
      <header style={{ position: "relative", overflow: "hidden" }}>
        {/* Subtle decorative gradient */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(900px 400px at 50% -50%, ${accent}12, transparent 70%)`,
        }} />
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 48px 64px", position: "relative", textAlign: "center" }}>
          {/* Top meta line */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 36, flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "5px 12px 5px 10px",
              borderRadius: 999, background: surface, border: `1px solid ${border}`,
              fontSize: 12, fontWeight: 500, color: ink,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#16A34A" }} />
              {user.availability_text}
            </span>
          </div>

          <h1 style={{
            fontFamily: display, fontWeight: 600,
            fontSize: 96, letterSpacing: "-0.04em", lineHeight: 0.96,
            margin: "0 0 28px", color: ink,
          }}>
            {user.name}<span style={{ color: accent }}>.</span>
          </h1>

          <p style={{
            fontSize: 22, color: muted, fontWeight: 400,
            lineHeight: 1.45, letterSpacing: "-0.01em",
            margin: "0 auto 40px", maxWidth: "44ch",
          }}>
            {user.headline}.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
            <a href="#work" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 20px", background: ink, color: bg,
              fontSize: 14.5, fontWeight: 500, borderRadius: 8, textDecoration: "none",
            }}>View selected work →</a>
            <a href={`mailto:${user.email}`} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 20px", background: surface, color: ink,
              fontSize: 14.5, fontWeight: 500, borderRadius: 8, textDecoration: "none",
              border: `1px solid ${border}`,
            }}>Get in touch</a>
          </div>

          {/* Meta strip */}
          <div style={{
            display: "inline-flex", gap: 28, flexWrap: "wrap", justifyContent: "center",
            fontFamily: mono, fontSize: 11, color: muted,
            letterSpacing: "0.16em", textTransform: "uppercase",
            paddingTop: 28, borderTop: `1px solid ${border}`,
          }}>
            <span>{user.location}</span>
            <span style={{ color: dim }}>·</span>
            <span>{user.pronouns}</span>
            <span style={{ color: dim }}>·</span>
            <span style={{ color: ink }}>profolyo.me/{user.handle}</span>
          </div>
        </div>
      </header>

      {/* FEATURED WORK + REST */}
      <section id="work" style={{ padding: "96px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <SectionHead eyebrow="Selected work" title="Things I've made." rightSlot={`${projects.length} projects · 2019—2026`} />

        {/* Featured project — big */}
        <article style={{
          background: surface, border: `1px solid ${border}`, borderRadius: 16,
          overflow: "hidden", marginBottom: 24,
        }}>
          <div style={{ aspectRatio: "21/9", background: featured.cover_color, position: "relative" }}>
            <div style={{ position: "absolute", top: 16, left: 16 }}>{statusPill(featured.status, { onDark: true })}</div>
            <div style={{ position: "absolute", top: 16, right: 16, fontFamily: mono, fontSize: 10.5, color: "rgba(255,255,255,.85)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Featured
            </div>
          </div>
          <div style={{ padding: "28px 32px 32px", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "end" }}>
            <div>
              <h3 style={{
                fontFamily: display, fontWeight: 600, fontSize: 32,
                letterSpacing: "-0.025em", lineHeight: 1.05,
                margin: "0 0 8px", color: ink,
              }}>{featured.title}</h3>
              <p style={{ fontSize: 16.5, color: muted, lineHeight: 1.5, margin: "0 0 16px", maxWidth: "60ch" }}>{featured.tagline}.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {featured.tech_stack.map((t) => (
                  <span key={t} style={{
                    padding: "4px 10px", fontFamily: mono, fontSize: 11, color: muted,
                    background: bg, border: `1px solid ${border}`, borderRadius: 999,
                  }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
              <div style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>Role · Period</div>
              <div style={{ fontSize: 13, color: ink, fontWeight: 500 }}>{featured.role}</div>
              <div style={{ fontSize: 12.5, color: muted, marginTop: 2 }}>{featured.period}</div>
            </div>
          </div>
        </article>

        {/* Rest of work in 3 col */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {rest.map((p) => (
            <article key={p.id} style={{
              background: surface, border: `1px solid ${border}`, borderRadius: 12,
              overflow: "hidden", display: "flex", flexDirection: "column",
            }}>
              <div style={{ aspectRatio: "16/10", background: p.cover_color, position: "relative" }}>
                <div style={{ position: "absolute", top: 12, left: 12 }}>{statusPill(p.status, { onDark: true })}</div>
              </div>
              <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{
                  fontFamily: display, fontWeight: 600, fontSize: 19,
                  letterSpacing: "-0.015em", lineHeight: 1.15,
                  margin: "0 0 6px", color: ink,
                }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.5, margin: "0 0 14px", flex: 1 }}>{p.tagline}.</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${border}` }}>
                  <span style={{ fontFamily: mono, fontSize: 10.5, color: dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.period}</span>
                  <span style={{ fontFamily: mono, fontSize: 10.5, color: accent, letterSpacing: "0.08em" }}>View →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ background: surface, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 48px", display: "grid", gridTemplateColumns: "300px 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <Eyebrow>About</Eyebrow>
            <h2 style={{
              fontFamily: display, fontWeight: 600, fontSize: 40,
              letterSpacing: "-0.03em", lineHeight: 1.05,
              margin: "16px 0 0", color: ink,
            }}>A short<br />introduction.</h2>
          </div>
          <div>
            <p style={{ fontSize: 19, color: ink, lineHeight: 1.6, margin: "0 0 20px", letterSpacing: "-0.005em" }}>{user.bio_short}</p>
            <p style={{ fontSize: 15.5, color: muted, lineHeight: 1.7, margin: 0, maxWidth: "60ch" }}>{user.bio_long}</p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 48px" }}>
        <SectionHead eyebrow="Experience" title="Where I've worked." />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {experience.map((e, i) => (
            <div key={e.company} style={{
              display: "grid", gridTemplateColumns: "160px 1fr auto", gap: 32,
              padding: "24px 0", borderTop: i === 0 ? `1px solid ${border}` : "none",
              borderBottom: `1px solid ${border}`, alignItems: "start",
            }}>
              <div style={{ fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: 4 }}>
                {e.period}
              </div>
              <div>
                <div style={{ fontFamily: display, fontWeight: 600, fontSize: 19, letterSpacing: "-0.015em", color: ink, marginBottom: 2 }}>
                  {e.title} <span style={{ color: muted, fontWeight: 500 }}>· {e.company}</span>
                </div>
                <div style={{ fontSize: 13, color: muted, marginBottom: e.description ? 10 : 0 }}>{e.location}</div>
                {e.description && (
                  <p style={{ fontSize: 14.5, color: ink, lineHeight: 1.6, margin: "0 0 10px", maxWidth: "60ch" }}>{e.description}</p>
                )}
                {e.highlights?.length > 0 && (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                    {e.highlights.map((h, j) => (
                      <li key={j} style={{ fontSize: 13.5, color: muted, paddingLeft: 16, position: "relative", lineHeight: 1.5 }}>
                        <span style={{ position: "absolute", left: 0, top: 0, color: accent }}>—</span>{h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap", paddingTop: 5 }}>
                № {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION + SKILLS */}
      <section style={{ background: surface, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 48px", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "start" }}>
          <div>
            <div style={{ marginBottom: 24 }}><Eyebrow>Education</Eyebrow></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {education.map((ed) => (
                <div key={ed.institution} style={{ paddingBottom: 20, borderBottom: `1px dashed ${border}` }}>
                  <div style={{ fontFamily: display, fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", color: ink, marginBottom: 2 }}>{ed.degree}</div>
                  <div style={{ fontSize: 13.5, color: muted, marginBottom: 4 }}>{ed.institution} · {ed.location}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>{ed.period}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ marginBottom: 24 }}><Eyebrow>Skills</Eyebrow></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {skills.map((s) => (
                <div key={s.category} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 24, paddingBottom: 16, borderBottom: `1px dashed ${border}`, alignItems: "baseline" }}>
                  <div style={{ fontFamily: mono, fontSize: 11, color: dim, letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.category}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {s.items.map((it) => (
                      <span key={it} style={{
                        padding: "4px 10px", fontSize: 12.5, color: ink,
                        background: bg, border: `1px solid ${border}`, borderRadius: 999,
                      }}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ padding: "120px 48px", maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: 24, display: "inline-block" }}><Eyebrow>Contact</Eyebrow></div>
        <h2 style={{
          fontFamily: display, fontWeight: 600, fontSize: 56,
          letterSpacing: "-0.035em", lineHeight: 1.05,
          margin: "0 0 32px", color: ink,
        }}>
          Open to good work<span style={{ color: accent }}>.</span>
        </h2>
        <p style={{ fontSize: 18, color: muted, maxWidth: "44ch", margin: "0 auto 32px", lineHeight: 1.55 }}>
          Senior IC roles, design-systems projects, or just a chat about typography. Either works.
        </p>
        <a href={`mailto:${user.email}`} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "14px 24px", background: ink, color: bg,
          fontSize: 15, fontWeight: 500, borderRadius: 8, textDecoration: "none",
          marginBottom: 32,
        }}>{user.email} →</a>
        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", fontFamily: mono, fontSize: 11.5, color: muted, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          {user.social.map((s) => (
            <a key={s.type} href={s.url} style={{ color: muted, textDecoration: "none" }}>{s.label}</a>
          ))}
        </div>
      </section>

    </div>
  );
};

Object.assign(window, { QuartzTemplate });
