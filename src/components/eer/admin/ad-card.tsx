"use client";

import * as React from "react";
import { Megaphone, MousePointerClick, Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/eer/status-badge";

export type AdStatus = "Active" | "Paused" | "Scheduled";

export type AdPlacement =
  | "Home banner"
  | "Ride list"
  | "Reservation page"
  | "In-ride"
  | "Directions sidebar";

export interface AdRow {
  id: string;
  title: string;
  advertiser: string;
  placement: AdPlacement;
  status: AdStatus;
  impressions: number;
  clicks: number;
  active: boolean;
  /** Tailwind gradient classes used for the thumbnail placeholder. */
  gradient?: string;
}

interface AdCardProps {
  ad: AdRow;
  onToggle?: (id: string, next: boolean) => void;
  className?: string;
}

const statusTone = {
  Active: "success",
  Paused: "muted",
  Scheduled: "cyan",
} as const;

const defaultGradient =
  "from-primary/30 via-cyan/25 to-magenta/30";

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function AdCard({ ad, onToggle, className }: AdCardProps) {
  const [active, setActive] = React.useState(ad.active);

  const handleToggle = (next: boolean) => {
    setActive(next);
    onToggle?.(ad.id, next);
  };

  const ctr =
    ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : "0.00";

  return (
    <Card className={cn("overflow-hidden rounded-2xl", className)}>
      <div
        className={cn(
          "relative flex h-28 items-center justify-center bg-gradient-to-br",
          ad.gradient ?? defaultGradient,
        )}
      >
        <Megaphone className="size-8 text-foreground/80" aria-hidden />
        <div className="absolute top-3 left-3">
          <Badge
            variant="outline"
            className="border-white/15 bg-black/30 text-white backdrop-blur"
          >
            {ad.placement}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge tone={statusTone[ad.status]} dot={ad.status === "Active"}>
            {ad.status}
          </StatusBadge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-base">{ad.title}</CardTitle>
        <CardDescription>{ad.advertiser}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-muted/40 p-3">
          <Stat
            icon={Eye}
            label="Impressions"
            value={formatNumber(ad.impressions)}
          />
          <Stat
            icon={MousePointerClick}
            label="Clicks"
            value={formatNumber(ad.clicks)}
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
              CTR
            </span>
            <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
              {ctr}%
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="leading-tight">
            <p className="text-sm font-medium text-foreground">
              {active ? "Live" : "Paused"}
            </p>
            <p className="text-xs text-muted-foreground">
              Toggle to {active ? "pause" : "resume"} this ad
            </p>
          </div>
          <Switch
            checked={active}
            onCheckedChange={handleToggle}
            aria-label={`Toggle ${ad.title} active state`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface StatProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function Stat({ icon: Icon, label, value }: StatProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="inline-flex items-center gap-1 text-[10px] tracking-wider text-muted-foreground uppercase">
        <Icon className="size-3" aria-hidden />
        {label}
      </span>
      <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default AdCard;
