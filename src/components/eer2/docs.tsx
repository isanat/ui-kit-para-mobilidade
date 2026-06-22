'use client'

import { Check, X, ArrowRight, BookOpen, Shield, Zap, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Migration mapping: eagleeyerides screen → UI Kit pattern ──
const migrationMap = [
  { eer: 'LandingView.vue', pattern: 'P1 Landing', screens: 1 },
  { eer: 'UserTypeSelector, LoginForm, SignupForm, ForgotPassword, ResetPassword', pattern: 'P2 Authentication', screens: 5 },
  { eer: 'HomeView.vue', pattern: 'P3 Home Dashboard', screens: 1 },
  { eer: 'ReserveViewNew, ChauffeurServiceView, ChauffeurVehiclesView, ChauffeurConfirmationView, PackagesView', pattern: 'P4 Booking Wizard', screens: 5 },
  { eer: 'MapView, BookingMapView', pattern: 'P5 Map & Selection', screens: 2 },
  { eer: 'PaymentView, PayBookingView, PayOvertimeView, DriverTowTruckView, AdvertisingView', pattern: 'P6 Payment Checkout', screens: 5 },
  { eer: 'BookingsView, PaymentsView, PointsView, ReferralsView, TipsHistoryView', pattern: 'P7 List & Detail', screens: 5 },
  { eer: 'ChatView, DriverChatView', pattern: 'P8 Chat', screens: 2 },
  { eer: 'AccountView, DriverAccountView', pattern: 'P9 Account & Settings', screens: 2 },
  { eer: 'DriverDashboardView', pattern: 'D1 Driver Dashboard', screens: 1 },
  { eer: 'DriverRidesView', pattern: 'D2 Rides List', screens: 1 },
  { eer: 'DriverEarningsView, DriverWithdrawalsView', pattern: 'D3 Earnings & Withdrawal', screens: 2 },
  { eer: 'DriverSettingsView', pattern: 'D4 Driver Settings', screens: 1 },
  { eer: 'admin/dashboard', pattern: 'A1 Admin Dashboard', screens: 1 },
  { eer: 'admin/users, drivers, bookings, chauffeur-bookings, packages, payments, withdrawals, coupons, ratings, tips-report, cancellations, reassignments', pattern: 'A2 Data Table', screens: 12 },
  { eer: 'admin/dispatch, surge, cancellation-policy, driver-earnings, settings', pattern: 'A3 Configuration Page', screens: 5 },
  { eer: 'admin/sos, safety', pattern: 'A4 Alert Triage', screens: 2 },
  { eer: 'admin/userEdit, driverEdit, advertisements/detail, driversAvailable', pattern: 'A5 Detail & Edit', screens: 4 },
]

// ── Quality checklist: 22 UX errors in eagleeyerides → UI Kit fix ──
const qualityChecklist = [
  { error: 'Bottom nav duplicated (rendered 2× on 15 screens)', fix: 'EerShell renders nav once globally. Patterns never include their own nav.' },
  { error: 'No shared header component (8 different header colors)', fix: 'Canonical service color mapping. Each service has ONE color. Headers use design tokens.' },
  { error: 'UI Kit components ignored (Toast, EmptyState, LoadingSpinner never used)', fix: 'EerState component handles all 4 states. Every pattern uses it. No hand-rolled spinners.' },
  { error: '4 different feedback patterns (SweetAlert, alert(), inline, toast)', fix: 'Single EerState success/error pattern. No alert() or swal anywhere.' },
  { error: 'Square payment duplicated 4×', fix: 'P6 Payment pattern is the single source. One form, one flow, tip selection built-in.' },
  { error: '3 different progress bar patterns', fix: 'P4 Booking Wizard has one unified progress bar. All multi-step flows use it.' },
  { error: 'Chat 95% duplicated (ChatView ≈ DriverChatView)', fix: 'P8 Chat is ONE component. Passenger/driver differ only by accent color prop.' },
  { error: 'Dark mode inconsistent (bg-gray-50 vs dark:bg-gray-900 vs dark:bg-gray-950)', fix: 'Semantic surface tokens: bg-background, bg-card, bg-muted. Dark mode is automatic via tokens.' },
  { error: 'Back navigation chaotic ($router.push, back(), go(-1), window.location.href)', fix: 'Patterns use shell navigation. No window.location.href. No $router.go(-1).' },
  { error: 'No global 401/auth-expiry handling', fix: 'I18nProvider + shell state manages auth. Patterns receive state via props.' },
  { error: 'No standardized loading/empty/error states', fix: 'AppState type (loading/empty/error/success/populated). Every pattern implements all 5.' },
  { error: 'Orphan routes (Withdrawals, TowTruck not in nav)', fix: 'All patterns are in the sidebar. No orphans. Driver nav has all 5 tabs.' },
  { error: 'City Confirmation friction in ReserveViewNew', fix: 'P4 Booking Wizard uses clean autocomplete. No forced confirmation step.' },
  { error: 'Facebook Pixel inlined 4×', fix: 'Analytics handled at app level (layout.tsx). Patterns never inline scripts.' },
  { error: 'Two different map integration patterns', fix: 'P5 Map & Selection is the single map pattern. Stylized placeholder for UI Kit.' },
  { error: 'Hardcoded fallbacks (chauffeur vehicles, min withdrawal $50, fee 2.5%)', fix: 'All data in mock/data.ts. Single source of truth. No duplicated fallbacks.' },
  { error: 'Debug code in production (console.logs with emoji)', fix: 'No console.logs. No debug code. Clean production patterns.' },
  { error: 'Withdrawal BottomSheet duplicated (Earnings + Withdrawals)', fix: 'D3 Earnings has one withdrawal sheet. Not duplicated.' },
  { error: 'Theme toggle inconsistent (per-page toggles)', fix: 'One ThemeToggle in shell topbar. Persists via next-themes.' },
  { error: 'Terms/Privacy with hardcoded "January 2025"', fix: 'Static content uses current date. No hardcoded dates.' },
  { error: 'No touch target standard (buttons too small)', fix: 'All interactive elements ≥36px (size-9). Mobile-first.' },
  { error: 'pb-24 / pb-36 chaos (content hidden behind fixed bars)', fix: 'Semantic layout tokens: pb-nav, pb-action-bar, pb-safe. No magic numbers.' },
]

// ── UX Principles ──
const principles = [
  {
    icon: Shield,
    title: 'States are not optional',
    principle: 'Every data-driven surface handles loading, empty, error, and success.',
    detail: 'A screen that only shows the "happy path" is unfinished. Users encounter empty states on first use, loading states on every fetch, and error states when networks fail. The AppState type enforces this — no pattern ships without all 5 states.',
  },
  {
    icon: Layers,
    title: 'One pattern, many screens',
    principle: 'Canonical patterns replace one-off designs. 18 patterns cover 65 screens.',
    detail: 'When every screen is designed from scratch, inconsistency creeps in. By mapping 65 eagleeyerides screens to 18 canonical patterns, we ensure visual consistency, reduce code, and make maintenance trivial. A programmer fixing a bug in the "list pattern" fixes it for 5 screens at once.',
  },
  {
    icon: Zap,
    title: 'Tokens, not raw colors',
    principle: 'Design tokens are the only valid way to reference colors, spacing, and motion.',
    detail: 'Raw Tailwind classes (bg-blue-500, text-gray-900) create technical debt and dark-mode bugs. Semantic tokens (bg-primary, text-foreground, bg-card) adapt automatically to theme changes and ensure consistency. The service color mapping (one-way=blue, tow=gold, chauffeur=magenta, package=amber, ad=cyan) is canonical — never deviate.',
  },
  {
    icon: BookOpen,
    title: 'Mobile-first, always',
    principle: 'Design for 375px first. Desktop is an enhancement, not the default.',
    detail: 'Eagle Eye Rides is a mobile app. Every passenger and driver pattern is designed for a phone frame. Touch targets are ≥36px. Bottom navs respect safe-area insets. Fixed action bars use semantic spacing tokens. Desktop admin patterns are the exception, not the rule.',
  },
]

function DocsOverview() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/60 p-6 text-primary-foreground">
        <BookOpen className="size-8 opacity-80" />
        <h2 className="mt-3 text-2xl font-bold">UI Kit Documentation</h2>
        <p className="mt-1 max-w-2xl text-sm opacity-90">
          The complete reference for redesigning Eagle Eye Rides. This UI Kit replaces the
          current eagleeyerides frontend — which was built hastily by multiple designers with
          inconsistent patterns — with a cohesive, state-of-the-art design system.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Shield, title: 'UX Principles', desc: 'The "why" behind every decision', section: 'principles' },
          { icon: Layers, title: 'Pattern Catalog', desc: '18 patterns → 65 screens', section: 'patterns' },
          { icon: ArrowRight, title: 'Migration Guide', desc: 'eagleeyerides → UI Kit mapping', section: 'migration' },
          { icon: Check, title: 'Quality Checklist', desc: '22 errors fixed', section: 'checklist' },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-border bg-card p-5">
            <item.icon className="size-6 text-primary" />
            <h3 className="mt-3 font-semibold">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">How to use this UI Kit</h3>
        <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li><strong className="text-foreground">1. Browse patterns</strong> — Use the sidebar to explore the 18 canonical patterns across Passenger, Driver, and Admin journeys.</li>
          <li><strong className="text-foreground">2. Test states</strong> — Use the state selector (top bar) to see each pattern in loading, empty, error, success, and populated states.</li>
          <li><strong className="text-foreground">3. Switch language</strong> — Toggle EN / PT-BR to verify bilingual support. English is the native language.</li>
          <li><strong className="text-foreground">4. Read the migration guide</strong> — Map each eagleeyerides screen to its UI Kit pattern before starting implementation.</li>
          <li><strong className="text-foreground">5. Follow the checklist</strong> — Ensure your implementation avoids the 22 UX errors found in the original eagleeyerides.</li>
        </ol>
      </div>
    </div>
  )
}

