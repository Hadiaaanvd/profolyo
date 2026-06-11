import { templates } from "@/lib/templates";
import TemplatePreview from "@/components/ui/TemplatePreview";

export default function TemplateRail() {
  return (
    <section id="templates" className="py-24 px-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-12" style={{ maxWidth: 760 }}>
          <span className="font-mono text-[12px] text-brand-500 tracking-widest uppercase block mb-3">
            03 — Ten ways to ship
          </span>
          <h2
            className="font-display font-bold text-ink-900 mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          >
            Templates that don&apos;t
            <br />
            look like everyone else&apos;s<span className="text-brand-500">.</span>
          </h2>
          <p className="text-[16px] text-ink-500 leading-relaxed max-w-[620px]">
            Each template is a complete design decision — typography, layout, density, voice. Pick one as your
            starting point, then customize accent color, fonts, and section order.
          </p>
        </div>

        {/* 5-col grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-[var(--radius-lg)] overflow-hidden border border-ink-150 bg-ink-0 cursor-pointer transition-all duration-[160ms] ease-out hover:-translate-y-0.5 hover:shadow-3"
            >
              {/* Preview area */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <TemplatePreview template={template} />
              </div>

              {/* Label footer */}
              <div className="flex items-center justify-between gap-2 px-[14px] py-3">
                <span
                  className="font-display font-semibold text-ink-900"
                  style={{ fontSize: 14.5, letterSpacing: "-0.015em" }}
                >
                  {template.name}
                </span>
                <span
                  className="font-mono text-ink-500"
                  style={{ fontSize: 10, letterSpacing: "0.06em" }}
                >
                  {template.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-0 border border-ink-200 text-ink-700 text-[14px] font-medium hover:border-brand-300 hover:text-brand-700 transition-colors"
          >
            Start with any template →
          </a>
        </div>
      </div>
    </section>
  );
}
