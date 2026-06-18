import { cn } from '@/lib/utils'

type Tone = 'brand' | 'cyan' | 'amber' | 'magenta' | 'gold' | 'success' | 'muted'

const toneMap: Record<Tone, string> = {
  brand: 'bg-primary/15 text-primary',
  cyan: 'bg-cyan/15 text-cyan',
  amber: 'bg-amber/15 text-amber',
  magenta: 'bg-magenta/15 text-magenta',
  gold: 'bg-gold/20 text-gold',
  success: 'bg-success/15 text-success',
  muted: 'bg-muted text-muted-foreground',
}

interface StatusBadgeProps {
  children: React.ReactNode
  tone?: Tone
  dot?: boolean
  className?: string
}

export function StatusBadge({
  children,
  tone = 'brand',
  dot = false,
  className,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        toneMap[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
