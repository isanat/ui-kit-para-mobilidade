'use client'

import { Truck, Eye, Navigation, Sparkles } from 'lucide-react'

// ═══════════════════════════════════════════════════════════════
// BRAND — Eagle Eye Rides identity foundation
// Modernismo Funcional com Toques Orgânicos
// ═══════════════════════════════════════════════════════════════

const brandAdjectives = ['Efficient', 'Intuitive', 'Modern']

const colorPalette = [
  { name: 'Signature Blue', value: 'oklch(0.62 0.18 262)', var: 'bg-primary', desc: 'Trust + technology + energy' },
  { name: 'Soft Green', value: 'oklch(0.68 0.13 160)', var: 'bg-success', desc: 'Success, positivity, calm' },
  { name: 'Warm Amber', value: 'oklch(0.74 0.14 70)', var: 'bg-warning', desc: 'Alerts, attention, warmth' },
  { name: 'Deep Navy', value: 'oklch(0.21 0.035 262)', var: 'bg-foreground', desc: 'Text, primary actions' },
  { name: 'Cool Gray', value: 'oklch(0.96 0.006 255)', var: 'bg-muted', desc: 'Backgrounds, surfaces' },
]

const designPrinciples = [
  { title: 'Clarity & Legibility', desc: 'Direct, easy-to-consume information with defined typography and adequate contrast.' },
  { title: 'Efficiency & Performance', desc: 'Optimized for fast loading and fluid interactions — essential for a PWA.' },
  { title: 'Inclusive Accessibility', desc: 'Colors, font sizes, and interactive elements usable by everyone.' },
  { title: 'Refined Aesthetics', desc: 'Generous spacing, elegant typography, harmonious palette — professional and modern.' },
]

export function BrandView({ section }: { section: 'overview' | 'essence' | 'colors' | 'logo' }) {
  if (section === 'overview') {
    return (
      <div className="space-y-8">
        {/* Hero */}
        <div className="eer-card-elevated overflow-hidden p-8">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
              <Eye className="size-7" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Brand Identity</p>
              <h1 className="eer-display text-3xl text-foreground">Eagle Eye Rides</h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Smart, efficient mobility for the modern urban user — differentiated by its intuitive interface and fluid user experience.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {brandAdjectives.map((adj) => (
              <span key={adj} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-foreground">
                {adj}
              </span>
            ))}
          </div>
        </div>

        {/* Brand voice */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="eer-card-elevated p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Headline</p>
            <p className="eer-display mt-2 text-xl leading-snug text-foreground">
              Your journey, simplified. Discover urban mobility, reinvented.
            </p>
          </div>
          <div className="eer-card-elevated p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Call to Action</p>
            <p className="eer-display mt-2 text-xl leading-snug text-foreground">
              Start your journey now.
            </p>
          </div>
        </div>

        {/* Design principles */}
        <div>
          <h2 className="eer-display mb-4 text-lg text-foreground">Design Principles</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {designPrinciples.map((p) => (
              <div key={p.title} className="eer-card-elevated p-5">
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Approach */}
        <div className="eer-card-elevated p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <h2 className="eer-display text-lg text-foreground">Design Approach</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Functional Modernism with Organic Touches.</strong> Combines the clarity and efficiency of modernism with softer, natural visual elements — creating an experience that is both sophisticated and welcoming. Functionality is paramount, but aesthetics are not sacrificed, seeking a balance between form and function.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Inspired by the simplicity and usability of modern design, but incorporating textures, shapes, and transitions that evoke nature and fluidity — avoiding the excessive coldness of pure minimalism. Focus on legibility, clear hierarchy, and intuitive interactions, with a touch of warmth and humanity.
          </p>
        </div>
      </div>
    )
  }

  if (section === 'colors') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="eer-display text-2xl text-foreground">Color Philosophy</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A sober, professional palette — blues and grays as the base, complemented by soft green for success and warm amber for alerts. Strategic use to guide the eye and highlight important information.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colorPalette.map((c) => (
            <div key={c.name} className="eer-card-elevated overflow-hidden">
              <div className={`${c.var} h-24`} />
              <div className="p-4">
                <h3 className="font-semibold text-foreground">{c.name}</h3>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{c.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="eer-card-elevated p-6">
          <h2 className="font-semibold text-foreground">Signature Brand Color</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A deep, vibrant blue — <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">oklch(0.62 0.18 262)</code> — that conveys trust and technology, with a touch of energy. Used as the primary color for interactive elements and highlights.
          </p>
          <div className="mt-4 flex items-center gap-4 rounded-xl bg-primary p-6 text-primary-foreground">
            <div className="size-12 rounded-lg bg-primary-foreground/20" />
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80">Primary</p>
              <p className="eer-display text-2xl">#Royal Blue</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'logo') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="eer-display text-2xl text-foreground">Wordmark & Logo</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            An abstract, dynamic logo referencing movement and vision — a stylized eye or route symbol, in blue and green tones. The wordmark is clean and modern, complementing the symbol.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Logo concept 1: Eye + Route */}
          <div className="eer-card-elevated p-8">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Eye className="size-10" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">The Eye</h3>
            <p className="mt-1 text-sm text-muted-foreground">Vision, awareness, safety — watching over every journey.</p>
          </div>
          {/* Logo concept 2: Route */}
          <div className="eer-card-elevated p-8">
            <div className="flex size-20 items-center justify-center rounded-2xl bg-success text-success-foreground shadow-lg">
              <Navigation className="size-10" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">The Route</h3>
            <p className="mt-1 text-sm text-muted-foreground">Movement, direction, flow — the path from A to B.</p>
          </div>
        </div>
        <div className="eer-card-elevated p-8">
          <h2 className="eer-display text-lg text-foreground">Wordmark</h2>
          <p className="mt-1 text-sm text-muted-foreground">Clean and modern, complementing the symbol.</p>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-background p-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Truck className="size-5" />
            </div>
            <span className="eer-display text-2xl text-foreground">Eagle Eye Rides</span>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'essence') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="eer-display text-2xl text-foreground">Brand Essence</h1>
          <p className="mt-1 text-sm text-muted-foreground">The core of what Eagle Eye Rides represents.</p>
        </div>
        <div className="eer-card-elevated p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mission</p>
          <p className="eer-display mt-2 text-2xl leading-snug text-foreground">
            Smart, efficient mobility for the modern urban user.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Eagle Eye Rides is differentiated by its intuitive interface and fluid user experience. We serve the modern urban user who values time, clarity, and reliability — across multiple mobility services: rides, tow trucks, chauffeurs, and package delivery.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {brandAdjectives.map((adj, i) => (
            <div key={adj} className="eer-card-elevated p-6 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="eer-display text-lg">{i + 1}</span>
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{adj}</h3>
            </div>
          ))}
        </div>
        <div className="eer-card-elevated p-6">
          <h2 className="font-semibold text-foreground">Interaction Philosophy</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Interactions must be responsive, intuitive, and provide clear feedback. The user should feel in full control of the interface, with smooth transitions and micro-interactions that make the experience more pleasant and efficient. Focus on minimizing friction and maximizing usability.
          </p>
        </div>
        <div className="eer-card-elevated p-6">
          <h2 className="font-semibold text-foreground">Animation</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Animation is used sparingly and with purpose. State transitions (loading, success, error) are fast and informative. Hover effects on buttons and links have a short duration (150-200ms) with ease-out. Modals and drawers have more elaborate entry/exit animations (250-350ms) to clearly indicate the context change. <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">transform</code> and <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">opacity</code> are prioritized for performance.
          </p>
        </div>
      </div>
    )
  }

  return null
}
