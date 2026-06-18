"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FilterChipsProps {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  /** Label for the "show all" chip (clears the filter). Defaults to "All". */
  allLabel?: string;
  className?: string;
}

/**
 * Horizontal scrollable row of single-select filter chips. The leading chip
 * represents "no filter" (clears the selection). Selected chip uses primary
 * background; others use muted. Scrollbar is hidden for a clean mobile look.
 */
export function FilterChips({
  options,
  value,
  onChange,
  allLabel = "All",
  className,
}: FilterChipsProps) {
  const isAll = !value;

  return (
    <div
      className={cn(
        "flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      role="tablist"
      aria-label="Filters"
    >
      <button
        type="button"
        role="tab"
        aria-selected={isAll}
        onClick={() => onChange?.("")}
        className={cn(
          "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isAll
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:text-foreground",
        )}
      >
        {allLabel}
      </button>

      {options.map((opt) => {
        const selected = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange?.(opt)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
