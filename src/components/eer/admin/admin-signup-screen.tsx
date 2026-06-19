"use client";

import * as React from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  ShieldAlert,
  User as UserIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Logo } from "@/components/eer/logo";

export type AdminRole = "operator" | "manager" | "admin";

interface AdminSignupScreenProps {
  className?: string;
  onCreate?: (payload: {
    name: string;
    email: string;
    role: AdminRole;
    password: string;
  }) => void;
}

const roleMeta: Record<AdminRole, { label: string; description: string }> = {
  operator: {
    label: "Operator",
    description: "Ride ops · dispatch · driver support",
  },
  manager: {
    label: "Manager",
    description: "Fleet · fares · coupons · payouts",
  },
  admin: {
    label: "Admin",
    description: "Full access · settings · user management",
  },
};

export function AdminSignupScreen({
  className,
  onCreate,
}: AdminSignupScreenProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<AdminRole>("operator");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const passwordsMatch = password === confirm;
  const showMismatchError = touched && confirm.length > 0 && !passwordsMatch;
  const canSubmit =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 8 &&
    passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!canSubmit) return;
    setSubmitting(true);
    onCreate?.({ name, email, role, password });
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
            Create a new admin account for your team.
          </p>
        </div>

        {/* Invitation notice */}
        <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-amber/30 bg-amber/10 px-3.5 py-3 text-left">
          <ShieldAlert
            className="mt-0.5 size-4 shrink-0 text-amber"
            aria-hidden
          />
          <div className="leading-tight">
            <p className="text-xs font-medium text-amber-foreground">
              Invitation required
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Creating an admin account requires an active invitation from an
              existing super admin. The invite link must match the email below.
            </p>
          </div>
        </div>

        <Card className="rounded-2xl bg-card text-card-foreground">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field
                id="admin-signup-name"
                label="Full name"
                icon={UserIcon}
                placeholder="Alex Kane"
                autoComplete="name"
                value={name}
                onChange={setName}
              />

              <Field
                id="admin-signup-email"
                label="Work email"
                icon={Mail}
                type="email"
                placeholder="alex@eagleeyerides.com"
                autoComplete="email"
                value={email}
                onChange={setEmail}
              />

              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="admin-signup-role"
                  className="text-xs text-muted-foreground"
                >
                  Role
                </Label>
                <Select
                  value={role}
                  onValueChange={(v) => setRole(v as AdminRole)}
                >
                  <SelectTrigger id="admin-signup-role" className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(roleMeta) as AdminRole[]).map((key) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex flex-col leading-tight">
                          <span className="font-medium">
                            {roleMeta[key].label}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {roleMeta[key].description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <PasswordField
                id="admin-signup-password"
                label="Password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                value={password}
                onChange={setPassword}
                show={showPassword}
                onToggleShow={() => setShowPassword((s) => !s)}
              />

              <PasswordConfirmField
                id="admin-signup-confirm"
                label="Confirm password"
                placeholder="Re-enter password"
                autoComplete="new-password"
                value={confirm}
                onChange={setConfirm}
                show={showPassword}
                onToggleShow={() => setShowPassword((s) => !s)}
                onBlur={() => setTouched(true)}
                error={showMismatchError}
              />

              {password.length > 0 && (
                <PasswordStrength password={password} />
              )}

              <Button
                type="submit"
                className="mt-1 h-10 w-full gap-1.5"
                disabled={submitting || !canSubmit}
              >
                <KeyRound className="size-4" aria-hidden />
                {submitting ? "Creating account…" : "Create admin account"}
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
                Back to sign in
              </a>
              <p className="text-[11px] text-muted-foreground">
                New admin activity is recorded in the audit log immediately.
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
  onBlur?: () => void;
  error?: boolean;
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
  onBlur,
  error,
}: PasswordFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Lock
          className={cn(
            "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2",
            error ? "text-destructive" : "text-muted-foreground",
          )}
          aria-hidden
        />
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            "h-10 pl-9 pr-9",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
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

// Alias to keep the confirm password visually consistent.
const PasswordConfirmField = PasswordField;

function PasswordStrength({ password }: { password: string }) {
  const score = computePasswordScore(password);
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  const tones = [
    "bg-muted-foreground/40",
    "bg-destructive",
    "bg-amber",
    "bg-cyan",
    "bg-success",
  ];
  const textTones = [
    "text-muted-foreground",
    "text-destructive",
    "text-amber",
    "text-cyan",
    "text-success",
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < score ? tones[score] : "bg-muted",
            )}
            aria-hidden
          />
        ))}
      </div>
      <p className={cn("text-[11px]", textTones[score])}>
        {labels[score]}
        {score < 4 && password.length >= 8 && (
          <span className="text-muted-foreground">
            {" · "}use letters, numbers and a symbol
          </span>
        )}
      </p>
    </div>
  );
}

function computePasswordScore(password: string): number {
  if (password.length < 8) return 0;
  let score = 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

export default AdminSignupScreen;
