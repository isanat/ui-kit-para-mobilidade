"use client";

import * as React from "react";
import {
  Ban,
  Mail,
  Phone,
  ShieldCheck,
  User as UserIcon,
  Wallet,
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
import { Label } from "@/components/ui/label";
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

export type UserStatus = "active" | "suspended" | "pending";

export interface EditableUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  idVerified: boolean;
  /** Wallet balance in USD, formatted as a display string (e.g. "$248.50"). */
  walletBalance: string;
}

const defaultUser: EditableUser = {
  id: "usr-4471",
  name: "Olivia Bennett",
  initials: "OB",
  email: "olivia.bennett@gmail.com",
  phone: "+1 (617) 555-0148",
  status: "active",
  emailVerified: true,
  phoneVerified: true,
  idVerified: false,
  walletBalance: "$248.50",
};

const statusMeta: Record<
  UserStatus,
  { label: string; tone: Tone }
> = {
  active: { label: "Active", tone: "success" },
  suspended: { label: "Suspended", tone: "magenta" },
  pending: { label: "Pending", tone: "amber" },
};

interface UserEditFormProps {
  user?: EditableUser;
  onSave?: (user: EditableUser) => void;
  onSuspend?: (user: EditableUser) => void;
  className?: string;
}

export function UserEditForm({
  user = defaultUser,
  onSave,
  onSuspend,
  className,
}: UserEditFormProps) {
  const [draft, setDraft] = React.useState<EditableUser>(user);
  const [saving, setSaving] = React.useState(false);

  // Re-seed when the `user` prop reference changes (e.g. navigating to a
  // different user record).
  React.useEffect(() => {
    setDraft(user);
  }, [user]);

  const handleSave = () => {
    setSaving(true);
    onSave?.(draft);
    window.setTimeout(() => setSaving(false), 600);
  };

  const handleSuspend = () => {
    const suspended: EditableUser = { ...draft, status: "suspended" };
    setDraft(suspended);
    onSuspend?.(suspended);
  };

  const status = statusMeta[draft.status];

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <UserIcon className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">Edit user</CardTitle>
            <CardDescription>
              Manage profile, verification and account status
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleSuspend}
              disabled={draft.status === "suspended"}
            >
              <Ban className="size-3.5" aria-hidden />
              {draft.status === "suspended" ? "Suspended" : "Suspend"}
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
              <ShieldCheck className="size-3.5" aria-hidden />
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
              <StatusBadge tone={status.tone} dot>
                {status.label}
              </StatusBadge>
            </div>
            <p className="mt-0.5 font-mono text-xs text-muted-foreground">
              {draft.id}
            </p>
          </div>
        </div>

        {/* Profile section */}
        <SectionLabel>Profile</SectionLabel>
        <ConfigField
          label="Full name"
          description="Displayed across receipts, ride history and the rider app."
          htmlFor="user-name"
        >
          <Input
            id="user-name"
            value={draft.name}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </ConfigField>
        <ConfigField
          label="Email address"
          description="Used for sign-in, receipts and transactional email."
          htmlFor="user-email"
        >
          <div className="relative w-full">
            <Mail
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="user-email"
              type="email"
              className="pl-9"
              value={draft.email}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
        </ConfigField>
        <ConfigField
          label="Phone number"
          description="Receives ride confirmations and safety alerts via SMS."
          htmlFor="user-phone"
        >
          <div className="relative w-full">
            <Phone
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="user-phone"
              type="tel"
              className="pl-9"
              value={draft.phone}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
        </ConfigField>

        <Separator className="my-2" />

        {/* Verification section */}
        <SectionLabel>Verification</SectionLabel>
        <ConfigField
          label="Email verified"
          description="User has confirmed ownership of the email address."
        >
          <Switch
            checked={draft.emailVerified}
            onCheckedChange={(emailVerified) =>
              setDraft((prev) => ({ ...prev, emailVerified }))
            }
            aria-label="Email verified"
          />
        </ConfigField>
        <ConfigField
          label="Phone verified"
          description="Phone number validated via OTP at sign-up."
        >
          <Switch
            checked={draft.phoneVerified}
            onCheckedChange={(phoneVerified) =>
              setDraft((prev) => ({ ...prev, phoneVerified }))
            }
            aria-label="Phone verified"
          />
        </ConfigField>
        <ConfigField
          label="ID verified"
          description="Government ID reviewed and approved by the trust & safety team."
        >
          <Switch
            checked={draft.idVerified}
            onCheckedChange={(idVerified) =>
              setDraft((prev) => ({ ...prev, idVerified }))
            }
            aria-label="ID verified"
          />
        </ConfigField>

        <Separator className="my-2" />

        {/* Status section */}
        <SectionLabel>Status</SectionLabel>
        <ConfigField
          label="Account status"
          description="Controls whether the user can request rides or chauffeur services."
        >
          <Select
            value={draft.status}
            onValueChange={(value) =>
              setDraft((prev) => ({ ...prev, status: value as UserStatus }))
            }
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </ConfigField>

        <Separator className="my-2" />

        {/* Wallet section */}
        <SectionLabel>Wallet</SectionLabel>
        <ConfigField
          label="Wallet balance"
          description="Stored credit used for ride fares, tips and points redemption."
        >
          <div className="flex w-full items-center gap-2">
            <div className="relative flex-1">
              <Wallet
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={draft.walletBalance}
                readOnly
                aria-readonly
                className="bg-muted/40 pl-9 font-mono tabular-nums text-muted-foreground"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Wallet className="size-3.5" aria-hidden />
              Adjust balance
            </Button>
          </div>
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

export default UserEditForm;
