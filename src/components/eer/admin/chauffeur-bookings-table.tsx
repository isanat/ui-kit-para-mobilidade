"use client";

import * as React from "react";
import { Calendar, Crown, Search } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type ChauffeurTier = "Business" | "First" | "Luxury";
export type ChauffeurStatus =
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export interface ChauffeurBooking {
  id: string;
  customer: string;
  chauffeur: string | null;
  tier: ChauffeurTier;
  date: string;
  time: string;
  durationHours: number;
  totalFare: string;
  status: ChauffeurStatus;
}

const defaultBookings: ChauffeurBooking[] = [
  {
    id: "CHF-2041",
    customer: "Eleanor Pierce",
    chauffeur: "Dana Whitfield",
    tier: "Luxury",
    date: "Jun 14, 2025",
    time: "18:00",
    durationHours: 6,
    totalFare: "$540.00",
    status: "Scheduled",
  },
  {
    id: "CHF-2040",
    customer: "Robert Tanaka",
    chauffeur: null,
    tier: "Business",
    date: "Jun 14, 2025",
    time: "13:30",
    durationHours: 4,
    totalFare: "$240.00",
    status: "Scheduled",
  },
  {
    id: "CHF-2039",
    customer: "Amara Osei",
    chauffeur: "Hannah Kowalski",
    tier: "First",
    date: "Jun 14, 2025",
    time: "10:15",
    durationHours: 8,
    totalFare: "$720.00",
    status: "In Progress",
  },
  {
    id: "CHF-2038",
    customer: "Jonas Lindqvist",
    chauffeur: "Marco Rinaldi",
    tier: "Business",
    date: "Jun 13, 2025",
    time: "19:00",
    durationHours: 3,
    totalFare: "$180.00",
    status: "Completed",
  },
  {
    id: "CHF-2037",
    customer: "Priya Raman",
    chauffeur: null,
    tier: "Luxury",
    date: "Jun 13, 2025",
    time: "08:00",
    durationHours: 2,
    totalFare: "$0.00",
    status: "Cancelled",
  },
];

const statusTone: Record<ChauffeurStatus, Tone> = {
  Scheduled: "cyan",
  "In Progress": "brand",
  Completed: "success",
  Cancelled: "muted",
};

const tierAccentClass: Record<ChauffeurTier, string> = {
  Business: "bg-primary/15 text-primary",
  First: "bg-cyan/15 text-cyan",
  Luxury: "bg-gold/20 text-gold",
};

const statusOptions: ChauffeurStatus[] = [
  "Scheduled",
  "In Progress",
  "Completed",
  "Cancelled",
];

interface ChauffeurBookingsTableProps {
  bookings?: ChauffeurBooking[];
  className?: string;
}

export function ChauffeurBookingsTable({
  bookings = defaultBookings,
  className,
}: ChauffeurBookingsTableProps) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<ChauffeurStatus | "All">("All");
  const [date, setDate] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchesQuery =
        q === "" ||
        b.id.toLowerCase().includes(q) ||
        b.customer.toLowerCase().includes(q) ||
        (b.chauffeur ?? "").toLowerCase().includes(q);
      const matchesStatus = status === "All" || b.status === status;
      const matchesDate = date === "" || b.date === "";
      return matchesQuery && matchesStatus && matchesDate;
    });
  }, [bookings, query, status, date]);

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gold/20 text-gold">
            <Crown className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Chauffeur bookings</CardTitle>
            <CardDescription>Hourly chauffeur service requests</CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge
            variant="outline"
            className="border-transparent bg-muted text-muted-foreground"
          >
            {filtered.length} of {bookings.length}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ID, customer, chauffeur…"
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-9 sm:w-44"
              />
            </div>
            <SelectStatus value={status} onChange={setStatus} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Booking
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Customer
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Chauffeur
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Tier
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  When
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Duration
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Total
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground text-right text-xs tracking-wider uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow className="border-border hover:bg-transparent">
                  <TableCell colSpan={9} className="py-10 text-center">
                    <p className="text-sm text-muted-foreground">
                      No chauffeur bookings match your filters
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((b) => {
                  const unassigned = b.chauffeur === null;
                  return (
                    <TableRow
                      key={b.id}
                      className="border-border hover:bg-muted/50"
                    >
                      <TableCell className="font-mono text-xs text-foreground/80">
                        {b.id}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {b.customer}
                      </TableCell>
                      <TableCell>
                        {unassigned ? (
                          <span className="text-sm italic text-muted-foreground">
                            Unassigned
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {b.chauffeur}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "border-transparent",
                            tierAccentClass[b.tier],
                          )}
                        >
                          {b.tier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="leading-tight">
                          <p className="text-xs text-foreground">{b.date}</p>
                          <p className="font-mono text-xs tabular-nums">
                            {b.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-foreground tabular-nums">
                        {b.durationHours}h
                      </TableCell>
                      <TableCell className="font-mono font-medium text-foreground tabular-nums">
                        {b.totalFare}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          tone={statusTone[b.status]}
                          dot={b.status === "In Progress"}
                        >
                          {b.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell className="text-right">
                        {unassigned ? (
                          <Button size="sm" variant="default" className="gap-1.5">
                            Assign
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="gap-1.5">
                            View
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

interface SelectStatusProps {
  value: ChauffeurStatus | "All";
  onChange: (value: ChauffeurStatus | "All") => void;
}

function SelectStatus({ value, onChange }: SelectStatusProps) {
  // Lightweight native select styled to match the shadcn Select trigger look.
  // Using a native <select> keeps the component SSR-friendly and avoids the
  // popper-portal positioning cost inside a tightly filtered table.
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ChauffeurStatus | "All")}
        className={cn(
          "h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow]",
          "hover:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "sm:w-40",
        )}
        aria-label="Filter bookings by status"
      >
        <option value="All">All statuses</option>
        {statusOptions.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground opacity-60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export default ChauffeurBookingsTable;
