/**
 * EER State — canonical loading/empty/error/success states.
 * EVERY data-driven surface in the app must handle these 4 states.
 * DO NOT hand-roll spinners, empty states, or error messages.
 */
import { AlertCircle, CheckCircle2, Inbox, Loader2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type StateType = 'loading' | 'empty' | 'error' | 'success'

interface EerStateProps {
  state: StateType
  title?: string
  description?: string
  icon?: LucideIcon
  actionLabel?: string
  onAction?: () => void
  className?: string
  /** Compact variant for inline states (inside cards/sheets) */
  compact?: boolean
}

const defaultConfig: Record<StateType, { icon: LucideIcon; title: string; description: string; color: string }> = {
  loading: {
    icon: Loader2,
    title: 'Loading…',
    description: 'Please wait while we fetch your data.',
    color: 'text-muted-foreground',
  },
  empty: {
    icon: Inbox,
    title: 'Nothing here yet',
    description: 'Your content will appear here once available.',
    color: 'text-muted-foreground',
  },
  error: {
    icon: AlertCircle,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    color: 'text-destructive',
  },
  success: {
    icon: CheckCircle2,
    title: 'Success',
    description: 'Your action was completed successfully.',
    color: 'text-success',
  },
}

export function EerState({
  state,
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
  compact,
}: EerStateProps) {
  const config = defaultConfig[state]
  const Icon = icon ?? config.icon
  const isSpinner = state === 'loading'

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2 py-3 text-sm text-muted-foreground', className)}>
        <Icon className={cn('size-4', isSpinner && 'animate-spin', config.color)} />
        <span>{title ?? config.title}</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-12 px-6 text-center',
        className,
      )}
    >
      <div
        className={cn(
          'flex size-14 items-center justify-center rounded-full bg-muted/50',
          config.color,
        )}
      >
        <Icon className={cn('size-7', isSpinner && 'animate-spin')} />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">{title ?? config.title}</h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          {description ?? config.description}
        </p>
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm" className="mt-1">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

// ── Skeleton primitives ──
export function EerSkeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-md', className)} />
}

export function EerSkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3 rounded-xl border border-border bg-card p-4', className)}>
      <div className="flex items-center gap-3">
        <EerSkeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <EerSkeleton className="h-3 w-24" />
          <EerSkeleton className="h-3 w-16" />
        </div>
      </div>
      <EerSkeleton className="h-3 w-full" />
      <EerSkeleton className="h-3 w-2/3" />
    </div>
  )
}

export function EerSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <EerSkeletonCard key={i} />
      ))}
    </div>
  )
}
