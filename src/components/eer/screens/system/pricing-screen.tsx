"use client";

import * as React from "react";
import {
  Calculator,
  Car,
  Check,
  ChevronLeft,
  Clock,
  Crown,
  Package,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BottomNav } from "@/components/eer/bottom-nav";
import { SectionLabel } from "@/components/eer/section-label";

interface PlanFeature {
  label: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  icon: LucideIcon;
  accent: "brand" | "cyan" | "amber";
  fromPrice: string;
  tagline: string;
  features: PlanFeature[];
  cta: string;
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: "one-way",
    name: "One-way",
    icon: Car,
    accent: "cyan",
    fromPrice: "$12",
    tagline: "Point-to-point rides, on demand.",
    cta: "Get started",
    features: [
      { label: "Comfort & Black SUV classes", included: true },
      { label: "Up to 4 passengers", included: true },
      { label: "Live tracking + SOS", included: true },
      { label: "Multi-stop routes", included: false },
      { label: "Dedicated chauffeur", included: false },
    ],
  },
  {
    id: "chauffeur",
    name: "Chauffeur",
    icon: Crown,
    accent: "brand",
    fromPrice: "$65",
    tagline: "By-the-hour executive service.",
    cta: "Get started",
    highlighted: true,
    features: [
      { label: "Premium black-car fleet", included: true },
      { label: "Hourly booking, min. 2 hrs", included: true },
      { label: "Multi-stop + wait time included", included: true },
      { label: "Priority dispatch", included: true },
      { label: "Corporate billing", included: true },
    ],
  },
  {
    id: "packages",
    name: "Packages",
    icon: Package,
    accent: "amber",
    fromPrice: "$9",
    tagline: "Same-day item delivery.",
    cta: "Get started",
    features: [
      { label: "Up to 25 lbs per item", included: true },
      { label: "Real-time courier tracking", included: true },
      { label: "Photo proof of delivery", included: true },
      { label: "Insured up to $500", included: true },
      { label: "Same-hour priority lane", included: false },
    ],
  },
];

const accentMap: Record<
  Plan["accent"],
  { soft: string; solid: string; ring: string }
> = {
  brand: {
    soft: "bg-primary/15 text-primary",
    solid: "bg-primary text-primary-foreground",
    ring: "ring-primary/30",
  },
  cyan: {
    soft: "bg-cyan/15 text-cyan",
    solid: "bg-cyan text-cyan-foreground",
    ring: "ring-cyan/30",
  },
  amber: {
    soft: "bg-amber/15 text-amber",
    solid: "bg-amber text-amber-foreground",
    ring: "ring-amber/30",
  },
};

const faqs = [
  {
    q: "How are fares calculated?",
    a: "Fares combine a base rate, per-mile distance, and per-minute time. Surge pricing may apply during peak demand; the quoted fare is always locked before you confirm.",
  },
  {
    q: "Can I cancel a ride for free?",
    a: "Yes — free cancellation up to 2 minutes after a driver is assigned. After that, a small $5 fee applies. Chauffeur bookings have a 1-hour free cancellation window.",
  },
  {
    q: "Do you offer corporate accounts?",
    a: "Chauffeur and Package plans support corporate billing, centralized invoicing, and ride limits. Contact our sales team to provision an account.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "All major credit/debit cards via Square, Apple Pay, Google Pay, and Eagle Eye wallet credits. Tips are separate and 100% go to the driver.",
  },
];

/**
 * Pricing & plans screen (user-app). Three plan cards (middle highlighted),
 * a fare estimator, and an FAQ accordion. BottomNav variant="user".
 */
