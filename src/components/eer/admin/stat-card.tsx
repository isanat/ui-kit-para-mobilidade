import * as React from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { accentSoft, accentSolid, type Accent } from "@/components/eer/accents";

export interface StatCardData {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon?: LucideIcon;
  accent?: Accent;
}

interface StatCardProps extends StatCardData {
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  accent = "brand",
  className,
}: StatCardProps) {
  const TrendIcon = trend === "down" ? ArrowDownRight : ArrowUpRight;
  const trendColor =
    trend === "down"
      ? "text-destructive"
      : "text-success";

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {label}
        </p>
        {Icon && (
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-xl",
              accentSoft[accent],
            )}
          >
            <Icon className="size-4" aria-hidden />
          </span>
        )}
      </div>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>

      {(change || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-1 font-medium",
              trendColor,
            )}
          >
            <TrendIcon className="size-3.5" aria-hidden />
            {change ?? (trend === "down" ? "0%" : "0%")}
          </span>
          <span className="text-muted-foreground">vs last week</span>
        </div>
      )}
    </Card>
  );
}

export default StatCard;
