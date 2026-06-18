"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TripProgressProps {
  steps: string[];
  /** 0-indexed current step. */
  current: number;
  className?: string;
}

/**
 * Horizontal multi-step progress indicator for the booking flow. Completed
 * steps are filled primary with a check, the current step has a primary ring,
 * upcoming steps are muted. A line connects consecutive circles and fills
 * primary when the step before it is completed.
 */
export function TripProgress({
  steps,
  current,
  className,
}: TripProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-start">
        {steps.map((step, idx) => {
          const completed = idx < current;
          const active = idx === current;
          const isLast = idx === steps.length - 1;

          return (
            <div
              key={step}
              className={cn(
                "relative flex flex-col items-center",
                !isLast && "flex-1",
              )}
            >
              {/* Connector line: spans from this circle's center to the next. */}
              {!isLast && (
                <div
                  aria-hidden
                  className="absolute top-4 left-1/2 h-0.5 w-full bg-border"
                >
                  <div
                    className={cn(
                      "h-full rounded-full bg-primary transition-all",
                      completed ? "w-full" : "w-0",
                    )}
                  />
                </div>
              )}

              <button
                type="button"
                aria-current={active ? "step" : undefined}
                aria-label={`Step ${idx + 1}: ${step}`}
                className={cn(
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  completed &&
                    "border-primary bg-primary text-primary-foreground",
                  active &&
                    "border-primary bg-card text-primary ring-4 ring-primary/15",
                  !completed &&
                    !active &&
                    "border-border bg-card text-muted-foreground",
                )}
              >
                {completed ? <Check className="size-4" aria-hidden /> : idx + 1}
              </button>

              <span
                className={cn(
                  "mt-2 max-w-[5rem] text-center text-xs font-medium leading-tight",
                  active ? "text-card-foreground" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
