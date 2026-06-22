'use client'

import {
  Bell,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  HandCoins,
  Home as HomeIcon,
  MapPin,
  Navigation,
  Power,
  Settings as SettingsIcon,
  Star,
  Truck,
  User as UserIcon,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { EerState, EerSkeleton } from '../../state'
import { EerBookingStatusBadge } from '../../status-badge'
import {
  mockDrivers,
  mockDriverToday,
  mockDriverRides,
  formatUSD,
  formatDistance,
  formatDuration,
  formatRelativeTime,
  type BookingStatus,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Bottom nav (driver — emerald active state) ──
function DriverBottomNav({ active = 'home' }: { active?: string }) {
  const [current, setCurrent] = useState(active)
  const items: { id: string; icon: LucideIcon; label: string }[] = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'rides', icon: Car, label: 'Rides' },
    { id: 'earnings', icon: Wallet, label: 'Earnings' },
    { id: 'account', icon: UserIcon, label: 'Account' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ]
  return (
    <div className="flex items-center justify-around border-t border-border bg-card px-1.5 py-2 pb-safe">
      {items.map((item) => {
        const isActive = item.id === current
        return (
          <button
            key={item.id}
            onClick={() => setCurrent(item.id)}
            className={cn(
              'flex flex-col items-center gap-1 rounded-lg px-2.5 py-1.5 transition-base',
              isActive ? 'text-success' : 'text-muted-foreground',
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

// ── Online/Offline toggle pill ──
function OnlineToggle({
  online,
  onToggle,
}: {
  online: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={online ? 'Go offline' : 'Go online'}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition-all-eer',
        online
          ? 'bg-success-foreground/25 text-success-foreground'
          : 'bg-white/10 text-success-foreground/80',
      )}
    >
      <span
        className={cn(
          'size-2 rounded-full',
          online ? 'bg-success-foreground animate-pulse' : 'bg-muted-foreground',
        )}
      />
      {online ? 'Online' : 'Offline'}
      <Power className="size-3.5" />
    </button>
  )
}

// ── Driver header ──
function DriverHeader({
  driver,
  online,
  onToggleOnline,
}: {
  driver: typeof mockDrivers[0]
  online: boolean
  onToggleOnline: () => void
}) {
  const initials = driver.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div className="bg-gradient-to-br from-success to-success/80 px-5 pb-10 pt-10 text-success-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white/15">
            <Truck className="size-4" />
          </div>
          <span className="text-sm font-semibold">Eagle Eye Rides</span>
        </div>
        <button className="relative flex size-9 items-center justify-center rounded-full bg-white/15 transition-base hover:bg-white/20">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-success" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 font-bold backdrop-blur-sm">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs opacity-80">Good evening,</p>
            <h1 className="truncate text-xl font-bold">{driver.name.split(' ')[0]}</h1>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] opacity-80">
              <Star className="size-3 fill-current text-warning" />
              {driver.rating} · {driver.totalRides} rides
            </p>
          </div>
        </div>
        <OnlineToggle online={online} onToggle={onToggleOnline} />
      </div>
    </div>
  )
}

// ── Earnings hero card ──
function EarningsHero({ today }: { today: typeof mockDriverToday }) {
  return (
    <div className="mx-4 -mt-6 rounded-2xl border border-border bg-card p-4 shadow-lg slide-up">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Today&apos;s Earnings
          </p>
          <p className="mt-0.5 text-3xl font-bold text-foreground">
            {formatUSD(today.earnings)}
          </p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
          <Navigation className="size-3" />
          +12%
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 divide-x divide-border border-t border-border pt-3">
        <div className="px-2 text-center">
          <p className="text-sm font-bold text-foreground">{today.rides}</p>
          <p className="text-[11px] text-muted-foreground">Rides</p>
        </div>
        <div className="px-2 text-center">
          <p className="flex items-center justify-center gap-0.5 text-sm font-bold text-foreground">
            <HandCoins className="size-3 text-amber" />
            {formatUSD(today.tipsToday, { showCents: false })}
          </p>
          <p className="text-[11px] text-muted-foreground">Tips</p>
        </div>
        <div className="px-2 text-center">
          <p className="flex items-center justify-center gap-0.5 text-sm font-bold text-foreground">
            <CheckCircle2 className="size-3 text-success" />
            {today.completed}
          </p>
          <p className="text-[11px] text-muted-foreground">Completed</p>
        </div>
      </div>
    </div>
  )
}

// ── Quick actions 2x2 grid ──
const quickActions: {
  icon: LucideIcon
  label: string
  color: string
}[] = [
  { icon: Car, label: 'Rides', color: 'bg-success/15 text-success' },
  { icon: Wallet, label: 'Earnings', color: 'bg-primary/15 text-primary' },
  { icon: DollarSign, label: 'Withdrawals', color: 'bg-amber/15 text-amber' },
  { icon: SettingsIcon, label: 'Settings', color: 'bg-magenta/15 text-magenta' },
]

function QuickActions() {
  return (
    <div className="px-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((a) => (
          <button
            key={a.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all-eer hover:border-success/30 hover:shadow-sm active:scale-[0.98]"
          >
            <div
              className={cn(
                'flex size-10 items-center justify-center rounded-lg',
                a.color,
              )}
            >
              <a.icon className="size-5" />
            </div>
            <span className="truncate text-sm font-medium text-foreground">
              {a.label}
            </span>
            <ChevronRight className="ml-auto size-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Active ride card with action buttons ──
type DriverRide = (typeof mockDriverRides)[number]

const actionLabels: Record<BookingStatus, { primary?: string; secondary?: string }> = {
  scheduled: { primary: 'Start', secondary: 'Cancel' },
  searching: { secondary: 'Decline' },
  accepted: { primary: 'Start ride', secondary: 'Cancel' },
  'en-route': { primary: 'Arrived', secondary: 'Cancel' },
  arrived: { primary: 'Start ride' },
  'in-progress': { primary: 'Complete' },
  completed: {},
  cancelled: {},
}

function RideActions({ status }: { status: BookingStatus }) {
  const a = actionLabels[status]
  if (!a.primary && !a.secondary) return null
  return (
    <div className="mt-3 flex gap-2">
      {a.secondary && (
        <Button variant="outline" size="sm" className="flex-1 rounded-lg">
          {a.secondary}
        </Button>
      )}
      {a.primary && (
        <Button
          size="sm"
          className="flex-1 rounded-lg bg-success text-success-foreground hover:bg-success/90"
        >
          {a.primary}
        </Button>
      )}
    </div>
  )
}

function ActiveRideCard({ ride }: { ride: DriverRide }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <EerBookingStatusBadge status={ride.status} />
        <span className="text-xs font-medium text-muted-foreground">
          {ride.bookingId}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-success/10 text-sm font-bold text-success">
          {ride.passenger.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {ride.passenger.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">{ride.vehicleClass}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">
            {formatUSD(ride.fare + (ride.tip ?? 0))}
          </p>
          {ride.tip > 0 && (
            <p className="text-[11px] text-amber">
              +{formatUSD(ride.tip, { showCents: false })} tip
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-stretch gap-2 border-t border-border pt-3 text-xs">
        <div className="flex flex-col items-center pt-0.5">
          <span className="size-2 rounded-full bg-success ring-4 ring-success/15" />
          <span className="my-1 w-0.5 grow bg-border" />
          <span className="size-2 rounded-full bg-destructive ring-4 ring-destructive/15" />
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <p className="truncate font-medium text-foreground">{ride.pickup.label}</p>
            <p className="truncate text-muted-foreground">{ride.pickup.line}</p>
          </div>
          <div>
            <p className="truncate font-medium text-foreground">{ride.dropoff.label}</p>
            <p className="truncate text-muted-foreground">{ride.dropoff.line}</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between text-right">
          <span className="flex items-center gap-0.5 text-muted-foreground">
            <MapPin className="size-3" />
            {formatDistance(ride.distance)}
          </span>
          <span className="flex items-center gap-0.5 text-muted-foreground">
            <Clock className="size-3" />
            {formatDuration(ride.duration)}
          </span>
        </div>
      </div>
      <RideActions status={ride.status} />
    </div>
  )
}

// ── Recent ride row (compact) ──
function RecentRideRow({ ride }: { ride: DriverRide }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all-eer hover:border-success/30 active:scale-[0.99]">
      <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Car className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {ride.passenger.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {ride.pickup.label} → {ride.dropoff.label}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <span
          className={cn(
            'text-sm font-semibold',
            ride.status === 'cancelled' ? 'text-muted-foreground' : 'text-foreground',
          )}
        >
          {ride.fare > 0 ? formatUSD(ride.fare + (ride.tip ?? 0)) : '—'}
        </span>
        <span className="text-[11px] text-muted-foreground">
          {formatRelativeTime(ride.date)}
        </span>
      </div>
    </button>
  )
}

// ── Loading skeleton ──
function DashboardLoading() {
  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-br from-success to-success/80 px-5 pb-10 pt-10">
        <div className="flex items-center justify-between">
          <EerSkeleton className="h-8 w-32 bg-white/15" />
          <EerSkeleton className="size-9 rounded-full bg-white/15" />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <EerSkeleton className="size-12 rounded-full bg-white/15" />
          <div className="flex-1 space-y-2">
            <EerSkeleton className="h-3 w-16 bg-white/15" />
            <EerSkeleton className="h-5 w-32 bg-white/15" />
          </div>
          <EerSkeleton className="h-7 w-20 rounded-full bg-white/15" />
        </div>
      </div>
      <div className="mx-4 -mt-6 space-y-3 rounded-2xl border border-border bg-card p-4 shadow-lg">
        <EerSkeleton className="h-3 w-28" />
        <EerSkeleton className="h-9 w-40" />
        <div className="grid grid-cols-3 gap-3 border-t border-border pt-3">
          <EerSkeleton className="h-10" />
          <EerSkeleton className="h-10" />
          <EerSkeleton className="h-10" />
        </div>
      </div>
      <div className="mt-5 space-y-3 px-4">
        <EerSkeleton className="h-4 w-24" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <EerSkeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Success toast banner ──
function SuccessBanner({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="mx-4 -mt-4 rounded-2xl border border-success/30 bg-success/10 p-4 spring-in">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-success text-success-foreground">
          <CheckCircle2 className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{message}</p>
          <p className="truncate text-sm text-muted-foreground">{sub}</p>
        </div>
      </div>
    </div>
  )
}

// ── Main pattern component ──
export function D1Dashboard({ state, onStateChange }: PatternProps) {
  const driver = mockDrivers[0]
  const [online, setOnline] = useState(true)

  const activeRides = mockDriverRides.filter((r) =>
    ['scheduled', 'accepted', 'en-route', 'arrived', 'in-progress'].includes(r.status),
  )
  const recentRides = mockDriverRides.filter(
    (r) => r.status === 'completed' || r.status === 'cancelled',
  )

  // ── Loading ──
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <DashboardLoading />
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
          <DriverHeader
            driver={driver}
            online={online}
            onToggleOnline={() => setOnline((v) => !v)}
          />
          <EerState
            state="error"
            title="Couldn't load dashboard"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Success ──
  if (state === 'success') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <DriverHeader
            driver={driver}
            online={online}
            onToggleOnline={() => setOnline((v) => !v)}
          />
          <SuccessBanner
            message="Ride accepted!"
            sub="Olivia Martinez · Black SUV · 16.2 mi"
          />
          <div className="mt-5 space-y-5 pb-6">
            <EarningsHero today={mockDriverToday} />
            <QuickActions />
          </div>
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Populated & empty ──
  const showEmptyActive = state === 'empty' || (online && activeRides.length === 0)

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <DriverHeader
          driver={driver}
          online={online}
          onToggleOnline={() => setOnline((v) => !v)}
        />
        <EarningsHero today={mockDriverToday} />
        <div className="mt-5 space-y-5 pb-6">
          <QuickActions />

          {/* Active Rides */}
          <div className="px-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Active Rides</h2>
              <span className="text-xs text-muted-foreground">
                {online ? 'Live' : 'Offline'}
              </span>
            </div>
            {showEmptyActive ? (
              <div className="rounded-xl border border-dashed border-border p-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
                  <Car className="size-6" />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">
                  No active rides
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {online
                    ? 'Waiting for requests…'
                    : 'Go online to start receiving ride requests.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeRides.map((ride) => (
                  <ActiveRideCard key={ride.id} ride={ride} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Rides */}
          {recentRides.length > 0 && (
            <div className="px-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Recent Rides</h2>
                <button className="flex items-center gap-0.5 text-xs font-medium text-success transition-base hover:text-success/80">
                  View all
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {recentRides.slice(0, 3).map((ride) => (
                  <RecentRideRow key={ride.id} ride={ride} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <DriverBottomNav />
    </div>
  )
}
