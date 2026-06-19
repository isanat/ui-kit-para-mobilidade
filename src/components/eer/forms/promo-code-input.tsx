"use client";

import * as React from "react";
import { Tag, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AppliedPromo {
  code: string;
  /** Pre-formatted discount string, e.g. "$3.00" or "15%". */
  discount: string;
}

export interface PromoCodeInputProps {
  onApply?: (code: string) => void;
  onRemove?: () => void;
  applied?: AppliedPromo | null;
  className?: string;
}

/**
 * Promo code entry row. When no code is applied, shows a transparent text
 * input with an inline "Apply" button. When `applied` is provided, shows a
 * success-tinted card with the code, the saved amount, and a remove button.
 */
export function PromoCodeInput({
  onApply,
  onRemove,
  applied,
  className,
}: PromoCodeInputProps) {
  const [code, setCode] = React.useState("");

  const handleApply = () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    onApply?.(trimmed);
    setCode("");
  };

  if (applied) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 p-3",
          className,
        )}
      >
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-success/20 text-success"
        >
          <Tag className="size-4" />
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-card-foreground">
              {applied.code}
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-success/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-success uppercase">
              <Check className="size-2.5" aria-hidden />
              Applied
            </span>
          </div>
          <p className="text-xs text-success">You saved {applied.discount}</p>
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove promo code"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-2xl border border-border bg-card p-2 transition-colors focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40",
        className,
      )}
    >
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground"
      >
        <Tag className="size-4" />
      </span>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleApply();
          }
        }}
        placeholder="Enter promo code"
        aria-label="Promo code"
        className="flex-1 bg-transparent px-1 text-sm font-medium text-card-foreground placeholder:text-muted-foreground focus:outline-none"
      />

      <button
        type="button"
        onClick={handleApply}
        disabled={!code.trim()}
        className="shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Apply
      </button>
    </div>
  );
}
