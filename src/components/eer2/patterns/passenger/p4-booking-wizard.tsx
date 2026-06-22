'use client'

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Car,
  Check,
  Clock,
  LocateFixed,
  MapPin,
  Navigation,
  Plane,
  Search,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { EerState, EerSkeleton } from '../../state'
import { EerServiceBadge } from '../../service-badge'
import {
  mockAddresses,
  formatUSD,
  formatDistance,
  formatDuration,
  type Address,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Wizard steps config ──
const steps = [
  { id: 0, label: 'Pickup', color: 'primary' },
  { id: 1, label: 'Destination', color: 'success' },
  { id: 2, label: 'Details', color: 'primary' },
] as const

// Vehicle classes available for selection on step 3
const vehicles = [
  { id: 'sedan', name: 'Black Sedan', price: 32, eta: 4, desc: 'Up to 4 passengers' },
  { id: 'suv', name: 'Black SUV', price: 45, eta: 6, desc: 'Up to 6 passengers' },
  { id: 'luxury', name: 'Luxury', price: 65, eta: 8, desc: 'Premium experience' },
] as const

// ── Wizard header (3-segment progress bar in royal blue gradient) ──
function WizardHeader({ step }: { step: number }) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 px-5 pb-5 pt-10 text-primary-foreground">
      <div className="flex items-center justify-between">
        <button
          className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-base hover:bg-white/20"
          aria-label="Close wizard"
        >
          <ArrowLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold">Reserve a ride</span>
        <EerServiceBadge service="one-way" size="xs" className="bg-white/20" />
      </div>
      <div className="mt-5">
        <p className="text-xs opacity-80">Step {step + 1} of 3</p>
        <h1 className="mt-0.5 text-xl font-bold">{steps[step].label}</h1>
      </div>
      {/* 3-segment progress bar */}
      <div className="mt-4 flex gap-1.5">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-all-eer',
              i <= step ? 'bg-white' : 'bg-white/25',
            )}
          />
        ))}
      </div>
    </div>
  )
}

// ── GPS detect button with ping animation ──
function GpsDetectButton({
  onClick,
  accent = 'primary',
}: {
  onClick?: () => void
  accent?: 'primary' | 'success'
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Detect location via GPS"
      className={cn(
        'relative flex size-12 shrink-0 items-center justify-center rounded-full transition-base hover:opacity-90 active:scale-95',
        accent === 'primary'
          ? 'bg-primary/10 text-primary'
          : 'bg-success/10 text-success',
      )}
    >
      <span
        className={cn(
          'absolute inset-0 animate-ping rounded-full',
          accent === 'primary' ? 'bg-primary/20' : 'bg-success/20',
        )}
      />
      <LocateFixed className="relative size-5" />
    </button>
  )
}

// ── City confirmation badge (✓ Correct) ──
function CityConfirmBadge({ city }: { city: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
      <Check className="size-3" />
      {city} · Correct
    </span>
  )
}

// ── Vertical route indicator (pickup dot → line → dropoff dot) ──
function RouteIndicator() {
  return (
    <div className="flex flex-col items-center pt-1">
      <div className="size-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
      <div className="my-1 w-0.5 grow bg-border" />
      <div className="size-2.5 rounded-full bg-success ring-4 ring-success/15" />
    </div>
  )
}

// ── Address autocomplete input ──
function AddressInput({
  placeholder,
  value,
  onChange,
  accent = 'primary',
}: {
  placeholder: string
  value: string
  onChange?: (v: string) => void
  accent?: 'primary' | 'success'
}) {
  return (
    <div className="relative">
      <Search
        className={cn(
          'pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2',
          accent === 'primary' ? 'text-primary' : 'text-success',
        )}
      />
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-xl pl-10"
      />
    </div>
  )
}

// ── Recent addresses list (with empty state) ──
function AddressList({
  addresses,
  onSelect,
  empty,
}: {
  addresses: Address[]
  onSelect?: (a: Address) => void
  empty?: boolean
}) {
  if (empty) {
    return (
      <div className="rounded-xl border border-dashed border-border p-6 text-center">
        <MapPin className="mx-auto size-5 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium text-foreground">No recent addresses</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Use GPS detect or search for an address above
        </p>
      </div>
    )
  }
  return (
    <div className="space-y-1">
      {addresses.map((a) => (
        <button
          key={a.label}
          onClick={() => onSelect?.(a)}
          className="flex w-full items-center gap-3 rounded-xl border border-transparent p-2.5 text-left transition-all-eer hover:border-border hover:bg-muted/50 active:scale-[0.99]"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <MapPin className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{a.label}</p>
            <p className="truncate text-xs text-muted-foreground">
              {a.line}, {a.city}
            </p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground" />
        </button>
      ))}
    </div>
  )
}

