import { XCircle, ArrowRight } from "lucide-react";
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

export interface WithdrawalRejectedEmailProps {
  driverName: string;
  /** Pre-formatted amount, e.g. "$245.00". */
  amount: string;
  /** Reason for rejection (e.g. "Payout method not verified"). */
  reason: string;
}

/**
 * Withdrawal rejected — sent to the driver when their payout request is
 * declined. Tone is subdued. Shows the amount + reason. Primary CTA:
 * "Contact support".
 */
export function WithdrawalRejectedEmail({
  driverName,
  amount,
  reason,
}: WithdrawalRejectedEmailProps) {
  return (
    <EmailLayout>
      <EmailHeading icon={<XCircle className="size-5" />} tone="destructive">
        Withdrawal request update
      </EmailHeading>

      <EmailGreeting name={driverName} />
      <EmailParagraph>
        We weren&apos;t able to process your recent withdrawal request. The
        amount remains in your available balance — no funds have left your
        account.
      </EmailParagraph>

      <EmailSectionLabel>Request details</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          {
            label: "Amount",
            value: <span className="font-semibold">{amount}</span>,
          },
          {
            label: "Reason",
            value: <span className="text-red-700">{reason}</span>,
          },
        ]}
      />

      <EmailSectionLabel className="mt-5">How to fix this</EmailSectionLabel>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <ol className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="font-semibold text-gray-900">1.</span>
            <span>
              Open the <span className="font-medium text-gray-900">Earnings</span>{" "}
              tab in the driver app.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-gray-900">2.</span>
            <span>
              Verify your payout method under{" "}
              <span className="font-medium text-gray-900">Payout settings</span>.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-gray-900">3.</span>
            <span>
              Re-submit your withdrawal request once everything is verified.
            </span>
          </li>
        </ol>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
          <span>Need help?</span>
          <ArrowRight className="size-3" aria-hidden />
          <span>Use the support button below.</span>
        </div>
      </div>

      <EmailCTA>
        <EmailButton href="#" tone="destructive">
          Contact support
        </EmailButton>
      </EmailCTA>

      <EmailParagraph>
        Our support team is available 24/7 and happy to walk you through
        resolving this.
      </EmailParagraph>
    </EmailLayout>
  );
}
