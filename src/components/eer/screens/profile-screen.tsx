import {
  Bell,
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  MapPin,
  Pencil,
  Settings,
  Star,
  Ticket,
  Wallet,
} from "lucide-react";
import { AppHeader } from "@/components/eer/app-header";
import { BottomNav } from "@/components/eer/bottom-nav";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Rides", value: "128" },
  { label: "Spent", value: "$2,140" },
  { label: "Rating", value: "4.9" },
];

const menuItems = [
  { label: "Payment methods", icon: CreditCard, accent: "text-cyan" },
  { label: "Saved places", icon: MapPin, accent: "text-amber" },
  { label: "Ride history", icon: Bell, accent: "text-magenta" },
  { label: "Promotions", icon: Ticket, accent: "text-gold" },
  { label: "Wallet", icon: Wallet, accent: "text-success" },
  { label: "Settings", icon: Settings, accent: "text-primary" },
  { label: "Help", icon: HelpCircle, accent: "text-muted-foreground" },
];

export function ProfileScreen() {
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader greeting="Profile" name="Eagle Eye Rides" showSearch={false} />

      <div className="flex-1 space-y-6 px-5 py-6">
        {/* Profile card */}
        <section className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-lg text-primary">
            JD
          </span>
          <div className="flex-1">
            <p className="font-semibold text-card-foreground">Jane Doe</p>
            <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-gold text-gold" aria-hidden />
              4.9 · Gold member
            </span>
          </div>
          <button
            type="button"
            aria-label="Edit profile"
            className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent"
          >
            <Pencil className="size-4" aria-hidden />
          </button>
        </section>

        {/* Stats row */}
        <section className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card p-3 text-center"
            >
              <span className="text-lg font-semibold text-card-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        {/* Menu list */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/50 ${
                  index !== menuItems.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <span
                  className={`flex size-9 items-center justify-center rounded-xl bg-muted ${item.accent}`}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="flex-1 text-sm font-medium text-card-foreground">
                  {item.label}
                </span>
                <ChevronRight
                  className="size-4 text-muted-foreground"
                  aria-hidden
                />
              </button>
            );
          })}
        </section>

        <Button
          variant="outline"
          className="h-12 w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4" aria-hidden />
          Log out
        </Button>
      </div>

      <BottomNav className="sticky bottom-0" active="Account" />
    </div>
  );
}
