'use client'

import { ArrowLeft, Car, Check, Loader2, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { EerState, EerSkeleton } from '../../state'
import { EerServiceBadge } from '../../service-badge'
import {
  mockBookings,
  formatUSD,
  formatDistance,
  formatDuration,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

// Vehicle classes available for selection on the bottom sheet
interface VehicleClass {
  id: string
  name: string
  price: number
  eta: number
}
const vehicleClasses: VehicleClass[] = [
  { id: 'sedan', name: 'Black Sedan', price: 32, eta: 4 },
  { id: 'suv', name: 'Black SUV', price: 45, eta: 6 },
  { id: 'luxury', name: 'Luxury', price: 65, eta: 8 },
]

// ── Map background (stylized dot-grid placeholder) ──
function MapBackground() {
  return (
    <div
      className={cn(
        'relative h-full w-full bg-muted/40',
        'bg-[radial-gradient(circle,_var(--border)_1px,_transparent_1px)] bg-[length:20px_20px]',
      )}
    >
      {/* Decorative "road" lines to suggest a map */}
      <svg className="absolute inset-0 h-full w-full opacity-50" preserveAspectRatio="none">
        <line x1="0%" y1="32%" x2="100%" y2="32%" stroke="var(--border)" strokeWidth="10" />
        <line x1="60%" y1="0%" x2="60%" y2="100%" stroke="var(--border)" strokeWidth="8" />
        <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="var(--border)" strokeWidth="6" />
        <line x1="22%" y1="0%" x2="22%" y2="100%" stroke="var(--border)" strokeWidth="4" />
      </svg>
    </div>
  )
}

// ── Map top overlay (back button + label) ──
function MapTopBar({ onBack }: { onBack?: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex items-center gap-3 p-4 pt-8">
      <button
        onClick={onBack}
        aria-label="Back"
        className="flex size-10 items-center justify-center rounded-full bg-card text-foreground shadow-md transition-base hover:bg-muted active:scale-95"
      >
        <ArrowLeft className="size-5" />
      </button>
      <div className="rounded-full bg-card/90 px-3 py-1.5 shadow-md backdrop-blur-sm">
        <span className="text-xs font-medium text-foreground">Select your ride</span>
      </div>
    </div>
  )
}

// ── Route overlay (SVG curved path + pickup/dropoff pins) ──
function RouteOverlay() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 375 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Soft glow underlay */}
      <path
        d="M 80 130 C 180 210, 200 360, 280 480"
        stroke="var(--primary)"
        strokeOpacity="0.18"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />
      {/* Main curved route path */}
      <path
        d="M 80 130 C 180 210, 200 360, 280 480"
        stroke="var(--primary)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Pickup pin (top) */}
      <circle cx="80" cy="130" r="18" fill="var(--primary)" fillOpacity="0.18" />
      <circle cx="80" cy="130" r="9" fill="var(--primary)" />
      <circle cx="80" cy="130" r="3" fill="var(--primary-foreground)" />
      {/* Dropoff pin (bottom) */}
      <circle cx="280" cy="480" r="18" fill="var(--success)" fillOpacity="0.18" />
      <circle cx="280" cy="480" r="9" fill="var(--success)" />
      <circle cx="280" cy="480" r="3" fill="var(--success-foreground)" />
    </svg>
  )
}

// ── Bottom sheet shell (drag handle + route summary + children) ──
function VehicleSheet({
  booking,
  selectedId,
  children,
}: {
  booking: (typeof mockBookings)[0]
  selectedId: string
  children?: React.ReactNode
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 max-h-[68%] overflow-hidden rounded-t-3xl border-t border-border bg-card shadow-2xl slide-up">
      {/* Drag handle */}
      <div className="flex justify-center pt-3">
        <div className="h-1.5 w-10 rounded-full bg-border" />
      </div>

      {/* Route summary (distance + duration + service badge) */}
      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-2">
          <EerServiceBadge service={booking.service} size="xs" />
          <span className="text-sm font-semibold text-foreground">
            {formatDistance(booking.distance)}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-sm font-semibold text-foreground">
            {formatDuration(booking.duration)}
          </span>
        </div>
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
          Route
        </span>
      </div>

      {/* Pickup → Dropoff mini-summary */}
      <div className="px-4 pt-2">
        <div className="flex items-start gap-2">
          <div className="flex flex-col items-center pt-1">
            <div className="size-2 rounded-full bg-primary" />
            <div className="my-0.5 h-4 w-0.5 bg-border" />
            <div className="size-2 rounded-full bg-success" />
          </div>
          <div className="flex-1 space-y-1.5">
            <p className="truncate text-xs text-muted-foreground">{booking.pickup.label}</p>
            <p className="truncate text-xs text-muted-foreground">{booking.dropoff.label}</p>
          </div>
        </div>
      </div>

      {/* Children: vehicle cards / states + confirm bar */}
      <div className="mt-3">{children}</div>
    </div>
  )
}

