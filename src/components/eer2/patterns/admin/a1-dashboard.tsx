'use client'

import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  HandCoins,
  LayoutDashboard,
  RefreshCw,
  Truck,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { EerState, EerSkeleton } from '../../state'
import { EerServiceBadge } from '../../service-badge'
import { EerBookingStatusBadge } from '../../status-badge'
import {
  mockAdminStats,
  mockAdminBookings,
  formatUSD,
  formatRelativeTime,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Stat Card helper ──
interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  trend?: { value: string; positive: boolean }
  iconTileClass: string
}

function StatCard({ icon: Icon, label, value, trend, iconTileClass }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-all-eer hover:shadow-md slide-up">
      <div className="flex items-start justify-between">
        <div className={cn('flex size-10 items-center justify-center rounded-lg', iconTileClass)}>
          <Icon className="size-5" />
        </div>
        {trend && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold',
              trend.positive
                ? 'bg-success/15 text-success'
                : 'bg-destructive/15 text-destructive',
            )}
          >
            {trend.positive ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {trend.value}
          </span>
        )}
      </div>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-2xl font-bold text-foreground">{value}</p>
    </div>
  )
}

// ── KPI row ──
function KpiRow() {
  const s = mockAdminStats
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
      <StatCard
        icon={Clock}
        label="Awaiting"
        value={s.bookings.awaiting}
        trend={{ value: '12%', positive: true }}
        iconTileClass="bg-warning/15 text-warning"
      />
      <StatCard
        icon={Truck}
        label="In Progress"
        value={s.bookings.inProgress}
        trend={{ value: '4%', positive: true }}
        iconTileClass="bg-primary/15 text-primary"
      />
      <StatCard
        icon={CheckCircle2}
        label="Completed"
        value={s.bookings.completed}
        trend={{ value: '8%', positive: true }}
        iconTileClass="bg-success/15 text-success"
      />
      <StatCard
        icon={XCircle}
        label="Cancelled"
        value={s.bookings.cancelled}
        trend={{ value: '3%', positive: false }}
        iconTileClass="bg-destructive/15 text-destructive"
      />
      <StatCard
        icon={DollarSign}
        label="Today's Revenue"
        value={formatUSD(s.revenue.today)}
        trend={{ value: '15%', positive: true }}
        iconTileClass="bg-amber/15 text-amber"
      />
    </div>
  )
}

// ── Recent Bookings table ──
type AdminBooking = (typeof mockAdminBookings)[number]

function RecentBookingsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Bookings</h3>
          <p className="text-xs text-muted-foreground">
            Latest {mockAdminBookings.length} bookings across all services
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-8">
          View all
        </Button>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-[1] bg-muted/50 text-left">
            <tr className="text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">Order</th>
              <th className="px-4 py-2.5 font-medium">Customer</th>
              <th className="px-4 py-2.5 font-medium">Driver</th>
              <th className="px-4 py-2.5 text-right font-medium">Fare</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
              <th className="px-4 py-2.5 text-right font-medium">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockAdminBookings.map((b) => (
              <tr key={b.id} className="transition-base hover:bg-muted/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {b.displayId}
                    </span>
                    <EerServiceBadge service={b.service} size="xs" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{b.passenger.name}</p>
                  <p className="text-xs text-muted-foreground">{b.passenger.phone}</p>
                </td>
                <td className="px-4 py-3">
                  {b.driver ? (
                    <div>
                      <p className="font-medium text-foreground">{b.driver.name}</p>
                      <p className="text-xs text-muted-foreground">{b.driver.phone}</p>
                    </div>
                  ) : (
                    <span className="text-xs italic text-muted-foreground">Unassigned</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-foreground">
                  {b.fare > 0 ? formatUSD(b.fare) : '—'}
                </td>
                <td className="px-4 py-3">
                  <EerBookingStatusBadge status={b.status} />
                </td>
                <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                  {formatRelativeTime(b.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Quick Stats panel (right column) ──
function QuickStatsPanel() {
  const { drivers, tips } = mockAdminStats
  return (
    <div className="space-y-4">
      {/* Driver metrics */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Truck className="size-4" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Driver Metrics</h3>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Total</p>
            <p className="mt-0.5 text-xl font-bold text-foreground">{drivers.total}</p>
          </div>
          <div className="rounded-lg border border-success/20 bg-success/10 p-3">
            <p className="text-[11px] uppercase tracking-wide text-success">Online</p>
            <p className="mt-0.5 text-xl font-bold text-success">{drivers.online}</p>
          </div>
          <div className="rounded-lg border border-warning/20 bg-warning/10 p-3">
            <p className="text-[11px] uppercase tracking-wide text-warning">Busy</p>
            <p className="mt-0.5 text-xl font-bold text-warning">{drivers.busy}</p>
          </div>
          <div className="rounded-lg border border-info/20 bg-info/10 p-3">
            <p className="text-[11px] uppercase tracking-wide text-info">Available</p>
            <p className="mt-0.5 text-xl font-bold text-info">{drivers.available}</p>
          </div>
        </div>
      </div>

      {/* Tips summary */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-amber/15 text-amber">
            <HandCoins className="size-4" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Tips Summary</h3>
        </div>
        <div className="mt-3 space-y-2.5">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <span className="text-sm text-muted-foreground">Monthly total</span>
            <span className="font-semibold text-foreground">{formatUSD(tips.monthly)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <span className="text-sm text-muted-foreground">Rides with tips</span>
            <span className="font-semibold text-foreground">{tips.ridesWithTips}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Average tip</span>
            <span className="font-semibold text-foreground">{formatUSD(tips.average)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Activity feed ──
interface ActivityEvent {
  id: string
  icon: LucideIcon
  iconClass: string
  title: string
  detail: string
  time: string
}

const activityEvents: ActivityEvent[] = [
  {
    id: 'e1',
    icon: Bell,
    iconClass: 'bg-primary/15 text-primary',
    title: 'New booking EER-4825',
    detail: 'Olivia Martinez · Black SUV · 16.2 mi',
    time: '2m ago',
  },
  {
    id: 'e2',
    icon: Truck,
    iconClass: 'bg-success/15 text-success',
    title: 'Driver Michael went online',
    detail: 'Michael Thompson · Cadillac Escalade',
    time: '8m ago',
  },
  {
    id: 'e3',
    icon: DollarSign,
    iconClass: 'bg-amber/15 text-amber',
    title: `Payment ${formatUSD(32.5)} processed`,
    detail: 'EER-4820 · Visa •••• 4821',
    time: '15m ago',
  },
  {
    id: 'e4',
    icon: CheckCircle2,
    iconClass: 'bg-success/15 text-success',
    title: 'Ride EER-4820 completed',
    detail: 'David Chen · 2.8 mi · 18 min',
    time: '32m ago',
  },
  {
    id: 'e5',
    icon: XCircle,
    iconClass: 'bg-destructive/15 text-destructive',
    title: 'Booking EER-4805 cancelled',
    detail: `${formatUSD(85)} refund issued to passenger`,
    time: '1h ago',
  },
]

function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Clock className="size-4" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
        </div>
        <button className="text-xs font-medium text-primary transition-base hover:text-primary/80">
          View all
        </button>
      </div>
      <ol className="mt-4">
        {activityEvents.map((e, i) => {
          const isLast = i === activityEvents.length - 1
          return (
            <li key={e.id} className="relative flex gap-3 pb-4 last:pb-0">
              {!isLast && (
                <span
                  className="absolute left-4 top-9 h-full w-px bg-border"
                  aria-hidden
                />
              )}
              <div
                className={cn(
                  'relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full',
                  e.iconClass,
                )}
              >
                <e.icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{e.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{e.time}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{e.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

// ── Page header ──
function DashboardHeader({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <LayoutDashboard className="size-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Operations Dashboard
          </h1>
          <p className="text-xs text-muted-foreground">
            Real-time overview of bookings, drivers, and revenue
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <Download className="size-4" />
          Export
        </Button>
        <Button size="sm" className="h-9" onClick={onRefresh}>
          <RefreshCw className="size-4" />
          Refresh
        </Button>
      </div>
    </div>
  )
}

// ── Loading skeleton ──
function DashboardLoading() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <EerSkeleton className="h-12 w-64" />
        <div className="flex gap-2">
          <EerSkeleton className="h-9 w-24" />
          <EerSkeleton className="h-9 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border bg-card p-4">
            <EerSkeleton className="size-10 rounded-lg" />
            <EerSkeleton className="h-3 w-20" />
            <EerSkeleton className="h-7 w-16" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 rounded-xl border border-border bg-card p-4 lg:col-span-2">
          <EerSkeleton className="h-5 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <EerSkeleton key={i} className="h-10 w-full" />
          ))}
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <EerSkeleton className="h-5 w-28" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <EerSkeleton key={i} className="h-16" />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <EerSkeleton className="h-5 w-28" />
            <div className="mt-3 space-y-2">
              <EerSkeleton className="h-5 w-full" />
              <EerSkeleton className="h-5 w-full" />
              <EerSkeleton className="h-5 w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-card p-4">
        <EerSkeleton className="h-5 w-28" />
        <div className="mt-3 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <EerSkeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Success toast banner ──
function SuccessToast({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-3 spring-in">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
        <CheckCircle2 className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{message}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}

// ── Dashboard content (shared between populated + success) ──
function DashboardContent() {
  return (
    <>
      <KpiRow />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentBookingsTable />
        </div>
        <QuickStatsPanel />
      </div>
      <ActivityFeed />
    </>
  )
}

// ── Main pattern component ──
export function A1Dashboard({ state, onStateChange }: PatternProps) {
  // Loading
  if (state === 'loading') {
    return <DashboardLoading />
  }

  // Error
  if (state === 'error') {
    return (
      <div className="space-y-5">
        <DashboardHeader />
        <div className="rounded-xl border border-border bg-card">
          <EerState
            state="error"
            title="Couldn't load dashboard"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
      </div>
    )
  }

  // Success
  if (state === 'success') {
    return (
      <div className="space-y-5">
        <DashboardHeader onRefresh={() => onStateChange?.('populated')} />
        <SuccessToast
          message="Snapshot refreshed!"
          sub="Latest KPIs synced 2s ago across all services."
        />
        <DashboardContent />
      </div>
    )
  }

  // Empty
  if (state === 'empty') {
    return (
      <div className="space-y-5">
        <DashboardHeader onRefresh={() => onStateChange?.('loading')} />
        <KpiRow />
        <div className="rounded-xl border border-border bg-card">
          <EerState
            state="empty"
            title="No bookings today"
            description="Bookings will appear here as passengers reserve rides."
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
      <DashboardHeader onRefresh={() => onStateChange?.('success')} />
      <DashboardContent />
    </div>
  )
}
