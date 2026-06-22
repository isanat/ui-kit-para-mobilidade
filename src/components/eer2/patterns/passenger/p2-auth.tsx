'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  User,
  Car,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { EerSkeleton } from '../../state'
import type { PatternProps } from '../types'

type UserType = 'passenger' | 'driver'
type Step = 0 | 1 | 2 | 3

// ── Brand header ──
function AuthBrand() {
  return (
    <div className="flex items-center gap-2 text-primary-foreground">
      <div className="flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
        <Truck className="size-5" />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-bold">Eagle Eye Rides</div>
        <div className="text-[10px] opacity-70">Premium Urban Mobility</div>
      </div>
    </div>
  )
}

// ── Back button ──
function BackButton({ onClick, visible }: { onClick: () => void; visible: boolean }) {
  if (!visible) return <div className="size-9" aria-hidden />
  return (
    <button
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full bg-white/10 text-primary-foreground backdrop-blur-sm transition-base hover:bg-white/20"
      aria-label="Back"
    >
      <ArrowLeft className="size-4" />
    </button>
  )
}

// ── Step 0: User type selector ──
function UserTypeSelector({ onSelect }: { onSelect: (type: UserType) => void }) {
  const cards: { type: UserType; icon: LucideIcon; title: string; desc: string }[] = [
    { type: 'passenger', icon: User, title: 'Passenger', desc: 'Book luxury rides & deliveries' },
    { type: 'driver', icon: Car, title: 'Driver', desc: 'Drive & earn with premium fleet' },
  ]
  return (
    <div className="space-y-5 slide-up">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">Welcome</h2>
        <p className="text-sm text-muted-foreground">Choose how you'll ride with us today.</p>
      </div>
      <div className="space-y-3">
        {cards.map((c) => (
          <button
            key={c.type}
            onClick={() => onSelect(c.type)}
            className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-all-eer hover:border-primary/40 hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <c.icon className="size-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </div>
            <ArrowRight className="size-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Field wrapper ──
function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-foreground">
        {label}
      </Label>
      {children}
    </div>
  )
}

// ── Error banner ──
function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive fade-in"
    >
      <AlertCircle className="size-4 shrink-0" />
      <span>{message}</span>
    </div>
  )
}

// ── Step 1: Login ──
function LoginForm({
  userType,
  submitting,
  onForgot,
  onCreate,
  onSubmit,
}: {
  userType: UserType
  submitting: boolean
  onForgot: () => void
  onCreate: () => void
  onSubmit: () => void
}) {
  const [showPwd, setShowPwd] = useState(false)
  return (
    <div className="space-y-4 slide-up">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">Sign in</h2>
        <p className="text-sm text-muted-foreground">
          {userType === 'passenger' ? 'Welcome back, rider.' : 'Welcome back, driver.'}
        </p>
      </div>
      <Field id="login-email" label="Email">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="login-email"
            type="email"
            placeholder="you@email.com"
            className="h-10 pl-9"
            autoComplete="email"
          />
        </div>
      </Field>
      <Field id="login-password" label="Password">
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="login-password"
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            className="h-10 pl-9 pr-9"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-base hover:text-foreground"
            aria-label={showPwd ? 'Hide password' : 'Show password'}
          >
            {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Field>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-xs text-muted-foreground">
            Remember me
          </Label>
        </div>
        <button
          type="button"
          onClick={onForgot}
          className="text-xs font-medium text-primary transition-base hover:text-primary/80"
        >
          Forgot password?
        </button>
      </div>
      <Button onClick={onSubmit} disabled={submitting} size="lg" className="w-full">
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing in…
          </>
        ) : (
          'Sign In'
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{' '}
        <button
          onClick={onCreate}
          className="font-medium text-primary transition-base hover:text-primary/80"
        >
          Create one
        </button>
      </p>
    </div>
  )
}

// ── Step 2: Signup ──
function SignupForm({
  userType,
  submitting,
  onLogin,
  onSubmit,
}: {
  userType: UserType
  submitting: boolean
  onLogin: () => void
  onSubmit: () => void
}) {
  const [showPwd, setShowPwd] = useState(false)
  const [agree, setAgree] = useState(false)
  return (
    <div className="space-y-4 slide-up">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">Create account</h2>
        <p className="text-sm text-muted-foreground">
          {userType === 'passenger' ? 'Start riding in minutes.' : 'Join our premium driver fleet.'}
        </p>
      </div>
      <Field id="su-name" label="Full name">
        <Input id="su-name" type="text" placeholder="Sarah Mitchell" className="h-10" autoComplete="name" />
      </Field>
      <Field id="su-email" label="Email">
        <Input id="su-email" type="email" placeholder="you@email.com" className="h-10" autoComplete="email" />
      </Field>
      <Field id="su-phone" label="Phone">
        <Input id="su-phone" type="tel" placeholder="+1 (415) 555-0142" className="h-10" autoComplete="tel" />
      </Field>
      <Field id="su-password" label="Password">
        <div className="relative">
          <Input
            id="su-password"
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            className="h-10 pr-9"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-base hover:text-foreground"
            aria-label={showPwd ? 'Hide password' : 'Show password'}
          >
            {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Field>
      <Field id="su-confirm" label="Confirm password">
        <Input
          id="su-confirm"
          type="password"
          placeholder="••••••••"
          className="h-10"
          autoComplete="new-password"
        />
      </Field>

      {/* Driver-only vehicle fields */}
      {userType === 'driver' && (
        <div className="space-y-3 rounded-xl border border-border bg-secondary/30 p-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Car className="size-3.5 text-primary" /> Vehicle details
          </p>
          <Field id="su-vehicle" label="Vehicle model">
            <Input id="su-vehicle" type="text" placeholder="Cadillac Escalade" className="h-10" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field id="su-plate" label="Plate">
              <Input id="su-plate" type="text" placeholder="NYC-4821" className="h-10" />
            </Field>
            <Field id="su-color" label="Color">
              <Input id="su-color" type="text" placeholder="Black" className="h-10" />
            </Field>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2">
        <Checkbox
          id="terms"
          checked={agree}
          onCheckedChange={(v) => setAgree(v === true)}
          className="mt-0.5"
        />
        <Label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground">
          I agree to the{' '}
          <span className="font-medium text-primary">Terms of Service</span> and{' '}
          <span className="font-medium text-primary">Privacy Policy</span>.
        </Label>
      </div>
      <Button onClick={onSubmit} disabled={submitting || !agree} size="lg" className="w-full">
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Creating account…
          </>
        ) : (
          'Create Account'
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Already have an account?{' '}
        <button
          onClick={onLogin}
          className="font-medium text-primary transition-base hover:text-primary/80"
        >
          Sign in
        </button>
      </p>
    </div>
  )
}

// ── Step 3: Forgot password ──
function ForgotForm({
  submitting,
  onBackToLogin,
  onSubmit,
}: {
  submitting: boolean
  onBackToLogin: () => void
  onSubmit: () => void
}) {
  return (
    <div className="space-y-4 slide-up">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">Reset password</h2>
        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>
      <Field id="fp-email" label="Email">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="fp-email"
            type="email"
            placeholder="you@email.com"
            className="h-10 pl-9"
            autoComplete="email"
          />
        </div>
      </Field>
      <Button onClick={onSubmit} disabled={submitting} size="lg" className="w-full">
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending link…
          </>
        ) : (
          'Send Reset Link'
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Remembered it?{' '}
        <button
          onClick={onBackToLogin}
          className="font-medium text-primary transition-base hover:text-primary/80"
        >
          Back to sign in
        </button>
      </p>
    </div>
  )
}

// ── Success screen ──
function AuthSuccess({ step }: { step: Step }) {
  const config: Record<Step, { title: string; desc: string; icon: LucideIcon }> = {
    0: { title: 'Welcome!', desc: "You're all set.", icon: CheckCircle2 },
    1: { title: 'Welcome back!', desc: 'You have successfully signed in.', icon: CheckCircle2 },
    2: {
      title: 'Account created!',
      desc: 'Welcome to Eagle Eye Rides. Check your email to verify.',
      icon: CheckCircle2,
    },
    3: { title: 'Check your email', desc: "We've sent a reset link to your inbox.", icon: Mail },
  }
  const { title, desc, icon: Icon } = config[step]
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center fade-in">
      <div className="flex size-16 items-center justify-center rounded-full bg-success/15 text-success spring-in">
        <Icon className="size-8" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="max-w-xs text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
        <Truck className="size-3.5 text-primary" />
        Eagle Eye Rides
      </div>
    </div>
  )
}

// ── Auth loading skeleton ──
function AuthLoading() {
  return (
    <div className="flex h-full flex-col">
      {/* Header skeleton */}
      <div className="flex items-center justify-between bg-gradient-to-b from-primary to-primary/90 px-5 pb-5 pt-12">
        <div className="flex items-center gap-2">
          <EerSkeleton className="size-10 rounded-xl" />
          <div className="space-y-1.5">
            <EerSkeleton className="h-3 w-32" />
            <EerSkeleton className="h-2 w-24" />
          </div>
        </div>
        <EerSkeleton className="size-9 rounded-full" />
      </div>
      <div className="flex-1 space-y-4 px-5 py-6">
        <EerSkeleton className="h-6 w-32" />
        <EerSkeleton className="h-3 w-56" />
        <div className="space-y-3 pt-2">
          <div className="space-y-1.5">
            <EerSkeleton className="h-3 w-12" />
            <EerSkeleton className="h-10 w-full" />
          </div>
          <div className="space-y-1.5">
            <EerSkeleton className="h-3 w-16" />
            <EerSkeleton className="h-10 w-full" />
          </div>
          <EerSkeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}

// ── Main pattern ──
export function P2Auth({ state, onStateChange }: PatternProps) {
  const [step, setStep] = useState<Step>(0)
  const [userType, setUserType] = useState<UserType>('passenger')

  const goBack = () => {
    if (step === 1 || step === 2) setStep(0)
    else if (step === 3) setStep(1)
  }

  const handleUserTypeSelect = (t: UserType) => {
    setUserType(t)
    setStep(1)
  }

  const handleSubmit = () => {
    // Trigger demo loading state via parent
    onStateChange?.('loading')
  }

  // Loading state — at step 0 (no form yet) we show the page-load skeleton;
  // otherwise we keep the user on their current form with the submit button
  // showing a spinner.
  const submitting = state === 'loading'

  if (state === 'loading' && step === 0) {
    return <AuthLoading />
  }

  // Success state — render success screen based on current step
  if (state === 'success') {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="flex items-center justify-between bg-gradient-to-b from-primary to-primary/90 px-5 pb-5 pt-12">
          <AuthBrand />
          <div className="size-9" aria-hidden />
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <AuthSuccess step={step} />
        </div>
      </div>
    )
  }

  // For 'populated' and 'empty' the user sees the default auth flow (step 0
  // initially, but they can navigate). 'error' and 'loading' keep them on the
  // current step but augment the UI.

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Gradient header */}
      <div className="flex items-center justify-between bg-gradient-to-b from-primary to-primary/90 px-5 pb-5 pt-12 text-primary-foreground">
        <AuthBrand />
        <BackButton onClick={goBack} visible={step !== 0} />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="space-y-4 px-5 py-6">
          {/* Error banner (only when state === 'error') */}
          {state === 'error' && (
            <ErrorBanner
              message={
                step === 3
                  ? 'Network error. Please try again.'
                  : 'Invalid email or password. Please try again.'
              }
            />
          )}

          {step === 0 && <UserTypeSelector onSelect={handleUserTypeSelect} />}
          {step === 1 && (
            <LoginForm
              userType={userType}
              submitting={submitting}
              onForgot={() => setStep(3)}
              onCreate={() => setStep(2)}
              onSubmit={handleSubmit}
            />
          )}
          {step === 2 && (
            <SignupForm
              userType={userType}
              submitting={submitting}
              onLogin={() => setStep(1)}
              onSubmit={handleSubmit}
            />
          )}
          {step === 3 && (
            <ForgotForm
              submitting={submitting}
              onBackToLogin={() => setStep(1)}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        {/* Footer trust strip */}
        <div className="px-5 pb-6 pt-2">
          <p className="text-center text-[10px] text-muted-foreground">
            Protected by industry-standard encryption. Your data stays private.
          </p>
        </div>
      </div>
    </div>
  )
}
