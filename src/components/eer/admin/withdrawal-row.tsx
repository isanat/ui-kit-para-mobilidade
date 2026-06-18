"use client";

import * as React from "react";
import { Check, Landmark, Wallet, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/eer/status-badge";

export type WithdrawalStatus = "Pending" | "Approved" | "Rejected";

export type WithdrawalMethod = "Bank" | "PayPal";

export interface WithdrawalRow {
  id: string;
  driverName: string;
  initials: string;
  amount: string;
  method: WithdrawalMethod;
  requestedDate: string;
  status: WithdrawalStatus;
}

interface WithdrawalRowProps {
  withdrawal: WithdrawalRow;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  className?: string;
}

// StatusBadge uses the brand Tone system; "destructive" is not part of it,
// so we map Rejected to the muted tone.
const toneForStatus = {
  Pending: "amber",
  Approved: "success",
  Rejected: "muted",
} as const;

const methodIcon: Record<WithdrawalMethod, React.ComponentType<{ className?: string }>> = {
  Bank: Landmark,
  PayPal: Wallet,
};

export function WithdrawalRow({
  withdrawal,
  onApprove,
  onReject,
  className,
}: WithdrawalRowProps) {
  const { id, driverName, initials, amount, method, requestedDate, status } =
    withdrawal;
  const MethodIcon = methodIcon[method];
  const isPending = status === "Pending";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border px-4 py-3.5 last:border-b-0 md:flex-row md:items-center md:gap-4 md:px-5",
        "hover:bg-muted/40 transition-colors",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar className="size-9 ring-1 ring-border">
          <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-medium text-foreground">
            {driverName}
          </p>
          <p className="text-xs text-muted-foreground">
            Requested {requestedDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <MethodIcon className="size-3.5" aria-hidden />
        <span>{method}</span>
      </div>

      <div className="font-mono text-sm font-semibold text-foreground tabular-nums">
        {amount}
      </div>

      <div className="w-28 shrink-0">
        <StatusBadge tone={toneForStatus[status]} dot={isPending}>
          {status}
        </StatusBadge>
      </div>

      <div className="flex items-center gap-2 md:w-44 md:justify-end">
        {isPending ? (
          <>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={() => onReject?.(id)}
            >
              <X className="size-3.5" />
              Reject
            </Button>
            <Button
              size="sm"
              className="gap-1.5"
              onClick={() => onApprove?.(id)}
            >
              <Check className="size-3.5" />
              Approve
            </Button>
          </>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>
    </div>
  );
}

export default WithdrawalRow;
