import { UserPlus, MapPin } from "lucide-react";
import {
  EmailLayout,
  EmailHeading,
  EmailGreeting,
  EmailParagraph,
  EmailButton,
  EmailLinkSecondary,
  EmailDetailsBox,
  EmailCTA,
  EmailSectionLabel,
} from "./email-primitives";

export interface DriverAssignedPassengerEmailProps {
  driverName: string;
  riderName: string;
  pickup: string;
  destination: string;
  /** Pre-formatted estimated fare, e.g. "$28.45". */
  fare: string;
  /** Pre-formatted distance, e.g. "6.2 mi". */
  distance: string;
}

/**
 * New ride assigned — sent to the driver when a new ride is offered.
 * Shows the rider name, pickup → destination, estimated fare, and
 * distance. Primary CTA: "Accept ride". Secondary: "Decline" link.
 */
export function DriverAssignedPassengerEmail({
  driverName,
  riderName,
  pickup,
  destination,
  fare,
  distance,
}: DriverAssignedPassengerEmailProps) {
  return (
    <EmailLayout>
      <EmailHeading icon={<UserPlus className="size-5" />} tone="success">
        New ride assigned
      </EmailHeading>

      <EmailGreeting name={driverName} />
      <EmailParagraph>
        A new ride has been assigned to you. Review the details below and
        accept or decline within 15 seconds before it cascades to the next
        driver.
      </EmailParagraph>

      <EmailSectionLabel>Trip request</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          { label: "Rider", value: riderName },
          { label: "Distance", value: distance },
          {
            label: "Estimated fare",
            value: <span className="font-semibold">{fare}</span>,
          },
        ]}
      />

      <EmailSectionLabel className="mt-5">Route</EmailSectionLabel>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center pt-0.5">
            <span
              className="flex size-5 items-center justify-center rounded-full"
              style={{ backgroundColor: "oklch(0.55 0.2 262)" }}
              aria-hidden
            >
              <span className="size-2 rounded-full bg-white" />
            </span>
            <span
              className="my-1 h-7 w-px border-l border-dashed border-gray-300"
              aria-hidden
            />
            <span
              className="flex size-5 items-center justify-center rounded-full"
              style={{ backgroundColor: "oklch(0.72 0.16 55)" }}
              aria-hidden
            >
              <MapPin className="size-3 text-white" />
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                Pickup
              </p>
              <p className="text-sm font-semibold text-gray-900">{pickup}</p>
            </div>
            <div>
              <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                Destination
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      <EmailCTA>
        <EmailButton href="#" tone="success">
          Accept ride
        </EmailButton>
        <div className="mt-3">
          <EmailLinkSecondary href="#">Decline</EmailLinkSecondary>
        </div>
      </EmailCTA>

      <EmailParagraph>
        Accepting late may impact your driver score. If you can&apos;t take
        this ride, decline so it can be re-assigned quickly.
      </EmailParagraph>
    </EmailLayout>
  );
}
