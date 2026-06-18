"use client";

import * as React from "react";
import {
  Car,
  FileText,
  Mail,
  Percent,
  Phone,
  Power,
  Save,
  Star,
  User as UserIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfigField } from "@/components/eer/admin/config-field";
import { StatusBadge } from "@/components/eer/status-badge";
import type { Tone } from "@/components/eer/accents";

export type DriverTier =
  | "comfort"
  | "black"
  | "black_suv"
  | "luxury"
  | "package";

export type DocumentStatus =
  | "pending"
  | "verified"
  | "rejected"
  | "expired";

export interface EditableDriver {
  id: string;
  name: string;
  initials: string;
  rating: number;
  online: boolean;
  available: boolean;
  email: string;
  phone: string;
  license: string;
  vehicleMake: string;
  vehicleModel: string;
  plate: string;
  year: number;
  color: string;
  tier: DriverTier;
  documentStatus: DocumentStatus;
  /** Driver share of each fare, as a percentage 0-100. */
  earningsPercent: number;
}

const defaultDriver: EditableDriver = {
  id: "drv-1820",
  name: "Marcus Reed",
  initials: "MR",
  rating: 4.92,
  online: true,
  available: true,
  email: "m.reed@eagleeyedrivers.com",
  phone: "+1 (617) 555-0173",
  license: "S-220-4817-0042",
  vehicleMake: "Tesla",
  vehicleModel: "Model 3",
  plate: "9EV 1187",
  year: 2023,
  color: "Midnight Silver",
  tier: "black",
  documentStatus: "verified",
  earningsPercent: 75,
};

const tierMeta: Record<DriverTier, { label: string; tone: Tone }> = {
  comfort: { label: "Comfort", tone: "brand" },
  black: { label: "Black", tone: "cyan" },
  black_suv: { label: "Black SUV", tone: "magenta" },
  luxury: { label: "Luxury", tone: "gold" },
  package: { label: "Package", tone: "amber" },
};

const documentMeta: Record<
  DocumentStatus,
  { label: string; tone: Tone }
> = {
  pending: { label: "Pending", tone: "amber" },
  verified: { label: "Verified", tone: "success" },
  rejected: { label: "Rejected", tone: "magenta" },
  expired: { label: "Expired", tone: "muted" },
};

interface DriverEditFormProps {
  driver?: EditableDriver;
  onSave?: (driver: EditableDriver) => void;
  onDeactivate?: (driver: EditableDriver) => void;
  className?: string;
}

