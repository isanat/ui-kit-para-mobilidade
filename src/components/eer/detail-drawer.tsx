"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface DetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Right-aligned footer action bar (usually buttons). */
  footer?: React.ReactNode;
  /** "right" = desktop side drawer (default). "bottom" = mobile bottom sheet. */
  side?: "right" | "bottom";
  className?: string;
}

/**
 * Reusable detail drawer — the pattern used across the admin console:
 * click a ride in the table → drawer with full details + action footer.
 *
 * Built on shadcn `Sheet`. The header (title + description + close X) is
 * rendered automatically; the body is scrollable (max 70vh) and the footer
 * is a sticky action bar pinned to the bottom.
 *
 * @example
 * <DetailDrawer
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Ride EER-4821"
 *   description="Marcus Bell · Today, 09:42"
 *   footer={
 *     <>
 *       <Button variant="outline" className="flex-1">Cancel ride</Button>
 *       <Button className="flex-1">Assign driver</Button>
 *     </>
 *   }
 * >
 *   <RideDetailBody ride={ride} />
 * </DetailDrawer>
 */
export function DetailDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  side = "right",
  className,
}: DetailDrawerProps) {
  const isBottom = side === "bottom";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={cn(
          "flex w-full flex-col gap-0 p-0 sm:max-w-md",
          isBottom && "rounded-t-2xl sm:max-w-md",
          className,
        )}
      >
        {/* Header */}
        <SheetHeader
          className={cn(
            "shrink-0 border-b border-border bg-card px-5 py-4",
            isBottom && "flex-row items-center justify-between gap-3 space-y-0",
          )}
        >
          <div className="flex-1 space-y-1 text-left">
            <SheetTitle className="text-base font-semibold">
              {title}
            </SheetTitle>
            {description && (
              <SheetDescription className="text-xs">
                {description}
              </SheetDescription>
            )}
          </div>
        </SheetHeader>

        {/* Scrollable body */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-5 py-4",
            isBottom ? "max-h-[70vh]" : "max-h-[70vh]",
          )}
        >
          {children}
        </div>

        {/* Sticky footer */}
        {footer && (
          <div className="sticky bottom-0 flex shrink-0 gap-2 border-t border-border bg-card px-5 py-3">
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default DetailDrawer;
