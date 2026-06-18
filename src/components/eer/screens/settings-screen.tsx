"use client";

import { useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  Globe,
  Heart,
  KeyRound,
  Languages,
  Lock,
  LogOut,
  MapPin,
  Moon,
  Pencil,
  Percent,
  Shield,
  Smartphone,
  Trash2,
  UserCog,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { AppHeader } from "@/components/eer/app-header";
import { BottomNav } from "@/components/eer/bottom-nav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Row primitives                                                     */
/* ------------------------------------------------------------------ */

interface RowBase {
  id: string;
  label: string;
  icon: LucideIcon;
  accent: string;
}

interface ToggleRow extends RowBase {
  kind: "toggle";
  description?: string;
  defaultOn?: boolean;
}

interface SelectRow extends RowBase {
  kind: "select";
  options: { value: string; label: string }[];
  defaultValue: string;
}

interface LinkRow extends RowBase {
  kind: "link";
  value?: string;
}

type Row = ToggleRow | SelectRow | LinkRow;

interface SettingsCardProps {
  title: string;
  rows: Row[];
}

function SettingsCard({ title, rows }: SettingsCardProps) {
  return (
    <section className="space-y-2">
      <h2 className="px-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {rows.map((row) => (
          <RowItem key={row.id} row={row} />
        ))}
      </div>
    </section>
  );
}

function RowItem({ row }: { row: Row }) {
  const Icon = row.icon;
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted",
          row.accent,
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-card-foreground">{row.label}</p>
        {row.kind === "toggle" && row.description && (
          <p className="text-xs text-muted-foreground">{row.description}</p>
        )}
      </div>
      <RowControl row={row} />
    </div>
  );
}

function RowControl({ row }: { row: Row }) {
  const [on, setOn] = useState(row.kind === "toggle" ? !!row.defaultOn : false);

  if (row.kind === "toggle") {
    return <Switch checked={on} onCheckedChange={setOn} aria-label={row.label} />;
  }
  if (row.kind === "select") {
    return (
      <Select defaultValue={row.defaultValue}>
        <SelectTrigger
          size="sm"
          className="w-32 border-border bg-muted/60 font-medium"
          aria-label={row.label}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {row.options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {row.value && (
        <span className="text-xs text-muted-foreground">{row.value}</span>
      )}
      <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section data                                                       */
/* ------------------------------------------------------------------ */

const accountRows: Row[] = [
  {
    id: "profile",
    kind: "link",
    label: "Edit profile",
    icon: UserCog,
    accent: "text-primary",
  },
  {
    id: "email",
    kind: "link",
    label: "Email & phone",
    icon: Smartphone,
    accent: "text-cyan",
    value: "jane@doe.com",
  },
  {
    id: "password",
    kind: "link",
    label: "Password",
    icon: KeyRound,
    accent: "text-amber",
  },
  {
    id: "2fa",
    kind: "toggle",
    label: "Two-factor authentication",
    description: "SMS code on every sign-in",
    icon: Shield,
    accent: "text-success",
    defaultOn: true,
  },
];

const notificationRows: Row[] = [
  {
    id: "rides",
    kind: "toggle",
    label: "Ride updates",
    icon: Bell,
    accent: "text-primary",
    defaultOn: true,
  },
  {
    id: "promos",
    kind: "toggle",
    label: "Promotions",
    icon: Percent,
    accent: "text-magenta",
    defaultOn: false,
  },
  {
    id: "driver-msgs",
    kind: "toggle",
    label: "Driver messages",
    icon: UserRound,
    accent: "text-cyan",
    defaultOn: true,
  },
  {
    id: "receipts",
    kind: "toggle",
    label: "Email receipts",
    icon: CreditCard,
    accent: "text-gold",
    defaultOn: true,
  },
];

const privacyRows: Row[] = [
  {
    id: "location",
    kind: "toggle",
    label: "Location sharing",
    description: "While using the app",
    icon: MapPin,
    accent: "text-amber",
    defaultOn: true,
  },
  {
    id: "visibility",
    kind: "select",
    label: "Profile visibility",
    icon: Eye,
    accent: "text-cyan",
    defaultValue: "friends",
    options: [
      { value: "public", label: "Public" },
      { value: "friends", label: "Friends" },
      { value: "private", label: "Private" },
    ],
  },
];

const paymentRows: Row[] = [
  {
    id: "default",
    kind: "select",
    label: "Default payment method",
    icon: CreditCard,
    accent: "text-primary",
    defaultValue: "visa",
    options: [
      { value: "visa", label: "Visa •••• 4242" },
      { value: "amex", label: "Amex •••• 1009" },
      { value: "apple", label: "Apple Pay" },
      { value: "cash", label: "Cash" },
    ],
  },
  {
    id: "autotip",
    kind: "toggle",
    label: "Auto-tip drivers",
    description: "15% on every completed ride",
    icon: Heart,
    accent: "text-magenta",
    defaultOn: true,
  },
];

const appRows: Row[] = [
  {
    id: "language",
    kind: "select",
    label: "Language",
    icon: Languages,
    accent: "text-cyan",
    defaultValue: "en",
    options: [
      { value: "en", label: "English" },
      { value: "pt", label: "Português" },
    ],
  },
  {
    id: "darkmode",
    kind: "toggle",
    label: "Dark mode",
    description: "Follow system or set manually",
    icon: Moon,
    accent: "text-primary",
    defaultOn: true,
  },
  {
    id: "region",
    kind: "link",
    label: "Region",
    icon: Globe,
    accent: "text-amber",
    value: "United States",
  },
];

/* ------------------------------------------------------------------ */
/*  Screen                                                             */
/* ------------------------------------------------------------------ */

export function SettingsScreen() {
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader greeting="Settings" name="Eagle Eye Rides" showSearch={false} />

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Back row inside content (AppHeader is gradient, so we mirror the wallet
            back-header pattern below for a clear secondary nav affordance). */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Go back"
            className="flex size-9 items-center justify-center rounded-full bg-card text-foreground ring-1 ring-inset ring-border"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        </div>

        {/* Profile card */}
        <section className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
          <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted ring-1 ring-inset ring-border">
            <Image
              src="/eagle-logo-dark.png"
              alt=""
              fill
              sizes="56px"
              className="object-contain p-2"
            />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-card-foreground">Jane Doe</p>
            <p className="text-sm text-muted-foreground">jane.doe@example.com</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              +1 (617) 555-0142 · Boston, MA
            </p>
          </div>
          <button
            type="button"
            aria-label="Edit profile"
            className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors hover:bg-primary/25"
          >
            <Pencil className="size-4" aria-hidden />
          </button>
        </section>

        <SettingsCard title="Account" rows={accountRows} />
        <SettingsCard title="Notifications" rows={notificationRows} />
        <SettingsCard title="Privacy" rows={privacyRows} />
        <SettingsCard title="Payment" rows={paymentRows} />
        <SettingsCard title="App" rows={appRows} />

        {/* Sign out + Delete */}
        <div className="space-y-3 pt-2">
          <Button
            variant="outline"
            className="h-12 w-full"
          >
            <LogOut className="size-4" aria-hidden />
            Sign out
          </Button>
          <Button
            variant="outline"
            className="h-12 w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="size-4" aria-hidden />
            Delete account
          </Button>
        </div>

        <p className="flex items-center justify-center gap-1.5 pb-2 text-center text-xs text-muted-foreground">
          <Lock className="size-3" aria-hidden />
          Eagle Eye Rides · v3.4.0
        </p>
      </div>

      <BottomNav className="sticky bottom-0" variant="user" active="Profile" />
    </div>
  );
}
