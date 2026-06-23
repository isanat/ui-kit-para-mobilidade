'use client'

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { EerState, EerSkeleton } from '../../state'
import { EerServiceBadge } from '../../service-badge'
import { EerBookingStatusBadge } from '../../status-badge'
import {
  mockAdminBookings,
  mockAdminStats,
  formatUSD,
  formatRelativeTime,
  formatDateTime,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

type AdminBooking = (typeof mockAdminBookings)[number]

// ── Page header ──
function PageHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="eer-display text-2xl text-foreground">
          Bookings Management
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Search, filter, and manage all bookings across services
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <Download className="size-4" />
          Export
        </Button>
        <Button size="sm" className="eer-btn-primary h-9">
          <Plus className="size-4" />
          Create
        </Button>
      </div>
    </div>
  )
}

// ── Filter bar ──
function FilterBar() {
  return (
    <div className="eer-card-elevated p-4">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by Order ID, customer, or phone…"
            className="h-9 pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger size="sm" className="h-9 w-full lg:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger size="sm" className="h-9 w-full lg:w-40">
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="one-way">One-Way</SelectItem>
            <SelectItem value="tow">Tow Truck</SelectItem>
            <SelectItem value="chauffeur">Chauffeur</SelectItem>
            <SelectItem value="package">Package</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" className="h-9 lg:w-36" />
        <Input type="date" className="h-9 lg:w-36" />
        <div className="flex gap-2">
          <Button size="sm" className="eer-btn-primary h-9">
            Apply Filters
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            Clear
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-9"
            aria-label="Refresh"
          >
            <RefreshCw className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Stat cards row ──
function FilterStatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent: string
}) {
  return (
    <div className="eer-card-elevated p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className={cn('eer-status-dot', accent)} />
      </div>
      <p className="eer-display mt-2 font-variant-numeric-tabular text-2xl text-foreground">{value}</p>
    </div>
  )
}

function FilterStats() {
  const s = mockAdminStats.bookings
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <FilterStatCard
        label="Total"
        value={s.awaiting + s.inProgress + s.completed + s.cancelled}
        accent="bg-primary"
      />
      <FilterStatCard
        label="Active"
        value={s.awaiting + s.inProgress}
        accent="bg-warning"
      />
      <FilterStatCard label="Completed" value={s.completed} accent="bg-success" />
      <FilterStatCard label="Cancelled" value={s.cancelled} accent="bg-destructive" />
    </div>
  )
}

// ── Action icons cell ──
function ActionIcons({ onView }: { onView: () => void }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-muted-foreground hover:text-foreground"
        onClick={(e) => {
          e.stopPropagation()
          onView()
        }}
        aria-label="View"
      >
        <Eye className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-muted-foreground hover:text-foreground"
        onClick={(e) => e.stopPropagation()}
        aria-label="Edit"
      >
        <Pencil className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="size-7 text-muted-foreground hover:text-destructive"
        onClick={(e) => e.stopPropagation()}
        aria-label="Delete"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}

