import { X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "brand";

interface AlertConfig {
  /** Soft tinted background for the banner. */
  surface: string;
  /** Border color. */
  border: string;
  /** Icon tile background + icon color. */
  iconTile: string;
  /** Accent color used for the title and the action. */
  title: string;
}

const alertConfig: Record<AlertVariant, AlertConfig> = {
  info: {
    surface: "bg-cyan/10",
    border: "border-cyan/25",
    iconTile: "bg-cyan/15 text-cyan",
    title: "text-cyan",
  },
  success: {
    surface: "bg-success/10",
    border: "border-success/25",
    iconTile: "bg-success/15 text-success",
    title: "text-success",
  },
  warning: {
    surface: "bg-amber/10",
    border: "border-amber/25",
    iconTile: "bg-amber/15 text-amber",
    title: "text-amber",
  },
  danger: {
    surface: "bg-destructive/10",
    border: "border-destructive/25",
    iconTile: "bg-destructive/15 text-destructive",
    title: "text-destructive",
  },
  brand: {
    surface: "bg-primary/10",
    border: "border-primary/25",
    iconTile: "bg-primary/15 text-primary",
    title: "text-primary",
  },
};

export interface EerAlertProps {
  variant?: AlertVariant;
  title: string;
  description?: string;
  /** Override the default icon for the variant. */
  icon?: LucideIcon;
  /** Right-aligned action node (usually a button). */
  action?: React.ReactNode;
  /** Show a dismiss (X) button. Called when clicked. */
  onDismiss?: () => void;
  className?: string;
}

/**
 * Inline EER-themed banner (not a toast). Five accent variants:
 * info / success / warning / danger / brand. Layout: icon tile + content +
 * optional action + optional dismiss. Used for "Notifications are off",
 * "Document pending", "Surge active", etc.
 */
export function EerAlert({
  variant = "info",
  title,
  description,
  icon,
  action,
  onDismiss,
  className,
}: EerAlertProps) {
  const cfg = alertConfig[variant];
  const Icon = icon;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-2xl border p-3.5",
        cfg.surface,
        cfg.border,
        className,
      )}
    >
      {Icon && (
        <span
          aria-hidden
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl",
            cfg.iconTile,
          )}
        >
          <Icon className="size-4" />
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-semibold", cfg.title)}>{title}</p>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

export default EerAlert;
