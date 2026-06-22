'use client'

import {
  Truck,
  Star,
  Crown,
  Shield,
  ArrowRight,
  ChevronDown,
  Calendar,
  Car,
  MapPinned,
  Footprints,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EerState, EerSkeleton } from '../../state'
import { EerServiceBadge } from '../../service-badge'
import type { ServiceType } from '@/lib/mock/data'
import { mockPassengers, formatUSD } from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Hero ──
function LandingHero({ onCta, onLearn }: { onCta?: () => void; onLearn?: () => void }) {
  return (
    <div className="relative flex min-h-[600px] flex-col justify-between bg-gradient-to-b from-primary via-primary/95 to-black px-6 pb-10 pt-14 text-primary-foreground">
      {/* Brand bar */}
      <div className="flex items-center justify-between pt-safe">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Truck className="size-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">Eagle Eye Rides</div>
            <div className="text-[10px] opacity-70">Premium Urban Mobility</div>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs backdrop-blur-sm">
          <Star className="size-3 fill-current text-amber" />
          <span className="font-semibold">4.9</span>
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-3 slide-up">
        <h1 className="text-[2rem] font-bold leading-[1.1]">
          Premium urban mobility,
          <br />
          <span className="text-amber">redefined.</span>
        </h1>
        <p className="max-w-xs text-sm leading-relaxed opacity-80">
          Luxury black-car service, on-demand chauffeurs, package delivery, and roadside assistance —
          all in one app.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs backdrop-blur-sm">
            <Shield className="size-3" /> Licensed
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs backdrop-blur-sm">
            <Crown className="size-3" /> Luxury Fleet
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs backdrop-blur-sm">
            <Star className="size-3 fill-current text-amber" /> 4.9★
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <Button
          onClick={onCta}
          size="lg"
          className="w-full spring-in bg-amber text-amber-foreground hover:bg-amber/90"
        >
          Get Started
          <ArrowRight className="size-4" />
        </Button>
        <Button
          onClick={onLearn}
          variant="ghost"
          className="w-full text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
        >
          Learn More
          <ChevronDown className="size-4" />
        </Button>
      </div>
    </div>
  )
}

// ── How it works ──
const howItWorks: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Calendar, title: 'Book', desc: 'Choose your service, pickup, and drop-off in seconds.' },
  { icon: Car, title: 'Ride', desc: 'A vetted professional arrives in a luxury vehicle.' },
  { icon: MapPinned, title: 'Arrive', desc: 'Track in real-time and pay seamlessly in-app.' },
]

