import * as React from "react";
import { cn } from "@/lib/utils";

export interface FareSummaryItem {
  label: string;
  /** Pre-formatted amount string, e.g. "$12.30". */
  amount: string;
}

export interface FareSummaryProps {
  items: FareSummaryItem[];
  /** Pre-formatted total amount string, e.g. "$28.45". */
  total: string;
  /** Optional pre-formatted discount amount, e.g. "$3.00". */
  discount?: string;
  className?: string;
}

/**
 * Fare breakdown card. Renders labeled line items (Base fare, Time, Distance,
 * Surcharge, Additional fees, ...), an optional discount row in the success
 * tone, a divider, and a large bold Total.
 */
export function FareSummary({
  items,
  total,
  discount,
  className,
}: FareSummaryProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4",
        className,
      )}
    >
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium text-card-foreground">
              {item.amount}
            </span>
          </div>
        ))}

        {discount && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-success">Discount</span>
            <span className="font-medium text-success">-{discount}</span>
          </div>
        )}
      </div>

      <div className="my-3 h-px w-full bg-border" role="separator" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Total
        </span>
        <span className="text-xl font-bold text-card-foreground">{total}</span>
      </div>
    </div>
  );
}
