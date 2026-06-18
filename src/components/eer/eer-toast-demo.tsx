"use client";

import {
  BadgeCheck,
  CreditCard,
  Sparkles,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "destructive";

interface DemoToastSpec {
  label: string;
  title: string;
  description: string;
  variant: ToastVariant;
  icon: LucideIcon;
  /** Tone applied to the icon button, mirroring the toast semantic. */
  tone: string;
}

const specs: DemoToastSpec[] = [
  {
    label: "Ride confirmed",
    title: "Ride confirmed",
    description: "Your Comfort ride is booked for 09:42 AM.",
    variant: "default",
    icon: BadgeCheck,
    tone: "bg-success/15 text-success",
  },
  {
    label: "Driver assigned",
    title: "Driver assigned",
    description: "Dana Whitfield is heading to your pickup in a Toyota Camry.",
    variant: "default",
    icon: Truck,
    tone: "bg-primary/15 text-primary",
  },
  {
    label: "Payment failed",
    title: "Payment failed",
    description: "Your card was declined. Update your payment method to retry.",
    variant: "destructive",
    icon: CreditCard,
    tone: "bg-destructive/15 text-destructive",
  },
  {
    label: "Promo applied",
    title: "Promo WELCOME15 applied",
    description: "You saved $4.50 on this ride.",
    variant: "default",
    icon: Sparkles,
    tone: "bg-success/15 text-success",
  },
];

/**
 * Demo trigger for the EER toast system. Renders 4 buttons that each fire a
 * themed toast via shadcn's `useToast` hook (the `<Toaster />` is already
 * mounted in the app layout). Used in the kit showcase to demonstrate the
 * notification layer.
 */
export function EerToastDemo({ className }: { className?: string }) {
  const { toast } = useToast();

  const fire = (spec: DemoToastSpec) => {
    toast({
      title: spec.title,
      description: spec.description,
      variant: spec.variant,
    });
  };

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 sm:grid-cols-4",
        className,
      )}
    >
      {specs.map((spec) => {
        const Icon = spec.icon;
        return (
          <Button
            key={spec.label}
            variant="outline"
            onClick={() => fire(spec)}
            className="h-auto flex-col gap-2 py-3"
          >
            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-lg",
                spec.tone,
              )}
            >
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="text-xs font-medium">{spec.label}</span>
          </Button>
        );
      })}
    </div>
  );
}

export default EerToastDemo;
