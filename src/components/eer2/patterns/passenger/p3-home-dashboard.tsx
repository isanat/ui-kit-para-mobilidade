'use client'

import { Bell, Search, MapPin, Clock, Navigation, Star, Phone, MessageSquare, Home, ClipboardList, User, Car, Package, Crown, Truck } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EerState, EerSkeleton } from '../../state'
import {
  mockBookings,
  formatUSD,
  formatDuration,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ═══════════════════════════════════════════════════════════════
// P3 HOME DASHBOARD — v3.1 Multi-service (Gojek/Grab inspired)
// Eagle Eye Rides is NOT just rides — it offers 5 services:
//   One-Way, Tow Truck, Chauffeur, Package Delivery, Advertising
// This home makes all services accessible without clutter.
// ═══════════════════════════════════════════════════════════════

const services = [
  { id: 'one-way', icon: Car, label: 'Reserve a Ride', desc: 'Point A to point B' },
  { id: 'package', icon: Package, label: 'Send a Package', desc: 'Door-to-door delivery' },
  { id: 'chauffeur', icon: Crown, label: 'Book a Chauffeur', desc: 'By the hour, premium' },
  { id: 'tow', icon: Truck, label: 'Request Tow Truck', desc: 'Vehicle breakdown help' },
] as const

// ── Minimal header (solid, not gradient) ──
function CleanHeader() {
  return (
    <header className="eer-header-solid px-5 pb-4 pt-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Good evening</p>
          <h1 className="eer-display text-2xl text-foreground">Sarah</h1>
        </div>
        <button
          className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card transition-base hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell className="size-[18px] text-foreground" />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </button>
      </div>
    </header>
  )
}

// ── Dominant search bar (for quick one-way booking) ──
function DominantSearch({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mx-5 flex w-[calc(100%-2.5rem)] items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 text-left transition-base hover:border-muted-foreground"
    >
      <Search className="size-5 text-muted-foreground" />
      <span className="flex-1 text-base font-medium text-foreground">Where to?</span>
      <span className="rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground">
        Now
      </span>
    </button>
  )
}

// ── Active ride card (minimal) ──
function ActiveRideCard({ booking }: { booking: typeof mockBookings[0] }) {
  const driver = booking.driver!
  return (
    <div className="eer-card-elevated mx-5 overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <span className="eer-status-dot bg-success" />
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {formatDuration(booking.duration)} away · {booking.dropoff.label}
        </span>
      </div>
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground">
          {driver.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">{driver.name}</p>
          <p className="truncate text-sm text-muted-foreground">
            {driver.vehicle.model} · {driver.vehicle.plate}
          </p>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
          <Star className="size-3.5 fill-warning text-warning" />
          {driver.rating}
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-border">
        <button className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-foreground transition-base hover:bg-muted">
          <MessageSquare className="size-4" />
          Message
        </button>
        <button className="flex items-center justify-center gap-2 border-l border-border py-3.5 text-sm font-medium text-foreground transition-base hover:bg-muted">
          <Phone className="size-4" />
          Call
        </button>
      </div>
    </div>
  )
}

// ── Service selector (Gojek/Grab style: clean, monochrome, accessible) ──
function ServiceSelector() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <div className="mx-5">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Services
      </h2>
      <div className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelected(service.id)}
            className={cn(
              'eer-hover-lift flex w-full items-center gap-4 px-4 py-4 text-left first:rounded-t-xl last:rounded-b-xl',
              selected === service.id && 'bg-muted',
            )}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <service.icon className="size-5 text-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{service.label}</p>
              <p className="truncate text-xs text-muted-foreground">{service.desc}</p>
            </div>
            <Navigation className="size-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Recent places ──
function RecentPlaces() {
  const places = [
    { icon: Home, label: 'Home', address: '123 W 21st St' },
    { icon: MapPin, label: 'Work', address: '456 Park Ave' },
    { icon: Navigation, label: 'JFK Airport', address: 'Queens, NY' },
  ]
  return (
    <div className="mx-5">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Recent
      </h2>
      <div className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
        {places.map((place, i) => (
          <button
            key={i}
            className="eer-hover-lift flex w-full items-center gap-4 px-4 py-3.5 text-left first:rounded-t-xl last:rounded-b-xl"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
              <place.icon className="size-[18px] text-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{place.label}</p>
              <p className="truncate text-xs text-muted-foreground">{place.address}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Bottom nav ──
function BottomNav() {
  const [active, setActive] = useState('home')
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'activity', icon: ClipboardList, label: 'Activity' },
    { id: 'account', icon: User, label: 'Account' },
  ]
  return (
    <nav className="flex items-center justify-around border-t border-border bg-background px-2 py-2 pb-safe">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={cn(
            'flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 transition-base',
            active === item.id ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          <item.icon className="size-5" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

// ── Loading skeleton ──
function HomeLoading() {
  return (
    <div className="flex flex-col">
      <CleanHeader />
      <div className="px-5">
        <EerSkeleton className="h-14 w-full rounded-xl" />
      </div>
      <div className="mt-8 px-5">
        <EerSkeleton className="h-3 w-16 rounded" />
        <div className="mt-3 divide-y divide-border rounded-xl border border-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4">
              <EerSkeleton className="size-10 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <EerSkeleton className="h-3.5 w-28 rounded" />
                <EerSkeleton className="h-3 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main ──
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
        <CleanHeader />
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
        <CleanHeader />
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="eer-card-elevated mx-5 mt-4">
            <div className="rounded-2xl border border-success/30 bg-success/5 p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-success text-success-foreground">
                  <Star className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Ride booked!</p>
                  <p className="text-sm text-muted-foreground">Michael is 4 min away</p>
                </div>
              </div>
            </div>
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
        <CleanHeader />
        <div className="mt-4">
          <DominantSearch />
        </div>
        {activeBooking && (
          <div className="mt-8">
            <ActiveRideCard booking={activeBooking} />
          </div>
        )}
        {/* Service selector — ALL services accessible, clean */}
        <div className="mt-8">
          <ServiceSelector />
        </div>
        <div className="mt-8 pb-8">
          <RecentPlaces />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
