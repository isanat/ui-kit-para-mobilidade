"use client";

import * as React from "react";
import {
  Megaphone,
  Image as ImageIcon,
  Calendar,
  Plus,
  Save,
  Sparkles,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Placements offered by the Eagle Eye Rides advertisement service,
 * matching the admin → advertisements/create page.
 */
export type AdPlacementOption =
  | "Home banner"
  | "Ride list"
  | "Tracking screen"
  | "Profile";

export type AdAudience = "All users" | "Frequent riders" | "New users";

export type AdRegion =
  | "All regions"
  | "Boston"
  | "Cambridge"
  | "Somerville"
  | "Brookline"
  | "Seaport"
  | "Back Bay";

/**
 * Shape of the data submitted from the create-advertisement form.
 * Both `onPublish` and `onSaveDraft` receive this payload.
 */
export interface AdFormData {
  title: string;
  advertiser: string;
  description: string;
  thumbnailName: string | null;
  placement: AdPlacementOption;
  position: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
  pricePerDay: number;
  totalBudget: number;
  region: AdRegion;
  audiences: AdAudience[];
}

const PLACEMENT_OPTIONS: AdPlacementOption[] = [
  "Home banner",
  "Ride list",
  "Tracking screen",
  "Profile",
];

const REGION_OPTIONS: AdRegion[] = [
  "All regions",
  "Boston",
  "Cambridge",
  "Somerville",
  "Brookline",
  "Seaport",
  "Back Bay",
];

const AUDIENCE_OPTIONS: AdAudience[] = [
  "All users",
  "Frequent riders",
  "New users",
];

const DEFAULT_PRICE_PER_DAY = 0.99;

function emptyForm(): AdFormData {
  return {
    title: "",
    advertiser: "",
    description: "",
    thumbnailName: null,
    placement: "Home banner",
    position: "Top — slot 1",
    startDate: "",
    endDate: "",
    allDay: true,
    pricePerDay: DEFAULT_PRICE_PER_DAY,
    totalBudget: 0,
    region: "All regions",
    audiences: ["All users"],
  };
}

function daysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (Number.isNaN(s) || Number.isNaN(e)) return 0;
  const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

interface AdCreateFormProps {
  onPublish?: (ad: AdFormData) => void;
  onSaveDraft?: (ad: AdFormData) => void;
  className?: string;
}

export function AdCreateForm({
  onPublish,
  onSaveDraft,
  className,
}: AdCreateFormProps) {
  const [form, setForm] = React.useState<AdFormData>(emptyForm);

  const days = daysBetween(form.startDate, form.endDate);
  const totalBudget = React.useMemo(
    () => Number((days * form.pricePerDay).toFixed(2)),
    [days, form.pricePerDay],
  );

  // Keep the computed budget in sync inside the form payload so the
  // published/draft submission reflects the live preview.
  React.useEffect(() => {
    setForm((prev) =>
      prev.totalBudget === totalBudget
        ? prev
        : { ...prev, totalBudget },
    );
  }, [totalBudget]);

  const set = <K extends keyof AdFormData>(key: K, value: AdFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleAudience = (audience: AdAudience) => {
    setForm((prev) => {
      const has = prev.audiences.includes(audience);
      // Selecting "All users" clears the others; deselecting it leaves an
      // empty array which the UI re-prompts the admin to fill.
      if (audience === "All users" && !has) {
        return { ...prev, audiences: ["All users"] };
      }
      const next = has
        ? prev.audiences.filter((a) => a !== audience)
        : [...prev.audiences.filter((a) => a !== "All users"), audience];
      return { ...prev, audiences: next.length === 0 ? ["All users"] : next };
    });
  };

  return (
    <Card className={cn("rounded-2xl", className)}>
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-magenta/15 text-magenta">
            <Megaphone className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <CardTitle className="text-base">New advertisement</CardTitle>
            <CardDescription>
              Configure a new banner ad for the rider app
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => onSaveDraft?.({ ...form, totalBudget })}
              className="gap-1.5"
            >
              <Save className="size-4" aria-hidden />
              Save draft
            </Button>
            <Button
              onClick={() => onPublish?.({ ...form, totalBudget })}
              className="gap-1.5"
            >
              <Sparkles className="size-4" aria-hidden />
              Publish
            </Button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-8 pt-6">
        {/* Content */}
        <FormSection
          icon={ImageIcon}
          title="Content"
          description="The creative shown to riders across the app."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Ad title" htmlFor="ad-title">
              <Input
                id="ad-title"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Weekend brunch at the Harbor"
              />
            </Field>
            <Field label="Advertiser" htmlFor="ad-advertiser">
              <Input
                id="ad-advertiser"
                value={form.advertiser}
                onChange={(e) => set("advertiser", e.target.value)}
                placeholder="Boston Harbor Hotel"
              />
            </Field>
          </div>
          <Field label="Description" htmlFor="ad-description">
            <Textarea
              id="ad-description"
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Short copy displayed beneath the banner — keep it under 120 characters."
            />
          </Field>
          <ThumbnailDropzone
            fileName={form.thumbnailName}
            onFile={(name) => set("thumbnailName", name)}
          />
        </FormSection>

        {/* Placement */}
        <FormSection
          icon={Megaphone}
          title="Placement"
          description="Where in the rider app the ad is rendered."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Surface" htmlFor="ad-placement">
              <Select
                value={form.placement}
                onValueChange={(v) => set("placement", v as AdPlacementOption)}
              >
                <SelectTrigger id="ad-placement" className="w-full">
                  <SelectValue placeholder="Select a surface" />
                </SelectTrigger>
                <SelectContent>
                  {PLACEMENT_OPTIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Position" htmlFor="ad-position">
              <Input
                id="ad-position"
                value={form.position}
                onChange={(e) => set("position", e.target.value)}
                placeholder="Top — slot 1"
              />
            </Field>
          </div>
        </FormSection>

        {/* Schedule */}
        <FormSection
          icon={Calendar}
          title="Schedule"
          description="When the ad goes live and when it is taken down."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Start date" htmlFor="ad-start">
              <Input
                id="ad-start"
                type="date"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
              />
            </Field>
            <Field label="End date" htmlFor="ad-end">
              <Input
                id="ad-end"
                type="date"
                value={form.endDate}
                onChange={(e) => set("endDate", e.target.value)}
              />
            </Field>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">
                Run all day
              </p>
              <p className="text-xs text-muted-foreground">
                Disable to set hourly dayparting windows.
              </p>
            </div>
            <Switch
              checked={form.allDay}
              onCheckedChange={(v) => set("allDay", v)}
              aria-label="Run all day"
            />
          </div>
        </FormSection>

        {/* Pricing */}
        <FormSection
          icon={Sparkles}
          title="Pricing"
          description="Per-day cost plus the computed total budget."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Price per day" htmlFor="ad-price">
              <div className="relative">
                <span
                  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-medium text-muted-foreground"
                  aria-hidden
                >
                  $
                </span>
                <Input
                  id="ad-price"
                  inputMode="decimal"
                  value={String(form.pricePerDay)}
                  onChange={(e) => {
                    const next = Number.parseFloat(e.target.value);
                    set(
                      "pricePerDay",
                      Number.isNaN(next) ? 0 : next,
                    );
                  }}
                  className="pl-7 font-mono"
                />
              </div>
            </Field>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-muted-foreground">
                Total budget
              </Label>
              <div className="flex h-9 items-center justify-between rounded-md border border-dashed border-border bg-muted/40 px-3">
                <span className="text-xs text-muted-foreground">
                  {days} {days === 1 ? "day" : "days"} ×{" "}
                  <span className="font-mono tabular-nums text-foreground">
                    ${form.pricePerDay.toFixed(2)}
                  </span>
                </span>
                <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                  ${totalBudget.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Targeting */}
        <FormSection
          icon={Users}
          title="Targeting"
          description="Who sees the ad and in which service area."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Region" htmlFor="ad-region">
              <Select
                value={form.region}
                onValueChange={(v) => set("region", v as AdRegion)}
              >
                <SelectTrigger id="ad-region" className="w-full">
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {REGION_OPTIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-muted-foreground">
                Audience
              </Label>
              <div className="flex h-9 flex-wrap items-center gap-2">
                {AUDIENCE_OPTIONS.map((a) => {
                  const active = form.audiences.includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAudience(a)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        active
                          ? "border-transparent bg-magenta/15 text-magenta"
                          : "border-border bg-transparent text-muted-foreground hover:bg-muted/60",
                      )}
                      aria-pressed={active}
                    >
                      {active && <Plus className="size-3" aria-hidden />}
                      {a}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </FormSection>
      </CardContent>
    </Card>
  );
}

interface FormSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: React.ReactNode;
}

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="size-3.5" aria-hidden />
        </span>
        <div className="leading-tight">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 pl-9 sm:pl-[34px]">{children}</div>
    </section>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={htmlFor}
        className="text-xs font-medium text-muted-foreground"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

interface ThumbnailDropzoneProps {
  fileName: string | null;
  onFile: (name: string | null) => void;
}

function ThumbnailDropzone({ fileName, onFile }: ThumbnailDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/40 p-8 text-center transition-colors",
          "hover:border-magenta/60 hover:bg-magenta/5",
        )}
        aria-label="Upload ad thumbnail"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-magenta/15 text-magenta">
          <Megaphone className="size-5" aria-hidden />
        </span>
        {fileName ? (
          <>
            <p className="text-sm font-medium text-foreground">{fileName}</p>
            <p className="text-xs text-muted-foreground">
              Click to replace — PNG / JPG, 1200×400 recommended
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-foreground">
              Click to upload or drag
            </p>
            <p className="text-xs text-muted-foreground">
              PNG / JPG, 1200×400 recommended
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            onFile(f ? f.name : null);
            // Reset so the same file can be re-selected after a remove.
            e.target.value = "";
          }}
        />
      </button>
      {fileName && (
        <div className="mt-2 flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-transparent bg-magenta/15 text-magenta"
          >
            <ImageIcon className="size-3" aria-hidden />
            Thumbnail ready
          </Badge>
          <button
            type="button"
            onClick={() => onFile(null)}
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default AdCreateForm;
