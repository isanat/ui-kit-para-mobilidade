"use client";

import * as React from "react";
import { Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { accentSoft } from "@/components/eer/accents";

export type SurgeLevel = "none" | "low" | "medium" | "high" | "critical";

export function surgeLevelFor(multiplier: number): SurgeLevel {
  if (multiplier <= 1.0) return "none";
  if (multiplier <= 1.3) return "low";
  if (multiplier <= 1.8) return "medium";
  if (multiplier <= 2.5) return "high";
  return "critical";
}

export function surgeGradient(level: SurgeLevel): string {
  switch (level) {
    case "none":
      return "from-zinc-600 to-zinc-700";
    case "low":
      return "from-emerald-500 to-teal-500";
    case "medium":
      return "from-amber-500 to-yellow-500";
    case "high":
      return "from-orange-500 to-amber-500";
    case "critical":
      return "from-red-600 to-red-500";
  }
}

interface SurgePricingCardProps {
  className?: string;
}

interface ToggleRowProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}

function ToggleRow({ id, label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/30 px-4 py-3">
      <div className="leading-tight">
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function SurgePricingCard({ className }: SurgePricingCardProps) {
  const [enabled, setEnabled] = React.useState(true);
  const [autoSurge, setAutoSurge] = React.useState(false);
  const [multiplier, setMultiplier] = React.useState(1.5);
  const [reason, setReason] = React.useState("Friday evening demand — Back Bay");
  const [baseFare, setBaseFare] = React.useState(12);
  const [distance, setDistance] = React.useState(8);

  const level = surgeLevelFor(multiplier);
  const gradient = surgeGradient(level);

  const estimate = React.useMemo(() => {
    const base = Number.isFinite(baseFare) ? baseFare : 0;
    const dist = Number.isFinite(distance) ? distance : 0;
    const distanceFare = dist * 2.35;
    const subtotal = base + distanceFare;
    return subtotal * multiplier;
  }, [baseFare, distance, multiplier]);

  return (
    <Card className={cn("overflow-hidden rounded-2xl", className)}>
      <div
        className={cn(
          "relative flex flex-col gap-2 bg-gradient-to-br p-5 text-white",
          gradient,
        )}
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase opacity-90">
            <Zap className="size-3.5" aria-hidden />
            Surge: {level}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur",
              enabled ? "bg-white/20" : "bg-black/30",
            )}
          >
            {enabled ? (autoSurge ? "Auto" : "Manual") : "Off"}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight tabular-nums">
            {multiplier.toFixed(1)}×
          </span>
          <span className="text-sm opacity-80">current multiplier</span>
        </div>
      </div>

      <CardHeader className="pb-2 pt-5">
        <CardTitle className="text-base">Surge pricing</CardTitle>
        <CardDescription>
          Dynamically raise fares during high-demand windows
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 pt-2">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ToggleRow
            id="surge-enable"
            label="Enable surge"
            description="Apply multiplier to live fares"
            checked={enabled}
            onChange={setEnabled}
          />
          <ToggleRow
            id="surge-auto"
            label="Auto-surge"
            description="Adjust automatically by demand"
            checked={autoSurge}
            onChange={setAutoSurge}
          />
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="surge-multiplier" className="text-sm font-medium text-foreground">
              Multiplier
            </Label>
            <span
              className={cn(
                "rounded-md px-2 py-0.5 font-mono text-xs font-semibold tabular-nums",
                accentSoft.cyan,
              )}
            >
              {multiplier.toFixed(1)}×
            </span>
          </div>
          <Slider
            id="surge-multiplier"
            value={[multiplier]}
            min={1.0}
            max={5.0}
            step={0.1}
            onValueChange={([v]) => setMultiplier(v)}
          />
          <div className="flex justify-between text-[10px] tracking-wider text-muted-foreground/80 uppercase">
            <span>1.0×</span>
            <span>2.0×</span>
            <span>3.0×</span>
            <span>5.0×</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="surge-reason" className="text-xs font-medium text-muted-foreground">
            Reason
          </Label>
          <Input
            id="surge-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Why is surge active?"
          />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Fare simulator
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="sim-base"
                className="text-[11px] font-medium text-muted-foreground"
              >
                Base fare
              </Label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  $
                </span>
                <Input
                  id="sim-base"
                  type="number"
                  min={0}
                  value={baseFare}
                  onChange={(e) => setBaseFare(Number(e.target.value))}
                  className="pl-7 font-mono tabular-nums"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="sim-distance"
                className="text-[11px] font-medium text-muted-foreground"
              >
                Distance
              </Label>
              <div className="relative">
                <Input
                  id="sim-distance"
                  type="number"
                  min={0}
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="pr-9 font-mono tabular-nums"
                />
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                  mi
                </span>
              </div>
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between rounded-lg bg-background/60 px-3 py-2.5">
            <span className="text-xs text-muted-foreground">
              Estimated surged fare
            </span>
            <span className="font-mono text-lg font-semibold text-foreground tabular-nums">
              ${estimate.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SurgePricingCard;
