import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RideOptionProps {
  icon: LucideIcon
  name: string
  eta: string
  price: string
  selected?: boolean
  className?: string
  onClick?: () => void
}

export function RideOption({
  icon: Icon,
  name,
  eta,
  price,
  selected = false,
  className,
  onClick,
}: RideOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected
          ? 'border-primary bg-primary/10'
          : 'border-border bg-card hover:border-primary/40',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-11 items-center justify-center rounded-xl',
          selected
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground',
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="flex-1">
        <span className="block font-semibold text-card-foreground">{name}</span>
        <span className="block text-sm text-muted-foreground">{eta}</span>
      </span>
      <span className="font-semibold text-card-foreground">{price}</span>
    </button>
  )
}
