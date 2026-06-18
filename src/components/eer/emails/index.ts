/**
 * Eagle Eye Rides — email templates barrel.
 *
 * Exports the `EmailFrame` preview wrapper and the 10 transactional email
 * components that mirror the real eagleeyerides `views/emails/*.ejs`
 * templates.
 *
 * Usage (showcase):
 * ```tsx
 * <EmailFrame subject="Your ride is confirmed" to="jane@example.com">
 *   <BookingConfirmationEmail {...props} />
 * </EmailFrame>
 * ```
 *
 * The shared primitives in `email-primitives.tsx` (EmailLayout, EmailButton,
 * EmailDetailsBox, EmailFooter, etc.) are intentionally NOT re-exported —
 * they are internal building blocks used by the 10 email components.
 */

export { EmailFrame } from "./email-frame";
export type { EmailFrameProps, EmailFrameSender } from "./email-frame";

export { BookingConfirmationEmail } from "./booking-confirmation";
export type { BookingConfirmationEmailProps } from "./booking-confirmation";

export { BookingCancelledEmail } from "./booking-cancelled";
export type { BookingCancelledEmailProps } from "./booking-cancelled";

export { PaymentReceiptEmail } from "./payment-receipt";
export type {
  PaymentReceiptEmailProps,
  PaymentReceiptItem,
} from "./payment-receipt";

export { DriverAssignedNotificationEmail } from "./driver-assigned-notification";
export type { DriverAssignedNotificationEmailProps } from "./driver-assigned-notification";

export { DriverAssignedPassengerEmail } from "./driver-assigned-passenger";
export type { DriverAssignedPassengerEmailProps } from "./driver-assigned-passenger";

export { AdminDriverAssignmentEmail } from "./admin-driver-assignment";
export type { AdminDriverAssignmentEmailProps } from "./admin-driver-assignment";

export { AdminWithdrawalRequestEmail } from "./admin-withdrawal-request";
export type { AdminWithdrawalRequestEmailProps } from "./admin-withdrawal-request";

export { WithdrawalApprovedEmail } from "./withdrawal-approved";
export type { WithdrawalApprovedEmailProps } from "./withdrawal-approved";

export { WithdrawalRejectedEmail } from "./withdrawal-rejected";
export type { WithdrawalRejectedEmailProps } from "./withdrawal-rejected";

export { ResetPasswordEmail } from "./reset-password";
export type { ResetPasswordEmailProps } from "./reset-password";
