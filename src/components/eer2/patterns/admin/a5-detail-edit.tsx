'use client'

import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  Car,
  CheckCircle2,
  CreditCard,
  FileText,
  Mail,
  Phone,
  Save,
  Star,
  Trash2,
  User,
  Wallet,
  X,
  XCircle,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EerState, EerSkeleton } from '../../state'
import {
  mockDrivers,
  formatUSD,
} from '@/lib/mock/data'
import type { PatternProps } from '../types'

type Driver = (typeof mockDrivers)[number]

// ── Verification badge helper ──
type DocStatus = 'verified' | 'pending' | 'rejected'

const docStatusConfig: Record<
  DocStatus,
  { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }
> = {
  verified: { label: 'Verified', variant: 'outline', className: 'border-success/30 bg-success/10 text-success' },
  pending: { label: 'Pending', variant: 'outline', className: 'border-warning/30 bg-warning/10 text-warning' },
  rejected: { label: 'Rejected', variant: 'outline', className: 'border-destructive/30 bg-destructive/10 text-destructive' },
}

// ── Page header ──
function PageHeader({
  onSave,
  onDelete,
}: {
  onSave: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          aria-label="Back"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Driver</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Manage driver profile, vehicle, documents, and finances
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
        <Button size="sm" className="eer-btn-primary h-9" onClick={onSave}>
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}

// ── Profile header card ──
function ProfileHeader({ driver }: { driver: Driver }) {
  const initials = driver.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="px-5 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-muted text-2xl font-bold text-foreground">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-xl font-bold text-foreground">{driver.name}</h2>
              <Badge
                variant="outline"
                className="border-border bg-card text-foreground"
              >
                <span className="size-1.5 animate-pulse rounded-full bg-success" />
                {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
              </Badge>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="size-3" />
                {driver.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="size-3" />
                {driver.phone}
              </span>
              <span className="flex items-center gap-1">
                <Star className="size-3 fill-current text-warning" />
                {driver.rating} rating
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Quick stats row */}
      <div className="grid grid-cols-2 divide-x divide-border border-t border-border sm:grid-cols-4">
        <QuickStat
          icon={Car}
          label="Total Rides"
          value={driver.totalRides.toLocaleString()}
          tileClass="bg-muted text-foreground"
        />
        <QuickStat
          icon={Star}
          label="Rating"
          value={driver.rating.toFixed(1)}
          tileClass="bg-muted text-foreground"
        />
        <QuickStat
          icon={Wallet}
          label="Wallet Balance"
          value={formatUSD(driver.walletBalance)}
          tileClass="bg-muted text-foreground"
        />
        <QuickStat
          icon={CreditCard}
          label="Total Earnings"
          value={formatUSD(driver.totalEarnings, { showCents: false })}
          tileClass="bg-muted text-foreground"
        />
      </div>
    </div>
  )
}

function QuickStat({
  icon: Icon,
  label,
  value,
  tileClass,
}: {
  icon: LucideIcon
  label: string
  value: string
  tileClass: string
}) {
  return (
    <div className="flex items-center gap-3 p-5">
      <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', tileClass)}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate font-variant-numeric-tabular text-xl font-bold tracking-tight text-foreground">{value}</p>
      </div>
    </div>
  )
}

// ── Section card ──
function SectionCard({
  icon: Icon,
  title,
  description,
  onSave,
  children,
}: {
  icon: LucideIcon
  title: string
  description?: string
  onSave?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="eer-card-v3">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
            <Icon className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {onSave && (
          <Button variant="outline" size="sm" className="h-8" onClick={onSave}>
            <Save className="size-3.5" />
            Save
          </Button>
        )}
      </div>
      <div className="mt-4">{children}</div>
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

// ── General Information section ──
function GeneralSection({ driver, onSave }: { driver: Driver; onSave: () => void }) {
  return (
    <SectionCard
      icon={User}
      title="General Information"
      description="Driver's personal contact details"
      onSave={onSave}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="g-name" label="Full name">
          <Input id="g-name" defaultValue={driver.name} className="h-9" />
        </Field>
        <Field id="g-email" label="Email">
          <Input id="g-email" type="email" defaultValue={driver.email} className="h-9" />
        </Field>
        <Field id="g-phone" label="Phone">
          <Input id="g-phone" type="tel" defaultValue={driver.phone} className="h-9" />
        </Field>
        <Field id="g-dob" label="Date of birth">
          <Input id="g-dob" type="date" defaultValue="1985-06-12" className="h-9" />
        </Field>
      </div>
    </SectionCard>
  )
}

// ── Vehicle Information section ──
function VehicleSection({ driver, onSave }: { driver: Driver; onSave: () => void }) {
  const [type, setType] = useState<string>(driver.vehicle.type)
  return (
    <SectionCard
      icon={Car}
      title="Vehicle Information"
      description="Vehicle assigned to this driver"
      onSave={onSave}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="v-type" label="Vehicle type">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="v-type" className="h-9 w-full">
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
        <Field id="v-model" label="Model">
          <Input id="v-model" defaultValue={driver.vehicle.model} className="h-9" />
        </Field>
        <Field id="v-color" label="Color">
          <Input id="v-color" defaultValue={driver.vehicle.color} className="h-9" />
        </Field>
        <Field id="v-plate" label="License plate">
          <Input
            id="v-plate"
            defaultValue={driver.vehicle.plate}
            className="h-9 font-mono uppercase"
          />
        </Field>
      </div>
    </SectionCard>
  )
}

// ── Documents section ──
interface DocItem {
  id: string
  label: string
  fileName: string
  uploadedAt: string
  status: DocStatus
}

const driverDocs: DocItem[] = [
  {
    id: 'doc1',
    label: 'Driver License (CNH)',
    fileName: 'michael_cnh_2024.pdf',
    uploadedAt: 'Mar 12, 2024',
    status: 'verified',
  },
  {
    id: 'doc2',
    label: 'Vehicle Registration',
    fileName: 'escalade_registration.pdf',
    uploadedAt: 'Mar 12, 2024',
    status: 'verified',
  },
  {
    id: 'doc3',
    label: 'Insurance Certificate',
    fileName: 'insurance_2025.pdf',
    uploadedAt: 'Jan 05, 2025',
    status: 'pending',
  },
]

function DocumentRow({ doc }: { doc: DocItem }) {
  const cfg = docStatusConfig[doc.status]
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3 transition-base hover:bg-muted/50">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
        <FileText className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{doc.label}</p>
        <p className="truncate text-xs text-muted-foreground">
          {doc.fileName} · uploaded {doc.uploadedAt}
        </p>
      </div>
      <Badge variant={cfg.variant} className={cfg.className}>
        {cfg.label}
      </Badge>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 shrink-0 text-muted-foreground hover:text-foreground"
      >
        View
      </Button>
    </div>
  )
}

function DocumentsSection({ onSave }: { onSave: () => void }) {
  return (
    <SectionCard
      icon={BadgeCheck}
      title="Documents"
      description="Verification status and document management"
      onSave={onSave}
    >
      <div className="space-y-2">
        {driverDocs.map((d) => (
          <DocumentRow key={d.id} doc={d} />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <Button size="sm" className="eer-btn-primary h-8">
          <CheckCircle2 className="size-3.5" />
          Approve All
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <XCircle className="size-3.5" />
          Reject Pending
        </Button>
      </div>
    </SectionCard>
  )
}

// ── Financial section ──
function FinancialSection({ driver, onSave }: { driver: Driver; onSave: () => void }) {
  return (
    <SectionCard
      icon={Wallet}
      title="Financial"
      description="Wallet balance, earnings, and withdrawals"
      onSave={onSave}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Wallet balance
          </p>
          <p className="mt-0.5 font-variant-numeric-tabular text-lg font-bold tracking-tight text-foreground">
            {formatUSD(driver.walletBalance)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Total earnings
          </p>
          <p className="mt-0.5 font-variant-numeric-tabular text-lg font-bold tracking-tight text-foreground">
            {formatUSD(driver.totalEarnings)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Total withdrawals
          </p>
          <p className="mt-0.5 font-variant-numeric-tabular text-lg font-bold tracking-tight text-foreground">
            {formatUSD(driver.totalEarnings - driver.walletBalance)}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <Button variant="outline" size="sm" className="h-8">
          <CreditCard className="size-3.5" />
          Adjust Balance
        </Button>
      </div>
    </SectionCard>
  )
}

// ── Loading skeleton ──
function DetailLoading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EerSkeleton className="size-9 rounded-md" />
          <div className="space-y-1.5">
            <EerSkeleton className="h-5 w-32" />
            <EerSkeleton className="h-3 w-56" />
          </div>
        </div>
        <div className="flex gap-2">
          <EerSkeleton className="h-9 w-24" />
          <EerSkeleton className="h-9 w-32" />
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <EerSkeleton className="h-32 w-full rounded-none" />
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <EerSkeleton key={i} className="m-3 h-16" />
          ))}
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
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
                <EerSkeleton className="h-9 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
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
export function A5DetailEdit({ state, onStateChange }: PatternProps) {
  const driver = mockDrivers[0]

  if (state === 'loading') return <DetailLoading />

  if (state === 'error') {
    return (
      <div className="space-y-8">
        <PageHeader
          onSave={() => onStateChange?.('success')}
          onDelete={() => onStateChange?.('populated')}
        />
        <ProfileHeader driver={driver} />
        <ErrorBanner
          message="Couldn't save driver"
          sub="A required field is missing or invalid. Please review and try again."
          onRetry={() => onStateChange?.('loading')}
        />
        <DetailContent
          driver={driver}
          onSave={() => onStateChange?.('success')}
        />
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="space-y-8">
        <PageHeader
          onSave={() => onStateChange?.('success')}
          onDelete={() => onStateChange?.('populated')}
        />
        <SuccessToast
          message="Driver updated!"
          sub="Changes saved successfully and synced to the driver app."
          onDismiss={() => onStateChange?.('populated')}
        />
        <ProfileHeader driver={driver} />
        <DetailContent
          driver={driver}
          onSave={() => onStateChange?.('success')}
        />
      </div>
    )
  }

  // Populated & empty (empty = populated for detail-edit)
  return (
    <div className="space-y-8">
      <PageHeader
        onSave={() => onStateChange?.('success')}
        onDelete={() => onStateChange?.('populated')}
      />
      <ProfileHeader driver={driver} />
      <DetailContent driver={driver} onSave={() => onStateChange?.('success')} />
    </div>
  )
}

// ── Detail content (stacked form sections) ──
function DetailContent({
  driver,
  onSave,
}: {
  driver: Driver
  onSave: () => void
}) {
  return (
    <div className="space-y-6">
      <GeneralSection driver={driver} onSave={onSave} />
      <VehicleSection driver={driver} onSave={onSave} />
      <DocumentsSection onSave={onSave} />
      <FinancialSection driver={driver} onSave={onSave} />
    </div>
  )
}
