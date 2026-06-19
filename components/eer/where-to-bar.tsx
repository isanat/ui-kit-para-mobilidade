import { ChevronRight, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhereToBarProps {
  title?: string
  subtitle?: string
  className?: string
  onClick?: () => void
}

export function WhereToBar({
  title = 'Where to?',
  subtitle = 'Enter your destination',
  className,
  onClick,
}: WhereToBarProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 text-left backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
        className,
      )}
    >
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Search className="size-5" aria-hidden />
      </span>
      <span className="flex-1">
        <span className="block font-medium text-white">{title}</span>
        <span className="block text-sm text-white/60">{subtitle}</span>
      </span>
      <ChevronRight className="size-5 text-white/60" aria-hidden />
    </button>
  )
}
