'use client'

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CreditCard,
  Lock,
  Receipt,
  Shield,
  Sparkles,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EerState, EerSkeleton } from '../../state'
import { EerServiceBadge } from '../../service-badge'
import {
  mockBookings,
  formatUSD,
  formatDistance,
  formatDuration,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Tip options ──
const tipOptions = [
  { id: '10', label: '10%', value: 0.1 },
  { id: '15', label: '15%', value: 0.15 },
  { id: '20', label: '20%', value: 0.2 },
  { id: 'none', label: 'None', value: 0 },
] as const

// ── Payment method options ──
const paymentMethods = [
  { id: 'google-pay', label: 'Google Pay', sub: 'Fast & secure', accent: 'bg-muted text-foreground' },
  { id: 'apple-pay', label: 'Apple Pay', sub: 'Fast & secure', accent: 'bg-foreground text-background' },
  { id: 'card', label: 'Card', sub: 'Visa •••• 4242', accent: 'bg-muted text-foreground' },
] as const

// ── Solid header (v3 clean: replaces green gradient) with back button ──
function PaymentHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div className="eer-header-solid px-5 pb-5 pt-10">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-base hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
        </button>
        <span className="eer-display text-sm text-foreground">Payment</span>
        <div className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground">
          <Lock className="size-4" />
        </div>
      </div>
      <div className="mt-5">
        <p className="text-xs text-muted-foreground">Order total</p>
        <h1 className="eer-hero-number mt-0.5 text-foreground">{formatUSD(38.5)}</h1>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Shield className="size-3.5" />
          Secured by Square · 256-bit encryption
        </p>
      </div>
    </div>
  )
}

