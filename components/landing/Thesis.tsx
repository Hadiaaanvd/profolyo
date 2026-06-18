export default function Thesis() {
  return (
    <section id="why" className="py-16 px-4 sm:py-24 sm:px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Section head */}
        <div className="mb-16" style={{ maxWidth: 720 }}>
          <span
            className="font-mono font-medium text-ink-500 uppercase inline-block mb-4"
            style={{ fontSize: 11, letterSpacing: "0.16em" }}
          >
            01 — The thesis
          </span>
          <h2
            className="font-display font-bold text-ink-900 mb-4"
            style={{ fontSize: "clamp(40px, 4.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 16px" }}
          >
            Stop maintaining two copies
            <br />
            of the same career<span className="text-brand-500">.</span>
          </h2>
          <p className="text-ink-600" style={{ fontSize: 20, lineHeight: 1.55, margin: 0 }}>
            You update your résumé for one job. Your portfolio site says something different. Your LinkedIn says a third thing. Profolyo collapses all of it into one structured profile, and ships the formats you need from a single source of truth.
          </p>
        </div>

        {/* Dual output cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Portfolio card */}
            <div
              className="bg-ink-0 border border-ink-150 flex flex-col"
              style={{ borderRadius: 20, padding: 28, boxShadow: "var(--shadow-2)" }}
            >
              <div className="flex items-center gap-2.5 mb-[18px]">
                <span className="font-mono text-ink-500" style={{ fontSize: 11, letterSpacing: "0.12em" }}>
                  → OUTPUT 01
                </span>
                <span
                  className="font-medium text-brand-700"
                  style={{ padding: "3px 8px", fontSize: 11, borderRadius: 999, background: "var(--color-brand-50)" }}
                >
                  Public
                </span>
              </div>
              <h3
                className="font-display font-semibold text-ink-900"
                style={{ fontSize: 26, letterSpacing: "-0.02em", margin: "0 0 6px", lineHeight: 1.1 }}
              >
                A live portfolio.
              </h3>
              <p className="text-ink-500" style={{ fontSize: 14.5, lineHeight: 1.55, margin: "0 0 20px" }}>
                Your work, hosted at{" "}
                <span className="font-mono text-ink-700">profolyo.me/yourname</span>. SEO-ready, fast, accessible. Pick a template; the rest is yours.
              </p>
              {/* Portfolio preview mock */}
              <div
                className="flex-1 overflow-hidden"
                style={{
                  minHeight: 240,
                  borderRadius: 14,
                  background: "linear-gradient(180deg, #FBFAF6, #F3EFE5)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div
                  className="flex items-center justify-center text-white font-display font-bold shrink-0"
                  style={{ width: 44, height: 44, borderRadius: 999, background: "linear-gradient(135deg, #FFC9A8, #E76F51)", fontSize: 15 }}
                >
                  HN
                </div>
                <div>
                  <div
                    className="font-display font-bold text-ink-900"
                    style={{ fontSize: 22, letterSpacing: "-0.02em" }}
                  >
                    Hadia Naveed<span style={{ color: "#E76F51" }}>.</span>
                  </div>
                  <div className="text-ink-500" style={{ fontSize: 12 }}>Frontend lead · Berlin · Available Q3 2026</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  {[
                    "linear-gradient(135deg, #FFD4A8, #E76F51)",
                    "linear-gradient(160deg, #D7C9FF, #B8A0FF)",
                    "#0F1410",
                    "linear-gradient(150deg, #F4E8D0, #C4A57B)",
                  ].map((bg, i) => (
                    <div key={i} style={{ aspectRatio: "1", borderRadius: 6, background: bg }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Résumé card */}
            <div
              className="bg-ink-0 border border-ink-150 flex flex-col"
              style={{ borderRadius: 20, padding: 28, boxShadow: "var(--shadow-2)" }}
            >
              <div className="flex items-center gap-2.5 mb-[18px]">
                <span className="font-mono text-ink-500" style={{ fontSize: 11, letterSpacing: "0.12em" }}>
                  → OUTPUT 02
                </span>
                <span
                  className="font-medium text-ink-700"
                  style={{ padding: "3px 8px", fontSize: 11, borderRadius: 999, background: "var(--color-ink-100)" }}
                >
                  PDF
                </span>
              </div>
              <h3
                className="font-display font-semibold text-ink-900"
                style={{ fontSize: 26, letterSpacing: "-0.02em", margin: "0 0 6px", lineHeight: 1.1 }}
              >
                A print-ready résumé.
              </h3>
              <p className="text-ink-500" style={{ fontSize: 14.5, lineHeight: 1.55, margin: "0 0 20px" }}>
                One click, download the PDF. ATS-friendly. Typographically clean. Same data, professional format.
              </p>
              {/* Résumé preview mock */}
              <div
                className="flex-1"
                style={{
                  minHeight: 240,
                  borderRadius: 14,
                  background: "white",
                  padding: 24,
                  boxShadow: "inset 0 0 0 1px var(--color-ink-150)",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: 14, paddingBottom: 10, borderBottom: "2px double var(--color-ink-200)" }}>
                  <div className="font-display font-bold text-ink-900" style={{ fontSize: 18, letterSpacing: "-0.015em" }}>
                    Hadia Naveed
                  </div>
                  <div className="text-ink-500" style={{ fontSize: 9, letterSpacing: "0.06em" }}>
                    FRONTEND LEAD · BERLIN · HADIA@PROFOLYO.ME
                  </div>
                </div>
                {[
                  { label: "Experience", lines: ["90%", "60%", "80%", "40%"] },
                  { label: "Education",  lines: ["80%", "60%"] },
                  { label: "Skills",     lines: ["90%", "80%"] },
                ].map((section) => (
                  <div key={section.label} style={{ marginBottom: 12 }}>
                    <div
                      className="font-mono font-semibold"
                      style={{ fontSize: 8.5, color: "#1F4FB0", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 6, paddingBottom: 3, borderBottom: "1px solid #ECE5FF" }}
                    >
                      {section.label}
                    </div>
                    {section.lines.map((w, i) => (
                      <div key={i} style={{ height: 4, background: "var(--color-ink-100)", borderRadius: 2, marginBottom: 4, width: w }} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center sync icon */}
          <div
            className="hidden md:flex absolute items-center justify-center"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 48,
              height: 48,
              borderRadius: 999,
              background: "var(--color-ink-900)",
              color: "white",
              boxShadow: "0 8px 24px -6px rgba(0,0,0,.3)",
              zIndex: 2,
            }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 7h11M19 7l-4-4M19 7l-4 4" />
              <path d="M16 17H5M5 17l4-4M5 17l4 4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
