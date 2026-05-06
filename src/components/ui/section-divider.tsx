import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Horizontal rule aligned with SHH section typography (e.g. FAQ blocks). */
export function SectionDivider({ className, ...props }: ComponentPropsWithoutRef<"hr">) {
  return <hr className={cn("mt-2 border-t border-shh-black", className)} {...props} />;
}
