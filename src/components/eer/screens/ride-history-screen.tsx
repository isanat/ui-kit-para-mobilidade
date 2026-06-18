"use client";

import { useState } from "react";
import {
  ChevronLeft,
  Clock,
  MapPin,
  RotateCcw,
  Star,
  X,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { StatusBadge } from "@/components/eer/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RideStatus = "completed" | "cancelled";

type Ride = {
  id: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  fare: string;
  status: RideStatus;
  driver: string;
  rating: number;
};

const rides: Ride[] = [
  {
    id: "1",
    pickup: "124 Riverside Ave",
    destination: "Eagle Tower, Downtown",
    date: "Apr 10, 2025",
    time: "14:32",
    fare: "$12.40",
    status: "completed",
    driver: "Marcus Reed",
    rating: 4.9,
  },
  {
    id: "2",
    pickup: "The Plaza Hotel",
    destination: "JFK Airport, Terminal 4",
    date: "Apr 8, 2025",
    time: "06:15",
    fare: "$58.20",
    status: "completed",
    driver: "Aisha Khan",
    rating: 5.0,
  },
  {
    id: "3",
    pickup: "Brooklyn Botanic Garden",
    destination: "Williamsburg",
    date: "Apr 5, 2025",
    time: "19:48",
    fare: "$0.00",
    status: "cancelled",
    driver: "—",
    rating: 0,
  },
  {
    id: "4",
    pickup: "Eagle Tower",
    destination: "Madison Square Garden",
    date: "Apr 2, 2025",
    time: "20:10",
    fare: "$19.80",
    status: "completed",
    driver: "Liam Chen",
    rating: 4.8,
  },
  {
    id: "5",
    pickup: "Home",
    destination: "Central Park West",
    date: "Mar 28, 2025",
    time: "10:05",
    fare: "$8.90",
    status: "completed",
    driver: "Sofia Alvarez",
    rating: 4.9,
  },
];

type Filter = "all" | "completed" | "cancelled";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export function RideHistoryScreen() {
  const [filter, setFilter] = useState<Filter>("all");

  const visibleRides = rides.filter((r) =>
    filter === "all" ? true : r.status === filter,
  );

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
        <h1 className="font-semibold text-foreground">Your rides</h1>
      </header>

      {/* Filter chips */}
      <div className="flex gap-2 border-b border-border bg-card px-5 py-3">
        {filters.map((f) => {
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {visibleRides.map((ride) => (
          <article
            key={ride.id}
            className="space-y-3 rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" aria-hidden />
                {ride.date} · {ride.time}
              </div>
              <StatusBadge
                tone={ride.status === "completed" ? "success" : "muted"}
              >
                {ride.status === "completed" ? "Completed" : "Cancelled"}
              </StatusBadge>
            </div>

            {/* Route */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center pt-1">
                <span className="size-2 rounded-full bg-primary" />
                <span className="my-1 h-8 w-px border-l border-dashed border-border" />
                <MapPin className="size-3.5 text-amber" aria-hidden />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Pickup</p>
                  <p className="text-sm font-medium text-card-foreground">
                    {ride.pickup}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Destination</p>
                  <p className="text-sm font-medium text-card-foreground">
                    {ride.destination}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-2">
                {ride.status === "completed" ? (
                  <>
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                      {ride.driver
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs font-medium text-card-foreground">
                        {ride.driver}
                      </p>
                      <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
                        <Star className="size-3 fill-gold text-gold" aria-hidden />
                        {ride.rating.toFixed(1)}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <X className="size-3.5" aria-hidden />
                    Ride was cancelled
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-card-foreground">
                  {ride.fare}
                </span>
                <Button variant="outline" size="sm" className="h-8 gap-1.5">
                  <RotateCcw className="size-3.5" aria-hidden />
                  Rebook
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <BottomNav className="sticky bottom-0" active="Account" />
    </div>
  );
}
