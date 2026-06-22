'use client'

import { useMemo, useState } from 'react'
import {
  Car,
  LayoutDashboard,
  Layers,
  Menu,
  Moon,
  Sun,
  Truck,
  User,
  X,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useI18n } from '@/i18n/context'
import type { Locale } from '@/i18n/messages'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FoundationView } from './foundation'
import { PhoneFrame } from '@/components/eer/phone-frame'
import type { AppState } from './patterns/types'
import { appStates } from './patterns/types'
import { P1Landing } from './patterns/passenger/p1-landing'
import { P2Auth } from './patterns/passenger/p2-auth'
import { P3HomeDashboard } from './patterns/passenger/p3-home-dashboard'
import { P4BookingWizard } from './patterns/passenger/p4-booking-wizard'
import { P5MapSelection } from './patterns/passenger/p5-map-selection'
import { P6Payment } from './patterns/passenger/p6-payment'
import { P7ListDetail } from './patterns/passenger/p7-list-detail'
import { P8Chat } from './patterns/passenger/p8-chat'
import { P9Account } from './patterns/passenger/p9-account'
import { D1Dashboard } from './patterns/driver/d1-dashboard'
import { D2RidesList } from './patterns/driver/d2-rides-list'
import { D3Earnings } from './patterns/driver/d3-earnings'
import { D4Settings } from './patterns/driver/d4-settings'
import { A1Dashboard } from './patterns/admin/a1-dashboard'
import { A2DataTable } from './patterns/admin/a2-data-table'
import { A3Config } from './patterns/admin/a3-config'
import { A4AlertTriage } from './patterns/admin/a4-alert-triage'
import { A5DetailEdit } from './patterns/admin/a5-detail-edit'

// ── Pattern registry ──
const patternRegistry: Record<string, React.ComponentType<{ state: AppState; onStateChange?: (s: AppState) => void }>> = {
  p1: P1Landing,
  p2: P2Auth,
  p3: P3HomeDashboard,
  p4: P4BookingWizard,
  p5: P5MapSelection,
  p6: P6Payment,
  p7: P7ListDetail,
  p8: P8Chat,
  p9: P9Account,
  d1: D1Dashboard,
  d2: D2RidesList,
  d3: D3Earnings,
  d4: D4Settings,
  a1: A1Dashboard,
  a2: A2DataTable,
  a3: A3Config,
  a4: A4AlertTriage,
  a5: A5DetailEdit,
}

type Category = 'foundation' | 'passenger' | 'driver' | 'admin'

interface NavItem {
  id: string
  category: Category
  labelKey: string
  descKey?: string
  badge?: string
  renderType: 'foundation' | 'mobile' | 'desktop'
  foundationSection?: 'overview' | 'colors' | 'typography' | 'motion' | 'states'
  patternId?: string
  ready?: boolean
}

