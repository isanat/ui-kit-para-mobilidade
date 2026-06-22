'use client'

import { Bell, Car, Megaphone, Package, Search, Truck, Star, Phone, MessageSquare, ChevronRight, Crown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EerState, EerSkeleton } from '../../state'
import { EerServiceBadge } from '../../service-badge'
import { EerBookingStatusBadge } from '../../status-badge'
import {
  mockPassengers,
  mockBookings,
  formatUSD,
  formatDuration,
  formatRelativeTime,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Header (shared across states) ──
function HomeHeader({ onSearch }: { onSearch?: () => void }) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 px-5 pb-5 pt-10 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-white/15">
            <Truck className="size-4" />
          </div>
          <span className="text-sm font-semibold">Eagle Eye Rides</span>
        </div>
        <button className="relative flex size-9 items-center justify-center rounded-full bg-white/15">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-primary" />
        </button>
      </div>
      <div className="mt-4">
        <p className="text-xs opacity-80">Good evening</p>
        <h1 className="text-xl font-bold">Sarah</h1>
      </div>
      <button
        onClick={onSearch}
        className="mt-4 flex w-full items-center gap-3 rounded-xl bg-white/15 px-4 py-3 text-left backdrop-blur-sm transition-base hover:bg-white/20"
      >
        <Search className="size-4 opacity-70" />
        <span className="text-sm opacity-80">Where to?</span>
      </button>
    </div>
  )
}

// ── Active booking card ──
function ActiveBookingCard({ booking }: { booking: typeof mockBookings[0] }) {
  const driver = booking.driver!
  return (
    <div className="mx-4 -mt-4 rounded-2xl border border-border bg-card p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <EerBookingStatusBadge status={booking.status} />
        <span className="text-xs text-muted-foreground">{booking.displayId}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {driver.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">{driver.name}</span>
            <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
              <Star className="size-3 fill-current text-warning" />
              {driver.rating}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {driver.vehicle.model} · {driver.vehicle.plate}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex size-9 items-center justify-center rounded-full bg-muted">
            <MessageSquare className="size-4" />
          </button>
          <button className="flex size-9 items-center justify-center rounded-full bg-success text-success-foreground">
            <Phone className="size-4" />
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-sm">
        <div className="flex-1 truncate">
          <p className="text-xs text-muted-foreground">Going to</p>
          <p className="truncate font-medium">{booking.dropoff.label}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">ETA</p>
          <p className="font-semibold">{formatDuration(booking.duration)}</p>
        </div>
      </div>
    </div>
  )
}

// ── Service grid ──
const services = [
  { key: 'one-way', icon: Car, label: 'Reserve', desc: 'Book a ride', color: 'bg-primary' },
  { key: 'package', icon: Package, label: 'Packages', desc: 'Send items', color: 'bg-amber' },
  { key: 'ad', icon: Megaphone, label: 'Advertise', desc: 'Promote your business', color: 'bg-cyan' },
  { key: 'tow', icon: Truck, label: 'Tow Truck', desc: 'Vehicle assistance', color: 'bg-gold' },
] as const

function ServiceGrid() {
  return (
    <div className="px-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Services</h2>
      <div className="grid grid-cols-2 gap-3">
        {services.map((s) => (
          <button
            key={s.key}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all-eer hover:border-primary/30 hover:shadow-sm active:scale-[0.98]"
          >
            <div className={cn('flex size-10 items-center justify-center rounded-lg text-white', s.color)}>
              <s.icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{s.label}</p>
              <p className="truncate text-xs text-muted-foreground">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Ads carousel (simplified) ──
function AdsCarousel() {
  return (
    <div className="px-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Promotions</h2>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        <div className="flex min-w-[260px] flex-col gap-2 rounded-xl bg-gradient-to-br from-magenta/90 to-magenta/70 p-4 text-magenta-foreground">
          <Crown className="size-5 opacity-80" />
          <p className="text-sm font-semibold">20% off Premium Rides</p>
          <p className="text-xs opacity-80">On your next 3 chauffeur bookings</p>
        </div>
        <div className="flex min-w-[260px] flex-col gap-2 rounded-xl bg-gradient-to-br from-cyan/90 to-cyan/70 p-4 text-cyan-foreground">
          <Package className="size-5 opacity-80" />
          <p className="text-sm font-semibold">Free Package Delivery</p>
          <p className="text-xs opacity-80">First delivery on us this week</p>
        </div>
      </div>
    </div>
  )
}

// ── Bottom nav ──
function BottomNav() {
  const [active, setActive] = useState('home')
  const items = [
    { id: 'home', icon: Car, label: 'Home' },
    { id: 'bookings', icon: Package, label: 'Bookings' },
    { id: 'account', icon: Star, label: 'Account' },
  ]
  return (
    <div className="flex items-center justify-around border-t border-border bg-card px-2 py-2 pb-safe">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={cn(
            'flex flex-col items-center gap-1 rounded-lg px-4 py-1.5 transition-base',
            active === item.id ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          <item.icon className="size-5" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// ── Loading skeleton ──
function HomeLoading() {
  return (
    <div className="flex flex-col">
      <HomeHeader />
      <div className="mx-4 -mt-4 space-y-3 rounded-2xl border border-border bg-card p-4">
        <EerSkeleton className="h-5 w-20" />
        <div className="flex items-center gap-3">
          <EerSkeleton className="size-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <EerSkeleton className="h-3 w-28" />
            <EerSkeleton className="h-3 w-20" />
          </div>
        </div>
        <EerSkeleton className="h-3 w-full" />
      </div>
      <div className="mt-5 space-y-3 px-4">
        <EerSkeleton className="h-4 w-20" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <EerSkeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main pattern component ──
export function P3HomeDashboard({ state, onStateChange }: PatternProps) {
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <HomeLoading />
        </div>
        <BottomNav />
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="flex h-full flex-col">
        <HomeHeader />
        <div className="flex-1">
          <EerState
            state="error"
            title="Couldn't load your home"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
        <BottomNav />
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="flex h-full flex-col">
        <HomeHeader />
        <div className="mx-4 -mt-4 rounded-2xl border border-success/30 bg-success/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-success text-success-foreground">
              <Star className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Ride booked!</p>
              <p className="text-sm text-muted-foreground">Michael is on the way · ETA 4 min</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
          <div className="mt-5">
            <ServiceGrid />
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  // populated & empty
  const activeBooking = state === 'populated' ? mockBookings[0] : null

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <HomeHeader />
        {activeBooking && <ActiveBookingCard booking={activeBooking} />}
        <div className={cn('mt-5 space-y-5 pb-6', !activeBooking && 'pt-5')}>
          <ServiceGrid />
          <AdsCarousel />
          {state === 'empty' && (
            <div className="px-4">
              <div className="rounded-xl border border-dashed border-border p-4 text-center">
                <p className="text-sm text-muted-foreground">No active rides</p>
                <p className="mt-1 text-xs text-muted-foreground">Book a ride to see it here</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
