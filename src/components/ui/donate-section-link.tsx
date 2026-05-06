import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const donateSectionLinkVariants = cva(
  "inline-flex items-center justify-center bg-shh-yellow font-bold text-shh-black transition-all duration-300 active:scale-[0.97]",
  {
    variants: {
      variant: {
        header:
          "group gap-1.5 rounded-full px-5 py-2 font-body text-sm shadow-sm hover:scale-[1.03] hover:shadow-[0_4px_16px_rgba(249,201,71,0.35)]",
        drawer: "w-full gap-2.5 rounded-2xl py-4 font-title text-xl",
      },
    },
    defaultVariants: {
      variant: "header",
    },
  }
);

export interface DonateSectionLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof donateSectionLinkVariants> {}

/** Same look as drawer `DonateSectionLink` but as a `<button>` (e.g. open mobile donation modal). */
export function DonateDrawerTriggerButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(donateSectionLinkVariants({ variant: "drawer" }), className)}
      {...props}
    >
      <Heart className="h-5 w-5 invert" fill="" aria-hidden />
      {children}
    </button>
  );
}

/** In-page anchor to `#donation-section` with shared SHH donate styling (header pill vs mobile drawer). */
export function DonateSectionLink({
  className,
  variant,
  children,
  ...props
}: DonateSectionLinkProps) {
  const isDrawer = variant === "drawer";

  return (
    <a href="#donation-section" className={cn(donateSectionLinkVariants({ variant }), className)} {...props}>
      {isDrawer ? (
        <Heart className="h-5 w-5 invert" fill="" aria-hidden />
      ) : (
        <Heart
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
          fill="currentColor"
          aria-hidden
        />
      )}
      {children}
    </a>
  );
}
