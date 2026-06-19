"use client";

import { useState } from "react";
import {
  Briefcase,
  CalendarDays,
  Car,
  ChevronLeft,
  CircleDot,
  Clock,
  Crown,
  MapPin,
  Sparkles,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { SectionLabel } from "@/components/eer/section-label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HoursOption = {
  id: string;
  label: string;
  price: string;
};

type VehicleTier = {
  id: string;
  label: string;
  description: string;
  icon: typeof Briefcase;
};

const hoursOptions: HoursOption[] = [
  { id: "2h", label: "2 hours", price: "$89" },
  { id: "4h", label: "4 hours", price: "$169" },
  { id: "8h", label: "8 hours", price: "$299" },
  { id: "fullday", label: "Full day", price: "$449" },
];

const vehicleTiers: VehicleTier[] = [
  {
    id: "business",
    label: "Business",
    description: "Mercedes E-Class",
    icon: Briefcase,
  },
  {
    id: "first",
    label: "First Class",
    description: "Mercedes S-Class",
    icon: Crown,
  },
  {
    id: "luxury",
    label: "Luxury SUV",
    description: "Cadillac Escalade",
    icon: Car,
  },
];

export function ChauffeurScreen() {
  const [hours, setHours] = useState("4h");
  const [tier, setTier] = useState("business");

  const selectedHours = hoursOptions.find((h) => h.id === hours);
  const total = selectedHours?.price ?? "$0";

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
        <button
          type="button"
          aria-label="Go back"
          className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <h1 className="font-semibold text-foreground">Chauffeur Service</h1>
      </header>

      <div className="flex-1 space-y-6 px-5 py-6">
        {/* Pickup location */}
        <section className="space-y-3">
          <SectionLabel>Pickup location</SectionLabel>
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <CircleDot className="size-5" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="text-sm font-medium text-card-foreground">
                The Plaza Hotel, 5th Ave
              </p>
            </div>
            <MapPin className="size-4 text-muted-foreground" aria-hidden />
          </div>
        </section>

        {/* Date + Time pickers */}
        <section className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
              <CalendarDays className="size-4" aria-hidden />
            </span>
            <span className="space-y-0.5">
              <span className="block text-xs text-muted-foreground">
                Select date
              </span>
              <span className="block text-sm font-medium text-card-foreground">
                Sat, Apr 12
              </span>
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
              <Clock className="size-4" aria-hidden />
            </span>
            <span className="space-y-0.5">
              <span className="block text-xs text-muted-foreground">
                Select time
              </span>
              <span className="block text-sm font-medium text-card-foreground">
                10:30 AM
              </span>
            </span>
          </button>
        </section>

        {/* Hours selector */}
        <section className="space-y-3">
          <SectionLabel>Duration</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {hoursOptions.map((option) => {
              const isSelected = hours === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setHours(option.id)}
                  className={cn(
                    "flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  <span className="text-sm font-semibold text-card-foreground">
                    {option.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {option.price}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Vehicle tier */}
        <section className="space-y-3">
          <SectionLabel>Vehicle tier</SectionLabel>
          <div className="space-y-2">
            {vehicleTiers.map((vehicle) => {
              const isSelected = tier === vehicle.id;
              const Icon = vehicle.icon;
              return (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => setTier(vehicle.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-card-foreground">
                      {vehicle.label}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {vehicle.description}
                    </span>
                  </span>
                  {isSelected && (
                    <Sparkles className="size-4 text-primary" aria-hidden />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="space-y-3 border-t border-border bg-card px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-lg font-semibold text-card-foreground">
            {total}
          </span>
        </div>
        <Button className="h-12 w-full text-base">Reserve chauffeur</Button>
      </div>

      <BottomNav className="sticky bottom-0" active="Chauffeur" />
    </div>
  );
}
