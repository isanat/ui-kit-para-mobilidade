'use client'

import { useState } from 'react'
import {
  Truck,
  Car,
  Package,
  Star,
  Pencil,
  KeyRound,
  CreditCard,
  Gift,
  HandCoins,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Calendar,
  Award,
  type LucideIcon,
} from 'lucide-react'
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
import { cn } from '@/lib/utils'
import { EerState, EerSkeleton } from '../../state'
import {
  mockPassengers,
  mockBookings,
  mockPointsHistory,
  formatRelativeTime,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

type UserType = typeof mockPassengers[0]

// ── Avatar with initials (v3 clean: muted bg, not primary) ──
function Avatar({ name, size = 'lg' }: { name: string; size?: 'lg' | 'sm' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-muted font-bold text-foreground',
        size === 'lg' ? 'size-16 text-xl' : 'size-10 text-sm',
      )}
    >
      {initials}
    </div>
  )
}

// ── Profile header (v3 clean: solid bg, monochrome) ──
function ProfileHeader({ user }: { user: UserType }) {
  return (
    <div className="eer-header-solid px-5 pb-12 pt-12">
      <div className="flex items-center justify-between pt-safe">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-card">
            <Truck className="size-4 text-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">Account</span>
        </div>
        <button className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-base hover:bg-muted">
          <Settings className="size-4" />
        </button>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <Avatar name={user.name} />
        <div className="min-w-0 flex-1">
          <h1 className="eer-display truncate text-xl text-foreground">{user.name}</h1>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Member since {new Date(user.memberSince).getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Stats row (monochrome numbers, semantic star color) ──
function StatsRow({ rides, points }: { rides: number; points: number }) {
  return (
    <div className="eer-card-elevated mx-4 -mt-6 p-5">
      <div className="grid grid-cols-3 divide-x divide-border">
        <div className="px-2 text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-bold tabular-nums text-foreground">
            <Car className="size-4 text-muted-foreground" />
            {rides}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">Total Rides</div>
        </div>
        <div className="px-2 text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-bold tabular-nums text-foreground">
            <Award className="size-4 text-muted-foreground" />
            {points.toLocaleString()}
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">Points</div>
        </div>
        <div className="px-2 text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-bold tabular-nums text-foreground">
            <Star className="size-4 fill-current text-warning" />
            4.9
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">Rating</div>
        </div>
      </div>
    </div>
  )
}

// ── Menu item ──
function MenuItem({
  icon: Icon,
  iconColor,
  label,
  desc,
  onClick,
  danger,
}: {
  icon: LucideIcon
  iconColor: string
  label: string
  desc?: string
  onClick?: () => void
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'eer-hover-lift flex w-full items-center gap-3 px-5 py-3.5 text-left transition-base',
        danger ? 'hover:bg-destructive/5' : 'hover:bg-muted/50',
      )}
    >
      <div className={cn('flex size-9 items-center justify-center rounded-lg', iconColor)}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn('text-sm font-medium', danger ? 'text-destructive' : 'text-foreground')}>
          {label}
        </p>
        {desc && <p className="truncate text-xs text-muted-foreground">{desc}</p>}
      </div>
      <ChevronRight
        className={cn('size-4', danger ? 'text-destructive/50' : 'text-muted-foreground')}
      />
    </button>
  )
}

// ── Menu list (monochrome icons) ──
function MenuList({
  onEditProfile,
  onChangePassword,
}: {
  onEditProfile: () => void
  onChangePassword: () => void
}) {
  return (
    <div className="mt-8">
      <p className="px-5 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Account
      </p>
      <div className="shadow-sm border-y border-border bg-card">
        <MenuItem
          icon={Pencil}
          iconColor="bg-muted text-foreground"
          label="Edit Profile"
          desc="Name, email, phone, DOB"
          onClick={onEditProfile}
        />
        <div className="mx-5 border-t border-border" />
        <MenuItem
          icon={KeyRound}
          iconColor="bg-muted text-foreground"
          label="Change Password"
          onClick={onChangePassword}
        />
      </div>

      <p className="px-5 pb-2 pt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Activity
      </p>
      <div className="shadow-sm border-y border-border bg-card">
        <MenuItem
          icon={Calendar}
          iconColor="bg-muted text-foreground"
          label="My Bookings"
          desc="Past & upcoming rides"
        />
        <div className="mx-5 border-t border-border" />
        <MenuItem
          icon={CreditCard}
          iconColor="bg-muted text-foreground"
          label="Payment Methods"
          desc="Cards, Apple Pay, Google Pay"
        />
        <div className="mx-5 border-t border-border" />
        <MenuItem
          icon={Gift}
          iconColor="bg-muted text-foreground"
          label="Referrals"
          desc="Invite friends, earn rewards"
        />
        <div className="mx-5 border-t border-border" />
        <MenuItem
          icon={HandCoins}
          iconColor="bg-muted text-foreground"
          label="Tips History"
          desc="Tips you've given drivers"
        />
      </div>

      <p className="px-5 pb-2 pt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        General
      </p>
      <div className="shadow-sm border-y border-border bg-card">
        <MenuItem icon={Settings} iconColor="bg-muted text-foreground" label="Settings" />
        <div className="mx-5 border-t border-border" />
        <MenuItem
          icon={LogOut}
          iconColor="bg-destructive/10 text-destructive"
          label="Log Out"
          danger
        />
      </div>
    </div>
  )
}

