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
  Clock,
  Send,
  Building,
  CheckCircle2,
  Users,
  Compass,
  Zap,
  Globe,
  Briefcase,
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
        "values",
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
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#D9233E] selection:text-white">
      {/* ==================== 1. HEADER ==================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#111111] text-white py-3 shadow-xl border-b border-white/10"
            : "bg-white text-[#111111] py-4 border-b border-[#E5E5E5]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo with Red Chevrons */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-2xl md:text-3xl tracking-tighter uppercase font-sans">
                GRATIS
              </span>
              {/* Three Red Diagonal Chevrons Motif */}
              <div className="flex gap-0.5 ml-1">
                <span className="w-1.5 h-5 bg-[#D9233E] skew-x-[-20deg] block" />
                <span className="w-1.5 h-5 bg-[#D9233E] skew-x-[-20deg] block" />
                <span className="w-1.5 h-5 bg-[#D9233E] skew-x-[-20deg] block" />
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider">
            {[
              { label: "Home", key: "all" },
              { label: "About", key: "about" },
              { label: "Leadership", key: "chairman" },
              { label: "Our Verticals", key: "verticals" },
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
                    : isScrolled
                    ? "text-white/80 hover:text-white"
                    : "text-[#111111] hover:text-[#D9233E]"
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
              className="bg-[#D9233E] hover:bg-[#B51B32] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs shadow-md transition-all duration-300 flex items-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? "text-white" : "text-[#111111]"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#111111] text-white pt-24 px-8 flex flex-col justify-between pb-12 lg:hidden overflow-y-auto"
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
                { label: "Products & Materials", key: "products" },
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
                  className="block w-full text-left text-xl font-bold uppercase tracking-wide py-2 border-b border-white/10 hover:text-[#D9233E]"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <p className="text-xs font-mono uppercase text-white/50">
                Direct Trade Inquiry
              </p>
              <p className="text-xl font-bold text-[#D9233E]">+91 95440 48877</p>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3 bg-[#D9233E] text-white font-bold uppercase tracking-wider text-xs rounded-xs shadow-lg"
              >
                Get a Quote →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== 2. HERO SECTION (DEEP BLACK #111111) ==================== */}
      <section className="relative w-full min-h-screen bg-[#111111] text-white pt-28 pb-16 flex items-center overflow-hidden">
        {/* Subtle Background Chevron Accent Graphic */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none select-none hidden lg:block">
          <div className="flex gap-4">
            <span className="w-24 h-[600px] bg-[#D9233E] skew-x-[-24deg] block" />
            <span className="w-24 h-[600px] bg-[#D9233E] skew-x-[-24deg] block" />
            <span className="w-24 h-[600px] bg-[#D9233E] skew-x-[-24deg] block" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 border-l-2 border-[#D9233E] text-xs font-mono tracking-widest text-white/90 uppercase font-bold">
              <span>BUILDING & BUILDING MATERIALS</span>
            </div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-none text-white">
              Where <br />
              <span className="text-[#D9233E]">Craftsmanship</span> <br />
              Meets <span className="text-[#D9233E]">Modern Living</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 font-normal leading-relaxed max-w-xl">
              At GRATIS, we create spaces that inspire, perform and stand the test of time across manufacturing, trading, retail, and architectural solutions.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#products"
                className="bg-[#D9233E] hover:bg-[#B51B32] text-white px-8 py-4 text-xs font-extrabold uppercase tracking-wider rounded-xs shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <span>Explore Our Products</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>

              <a
                href="#about"
                className="border border-white/30 hover:border-white text-white px-6 py-4 text-xs font-extrabold uppercase tracking-wider rounded-xs transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Scroll to explore ↓</span>
              </a>
            </div>
          </div>

          {/* Right Hero Image Composition with Red Diagonal Chevron Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 overflow-hidden border-2 border-white/10 shadow-2xl bg-[#1A1A1A]">
              <img
                src="/hero-living-space.jpg"
                alt="GRATIS Architectural Project"
                className="w-full h-[480px] md:h-[540px] object-cover"
              />
              {/* Overlay Red Brand Chevron Motif */}
              <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black/80 to-transparent pointer-events-none flex items-center justify-end pr-4">
                <div className="flex gap-1.5 opacity-80">
                  <span className="w-3 h-40 bg-[#D9233E] skew-x-[-20deg] block" />
                  <span className="w-3 h-40 bg-[#D9233E] skew-x-[-20deg] block" />
                  <span className="w-3 h-40 bg-[#D9233E] skew-x-[-20deg] block" />
                </div>
              </div>
            </div>
            {/* Subtle red backplane accent */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-[#D9233E]/40 z-0 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ==================== 3. VALUE STRIP (CLEAN WHITE #FFFFFF) ==================== */}
      <section className="w-full py-12 bg-white text-[#111111] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Shield className="w-6 h-6 text-[#D9233E]" />,
              title: "Quality Construction",
              desc: "Built to last with uncompromising standards.",
            },
            {
              icon: <Compass className="w-6 h-6 text-[#D9233E]" />,
              title: "Innovative Design",
              desc: "Spaces engineered for the future.",
            },
            {
              icon: <Award className="w-6 h-6 text-[#D9233E]" />,
              title: "Trusted Expertise",
              desc: "Decades of manufacturing & trade experience.",
            },
            {
              icon: <Layers className="w-6 h-6 text-[#D9233E]" />,
              title: "End-to-End Solutions",
              desc: "From raw material concept to execution.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border-l-2 border-[#D9233E]/20 hover:border-[#D9233E] transition-colors bg-[#F3F3F1] rounded-xs"
            >
              <div className="p-2 bg-white rounded-xs shadow-sm">{item.icon}</div>
              <div>
                <h4 className="text-sm font-extrabold tracking-tight uppercase text-[#111111]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#666666] mt-1 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 4. CHAIRMAN'S VISION (SOFT GRAY #F3F3F1) ==================== */}
      {(activeSection === "all" || activeSection === "chairman") && (
        <section id="chairman" className="py-24 bg-[#F3F3F1] border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 md:p-14 border border-[#E5E5E5] shadow-sm relative">
              {/* Decorative Red Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#D9233E]" />

              <div className="lg:col-span-4 relative">
                <div className="relative overflow-hidden border border-[#E5E5E5] bg-[#111111]">
                  <img
                    src="/chairman-noorudheen.jpg"
                    alt="Noorudheen T, Chairman of Gratis Group"
                    className="w-full h-[420px] object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white p-4 text-center">
                    <h4 className="font-extrabold text-base uppercase tracking-tight text-white">
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
                  <span>CHAIRMAN&apos;S MESSAGE</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight">
                  &quot;Our Vision is a Better Tomorrow&quot;
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

                <div className="pt-2 text-sm font-bold text-[#D9233E] uppercase tracking-wide">
                  — Noorudheen T, Chairman
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== 5. ABOUT GRATIS GROUP (CLEAN WHITE #FFFFFF) ==================== */}
      {(activeSection === "all" || activeSection === "about") && (
        <section id="about" className="py-24 bg-white border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="overflow-hidden border border-[#E5E5E5] relative shadow-md">
                  <img
                    src="/gratis-corporate.jpg"
                    alt="GRATIS Group Headquarters"
                    className="w-full h-[480px] object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#111111] text-white px-4 py-2 text-xs font-mono uppercase tracking-widest border-l-2 border-[#D9233E]">
                    ESTABLISHED 2000
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                  <span className="w-2 h-2 bg-[#D9233E]" />
                  <span>ABOUT GRATIS GROUP</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                  Six Verticals. <br />
                  <span className="text-[#D9233E]">One Commitment.</span>
                </h2>

                <div className="space-y-4 text-sm text-[#444444] leading-relaxed bg-[#F3F3F1] p-6 border border-[#E5E5E5]">
                  <p className="font-semibold text-[#111111]">
                    Gratis Group of Companies was founded in the year 2000 by Noorudheen T, built on a conviction that builders, contractors, carpenters, and homeowners deserved a dependable, quality-first source for panel products and hardware.
                  </p>
                  <p>
                    What began as wholesale trading has grown over more than two decades into a diversified conglomerate spanning manufacturing, wholesale distribution, organized retail, interior execution, consulting, and international trade across Kerala, Tamil Nadu, Karnataka, and the UAE.
                  </p>
                  <div className="text-xs text-[#111111] font-mono border-l-2 border-[#D9233E] pl-3 py-1 bg-white">
                    Cochin Veneers, established in 1948, joined Gratis in 2023 — bringing 75+ years of hands-on manufacturing craftsmanship into the fold.
                  </div>
                </div>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card (Soft Gray #F3F3F1) */}
              <div className="bg-[#F3F3F1] border border-[#E5E5E5] p-8 md:p-10 relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                    PURPOSE & DRIVE
                  </span>
                  <div className="w-10 h-10 bg-[#D9233E] text-white flex items-center justify-center font-bold text-lg">
                    M
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-[#111111] uppercase tracking-tight">
                  Our Mission
                </h3>
                <p className="text-sm text-[#555555] font-normal leading-relaxed">
                  To deliver world-class products and spaces through innovation, integrity and a relentless focus on quality — empowering builders and contractors with materials engineered to last.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#D9233E] uppercase tracking-wider">
                  <span>Quality Assurance & Standards</span>
                  <ChevronRight size={14} />
                </div>
              </div>

              {/* Vision Card (Deep Black #111111) */}
              <div className="bg-[#111111] text-white border border-white/10 p-8 md:p-10 relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                    GLOBAL DIRECTION
                  </span>
                  <div className="w-10 h-10 bg-[#D9233E] text-white flex items-center justify-center font-bold text-lg">
                    V
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                  Our Vision
                </h3>
                <p className="text-sm text-white/80 font-normal leading-relaxed">
                  To be a global leader in our industry, known for excellence, sustainability and a better future for communities across every market we enter.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs font-bold text-[#D9233E] uppercase tracking-wider">
                  <span>Transformative Innovation</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>

            {/* What Guides Us Cards */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                  CORE PHILOSOPHY
                </span>
                <h3 className="text-3xl font-extrabold text-[#111111]">
                  What Guides Us
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Quality",
                    desc: "Uncompromising standards in everything we do — enforced through strict manufacturing oversight at Cochin Veneers & Astrafort.",
                    icon: <Shield className="w-6 h-6 text-[#D9233E]" />,
                  },
                  {
                    title: "People",
                    desc: "Our people and carpenter partners are our greatest strength — driving relationships that span generations.",
                    icon: <Users className="w-6 h-6 text-[#D9233E]" />,
                  },
                  {
                    title: "Sustainability",
                    desc: "Building responsibly for generations ahead through eco-conscious timber sourcing and resilient materials.",
                    icon: <Globe className="w-6 h-6 text-[#D9233E]" />,
                  },
                ].map((pillar, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F3F3F1] p-8 border border-[#E5E5E5] space-y-3 hover:border-[#D9233E] transition-colors"
                  >
                    <div className="p-2.5 bg-white w-fit shadow-xs">{pillar.icon}</div>
                    <h4 className="text-xl font-extrabold text-[#111111]">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#555555] leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== 6. PRODUCTS RANGE (DEEP BLACK #111111) ==================== */}
      {(activeSection === "all" || activeSection === "products") && (
        <section id="products" className="py-24 bg-[#111111] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                OUR PRODUCTS
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Everything You Need. <br />
                <span className="text-[#D9233E]">All in One Place.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "RESIDENTIAL SPACES",
                  sub: "Modern living, redefined with moisture-proof PVC and veneers.",
                  img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
                },
                {
                  title: "COMMERCIAL SPACES",
                  sub: "Built for high-traffic business and retail environments.",
                  img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
                },
                {
                  title: "OTHER PROJECTS",
                  sub: "Diverse, innovative, trusted architectural paneling.",
                  img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
                },
              ].map((card, idx) => (
                <a
                  key={idx}
                  href="#contact"
                  className="group relative h-[440px] border border-white/10 overflow-hidden block bg-[#1A1A1A]"
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-extrabold uppercase tracking-tight text-white">
                        {card.title}
                      </h3>
                      <div className="p-2 bg-[#D9233E] text-white">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                    <p className="text-xs text-white/70 font-normal leading-relaxed">
                      {card.sub}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Product Lineup Grid (Clean White Cards inside #F3F3F1 container) */}
            <div className="space-y-6 pt-12">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase text-[#D9233E] font-bold">
                    BUILDING & PANEL PRODUCTS
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Lightweight. Strong. Built to Perform.
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "PLYWOOD",
                    desc: "Engineered hardwood layers for structural strength.",
                    img: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=800&auto=format&fit=crop",
                  },
                  {
                    name: "VENEERS",
                    desc: "Elegant, durable natural timber surfaces.",
                    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
                  },
                  {
                    name: "DOORS & FRAMES",
                    desc: "Secure by design with precision density.",
                    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
                  },
                  {
                    name: "BUILDING MATERIALS",
                    desc: "Reliable for every commercial & home project.",
                    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
                  },
                ].map((prod, i) => (
                  <div
                    key={i}
                    className="bg-white text-[#111111] border border-[#E5E5E5] p-5 flex flex-col justify-between hover:border-[#D9233E] transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="h-40 overflow-hidden bg-[#F3F3F1]">
                        <img
                          src={prod.img}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base uppercase tracking-tight">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-[#666666] font-normal mt-1 leading-relaxed">
                          {prod.desc}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <a
                        href="#contact"
                        className="w-full text-center block py-2.5 bg-[#111111] hover:bg-[#D9233E] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Inquire Now →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== 7. ENGINEERED PERFORMANCE BAR ==================== */}
      <section className="py-16 bg-[#111111] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-2xl font-extrabold text-white">
              Engineered for <span className="text-[#D9233E]">Real-World Performance.</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { label: "DURABILITY", sub: "Built to last" },
              { label: "PRECISION", sub: "Consistent quality" },
              { label: "INNOVATION", sub: "Always evolving" },
              { label: "SUSTAINABILITY", sub: "A greener tomorrow" },
              { label: "MARKET REACH", sub: "Trusted state-wide" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-white/10 space-y-1 hover:border-[#D9233E] transition-colors"
              >
                <div className="w-3 h-3 bg-[#D9233E] mx-auto mb-2" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  {item.label}
                </h4>
                <p className="text-[11px] text-white/60 font-normal">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 8. SIX BUSINESS VERTICALS (CLEAN WHITE #FFFFFF) ==================== */}
      {(activeSection === "all" || activeSection === "verticals") && (
        <section id="verticals" className="py-24 bg-white border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                CONGLOMERATE STRUCTURE
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
                Six Verticals. One Group.
              </h2>
              <p className="text-sm text-[#666666] font-normal leading-relaxed">
                Gratis Group of Companies operates across six connected business verticals carried by dedicated entities.
              </p>
            </div>

            {/* Woodmall Feature Banner */}
            <div className="bg-[#111111] text-white p-8 md:p-14 border-l-4 border-[#D9233E] relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 bg-[#D9233E] text-white text-xs font-mono uppercase font-bold tracking-widest inline-block">
                    ★ FLAGSHIP VERTICAL
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                    Woodmall — <br />
                    <span className="text-[#D9233E]">Every Interior Product Under One Roof</span>
                  </h3>
                  <p className="text-sm text-white/80 font-normal leading-relaxed">
                    Woodmall is where Gratis meets the customer directly — plywood, MDF, laminates, PVC boards, hardware, and locks across retail outlets in South India.
                  </p>
                </div>

                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 p-5 border border-white/10 space-y-2">
                    <h4 className="text-xs font-mono uppercase text-[#D9233E] font-bold">
                      LIVE KERALA OUTLETS
                    </h4>
                    <ul className="text-xs text-white/80 space-y-1 font-normal">
                      <li>• Pilathara, Kannur</li>
                      <li>• Calicut</li>
                      <li>• Puthanathani, Malappuram</li>
                      <li>• Manjeri & Malappuram</li>
                      <li>• Kalamassery, Ernakulam</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 p-5 border border-white/10 space-y-2">
                    <h4 className="text-xs font-mono uppercase text-[#D9233E] font-bold">
                      EXPANSION PIPELINE
                    </h4>
                    <ul className="text-xs text-white/80 space-y-1 font-normal">
                      <li>• Trivandrum</li>
                      <li>• Kottayam</li>
                      <li>• Trichur</li>
                      <li>• Perinthalmanna</li>
                      <li>• Kannur & Nadapuram</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Business Verticals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  v: "01. MANUFACTURING",
                  entity: "Cochin Veneers LLP & Astrafort Panel Products LLP",
                  desc: "75+ years of hands-on manufacturing craftsmanship in timber and panel products.",
                },
                {
                  v: "02. INTERIOR SOLUTIONS",
                  entity: "G-Space Interio Pvt Ltd",
                  desc: "Delivers functional interior design and execution, from raw material to finished living space.",
                },
                {
                  v: "03. TRADING & RETAIL",
                  entity: "Gratis Panel Products Pvt Ltd",
                  desc: "Holding entity for Woodmall outlets, Mica Trade Lines, and wholesale desks.",
                },
                {
                  v: "04. STATE EXPANSION",
                  entity: "Sanear Exim Intl. & Gratis Industries",
                  desc: "Extending the group's operating model into Karnataka and Tamil Nadu.",
                },
                {
                  v: "05. MANAGEMENT CONSULTING",
                  entity: "GGC Alliance (Cochin)",
                  desc: "Consulting arm providing marketing, audit, HR, and operational support across entities.",
                },
                {
                  v: "06. INTERNATIONAL DIVISION",
                  entity: "Gratis Building & Construction LLC (Dubai & Ajman)",
                  desc: "Operating wholesale and retail trading desks across the United Arab Emirates.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#F3F3F1] border border-[#E5E5E5] p-6 space-y-3 flex flex-col justify-between hover:border-[#D9233E] transition-colors"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#D9233E] uppercase">
                      {item.v}
                    </span>
                    <h4 className="font-extrabold text-base text-[#111111] uppercase tracking-tight">
                      {item.entity}
                    </h4>
                    <p className="text-xs text-[#555555] leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== 9. STRENGTH MEETS SUSTAINABILITY STATS BANNER ==================== */}
      <section className="py-20 bg-white border-b border-[#E5E5E5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 relative z-10">
          <div className="bg-[#111111] text-white p-8 md:p-12 border-l-4 border-[#D9233E] relative overflow-hidden">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-mono uppercase text-[#D9233E] font-bold">
                SUSTAINABILITY APPROACH
              </span>
              <h3 className="text-3xl font-extrabold text-white">
                Strength Meets Sustainability
              </h3>
              <p className="text-xs text-white/80 font-normal leading-relaxed">
                We combine innovative materials with responsible practices to create a truly sustainable future.
              </p>
            </div>
            {/* Chevron graphic in background */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 hidden md:flex gap-2">
              <span className="w-8 h-32 bg-[#D9233E] skew-x-[-20deg]" />
              <span className="w-8 h-32 bg-[#D9233E] skew-x-[-20deg]" />
              <span className="w-8 h-32 bg-[#D9233E] skew-x-[-20deg]" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { stat: "100%", label: "Quality Finished" },
              { stat: "50+", label: "Projects Delivered" },
              { stat: "6", label: "Business Verticals" },
              { stat: "10+", label: "Years of Trust" },
              { stat: "Global", label: "Presence (India & UAE)" },
            ].map((s, idx) => (
              <div key={idx} className="bg-[#F3F3F1] border border-[#E5E5E5] p-6">
                <p className="text-3xl md:text-4xl font-extrabold text-[#D9233E]">
                  {s.stat}
                </p>
                <p className="text-xs font-mono uppercase tracking-wider text-[#111111] mt-1 font-bold">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 10. CALL TO ACTION BANNER (DEEP BLACK #111111) ==================== */}
      <section className="py-20 bg-[#111111] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-6 relative overflow-hidden">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
            PARTNER WITH GRATIS
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Let&apos;s Build <span className="text-[#D9233E]">Something Better.</span>
          </h2>
          <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto font-normal leading-relaxed">
            Partner with GRATIS for innovative, reliable and future-ready timber, PVC, and architectural solutions.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="bg-[#D9233E] hover:bg-[#B51B32] text-white px-8 py-4 text-xs font-extrabold uppercase tracking-wider rounded-xs shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="tel:+919544048877"
              className="border border-white/30 hover:border-white text-white px-8 py-4 text-xs font-extrabold uppercase tracking-wider rounded-xs transition-all duration-300"
            >
              <span>Talk to Our Team →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================== 11. CONTACT FORM SECTION (CLEAN WHITE #FFFFFF) ==================== */}
      {(activeSection === "all" || activeSection === "contact") && (
        <section id="contact" className="py-24 bg-white border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D9233E] font-bold">
                    GET IN TOUCH
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111]">
                    Have A Project In Mind?
                  </h2>
                  <p className="text-sm text-[#666666] font-normal leading-relaxed">
                    Get in touch with our team for wholesale trade inquiries, project estimation, or product specifications.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#F3F3F1] border border-[#E5E5E5] text-[#D9233E]">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase text-[#666666]">
                        Direct Call / WhatsApp
                      </h4>
                      <p className="text-lg font-extrabold text-[#111111] mt-0.5">
                        +91 95440 48877
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#F3F3F1] border border-[#E5E5E5] text-[#D9233E]">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase text-[#666666]">
                        Email Inquiry
                      </h4>
                      <p className="text-base font-extrabold text-[#111111] mt-0.5">
                        info@gratisgroup.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#F3F3F1] border border-[#E5E5E5] text-[#D9233E]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase text-[#666666]">
                        Headquarters
                      </h4>
                      <p className="text-sm font-extrabold text-[#111111] mt-0.5">
                        Kerala, Tamil Nadu, Karnataka (India) & Dubai / Ajman (UAE)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7 bg-[#F3F3F1] p-8 md:p-10 border border-[#E5E5E5]">
                {formSubmitted ? (
                  <div className="p-8 bg-white border-l-4 border-[#D9233E] text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-[#D9233E] mx-auto" />
                    <h3 className="text-2xl font-extrabold text-[#111111]">
                      Inquiry Received!
                    </h3>
                    <p className="text-xs text-[#666666]">
                      Thank you for contacting GRATIS Group. Our trade specialist will contact you shortly.
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
                        <label className="block text-xs font-mono uppercase text-[#111111] mb-1 font-bold">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          className="w-full bg-white border border-[#E5E5E5] p-3 text-xs text-[#111111] focus:border-[#D9233E] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#111111] mb-1 font-bold">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="yourname@domain.com"
                          className="w-full bg-white border border-[#E5E5E5] p-3 text-xs text-[#111111] focus:border-[#D9233E] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#111111] mb-1 font-bold">
                        Project / Inquiry Type
                      </label>
                      <select className="w-full bg-white border border-[#E5E5E5] p-3 text-xs text-[#111111] focus:border-[#D9233E] focus:outline-none">
                        <option>Wholesale Trade Inquiry</option>
                        <option>Woodmall Retail Inquiry</option>
                        <option>Plywood & PVC Specifications</option>
                        <option>Interior Contracting Project</option>
                        <option>International Export (UAE)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#111111] mb-1 font-bold">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your project or required material quantities..."
                        className="w-full bg-white border border-[#E5E5E5] p-3 text-xs text-[#111111] focus:border-[#D9233E] focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#D9233E] hover:bg-[#B51B32] text-white py-4 text-xs font-extrabold uppercase tracking-wider rounded-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Send Message</span>
                      <Send size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== 12. FOOTER (DEEP BLACK #111111) ==================== */}
      <footer className="bg-[#111111] text-white border-t border-white/10 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-2xl tracking-tighter uppercase font-sans text-white">
                  GRATIS
                </span>
                <div className="flex gap-0.5 ml-1">
                  <span className="w-1.5 h-5 bg-[#D9233E] skew-x-[-20deg] block" />
                  <span className="w-1.5 h-5 bg-[#D9233E] skew-x-[-20deg] block" />
                  <span className="w-1.5 h-5 bg-[#D9233E] skew-x-[-20deg] block" />
                </div>
              </div>
              <p className="text-xs text-white/60 font-normal leading-relaxed">
                Gratis Group of Companies — A multi-business industrial group spanning manufacturing, wholesale, Woodmall retail, interior execution, and global trade.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D9233E] mb-4">
                Quick Links
              </h4>
              <ul className="text-xs text-white/70 space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Group
                  </a>
                </li>
                <li>
                  <a href="#chairman" className="hover:text-white transition-colors">
                    Chairman&apos;s Message
                  </a>
                </li>
                <li>
                  <a href="#verticals" className="hover:text-white transition-colors">
                    Six Verticals
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-white transition-colors">
                    Product Portfolio
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D9233E] mb-4">
                Our Business
              </h4>
              <ul className="text-xs text-white/70 space-y-2">
                <li>• Cochin Veneers LLP</li>
                <li>• Woodmall Retail Outlets</li>
                <li>• G-Space Interio Pvt Ltd</li>
                <li>• Gratis Panel Products</li>
                <li>• Gratis Construction (UAE)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D9233E] mb-4">
                Global Operations
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Serving clients across Kerala, Tamil Nadu, Karnataka in South India, and Dubai & Ajman in the UAE.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40">
            <p>© {new Date().getFullYear()} GRATIS Group of Companies. All rights reserved.</p>
            <p className="font-mono">Industrial Architecture & Building Materials</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
