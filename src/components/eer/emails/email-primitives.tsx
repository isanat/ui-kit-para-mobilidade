import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Eagle Eye Rides — email-safe shared primitives.
 *
 * All brand color values are hardcoded as oklch strings (no CSS variables)
 * because email HTML cannot resolve Tailwind theme tokens at render time.
 * The values mirror the light-theme tokens from `src/app/globals.css`.
 */
export const emailColors = {
  brand: "oklch(0.55 0.2 262)",
  brandFg: "oklch(0.99 0 0)",
  cyan: "oklch(0.7 0.13 215)",
  amber: "oklch(0.72 0.16 55)",
  magenta: "oklch(0.6 0.22 330)",
  gold: "oklch(0.82 0.15 90)",
  goldFg: "oklch(0.25 0.04 262)",
  success: "oklch(0.7 0.16 155)",
  destructive: "oklch(0.58 0.22 27)",
} as const;

export type EmailTone =
  | "brand"
  | "cyan"
  | "amber"
  | "magenta"
  | "gold"
  | "success"
  | "destructive";

const toneColor: Record<EmailTone, string> = {
  brand: emailColors.brand,
  cyan: emailColors.cyan,
  amber: emailColors.amber,
  magenta: emailColors.magenta,
  gold: emailColors.gold,
  success: emailColors.success,
  destructive: emailColors.destructive,
};

/**
 * Eagle Eye Rides logo mark — inline SVG (an eagle-eye / target reticle in
 * gold on a brand-blue tile). Uses no `next/image` so it renders in email
 * HTML and inside the dark showcase alike.
 */
export function EmailLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className="flex size-7 items-center justify-center rounded-md"
        style={{ backgroundColor: emailColors.brand }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <circle cx="12" cy="12" r="8" stroke={emailColors.gold} strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill={emailColors.gold} />
        </svg>
      </div>
      <span className="text-[15px] font-bold tracking-tight text-gray-900">
        Eagle Eye Rides
      </span>
    </div>
  );
}

/**
 * Primary call-to-action button — a styled anchor (NOT shadcn `<Button>`)
 * so it renders as a real link in email clients. Uses the exact brand
 * oklch value (0.55 0.2 262) from the design tokens.
 */
export function EmailButton({
  href,
  children,
  tone = "brand",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: EmailTone;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-block rounded-lg px-6 py-3 text-sm font-semibold text-white no-underline",
        className,
      )}
      style={{ backgroundColor: toneColor[tone] }}
    >
      {children}
    </a>
  );
}

/** Secondary outline link styled as a subtle button (for "Decline", "Call", etc.). */
export function EmailLinkSecondary({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-block rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 no-underline",
        className,
      )}
    >
      {children}
    </a>
  );
}

/** Tertiary inline text link (for "Message driver", "Contact support"). */
export function EmailLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700",
        className,
      )}
    >
      {children}
    </a>
  );
}

export interface EmailDetailRow {
  label: string;
  /** Right-aligned value; can be a string or rich JSX (e.g. mono codes). */
  value: React.ReactNode;
}

/**
 * Light-gray details card with key/value rows. Use `rows` for a clean
 * label/value grid, or pass `children` for a custom layout (fare
 * breakdowns, route previews, etc.).
 */
export function EmailDetailsBox({
  rows,
  className,
  children,
}: {
  rows?: EmailDetailRow[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-gray-50 p-4",
        className,
      )}
    >
      {rows && rows.length > 0 && (
        <dl className="space-y-2">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <dt className="text-gray-500">{row.label}</dt>
              <dd className="text-right font-medium text-gray-900">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {children}
    </div>
  );
}

/** Standard footer: company line, manage/unsubscribe links, copyright. */
export function EmailFooter() {
  const year = new Date().getFullYear();
  return (
    <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
      <p className="font-medium text-gray-500">Eagle Eye Rides · Boston, MA</p>
      <p className="mt-1">
        <a href="#" className="text-gray-400 underline hover:text-gray-600">
          Manage notifications
        </a>{" "}
        ·{" "}
        <a href="#" className="text-gray-400 underline hover:text-gray-600">
          Unsubscribe
        </a>
      </p>
      <p className="mt-2">
        © {year} Eagle Eye Rides, Inc. All rights reserved.
      </p>
    </div>
  );
}

/**
 * EmailLayout — outer white-bg email body. Renders the centered logo,
 * then the email content, then the standard footer. Every transactional
 * email in this folder wraps its body in `<EmailLayout>`.
 */
export function EmailLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-white px-6 py-8 text-gray-900", className)}>
      <div className="mb-6 flex justify-center">
        <EmailLogo />
      </div>
      {children}
      <EmailFooter />
    </div>
  );
}

/** Topic heading with an optional accent icon-pill (e.g. ✅ for confirmations). */
export function EmailHeading({
  children,
  icon,
  tone = "brand",
  className,
}: {
  children: React.ReactNode;
  /** Lucide icon node rendered inside a colored circle. */
  icon?: React.ReactNode;
  tone?: EmailTone;
  className?: string;
}) {
  return (
    <div className={cn("mb-4", className)}>
      {icon && (
        <div
          className="mb-3 inline-flex size-10 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: toneColor[tone] }}
          aria-hidden
        >
          {icon}
        </div>
      )}
      <h1 className="text-xl font-bold tracking-tight text-gray-900">
        {children}
      </h1>
    </div>
  );
}

/** Greeting line — "Hi {name},". */
export function EmailGreeting({ name }: { name: string }) {
  return (
    <p className="mb-3 text-[15px] font-medium text-gray-900">Hi {name},</p>
  );
}

/** Body paragraph — small, relaxed, secondary color. */
export function EmailParagraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mb-3 text-sm leading-relaxed text-gray-600", className)}>
      {children}
    </p>
  );
}

/** Centered CTA row (button(s) + optional secondary link). */
export function EmailCTA({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("my-5 text-center", className)}>{children}</div>
  );
}

/** Small label that sits above a details box (e.g. "Ride details"). */
export function EmailSectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
