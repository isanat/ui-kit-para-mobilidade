'use client'

import {
  ArrowLeft,
  Car,
  ChevronRight,
  CreditCard,
  Award,
  Gift,
  HandCoins,
  MapPin,
  Star,
  Phone,
  MessageSquare,
  Calendar,
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { EerState, EerSkeletonList } from '../../state'
import { EerServiceBadge } from '../../service-badge'
import { EerBookingStatusBadge, EerPaymentStatusBadge } from '../../status-badge'
import {
  mockBookings,
  mockPayments,
  mockTips,
  mockPointsHistory,
  mockReferrals,
  formatUSD,
  formatDistance,
  formatDuration,
  formatRelativeTime,
  formatDateTime,
  type Booking,
  type Payment,
  type ServiceType,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Tab config ──
type TabId = 'bookings' | 'payments' | 'points' | 'referrals' | 'tips'

const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'bookings', label: 'Bookings', icon: Car },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'points', label: 'Points', icon: Award },
  { id: 'referrals', label: 'Referrals', icon: Gift },
  { id: 'tips', label: 'Tips', icon: HandCoins },
]

// ── Filter pill sets per tab ──
const filterSets: Record<TabId, string[]> = {
  bookings: ['All', 'Active', 'Completed', 'Cancelled'],
  payments: ['All', 'Succeeded', 'Pending', 'Failed'],
  points: ['All', 'Credited', 'Redeemed'],
  referrals: ['All', 'Completed', 'Pending'],
  tips: ['All'],
}

// ── Royal blue gradient header ──
function ActivityHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 px-5 pb-5 pt-10 text-primary-foreground">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-base hover:bg-white/20"
        >
          <ArrowLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold">My Activity</span>
        <div className="size-9" />
      </div>
      <h1 className="mt-4 text-xl font-bold">History &amp; details</h1>
      <p className="mt-0.5 text-xs opacity-80">
        Track bookings, payments, points, referrals, and tips.
      </p>
    </div>
  )
}

