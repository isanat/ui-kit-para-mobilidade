"use client";

import * as React from "react";
import { Car, MapPin, Navigation, RefreshCw, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type DriverMapStatus = "available" | "in_ride" | "offline";

export interface AvailableDriver {
  id: string;
  name: string;
  initials: string;
  vehicle: string;
  status: DriverMapStatus;
  /** Horizontal position on the map, 0-100 (percent). */
  x: number;
  /** Vertical position on the map, 0-100 (percent). */
  y: number;
}

const defaultDrivers: AvailableDriver[] = [
  {
    id: "drv-1820",
    name: "Marcus Reed",
    initials: "MR",
    vehicle: "Tesla Model 3 · Black",
    status: "available",
    x: 28,
    y: 32,
  },
  {
    id: "drv-2241",
    name: "Sofia Alvarez",
    initials: "SA",
    vehicle: "Cadillac XT5 · Black SUV",
    status: "in_ride",
    x: 62,
    y: 22,
  },
  {
    id: "drv-3088",
    name: "Liam Chen",
    initials: "LC",
    vehicle: "Lexus ES · Luxury",
    status: "available",
    x: 44,
    y: 58,
  },
  {
    id: "drv-4471",
    name: "Aisha Khan",
    initials: "AK",
    vehicle: "Toyota Camry · Comfort",
    status: "available",
    x: 74,
    y: 48,
  },
  {
    id: "drv-5520",
    name: "Diego Santos",
    initials: "DS",
    vehicle: "Honda Odyssey · Package",
    status: "in_ride",
    x: 18,
    y: 72,
  },
  {
    id: "drv-6012",
    name: "Hannah Kowalski",
    initials: "HK",
    vehicle: "Mercedes E-Class · Black",
    status: "offline",
    x: 84,
    y: 78,
  },
];

const statusDot: Record<DriverMapStatus, string> = {
  available: "bg-success",
  in_ride: "bg-amber",
  offline: "bg-muted-foreground",
};

const statusTone: Record<DriverMapStatus, Tone> = {
  available: "success",
  in_ride: "amber",
  offline: "muted",
};

const statusLabel: Record<DriverMapStatus, string> = {
  available: "Available",
  in_ride: "In ride",
  offline: "Offline",
};

interface DriversAvailableMapProps {
  drivers?: AvailableDriver[];
  onDispatch?: (driver: AvailableDriver) => void;
  className?: string;
}

export function DriversAvailableMap({
  drivers = defaultDrivers,
  onDispatch,
  className,
}: DriversAvailableMapProps) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [tick, setTick] = React.useState(0);

  const availableCount = drivers.filter((d) => d.status === "available").length;
  const inRideCount = drivers.filter((d) => d.status === "in_ride").length;

  const handleRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      setTick((t) => t + 1);
    }, 700);
  };

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Navigation className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Available drivers</CardTitle>
            <CardDescription>
              Live dispatch board — Boston metro area
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              <span className="font-mono tabular-nums">{availableCount}</span>
              live
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-1.5"
            >
              <RefreshCw
                className={cn("size-3.5", refreshing && "animate-spin")}
                aria-hidden
              />
              Refresh
            </Button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-5">
        {/* Map */}
        <div
          key={tick}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-[oklch(0.3_0.05_255)]"
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(oklch(1_0_0/0.08)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
          {/* Soft radial highlight to suggest a city center */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.4_0.08_255/0.4),transparent_60%)]" />

          {/* A few faux street lines for atmosphere */}
          <svg
            className="absolute inset-0 size-full opacity-30"
            aria-hidden
            viewBox="0 0 100 56"
            preserveAspectRatio="none"
          >
            <path
              d="M0 18 H100 M0 38 H100 M22 0 V56 M58 0 V56 M80 0 V56"
              stroke="oklch(1 0 0 / 0.12)"
              strokeWidth="0.4"
              fill="none"
            />
          </svg>

          {/* Map pin: a "you are here" admin marker in the center */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 flex size-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <span className="absolute size-3 animate-ping rounded-full bg-primary/40" />
            <span className="size-2.5 rounded-full bg-primary ring-2 ring-primary/30" />
          </div>

          {/* Driver pins */}
          {drivers.map((driver) => {
            const tooltipUp = driver.y > 50;
            return (
              <div
                key={driver.id}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${driver.x}%`, top: `${driver.y}%` }}
              >
                <button
                  type="button"
                  aria-label={`${driver.name} — ${statusLabel[driver.status]}`}
                  className={cn(
                    "relative flex size-8 items-center justify-center rounded-full border text-foreground shadow-md transition-transform group-hover:scale-110",
                    driver.status === "offline"
                      ? "border-border bg-muted/80 text-muted-foreground"
                      : "border-card bg-card",
                  )}
                >
                  <Car className="size-4" aria-hidden />
                  <span
                    className={cn(
                      "absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full ring-2 ring-card",
                      statusDot[driver.status],
                    )}
                    aria-hidden
                  />
                </button>

                {/* Tooltip */}
                <div
                  className={cn(
                    "pointer-events-none absolute left-1/2 z-20 w-max max-w-[200px] -translate-x-1/2 rounded-lg border border-border bg-popover px-3 py-2 text-left opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100",
                    tooltipUp ? "bottom-full mb-2" : "top-full mt-2",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-foreground">
                      {driver.name}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {driver.vehicle}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span
                      className={cn("size-1.5 rounded-full", statusDot[driver.status])}
                      aria-hidden
                    />
                    {statusLabel[driver.status]}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card/80 px-3 py-1.5 backdrop-blur-sm">
            <LegendItem color="bg-success" label="Available" />
            <LegendItem color="bg-amber" label="In ride" />
            <LegendItem color="bg-muted-foreground" label="Offline" />
          </div>

          {/* Count badge top-right */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-border bg-card/80 px-2.5 py-1 text-[11px] text-muted-foreground backdrop-blur-sm">
            <MapPin className="size-3 text-primary" aria-hidden />
            <span className="font-mono tabular-nums">{drivers.length}</span> on map
          </div>
        </div>

        {/* Compact dispatch list */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Dispatch queue
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-mono tabular-nums text-success">{availableCount}</span> available ·{" "}
              <span className="font-mono tabular-nums text-amber">{inRideCount}</span> in ride
            </p>
          </div>

          <div className="flex flex-col divide-y divide-border rounded-xl border border-border">
            {drivers.map((driver) => {
              const isAvailable = driver.status === "available";
              return (
                <div
                  key={driver.id}
                  className="flex items-center gap-3 px-3 py-2.5"
                >
                  <Avatar className="size-9 ring-1 ring-border">
                    <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                      {driver.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 leading-tight">
                    <p className="truncate text-sm font-medium text-foreground">
                      {driver.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {driver.vehicle}
                    </p>
                  </div>
                  <StatusBadge tone={statusTone[driver.status]} dot>
                    {statusLabel[driver.status]}
                  </StatusBadge>
                  <Button
                    size="sm"
                    variant={isAvailable ? "default" : "outline"}
                    disabled={!isAvailable}
                    onClick={() => onDispatch?.(driver)}
                    className="gap-1.5"
                  >
                    <Send className="size-3.5" aria-hidden />
                    Dispatch
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
      <span className={cn("size-2 rounded-full", color)} aria-hidden />
      {label}
    </span>
  );
}

export default DriversAvailableMap;
