"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Bell, Clock, Hammer, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/eer/logo";
import { cn } from "@/lib/utils";

interface MaintenanceScreenProps {
  /** Override the "back at" time shown to the user. */
  estimatedReturn?: string;
  /** Render inside a phone frame instead of full-viewport. */
  inFrame?: boolean;
  /** Fired when the user submits the subscribe form. */
  onSubscribe?: (email: string) => void;
  className?: string;
}

/**
 * Maintenance / "we'll be right back" screen. Centered over a subtle brand
 * gradient background. Shows an animated wrench, an estimated return time,
 * and a subscribe-for-updates input.
 */
export function MaintenanceScreen({
  estimatedReturn = "in about 30 minutes",
  inFrame = false,
  onSubscribe,
  className,
}: MaintenanceScreenProps) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubscribe?.(email.trim());
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-7 overflow-hidden bg-background px-6 text-center",
        inFrame ? "h-full" : "min-h-dvh",
        className,
      )}
    >
      {/* Subtle brand gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative flex flex-col items-center gap-6">
        <Logo size={40} subtitle="Scheduled maintenance" />

        {/* Animated wrench icon */}
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex size-20 items-center justify-center rounded-3xl bg-primary/15 text-primary ring-1 ring-inset ring-primary/20"
        >
          <motion.span
            animate={{ rotate: [-8, 8, -8] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex size-full items-center justify-center"
          >
            <Hammer className="size-9" aria-hidden />
          </motion.span>
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-sm space-y-3"
        >
          <h1 className="text-2xl font-semibold text-foreground">
            We&apos;ll be right back
          </h1>
          <p className="text-sm text-muted-foreground">
            Eagle Eye Rides is undergoing scheduled maintenance to bring you a
            smoother ride. Existing bookings are unaffected.
          </p>
        </motion.div>

        {/* Estimated return chip */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm backdrop-blur">
          <Clock className="size-4 text-primary" aria-hidden />
          <span className="text-muted-foreground">Back</span>
          <span className="font-medium text-foreground">
            {estimatedReturn}
          </span>
        </div>

        {/* Subscribe for updates */}
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-2"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 transition-colors focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Mail className="size-4" aria-hidden />
            </span>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email for updates"
              className="h-9 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent"
            />
            <Button type="submit" className="h-9 shrink-0">
              <Bell className="size-4" aria-hidden />
              Subscribe
            </Button>
          </div>
          {submitted && (
            <p className="text-xs text-success">
              Thanks — we&apos;ll email you when we&apos;re back up.
            </p>
          )}
        </motion.form>
      </div>

      <p className="relative text-xs text-muted-foreground">
        Need urgent help?{" "}
        <a
          href="mailto:support@eagleeyerides.com"
          className="font-medium text-primary hover:underline"
        >
          support@eagleeyerides.com
        </a>
      </p>
    </div>
  );
}

export default MaintenanceScreen;
