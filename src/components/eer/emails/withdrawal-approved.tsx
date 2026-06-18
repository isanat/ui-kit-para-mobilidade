import { CheckCircle, Banknote } from "lucide-react";
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

export interface WithdrawalApprovedEmailProps {
  driverName: string;
  /** Pre-formatted amount, e.g. "$245.00". */
  amount: string;
  /** Withdrawal method, e.g. "Bank transfer •••• 4821". */
  method: string;
  /** Pre-formatted processed date, e.g. "Apr 12, 2025". */
  processedDate: string;
  /** Pre-formatted expected-arrival date, e.g. "Apr 14, 2025". */
  expectedArrival: string;
}

/**
 * Withdrawal approved — sent to the driver when their payout request is
 * approved. Shows the amount, method, processed date, and expected
 * arrival. Primary CTA: "View earnings".
 */
export function WithdrawalApprovedEmail({
  driverName,
  amount,
  method,
  processedDate,
  expectedArrival,
}: WithdrawalApprovedEmailProps) {
  return (
    <EmailLayout>
      <EmailHeading icon={<CheckCircle className="size-5" />} tone="success">
        Your withdrawal was approved
      </EmailHeading>

      <EmailGreeting name={driverName} />
      <EmailParagraph>
        Good news — your withdrawal request has been approved and is on its
        way. Funds typically arrive within 1–3 business days.
      </EmailParagraph>

      <EmailSectionLabel>Payout summary</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          {
            label: "Amount",
            value: <span className="font-semibold">{amount}</span>,
          },
          { label: "Method", value: method },
          { label: "Processed", value: processedDate },
          {
            label: "Expected arrival",
            value: (
              <span className="inline-flex items-center gap-1.5">
                <Banknote className="size-3.5 text-gray-500" aria-hidden />
                {expectedArrival}
              </span>
            ),
          },
        ]}
      />

      <EmailCTA>
        <EmailButton href="#" tone="success">
          View earnings
        </EmailButton>
      </EmailCTA>

      <EmailParagraph>
        You can track payout history anytime from the Earnings tab in the
        driver app. Thanks for driving with Eagle Eye Rides.
      </EmailParagraph>
    </EmailLayout>
  );
}
