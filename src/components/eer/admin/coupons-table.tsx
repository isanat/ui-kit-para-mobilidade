import * as React from "react";
import { Power, Ticket } from "lucide-react";

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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type CouponType = "percentage" | "fixed";
export type CouponStatus = "Active" | "Expired" | "Used Up";

export interface CouponRow {
  id: string;
  code: string;
  type: CouponType;
  value: string;
  used: number;
  limit: number;
  status: CouponStatus;
  isActive: boolean;
}

const defaultCoupons: CouponRow[] = [
  {
    id: "cpn-1",
    code: "RIDE20",
    type: "percentage",
    value: "20%",
    used: 184,
    limit: 500,
    status: "Active",
    isActive: true,
  },
  {
    id: "cpn-2",
    code: "EAGLE50",
    type: "fixed",
    value: "$5",
    used: 920,
    limit: 1000,
    status: "Active",
    isActive: true,
  },
  {
    id: "cpn-3",
    code: "SPRING15",
    type: "percentage",
    value: "15%",
    used: 312,
    limit: 312,
    status: "Used Up",
    isActive: false,
  },
  {
    id: "cpn-4",
    code: "BACK2SCHOOL",
    type: "percentage",
    value: "25%",
    used: 47,
    limit: 200,
    status: "Expired",
    isActive: false,
  },
  {
    id: "cpn-5",
    code: "LOGAN10",
    type: "fixed",
    value: "$10",
    used: 88,
    limit: 150,
    status: "Active",
    isActive: true,
  },
];

const statusTone: Record<CouponStatus, Tone> = {
  Active: "success",
  Expired: "muted",
  "Used Up": "amber",
};

interface CouponsTableProps {
  coupons?: CouponRow[];
  className?: string;
}

interface SummaryChipProps {
  label: string;
  count: number;
  tone: Tone;
}

function SummaryChip({ label, count, tone }: SummaryChipProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5">
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full text-[10px] font-semibold",
          tone === "success" && "bg-success/15 text-success",
          tone === "muted" && "bg-muted text-muted-foreground",
          tone === "amber" && "bg-amber/15 text-amber",
        )}
      >
        {count}
      </span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function CouponsTable({
  coupons = defaultCoupons,
  className,
}: CouponsTableProps) {
  const [rows, setRows] = React.useState<CouponRow[]>(coupons);

  const counts = React.useMemo(() => {
    return rows.reduce(
      (acc, c) => {
        acc[c.status] += 1;
        return acc;
      },
      { Active: 0, Expired: 0, "Used Up": 0 } as Record<CouponStatus, number>,
    );
  }, [rows]);

  const toggleActive = (id: string) => {
    setRows((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = !c.isActive;
        // Re-activating an expired/used-up coupon flips it back to Active,
        // deactivating an active one keeps it Active (just paused) — admins
        // can still toggle the underlying flag without changing the lifecycle.
        const status: CouponStatus = next ? "Active" : c.status;
        return { ...c, isActive: next, status };
      }),
    );
  };

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-magenta/15 text-magenta">
            <Ticket className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Coupons</CardTitle>
            <CardDescription>Promo codes &amp; discounts</CardDescription>
          </div>
        </div>
        <CardAction>
          <div className="flex flex-wrap items-center gap-2">
            <SummaryChip label="Active" count={counts.Active} tone="success" />
            <SummaryChip label="Expired" count={counts.Expired} tone="muted" />
            <SummaryChip label="Used up" count={counts["Used Up"]} tone="amber" />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground px-6 text-xs tracking-wider uppercase">
                Code
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Type
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Value
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Usage
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-right text-xs tracking-wider uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c) => {
              const pct = c.limit > 0 ? (c.used / c.limit) * 100 : 0;
              const overCapacity = pct > 80;
              return (
                <TableRow key={c.id} className="border-border hover:bg-muted/50">
                  <TableCell className="px-6">
                    <span className="font-mono text-sm font-semibold tracking-wide text-foreground uppercase">
                      {c.code}
                    </span>
                  </TableCell>
                  <TableCell>
                    {c.type === "percentage" ? (
                      <Badge className="border-transparent bg-magenta/15 text-magenta">
                        Percentage
                      </Badge>
                    ) : (
                      <Badge className="border-transparent bg-cyan/15 text-cyan">
                        Fixed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono font-medium text-foreground tabular-nums">
                    {c.value}
                  </TableCell>
                  <TableCell>
                    <div className="flex w-36 flex-col gap-1">
                      <Progress
                        value={pct}
                        className={cn(
                          "h-1.5",
                          overCapacity && "[&_[data-slot=progress-indicator]]:bg-destructive",
                        )}
                      />
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="font-mono tabular-nums">
                          {c.used}/{c.limit}
                        </span>
                        <span className="font-mono tabular-nums">
                          {pct.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={statusTone[c.status]} dot={c.isActive}>
                      {c.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="px-6 text-right">
                    <Button
                      size="sm"
                      variant={c.isActive ? "outline" : "default"}
                      onClick={() => toggleActive(c.id)}
                      className={cn(
                        "gap-1.5",
                        !c.isActive &&
                          "bg-success text-success-foreground hover:bg-success/90",
                      )}
                      aria-label={
                        c.isActive
                          ? `Deactivate ${c.code}`
                          : `Activate ${c.code}`
                      }
                    >
                      <Power className="size-3.5" aria-hidden />
                      {c.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default CouponsTable;
