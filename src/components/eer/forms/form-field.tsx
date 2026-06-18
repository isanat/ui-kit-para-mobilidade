"use client";

import * as React from "react";
import { AlertCircle, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  label: string;
  /** id linking the label to the control. The control receives this as `id`. */
  htmlFor?: string;
  /** Helper text shown below the control when there is no error. */
  description?: string;
  /** Error message. When present, shows red error text + `aria-invalid` on the control. */
  error?: string;
  /** Show a red `*` next to the label. */
  required?: boolean;
  /** Optional tooltip text shown next to the label via an info icon. */
  tooltip?: string;
  /** The input / select / textarea control. */
  children: React.ReactNode;
  className?: string;
}

/**
 * Form field wrapper with label, description, error, required indicator,
 * and optional tooltip. Pairs with shadcn `Input`, `Select`, `Textarea`, etc.
 *
 * When `error` is present, the child control is cloned with `aria-invalid`
 * and `id` (so the label associates correctly and shadcn styles the border
 * red automatically). The error text uses `role="alert"` for screen readers.
 *
 * @example
 * <FormField
 *   label="Email"
 *   htmlFor="email"
 *   required
 *   description="We'll never share your email."
 *   error={errors.email}
 * >
 *   <Input id="email" type="email" />
 * </FormField>
 */
export function FormField({
  label,
  htmlFor,
  description,
  error,
  required = false,
  tooltip,
  children,
  className,
}: FormFieldProps) {
  const describedById = React.useId();
  const errorId = `${describedById}-error`;
  const descId = `${describedById}-desc`;
  const isInvalid = Boolean(error);

  // Clone the child so we can wire `aria-invalid`, `aria-describedby`, and `id`.
  const enhancedChild = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        id: htmlFor,
        "aria-invalid": isInvalid || undefined,
        "aria-describedby": isInvalid
          ? errorId
          : description
            ? descId
            : undefined,
      })
    : children;

  return (
    <div className={cn("space-y-1.5", className)}>
      {/* Label row */}
      <div className="flex items-center gap-1.5">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-destructive" aria-hidden>
              *
            </span>
          )}
        </label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`More info about ${label}`}
                className="flex size-4 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
              >
                <HelpCircle className="size-3.5" aria-hidden />
              </button>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Control */}
      {enhancedChild}

      {/* Description OR error */}
      {isInvalid ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1 text-xs font-medium text-destructive"
        >
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : description ? (
        <p id={descId} className="text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default FormField;
