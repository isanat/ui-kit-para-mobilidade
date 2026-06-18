import { ChevronLeft, Heart, Star } from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { EmptyState } from "@/components/eer/empty-state";
import { SectionLabel } from "@/components/eer/section-label";
import { StatusBadge } from "@/components/eer/status-badge";

type Tip = {
  id: string;
  driver: string;
  initials: string;
  rideId: string;
  date: string;
  amount: number;
};

const tips: Tip[] = [
  {
    id: "1",
    driver: "Marcus Reed",
    initials: "MR",
    rideId: "#EER-4821",
    date: "Apr 12, 2025 · 14:32",
    amount: 5.0,
  },
  {
    id: "2",
    driver: "Sofia Alvarez",
    initials: "SA",
    rideId: "#EER-4790",
    date: "Apr 9, 2025 · 19:48",
    amount: 8.0,
  },
  {
    id: "3",
    driver: "Liam Chen",
    initials: "LC",
    rideId: "#EER-4752",
    date: "Apr 5, 2025 · 08:15",
    amount: 3.5,
  },
  {
    id: "4",
    driver: "Aisha Khan",
    initials: "AK",
    rideId: "#EER-4701",
    date: "Apr 2, 2025 · 21:10",
    amount: 10.0,
  },
  {
    id: "5",
    driver: "Marcus Reed",
    initials: "MR",
    rideId: "#EER-4683",
    date: "Mar 28, 2025 · 10:05",
    amount: 5.0,
  },
];

const totalTips = tips.reduce((sum, t) => sum + t.amount, 0);
const monthTips = tips
  .filter((t) => t.date.startsWith("Apr"))
  .reduce((sum, t) => sum + t.amount, 0);

export function TipsHistoryScreen() {
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
        <h1 className="font-semibold text-foreground">Tips</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Summary card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-success to-[oklch(0.45_0.13_155)] p-5 text-white shadow-lg">
          <div className="absolute -top-12 -right-12 size-44 rounded-full bg-white/15 blur-2xl" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/20 ring-1 ring-inset ring-white/30">
                <Heart className="size-5 text-white" aria-hidden />
              </span>
              <StatusBadge className="bg-white/20 text-white">
                {tips.length} tips given
              </StatusBadge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/80">Total tipped</p>
              <p className="text-3xl font-semibold tracking-tight">
                ${totalTips.toFixed(2)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="rounded-2xl bg-white/15 p-3 ring-1 ring-inset ring-white/15">
                <p className="text-xs text-white/75">This month</p>
                <p className="mt-0.5 text-lg font-semibold">
                  ${monthTips.toFixed(2)}
                </p>
              </div>
              <div className="rounded-2xl bg-white/15 p-3 ring-1 ring-inset ring-white/15">
                <p className="text-xs text-white/75">Avg. per ride</p>
                <p className="mt-0.5 text-lg font-semibold">
                  ${(totalTips / tips.length).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips list */}
        <section className="space-y-3">
          <SectionLabel>Recent tips</SectionLabel>
          {tips.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="No tips yet"
              description="When you tip a driver, it will appear here."
            />
          ) : (
            <div className="space-y-2">
              {tips.map((tip) => (
                <article
                  key={tip.id}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
                    {tip.initials}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-card-foreground">
                        {tip.driver}
                      </p>
                      <Star
                        className="size-3 fill-gold text-gold"
                        aria-hidden
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {tip.rideId} · {tip.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="size-4 fill-gold text-gold" aria-hidden />
                    <span className="text-sm font-semibold text-success">
                      +${tip.amount.toFixed(2)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="user" active="Profile" />
    </div>
  );
}
