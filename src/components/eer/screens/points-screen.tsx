"use client";

import { useState } from "react";
import {
  ChevronLeft,
  Crown,
  Gift,
  Star,
  TrendingUp,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { EmptyState } from "@/components/eer/empty-state";
import { FilterChips } from "@/components/eer/forms";
import { SectionLabel } from "@/components/eer/section-label";

type EarnRow = {
  id: string;
  label: string;
  points: number;
  icon: LucideIcon;
};

const earnWays: EarnRow[] = [
  { id: "book", label: "Book a ride", points: 10, icon: TrendingUp },
  { id: "rate", label: "Rate your driver", points: 5, icon: Star },
  { id: "refer", label: "Refer a friend", points: 500, icon: UserPlus },
  { id: "complete", label: "Complete 10 rides", points: 100, icon: Crown },
];

type HistoryEntry = {
  id: string;
  description: string;
  date: string;
  delta: number;
};

const history: HistoryEntry[] = [
  { id: "1", description: "Ride to Eagle Tower", date: "Apr 12, 2025", delta: 10 },
  { id: "2", description: "Rated Sofia Alvarez", date: "Apr 12, 2025", delta: 5 },
  { id: "3", description: "Redeemed $5 ride credit", date: "Apr 8, 2025", delta: -50 },
  { id: "4", description: "Friend joined Eagle Eye", date: "Apr 5, 2025", delta: 500 },
  { id: "5", description: "Ride to Logan Airport", date: "Apr 3, 2025", delta: 10 },
  { id: "6", description: "Completed 10 rides", date: "Mar 28, 2025", delta: 100 },
  { id: "7", description: "Redeemed $10 ride credit", date: "Mar 20, 2025", delta: -100 },
];

const TOTAL_POINTS = 2450;
const TIER_FLOOR = 2000;
const TIER_CEIL = 3000;
const progressPct = Math.round(
  ((TOTAL_POINTS - TIER_FLOOR) / (TIER_CEIL - TIER_FLOOR)) * 100,
);

export function PointsScreen() {
  const [filter, setFilter] = useState<string>("");

  const visibleHistory = history.filter((entry) => {
    if (!filter) return true;
    if (filter === "Earned") return entry.delta > 0;
    if (filter === "Redeemed") return entry.delta < 0;
    return true;
  });

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
        <h1 className="font-semibold text-foreground">Points</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Hero balance card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold to-[oklch(0.45_0.14_85)] p-5 text-white shadow-lg">
          <div className="absolute -top-12 -right-12 size-44 rounded-full bg-white/15 blur-2xl" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/20 ring-1 ring-inset ring-white/30">
                <Crown className="size-5 text-white" aria-hidden />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                Gold tier
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/80">Your balance</p>
              <p className="text-4xl font-semibold tracking-tight text-white">
                {TOTAL_POINTS.toLocaleString("en-US")}{" "}
                <span className="text-lg font-medium text-white/80">pts</span>
              </p>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs text-white/80">
                <span>Gold</span>
                <span>550 pts to Platinum</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ways to earn */}
        <section className="space-y-3">
          <SectionLabel>Ways to earn</SectionLabel>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {earnWays.map((row, index) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.id}
                  className={`flex items-center gap-3 px-4 py-3.5 ${
                    index !== earnWays.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <span className="flex size-9 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <p className="flex-1 text-sm font-medium text-card-foreground">
                    {row.label}
                  </p>
                  <span className="text-sm font-semibold text-gold">
                    +{row.points}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Points history */}
        <section className="space-y-3">
          <SectionLabel>Points history</SectionLabel>
          <FilterChips
            options={["Earned", "Redeemed"]}
            value={filter}
            onChange={setFilter}
          />
          {visibleHistory.length === 0 ? (
            <EmptyState
              icon={Gift}
              title="No history yet"
              description="Earn and redeem points to see activity here."
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {visibleHistory.map((entry, index) => {
                const positive = entry.delta > 0;
                return (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-3 px-4 py-3.5 ${
                      index !== visibleHistory.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <span
                      className={`flex size-9 items-center justify-center rounded-xl ${
                        positive
                          ? "bg-success/15 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {positive ? (
                        <TrendingUp className="size-4" aria-hidden />
                      ) : (
                        <Gift className="size-4" aria-hidden />
                      )}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {entry.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.date}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        positive ? "text-success" : "text-card-foreground"
                      }`}
                    >
                      {positive ? "+" : ""}
                      {entry.delta}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="user" active="Profile" />
    </div>
  );
}