export function DriverEditForm({
  driver = defaultDriver,
  onSave,
  onDeactivate,
  className,
}: DriverEditFormProps) {
  const [draft, setDraft] = React.useState<EditableDriver>(driver);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    setDraft(driver);
  }, [driver]);

  const handleSave = () => {
    setSaving(true);
    onSave?.(draft);
    window.setTimeout(() => setSaving(false), 600);
  };

  const handleDeactivate = () => {
    const deactivated: EditableDriver = {
      ...draft,
      online: false,
      available: false,
    };
    setDraft(deactivated);
    onDeactivate?.(deactivated);
  };

  const tier = tierMeta[draft.tier];
  const doc = documentMeta[draft.documentStatus];

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Car className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Edit driver</CardTitle>
            <CardDescription>
              Manage profile, vehicle, documents and online status
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleDeactivate}
              disabled={!draft.online && !draft.available}
            >
              <Power className="size-3.5" aria-hidden />
              Deactivate
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
              <Save className="size-3.5" aria-hidden />
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pt-5">
        {/* Identity summary */}
        <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
          <Avatar className="size-14 ring-1 ring-border">
            <AvatarFallback className="bg-primary/15 text-base font-semibold text-primary">
              {draft.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-base font-semibold text-foreground">
                {draft.name}
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="size-3 fill-gold text-gold" aria-hidden />
                <span className="font-mono tabular-nums">
                  {draft.rating.toFixed(2)}
                </span>
              </span>
              <StatusBadge tone={draft.online ? "success" : "muted"} dot>
                {draft.online ? "Online" : "Offline"}
              </StatusBadge>
            </div>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {draft.id} · {draft.plate}
            </p>
          </div>
        </div>

        {/* Profile section */}
        <SectionLabel>Profile</SectionLabel>
        <ConfigField label="Full name" htmlFor="driver-name">
          <div className="relative w-full">
            <UserIcon
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="driver-name"
              className="pl-9"
              value={draft.name}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
        </ConfigField>
        <ConfigField label="Email address" htmlFor="driver-email">
          <div className="relative w-full">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="driver-email"
              type="email"
              className="pl-9"
              value={draft.email}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
        </ConfigField>
        <ConfigField label="Phone number" htmlFor="driver-phone">
          <div className="relative w-full">
            <Phone
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="driver-phone"
              type="tel"
              className="pl-9"
              value={draft.phone}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
        </ConfigField>
        <ConfigField
          label="License number"
          description="State-issued driver's license reference."
          htmlFor="driver-license"
        >
          <Input
            id="driver-license"
            className="font-mono"
            value={draft.license}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, license: e.target.value }))
            }
          />
        </ConfigField>

        <Separator className="my-2" />

        {/* Vehicle section */}
        <SectionLabel>Vehicle</SectionLabel>
        <ConfigField label="Make" htmlFor="vehicle-make">
          <Input
            id="vehicle-make"
            value={draft.vehicleMake}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, vehicleMake: e.target.value }))
            }
          />
        </ConfigField>
        <ConfigField label="Model" htmlFor="vehicle-model">
          <Input
            id="vehicle-model"
            value={draft.vehicleModel}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, vehicleModel: e.target.value }))
            }
          />
        </ConfigField>
        <ConfigField label="License plate" htmlFor="vehicle-plate">
          <Input
            id="vehicle-plate"
            className="font-mono uppercase"
            value={draft.plate}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, plate: e.target.value }))
            }
          />
        </ConfigField>
        <ConfigField label="Year" htmlFor="vehicle-year">
          <Input
            id="vehicle-year"
            type="number"
            min={1990}
            max={new Date().getFullYear() + 1}
            className="font-mono tabular-nums"
            value={draft.year}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (!Number.isNaN(next)) {
                setDraft((prev) => ({ ...prev, year: next }));
              }
            }}
          />
        </ConfigField>
        <ConfigField label="Color" htmlFor="vehicle-color">
          <Input
            id="vehicle-color"
            value={draft.color}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, color: e.target.value }))
            }
          />
        </ConfigField>
        <ConfigField
          label="Service tier"
          description="Determines which ride categories the driver is eligible for."
        >
          <div className="flex w-full items-center gap-2">
            <Select
              value={draft.tier}
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, tier: value as DriverTier }))
              }
            >
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comfort">Comfort</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="black_suv">Black SUV</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="package">Package</SelectItem>
              </SelectContent>
            </Select>
            <StatusBadge tone={tier.tone}>{tier.label}</StatusBadge>
          </div>
        </ConfigField>

        <Separator className="my-2" />

        {/* Documents section */}
        <SectionLabel>Documents</SectionLabel>
        <ConfigField
          label="Verification status"
          description="License, insurance and registration review outcome."
        >
          <div className="flex w-full items-center gap-2">
            <Select
              value={draft.documentStatus}
              onValueChange={(value) =>
                setDraft((prev) => ({
                  ...prev,
                  documentStatus: value as DocumentStatus,
                }))
              }
            >
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <StatusBadge tone={doc.tone}>{doc.label}</StatusBadge>
            <Button variant="outline" size="sm" className="ml-auto gap-1.5">
              <FileText className="size-3.5" aria-hidden />
              View documents
            </Button>
          </div>
        </ConfigField>

        <Separator className="my-2" />

        {/* Earnings section */}
        <SectionLabel>Earnings</SectionLabel>
        <ConfigField
          label="Driver percentage"
          description="Share of each fare the driver keeps, before tips and bonuses."
        >
          <div className="flex w-full items-center gap-2">
            <div className="relative w-32">
              <Percent
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="number"
                min={0}
                max={100}
                className="font-mono tabular-nums pr-9"
                value={draft.earningsPercent}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (!Number.isNaN(next)) {
                    setDraft((prev) => ({
                      ...prev,
                      earningsPercent: Math.min(100, Math.max(0, next)),
                    }));
                  }
                }}
              />
            </div>
            <Button variant="link" size="sm" className="ml-auto px-1">
              View earnings →
            </Button>
          </div>
        </ConfigField>

        <Separator className="my-2" />

        {/* Status section */}
        <SectionLabel>Status</SectionLabel>
        <ConfigField
          label="Online"
          description="Whether the driver appears on the dispatch board and can receive offers."
        >
          <Switch
            checked={draft.online}
            onCheckedChange={(online) =>
              setDraft((prev) => ({
                ...prev,
                online,
                available: online ? prev.available : false,
              }))
            }
            aria-label="Online"
          />
        </ConfigField>
        <ConfigField
          label="Available"
          description="Currently free to accept a new ride (in-ride drivers stay online but unavailable)."
        >
          <Switch
            checked={draft.available}
            disabled={!draft.online}
            onCheckedChange={(available) =>
              setDraft((prev) => ({ ...prev, available }))
            }
            aria-label="Available"
          />
        </ConfigField>
      </CardContent>
    </Card>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="pt-2 pb-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export default DriverEditForm;
