import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  subtitle?: string;
}

export function Logo({
  className,
  showWordmark = true,
  size = 44,
  subtitle,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="relative shrink-0 overflow-hidden rounded-xl ring-1 ring-inset ring-border"
        style={{ width: size, height: size }}
      >
        {/* Light theme: eagle on light background */}
        <Image
          src="/eagle-logo-light.png"
          alt="Eagle Eye Rides logo"
          fill
          sizes="44px"
          className="bg-white object-contain p-1.5 dark:hidden"
        />
        {/* Dark theme: eagle on dark background */}
        <Image
          src="/eagle-logo-dark.png"
          alt=""
          aria-hidden
          fill
          sizes="44px"
          className="hidden bg-black object-contain p-1.5 dark:block"
        />
      </div>
      {showWordmark && (
        <div className="flex flex-col leading-tight">
          {subtitle && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
          <span className="font-semibold tracking-tight text-foreground">
            Eagle Eye Rides
          </span>
        </div>
      )}
    </div>
  );
}
