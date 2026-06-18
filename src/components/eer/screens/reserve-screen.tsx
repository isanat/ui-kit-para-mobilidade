"use client";

import { useState } from "react";
import { Car, ChevronLeft, CircleDot, Crown, MapPin, Truck } from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { RideOption } from "@/components/eer/ride-option";
import { SectionLabel } from "@/components/eer/section-label";
import { Button } from "@/components/ui/button";

export function ReserveScreen() {
  const [selected, setSelected] = useState("Eagle X");

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
        <h1 className="font-semibold text-foreground">Book a ride</h1>
      </header>

      <div className="flex-1 space-y-6 px-5 py-6">
        <section className="space-y-2 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <CircleDot className="size-4 text-primary" aria-hidden />
            <div className="flex-1 border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="text-sm font-medium text-card-foreground">
                Current location
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="size-4 text-amber" aria-hidden />
            <div className="flex-1 pt-1">
              <p className="text-xs text-muted-foreground">Destination</p>
              <p className="text-sm font-medium text-card-foreground">
                Eagle Tower, Downtown
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <SectionLabel>Choose a ride</SectionLabel>
          <div className="space-y-2">
            <RideOption
              icon={Car}
              name="Eagle X"
              eta="3 min away"
              price="$12.40"
              selected={selected === "Eagle X"}
              onClick={() => setSelected("Eagle X")}
            />
            <RideOption
              icon={Crown}
              name="Eagle Premium"
              eta="5 min away"
              price="$19.80"
              selected={selected === "Eagle Premium"}
              onClick={() => setSelected("Eagle Premium")}
            />
            <RideOption
              icon={Truck}
              name="Eagle XL"
              eta="7 min away"
              price="$24.00"
              selected={selected === "Eagle XL"}
              onClick={() => setSelected("Eagle XL")}
            />
          </div>
        </section>
      </div>

      <div className="space-y-3 border-t border-border bg-card px-5 py-4">
        <Button className="h-12 w-full text-base">Confirm {selected}</Button>
      </div>

      <BottomNav className="sticky bottom-0" active="Reserve" />
    </div>
  );
}
