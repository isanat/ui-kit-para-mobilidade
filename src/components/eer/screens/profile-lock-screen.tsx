"use client";

import { useState } from "react";
import { Eye, EyeOff, Fingerprint, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ProfileLockScreen() {
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
        {/* Lock badge */}
        <span className="flex size-20 items-center justify-center rounded-3xl bg-amber/15 text-amber ring-1 ring-inset ring-amber/30">
          <Lock className="size-9" aria-hidden />
        </span>

        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            Verify it&apos;s you
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your password to continue. This extra step keeps your account
            safe.
          </p>
        </div>

        <form
          className="w-full space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Password</p>
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
                autoComplete="current-password"
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
          </div>

          <Button type="submit" className="h-12 w-full text-base" disabled={!pw}>
            <Lock className="size-4" aria-hidden />
            Unlock
          </Button>
        </form>

        <div className="flex w-full flex-col items-center gap-3">
          <button
            type="button"
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </button>

          <div className="flex w-full items-center gap-3 py-1">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="h-11 w-full">
            <Fingerprint className="size-5" aria-hidden />
            Use biometrics
          </Button>
        </div>
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
