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
    <section className="bg-white px-5 py-6 md:px-10">
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden"
        style={{ borderRadius: 42 }}
      >
        <video
          ref={videoRef}
          src="/videos/brand.mp4"
          preload="none"
          muted
          loop
          playsInline
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}
