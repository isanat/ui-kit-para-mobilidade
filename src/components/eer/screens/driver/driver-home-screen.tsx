"use client";

import { useState } from "react";
import {
  Bell,
  Car,
  ChevronRight,
  CircleDot,
  Clock,
  DollarSign,
  MapPin,
  Navigation,
  Star,
} from "lucide-react";
import Image from "next/image";
import { BottomNav } from "@/components/eer/bottom-nav";
import { EmptyState } from "@/components/eer/empty-state";
import { SectionLabel } from "@/components/eer/section-label";
import { StatusBadge } from "@/components/eer/status-badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const stats = [
  { id: "rides", label: "Rides", value: "8", icon: Car, accent: "text-primary" },
  {
    id: "earnings",
    label: "Earnings",
    value: "$214.50",
    icon: DollarSign,
    accent: "text-success",
  },
  {
    id: "hours",
    label: "Online hours",
    value: "5h 20m",
    icon: Clock,
    accent: "text-cyan",
  },
];

const recentTrips = [
  {
    id: "1",
    rider: "Jane Doe",
    initials: "JD",
    route: "Back Bay → Logan Airport",
    fare: "$28.40",
    time: "14:32",
  },
  {
    id: "2",
    rider: "Mark Liu",
    initials: "ML",
    route: "Kendall Sq → Seaport",
    fare: "$12.80",
    time: "13:05",
  },
  {
    id: "3",
    rider: "Olivia Pratt",
    initials: "OP",
    route: "Fenway → Beacon Hill",
    fare: "$9.20",
    time: "11:48",
  },
];

export function DriverHomeScreen() {
  const [online, setOnline] = useState(true);

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Custom gradient header w/ online toggle */}
      <header className="rounded-b-3xl bg-gradient-to-br from-primary to-[oklch(0.4_0.18_268)] px-5 pt-6 pb-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black ring-1 ring-inset ring-white/25">
              <Image
                src="/eagle-logo-dark.png"
                alt="Eagle Eye Rides logo"
                fill
                sizes="44px"
                className="object-contain p-1.5"
              />
            </span>
            <div className="leading-tight">
              <p className="text-xs text-white/70">Good evening</p>
              <p className="font-semibold">Marcus Reed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 ring-1 ring-inset ring-white/20">
              <span
                className={cn(
                  "text-xs font-medium",
                  online ? "text-white" : "text-white/70",
                )}
              >
                {online ? "Online" : "Offline"}
              </span>
              <Switch checked={online} onCheckedChange={setOnline} />
            </div>
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex size-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/25"
            >
              <Bell className="size-5" aria-hidden />
              <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-amber ring-2 ring-primary" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Online status banner */}
        <section
          className={cn(
            "flex items-center gap-3 rounded-2xl border p-4 transition-colors",
            online
              ? "border-success/30 bg-success/10"
              : "border-border bg-muted/40",
          )}
        >
          <span className="relative flex size-11 items-center justify-center">
            {online && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/50" />
            )}
            <span
              className={cn(
                "relative flex size-11 items-center justify-center rounded-full",
                online
                  ? "bg-success/20 text-success"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Car className="size-5" aria-hidden />
            </span>
          </span>
          <div className="flex-1">
            <p
              className={cn(
                "text-sm font-semibold",
                online ? "text-success" : "text-muted-foreground",
              )}
            >
              {online ? "You're online — accepting rides" : "You're offline"}
            </p>
            <p className="text-xs text-muted-foreground">
              {online
                ? "We'll notify you when a ride request comes in."
                : "Go online to start receiving ride requests."}
            </p>
          </div>
          <Switch checked={online} onCheckedChange={setOnline} />
        </section>

        {/* Today's stats */}
        <section className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-3.5"
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg bg-muted",
                    stat.accent,
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-base font-semibold text-card-foreground">
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

        {/* Upcoming chauffeur job */}
        <section className="space-y-3">
          <SectionLabel
            action={
              <span className="text-xs font-medium text-primary hover:underline">
                See all
              </span>
            }
          >
            Upcoming
          </SectionLabel>
          <article className="space-y-3 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
                  JD
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-card-foreground">
                    Jane Doe
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Chauffeur · 4h booking
                  </p>
                </div>
              </div>
              <StatusBadge tone="cyan">Business</StatusBadge>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center pt-1">
                <CircleDot className="size-3.5 text-primary" aria-hidden />
                <span className="my-1 h-6 w-px border-l border-dashed border-border" />
                <MapPin className="size-3.5 text-amber" aria-hidden />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-[11px] text-muted-foreground">Pickup</p>
                  <p className="text-sm font-medium text-card-foreground">
                    The Plaza Hotel, 5th Ave
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground">Stops</p>
                  <p className="text-sm font-medium text-card-foreground">
                    2 stops · 4h total
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" aria-hidden />
                Sat, Apr 12 · 10:30 AM
              </span>
              <span className="text-sm font-semibold text-card-foreground">
                $169.00
              </span>
            </div>

            <Button className="h-10 w-full">
              <Navigation className="size-4" aria-hidden />
              Navigate
            </Button>
          </article>
        </section>

        {/* Recent trips */}
        <section className="space-y-3">
          <SectionLabel>Recent trips</SectionLabel>
          {recentTrips.length === 0 ? (
            <EmptyState
              icon={Car}
              title="No trips today yet"
              description="Recent completed trips will show up here."
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {recentTrips.map((trip, index) => (
                <button
                  key={trip.id}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50",
                    index !== recentTrips.length - 1 &&
                      "border-b border-border",
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {trip.initials}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">
                      {trip.rider}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {trip.route}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-sm font-semibold text-card-foreground">
                      {trip.fare}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground">
                      <Star
                        className="size-3 fill-gold text-gold"
                        aria-hidden
                      />
                      {trip.time}
                    </span>
                  </div>
                  <ChevronRight
                    className="size-4 text-muted-foreground"
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="driver" active="Home" />
    </div>
  );
}
