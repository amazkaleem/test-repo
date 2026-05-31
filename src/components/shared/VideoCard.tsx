"use client";

import { cn } from "@/lib/utils";
import { YoutubePlayIcon } from "@/components/icons";
import { useState } from "react";

interface VideoCardProps {
  videoId: string;
  className?: string;
}

export default function VideoCard({ videoId, className }: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-3xl border-4 border-shh-yellow shadow-lg",
        className,
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label="Play video"
          >
            {/* YouTube thumbnail — maxresdefault with hqdefault fallback */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <YoutubePlayIcon className="relative z-10 h-12 w-[68px] drop-shadow-lg transition-transform group-hover:scale-110" />
          </button>
        )}
      </div>
    </figure>
  );
}
