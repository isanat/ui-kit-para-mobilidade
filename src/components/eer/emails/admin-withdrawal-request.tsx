import { Wallet, AlertTriangle } from "lucide-react";
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

export interface AdminWithdrawalRequestEmailProps {
  driverName: string;
  /** Pre-formatted amount, e.g. "$245.00". */
  amount: string;
  /** Withdrawal method, e.g. "Bank transfer •••• 4821". */
  method: string;
  /** Pre-formatted requested date, e.g. "Apr 12, 2025 · 4:32 PM". */
  requestedDate: string;
}

/**
 * Withdrawal request for review — sent to admin when a driver submits a
 * payout request. Shows the driver name, amount, method, and requested
 * date. Primary CTA: "Review request". Includes an amber-flag notice
 * banner so admins can prioritize high-value payouts.
 */
export function AdminWithdrawalRequestEmail({
  driverName,
  amount,
  method,
  requestedDate,
}: AdminWithdrawalRequestEmailProps) {
  return (
    <EmailLayout>
      <EmailHeading icon={<Wallet className="size-5" />} tone="amber">
        Withdrawal request for review
      </EmailHeading>

      <EmailGreeting name="Admin" />
      <EmailParagraph>
        A driver has submitted a withdrawal request. Review the details
        below and approve or reject from the admin console.
      </EmailParagraph>

      <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
        <AlertTriangle
          className="mt-0.5 size-4 shrink-0 text-amber-600"
          aria-hidden
        />
        <p className="text-xs leading-relaxed text-amber-800">
          Payouts should be reviewed within{" "}
          <span className="font-semibold">24 hours</span> to meet the
          Eagle Eye Rides SLA. High-value requests may require additional
          verification.
        </p>
      </div>

      <EmailSectionLabel>Request</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          { label: "Driver", value: driverName },
          {
            label: "Amount",
            value: <span className="font-semibold">{amount}</span>,
          },
          { label: "Method", value: method },
          { label: "Requested", value: requestedDate },
        ]}
      />

      <EmailCTA>
        <EmailButton href="#" tone="amber">
          Review request
        </EmailButton>
      </EmailCTA>

      <EmailParagraph>
        You can also view all pending withdrawals under the{" "}
        <span className="font-medium text-gray-900">Payments</span> tab in
        the admin console.
      </EmailParagraph>
    </EmailLayout>
  );
}
