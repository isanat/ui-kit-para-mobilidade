"use client";

import {
  Car,
  ChevronLeft,
  CircleDot,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
  Star,
  X,
} from "lucide-react";
import { StatusBadge } from "@/components/eer/status-badge";
import { Button } from "@/components/ui/button";

const routePath =
  "M 60 360 C 120 280, 160 240, 200 220 S 280 160, 320 90";

export function MapViewScreen() {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Map area */}
      <div className="relative flex-1 overflow-hidden bg-[oklch(0.28_0.04_255)]">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(oklch(1_0_0/0.08)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Route line + pins */}
        <svg
          viewBox="0 0 380 420"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          aria-hidden
        >
          <path
            d={routePath}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="2 10"
            opacity={0.95}
          />
        </svg>

        {/* Pickup pin (start) */}
        <div className="absolute bottom-[18%] left-[14%] flex flex-col items-center">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/25">
            <CircleDot className="size-4" aria-hidden />
          </span>
        </div>

        {/* Destination pin (end) */}
        <div className="absolute top-[14%] right-[18%] flex flex-col items-center">
          <span className="flex size-9 items-center justify-center rounded-full bg-amber text-amber-foreground shadow-lg ring-4 ring-amber/25">
            <MapPin className="size-4 fill-current" aria-hidden />
          </span>
        </div>

        {/* Driver car icon mid-route */}
        <div className="absolute top-[42%] left-[44%] -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/25">
            <Car className="size-5 fill-current" aria-hidden />
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
          </span>
        </div>

        {/* Top floating bar */}
        <header className="absolute inset-x-0 top-0 flex items-center gap-3 px-5 pt-6">
          <button
            type="button"
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full bg-card text-foreground shadow-md"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <StatusBadge tone="brand" dot className="bg-card text-card-foreground shadow-md">
            En route
          </StatusBadge>
          <div className="ml-auto flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-card-foreground shadow-md">
            <Clock className="size-3.5 text-primary" aria-hidden />
            ETA 4 min
          </div>
        </header>
      </div>

      {/* Bottom sheet */}
      <div className="space-y-4 rounded-t-3xl border-t border-border bg-card px-5 pt-4 pb-6 shadow-2xl">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-muted" />

        {/* Driver mini-card */}
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
            MR
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-card-foreground">Marcus Reed</p>
              <span className="inline-flex items-center gap-0.5 text-sm text-muted-foreground">
                <Star className="size-3.5 fill-gold text-gold" aria-hidden />
                4.9
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tesla Model 3 · EAG-4821
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Arriving in</p>
            <p className="text-2xl font-semibold text-card-foreground">
              4 min
            </p>
          </div>
        </div>

        {/* Action row */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-background py-3 text-xs font-medium text-card-foreground transition-colors hover:bg-accent"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Phone className="size-4" aria-hidden />
            </span>
            Call
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-background py-3 text-xs font-medium text-card-foreground transition-colors hover:bg-accent"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-cyan/15 text-cyan">
              <MessageSquare className="size-4" aria-hidden />
            </span>
            Message
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-background py-3 text-xs font-medium text-card-foreground transition-colors hover:bg-accent"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-magenta/15 text-magenta">
              <Share2 className="size-4" aria-hidden />
            </span>
            Share trip
          </button>
        </div>

        <Button
          variant="ghost"
          className="h-11 w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="size-4" aria-hidden />
          Cancel ride
        </Button>
      </div>
    </div>
  );
}
