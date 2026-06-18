import * as React from "react";

import { cn } from "@/lib/utils";

interface ConfigFieldProps {
  label: string;
  description?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export function ConfigField({
  label,
  description,
  htmlFor,
  children,
  className,
}: ConfigFieldProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-6",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        {description && (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-start">{children}</div>
    </div>
  );
}

export default ConfigField;
