import { cn } from "@/lib/utils";
import { YouTubeEmbed } from "@next/third-parties/google";

interface VideoCardProps {
  videoId: string;
  className?: string;
}

export default function VideoCard({ videoId, className }: VideoCardProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-3xl border-4 border-shh-yellow shadow-lg",
        className,
      )}
    >
      <div className="aspect-video w-full overflow-hidden">
        <YouTubeEmbed videoid={videoId} params="rel=0" />
      </div>
    </figure>
  );
}
