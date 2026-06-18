import { ShieldAlert, Cpu, Hand } from "lucide-react";
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

export interface AdminDriverAssignmentEmailProps {
  rideId: string;
  rider: string;
  driver: string;
  /** "auto" or "manual". */
  assignmentType: "auto" | "manual";
  /** Pre-formatted timestamp, e.g. "Apr 12, 2025 · 4:32 PM". */
  timestamp: string;
}

/**
 * Driver assignment alert — sent to admin when a ride is assigned to a
 * driver. Shows the ride ID, rider, assigned driver, assignment type
 * (auto/manual), and timestamp. Primary CTA: "View in dashboard".
 */
export function AdminDriverAssignmentEmail({
  rideId,
  rider,
  driver,
  assignmentType,
  timestamp,
}: AdminDriverAssignmentEmailProps) {
  const isAuto = assignmentType === "auto";
  return (
    <EmailLayout>
      <EmailHeading icon={<ShieldAlert className="size-5" />} tone="brand">
        Driver assignment alert
      </EmailHeading>

      <EmailGreeting name="Admin" />
      <EmailParagraph>
        A ride has been assigned to a driver. Review the details below or
        open the dashboard to monitor live.
      </EmailParagraph>

      <EmailSectionLabel>Assignment</EmailSectionLabel>
      <EmailDetailsBox
        rows={[
          { label: "Ride ID", value: <span className="font-mono">{rideId}</span> },
          { label: "Rider", value: rider },
          { label: "Assigned driver", value: driver },
          {
            label: "Assignment type",
            value: (
              <span className="inline-flex items-center gap-1.5">
                {isAuto ? (
                  <Cpu className="size-3.5 text-gray-500" aria-hidden />
                ) : (
                  <Hand className="size-3.5 text-gray-500" aria-hidden />
                )}
                {isAuto ? "Automatic" : "Manual"}
              </span>
            ),
          },
          { label: "Timestamp", value: timestamp },
        ]}
      />

      <EmailCTA>
        <EmailButton href="#">View in dashboard</EmailButton>
      </EmailCTA>

      <EmailParagraph>
        You can override this assignment or contact either party from the
        Dispatch view in the admin console.
      </EmailParagraph>
    </EmailLayout>
  );
}
