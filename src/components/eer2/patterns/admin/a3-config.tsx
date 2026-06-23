'use client'

import {
  AlertCircle,
  CheckCircle2,
  Cog,
  MapPin,
  Radar,
  RadioTower,
  Save,
  Sliders,
  X,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { EerState, EerSkeleton } from '../../state'
import type { PatternProps } from '../types'

// ── Config state ──
interface DispatchConfig {
  enabled: boolean
  broadcastCount: number
  offerTimeoutSec: number
  maxCascadeRounds: number
  maxRadiusKm: number
  proximityWeight: number
  ratingWeight: number
  acceptanceWeight: number
}

const defaultConfig: DispatchConfig = {
  enabled: true,
  broadcastCount: 8,
  offerTimeoutSec: 15,
  maxCascadeRounds: 3,
  maxRadiusKm: 6,
  proximityWeight: 50,
  ratingWeight: 30,
  acceptanceWeight: 20,
}

// ── Section card ──
function SectionCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="eer-card-v3">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

// ── Number field with description ──
function NumberField({
  id,
  label,
  description,
  suffix,
  value,
  onChange,
  min,
  max,
}: {
  id: string
  label: string
  description?: string
  suffix?: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <Input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="h-9 w-28 font-variant-numeric-tabular"
        />
        {suffix && (
          <span className="text-xs text-muted-foreground">{suffix}</span>
        )}
      </div>
      {description && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}

// ── Weight slider row ──
function WeightSlider({
  label,
  value,
  onChange,
  accent,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  accent: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <span
          className={cn(
            'rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums',
            'bg-muted text-foreground',
          )}
        >
          {value}%
        </span>
      </div>
      <Slider
        value={[value]}
        min={0}
        max={100}
        step={5}
        onValueChange={(v) => onChange(v[0])}
        className="w-full"
      />
    </div>
  )
}

// ── Live Preview (dark card) ──
function LivePreview({ config }: { config: DispatchConfig }) {
  // Simulated dispatch result — computed from config
  const preview = useMemo(() => {
    const distance = Math.min(2.4, config.maxRadiusKm)
    const proximityScore = Math.max(
      0,
      Math.round((1 - distance / config.maxRadiusKm) * 100),
    )
    const ratingScore = 98 // 4.9 * 20
    const acceptanceScore = 95
    const score = Math.round(
      (proximityScore * config.proximityWeight +
        ratingScore * config.ratingWeight +
        acceptanceScore * config.acceptanceWeight) /
        100,
    )
    const eta = Math.max(2, Math.round(distance * 1.5 + config.offerTimeoutSec / 10))
    return { distance, score, eta, proximityScore, ratingScore, acceptanceScore }
  }, [config])

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted/30">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Radar className="size-4 text-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <span className="size-1.5 animate-pulse rounded-full bg-success" />
          Simulated
        </span>
      </div>
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Top Match
        </p>
        <div className="mt-1 flex items-center justify-between">
          <div>
            <p className="text-base font-bold text-foreground">Michael Thompson</p>
            <p className="text-xs text-muted-foreground">
              Cadillac Escalade · NYC-4821
            </p>
          </div>
          <div className="text-right">
            <p className="font-variant-numeric-tabular text-2xl font-bold tracking-tight text-foreground">{preview.score}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Score
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-border bg-card p-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Distance
            </p>
            <p className="mt-0.5 font-variant-numeric-tabular text-sm font-bold text-foreground">
              {preview.distance.toFixed(1)} mi
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              ETA
            </p>
            <p className="mt-0.5 font-variant-numeric-tabular text-sm font-bold text-foreground">{preview.eta} min</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Rating
            </p>
            <p className="mt-0.5 font-variant-numeric-tabular text-sm font-bold text-foreground">4.9 ★</p>
          </div>
        </div>

        <div className="mt-3 space-y-1.5 rounded-lg border border-border bg-card p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Proximity score</span>
            <span className="font-medium tabular-nums text-foreground">{preview.proximityScore}/100</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Rating score</span>
            <span className="font-medium tabular-nums text-foreground">{preview.ratingScore}/100</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Acceptance score</span>
            <span className="font-medium tabular-nums text-foreground">{preview.acceptanceScore}/100</span>
          </div>
        </div>

        <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
          Weights update the score in real time. The system will broadcast to{' '}
          <span className="font-semibold text-foreground">{config.broadcastCount}</span> drivers within{' '}
          <span className="font-semibold text-foreground">{config.maxRadiusKm} mi</span> with a{' '}
          <span className="font-semibold text-foreground">{config.offerTimeoutSec}s</span> timeout.
        </p>
      </div>
    </div>
  )
}

// ── Active Dispatches feed ──
interface ActiveDispatch {
  id: string
  bookingId: string
  passenger: string
  driver: string
  radius: number
  round: number
}

const activeDispatches: ActiveDispatch[] = [
  {
    id: 'ad1',
    bookingId: 'EER-4825',
    passenger: 'Olivia Martinez',
    driver: 'Pending assignment',
    radius: 2.1,
    round: 1,
  },
  {
    id: 'ad2',
    bookingId: 'EER-4821',
    passenger: 'Sarah Mitchell',
    driver: 'Michael Thompson',
    radius: 0.8,
    round: 1,
  },
  {
    id: 'ad3',
    bookingId: 'EER-4826',
    passenger: 'James Carter',
    driver: 'Searching nearby',
    radius: 4.5,
    round: 2,
  },
  {
    id: 'ad4',
    bookingId: 'EER-4827',
    passenger: 'Emily Rodriguez',
    driver: 'David Chen',
    radius: 1.4,
    round: 1,
  },
]

function ActiveDispatchesFeed() {
  return (
    <div className="eer-card-v3">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground">
          <RadioTower className="size-4" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Active Dispatches</h3>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning">
          {activeDispatches.length} LIVE
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {activeDispatches.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2.5 transition-base hover:bg-muted/50"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
              <MapPin className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold tabular-nums text-foreground">
                  {d.bookingId}
                </span>
                <span className="text-[10px] rounded bg-muted px-1.5 py-0.5 font-medium text-muted-foreground">
                  Round {d.round}
                </span>
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {d.passenger} · {d.driver}
              </p>
            </div>
            <div className="text-right">
              <p className="font-variant-numeric-tabular text-xs font-semibold text-foreground">
                {d.radius.toFixed(1)} mi
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-1.5 text-[11px] text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <XCircle className="size-3" />
                Cancel
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page header ──
function PageHeader({
  enabled,
  onToggleEnabled,
  onSave,
}: {
  enabled: boolean
  onToggleEnabled: (v: boolean) => void
  onSave: () => void
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
          <Cog className="size-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dispatch Configuration
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Tune broadcast, scoring, and dispatch cascade parameters
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
          <Switch checked={enabled} onCheckedChange={onToggleEnabled} />
          <span className="text-xs font-medium text-foreground">
            {enabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <Button size="sm" className="eer-btn-primary h-9" onClick={onSave}>
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}

// ── Loading skeleton ──
function ConfigLoading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <EerSkeleton className="h-12 w-64" />
        <div className="flex gap-2">
          <EerSkeleton className="h-9 w-28 rounded-lg" />
          <EerSkeleton className="h-9 w-32" />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <EerSkeleton className="size-9 rounded-lg" />
                <div className="space-y-1.5">
                  <EerSkeleton className="h-4 w-40" />
                  <EerSkeleton className="h-3 w-56" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="space-y-2">
                    <EerSkeleton className="h-3 w-20" />
                    <EerSkeleton className="h-9 w-28" />
                    <EerSkeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 lg:col-span-2">
          <EerSkeleton className="h-72 rounded-2xl" />
          <EerSkeleton className="h-48 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}

// ── Success / Error toasts ──
function SuccessToast({
  message,
  sub,
  onDismiss,
}: {
  message: string
  sub: string
  onDismiss?: () => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-4 spring-in">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
        <CheckCircle2 className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{message}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
      {onDismiss && (
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}

function ErrorBanner({
  message,
  sub,
  onRetry,
}: {
  message: string
  sub: string
  onRetry?: () => void
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 spring-in">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
        <AlertCircle className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{message}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" className="h-8" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}

// ── Main pattern component ──
export function A3Config({ state, onStateChange }: PatternProps) {
  const [config, setConfig] = useState<DispatchConfig>(defaultConfig)
  const weightsSum =
    config.proximityWeight + config.ratingWeight + config.acceptanceWeight

  const update = <K extends keyof DispatchConfig>(key: K, value: DispatchConfig[K]) => {
    setConfig((c) => ({ ...c, [key]: value }))
  }

  if (state === 'loading') return <ConfigLoading />

  if (state === 'error') {
    return (
      <div className="space-y-8">
        <PageHeader
          enabled={config.enabled}
          onToggleEnabled={(v) => update('enabled', v)}
          onSave={() => onStateChange?.('success')}
        />
        <ErrorBanner
          message="Couldn't save config"
          sub="Server responded with 503. Please try again."
          onRetry={() => onStateChange?.('loading')}
        />
        <ConfigLayout
          config={config}
          update={update}
          weightsSum={weightsSum}
        />
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="space-y-8">
        <PageHeader
          enabled={config.enabled}
          onToggleEnabled={(v) => update('enabled', v)}
          onSave={() => onStateChange?.('success')}
        />
        <SuccessToast
          message="Configuration saved!"
          sub="New dispatch parameters are now live across all regions."
          onDismiss={() => onStateChange?.('populated')}
        />
        <ConfigLayout
          config={config}
          update={update}
          weightsSum={weightsSum}
        />
      </div>
    )
  }

  // Populated & empty (empty = populated for config)
  return (
    <div className="space-y-8">
      <PageHeader
        enabled={config.enabled}
        onToggleEnabled={(v) => update('enabled', v)}
        onSave={() => onStateChange?.('success')}
      />
      <ConfigLayout
        config={config}
        update={update}
        weightsSum={weightsSum}
      />
    </div>
  )
}

// ── Two-column layout: form (60%) + preview/dispatches (40%) ──
function ConfigLayout({
  config,
  update,
  weightsSum,
}: {
  config: DispatchConfig
  update: <K extends keyof DispatchConfig>(key: K, value: DispatchConfig[K]) => void
  weightsSum: number
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <ConfigForm config={config} update={update} weightsSum={weightsSum} />
      </div>
      <div className="space-y-6 lg:col-span-2">
        <LivePreview config={config} />
        <ActiveDispatchesFeed />
      </div>
    </div>
  )
}

// ── Config form (left column) ──
function ConfigForm({
  config,
  update,
  weightsSum,
}: {
  config: DispatchConfig
  update: <K extends keyof DispatchConfig>(key: K, value: DispatchConfig[K]) => void
  weightsSum: number
}) {
  return (
    <>
      {/* Broadcast Settings */}
        <SectionCard
          icon={RadioTower}
          title="Broadcast Settings"
          description="How dispatch reaches out to nearby drivers"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              id="broadcast-count"
              label="Broadcast count"
              description="Number of drivers pinged per round"
              value={config.broadcastCount}
              onChange={(v) => update('broadcastCount', v)}
              min={1}
              max={50}
            />
            <NumberField
              id="offer-timeout"
              label="Offer timeout"
              description="Seconds a driver has to accept"
              suffix="sec"
              value={config.offerTimeoutSec}
              onChange={(v) => update('offerTimeoutSec', v)}
              min={5}
              max={120}
            />
            <NumberField
              id="cascade-rounds"
              label="Max cascade rounds"
              description="How many rounds before escalation"
              value={config.maxCascadeRounds}
              onChange={(v) => update('maxCascadeRounds', v)}
              min={1}
              max={10}
            />
            <NumberField
              id="max-radius"
              label="Max radius"
              description="Distance to search for drivers"
              suffix="mi"
              value={config.maxRadiusKm}
              onChange={(v) => update('maxRadiusKm', v)}
              min={1}
              max={30}
            />
          </div>
        </SectionCard>

        {/* Scoring Weights */}
        <SectionCard
          icon={Sliders}
          title="Scoring Weights"
          description="How drivers are ranked for each booking"
        >
          <div className="space-y-4">
            <WeightSlider
              label="Proximity"
              value={config.proximityWeight}
              onChange={(v) => update('proximityWeight', v)}
              accent="bg-muted text-foreground"
            />
            <WeightSlider
              label="Driver rating"
              value={config.ratingWeight}
              onChange={(v) => update('ratingWeight', v)}
              accent="bg-muted text-foreground"
            />
            <WeightSlider
              label="Acceptance rate"
              value={config.acceptanceWeight}
              onChange={(v) => update('acceptanceWeight', v)}
              accent="bg-muted text-foreground"
            />
            <div
              className={cn(
                'flex items-center justify-between rounded-lg border px-3 py-2 text-xs',
                weightsSum === 100
                  ? 'border-success/30 bg-success/5 text-success'
                  : 'border-warning/30 bg-warning/5 text-warning',
              )}
            >
              <span className="font-medium">Total weight</span>
              <span className="font-bold tabular-nums">{weightsSum}%</span>
            </div>
            {weightsSum !== 100 && (
              <p className="text-[11px] text-muted-foreground">
                Weights should sum to 100% for balanced scoring.
              </p>
            )}
          </div>
        </SectionCard>
    </>
  )
}