function DocsPrinciples() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">UX Principles</h2>
        <p className="mt-1 text-sm text-muted-foreground">The foundational principles behind every pattern in this UI Kit.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <p.icon className="size-5" />
              </div>
              <h3 className="font-semibold">{p.title}</h3>
            </div>
            <p className="mt-3 text-sm font-medium text-foreground">{p.principle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function DocsMigration() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Migration Guide</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Map each eagleeyerides screen to its UI Kit pattern. 65 screens → 18 patterns.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">eagleeyerides Screen(s)</th>
              <th className="px-4 py-3 font-medium"></th>
              <th className="px-4 py-3 font-medium">UI Kit Pattern</th>
              <th className="px-4 py-3 text-right font-medium">Screens</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {migrationMap.map((m, i) => (
              <tr key={i} className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{m.eer}</td>
                <td className="px-4 py-3"><ArrowRight className="size-4 text-primary" /></td>
                <td className="px-4 py-3 font-medium">{m.pattern}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{m.screens}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-muted/50 font-medium">
            <tr>
              <td className="px-4 py-3" colSpan={3}>Total screens covered</td>
              <td className="px-4 py-3 text-right">{migrationMap.reduce((s, m) => s + m.screens, 0)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

function DocsChecklist() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Quality Checklist</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          22 UX errors found in the current eagleeyerides — and how this UI Kit fixes each one.
          Use this as a code review checklist when implementing.
        </p>
      </div>
      <div className="space-y-3">
        {qualityChecklist.map((item, i) => (
          <div key={i} className="flex gap-4 rounded-xl border border-border bg-card p-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <X className="size-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground line-through decoration-destructive/50">
                {item.error}
              </p>
            </div>
            <div className="hidden flex-1 border-l border-border pl-4 sm:block">
              <div className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                <p className="text-sm text-muted-foreground">{item.fix}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DocsPatterns() {
  const patterns = [
    { id: 'P1', name: 'Landing / Marketing', category: 'Passenger', covers: 'LandingView' },
    { id: 'P2', name: 'Authentication', category: 'Passenger', covers: '5 auth screens' },
    { id: 'P3', name: 'Home Dashboard', category: 'Passenger', covers: 'HomeView' },
    { id: 'P4', name: 'Booking Wizard', category: 'Passenger', covers: 'Reserve, Chauffeur×3, Packages' },
    { id: 'P5', name: 'Map & Selection', category: 'Passenger', covers: 'MapView, BookingMapView' },
    { id: 'P6', name: 'Payment Checkout', category: 'Passenger', covers: '5 payment screens' },
    { id: 'P7', name: 'List & Detail', category: 'Passenger', covers: 'Bookings, Payments, Points, Referrals, Tips' },
    { id: 'P8', name: 'Chat', category: 'Passenger', covers: 'ChatView, DriverChatView' },
    { id: 'P9', name: 'Account & Settings', category: 'Passenger', covers: 'AccountView, DriverAccountView' },
    { id: 'D1', name: 'Driver Dashboard', category: 'Driver', covers: 'DriverDashboardView' },
    { id: 'D2', name: 'Rides List', category: 'Driver', covers: 'DriverRidesView' },
    { id: 'D3', name: 'Earnings & Withdrawal', category: 'Driver', covers: '2 earnings screens' },
    { id: 'D4', name: 'Driver Settings', category: 'Driver', covers: 'DriverSettingsView' },
    { id: 'A1', name: 'Admin Dashboard', category: 'Admin', covers: 'admin/dashboard' },
    { id: 'A2', name: 'Data Table', category: 'Admin', covers: '12 admin list pages' },
    { id: 'A3', name: 'Configuration Page', category: 'Admin', covers: '5 config pages' },
    { id: 'A4', name: 'Alert Triage', category: 'Admin', covers: 'SOS, Safety' },
    { id: 'A5', name: 'Detail & Edit', category: 'Admin', covers: '4 edit/detail pages' },
  ]
  const catColors: Record<string, string> = {
    Passenger: 'bg-primary/10 text-primary',
    Driver: 'bg-success/10 text-success',
    Admin: 'bg-magenta/10 text-magenta',
  }
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Pattern Catalog</h2>
        <p className="mt-1 text-sm text-muted-foreground">18 canonical patterns. Each has 5 interactive states and covers multiple eagleeyerides screens.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {patterns.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-4 transition-all-eer hover:border-primary/30">
            <div className="flex items-center justify-between">
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">{p.id}</span>
              <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', catColors[p.category])}>{p.category}</span>
            </div>
            <h3 className="mt-2 font-semibold text-sm">{p.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Covers: {p.covers}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DocsView({ section }: { section: 'overview' | 'principles' | 'patterns' | 'migration' | 'checklist' }) {
  if (section === 'overview') return <DocsOverview />
  if (section === 'principles') return <DocsPrinciples />
  if (section === 'patterns') return <DocsPatterns />
  if (section === 'migration') return <DocsMigration />
  if (section === 'checklist') return <DocsChecklist />
  return null
}
