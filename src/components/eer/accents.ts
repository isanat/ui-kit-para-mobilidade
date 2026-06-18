/**
 * Eagle Eye Rides — shared accent tone system.
 * Maps service-specific accent colors used across the UI kit.
 */
export type Accent =
  | "brand"
  | "cyan"
  | "amber"
  | "magenta"
  | "gold"
  | "success";

/** Solid accent background + foreground (for icons / chips). */
export const accentSolid: Record<Accent, string> = {
  brand: "bg-primary text-primary-foreground",
  cyan: "bg-cyan text-cyan-foreground",
  amber: "bg-amber text-amber-foreground",
  magenta: "bg-magenta text-magenta-foreground",
  gold: "bg-gold text-gold-foreground",
  success: "bg-success text-success-foreground",
};

/** Soft / tinted accent (for badges, subtle highlights). */
export const accentSoft: Record<Accent, string> = {
  brand: "bg-primary/15 text-primary",
  cyan: "bg-cyan/15 text-cyan",
  amber: "bg-amber/15 text-amber",
  magenta: "bg-magenta/15 text-magenta",
  gold: "bg-gold/20 text-gold",
  success: "bg-success/15 text-success",
};

export type Tone = Accent | "muted";

export const toneSoft: Record<Tone, string> = {
  ...accentSoft,
  muted: "bg-muted text-muted-foreground",
};