function HowItWorks() {
  return (
    <section className="px-5 py-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">How it works</p>
      <h2 className="mt-1 text-xl font-bold text-foreground">Three steps to your ride</h2>
      <div className="mt-5 space-y-3">
        {howItWorks.map((step, i) => (
          <div
            key={step.title}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <step.icon className="size-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Service highlights ──
const serviceHighlights: {
  service: ServiceType
  title: string
  desc: string
  priceFrom: number
}[] = [
  { service: 'one-way', title: 'One-Way', desc: 'Premium black-car rides across the city', priceFrom: 18 },
  { service: 'chauffeur', title: 'Chauffeur', desc: 'By-the-hour professional driver service', priceFrom: 65 },
  { service: 'package', title: 'Packages', desc: 'Same-day courier & package delivery', priceFrom: 12 },
  { service: 'tow', title: 'Tow Truck', desc: 'Roadside assistance when you need it', priceFrom: 75 },
]

function ServiceHighlights() {
  return (
    <section className="bg-secondary/40 px-5 py-8">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Our services</p>
      </div>
      <h2 className="mt-1 text-xl font-bold text-foreground">One app, every ride you need</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {serviceHighlights.map((s) => (
          <div
            key={s.service}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-all-eer hover:border-primary/30 hover:shadow-sm"
          >
            <EerServiceBadge service={s.service} size="xs" className="w-fit" />
            <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
            <p className="text-[11px] leading-relaxed text-muted-foreground">{s.desc}</p>
            <p className="mt-auto text-xs font-medium text-foreground">
              From <span className="font-bold text-primary">{formatUSD(s.priceFrom, { showCents: false })}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Social proof ──
function SocialProof() {
  const stats = [
    { value: '250K+', label: 'Rides completed' },
    { value: '4.9★', label: 'Average rating' },
    { value: '<4 min', label: 'Avg pickup time' },
  ]
  return (
    <section className="px-5 py-8">
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-5">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-lg font-bold text-primary">{s.value}</div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Final CTA ──
function FinalCta({ onCta }: { onCta?: () => void }) {
  return (
    <section className="px-5 pb-10">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
        <Footprints className="size-6 opacity-80" />
        <h2 className="mt-3 text-xl font-bold leading-tight">Ready to ride in style?</h2>
        <p className="mt-1 text-sm opacity-80">
          Join {mockPassengers.length * 8000}+ riders who trust Eagle Eye Rides for premium urban mobility.
        </p>
        <Button
          onClick={onCta}
          size="lg"
          className="mt-4 w-full bg-amber text-amber-foreground hover:bg-amber/90"
        >
          Get Started
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  )
}

// ── Footer ──
function LandingFooter() {
  const links = ['Terms of Service', 'Privacy Policy', 'Support', 'Contact']
  return (
    <footer className="border-t border-border bg-card px-5 py-6 pb-safe">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Truck className="size-4" />
        </div>
        <span className="text-sm font-semibold text-foreground">Eagle Eye Rides</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {links.map((l) => (
          <button
            key={l}
            className="text-xs text-muted-foreground transition-base hover:text-foreground"
          >
            {l}
          </button>
        ))}
      </div>
      <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground/70">
        © {new Date().getFullYear()} Eagle Eye Rides, Inc. All rights reserved. Licensed by NYC TLC.
        Premium urban mobility, redefined.
      </p>
    </footer>
  )
}

// ── Loading skeleton ──
function LandingLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero skeleton */}
      <div className="flex min-h-[600px] flex-col justify-between bg-gradient-to-b from-primary/30 via-primary/20 to-black px-6 pb-10 pt-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EerSkeleton className="size-9 rounded-xl" />
            <div className="space-y-1.5">
              <EerSkeleton className="h-3 w-32" />
              <EerSkeleton className="h-2 w-24" />
            </div>
          </div>
          <EerSkeleton className="h-5 w-12 rounded-full" />
        </div>
        <div className="space-y-3">
          <EerSkeleton className="h-10 w-64" />
          <EerSkeleton className="h-10 w-48" />
          <EerSkeleton className="h-3 w-72" />
          <div className="flex gap-2 pt-2">
            <EerSkeleton className="h-6 w-20 rounded-full" />
            <EerSkeleton className="h-6 w-24 rounded-full" />
            <EerSkeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <div className="space-y-3">
          <EerSkeleton className="h-11 w-full rounded-md" />
          <EerSkeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
      {/* Sections skeleton */}
      <div className="space-y-3 px-5 py-8">
        <EerSkeleton className="h-3 w-20" />
        <EerSkeleton className="h-6 w-48" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
            <EerSkeleton className="size-11 rounded-xl" />
            <div className="flex-1 space-y-2">
              <EerSkeleton className="h-4 w-24" />
              <EerSkeleton className="h-3 w-full" />
              <EerSkeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Full landing content ──
function LandingContent({ onCta }: { onCta?: () => void }) {
  return (
    <div className="flex flex-col">
      <LandingHero onCta={onCta} onLearn={() => {}} />
      <HowItWorks />
      <ServiceHighlights />
      <SocialProof />
      <FinalCta onCta={onCta} />
      <LandingFooter />
    </div>
  )
}

// ── Main pattern ──
export function P1Landing({ state, onStateChange }: PatternProps) {
  // Loading → skeleton
  if (state === 'loading') {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <LandingLoading />
        </div>
      </div>
    )
  }

  // Error → retry
  if (state === 'error') {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="flex flex-1 items-center justify-center">
          <EerState
            state="error"
            title="Couldn't load promo content"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => onStateChange?.('loading')}
          />
        </div>
      </div>
    )
  }

  // empty, success, populated → full landing page
  // (landing is always populated; success/empty render same content)
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <LandingContent onCta={() => onStateChange?.('loading')} />
      </div>
    </div>
  )
}
