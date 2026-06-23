'use client'

import {
  ArrowLeft,
  Banknote,
  Building2,
  Car,
  CheckCircle2,
  HandCoins,
  Home as HomeIcon,
  Send,
  Settings as SettingsIcon,
  TrendingUp,
  User as UserIcon,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { EerState, EerSkeleton } from '../../state'
import {
  mockDriverToday,
  mockDriverWithdrawals,
  mockDrivers,
  formatUSD,
  formatRelativeTime,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

type Withdrawal = (typeof mockDriverWithdrawals)[number]
type WithdrawalMethod = 'Zelle' | 'Venmo' | 'Bank Transfer'

const WITHDRAWAL_FEE_RATE = 0.025
const MIN_WITHDRAWAL = 50

// ── Bottom nav (driver — monochrome active state) ──
function DriverBottomNav({ active = 'earnings' }: { active?: string }) {
  const [current, setCurrent] = useState(active)
  const items: { id: string; icon: LucideIcon; label: string }[] = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'rides', icon: Car, label: 'Rides' },
    { id: 'earnings', icon: Wallet, label: 'Earnings' },
    { id: 'account', icon: UserIcon, label: 'Account' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ]
  return (
    <div className="flex items-center justify-around border-t border-border bg-background px-1.5 py-2 pb-safe">
      {items.map((item) => {
        const isActive = item.id === current
        return (
          <button
            key={item.id}
            onClick={() => setCurrent(item.id)}
            className={cn(
              'flex flex-col items-center gap-1 rounded-lg px-2.5 py-1.5 transition-base',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            <item.icon className="size-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// ── Solid header with 3-stat summary (Today = hero number) ──
function EarningsHeader({
  today,
  onBack,
}: {
  today: typeof mockDriverToday
  onBack?: () => void
}) {
  return (
    <header className="eer-header-solid px-5 pb-6 pt-10 text-foreground">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-base hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
        </button>
        <span className="text-sm font-semibold text-foreground">Earnings</span>
        <div className="size-9" />
      </div>
      <h1 className="mt-4 text-xl font-bold tracking-tight text-foreground">Your earnings</h1>
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Today</p>
          <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-foreground">{formatUSD(today.earnings)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Tips</p>
          <p className="mt-1 text-base font-bold tabular-nums text-foreground">{formatUSD(today.tipsToday)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Balance</p>
          <p className="mt-1 text-base font-bold tabular-nums text-foreground">{formatUSD(today.walletBalance)}</p>
        </div>
      </div>
    </header>
  )
}

// ── Tips overview card (3-column grid, monochrome) ──
function TipsOverview({ daily }: { daily: number }) {
  const weekly = daily * 7
  const monthly = daily * 30
  const tips: { label: string; value: number; icon: LucideIcon }[] = [
    { label: 'Daily', value: daily, icon: TrendingUp },
    { label: 'Weekly', value: weekly, icon: TrendingUp },
    { label: 'Monthly', value: monthly, icon: TrendingUp },
  ]
  return (
    <div className="eer-card-v3">
      <div className="flex items-center gap-1.5">
        <HandCoins className="size-4 text-muted-foreground" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tips Overview</h2>
      </div>
      <div className="mt-4 grid grid-cols-3 divide-x divide-border">
        {tips.map((t) => (
          <div key={t.label} className="px-2 text-center">
            <p className="text-[11px] text-muted-foreground">{t.label}</p>
            <p className="mt-1 flex items-center justify-center gap-0.5 text-sm font-bold tabular-nums text-foreground">
              <t.icon className="size-3 text-muted-foreground" />
              {formatUSD(t.value, { showCents: false })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Completed rides card (monochrome) ──
function CompletedRidesCard({
  total,
  thisPeriod,
}: {
  total: number
  thisPeriod: number
}) {
  return (
    <div className="eer-card-v3">
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="size-4 text-muted-foreground" />
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Completed Rides</h2>
      </div>
      <div className="mt-4 grid grid-cols-2 divide-x divide-border">
        <div className="px-2 text-center">
          <p className="text-2xl font-bold tabular-nums text-foreground">{thisPeriod}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">This period</p>
        </div>
        <div className="px-2 text-center">
          <p className="text-2xl font-bold tabular-nums text-foreground">{total}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">All-time</p>
        </div>
      </div>
    </div>
  )
}

// ── Withdrawal status badge ──
function WithdrawalStatusBadge({ status }: { status: 'completed' | 'pending' }) {
  const isDone = status === 'completed'
  return (
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
  )
}

// ── Withdrawal row ──
function WithdrawalRow({ w }: { w: Withdrawal }) {
  const Icon =
    w.method === 'Zelle'
      ? Send
      : w.method === 'Venmo'
        ? Wallet
        : Building2
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{w.method}</p>
        <p className="truncate text-xs text-muted-foreground">
          {formatRelativeTime(w.date)}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm font-semibold tabular-nums text-foreground">{formatUSD(w.amount)}</p>
        <div className="mt-0.5">
          <WithdrawalStatusBadge status={w.status} />
        </div>
      </div>
    </div>
  )
}

// ── Withdrawal request sheet ──
function WithdrawalSheet({
  open,
  onOpenChange,
  balance,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  balance: number
  onSubmit: () => void
}) {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState<WithdrawalMethod>('Zelle')

  const numericAmount = Number(amount) || 0
  const fee = numericAmount * WITHDRAWAL_FEE_RATE
  const net = numericAmount - fee
  const tooLow = numericAmount > 0 && numericAmount < MIN_WITHDRAWAL
  const tooHigh = numericAmount > balance
  const canSubmit =
    numericAmount >= MIN_WITHDRAWAL && numericAmount <= balance && !tooLow && !tooHigh

  const methods: { id: WithdrawalMethod; icon: LucideIcon }[] = [
    { id: 'Zelle', icon: Send },
    { id: 'Venmo', icon: Wallet },
    { id: 'Bank Transfer', icon: Building2 },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-h-[90vh] max-w-[380px] overflow-y-auto scrollbar-thin rounded-t-2xl p-0">
        <SheetHeader className="px-5 pt-5">
          <SheetTitle className="text-base">Request Withdrawal</SheetTitle>
          <SheetDescription>
            Min {formatUSD(MIN_WITHDRAWAL)} · {formatUSD(balance, { showCents: false })} available
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-5 py-4">
          {/* Amount input */}
          <div className="space-y-1.5">
            <Label htmlFor="wd-amount" className="text-xs font-medium">
              Amount (USD)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                id="wd-amount"
                type="number"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-11 pl-7 text-base"
              />
            </div>
            {tooLow && (
              <p className="text-xs text-destructive">
                Minimum withdrawal is {formatUSD(MIN_WITHDRAWAL)}.
              </p>
            )}
            {tooHigh && (
              <p className="text-xs text-destructive">
                Amount exceeds your available balance.
              </p>
            )}
          </div>

          {/* Payment methods */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Payment method</Label>
            <div className="grid grid-cols-3 gap-2">
              {methods.map((m) => {
                const isActive = m.id === method
                return (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={cn(
                      'flex flex-col items-center gap-1 rounded-xl border p-2.5 text-[11px] font-medium transition-all-eer',
                      isActive
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border bg-card text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <m.icon className="size-4" />
                    {m.id}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Fee breakdown */}
          <div className="space-y-2 rounded-xl border border-border bg-card p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-foreground">
                {numericAmount > 0 ? formatUSD(numericAmount) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Service fee ({(WITHDRAWAL_FEE_RATE * 100).toFixed(1)}%)
              </span>
              <span className="text-foreground">
                {numericAmount > 0 ? formatUSD(fee) : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 font-semibold">
              <span className="text-foreground">Net total</span>
              <span className="text-foreground tabular-nums">
                {numericAmount > 0 ? formatUSD(net) : '—'}
              </span>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-2 border-t border-border px-5 pb-safe pt-3">
          <Button
            variant="outline"
            className="flex-1 border-border bg-card text-foreground"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-foreground text-background hover:bg-foreground/90"
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            Request
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

// ── Loading skeleton ──
function EarningsLoading() {
  return (
    <div className="flex flex-col">
      <div className="eer-header-solid px-5 pb-6 pt-10">
        <div className="flex items-center justify-between">
          <EerSkeleton className="size-9 rounded-full" />
          <EerSkeleton className="h-4 w-20" />
          <div className="size-9" />
        </div>
        <EerSkeleton className="mt-4 h-6 w-40" />
        <div className="mt-5 grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <EerSkeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="mt-8 space-y-3 px-5">
        <EerSkeleton className="h-24 rounded-2xl" />
        <EerSkeleton className="h-24 rounded-2xl" />
        <EerSkeleton className="h-16 rounded-2xl" />
        {Array.from({ length: 3 }).map((_, i) => (
          <EerSkeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

// ── Success toast banner ──
function SuccessBanner({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="mx-5 mt-4 rounded-xl border border-success/30 bg-success/5 p-4 spring-in">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-success text-success-foreground">
          <CheckCircle2 className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{message}</p>
          <p className="truncate text-sm text-muted-foreground">{sub}</p>
        </div>
      </div>
    </div>
  )
}

// ── Main pattern component ──
export function D3Earnings({ state, onStateChange }: PatternProps) {
  const driver = mockDrivers[0]
  const [sheetOpen, setSheetOpen] = useState(false)
  const today = mockDriverToday

  const withdrawals = mockDriverWithdrawals
  const completedRides = useMemo(
    () => ({
      total: driver.totalRides,
      thisPeriod: today.completed,
    }),
    [driver, today],
  )

  // ── Loading ──
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <EarningsLoading />
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Error ──
  if (state === 'error') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <EarningsHeader today={today} />
          <EerState
            state="error"
            title="Couldn't load earnings"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Success ──
  if (state === 'success') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <EarningsHeader today={today} />
          <SuccessBanner
            message="Withdrawal requested!"
            sub="$300.00 via Zelle · arrives in 1–2 business days"
          />
          <div className="mt-8 space-y-8 px-5 pb-8">
            <TipsOverview daily={today.tipsToday} />
            <CompletedRidesCard
              total={completedRides.total}
              thisPeriod={completedRides.thisPeriod}
            />
          </div>
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Populated & empty ──
  // empty = no withdrawals yet
  const showWithdrawalsEmpty = state === 'empty' || withdrawals.length === 0

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <EarningsHeader today={today} />
        <div className="mt-8 space-y-8 px-5 pb-8">
          <TipsOverview daily={today.tipsToday} />
          <CompletedRidesCard
            total={completedRides.total}
            thisPeriod={completedRides.thisPeriod}
          />

          {/* Withdrawals section */}
          <div className="eer-card-v3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Banknote className="size-4 text-muted-foreground" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Withdrawals</h2>
              </div>
              <span className="text-xs text-muted-foreground">
                Balance {formatUSD(today.walletBalance)}
              </span>
            </div>

            <Button
              className="mt-4 w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
              onClick={() => setSheetOpen(true)}
            >
              <Wallet className="size-4" />
              Request Withdrawal
            </Button>

            {/* History */}
            <div className="mt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                History
              </p>
              {showWithdrawalsEmpty ? (
                <div className="rounded-xl border border-dashed border-border p-5 text-center">
                  <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted text-foreground">
                    <Banknote className="size-5" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    No withdrawals yet
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your withdrawal history will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {withdrawals.map((w) => (
                    <WithdrawalRow key={w.id} w={w} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <WithdrawalSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        balance={today.walletBalance}
        onSubmit={() => {
          setSheetOpen(false)
          onStateChange?.('success')
        }}
      />
      <DriverBottomNav />
    </div>
  )
}
