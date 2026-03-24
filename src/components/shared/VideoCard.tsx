import { cn } from "@/lib/utils";

interface VideoCardProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function VideoCard({ videoId, title, className }: VideoCardProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-3xl border-4 border-[#FECB26] shadow-lg",
        className,
      )}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="aspect-video w-full"
      />
    </figure>
  );
}
