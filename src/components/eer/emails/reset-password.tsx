import { KeyRound, Clock } from "lucide-react";
import {
  EmailLayout,
  EmailHeading,
  EmailGreeting,
  EmailParagraph,
  EmailButton,
  EmailCTA,
} from "./email-primitives";

export interface ResetPasswordEmailProps {
  userName: string;
  /** Reset link URL. Falls back to a placeholder "#" if not provided. */
  resetUrl?: string;
}

/**
 * Password reset — sent to a user when they request a password reset.
 * Contains the big "Reset password" CTA (the reset link), a safety note
 * ("If you didn't request this, you can safely ignore this email"), and
 * an expiry note (30 minutes).
 */
export function ResetPasswordEmail({
  userName,
  resetUrl = "#",
}: ResetPasswordEmailProps) {
  return (
    <EmailLayout>
      <EmailHeading icon={<KeyRound className="size-5" />} tone="brand">
        Reset your password
      </EmailHeading>

      <EmailGreeting name={userName} />
      <EmailParagraph>
        We received a request to reset your Eagle Eye Rides password. Click
        the button below to choose a new one.
      </EmailParagraph>

      <EmailCTA>
        <EmailButton href={resetUrl}>Reset password</EmailButton>
      </EmailCTA>

      <div className="mb-5 flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <Clock className="mt-0.5 size-4 shrink-0 text-gray-500" aria-hidden />
        <p className="text-xs leading-relaxed text-gray-600">
          This link expires in <span className="font-semibold">30 minutes</span>.
          If it has expired, you can request a new one from the login screen.
        </p>
      </div>

      <EmailParagraph>
        If you didn&apos;t request a password reset, you can safely ignore
        this email — your password has not been changed.
      </EmailParagraph>
    </EmailLayout>
  );
}