// ── Order summary card (v3 clean) ──
function OrderSummary({ booking }: { booking: (typeof mockBookings)[0] }) {
  // Derive a base fare (booking.fare minus existing tip) for transparent breakdown
  const baseFare = booking.fare - (booking.tip ?? 0)
  // Estimate distance/duration-based fare components for the breakdown UI
  const distanceFare = Number((booking.distance * 2.5).toFixed(2))
  const durationFare = Number((booking.duration * 0.45).toFixed(2))
  return (
    <div className="eer-card-elevated mx-4 -mt-4 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tabular-nums text-muted-foreground">{booking.displayId}</span>
        <EerServiceBadge service={booking.service} size="xs" />
      </div>

      {/* Route */}
      <div className="mt-3 flex items-stretch gap-3">
        <div className="flex flex-col items-center pt-1">
          <div className="size-2.5 rounded-full bg-foreground ring-4 ring-foreground/10" />
          <div className="my-1 w-0.5 grow bg-border" />
          <div className="size-2.5 rounded-full bg-muted-foreground ring-4 ring-muted-foreground/10" />
        </div>
        <div className="flex-1 space-y-3 py-0.5">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Pickup</p>
            <p className="truncate text-sm font-medium text-foreground">{booking.pickup.label}</p>
            <p className="truncate text-xs text-muted-foreground">{booking.pickup.line}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Dropoff</p>
            <p className="truncate text-sm font-medium text-foreground">{booking.dropoff.label}</p>
            <p className="truncate text-xs text-muted-foreground">{booking.dropoff.line}</p>
          </div>
        </div>
      </div>

      {/* Fare breakdown */}
      <div className="mt-4 space-y-2 border-t border-border pt-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Base fare</span>
          <span className="text-foreground tabular-nums">{formatUSD(baseFare)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            Distance · {formatDistance(booking.distance)}
          </span>
          <span className="text-foreground tabular-nums">{formatUSD(distanceFare)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">
            Duration · {formatDuration(booking.duration)}
          </span>
          <span className="text-foreground tabular-nums">{formatUSD(durationFare)}</span>
        </div>
      </div>
    </div>
  )
}

// ── Tip section (monochrome selected state) ──
function TipSection({
  selected,
  onSelect,
  fare,
}: {
  selected: string
  onSelect: (id: string) => void
  fare: number
}) {
  const active = tipOptions.find((t) => t.id === selected) ?? tipOptions[1]
  const tipAmount = Number((fare * active.value).toFixed(2))
  return (
    <div className="px-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-muted-foreground" />
          Add a tip
        </h2>
        <span className="text-sm font-semibold text-foreground tabular-nums">
          {tipAmount > 0 ? `+${formatUSD(tipAmount)}` : '—'}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">100% goes to your driver</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {tipOptions.map((opt) => {
          const isActive = opt.id === selected
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={cn(
                'eer-hover-lift flex flex-col items-center gap-0.5 rounded-xl border-2 py-2.5 text-center transition-base',
                isActive
                  ? 'border-foreground bg-card'
                  : 'border-border bg-card hover:border-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'text-sm font-bold',
                  isActive ? 'text-foreground' : 'text-foreground',
                )}
              >
                {opt.label}
              </span>
              <span className="text-[10px] tabular-nums text-muted-foreground">
                {opt.value > 0 ? formatUSD(fare * opt.value) : '—'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Payment method selector (radio-style, monochrome) ──
function PaymentMethodSelector({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="px-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground">Payment method</h2>
      <div className="space-y-2">
        {paymentMethods.map((m) => {
          const isActive = m.id === selected
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-base active:scale-[0.99]',
                isActive
                  ? 'border-foreground bg-card'
                  : 'border-border bg-card hover:border-muted-foreground',
              )}
            >
              <div
                className={cn(
                  'flex size-10 items-center justify-center rounded-lg',
                  m.accent,
                )}
              >
                <CreditCard className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{m.label}</p>
                <p className="truncate text-xs text-muted-foreground">{m.sub}</p>
              </div>
              <div
                className={cn(
                  'flex size-5 items-center justify-center rounded-full border-2 transition-base',
                  isActive ? 'border-foreground bg-foreground' : 'border-border',
                )}
              >
                {isActive && <Check className="size-3 text-background" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Square card form placeholder (we can't load the real SDK in the kit) ──
function CardFormPlaceholder() {
  return (
    <div className="px-4">
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Lock className="size-3.5" />
            Card details
          </p>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Square Web Payments
          </span>
        </div>

        {/* Card number */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-muted-foreground">Card number</label>
          <Input
            inputMode="numeric"
            placeholder="1234 1234 1234 4242"
            defaultValue="4242 4242 4242 4242"
            className="h-11 rounded-xl font-mono tracking-wider"
          />
        </div>

        {/* Expiry + CVC */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground">Expiry</label>
            <Input
              inputMode="numeric"
              placeholder="MM / YY"
              defaultValue="12 / 27"
              className="h-11 rounded-xl font-mono tracking-wider"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-muted-foreground">CVC</label>
            <Input
              inputMode="numeric"
              placeholder="123"
              defaultValue="123"
              maxLength={4}
              className="h-11 rounded-xl font-mono tracking-wider"
            />
          </div>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Shield className="size-3.5" />
          Card data is tokenized in-browser — never touches our servers.
        </p>
      </div>
    </div>
  )
}

// ── Wallet pay buttons (Google Pay / Apple Pay) ──
function WalletButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        className="flex items-center justify-center gap-2 rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-base hover:bg-foreground/90 active:scale-[0.98]"
      >
        <span className="text-base"></span>
        Pay
      </button>
      <button className="flex items-center justify-center gap-2 rounded-xl bg-background py-3 text-sm font-semibold text-foreground ring-1 ring-border transition-base hover:bg-muted active:scale-[0.98]">
        <span className="text-base"></span>
        Pay
      </button>
    </div>
  )
}

// ── Bottom action bar with live total ──
function PayActionBar({
  total,
  onPay,
  disabled,
  busy,
}: {
  total: number
  onPay?: () => void
  disabled?: boolean
  busy?: boolean
}) {
  return (
    <div className="flex items-center gap-3 border-t border-border bg-card px-4 py-3 pb-safe">
      <div className="flex-1">
        <p className="text-[11px] text-muted-foreground">Total due</p>
        <p className="text-lg font-bold tabular-nums text-foreground">{formatUSD(total)}</p>
      </div>
      <Button
        size="lg"
        onClick={onPay}
        disabled={disabled || busy}
        className="eer-btn-primary h-12 flex-[1.5] rounded-xl"
      >
        {busy ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Processing…
          </>
        ) : (
          <>
            <Lock className="size-4" />
            Pay {formatUSD(total)}
          </>
        )}
      </Button>
    </div>
  )
}

// ── Loading skeleton ──
function PaymentLoading() {
  return (
    <div className="flex flex-col">
      <PaymentHeader />
      <div className="eer-card-elevated mx-4 -mt-4 p-4">
        <EerSkeleton className="h-3 w-24" />
        <div className="flex items-center gap-3">
          <EerSkeleton className="size-2.5 rounded-full" />
          <EerSkeleton className="h-3 flex-1" />
        </div>
        <div className="flex items-center gap-3">
          <EerSkeleton className="size-2.5 rounded-full" />
          <EerSkeleton className="h-3 flex-1" />
        </div>
        <EerSkeleton className="h-3 w-full" />
        <EerSkeleton className="h-3 w-2/3" />
      </div>
      <div className="mt-5 space-y-3 px-4">
        <EerSkeleton className="h-4 w-24" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <EerSkeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="mt-5 space-y-3 px-4">
        <EerSkeleton className="h-4 w-32" />
        <EerSkeleton className="h-16 rounded-xl" />
        <EerSkeleton className="h-11 rounded-xl" />
        <div className="grid grid-cols-2 gap-2">
          <EerSkeleton className="h-11 rounded-xl" />
          <EerSkeleton className="h-11 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

// ── Success confirmation ──
function PaymentSuccess({
  amount,
  onReceipt,
  onDone,
}: {
  amount: number
  onReceipt?: () => void
  onDone?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center fade-in">
        <div className="relative flex size-24 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-success/20" />
          <div className="relative flex size-20 items-center justify-center rounded-full bg-success text-success-foreground spring-in">
            <CheckCircle2 className="size-10" />
          </div>
        </div>
        <div className="space-y-1">
          <h2 className="eer-display text-xl text-foreground">Payment successful!</h2>
          <p className="text-sm text-muted-foreground">
            Your booking is confirmed. A receipt has been emailed to you.
          </p>
        </div>
        <div className="eer-card-elevated w-full max-w-xs p-5">
          <p className="text-xs text-muted-foreground">Amount paid</p>
          <p className="eer-hero-number mt-0.5 text-foreground">{formatUSD(amount)}</p>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
            <span>Booking</span>
            <span className="font-medium tabular-nums text-foreground">{mockBookings[0].displayId}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-border bg-card px-4 py-3 pb-safe">
        <Button variant="outline" size="lg" onClick={onReceipt} className="flex-1 rounded-xl">
          <Receipt className="size-4" />
          View receipt
        </Button>
        <Button size="lg" onClick={onDone} className="eer-btn-primary flex-1 rounded-xl">
          Done
        </Button>
      </div>
    </div>
  )
}

// ── Main pattern component ──
export function P6Payment({ state, onStateChange }: PatternProps) {
  const [tipId, setTipId] = useState<string>('15')
  const [methodId, setMethodId] = useState<string>('card')

  const booking = mockBookings[0]
  const fare = booking.fare
  const tipAmount = Number(
    (fare * (tipOptions.find((t) => t.id === tipId)?.value ?? 0)).toFixed(2),
  )
  const total = Number((fare + tipAmount).toFixed(2))

  // ── Success: payment succeeded confirmation ──
  if (state === 'success') {
    return (
      <div className="flex h-full flex-col">
        <PaymentSuccess
          amount={total}
          onReceipt={() => undefined}
          onDone={() => onStateChange?.('populated')}
        />
      </div>
    )
  }

  // ── Loading: skeleton of summary + form ──
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <PaymentLoading />
        </div>
        <div className="flex items-center gap-3 border-t border-border bg-card px-4 py-3 pb-safe">
          <div className="flex-1 space-y-1">
            <EerSkeleton className="h-3 w-16" />
            <EerSkeleton className="h-5 w-20" />
          </div>
          <EerSkeleton className="h-12 w-40 rounded-xl" />
        </div>
      </div>
    )
  }

  // ── Error: payment failed ──
  if (state === 'error') {
    return (
      <div className="flex h-full flex-col">
        <PaymentHeader />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-8" />
          </div>
          <div className="space-y-1">
            <h2 className="eer-display text-lg text-foreground">Payment failed</h2>
            <p className="max-w-xs text-sm text-muted-foreground">
              Your card was declined. Please check your details or try a different payment method.
            </p>
          </div>
          <div className="w-full max-w-xs rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-left text-xs text-muted-foreground">
            <p className="font-medium text-destructive">CARD_DECLINED</p>
            <p className="mt-0.5">Insufficient funds on card ending 4242.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-t border-border bg-card px-4 py-3 pb-safe">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 rounded-xl"
            onClick={() => onStateChange?.('populated')}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            className="eer-btn-primary flex-1 rounded-xl"
            onClick={() => {
              onStateChange?.('loading')
              setTimeout(() => onStateChange?.('populated'), 600)
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    )
  }

  // ── Populated & empty: full payment form ──
  // (empty = N/A per spec; render populated flow)
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <PaymentHeader />
        <OrderSummary booking={booking} />
        <div className="mt-8 space-y-8 pb-4">
          <TipSection selected={tipId} onSelect={setTipId} fare={fare} />
          <PaymentMethodSelector selected={methodId} onSelect={setMethodId} />
          {methodId === 'card' && <CardFormPlaceholder />}
          {(methodId === 'google-pay' || methodId === 'apple-pay') && (
            <div className="px-4">
              <WalletButtons />
            </div>
          )}
        </div>
      </div>
      <PayActionBar total={total} onPay={() => onStateChange?.('success')} />
    </div>
  )
}
