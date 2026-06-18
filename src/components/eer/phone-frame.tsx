import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export function PhoneFrame({ children, label, className }: PhoneFrameProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative h-[760px] w-[380px] max-w-full overflow-hidden rounded-[2.75rem] border-[10px] border-foreground/10 bg-background shadow-2xl ring-1 ring-border">
        <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground/10" />
        <div className="flex h-full flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  );
}