// ── Vehicle class card (image placeholder + name + price + ETA) ──
function VehicleClassCard({
  vehicle,
  selected,
  onSelect,
}: {
  vehicle: VehicleClass
  selected: boolean
  onSelect?: () => void
}) {
  return (
    <button
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'flex min-w-[150px] flex-col gap-1.5 rounded-2xl border-2 p-3 text-left transition-all-eer active:scale-[0.98]',
        selected
          ? 'border-success bg-success/5 ring-2 ring-success/20'
          : 'border-border bg-background hover:border-success/30',
      )}
    >
      {/* Image placeholder with car icon */}
      <div className="flex h-16 items-center justify-center rounded-lg bg-muted">
        <Car
          className={cn('size-8', selected ? 'text-success' : 'text-muted-foreground')}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{vehicle.name}</span>
        {selected && (
          <span className="flex size-4 items-center justify-center rounded-full bg-success text-success-foreground">
            <Check className="size-3" />
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-primary">
          {formatUSD(vehicle.price, { showCents: false })}
        </span>
        <span className="text-[11px] text-muted-foreground">ETA {vehicle.eta} min</span>
      </div>
    </button>
  )
}

// ── Sticky confirm button at bottom of sheet ──
function ConfirmButton({
  price,
  onConfirm,
  disabled,
}: {
  price: number
  onConfirm?: () => void
  disabled?: boolean
}) {
  return (
    <div className="border-t border-border bg-card px-4 py-3 pb-safe">
      <Button size="lg" className="w-full" onClick={onConfirm} disabled={disabled}>
        Confirm {formatUSD(price, { showCents: false })}
      </Button>
    </div>
  )
}

// ── Map skeleton (loading state) ──
function MapSkeleton() {
  return (
    <div className="absolute inset-0">
      <div
        className={cn(
          'h-full w-full bg-muted/40 opacity-60',
          'bg-[radial-gradient(circle,_var(--border)_1px,_transparent_1px)] bg-[length:20px_20px]',
        )}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <EerSkeleton className="h-32 w-48 rounded-xl" />
      </div>
    </div>
  )
}

// ── Main pattern component ──
export function P5MapSelection({ state, onStateChange }: PatternProps) {
  const booking = mockBookings[0]
  const [selectedId, setSelectedId] = useState<string>('sedan')

  // Success → auto-transition to populated after a short confirmation
  useEffect(() => {
    if (state === 'success') {
      const t = setTimeout(() => onStateChange?.('populated'), 1800)
      return () => clearTimeout(t)
    }
  }, [state, onStateChange])

  const selectedVehicle =
    vehicleClasses.find((v) => v.id === selectedId) ?? vehicleClasses[0]

  // ── Error state: "Couldn't load map" → retry ──
  if (state === 'error') {
    return (
      <div className="relative flex h-full flex-col">
        <MapBackground />
        <MapTopBar />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <EerState
            state="error"
            title="Couldn't load map"
            description="We can't show the map right now. Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
      </div>
    )
  }

  // ── Loading state: map skeleton + "Loading vehicles…" in sheet ──
  if (state === 'loading') {
    return (
      <div className="relative flex h-full flex-col">
        <MapSkeleton />
        <MapTopBar />
        <div className="absolute bottom-0 left-0 right-0 z-10 rounded-t-3xl border-t border-border bg-card shadow-2xl">
          <div className="flex justify-center pt-3">
            <div className="h-1.5 w-10 rounded-full bg-border" />
          </div>
          <div className="px-4 pt-3">
            <EerSkeleton className="h-4 w-32" />
          </div>
          <div className="px-4 py-3">
            <EerState
              state="loading"
              title="Loading vehicles…"
              description="Finding available rides near you"
              compact
            />
          </div>
          <div className="px-4 pb-4">
            <EerSkeleton className="h-12 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  // ── Empty state: map shown but "No vehicles available in your area" ──
  if (state === 'empty') {
    return (
      <div className="relative flex h-full flex-col">
        <MapBackground />
        <MapTopBar />
        <RouteOverlay />
        <VehicleSheet booking={booking} selectedId={selectedId}>
          <div className="px-4 py-4">
            <EerState
              state="empty"
              title="No vehicles available"
              description="There are no drivers in your area right now. Try again in a few minutes."
              actionLabel="Refresh"
              onAction={() => onStateChange?.('loading')}
            />
          </div>
        </VehicleSheet>
      </div>
    )
  }

  // ── Success state: "Vehicle selected!" → auto-transition to populated ──
  if (state === 'success') {
    return (
      <div className="relative flex h-full flex-col">
        <MapBackground />
        <MapTopBar />
        <RouteOverlay />
        <VehicleSheet booking={booking} selectedId={selectedId}>
          <div className="spring-in flex items-center gap-3 px-4 py-5">
            <div className="flex size-12 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check className="size-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Vehicle selected!</p>
              <p className="text-sm text-muted-foreground">
                {selectedVehicle.name} ·{' '}
                {formatUSD(selectedVehicle.price, { showCents: false })}
              </p>
            </div>
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        </VehicleSheet>
      </div>
    )
  }

  // ── Populated: full map + vehicle cards + first card pre-selected (green ring) ──
  return (
    <div className="relative flex h-full flex-col">
      <MapBackground />
      <MapTopBar />
      <RouteOverlay />
      <VehicleSheet booking={booking} selectedId={selectedId}>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-3">
          {vehicleClasses.map((v) => (
            <VehicleClassCard
              key={v.id}
              vehicle={v}
              selected={v.id === selectedId}
              onSelect={() => setSelectedId(v.id)}
            />
          ))}
        </div>
        <ConfirmButton
          price={selectedVehicle.price}
          onConfirm={() => onStateChange?.('success')}
        />
      </VehicleSheet>
    </div>
  )
}
