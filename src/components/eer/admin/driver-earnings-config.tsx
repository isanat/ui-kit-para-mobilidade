"use client";

import * as React from "react";
import { Percent, Save } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export interface DriverEarningTier {
  id: string;
  label: string;
  enabled: boolean;
  driverPercentage: number;
}

export interface DriverEarningsConfig {
  tiers: DriverEarningTier[];
  defaultPercentage: number;
}

interface DriverEarningsConfigProps {
  className?: string;
  onSave?: (config: DriverEarningsConfig) => void;
}

const defaultTiers: DriverEarningTier[] = [
  {
    id: "oneway-blacksuv",
    label: "One Way — Black SUV",
    enabled: true,
    driverPercentage: 75,
  },
  {
    id: "oneway-black",
    label: "One Way — Black",
    enabled: true,
    driverPercentage: 78,
  },
  {
    id: "chauffeur",
    label: "Chauffeur Service",
    enabled: true,
    driverPercentage: 70,
  },
  {
    id: "package",
    label: "Package Delivery",
    enabled: false,
    driverPercentage: 80,
  },
];

const DEFAULT_DEFAULT_PERCENTAGE = 75;

export function DriverEarningsConfig({
  className,
  onSave,
}: DriverEarningsConfigProps) {
  const [tiers, setTiers] = React.useState<DriverEarningTier[]>(defaultTiers);
  const [defaultPercentage, setDefaultPercentage] = React.useState(
    DEFAULT_DEFAULT_PERCENTAGE,
  );
  const [saving, setSaving] = React.useState(false);

  const updateTier = (id: string, patch: Partial<DriverEarningTier>) => {
    setTiers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  };

  const handleSave = () => {
    setSaving(true);
    onSave?.({ tiers, defaultPercentage });
    window.setTimeout(() => setSaving(false), 600);
  };

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-success/15 text-success">
            <Percent className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Driver earnings</CardTitle>
            <CardDescription>
              Set the percentage of each fare that drivers keep per service
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 pt-4">
        <div className="hidden grid-cols-[minmax(0,1fr)_auto_auto] gap-3 px-1 text-[10px] tracking-wider text-muted-foreground uppercase sm:grid">
          <span>Service</span>
          <span className="w-16 text-center">Enabled</span>
          <span className="w-28 text-right">Driver %</span>
        </div>

        <div className="flex flex-col gap-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "grid grid-cols-1 gap-3 rounded-xl border border-border bg-muted/20 p-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center",
                !tier.enabled && "opacity-60",
              )}
            >
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-medium text-foreground">
                  {tier.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tier.enabled
                    ? `Driver keeps ${tier.driverPercentage}% of each fare`
                    : "Disabled — falls back to default"}
                </p>
              </div>

              <div className="flex w-full items-center justify-between gap-2 sm:w-16 sm:justify-center">
                <Label
                  htmlFor={`tier-enabled-${tier.id}`}
                  className="text-[11px] text-muted-foreground sm:hidden"
                >
                  Enabled
                </Label>
                <Switch
                  id={`tier-enabled-${tier.id}`}
                  checked={tier.enabled}
                  onCheckedChange={(next) =>
                    updateTier(tier.id, { enabled: next })
                  }
                  aria-label={`Toggle earnings for ${tier.label}`}
                />
              </div>

              <div className="flex w-full items-center justify-between gap-2 sm:w-28 sm:justify-end">
                <Label
                  htmlFor={`tier-pct-${tier.id}`}
                  className="text-[11px] text-muted-foreground sm:hidden"
                >
                  Driver %
                </Label>
                <div className="relative w-24">
                  <Input
                    id={`tier-pct-${tier.id}`}
                    type="number"
                    min={0}
                    max={100}
                    value={tier.driverPercentage}
                    disabled={!tier.enabled}
                    onChange={(e) => {
                      const next = Number(e.target.value);
                      if (Number.isNaN(next)) return;
                      updateTier(tier.id, {
                        driverPercentage: Math.min(100, Math.max(0, next)),
                      });
                    }}
                    className="pr-7 font-mono tabular-nums disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                    %
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-muted/30 p-3">
          <div className="leading-tight">
            <p className="text-sm font-medium text-foreground">
              Default percentage
            </p>
            <p className="text-xs text-muted-foreground">
              Applied to services without an explicit override
            </p>
          </div>
          <div className="relative w-28">
            <Input
              id="driver-pct-default"
              type="number"
              min={0}
              max={100}
              value={defaultPercentage}
              onChange={(e) => {
                const next = Number(e.target.value);
                if (Number.isNaN(next)) return;
                setDefaultPercentage(Math.min(100, Math.max(0, next)));
              }}
              className="pr-7 font-mono tabular-nums"
              aria-label="Default driver percentage"
            />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs font-medium text-muted-foreground">
              %
            </span>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
            <Save className="size-4" />
            {saving ? "Saving…" : "Save earnings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DriverEarningsConfig;
