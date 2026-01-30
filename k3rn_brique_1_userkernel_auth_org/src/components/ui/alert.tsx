import * as React from "react";
import { cn } from "@/lib/ui/cn";
export function Alert({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm", className)} {...props} />;
}
