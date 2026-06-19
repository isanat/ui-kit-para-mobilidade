"use client";

import * as React from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Car,
  Users,
  Bike,
  Wallet,
  Banknote,
  Tag,
  CreditCard,
  Megaphone,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/eer/logo";

export interface AdminNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  group: "Overview" | "Operations" | "Finance" | "Content" | "System";
}

export const adminNavItems: AdminNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { id: "analytics", label: "Analytics", icon: TrendingUp, group: "Overview" },
  { id: "rides", label: "Rides", icon: Car, group: "Operations" },
  { id: "drivers", label: "Drivers", icon: Users, group: "Operations" },
  { id: "users", label: "Users", icon: Bike, group: "Operations" },
  { id: "fleet", label: "Fleet", icon: Car, group: "Operations" },
  { id: "earnings", label: "Earnings", icon: Wallet, group: "Finance" },
  { id: "payouts", label: "Payouts", icon: Banknote, group: "Finance" },
  { id: "fares", label: "Fares", icon: Tag, group: "Finance" },
  { id: "payments", label: "Payments", icon: CreditCard, group: "Finance" },
  { id: "advertisements", label: "Advertisements", icon: Megaphone, group: "Content" },
  { id: "settings", label: "Settings", icon: Settings, group: "System" },
];

const GROUP_ORDER: AdminNavItem["group"][] = [
  "Overview",
  "Operations",
  "Finance",
  "Content",
  "System",
];

interface AdminSidebarProps {
  active?: string;
  onNavigate?: (id: string) => void;
  className?: string;
}

export function AdminSidebar({
  active: activeProp,
  onNavigate,
  className,
}: AdminSidebarProps) {
  const [internalActive, setInternalActive] = React.useState<string>(
    activeProp ?? "dashboard",
  );

  const active = activeProp ?? internalActive;

  const handleSelect = React.useCallback(
    (id: string) => {
      if (!activeProp) setInternalActive(id);
      onNavigate?.(id);
    },
    [activeProp, onNavigate],
  );

  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <Logo size={36} subtitle="Admin Console" />
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-6 px-3 py-5">
          {GROUP_ORDER.map((group) => {
            const items = adminNavItems.filter((i) => i.group === group);
            if (!items.length) return null;
            return (
              <div key={group} className="flex flex-col gap-1">
                <p className="px-3 pb-1 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  {group}
                </p>
                {items.map(({ id, label, icon: Icon }) => {
                  const isActive = id === active;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleSelect(id)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                        isActive &&
                          "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-1/2 left-0 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary opacity-0 transition-opacity",
                          isActive && "opacity-100",
                        )}
                        aria-hidden
                      />
                      <Icon
                        className={cn(
                          "size-4 shrink-0 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-accent-foreground",
                        )}
                      />
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
            AK
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              Alex Kane
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
