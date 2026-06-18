import * as React from "react";
import { Check, FileText, ShieldCheck, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type DocumentVerificationStatus =
  | "pending"
  | "verified"
  | "rejected"
  | "expired"
  | "none";

export interface DriverDocument {
  type: string;
  status: "valid" | "expired" | "missing";
}

export interface DocumentDriver {
  id: string;
  name: string;
  initials: string;
  documentVerificationStatus: DocumentVerificationStatus;
  fileCount: number;
  documents: DriverDocument[];
}

interface DocumentVerificationRowProps {
  driver: DocumentDriver;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  className?: string;
}

const statusMeta: Record<
  DocumentVerificationStatus,
  { label: string; tone: Tone; ring: string; fallbackClass: string }
> = {
  pending: {
    label: "Pending",
    tone: "amber",
    ring: "ring-amber",
    fallbackClass: "bg-amber/15 text-amber",
  },
  verified: {
    label: "Verified",
    tone: "success",
    ring: "ring-success",
    fallbackClass: "bg-success/15 text-success",
  },
  rejected: {
    label: "Rejected",
    tone: "magenta",
    ring: "ring-destructive",
    fallbackClass: "bg-destructive/15 text-destructive",
  },
  expired: {
    label: "Expired",
    tone: "muted",
    ring: "ring-muted-foreground/60",
    fallbackClass: "bg-muted text-muted-foreground",
  },
  none: {
    label: "Not submitted",
    tone: "muted",
    ring: "ring-border",
    fallbackClass: "bg-muted text-muted-foreground",
  },
};

const docDotClass: Record<DriverDocument["status"], string> = {
  valid: "bg-success",
  expired: "bg-amber",
  missing: "bg-destructive",
};

const docDotLabel: Record<DriverDocument["status"], string> = {
  valid: "Valid",
  expired: "Expired",
  missing: "Missing",
};

export function DocumentVerificationRow({
  driver,
  onApprove,
  onReject,
  className,
}: DocumentVerificationRowProps) {
  const status = driver.documentVerificationStatus;
  const meta = statusMeta[status];
  const showActions = status === "pending" || status === "rejected";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border bg-card p-4 lg:flex-row lg:items-center lg:gap-5",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar
          className={cn(
            "size-11 shrink-0 ring-2",
            meta.ring,
          )}
        >
          <AvatarFallback
            className={cn(
              "text-xs font-semibold",
              meta.fallbackClass,
            )}
          >
            {driver.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-foreground">
              {driver.name}
            </p>
            <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground">
              <FileText className="size-3" aria-hidden />
              {driver.fileCount} {driver.fileCount === 1 ? "file" : "files"}
            </span>
            {driver.documents.map((doc) => (
              <span
                key={doc.type}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/30 px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                <span
                  className={cn("size-1.5 rounded-full", docDotClass[doc.status])}
                  aria-hidden
                />
                {doc.type}
                <span className="text-muted-foreground/70">
                  · {docDotLabel[doc.status]}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 lg:justify-end">
        {showActions ? (
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ShieldCheck className="size-3.5" aria-hidden />
              Review
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onReject?.(driver.id)}
            >
              <X className="size-3.5" aria-hidden />
              Reject
            </Button>
            <Button
              size="sm"
              className="gap-1.5 bg-success text-success-foreground hover:bg-success/90"
              onClick={() => onApprove?.(driver.id)}
            >
              <Check className="size-3.5" aria-hidden />
              Approve
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" className="gap-1.5">
            <ShieldCheck className="size-3.5" aria-hidden />
            View docs
          </Button>
        )}
      </div>
    </div>
  );
}

export default DocumentVerificationRow;
