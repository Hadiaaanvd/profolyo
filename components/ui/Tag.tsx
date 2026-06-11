import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "mono" | "brand";
  className?: string;
}

const variantClasses = {
  default: "font-body text-xs bg-ink-100 text-ink-700 border border-ink-150",
  mono:    "font-mono text-[11px] bg-ink-100 text-ink-700 border border-ink-150",
  brand:   "font-body text-xs bg-brand-50 text-brand-700 border border-brand-200/60",
};

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 font-medium leading-none",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
