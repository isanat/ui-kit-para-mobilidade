"use client";

import * as React from "react";
import {
  Megaphone,
  Eye,
  MousePointerClick,
  DollarSign,
  CalendarClock,
  MapPin,
  Users,
  Pencil,
  Trash2,
  Play,
  Pause as PauseIcon,
  TrendingUp,
} from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/eer/status-badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { AdRow, AdStatus } from "@/components/eer/admin/ad-card";
import type { Tone } from "@/components/eer/accents";

/** Single day in the impressions time-series shown on the detail card. */
export interface AdImpressionPoint {
  day: string;
  impressions: number;
}

export type AdAudience = "All users" | "Frequent riders" | "New users";

export interface AdSchedule {
  start: string;
  end: string;
}

export interface AdTargeting {
  regions: string[];
  audiences: AdAudience[];
}

/**
 * Full detail payload for a single advertisement, extending the list-row
 * AdRow with the time-series + schedule + targeting only the detail page
 * has access to.
 */
export interface AdDetail extends AdRow {
  description?: string;
  cost: number;
  daysRunning: number;
  timeseries: AdImpressionPoint[];
  schedule: AdSchedule;
  targeting: AdTargeting;
}

const statusTone: Record<AdStatus, Tone> = {
  Active: "success",
  Paused: "muted",
  Scheduled: "cyan",
};

const audienceTone: Record<AdAudience, Tone> = {
  "All users": "muted",
  "Frequent riders": "magenta",
  "New users": "cyan",
};

const chartConfig: ChartConfig = {
  impressions: {
    label: "Impressions",
    color: "var(--magenta)",
  },
};

const defaultAd: AdDetail = {
  id: "ad-9281",
  title: "Weekend brunch at the Harbor",
  advertiser: "Boston Harbor Hotel",
  placement: "Home banner",
  status: "Active",
  impressions: 48230,
  clicks: 1864,
  active: true,
  gradient: "from-primary/30 via-cyan/25 to-magenta/30",
  description:
    "Reserve a table at the Rowes Wharf restaurant — bottomless mimosas every Saturday and Sunday from 11am.",
  cost: 41.58,
  daysRunning: 7,
  schedule: { start: "Jun 8, 2025", end: "Jun 22, 2025" },
  targeting: {
    regions: ["Boston", "Seaport"],
    audiences: ["Frequent riders", "New users"],
  },
  timeseries: [
    { day: "Mon", impressions: 5120 },
    { day: "Tue", impressions: 6240 },
    { day: "Wed", impressions: 5890 },
    { day: "Thu", impressions: 7310 },
    { day: "Fri", impressions: 9870 },
    { day: "Sat", impressions: 8430 },
    { day: "Sun", impressions: 5370 },
  ],
};

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

