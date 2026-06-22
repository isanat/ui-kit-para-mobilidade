'use client'

import { Sparkles, Type, Zap, Layers } from 'lucide-react'
import { EerState, EerSkeletonList } from './state'

// ── Color showcase ──
const colorGroups = [
  {
    label: 'Brand',
    colors: [
      { name: 'primary', label: 'Royal Blue', var: 'bg-primary', fg: 'text-primary-foreground' },
      { name: 'brand', label: 'Brand', var: 'bg-brand', fg: 'text-brand-foreground' },
    ],
  },
  {
    label: 'Services (canonical mapping)',
    colors: [
      { name: 'one-way', label: 'One-Way', var: 'bg-[var(--service-one-way)]', fg: 'text-[var(--service-one-way-fg)]' },
      { name: 'tow', label: 'Tow Truck', var: 'bg-[var(--service-tow)]', fg: 'text-[var(--service-tow-fg)]' },
      { name: 'chauffeur', label: 'Chauffeur', var: 'bg-[var(--service-chauffeur)]', fg: 'text-[var(--service-chauffeur-fg)]' },
      { name: 'package', label: 'Package', var: 'bg-[var(--service-package)]', fg: 'text-[var(--service-package-fg)]' },
      { name: 'ad', label: 'Advertising', var: 'bg-[var(--service-ad)]', fg: 'text-[var(--service-ad-fg)]' },
    ],
  },
  {
    label: 'Status',
    colors: [
      { name: 'success', label: 'Success', var: 'bg-success', fg: 'text-success-foreground' },
      { name: 'warning', label: 'Warning', var: 'bg-warning', fg: 'text-warning-foreground' },
      { name: 'destructive', label: 'Error', var: 'bg-destructive', fg: 'text-destructive-foreground' },
      { name: 'info', label: 'Info', var: 'bg-info', fg: 'text-info-foreground' },
    ],
  },
  {
    label: 'Surfaces',
    colors: [
      { name: 'background', label: 'Background', var: 'bg-background', fg: 'text-foreground', border: true },
      { name: 'card', label: 'Card', var: 'bg-card', fg: 'text-card-foreground', border: true },
      { name: 'muted', label: 'Muted', var: 'bg-muted', fg: 'text-muted-foreground' },
      { name: 'accent', label: 'Accent', var: 'bg-accent', fg: 'text-accent-foreground' },
    ],
  },
]

