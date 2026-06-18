"use client";

import { useState } from "react";
import {
  Apple,
  Car,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Role = "user" | "driver";
type Mode = "login" | "signup";

export function AuthScreen() {
  const [role, setRole] = useState<Role>("user");
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Logo */}
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
              Welcome to Eagle Eye Rides
            </h1>
            <p className="text-sm text-muted-foreground">
              Your journey, our wings.
            </p>
          </div>
        </div>

        {/* Role toggle */}
        <SegmentedToggle
          options={[
            { id: "user", label: "User" },
            { id: "driver", label: "Driver" },
          ]}
          value={role}
          onChange={(v) => setRole(v as Role)}
        />

        {/* Mode toggle */}
        <SegmentedToggle
          options={[
            { id: "login", label: "Login" },
            { id: "signup", label: "Sign up" },
          ]}
          value={mode}
          onChange={(v) => setMode(v as Mode)}
        />

        {/* Forms */}
        {mode === "login" ? (
          <div className="space-y-3">
            <Field
              icon={Mail}
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
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
            <Button className="h-12 w-full text-base">Log in</Button>

            <Divider />

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-11">
                <GoogleIcon className="size-4" aria-hidden />
                Google
              </Button>
              <Button variant="outline" className="h-11">
                <Apple className="size-4" aria-hidden />
                Apple
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Field
              icon={UserIcon}
              label="Full name"
              placeholder="Jane Doe"
            />
            <Field
              icon={Mail}
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
            <Field
              icon={Phone}
              label="Phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
            />
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">Password</p>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="h-11 pl-9 pr-9"
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

            {role === "driver" && (
              <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <Car className="size-4 text-primary" aria-hidden />
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    Driver details
                  </p>
                </div>
                <Field
                  icon={Car}
                  label="License number"
                  placeholder="DL-000-0000"
                />
                <Field
                  icon={Car}
                  label="Vehicle plate"
                  placeholder="EAG-4821"
                />
              </div>
            )}

            <Button className="h-12 w-full text-base">Create account</Button>
          </div>
        )}
      </div>

      <div className="border-t border-border bg-card px-5 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing you agree to our{" "}
          <button type="button" className="text-foreground hover:underline">
            Terms
          </button>{" "}
          &{" "}
          <button type="button" className="text-foreground hover:underline">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
}

interface SegmentedToggleProps {
  options: { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

function SegmentedToggle({ options, value, onChange }: SegmentedToggleProps) {
  return (
    <div className="flex w-full items-center rounded-xl bg-muted p-1">
      {options.map((option) => {
        const isActive = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

interface FieldProps {
  icon: typeof Mail;
  label: string;
  type?: string;
  placeholder?: string;
}

function Field({ icon: Icon, label, type = "text", placeholder }: FieldProps) {
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
        />
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">or</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
    >
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}
