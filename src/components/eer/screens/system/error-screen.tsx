"use client";

import { motion } from "framer-motion";
import {
  Compass,
  LifeBuoy,
  RotateCcw,
  ServerCrash,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ErrorCode = 403 | 404 | 500;

interface ErrorScreenProps {
  /** HTTP-style error code. */
  code: ErrorCode;
  /** Override the default title for the code. */
  title?: string;
  /** Override the default description for the code. */
  description?: string;
  /** Primary action handler. Defaults to navigating home. */
  onAction?: () => void;
  /** Label for the primary action button. */
  actionLabel?: string;
  /** Secondary action handler (Contact support). */
  onContactSupport?: () => void;
  /** Render inside a phone frame instead of full-viewport. */
  inFrame?: boolean;
  className?: string;
}

interface CodeConfig {
  icon: LucideIcon;
  title: string;
  description: string;
  iconTone: string;
}

const codeConfig: Record<ErrorCode, CodeConfig> = {
  403: {
    icon: ShieldAlert,
    title: "Access denied",
    description:
      "You don't have permission to view this page. If you believe this is an error, contact your administrator.",
    iconTone: "bg-amber/15 text-amber",
  },
  404: {
    icon: Compass,
    title: "Page not found",
    description:
      "The page you're looking for may have moved, been renamed, or never existed. Let's get you back on route.",
    iconTone: "bg-cyan/15 text-cyan",
  },
  500: {
    icon: ServerCrash,
    title: "Something went wrong",
    description:
      "Our servers hit a roadblock. We've been notified and are working to get things back on track.",
    iconTone: "bg-destructive/15 text-destructive",
  },
};

/**
 * Reusable full-screen error page for 403 / 404 / 500. Centered layout with
 * a huge gradient error code, a context icon, title, description, and two
 * actions (primary "Back to home" + outline "Contact support"). Works both
 * full-viewport and inside the PhoneFrame.
 */
export function ErrorScreen({
  code,
  title,
  description,
  onAction,
  actionLabel = "Back to home",
  onContactSupport,
  inFrame = false,
  className,
}: ErrorScreenProps) {
  const cfg = codeConfig[code];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 bg-background px-6 text-center",
        inFrame ? "h-full" : "min-h-dvh",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex flex-col items-center gap-5"
      >
        {/* Icon tile */}
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className={cn(
            "flex size-16 items-center justify-center rounded-2xl",
            cfg.iconTone,
          )}
        >
          <Icon className="size-8" aria-hidden />
        </motion.span>

        {/* Big gradient error code */}
        <h1 className="text-8xl font-bold leading-none bg-gradient-to-br from-primary to-cyan bg-clip-text text-transparent tabular-nums">
          {code}
        </h1>

        <div className="max-w-sm space-y-2">
          <p className="text-xl font-semibold text-foreground">
            {title ?? cfg.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {description ?? cfg.description}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:justify-center"
      >
        <Button onClick={onAction} className="h-11 flex-1 sm:flex-none">
          <RotateCcw className="size-4" aria-hidden />
          {actionLabel}
        </Button>
        <Button
          variant="outline"
          onClick={onContactSupport}
          className="h-11 flex-1 sm:flex-none"
        >
          <LifeBuoy className="size-4" aria-hidden />
          Contact support
        </Button>
      </motion.div>
    </div>
  );
}

export default ErrorScreen;
