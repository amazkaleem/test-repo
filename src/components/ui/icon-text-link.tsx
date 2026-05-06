import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface IconTextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactNode;
}

/** Muted inline row (icon + text) for dark footers / contact lines. */
export function IconTextLink({ icon, children, className, target, rel, ...props }: IconTextLinkProps) {
  const isBlankTarget = typeof target === "string" && target.toLowerCase() === "_blank";
  const resolvedRel =
    isBlankTarget && (rel === undefined || rel === null || rel === "")
      ? "noopener noreferrer"
      : rel;

  return (
    <a
      className={cn(
        "group inline-flex items-center gap-2.5 font-body text-sm text-gray-300 transition-colors duration-200 hover:text-white",
        className
      )}
      target={target}
      rel={resolvedRel}
      {...props}
    >
      {icon}
      {children}
    </a>
  );
}
