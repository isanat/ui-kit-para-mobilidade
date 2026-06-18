"use client";

import { useState } from "react";
import { Car, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DriverSigninScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Logo + headline */}
        <div className="flex flex-col items-center gap-3 pt-2 text-center">
          <span className="relative flex size-16 items-center justify-center overflow-hidden rounded-2xl bg-card ring-1 ring-inset ring-border">
            <Image
              src="/eagle-logo-dark.png"
              alt="Eagle Eye Rides logo"
              fill
              sizes="64px"
              className="object-contain p-2"
            />
          </span>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-foreground">
              Eagle Eye Rides
            </h1>
            <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <Car className="size-4" aria-hidden />
              Driver app
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Email</p>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="email"
                placeholder="driver@example.com"
                className="h-11 pl-9"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Password</p>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-11 pl-9 pr-9"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 flex size-5 -translate-y-1/2 items-center justify-center text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden />
                ) : (
                  <Eye className="size-4" aria-hidden />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button className="h-12 w-full text-base">
            <Car className="size-4" aria-hidden />
            Sign in to drive
          </Button>
        </div>

        {/* Divider + sign-up link */}
        <div className="space-y-4 pt-2 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have a driver account?{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      <div className="border-t border-border bg-card px-5 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          By signing in you agree to the{" "}
          <button
            type="button"
            className="text-foreground hover:underline"
          >
            Driver Agreement
          </button>
          .
        </p>
      </div>
    </div>
  );
}
