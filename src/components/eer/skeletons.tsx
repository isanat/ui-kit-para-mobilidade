import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Eagle Eye Rides — loading skeletons.
 * Each skeleton mirrors the proportions of a real EER component so the
 * loading layout doesn't shift when content arrives.
 */

interface SkeletonProps {
  className?: string;
}

/** Rounded-2xl card placeholder. Matches `Card` / service-card / driver-card. */
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 flex-1 rounded-lg" />
      </div>
    </div>
  );
}

/** Stat / KPI card placeholder. Matches `admin/stat-card.tsx`. */
export function StatCardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="size-9 rounded-xl" />
      </div>
      <Skeleton className="mt-3 h-8 w-24" />
      <div className="mt-3 flex items-center gap-2">
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

/** Table placeholder — header row + 5 body rows. Matches admin tables. */
export function TableSkeleton({
  rows = 5,
  columns = 5,
  className,
}: SkeletonProps & { rows?: number; columns?: number }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border bg-muted/30 px-6 py-3">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`h-${i}`} className="h-3 flex-1" />
        ))}
      </div>
      {/* Rows */}
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, r) => (
          <div
            key={`r-${r}`}
            className="flex items-center gap-4 px-6 py-4"
          >
            {Array.from({ length: columns }).map((_, c) => (
              <Skeleton
                key={`c-${r}-${c}`}
                className={cn("h-3", c === 0 ? "w-16" : "flex-1")}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Ride-option row placeholder. Matches `ride-option.tsx`. */
export function RideOptionSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-card p-3",
        className,
      )}
    >
      <Skeleton className="size-11 shrink-0 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-5 w-14" />
    </div>
  );
}

/** Driver card placeholder. Matches `driver-card.tsx`. */
export function DriverCardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-card p-4",
        className,
      )}
    >
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-2/5" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="size-9 rounded-full" />
      </div>
    </div>
  );
}

/** Full mobile-screen placeholder — header bar + content blocks. */
export function ScreenSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("flex h-full flex-col bg-background", className)}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
        <Skeleton className="size-9 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="size-9 rounded-full" />
      </div>

      {/* Body */}
      <div className="flex-1 space-y-4 px-5 py-6">
        <Skeleton className="h-24 rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        <Skeleton className="h-3 w-20" />
        <div className="space-y-2">
          <Skeleton className="h-16 rounded-2xl" />
          <Skeleton className="h-16 rounded-2xl" />
          <Skeleton className="h-16 rounded-2xl" />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between border-t border-border bg-card px-2 py-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-1 flex-col items-center gap-1 py-1.5"
          >
            <Skeleton className="size-9 rounded-xl" />
            <Skeleton className="h-2 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skeleton;
