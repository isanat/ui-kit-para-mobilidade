import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmailFrameSender {
  name: string;
  email: string;
}

export interface EmailFrameProps {
  /** Email subject line shown in the header bar. */
  subject: string;
  /** Sender info shown on the From line. Defaults to Eagle Eye Rides noreply. */
  from?: EmailFrameSender;
  /** Optional recipient preview (e.g. "jane@example.com"). */
  to?: string;
  /** Optional preview snippet shown after the subject (the "preview text"). */
  preview?: string;
  /** Optional date shown on the From row, like an email client timestamp. */
  date?: string;
  /** Email body. Should typically be an EER email component (which renders its own white-bg layout). */
  children: React.ReactNode;
  className?: string;
}

/**
 * EmailFrame — email-client-style chrome that wraps an EER email body so it
 * previews nicely inside the dark showcase. Renders a max-w-md white card
 * with a subtle gray header bar (From / To / Subject) above the email body.
 *
 * The email body component itself provides the white background and content
 * (logo, greeting, body, CTA, details, footer); EmailFrame just adds the
 * "From / Subject" metadata strip on top.
 */
export function EmailFrame({
  subject,
  from = { name: "Eagle Eye Rides", email: "noreply@eagleeyerides.com" },
  to,
  preview,
  date,
  children,
  className,
}: EmailFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-white shadow-xl",
        className,
      )}
    >
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="min-w-0 truncate font-medium text-gray-700">
            From: {from.name}{" "}
            <span className="text-gray-500">&lt;{from.email}&gt;</span>
          </span>
          {date && (
            <span className="shrink-0 text-gray-400">{date}</span>
          )}
        </div>
        {to && (
          <div className="mt-0.5 truncate text-xs text-gray-500">To: {to}</div>
        )}
        <div className="mt-2 flex items-baseline justify-between gap-3">
          <h2 className="min-w-0 truncate text-sm font-semibold text-gray-900">
            {subject}
          </h2>
          {preview && (
            <span className="hidden shrink-0 truncate text-xs text-gray-400 sm:inline">
              — {preview}
            </span>
          )}
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
