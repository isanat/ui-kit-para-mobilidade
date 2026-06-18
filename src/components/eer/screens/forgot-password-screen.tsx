"use client";

import { useState } from "react";
import { ArrowLeft, Mail, MailCheck, RefreshCw } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10">
          <span className="flex size-20 items-center justify-center rounded-3xl bg-success/15 text-success ring-1 ring-inset ring-success/30">
            <MailCheck className="size-10" aria-hidden />
          </span>
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold text-foreground">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground">
              We sent a password reset link to
            </p>
            <p className="text-sm font-semibold text-foreground">{email}</p>
            <p className="pt-1 text-xs text-muted-foreground">
              Didn&apos;t get it? Check your spam folder or try again in a
              minute.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3">
            <Button
              variant="outline"
              className="h-11 w-full"
              onClick={() => {
                setSubmitted(false);
              }}
            >
              <RefreshCw className="size-4" aria-hidden />
              Resend link
            </Button>
            <Button
              variant="ghost"
              className="h-11 w-full text-muted-foreground"
              onClick={() => setSubmitted(false)}
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to sign in
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
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the email associated with your account and we&apos;ll send you
            a link to reset your password.
          </p>
        </div>

        <form
          className="w-full space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.trim()) return;
            setSubmitted(true);
          }}
        >
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Email address</p>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 pl-9"
                autoComplete="email"
              />
            </div>
          </div>

          <Button type="submit" className="h-12 w-full text-base">
            <Mail className="size-4" aria-hidden />
            Send reset link
          </Button>
        </form>

        <button
          type="button"
          onClick={() => undefined}
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
