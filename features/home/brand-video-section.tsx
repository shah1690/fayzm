"use client";

import { useEffect, useRef } from "react";

export function BrandVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 750 }}
    >
      {/* biome-ignore lint/a11y/useMediaCaption: decorative brand video */}
      <video
        ref={videoRef}
        src="/videos/brand.mp4"
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    </section>
  );
}
