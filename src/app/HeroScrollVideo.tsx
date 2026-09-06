"use client";

import React, { useRef, useEffect, useState } from "react";
import { Phone } from "lucide-react";

const TOTAL_FRAMES = 203;

// Helper to format frame numbers like ezgif-frame-001.jpg
const getFramePath = (index: number) => {
  const paddedIndex = String(index + 1).padStart(3, "0");
  return `/hero-frames/ezgif-frame-${paddedIndex}.jpg`;
};

export default function HeroScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    // Preload all 203 image frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    let animationFrameId: number;
    let targetFrame = 0;
    let currentFrame = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawFrame = (frameIndex: number) => {
      if (!ctx || !imagesRef.current.length) return;

      const idx = Math.min(Math.max(Math.round(frameIndex), 0), TOTAL_FRAMES - 1);
      const img = imagesRef.current[idx];

      if (img && img.complete && img.naturalWidth > 0) {
        const iWidth = img.naturalWidth;
        const iHeight = img.naturalHeight;
        const cWidth = canvas.width;
        const cHeight = canvas.height;

        const iAspect = iWidth / iHeight;
        const cAspect = cWidth / cHeight;

        let drawW, drawH, drawX, drawY;

        if (cAspect > iAspect) {
          drawW = cWidth;
          drawH = cWidth / iAspect;
          drawX = 0;
          drawY = (cHeight - drawH) / 2;
        } else {
          drawH = cHeight;
          drawW = cHeight * iAspect;
          drawX = (cWidth - drawW) / 2;
          drawY = 0;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
      }
    };

    const render = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;

        if (totalScrollable > 0) {
          const currentScroll = Math.min(Math.max(-rect.top, 0), totalScrollable);
          const scrollFraction = currentScroll / totalScrollable;
          
          // Complete animation by 80% scroll
          const frameProgress = Math.min(scrollFraction / 0.80, 1.0);
          targetFrame = frameProgress * (TOTAL_FRAMES - 1);

          // Calculate overlay opacity: fade in between 70% and 90% scroll
          if (scrollFraction > 0.65) {
            const opacity = Math.min(Math.max((scrollFraction - 0.65) / 0.25, 0), 1);
            setOverlayOpacity(opacity);
          } else {
            setOverlayOpacity(0);
          }
        }

        // Lerp (Linear Interpolation) for 60fps silky smooth frame transitions
        currentFrame += (targetFrame - currentFrame) * 0.18;

        drawFrame(currentFrame);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[280vh] bg-black select-none">
      {/* Sticky Fullscreen Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Loading overlay while first few frames load */}
        {loadedCount < 10 && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black text-white gap-3">
            <div className="w-8 h-8 border-2 border-[#D4A373] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono tracking-widest text-[#D4A373] uppercase">Loading Frames...</span>
          </div>
        )}

        {/* High performance 60fps Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block pointer-events-none"
        />

        {/* FADES IN ON LAST FRAME: Hero Overlay Content & Buttons */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20 flex flex-col justify-between p-6 md:p-12"
          style={{ opacity: overlayOpacity }}
        >
          {/* Top Subtle Subtitle */}
          <div className="pt-20 md:pt-24 max-w-xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4A373] bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#D4A373]/30 inline-block shadow-lg">
              ARCHITECTURAL INTERIOR SOLUTIONS
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-white font-medium leading-tight drop-shadow-2xl">
              Where Craftsmanship <br />
              <span className="italic text-[#D4A373]">Meets Modern Living</span>
            </h1>
          </div>

          {/* Bottom Controls matching screenshot */}
          <div className="w-full flex items-center justify-between pointer-events-auto">
            {/* Bottom-Left N' Badge Button */}
            <button
              className="w-11 h-11 rounded-full bg-black/85 hover:bg-black text-white font-serif font-bold text-base flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group"
              title="Gratis Group Brand"
            >
              <span className="group-hover:rotate-12 transition-transform">N&apos;</span>
            </button>

            {/* Bottom-Right Call Icon Button */}
            <a
              href="tel:+919544048877"
              className="w-12 h-12 rounded-full bg-[#8C6D53] hover:bg-[#725740] text-white flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300"
              title="Call Gratis Direct"
            >
              <Phone size={20} className="fill-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
