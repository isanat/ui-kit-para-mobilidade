import * as React from "react";
import {
  Banknote,
  CreditCard,
  MoreHorizontal,
  Wallet,
  type LucideIcon,
} from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type PaymentMethod = "Card" | "Cash" | "Wallet";
export type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Failed";

/** Tone map for payment status. Failed maps to a destructive Badge variant. */
export type PaymentStatusTone = Tone | "destructive";

export const paymentStatusTone: Record<PaymentStatus, PaymentStatusTone> = {
  Paid: "success",
  Pending: "amber",
  Refunded: "muted",
  Failed: "destructive",
};

const methodMeta: Record<
  PaymentMethod,
  { icon: LucideIcon; soft: string }
> = {
  Card: {
    icon: CreditCard,
    soft: "bg-primary/15 text-primary",
  },
  Cash: {
    icon: Banknote,
    soft: "bg-success/15 text-success",
  },
  Wallet: {
    icon: Wallet,
    soft: "bg-cyan/15 text-cyan",
  },
};

export interface PaymentRow {
  id: string;
  rideId: string;
  user: string;
  amount: string;
  method: PaymentMethod;
  gateway: string;
  status: PaymentStatus;
  date: string;
}

const defaultPayments: PaymentRow[] = [
  {
    id: "PAY-90412",
    rideId: "EER-4821",
    user: "Olivia Bennett",
    amount: "$48.20",
    method: "Card",
    gateway: "Square",
    status: "Paid",
    date: "Jun 14, 09:47",
  },
  {
    id: "PAY-90411",
    rideId: "EER-4820",
    user: "Daniel Cho",
    amount: "$21.85",
    method: "Wallet",
    gateway: "Square",
    status: "Paid",
    date: "Jun 14, 09:23",
  },
  {
    id: "PAY-90410",
    rideId: "EER-4819",
    user: "Maria Hernandez",
    amount: "$0.00",
    method: "Card",
    gateway: "Square",
    status: "Refunded",
    date: "Jun 14, 08:58",
  },
  {
    id: "PAY-90409",
    rideId: "EER-4817",
    user: "Aaliyah Washington",
    amount: "$54.95",
    method: "Cash",
    gateway: "Square",
    status: "Pending",
    date: "Jun 14, 08:10",
  },
  {
    id: "PAY-90408",
    rideId: "EER-4816",
    user: "James O'Connor",
    amount: "$26.40",
    method: "Card",
    gateway: "Square",
    status: "Failed",
    date: "Jun 14, 07:51",
  },
];

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const tone = paymentStatusTone[status];
  if (tone === "destructive") {
    return (
      <Badge variant="destructive" className="rounded-full">
        {status}
      </Badge>
    );
  }
  return (
    <StatusBadge tone={tone} dot={status === "Pending"}>
      {status}
    </StatusBadge>
  );
}

function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  const meta = methodMeta[method];
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        meta.soft,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {method}
    </span>
  );
}

interface PaymentsTableProps {
  payments?: PaymentRow[];
  className?: string;
}

export function PaymentsTable({
  payments = defaultPayments,
  className,
}: PaymentsTableProps) {
  const [filter, setFilter] = React.useState<"all" | PaymentStatus>("all");

  const filtered = React.useMemo(() => {
    if (filter === "all") return payments;
    return payments.filter((p) => p.status === filter);
  }, [payments, filter]);

  const totalPaid = React.useMemo(() => {
    return payments
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + Number(p.amount.replace(/[^0-9.]/g, "")), 0);
  }, [payments]);

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-success/15 text-success">
            <CreditCard className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Payments</CardTitle>
            <CardDescription>Transactions processed via Square</CardDescription>
          </div>
        </div>
        <CardAction>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-success/30 bg-success/10 px-2.5 py-1 font-mono text-success tabular-nums"
            >
              {`Total $${totalPaid.toFixed(2)}`}
            </Badge>
            <Select
              value={filter}
              onValueChange={(v) => setFilter(v as typeof filter)}
            >
              <SelectTrigger size="sm" className="w-36" aria-label="Filter by status">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground px-6 text-xs tracking-wider uppercase">
                Payment ID
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Ride ID
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                User
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Amount
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Method
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Gateway
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Date
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-right text-xs tracking-wider uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((payment) => (
              <TableRow
                key={payment.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="px-6 font-mono text-xs text-foreground/80">
                  {payment.id}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {payment.rideId}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {payment.user}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground tabular-nums">
                  {payment.amount}
                </TableCell>
                <TableCell>
                  <PaymentMethodBadge method={payment.method} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {payment.gateway}
                </TableCell>
                <TableCell>
                  <PaymentStatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {payment.date}
                </TableCell>
                <TableCell className="px-6 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-foreground"
                    aria-label={`Actions for ${payment.id}`}
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow className="border-border hover:bg-transparent">
                <TableCell
                  colSpan={9}
                  className="px-6 py-10 text-center text-sm text-muted-foreground"
                >
                  No payments match this filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default PaymentsTable;
