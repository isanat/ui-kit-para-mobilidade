import {
  Bell,
  CalendarDays,
  Car,
  Crown,
  Megaphone,
  Package,
  Search,
  Truck,
  Zap,
} from 'lucide-react'
import { BottomNav } from '@/components/eer/bottom-nav'
import { DriverCard } from '@/components/eer/driver-card'
import { Logo } from '@/components/eer/logo'
import { PhoneFrame } from '@/components/eer/phone-frame'
import { RideOption } from '@/components/eer/ride-option'
import { HomeScreen } from '@/components/eer/screens/home-screen'
import { ReserveScreen } from '@/components/eer/screens/reserve-screen'
import { TrackingScreen } from '@/components/eer/screens/tracking-screen'
import { SectionLabel } from '@/components/eer/section-label'
import { ServiceCard } from '@/components/eer/service-card'
import { StatusBadge } from '@/components/eer/status-badge'
import { ThemeToggle } from '@/components/eer/theme-toggle'
import { WhereToBar } from '@/components/eer/where-to-bar'
import { Button } from '@/components/ui/button'

const colorTokens = [
  { name: 'Primary', var: 'bg-primary', label: 'Royal Blue' },
  { name: 'Cyan', var: 'bg-cyan', label: 'Reserve' },
  { name: 'Amber', var: 'bg-amber', label: 'Packages' },
  { name: 'Magenta', var: 'bg-magenta', label: 'Ads' },
  { name: 'Gold', var: 'bg-gold', label: 'Tow Truck' },
  { name: 'Success', var: 'bg-success', label: 'Status' },
]

const neutralTokens = [
  { name: 'Background', var: 'bg-background' },
  { name: 'Card', var: 'bg-card' },
  { name: 'Muted', var: 'bg-muted' },
  { name: 'Border', var: 'bg-border' },
  { name: 'Foreground', var: 'bg-foreground' },
]

const icons = [
  Search,
  Bell,
  CalendarDays,
  Package,
  Megaphone,
  Zap,
  Car,
  Crown,
  Truck,
]

