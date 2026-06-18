import { Car, Megaphone, Package, Truck, MapPin, Clock } from 'lucide-react'
import { AppHeader } from '@/components/eer/app-header'
import { BottomNav } from '@/components/eer/bottom-nav'
import { EmptyState } from '@/components/eer/empty-state'
import { SectionLabel } from '@/components/eer/section-label'
import { ServiceCard } from '@/components/eer/service-card'
import { StatusBadge } from '@/components/eer/status-badge'

export function HomeScreen() {
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader />

      <div className="flex-1 space-y-6 px-5 py-6">
        <section className="space-y-3">
          <SectionLabel>Services</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            <ServiceCard
              icon={Car}
              title="Reserve"
              description="Book a ride"
              accent="cyan"
            />
            <ServiceCard
              icon={Package}
              title="Packages"
              description="Send items"
              accent="amber"
            />
            <ServiceCard
              icon={Megaphone}
              title="Ads"
              description="Promote"
              accent="magenta"
            />
            <ServiceCard
              icon={Truck}
              title="Tow Truck"
              description="Roadside help"
              accent="gold"
            />
          </div>
        </section>

        <section className="space-y-3">
          <SectionLabel action={<StatusBadge tone="muted">Recent</StatusBadge>}>
            Saved places
          </SectionLabel>
          <div className="space-y-2">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                <MapPin className="size-4" aria-hidden />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">Home</p>
                <p className="text-xs text-muted-foreground">
                  124 Riverside Ave
                </p>
              </div>
              <Clock className="size-4 text-muted-foreground" aria-hidden />
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-amber/15 text-amber">
                <MapPin className="size-4" aria-hidden />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">Work</p>
                <p className="text-xs text-muted-foreground">
                  Eagle Tower, 9th floor
                </p>
              </div>
              <Clock className="size-4 text-muted-foreground" aria-hidden />
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <SectionLabel>Promotions</SectionLabel>
          <EmptyState
            icon={Megaphone}
            title="No promotions right now"
            description="Check back soon for ride discounts and offers."
          />
        </section>
      </div>

      <BottomNav className="sticky bottom-0" />
    </div>
  )
}
