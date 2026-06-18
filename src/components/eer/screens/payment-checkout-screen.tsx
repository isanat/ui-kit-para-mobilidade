"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  ChevronLeft,
  CreditCard,
  Heart,
  MapPin,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { SectionLabel } from "@/components/eer/section-label";
import {
  FareSummary,
  PaymentMethodSelector,
  PromoCodeInput,
  type AppliedPromo,
  type PaymentMethod,
} from "@/components/eer/forms";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const methods: (PaymentMethod & { icon: LucideIcon })[] = [
  {
    id: "visa",
    label: "Visa",
    sublabel: "•••• 4242",
    icon: CreditCard,
  },
  {
    id: "amex",
    label: "Amex",
    sublabel: "•••• 1009",
    icon: CreditCard,
  },
  {
    id: "apple",
    label: "Apple Pay",
    sublabel: "Touch ID to pay",
    icon: Wallet,
  },
];

type TipOption = { id: string; label: string; pct: number | null };

const tipOptions: TipOption[] = [
  { id: "none", label: "None", pct: 0 },
  { id: "10", label: "10%", pct: 0.1 },
  { id: "15", label: "15%", pct: 0.15 },
  { id: "20", label: "20%", pct: 0.2 },
  { id: "custom", label: "Custom", pct: null },
];

const SUBTOTAL = 18.4;
const TAX = 1.65;

export function PaymentCheckoutScreen() {
  const [method, setMethod] = useState<string>("visa");
  const [tipId, setTipId] = useState<string>("15");
  const [customTip, setCustomTip] = useState<string>("");
  const [promo, setPromo] = useState<AppliedPromo | null>(null);

  const tipAmount = useMemo(() => {
    const opt = tipOptions.find((o) => o.id === tipId);
    if (!opt) return 0;
    if (opt.pct === null) {
      // Custom tip — parse the input as a dollar amount.
      const parsed = Number.parseFloat(customTip);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }
    return SUBTOTAL * opt.pct;
  }, [tipId, customTip]);

  const promoDiscount = promo
    ? promo.discount.endsWith("%")
      ? (SUBTOTAL * Number.parseFloat(promo.discount)) / 100
      : Number.parseFloat(promo.discount.replace(/[^0-9.]/g, ""))
    : 0;

  const total = Math.max(0, SUBTOTAL + TAX + tipAmount - promoDiscount);

  const fareItems = [
    { label: "Ride fare · Eagle Comfort", amount: `$${SUBTOTAL.toFixed(2)}` },
    { label: "Taxes & fees", amount: `$${TAX.toFixed(2)}` },
    { label: "Tip", amount: `$${tipAmount.toFixed(2)}` },
  ];

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Back header */}
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
        <button
          type="button"
          aria-label="Go back"
          className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <h1 className="font-semibold text-foreground">Payment</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Summary card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-success to-[oklch(0.42_0.16_152)] p-5 text-white shadow-lg">
          <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/15 blur-2xl" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/20">
                <CreditCard className="size-5" aria-hidden />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white">
                Ride · #EER-4821
              </span>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center pt-1">
                <span className="size-2 rounded-full bg-white" />
                <span className="my-1 h-8 w-px border-l border-dashed border-white/50" />
                <MapPin className="size-3.5" aria-hidden />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs text-white/70">Pickup</p>
                  <p className="text-sm font-semibold">The Plaza Hotel, Boston</p>
                </div>
                <div>
                  <p className="text-xs text-white/70">Destination</p>
                  <p className="text-sm font-semibold">Logan Airport, Terminal C</p>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-white/20 pt-3">
              <div>
                <p className="text-xs text-white/70">Amount due</p>
                <p className="text-3xl font-bold tracking-tight">
                  ${total.toFixed(2)}
                </p>
              </div>
              <p className="text-xs text-white/70">Comfort · 18 min · 6.2 mi</p>
            </div>
          </div>
        </section>

        {/* Payment method */}
        <section className="space-y-2.5">
          <SectionLabel>Payment method</SectionLabel>
          <PaymentMethodSelector
            methods={methods}
            value={method}
            onChange={setMethod}
            onAddMethod={() => undefined}
          />
        </section>

        {/* Tip */}
        <section className="space-y-2.5">
          <SectionLabel
            action={
              <span className="text-xs font-medium text-muted-foreground">
                Tip · ${tipAmount.toFixed(2)}
              </span>
            }
          >
            Add a tip
          </SectionLabel>
          <div className="flex flex-wrap gap-2">
            {tipOptions.map((opt) => {
              const isActive = tipId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTipId(opt.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {opt.pct !== 0 && opt.pct !== null && (
                    <Heart className="size-3.5" aria-hidden />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>
          {tipId === "custom" && (
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-3">
              <span className="text-sm text-muted-foreground">$</span>
              <input
                type="number"
                min={0}
                step={0.5}
                inputMode="decimal"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Enter custom amount"
                aria-label="Custom tip amount"
                className="flex-1 bg-transparent text-sm font-medium text-card-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          )}
        </section>

        {/* Promo */}
        <section className="space-y-2.5">
          <SectionLabel>Promo code</SectionLabel>
          <PromoCodeInput
            applied={promo}
            onApply={(code) => {
              // Pretend the EER10 promo is a 10% discount, others a flat $3.
              const lower = code.toLowerCase();
              if (lower.includes("pct")) {
                setPromo({ code: code.toUpperCase(), discount: "10%" });
              } else {
                setPromo({ code: code.toUpperCase(), discount: "$3.00" });
              }
            }}
            onRemove={() => setPromo(null)}
          />
        </section>

        {/* Fare summary */}
        <section className="space-y-2.5">
          <SectionLabel>Summary</SectionLabel>
          <FareSummary
            items={fareItems}
            discount={
              promoDiscount > 0 ? `$${promoDiscount.toFixed(2)}` : undefined
            }
            total={`$${total.toFixed(2)}`}
          />
        </section>

        {/* Primary pay + cash */}
        <section className="space-y-3 pt-1">
          <Button className="h-12 w-full text-base">
            <CreditCard className="size-4" aria-hidden />
            Pay ${total.toFixed(2)}
          </Button>
          <Button variant="outline" className="h-11 w-full">
            <Banknote className="size-4" aria-hidden />
            Pay with cash
          </Button>
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="user" active="Wallet" />
    </div>
  );
}
