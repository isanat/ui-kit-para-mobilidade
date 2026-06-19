"use client";

import * as React from "react";
import {
  Package as PackageIcon,
  Search,
  ArrowRight,
  Eye,
  MapPin,
  Weight,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

/**
 * Lifecycle of a package delivery in the rider-app flow.
 * Matches the admin → packages/index status column.
 */
export type PackageStatus =
  | "Requested"
  | "Picked up"
  | "In transit"
  | "Delivered"
  | "Cancelled";

/** Size category used for the item-type badge column. */
export type PackageItemType = "Documents" | "Small" | "Medium" | "Large";

export interface PackageRow {
  id: string;
  sender: string;
  recipient: string;
  pickup: string;
  dropoff: string;
  itemType: PackageItemType;
  weight: string;
  courier: string | null;
  status: PackageStatus;
  fee: string;
  createdAt: string;
}

const statusTone: Record<PackageStatus, Tone> = {
  Requested: "amber",
  "Picked up": "cyan",
  "In transit": "brand",
  Delivered: "success",
  Cancelled: "muted",
};

const itemTypeTone: Record<
  PackageItemType,
  { className: string; icon: React.ComponentType<{ className?: string }> }
> = {
  Documents: {
    className: "border-transparent bg-cyan/15 text-cyan",
    icon: PackageIcon,
  },
  Small: {
    className: "border-transparent bg-amber/15 text-amber",
    icon: PackageIcon,
  },
  Medium: {
    className: "border-transparent bg-primary/15 text-primary",
    icon: PackageIcon,
  },
  Large: {
    className: "border-transparent bg-magenta/15 text-magenta",
    icon: PackageIcon,
  },
};

const statusFilterOptions: (PackageStatus | "All")[] = [
  "All",
  "Requested",
  "Picked up",
  "In transit",
  "Delivered",
  "Cancelled",
];

const defaultPackages: PackageRow[] = [
  {
    id: "PKG-3201",
    sender: "Emily Hartman",
    recipient: "Olivia Brooks",
    pickup: "Back Bay — 200 Dartmouth St",
    dropoff: "Seaport — 88 Seaport Blvd",
    itemType: "Documents",
    weight: "0.4 kg",
    courier: "Dana Whitfield",
    status: "In transit",
    fee: "$14.20",
    createdAt: "Jun 14, 09:12",
  },
  {
    id: "PKG-3200",
    sender: "Carmelo Rios",
    recipient: "Bright Horizons Daycare",
    pickup: "Cambridge — 77 Mass Ave",
    dropoff: "Somerville — 5 College Ave",
    itemType: "Medium",
    weight: "3.2 kg",
    courier: "Jules Okafor",
    status: "Picked up",
    fee: "$18.40",
    createdAt: "Jun 14, 08:48",
  },
  {
    id: "PKG-3199",
    sender: "Sarah Whitlock",
    recipient: "Marcus Bell",
    pickup: "Beacon Hill — 14 Joy St",
    dropoff: "Fenway — 4 Yawkey Way",
    itemType: "Large",
    weight: "7.8 kg",
    courier: null,
    status: "Requested",
    fee: "$26.95",
    createdAt: "Jun 14, 08:31",
  },
  {
    id: "PKG-3198",
    sender: "Back Bay Bookshop",
    recipient: "Priya Raman",
    pickup: "Back Bay — 286 Newbury St",
    dropoff: "Kendall Sq — 1 Broadway, Cambridge",
    itemType: "Small",
    weight: "1.1 kg",
    courier: "Marco Rinaldi",
    status: "Delivered",
    fee: "$11.60",
    createdAt: "Jun 14, 07:54",
  },
  {
    id: "PKG-3197",
    sender: "Legal Sea Foods",
    recipient: "Eleanor Pierce",
    pickup: "Seaport — 255 State St",
    dropoff: "Beacon Hill — 24 Beacon St",
    itemType: "Documents",
    weight: "0.2 kg",
    courier: "Hannah Kowalski",
    status: "Delivered",
    fee: "$9.85",
    createdAt: "Jun 13, 19:02",
  },
  {
    id: "PKG-3196",
    sender: "Diego Santos",
    recipient: "Aisha Mensah",
    pickup: "Prudential Center",
    dropoff: "Logan Airport — Terminal C",
    itemType: "Medium",
    weight: "4.5 kg",
    courier: null,
    status: "Cancelled",
    fee: "$0.00",
    createdAt: "Jun 13, 17:18",
  },
];

function truncate(text: string, max = 26) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

interface PackagesAdminTableProps {
  packages?: PackageRow[];
  className?: string;
}

export function PackagesAdminTable({
  packages = defaultPackages,
  className,
}: PackagesAdminTableProps) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<PackageStatus | "All">("All");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return packages.filter((p) => {
      const matchesQuery =
        q === "" ||
        p.id.toLowerCase().includes(q) ||
        p.sender.toLowerCase().includes(q) ||
        p.recipient.toLowerCase().includes(q) ||
        (p.courier ?? "").toLowerCase().includes(q);
      const matchesStatus = status === "All" || p.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [packages, query, status]);

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-amber/15 text-amber">
            <PackageIcon className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Packages</CardTitle>
            <CardDescription>
              Package delivery requests across the service area
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge
            variant="outline"
            className="border-transparent bg-muted text-muted-foreground"
          >
            {filtered.length} of {packages.length}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 p-4">
        {/* Filter row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by ID, sender, recipient, courier…"
              className="pl-9"
            />
          </div>
          <StatusFilter value={status} onChange={setStatus} />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground px-4 text-xs tracking-wider uppercase">
                  Package
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Sender
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Recipient
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Route
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Item
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Weight
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Courier
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Fee
                </TableHead>
                <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                  Created
                </TableHead>
                <TableHead className="text-muted-foreground px-4 text-right text-xs tracking-wider uppercase">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow className="border-border hover:bg-transparent">
                  <TableCell colSpan={11} className="py-10 text-center">
                    <p className="text-sm text-muted-foreground">
                      No packages match your filters
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => {
                  const ItemIcon = itemTypeTone[p.itemType].icon;
                  const unassigned = p.courier === null;
                  return (
                    <TableRow
                      key={p.id}
                      className="border-border hover:bg-muted/50"
                    >
                      <TableCell className="px-4 font-mono text-xs text-foreground/80">
                        {p.id}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {truncate(p.sender, 22)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {truncate(p.recipient, 22)}
                      </TableCell>
                      <TableCell className="max-w-[280px]">
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <span className="truncate">{truncate(p.pickup, 22)}</span>
                          <ArrowRight
                            className="size-3 shrink-0 text-muted-foreground/60"
                            aria-hidden
                          />
                          <span className="truncate">{truncate(p.dropoff, 22)}</span>
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "gap-1",
                            itemTypeTone[p.itemType].className,
                          )}
                        >
                          <ItemIcon className="size-3" aria-hidden />
                          {p.itemType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground tabular-nums">
                          <Weight className="size-3" aria-hidden />
                          {p.weight}
                        </span>
                      </TableCell>
                      <TableCell>
                        {unassigned ? (
                          <span className="text-sm italic text-muted-foreground">
                            Unassigned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                            <span className="size-1.5 rounded-full bg-amber" />
                            {p.courier}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          tone={statusTone[p.status]}
                          dot={p.status === "In transit"}
                        >
                          {p.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell className="font-mono font-medium text-foreground tabular-nums">
                        {p.fee}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <MapPin className="size-3 opacity-0" aria-hidden />
                          {p.createdAt}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 text-right">
                        <Button
                          size="sm"
                          variant={unassigned ? "default" : "outline"}
                          className="gap-1.5"
                        >
                          {unassigned ? (
                            "Assign courier"
                          ) : (
                            <>
                              <Eye className="size-3.5" aria-hidden />
                              View
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatusFilterProps {
  value: PackageStatus | "All";
  onChange: (value: PackageStatus | "All") => void;
}

function StatusFilter({ value, onChange }: StatusFilterProps) {
  // Lightweight native select styled to match the shadcn Select trigger look
  // (same pattern used by chauffeur-bookings-table) — keeps the table SSR
  // friendly without a popper portal.
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as PackageStatus | "All")}
        className={cn(
          "h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow]",
          "hover:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "sm:w-40",
        )}
        aria-label="Filter packages by status"
      >
        {statusFilterOptions.map((s) => (
          <option key={s} value={s}>
            {s === "All" ? "All statuses" : s}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground opacity-60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export default PackagesAdminTable;
