"use client";

import * as React from "react";
import {
  CircleDot,
  MapPin,
  X,
  LocateFixed,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AddressVariant = "pickup" | "destination" | "stop";

export interface AddressInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: AddressVariant;
  icon?: LucideIcon;
  /** Called when the user clicks the "use current location" button. */
  onDetectLocation?: () => void;
  /** Called when the clear (X) button is pressed. */
  onClear?: () => void;
  className?: string;
}

interface VariantConfig {
  icon: LucideIcon;
  iconWrap: string;
  defaultLabel: string;
}

const variantConfig: Record<AddressVariant, VariantConfig> = {
  pickup: {
    icon: CircleDot,
    iconWrap: "bg-primary/15 text-primary",
    defaultLabel: "Pickup",
  },
  destination: {
    icon: MapPin,
    iconWrap: "bg-amber/15 text-amber",
    defaultLabel: "Destination",
  },
  stop: {
    icon: MapPin,
    iconWrap: "bg-muted text-muted-foreground",
    defaultLabel: "Stop",
  },
};

/**
 * Labeled address field with a colored role icon (pickup / destination / stop),
 * an inline transparent input, optional "use current location" detection button,
 * and a clear button when a value is present.
 */
export function AddressInput({
  label,
  placeholder = "Enter address",
  value = "",
  onChange,
  variant = "pickup",
  icon,
  onClear,
  onDetectLocation,
  className,
}: AddressInputProps) {
  const cfg = variantConfig[variant];
  const Icon = icon ?? cfg.icon;
  const isStop = variant === "stop";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-colors focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-ring/40",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          cfg.iconWrap,
        )}
      >
        {isStop ? (
          <span className="size-2 rounded-full bg-current" />
        ) : (
          <Icon className="size-4" />
        )}
      </span>

      <div className="flex-1 min-w-0">
        {(label ?? cfg.defaultLabel) && (
          <span className="block text-xs font-medium text-muted-foreground">
            {label ?? cfg.defaultLabel}
          </span>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          aria-label={label ?? cfg.defaultLabel}
          className="block w-full bg-transparent text-sm font-medium text-card-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {onDetectLocation && !value && (
          <button
            type="button"
            onClick={onDetectLocation}
            aria-label="Use current location"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LocateFixed className="size-4" />
          </button>
        )}
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange?.("");
              onClear?.();
            }}
            aria-label="Clear address"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
