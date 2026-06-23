'use client'

import { ArrowLeft, MapPin, Navigation, Clock, Car, Search, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EerState, EerSkeleton } from '../../state'
import { mockAddresses, oneWayVehicleClasses, formatUSD, formatDuration } from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ═══════════════════════════════════════════════════════════════
// P4a ONE-WAY RIDE — specialized booking flow
// Axis: origin → destination → vehicle class
// Simplest flow: "pick me up at A, take me to B"
// ═══════════════════════════════════════════════════════════════

function StepIndicator({ step }: { step: number }) {
  const steps = ['Pickup', 'Destination', 'Vehicle']
  return (
    <div className="eer-header-solid px-5 pb-4 pt-10">
      <div className="flex items-center gap-2">
        <button className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground">
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex flex-1 items-center gap-1">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-1">
              <div
                className={cn(
                  'h-1 flex-1 rounded-full transition-base',
                  i <= step ? 'bg-foreground' : 'bg-muted',
                )}
              />
            </div>
          ))}
        </div>
        <span className="text-xs font-medium text-muted-foreground">{step + 1}/3</span>
      </div>
      <h1 className="mt-3 eer-display text-lg">{steps[step]}</h1>
    </div>
  )
}

function AddressRow({
  icon,
  label,
  address,
  placeholder,
}: {
  icon: 'pickup' | 'dropoff'
  label: string
  address?: string
  placeholder: string
}) {
  return (
    <button className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-base hover:bg-muted">
      <div className="flex flex-col items-center">
        {icon === 'pickup' ? (
          <div className="size-2.5 rounded-full border-2 border-foreground" />
        ) : (
          <div className="size-2.5 rounded-sm bg-foreground" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className={cn('truncate text-sm', address ? 'font-medium text-foreground' : 'text-muted-foreground')}>
          {address || placeholder}
        </p>
      </div>
      <Search className="size-4 text-muted-foreground" />
    </button>
  )
}

function RecentAddresses({ onSelect }: { onSelect: (addr: typeof mockAddresses[0]) => void }) {
  return (
    <div className="px-5">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent</h2>
      <div className="divide-y divide-border rounded-xl border border-border bg-card shadow-sm">
        {mockAddresses.slice(0, 3).map((addr) => (
          <button
            key={addr.label}
            onClick={() => onSelect(addr)}
            className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-base first:rounded-t-xl last:rounded-b-xl hover:bg-muted"
          >
            <MapPin className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{addr.label}</p>
              <p className="truncate text-xs text-muted-foreground">{addr.line}, {addr.city}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function VehicleClassCard({
  vehicle,
  selected,
  onSelect,
}: {
  vehicle: typeof oneWayVehicleClasses[0]
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-base shadow-sm eer-hover-lift',
        selected ? 'border-foreground bg-muted/40' : 'border-border bg-card hover:border-muted-foreground',
      )}
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Car className="size-6 text-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{vehicle.name}</p>
        <p className="truncate text-xs text-muted-foreground">{vehicle.desc}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{formatDuration(vehicle.eta)} away</p>
      </div>
      <div className="text-right">
        <p className="font-variant-numeric-tabular text-base font-bold text-foreground">{formatUSD(vehicle.price, { showCents: false })}</p>
      </div>
    </button>
  )
}

function ActionBar({ step, onNext, onBack, nextLabel }: { step: number; onNext: () => void; onBack: () => void; nextLabel: string }) {
  return (
    <div className="flex items-center gap-3 border-t border-border bg-background px-5 py-4 pb-action-bar">
      {step > 0 && (
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-border bg-card py-3.5 text-sm font-medium text-foreground transition-base hover:bg-muted"
        >
          Back
        </button>
      )}
      <button
        onClick={onNext}
        className="eer-btn-primary flex-[2] py-3.5 text-sm"
      >
        {nextLabel}
      </button>
    </div>
  )
}

export function P4aOneWay({ state, onStateChange }: PatternProps) {
  const [step, setStep] = useState(0)
  const [pickup, setPickup] = useState<typeof mockAddresses[0] | null>(state === 'populated' ? mockAddresses[0] : null)
  const [dropoff, setDropoff] = useState<typeof mockAddresses[0] | null>(state === 'populated' ? mockAddresses[1] : null)
  const [vehicle, setVehicle] = useState<string | null>(null)

  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={0} />
        <div className="flex-1 px-5">
          <EerSkeleton className="h-14 w-full rounded-xl" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <EerSkeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={0} />
        <div className="flex-1">
          <EerState
            state="error"
            title="Couldn't load addresses"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={2} />
        <div className="flex-1">
          <EerState
            state="success"
            title="Finding drivers..."
            description="We're matching you with nearby drivers."
          />
        </div>
      </div>
    )
  }

  if (state === 'empty') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={0} />
        <div className="flex-1 px-5">
          <EerState
            state="empty"
            title="No recent addresses"
            description="Enter an address or use your current location."
            actionLabel="Use current location"
            onAction={() => {}}
          />
        </div>
      </div>
    )
  }

  const next = () => {
    if (step < 2) setStep(step + 1)
    else onStateChange?.('success')
  }
  const back = () => step > 0 && setStep(step - 1)

  const nextLabel = step === 0 ? (pickup ? 'Set destination' : 'Continue') : step === 1 ? 'Choose vehicle' : 'Find drivers'
  const canProceed = step === 0 ? !!pickup : step === 1 ? !!dropoff : !!vehicle

  return (
    <div className="flex h-full flex-col">
      <StepIndicator step={step} />
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-8">
        {step === 0 && (
          <div className="mt-4 space-y-4">
            <div className="divide-y divide-border border-y border-border bg-card shadow-sm">
              <AddressRow icon="pickup" label="PICKUP" address={pickup?.label} placeholder="Enter pickup location" />
            </div>
            <RecentAddresses onSelect={setPickup} />
          </div>
        )}
        {step === 1 && (
          <div className="mt-4 space-y-4">
            <div className="divide-y divide-border border-y border-border bg-card shadow-sm">
              <AddressRow icon="pickup" label="PICKUP" address={pickup?.label} placeholder="Enter pickup location" />
              <AddressRow icon="dropoff" label="DROP-OFF" address={dropoff?.label} placeholder="Where to?" />
            </div>
            <RecentAddresses onSelect={setDropoff} />
          </div>
        )}
        {step === 2 && (
          <div className="mt-4 space-y-3 px-5">
            {pickup && dropoff && (
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex flex-col items-center">
                    <div className="size-2.5 rounded-full border-2 border-foreground" />
                    <div className="my-1 h-4 w-px bg-border" />
                    <div className="size-2.5 rounded-sm bg-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{pickup.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{pickup.line}</p>
                    <div className="my-1.5 h-px bg-border" />
                    <p className="truncate font-medium text-foreground">{dropoff.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{dropoff.line}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">2.8 mi</p>
                    <p className="text-xs text-muted-foreground">18 min</p>
                  </div>
                </div>
              </div>
            )}
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Choose a vehicle</h2>
            {oneWayVehicleClasses.map((v) => (
              <VehicleClassCard
                key={v.id}
                vehicle={v}
                selected={vehicle === v.id}
                onSelect={() => setVehicle(v.id)}
              />
            ))}
          </div>
        )}
      </div>
      <ActionBar step={step} onNext={next} onBack={back} nextLabel={nextLabel} />
    </div>
  )
}
