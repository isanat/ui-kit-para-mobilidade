import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  Navigation,
  Search,
  Star,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { SectionLabel } from "@/components/eer/section-label";
import { Button } from "@/components/ui/button";

const recentDestinations = [
  {
    id: "1",
    label: "Eagle Tower",
    address: "Downtown, 9th floor",
  },
  {
    id: "2",
    label: "JFK Airport",
    address: "Terminal 4, Queens",
  },
  {
    id: "3",
    label: "Madison Square Garden",
    address: "4 Pennsylvania Plaza",
  },
];

const savedPlaces = [
  { id: "1", label: "Home", icon: Home },
  { id: "2", label: "Work", icon: MapPin },
];

export function DirectionsScreen() {
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
        <h1 className="font-semibold text-foreground">Directions</h1>
      </header>

      <div className="flex-1 space-y-6 px-5 py-6">
        {/* Search bar */}
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/40"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Search className="size-5" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-medium text-card-foreground">
              Where to?
            </span>
            <span className="block text-sm text-muted-foreground">
              Search a destination
            </span>
          </span>
          <ChevronRight className="size-5 text-muted-foreground" aria-hidden />
        </button>

        {/* Saved places quick-access */}
        <section className="grid grid-cols-2 gap-3">
          {savedPlaces.map((place) => {
            const Icon = place.icon;
            return (
              <button
                key={place.id}
                type="button"
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-primary/40"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="text-sm font-medium text-card-foreground">
                  {place.label}
                </span>
              </button>
            );
          })}
        </section>

        {/* Recent destinations */}
        <section className="space-y-3">
          <SectionLabel>Recent destinations</SectionLabel>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {recentDestinations.map((dest, index) => (
              <button
                key={dest.id}
                type="button"
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50 ${
                  index !== recentDestinations.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <Clock className="size-4" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-card-foreground">
                    {dest.label}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {dest.address}
                  </span>
                </span>
                <ChevronRight
                  className="size-4 text-muted-foreground"
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </section>

        {/* Route preview card */}
        <section className="space-y-3 rounded-2xl border border-border bg-card p-4">
          <SectionLabel>Route preview</SectionLabel>
          <div className="flex gap-3">
            <div className="flex flex-col items-center pt-1">
              <span className="size-3 rounded-full border-2 border-primary bg-card" />
              <span className="my-1 h-12 w-px border-l border-dashed border-border" />
              <MapPin className="size-4 text-amber" aria-hidden />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="text-sm font-medium text-card-foreground">
                  124 Riverside Ave
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">To</p>
                <p className="text-sm font-medium text-card-foreground">
                  Eagle Tower, Downtown
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">ETA</p>
              <p className="text-sm font-semibold text-card-foreground">
                12 min
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Distance</p>
              <p className="text-sm font-semibold text-card-foreground">
                4.2 mi
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Est. fare</p>
              <p className="text-sm font-semibold text-card-foreground">
                $12.40
              </p>
            </div>
          </div>
        </section>

        <Button className="h-12 w-full text-base">
          <Navigation className="size-4" aria-hidden />
          Start navigation
        </Button>

        <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3 fill-gold text-gold" aria-hidden />
          Fastest route via Riverside Dr
        </p>
      </div>

      <BottomNav className="sticky bottom-0" active="Home" />
    </div>
  );
}
