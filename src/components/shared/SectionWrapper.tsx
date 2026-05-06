import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  function SectionWrapper({ id, className, children }, ref) {
    return (
      <section ref={ref} id={id} className={cn("w-full px-4 py-20 md:px-8 lg:px-16", className)}>
        {children}
      </section>
    );
  },
);

export default SectionWrapper;