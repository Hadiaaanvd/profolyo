export default function ProofStrip() {
  return (
    <div className="bg-ink-0 border-t border-b border-ink-150" style={{ padding: "32px 0" }}>
      <div
        className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-6 font-mono uppercase text-ink-500"
        style={{ fontSize: 11.5, letterSpacing: "0.12em" }}
      >
        <span><strong className="text-ink-900 font-semibold">11,400+</strong> portfolios shipped</span>
        <span className="hidden sm:inline text-ink-300" aria-hidden="true">·</span>
        <span><strong className="text-ink-900 font-semibold">10</strong> templates</span>
        <span className="hidden sm:inline text-ink-300" aria-hidden="true">·</span>
        <span>
          Imports from{" "}
          <strong className="text-ink-900 font-semibold">GitHub</strong>,{" "}
          <strong className="text-ink-900 font-semibold">LinkedIn</strong>,{" "}
          <strong className="text-ink-900 font-semibold">Read.cv</strong>
        </span>
        <span className="hidden sm:inline text-ink-300" aria-hidden="true">·</span>
        <span>Free forever for individuals</span>
      </div>
    </div>
  );
}
