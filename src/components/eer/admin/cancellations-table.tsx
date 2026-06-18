import * as React from "react";
import { Ban } from "lucide-react";

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
import { accentSoft, type Accent, type Tone } from "@/components/eer/accents";

export type CancellationService = "One-way" | "Chauffeur" | "Package";
export type CancellationBy = "Rider" | "Driver" | "System";

export interface CancellationRow {
  id: string;
  rideId: string;
  rider: string;
  driver: string | null;
  service: CancellationService;
  cancelledBy: CancellationBy;
  reason: string;
  feeCharged: string;
  refundAmount: string;
  time: string;
}

const serviceAccent: Record<CancellationService, Accent> = {
  "One-way": "brand",
  Chauffeur: "magenta",
  Package: "amber",
};

const cancelledByTone: Record<CancellationBy, Tone> = {
  Rider: "muted",
  Driver: "amber",
  System: "cyan",
};

const defaultCancellations: CancellationRow[] = [
  {
    id: "cnl-1",
    rideId: "EER-4819",
    rider: "Maria Hernandez",
    driver: "Marco Rinaldi",
    service: "One-way",
    cancelledBy: "Rider",
    reason: "Changed plans — pickup no longer needed",
    feeCharged: "$0.00",
    refundAmount: "$21.85",
    time: "Jun 14, 08:58",
  },
  {
    id: "cnl-2",
    rideId: "EER-4815",
    rider: "Liam Walsh",
    driver: null,
    service: "Chauffeur",
    cancelledBy: "System",
    reason: "No driver available within dispatch window",
    feeCharged: "$0.00",
    refundAmount: "$120.00",
    time: "Jun 14, 07:30",
  },
  {
    id: "cnl-3",
    rideId: "EER-4814",
    rider: "Aaliyah Washington",
    driver: "Dana Whitfield",
    service: "One-way",
    cancelledBy: "Driver",
    reason: "Vehicle breakdown — alternator failure",
    feeCharged: "$0.00",
    refundAmount: "$18.40",
    time: "Jun 13, 22:12",
  },
  {
    id: "cnl-4",
    rideId: "EER-4813",
    rider: "Daniel Cho",
    driver: "Jules Okafor",
    service: "Package",
    cancelledBy: "Rider",
    reason: "Recipient unavailable at delivery address in Back Bay",
    feeCharged: "$5.00",
    refundAmount: "$24.00",
    time: "Jun 13, 18:44",
  },
  {
    id: "cnl-5",
    rideId: "EER-4812",
    rider: "Olivia Bennett",
    driver: "Hannah Kowalski",
    service: "Chauffeur",
    cancelledBy: "Rider",
    reason: "Late cancellation — outside free window, Logan Airport pickup",
    feeCharged: "$36.00",
    refundAmount: "$84.00",
    time: "Jun 13, 15:05",
  },
];

function truncate(text: string, max = 44) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

interface CancellationsTableProps {
  cancellations?: CancellationRow[];
  className?: string;
}

export function CancellationsTable({
  cancellations = defaultCancellations,
  className,
}: CancellationsTableProps) {
  const reasonCounts = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const c of cancellations) {
      const key = c.cancelledBy;
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  }, [cancellations]);

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
            <Ban className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Cancellations</CardTitle>
            <CardDescription>
              {cancellations.length} cancelled rides — fees &amp; refunds
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <div className="flex flex-wrap items-center gap-2">
            <ReasonChip
              label="By rider"
              count={reasonCounts.get("Rider") ?? 0}
              tone="muted"
            />
            <ReasonChip
              label="By driver"
              count={reasonCounts.get("Driver") ?? 0}
              tone="amber"
            />
            <ReasonChip
              label="By system"
              count={reasonCounts.get("System") ?? 0}
              tone="cyan"
            />
          </div>
        </CardAction>
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
                Service
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Cancelled by
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Reason
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Fee
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Refund
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-xs tracking-wider uppercase">
                Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cancellations.map((c) => (
              <TableRow
                key={c.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="px-6 font-mono text-xs text-foreground/80">
                  {c.rideId}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {c.rider}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {c.driver ?? <span className="text-muted-foreground/70">—</span>}
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "border-transparent",
                      accentSoft[serviceAccent[c.service]],
                    )}
                  >
                    {c.service}
                  </Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge tone={cancelledByTone[c.cancelledBy]}>
                    {c.cancelledBy}
                  </StatusBadge>
                </TableCell>
                <TableCell className="max-w-[280px] text-muted-foreground">
                  <span title={c.reason}>{truncate(c.reason)}</span>
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground tabular-nums">
                  {c.feeCharged}
                </TableCell>
                <TableCell className="font-mono text-foreground tabular-nums">
                  {c.refundAmount}
                </TableCell>
                <TableCell className="px-6 text-muted-foreground">
                  {c.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

interface ReasonChipProps {
  label: string;
  count: number;
  tone: Tone;
}

function ReasonChip({ label, count, tone }: ReasonChipProps) {
  const soft =
    tone === "muted"
      ? "bg-muted text-muted-foreground"
      : tone === "amber"
        ? "bg-amber/15 text-amber"
        : "bg-cyan/15 text-cyan";
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5">
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full text-[10px] font-semibold",
          soft,
        )}
      >
        {count}
      </span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export default CancellationsTable;
