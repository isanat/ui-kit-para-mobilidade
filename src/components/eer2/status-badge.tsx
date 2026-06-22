/**
 * EER Status Badge — booking/payment/driver status with semantic colors.
 * Canonical status taxonomy with consistent colors across the app.
 */
import { cn } from '@/lib/utils'
import type { BookingStatus, PaymentStatus } from '@/lib/mock/data'

const bookingStatusStyles: Record<BookingStatus, { variant: string; label: string }> = {
  scheduled: { variant: 'bg-info/15 text-info border-info/20', label: 'Scheduled' },
  searching: { variant: 'bg-warning/15 text-warning border-warning/20', label: 'Searching' },
  accepted: { variant: 'bg-primary/15 text-primary border-primary/20', label: 'Accepted' },
  'en-route': { variant: 'bg-primary/15 text-primary border-primary/20', label: 'En route' },
  arrived: { variant: 'bg-success/15 text-success border-success/20', label: 'Arrived' },
  'in-progress': { variant: 'bg-success/15 text-success border-success/20', label: 'In progress' },
  completed: { variant: 'bg-muted text-muted-foreground border-border', label: 'Completed' },
  cancelled: { variant: 'bg-destructive/15 text-destructive border-destructive/20', label: 'Cancelled' },
}

const paymentStatusStyles: Record<PaymentStatus, { variant: string; label: string }> = {
  succeeded: { variant: 'bg-success/15 text-success border-success/20', label: 'Succeeded' },
  pending: { variant: 'bg-warning/15 text-warning border-warning/20', label: 'Pending' },
  failed: { variant: 'bg-destructive/15 text-destructive border-destructive/20', label: 'Failed' },
  refunded: { variant: 'bg-info/15 text-info border-info/20', label: 'Refunded' },
}

export function EerBookingStatusBadge({
  status,
  className,
}: {
  status: BookingStatus
  className?: string
}) {
  const s = bookingStatusStyles[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
        s.variant,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  )
}

export function EerPaymentStatusBadge({
  status,
  className,
}: {
  status: PaymentStatus
  className?: string
}) {
  const s = paymentStatusStyles[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium',
        s.variant,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  )
}
