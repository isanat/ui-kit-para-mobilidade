import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  Clock,
  Download,
  Plus,
  Wallet,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { EmptyState } from "@/components/eer/empty-state";
import { SectionLabel } from "@/components/eer/section-label";
import { StatusBadge } from "@/components/eer/status-badge";
import { Button } from "@/components/ui/button";

type Transaction = {
  id: string;
  label: string;
  date: string;
  amount: string;
  positive: boolean;
};

const transactions: Transaction[] = [
  {
    id: "1",
    label: "Ride payout · Eagle X",
    date: "Today, 14:32",
    amount: "+$12.40",
    positive: true,
  },
  {
    id: "2",
    label: "Withdrawal to bank",
    date: "Yesterday, 09:15",
    amount: "-$200.00",
    positive: false,
  },
  {
    id: "3",
    label: "Ride payout · Eagle Premium",
    date: "Apr 9, 18:48",
    amount: "+$19.80",
    positive: true,
  },
  {
    id: "4",
    label: "Tip from rider",
    date: "Apr 9, 18:50",
    amount: "+$5.00",
    positive: true,
  },
  {
    id: "5",
    label: "Withdrawal to bank",
    date: "Apr 7, 11:02",
    amount: "-$150.00",
    positive: false,
  },
];

export function WalletScreen() {
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
        <h1 className="font-semibold text-foreground">Wallet</h1>
      </header>

      <div className="flex-1 space-y-6 px-5 py-6">
        {/* Balance card */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.4_0.18_268)] p-5 text-primary-foreground shadow-lg">
          <div className="absolute -top-10 -right-10 size-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/20">
                <Wallet className="size-5" aria-hidden />
              </span>
              <StatusBadge tone="muted" className="bg-white/15 text-white">
                Available
              </StatusBadge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/70">Total balance</p>
              <p className="text-3xl font-semibold">$1,284.50</p>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="secondary"
                className="h-10 flex-1 bg-white/15 text-white hover:bg-white/25"
              >
                <Plus className="size-4" aria-hidden />
                Add funds
              </Button>
              <Button
                variant="secondary"
                className="h-10 flex-1 bg-white/15 text-white hover:bg-white/25"
              >
                <Download className="size-4" aria-hidden />
                Withdraw
              </Button>
            </div>
          </div>
        </section>

        {/* Quick stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">This week earnings</p>
            <p className="mt-1 text-xl font-semibold text-card-foreground">
              $482.10
            </p>
            <p className="mt-1 text-xs text-success">+12% vs last week</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Pending payouts</p>
            <p className="mt-1 text-xl font-semibold text-card-foreground">
              $74.20
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" aria-hidden />
              Clears in 2 days
            </p>
          </div>
        </section>

        {/* Transactions */}
        <section className="space-y-3">
          <SectionLabel
            action={
              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline"
              >
                See all
              </button>
            }
          >
            Transactions
          </SectionLabel>
          {transactions.length === 0 ? (
            <EmptyState
              icon={Wallet}
              title="No transactions yet"
              description="Your earnings and withdrawals will show up here."
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              {transactions.map((tx, index) => {
                const Icon = tx.positive ? ArrowDownLeft : ArrowUpRight;
                return (
                  <div
                    key={tx.id}
                    className={`flex items-center gap-3 px-4 py-3 ${
                      index !== transactions.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <span
                      className={`flex size-9 items-center justify-center rounded-xl ${
                        tx.positive
                          ? "bg-success/15 text-success"
                          : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {tx.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        tx.positive
                          ? "text-success"
                          : "text-card-foreground"
                      }`}
                    >
                      {tx.amount}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <BottomNav className="sticky bottom-0" active="Account" />
    </div>
  );
}
