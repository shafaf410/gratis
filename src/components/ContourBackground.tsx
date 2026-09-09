"use client";

import React, { useEffect, useRef } from "react";

export default function ContourBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Contour layers configuration
    // Generates topographic / architectural contour curves with slow organic morphing
    const numLines = 28;
    let time = 0;

    const render = () => {
      time += 0.003;
      ctx.clearRect(0, 0, width, height);

      // Deep carbon background fill
      ctx.fillStyle = "#0B0B0B";
      ctx.fillRect(0, 0, width, height);

      // Center hero safe area radial gradient glow
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < numLines; i++) {
        const progress = i / numLines;
        // Frequency & amplitude variation
        const baseRadius = (i + 1) * (Math.max(width, height) * 0.045);
        
        ctx.beginPath();
        const steps = 120;
        
        for (let j = 0 <= steps ? 0 : 0; j <= steps; j++) {
          const angle = (j / steps) * Math.PI * 2;
          
          // Multi-harmonic noise for architectural contour waves
          const wave1 = Math.sin(angle * 3 + time + i * 0.2) * 45;
          const wave2 = Math.cos(angle * 5 - time * 0.8 + i * 0.15) * 30;
          const wave3 = Math.sin(angle * 2 + time * 0.5) * 60;
          
          // Angular turns distortion simulating topographic contour lines
          const noise = wave1 + wave2 + wave3;
          const r = baseRadius + noise * (1 + progress * 0.5);

          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();

        // Line styling logic based on user prompt:
        // GRATIS Red #D9233E at ~15-35% opacity, with a few vibrant highlight red lines, plus subtle dark gray lines
        const isFocalLine = i % 7 === 0;
        const isDarkGray = i % 4 === 1;

        if (isFocalLine) {
          ctx.strokeStyle = "rgba(217, 35, 62, 0.65)"; // Bright focal GRATIS Red line
          ctx.lineWidth = 2.5;
        } else if (isDarkGray) {
          ctx.strokeStyle = "rgba(100, 100, 100, 0.25)"; // Subtle architectural gray contour
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = `rgba(217, 35, 62, ${0.12 + (i % 3) * 0.08})`; // GRATIS Red 15-35% opacity
          ctx.lineWidth = 1.5;
        }

        ctx.stroke();
      }

      // Vignette effect to keep center hero readable and densify edges
      const gradient = ctx.createRadialGradient(
        cx,
        cy,
        Math.min(width, height) * 0.25,
        cx,
        cy,
        Math.max(width, height) * 0.75
      );
      gradient.addColorStop(0, "rgba(11, 11, 11, 0.75)"); // Subtle mask in center for high text readability
      gradient.addColorStop(0.6, "rgba(11, 11, 11, 0.35)");
      gradient.addColorStop(1, "rgba(11, 11, 11, 0.0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
