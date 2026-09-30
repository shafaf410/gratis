"use client";

import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 151;

// Global cache for preloaded HTMLImageElements
const frameImages: HTMLImageElement[] = [];

interface HeroScrollCanvasProps {
  onProgressUpdate?: (progress: number) => void;
  onAnimationCompleteChange?: (completed: boolean) => void;
}

export default function HeroScrollCanvas({
  onProgressUpdate,
  onAnimationCompleteChange,
}: HeroScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);

  // High-precision smooth physics state
  const targetFrameRef = useRef(0);
  const currentInterpolatedFrameRef = useRef(0);
  const isCompleteRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const unlockBufferRef = useRef(0);

  // Render helper function: Draws a specific frame to canvas with crisp DPI & cover fit
  const renderFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = frameImages[frameIdx];

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIdx; i >= 0; i--) {
        if (frameImages[i] && frameImages[i].complete && frameImages[i].naturalWidth > 0) {
          img = frameImages[i];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = frameIdx + 1; i < TOTAL_FRAMES; i++) {
        if (frameImages[i] && frameImages[i].complete && frameImages[i].naturalWidth > 0) {
          img = frameImages[i];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const hRatio = displayWidth / img.naturalWidth;
    const vRatio = displayHeight / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);

    const shiftX = (displayWidth - img.naturalWidth * ratio) / 2;
    const shiftY = (displayHeight - img.naturalHeight * ratio) / 2;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      shiftX,
      shiftY,
      img.naturalWidth * ratio,
      img.naturalHeight * ratio
    );

    ctx.restore();
  };

  // 1. Preload frame sequence starting with frame 0
  useEffect(() => {
    let isMounted = true;

    const getFramePath = (index: number) => {
      const paddedIndex = String(index + 1).padStart(6, "0");
      return `/frames/frame_${paddedIndex}.jpg`;
    };

    // Load Frame 0 first and render immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      if (isMounted) {
        setImagesReady(true);
        renderFrame(0);
      }
    };
    frameImages[0] = firstImg;

    // Load remaining frames in background
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (!frameImages[i]) {
        const img = new Image();
        img.src = getFramePath(i);
        frameImages[i] = img;
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. High-precision smoothed LERP loop with gentle finish
  useEffect(() => {
    const tick = () => {
      const diff = targetFrameRef.current - currentInterpolatedFrameRef.current;

      if (Math.abs(diff) > 0.005) {
        // Smooth cinematic interpolation factor
        const LERP_FACTOR = 0.09;
        currentInterpolatedFrameRef.current += diff * LERP_FACTOR;

        const roundedIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentInterpolatedFrameRef.current))
        );

        setCurrentFrameIndex(roundedIndex);

        const progress = currentInterpolatedFrameRef.current / (TOTAL_FRAMES - 1);
        if (onProgressUpdate) onProgressUpdate(progress);

        // Mark complete only when the final logo frame (Frame 150) is fully reached
        if (
          currentInterpolatedFrameRef.current >= TOTAL_FRAMES - 1.1 &&
          !isCompleteRef.current
        ) {
          isCompleteRef.current = true;
          if (onAnimationCompleteChange) onAnimationCompleteChange(true);
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [onProgressUpdate, onAnimationCompleteChange]);

  // 3. Wheel & touch control: PREVENTS scrolling down until all 151 frames finish
  useEffect(() => {
    const PIXELS_PER_FRAME = 12; // Smooth, luxurious frame pacing (~1800px total scroll distance)
    const UNLOCK_THRESHOLD = 120; // Small cushion at the final logo before page scroll unlocks

    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || 0;

      if (scrollY <= 5) {
        if (!isCompleteRef.current) {
          // Page cannot scroll down until animation completes!
          if (e.deltaY > 0) {
            e.preventDefault();
            const nextTarget = Math.min(
              TOTAL_FRAMES - 1,
              targetFrameRef.current + e.deltaY / PIXELS_PER_FRAME
            );
            targetFrameRef.current = nextTarget;

            // If target has reached the end, accumulate unlock buffer
            if (nextTarget >= TOTAL_FRAMES - 1) {
              unlockBufferRef.current += e.deltaY;
              if (
                unlockBufferRef.current >= UNLOCK_THRESHOLD &&
                currentInterpolatedFrameRef.current >= TOTAL_FRAMES - 1.2
              ) {
                isCompleteRef.current = true;
                if (onAnimationCompleteChange) onAnimationCompleteChange(true);
              }
            }
          } else if (e.deltaY < 0 && targetFrameRef.current > 0) {
            e.preventDefault();
            unlockBufferRef.current = 0;
            targetFrameRef.current = Math.max(
              0,
              targetFrameRef.current + e.deltaY / PIXELS_PER_FRAME
            );
          }
        } else {
          // Once complete, if user scrolls backwards to the top, re-lock to play reverse
          if (e.deltaY < 0) {
            e.preventDefault();
            isCompleteRef.current = false;
            unlockBufferRef.current = 0;
            if (onAnimationCompleteChange) onAnimationCompleteChange(false);
            targetFrameRef.current = Math.max(
              0,
              targetFrameRef.current + e.deltaY / PIXELS_PER_FRAME
            );
          }
        }
      } else if (scrollY <= 20 && e.deltaY < 0 && isCompleteRef.current) {
        // Smoothly catch reverse scroll when returning to top
        isCompleteRef.current = false;
        unlockBufferRef.current = 0;
        if (onAnimationCompleteChange) onAnimationCompleteChange(false);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollY <= 5 && !isCompleteRef.current) {
        const touchY = e.touches[0].clientY;
        const deltaY = (touchStartY - touchY) * 2;
        touchStartY = touchY;

        if (deltaY > 0) {
          e.preventDefault();
          const nextTarget = Math.min(
            TOTAL_FRAMES - 1,
            targetFrameRef.current + deltaY / PIXELS_PER_FRAME
          );
          targetFrameRef.current = nextTarget;
          if (nextTarget >= TOTAL_FRAMES - 1) {
            unlockBufferRef.current += deltaY;
            if (
              unlockBufferRef.current >= UNLOCK_THRESHOLD &&
              currentInterpolatedFrameRef.current >= TOTAL_FRAMES - 1.2
            ) {
              isCompleteRef.current = true;
              if (onAnimationCompleteChange) onAnimationCompleteChange(true);
            }
          }
        } else if (deltaY < 0 && targetFrameRef.current > 0) {
          e.preventDefault();
          targetFrameRef.current = Math.max(
            0,
            targetFrameRef.current + deltaY / PIXELS_PER_FRAME
          );
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [onAnimationCompleteChange]);

  // 4. Re-render canvas when frame index changes or window resizes
  useEffect(() => {
    renderFrame(currentFrameIndex);

    const handleResize = () => renderFrame(currentFrameIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentFrameIndex, imagesReady]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
