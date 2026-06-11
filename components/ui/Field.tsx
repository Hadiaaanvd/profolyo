import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, hint, required, id, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[13px] font-medium text-ink-700 font-body">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden>*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-xs leading-relaxed text-ink-400">{hint}</p>
      )}
    </div>
  );
}

const inputBase =
  "w-full font-body text-sm px-3 py-2.5 rounded-md border border-ink-200 bg-white text-ink-900 outline-none " +
  "transition-[border-color,box-shadow] duration-[120ms] ease-in-out placeholder:text-ink-400 " +
  "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputBase, className)} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(inputBase, "resize-y min-h-[84px]", className)}
    />
  );
}

const chevronSvg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%236F6D63' stroke-width='1.5' stroke-linecap='round'><path d='M4 6l4 4 4-4'/></svg>")`;

export function Select({ className, style, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(inputBase, "appearance-none pr-9", className)}
      style={{
        backgroundImage: chevronSvg,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        ...style,
      }}
    />
  );
}
