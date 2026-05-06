import { cn } from "@/lib/utils";
import type { IconProps } from "./types";

/** Contact / vCard “save to phone” style illustration (stroke icon). */
export function SaveContactCardIcon({ size = 28, className, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden
      {...rest}
    >
      <path d="M16 2v22" />
      <path d="M21 2v22" />
      <path d="M8 2v22" />
      <path d="M3 2v22" />
      <path d="M12 2v22" />
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M12 11h.01" />
      <path d="M10 16c0-1.1.9-2 2-2s2 .9 2 2" />
    </svg>
  );
}
