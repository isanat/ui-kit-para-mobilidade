"use client";

import * as React from "react";
import { Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Accent } from "@/components/eer/accents";

export interface VehicleOption {
  id: string;
  name: string;
  /** e.g. "4 seats · 3 bags". */
  description: string;
  /** e.g. "3 min away". */
  eta: string;
  /** Display price, e.g. "$24.50". */
  price: string;
  icon: LucideIcon;
  /** Soft accent tint for the icon tile. Defaults to "brand". */
  accent?: Accent;
}

export interface VehicleSelectorProps {
  options: VehicleOption[];
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

const accentSoftMap: Record<Accent, string> = {
  brand: "bg-primary/15 text-primary",
  cyan: "bg-cyan/15 text-cyan",
  amber: "bg-amber/15 text-amber",
  magenta: "bg-magenta/15 text-magenta",
  gold: "bg-gold/20 text-gold",
  success: "bg-success/15 text-success",
};

/**
 * Single-select list of vehicle tiers for reservations. Reuses the visual
 * language of RideOption but is purpose-built for selection state.
 */
export function VehicleSelector({
  options,
  value,
  onChange,
  className,
}: VehicleSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const selected = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange?.(opt.id)}
            aria-pressed={selected}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/40",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl",
                selected
                  ? "bg-primary text-primary-foreground"
                  : accentSoftMap[opt.accent ?? "brand"],
              )}
            >
              <Icon className="size-5" />
            </span>

            <span className="flex-1 min-w-0">
              <span className="block font-semibold text-card-foreground">
                {opt.name}
              </span>
              <span className="block truncate text-sm text-muted-foreground">
                {opt.description} · {opt.eta}
              </span>
            </span>

            <span className="flex shrink-0 flex-col items-end gap-1">
              <span className="font-semibold text-card-foreground">
                {opt.price}
              </span>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border",
                )}
                aria-hidden
              >
                {selected && <Check className="size-3" />}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
