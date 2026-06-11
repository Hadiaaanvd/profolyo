import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   "bg-brand-500 text-white border border-transparent shadow-brand hover:bg-brand-600",
  secondary: "bg-ink-900 text-ink-50 border border-transparent hover:bg-ink-800",
  outline:   "bg-white text-ink-800 border border-ink-200 shadow-1 hover:bg-ink-50",
  ghost:     "bg-transparent text-ink-600 border border-transparent hover:bg-ink-100 hover:text-ink-900",
  danger:    "bg-red-500 text-white border border-transparent hover:bg-red-600",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-[13px] px-3 py-1.5 rounded-sm",
  md: "text-sm px-4 py-2.5 rounded-md",
  lg: "text-[15px] px-[22px] py-3.5 rounded-lg",
};

export function Button({
  variant = "outline",
  size = "md",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium font-body transition-all cursor-pointer select-none",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
}
