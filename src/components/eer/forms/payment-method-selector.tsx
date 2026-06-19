"use client";

import * as React from "react";
import { Plus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaymentMethod {
  id: string;
  label: string;
  /** e.g. "Visa •••• 4242" or "Balance $128.40". */
  sublabel?: string;
  icon?: LucideIcon;
}

export interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  value?: string;
  onChange?: (id: string) => void;
  /** Renders the "Add payment method" button row when provided. */
  onAddMethod?: () => void;
  className?: string;
}

/**
 * Radio-style single-select list of payment methods (cards, cash, wallet,
 * Apple/Google Pay) with a custom filled circle indicator and an optional
 * "Add payment method" row.
 */
export function PaymentMethodSelector({
  methods,
  value,
  onChange,
  onAddMethod,
  className,
}: PaymentMethodSelectorProps) {
  return (
    <div className={cn("space-y-2", className)} role="radiogroup">
      {methods.map((m) => {
        const Icon = m.icon;
        const selected = m.id === value;
        return (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange?.(m.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/40",
            )}
          >
            {Icon && (
              <span
                aria-hidden
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-xl",
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                <Icon className="size-5" />
              </span>
            )}

            <span className="flex-1 min-w-0">
              <span className="block font-semibold text-card-foreground">
                {m.label}
              </span>
              {m.sublabel && (
                <span className="block truncate text-sm text-muted-foreground">
                  {m.sublabel}
                </span>
              )}
            </span>

            <span
              aria-hidden
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                selected ? "border-primary bg-primary" : "border-border",
              )}
            >
              {selected && (
                <span className="size-2 rounded-full bg-primary-foreground" />
              )}
            </span>
          </button>
        );
      })}

      {onAddMethod && (
        <button
          type="button"
          onClick={onAddMethod}
          className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-border p-3 text-left text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted"
          >
            <Plus className="size-5" />
          </span>
          <span className="font-semibold">Add payment method</span>
        </button>
      )}
    </div>
  );
}