const navItems: NavItem[] = [
  // Foundation
  { id: 'overview', category: 'foundation', labelKey: 'shell.foundation', renderType: 'foundation', foundationSection: 'overview' },
  { id: 'colors', category: 'foundation', labelKey: 'foundation.colors.title', renderType: 'foundation', foundationSection: 'colors' },
  { id: 'typography', category: 'foundation', labelKey: 'foundation.typography.title', renderType: 'foundation', foundationSection: 'typography' },
  { id: 'motion', category: 'foundation', labelKey: 'foundation.motion.title', renderType: 'foundation', foundationSection: 'motion' },
  { id: 'states', category: 'foundation', labelKey: 'foundation.states.title', renderType: 'foundation', foundationSection: 'states' },

  // Passenger
  { id: 'p1', category: 'passenger', labelKey: 'pattern.p1.title', descKey: 'pattern.p1.desc', renderType: 'mobile', patternId: 'p1', badge: 'P1' },
  { id: 'p2', category: 'passenger', labelKey: 'pattern.p2.title', descKey: 'pattern.p2.desc', renderType: 'mobile', patternId: 'p2', badge: 'P2' },
  { id: 'p3', category: 'passenger', labelKey: 'pattern.p3.title', descKey: 'pattern.p3.desc', renderType: 'mobile', patternId: 'p3', badge: 'P3' },
  { id: 'p4', category: 'passenger', labelKey: 'pattern.p4.title', descKey: 'pattern.p4.desc', renderType: 'mobile', patternId: 'p4', badge: 'P4' },
  { id: 'p5', category: 'passenger', labelKey: 'pattern.p5.title', descKey: 'pattern.p5.desc', renderType: 'mobile', patternId: 'p5', badge: 'P5' },
  { id: 'p6', category: 'passenger', labelKey: 'pattern.p6.title', descKey: 'pattern.p6.desc', renderType: 'mobile', patternId: 'p6', badge: 'P6' },
  { id: 'p7', category: 'passenger', labelKey: 'pattern.p7.title', descKey: 'pattern.p7.desc', renderType: 'mobile', patternId: 'p7', badge: 'P7' },
  { id: 'p8', category: 'passenger', labelKey: 'pattern.p8.title', descKey: 'pattern.p8.desc', renderType: 'mobile', patternId: 'p8', badge: 'P8' },
  { id: 'p9', category: 'passenger', labelKey: 'pattern.p9.title', descKey: 'pattern.p9.desc', renderType: 'mobile', patternId: 'p9', badge: 'P9' },

  // Driver
  { id: 'd1', category: 'driver', labelKey: 'pattern.d1.title', descKey: 'pattern.d1.desc', renderType: 'mobile', patternId: 'd1', badge: 'D1' },
  { id: 'd2', category: 'driver', labelKey: 'pattern.d2.title', descKey: 'pattern.d2.desc', renderType: 'mobile', patternId: 'd2', badge: 'D2' },
  { id: 'd3', category: 'driver', labelKey: 'pattern.d3.title', descKey: 'pattern.d3.desc', renderType: 'mobile', patternId: 'd3', badge: 'D3' },
  { id: 'd4', category: 'driver', labelKey: 'pattern.d4.title', descKey: 'pattern.d4.desc', renderType: 'mobile', patternId: 'd4', badge: 'D4' },

  // Admin
  { id: 'a1', category: 'admin', labelKey: 'pattern.a1.title', descKey: 'pattern.a1.desc', renderType: 'desktop', patternId: 'a1', badge: 'A1' },
  { id: 'a2', category: 'admin', labelKey: 'pattern.a2.title', descKey: 'pattern.a2.desc', renderType: 'desktop', patternId: 'a2', badge: 'A2' },
  { id: 'a3', category: 'admin', labelKey: 'pattern.a3.title', descKey: 'pattern.a3.desc', renderType: 'desktop', patternId: 'a3', badge: 'A3' },
  { id: 'a4', category: 'admin', labelKey: 'pattern.a4.title', descKey: 'pattern.a4.desc', renderType: 'desktop', patternId: 'a4', badge: 'A4' },
  { id: 'a5', category: 'admin', labelKey: 'pattern.a5.title', descKey: 'pattern.a5.desc', renderType: 'desktop', patternId: 'a5', badge: 'A5' },
]

const categoryConfig: Record<Category, { labelKey: string; icon: typeof Layers; introKey?: string }> = {
  foundation: { labelKey: 'shell.foundation', icon: Layers },
  passenger: { labelKey: 'shell.passenger', icon: User, introKey: 'passenger.intro' },
  driver: { labelKey: 'shell.driver', icon: Car, introKey: 'driver.intro' },
  admin: { labelKey: 'shell.admin', icon: LayoutDashboard, introKey: 'admin.intro' },
}

