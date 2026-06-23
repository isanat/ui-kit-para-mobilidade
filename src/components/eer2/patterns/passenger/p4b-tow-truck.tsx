'use client'

import { ArrowLeft, MapPin, AlertTriangle, Car, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EerState, EerSkeleton } from '../../state'
import { mockAddresses, towBreakdownTypes, towVehicleTypes, towTruckOptions, formatUSD, formatDuration } from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ═══════════════════════════════════════════════════════════════
// P4b TOW TRUCK — specialized booking flow
// Axis: breakdown location + issue type + vehicle type → tow truck
// "My car broke down at [X], it's a [type], issue is [Y], tow to [Z]"
// ═══════════════════════════════════════════════════════════════

function StepIndicator({ step }: { step: number }) {
  const steps = ['Location', 'Vehicle', 'Tow Truck']
  return (
    <div className="eer-header-solid px-5 pb-4 pt-10">
      <div className="flex items-center gap-2">
        <button className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground">
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex flex-1 items-center gap-1">
          {steps.map((_, i) => (
            <div key={i} className={cn('h-1 flex-1 rounded-full transition-base', i <= step ? 'bg-foreground' : 'bg-muted')} />
          ))}
        </div>
        <span className="text-xs font-medium text-muted-foreground">{step + 1}/3</span>
      </div>
      <h1 className="mt-3 text-lg font-bold tracking-tight">{steps[step]}</h1>
      <p className="text-xs text-muted-foreground">Vehicle breakdown assistance</p>
    </div>
  )
}

function BreakdownTypeCard({ type, selected, onSelect }: { type: typeof towBreakdownTypes[0]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-base',
        selected ? 'border-foreground bg-muted/40' : 'border-border bg-card hover:border-muted-foreground',
      )}
    >
      <AlertTriangle className={cn('size-5', selected ? 'text-foreground' : 'text-muted-foreground')} />
      <span className="flex-1 text-sm font-medium text-foreground">{type.label}</span>
      {selected && <div className="size-4 rounded-full bg-foreground" />}
    </button>
  )
}

function VehicleTypePill({ type, selected, onSelect }: { type: typeof towVehicleTypes[0]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-base',
        selected ? 'border-foreground bg-foreground text-background' : 'border-border bg-card text-foreground hover:border-muted-foreground',
      )}
    >
      {type.label}
    </button>
  )
}

function TowTruckCard({ truck, selected, onSelect }: { truck: typeof towTruckOptions[0]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-base',
        selected ? 'border-foreground bg-muted/40' : 'border-border bg-card hover:border-muted-foreground',
      )}
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Car className="size-6 text-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{truck.name}</p>
        <p className="truncate text-xs text-muted-foreground">{truck.desc}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">ETA {formatDuration(truck.eta)}</p>
      </div>
      <p className="font-variant-numeric-tabular text-base font-bold text-foreground">{formatUSD(truck.price, { showCents: false })}</p>
    </button>
  )
}

function ActionBar({ step, onNext, onBack, nextLabel, disabled }: { step: number; onNext: () => void; onBack: () => void; nextLabel: string; disabled?: boolean }) {
  return (
    <div className="flex items-center gap-3 border-t border-border bg-background px-5 py-4 pb-action-bar">
      {step > 0 && (
        <button onClick={onBack} className="flex-1 rounded-xl border border-border bg-card py-3.5 text-sm font-medium text-foreground transition-base hover:bg-muted">
          Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={disabled}
        className={cn('eer-btn-primary flex-[2] py-3.5 text-sm', disabled && 'opacity-40')}
      >
        {nextLabel}
      </button>
    </div>
  )
}

export function P4bTowTruck({ state, onStateChange }: PatternProps) {
  const [step, setStep] = useState(0)
  const [location, setLocation] = useState<typeof mockAddresses[0] | null>(state === 'populated' ? mockAddresses[0] : null)
  const [breakdownType, setBreakdownType] = useState<string | null>(null)
  const [vehicleType, setVehicleType] = useState<string | null>(null)
  const [truck, setTruck] = useState<string | null>(null)

  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={0} />
        <div className="flex-1 px-5">
          <EerSkeleton className="h-14 w-full rounded-xl" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <EerSkeleton key={i} className="h-16 w-full rounded-xl" />)}
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
          <EerState state="error" title="Couldn't load" description="Check your connection and try again." actionLabel="Retry" onAction={() => onStateChange?.('loading')} />
        </div>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={2} />
        <div className="flex-1">
          <EerState state="success" title="Tow truck dispatched!" description="Driver Michael is on the way · ETA 18 min" />
        </div>
      </div>
    )
  }

  if (state === 'empty') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={0} />
        <div className="flex-1 px-5">
          <EerState state="empty" title="No location set" description="Enter your current location to continue." actionLabel="Use current location" onAction={() => {}} />
        </div>
      </div>
    )
  }

  const next = () => {
    if (step < 2) setStep(step + 1)
    else onStateChange?.('success')
  }
  const back = () => step > 0 && setStep(step - 1)

  const canProceed = step === 0 ? !!location && !!breakdownType : step === 1 ? !!vehicleType : !!truck
  const nextLabel = step === 0 ? 'Continue' : step === 1 ? 'Choose tow truck' : 'Request tow truck'

  return (
    <div className="flex h-full flex-col">
      <StepIndicator step={step} />
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-8">
        {step === 0 && (
          <div className="mt-4 space-y-6 px-5">
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Breakdown location</h2>
              <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-left transition-base hover:bg-muted">
                <MapPin className="size-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{location?.label || 'Enter location'}</p>
                  <p className="truncate text-xs text-muted-foreground">{location?.line || 'Where is the vehicle?'}</p>
                </div>
              </button>
            </div>
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">What's the issue?</h2>
              <div className="space-y-2.5">
                {towBreakdownTypes.map((t) => (
                  <BreakdownTypeCard key={t.id} type={t} selected={breakdownType === t.id} onSelect={() => setBreakdownType(t.id)} />
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="mt-4 px-5">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vehicle type</h2>
            <div className="flex flex-wrap gap-2.5">
              {towVehicleTypes.map((t) => (
                <VehicleTypePill key={t.id} type={t} selected={vehicleType === t.id} onSelect={() => setVehicleType(t.id)} />
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs font-medium text-muted-foreground">Tow destination</p>
              <p className="mt-1 text-sm font-medium text-foreground">Your home address</p>
              <p className="text-xs text-muted-foreground">123 W 21st St, New York</p>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="mt-4 space-y-3 px-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Choose a tow truck</h2>
            {towTruckOptions.map((t) => (
              <TowTruckCard key={t.id} truck={t} selected={truck === t.id} onSelect={() => setTruck(t.id)} />
            ))}
          </div>
        )}
      </div>
      <ActionBar step={step} onNext={next} onBack={back} nextLabel={nextLabel} disabled={!canProceed} />
    </div>
  )
}
