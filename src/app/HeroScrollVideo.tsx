"use client";

import React, { useRef, useEffect } from "react";

export default function HeroScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    let animationFrameId: number;

    const updateVideoTime = () => {
      if (!containerRef.current || !video || !video.duration || isNaN(video.duration)) {
        animationFrameId = requestAnimationFrame(updateVideoTime);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable > 0) {
        const currentScroll = Math.min(Math.max(-rect.top, 0), totalScrollable);
        const scrollFraction = currentScroll / totalScrollable;
        const targetTime = video.duration * scrollFraction;
        
        // Smoothly scrub currentTime based on scroll position
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          video.currentTime = targetTime;
        }
      }

      animationFrameId = requestAnimationFrame(updateVideoTime);
    };

    animationFrameId = requestAnimationFrame(updateVideoTime);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-black select-none">
      {/* Sticky Fullscreen Pure Video */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src="/hero-scroll.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
