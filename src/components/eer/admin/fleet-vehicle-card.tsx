import * as React from "react";
import { Car, Crown, Truck, Briefcase, User } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/eer/status-badge";
import { accentSoft, type Accent } from "@/components/eer/accents";

export type VehicleTier = "Comfort" | "Black" | "Package" | "Chauffeur";

export type VehicleStatus = "Available" | "In ride" | "Maintenance";

export interface VehicleRow {
  id: string;
  make: string;
  model: string;
  plate: string;
  tier: VehicleTier;
  status: VehicleStatus;
  driver?: string;
  seats: number;
  bags: number;
}

const tierIcon: Record<VehicleTier, React.ComponentType<{ className?: string }>> = {
  Comfort: Car,
  Black: Car,
  Package: Truck,
  Chauffeur: Crown,
};

const tierAccent: Record<VehicleTier, Accent> = {
  Comfort: "brand",
  Black: "magenta",
  Package: "amber",
  Chauffeur: "gold",
};

const statusTone = {
  Available: "success",
  "In ride": "brand",
  Maintenance: "amber",
} as const;

interface FleetVehicleCardProps {
  vehicle: VehicleRow;
  className?: string;
}

export function FleetVehicleCard({ vehicle, className }: FleetVehicleCardProps) {
  const accent = tierAccent[vehicle.tier];
  const TierIcon = tierIcon[vehicle.tier];

  return (
    <Card className={cn("overflow-hidden rounded-2xl", className)}>
      <div
        className={cn(
          "relative flex h-28 items-center justify-center bg-gradient-to-br",
          accent === "brand" && "from-primary/25 via-primary/10 to-cyan/20",
          accent === "magenta" && "from-magenta/25 via-magenta/10 to-primary/20",
          accent === "amber" && "from-amber/25 via-amber/10 to-gold/20",
          accent === "gold" && "from-gold/25 via-gold/10 to-amber/20",
        )}
      >
        <TierIcon className="size-10 text-foreground/80" aria-hidden />
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className={cn("border-transparent", accentSoft[accent])}
          >
            {vehicle.tier}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="rounded-md bg-black/30 px-2 py-0.5 font-mono text-xs font-medium text-white backdrop-blur">
            {vehicle.plate}
          </span>
          <StatusBadge tone={statusTone[vehicle.status]} dot={vehicle.status !== "Maintenance"}>
            {vehicle.status}
          </StatusBadge>
        </div>
      </div>

      <CardHeader className="pb-1">
        <CardTitle className="text-base">
          {vehicle.make} {vehicle.model}
        </CardTitle>
        <CardDescription className="font-mono">
          ID {vehicle.id}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="size-3.5" aria-hidden />
            <span>{vehicle.driver ?? "Unassigned"}</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
            <Briefcase className="size-4 text-muted-foreground" aria-hidden />
            <div className="leading-tight">
              <p className="font-mono text-sm font-semibold text-foreground tabular-nums">
                {vehicle.seats}
              </p>
              <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                Seats
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
            <Briefcase className="size-4 text-muted-foreground" aria-hidden />
            <div className="leading-tight">
              <p className="font-mono text-sm font-semibold text-foreground tabular-nums">
                {vehicle.bags}
              </p>
              <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                Bags
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FleetVehicleCard;
