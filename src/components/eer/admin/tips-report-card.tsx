"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { HandCoins, Star, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface TipsDataPoint {
  day: string;
  /** Total tips collected that day, in USD. */
  tips: number;
}

export interface TopTipper {
  id: string;
  name: string;
  initials: string;
  totalTipped: string;
  rides: number;
}

interface StatTileProps {
  label: string;
  value: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

function StatTile({ label, value, hint, icon: Icon, accent }: StatTileProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/30 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-lg",
            accent,
          )}
        >
          <Icon className="size-3.5" aria-hidden />
        </span>
      </div>
      <div className="leading-tight">
        <p className="font-mono text-xl font-semibold text-foreground tabular-nums">
          {value}
        </p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </div>
  );
}

const defaultData: TipsDataPoint[] = [
  { day: "Mon", tips: 184 },
  { day: "Tue", tips: 246 },
  { day: "Wed", tips: 198 },
  { day: "Thu", tips: 312 },
  { day: "Fri", tips: 478 },
  { day: "Sat", tips: 612 },
  { day: "Sun", tips: 388 },
];

const defaultTippers: TopTipper[] = [
  {
    id: "tt-1",
    name: "Olivia Bennett",
    initials: "OB",
    totalTipped: "$184.00",
    rides: 12,
  },
  {
    id: "tt-2",
    name: "Liam Walsh",
    initials: "LW",
    totalTipped: "$142.50",
    rides: 9,
  },
  {
    id: "tt-3",
    name: "Aaliyah Washington",
    initials: "AW",
    totalTipped: "$98.20",
    rides: 7,
  },
  {
    id: "tt-4",
    name: "Daniel Cho",
    initials: "DC",
    totalTipped: "$76.00",
    rides: 5,
  },
];

const chartConfig: ChartConfig = {
  tips: {
    label: "Tips",
    color: "var(--gold)",
  },
};

interface TipsReportCardProps {
  data?: TipsDataPoint[];
  toppers?: TopTipper[];
  className?: string;
}

export function TipsReportCard({
  data = defaultData,
  toppers = defaultTippers,
  className,
}: TipsReportCardProps) {
  const [period, setPeriod] = React.useState("7d");

  const totalTips = React.useMemo(
    () => data.reduce((sum, d) => sum + d.tips, 0),
    [data],
  );

  const avgPerRide = React.useMemo(() => {
    const totalRides = toppers.reduce((s, t) => s + t.rides, 0);
    if (totalRides === 0) return 0;
    return totalTips / Math.max(totalRides, 1);
  }, [totalTips, toppers]);

  const topTipper = toppers[0];

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gold/20 text-gold">
            <HandCoins className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Tips report</CardTitle>
            <CardDescription>Gratuity performance &amp; top tippers</CardDescription>
          </div>
        </div>
        <CardAction>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger size="sm" className="w-32" aria-label="Select period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last quarter</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatTile
            label="Total tips"
            value={`$${totalTips.toLocaleString()}`}
            hint="Across all completed rides"
            icon={HandCoins}
            accent="bg-gold/20 text-gold"
          />
          <StatTile
            label="Avg / ride"
            value={`$${avgPerRide.toFixed(2)}`}
            hint="Mean gratuity per ride"
            icon={TrendingUp}
            accent="bg-success/15 text-success"
          />
          <StatTile
            label="Top tipper"
            value={topTipper?.totalTipped ?? "$0.00"}
            hint={topTipper?.name ?? "—"}
            icon={Star}
            accent="bg-primary/15 text-primary"
          />
        </div>

        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">
              Daily tips (last 7 days)
            </p>
            <span className="text-xs text-muted-foreground">USD</span>
          </div>
          <ChartContainer
            config={chartConfig}
            className="w-full"
            style={{ height: 220 }}
          >
            <BarChart
              data={data}
              margin={{ left: 4, right: 8, top: 8, bottom: 0 }}
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
                width={44}
                tickMargin={4}
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickFormatter={(value: number) => `$${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value) => (
                      <span className="font-mono font-medium text-foreground tabular-nums">
                        ${Number(value).toLocaleString()}
                      </span>
                    )}
                  />
                }
              />
              <Bar
                dataKey="tips"
                fill="var(--color-tips)"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ChartContainer>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Top tippers</p>
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
            {toppers.map((tipper, idx) => (
              <li
                key={tipper.id}
                className="flex items-center gap-3 bg-card px-4 py-2.5 transition-colors hover:bg-muted/40"
              >
                <span
                  className="w-4 shrink-0 text-center font-mono text-xs text-muted-foreground tabular-nums"
                  aria-hidden
                >
                  {idx + 1}
                </span>
                <Avatar className="size-8 ring-1 ring-border">
                  <AvatarFallback className="bg-gold/20 text-xs font-semibold text-gold">
                    {tipper.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-sm font-medium text-foreground">
                      {tipper.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tipper.rides} tipped rides
                    </p>
                  </div>
                  <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                    {tipper.totalTipped}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default TipsReportCard;
