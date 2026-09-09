"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Shield,
  Layers,
  Award,
  Send,
  CheckCircle2,
  Users,
  Compass,
  Globe,
} from "lucide-react";
import Lenis from "lenis";

export default function GratisHomepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("all");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = [
        "about",
        "chairman",
        "verticals",
        "products",
        "stats",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }

      if (window.scrollY < 400) {
        setActiveSection("all");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0B0B0B] selection:bg-[#D9233E] selection:text-white overflow-x-hidden">
      {/* ==================== 1. HEADER (CLEAN WHITE) ==================== */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav-header py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* GRATIS Brand Logo with Red Chevrons */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-3xl font-extrabold tracking-tighter uppercase text-[#0B0B0B]">
                GRATIS
              </span>
              {/* Three Diagonal Red Chevrons */}
              <div className="flex gap-1 ml-1.5">
                <span className="w-2 h-6 bg-[#D9233E] skew-x-[-20deg] block" />
                <span className="w-2 h-6 bg-[#D9233E] skew-x-[-20deg] block" />
                <span className="w-2 h-6 bg-[#D9233E] skew-x-[-20deg] block" />
              </div>
            </div>
          </a>

          {/* Minimal Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-mono font-bold uppercase tracking-widest">
            {[
              { label: "Home", key: "all" },
              { label: "About", key: "about" },
              { label: "Leadership", key: "chairman" },
              { label: "Six Verticals", key: "verticals" },
              { label: "Products", key: "products" },
              { label: "Contact", key: "contact" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveSection(item.key);
                  if (item.key !== "all") {
                    document
                      .getElementById(item.key)
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`transition-colors relative py-1 ${
                  activeSection === item.key
                    ? "text-[#D9233E]"
                    : "text-[#0B0B0B]/80 hover:text-[#D9233E]"
                }`}
              >
                {item.label}
                {activeSection === item.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9233E]" />
                )}
              </button>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              className="bg-[#D9233E] hover:bg-[#B51B32] text-white px-6 py-3 text-xs font-mono font-bold uppercase tracking-widest rounded-none transition-all duration-300 flex items-center gap-2 group shadow-md"
            >
              <span>GET A QUOTE</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0B0B0B]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white text-[#0B0B0B] pt-24 px-8 flex flex-col justify-between pb-12 lg:hidden overflow-y-auto"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                GRATIS GROUP NAVIGATION
              </span>
              {[
                { label: "Home", key: "all" },
                { label: "About GRATIS", key: "about" },
                { label: "Chairman's Vision", key: "chairman" },
                { label: "Six Business Verticals", key: "verticals" },
                { label: "Products & Portfolio", key: "products" },
                { label: "Contact Us", key: "contact" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveSection(item.key);
                    setMobileMenuOpen(false);
                    if (item.key !== "all") {
                      document
                        .getElementById(item.key)
                        ?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="block w-full text-left font-display text-2xl uppercase tracking-wide py-3 border-b border-[#E5E5E5] hover:text-[#D9233E]"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 border-t border-[#E5E5E5] pt-6">
              <p className="text-xs font-mono uppercase text-[#666666]">
                Direct Trade Inquiry
              </p>
              <p className="text-xl font-display text-[#D9233E]">
                +91 95440 48877
              </p>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3.5 bg-[#D9233E] text-white font-mono font-bold uppercase tracking-wider text-xs rounded-none"
              >
                GET A QUOTE →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== 2. HERO SECTION (PURE WHITE #FFFFFF & SOFT GRAY #F5F4F0) ==================== */}
      <section className="relative w-full min-h-screen bg-gradient-to-b from-white to-[#F5F4F0] text-[#0B0B0B] pt-28 pb-16 flex items-center overflow-hidden border-b border-[#E5E5E5]">
        {/* Oversized Background Chevron Graphic Motif */}
        <div className="absolute -right-12 top-0 bottom-0 pointer-events-none select-none opacity-25 flex items-center justify-end overflow-hidden z-0">
          <div className="flex gap-10 transform translate-x-20">
            <span className="w-28 md:w-36 h-[900px] bg-[#D9233E] skew-x-[-25deg] block" />
            <span className="w-28 md:w-36 h-[900px] bg-[#D9233E] skew-x-[-25deg] block" />
            <span className="w-28 md:w-36 h-[900px] bg-[#D9233E] skew-x-[-25deg] block" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: High-Impact Editorial Typography */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#F5F4F0] border-l-2 border-[#D9233E] text-xs font-mono tracking-widest text-[#0B0B0B] uppercase font-bold border border-[#E5E5E5]">
              <span>INDUSTRIAL MANUFACTURING & ARCHITECTURAL MATERIALS</span>
            </div>

            {/* High Impact Editorial Typography */}
            <div className="space-y-1">
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.9] uppercase text-[#0B0B0B]">
                WHERE <br />
                <span className="text-[#D9233E]">CRAFTSMANSHIP</span> <br />
                MEETS <span className="text-[#D9233E]">MODERN LIVING</span>
              </h1>
            </div>

            <p className="text-base md:text-lg text-[#555555] font-normal leading-relaxed max-w-xl">
              At GRATIS, we manufacture and supply high-density timber, PVC boards, engineered veneers, and structural panels that power large-scale architectural projects.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
              <a
                href="#products"
                className="bg-[#D9233E] hover:bg-[#B51B32] text-white px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest rounded-none shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>EXPLORE OUR PRODUCTS</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1.5 transition-transform"
                />
              </a>

              <a
                href="#about"
                className="border border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-white text-[#0B0B0B] px-6 py-4 text-xs font-mono font-bold uppercase tracking-widest rounded-none transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>SCROLL TO EXPLORE ↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Photography + Red Chevrons Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 overflow-hidden border border-[#E5E5E5] bg-white group shadow-xl">
              <img
                src="/hero-living-space.jpg"
                alt="GRATIS Architectural Masterpiece"
                className="w-full h-[500px] md:h-[580px] object-cover group-hover:scale-105 transition-all duration-700"
              />
              {/* Overlay Partially Cropped Chevrons */}
              <div className="absolute top-0 right-0 bottom-0 w-36 bg-gradient-to-l from-black/70 via-black/30 to-transparent pointer-events-none flex items-center justify-end pr-4">
                <div className="flex gap-2 opacity-90">
                  <span className="w-3.5 h-48 bg-[#D9233E] skew-x-[-20deg] block" />
                  <span className="w-3.5 h-48 bg-[#D9233E] skew-x-[-20deg] block" />
                  <span className="w-3.5 h-48 bg-[#D9233E] skew-x-[-20deg] block" />
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-white/95 p-4 border-t border-[#E5E5E5]">
                <p className="text-xs font-mono uppercase text-[#D9233E] font-bold">
                  ARCHITECTURAL PANELING & TIMBER VENEERS
                </p>
              </div>
            </div>
            {/* Red Offset Border Accent */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#D9233E]/40 z-0 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ==================== POST-HERO WRAPPER WITH MINIMAL DIAGONAL BANDS BACKGROUND ==================== */}
      <div className="gratis-abstract-bg">
        {/* ==================== 3. STATEMENT BAR (SOFT GRAY #F5F4F0) ==================== */}
        <section className="w-full py-16 bg-[#F5F4F0]/80 text-[#0B0B0B] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "QUALITY CONSTRUCTION",
              desc: "Built to last with uncompromising raw material standards.",
              icon: <Shield className="w-5 h-5 text-[#D9233E]" />,
            },
            {
              num: "02",
              title: "INNOVATIVE DESIGN",
              desc: "Engineered panel products for futuristic architectural spaces.",
              icon: <Compass className="w-5 h-5 text-[#D9233E]" />,
            },
            {
              num: "03",
              title: "TRUSTED EXPERTISE",
              desc: "Over 75 years of combined timber manufacturing heritage.",
              icon: <Award className="w-5 h-5 text-[#D9233E]" />,
            },
            {
              num: "04",
              title: "END-TO-END SOLUTIONS",
              desc: "From factory manufacturing to Woodmall retail distribution.",
              icon: <Layers className="w-5 h-5 text-[#D9233E]" />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-[#E5E5E5] hover:border-[#D9233E] transition-colors space-y-3 relative group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#D9233E]">
                  {item.num}
                </span>
                {item.icon}
              </div>
              <h4 className="font-display text-lg font-bold uppercase tracking-tight text-[#0B0B0B]">
                {item.title}
              </h4>
              <p className="text-xs text-[#555555] font-normal leading-relaxed">
                {item.desc}
              </p>
              <div className="w-full h-0.5 bg-transparent group-hover:bg-[#D9233E] transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 4. LEADERSHIP / CHAIRMAN (PURE WHITE #FFFFFF) ==================== */}
      <section id="chairman" className="py-24 bg-white text-[#0B0B0B] border-b border-[#E5E5E5] bg-diagonal-red-chevrons overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#F5F4F0] p-8 md:p-14 border border-[#E5E5E5] relative shadow-sm">
            {/* Red Vertical Accent Line */}
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#D9233E]" />

            <div className="lg:col-span-4 relative">
              <div className="relative border border-[#E5E5E5] bg-white overflow-hidden shadow-md">
                <img
                  src="/chairman-noorudheen.jpg"
                  alt="Noorudheen T, Chairman of Gratis Group"
                  className="w-full h-[440px] object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 inset-x-0 bg-white/95 p-4 border-t border-[#E5E5E5]">
                  <h4 className="font-display text-lg uppercase text-[#0B0B0B] font-bold">
                    Noorudheen T
                  </h4>
                  <p className="text-xs font-mono uppercase text-[#D9233E] font-bold mt-0.5">
                    Chairman, GRATIS Group
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                <span className="w-2 h-2 bg-[#D9233E]" />
                <span>CHAIRMAN&apos;S VISION</span>
              </div>

              <h3 className="font-display text-4xl md:text-5xl font-extrabold text-[#0B0B0B] tracking-tight uppercase leading-none">
                &quot;OUR VISION IS A BETTER TOMORROW&quot;
              </h3>

              <div className="space-y-4 text-sm text-[#444444] font-normal leading-relaxed">
                <p>
                  At GRATIS, we believe in creating lasting value through quality, innovation and an unwavering commitment to excellence. Our journey has been driven by people, trust and a vision to build a better tomorrow for generations to come.
                </p>
                <p>
                  While we offer a diverse range of products and services, from plywood to hardware and retail, we strive to provide cost-effective quality and timely delivery in every single transaction.
                </p>
                <p>
                  We are implementing project-based inventory management, staying ahead of technological advancements, and empowering carpenters and contractors through training and support.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E5E5] text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                — NOORUDHEEN T • CHAIRMAN, GRATIS GROUP
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. ABOUT GRATIS GROUP (SOFT GRAY #F5F4F0) ==================== */}
      <section id="about" className="py-24 bg-[#F5F4F0] text-[#0B0B0B] border-b border-[#E5E5E5] bg-diagonal-red-chevrons-left overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="overflow-hidden border border-[#E5E5E5] relative shadow-md bg-white">
                <img
                  src="/gratis-corporate.jpg"
                  alt="GRATIS Group Headquarters"
                  className="w-full h-[500px] object-cover transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#0B0B0B] text-white px-4 py-2 text-xs font-mono uppercase tracking-widest border-l-2 border-[#D9233E]">
                  ESTABLISHED 2000
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                <span className="w-2 h-2 bg-[#D9233E]" />
                <span>ABOUT GRATIS GROUP</span>
              </div>

              <h2 className="font-display text-4xl md:text-6xl font-extrabold text-[#0B0B0B] tracking-tight uppercase leading-none">
                SIX VERTICALS. <br />
                <span className="text-[#D9233E]">ONE COMMITMENT.</span>
              </h2>

              <div className="space-y-4 text-sm text-[#444444] leading-relaxed bg-white p-6 border border-[#E5E5E5]">
                <p className="font-semibold text-[#0B0B0B]">
                  Gratis Group of Companies was founded in the year 2000 by Noorudheen T, built on a conviction that builders, contractors, carpenters, and homeowners deserved a dependable, quality-first source for panel products and hardware.
                </p>
                <p>
                  What began as wholesale trading has grown over more than two decades into a diversified conglomerate spanning manufacturing, wholesale distribution, organized retail, interior execution, consulting, and international trade across Kerala, Tamil Nadu, Karnataka, and the UAE.
                </p>
                <div className="text-xs text-[#0B0B0B] font-mono border-l-2 border-[#D9233E] pl-3 py-1.5 bg-[#F5F4F0]">
                  Cochin Veneers, established in 1948, joined Gratis in 2023 — bringing 75+ years of hands-on heritage manufacturing into the fold.
                </div>
              </div>
            </div>
          </div>

          {/* Asymmetric Mission & Vision Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Panel (White #FFFFFF) */}
            <div className="bg-white border border-[#E5E5E5] p-8 md:p-12 space-y-4 relative shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                  PURPOSE & DRIVE
                </span>
                <div className="w-10 h-10 bg-[#D9233E] text-white flex items-center justify-center font-display font-bold text-lg">
                  M
                </div>
              </div>
              <h3 className="font-display text-3xl font-extrabold text-[#0B0B0B] uppercase tracking-tight">
                OUR MISSION
              </h3>
              <p className="text-sm text-[#555555] font-normal leading-relaxed">
                To deliver world-class products and spaces through innovation, integrity and a relentless focus on quality — empowering builders and contractors with materials engineered to last.
              </p>
              <div className="pt-4 flex items-center gap-2 text-xs font-mono font-bold text-[#D9233E] uppercase tracking-wider">
                <span>QUALITY ASSURANCE & STANDARDS</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Vision Panel (Soft Gray #F5F4F0 + Red Border) */}
            <div className="bg-[#F5F4F0] border-l-4 border-[#D9233E] border border-[#E5E5E5] p-8 md:p-12 space-y-4 relative shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                  GLOBAL DIRECTION
                </span>
                <div className="w-10 h-10 bg-[#0B0B0B] text-white flex items-center justify-center font-display font-bold text-lg">
                  V
                </div>
              </div>
              <h3 className="font-display text-3xl font-extrabold text-[#0B0B0B] uppercase tracking-tight">
                OUR VISION
              </h3>
              <p className="text-sm text-[#555555] font-normal leading-relaxed">
                To be a global leader in our industry, known for excellence, sustainability and a better future for communities across every market we enter.
              </p>
              <div className="pt-4 flex items-center gap-2 text-xs font-mono font-bold text-[#D9233E] uppercase tracking-wider">
                <span>TRANSFORMATIVE INNOVATION</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6. BUSINESS VERTICALS (LARGE INDUSTRIAL GRID ON PURE WHITE #FFFFFF) ==================== */}
      <section id="verticals" className="py-24 bg-white text-[#0B0B0B] border-b border-[#E5E5E5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
              CONGLOMERATE STRUCTURE
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-[#0B0B0B] tracking-tight uppercase leading-none">
              SIX VERTICALS. <span className="text-[#D9233E]">ONE GROUP.</span>
            </h2>
          </div>

          {/* Industrial Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Woodmall Panel (Occupies 7 Columns) */}
            <div className="lg:col-span-7 bg-[#F5F4F0] p-8 md:p-12 border-l-4 border-[#D9233E] border border-[#E5E5E5] relative overflow-hidden flex flex-col justify-between space-y-8 shadow-md">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-[#D9233E] text-white text-xs font-mono uppercase font-bold tracking-widest inline-block">
                  ★ FLAGSHIP VERTICAL
                </span>
                <h3 className="font-display text-3xl md:text-5xl font-extrabold text-[#0B0B0B] uppercase leading-none">
                  WOODMALL — <br />
                  <span className="text-[#D9233E]">EVERY INTERIOR PRODUCT UNDER ONE ROOF</span>
                </h3>
                <p className="text-sm text-[#555555] font-normal leading-relaxed">
                  Woodmall is where Gratis meets the customer directly — organized retail for plywood, MDF, laminates, PVC boards, hardware, and security locks across South India.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E5E5]">
                <div className="bg-white p-4 border border-[#E5E5E5] space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[#D9233E] font-bold">
                    LIVE KERALA OUTLETS
                  </h4>
                  <ul className="text-xs text-[#444444] space-y-1 font-mono">
                    <li>• Pilathara, Kannur</li>
                    <li>• Calicut</li>
                    <li>• Puthanathani, Malappuram</li>
                    <li>• Manjeri & Malappuram</li>
                    <li>• Kalamassery, Ernakulam</li>
                  </ul>
                </div>

                <div className="bg-white p-4 border border-[#E5E5E5] space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[#D9233E] font-bold">
                    EXPANSION PIPELINE
                  </h4>
                  <ul className="text-xs text-[#444444] space-y-1 font-mono">
                    <li>• Trivandrum</li>
                    <li>• Kottayam</li>
                    <li>• Trichur</li>
                    <li>• Perinthalmanna</li>
                    <li>• Kannur & Nadapuram</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Secondary Verticals Asymmetric Grid (Occupies 5 Columns) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              {[
                {
                  num: "01",
                  title: "MANUFACTURING",
                  entity: "Cochin Veneers LLP & Astrafort Panel Products",
                  desc: "75+ years of hands-on timber manufacturing heritage.",
                },
                {
                  num: "02",
                  title: "INTERIOR SOLUTIONS",
                  entity: "G-Space Interio Pvt Ltd",
                  desc: "Full interior design and contracting execution.",
                },
                {
                  num: "03",
                  title: "TRADING & RETAIL",
                  entity: "Gratis Panel Products Pvt Ltd",
                  desc: "Holding entity for Woodmall retail desks & B2B wholesale.",
                },
                {
                  num: "04",
                  title: "STATE EXPANSION",
                  entity: "Sanear Exim Intl. & Gratis Industries",
                  desc: "Operating models in Karnataka and Tamil Nadu.",
                },
                {
                  num: "05",
                  title: "INTERNATIONAL TRADING",
                  entity: "Gratis Building & Construction LLC (Dubai & Ajman)",
                  desc: "Wholesale & retail trading desks in the United Arab Emirates.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#F5F4F0] p-5 border border-[#E5E5E5] hover:border-[#D9233E] transition-colors flex items-start gap-4 group shadow-xs"
                >
                  <span className="font-mono text-xl font-extrabold text-[#D9233E]">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="font-display text-base font-bold uppercase tracking-tight text-[#0B0B0B] group-hover:text-[#D9233E] transition-colors">
                      {item.title} — {item.entity}
                    </h4>
                    <p className="text-xs text-[#555555] font-normal mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 7. PRODUCTS RANGE (SOFT GRAY #F5F4F0) ==================== */}
      <section id="products" className="py-24 bg-[#F5F4F0] text-[#0B0B0B] border-b border-[#E5E5E5] bg-diagonal-red-chevrons overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
              OUR PRODUCTS
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-[#0B0B0B] tracking-tight uppercase leading-none">
              EVERYTHING YOU NEED. <br />
              <span className="text-[#D9233E]">ALL IN ONE PLACE.</span>
            </h2>
          </div>

          {/* Asymmetric Portfolio Project Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Feature Project (7 Columns) */}
            <div className="lg:col-span-7 group relative h-[500px] border border-[#E5E5E5] overflow-hidden bg-white shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
                alt="RESIDENTIAL SPACES"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white space-y-2">
                <span className="text-xs font-mono uppercase text-[#D9233E] font-bold">
                  FEATURED CATEGORY
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
                  RESIDENTIAL SPACES
                </h3>
                <p className="text-xs text-white/80 font-normal max-w-md leading-relaxed">
                  Modern living, redefined with moisture-proof PVC foam boards, natural veneers, and custom cabinetry.
                </p>
              </div>
            </div>

            {/* 2 Asymmetric Projects (5 Columns) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-8">
              {[
                {
                  title: "COMMERCIAL SPACES",
                  sub: "Built for high-traffic corporate offices and retail storefronts.",
                  img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
                },
                {
                  title: "ARCHITECTURAL PROJECTS",
                  sub: "Structural plywoods and louvers engineered for load durability.",
                  img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="group relative h-[236px] border border-[#E5E5E5] overflow-hidden bg-white shadow-md"
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white space-y-1">
                    <h4 className="font-display text-xl font-extrabold uppercase tracking-tight text-white">
                      {card.title}
                    </h4>
                    <p className="text-xs text-white/80 font-normal leading-relaxed">
                      {card.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 8. HUGE NUMERICAL STATISTICS (SOFT GRAY #F5F4F0) ==================== */}
      <section className="py-24 bg-white text-[#0B0B0B] border-b border-[#E5E5E5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
              PROVEN PERFORMANCE
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-[#0B0B0B] tracking-tight uppercase leading-none">
              ENGINEERED FOR <span className="text-[#D9233E]">SCALE.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-left">
            {[
              { stat: "100%", label: "Quality Finished Standards" },
              { stat: "50+", label: "Major Projects Delivered" },
              { stat: "06", label: "Business Verticals" },
              { stat: "10+", label: "Years of Market Trust" },
              { stat: "GLOBAL", label: "Operations (India & UAE)" },
            ].map((s, idx) => (
              <div key={idx} className="border-t-2 border-[#D9233E] pt-6 space-y-2">
                <p className="font-display text-5xl md:text-6xl font-extrabold text-[#D9233E] tracking-tight">
                  {s.stat}
                </p>
                <p className="text-xs font-mono uppercase tracking-wider text-[#0B0B0B] font-bold">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 9. DRAMATIC CTA BANNER (PURE WHITE #FFFFFF + RED CHEVRONS) ==================== */}
      <section className="py-28 bg-gradient-to-b from-white to-[#F5F4F0] text-[#0B0B0B] border-b border-[#E5E5E5] relative overflow-hidden">
        {/* Oversized Chevrons Emerging from Right Edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-20">
          <div className="flex gap-6 transform translate-x-8">
            <span className="w-28 h-[600px] bg-[#D9233E] skew-x-[-24deg] block" />
            <span className="w-28 h-[600px] bg-[#D9233E] skew-x-[-24deg] block" />
            <span className="w-28 h-[600px] bg-[#D9233E] skew-x-[-24deg] block" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
            PARTNER WITH GRATIS GROUP
          </span>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase leading-[0.9]">
            LET&apos;S BUILD <br />
            <span className="text-[#D9233E]">SOMETHING BETTER.</span>
          </h2>

          <p className="text-base md:text-lg text-[#555555] max-w-xl font-normal leading-relaxed">
            Partner with GRATIS for innovative, reliable, and future-ready timber, PVC, and architectural materials.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
            <a
              href="#contact"
              className="bg-[#D9233E] hover:bg-[#B51B32] text-white px-9 py-4 text-xs font-mono font-bold uppercase tracking-widest rounded-none shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>GET A QUOTE</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </a>

            <a
              href="tel:+919544048877"
              className="border border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-white text-[#0B0B0B] px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest rounded-none transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>TALK TO OUR TEAM →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================== 10. CONTACT FORM (SOFT GRAY #F5F4F0) ==================== */}
      <section id="contact" className="py-24 bg-[#F5F4F0] text-[#0B0B0B] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                  GET IN TOUCH
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#0B0B0B] uppercase tracking-tight leading-none">
                  HAVE A PROJECT IN MIND?
                </h2>
                <p className="text-sm text-[#555555] font-normal leading-relaxed">
                  Contact our trade desk for wholesale inquiries, project estimations, or technical specifications.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white border border-[#E5E5E5] text-[#D9233E]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#666666]">
                      Direct Call / WhatsApp
                    </h4>
                    <p className="font-display text-xl font-bold text-[#0B0B0B] mt-0.5">
                      +91 95440 48877
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white border border-[#E5E5E5] text-[#D9233E]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#666666]">
                      Email Inquiry
                    </h4>
                    <p className="font-mono text-base font-bold text-[#0B0B0B] mt-0.5">
                      info@gratisgroup.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white border border-[#E5E5E5] text-[#D9233E]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#666666]">
                      Headquarters & Operations
                    </h4>
                    <p className="text-xs font-bold text-[#0B0B0B] mt-0.5">
                      Kerala, Tamil Nadu, Karnataka (India) & Dubai / Ajman (UAE)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-[#E5E5E5] shadow-sm">
              {formSubmitted ? (
                <div className="p-8 bg-[#F5F4F0] border-l-4 border-[#D9233E] text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#D9233E] mx-auto" />
                  <h3 className="font-display text-2xl font-extrabold text-[#0B0B0B] uppercase">
                    INQUIRY RECEIVED!
                  </h3>
                  <p className="text-xs text-[#666666]">
                    Thank you for contacting GRATIS Group. Our trade specialist will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#0B0B0B] mb-1 font-bold">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        className="w-full bg-[#F5F4F0] border border-[#E5E5E5] p-3.5 text-xs text-[#0B0B0B] focus:border-[#D9233E] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#0B0B0B] mb-1 font-bold">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@domain.com"
                        className="w-full bg-[#F5F4F0] border border-[#E5E5E5] p-3.5 text-xs text-[#0B0B0B] focus:border-[#D9233E] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#0B0B0B] mb-1 font-bold">
                      Project / Inquiry Type
                    </label>
                    <select className="w-full bg-[#F5F4F0] border border-[#E5E5E5] p-3.5 text-xs text-[#0B0B0B] focus:border-[#D9233E] focus:outline-none">
                      <option>Wholesale Trade Inquiry</option>
                      <option>Woodmall Retail Inquiry</option>
                      <option>Plywood & PVC Specifications</option>
                      <option>Interior Contracting Project</option>
                      <option>International Export (UAE)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#0B0B0B] mb-1 font-bold">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your project or required material quantities..."
                      className="w-full bg-[#F5F4F0] border border-[#E5E5E5] p-3.5 text-xs text-[#0B0B0B] focus:border-[#D9233E] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D9233E] hover:bg-[#B51B32] text-white py-4 text-xs font-mono font-bold uppercase tracking-widest rounded-none shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>SEND MESSAGE</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 11. FOOTER (CLEAN WHITE #FFFFFF) ==================== */}
      <footer className="bg-white text-[#0B0B0B] border-t border-[#E5E5E5] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-3xl font-extrabold tracking-tighter uppercase text-[#0B0B0B]">
                  GRATIS
                </span>
                <div className="flex gap-1 ml-1">
                  <span className="w-1.5 h-5 bg-[#D9233E] skew-x-[-20deg] block" />
                  <span className="w-1.5 h-5 bg-[#D9233E] skew-x-[-20deg] block" />
                  <span className="w-1.5 h-5 bg-[#D9233E] skew-x-[-20deg] block" />
                </div>
              </div>
              <p className="text-xs text-[#555555] font-normal leading-relaxed">
                Gratis Group of Companies — Industrial manufacturing, wholesale, Woodmall retail, interior execution, and international trading.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D9233E] mb-4">
                Quick Links
              </h4>
              <ul className="text-xs text-[#555555] space-y-2 font-mono">
                <li>
                  <a href="#" className="hover:text-[#D9233E] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#D9233E] transition-colors">
                    About Group
                  </a>
                </li>
                <li>
                  <a href="#chairman" className="hover:text-[#D9233E] transition-colors">
                    Chairman&apos;s Vision
                  </a>
                </li>
                <li>
                  <a href="#verticals" className="hover:text-[#D9233E] transition-colors">
                    Six Verticals
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-[#D9233E] transition-colors">
                    Product Portfolio
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D9233E] mb-4">
                Our Business
              </h4>
              <ul className="text-xs text-[#555555] space-y-2 font-mono">
                <li>• Cochin Veneers LLP</li>
                <li>• Woodmall Retail Outlets</li>
                <li>• G-Space Interio Pvt Ltd</li>
                <li>• Gratis Panel Products</li>
                <li>• Gratis Construction (UAE)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#D9233E] mb-4">
                Global Operations
              </h4>
              <p className="text-xs text-[#555555] leading-relaxed font-normal">
                Operating across South India (Kerala, Tamil Nadu, Karnataka) and the UAE (Dubai & Ajman).
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#D9233E]/30 flex flex-col sm:flex-row items-center justify-between text-xs text-[#555555]">
            <p>© {new Date().getFullYear()} GRATIS Group of Companies. All rights reserved.</p>
            <p className="font-mono text-[#D9233E] font-bold">GRATIS — WE ARE BEHIND ALL THAT&apos;S BEAUTIFUL.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
