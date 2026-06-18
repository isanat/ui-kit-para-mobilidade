"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  /** Star size in pixels. Defaults to 24. */
  size?: number;
  readonly?: boolean;
  className?: string;
}

/**
 * Interactive star rating used for rating drivers after a ride. Hover preview
 * in interactive mode; filled stars use the gold brand token.
 */
export function RatingStars({
  value = 0,
  onChange,
  max = 5,
  size = 24,
  readonly = false,
  className,
}: RatingStarsProps) {
  const [hover, setHover] = React.useState<number | null>(null);
  const displayValue = hover ?? value;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        readonly ? "cursor-default" : "cursor-pointer",
        className,
      )}
      role="radiogroup"
      aria-label="Rating"
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = displayValue >= starValue;
        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            role="radio"
            aria-checked={value === starValue}
            aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
            onClick={() => {
              if (!readonly) onChange?.(starValue);
            }}
            onMouseEnter={() => {
              if (!readonly) setHover(starValue);
            }}
            onMouseLeave={() => {
              if (!readonly) setHover(null);
            }}
            className={cn(
              "rounded-full transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              !readonly && "hover:scale-110",
              readonly && "cursor-default",
            )}
            style={{ width: size, height: size }}
          >
            <Star
              className={cn(
                "transition-colors",
                filled
                  ? "fill-gold text-gold"
                  : "fill-transparent text-muted-foreground",
              )}
              style={{ width: size, height: size }}
              aria-hidden
            />
          </button>
        );
      })}
    </div>
  );
}
