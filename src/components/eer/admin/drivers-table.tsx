import * as React from "react";
import { MoreHorizontal, Star } from "lucide-react";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/eer/status-badge";

export interface DriverRow {
  id: string;
  name: string;
  initials: string;
  rating: number;
  vehicle: string;
  plate: string;
  online: boolean;
  totalRides: number;
  earnings: string;
}

const defaultDrivers: DriverRow[] = [
  {
    id: "drv-1",
    name: "Dana Whitfield",
    initials: "DW",
    rating: 4.96,
    vehicle: "Toyota Camry — Black",
    plate: "8EEL 491",
    online: true,
    totalRides: 1284,
    earnings: "$18,420",
  },
  {
    id: "drv-2",
    name: "Jules Okafor",
    initials: "JO",
    rating: 4.88,
    vehicle: "Honda Accord — Silver",
    plate: "7ZX 2240",
    online: true,
    totalRides: 968,
    earnings: "$14,210",
  },
  {
    id: "drv-3",
    name: "Marco Rinaldi",
    initials: "MR",
    rating: 4.72,
    vehicle: "Chevy Malibu — White",
    plate: "5BTR 908",
    online: false,
    totalRides: 642,
    earnings: "$9,840",
  },
  {
    id: "drv-4",
    name: "Hannah Kowalski",
    initials: "HK",
    rating: 4.91,
    vehicle: "Tesla Model 3 — Red",
    plate: "9EV 1187",
    online: true,
    totalRides: 1156,
    earnings: "$21,640",
  },
  {
    id: "drv-5",
    name: "Aisha Mensah",
    initials: "AM",
    rating: 4.84,
    vehicle: "Hyundai Sonata — Blue",
    plate: "2AMD 615",
    online: false,
    totalRides: 514,
    earnings: "$7,120",
  },
];

interface DriversTableProps {
  drivers?: DriverRow[];
  className?: string;
}

export function DriversTable({
  drivers = defaultDrivers,
  className,
}: DriversTableProps) {
  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-base">Drivers</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground px-6 text-xs tracking-wider uppercase">
                Driver
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Vehicle
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Plate
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Status
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Total rides
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Earnings
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-right text-xs tracking-wider uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow
                key={driver.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9 ring-1 ring-border">
                      <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                        {driver.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <p className="font-medium text-foreground">{driver.name}</p>
                      <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3 fill-gold text-gold" aria-hidden />
                        <span className="tabular-nums">
                          {driver.rating.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {driver.vehicle}
                </TableCell>
                <TableCell className="font-mono text-xs text-foreground/80">
                  {driver.plate}
                </TableCell>
                <TableCell>
                  <StatusBadge tone={driver.online ? "success" : "muted"} dot>
                    {driver.online ? "Online" : "Offline"}
                  </StatusBadge>
                </TableCell>
                <TableCell className="font-mono text-foreground tabular-nums">
                  {driver.totalRides.toLocaleString("en-US")}
                </TableCell>
                <TableCell className="font-mono font-medium text-foreground tabular-nums">
                  {driver.earnings}
                </TableCell>
                <TableCell className="px-6 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-foreground"
                    aria-label={`Actions for ${driver.name}`}
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default DriversTable;
