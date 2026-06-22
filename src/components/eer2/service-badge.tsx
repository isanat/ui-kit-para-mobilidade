/**
 * EER Service Badge — canonical service color mapping.
 * Each service has ONE consistent color across the entire app.
 * DO NOT use ad-hoc colors for services. Always use this component.
 */
import { cn } from '@/lib/utils'
import type { ServiceType } from '@/lib/mock/data'

const serviceStyles: Record<ServiceType, { bg: string; fg: string; label: string }> = {
  'one-way': {
    bg: 'bg-[var(--service-one-way)]',
    fg: 'text-[var(--service-one-way-fg)]',
    label: 'One-Way',
  },
  tow: {
    bg: 'bg-[var(--service-tow)]',
    fg: 'text-[var(--service-tow-fg)]',
    label: 'Tow Truck',
  },
  chauffeur: {
    bg: 'bg-[var(--service-chauffeur)]',
    fg: 'text-[var(--service-chauffeur-fg)]',
    label: 'Chauffeur',
  },
  package: {
    bg: 'bg-[var(--service-package)]',
    fg: 'text-[var(--service-package-fg)]',
    label: 'Package',
  },
  ad: {
    bg: 'bg-[var(--service-ad)]',
    fg: 'text-[var(--service-ad-fg)]',
    label: 'Ad',
  },
}

export function EerServiceBadge({
  service,
  size = 'sm',
  className,
}: {
  service: ServiceType
  size?: 'xs' | 'sm' | 'md'
  className?: string
}) {
  const s = serviceStyles[service]
  const sizeClass = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  }[size]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        s.bg,
        s.fg,
        sizeClass,
        className,
      )}
    >
      {s.label}
    </span>
  )
}

export function getServiceLabel(service: ServiceType): string {
  return serviceStyles[service].label
}
