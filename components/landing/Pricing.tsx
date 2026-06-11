export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: "96px 0" }}>
      <div className="max-w-[1280px] mx-auto px-8">
        <div
          className="relative overflow-hidden text-center"
          style={{
            background: "var(--color-ink-900)",
            color: "var(--color-ink-50)",
            borderRadius: 28,
            padding: "80px 64px",
          }}
        >
          <div
            className="font-mono uppercase"
            style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--color-brand-300)", marginBottom: 24 }}
          >
            Free forever · No credit card
          </div>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(40px, 5vw, 72px)", letterSpacing: "-0.04em", lineHeight: 1, margin: "0 0 16px" }}
          >
            Claim your handle
            <br />
            before someone else does<span style={{ color: "var(--color-brand-400)" }}>.</span>
          </h2>
          <p
            className="mx-auto"
            style={{ color: "var(--color-ink-300)", fontSize: 19, maxWidth: "56ch", margin: "0 auto 32px" }}
          >
            Free for individuals. Custom domain and analytics on Pro ($6/mo). Self-host if you&apos;d rather. Cancel anytime — your data stays exportable.
          </p>
          <div className="inline-flex flex-wrap gap-3 justify-center">
            <a
              href="/login"
              className="inline-flex items-center gap-2 bg-brand-500 text-white hover:bg-brand-600 hover:no-underline transition-colors"
              style={{ fontSize: 15, fontWeight: 500, padding: "16px 24px", borderRadius: 14, textDecoration: "none", boxShadow: "var(--shadow-brand)" }}
            >
              Get started <span className="font-mono opacity-80">→</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center hover:no-underline transition-colors"
              style={{
                fontSize: 15,
                fontWeight: 500,
                padding: "16px 24px",
                borderRadius: 14,
                textDecoration: "none",
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,.18)",
              }}
            >
              See pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
