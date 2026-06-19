import { ChevronLeft, Navigation, Shield } from 'lucide-react'
import { DriverCard } from '@/components/eer/driver-card'
import { StatusBadge } from '@/components/eer/status-badge'
import { Button } from '@/components/ui/button'

export function TrackingScreen() {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Map area */}
      <div className="relative flex-1 overflow-hidden bg-[oklch(0.3_0.05_255)]">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(oklch(1_0_0/0.08)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
        <header className="relative flex items-center justify-between px-5 pt-6">
          <button
            type="button"
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full bg-card text-foreground shadow-md"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <StatusBadge tone="success" dot>
            On the way
          </StatusBadge>
        </header>

        <div className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30">
          <Navigation className="size-6 fill-current" aria-hidden />
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="space-y-4 rounded-t-3xl border-t border-border bg-card px-5 pt-5 pb-6 shadow-2xl">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-muted" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Arriving in</p>
            <p className="text-2xl font-semibold text-card-foreground">
              4 min
            </p>
          </div>
          <StatusBadge tone="brand">Eagle X</StatusBadge>
        </div>

        <DriverCard
          name="Marcus Reed"
          rating={4.9}
          car="Tesla Model 3"
          plate="EAG-4821"
          initials="MR"
        />

        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-11 flex-1">
            <Shield className="size-4" aria-hidden />
            Share trip
          </Button>
          <Button variant="destructive" className="h-11 flex-1">
            Cancel ride
          </Button>
        </div>
      </div>
    </div>
  )
}
