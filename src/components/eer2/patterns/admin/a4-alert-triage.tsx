'use client'

import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  Phone,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  User,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { EerState, EerSkeleton } from '../../state'
import {
  mockAdminAlerts,
  formatRelativeTime,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

type AlertType = 'sos' | 'feel-unsafe' | 'accident' | 'breakdown'
type AlertStatus = 'active' | 'resolved' | 'false-alarm'

type AdminAlert = (typeof mockAdminAlerts)[number]

// ── Alert type config ──
const alertTypeConfig: Record<
  AlertType,
  { label: string; headerClass: string; icon: LucideIcon; iconClass: string }
> = {
  sos: {
    label: 'SOS Emergency',
    headerClass: 'bg-destructive',
    icon: ShieldAlert,
    iconClass: 'text-destructive-foreground',
  },
  'feel-unsafe': {
    label: 'Feel Unsafe',
    headerClass: 'bg-warning',
    icon: AlertTriangle,
    iconClass: 'text-warning-foreground',
  },
  accident: {
    label: 'Accident',
    headerClass: 'bg-amber',
    icon: AlertOctagon,
    iconClass: 'text-amber-foreground',
  },
  breakdown: {
    label: 'Breakdown',
    headerClass: 'bg-info',
    icon: AlertCircle,
    iconClass: 'text-info-foreground',
  },
}

const statusConfig: Record<AlertStatus, { label: string; badgeClass: string }> = {
  active: {
    label: 'Active',
    badgeClass: 'bg-destructive/15 text-destructive border-destructive/20',
  },
  resolved: {
    label: 'Resolved',
    badgeClass: 'bg-success/15 text-success border-success/20',
  },
  'false-alarm': {
    label: 'False Alarm',
    badgeClass: 'bg-muted text-muted-foreground border-border',
  },
}

// ── Page header ──
type FilterId = 'active' | 'resolved' | 'false-alarm' | 'all'

const filterOptions: { id: FilterId; label: string }[] = [
  { id: 'active', label: 'Active' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'false-alarm', label: 'False Alarm' },
  { id: 'all', label: 'All' },
]

function PageHeader({
  filter,
  onFilterChange,
  onRefresh,
}: {
  filter: FilterId
  onFilterChange: (f: FilterId) => void
  onRefresh?: () => void
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
          <ShieldAlert className="size-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            SOS Alert Triage
          </h1>
          <p className="text-xs text-muted-foreground">
            Monitor and resolve safety incidents in real time
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="inline-flex rounded-lg border border-border bg-card p-0.5">
          {filterOptions.map((o) => (
            <button
              key={o.id}
              onClick={() => onFilterChange(o.id)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-base',
                filter === o.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-9"
          onClick={onRefresh}
          aria-label="Refresh"
        >
          <RefreshCw className="size-4" />
        </Button>
      </div>
    </div>
  )
}

// ── Stat cards row ──
function AlertStatCard({
  label,
  value,
  accentClass,
  dotClass,
}: {
  label: string
  value: number
  accentClass: string
  dotClass: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-4 transition-all-eer hover:shadow-md',
        accentClass,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className={cn('size-2 rounded-full', dotClass)} />
      </div>
      <p className="mt-1 text-2xl font-bold text-foreground tabular-nums">{value}</p>
    </div>
  )
}

function AlertStats({ alerts }: { alerts: AdminAlert[] }) {
  const active = alerts.filter((a) => a.status === 'active').length
  const resolved = alerts.filter((a) => a.status === 'resolved').length
  // Mock data has 'active' | 'resolved'; widen to AlertStatus for future false-alarms
  const falseAlarm = alerts.filter((a) => (a.status as AlertStatus) === 'false-alarm').length
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <AlertStatCard
        label="Active"
        value={active}
        accentClass="border-destructive/20"
        dotClass="bg-destructive"
      />
      <AlertStatCard
        label="Resolved"
        value={resolved}
        accentClass="border-success/20"
        dotClass="bg-success"
      />
      <AlertStatCard
        label="False Alarms"
        value={falseAlarm}
        accentClass="border-border"
        dotClass="bg-muted-foreground"
      />
      <AlertStatCard
        label="Total"
        value={alerts.length}
        accentClass="border-primary/20"
        dotClass="bg-primary"
      />
    </div>
  )
}

// ── Alert card ──
function AlertCard({ alert }: { alert: AdminAlert }) {
  const typeCfg = alertTypeConfig[alert.type]
  const statusCfg = statusConfig[alert.status]
  const Icon = typeCfg.icon
  const isResolved = alert.status !== 'active'

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border bg-card transition-all-eer hover:shadow-md',
        isResolved ? 'border-border opacity-90' : 'border-border',
      )}
    >
      {/* Colored header strip */}
      <div className={cn('flex items-center gap-2 px-4 py-2.5', typeCfg.headerClass)}>
        <Icon className={cn('size-4', typeCfg.iconClass)} />
        <span className={cn('text-sm font-semibold', typeCfg.iconClass)}>
          {typeCfg.label}
        </span>
        <span
          className={cn(
            'ml-auto inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium',
            'border-white/20 bg-white/15 backdrop-blur-sm',
            isResolved ? 'text-white/90' : 'text-white',
          )}
        >
          <span
            className={cn(
              'size-1.5 rounded-full',
              alert.status === 'active' ? 'animate-pulse bg-white' : 'bg-white/60',
            )}
          />
          {statusCfg.label}
        </span>
      </div>

      {/* Body */}
      <div className={cn('space-y-3 p-4', isResolved && 'bg-muted/30')}>
        {/* Booking ID + timestamp */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-semibold text-foreground">
            {alert.bookingId}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="size-3" />
            {formatRelativeTime(alert.date)}
          </span>
        </div>

        {/* Message */}
        <p className="rounded-lg bg-muted/40 p-2.5 text-sm text-foreground">
          {alert.message}
        </p>

        {/* User + Driver info */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-border p-2.5">
            <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
              <User className="size-3" />
              Passenger
            </p>
            <p className="mt-0.5 truncate text-xs font-medium text-foreground">
              {alert.user.name}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">{alert.user.phone}</p>
          </div>
          <div className="rounded-lg border border-border p-2.5">
            <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
              <Phone className="size-3" />
              Driver
            </p>
            <p className="mt-0.5 truncate text-xs font-medium text-foreground">
              {alert.driver.name}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">{alert.driver.phone}</p>
          </div>
        </div>

        {/* GPS coordinates */}
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="size-3.5 shrink-0 text-primary" />
            <span className="truncate font-mono text-[11px] text-foreground">
              {alert.location}
            </span>
          </div>
          <button className="shrink-0 text-[11px] font-medium text-primary transition-base hover:text-primary/80">
            View on map
          </button>
        </div>

        {/* Resolution note for non-active alerts */}
        {isResolved && (
          <div className="flex items-center gap-1.5 rounded-lg bg-muted/40 px-2.5 py-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="size-3.5 shrink-0 text-success" />
            Resolved {formatRelativeTime(alert.date)} · by Ops Team
          </div>
        )}

        {/* Action buttons */}
        {!isResolved && (
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              size="sm"
              className="h-8 bg-success text-success-foreground hover:bg-success/90"
            >
              <CheckCircle2 className="size-3.5" />
              Resolve
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Trash2 className="size-3.5" />
              Mark False Alarm
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Eye className="size-3.5" />
              View Booking
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Alert cards grid ──
function AlertCardsGrid({ alerts }: { alerts: AdminAlert[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {alerts.map((a) => (
        <AlertCard key={a.id} alert={a} />
      ))}
    </div>
  )
}

// ── Loading skeleton ──
function AlertLoading() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <EerSkeleton className="h-12 w-56" />
        <div className="flex gap-2">
          <EerSkeleton className="h-9 w-72 rounded-lg" />
          <EerSkeleton className="size-9 rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <EerSkeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
            <EerSkeleton className="h-10 w-full rounded-none" />
            <div className="space-y-3 p-4">
              <EerSkeleton className="h-3 w-24" />
              <EerSkeleton className="h-12 w-full" />
              <div className="grid grid-cols-2 gap-2">
                <EerSkeleton className="h-16" />
                <EerSkeleton className="h-16" />
              </div>
              <EerSkeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Success toast ──
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
    <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-3 spring-in">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
        <ShieldCheck className="size-5" />
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
          <AlertCircle className="size-4" />
        </Button>
      )}
    </div>
  )
}

// ── Main pattern component ──
export function A4AlertTriage({ state, onStateChange }: PatternProps) {
  const [filter, setFilter] = useState<FilterId>('all')

  const filteredAlerts =
    filter === 'all'
      ? mockAdminAlerts
      : mockAdminAlerts.filter((a) => a.status === filter)

  if (state === 'loading') return <AlertLoading />

  if (state === 'error') {
    return (
      <div className="space-y-5">
        <PageHeader filter={filter} onFilterChange={setFilter} />
        <AlertStats alerts={mockAdminAlerts} />
        <div className="rounded-xl border border-border bg-card">
          <EerState
            state="error"
            title="Couldn't load alerts"
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
      <div className="space-y-5">
        <PageHeader
          filter={filter}
          onFilterChange={setFilter}
          onRefresh={() => onStateChange?.('populated')}
        />
        <SuccessToast
          message="Alert resolved!"
          sub="EER-4825 marked as resolved. Passenger notified."
          onDismiss={() => onStateChange?.('populated')}
        />
        <AlertStats alerts={mockAdminAlerts} />
        <AlertCardsGrid alerts={mockAdminAlerts} />
      </div>
    )
  }

  if (state === 'empty') {
    return (
      <div className="space-y-5">
        <PageHeader filter={filter} onFilterChange={setFilter} />
        <AlertStats alerts={[]} />
        <div className="rounded-xl border border-border bg-card">
          <EerState
            state="empty"
            title="No active alerts — all clear"
            description="There are no safety incidents matching this filter."
            actionLabel="Refresh"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
      </div>
    )
  }

  // Populated
  return (
    <div className="space-y-5">
      <PageHeader
        filter={filter}
        onFilterChange={setFilter}
        onRefresh={() => onStateChange?.('loading')}
      />
      <AlertStats alerts={mockAdminAlerts} />
      {filteredAlerts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card">
          <EerState
            state="empty"
            title={`No ${filter === 'all' ? '' : filter + ' '}alerts`}
            description="Try a different filter to see more alerts."
          />
        </div>
      ) : (
        <AlertCardsGrid alerts={filteredAlerts} />
      )}
    </div>
  )
}
