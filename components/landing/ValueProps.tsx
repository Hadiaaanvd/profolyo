const VALUE_CARDS = [
  {
    glyph: "∞",
    title: "Edit once. Ship both.",
    body: 'Your portfolio and résumé share the same source of truth. Change a job title in one place, both update. No more \u201cwait, which version is the latest?\u201d',
  },
  {
    glyph: "◐",
    title: "Your accent stays yours.",
    body: "Pick any accent color for your portfolio. Profolyo's brand blue never appears on your published page — your work doesn't need to look like our marketing.",
  },
  {
    glyph: "↗",
    title: "Import from anywhere.",
    body: "Pull projects from GitHub, paste experience from LinkedIn, fork another Profolyo portfolio. Starting blank is optional.",
  },
  {
    glyph: "⌘",
    title: "Real keyboard nav.",
    body: "The editor is built for keyboard-first users. Every action has a shortcut. Drag-and-drop has full a11y support. No mouse required.",
  },
  {
    glyph: "⚡",
    title: "Fast by default.",
    body: "Published portfolios score 100 on Lighthouse. Sub-200ms TTFB. Real fonts, lazy images, no JS framework on the user-facing page.",
  },
  {
    glyph: "⊕",
    title: "Yours to take.",
    body: "Export your full profile as JSON. Self-host with create-profolyo-app. Your career data isn't locked in.",
  },
];

export default function ValueProps() {
  return (
    <section
      id="why-pro"
      className="py-16 px-4 sm:py-24 sm:px-8"
      style={{ background: "var(--color-ink-0)", borderTop: "1px solid var(--color-ink-150)", borderBottom: "1px solid var(--color-ink-150)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section head */}
        <div className="mb-16" style={{ maxWidth: 720 }}>
          <span
            className="font-mono font-medium text-ink-500 uppercase inline-block mb-4"
            style={{ fontSize: 11, letterSpacing: "0.16em" }}
          >
            04 — Why Profolyo
          </span>
          <h2
            className="font-display font-bold text-ink-900"
            style={{ fontSize: "clamp(40px, 4.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}
          >
            Boring tools, careful details<span className="text-brand-500">.</span>
          </h2>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUE_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-ink-0 border border-ink-150"
              style={{ borderRadius: 14, padding: 28 }}
            >
              <div
                className="flex items-center justify-center font-display font-bold text-brand-600"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--color-brand-50)",
                  fontSize: 22,
                  marginBottom: 18,
                }}
                aria-hidden="true"
              >
                {card.glyph}
              </div>
              <h3
                className="font-display font-semibold text-ink-900"
                style={{ fontSize: 20, letterSpacing: "-0.015em", margin: "0 0 6px", lineHeight: 1.2 }}
              >
                {card.title}
              </h3>
              <p className="text-ink-500" style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
