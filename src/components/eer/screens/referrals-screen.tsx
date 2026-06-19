"use client";

import { useState } from "react";
import {
  Check,
  ChevronLeft,
  Copy,
  Gift,
  Mail,
  MessageCircle,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/eer/bottom-nav";
import { SectionLabel } from "@/components/eer/section-label";
import { StatusBadge } from "@/components/eer/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ReferralStatus = "joined" | "pending";

type Referral = {
  id: string;
  name: string;
  initials: string;
  status: ReferralStatus;
  date: string;
  bonus: number;
};

const referrals: Referral[] = [
  {
    id: "1",
    name: "Marcus Reed",
    initials: "MR",
    status: "joined",
    date: "Apr 5, 2025",
    bonus: 10,
  },
  {
    id: "2",
    name: "Sofia Alvarez",
    initials: "SA",
    status: "joined",
    date: "Mar 22, 2025",
    bonus: 10,
  },
  {
    id: "3",
    name: "Liam Chen",
    initials: "LC",
    status: "pending",
    date: "Apr 10, 2025",
    bonus: 0,
  },
  {
    id: "4",
    name: "Aisha Khan",
    initials: "AK",
    status: "pending",
    date: "Apr 11, 2025",
    bonus: 0,
  },
];

const shareButtons: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "copy", label: "Copy link", icon: Copy },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "email", label: "Email", icon: Mail },
  { id: "x", label: "X", icon: X },
];

const REFERRAL_LINK = "eagleeyerides.com/r/JANE-4821";

export function ReferralsScreen() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard?.writeText(`https://${REFERRAL_LINK}`).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const invitedCount = referrals.length;
  const signedUpCount = referrals.filter((r) => r.status === "joined").length;
  const earnedTotal = referrals.reduce((sum, r) => sum + r.bonus, 0);

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
        <h1 className="font-semibold text-foreground">Refer &amp; earn</h1>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-magenta to-[oklch(0.42_0.16_350)] p-5 text-white shadow-lg">
          <div className="absolute -top-12 -right-12 size-44 rounded-full bg-white/15 blur-2xl" />
          <div className="relative space-y-4">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-inset ring-white/30">
              <Gift className="size-5 text-white" aria-hidden />
            </span>
            <div className="space-y-1">
              <p className="text-2xl font-semibold tracking-tight">
                Give $10, Get $10
              </p>
              <p className="text-sm text-white/85">
                Invite friends to Eagle Eye Rides. They get $10 off their first
                ride, and you earn $10 in ride credit when they complete it.
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 p-3 ring-1 ring-inset ring-white/20">
              <p className="text-xs text-white/70">Your referral link</p>
              <div className="mt-1 flex items-center gap-2">
                <code className="flex-1 truncate font-mono text-sm text-white">
                  {REFERRAL_LINK}
                </code>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleCopy}
                  className={cn(
                    "h-8 gap-1.5",
                    copied
                      ? "bg-white text-magenta hover:bg-white/90"
                      : "bg-white/20 text-white hover:bg-white/30",
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5" aria-hidden />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" aria-hidden />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {shareButtons.map((share) => {
                const Icon = share.icon;
                return (
                  <Button
                    key={share.id}
                    type="button"
                    variant="outline"
                    className="h-10 gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                    onClick={share.id === "copy" ? handleCopy : undefined}
                  >
                    <Icon className="size-4" aria-hidden />
                    {share.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats row */}
        <section className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border bg-card p-3 text-center">
            <p className="text-xl font-semibold text-card-foreground">
              {invitedCount}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Invited</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-3 text-center">
            <p className="text-xl font-semibold text-success">
              {signedUpCount}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Signed up
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-3 text-center">
            <p className="text-xl font-semibold text-magenta">
              ${earnedTotal}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Earned</p>
          </div>
        </section>

        {/* Referrals list */}
        <section className="space-y-3">
          <SectionLabel
            action={
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="size-3.5" aria-hidden />
                {invitedCount} invited
              </span>
            }
          >
            Your referrals
          </SectionLabel>
          <div className="space-y-2">
            {referrals.map((ref) => (
              <article
                key={ref.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
                  {ref.initials}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">
                    {ref.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{ref.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge tone={ref.status === "joined" ? "success" : "muted"}>
                    {ref.status === "joined" ? "Joined" : "Pending"}
                  </StatusBadge>
                  {ref.bonus > 0 ? (
                    <span className="text-xs font-semibold text-success">
                      +${ref.bonus}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Pending
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <BottomNav className="sticky bottom-0" variant="user" active="Profile" />
    </div>
  );
}
