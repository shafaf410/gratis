"use client";

import React, { useRef, useEffect } from "react";

export default function HeroScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let animationFrameId: number;
    let targetTime = 0;
    let lerpedTime = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawFrame = () => {
      if (!ctx || !video || video.readyState < 2) return;

      // Draw aspect-ratio cover on canvas
      const vWidth = video.videoWidth || 1920;
      const vHeight = video.videoHeight || 1080;
      const cWidth = canvas.width;
      const cHeight = canvas.height;

      const vAspect = vWidth / vHeight;
      const cAspect = cWidth / cHeight;

      let drawW, drawH, drawX, drawY;

      if (cAspect > vAspect) {
        drawW = cWidth;
        drawH = cWidth / vAspect;
        drawX = 0;
        drawY = (cHeight - drawH) / 2;
      } else {
        drawH = cHeight;
        drawW = cHeight * vAspect;
        drawX = (cWidth - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(video, drawX, drawY, drawW, drawH);
    };

    const render = () => {
      if (containerRef.current && video.duration && !isNaN(video.duration)) {
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;

        if (totalScrollable > 0) {
          const currentScroll = Math.min(Math.max(-rect.top, 0), totalScrollable);
          const scrollFraction = currentScroll / totalScrollable;
          targetTime = video.duration * scrollFraction;
        }

        // Smooth Lerp (Linear Interpolation) for 60fps butter-smooth scrubbing
        lerpedTime += (targetTime - lerpedTime) * 0.12;

        if (Math.abs(video.currentTime - lerpedTime) > 0.01) {
          video.currentTime = lerpedTime;
        }

        drawFrame();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleLoadedMetadata = () => {
      video.pause();
      drawFrame();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", drawFrame);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", drawFrame);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] bg-black select-none">
      {/* Sticky Fullscreen Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Hidden video element used as frame source */}
        <video
          ref={videoRef}
          src="/hero-scroll.mp4"
          muted
          playsInline
          preload="auto"
          className="hidden"
        />
        {/* High performance 60fps hardware accelerated Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block pointer-events-none"
        />
      </div>
    </div>
  );
}