// ── Pickup / Destination step (steps 0 and 1) ──
function AddressStep({
  step,
  accent,
  selected,
  onSelect,
  query,
  onQueryChange,
  pickup,
  empty,
  error,
  onRetry,
}: {
  step: 0 | 1
  accent: 'primary' | 'success'
  selected: Address | null
  pickup: Address | null
  onSelect?: (a: Address) => void
  query: string
  onQueryChange?: (v: string) => void
  empty?: boolean
  error?: boolean
  onRetry?: () => void
}) {
  const isDest = step === 1
  return (
    <div className="px-4 pt-5">
      {/* GPS detect + helper text */}
      <div className="flex items-center gap-3">
        <GpsDetectButton onClick={() => onSelect?.(mockAddresses[0])} accent={accent} />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {isDest ? 'Where are you going?' : 'Where should we pick you up?'}
          </p>
          <p className="text-xs text-muted-foreground">Tap to detect via GPS</p>
        </div>
      </div>

      {/* Autocomplete input */}
      <div className="mt-4">
        <AddressInput
          placeholder={isDest ? 'Search destination' : 'Search pickup address'}
          value={query}
          onChange={onQueryChange}
          accent={accent}
        />
      </div>

      {/* City confirmation after selection */}
      {selected && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <CityConfirmBadge city={selected.city} />
          <span className="truncate text-xs text-muted-foreground">{selected.line}</span>
        </div>
      )}

      {/* Route indicator on step 2 (pickup → destination) */}
      {isDest && selected && pickup && (
        <div className="slide-up mt-3 flex items-stretch gap-3 rounded-xl border border-border bg-card p-3">
          <RouteIndicator />
          <div className="flex-1 space-y-3 py-0.5">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Pickup</p>
              <p className="text-sm font-medium text-foreground">{pickup.label}</p>
              <p className="truncate text-xs text-muted-foreground">{pickup.line}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Destination
              </p>
              <p className="text-sm font-medium text-foreground">{selected.label}</p>
              <p className="truncate text-xs text-muted-foreground">{selected.line}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent addresses */}
      <div className="mt-5">
        <h2 className="mb-2 text-sm font-semibold text-foreground">Recent addresses</h2>
        {error ? (
          <EerState
            state="error"
            title="Couldn't load addresses"
            description="Address search is unavailable. Please try again."
            actionLabel="Retry"
            onAction={onRetry}
            compact
          />
        ) : (
          <AddressList addresses={mockAddresses} onSelect={onSelect} empty={empty} />
        )}
      </div>

      {/* Use current location */}
      <button
        onClick={() => onSelect?.(mockAddresses[0])}
        className={cn(
          'mt-4 flex w-full items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-base',
          accent === 'primary'
            ? 'border-primary/30 bg-primary/5 text-primary hover:bg-primary/10'
            : 'border-success/30 bg-success/5 text-success hover:bg-success/10',
        )}
      >
        <Navigation className="size-4" />
        Use current location
      </button>
    </div>
  )
}

