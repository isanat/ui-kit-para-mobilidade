'use client'

import {
  ArrowLeft,
  Car,
  ChevronRight,
  Clock,
  Home as HomeIcon,
  MapPin,
  MessageSquare,
  Phone,
  Settings as SettingsIcon,
  User as UserIcon,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { EerState, EerSkeletonList } from '../../state'
import { EerBookingStatusBadge } from '../../status-badge'
import {
  mockDriverRides,
  formatUSD,
  formatDistance,
  formatDuration,
  formatRelativeTime,
  formatDateTime,
  type BookingStatus,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

type DriverRide = (typeof mockDriverRides)[number]

// ── Bottom nav (driver — monochrome active state) ──
function DriverBottomNav({ active = 'rides' }: { active?: string }) {
  const [current, setCurrent] = useState(active)
  const items: { id: string; icon: LucideIcon; label: string }[] = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'rides', icon: Car, label: 'Rides' },
    { id: 'earnings', icon: Wallet, label: 'Earnings' },
    { id: 'account', icon: UserIcon, label: 'Account' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ]
  return (
    <div className="flex items-center justify-around border-t border-border bg-background px-1.5 py-2 pb-safe">
      {items.map((item) => {
        const isActive = item.id === current
        return (
          <button
            key={item.id}
            onClick={() => setCurrent(item.id)}
            className={cn(
              'flex flex-col items-center gap-1 rounded-lg px-2.5 py-1.5 transition-base',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            <item.icon className="size-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// ── Filter pills with counts ──
type FilterId = 'active' | 'completed' | 'cancelled' | 'all'

const filterMap: Record<FilterId, (r: DriverRide) => boolean> = {
  active: (r) =>
    ['scheduled', 'accepted', 'en-route', 'arrived', 'in-progress'].includes(r.status),
  completed: (r) => r.status === 'completed',
  cancelled: (r) => r.status === 'cancelled',
  all: () => true,
}

function FilterPills({
  active,
  onSelect,
  counts,
}: {
  active: FilterId
  onSelect: (f: FilterId) => void
  counts: Record<FilterId, number>
}) {
  const pills: { id: FilterId; label: string }[] = [
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'all', label: 'All' },
  ]
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3 shadow-sm">
      {pills.map((p) => {
        const isActive = p.id === active
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-base',
              isActive
                ? 'border-foreground bg-foreground text-background'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {p.label}
            <span
              className={cn(
                'rounded-full px-1.5 text-[10px] font-semibold tabular-nums',
                isActive ? 'bg-background/15' : 'bg-muted',
              )}
            >
              {counts[p.id]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ── Monochrome solid header ──
function RidesHeader({ onBack }: { onBack?: () => void }) {
  return (
    <header className="eer-header-solid px-5 pb-6 pt-10 text-foreground">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-base hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
        </button>
        <span className="eer-display text-sm font-semibold text-foreground">My Rides</span>
        <div className="size-9" />
      </div>
      <h1 className="eer-display mt-4 text-xl text-foreground">Ride history</h1>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Active rides, completed trips, and cancellations.
      </p>
    </header>
  )
}

// ── Ride card (tappable) ──
function RideCard({
  ride,
  onClick,
}: {
  ride: DriverRide
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="eer-card-elevated eer-hover-lift flex w-full items-center gap-3 p-4 text-left active:scale-[0.99]"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
        <Car className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-foreground">
            {ride.passenger.name}
          </p>
          <span className="text-[10px] text-muted-foreground">· {ride.vehicleClass}</span>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {ride.pickup.label} → {ride.dropoff.label}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <EerBookingStatusBadge status={ride.status} />
          <span className="text-[11px] text-muted-foreground">
            {formatRelativeTime(ride.date)}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end">
        <span
          className={cn(
            'text-sm font-semibold tabular-nums',
            ride.status === 'cancelled' ? 'text-muted-foreground' : 'text-foreground',
          )}
        >
          {ride.fare > 0 ? formatUSD(ride.fare + (ride.tip ?? 0)) : '—'}
        </span>
        {ride.tip > 0 && (
          <span className="text-[11px] tabular-nums text-muted-foreground">+{formatUSD(ride.tip, { showCents: false })} tip</span>
        )}
        <ChevronRight className="mt-1 size-4 text-muted-foreground" />
      </div>
    </button>
  )
}

// ── Detail cell ──
function DetailCell({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="eer-card-elevated p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3" />
        {label}
      </div>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}

// ── Ride detail bottom sheet ──
function RideDetailSheet({
  ride,
  open,
  onOpenChange,
}: {
  ride: DriverRide | null
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  if (!ride) return null
  const serviceFee = ride.fare * 0.15
  const total = ride.fare + (ride.tip ?? 0)
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-h-[90vh] max-w-[380px] overflow-y-auto scrollbar-thin rounded-t-2xl p-0">
        <SheetHeader className="px-5 pt-5">
          <div className="flex items-center justify-between pr-6">
            <SheetTitle className="text-base">Ride {ride.bookingId}</SheetTitle>
            <EerBookingStatusBadge status={ride.status} />
          </div>
          <SheetDescription className="sr-only">Ride details</SheetDescription>
        </SheetHeader>

        <div className="px-5 pb-6">
          {/* Status / date row */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {formatDateTime(ride.date)}
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{ride.vehicleClass}</span>
          </div>

          {/* Passenger info + call button */}
          <div className="eer-card-elevated mt-4 flex items-center gap-3 p-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
              {ride.passenger.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {ride.passenger.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {ride.passenger.phone}
              </p>
            </div>
            <Button
              size="icon"
              className="size-9 rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <Phone className="size-4" />
            </Button>
          </div>

          {/* Earnings grid */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <DetailCell icon={Wallet} label="Fare" value={formatUSD(ride.fare)} />
            <DetailCell
              icon={MessageSquare}
              label="Tip"
              value={ride.tip ? formatUSD(ride.tip) : '—'}
            />
            <DetailCell
              icon={Car}
              label="Service fee"
              value={ride.fare > 0 ? formatUSD(serviceFee) : '—'}
            />
            <DetailCell
              icon={Clock}
              label="Duration"
              value={formatDuration(ride.duration)}
            />
          </div>

          {/* Route info */}
          <div className="eer-card-elevated mt-4 flex items-stretch gap-3 p-3">
            <div className="flex flex-col items-center pt-1">
              <div className="size-2.5 rounded-full bg-foreground ring-4 ring-foreground/15" />
              <div className="my-1 w-0.5 grow bg-border" />
              <div className="size-2.5 rounded-full bg-muted-foreground ring-4 ring-muted-foreground/15" />
            </div>
            <div className="flex-1 space-y-3 py-0.5">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Pickup
                </p>
                <p className="truncate text-sm font-medium text-foreground">
                  {ride.pickup.label}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {ride.pickup.line}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Dropoff
                </p>
                <p className="truncate text-sm font-medium text-foreground">
                  {ride.dropoff.label}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {ride.dropoff.line}
                </p>
              </div>
            </div>
          </div>

          {/* Distance */}
          <div className="eer-card-elevated mt-3 flex items-center justify-between p-3 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" />
              Distance
            </span>
            <span className="font-medium text-foreground">
              {formatDistance(ride.distance)}
            </span>
          </div>

          {/* Total */}
          <div className="eer-card-elevated mt-3 space-y-2 p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Fare</span>
              <span className="text-foreground">{formatUSD(ride.fare)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tip</span>
              <span className="text-foreground">
                {ride.tip ? formatUSD(ride.tip) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 font-semibold">
              <span className="text-foreground">Total earned</span>
              <span className="text-foreground tabular-nums">{formatUSD(total)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" className="rounded-xl border-border bg-card text-foreground">
              <MessageSquare className="size-4" />
              Message
            </Button>
            <Button className="rounded-xl bg-foreground text-background hover:bg-foreground/90">
              <Phone className="size-4" />
              Call passenger
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Main pattern component ──
export function D2RidesList({ state, onStateChange }: PatternProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [selectedRide, setSelectedRide] = useState<DriverRide | null>(null)

  const counts = useMemo<Record<FilterId, number>>(
    () => ({
      active: mockDriverRides.filter(filterMap.active).length,
      completed: mockDriverRides.filter(filterMap.completed).length,
      cancelled: mockDriverRides.filter(filterMap.cancelled).length,
      all: mockDriverRides.length,
    }),
    [],
  )

  const filteredRides = useMemo(
    () => mockDriverRides.filter(filterMap[activeFilter]),
    [activeFilter],
  )

  // ── Loading ──
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <RidesHeader />
          <FilterPills
            active={activeFilter}
            onSelect={setActiveFilter}
            counts={counts}
          />
          <div className="px-5 pb-8">
            <EerSkeletonList count={4} />
          </div>
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Error ──
  if (state === 'error') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <RidesHeader />
          <EerState
            state="error"
            title="Couldn't load your rides"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Empty ──
  if (state === 'empty' || filteredRides.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <RidesHeader />
          <FilterPills
            active={activeFilter}
            onSelect={setActiveFilter}
            counts={counts}
          />
          <EerState
            state="empty"
            title="No rides yet"
            description="When you accept a ride, it will show up here."
            actionLabel="Go online"
            onAction={() => onStateChange?.('populated')}
          />
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Populated & success (success maps to populated) ──
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <RidesHeader />
        <FilterPills
          active={activeFilter}
          onSelect={setActiveFilter}
          counts={counts}
        />
        <div className="space-y-2 px-5 pb-8">
          {filteredRides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              onClick={() => setSelectedRide(ride)}
            />
          ))}
        </div>
      </div>
      <RideDetailSheet
        ride={selectedRide}
        open={!!selectedRide}
        onOpenChange={(v) => !v && setSelectedRide(null)}
      />
      <DriverBottomNav />
    </div>
  )
}