function LocaleSwitcher() {
  const { locale, setLocale } = useI18n()
  return (
    <div className="inline-flex rounded-lg border border-border bg-card p-0.5 text-xs">
      <button
        onClick={() => setLocale('en')}
        className={cn(
          'rounded-md px-2.5 py-1 font-medium transition-base',
          locale === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('pt-BR')}
        className={cn(
          'rounded-md px-2.5 py-1 font-medium transition-base',
          locale === 'pt-BR' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        PT-BR
      </button>
    </div>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useState(() => setMounted(true))
  if (!mounted) return <div className="size-9" />
  const isDark = theme === 'dark'
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="size-9"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}

function PatternPlaceholder({ patternId }: { patternId: string }) {
  const { t } = useI18n()
  const item = navItems.find((n) => n.id === patternId)!
  const marco =
    item.category === 'passenger' ? 'Marco 2' : item.category === 'driver' ? 'Marco 3' : 'Marco 4'
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-2xl font-bold text-muted-foreground">
        {item.badge}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{t(item.labelKey as never)}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{item.descKey ? t(item.descKey as never) : ''}</p>
      </div>
      <div className="rounded-full border border-dashed border-border px-4 py-1.5 text-xs text-muted-foreground">
        Coming in {marco}
      </div>
    </div>
  )
}

function Sidebar({
  activeId,
  onSelect,
  onClose,
}: {
  activeId: string
  onSelect: (id: string) => void
  onClose?: () => void
}) {
  const { t } = useI18n()
  const categories: Category[] = ['foundation', 'passenger', 'driver', 'admin']

  return (
    <nav className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Truck className="size-4" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{t('app.title')}</div>
          <div className="text-[10px] text-muted-foreground">{t('app.subtitle')}</div>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" className="ml-auto size-8 lg:hidden" onClick={onClose}>
            <X className="size-4" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin py-3">
        {categories.map((cat) => {
          const config = categoryConfig[cat]
          const items = navItems.filter((n) => n.category === cat)
          const Icon = config.icon
          return (
            <div key={cat} className="mb-4">
              <div className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Icon className="size-3.5" />
                {t(config.labelKey as never)}
              </div>
              {config.introKey && (
                <p className="mx-4 mb-2 text-[11px] leading-relaxed text-muted-foreground/70">
                  {t(config.introKey as never)}
                </p>
              )}
              <div className="space-y-0.5 px-2">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-base',
                      activeId === item.id
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-foreground/80 hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {item.badge && (
                      <span
                        className={cn(
                          'shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold',
                          activeId === item.id
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground',
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span className="truncate">{t(item.labelKey as never)}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div className="border-t border-border p-3 text-[10px] text-muted-foreground">
        v2.0 · Built for Eagle Eye Rides
      </div>
    </nav>
  )
}

function StateSelector({ value, onChange }: { value: AppState; onChange: (s: AppState) => void }) {
  const { t } = useI18n()
  const stateLabels: Record<AppState, string> = {
    loading: t('shell.state.loading'),
    empty: t('shell.state.empty'),
    error: t('shell.state.error'),
    success: t('shell.state.success'),
    populated: t('shell.state.populated'),
  }
  return (
    <div className="inline-flex rounded-lg border border-border bg-card p-0.5">
      {appStates.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={cn(
            'rounded-md px-2 py-1 text-xs font-medium transition-base',
            value === s ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {stateLabels[s]}
        </button>
      ))}
    </div>
  )
}

export function EerShell() {
  const { t } = useI18n()
  const [activeId, setActiveId] = useState('overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [patternState, setPatternState] = useState<AppState>('populated')

  const activeItem = useMemo(() => navItems.find((n) => n.id === activeId)!, [activeId])
  const PatternComponent = activeItem.patternId ? patternRegistry[activeItem.patternId] : null
  const hasStateSelector = PatternComponent !== null

  const handleSelect = (id: string) => {
    setActiveId(id)
    setMobileNavOpen(false)
    setPatternState('populated')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeId={activeId} onSelect={handleSelect} />
      </div>

      {/* Mobile sidebar drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar activeId={activeId} onSelect={handleSelect} onClose={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <div className="flex items-center gap-2">
            {activeItem.badge && (
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                {activeItem.badge}
              </span>
            )}
            <h1 className="text-sm font-semibold">{t(activeItem.labelKey as never)}</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {hasStateSelector && (
              <StateSelector value={patternState} onChange={setPatternState} />
            )}
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {activeItem.renderType === 'foundation' && (
            <div className="mx-auto max-w-5xl p-6">
              <FoundationView section={activeItem.foundationSection!} />
            </div>
          )}
          {activeItem.renderType === 'mobile' && (
            <div className="flex min-h-full items-start justify-center p-6">
              <PhoneFrame>
                {PatternComponent ? (
                  <PatternComponent state={patternState} onStateChange={setPatternState} />
                ) : (
                  <PatternPlaceholder patternId={activeItem.id} />
                )}
              </PhoneFrame>
            </div>
          )}
          {activeItem.renderType === 'desktop' && (
            <div className="mx-auto max-w-6xl p-6">
              {PatternComponent ? (
                <PatternComponent state={patternState} onStateChange={setPatternState} />
              ) : (
                <PatternPlaceholder patternId={activeItem.id} />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
