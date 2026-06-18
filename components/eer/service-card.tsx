import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type Accent = 'brand' | 'cyan' | 'amber' | 'magenta' | 'gold' | 'success'

const accentMap: Record<Accent, string> = {
  brand: 'bg-primary text-primary-foreground',
  cyan: 'bg-cyan text-cyan-foreground',
  amber: 'bg-amber text-amber-foreground',
  magenta: 'bg-magenta text-magenta-foreground',
  gold: 'bg-gold text-gold-foreground',
  success: 'bg-success text-success-foreground',
}

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  accent?: Accent
  className?: string
  onClick?: () => void
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  accent = 'brand',
  className,
  onClick,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-full flex-col items-start gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-11 items-center justify-center rounded-xl transition-transform group-hover:scale-105',
          accentMap[accent],
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="space-y-0.5">
        <span className="block font-semibold text-card-foreground">
          {title}
        </span>
        <span className="block text-sm text-muted-foreground">
          {description}
        </span>
      </span>
    </button>
  )
}
