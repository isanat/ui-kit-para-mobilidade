'use client'

import {
  AlertCircle,
  Camera,
  Car,
  CheckCircle2,
  Home as HomeIcon,
  KeyRound,
  Lock,
  Settings as SettingsIcon,
  Truck,
  User as UserIcon,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EerSkeleton } from '../../state'
import { mockDrivers } from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Bottom nav (driver — monochrome active state) ──
function DriverBottomNav({ active = 'settings' }: { active?: string }) {
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

// ── Solid header with avatar + upload button ──
function SettingsHeader({ driver }: { driver: typeof mockDrivers[0] }) {
  const initials = driver.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <header className="eer-header-solid px-5 pb-6 pt-12 text-foreground">
      <div className="flex items-center justify-between pt-safe">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground">
            <Truck className="size-4" />
          </div>
          <span className="eer-display text-sm font-semibold text-foreground">Settings</span>
        </div>
      </div>

      <div className="eer-card-elevated mt-5 flex items-center gap-4 p-4">
        <div className="relative">
          <div className="flex size-20 items-center justify-center rounded-full bg-muted text-2xl font-bold text-foreground">
            {initials}
          </div>
          <button
            aria-label="Upload photo"
            className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-base hover:bg-muted"
          >
            <Camera className="size-4" />
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="eer-display truncate text-xl text-foreground">{driver.name}</h1>
          <p className="truncate text-sm text-muted-foreground">{driver.email}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Driver since 2023 · {driver.totalRides} rides
          </p>
        </div>
      </div>
    </header>
  )
}

// ── Tab pills row ──
type TabId = 0 | 1 | 2 | 3

const tabsList: { id: TabId; label: string }[] = [
  { id: 0, label: 'General' },
  { id: 1, label: 'Vehicle' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Password' },
]

function TabPills({
  active,
  onSelect,
}: {
  active: TabId
  onSelect: (id: TabId) => void
}) {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar border-b border-border bg-background px-5 shadow-sm">
      {tabsList.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={cn(
              'shrink-0 border-b-2 px-1 py-3 text-sm font-medium transition-base',
              isActive
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

// ── Field wrapper ──
function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium">
        {label}
      </Label>
      {children}
    </div>
  )
}

// ── General tab ──
function GeneralTab({
  driver,
  onSave,
}: {
  driver: typeof mockDrivers[0]
  onSave: () => void
}) {
  return (
    <div className="eer-card-elevated mx-5 mt-5 space-y-4 p-4">
      <Field id="g-name" label="Full name">
        <Input id="g-name" type="text" defaultValue={driver.name} className="h-11" />
      </Field>
      <Field id="g-email" label="Email">
        <Input id="g-email" type="email" defaultValue={driver.email} className="h-11" />
      </Field>
      <Field id="g-phone" label="Phone">
        <Input id="g-phone" type="tel" defaultValue={driver.phone} className="h-11" />
      </Field>
      <Field id="g-dob" label="Birthday">
        <Input id="g-dob" type="date" defaultValue="1985-06-12" className="h-11" />
      </Field>
      <Button
        className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
        onClick={onSave}
      >
        Save Changes
      </Button>
    </div>
  )
}

// ── Vehicle tab ──
function VehicleTab({
  driver,
  onSave,
}: {
  driver: typeof mockDrivers[0]
  onSave: () => void
}) {
  const [manufacturer, setManufacturer] = useState('Cadillac')
  const [brand, setBrand] = useState('Escalade')
  const [model, setModel] = useState(driver.vehicle.model)
  const [color, setColor] = useState(driver.vehicle.color)
  const [type, setType] = useState<string>(driver.vehicle.type)
  const [plate, setPlate] = useState(driver.vehicle.plate)

  return (
    <div className="eer-card-elevated mx-5 mt-5 space-y-4 p-4">
      <div className="grid grid-cols-2 gap-3">
        <Field id="v-manu" label="Manufacturer">
          <Input
            id="v-manu"
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="h-11"
          />
        </Field>
        <Field id="v-brand" label="Brand">
          <Input
            id="v-brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="h-11"
          />
        </Field>
        <Field id="v-model" label="Model">
          <Input
            id="v-model"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="h-11"
          />
        </Field>
        <Field id="v-color" label="Color">
          <Input
            id="v-color"
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-11"
          />
        </Field>
      </div>

      <Field id="v-type" label="Vehicle type">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="v-type" className="h-11 w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black-suv">Black SUV</SelectItem>
            <SelectItem value="black-sedan">Black Sedan</SelectItem>
            <SelectItem value="luxury-sedan">Luxury Sedan</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="sedan">Sedan</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field id="v-plate" label="License plate">
        <Input
          id="v-plate"
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          className="h-11 font-mono uppercase"
        />
      </Field>

      <Button
        className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
        onClick={onSave}
      >
        Save Vehicle
      </Button>
    </div>
  )
}

// ── Payment tab ──
function PaymentTab({ onSave }: { onSave: () => void }) {
  const [preferred, setPreferred] = useState('Zelle')
  return (
    <div className="eer-card-elevated mx-5 mt-5 space-y-4 p-4">
      <Field id="p-zelle" label="Zelle (email or phone)">
        <Input id="p-zelle" type="text" defaultValue="m.thompson@eer.com" className="h-11" />
      </Field>
      <Field id="p-venmo" label="Venmo handle">
        <Input id="p-venmo" type="text" defaultValue="@mthompson" className="h-11" />
      </Field>
      <Field id="p-bank" label="Bank name">
        <Input id="p-bank" type="text" defaultValue="Chase Bank" className="h-11" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field id="p-acct" label="Account #">
          <Input
            id="p-acct"
            type="text"
            defaultValue="••••4821"
            className="h-11 font-mono"
          />
        </Field>
        <Field id="p-route" label="Routing #">
          <Input
            id="p-route"
            type="text"
            defaultValue="021000021"
            className="h-11 font-mono"
          />
        </Field>
      </div>
      <Field id="p-pref" label="Preferred method">
        <Select value={preferred} onValueChange={setPreferred}>
          <SelectTrigger id="p-pref" className="h-11 w-full">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Zelle">Zelle</SelectItem>
            <SelectItem value="Venmo">Venmo</SelectItem>
            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Button
        className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
        onClick={onSave}
      >
        Save Payment
      </Button>
    </div>
  )
}

// ── Password tab ──
function PasswordTab({ onUpdate }: { onUpdate: () => void }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const mismatch = confirm.length > 0 && next !== confirm
  const tooShort = next.length > 0 && next.length < 8
  const canSubmit =
    current.length > 0 && next.length >= 8 && confirm.length > 0 && next === confirm

  return (
    <div className="eer-card-elevated mx-5 mt-5 space-y-4 p-4">
      <Field id="pw-current" label="Current password">
        <Input
          id="pw-current"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="••••••••"
          className="h-11"
        />
      </Field>
      <Field id="pw-new" label="New password">
        <Input
          id="pw-new"
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          placeholder="At least 8 characters"
          className="h-11"
        />
        {tooShort && (
          <p className="text-xs text-destructive">
            Password must be at least 8 characters.
          </p>
        )}
      </Field>
      <Field id="pw-confirm" label="Confirm new password">
        <Input
          id="pw-confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter new password"
          className="h-11"
        />
        {mismatch && (
          <p className="text-xs text-destructive">Passwords don&apos;t match.</p>
        )}
      </Field>
      <Button
        className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
        disabled={!canSubmit}
        onClick={onUpdate}
      >
        <Lock className="size-4" />
        Update Password
      </Button>

      <div className="flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
        <KeyRound className="mt-0.5 size-3.5 shrink-0" />
        <p>
          Use a strong, unique password. Avoid reusing passwords from other sites.
        </p>
      </div>
    </div>
  )
}

// ── Loading skeleton ──
function SettingsLoading() {
  return (
    <div className="flex flex-col">
      <div className="eer-header-solid px-5 pb-6 pt-12">
        <div className="flex items-center gap-2">
          <EerSkeleton className="size-8 rounded-lg" />
          <EerSkeleton className="h-4 w-20" />
        </div>
        <div className="mt-5 flex items-center gap-4">
          <EerSkeleton className="size-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <EerSkeleton className="h-5 w-32" />
            <EerSkeleton className="h-3 w-48" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 px-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <EerSkeleton key={i} className="h-8 w-20" />
        ))}
      </div>
      <div className="space-y-4 px-5 py-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <EerSkeleton key={i} className="h-11 rounded-md" />
        ))}
        <EerSkeleton className="h-11 rounded-xl" />
      </div>
    </div>
  )
}

