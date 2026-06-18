"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ChevronLeft,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Landmark,
  Star,
  Wallet,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { SectionLabel } from "@/components/eer/section-label";
import { StatusBadge } from "@/components/eer/status-badge";
import { Button } from "@/components/ui/button";
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
  { rides: string; earnings: string; tips: string; hours: string }
> = {
  today: { rides: "8", earnings: "$214.50", tips: "$26.00", hours: "5h 20m" },
  week: { rides: "42", earnings: "$1,182.40", tips: "$148.50", hours: "31h" },
  month: { rides: "168", earnings: "$4,612.80", tips: "$520.00", hours: "128h" },
};

const weekData = [
  { day: "Mon", earnings: 1860 },
  { day: "Tue", earnings: 2120 },
  { day: "Wed", earnings: 1740 },
  { day: "Thu", earnings: 2480 },
  { day: "Fri", earnings: 3120 },
  { day: "Sat", earnings: 3380 },
  { day: "Sun", earnings: 2240 },
];

const chartConfig: ChartConfig = {
  earnings: {
    label: "Earnings",
    color: "var(--primary)",
  },
};

type PayoutStatus = "paid" | "pending";

type Payout = {
  id: string;
  date: string;
  amount: string;
  method: "Bank" | "Card";
  status: PayoutStatus;
};

const payouts: Payout[] = [
  {
    id: "1",
    date: "Apr 10, 2025",
    amount: "$420.00",
    method: "Bank",
    status: "paid",
  },
  {
    id: "2",
    date: "Apr 7, 2025",
    amount: "$280.50",
    method: "Card",
    status: "paid",
  },
  {
    id: "3",
    date: "Apr 11, 2025",
    amount: "$184.20",
    method: "Bank",
    status: "pending",
  },
  {
    id: "4",
    date: "Apr 3, 2025",
    amount: "$310.00",
    method: "Bank",
    status: "paid",
  },
];

export function DriverEarningsScreen() {
  const [period, setPeriod] = useState<Period>("week");
  const stats = statsByPeriod[period];

  const miniStats = [
    {
      id: "rides",
      label: "Rides",
      value: stats.rides,
      icon: Star,
      accent: "text-primary",
    },
    {
      id: "earnings",
      label: "Earnings",
      value: stats.earnings,
      icon: DollarSign,
      accent: "text-success",
    },
    {
      id: "tips",
      label: "Tips",
      value: stats.tips,
      icon: Star,
      accent: "text-gold",
    },
    {
      id: "hours",
      label: "Online hours",
      value: stats.hours,
      icon: Clock,
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
        <h1 className="font-semibold text-foreground">Earnings</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Balance card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.4_0.18_268)] p-5 text-white shadow-lg">
          <div className="absolute -top-12 -right-12 size-44 rounded-full bg-white/15 blur-2xl" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/20">
                <Wallet className="size-5" aria-hidden />
              </span>
              <StatusBadge className="bg-white/15 text-white">
                Available
              </StatusBadge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/80">Available balance</p>
              <p className="text-3xl font-semibold tracking-tight">
                $1,284.50
              </p>
              <p className="text-xs text-white/75">
                Pending payouts · $184.20 (clears in 2 days)
              </p>
            </div>
            <Button
              className="h-11 w-full bg-white text-primary hover:bg-white/90"
            >
              <Download className="size-4" aria-hidden />
              Withdraw
            </Button>
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
        <section className="grid grid-cols-2 gap-3">
          {miniStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5"
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-xl bg-muted",
                    stat.accent,
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Bar chart */}
        <section className="space-y-3">
          <SectionLabel>Earnings · this week</SectionLabel>
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
                  dataKey="earnings"
                  fill="var(--color-earnings)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={26}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </section>

        {/* Recent payouts */}
        <section className="space-y-3">
          <SectionLabel>Recent payouts</SectionLabel>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {payouts.map((payout, index) => {
              const MethodIcon = payout.method === "Bank" ? Landmark : CreditCard;
              return (
                <div
                  key={payout.id}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5",
                    index !== payouts.length - 1 &&
                      "border-b border-border",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-xl",
                      payout.method === "Bank"
                        ? "bg-cyan/15 text-cyan"
                        : "bg-magenta/15 text-magenta",
                    )}
                  >
                    <MethodIcon className="size-4" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">
                      {payout.method} payout
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payout.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-card-foreground">
                      {payout.amount}
                    </span>
                    <StatusBadge
                      tone={payout.status === "paid" ? "success" : "amber"}
                    >
                      {payout.status === "paid" ? "Paid" : "Pending"}
                    </StatusBadge>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="driver" active="Earnings" />
    </div>
  );
}
