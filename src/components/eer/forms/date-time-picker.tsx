"use client";

import * as React from "react";
import { CalendarDays, Clock, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DateTimePickerProps {
  date?: Date;
  time?: string;
  onDateChange?: (date?: Date) => void;
  onTimeChange?: (time: string) => void;
  className?: string;
}

/** Half-hour time slots in 12-hour format, e.g. "9:30 AM". */
const TIME_SLOTS: string[] = (() => {
  const slots: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const period = h < 12 ? "AM" : "PM";
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      slots.push(`${hour12}:${m.toString().padStart(2, "0")} ${period}`);
    }
  }
  return slots;
})();

function formatDate(d?: Date): string | null {
  if (!d) return null;
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Date + time picker for scheduling rides. Two side-by-side rounded cards
 * (date via Popover+Calendar, time via a Popover with a scrollable slot list),
 * behind a Now / Schedule toggle.
 */
export function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  className,
}: DateTimePickerProps) {
  const [mode, setMode] = React.useState<"now" | "schedule">(
    date || time ? "schedule" : "now",
  );
  const [dateOpen, setDateOpen] = React.useState(false);
  const [timeOpen, setTimeOpen] = React.useState(false);

  // Keep toggle in sync when a date/time is set externally.
  React.useEffect(() => {
    if (date || time) setMode("schedule");
  }, [date, time]);

  const switchMode = (m: "now" | "schedule") => {
    setMode(m);
    if (m === "now") {
      onDateChange?.(undefined);
      onTimeChange?.("");
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div
        role="tablist"
        aria-label="Departure mode"
        className="flex items-center gap-1 rounded-full border border-border bg-card p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "now"}
          onClick={() => switchMode("now")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            mode === "now"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Zap className="size-3.5" aria-hidden />
          Now
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "schedule"}
          onClick={() => switchMode("schedule")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            mode === "schedule"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <CalendarDays className="size-3.5" aria-hidden />
          Schedule
        </button>
      </div>

      {mode === "schedule" && (
        <div className="grid grid-cols-2 gap-3">
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-full flex-col items-start gap-1 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <CalendarDays className="size-3.5" aria-hidden />
                  Date
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    date ? "text-card-foreground" : "text-muted-foreground",
                  )}
                >
                  {formatDate(date) ?? "Select date"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  onDateChange?.(d);
                  setDateOpen(false);
                }}
                disabled={(d) =>
                  d < new Date(new Date().setHours(0, 0, 0, 0))
                }
                autoFocus
              />
            </PopoverContent>
          </Popover>

          <Popover open={timeOpen} onOpenChange={setTimeOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-full flex-col items-start gap-1 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden />
                  Time
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    time ? "text-card-foreground" : "text-muted-foreground",
                  )}
                >
                  {time ?? "Select time"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] min-w-[10rem] p-0"
              align="start"
            >
              <div className="max-h-64 overflow-y-auto p-1">
                {TIME_SLOTS.map((slot) => {
                  const selected = slot === time;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        onTimeChange?.(slot);
                        setTimeOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        selected
                          ? "bg-primary/10 text-primary"
                          : "text-card-foreground",
                      )}
                    >
                      {slot}
                      {selected && <Check className="size-3.5" aria-hidden />}
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
