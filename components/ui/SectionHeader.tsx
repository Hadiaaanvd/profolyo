interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ eyebrow, title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <span className="block mb-1.5 font-mono text-[11px] text-ink-400 uppercase tracking-[0.14em]">
          {eyebrow}
        </span>
        <h1 className="m-0 font-display font-semibold text-[28px] tracking-[-0.015em] text-ink-900">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm leading-relaxed text-ink-500">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0 flex items-center gap-2 pt-1">{action}</div>}
    </div>
  );
}
