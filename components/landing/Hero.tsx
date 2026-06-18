export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ padding: "clamp(32px, 6vw, 64px) 0 clamp(48px, 8vw, 96px)" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{ width: 520, height: 520, background: "var(--color-brand-200)", top: -120, right: -100, filter: "blur(80px)", opacity: 0.55 }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 380, height: 380, background: "var(--color-brand-200)", top: 180, right: 280, filter: "blur(80px)", opacity: 0.45 }}
        />
        <div
          className="absolute rounded-full"
          style={{ width: 320, height: 320, background: "#FFC9A8", top: 80, left: -80, filter: "blur(80px)", opacity: 0.35 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Beta pill */}
        <span
          className="inline-flex items-center gap-[7px] rounded-full text-green-700 font-medium mb-0"
          style={{
            padding: "5px 12px 5px 10px",
            fontSize: 12,
            background: "var(--color-green-50)",
          }}
        >
          <span
            className="rounded-full bg-green-500 shrink-0"
            style={{ width: 6, height: 6 }}
            aria-hidden="true"
          />
          In beta · 2026
        </span>

        <div
          className="mt-4 max-w-[48ch] rounded-3xl border border-ink-150 bg-ink-0 px-4 py-3 text-sm text-ink-600"
          style={{ boxShadow: "var(--shadow-1)" }}
        >
          Work in progress — some features are still being polished. Thanks for checking it out.
        </div>

        {/* H1 */}
        <h1
          className="font-display font-bold text-ink-900"
          style={{
            fontSize: "clamp(56px, 9vw, 112px)",
            letterSpacing: "-0.045em",
            lineHeight: 0.94,
            margin: "24px 0 28px",
            maxWidth: "16ch",
          }}
        >
          One profile<span className="text-brand-500">.</span>
          <br />
          Two outputs<span className="text-brand-500">.</span>
        </h1>

        {/* Lead */}
        <p
          className="text-ink-600"
          style={{ fontSize: 22, lineHeight: 1.55, letterSpacing: "-0.005em", maxWidth: "56ch", margin: 0 }}
        >
          Profolyo is the unified tool for your professional presence. Edit your profile once. Ship a live portfolio at{" "}
          <span className="font-mono text-ink-900 font-medium">profolyo.me/yourname</span> and a print-ready résumé PDF — together, always in sync.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3" style={{ marginTop: 36 }}>
          <a
            href="/editor"
            className="inline-flex items-center gap-2 bg-brand-500 text-white hover:bg-brand-600 hover:no-underline transition-colors"
            style={{ fontSize: 15, fontWeight: 500, padding: "16px 24px", borderRadius: 14, textDecoration: "none", boxShadow: "var(--shadow-brand)" }}
          >
            Start Editing <span className="font-mono opacity-80">→</span>
          </a>
          <a
            href="#templates"
            className="inline-flex items-center bg-ink-0 text-ink-800 border border-ink-200 hover:border-ink-300 hover:bg-ink-50 hover:no-underline transition-colors"
            style={{ fontSize: 15, fontWeight: 500, padding: "16px 24px", borderRadius: 14, textDecoration: "none", boxShadow: "var(--shadow-1)" }}
          >
            Browse 10 templates
          </a>
          <span
            className="inline-flex items-center gap-2 bg-ink-0 border border-ink-150 font-mono text-ink-700"
            style={{ fontSize: 13, padding: "10px 16px", borderRadius: 999, boxShadow: "var(--shadow-1)" }}
          >
            <span className="text-ink-400">→</span>
            profolyo.me/<span className="text-brand-600 font-medium">yourname</span>
          </span>
        </div>
      </div>
    </section>
  );
}
