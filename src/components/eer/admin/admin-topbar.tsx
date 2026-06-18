"use client";

import * as React from "react";
import { Bell, ChevronDown, Plus, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AdminTopbarProps {
  title: string;
  breadcrumb?: string[];
  /** Slot for the theme toggle control. */
  themeToggle?: React.ReactNode;
  user?: { name: string; role: string; initials?: string };
  className?: string;
}

export function AdminTopbar({
  title,
  breadcrumb,
  themeToggle,
  user = { name: "Alex Kane", role: "Super Admin", initials: "AK" },
  className,
}: AdminTopbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={`${crumb}-${idx}`}>
                {idx > 0 && <span className="text-muted-foreground/60">/</span>}
                <span
                  className={cn(
                    idx === breadcrumb.length - 1
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>
        ) : null}
        <h1 className="truncate text-base font-semibold text-foreground md:text-lg">
          {title}
        </h1>
      </div>

      <div className="relative hidden w-full max-w-sm lg:block">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          placeholder="Search rides, drivers..."
          className="h-9 pl-9 text-sm"
          aria-label="Search"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" className="gap-1.5">
          <Plus className="size-4" />
          <span className="hidden sm:inline">Create</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="size-4" />
          <span
            className="absolute top-2 right-2 size-2 rounded-full bg-amber ring-2 ring-background"
            aria-hidden
          />
        </Button>

        {themeToggle}

        <div className="flex items-center gap-2 pl-1">
          <Avatar className="size-8 ring-1 ring-border">
            <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
              {user.initials ??
                user.name
                  .split(" ")
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="hidden leading-tight md:block">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
          <ChevronDown
            className="hidden size-4 text-muted-foreground md:block"
            aria-hidden
          />
        </div>
      </div>
    </header>
  );
}
