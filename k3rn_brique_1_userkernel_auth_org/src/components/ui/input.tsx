import * as React from "react";
import { cn } from "@/lib/ui/cn";
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm",
        "placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300",
        className
      )}
      {...props}
    />
  );
}
