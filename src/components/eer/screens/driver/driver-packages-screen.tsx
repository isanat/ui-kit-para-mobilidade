"use client";

import { useState } from "react";
import {
  BellRing,
  Box,
  Check,
  ChevronLeft,
  CircleDot,
  Clock,
  MapPin,
  Navigation,
  Package,
  Ruler,
  Timer,
  X,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { EmptyState } from "@/components/eer/empty-state";
import { SectionLabel } from "@/components/eer/section-label";
import { StatusBadge } from "@/components/eer/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Offer = {
  id: string;
  pickup: string;
  dropoff: string;
  distance: string;
  payout: string;
  itemType: string;
  weight: string;
  expiresInSeconds: number;
};

const offers: Offer[] = [
  {
    id: "1",
    pickup: "124 Riverside Ave, Cambridge",
    dropoff: "Eagle Tower, Downtown",
    distance: "3.4 mi",
    payout: "$14.50",
    itemType: "Medium",
    weight: "8 lbs",
    expiresInSeconds: 28,
  },
  {
    id: "2",
    pickup: "Kendall Square",
    dropoff: "Logan Airport, Terminal C",
    distance: "5.8 mi",
    payout: "$22.00",
    itemType: "Documents",
    weight: "1 lb",
    expiresInSeconds: 12,
  },
  {
    id: "3",
    pickup: "Back Bay Station",
    dropoff: "Seaport Blvd",
    distance: "2.1 mi",
    payout: "$9.80",
    itemType: "Small",
    weight: "3 lbs",
    expiresInSeconds: 45,
  },
];

type ActiveDelivery = {
  id: string;
  pickup: string;
  dropoff: string;
  status: "picked-up" | "en-route";
  eta: string;
};

const activeDeliveries: ActiveDelivery[] = [
  {
    id: "a1",
    pickup: "Fenway Park",
    dropoff: "Beacon Hill",
    status: "en-route",
    eta: "8 min",
  },
];

const itemIconFor = (itemType: string): LucideIcon => {
  if (itemType === "Documents") return Package;
  if (itemType === "Small") return Package;
  if (itemType === "Medium") return Box;
  return Box;
};

export function DriverPackagesScreen() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const [declined, setDeclined] = useState<Record<string, boolean>>({});

  const visibleOffers = offers.filter(
    (o) => !accepted[o.id] && !declined[o.id],
  );

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
        <h1 className="font-semibold text-foreground">Packages</h1>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Notifications banner */}
        {bannerVisible && (
          <section className="flex items-start gap-3 rounded-2xl border border-amber/30 bg-amber/10 p-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber/20 text-amber">
              <BellRing className="size-4" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">
                Notifications are off
              </p>
              <p className="text-xs text-muted-foreground">
                Enable them to receive new delivery alerts in real time.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-8 bg-amber text-amber-foreground hover:bg-amber/90"
                  onClick={() => setBannerVisible(false)}
                >
                  Enable now
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-muted-foreground"
                  onClick={() => setBannerVisible(false)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={() => setBannerVisible(false)}
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-amber/15 hover:text-amber"
            >
              <X className="size-4" aria-hidden />
            </button>
          </section>
        )}

        {/* Available offers */}
        <section className="space-y-3">
          <SectionLabel
            action={
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Timer className="size-3.5 text-amber" aria-hidden />
                {visibleOffers.length} live
              </span>
            }
          >
            Available offers
          </SectionLabel>
          {visibleOffers.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No offers right now"
              description="Stay online — new delivery offers will appear here as they're requested."
            />
          ) : (
            <div className="space-y-3">
              {visibleOffers.map((offer) => {
                const ItemIcon = itemIconFor(offer.itemType);
                const urgent = offer.expiresInSeconds <= 15;
                return (
                  <article
                    key={offer.id}
                    className="space-y-3 rounded-2xl border border-border bg-card p-4"
                  >
                    <div className="flex items-center justify-between">
                      <StatusBadge tone="amber">
                        <Timer className="size-3" aria-hidden />
                        expires in {offer.expiresInSeconds}s
                      </StatusBadge>
                      <span className="text-sm font-semibold text-success">
                        {offer.payout}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <CircleDot className="size-3.5 text-amber" aria-hidden />
                        <span className="my-1 h-7 w-px border-l border-dashed border-border" />
                        <MapPin className="size-3.5 text-amber" aria-hidden />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="text-[11px] text-muted-foreground">
                            Pickup
                          </p>
                          <p className="text-sm font-medium text-card-foreground">
                            {offer.pickup}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-muted-foreground">
                            Dropoff
                          </p>
                          <p className="text-sm font-medium text-card-foreground">
                            {offer.dropoff}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        <Ruler className="size-3" aria-hidden />
                        {offer.distance}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber/15 px-2.5 py-1 text-[11px] font-medium text-amber">
                        <ItemIcon className="size-3" aria-hidden />
                        {offer.itemType}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        {offer.weight}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="h-10 flex-1"
                        onClick={() =>
                          setAccepted((prev) => ({ ...prev, [offer.id]: true }))
                        }
                      >
                        <Check className="size-4" aria-hidden />
                        Accept
                      </Button>
                      <Button
                        variant="ghost"
                        className={cn(
                          "h-10 flex-1",
                          urgent
                            ? "text-destructive hover:bg-destructive/10 hover:text-destructive"
                            : "text-muted-foreground hover:bg-accent",
                        )}
                        onClick={() =>
                          setDeclined((prev) => ({ ...prev, [offer.id]: true }))
                        }
                      >
                        Decline
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Active deliveries */}
        <section className="space-y-3">
          <SectionLabel>My active deliveries</SectionLabel>
          {activeDeliveries.length === 0 ? (
            <EmptyState
              icon={Box}
              title="No active deliveries"
              description="Accept an offer above to start a delivery."
            />
          ) : (
            <div className="space-y-3">
              {activeDeliveries.map((delivery) => (
                <article
                  key={delivery.id}
                  className="space-y-3 rounded-2xl border border-border bg-card p-4"
                >
                  <div className="flex items-center justify-between">
                    <StatusBadge tone="brand" dot>
                      {delivery.status === "en-route"
                        ? "En route"
                        : "Picked up"}
                    </StatusBadge>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3.5" aria-hidden />
                      ETA {delivery.eta}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <CircleDot className="size-3.5 text-primary" aria-hidden />
                      <span className="my-1 h-7 w-px border-l border-dashed border-border" />
                      <MapPin className="size-3.5 text-amber" aria-hidden />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <p className="text-[11px] text-muted-foreground">
                          Pickup
                        </p>
                        <p className="text-sm font-medium text-card-foreground">
                          {delivery.pickup}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground">
                          Dropoff
                        </p>
                        <p className="text-sm font-medium text-card-foreground">
                          {delivery.dropoff}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="h-10 w-full">
                    <Navigation className="size-4" aria-hidden />
                    Navigate
                  </Button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="driver" active="Schedule" />
    </div>
  );
}
