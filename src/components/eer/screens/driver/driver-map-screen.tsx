"use client";

import { useState } from "react";
import {
  Car,
  ChevronLeft,
  CircleDot,
  Clock,
  Flag,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Star,
  UserCheck,
} from "lucide-react";
import { StatusBadge } from "@/components/eer/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pickupPath = "M 60 360 C 120 300, 160 260, 220 240 S 320 180, 340 110";
const dropoffPath = "M 60 110 C 110 160, 160 200, 220 220 S 320 290, 340 360";

export function DriverMapScreen() {
  const [pickedUp, setPickedUp] = useState(false);

  const statusLabel = pickedUp ? "Picked up" : "En route to pickup";
  const eta = pickedUp ? "9 min" : "3 min";
  const distance = pickedUp ? "2.4 mi" : "0.8 mi";
  const activePath = pickedUp ? dropoffPath : pickupPath;

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Map area */}
      <div className="relative flex-1 overflow-hidden bg-[oklch(0.28_0.04_255)]">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(oklch(1_0_0/0.08)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Route line */}
        <svg
          viewBox="0 0 380 420"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full"
          aria-hidden
        >
          <path
            d={activePath}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="2 10"
            opacity={0.95}
          />
        </svg>

        {/* Driver position (origin) */}
        <div className="absolute bottom-[16%] left-[14%] flex flex-col items-center">
          <span className="relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/25">
            <Car className="size-5 fill-current" aria-hidden />
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
          </span>
        </div>

        {/* Target pin (pickup or destination) */}
        <div className="absolute top-[14%] right-[18%] flex flex-col items-center">
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-full shadow-lg ring-4",
              pickedUp
                ? "bg-amber text-amber-foreground ring-amber/25"
                : "bg-cyan text-cyan-foreground ring-cyan/25",
            )}
          >
            {pickedUp ? (
              <MapPin className="size-4 fill-current" aria-hidden />
            ) : (
              <CircleDot className="size-4" aria-hidden />
            )}
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
          <StatusBadge
            tone={pickedUp ? "success" : "brand"}
            dot
            className="bg-card text-card-foreground shadow-md"
          >
            {statusLabel}
          </StatusBadge>
          <div className="ml-auto flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-card-foreground shadow-md">
            <Clock className="size-3.5 text-primary" aria-hidden />
            {eta} · {distance}
          </div>
        </header>
      </div>

      {/* Bottom sheet */}
      <div className="space-y-4 rounded-t-3xl border-t border-border bg-card px-5 pt-4 pb-6 shadow-2xl">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-muted" />

        {/* Customer mini-card */}
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
            JD
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-card-foreground">Jane Doe</p>
              <span className="inline-flex items-center gap-0.5 text-sm text-muted-foreground">
                <Star className="size-3.5 fill-gold text-gold" aria-hidden />
                4.9
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Ride #EER-4821</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              {pickedUp ? "Dropoff in" : "Pickup in"}
            </p>
            <p className="text-2xl font-semibold text-card-foreground">
              {eta}
            </p>
          </div>
        </div>

        {/* Pickup / Dropoff addresses */}
        <div className="flex gap-3 rounded-2xl border border-border bg-background p-3.5">
          <div className="flex flex-col items-center pt-1">
            <CircleDot className="size-3.5 text-primary" aria-hidden />
            <span className="my-1 h-6 w-px border-l border-dashed border-border" />
            <MapPin className="size-3.5 text-amber" aria-hidden />
          </div>
          <div className="flex-1 space-y-2">
            <div>
              <p className="text-[11px] text-muted-foreground">Pickup</p>
              <p className="text-sm font-medium text-card-foreground">
                124 Riverside Ave, Cambridge
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Destination</p>
              <p className="text-sm font-medium text-card-foreground">
                Eagle Tower, Downtown
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button className="h-12">
            <Navigation className="size-4" aria-hidden />
            Navigate
          </Button>
          <button
            type="button"
            aria-label="Call customer"
            className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-background py-2.5 text-xs font-medium text-card-foreground transition-colors hover:bg-accent"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Phone className="size-4" aria-hidden />
            </span>
            Call
          </button>
          <button
            type="button"
            aria-label="Message customer"
            className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-background py-2.5 text-xs font-medium text-card-foreground transition-colors hover:bg-accent"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-cyan/15 text-cyan">
              <MessageSquare className="size-4" aria-hidden />
            </span>
            Message
          </button>
        </div>

        {/* Status action */}
        {pickedUp ? (
          <Button className="h-11 w-full bg-success text-success-foreground hover:bg-success/90">
            <Flag className="size-4" aria-hidden />
            Complete ride
          </Button>
        ) : (
          <Button
            variant="outline"
            className="h-11 w-full border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
            onClick={() => setPickedUp(true)}
          >
            <UserCheck className="size-4" aria-hidden />
            Mark rider picked up
          </Button>
        )}
      </div>
    </div>
  );
}
