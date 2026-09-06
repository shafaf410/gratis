"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Pause, ChevronDown, Sparkles } from "lucide-react";

export default function HeroScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Framer motion scroll hook targeting container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacityText1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const opacityText2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const opacityText3 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      video.pause();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    let animationFrameId: number;

    const updateVideoTime = () => {
      if (!containerRef.current || !video || !video.duration || isNaN(video.duration)) {
        animationFrameId = requestAnimationFrame(updateVideoTime);
        return;
      }

      if (!isPlaying) {
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        
        if (totalScrollable > 0) {
          const currentScroll = Math.min(Math.max(-rect.top, 0), totalScrollable);
          const scrollFraction = currentScroll / totalScrollable;
          
          setProgress(scrollFraction);

          const targetTime = video.duration * scrollFraction;
          // Smoothly scrub currentTime
          if (Math.abs(video.currentTime - targetTime) > 0.03) {
            video.currentTime = targetTime;
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateVideoTime);
    };

    animationFrameId = requestAnimationFrame(updateVideoTime);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#120D0A] text-white select-none">
      {/* Sticky Fullscreen Video Canvas Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Video Element */}
        <motion.div style={{ scale: scaleVideo }} className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            src="/hero-scroll.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover brightness-[0.75] contrast-[1.08]"
          />
        </motion.div>

        {/* Gradient Overlays for Elegance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-transparent to-[#120D0A]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />

        {/* Floating Brand Badge */}
        <div className="absolute top-28 left-6 md:left-12 z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl text-xs font-mono tracking-widest text-[#D4A373] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373] animate-pulse" />
            <span>GRATIS GROUP • SCROLL INTERACTIVE HERO</span>
          </div>
        </div>

        {/* Play/Pause Scrub Controls (Top Right) */}
        <div className="absolute top-28 right-6 md:right-12 z-20">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-lg active:scale-95"
            title={isPlaying ? "Switch to Scroll Scrub" : "Auto Play Video"}
          >
            {isPlaying ? (
              <>
                <Pause size={14} className="text-[#D4A373]" />
                <span>Pause Auto-Play</span>
              </>
            ) : (
              <>
                <Play size={14} className="text-[#D4A373]" />
                <span>Auto Play Video</span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Storytelling Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center z-10 pointer-events-none">
          {/* Stage 1 Text */}
          <motion.div style={{ opacity: opacityText1 }} className="absolute max-w-4xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4A373] bg-black/40 px-4 py-1.5 rounded-full border border-[#D4A373]/30 inline-block backdrop-blur-md">
              CRAFTSMANSHIP & INNOVATION
            </span>
            <h1 className="text-4xl md:text-7xl font-serif font-medium leading-tight text-white drop-shadow-2xl">
              Elevating Spaces Through <br />
              <span className="italic font-normal text-[#D4A373]">Engineered Precision</span>
            </h1>
            <p className="text-sm md:text-lg text-white/80 font-light max-w-xl mx-auto drop-shadow">
              Scroll down to witness raw timber transform into high-density Gratis architectural boards.
            </p>
          </motion.div>

          {/* Stage 2 Text */}
          <motion.div style={{ opacity: opacityText2 }} className="absolute max-w-4xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4A373] bg-black/40 px-4 py-1.5 rounded-full border border-[#D4A373]/30 inline-block backdrop-blur-md">
              75 YEARS OF HERITAGE
            </span>
            <h2 className="text-4xl md:text-7xl font-serif font-medium leading-tight text-white drop-shadow-2xl">
              From Raw Hardwood Veneers <br />
              <span className="italic font-normal text-[#D4A373]">To Structural Perfection</span>
            </h2>
            <p className="text-sm md:text-lg text-white/80 font-light max-w-xl mx-auto drop-shadow">
              100% waterproof, termite-proof PVC, MDF, and premium plywoods engineered for Kerala and the Middle East.
            </p>
          </motion.div>

          {/* Stage 3 Text */}
          <motion.div style={{ opacity: opacityText3 }} className="absolute max-w-4xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4A373] bg-black/40 px-4 py-1.5 rounded-full border border-[#D4A373]/30 inline-block backdrop-blur-md">
              SIX BUSINESS VERTICALS
            </span>
            <h2 className="text-4xl md:text-7xl font-serif font-medium leading-tight text-white drop-shadow-2xl">
              Welcome to Gratis Group
            </h2>
            <p className="text-sm md:text-lg text-white/80 font-light max-w-xl mx-auto drop-shadow">
              Explore our products, manufacturing excellence, Woodmall retail network, and global operations.
            </p>
          </motion.div>
        </div>

        {/* Scroll Progress & Indicator (Bottom Center) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-white/70 uppercase bg-black/40 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span>Scroll to Animate Video</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#D4A373] animate-bounce" />
          </div>
          {/* Progress Bar */}
          <div className="w-36 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4A373] transition-all duration-75 ease-out"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
