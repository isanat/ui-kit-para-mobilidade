import { Car, Phone, MessageSquare, Star } from "lucide-react";
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

export interface DriverAssignedNotificationEmailProps {
  riderName: string;
  driverName: string;
  rating: number;
  /** Vehicle description, e.g. "Black Toyota Camry". */
  vehicle: string;
  plate: string;
  /** ETA, e.g. "4 min". */
  eta: string;
}

/**
 * Driver-assigned notification — sent to the rider when a driver accepts
 * and is en route to pickup. Shows driver name + rating + photo, vehicle +
 * plate, ETA. Primary CTA: "Track ride". Secondary: "Call driver" /
 * "Message driver" links.
 */
export function DriverAssignedNotificationEmail({
  riderName,
  driverName,
  rating,
  vehicle,
  plate,
  eta,
}: DriverAssignedNotificationEmailProps) {
  const initials = driverName
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <EmailLayout>
      <EmailHeading icon={<Car className="size-5" />} tone="brand">
        Your driver is on the way
      </EmailHeading>

      <EmailGreeting name={riderName} />
      <EmailParagraph>
        Great news — your driver has been assigned and is heading to your
        pickup location now. Track live progress in the app or reach out
        directly using the options below.
      </EmailParagraph>

      <EmailSectionLabel>Your driver</EmailSectionLabel>
      <div className="mb-5 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: "oklch(0.55 0.2 262)" }}
          aria-hidden
        >
          {initials}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{driverName}</p>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            <Star className="size-3.5 fill-amber-500 text-amber-500" aria-hidden />
            {rating.toFixed(1)} rating
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">ETA</p>
          <p className="text-lg font-bold text-gray-900">{eta}</p>
        </div>
      </div>

      <EmailSectionLabel>Vehicle</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          { label: "Vehicle", value: vehicle },
          { label: "Plate", value: <span className="font-mono">{plate}</span> },
        ]}
      />

      <EmailCTA>
        <EmailButton href="#">Track ride</EmailButton>
        <div className="mt-3 flex items-center justify-center gap-4 text-sm">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 font-medium text-gray-900 underline underline-offset-2"
          >
            <Phone className="size-3.5" aria-hidden />
            Call driver
          </a>
          <span className="text-gray-300" aria-hidden>
            |
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 font-medium text-gray-900 underline underline-offset-2"
          >
            <MessageSquare className="size-3.5" aria-hidden />
            Message driver
          </a>
        </div>
      </EmailCTA>

      <EmailParagraph>
        Please be ready at the pickup location when your driver arrives.
      </EmailParagraph>
    </EmailLayout>
  );
}
