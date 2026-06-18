"use client";

import * as React from "react";
import { Package, Route, Save, UserCheck, type LucideIcon } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { accentSoft, type Accent } from "@/components/eer/accents";

export type CancellationPolicyService = "One-way" | "Chauffeur" | "Package";

export interface CancellationPolicyTier {
  service: CancellationPolicyService;
  /** Minutes a rider can cancel for free before pickup. */
  freeWindowMin: number;
  /** Percentage of fare charged as a late fee. */
  lateFeePct: number;
  /** Minimum late fee in USD. */
  minFeeUsd: number;
  /** Whether the system auto-issues a refund for the remaining amount. */
  autoRefund: boolean;
  notes: string;
}

const serviceMeta: Record<
  CancellationPolicyService,
  { accent: Accent; icon: LucideIcon; blurb: string }
> = {
  "One-way": {
    accent: "brand",
    icon: Route,
    blurb: "Standard point-to-point rides",
  },
  Chauffeur: {
    accent: "magenta",
    icon: UserCheck,
    blurb: "Hourly chauffeur bookings",
  },
  Package: {
    accent: "amber",
    icon: Package,
    blurb: "Package & courier delivery",
  },
};

const defaultTiers: CancellationPolicyTier[] = [
  {
    service: "One-way",
    freeWindowMin: 5,
    lateFeePct: 50,
    minFeeUsd: 5,
    autoRefund: true,
    notes:
      "Free up to 5 min after driver assignment. After that, 50% of fare (min $5) is charged; remaining balance auto-refunded to original payment method.",
  },
  {
    service: "Chauffeur",
    freeWindowMin: 120,
    lateFeePct: 30,
    minFeeUsd: 35,
    autoRefund: true,
    notes:
      "Chauffeur bookings require 2h notice. Within 2h, 30% late fee applies (min $35). No-shows are charged the full hourly minimum.",
  },
  {
    service: "Package",
    freeWindowMin: 30,
    lateFeePct: 25,
    minFeeUsd: 8,
    autoRefund: false,
    notes:
      "Couriers may be re-routed if cancelled within 30 min. 25% restocking fee applies (min $8). Refunds issued manually after courier return verified.",
  },
];

interface TierEditorProps {
  tier: CancellationPolicyTier;
  onSave?: (tier: CancellationPolicyTier) => void;
}

function TierEditor({ tier, onSave }: TierEditorProps) {
  const meta = serviceMeta[tier.service];
  const Icon = meta.icon;
  const [form, setForm] = React.useState<CancellationPolicyTier>(tier);
  const [saving, setSaving] = React.useState(false);

  const update = <K extends keyof CancellationPolicyTier>(
    key: K,
    value: CancellationPolicyTier[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    setSaving(true);
    onSave?.(form);
    window.setTimeout(() => setSaving(false), 600);
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-lg",
              accentSoft[meta.accent],
            )}
          >
            <Icon className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">{tier.service}</CardTitle>
            <CardDescription>{meta.blurb}</CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge
            variant="outline"
            className={cn("border-transparent", accentSoft[meta.accent])}
          >
            Policy
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor={`free-${tier.service}`}
              className="text-xs font-medium text-muted-foreground"
            >
              Free window (min)
            </Label>
            <Input
              id={`free-${tier.service}`}
              type="number"
              min={0}
              inputMode="numeric"
              value={form.freeWindowMin}
              onChange={(e) =>
                update("freeWindowMin", Number(e.target.value) || 0)
              }
              className="font-mono"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor={`pct-${tier.service}`}
              className="text-xs font-medium text-muted-foreground"
            >
              Late fee (%)
            </Label>
            <div className="relative">
              <Input
                id={`pct-${tier.service}`}
                type="number"
                min={0}
                max={100}
                inputMode="numeric"
                value={form.lateFeePct}
                onChange={(e) =>
                  update("lateFeePct", Number(e.target.value) || 0)
                }
                className="pl-7 font-mono"
              />
              <span
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-muted-foreground"
                aria-hidden
              >
                %
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor={`min-${tier.service}`}
              className="text-xs font-medium text-muted-foreground"
            >
              Min fee ($)
            </Label>
            <div className="relative">
              <Input
                id={`min-${tier.service}`}
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                value={form.minFeeUsd}
                onChange={(e) =>
                  update("minFeeUsd", Number(e.target.value) || 0)
                }
                className="pl-7 font-mono"
              />
              <span
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-muted-foreground"
                aria-hidden
              >
                $
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
          <div className="leading-tight">
            <p className="text-sm font-medium text-foreground">
              Auto-refund remaining balance
            </p>
            <p className="text-xs text-muted-foreground">
              Issue an automatic refund for the uncharged portion.
            </p>
          </div>
          <Switch
            checked={form.autoRefund}
            onCheckedChange={(v) => update("autoRefund", v)}
            aria-label={`Auto-refund for ${tier.service}`}
          />
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <Label
            htmlFor={`notes-${tier.service}`}
            className="text-xs font-medium text-muted-foreground"
          >
            Policy notes
          </Label>
          <Textarea
            id={`notes-${tier.service}`}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="min-h-20 text-sm"
            placeholder="Describe when fees apply, edge cases, refund flow…"
          />
        </div>

        <div className="mt-5 flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
            <Save className="size-4" />
            {saving ? "Saving…" : "Save policy"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface CancellationPolicyEditorProps {
  tiers?: CancellationPolicyTier[];
  onSave?: (tier: CancellationPolicyTier) => void;
  className?: string;
}

export function CancellationPolicyEditor({
  tiers = defaultTiers,
  onSave,
  className,
}: CancellationPolicyEditorProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3",
        className,
      )}
    >
      {tiers.map((tier) => (
        <TierEditor key={tier.service} tier={tier} onSave={onSave} />
      ))}
    </div>
  );
}

export default CancellationPolicyEditor;
