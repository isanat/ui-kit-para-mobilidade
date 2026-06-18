"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChevronLeft,
  Clock,
  DollarSign,
  Heart,
  Star,
  TrendingUp,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { SectionLabel } from "@/components/eer/section-label";
import { StatusBadge } from "@/components/eer/status-badge";
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

type Period = "today" | "week" | "month";

const periods: { id: Period; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
];

const statsByPeriod: Record<
  Period,
  { total: string; count: string; avg: string; best: string; bestDay: string }
> = {
  today: {
    total: "$26.00",
    count: "6",
    avg: "$4.33",
    best: "$8.00",
    bestDay: "5:42 PM",
  },
  week: {
    total: "$148.50",
    count: "42",
    avg: "$3.54",
    best: "$34.00",
    bestDay: "Saturday",
  },
  month: {
    total: "$520.00",
    count: "168",
    avg: "$3.10",
    best: "$112.00",
    bestDay: "Apr 12",
  },
};

const weekData = [
  { day: "Mon", tips: 1240 },
  { day: "Tue", tips: 1860 },
  { day: "Wed", tips: 1480 },
  { day: "Thu", tips: 2120 },
  { day: "Fri", tips: 2680 },
  { day: "Sat", tips: 3400 },
  { day: "Sun", tips: 2030 },
];

const chartConfig: ChartConfig = {
  tips: {
    label: "Tips",
    color: "var(--gold)",
  },
};

type TipEntry = {
  id: string;
  rider: string;
  rideId: string;
  date: string;
  amount: string;
};

const recentTips: TipEntry[] = [
  {
    id: "1",
    rider: "Olivia Bennett",
    rideId: "#EER-4821",
    date: "Today, 14:32",
    amount: "+$5.00",
  },
  {
    id: "2",
    rider: "Daniel Carter",
    rideId: "#EER-4815",
    date: "Today, 12:08",
    amount: "+$3.50",
  },
  {
    id: "3",
    rider: "Priya Shah",
    rideId: "#EER-4802",
    date: "Today, 09:51",
    amount: "+$8.00",
  },
  {
    id: "4",
    rider: "Lucas Romero",
    rideId: "#EER-4791",
    date: "Yesterday, 22:14",
    amount: "+$2.00",
  },
  {
    id: "5",
    rider: "Mei Tanaka",
    rideId: "#EER-4778",
    date: "Yesterday, 19:30",
    amount: "+$6.50",
  },
];

export function DriverTipsReportScreen() {
  const [period, setPeriod] = useState<Period>("week");
  const stats = statsByPeriod[period];

  const miniStats: {
    id: string;
    label: string;
    value: string;
    sub?: string;
    icon: typeof DollarSign;
    accent: string;
  }[] = [
    {
      id: "total",
      label: "Total tips",
      value: stats.total,
      icon: DollarSign,
      accent: "text-gold",
    },
    {
      id: "avg",
      label: "Avg per ride",
      value: stats.avg,
      icon: TrendingUp,
      accent: "text-success",
    },
    {
      id: "best",
      label: "Best day",
      value: stats.best,
      sub: stats.bestDay,
      icon: Star,
      accent: "text-cyan",
    },
  ];

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
        <button
          type="button"
          aria-label="Go back"
          className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <h1 className="font-semibold text-foreground">Tips report</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Balance card — gold gradient */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold to-[oklch(0.62_0.14_85)] p-5 text-white shadow-lg">
          <div className="absolute -top-12 -right-12 size-44 rounded-full bg-white/15 blur-2xl" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/20">
                <Heart className="size-5" aria-hidden />
              </span>
              <StatusBadge className="bg-white/15 text-white">
                This {period === "today" ? "day" : period}
              </StatusBadge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/80">Total tips earned</p>
              <p className="text-3xl font-bold tracking-tight">{stats.total}</p>
              <p className="text-xs text-white/80">
                From {stats.count} rated rides · avg {stats.avg} per ride
              </p>
            </div>
          </div>
        </section>

        {/* Period segmented control */}
        <section>
          <div className="flex gap-1 rounded-xl bg-muted p-1">
            {periods.map((p) => {
              const isActive = period === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPeriod(p.id)}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Stats grid */}
        <section className="grid grid-cols-3 gap-3">
          {miniStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3 text-center"
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-xl bg-muted",
                    stat.accent,
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <p className="text-base font-semibold text-card-foreground">
                  {stat.value}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {stat.label}
                </p>
                {stat.sub && (
                  <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
                )}
              </div>
            );
          })}
        </section>

        {/* Bar chart */}
        <section className="space-y-3">
          <SectionLabel>Tips · this week</SectionLabel>
          <div className="rounded-2xl border border-border bg-card p-4">
            <ChartContainer config={chartConfig} className="h-[180px] w-full">
              <BarChart
                data={weekData}
                margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
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
                  fontSize={11}
                />
                <Bar
                  dataKey="tips"
                  fill="var(--color-tips)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={26}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </section>

        {/* Recent tips */}
        <section className="space-y-3">
          <SectionLabel
            action={
              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline"
              >
                See all
              </button>
            }
          >
            Recent tips
          </SectionLabel>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {recentTips.map((tip, index) => (
              <div
                key={tip.id}
                className={cn(
                  "flex items-center gap-3 px-4 py-3",
                  index !== recentTips.length - 1 && "border-b border-border",
                )}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {tip.rider
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-card-foreground">
                    {tip.rider}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3" aria-hidden />
                    {tip.rideId} · {tip.date}
                  </p>
                </div>
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Heart className="size-3.5 fill-gold" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-gold">
                  {tip.amount}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="driver" active="Earnings" />
    </div>
  );
}
