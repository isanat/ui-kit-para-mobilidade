import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

/**
 * A single 380×760 mobile mockup. The frame keeps its natural width so the
 * screen content inside is never compressed — on narrow viewports the parent
 * gallery scrolls horizontally instead of shrinking the phone.
 */
export function PhoneFrame({ children, label, className }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 snap-center flex-col items-center gap-3",
        className,
      )}
    >
      <div className="relative h-[760px] w-[380px] overflow-hidden rounded-[2.75rem] border-[10px] border-foreground/10 bg-background shadow-2xl ring-1 ring-border">
        <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground/10" />
        <div className="flex h-full flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Responsive gallery of PhoneFrames.
 *
 * - On mobile (< sm): a horizontal snap-scroller — each phone keeps its full
 *   380px width and the user swipes between them. No compression.
 * - On desktop (>= sm): a wrapping flex row, centered/left-aligned.
 *
 * Use this anywhere you render multiple <PhoneFrame />s side by side.
 */
export function PhoneGallery({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 lg:justify-start",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
