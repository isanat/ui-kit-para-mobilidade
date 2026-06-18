import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function SectionLabel({
  children,
  action,
  className,
}: SectionLabelProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {children}
      </h2>
      {action}
    </div>
  )
}
