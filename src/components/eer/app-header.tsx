import { Bell } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { WhereToBar } from "./where-to-bar";

interface AppHeaderProps {
  greeting?: string;
  name?: string;
  showSearch?: boolean;
  className?: string;
}

export function AppHeader({
  greeting = "Welcome back",
  name = "Eagle Eye Rides",
  showSearch = true,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "rounded-b-3xl bg-gradient-to-br from-primary to-[oklch(0.4_0.18_268)] px-5 pt-6 pb-5",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black ring-1 ring-inset ring-white/25">
            <Image
              src="/eagle-logo-dark.png"
              alt="Eagle Eye Rides logo"
              fill
              sizes="44px"
              className="object-contain p-1.5"
            />
          </span>
          <div className="leading-tight">
            <p className="text-xs text-white/70">{greeting}</p>
            <p className="font-semibold text-white">{name}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/25"
        >
          <Bell className="size-5" aria-hidden />
          <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-amber ring-2 ring-primary" />
        </button>
      </div>
      {showSearch && <WhereToBar className="mt-5" />}
    </header>
  );
}