// ── Success / error toast banners ──
function SuccessToast({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="mx-5 my-4 flex items-center gap-3 rounded-xl border border-success/30 bg-success/5 p-3 spring-in">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
        <CheckCircle2 className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{message}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}

function ErrorToast({ message }: { message: string }) {
  return (
    <div className="mx-5 my-4 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3 slide-up">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-destructive text-white">
        <AlertCircle className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{message}</p>
        <p className="truncate text-xs text-muted-foreground">
          Please try again in a moment.
        </p>
      </div>
    </div>
  )
}

// ── Main pattern component ──
export function D4Settings({ state, onStateChange }: PatternProps) {
  const driver = mockDrivers[0]
  const [activeTab, setActiveTab] = useState<TabId>(0)

  // ── Loading ──
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <SettingsLoading />
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
          <SettingsHeader driver={driver} />
          <TabPills active={activeTab} onSelect={setActiveTab} />
          <ErrorToast message="Couldn't save settings" />
          <div className="px-5 pb-8">
            <Button
              variant="outline"
              className="w-full rounded-xl border-border bg-card text-foreground"
              onClick={() => onStateChange?.('populated')}
            >
              Retry
            </Button>
          </div>
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Success ──
  if (state === 'success') {
    const isPassword = activeTab === 3
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <SettingsHeader driver={driver} />
          <TabPills active={activeTab} onSelect={setActiveTab} />
          <SuccessToast
            message={isPassword ? 'Password updated!' : 'Settings saved!'}
            sub={
              isPassword
                ? 'Use your new password next time you sign in.'
                : 'Your changes have been saved successfully.'
            }
          />
          <div className="px-5 pb-8">
            <Button
              variant="outline"
              className="w-full rounded-xl border-border bg-card text-foreground"
              onClick={() => onStateChange?.('populated')}
            >
              Back to settings
            </Button>
          </div>
        </div>
        <DriverBottomNav />
      </div>
    )
  }

  // ── Populated & empty (empty = populated for settings) ──
  const handleSave = () => onStateChange?.('success')

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <SettingsHeader driver={driver} />
        <TabPills active={activeTab} onSelect={setActiveTab} />

        {activeTab === 0 && <GeneralTab driver={driver} onSave={handleSave} />}
        {activeTab === 1 && <VehicleTab driver={driver} onSave={handleSave} />}
        {activeTab === 2 && <PaymentTab onSave={handleSave} />}
        {activeTab === 3 && <PasswordTab onUpdate={handleSave} />}
      </div>
      <DriverBottomNav />
    </div>
  )
}
