"use client";

import * as React from "react";
import { Radio, Save } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export interface DispatchWeights {
  proximity: number;
  rating: number;
  completionRate: number;
}

export interface DispatchConfig {
  enabled: boolean;
  broadcastCount: number;
  offerTimeoutSeconds: number;
  maxCascadeRounds: number;
  maxRadiusKm: number;
  weights: DispatchWeights;
}

interface DispatchConfigCardProps {
  className?: string;
  onSave?: (config: DispatchConfig) => void;
}

const defaultConfig: DispatchConfig = {
  enabled: true,
  broadcastCount: 3,
  offerTimeoutSeconds: 15,
  maxCascadeRounds: 4,
  maxRadiusKm: 12,
  weights: {
    proximity: 0.6,
    rating: 0.25,
    completionRate: 0.4,
  },
};

interface NumberFieldProps {
  id: string;
  label: string;
  description?: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (value: number) => void;
}

function NumberField({
  id,
  label,
  description,
  value,
  min,
  max,
  suffix,
  onChange,
}: NumberFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
          {label}
        </Label>
        {suffix && (
          <span className="text-[10px] tracking-wider text-muted-foreground/80 uppercase">
            {suffix}
          </span>
        )}
      </div>
      <Input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isNaN(next)) return;
          onChange(Math.min(max, Math.max(min, next)));
        }}
        className="font-mono tabular-nums"
      />
      {description && (
        <p className="text-[11px] leading-relaxed text-muted-foreground/80">
          {description}
        </p>
      )}
    </div>
  );
}

interface WeightSliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function WeightSlider({ id, label, value, onChange }: WeightSliderProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </Label>
        <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-semibold text-foreground tabular-nums">
          {value.toFixed(2)}
        </span>
      </div>
      <Slider
        id={id}
        value={[value]}
        min={0}
        max={1}
        step={0.05}
        onValueChange={([v]) => onChange(v)}
      />
    </div>
  );
}

export function DispatchConfigCard({
  className,
  onSave,
}: DispatchConfigCardProps) {
  const [config, setConfig] = React.useState<DispatchConfig>(defaultConfig);
  const [saving, setSaving] = React.useState(false);

  const handleSave = () => {
    setSaving(true);
    onSave?.(config);
    window.setTimeout(() => setSaving(false), 600);
  };

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Radio className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Auto-dispatch</CardTitle>
            <CardDescription>
              Configure how ride offers cascade to nearby drivers
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
              config.enabled
                ? "bg-success/15 text-success"
                : "bg-muted text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                config.enabled ? "bg-success" : "bg-muted-foreground",
              )}
            />
            {config.enabled ? "Live" : "Paused"}
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-5">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/30 px-4 py-3">
          <div className="leading-tight">
            <p className="text-sm font-medium text-foreground">
              Master dispatch
            </p>
            <p className="text-xs text-muted-foreground">
              Enable the auto-dispatch engine for new ride requests
            </p>
          </div>
          <Switch
            checked={config.enabled}
            onCheckedChange={(next) =>
              setConfig((prev) => ({ ...prev, enabled: next }))
            }
            aria-label="Toggle auto-dispatch"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <NumberField
            id="dispatch-broadcast"
            label="Broadcast count"
            description="Drivers notified per round"
            value={config.broadcastCount}
            min={1}
            max={10}
            onChange={(broadcastCount) =>
              setConfig((prev) => ({ ...prev, broadcastCount }))
            }
          />
          <NumberField
            id="dispatch-timeout"
            label="Offer timeout"
            description="Seconds before escalation"
            value={config.offerTimeoutSeconds}
            min={5}
            max={120}
            suffix="sec"
            onChange={(offerTimeoutSeconds) =>
              setConfig((prev) => ({ ...prev, offerTimeoutSeconds }))
            }
          />
          <NumberField
            id="dispatch-cascade"
            label="Max cascade rounds"
            description="Escalation attempts before cancel"
            value={config.maxCascadeRounds}
            min={1}
            max={10}
            onChange={(maxCascadeRounds) =>
              setConfig((prev) => ({ ...prev, maxCascadeRounds }))
            }
          />
          <NumberField
            id="dispatch-radius"
            label="Max radius"
            description="Search radius from pickup"
            value={config.maxRadiusKm}
            min={1}
            max={200}
            suffix="km"
            onChange={(maxRadiusKm) =>
              setConfig((prev) => ({ ...prev, maxRadiusKm }))
            }
          />
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">
                Driver scoring weights
              </p>
              <p className="text-xs text-muted-foreground">
                Relative weights used to rank available drivers
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <WeightSlider
              id="weight-proximity"
              label="Proximity"
              value={config.weights.proximity}
              onChange={(proximity) =>
                setConfig((prev) => ({
                  ...prev,
                  weights: { ...prev.weights, proximity },
                }))
              }
            />
            <WeightSlider
              id="weight-rating"
              label="Rating"
              value={config.weights.rating}
              onChange={(rating) =>
                setConfig((prev) => ({
                  ...prev,
                  weights: { ...prev.weights, rating },
                }))
              }
            />
            <WeightSlider
              id="weight-completion"
              label="Completion rate"
              value={config.weights.completionRate}
              onChange={(completionRate) =>
                setConfig((prev) => ({
                  ...prev,
                  weights: { ...prev.weights, completionRate },
                }))
              }
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
            <Save className="size-4" />
            {saving ? "Saving…" : "Save configuration"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DispatchConfigCard;