function ColorShowcase() {
  return (
    <div className="space-y-6">
      {colorGroups.map((group) => (
        <div key={group.label} className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">{group.label}</h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {group.colors.map((c) => (
              <div
                key={c.name}
                className={`overflow-hidden rounded-xl border border-border ${c.border ? '' : ''}`}
              >
                <div className={`${c.var} ${c.fg} flex h-16 items-center justify-center text-xs font-medium`}>
                  {c.label}
                </div>
                <div className="bg-card px-3 py-2 text-[10px] font-mono text-muted-foreground">
                  {c.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Typography showcase ──
const typeScale = [
  { token: 'display', size: 'var(--text-display)', lh: 'var(--text-display-lh)', sample: 'Premium mobility, redefined', className: 'text-[length:var(--text-display)] leading-[var(--text-display-lh)] font-bold tracking-tight' },
  { token: 'h1', size: 'var(--text-h1)', lh: 'var(--text-h1-lh)', sample: 'Where would you like to go?', className: 'text-[length:var(--text-h1)] leading-[var(--text-h1-lh)] font-bold tracking-tight' },
  { token: 'h2', size: 'var(--text-h2)', lh: 'var(--text-h2-lh)', sample: 'Your active ride', className: 'text-[length:var(--text-h2)] leading-[var(--text-h2-lh)] font-semibold tracking-tight' },
  { token: 'h3', size: 'var(--text-h3)', lh: 'var(--text-h3-lh)', sample: 'Service options', className: 'text-[length:var(--text-h3)] leading-[var(--text-h3-lh)] font-semibold' },
  { token: 'h4', size: 'var(--text-h4)', lh: 'var(--text-h4-lh)', sample: 'Trip summary', className: 'text-[length:var(--text-h4)] leading-[var(--text-h4-lh)] font-medium' },
  { token: 'body', size: 'var(--text-body)', lh: 'var(--text-body-lh)', sample: 'Your driver is on the way and will arrive in approximately 3 minutes.', className: 'text-[length:var(--text-body)] leading-[var(--text-body-lh)]' },
  { token: 'sm', size: 'var(--text-sm)', lh: 'var(--text-sm-lh)', sample: 'Estimated fare: $32.50 · 2.8 mi · 18 min', className: 'text-[length:var(--text-sm)] leading-[var(--text-sm-lh)] text-muted-foreground' },
  { token: 'caption', size: 'var(--text-caption)', lh: 'var(--text-caption-lh)', sample: 'Last updated 2 min ago', className: 'text-[length:var(--text-caption)] leading-[var(--text-caption-lh)] text-muted-foreground' },
  { token: 'overline', size: 'var(--text-overline)', lh: 'var(--text-overline-lh)', sample: 'PREMIUM SERVICE', className: 'text-[length:var(--text-overline)] leading-[var(--text-overline-lh)] font-semibold uppercase tracking-wider text-muted-foreground' },
]

function TypographyShowcase() {
  return (
    <div className="space-y-1">
      {typeScale.map((t) => (
        <div
          key={t.token}
          className="flex flex-col gap-1 border-b border-border py-4 last:border-0 sm:flex-row sm:items-baseline sm:gap-6"
        >
          <div className="w-28 shrink-0 font-mono text-xs text-muted-foreground">
            {t.token}
            <div className="text-[10px] opacity-60">{t.size}</div>
          </div>
          <div className={`flex-1 ${t.className}`}>{t.sample}</div>
        </div>
      ))}
    </div>
  )
}

// ── Motion showcase ──
const motionTokens = [
  { token: '--duration-instant', value: '80ms', use: 'Hover states, toggles' },
  { token: '--duration-fast', value: '150ms', use: 'Small UI feedback' },
  { token: '--duration-normal', value: '220ms', use: 'Standard transitions' },
  { token: '--duration-slow', value: '320ms', use: 'Page/element enter' },
  { token: '--duration-slower', value: '480ms', use: 'Complex choreography' },
]

const easings = [
  { token: '--ease-out', value: 'cubic-bezier(0.22, 1, 0.36, 1)', use: 'Default — decelerating' },
  { token: '--ease-in-out', value: 'cubic-bezier(0.65, 0, 0.35, 1)', use: 'Symmetric' },
  { token: '--ease-spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', use: 'Playful overshoot' },
]

function MotionShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Durations</h4>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-2 font-medium">Token</th>
                <th className="px-4 py-2 font-medium">Value</th>
                <th className="px-4 py-2 font-medium">Use case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {motionTokens.map((m) => (
                <tr key={m.token}>
                  <td className="px-4 py-2 font-mono text-xs">{m.token}</td>
                  <td className="px-4 py-2 font-mono text-xs">{m.value}</td>
                  <td className="px-4 py-2 text-muted-foreground">{m.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Easings</h4>
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-2 font-medium">Token</th>
                <th className="px-4 py-2 font-medium">Value</th>
                <th className="px-4 py-2 font-medium">Use case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {easings.map((e) => (
                <tr key={e.token}>
                  <td className="px-4 py-2 font-mono text-xs">{e.token}</td>
                  <td className="px-4 py-2 font-mono text-xs">{e.value}</td>
                  <td className="px-4 py-2 text-muted-foreground">{e.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Animation demos</h4>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all-eer hover:scale-105 active:scale-95">
            transition-all-eer
          </button>
          <div className="rounded-lg border border-border bg-card px-4 py-2 spring-in text-sm font-medium">
            spring-in
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-2 slide-up text-sm font-medium">
            slide-up
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-2 fade-in text-sm font-medium">
            fade-in
          </div>
        </div>
      </div>
    </div>
  )
}

// ── States showcase ──
function StatesShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Loading (skeleton)</h4>
        <div className="rounded-xl border border-border bg-card p-4">
          <EerSkeletonList count={2} />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Loading (spinner)</h4>
        <div className="rounded-xl border border-border bg-card">
          <EerState state="loading" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Empty</h4>
        <div className="rounded-xl border border-border bg-card">
          <EerState
            state="empty"
            title="No rides yet"
            description="Book your first ride to see it here."
            actionLabel="Book a ride"
            onAction={() => {}}
          />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Error</h4>
        <div className="rounded-xl border border-border bg-card">
          <EerState
            state="error"
            title="Couldn't load rides"
            description="Check your connection and try again."
            actionLabel="Retry"
            onAction={() => {}}
          />
        </div>
      </div>
      <div className="space-y-2 sm:col-span-2">
        <h4 className="text-sm font-medium text-muted-foreground">Success</h4>
        <div className="rounded-xl border border-border bg-card">
          <EerState
            state="success"
            title="Ride booked!"
            description="Your driver will arrive in 4 minutes."
          />
        </div>
      </div>
    </div>
  )
}

// ── Main foundation view ──
export function FoundationView({ section }: { section: 'colors' | 'typography' | 'motion' | 'states' | 'overview' }) {
  if (section === 'overview') {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/60 p-6 text-primary-foreground">
          <Sparkles className="size-8 opacity-80" />
          <h2 className="mt-3 text-2xl font-bold">Design System Foundation</h2>
          <p className="mt-1 max-w-lg text-sm opacity-90">
            The canonical source of truth for colors, typography, motion, and interaction states.
            Every pattern in this UI Kit is built on these tokens.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Layers, title: 'Colors', desc: 'Semantic tokens, service mapping', section: 'colors' as const },
            { icon: Type, title: 'Typography', desc: 'Systematic type scale', section: 'typography' as const },
            { icon: Zap, title: 'Motion', desc: 'Durations & easings', section: 'motion' as const },
            { icon: Sparkles, title: 'States', desc: 'Loading, empty, error, success', section: 'states' as const },
          ].map((item) => (
            <div
              key={item.title}
              className="cursor-pointer rounded-xl border border-border bg-card p-5 transition-all-eer hover:border-primary/40 hover:shadow-md"
            >
              <item.icon className="size-6 text-primary" />
              <h3 className="mt-3 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const titles = {
    colors: { title: 'Color System', desc: 'Semantic tokens with full light/dark ramps. Service colors map 1:1 to journey types.' },
    typography: { title: 'Typography', desc: 'Geist Sans/Mono with a systematic type scale.' },
    motion: { title: 'Motion', desc: 'Standardized durations and easings for micro-interactions.' },
    states: { title: 'State System', desc: 'Every interactive surface handles loading, empty, error, and success.' },
  }
  const { title, desc } = titles[section]

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>
      {section === 'colors' && <ColorShowcase />}
      {section === 'typography' && <TypographyShowcase />}
      {section === 'motion' && <MotionShowcase />}
      {section === 'states' && <StatesShowcase />}
    </div>
  )
}
