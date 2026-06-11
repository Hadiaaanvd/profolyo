const SIDEBAR_ITEMS = [
  { label: "Basics",     count: null,  active: false },
  { label: "Experience", count: 4,     active: false },
  { label: "Education",  count: 2,     active: false },
  { label: "Skills",     count: 12,    active: false },
  { label: "Projects",   count: 8,     active: true  },
  { label: "Appearance", count: null,  active: false },
];

const PROJECT_ROWS = [
  { grip: true, bg: "linear-gradient(135deg, #FFD4A8, #E76F51)", title: "Givency · Donor Platform",    meta: "B2B SaaS for mid-sized nonprofits",       status: "Live",        statusBg: "var(--color-green-50)", statusColor: "var(--color-green-700)" },
  { grip: true, bg: "linear-gradient(135deg, var(--color-brand-200), var(--color-brand-400))", title: "create-profolyo-app", meta: "CLI to scaffold self-hosted Profolyo", status: "In progress", statusBg: "#FEF3C7",                  statusColor: "#7C2D12" },
  { grip: true, bg: "#0F1410",                                                                  title: "Pulse · Live Metrics",              meta: "Real-time dashboard for ops teams",      status: "Archived",    statusBg: "var(--color-ink-100)",   statusColor: "var(--color-ink-600)" },
  { grip: true, bg: "linear-gradient(150deg, #F4E8D0, #C4A57B)",                               title: "Field Notes",                        meta: "Markdown CMS for engineering teams",     status: "Live",        statusBg: "var(--color-green-50)", statusColor: "var(--color-green-700)" },
];

