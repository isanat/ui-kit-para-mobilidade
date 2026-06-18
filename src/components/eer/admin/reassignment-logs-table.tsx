import * as React from "react";
import { ArrowRight, GitBranch } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type ReassignmentReason = "Auto" | "Manual";

export interface ReassignmentLog {
  id: string;
  rideId: string;
  fromDriver: string;
  toDriver: string;
  reason: ReassignmentReason;
  triggeredBy: string;
  timestamp: string;
}

const reasonTone: Record<ReassignmentReason, Tone> = {
  Auto: "cyan",
  Manual: "magenta",
};

const defaultLogs: ReassignmentLog[] = [
  {
    id: "rlog-1",
    rideId: "EER-4815",
    fromDriver: "Dana Whitfield",
    toDriver: "Hannah Kowalski",
    reason: "Auto",
    triggeredBy: "system",
    timestamp: "Jun 14, 07:31",
  },
  {
    id: "rlog-2",
    rideId: "EER-4822",
    fromDriver: "Marco Rinaldi",
    toDriver: "Jules Okafor",
    reason: "Manual",
    triggeredBy: "operator: dispatcher-3",
    timestamp: "Jun 14, 10:05",
  },
  {
    id: "rlog-3",
    rideId: "EER-4818",
    fromDriver: "Aisha Mensah",
    toDriver: "Dana Whitfield",
    reason: "Auto",
    triggeredBy: "system",
    timestamp: "Jun 14, 06:48",
  },
  {
    id: "rlog-4",
    rideId: "EER-4811",
    fromDriver: "Jules Okafor",
    toDriver: "Marco Rinaldi",
    reason: "Manual",
    triggeredBy: "operator: admin-1",
    timestamp: "Jun 13, 22:14",
  },
  {
    id: "rlog-5",
    rideId: "EER-4809",
    fromDriver: "Hannah Kowalski",
    toDriver: "Aisha Mensah",
    reason: "Auto",
    triggeredBy: "system",
    timestamp: "Jun 13, 18:39",
  },
];

interface ReassignmentLogsTableProps {
  logs?: ReassignmentLog[];
  className?: string;
}

export function ReassignmentLogsTable({
  logs = defaultLogs,
  className,
}: ReassignmentLogsTableProps) {
  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-cyan/15 text-cyan">
            <GitBranch className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Reassignment logs</CardTitle>
            <CardDescription>
              {logs.length} ride-to-driver reassignments
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge
            variant="outline"
            className="border-border bg-muted/40 px-2.5 py-1 font-mono text-muted-foreground tabular-nums"
          >
            {logs.length} events
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground px-6 text-xs tracking-wider uppercase">
                Log ID
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Ride ID
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                From driver
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                To driver
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Reason
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Triggered by
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-xs tracking-wider uppercase">
                Timestamp
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow
                key={log.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="px-6 font-mono text-xs text-foreground/80">
                  {log.id}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {log.rideId}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {log.fromDriver}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 text-foreground">
                    <ArrowRight
                      className="size-3 text-muted-foreground/60"
                      aria-hidden
                    />
                    <span className="font-medium">{log.toDriver}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge tone={reasonTone[log.reason]} dot>
                    {log.reason}
                  </StatusBadge>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {log.triggeredBy}
                </TableCell>
                <TableCell className="px-6 text-muted-foreground">
                  {log.timestamp}
                </TableCell>
              </TableRow>
            ))}
            {logs.length === 0 && (
              <TableRow className="border-border hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="px-6 py-10 text-center text-sm text-muted-foreground"
                >
                  No reassignment events recorded.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ReassignmentLogsTable;
