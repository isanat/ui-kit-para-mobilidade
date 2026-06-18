import { cn } from "@/lib/utils";
import { toneSoft, type Tone } from "./accents";

interface StatusBadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({
  children,
  tone = "brand",
  dot = false,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        toneSoft[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
