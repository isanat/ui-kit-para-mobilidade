import * as React from "react";
import { Flag, MoreHorizontal, Star } from "lucide-react";

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

export interface RatingRow {
  id: string;
  rideId: string;
  rider: string;
  driver: string;
  stars: number;
  comment: string;
  date: string;
  flagged: boolean;
}

const defaultRatings: RatingRow[] = [
  {
    id: "rtg-1",
    rideId: "EER-4821",
    rider: "Olivia Bennett",
    driver: "Dana Whitfield",
    stars: 5,
    comment:
      "Smooth ride from Logan to the Four Seasons. Dana was early, professional, and the car was spotless. Would book again.",
    date: "Jun 14, 09:55",
    flagged: false,
  },
  {
    id: "rtg-2",
    rideId: "EER-4820",
    rider: "Daniel Cho",
    driver: "Jules Okafor",
    stars: 5,
    comment:
      "Jules took a smart route through the Seaport to avoid traffic. Great conversation, very punctual.",
    date: "Jun 14, 09:40",
    flagged: false,
  },
  {
    id: "rtg-3",
    rideId: "EER-4817",
    rider: "Aaliyah Washington",
    driver: "Hannah Kowalski",
    stars: 3,
    comment:
      "Ride was fine but the driver took a longer route to Logan. Got there on time though, so not a big issue.",
    date: "Jun 14, 08:25",
    flagged: false,
  },
  {
    id: "rtg-4",
    rideId: "EER-4816",
    rider: "Liam Walsh",
    driver: "Jules Okafor",
    stars: 5,
    comment:
      "Top-tier experience from Prudential to Harvard. Clean Tesla, smooth ride, friendly driver. Five stars.",
    date: "Jun 14, 08:05",
    flagged: false,
  },
  {
    id: "rtg-5",
    rideId: "EER-4812",
    rider: "James O'Connor",
    driver: "Marco Rinaldi",
    stars: 2,
    comment:
      "Driver was 15 minutes late to Fenway and the car smelled of smoke. Filed a complaint — waiting on refund for the late fee.",
    date: "Jun 13, 16:20",
    flagged: true,
  },
];

function StarRow({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${value} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < value
              ? "fill-gold text-gold"
              : "fill-transparent text-muted-foreground/40",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function truncate(text: string, max = 64) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

interface RatingsTableProps {
  ratings?: RatingRow[];
  className?: string;
}

type FilterValue = "all" | "flagged" | "high" | "low";

export function RatingsTable({
  ratings = defaultRatings,
  className,
}: RatingsTableProps) {
  const [filter, setFilter] = React.useState<FilterValue>("all");

  const filtered = React.useMemo(() => {
    switch (filter) {
      case "flagged":
        return ratings.filter((r) => r.flagged);
      case "high":
        return ratings.filter((r) => r.stars >= 4);
      case "low":
        return ratings.filter((r) => r.stars <= 3);
      default:
        return ratings;
    }
  }, [ratings, filter]);

  const average = React.useMemo(() => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.stars, 0);
    return sum / ratings.length;
  }, [ratings]);

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gold/20 text-gold">
            <Star className="size-4 fill-gold" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Ratings</CardTitle>
            <CardDescription>Rider feedback &amp; reviews</CardDescription>
          </div>
        </div>
        <CardAction>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-gold tabular-nums"
            >
              <Star className="size-3 fill-gold" aria-hidden />
              {average.toFixed(2)} avg
            </Badge>
            <Select
              value={filter}
              onValueChange={(v) => setFilter(v as FilterValue)}
            >
              <SelectTrigger size="sm" className="w-36" aria-label="Filter ratings">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ratings</SelectItem>
                <SelectItem value="high">4★ and above</SelectItem>
                <SelectItem value="low">3★ and below</SelectItem>
                <SelectItem value="flagged">Flagged only</SelectItem>
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
                Rating ID
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Ride ID
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Rider
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Driver
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Stars
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Comment
              </TableHead>
              <TableHead className="text-muted-foreground text-xs tracking-wider uppercase">
                Submitted
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-center text-xs tracking-wider uppercase">
                Flag
              </TableHead>
              <TableHead className="text-muted-foreground px-6 text-right text-xs tracking-wider uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow
                key={r.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="px-6 font-mono text-xs text-foreground/80">
                  {r.id}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {r.rideId}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {r.rider}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {r.driver}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <StarRow value={r.stars} />
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {r.stars}.0
                    </span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[320px] text-muted-foreground">
                  <span title={r.comment}>{truncate(r.comment)}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {r.date}
                </TableCell>
                <TableCell className="px-6 text-center">
                  {r.flagged ? (
                    <span
                      className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-medium text-destructive"
                      title="Flagged for review"
                    >
                      <Flag className="size-3 fill-destructive" aria-hidden />
                      Flagged
                    </span>
                  ) : (
                    <span className="text-muted-foreground/50">—</span>
                  )}
                </TableCell>
                <TableCell className="px-6 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-muted-foreground hover:text-foreground"
                    aria-label={`Actions for ${r.id}`}
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
                  No ratings match this filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RatingsTable;
