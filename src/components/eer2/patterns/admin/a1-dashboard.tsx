'use client'

import { ArrowUpRight, Download, Search, Bell, MoreHorizontal } from 'lucide-react'
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

// ═══════════════════════════════════════════════════════════════
// A1 ADMIN DASHBOARD — v3 Clean (Stripe/Linear-inspired)
// Principles:
// - KPI hero: 1 metric 3× larger than secondary
// - Monochrome: no colored icon tiles, subtle borders only
// - Whitespace: 48px between sections
// - Tabular nums for all data
// - Minimal table: 64px rows, hover state
// ═══════════════════════════════════════════════════════════════

// ── KPI Hero (the one metric that matters most) ──
function KpiHero() {
  const revenue = mockAdminStats.revenue.today
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Today's Revenue
      </p>
      <p className="eer-hero-number mt-2 text-foreground">{formatUSD(revenue)}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-success">
          <ArrowUpRight className="size-3.5" />
          12%
        </span>
        <span className="text-xs text-muted-foreground">vs yesterday</span>
      </div>
    </div>
  )
}

// ── Secondary KPI (small, 2-line) ──
function KpiSecondary({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-variant-numeric-tabular text-2xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

// ── Minimal bookings table ──
function BookingsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Bookings</h3>
          <p className="text-xs text-muted-foreground">Latest 6 across all services</p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          View all
        </Button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Order
            </th>
            <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Customer
            </th>
            <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Driver
            </th>
            <th className="px-5 py-2.5 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Fare
            </th>
            <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {mockAdminBookings.slice(0, 6).map((b) => (
            <tr key={b.id} className="transition-base hover:bg-muted/40">
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-foreground">{b.displayId}</span>
                  <EerServiceBadge service={b.service} size="xs" />
                </div>
              </td>
              <td className="px-5 py-3.5">
                <p className="text-sm font-medium text-foreground">{b.passenger.name}</p>
                <p className="text-xs text-muted-foreground">{b.passenger.phone}</p>
              </td>
              <td className="px-5 py-3.5">
                {b.driver ? (
                  <p className="text-sm text-foreground">{b.driver.name}</p>
                ) : (
                  <span className="text-xs italic text-muted-foreground">Unassigned</span>
                )}
              </td>
              <td className="px-5 py-3.5 text-right">
                <span className="font-variant-numeric-tabular text-sm font-semibold text-foreground">
                  {formatUSD(b.fare)}
                </span>
              </td>
              <td className="px-5 py-3.5">
                <EerBookingStatusBadge status={b.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Side panel (driver metrics) ──
function DriverMetrics() {
  const d = mockAdminStats.drivers
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Driver Availability</h3>
      <div className="mt-4 space-y-3">
        {[
          { label: 'Online', value: d.online, total: d.total, color: 'bg-success' },
          { label: 'Busy', value: d.busy, total: d.total, color: 'bg-warning' },
          { label: 'Available', value: d.available, total: d.total, color: 'bg-info' },
        ].map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={cn('eer-status-dot', m.color)} />
                <span className="text-muted-foreground">{m.label}</span>
              </div>
              <span className="font-variant-numeric-tabular font-medium text-foreground">
                {m.value}
                <span className="text-muted-foreground">/{m.total}</span>
              </span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn('h-full rounded-full', m.color)}
                style={{ width: `${(m.value / m.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Page header ──
function PageHeader() {
  return (
    <div className="flex items-center justify-between pb-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Operations</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="size-4" />
          Export
        </Button>
        <Button variant="outline" size="icon" className="size-9">
          <Search className="size-4" />
        </Button>
        <Button variant="outline" size="icon" className="size-9">
          <Bell className="size-4" />
        </Button>
      </div>
    </div>
  )
}

// ── Loading ──
function AdminLoading() {
  return (
    <div className="space-y-8">
      <EerSkeleton className="h-8 w-48 rounded" />
      <div className="grid gap-4 lg:grid-cols-3">
        <EerSkeleton className="h-40 rounded-2xl lg:col-span-1" />
        <EerSkeleton className="h-40 rounded-2xl" />
        <EerSkeleton className="h-40 rounded-2xl" />
      </div>
      <EerSkeleton className="h-96 rounded-2xl" />
    </div>
  )
}

// ── Main ──
export function A1Dashboard({ state, onStateChange }: PatternProps) {
  if (state === 'loading') return <AdminLoading />

  if (state === 'error') {
    return (
      <EerState
        state="error"
        title="Couldn't load dashboard"
        description="Check your connection and try again."
        actionLabel="Retry"
        onAction={() => onStateChange?.('loading')}
      />
    )
  }

  if (state === 'empty') {
    return (
      <div className="space-y-8">
        <PageHeader />
        <EerState
          state="empty"
          title="No bookings today"
          description="Bookings will appear here once they start coming in."
        />
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="space-y-8">
        <PageHeader />
        <div className="rounded-2xl border border-success/30 bg-success/5 p-5">
          <p className="text-sm font-medium text-foreground">Snapshot refreshed</p>
          <p className="text-xs text-muted-foreground">All metrics are up to date.</p>
        </div>
      </div>
    )
  }

  // populated
  return (
    <div className="space-y-8">
      <PageHeader />

      {/* KPI row: hero (2 cols) + 2 secondary */}
      <div className="grid gap-4 lg:grid-cols-3">
        <KpiHero />
        <KpiSecondary
          label="Active Bookings"
          value={String(mockAdminStats.bookings.inProgress + mockAdminStats.bookings.awaiting)}
          sub={`${mockAdminStats.bookings.awaiting} awaiting · ${mockAdminStats.bookings.inProgress} in progress`}
        />
        <KpiSecondary
          label="Completed Today"
          value={String(mockAdminStats.bookings.completed)}
          sub={`${mockAdminStats.bookings.cancelled} cancelled`}
        />
      </div>

      {/* Main content: table (2 cols) + side panel (1 col) */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookingsTable />
        </div>
        <div className="space-y-6">
          <DriverMetrics />
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-foreground">Tips Summary</h3>
            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly</span>
                <span className="font-variant-numeric-tabular font-medium text-foreground">
                  {formatUSD(mockAdminStats.tips.monthly)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rides w/ tips</span>
                <span className="font-variant-numeric-tabular font-medium text-foreground">
                  {mockAdminStats.tips.ridesWithTips}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Average</span>
                <span className="font-variant-numeric-tabular font-medium text-foreground">
                  {formatUSD(mockAdminStats.tips.average)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