interface AdDetailCardProps {
  ad?: AdDetail;
  onEdit?: (id: string) => void;
  onToggleActive?: (id: string, next: boolean) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export function AdDetailCard({
  ad = defaultAd,
  onEdit,
  onToggleActive,
  onDelete,
  className,
}: AdDetailCardProps) {
  const [active, setActive] = React.useState(ad.active);

  React.useEffect(() => {
    setActive(ad.active);
  }, [ad.active]);

  const handleToggle = (next: boolean) => {
    setActive(next);
    onToggleActive?.(ad.id, next);
  };

  const ctr =
    ad.impressions > 0
      ? ((ad.clicks / ad.impressions) * 100).toFixed(2)
      : "0.00";

  return (
    <Card className={cn("overflow-hidden rounded-2xl", className)}>
      {/* Hero — reuse the gradient thumbnail pattern from AdCard. */}
      <div
        className={cn(
          "relative flex h-36 items-center justify-center bg-gradient-to-br",
          ad.gradient ?? "from-primary/30 via-cyan/25 to-magenta/30",
        )}
      >
        <Megaphone className="size-10 text-foreground/80" aria-hidden />
        <div className="absolute top-3 left-3">
          <Badge
            variant="outline"
            className="border-white/15 bg-black/30 text-white backdrop-blur"
          >
            {ad.placement}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge
            tone={statusTone[ad.status]}
            dot={ad.status === "Active"}
          >
            {ad.status}
          </StatusBadge>
        </div>
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
          <div className="leading-tight">
            <h2 className="text-lg font-semibold text-white drop-shadow-sm">
              {ad.title}
            </h2>
            <p className="text-xs text-white/80">{ad.advertiser}</p>
          </div>
          <span className="rounded-full bg-black/30 px-2.5 py-1 font-mono text-[11px] text-white/90 backdrop-blur">
            #{ad.id}
          </span>
        </div>
      </div>

      <CardContent className="flex flex-col gap-6 pt-6">
        {ad.description && (
          <p className="text-sm text-muted-foreground">{ad.description}</p>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <StatTile
            icon={Eye}
            label="Impressions"
            value={formatNumber(ad.impressions)}
          />
          <StatTile
            icon={MousePointerClick}
            label="Clicks"
            value={formatNumber(ad.clicks)}
          />
          <StatTile icon={TrendingUp} label="CTR" value={`${ctr}%`} />
          <StatTile
            icon={DollarSign}
            label="Cost"
            value={`$${ad.cost.toFixed(2)}`}
          />
          <StatTile
            icon={CalendarClock}
            label="Days running"
            value={String(ad.daysRunning)}
          />
        </div>

        <Separator />

        {/* Performance chart */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="leading-tight">
              <h3 className="text-sm font-semibold text-foreground">
                Impressions
              </h3>
              <p className="text-xs text-muted-foreground">
                Last {ad.timeseries.length} days
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-transparent bg-magenta/15 text-magenta"
            >
              Live
            </Badge>
          </div>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[180px] w-full"
          >
            <LineChart
              data={ad.timeseries}
              margin={{ left: 0, right: 12, top: 8, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="var(--border)"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={40}
                tickMargin={4}
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickFormatter={(value: number) => formatNumber(value)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value) => (
                      <span className="font-mono font-medium text-foreground tabular-nums">
                        {Number(value).toLocaleString("en-US")}
                      </span>
                    )}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="var(--color-impressions)"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-impressions)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ChartContainer>
        </div>

        <Separator />

        {/* Schedule */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            <CalendarClock className="size-3.5" aria-hidden />
            Schedule
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm">
            <span className="font-mono tabular-nums text-foreground">
              {ad.schedule.start}
            </span>
            <span className="text-muted-foreground">→</span>
            <span className="font-mono tabular-nums text-foreground">
              {ad.schedule.end}
            </span>
          </div>
        </div>

        {/* Placement + targeting */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              <Megaphone className="size-3.5" aria-hidden />
              Placement
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge
                variant="outline"
                className="border-transparent bg-magenta/15 text-magenta"
              >
                {ad.placement}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              <Users className="size-3.5" aria-hidden />
              Targeting
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {ad.targeting.regions.map((r) => (
                <Badge
                  key={r}
                  variant="outline"
                  className="border-border bg-muted/60 text-foreground"
                >
                  <MapPin className="size-3" aria-hidden />
                  {r}
                </Badge>
              ))}
              {ad.targeting.audiences.map((a) => (
                <StatusBadge key={a} tone={audienceTone[a]}>
                  {a}
                </StatusBadge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Button
          variant="outline"
          onClick={() => onEdit?.(ad.id)}
          className="gap-1.5"
        >
          <Pencil className="size-4" aria-hidden />
          Edit
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 leading-tight">
            <span className="text-xs font-medium text-muted-foreground">
              {active ? "Active" : "Paused"}
            </span>
            <Switch
              checked={active}
              onCheckedChange={handleToggle}
              aria-label={active ? "Pause ad" : "Activate ad"}
            />
          </div>
          <Button
            size="sm"
            variant={active ? "outline" : "default"}
            onClick={() => handleToggle(!active)}
            className="gap-1.5"
          >
            {active ? (
              <>
                <PauseIcon className="size-3.5" aria-hidden />
                Pause
              </>
            ) : (
              <>
                <Play className="size-3.5" aria-hidden />
                Activate
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => onDelete?.(ad.id)}
            className="gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="size-4" aria-hidden />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

interface StatTileProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function StatTile({ icon: Icon, label, value }: StatTileProps) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-muted/40 px-3 py-2.5">
      <span className="inline-flex items-center gap-1 text-[10px] tracking-wider text-muted-foreground uppercase">
        <Icon className="size-3" aria-hidden />
        {label}
      </span>
      <span className="font-mono text-base font-semibold text-foreground tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default AdDetailCard;
