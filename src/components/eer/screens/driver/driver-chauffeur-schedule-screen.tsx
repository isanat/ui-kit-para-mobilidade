"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  CircleDot,
  Clock,
  MapPin,
  Navigation,
  RefreshCw,
  Search,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { EmptyState } from "@/components/eer/empty-state";
import { SectionLabel } from "@/components/eer/section-label";
import { StatusBadge } from "@/components/eer/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ScheduleStatus = "scheduled" | "in-progress" | "completed";

type ChauffeurJob = {
  id: string;
  customer: string;
  initials: string;
  pickup: string;
  date: string;
  time: string;
  duration: string;
  tier: "Business" | "First Class" | "Luxury SUV";
  fare: string;
  status: ScheduleStatus;
};

const jobs: ChauffeurJob[] = [
  {
    id: "1",
    customer: "Jane Doe",
    initials: "JD",
    pickup: "The Plaza Hotel, 5th Ave",
    date: "Sat, Apr 12",
    time: "10:30 AM",
    duration: "4h",
    tier: "Business",
    fare: "$169.00",
    status: "scheduled",
  },
  {
    id: "2",
    customer: "Olivia Pratt",
    initials: "OP",
    pickup: "Boston Harbor Hotel",
    date: "Today",
    time: "2:00 PM",
    duration: "2h",
    tier: "First Class",
    fare: "$189.00",
    status: "in-progress",
  },
  {
    id: "3",
    customer: "Mark Liu",
    initials: "ML",
    pickup: "Kendall Square, Cambridge",
    date: "Apr 9, 2025",
    time: "9:00 AM",
    duration: "8h",
    tier: "Luxury SUV",
    fare: "$299.00",
    status: "completed",
  },
  {
    id: "4",
    customer: "Sofia Alvarez",
    initials: "SA",
    pickup: "Four Seasons, Back Bay",
    date: "Apr 7, 2025",
    time: "6:00 PM",
    duration: "Full day",
    tier: "Luxury SUV",
    fare: "$449.00",
    status: "completed",
  },
];

const statusTone: Record<
  ScheduleStatus,
  "cyan" | "brand" | "muted"
> = {
  scheduled: "cyan",
  "in-progress": "brand",
  completed: "muted",
};

const statusLabel: Record<ScheduleStatus, string> = {
  scheduled: "Scheduled",
  "in-progress": "In progress",
  completed: "Completed",
};

export function DriverChauffeurScheduleScreen() {
  const [status, setStatus] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        const matchesStatus = status === "all" || job.status === status;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          job.customer.toLowerCase().includes(q) ||
          job.pickup.toLowerCase().includes(q);
        return matchesStatus && matchesQuery;
      }),
    [status, query],
  );

  const counts = {
    scheduled: jobs.filter((j) => j.status === "scheduled").length,
    "in-progress": jobs.filter((j) => j.status === "in-progress").length,
    completed: jobs.filter((j) => j.status === "completed").length,
  };
  const todayEarnings = "$189.00";

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
        <h1 className="flex-1 font-semibold text-foreground">
          Chauffeur Schedule
        </h1>
        <button
          type="button"
          aria-label="Refresh"
          className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent"
        >
          <RefreshCw className="size-4" aria-hidden />
        </button>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Stats row */}
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Scheduled</p>
            <p className="mt-1 text-xl font-semibold text-cyan">
              {counts.scheduled}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">In progress</p>
            <p className="mt-1 text-xl font-semibold text-primary">
              {counts["in-progress"]}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="mt-1 text-xl font-semibold text-card-foreground">
              {counts.completed}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Today's earnings</p>
            <p className="mt-1 text-xl font-semibold text-success">
              {todayEarnings}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="flex flex-wrap items-center gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger size="sm" className="h-9 w-[140px] bg-card">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-input bg-card px-3 text-sm text-muted-foreground shadow-xs transition-colors hover:bg-accent"
          >
            <CalendarDays className="size-4" aria-hidden />
            Apr 12
          </button>

          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs"
              className="h-9 bg-card pl-9"
            />
          </div>
        </section>

        {/* Job list */}
        <section className="space-y-3">
          <SectionLabel>Jobs ({filteredJobs.length})</SectionLabel>
          {filteredJobs.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No chauffeur jobs found"
              description="Try adjusting the filters or check back later for new bookings."
            />
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <article
                  key={job.id}
                  className="space-y-3 rounded-2xl border border-border bg-card p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                        {job.initials}
                      </span>
                      <div className="leading-tight">
                        <p className="text-sm font-medium text-card-foreground">
                          {job.customer}
                        </p>
                        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" aria-hidden />
                          {job.date} · {job.time}
                        </p>
                      </div>
                    </div>
                    <StatusBadge tone={statusTone[job.status]}>
                      {statusLabel[job.status]}
                    </StatusBadge>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <CircleDot className="size-3.5 text-primary" aria-hidden />
                      <span className="my-1 h-5 w-px border-l border-dashed border-border" />
                      <MapPin className="size-3.5 text-amber" aria-hidden />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] text-muted-foreground">
                        Pickup
                      </p>
                      <p className="text-sm font-medium text-card-foreground">
                        {job.pickup}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground">
                        {job.duration}
                      </span>
                      <StatusBadge tone="brand">{job.tier}</StatusBadge>
                    </div>
                    <span className="text-sm font-semibold text-card-foreground">
                      {job.fare}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="h-9 flex-1"
                      disabled={job.status === "completed"}
                    >
                      <Navigation className="size-4" aria-hidden />
                      Navigate
                    </Button>
                    <Button
                      variant="outline"
                      className="h-9 flex-1"
                      disabled={job.status === "completed"}
                    >
                      Details
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="driver" active="Schedule" />
    </div>
  );
}