// ── Details step (step 2) ──
function DetailsStep({
  pickup,
  dropoff,
  distance,
  duration,
  vehicleId,
  onVehicleSelect,
}: {
  pickup: Address
  dropoff: Address
  distance: number
  duration: number
  vehicleId: string
  onVehicleSelect?: (id: string) => void
}) {
  const selectedVehicle = vehicles.find((v) => v.id === vehicleId) ?? vehicles[0]
  return (
    <div className="space-y-5 px-4 pt-5">
      {/* Date & time picker */}
      <div className="space-y-2">
        <Label>
          <Calendar className="size-3.5" />
          Pickup date & time
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input type="date" defaultValue="2024-09-15" className="h-11 rounded-xl" />
          <Input type="time" defaultValue="14:30" className="h-11 rounded-xl" />
        </div>
      </div>

      {/* Flight number (optional) */}
      <div className="space-y-2">
        <Label>
          <Plane className="size-3.5" />
          Flight number
          <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input placeholder="e.g. DL 452" className="h-11 rounded-xl uppercase" />
      </div>

      {/* Vehicle class selection (horizontal scroll) */}
      <div className="space-y-2">
        <Label>
          <Car className="size-3.5" />
          Vehicle class
        </Label>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {vehicles.map((v) => {
            const active = v.id === vehicleId
            return (
              <button
                key={v.id}
                onClick={() => onVehicleSelect?.(v.id)}
                className={cn(
                  'flex min-w-[130px] flex-col items-center gap-1 rounded-xl border-2 p-3 text-center transition-all-eer active:scale-[0.98]',
                  active
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/15'
                    : 'border-border bg-card hover:border-primary/30',
                )}
              >
                <Car
                  className={cn('size-6', active ? 'text-primary' : 'text-muted-foreground')}
                />
                <span className="text-sm font-medium text-foreground">{v.name}</span>
                <span className="text-base font-bold text-primary">
                  {formatUSD(v.price, { showCents: false })}
                </span>
                <span className="text-[11px] text-muted-foreground">ETA {v.eta} min</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Special instructions */}
      <div className="space-y-2">
        <Label htmlFor="notes">Special instructions</Label>
        <Textarea
          id="notes"
          placeholder="e.g. meet at arrivals, gate code, child seat needed…"
          className="min-h-20 rounded-xl"
        />
      </div>

      {/* Trip summary card */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Trip summary
          </p>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            {selectedVehicle.name}
          </span>
        </div>
        <div className="mt-3 flex items-stretch gap-3">
          <RouteIndicator />
          <div className="flex-1 space-y-3 py-0.5">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Pickup</p>
              <p className="text-sm font-medium text-foreground">{pickup.label}</p>
              <p className="truncate text-xs text-muted-foreground">{pickup.line}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Dropoff</p>
              <p className="text-sm font-medium text-foreground">{dropoff.label}</p>
              <p className="truncate text-xs text-muted-foreground">{dropoff.line}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
          <div>
            <p className="text-[11px] text-muted-foreground">Distance</p>
            <p className="text-sm font-semibold text-foreground">{formatDistance(distance)}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Duration</p>
            <p className="text-sm font-semibold text-foreground">{formatDuration(duration)}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Fare estimate</p>
            <p className="text-sm font-bold text-primary">
              {formatUSD(selectedVehicle.price, { showCents: false })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Skeleton for current step ──
function StepSkeleton() {
  return (
    <div className="px-4 pt-5">
      <div className="flex items-center gap-3">
        <EerSkeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <EerSkeleton className="h-4 w-32" />
          <EerSkeleton className="h-3 w-24" />
        </div>
      </div>
      <EerSkeleton className="mt-4 h-11 w-full rounded-xl" />
      <div className="mt-5 space-y-2">
        <EerSkeleton className="h-4 w-32" />
        <EerSkeleton className="h-14 w-full rounded-xl" />
        <EerSkeleton className="h-14 w-full rounded-xl" />
        <EerSkeleton className="h-14 w-full rounded-xl" />
      </div>
    </div>
  )
}

// ── Fixed bottom action bar (Back + Continue / Find Drivers) ──
function ActionBar({
  step,
  onBack,
  onContinue,
  onFindDrivers,
  canContinue,
}: {
  step: number
  onBack?: () => void
  onContinue?: () => void
  onFindDrivers?: () => void
  canContinue?: boolean
}) {
  return (
    <div className="flex items-center gap-3 border-t border-border bg-card px-4 py-3 pb-safe">
      <Button
        variant="outline"
        size="lg"
        onClick={onBack}
        disabled={step === 0}
        className="flex-1"
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>
      {step < 2 ? (
        <Button size="lg" onClick={onContinue} disabled={!canContinue} className="flex-1">
          Continue
          <ArrowRight className="size-4" />
        </Button>
      ) : (
        <Button size="lg" onClick={onFindDrivers} className="flex-1">
          Find Drivers
          <ArrowRight className="size-4" />
        </Button>
      )}
    </div>
  )
}

// ── Main pattern component ──
export function P4BookingWizard({ state, onStateChange }: PatternProps) {
  const [step, setStep] = useState(0)
  const [pickup, setPickup] = useState<Address | null>(null)
  const [destination, setDestination] = useState<Address | null>(null)
  const [vehicleId, setVehicleId] = useState<string>('sedan')
  const [pickupQuery, setPickupQuery] = useState('')
  const [destQuery, setDestQuery] = useState('')

  // Pre-fill step 1 with mockAddresses[0] for populated state
  useEffect(() => {
    if (state === 'populated' && !pickup) {
      const a = mockAddresses[0]
      setPickup(a)
      setPickupQuery(a.line)
    }
  }, [state, pickup])

  const handlePickupSelect = (a: Address) => {
    setPickup(a)
    setPickupQuery(a.line)
  }
  const handleDestSelect = (a: Address) => {
    setDestination(a)
    setDestQuery(a.line)
  }

  const canContinue = step === 0 ? !!pickup : step === 1 ? !!destination : true

  // ── Success state: "Finding drivers…" transition with loading spinner ──
  if (state === 'success') {
    return (
      <div className="flex h-full flex-col">
        <WizardHeader step={2} />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="relative flex size-20 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <div className="relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Car className="size-7" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground">Finding drivers…</h2>
            <p className="text-sm text-muted-foreground">
              Matching you with nearby{' '}
              {vehicles.find((v) => v.id === vehicleId)?.name} drivers
            </p>
          </div>
          <div className="mt-2 w-full max-w-xs space-y-2 rounded-xl border border-border bg-card p-3 text-left">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5 animate-spin" />
              Searching nearby drivers…
            </div>
            <EerSkeleton className="h-3 w-full" />
            <EerSkeleton className="h-3 w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  // ── Loading state: skeleton of the current step ──
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <WizardHeader step={step} />
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <StepSkeleton />
        </div>
        <ActionBar step={step} canContinue />
      </div>
    )
  }

  // ── Error state: address autocomplete API error → retry ──
  if (state === 'error') {
    return (
      <div className="flex h-full flex-col">
        <WizardHeader step={step} />
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {step < 2 ? (
            <AddressStep
              step={step as 0 | 1}
              accent={step === 1 ? 'success' : 'primary'}
              selected={step === 0 ? pickup : destination}
              pickup={pickup}
              onSelect={step === 0 ? handlePickupSelect : handleDestSelect}
              query={step === 0 ? pickupQuery : destQuery}
              onQueryChange={step === 0 ? setPickupQuery : setDestQuery}
              error
              onRetry={() => onStateChange?.('loading')}
            />
          ) : (
            <EerState
              state="error"
              title="Couldn't load trip details"
              description="We can't fetch vehicle availability right now. Please try again."
              actionLabel="Retry"
              onAction={() => onStateChange?.('loading')}
            />
          )}
        </div>
        <ActionBar step={step} canContinue={canContinue} />
      </div>
    )
  }

  // ── Empty state: step 1 (Pickup) with no recent addresses ──
  if (state === 'empty') {
    return (
      <div className="flex h-full flex-col">
        <WizardHeader step={0} />
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <AddressStep
            step={0}
            accent="primary"
            selected={pickup}
            pickup={null}
            onSelect={handlePickupSelect}
            query={pickupQuery}
            onQueryChange={setPickupQuery}
            empty
          />
        </div>
        <ActionBar
          step={0}
          canContinue={!!pickup}
          onContinue={() => setStep(1)}
        />
      </div>
    )
  }

  // ── Populated: full wizard with mock data ──
  return (
    <div className="flex h-full flex-col">
      <WizardHeader step={step} />
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-4">
        {step < 2 ? (
          <AddressStep
            step={step as 0 | 1}
            accent={step === 1 ? 'success' : 'primary'}
            selected={step === 0 ? pickup : destination}
            pickup={pickup}
            onSelect={step === 0 ? handlePickupSelect : handleDestSelect}
            query={step === 0 ? pickupQuery : destQuery}
            onQueryChange={step === 0 ? setPickupQuery : setDestQuery}
          />
        ) : (
          <DetailsStep
            pickup={pickup ?? mockAddresses[0]}
            dropoff={destination ?? mockAddresses[1]}
            distance={2.8}
            duration={18}
            vehicleId={vehicleId}
            onVehicleSelect={setVehicleId}
          />
        )}
      </div>
      <ActionBar
        step={step}
        canContinue={canContinue}
        onBack={() => setStep(Math.max(0, step - 1))}
        onContinue={() => setStep(Math.min(2, step + 1))}
        onFindDrivers={() => onStateChange?.('success')}
      />
    </div>
  )
}
