"use client";

import * as React from "react";
import { Save } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { accentSoft, type Accent } from "@/components/eer/accents";

export interface FareField {
  key: string;
  label: string;
  value: string;
  prefix?: "$" | "%";
}

interface FareConfigCardProps {
  serviceName: string;
  accent: Accent;
  fields: FareField[];
  onSave?: (values: Record<string, string>) => void;
  className?: string;
}

export function FareConfigCard({
  serviceName,
  accent,
  fields,
  onSave,
  className,
}: FareConfigCardProps) {
  const [values, setValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.value])),
  );
  const [saving, setSaving] = React.useState(false);

  const handleSave = () => {
    setSaving(true);
    onSave?.(values);
    // Simulate a brief save state for the demo.
    window.setTimeout(() => setSaving(false), 600);
  };

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-lg text-xs font-semibold",
              accentSoft[accent],
            )}
          >
            {serviceName.charAt(0)}
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">{serviceName}</CardTitle>
            <p className="text-xs text-muted-foreground">Service fare configuration</p>
          </div>
        </div>
        <CardAction>
          <Badge
            variant="outline"
            className={cn("border-transparent", accentSoft[accent])}
          >
            {accent}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label
                htmlFor={`fare-${field.key}`}
                className="text-xs font-medium text-muted-foreground"
              >
                {field.label}
              </label>
              <div className="relative">
                {field.prefix && (
                  <span
                    className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-muted-foreground"
                    aria-hidden
                  >
                    {field.prefix}
                  </span>
                )}
                <Input
                  id={`fare-${field.key}`}
                  inputMode="decimal"
                  value={values[field.key] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  className={cn(field.prefix && "pl-7 font-mono")}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
            <Save className="size-4" />
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default FareConfigCard;
