import { Ban } from "lucide-react";
import {
  EmailLayout,
  EmailHeading,
  EmailGreeting,
  EmailParagraph,
  EmailButton,
  EmailDetailsBox,
  EmailCTA,
  EmailSectionLabel,
} from "./email-primitives";

export interface BookingCancelledEmailProps {
  riderName: string;
  bookingId: string;
  reason: string;
  /** Pre-formatted refund amount, e.g. "$28.45". */
  refundAmount: string;
  /** Refund method, e.g. "Visa •••• 4242". */
  refundMethod: string;
}

/**
 * Booking cancellation — sent to the rider when a ride is cancelled.
 * Tone is subdued (destructive icon-pill). Shows the booking ID, reason,
 * refund amount + method. Primary CTA: "Book a new ride".
 */
export function BookingCancelledEmail({
  riderName,
  bookingId,
  reason,
  refundAmount,
  refundMethod,
}: BookingCancelledEmailProps) {
  return (
    <EmailLayout>
      <EmailHeading icon={<Ban className="size-5" />} tone="destructive">
        Your ride was cancelled
      </EmailHeading>

      <EmailGreeting name={riderName} />
      <EmailParagraph>
        We&apos;re sorry, but your ride has been cancelled. A full refund has
        been initiated and will appear on your original payment method within
        3–5 business days.
      </EmailParagraph>

      <EmailSectionLabel>Cancellation summary</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          { label: "Booking ID", value: <span className="font-mono">{bookingId}</span> },
          { label: "Reason", value: reason },
          {
            label: "Refund amount",
            value: <span className="font-semibold">{refundAmount}</span>,
          },
          { label: "Refund method", value: refundMethod },
        ]}
      />

      <EmailCTA>
        <EmailButton href="#">Book a new ride</EmailButton>
      </EmailCTA>

      <EmailParagraph>
        Need help? Reply to this email or reach our support team anytime —
        we&apos;re here 24/7.
      </EmailParagraph>
    </EmailLayout>
  );
}
