"use client";

import {
  Car,
  Home,
  CreditCard,
  User,
  type LucideIcon,
  Crown,
  Package,
  MapPin,
  ListChecks,
  Radio,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  /** When true, the item is rendered as a prominent center CTA. */
  cta?: boolean;
}

/**
 * Default user-app navigation — matches the real Eagle Eye Rides rider app:
 * Home · Trips · Ride (center CTA) · Wallet · Profile
 */
const defaultUserItems: NavItem[] = [
  { label: "Home", icon: Home },
  { label: "Trips", icon: ListChecks },
  { label: "Ride", icon: Car, cta: true },
  { label: "Wallet", icon: CreditCard },
  { label: "Profile", icon: User },
];

/**
 * Default driver-app navigation:
 * Home · Schedule · Online (center CTA) · Earnings · Profile
 */
const defaultDriverItems: NavItem[] = [
  { label: "Home", icon: Home },
  { label: "Schedule", icon: ListChecks },
  { label: "Online", icon: Radio, cta: true },
  { label: "Earnings", icon: CreditCard },
  { label: "Profile", icon: User },
];

/** Legacy 5-tab variant kept for the original UI kit showcase. */
const defaultLegacyItems: NavItem[] = [
  { label: "Home", icon: Home },
  { label: "Reserve", icon: Car },
  { label: "Packages", icon: Package },
  { label: "Chauffeur", icon: Crown },
  { label: "Account", icon: User },
];

export type NavVariant = "user" | "driver" | "legacy";

export function BottomNav({
  className,
  active: controlledActive,
  onNavigate,
  variant = "legacy",
  items,
}: {
  className?: string;
  active?: string;
  onNavigate?: (label: string) => void;
  /** Which preset navigation to render. Ignored when `items` is provided. */
  variant?: NavVariant;
  /** Override the preset items entirely. */
  items?: NavItem[];
}) {
  const [internalActive, setInternalActive] = useState("Home");
  const active = controlledActive ?? internalActive;

  const resolvedItems =
    items ??
    (variant === "user"
      ? defaultUserItems
      : variant === "driver"
        ? defaultDriverItems
        : defaultLegacyItems);

  const handleClick = (label: string) => {
    setInternalActive(label);
    onNavigate?.(label);
  };

  return (
    <nav
      className={cn(
        "relative flex items-center justify-between border-t border-border bg-card px-2 py-2",
        className,
      )}
    >
      {resolvedItems.map(({ label, icon: Icon, cta }, index) => {
        const isActive = active === label;
        const isCenter = cta && resolvedItems.length % 2 === 1 &&
          index === Math.floor(resolvedItems.length / 2);

        // Center CTA: a raised, prominent button.
        if (isCenter) {
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleClick(label)}
              aria-label={label}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <span
                className={cn(
                  "flex -mt-6 size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-card transition-transform active:scale-95",
                  isActive && "ring-primary/30",
                )}
              >
                <Icon className="size-6" aria-hidden />
              </span>
              <span
                className={cn(
                  "text-[11px] font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={label}
            type="button"
            onClick={() => handleClick(label)}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className={cn(
                "flex size-9 items-center justify-center rounded-xl transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <span
              className={cn(
                "text-[11px] font-medium",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
