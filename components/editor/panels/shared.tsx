"use client";
// ─── Shared primitives used across all editor panels ─────────────────────────

export const inputCls = "w-full text-[13px] px-3 py-2 rounded-lg border border-ink-200 text-ink-800 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white";
export const textareaCls = `${inputCls} resize-none`;
export const labelCls = "block text-[11px] font-mono uppercase tracking-widest text-ink-400 mb-1.5";

export function FormField({ label, hint, required, children }: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-ink-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-ink-400">{hint}</p>}
    </div>
  );
}

export function EmptyState({ icon, title, description, action, onAction }: {
  icon: string; title: string; description: string; action: string; onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-ink-200 rounded-xl">
      <div className="text-[32px] mb-3 select-none" aria-hidden>{icon}</div>
      <p className="font-display font-semibold text-ink-800 text-[16px] mb-1">{title}</p>
      <p className="text-ink-500 text-[13px] mb-6">{description}</p>
      <button type="button" onClick={onAction}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer">
        {action}
      </button>
    </div>
  );
}

export function PanelHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400 mb-1">{eyebrow}</p>
      <h1 className="font-display font-bold text-[24px] tracking-tight text-ink-900 mb-1">{title}</h1>
      {subtitle && <p className="text-[14px] text-ink-500">{subtitle}</p>}
    </div>
  );
}

export function FormHeader({ eyebrow, title, onBack }: { eyebrow: string; title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <button type="button" onClick={onBack}
        className="p-1.5 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition-colors cursor-pointer"
        aria-label="Back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-400">{eyebrow}</p>
        <h1 className="font-display font-bold text-[22px] tracking-tight text-ink-900">{title}</h1>
      </div>
    </div>
  );
}

export function SaveCancelRow({ onSave, onCancel, saveLabel, disabled }: {
  onSave: () => void; onCancel: () => void; saveLabel: string; disabled?: boolean;
}) {
  return (
    <div className="flex gap-3 mt-8">
      <button type="button" onClick={onSave} disabled={disabled}
        className="px-5 py-2 rounded-full bg-brand-500 text-white text-[13px] font-medium hover:bg-brand-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ boxShadow: !disabled ? "var(--shadow-brand)" : undefined }}>
        {saveLabel}
      </button>
      <button type="button" onClick={onCancel}
        className="px-5 py-2 rounded-full border border-ink-200 text-ink-600 text-[13px] font-medium hover:bg-ink-50 transition-colors cursor-pointer">
        Cancel
      </button>
    </div>
  );
}
