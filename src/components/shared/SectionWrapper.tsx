import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("w-full px-4 py-16 md:px-8 lg:px-16", className)}>
      <div className="mx-auto">{children}</div>
    </section>
  );
}
