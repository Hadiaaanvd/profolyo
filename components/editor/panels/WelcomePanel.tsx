"use client";
import { useEditor } from "@/contexts/EditorContext";

export default function WelcomePanel() {
  const { setActivePanel, portfolio, templateId } = useEditor();

  const { user, projects, experience } = portfolio;

  const done1 = templateId !== "folio"; // picked a non-default template
  const done2 = Boolean(user.name.trim() && user.headline.trim());
  const done3 = projects.length > 0 || experience.length > 0;

  function openHero() {
    const sec = portfolio.sections.find((s) => s.id === "hero");
    if (sec) setActivePanel(sec.id);
  }
  function openProjects() {
    const sec = portfolio.sections.find((s) => s.type === "projects");
    if (sec) setActivePanel(sec.id);
  }

  const steps = [
    {
      label: "Pick a template",
      desc: "Choose your starting point. Switch any time.",
      cta: "Open Appearance →",
      onClick: () => setActivePanel("appearance"),
      done: done1,
    },
    {
      label: "Fill in your info",
      desc: "Name, headline, bio, and social links.",
      cta: "Open Hero →",
      onClick: openHero,
      done: done2,
    },
    {
      label: "Add your work",
      desc: "Projects, experience, skills, and more.",
      cta: "Open Projects →",
      onClick: openProjects,
      done: done3,
    },
  ];

  const completedCount = steps.filter((s) => s.done).length;
  const allDone = completedCount === steps.length;

  return (
    <div className="max-w-xl mx-auto px-8 py-14">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400 mb-1">Editor</p>
      <h1 className="font-display font-bold text-[28px] tracking-tight text-ink-900 mb-2">
        {allDone ? "You're all set 🎉" : "Build your portfolio"}
      </h1>
      <div className="flex items-center gap-3 mb-10">
        <p className="text-[14px] text-ink-500">
          {allDone ? "Your portfolio is ready to share." : `${completedCount} of ${steps.length} steps complete`}
        </p>
        {/* Progress bar */}
        {!allDone && (
          <div className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500"
              style={{ width: `${(completedCount / steps.length) * 100}%` }}
            />
          </div>
        )}
      </div>
      <ol className="flex flex-col gap-3">
        {steps.map(({ label, desc, cta, onClick, done }, idx) => (
          <li key={label}>
            <button
              type="button"
              onClick={onClick}
              className={[
                "w-full flex items-start gap-4 p-5 rounded-2xl border transition-colors text-left cursor-pointer group",
                done
                  ? "border-green-200 bg-green-50 hover:border-green-300"
                  : "border-ink-150 bg-white hover:border-brand-300 hover:bg-brand-50",
              ].join(" ")}
            >
              {/* Step indicator / checkmark */}
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold font-display shrink-0 mt-0.5 transition-colors"
                style={{
                  background: done ? "#16A34A" : "var(--color-brand-500)",
                  color: "#fff",
                }}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  String(idx + 1)
                )}
              </span>
              <div className="flex-1 min-w-0">
                <div className={["text-[14px] font-semibold mb-0.5", done ? "text-green-800 line-through decoration-green-400" : "text-ink-800"].join(" ")}>
                  {label}
                </div>
                <div className={["text-[12px]", done ? "text-green-600" : "text-ink-500"].join(" ")}>{desc}</div>
              </div>
              {!done && (
                <span className="text-[12px] font-medium text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1">
                  {cta}
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
