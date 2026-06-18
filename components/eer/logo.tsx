import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showWordmark?: boolean
  size?: number
  subtitle?: string
}

export function Logo({
  className,
  showWordmark = true,
  size = 40,
  subtitle,
}: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div
        className="flex shrink-0 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-inset ring-primary/25"
        style={{ width: size, height: size }}
      >
        <Image
          src="/eagle-logo.png"
          alt="Eagle Eye Rides logo"
          width={size}
          height={size}
          className="object-contain p-1.5"
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
  )
}