export default function EditorDemo() {
  return (
    <section
      id="editor"
      className="py-24 px-8"
      style={{ background: "var(--color-ink-0)", borderTop: "1px solid var(--color-ink-150)", borderBottom: "1px solid var(--color-ink-150)" }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section head */}
        <div className="mb-16" style={{ maxWidth: 720 }}>
          <span
            className="font-mono font-medium text-ink-500 uppercase inline-block mb-4"
            style={{ fontSize: 11, letterSpacing: "0.16em" }}
          >
            02 — The editor
          </span>
          <h2
            className="font-display font-bold text-ink-900"
            style={{ fontSize: "clamp(40px, 4.5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 16px" }}
          >
            Built to make
            <br />
            structured data feel easy<span className="text-brand-500">.</span>
          </h2>
          <p className="text-ink-600" style={{ fontSize: 20, lineHeight: 1.55, margin: 0 }}>
            A focused editor. Drag to reorder. Auto-save on blur. Live preview that mirrors your published portfolio in real time. Import from GitHub, paste from LinkedIn, or start blank.
          </p>
        </div>

        {/* Editor frame */}
        <div
          className="bg-ink-0 border border-ink-150 overflow-hidden"
          style={{ borderRadius: 20, boxShadow: "var(--shadow-4)" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-4 py-3 bg-ink-50 border-b border-ink-150">
            <div className="flex gap-1.5">
              <span className="block rounded-full" style={{ width: 11, height: 11, background: "#FF5F57" }} />
              <span className="block rounded-full" style={{ width: 11, height: 11, background: "#FEBC2E" }} />
              <span className="block rounded-full" style={{ width: 11, height: 11, background: "#28C840" }} />
            </div>
            <div className="flex-1 flex justify-center">
              <span
                className="font-mono text-ink-500 bg-ink-0 border border-ink-150 rounded-[10px]"
                style={{ fontSize: 12, padding: "4px 14px" }}
              >
                profolyo.me/editor/projects
              </span>
            </div>
          </div>

          {/* 3-col body */}
          <div
            className="grid"
            style={{ gridTemplateColumns: "200px 1fr 300px", minHeight: 520 }}
          >
            {/* Sidebar */}
            <aside className="bg-ink-50 border-r border-ink-150" style={{ padding: "20px 12px" }}>
              <div
                className="font-display font-bold text-ink-900"
                style={{ fontSize: 18, letterSpacing: "-0.03em", lineHeight: 1, padding: "0 6px 18px" }}
              >
                Profolyo<span className="text-brand-500">.</span>
              </div>
              {SIDEBAR_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-[10px]"
                  style={{
                    padding: "7px 10px",
                    fontSize: 13,
                    fontWeight: item.active ? 600 : 500,
                    color: item.active ? "var(--color-brand-700)" : "var(--color-ink-700)",
                    background: item.active ? "var(--color-brand-50)" : "transparent",
                  }}
                >
                  <span className="flex-1">{item.label}</span>
                  {item.count !== null && (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        color: item.active ? "var(--color-brand-700)" : "var(--color-ink-400)",
                        background: item.active ? "var(--color-brand-100)" : "transparent",
                        padding: item.active ? "1px 7px" : undefined,
                        borderRadius: item.active ? 999 : undefined,
                      }}
                    >
                      {item.count}
                    </span>
                  )}
                </div>
              ))}
            </aside>

            {/* Main */}
            <main style={{ padding: "24px 28px", background: "var(--color-ink-0)", overflow: "hidden" }}>
              <div className="flex justify-between items-baseline" style={{ marginBottom: 18 }}>
                <div>
                  <span
                    className="font-mono font-medium text-ink-500 uppercase block"
                    style={{ fontSize: 11, letterSpacing: "0.16em" }}
                  >
                    Projects · 8
                  </span>
                  <h4
                    className="font-display font-semibold text-ink-900"
                    style={{ fontSize: 22, letterSpacing: "-0.02em", margin: "4px 0 0" }}
                  >
                    Selected work
                  </h4>
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    className="inline-flex items-center bg-ink-0 text-ink-800 border border-ink-200 rounded-[10px] hover:bg-ink-50 cursor-pointer"
                    style={{ padding: "6px 12px", fontSize: 12.5, fontWeight: 500 }}
                  >
                    ＋ Import GitHub
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center bg-brand-500 text-white rounded-[10px] hover:bg-brand-600 cursor-pointer"
                    style={{ padding: "6px 12px", fontSize: 12.5, fontWeight: 500 }}
                  >
                    ＋ New project
                  </button>
                </div>
              </div>
              <p className="text-ink-500" style={{ margin: "-10px 0 16px", fontSize: 12 }}>
                Drag to reorder · top 6 appear on portfolio · auto-saves on blur
              </p>
              {PROJECT_ROWS.map((row) => (
                <div
                  key={row.title}
                  className="flex items-center gap-3 bg-ink-0 border border-ink-150 rounded-[10px]"
                  style={{ padding: 12, marginBottom: 8 }}
                >
                  <span className="text-ink-300 cursor-grab select-none" style={{ fontSize: 14 }}>⋮⋮</span>
                  <div
                    className="shrink-0 rounded-[6px]"
                    style={{ width: 40, height: 40, background: row.bg }}
                  />
                  <div className="flex-1 min-w-0">
                    <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 2 }}>{row.title}</div>
                    <div className="text-ink-500" style={{ fontSize: 11.5 }}>{row.meta}</div>
                  </div>
                  <span
                    className="font-medium shrink-0"
                    style={{ padding: "3px 9px", fontSize: 10.5, borderRadius: 999, background: row.statusBg, color: row.statusColor }}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </main>

            {/* Right preview */}
            <aside className="bg-ink-50 border-l border-ink-150" style={{ padding: 20 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                <span
                  className="font-mono font-medium text-ink-500 uppercase"
                  style={{ fontSize: 11, letterSpacing: "0.16em" }}
                >
                  Live preview
                </span>
                <span
                  className="font-mono text-green-700"
                  style={{ fontSize: 10, background: "var(--color-green-50)", padding: "3px 8px", borderRadius: 999 }}
                >
                  ● syncing
                </span>
              </div>
              <div
                className="bg-ink-0 border border-ink-150 rounded-[10px]"
                style={{ padding: 14, boxShadow: "var(--shadow-1)" }}
              >
                <div className="text-ink-500" style={{ fontSize: 9, marginBottom: 8 }}>Selected work</div>
                <div
                  className="font-display font-bold"
                  style={{ fontSize: 13, letterSpacing: "-0.015em" }}
                >
                  Hadia Naveed<span style={{ color: "#E76F51" }}>.</span>
                </div>
                <div className="grid grid-cols-2 gap-1" style={{ marginTop: 8 }}>
                  {[
                    "linear-gradient(135deg, #FFD4A8, #E76F51)",
                    "linear-gradient(160deg, #D7C9FF, #B8A0FF)",
                    "#0F1410",
                    "linear-gradient(150deg, #F4E8D0, #C4A57B)",
                  ].map((bg, i) => (
                    <div key={i} style={{ aspectRatio: "1", borderRadius: 3, background: bg }} />
                  ))}
                </div>
              </div>
              <div className="text-ink-500" style={{ marginTop: 12, fontSize: 11 }}>
                Saved 2 min ago — keep going!
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
