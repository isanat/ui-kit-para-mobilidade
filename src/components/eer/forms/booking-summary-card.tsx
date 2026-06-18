import * as React from "react";
import { MapPin, Users, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentSoft, type Accent } from "@/components/eer/accents";

export interface BookingSummaryCardProps {
  pickup: string;
  destination: string;
  serviceName: string;
  serviceAccent?: Accent;
  /** Pre-formatted date/time string, e.g. "Today · 4:30 PM". */
  dateTime?: string;
  passengers?: number;
  className?: string;
}

/**
 * Compact summary of a booking: a vertical pickup → destination route with a
 * dashed connector, plus service badge, date/time chip, and passenger count
 * chip along the bottom.
 */
export function BookingSummaryCard({
  pickup,
  destination,
  serviceName,
  serviceAccent = "brand",
  dateTime,
  passengers,
  className,
}: BookingSummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4",
        className,
      )}
    >
      <div className="flex gap-3">
        {/* Route pin column */}
        <div className="flex flex-col items-center pt-0.5">
          <span
            aria-hidden
            className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary"
          >
            <span className="size-2 rounded-full bg-current" />
          </span>
          <span
            aria-hidden
            className="my-1 h-8 w-px border-l border-dashed border-border"
          />
          <span
            aria-hidden
            className="flex size-5 items-center justify-center rounded-full bg-amber/15 text-amber"
          >
            <MapPin className="size-3" />
          </span>
        </div>

        {/* Route text */}
        <div className="flex flex-1 flex-col justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Pickup
            </p>
            <p className="truncate text-sm font-semibold text-card-foreground">
              {pickup}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Destination
            </p>
            <p className="truncate text-sm font-semibold text-card-foreground">
              {destination}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
            accentSoft[serviceAccent],
          )}
        >
          {serviceName}
        </span>

        {dateTime && (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <CalendarClock className="size-3" aria-hidden />
            {dateTime}
          </span>
        )}

        {passengers != null && (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Users className="size-3" aria-hidden />
            {passengers} {passengers === 1 ? "passenger" : "passengers"}
          </span>
        )}
      </div>
    </div>
  );
}
