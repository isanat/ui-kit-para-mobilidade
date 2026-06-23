'use client'

import { ArrowLeft, MapPin, Package, User, Phone, FileText, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EerState, EerSkeleton } from '../../state'
import { mockAddresses, packageSizes, packageContactTypes, formatUSD } from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ═══════════════════════════════════════════════════════════════
// P4d PACKAGE DELIVERY — specialized booking flow
// Axis: pickup contact + dropoff contact + package details
// "Pick up package from [contact A], deliver to [contact B], package is [X]"
// No passenger — this is about the item, not a ride.
// ═══════════════════════════════════════════════════════════════

function StepIndicator({ step }: { step: number }) {
  const steps = ['Pickup', 'Drop-off', 'Package']
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
      <p className="text-xs text-muted-foreground">Door-to-door package delivery</p>
    </div>
  )
}

function ContactFields({ prefix }: { prefix: 'pickup' | 'dropoff' }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Contact name</label>
        <input
          type="text"
          placeholder={prefix === 'pickup' ? 'Who has the package?' : 'Who receives the package?'}
          className="mt-1.5 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-base focus:border-foreground"
        />
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</label>
        <input
          type="tel"
          placeholder="+1 (555) 000-0000"
          className="mt-1.5 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-base focus:border-foreground"
        />
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Hand-off preference</label>
        <div className="mt-1.5 space-y-2">
          {packageContactTypes.map((t, i) => (
            <button
              key={t.id}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border-2 p-3 text-left transition-base',
                i === 0 ? 'border-foreground bg-muted/40' : 'border-border bg-card hover:border-muted-foreground',
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{t.label}</p>
                <p className="truncate text-xs text-muted-foreground">{t.desc}</p>
              </div>
              {i === 0 && <div className="size-4 rounded-full bg-foreground" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function PackageSizeCard({ size, selected, onSelect }: { size: typeof packageSizes[0]; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-base',
        selected ? 'border-foreground bg-muted/40' : 'border-border bg-card hover:border-muted-foreground',
      )}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Package className="size-5 text-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{size.label}</p>
        <p className="truncate text-xs text-muted-foreground">{size.desc}</p>
      </div>
      <p className="font-variant-numeric-tabular text-sm font-bold text-foreground">{formatUSD(size.price, { showCents: false })}</p>
    </button>
  )
}

function ActionBar({ step, onNext, onBack, nextLabel }: { step: number; onNext: () => void; onBack: () => void; nextLabel: string }) {
  return (
    <div className="flex items-center gap-3 border-t border-border bg-background px-5 py-4 pb-action-bar">
      {step > 0 && (
        <button onClick={onBack} className="flex-1 rounded-xl border border-border bg-card py-3.5 text-sm font-medium text-foreground transition-base hover:bg-muted">
          Back
        </button>
      )}
      <button onClick={onNext} className="eer-btn-primary flex-[2] py-3.5 text-sm">
        {nextLabel}
      </button>
    </div>
  )
}

export function P4dPackage({ state, onStateChange }: PatternProps) {
  const [step, setStep] = useState(0)
  const [pickup, setPickup] = useState<typeof mockAddresses[0] | null>(state === 'populated' ? mockAddresses[0] : null)
  const [dropoff, setDropoff] = useState<typeof mockAddresses[0] | null>(state === 'populated' ? mockAddresses[4] : null)
  const [size, setSize] = useState<string | null>(null)

  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={0} />
        <div className="flex-1 px-5">
          <EerSkeleton className="h-14 w-full rounded-xl" />
          <div className="mt-6 space-y-3">
            <EerSkeleton className="h-12 w-full rounded-lg" />
            <EerSkeleton className="h-12 w-full rounded-lg" />
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
          <EerState state="success" title="Pickup scheduled!" description="Driver David will pick up your package in 12 min." />
        </div>
      </div>
    )
  }

  if (state === 'empty') {
    return (
      <div className="flex h-full flex-col">
        <StepIndicator step={0} />
        <div className="flex-1 px-5">
          <EerState state="empty" title="No pickup address" description="Enter where the driver should pick up the package." actionLabel="Set address" onAction={() => {}} />
        </div>
      </div>
    )
  }

  const next = () => {
    if (step < 2) setStep(step + 1)
    else onStateChange?.('success')
  }
  const back = () => step > 0 && setStep(step - 1)

  const nextLabel = step === 0 ? 'Set drop-off' : step === 1 ? 'Package details' : 'Schedule pickup'
  const selectedSize = packageSizes.find((s) => s.id === size)

  return (
    <div className="flex h-full flex-col">
      <StepIndicator step={step} />
      <div className="flex-1 overflow-y-auto scrollbar-thin pb-8">
        {step === 0 && (
          <div className="mt-4 space-y-5 px-5">
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pickup address</h2>
              <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-left transition-base hover:bg-muted">
                <MapPin className="size-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{pickup?.label || 'Enter pickup address'}</p>
                  <p className="truncate text-xs text-muted-foreground">{pickup?.line || 'Where should we pick up?'}</p>
                </div>
              </button>
            </div>
            <ContactFields prefix="pickup" />
          </div>
        )}
        {step === 1 && (
          <div className="mt-4 space-y-5 px-5">
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Drop-off address</h2>
              <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-left transition-base hover:bg-muted">
                <MapPin className="size-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{dropoff?.label || 'Enter drop-off address'}</p>
                  <p className="truncate text-xs text-muted-foreground">{dropoff?.line || 'Where should we deliver?'}</p>
                </div>
              </button>
            </div>
            <ContactFields prefix="dropoff" />
          </div>
        )}
        {step === 2 && (
          <div className="mt-4 space-y-5 px-5">
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Package size</h2>
              <div className="space-y-2.5">
                {packageSizes.map((s) => (
                  <PackageSizeCard key={s.id} size={s} selected={size === s.id} onSelect={() => setSize(s.id)} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Package description (optional)</h2>
              <textarea
                rows={3}
                placeholder="e.g. Important documents in a sealed envelope"
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-base focus:border-foreground"
              />
            </div>
            {selectedSize && (
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Delivery fee</span>
                  <span className="font-variant-numeric-tabular text-lg font-bold text-foreground">{formatUSD(selectedSize.price, { showCents: false })}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Includes 1.2 mi distance · 8 min estimated</p>
              </div>
            )}
          </div>
        )}
      </div>
      <ActionBar step={step} onNext={next} onBack={back} nextLabel={nextLabel} />
    </div>
  )
}
