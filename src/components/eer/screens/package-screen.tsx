"use client";

import { useState } from "react";
import {
  Box,
  Camera,
  ChevronLeft,
  CircleDot,
  Clock,
  FileText,
  MapPin,
  Package,
  Truck,
  Zap,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { RideOption } from "@/components/eer/ride-option";
import { SectionLabel } from "@/components/eer/section-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ItemType = {
  id: string;
  label: string;
  icon: typeof FileText;
};

const itemTypes: ItemType[] = [
  { id: "documents", label: "Documents", icon: FileText },
  { id: "small", label: "Small", icon: Package },
  { id: "medium", label: "Medium", icon: Box },
  { id: "large", label: "Large", icon: Truck },
];

export function PackageScreen() {
  const [itemType, setItemType] = useState("small");
  const [delivery, setDelivery] = useState("standard");

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
        <h1 className="font-semibold text-foreground">Send a package</h1>
      </header>

      <div className="flex-1 space-y-6 px-5 py-6">
        {/* Addresses */}
        <section className="space-y-2 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <CircleDot className="size-4 text-amber" aria-hidden />
            <div className="flex-1 border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">Pickup</p>
              <Input
                placeholder="Enter pickup address"
                defaultValue="124 Riverside Ave"
                className="h-7 border-0 bg-transparent px-0 text-sm font-medium text-card-foreground shadow-none focus-visible:ring-0"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="size-4 text-amber" aria-hidden />
            <div className="flex-1 pt-1">
              <p className="text-xs text-muted-foreground">Dropoff</p>
              <Input
                placeholder="Enter dropoff address"
                defaultValue="Eagle Tower, Downtown"
                className="h-7 border-0 bg-transparent px-0 text-sm font-medium text-card-foreground shadow-none focus-visible:ring-0"
              />
            </div>
          </div>
        </section>

        {/* Package details */}
        <section className="space-y-3">
          <SectionLabel>Package details</SectionLabel>
          <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Item type</p>
              <div className="grid grid-cols-4 gap-2">
                {itemTypes.map((item) => {
                  const isSelected = itemType === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setItemType(item.id)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl border p-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isSelected
                          ? "border-amber bg-amber/10 text-amber"
                          : "border-border bg-background text-muted-foreground hover:border-amber/40",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                      <span className="text-[11px] font-medium">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Weight (lbs)</p>
              <Input
                type="number"
                defaultValue="3"
                className="h-9 bg-background"
              />
            </div>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background py-2.5 text-sm text-muted-foreground transition-colors hover:border-amber/40 hover:text-amber"
            >
              <Camera className="size-4" aria-hidden />
              Add photo (optional)
            </button>
          </div>
        </section>

        {/* Delivery options */}
        <section className="space-y-3">
          <SectionLabel>Delivery options</SectionLabel>
          <div className="space-y-2">
            <RideOption
              icon={Package}
              name="Standard"
              eta="45-60 min"
              price="$8.90"
              selected={delivery === "standard"}
              onClick={() => setDelivery("standard")}
            />
            <RideOption
              icon={Zap}
              name="Express"
              eta="20-30 min"
              price="$14.50"
              selected={delivery === "express"}
              onClick={() => setDelivery("express")}
            />
            <RideOption
              icon={Clock}
              name="Same-day"
              eta="By 6 PM"
              price="$6.40"
              selected={delivery === "sameday"}
              onClick={() => setDelivery("sameday")}
            />
          </div>
        </section>
      </div>

      <div className="space-y-3 border-t border-border bg-card px-5 py-4">
        <Button className="h-12 w-full text-base">Book delivery</Button>
      </div>

      <BottomNav className="sticky bottom-0" active="Packages" />
    </div>
  );
}
