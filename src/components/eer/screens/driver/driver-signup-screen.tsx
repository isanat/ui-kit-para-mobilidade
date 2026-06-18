"use client";

import { useState } from "react";
import {
  Car,
  ChevronLeft,
  FileText,
  IdCard,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Upload,
  User as UserIcon,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function Field({
  icon: Icon,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: {
  icon: LucideIcon;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type={type}
          placeholder={placeholder}
          className="h-11 pl-9"
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}

function Dropzone({ label }: { label: string }) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setUploaded((s) => !s)}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border border-dashed p-3 text-left transition-colors",
        uploaded
          ? "border-success/50 bg-success/10"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          uploaded ? "bg-success/20 text-success" : "bg-muted text-muted-foreground",
        )}
      >
        {uploaded ? <FileText className="size-5" aria-hidden /> : <Upload className="size-5" aria-hidden />}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium text-card-foreground">
          {uploaded ? "Uploaded" : label}
        </span>
        <span className="block text-xs text-muted-foreground">
          {uploaded ? "document.pdf · 240 KB" : "JPG, PNG or PDF · max 5 MB"}
        </span>
      </span>
    </button>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  accent = "text-cyan",
}: {
  icon: LucideIcon;
  title: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-lg bg-muted",
          accent,
        )}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {title}
      </h2>
    </div>
  );
}

export function DriverSignupScreen() {
  const [tier, setTier] = useState("comfort");
  const [bgCheck, setBgCheck] = useState(false);
  const [terms, setTerms] = useState(false);

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border bg-card px-5 py-4">
        <button
          type="button"
          aria-label="Go back"
          className="flex size-9 items-center justify-center rounded-full bg-muted text-foreground"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">Become a driver</h1>
          <p className="text-xs text-muted-foreground">
            Drive & earn on your schedule
          </p>
        </div>
        <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-card ring-1 ring-inset ring-border">
          <Image
            src="/eagle-logo-dark.png"
            alt=""
            fill
            sizes="36px"
            className="object-contain p-1"
          />
        </span>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Personal */}
        <section className="space-y-3">
          <SectionHeading icon={UserIcon} title="Personal" accent="text-cyan" />
          <Field
            icon={UserIcon}
            label="Full name"
            placeholder="Marcus Reed"
            autoComplete="name"
          />
          <Field
            icon={Mail}
            label="Email"
            type="email"
            placeholder="marcus@example.com"
            autoComplete="email"
          />
          <Field
            icon={Phone}
            label="Phone"
            type="tel"
            placeholder="+1 (617) 555-0142"
            autoComplete="tel"
          />
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Password</p>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="password"
                placeholder="Create a password"
                className="h-11 pl-9"
                autoComplete="new-password"
              />
            </div>
          </div>
        </section>

        {/* Vehicle */}
        <section className="space-y-3">
          <SectionHeading icon={Car} title="Vehicle" accent="text-primary" />
          <div className="grid grid-cols-2 gap-3">
            <Field icon={Car} label="Make" placeholder="Toyota" />
            <Field icon={Car} label="Model" placeholder="Camry" />
            <Field icon={Car} label="Plate" placeholder="EAG-4821" />
            <Field icon={Car} label="Year" placeholder="2022" />
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Service tier</p>
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger className="h-11 w-full border-border bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comfort">Comfort</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="suv">Black SUV</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="package">Package</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Documents */}
        <section className="space-y-3">
          <SectionHeading icon={IdCard} title="Documents" accent="text-amber" />
          <Field icon={IdCard} label="Driver license number" placeholder="S-000-0000" />
          <Dropzone label="Upload driver license" />
          <Field icon={FileText} label="Insurance policy #" placeholder="INS-000-0000" />
          <Dropzone label="Upload insurance document" />
          <Field icon={FileText} label="Registration #" placeholder="REG-000-0000" />
          <Dropzone label="Upload vehicle registration" />
        </section>

        {/* Consents */}
        <section className="space-y-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="bgcheck"
              checked={bgCheck}
              onCheckedChange={(v) => setBgCheck(v === true)}
              className="mt-0.5"
            />
            <label htmlFor="bgcheck" className="text-sm text-muted-foreground">
              I authorize Eagle Eye Rides to run a{" "}
              <span className="font-medium text-foreground">
                background check
              </span>{" "}
              and motor vehicle records search.
            </label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={terms}
              onCheckedChange={(v) => setTerms(v === true)}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the{" "}
              <button type="button" className="font-medium text-foreground hover:underline">
                Driver Agreement
              </button>{" "}
              and{" "}
              <button type="button" className="font-medium text-foreground hover:underline">
                Privacy Policy
              </button>
              .
            </label>
          </div>
        </section>

        <Button
          className="h-12 w-full text-base"
          disabled={!bgCheck || !terms}
        >
          <ShieldCheck className="size-4" aria-hidden />
          Submit application
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already a driver?{" "}
          <button
            type="button"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
