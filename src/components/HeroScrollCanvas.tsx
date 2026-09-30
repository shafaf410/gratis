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

  // High-precision smooth physics state
  const targetFrameRef = useRef(0);
  const currentInterpolatedFrameRef = useRef(0);
  const isCompleteRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const unlockBufferRef = useRef(0);

  // Fast GPU blit with alpha: false and no matrix stack overhead
  const renderFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
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

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const hRatio = targetWidth / img.naturalWidth;
    const vRatio = targetHeight / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);

    const destW = img.naturalWidth * ratio;
    const destH = img.naturalHeight * ratio;
    const shiftX = (targetWidth - destW) / 2;
    const shiftY = (targetHeight - destH) / 2;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, shiftX, shiftY, destW, destH);
  };

  // 1. High-speed asynchronous image streaming with background decoding
  useEffect(() => {
    let isMounted = true;

    const getFramePath = (index: number) => {
      const paddedIndex = String(index + 1).padStart(6, "0");
      return `/frames/frame_${paddedIndex}.jpg`;
    };

    // Load Frame 0 first with priority
    const firstImg = new Image();
    firstImg.decoding = "async";
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      if (isMounted) {
        firstImg.decode().then(() => {
          if (isMounted) renderFrame(0);
        }).catch(() => {
          if (isMounted) renderFrame(0);
        });
      }
    };
    frameImages[0] = firstImg;

    // Load remaining frames with async decoding
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (!frameImages[i]) {
        const img = new Image();
        img.decoding = "async";
        img.src = getFramePath(i);
        frameImages[i] = img;
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. High-performance 120fps responsive RAF loop
  useEffect(() => {
    const tick = () => {
      const diff = targetFrameRef.current - currentInterpolatedFrameRef.current;

      if (Math.abs(diff) > 0.005) {
        // Snappy, responsive LERP factor (0.22) eliminates input lag
        const LERP_FACTOR = 0.22;
        currentInterpolatedFrameRef.current += diff * LERP_FACTOR;

        if (Math.abs(targetFrameRef.current - currentInterpolatedFrameRef.current) < 0.05) {
          currentInterpolatedFrameRef.current = targetFrameRef.current;
        }

        const roundedIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentInterpolatedFrameRef.current))
        );

        setCurrentFrameIndex(roundedIndex);

        const progress = currentInterpolatedFrameRef.current / (TOTAL_FRAMES - 1);
        if (onProgressUpdate) onProgressUpdate(progress);

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

  // 3. Direct, zero-lag wheel & touch control
  useEffect(() => {
    const PIXELS_PER_FRAME = 9; // Direct, immediate scroll response
    const UNLOCK_THRESHOLD = 80;

    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || window.pageYOffset || 0;

      if (scrollY <= 5) {
        if (!isCompleteRef.current) {
          if (e.deltaY > 0) {
            e.preventDefault();
            const nextTarget = Math.min(
              TOTAL_FRAMES - 1,
              targetFrameRef.current + e.deltaY / PIXELS_PER_FRAME
            );
            targetFrameRef.current = nextTarget;

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

  // 4. Re-render canvas immediately when frame changes
  useEffect(() => {
    renderFrame(currentFrameIndex);

    const handleResize = () => renderFrame(currentFrameIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentFrameIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
