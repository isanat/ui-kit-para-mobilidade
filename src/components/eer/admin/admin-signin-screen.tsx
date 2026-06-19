"use client";

import * as React from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/eer/logo";

interface AdminSigninScreenProps {
  className?: string;
  onSignIn?: (email: string, password: string, remember: boolean) => void;
}

export function AdminSigninScreen({
  className,
  onSignIn,
}: AdminSigninScreenProps) {
  const [email, setEmail] = React.useState("admin@eagleeyerides.com");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    onSignIn?.(email, password, remember);
    window.setTimeout(() => setSubmitting(false), 700);
  };

  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center bg-sidebar px-4 py-10 text-sidebar-foreground",
        className,
      )}
    >
      <div className="w-full max-w-md">
        {/* Logo + heading */}
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo size={48} subtitle="Admin Console" />
          <p className="mt-4 text-sm text-muted-foreground">
            Sign in to manage rides, drivers and operations.
          </p>
        </div>

        <Card className="rounded-2xl bg-card text-card-foreground">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field
                id="admin-email"
                label="Email"
                icon={Mail}
                type="email"
                autoComplete="email"
                placeholder="admin@eagleeyerides.com"
                value={email}
                onChange={setEmail}
              />

              <PasswordField
                id="admin-password"
                label="Password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                show={showPassword}
                onToggleShow={() => setShowPassword((s) => !s)}
              />

              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-remember"
                  className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground"
                >
                  <Checkbox
                    id="admin-remember"
                    checked={remember}
                    onCheckedChange={(v) => setRemember(Boolean(v))}
                  />
                  Remember me on this device
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="mt-1 h-10 w-full gap-1.5"
                disabled={submitting}
              >
                <Lock className="size-4" aria-hidden />
                {submitting ? "Signing in…" : "Sign in to dashboard"}
              </Button>
            </form>

            <div className="my-5">
              <Separator />
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" aria-hidden />
                Back to eagleeyerides.com
              </a>
              <p className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="size-3.5 text-success" aria-hidden />
                Protected area — authorized staff only.
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-[11px] text-muted-foreground/80">
          © {new Date().getFullYear()} Eagle Eye Rides · All access is logged.
        </p>
      </div>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  icon: typeof Mail;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
}

function Field({
  id,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  autoComplete,
  value,
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-10 pl-9"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggleShow: () => void;
}

function PasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  value,
  onChange,
  show,
  onToggleShow,
}: PasswordFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Lock
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="h-10 pl-9 pr-9"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}

export default AdminSigninScreen;
