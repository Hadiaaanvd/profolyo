export type ProjectStatus = "live" | "in-progress" | "archived";

const config: Record<ProjectStatus, { label: string; pill: string; dot: string }> = {
  live:          { label: "Live",        pill: "bg-green-50 text-green-700",  dot: "bg-green-500"  },
  "in-progress": { label: "In progress", pill: "bg-amber-50 text-amber-700",  dot: "bg-amber-500"  },
  archived:      { label: "Archived",    pill: "bg-ink-100 text-ink-600",     dot: "bg-ink-400"    },
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  const { label, pill, dot } = config[status] ?? config.archived;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-xs font-medium ${pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
      {label}
    </span>
  );
}
