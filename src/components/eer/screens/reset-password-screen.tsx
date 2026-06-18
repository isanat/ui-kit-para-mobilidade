"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Strength = {
  level: 0 | 1 | 2 | 3;
  label: string;
  color: string;
  barColor: string;
};

function getStrength(pw: string): Strength {
  if (!pw) {
    return {
      level: 0,
      label: "Enter a password",
      color: "text-muted-foreground",
      barColor: "bg-muted",
    };
  }
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;

  if (pw.length < 8) {
    return {
      level: 1,
      label: "Too short — at least 8 characters",
      color: "text-destructive",
      barColor: "bg-destructive",
    };
  }
  if (score <= 1) {
    return {
      level: 1,
      label: "Weak",
      color: "text-destructive",
      barColor: "bg-destructive",
    };
  }
  if (score === 2) {
    return {
      level: 2,
      label: "Medium",
      color: "text-amber",
      barColor: "bg-amber",
    };
  }
  return {
    level: 3,
    label: "Strong",
    color: "text-success",
    barColor: "bg-success",
  };
}

export function ResetPasswordScreen() {
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const strength = useMemo(() => getStrength(pw), [pw]);
  const match = confirm.length > 0 && pw === confirm;
  const mismatch = confirm.length > 0 && pw !== confirm;
  const canSubmit = pw.length >= 8 && match && strength.level >= 1;

  if (done) {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
          <span className="flex size-20 items-center justify-center rounded-3xl bg-success/15 text-success ring-1 ring-inset ring-success/30">
            <CheckCircle2 className="size-10" aria-hidden />
          </span>
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold text-foreground">
              Password updated
            </h1>
            <p className="text-sm text-muted-foreground">
              You can now sign in with your new password. Your other devices
              may have been signed out.
            </p>
          </div>
          <Button className="h-12 w-full text-base">
            <ArrowLeft className="size-4" aria-hidden />
            Back to sign in
          </Button>
        </div>
        <div className="flex items-center justify-center gap-1.5 pb-6 text-xs text-muted-foreground">
          <span className="relative flex size-5 items-center justify-center overflow-hidden rounded-md bg-card ring-1 ring-inset ring-border">
            <Image
              src="/eagle-logo-dark.png"
              alt=""
              fill
              sizes="20px"
              className="object-contain p-0.5"
            />
          </span>
          Eagle Eye Rides
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
        <span className="relative flex size-16 items-center justify-center overflow-hidden rounded-2xl bg-card ring-1 ring-inset ring-border">
          <Image
            src="/eagle-logo-dark.png"
            alt="Eagle Eye Rides logo"
            fill
            sizes="64px"
            className="object-contain p-2"
          />
        </span>

        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            Set a new password
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a strong password you haven&apos;t used before.
          </p>
        </div>

        <form
          className="w-full space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            setDone(true);
          }}
        >
          {/* New password */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">New password</p>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••"
                className="h-11 pl-9 pr-9"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground"
              >
                {showPw ? (
                  <EyeOff className="size-4" aria-hidden />
                ) : (
                  <Eye className="size-4" aria-hidden />
                )}
              </button>
            </div>
            {/* Strength meter */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3].map((seg) => (
                  <span
                    key={seg}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      strength.level >= seg ? strength.barColor : "bg-muted",
                    )}
                  />
                ))}
              </div>
              <span className={cn("text-xs font-medium", strength.color)}>
                {strength.label}
              </span>
            </div>
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Confirm password</p>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your new password"
                className={cn(
                  "h-11 pl-9 pr-9",
                  mismatch && "border-destructive focus-visible:ring-destructive/30",
                )}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground"
              >
                {showConfirm ? (
                  <EyeOff className="size-4" aria-hidden />
                ) : (
                  <Eye className="size-4" aria-hidden />
                )}
              </button>
            </div>
            {match && (
              <p className="inline-flex items-center gap-1 text-xs text-success">
                <Check className="size-3" aria-hidden />
                Passwords match
              </p>
            )}
            {mismatch && (
              <p className="text-xs text-destructive">
                Passwords don&apos;t match
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-12 w-full text-base"
            disabled={!canSubmit}
          >
            Update password
          </Button>
        </form>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to sign in
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 pb-6 text-xs text-muted-foreground">
        <span className="relative flex size-5 items-center justify-center overflow-hidden rounded-md bg-card ring-1 ring-inset ring-border">
          <Image
            src="/eagle-logo-dark.png"
            alt=""
            fill
            sizes="20px"
            className="object-contain p-0.5"
          />
        </span>
        Eagle Eye Rides
      </div>
    </div>
  );
}