// ── Horizontal scrollable tab bar ──
function TabBar({
  active,
  onSelect,
}: {
  active: TabId
  onSelect: (id: TabId) => void
}) {
  return (
    <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-border bg-card px-3 py-2">
      {tabs.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-base',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <t.icon className="size-3.5" />
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

// ── Filter pills ──
function FilterPills({
  filters,
  active,
  onSelect,
}: {
  filters: string[]
  active: string
  onSelect: (f: string) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
      {filters.map((f) => {
        const isActive = f === active
        return (
          <button
            key={f}
            onClick={() => onSelect(f)}
            className={cn(
              'shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-base',
              isActive
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {f}
          </button>
        )
      })}
    </div>
  )
}

// ── Generic list card layout (avatar + title + subtitle + amount + status + date) ──
interface ListCardProps {
  icon: LucideIcon
  iconColor: string
  title: string
  subtitle: string
  amount?: string
  amountClass?: string
  badge?: React.ReactNode
  date: string
  onClick?: () => void
}

function ListCard({
  icon: Icon,
  iconColor,
  title,
  subtitle,
  amount,
  amountClass,
  badge,
  date,
  onClick,
}: ListCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all-eer hover:border-primary/30 hover:shadow-sm active:scale-[0.99]"
    >
      <div
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-lg',
          iconColor,
        )}
      >
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        <div className="mt-1 flex items-center gap-2">
          {badge}
          <span className="text-[11px] text-muted-foreground">{date}</span>
        </div>
      </div>
      {amount && (
        <div className="flex shrink-0 flex-col items-end">
          <span className={cn('text-sm font-semibold', amountClass)}>{amount}</span>
          <ChevronRight className="mt-1 size-4 text-muted-foreground" />
        </div>
      )}
    </button>
  )
}

// ── Filter helpers ──
function matchesBookingFilter(b: Booking, filter: string): boolean {
  if (filter === 'All') return true
  if (filter === 'Active')
    return ['scheduled', 'searching', 'accepted', 'en-route', 'arrived', 'in-progress'].includes(
      b.status,
    )
  if (filter === 'Completed') return b.status === 'completed'
  if (filter === 'Cancelled') return b.status === 'cancelled'
  return true
}

function matchesPaymentFilter(p: Payment, filter: string): boolean {
  if (filter === 'All') return true
  return p.status === filter.toLowerCase()
}

// ── Booking detail sheet ──
function BookingDetailSheet({
  booking,
  open,
  onOpenChange,
}: {
  booking: Booking | null
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  if (!booking) return null
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-w-[380px] rounded-t-2xl p-0">
        <SheetHeader className="px-5 pt-5">
          <div className="flex items-center justify-between pr-6">
            <SheetTitle className="text-base">Booking {booking.displayId}</SheetTitle>
            <EerServiceBadge service={booking.service as ServiceType} size="xs" />
          </div>
          <SheetDescription className="sr-only">Booking details</SheetDescription>
        </SheetHeader>

        <div className="px-5 pb-6">
          {/* Status row */}
          <div className="mt-1 flex items-center gap-2">
            <EerBookingStatusBadge status={booking.status} />
            <span className="text-xs text-muted-foreground">
              {formatDateTime(booking.scheduledAt)}
            </span>
          </div>

          {/* 2x2 detail grid */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <DetailCell icon={Calendar} label="Scheduled" value={formatDateTime(booking.scheduledAt)} />
            <DetailCell
              icon={Car}
              label="Vehicle"
              value={booking.vehicleClass ?? 'Standard'}
            />
            <DetailCell
              icon={MapPin}
              label="Distance"
              value={formatDistance(booking.distance)}
            />
            <DetailCell
              icon={Star}
              label="Duration"
              value={formatDuration(booking.duration)}
            />
          </div>

          {/* Route info */}
          <div className="mt-4 flex items-stretch gap-3 rounded-xl border border-border bg-card p-3">
            <div className="flex flex-col items-center pt-1">
              <div className="size-2.5 rounded-full bg-primary ring-4 ring-primary/15" />
              <div className="my-1 w-0.5 grow bg-border" />
              <div className="size-2.5 rounded-full bg-success ring-4 ring-success/15" />
            </div>
            <div className="flex-1 space-y-3 py-0.5">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Pickup</p>
                <p className="truncate text-sm font-medium text-foreground">
                  {booking.pickup.label}
                </p>
                <p className="truncate text-xs text-muted-foreground">{booking.pickup.line}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Dropoff
                </p>
                <p className="truncate text-sm font-medium text-foreground">
                  {booking.dropoff.label}
                </p>
                <p className="truncate text-xs text-muted-foreground">{booking.dropoff.line}</p>
              </div>
            </div>
          </div>

          {/* Amounts */}
          <div className="mt-4 space-y-2 rounded-xl border border-border bg-card p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Fare</span>
              <span className="text-foreground">{formatUSD(booking.fare)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tip</span>
              <span className="text-foreground">
                {booking.tip ? formatUSD(booking.tip) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">
                {formatUSD(booking.fare + (booking.tip ?? 0))}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          {booking.driver && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" className="rounded-xl">
                <MessageSquare className="size-4" />
                Message
              </Button>
              <Button className="rounded-xl bg-success text-success-foreground hover:bg-success/90">
                <Phone className="size-4" />
                Call driver
              </Button>
            </div>
          )}
          {booking.status === 'completed' && (
            <Button variant="outline" className="mt-2 w-full rounded-xl">
              <Star className="size-4" />
              Rate this trip
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Payment detail sheet ──
function PaymentDetailSheet({
  payment,
  open,
  onOpenChange,
}: {
  payment: Payment | null
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  if (!payment) return null
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-w-[380px] rounded-t-2xl p-0">
        <SheetHeader className="px-5 pt-5">
          <div className="flex items-center justify-between pr-6">
            <SheetTitle className="text-base">Payment {payment.id.toUpperCase()}</SheetTitle>
            <EerPaymentStatusBadge status={payment.status} />
          </div>
          <SheetDescription className="sr-only">Payment details</SheetDescription>
        </SheetHeader>

        <div className="px-5 pb-6">
          {/* 2x2 detail grid */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <DetailCell icon={Car} label="Booking" value={payment.bookingId} />
            <DetailCell
              icon={CreditCard}
              label="Method"
              value={payment.method.replace('-', ' ')}
            />
            <DetailCell icon={Calendar} label="Date" value={formatDateTime(payment.createdAt)} />
            <DetailCell
              icon={Star}
              label="Status"
              value={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            />
          </div>

          {/* Amounts */}
          <div className="mt-4 space-y-2 rounded-xl border border-border bg-card p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Fare</span>
              <span className="text-foreground">{formatUSD(payment.amount)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tip</span>
              <span className="text-foreground">
                {payment.tip ? formatUSD(payment.tip) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 font-semibold">
              <span className="text-foreground">Total charged</span>
              <span className="text-primary">
                {formatUSD(payment.amount + (payment.tip ?? 0))}
              </span>
            </div>
          </div>

          <Button variant="outline" className="mt-4 w-full rounded-xl">
            <CreditCard className="size-4" />
            View receipt
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Referral / Points / Tips detail sheets (compact) ──
function GenericDetailSheet({
  open,
  onOpenChange,
  title,
  badge,
  rows,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: string
  badge?: React.ReactNode
  rows: { label: string; value: string; mono?: boolean }[]
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-w-[380px] rounded-t-2xl p-0">
        <SheetHeader className="px-5 pt-5">
          <div className="flex items-center justify-between pr-6">
            <SheetTitle className="text-base">{title}</SheetTitle>
            {badge}
          </div>
          <SheetDescription className="sr-only">Details</SheetDescription>
        </SheetHeader>
        <div className="px-5 pb-6">
          <div className="mt-4 space-y-2 rounded-xl border border-border bg-card p-3 text-sm">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-muted-foreground">{r.label}</span>
                <span
                  className={cn(
                    'text-foreground',
                    r.mono && 'font-mono text-xs',
                  )}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Small detail cell used in the 2x2 grid ──
function DetailCell({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3" />
        {label}
      </div>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}

// ── Empty state copy per tab ──
const emptyCopy: Record<TabId, { title: string; description: string; cta: string }> = {
  bookings: {
    title: 'No bookings yet',
    description: 'When you book a ride, it will show up here.',
    cta: 'Book a ride',
  },
  payments: {
    title: 'No payments yet',
    description: 'Your completed payments will appear here.',
    cta: 'Browse services',
  },
  points: {
    title: 'No points activity',
    description: 'Earn points by booking rides and referring friends.',
    cta: 'Find a ride',
  },
  referrals: {
    title: 'No referrals yet',
    description: 'Invite friends and earn $10 when they take their first ride.',
    cta: 'Invite friends',
  },
  tips: {
    title: 'No tips yet',
    description: 'Tips you leave for drivers will show up here.',
    cta: 'View bookings',
  },
}

// ── Count items for a tab (used by header chip & empty-state detection) ──
function countItems(tab: TabId, filter: string): number {
  switch (tab) {
    case 'bookings':
      return mockBookings.filter((b) => matchesBookingFilter(b, filter)).length
    case 'payments':
      return mockPayments.filter((p) => matchesPaymentFilter(p, filter)).length
    case 'points':
      return mockPointsHistory.filter((p) => {
        if (filter === 'All') return true
        return p.type === filter.toLowerCase()
      }).length
    case 'referrals':
      return mockReferrals.filter((r) => {
        if (filter === 'All') return true
        return r.status === filter.toLowerCase()
      }).length
    case 'tips':
      return mockTips.length
  }
}

// ── Main pattern component ──
export function P7ListDetail({ state, onStateChange }: PatternProps) {
  const [activeTab, setActiveTab] = useState<TabId>('bookings')
  const [activeFilter, setActiveFilter] = useState('All')

  // Detail sheet selection state (one per type, only one open at a time)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [selectedPointIdx, setSelectedPointIdx] = useState<number | null>(null)
  const [selectedReferralIdx, setSelectedReferralIdx] = useState<number | null>(null)
  const [selectedTipIdx, setSelectedTipIdx] = useState<number | null>(null)
  const [visibleCount, setVisibleCount] = useState(4)

  const filters = filterSets[activeTab]
  const totalItems = useMemo(() => countItems(activeTab, activeFilter), [activeTab, activeFilter])
  const hasMore = visibleCount < totalItems

  // Reset filter + pagination on tab change
  const handleTabChange = (t: TabId) => {
    setActiveTab(t)
    setActiveFilter('All')
    setVisibleCount(4)
  }

  // ── Loading: skeleton list ──
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <ActivityHeader />
          <TabBar active={activeTab} onSelect={handleTabChange} />
          <FilterPills
            filters={filters}
            active={activeFilter}
            onSelect={setActiveFilter}
          />
          <div className="px-4 pb-6">
            <EerSkeletonList count={4} />
          </div>
        </div>
      </div>
    )
  }

  // ── Error state ──
  if (state === 'error') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <ActivityHeader />
          <TabBar active={activeTab} onSelect={handleTabChange} />
          <EerState
            state="error"
            title="Couldn't load your activity"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
      </div>
    )
  }

  // ── Populated, empty & success: full list (success maps to populated) ──
  // The empty state is per-tab and triggered by filter having no matches.
  const showEmpty = state === 'empty' || totalItems === 0
  const empty = emptyCopy[activeTab]

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <ActivityHeader />
        <TabBar active={activeTab} onSelect={handleTabChange} />
        <FilterPills
          filters={filters}
          active={activeFilter}
          onSelect={(f) => {
            setActiveFilter(f)
            setVisibleCount(4)
          }}
        />

        <div className="space-y-2 px-4 pb-6">
          {showEmpty ? (
            <EerState
              state="empty"
              title={empty.title}
              description={empty.description}
              actionLabel={empty.cta}
              onAction={() => onStateChange?.('populated')}
            />
          ) : (
            <div className="space-y-2">
              <VisibleListSlice
                tab={activeTab}
                filter={activeFilter}
                limit={visibleCount}
                onSelectBooking={(b) => setSelectedBooking(b)}
                onSelectPayment={(p) => setSelectedPayment(p)}
                onSelectPoint={(i) => setSelectedPointIdx(i)}
                onSelectReferral={(i) => setSelectedReferralIdx(i)}
                onSelectTip={(i) => setSelectedTipIdx(i)}
              />
              {hasMore && (
                <button
                  onClick={() => setVisibleCount((c) => c + 4)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm font-medium text-muted-foreground transition-base hover:border-primary/40 hover:text-primary"
                >
                  Load more
                  <ChevronRight className="size-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Detail sheets (only one open at a time) ── */}
      <BookingDetailSheet
        booking={selectedBooking}
        open={!!selectedBooking}
        onOpenChange={(v) => !v && setSelectedBooking(null)}
      />
      <PaymentDetailSheet
        payment={selectedPayment}
        open={!!selectedPayment}
        onOpenChange={(v) => !v && setSelectedPayment(null)}
      />
      {selectedPointIdx !== null && (
        <GenericDetailSheet
          open
          onOpenChange={(v) => !v && setSelectedPointIdx(null)}
          title={mockPointsHistory[selectedPointIdx].reason}
          badge={
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
                mockPointsHistory[selectedPointIdx].type === 'credited'
                  ? 'border-success/20 bg-success/15 text-success'
                  : 'border-destructive/20 bg-destructive/15 text-destructive',
              )}
            >
              {mockPointsHistory[selectedPointIdx].type === 'credited' ? 'Credited' : 'Redeemed'}
            </span>
          }
          rows={[
            { label: 'Type', value: mockPointsHistory[selectedPointIdx].type },
            { label: 'Points', value: `${mockPointsHistory[selectedPointIdx].amount} pts` },
            { label: 'Date', value: formatDateTime(mockPointsHistory[selectedPointIdx].date) },
          ]}
        />
      )}
      {selectedReferralIdx !== null && (
        <GenericDetailSheet
          open
          onOpenChange={(v) => !v && setSelectedReferralIdx(null)}
          title={mockReferrals[selectedReferralIdx].name}
          badge={
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
                mockReferrals[selectedReferralIdx].status === 'completed'
                  ? 'border-success/20 bg-success/15 text-success'
                  : 'border-warning/20 bg-warning/15 text-warning',
              )}
            >
              {mockReferrals[selectedReferralIdx].status === 'completed'
                ? 'Completed'
                : 'Pending'}
            </span>
          }
          rows={[
            { label: 'Email', value: mockReferrals[selectedReferralIdx].email },
            {
              label: 'Reward',
              value:
                mockReferrals[selectedReferralIdx].reward > 0
                  ? formatUSD(mockReferrals[selectedReferralIdx].reward)
                  : '—',
            },
            {
              label: 'Date',
              value: formatDateTime(mockReferrals[selectedReferralIdx].date),
            },
          ]}
        />
      )}
      {selectedTipIdx !== null && (
        <GenericDetailSheet
          open
          onOpenChange={(v) => !v && setSelectedTipIdx(null)}
          title={`Tip · ${mockTips[selectedTipIdx].driver.name}`}
          badge={
            <span className="inline-flex items-center gap-1 rounded-full border border-amber/20 bg-amber/15 px-2 py-0.5 text-xs font-medium text-amber">
              {formatUSD(mockTips[selectedTipIdx].amount)}
            </span>
          }
          rows={[
            { label: 'Driver', value: mockTips[selectedTipIdx].driver.name },
            { label: 'Vehicle', value: mockTips[selectedTipIdx].driver.vehicle.model },
            { label: 'Booking', value: mockTips[selectedTipIdx].booking },
            { label: 'Date', value: formatDateTime(mockTips[selectedTipIdx].date) },
          ]}
        />
      )}
    </div>
  )
}

// ── Visible slice of the active list (paginated) ──
function VisibleListSlice({
  tab,
  filter,
  limit,
  onSelectBooking,
  onSelectPayment,
  onSelectPoint,
  onSelectReferral,
  onSelectTip,
}: {
  tab: TabId
  filter: string
  limit: number
  onSelectBooking: (b: Booking) => void
  onSelectPayment: (p: Payment) => void
  onSelectPoint: (idx: number) => void
  onSelectReferral: (idx: number) => void
  onSelectTip: (idx: number) => void
}) {
  // Render the slice by composing the per-tab lists and trimming to `limit`.
  // We build an array of JSX cards and slice.
  // Each list above maps ALL filtered items — we just hide cards past `limit`
  // using a CSS counter approach via array slicing on a wrapper.
  // For simplicity, we render each list inside a fragment and slice its items.

  if (tab === 'bookings') {
    const items = mockBookings.filter((b) => matchesBookingFilter(b, filter)).slice(0, limit)
    return (
      <>
        {items.map((b) => (
          <ListCard
            key={b.id}
            icon={Car}
            iconColor="bg-primary/10 text-primary"
            title={`${b.pickup.label} → ${b.dropoff.label}`}
            subtitle={`${b.displayId} · ${formatDistance(b.distance)} · ${formatDuration(b.duration)}`}
            amount={b.fare > 0 ? formatUSD(b.fare) : '—'}
            amountClass="text-foreground"
            badge={<EerBookingStatusBadge status={b.status} />}
            date={formatRelativeTime(b.scheduledAt)}
            onClick={() => onSelectBooking(b)}
          />
        ))}
      </>
    )
  }
  if (tab === 'payments') {
    const items = mockPayments.filter((p) => matchesPaymentFilter(p, filter)).slice(0, limit)
    return (
      <>
        {items.map((p) => (
          <ListCard
            key={p.id}
            icon={CreditCard}
            iconColor="bg-success/10 text-success"
            title={`Booking ${p.bookingId}`}
            subtitle={`${p.method.replace('-', ' ')} · ${p.id.toUpperCase()}`}
            amount={formatUSD(p.amount + (p.tip ?? 0))}
            amountClass="text-foreground"
            badge={<EerPaymentStatusBadge status={p.status} />}
            date={formatRelativeTime(p.createdAt)}
            onClick={() => onSelectPayment(p)}
          />
        ))}
      </>
    )
  }
  if (tab === 'points') {
    const items = mockPointsHistory
      .filter((p) => (filter === 'All' ? true : p.type === filter.toLowerCase()))
      .slice(0, limit)
    return (
      <>
        {items.map((p, i) => {
          const isCredit = p.type === 'credited'
          return (
            <ListCard
              key={p.id}
              icon={isCredit ? TrendingUp : TrendingDown}
              iconColor={
                isCredit
                  ? 'bg-success/10 text-success'
                  : 'bg-destructive/10 text-destructive'
              }
              title={p.reason}
              subtitle={isCredit ? 'Points earned' : 'Points redeemed'}
              amount={`${p.amount > 0 ? '+' : ''}${p.amount} pts`}
              amountClass={isCredit ? 'text-success' : 'text-destructive'}
              date={formatRelativeTime(p.date)}
              onClick={() => onSelectPoint(i)}
            />
          )
        })}
      </>
    )
  }
  if (tab === 'referrals') {
    const items = mockReferrals
      .filter((r) => (filter === 'All' ? true : r.status === filter.toLowerCase()))
      .slice(0, limit)
    return (
      <>
        {items.map((r, i) => {
          const isDone = r.status === 'completed'
          return (
            <ListCard
              key={r.id}
              icon={Gift}
              iconColor={isDone ? 'bg-magenta/10 text-magenta' : 'bg-muted text-muted-foreground'}
              title={r.name}
              subtitle={r.email}
              amount={r.reward > 0 ? `+${formatUSD(r.reward, { showCents: false })}` : '—'}
              amountClass={isDone ? 'text-success' : 'text-muted-foreground'}
              badge={
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium',
                    isDone
                      ? 'border-success/20 bg-success/15 text-success'
                      : 'border-warning/20 bg-warning/15 text-warning',
                  )}
                >
                  <span className="size-1 rounded-full bg-current opacity-70" />
                  {isDone ? 'Completed' : 'Pending'}
                </span>
              }
              date={formatRelativeTime(r.date)}
              onClick={() => onSelectReferral(i)}
            />
          )
        })}
      </>
    )
  }
  // tips
  const items = mockTips.slice(0, limit)
  return (
    <>
      {items.map((t, i) => (
        <ListCard
          key={t.id}
          icon={HandCoins}
          iconColor="bg-amber/15 text-amber"
          title={t.driver.name}
          subtitle={`${t.driver.vehicle.model} · Booking ${t.booking}`}
          amount={`+${formatUSD(t.amount)}`}
          amountClass="text-success"
          date={formatRelativeTime(t.date)}
          onClick={() => onSelectTip(i)}
        />
      ))}
    </>
  )
}