export function PricingScreen() {
  const [base, setBase] = React.useState("3.50");
  const [distance, setDistance] = React.useState("8");
  const [minutes, setMinutes] = React.useState("18");

  const estimate = React.useMemo(() => {
    const b = parseFloat(base) || 0;
    const d = parseFloat(distance) || 0;
    const m = parseFloat(minutes) || 0;
    // Distance @ $2.10/mile, time @ $0.35/min, plus base.
    const total = b + d * 2.1 + m * 0.35;
    return total.toFixed(2);
  }, [base, distance, minutes]);

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
        <button
          type="button"
          aria-label="Back"
          className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-card-foreground">Pricing</h1>
          <p className="text-xs text-muted-foreground">
            Plans, fares, and what&apos;s included
          </p>
        </div>
      </header>

      <div className="flex-1 space-y-7 overflow-y-auto px-5 py-6">
        {/* Intro */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            Choose how you ride
          </h2>
          <p className="text-sm text-muted-foreground">
            Transparent pricing with no hidden fees. Pick a service that fits
            your trip — you can switch anytime.
          </p>
        </section>

        {/* Plan cards */}
        <section className="space-y-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </section>

        {/* Fare estimator */}
        <section className="space-y-3">
          <SectionLabel>Fare estimator</SectionLabel>
          <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Calculator className="size-4" aria-hidden />
              </span>
              <p className="text-sm font-medium text-card-foreground">
                Estimate your one-way fare
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <EstimatorField
                label="Base"
                value={base}
                onChange={setBase}
                prefix="$"
              />
              <EstimatorField
                label="Distance"
                value={distance}
                onChange={setDistance}
                suffix="mi"
              />
              <EstimatorField
                label="Time"
                value={minutes}
                onChange={setMinutes}
                suffix="min"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-primary/10 px-4 py-3">
              <span className="text-sm text-muted-foreground">
                Estimated fare
              </span>
              <span className="font-mono text-xl font-semibold text-primary tabular-nums">
                ${estimate}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Estimate only. Actual fare may vary with surge, tolls, and route.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <SectionLabel>FAQ</SectionLabel>
          <div className="rounded-2xl border border-border bg-card px-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${i}`}
                  className={cn(
                    i !== faqs.length - 1 && "border-b border-border",
                  )}
                >
                  <AccordionTrigger className="text-left text-sm font-medium text-card-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Support line */}
        <section className="flex items-center gap-2 rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          <Clock className="size-3.5 shrink-0" aria-hidden />
          <span>
            Support is available 24/7. Tap{" "}
            <span className="font-medium text-foreground">Help</span> in your
            profile to chat with us.
          </span>
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="user" active="Profile" />
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  const accent = accentMap[plan.accent];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-5 transition-shadow",
        plan.highlighted
          ? "border-primary shadow-lg ring-1 ring-inset ring-primary/20"
          : "border-border",
      )}
    >
      {plan.highlighted && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground uppercase">
          Popular
        </span>
      )}

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-xl",
            plan.highlighted ? accent.solid : accent.soft,
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
        <div>
          <p className="font-semibold text-card-foreground">{plan.name}</p>
          <p className="text-xs text-muted-foreground">{plan.tagline}</p>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-xs text-muted-foreground">from</span>
        <span className="text-3xl font-semibold tracking-tight text-foreground">
          {plan.fromPrice}
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {plan.features.map((feature) => (
          <li
            key={feature.label}
            className={cn(
              "flex items-center gap-2 text-sm",
              feature.included
                ? "text-card-foreground"
                : "text-muted-foreground/60 line-through",
            )}
          >
            <span
              className={cn(
                "flex size-4 shrink-0 items-center justify-center rounded-full",
                feature.included
                  ? "bg-success/15 text-success"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <Check className="size-3" aria-hidden />
            </span>
            {feature.label}
          </li>
        ))}
      </ul>

      <Button
        className={cn("mt-5 h-11 w-full", !plan.highlighted && "bg-background text-foreground border border-border hover:bg-accent")}
        variant={plan.highlighted ? "default" : "outline"}
      >
        {plan.cta}
      </Button>
    </div>
  );
}

function EstimatorField({
  label,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
      <div className="flex items-center gap-1 rounded-xl border border-border bg-background px-2.5 py-1.5 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40">
        {prefix && (
          <span className="text-sm text-muted-foreground">{prefix}</span>
        )}
        <Input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
        {suffix && (
          <span className="text-xs text-muted-foreground">{suffix}</span>
        )}
      </div>
    </label>
  );
}

export default PricingScreen;
