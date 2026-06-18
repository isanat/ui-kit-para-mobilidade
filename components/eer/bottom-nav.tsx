'use client'

import {
  Car,
  Home,
  Package,
  User,
  type LucideIcon,
  Crown,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  icon: LucideIcon
}

const items: NavItem[] = [
  { label: 'Home', icon: Home },
  { label: 'Reserve', icon: Car },
  { label: 'Packages', icon: Package },
  { label: 'Chauffeur', icon: Crown },
  { label: 'Account', icon: User },
]

export function BottomNav({ className }: { className?: string }) {
  const [active, setActive] = useState('Home')

  return (
    <nav
      className={cn(
        'flex items-center justify-between border-t border-border bg-card px-2 py-2',
        className,
      )}
    >
      {items.map(({ label, icon: Icon }) => {
        const isActive = active === label
        return (
          <button
            key={label}
            type="button"
            onClick={() => setActive(label)}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className={cn(
                'flex size-9 items-center justify-center rounded-xl transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground',
              )}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <span
              className={cn(
                'text-[11px] font-medium',
                isActive ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
