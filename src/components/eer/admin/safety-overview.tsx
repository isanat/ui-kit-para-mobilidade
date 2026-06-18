import * as React from "react";
import {
  FileClock,
  Share2,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { SosAlertCard, type SosAlert } from "./sos-alert-card";

interface SafetyStats {
  activeSos: number;
  pendingDocs: number;
  activeShares: number;
}

interface SafetyOverviewProps {
  stats?: SafetyStats;
  recentAlerts?: SosAlert[];
  className?: string;
}

interface StatTileProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  sublabel: string;
  accentClass: string;
}

function StatTile({
  icon: Icon,
  label,
  value,
  sublabel,
  accentClass,
}: StatTileProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-xl",
          accentClass,
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
          {label}
        </p>
        <p className="font-mono text-2xl font-semibold text-foreground tabular-nums">
          {value}
        </p>
        <p className="truncate text-[11px] text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
}

const defaultStats: SafetyStats = {
  activeSos: 2,
  pendingDocs: 7,
  activeShares: 14,
};

const defaultAlerts: SosAlert[] = [
  {
    id: "SOS-124",
    rider: "Marcus Bell",
    driver: "Dana Whitfield",
    rideId: "EER-4821",
    triggeredAt: "2 min ago",
    location: "Logan Airport — Terminal C",
    status: "active",
  },
  {
    id: "SOS-123",
    rider: "Sofia Nguyen",
    driver: "Marco Rinaldi",
    rideId: "EER-4819",
    triggeredAt: "18 min ago",
    location: "Seaport Blvd, Boston",
    status: "active",
  },
  {
    id: "SOS-122",
    rider: "Liam Walsh",
    driver: "Hannah Kowalski",
    rideId: "EER-4812",
    triggeredAt: "1h ago",
    location: "Fenway Park, Boston",
    status: "resolved",
  },
];

export function SafetyOverview({
  stats = defaultStats,
  recentAlerts = defaultAlerts,
  className,
}: SafetyOverviewProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile
          icon={ShieldAlert}
          label="SOS alerts"
          value={stats.activeSos}
          sublabel="Active right now"
          accentClass="bg-destructive/15 text-destructive"
        />
        <StatTile
          icon={FileClock}
          label="Documents pending"
          value={stats.pendingDocs}
          sublabel="Awaiting review"
          accentClass="bg-amber/15 text-amber"
        />
        <StatTile
          icon={Share2}
          label="Trip shares"
          value={stats.activeShares}
          sublabel="Live location shared"
          accentClass="bg-success/15 text-success"
        />
      </div>

      <Card className="rounded-2xl">
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between px-1 pb-1">
            <div className="flex items-center gap-2">
              <TriangleAlert className="size-4 text-destructive" aria-hidden />
              <h3 className="text-sm font-medium text-foreground">
                Recent alerts
              </h3>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {recentAlerts.length} total
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {recentAlerts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No recent SOS alerts
                </p>
              </div>
            ) : (
              recentAlerts.map((alert) => (
                <SosAlertCard key={alert.id} alert={alert} compact />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SafetyOverview;
