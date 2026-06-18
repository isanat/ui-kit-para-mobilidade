"use client";

import * as React from "react";
import {
  BarChart3,
  Eye,
  MousePointerClick,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

/**
 * One day of aggregate ad performance. Each AdStatPoint contributes both
 * an impressions and a clicks reading to the combined area chart.
 */
export interface AdStatPoint {
  day: string;
  impressions: number;
  clicks: number;
}

/** Top-performing ad row used by the mini table at the bottom. */
export interface AdPerfRow {
  id: string;
  title: string;
  impressions: number;
  clicks: number;
}

type Period = "7d" | "30d" | "90d";

const chartConfig: ChartConfig = {
  impressions: {
    label: "Impressions",
    color: "var(--magenta)",
  },
  clicks: {
    label: "Clicks",
    color: "var(--cyan)",
  },
};

// 14 days of sample data. We render the same dataset across all period tabs
// for the demo but the period selection drives the headline stat tiles
// (which scale with the selected period).
const defaultTimeseries: AdStatPoint[] = [
  { day: "Jun 01", impressions: 4200, clicks: 142 },
  { day: "Jun 02", impressions: 5180, clicks: 176 },
  { day: "Jun 03", impressions: 4890, clicks: 161 },
  { day: "Jun 04", impressions: 6020, clicks: 218 },
  { day: "Jun 05", impressions: 7340, clicks: 285 },
  { day: "Jun 06", impressions: 9180, clicks: 392 },
  { day: "Jun 07", impressions: 8450, clicks: 364 },
  { day: "Jun 08", impressions: 6120, clicks: 241 },
  { day: "Jun 09", impressions: 5340, clicks: 198 },
  { day: "Jun 10", impressions: 6780, clicks: 254 },
  { day: "Jun 11", impressions: 8120, clicks: 312 },
  { day: "Jun 12", impressions: 9870, clicks: 421 },
  { day: "Jun 13", impressions: 11240, clicks: 506 },
  { day: "Jun 14", impressions: 10480, clicks: 467 },
];

const defaultTopAds: AdPerfRow[] = [
  { id: "ad-9281", title: "Weekend brunch at the Harbor", impressions: 48230, clicks: 1864 },
  { id: "ad-9268", title: "Legal Sea Foods — Lunch combo", impressions: 38940, clicks: 1492 },
  { id: "ad-9244", title: "Seaport shuttle promo", impressions: 31210, clicks: 1087 },
  { id: "ad-9219", title: "Cambridge Bookshop — 20% off", impressions: 24860, clicks: 942 },
  { id: "ad-9201", title: "Fenway Park — Game-day rides", impressions: 21340, clicks: 728 },
];

const periodMultiplier: Record<Period, number> = {
  "7d": 1,
  "30d": 4.3,
  "90d": 12.9,
};

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function formatCurrency(n: number) {
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

interface AdStatisticsCardProps {
  className?: string;
  data?: AdStatPoint[];
  topAds?: AdPerfRow[];
}

export function AdStatisticsCard({
  className,
  data = defaultTimeseries,
  topAds = defaultTopAds,
}: AdStatisticsCardProps) {
  const [period, setPeriod] = React.useState<Period>("30d");
  const multiplier = periodMultiplier[period];

  // Compute headline totals from the timeseries, scaled by the selected
  // period — a real implementation would fetch fresh data per period.
  const totals = React.useMemo(() => {
    const baseImpressions = data.reduce((sum, p) => sum + p.impressions, 0);
    const baseClicks = data.reduce((sum, p) => sum + p.clicks, 0);
    const impressions = Math.round(baseImpressions * multiplier);
    const clicks = Math.round(baseClicks * multiplier);
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const spend = clicks * 0.42 + impressions * 0.0011;
    return { impressions, clicks, ctr, spend };
  }, [data, multiplier]);

  const topRowsWithCtr = React.useMemo(
    () =>
      topAds
        .map((a) => ({
          ...a,
          ctr:
            a.impressions > 0 ? (a.clicks / a.impressions) * 100 : 0,
        }))
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 5),
    [topAds],
  );

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-magenta/15 text-magenta">
            <BarChart3 className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Ad statistics</CardTitle>
            <CardDescription>
              Aggregate performance across all active placements
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <Tabs
            value={period}
            onValueChange={(v) => setPeriod(v as Period)}
          >
            <TabsList>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-6">
        {/* Headline stat tiles */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile
            icon={Eye}
            label="Total impressions"
            value={formatNumber(totals.impressions)}
            tone="magenta"
          />
          <StatTile
            icon={MousePointerClick}
            label="Total clicks"
            value={formatNumber(totals.clicks)}
            tone="cyan"
          />
          <StatTile
            icon={TrendingUp}
            label="Avg CTR"
            value={`${totals.ctr.toFixed(2)}%`}
            tone="brand"
          />
          <StatTile
            icon={DollarSign}
            label="Total spend"
            value={formatCurrency(totals.spend)}
            tone="success"
          />
        </div>

        {/* Combined area chart */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="leading-tight">
              <h3 className="text-sm font-semibold text-foreground">
                Impressions &amp; clicks
              </h3>
              <p className="text-xs text-muted-foreground">
                Last {data.length} days · {period} window
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-[2px] bg-[var(--magenta)]" />
                Impressions
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-[2px] bg-[var(--cyan)]" />
                Clicks
              </span>
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[260px] w-full"
          >
            <AreaChart
              data={data}
              margin={{ left: 0, right: 12, top: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="ad-stat-impressions"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-impressions)"
                    stopOpacity={0.45}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-impressions)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
                <linearGradient
                  id="ad-stat-clicks"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-clicks)"
                    stopOpacity={0.45}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-clicks)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
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
                fontSize={11}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={44}
                tickMargin={4}
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickFormatter={(value: number) => formatNumber(value)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value, name) => (
                      <span className="font-mono font-medium text-foreground tabular-nums">
                        {Number(value).toLocaleString()}{" "}
                        <span className="text-muted-foreground">{name}</span>
                      </span>
                    )}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="impressions"
                stroke="var(--color-impressions)"
                strokeWidth={2}
                fill="url(#ad-stat-impressions)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-impressions)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="var(--color-clicks)"
                strokeWidth={2}
                fill="url(#ad-stat-clicks)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--color-clicks)",
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Top performing ads */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="leading-tight">
              <h3 className="text-sm font-semibold text-foreground">
                Top performing ads
              </h3>
              <p className="text-xs text-muted-foreground">
                By impressions · top 5
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-transparent bg-magenta/15 text-magenta"
            >
              {topRowsWithCtr.length} ads
            </Badge>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground px-4 text-xs tracking-wider uppercase">
                    Ad
                  </TableHead>
                  <TableHead className="text-muted-foreground px-4 text-right text-xs tracking-wider uppercase">
                    Impressions
                  </TableHead>
                  <TableHead className="text-muted-foreground px-4 text-right text-xs tracking-wider uppercase">
                    Clicks
                  </TableHead>
                  <TableHead className="text-muted-foreground px-4 text-right text-xs tracking-wider uppercase">
                    CTR
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topRowsWithCtr.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className="border-border hover:bg-muted/50"
                  >
                    <TableCell className="px-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex size-6 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold",
                            index === 0
                              ? "bg-magenta/15 text-magenta"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {index + 1}
                        </span>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-medium text-foreground">
                            {row.title}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            #{row.id}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 text-right font-mono text-sm font-medium text-foreground tabular-nums">
                      {row.impressions.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 text-right font-mono text-sm text-muted-foreground tabular-nums">
                      {row.clicks.toLocaleString()}
                    </TableCell>
                    <TableCell className="px-4 text-right">
                      <Badge
                        variant="outline"
                        className="border-transparent bg-magenta/15 text-magenta"
                      >
                        {row.ctr.toFixed(2)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatTileProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: "magenta" | "cyan" | "brand" | "success";
}

function StatTile({ icon: Icon, label, value, tone }: StatTileProps) {
  const toneClass = {
    magenta: "bg-magenta/15 text-magenta",
    cyan: "bg-cyan/15 text-cyan",
    brand: "bg-primary/15 text-primary",
    success: "bg-success/15 text-success",
  }[tone];

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-3 py-3">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          toneClass,
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5 leading-tight">
        <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
          {label}
        </span>
        <span className="font-mono text-base font-semibold text-foreground tabular-nums">
          {value}
        </span>
      </div>
    </div>
  );
}

export default AdStatisticsCard;
