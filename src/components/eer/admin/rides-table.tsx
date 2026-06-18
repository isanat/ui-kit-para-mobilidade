import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
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
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type RideStatus =
  | "Completed"
  | "In progress"
  | "Cancelled"
  | "Scheduled";

export const ridesStatusTone: Record<RideStatus, Tone> = {
  Completed: "success",
  "In progress": "brand",
  Cancelled: "muted",
  Scheduled: "cyan",
};

export interface RideRow {
  id: string;
  rider: string;
  driver: string;
  pickup: string;
  destination: string;
  date: string;
  fare: string;
  status: RideStatus;
}

const defaultRides: RideRow[] = [
  {
    id: "EER-4821",
    rider: "Marcus Bell",
    driver: "Dana Whitfield",
    pickup: "Logan Airport — Terminal C",
    destination: "Four Seasons, Boston",
    date: "Jun 14, 09:42",
    fare: "$48.20",
    status: "Completed",
  },
  {
    id: "EER-4820",
    rider: "Priya Raman",
    driver: "Jules Okafor",
    pickup: "South Station",
    destination: "Cambridge — Kendall Sq",
    date: "Jun 14, 09:18",
    fare: "$21.85",
    status: "In progress",
  },
  {
    id: "EER-4819",
    rider: "Sofia Nguyen",
    driver: "Marco Rinaldi",
    pickup: "Seaport Blvd",
    destination: "Back Bay Station",
    date: "Jun 14, 08:55",
    fare: "$0.00",
    status: "Cancelled",
  },
  {
    id: "EER-4818",
    rider: "Liam Walsh",
    driver: "Dana Whitfield",
    pickup: "Boston Common",
    destination: "Fenway Park",
    date: "Jun 14, 19:30",
    fare: "$32.10",
    status: "Scheduled",
  },
  {
    id: "EER-4817",
    rider: "Aisha Mensah",
    driver: "Hannah Kowalski",
    pickup: "MIT — 77 Mass Ave",
    destination: "Boston Logan — Terminal B",
    date: "Jun 14, 08:02",
    fare: "$54.95",
    status: "Completed",
  },
  {
    id: "EER-4816",
    rider: "Diego Santos",
    driver: "Jules Okafor",
    pickup: "Prudential Center",
    destination: "Harvard Sq, Cambridge",
    date: "Jun 14, 07:46",
    fare: "$26.40",
    status: "Completed",
  },
];

function truncate(text: string, max = 32) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

interface RidesTableProps {
  rides?: RideRow[];
  className?: string;
  showViewAll?: boolean;
}

export function RidesTable({
  rides = defaultRides,
  className,
  showViewAll = true,
}: RidesTableProps) {
  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-base">Recent rides</CardTitle>
        {showViewAll && (
          <CardAction>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all
              <ArrowRight className="size-3.5" aria-hidden />
            </button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground px-6 text-xs tracking-wider uppercase">
                Ride ID
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Rider
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Driver
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Route
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Date
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Fare
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-xs tracking-wider uppercase">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.map((ride) => (
              <TableRow
                key={ride.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="px-6 font-mono text-xs text-foreground/80">
                  {ride.id}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {ride.rider}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {ride.driver}
                </TableCell>
                <TableCell className="max-w-[260px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="truncate">{truncate(ride.pickup)}</span>
                    <ArrowRight className="size-3 shrink-0 text-muted-foreground/60" />
                    <span className="truncate">{truncate(ride.destination)}</span>
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {ride.date}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground tabular-nums">
                  {ride.fare}
                </TableCell>
                <TableCell className="px-6">
                  <StatusBadge
                    tone={ridesStatusTone[ride.status]}
                    dot={ride.status === "In progress"}
                  >
                    {ride.status}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RidesTable;
