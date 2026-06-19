import { Check, Star } from "lucide-react";
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

export interface BookingConfirmationEmailProps {
  riderName: string;
  bookingId: string;
  pickup: string;
  destination: string;
  /** Pre-formatted date/time, e.g. "Today · 4:30 PM". */
  dateTime: string;
  /** Vehicle tier, e.g. "Black SUV". */
  vehicle: string;
  driverName: string;
  rating: number;
  plate: string;
  /** Pre-formatted fare, e.g. "$28.45". */
  fare: string;
}

/**
 * Booking confirmation — sent to the rider when a ride is matched.
 * Shows the booking ID, route, date/time, vehicle tier, driver + rating +
 * plate, and fare. Primary CTA: "View ride".
 */
export function BookingConfirmationEmail({
  riderName,
  bookingId,
  pickup,
  destination,
  dateTime,
  vehicle,
  driverName,
  rating,
  plate,
  fare,
}: BookingConfirmationEmailProps) {
  return (
    <EmailLayout>
      <EmailHeading icon={<Check className="size-5" />} tone="success">
        Your ride is confirmed
      </EmailHeading>

      <EmailGreeting name={riderName} />
      <EmailParagraph>
        We&apos;ve matched you with a driver for your upcoming trip. Here are
        the details — keep this email for your records.
      </EmailParagraph>

      <EmailSectionLabel>Ride details</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          { label: "Booking ID", value: <span className="font-mono">{bookingId}</span> },
          { label: "Pickup", value: pickup },
          { label: "Destination", value: destination },
          { label: "Date & time", value: dateTime },
          { label: "Vehicle tier", value: vehicle },
          {
            label: "Driver",
            value: (
              <span className="inline-flex items-center gap-1.5">
                {driverName}
                <span className="inline-flex items-center gap-0.5 text-amber-500">
                  <Star className="size-3 fill-amber-500" aria-hidden />
                  {rating.toFixed(1)}
                </span>
              </span>
            ),
          },
          { label: "Plate", value: <span className="font-mono">{plate}</span> },
          {
            label: "Fare",
            value: <span className="font-semibold">{fare}</span>,
          },
        ]}
      />

      <EmailCTA>
        <EmailButton href="#">View ride</EmailButton>
      </EmailCTA>

      <EmailParagraph>
        Your driver will arrive at the pickup location at the scheduled time.
        You&apos;ll receive a notification when they&apos;re on the way.
      </EmailParagraph>
    </EmailLayout>
  );
}