function Block({
  title,
  description,
  children,
  id,
}: {
  title: string
  description?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export default function Page() {
  return (
    <div className="min-h-dvh bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Logo subtitle="UI Kit" />
          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <StatusBadge tone="brand" dot>
                v1.0 Design System
              </StatusBadge>
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12">
        {/* Hero */}
        <div className="mb-16 max-w-2xl space-y-4">
          <StatusBadge tone="cyan">Urban Mobility</StatusBadge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Eagle Eye Rides Design System
          </h1>
          <p className="text-lg text-pretty text-muted-foreground">
            A complete UI kit for the Eagle Eye Rides urban mobility app —
            tokens, components, and ready-to-use mobile screens, in light and
            dark themes.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button className="h-10 px-4">Get started</Button>
            <Button variant="outline" className="h-10 px-4">
              View components
            </Button>
          </div>
        </div>

        <div className="space-y-20">
          {/* Colors */}
          <Block
            id="colors"
            title="Colors"
            description="Brand accents pair a royal-blue primary with service-specific accent colors over deep navy neutrals."
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {colorTokens.map((c) => (
                <div
                  key={c.name}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className={`h-20 ${c.var}`} />
                  <div className="p-3">
                    <p className="text-sm font-medium text-card-foreground">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {neutralTokens.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <span
                    className={`size-8 rounded-lg border border-border ${c.var}`}
                  />
                  <span className="text-sm text-card-foreground">{c.name}</span>
                </div>
              ))}
            </div>
          </Block>

          {/* Typography */}
          <Block
            id="typography"
            title="Typography"
            description="Geist Sans across the system with a clear weight and size hierarchy."
          >
            <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                <p className="text-4xl font-semibold tracking-tight text-card-foreground">
                  Where to?
                </p>
                <span className="text-xs text-muted-foreground">
                  Display · 36px · Semibold
                </span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                <p className="text-xl font-semibold text-card-foreground">
                  Book a ride in seconds
                </p>
                <span className="text-xs text-muted-foreground">
                  Heading · 20px · Semibold
                </span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                <p className="text-base text-card-foreground">
                  Your driver is on the way and will arrive shortly.
                </p>
                <span className="text-xs text-muted-foreground">
                  Body · 16px · Regular
                </span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Services
                </p>
                <span className="text-xs text-muted-foreground">
                  Label · 12px · Uppercase
                </span>
              </div>
            </div>
          </Block>

          {/* Icons */}
          <Block
            id="icons"
            title="Icons"
            description="Lucide icon set, consistently sized and themed."
          >
            <div className="flex flex-wrap gap-3">
              {icons.map((Icon, i) => (
                <div
                  key={i}
                  className="flex size-14 items-center justify-center rounded-xl border border-border bg-card text-foreground"
                >
                  <Icon className="size-5" aria-hidden />
                </div>
              ))}
            </div>
          </Block>

          {/* Buttons */}
          <Block
            id="buttons"
            title="Buttons"
            description="Built on the shadcn button with the Eagle Eye theme applied."
          >
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-6">
              <Button>Confirm ride</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Cancel</Button>
              <Button variant="link">Learn more</Button>
            </div>
          </Block>

          {/* Components */}
          <Block
            id="components"
            title="Components"
            description="Composable building blocks used across the app."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <SectionLabel>Service cards</SectionLabel>
                <div className="grid grid-cols-2 gap-3">
                  <ServiceCard
                    icon={CalendarDays}
                    title="Reserve"
                    description="Book a ride"
                    accent="cyan"
                  />
                  <ServiceCard
                    icon={Package}
                    title="Packages"
                    description="Send items"
                    accent="amber"
                  />
                  <ServiceCard
                    icon={Megaphone}
                    title="Ads"
                    description="Promote"
                    accent="magenta"
                  />
                  <ServiceCard
                    icon={Zap}
                    title="Tow Truck"
                    description="Roadside help"
                    accent="gold"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <SectionLabel>Search & badges</SectionLabel>
                <div className="rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.4_0.18_268)] p-4">
                  <WhereToBar />
                </div>
                <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-card p-4">
                  <StatusBadge tone="brand" dot>
                    On the way
                  </StatusBadge>
                  <StatusBadge tone="success">Completed</StatusBadge>
                  <StatusBadge tone="amber">Pending</StatusBadge>
                  <StatusBadge tone="magenta">Promo</StatusBadge>
                  <StatusBadge tone="muted">Draft</StatusBadge>
                </div>
              </div>

              <div className="space-y-3">
                <SectionLabel>Ride options</SectionLabel>
                <RideOption
                  icon={Car}
                  name="Eagle X"
                  eta="3 min away"
                  price="$12.40"
                  selected
                />
                <RideOption
                  icon={Crown}
                  name="Eagle Premium"
                  eta="5 min away"
                  price="$19.80"
                />
                <RideOption
                  icon={Truck}
                  name="Eagle XL"
                  eta="7 min away"
                  price="$24.00"
                />
              </div>

              <div className="space-y-3">
                <SectionLabel>Driver & navigation</SectionLabel>
                <DriverCard
                  name="Marcus Reed"
                  rating={4.9}
                  car="Tesla Model 3"
                  plate="EAG-4821"
                  initials="MR"
                />
                <div className="overflow-hidden rounded-2xl border border-border">
                  <BottomNav />
                </div>
              </div>
            </div>
          </Block>

          {/* App screens */}
          <Block
            id="screens"
            title="App screens"
            description="The components assembled into real mobile screens."
          >
            <div className="flex flex-wrap justify-center gap-10 lg:justify-start">
              <PhoneFrame label="Home">
                <HomeScreen />
              </PhoneFrame>
              <PhoneFrame label="Book a ride">
                <ReserveScreen />
              </PhoneFrame>
              <PhoneFrame label="Live tracking">
                <TrackingScreen />
              </PhoneFrame>
            </div>
          </Block>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 sm:flex-row">
          <Logo size={32} />
          <p className="text-sm text-muted-foreground">
            Eagle Eye Rides UI Kit — built with v0.
          </p>
        </div>
      </footer>
    </div>
  )
}
