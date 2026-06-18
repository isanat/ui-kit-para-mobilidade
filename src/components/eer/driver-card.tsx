import { Phone, Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface DriverCardProps {
  name: string;
  rating: number;
  car: string;
  plate: string;
  initials: string;
  className?: string;
}

export function DriverCard({
  name,
  rating,
  car,
  plate,
  initials,
  className,
}: DriverCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-card p-4",
        className,
      )}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
        {initials}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-card-foreground">{name}</p>
          <span className="inline-flex items-center gap-0.5 text-sm text-muted-foreground">
            <Star className="size-3.5 fill-gold text-gold" aria-hidden />
            {rating.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {car} · {plate}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Message driver"
          className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent"
        >
          <MessageSquare className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Call driver"
          className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Phone className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
