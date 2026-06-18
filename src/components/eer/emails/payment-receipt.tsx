import { ReceiptText } from "lucide-react";
import {
  EmailLayout,
  EmailHeading,
  EmailGreeting,
  EmailParagraph,
  EmailButton,
  EmailDetailsBox,
  EmailCTA,
  EmailSectionLabel,
  type EmailDetailRow,
} from "./email-primitives";

export interface PaymentReceiptItem {
  label: string;
  /** Pre-formatted amount, e.g. "$12.30". */
  amount: string;
}

export interface PaymentReceiptEmailProps {
  riderName: string;
  receiptId: string;
  /** Short ride summary, e.g. "Back Bay → Logan Airport". */
  rideSummary: string;
  /** Fare breakdown line items (base, time, distance, tip, promo, etc.). */
  items: PaymentReceiptItem[];
  /** Pre-formatted grand total, e.g. "$28.45". */
  total: string;
  /** Payment method, e.g. "Visa •••• 4242". */
  paymentMethod: string;
  /** Pre-formatted date, e.g. "Apr 12, 2025". */
  date: string;
}

/**
 * Payment receipt — sent to the rider after a completed ride.
 * Shows the receipt ID, ride summary, full fare breakdown (line items +
 * total), payment method, and date. Primary CTA: "Download receipt".
 */
export function PaymentReceiptEmail({
  riderName,
  receiptId,
  rideSummary,
  items,
  total,
  paymentMethod,
  date,
}: PaymentReceiptEmailProps) {
  const breakdownRows: EmailDetailRow[] = items.map((item) => ({
    label: item.label,
    value: item.amount,
  }));

  return (
    <EmailLayout>
      <EmailHeading icon={<ReceiptText className="size-5" />} tone="brand">
        Payment receipt
      </EmailHeading>

      <EmailGreeting name={riderName} />
      <EmailParagraph>
        Thanks for riding with Eagle Eye Rides. Here&apos;s your receipt for
        the trip below — keep it for your records or expense it as needed.
      </EmailParagraph>

      <EmailSectionLabel>Receipt</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          { label: "Receipt #", value: <span className="font-mono">{receiptId}</span> },
          { label: "Ride", value: rideSummary },
          { label: "Date", value: date },
          { label: "Payment method", value: paymentMethod },
        ]}
      />

      <EmailSectionLabel className="mt-5">Fare breakdown</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          ...breakdownRows,
          {
            label: "Total",
            value: <span className="text-base font-bold">{total}</span>,
          },
        ]}
      />

      <EmailCTA>
        <EmailButton href="#">Download receipt</EmailButton>
      </EmailCTA>

      <EmailParagraph>
        View all your past rides and receipts anytime from the Wallet tab in
        the Eagle Eye Rides app.
      </EmailParagraph>
    </EmailLayout>
  );
}
