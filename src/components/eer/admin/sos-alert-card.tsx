import * as React from "react";
import { Check, Clock, MapPin, TriangleAlert, UserRound, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type SosStatus = "active" | "resolved" | "false_alarm";
export type SosResolution = "resolved" | "false_alarm";

export interface SosAlert {
  id: string;
  rider: string;
  driver: string;
  rideId: string;
  triggeredAt: string;
  location: string;
  status: SosStatus;
}

interface SosAlertCardProps {
  alert: SosAlert;
  onResolve?: (id: string, resolution: SosResolution) => void;
  className?: string;
  /** Compact list-row layout, used inside the safety overview. */
  compact?: boolean;
}

const statusMeta: Record<
  SosStatus,
  { label: string; tone: Tone; dot: boolean }
> = {
  active: { label: "Active", tone: "magenta", dot: true },
  resolved: { label: "Resolved", tone: "success", dot: false },
  false_alarm: { label: "False alarm", tone: "muted", dot: false },
};

const activeToneStyle =
  "border-destructive/40 bg-destructive/5 [&_[data-slot=card-content]]:bg-transparent";
const inactiveToneStyle = "border-border bg-card";

export function SosAlertCard({
  alert,
  onResolve,
  className,
  compact = false,
}: SosAlertCardProps) {
  const isActive = alert.status === "active";
  const meta = statusMeta[alert.status];

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border px-3 py-2.5",
          isActive
            ? "border-destructive/40 bg-destructive/5"
            : "border-border bg-muted/30",
          className,
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            isActive
              ? "bg-destructive/15 text-destructive"
              : "bg-muted text-muted-foreground",
          )}
        >
          <TriangleAlert className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-foreground">
              #{alert.id}
            </span>
            <StatusBadge tone={meta.tone} dot={meta.dot}>
              {meta.label}
            </StatusBadge>
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {alert.rider} · {alert.driver} · {alert.location}
          </p>
        </div>
        <span className="shrink-0 text-[11px] text-muted-foreground">
          {alert.triggeredAt}
        </span>
      </div>
    );
  }

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl",
        isActive ? activeToneStyle : inactiveToneStyle,
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2.5 border-b px-5 py-3.5",
          isActive
            ? "border-destructive/30 bg-destructive/10"
            : "border-border bg-muted/30",
        )}
      >
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-lg",
            isActive
              ? "bg-destructive/20 text-destructive"
              : "bg-muted text-muted-foreground",
          )}
        >
          <TriangleAlert className="size-4" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="font-mono text-sm font-semibold text-foreground">
            #{alert.id}
          </span>
          <StatusBadge tone={meta.tone} dot={meta.dot}>
            {meta.label}
          </StatusBadge>
        </div>
      </div>

      <CardContent className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
        <Detail icon={UserRound} label="Rider" value={alert.rider} />
        <Detail icon={UserRound} label="Driver" value={alert.driver} />
        <Detail
          icon={TriangleAlert}
          label="Ride"
          value={alert.rideId}
          mono
        />
        <Detail icon={Clock} label="Triggered" value={alert.triggeredAt} />
        <div className="sm:col-span-2">
          <Detail icon={MapPin} label="Location" value={alert.location} />
        </div>
      </CardContent>

      {isActive && (
        <div className="flex flex-col gap-2 border-t border-border bg-muted/20 px-5 py-3 sm:flex-row sm:justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground"
            onClick={() => onResolve?.(alert.id, "false_alarm")}
          >
            <X className="size-3.5" aria-hidden />
            False alarm
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-success text-success-foreground hover:bg-success/90"
            onClick={() => onResolve?.(alert.id, "resolved")}
          >
            <Check className="size-3.5" aria-hidden />
            Resolve
          </Button>
        </div>
      )}
    </Card>
  );
}

interface DetailProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
}

function Detail({ icon: Icon, label, value, mono }: DetailProps) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
        <Icon className="size-3.5" aria-hidden />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
          {label}
        </p>
        <p
          className={cn(
            "truncate text-sm text-foreground",
            mono && "font-mono",
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default SosAlertCard;
