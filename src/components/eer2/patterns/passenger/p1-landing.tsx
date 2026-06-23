'use client'

import {
  Truck,
  Star,
  ArrowRight,
  ChevronDown,
  Calendar,
  Car,
  MapPinned,
  Footprints,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EerState, EerSkeleton } from '../../state'
import { EerServiceBadge } from '../../service-badge'
import type { ServiceType } from '@/lib/mock/data'
import { mockPassengers, formatUSD } from '@/lib/mock/data'
import type { PatternProps } from '../types'

// ── Hero (v3 clean: solid bg, no gradient) ──
function LandingHero({ onCta, onLearn }: { onCta?: () => void; onLearn?: () => void }) {
  return (
    <div className="relative flex min-h-[560px] flex-col justify-between bg-background px-6 pb-10 pt-14 text-foreground">
      {/* Brand bar */}
      <div className="flex items-center justify-between pt-safe">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card">
            <Truck className="size-5 text-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-foreground">Eagle Eye Rides</div>
            <div className="text-[10px] text-muted-foreground">Premium Urban Mobility</div>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-xs">
          <Star className="size-3 fill-current text-amber" />
          <span className="font-semibold text-foreground">4.9</span>
        </div>
      </div>

      {/* Tagline */}
      <div className="space-y-4 slide-up">
        <h1 className="text-[2.25rem] font-bold leading-[1.1] tracking-tight text-foreground">
          Premium urban mobility,
          <br />
          <span className="text-muted-foreground">redefined.</span>
        </h1>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Luxury black-car service, on-demand chauffeurs, package delivery, and roadside assistance —
          all in one app.
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <Button
          onClick={onCta}
          size="lg"
          className="eer-btn-primary w-full spring-in"
        >
          Get Started
          <ArrowRight className="size-4" />
        </Button>
        <Button
          onClick={onLearn}
          variant="ghost"
          className="w-full text-foreground hover:bg-muted hover:text-foreground"
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
    <section className="px-5 py-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">How it works</p>
      <h2 className="mt-1 text-xl font-bold text-foreground">Three steps to your ride</h2>
      <div className="mt-8 space-y-4">
        {howItWorks.map((step, i) => (
          <div
            key={step.title}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
              <step.icon className="size-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
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
    <section className="border-t border-border bg-background px-5 py-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Our services</p>
      <h2 className="mt-1 text-xl font-bold text-foreground">One app, every ride you need</h2>
      <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        {serviceHighlights.map((s) => (
          <div
            key={s.service}
            className="flex items-center gap-4 p-5 transition-base hover:bg-muted/50"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{s.title}</h3>
                <EerServiceBadge service={s.service} size="xs" />
              </div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-foreground tabular-nums">
              {formatUSD(s.priceFrom, { showCents: false })}
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
    <section className="px-5 py-10">
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-card p-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-lg font-bold tabular-nums text-foreground">{s.value}</div>
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
    <section className="px-5 pb-12">
      <div className="overflow-hidden rounded-3xl border border-border bg-card p-6">
        <Footprints className="size-6 text-muted-foreground" />
        <h2 className="mt-3 text-xl font-bold leading-tight text-foreground">Ready to ride in style?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Join {mockPassengers.length * 8000}+ riders who trust Eagle Eye Rides for premium urban mobility.
        </p>
        <Button
          onClick={onCta}
          size="lg"
          className="eer-btn-primary mt-5 w-full"
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
    <footer className="border-t border-border bg-background px-5 py-8 pb-safe">
      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-lg border border-border bg-card">
          <Truck className="size-4 text-foreground" />
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
      <div className="flex min-h-[560px] flex-col justify-between bg-background px-6 pb-10 pt-14">
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