// ── Data table ──
function BookingsTable({ onSelect }: { onSelect: (b: AdminBooking) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const total =
    mockAdminStats.bookings.awaiting +
    mockAdminStats.bookings.inProgress +
    mockAdminStats.bookings.completed +
    mockAdminStats.bookings.cancelled
  return (
    <div className="eer-card-elevated overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-[1]">
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Order ID
              </th>
              <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Service
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
              <th className="px-5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="px-5 py-2.5 text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockAdminBookings.map((b) => (
              <tr
                key={b.id}
                onClick={() => {
                  setSelectedId(b.id)
                  onSelect(b)
                }}
                className={cn(
                  'cursor-pointer transition-base eer-hover-lift',
                  selectedId === b.id ? 'bg-muted/60' : 'hover:bg-muted/40',
                )}
              >
                <td className="px-5 py-3.5 font-mono text-xs font-semibold tabular-nums text-foreground">
                  {b.displayId}
                </td>
                <td className="px-5 py-3.5">
                  <EerServiceBadge service={b.service} size="xs" />
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-foreground">{b.passenger.name}</p>
                  <p className="text-xs text-muted-foreground">{b.passenger.phone}</p>
                </td>
                <td className="px-5 py-3.5">
                  {b.driver ? (
                    <div>
                      <p className="font-medium text-foreground">{b.driver.name}</p>
                      <p className="text-xs text-muted-foreground">{b.driver.phone}</p>
                    </div>
                  ) : (
                    <span className="text-xs italic text-muted-foreground">Unassigned</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-right font-semibold tabular-nums text-foreground">
                  {b.fare > 0 ? formatUSD(b.fare) : '—'}
                </td>
                <td className="px-5 py-3.5">
                  <EerBookingStatusBadge status={b.status} />
                </td>
                <td className="px-5 py-3.5 text-xs text-muted-foreground">
                  {formatDateTime(b.date)}
                </td>
                <td className="px-5 py-3.5">
                  <ActionIcons onView={() => onSelect(b)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 border-t border-border px-5 py-3 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          Showing 1–{mockAdminBookings.length} of {total}
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="size-8" disabled>
            <ArrowLeft className="size-4" />
          </Button>
          {[1, 2, 3].map((p) => (
            <Button
              key={p}
              variant={p === 1 ? 'default' : 'outline'}
              size="icon"
              className="size-8 text-xs"
            >
              {p}
            </Button>
          ))}
          <span className="px-1 text-xs text-muted-foreground">…</span>
          <Button variant="outline" size="icon" className="size-8 text-xs">
            25
          </Button>
          <Button variant="outline" size="icon" className="size-8">
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Booking detail slide-over ──
function BookingDetailSheet({
  booking,
  open,
  onOpenChange,
}: {
  booking: AdminBooking | null
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-y-auto border-l border-border bg-card p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-base">Booking Details</SheetTitle>
          <SheetDescription>
            {booking ? `Order ${booking.displayId}` : ''}
          </SheetDescription>
        </SheetHeader>
        {booking && (
          <div className="space-y-4 p-5">
            {/* Status + service */}
            <div className="flex items-center gap-2">
              <EerBookingStatusBadge status={booking.status} />
              <EerServiceBadge service={booking.service} size="sm" />
            </div>

            {/* Route */}
            <div className="eer-card-elevated !p-4">
              <div className="flex items-stretch gap-3">
                <div className="flex flex-col items-center pt-1">
                  <span className="size-2 rounded-full bg-foreground" />
                  <span className="my-1 w-0.5 grow bg-border" />
                  <span className="size-2 rounded-full bg-muted-foreground" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Pickup
                    </p>
                    <p className="text-sm font-medium text-foreground">{booking.pickup}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Dropoff
                    </p>
                    <p className="text-sm font-medium text-foreground">{booking.dropoff}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer info */}
            <div className="eer-card-elevated !p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Customer
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {booking.passenger.name}
              </p>
              <p className="text-xs text-muted-foreground">{booking.passenger.phone}</p>
            </div>

            {/* Driver info */}
            <div className="eer-card-elevated !p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Driver
              </p>
              {booking.driver ? (
                <>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {booking.driver.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{booking.driver.phone}</p>
                </>
              ) : (
                <p className="mt-1 text-sm italic text-muted-foreground">Unassigned</p>
              )}
            </div>

            {/* Fare breakdown */}
            <div className="eer-card-elevated !p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Fare Breakdown
              </p>
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base fare</span>
                  <span className="font-medium tabular-nums text-foreground">{formatUSD(booking.fare)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Booking time</span>
                  <span className="font-medium text-foreground">
                    {formatRelativeTime(booking.date)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-1.5 text-sm">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="font-bold tabular-nums text-foreground">{formatUSD(booking.fare)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Button className="eer-btn-primary flex-1">Edit Booking</Button>
              <Button variant="outline">Contact</Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

// ── Loading skeleton ──
function TableLoading() {
  return (
    <div className="space-y-8">
      <PageHeader />
      <div className="eer-card-elevated p-4">
        <div className="flex gap-2">
          <EerSkeleton className="h-9 flex-1" />
          <EerSkeleton className="h-9 w-36" />
          <EerSkeleton className="h-9 w-36" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <EerSkeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
      <div className="eer-card-elevated overflow-hidden">
        <EerSkeleton className="h-10 w-full rounded-none" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-border px-5 py-3.5 last:border-0"
          >
            <EerSkeleton className="h-3 w-16" />
            <EerSkeleton className="h-3 w-20" />
            <EerSkeleton className="h-3 w-28" />
            <EerSkeleton className="h-3 w-24" />
            <EerSkeleton className="h-3 w-12 ml-auto" />
            <EerSkeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Success banner ──
function SuccessBanner({
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

// ── Main pattern component ──
export function A2DataTable({ state, onStateChange }: PatternProps) {
  const [selected, setSelected] = useState<AdminBooking | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleSelect = (b: AdminBooking) => {
    setSelected(b)
    setSheetOpen(true)
  }

  if (state === 'loading') return <TableLoading />

  if (state === 'error') {
    return (
      <div className="space-y-8">
        <PageHeader />
        <div className="eer-card-elevated">
          <EerState
            state="error"
            title="Couldn't load bookings"
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
      <div className="space-y-8">
        <PageHeader />
        <SuccessBanner
          message="Booking updated!"
          sub="Status changed to Completed."
          onDismiss={() => onStateChange?.('populated')}
        />
        <FilterBar />
        <FilterStats />
        <BookingsTable onSelect={handleSelect} />
        <BookingDetailSheet
          booking={selected}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        />
      </div>
    )
  }

  if (state === 'empty') {
    return (
      <div className="space-y-8">
        <PageHeader />
        <FilterBar />
        <div className="eer-card-elevated">
          <EerState
            state="empty"
            title="No bookings found"
            description="Try adjusting filters or check back later."
            actionLabel="Reset filters"
            onAction={() => onStateChange?.('populated')}
          />
        </div>
        <BookingDetailSheet
          booking={selected}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
        />
      </div>
    )
  }

  // Populated
  return (
    <div className="space-y-8">
      <PageHeader />
      <FilterBar />
      <FilterStats />
      <BookingsTable onSelect={handleSelect} />
      <BookingDetailSheet
        booking={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
