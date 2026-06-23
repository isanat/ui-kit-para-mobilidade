'use client'

import { ArrowLeft, MapPin, Clock, Crown, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EerState, EerSkeleton } from '../../state'
import { mockAddresses, chauffeurDurations, chauffeurVehicles, formatUSD } from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ═══════════════════════════════════════════════════════════════
// P4c CHAUFFEUR — specialized booking flow
// Axis: duration (hours) + datetime + vehicle → booking
// "I need a car + driver for [N hours] starting [datetime]"
// Duration is the primary axis, NOT destination.
// ═══════════════════════════════════════════════════════════════

function StepIndicator({ step }: { step: number }) {
  const steps = ['Details', 'Vehicle', 'Confirm']
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
      <h1 className="mt-3 eer-display text-lg">{steps[step]}</h1>
      <p className="text-xs text-muted-foreground">Chauffeur by the hour</p>
    </div>
  )
}

function DurationChip({ duration, selected, onSelect }: { duration: typeof chauffeurDurations[0]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'relative rounded-xl border-2 px-4 py-3 text-sm font-medium transition-base',
        selected ? 'border-foreground bg-foreground text-background' : 'border-border bg-card text-foreground hover:border-muted-foreground',
      )}
    >
      {duration.label}
      {duration.popular && (
        <span className={cn('absolute -top-2 left-1/2 -translate-x-1/2 rounded-full px-1.5 py-0.5 text-[9px] font-bold', selected ? 'bg-background text-foreground' : 'bg-muted text-muted-foreground')}>
          POPULAR
        </span>
      )}
    </button>
  )
}

function VehicleCard({ vehicle, selected, onSelect, hours }: { vehicle: typeof chauffeurVehicles[0]; selected: boolean; onSelect: () => void; hours: number }) {
  const total = vehicle.pricePerHour * hours
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-base shadow-sm eer-hover-lift',
        selected ? 'border-foreground bg-muted/40' : 'border-border bg-card hover:border-muted-foreground',
      )}
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Crown className="size-6 text-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{vehicle.name}</p>
        <p className="truncate text-xs text-muted-foreground">{vehicle.desc}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{formatUSD(vehicle.pricePerHour)}/hr · {hours}h total</p>
      </div>
      <div className="text-right">
        <p className="font-variant-numeric-tabular text-base font-bold text-foreground">{formatUSD(total, { showCents: false })}</p>
      </div>
    </button>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
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
      <button onClick={onNext} disabled={disabled} className={cn('eer-btn-primary flex-[2] py-3.5 text-sm', disabled && 'opacity-40')}>
        {nextLabel}
      </button>
    </div>
  )
}

export function P4cChauffeur({ state, onStateChange }: PatternProps) {
  const [step, setStep] = useState(0)
  const [pickup, setPickup] = useState<typeof mockAddresses[0] | null>(state === 'populated' ? mockAddresses[3] : null)
  const [duration, setDuration] = useState<number | null>(state === 'populated' ? 4 : null)
  const [datetime, setDatetime] = useState<string>('')
  const [vehicle, setVehicle] = useState<string | null>(null)

  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={0} />
        <div className="flex-1 px-5">
          <EerSkeleton className="h-14 w-full rounded-xl" />
          <div className="mt-6"><EerSkeleton className="h-3 w-20 rounded" /></div>
          <div className="mt-3 flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => <EerSkeleton key={i} className="h-12 w-24 rounded-xl" />)}
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
          <EerState state="success" title="Chauffeur booked!" description="Robert will meet you at The Plaza at the scheduled time." />
        </div>
      </div>
    )
  }

  if (state === 'empty') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={0} />
        <div className="flex-1 px-5">
          <EerState state="empty" title="No pickup location" description="Enter where your chauffeur should meet you." actionLabel="Set location" onAction={() => {}} />
        </div>
      </div>
    )
  }

  const next = () => {
    if (step < 2) setStep(step + 1)
    else onStateChange?.('success')
  }
  const back = () => step > 0 && setStep(step - 1)

  const selectedVehicle = chauffeurVehicles.find((v) => v.id === vehicle)
  const total = selectedVehicle && duration ? selectedVehicle.pricePerHour * duration : 0
  const canProceed = step === 0 ? !!pickup && !!duration : step === 1 ? !!vehicle : true
  const nextLabel = step === 0 ? 'Choose vehicle' : step === 1 ? 'Review booking' : `Proceed to payment · ${formatUSD(total, { showCents: false })}`

  return (
    <div className="flex h-full flex-col">
      <StepIndicator step={step} />
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-8">
        {step === 0 && (
          <div className="mt-4 space-y-6 px-5">
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pickup location</h2>
              <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-left transition-base hover:bg-muted">
                <MapPin className="size-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{pickup?.label || 'Enter pickup location'}</p>
                  <p className="truncate text-xs text-muted-foreground">{pickup?.line || 'Where should your chauffeur meet you?'}</p>
                </div>
              </button>
            </div>
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date & time</h2>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground outline-none transition-base focus:border-foreground"
              />
            </div>
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Duration</h2>
              <div className="flex flex-wrap gap-2.5">
                {chauffeurDurations.map((d) => (
                  <DurationChip key={d.hours} duration={d} selected={duration === d.hours} onSelect={() => setDuration(d.hours)} />
                ))}
              </div>
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="mt-4 space-y-3 px-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Choose your vehicle · {duration}h</h2>
            {chauffeurVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} selected={vehicle === v.id} onSelect={() => setVehicle(v.id)} hours={duration || 3} />
            ))}
          </div>
        )}
        {step === 2 && selectedVehicle && (
          <div className="mt-4 space-y-4 px-5">
            <div className="eer-card-elevated p-5">
              <h2 className="mb-3 text-sm font-semibold text-foreground">Booking summary</h2>
              <div className="divide-y divide-border">
                <SummaryRow label="Pickup" value={pickup?.label || '—'} />
                <SummaryRow label="Date & time" value={datetime || 'Today, 2:00 PM'} />
                <SummaryRow label="Duration" value={`${duration} hours`} />
                <SummaryRow label="Vehicle" value={selectedVehicle.name} />
                <SummaryRow label="Rate" value={`${formatUSD(selectedVehicle.pricePerHour)}/hour`} />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="eer-hero-number text-foreground">{formatUSD(total, { showCents: false })}</span>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-muted/30 p-4">
              <Check className="size-4 shrink-0 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Includes professional chauffeur, fuel, insurance, and unlimited stops within the booked duration.</p>
            </div>
          </div>
        )}
      </div>
      <ActionBar step={step} onNext={next} onBack={back} nextLabel={nextLabel} disabled={!canProceed} />
    </div>
  )
}