// ── Recent points preview (uses mockPointsHistory) ──
function RecentPoints() {
  return (
    <div className="mt-8 px-5 pb-10">
      <div className="eer-card-elevated p-5">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Award className="size-4 text-muted-foreground" /> Recent Points
          </p>
          <button className="text-xs font-medium text-foreground transition-base hover:opacity-70">
            View all
          </button>
        </div>
        <div className="mt-3 space-y-2.5">
          {mockPointsHistory.slice(0, 3).map((p) => (
            <div key={p.id} className="flex items-center justify-between text-sm">
              <div className="min-w-0 flex-1">
                <p className="truncate text-foreground">{p.reason}</p>
                <p className="text-[11px] text-muted-foreground">{formatRelativeTime(p.date)}</p>
              </div>
              <span
                className={cn(
                  'ml-2 font-semibold tabular-nums',
                  p.type === 'credited' ? 'text-success' : 'text-destructive',
                )}
              >
                {p.amount > 0 ? '+' : ''}
                {p.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Edit Profile sheet ──
function EditProfileSheet({
  open,
  onOpenChange,
  user,
  onSave,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  user: UserType
  onSave: () => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-w-[380px] rounded-t-2xl p-0">
        <SheetHeader className="px-5 pt-5">
          <SheetTitle className="text-base">Edit Profile</SheetTitle>
          <SheetDescription>Update your personal information.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-5 py-4">
          <div className="space-y-1.5">
            <Label htmlFor="ep-name" className="text-xs font-medium">
              Full name
            </Label>
            <Input id="ep-name" type="text" defaultValue={user.name} className="h-10" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ep-email" className="text-xs font-medium">
              Email
            </Label>
            <Input id="ep-email" type="email" defaultValue={user.email} className="h-10" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ep-phone" className="text-xs font-medium">
              Phone
            </Label>
            <Input id="ep-phone" type="tel" defaultValue={user.phone} className="h-10" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ep-dob" className="text-xs font-medium">
              Date of birth
            </Label>
            <Input id="ep-dob" type="date" defaultValue="1992-08-14" className="h-10" />
          </div>
        </div>
        <SheetFooter className="flex-row gap-2 border-t border-border px-5 pb-safe pt-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button className="eer-btn-primary flex-1" onClick={onSave}>
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

// ── Change Password sheet ──
function ChangePasswordSheet({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSave: () => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-w-[380px] rounded-t-2xl p-0">
        <SheetHeader className="px-5 pt-5">
          <SheetTitle className="text-base">Change Password</SheetTitle>
          <SheetDescription>Choose a strong, unique password.</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-5 py-4">
          <div className="space-y-1.5">
            <Label htmlFor="cp-current" className="text-xs font-medium">
              Current password
            </Label>
            <Input id="cp-current" type="password" placeholder="••••••••" className="h-10" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cp-new" className="text-xs font-medium">
              New password
            </Label>
            <Input id="cp-new" type="password" placeholder="••••••••" className="h-10" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cp-confirm" className="text-xs font-medium">
              Confirm new password
            </Label>
            <Input id="cp-confirm" type="password" placeholder="••••••••" className="h-10" />
          </div>
        </div>
        <SheetFooter className="flex-row gap-2 border-t border-border px-5 pb-safe pt-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button className="eer-btn-primary flex-1" onClick={onSave}>
            Update Password
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

// ── Success toast banner ──
function SuccessToast({ message }: { message: string }) {
  return (
    <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 px-3 py-2.5 text-sm text-success fade-in">
      <CheckCircle2 className="size-4 shrink-0" />
      <span className="font-medium">{message}</span>
    </div>
  )
}

// ── Bottom nav (Account active) — monochrome ──
function BottomNav() {
  const items = [
    { id: 'home', icon: Car, label: 'Home' },
    { id: 'bookings', icon: Package, label: 'Bookings' },
    { id: 'account', icon: Star, label: 'Account' },
  ]
  return (
    <div className="flex items-center justify-around border-t border-border bg-card px-2 py-2 pb-safe">
      {items.map((item) => (
        <button
          key={item.id}
          className={cn(
            'flex flex-col items-center gap-1 rounded-lg px-4 py-1.5 transition-base',
            item.id === 'account' ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          <item.icon className="size-5" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  )
}

// ── Loading skeleton ──
function AccountLoading() {
  return (
    <div className="flex flex-col">
      {/* Header skeleton */}
      <div className="eer-header-solid px-5 pb-12 pt-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EerSkeleton className="size-8 rounded-lg" />
            <EerSkeleton className="h-4 w-20" />
          </div>
          <EerSkeleton className="size-9 rounded-full" />
        </div>
        <div className="mt-5 flex items-center gap-4">
          <EerSkeleton className="size-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <EerSkeleton className="h-5 w-32" />
            <EerSkeleton className="h-3 w-48" />
            <EerSkeleton className="h-2 w-24" />
          </div>
        </div>
      </div>
      {/* Stats skeleton */}
      <div className="eer-card-elevated mx-4 -mt-6 p-4">
        <div className="grid grid-cols-3 divide-x divide-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-2 text-center">
              <EerSkeleton className="mx-auto h-6 w-10" />
              <EerSkeleton className="mx-auto mt-1.5 h-2 w-12" />
            </div>
          ))}
        </div>
      </div>
      {/* Menu skeleton */}
      <div className="mt-5 space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3.5">
            <EerSkeleton className="size-9 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <EerSkeleton className="h-3.5 w-32" />
              <EerSkeleton className="h-2.5 w-48" />
            </div>
            <EerSkeleton className="size-4" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main pattern ──
export function P9Account({ state, onStateChange }: PatternProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [pwdOpen, setPwdOpen] = useState(false)

  // Loading skeleton
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <AccountLoading />
        </div>
        <BottomNav />
      </div>
    )
  }

  // Error retry
  if (state === 'error') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex flex-1 items-center justify-center">
          <EerState
            state="error"
            title="Couldn't load profile"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
        <BottomNav />
      </div>
    )
  }

  // Empty — new user persona with zero stats
  const isEmpty = state === 'empty'
  const user: UserType = isEmpty
    ? {
        ...mockPassengers[0],
        name: 'New Rider',
        email: 'new.rider@email.com',
        phone: '',
        points: 0,
        memberSince: new Date().toISOString().slice(0, 10),
      }
    : mockPassengers[0]

  const ridesCount = isEmpty ? 0 : mockBookings.filter((b) => b.status !== 'cancelled').length
  const points = isEmpty ? 0 : user.points

  const handleEditSave = () => {
    setEditOpen(false)
    onStateChange?.('success')
  }
  const handlePwdSave = () => {
    setPwdOpen(false)
    onStateChange?.('success')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <ProfileHeader user={user} />
        <StatsRow rides={ridesCount} points={points} />

        {state === 'success' && <SuccessToast message="Profile updated!" />}

        {isEmpty ? (
          <div className="mx-4 mt-8 rounded-2xl border border-dashed border-border bg-card p-6 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-foreground">
              <Car className="size-6" />
            </div>
            <h3 className="eer-display mt-3 text-sm text-foreground">
              Welcome to Eagle Eye Rides!
            </h3>
            <p className="mx-auto mt-1 max-w-[260px] text-xs text-muted-foreground">
              You haven&apos;t taken any rides yet. Book your first ride to start earning points.
            </p>
            <Button size="sm" className="eer-btn-primary mt-4">
              Book a Ride
            </Button>
          </div>
        ) : (
          <RecentPoints />
        )}

        <MenuList
          onEditProfile={() => setEditOpen(true)}
          onChangePassword={() => setPwdOpen(true)}
        />
      </div>
      <BottomNav />

      <EditProfileSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        user={user}
        onSave={handleEditSave}
      />
      <ChangePasswordSheet open={pwdOpen} onOpenChange={setPwdOpen} onSave={handlePwdSave} />
    </div>
  )
}
