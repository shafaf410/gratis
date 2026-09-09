"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronRight, Phone, Mail, MapPin, Check, Shield, Layers, Sparkles, Send, Award, Clock } from "lucide-react";
import Lenis from "lenis";

export default function GratisHomepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMaterialTab, setActiveMaterialTab] = useState("PVC");
  const [activeAppTab, setActiveAppTab] = useState("RESIDENTIAL");
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
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy for section tracking
      const sections = ["about", "chairman", "verticals", "products", "timeline", "contact"];
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


  const materialData: Record<string, { image: string; title: string; desc: string; props: string[]; apps: string }> = {
    PVC: {
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      title: "PVC Foam Board Sheets",
      desc: "Lightweight, highly rigid, 100% waterproof and termite-proof material designed for demanding interior cladding, signage, and cabinetry.",
      props: ["50-60% Lighter", "Zero Water Absorption", "Termite Proof", "Chemical Resistant"],
      apps: "Interior Wall Cladding, Kitchen Carcasses, Outdoor Signage, Partition Screens",
    },
    PLYWOOD: {
      image: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=1200&auto=format&fit=crop",
      title: "Premium Structural Plywoods",
      desc: "Engineered hardwood layers bonded with superior resin technology for high-load durability and humid Kerala weather resistance.",
      props: ["High Load Capacity", "Borer & Termite Proof", "Calibrated Surface", "Boiling Water Resistant"],
      apps: "Heavy Duty Furniture, Architectural Millwork, Ceiling Panels, Structural Framework",
    },
    MDF: {
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
      title: "Medium Density Fiberboard (MDF)",
      desc: "Ultra-smooth homogeneous density board perfect for intricate CNC router routing, custom paint finishes, and seamless cabinetry.",
      props: ["Uniform Density", "Smooth Surface", "Easy CNC Carving", "Faster Finishing"],
      apps: "Modular Wardrobes, Decorative Jali Panels, Designer Doors, Wall Paneling",
    },
    VENEER: {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      title: "Natural Architectural Veneers",
      desc: "Thin slices of real timber bringing authentic wood grain warmth, character, and timeless elegance to bespoke interior elements.",
      props: ["Natural Timber Grains", "Warm Aesthetic", "Eco-Friendly Sourcing", "Premium Texture"],
      apps: "Feature Walls, Luxury Dining Tables, Executive Desk Tops, Acoustic Paneling",
    },
    LAMINATE: {
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
      title: "Decorative High-Pressure Laminates",
      desc: "Contemporary textures ranging from matte woodgrains to polished stone and metallic finishes engineered for daily wear scratch-resistance.",
      props: ["Scratch Resistant", "Vibrant Finishes", "Low Maintenance", "Heat Tolerant"],
      apps: "Countertops, Table Surfaces, Retail Displays, High-Traffic Wall Surfaces",
    },
    HYLAM: {
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      title: "Industrial & Structural Hylam Sheets",
      desc: "High-density phenolic laminates engineered for intense industrial wear, moisture exposure, electrical insulation, and heavy duty usage.",
      props: ["Wear Resistant", "Electrical Insulation", "High Impact Strength", "Moisture Sealed"],
      apps: "Industrial Workbenches, Electrical Panels, Partition Walls, Heavy Duty Cabinetry",
    },
  };

  const appData: Record<string, { title: string; desc: string; items: string[]; image: string }> = {
    RESIDENTIAL: {
      title: "Sophisticated Living Spaces",
      desc: "Transform kitchens, bedrooms, and lounges with moisture-proof PVC and rich natural veneer boards that endure daily home life.",
      items: ["Modular Kitchen Cabinetry", "Custom Wardrobes & Closets", "Acoustic & Decorative Wall Panels", "Bespoke Dining & Coffee Tables"],
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    },
    COMMERCIAL: {
      title: "High-Traffic Commercial Environments",
      desc: "Durable, easy-to-clean laminates and high-impact structural plywoods crafted for corporate offices, hotels, and retail showrooms.",
      items: ["Reception & Workstations", "Retail Storefronts & Displays", "Restaurant Booths & Bar Counters", "Hotel Room Paneling"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    },
    ARCHITECTURE: {
      title: "Architectural & Structural Elements",
      desc: "Calibrated engineered boards giving architects complete freedom for intricate ceiling partitions, louvers, and structural paneling.",
      items: ["Perforated Partition Screens", "Exterior Ceiling Louvers", "Structural Framing", "Architectural Millwork"],
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    },
    SIGNAGE: {
      title: "Outdoor & Indoor Brand Signage",
      desc: "Weatherproof PVC boards and smooth MDF panels providing precision routing surfaces for durable commercial signage.",
      items: ["Illuminated Brand Letters", "Exhibition Display Boards", "Wayfinding Directional Signs", "3D Routed Logos"],
      image: "https://images.unsplash.com/photo-1542744094-3a31b272c490?q=80&w=1200&auto=format&fit=crop",
    },
    INDUSTRIAL: {
      title: "Heavy-Duty Industrial Applications",
      desc: "Rugged Hylam sheets and industrial PVC formulations engineered to withstand chemical exposure, heavy loads, and moisture.",
      items: ["Factory Workbenches", "Electrical Distribution Boards", "Heavy Machinery Enclosures", "Chemical Resistant Tables"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    },
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1A1A1A] relative selection:bg-[#8C6D53] selection:text-white">
      {/* 26. STICKY NAVIGATION */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-nav-scrolled py-3 shadow-xl"
            : "glass-nav py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-extrabold text-2xl tracking-tighter uppercase font-serif">
              GRATIS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D53] group-hover:scale-150 transition-transform" />
          </a>

          <nav className="hidden lg:flex items-center space-x-1 bg-black/10 dark:bg-white/10 p-1.5 rounded-full border border-black/10 backdrop-blur-md relative">
            {[
              { label: "Overview", key: "all" },
              { label: "About", key: "about" },
              { label: "Leadership", key: "chairman" },
              { label: "Six Verticals", key: "verticals" },
              { label: "Products", key: "products" },
              { label: "Timeline", key: "timeline" },
              { label: "Contact", key: "contact" },
            ].map((item) => {
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveSection(item.key);
                    if (item.key !== "all") {
                      setTimeout(() => {
                        document.getElementById(item.key)?.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "text-[#171717]"
                      : isScrolled
                      ? "text-white/90 hover:text-white"
                      : "text-[#2B1D14] hover:text-[#593922]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#D4A373] rounded-full shadow-md z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>






          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#contact"
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                isScrolled
                  ? "bg-[#8C6D53] hover:bg-[#725740] text-white"
                  : "bg-[#171717] hover:bg-[#8C6D53] text-white"
              }`}
            >
              Enquire Now →
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isScrolled ? "text-white hover:bg-white/10" : "text-[#1A0E07] hover:bg-black/5"
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#171717]/95 backdrop-blur-2xl text-[#FBF9F5] pt-24 px-8 flex flex-col justify-between pb-12 lg:hidden overflow-y-auto"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A373]">NAVIGATE GROUP</span>
              {[
                { label: "Overview", key: "all" },
                { label: "About Group", key: "about" },
                { label: "Chairman's Message", key: "chairman" },
                { label: "Six Business Verticals", key: "verticals" },
                { label: "Product Portfolio", key: "products" },
                { label: "Group History Timeline", key: "timeline" },
                { label: "Contact Us", key: "contact" },
              ].map((item) => (

                <button
                  key={item.key}
                  onClick={() => {
                    setActiveSection(item.key);
                    setMobileMenuOpen(false);
                    if (item.key !== "all") {
                      setTimeout(() => {
                        document.getElementById(item.key)?.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`block w-full text-left text-lg font-serif tracking-tight py-2.5 px-4 rounded-xl transition-all ${
                    activeSection === item.key
                      ? "bg-[#D4A373] text-[#171717] font-bold shadow-md"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6 mt-6">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/50">Direct Trade Enquiry</p>
              <p className="text-xl font-serif text-[#D4A373]">+91 95440 48877</p>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-3.5 bg-[#8C6D53] hover:bg-[#725740] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg"
              >
                Enquire Now →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* LUXURY ARCHITECTURAL HERO SECTION */}
      <section className="relative w-full h-screen bg-[#140E0A] overflow-hidden select-none border-b border-black/10">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/hero-frames/ezgif-frame-204.jpg"
            alt="Gratis Luxury Interior Living Space"
            className="w-full h-full object-cover brightness-[0.92] contrast-[1.05]"
          />
        </div>

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none" />

        {/* Content Container */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12">
          {/* Top Subtle Subtitle */}
          <div className="pt-24 md:pt-28 max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4A373] bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#D4A373]/30 inline-block shadow-lg">
              ARCHITECTURAL INTERIOR SOLUTIONS
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-white font-medium leading-tight drop-shadow-2xl">
              Where Craftsmanship <br />
              <span className="italic text-[#D4A373]">Meets Modern Living</span>
            </h1>
            <p className="text-sm md:text-base text-white/80 font-light max-w-lg leading-relaxed drop-shadow">
              Experience our 100% waterproof PVC paneling, structural veneers, and customized cabinetry engineered for timeless homes.
            </p>
          </div>

          {/* Bottom Floating Buttons matching screenshot */}
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
      </section>

      {/* WEBSITE STARTS IMMEDIATELY AFTER HERO WITH 11.PNG BG INTEGRATION & HIGH CONTRAST TINT */}
      <div 
        className="w-full relative text-[#1A0E07]"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(251, 248, 242, 0.45), rgba(251, 248, 242, 0.45)), url('/11.png')",
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "top center"
        }}
      >





      {/* 1. TRUST / VALUE STRIP */}
      <section className="w-full py-16 bg-[#3B2416] text-[#FBF9F5] border-t border-b border-white/10 shadow-2xl relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: <Shield className="w-6 h-6 text-[#D4A373]" />,
              title: "DURABILITY",
              desc: "Built to last with unmatched strength.",
            },
            {
              icon: <Award className="w-6 h-6 text-[#D4A373]" />,
              title: "QUALITY",
              desc: "Top-grade materials with uncompromising standards.",
            },
            {
              icon: <Layers className="w-6 h-6 text-[#D4A373]" />,
              title: "STRENGTH",
              desc: "Waterproof, termite-proof and weather resistant.",
            },
            {
              icon: <Clock className="w-6 h-6 text-[#D4A373]" />,
              title: "SERVICE",
              desc: "Reliable support and timely delivery.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 p-4 border-l border-white/10 md:border-l md:first:border-l-0 pl-6"
            >
              <div>{item.icon}</div>
              <h4 className="text-sm font-semibold tracking-widest uppercase text-white/90">
                {item.title}
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* 2. CHAIRMAN'S MESSAGE SECTION — LEADERSHIP FIRST AFTER HERO */}
      {(activeSection === "all" || activeSection === "chairman") && (
      <section id="chairman" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-[#3B2416] text-[#FBF9F5] rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4A373]/30">
              <img
                src="/chairman-noorudheen.jpg"
                alt="Noorudheen T, Chairman of Gratis Group"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <h4 className="font-serif text-xl text-white font-medium">Noorudheen T</h4>
              <p className="text-xs uppercase tracking-widest text-[#D4A373] mt-1 font-mono">Chairman, Gratis Group</p>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4A373] bg-white/10 px-3.5 py-1.5 rounded-full inline-block">
              CHAIRMAN'S MESSAGE
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-white font-medium leading-tight">
              "Quo Vadis? Or Where Are You Going?"
            </h3>
            <div className="space-y-4 text-sm text-white/80 font-light leading-relaxed">
              <p>
                This question, often asked of myself, prompts reflection on our company's journey and our commitment to our customers. Are we doing enough to meet their needs and expectations? It is a question I return to often, because the moment a business stops asking it is the moment it stops growing.
              </p>
              <p>
                While we offer a diverse range of products and services, from plywood to hardware, we strive to provide cost-effective quality and timely delivery in every single transaction, large or small.
              </p>
              <p>
                To better serve our customers, we are implementing project-based inventory management, staying ahead of technological advancements, and empowering carpenters through training and support. At Gratis, our dedication is exceptional, and we are committed to going the extra mile.
              </p>
            </div>
            <div className="pt-2 text-sm font-serif italic text-[#D4A373]">
              — Noorudheen T, Chairman
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 3. ABOUT US - CORPORATE OVERVIEW */}
      {(activeSection === "all" || activeSection === "about") && (
      <section id="about" className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-black/10">
            <img
              src="/gratis-corporate.jpg"
              alt="Gratis Group Corporate Headquarters"
              className="w-full h-[540px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4A373]">ESTABLISHED 2000</span>
              <p className="font-serif text-lg font-medium">Gratis Group of Companies</p>
              <p className="text-xs text-white/70 font-light">Founded by Noorudheen T • Kerala, India & UAE</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-[#8C6D53] bg-[#8C6D53]/10 px-4 py-1.5 rounded-full inline-block">
              ABOUT GRATIS GROUP
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight text-[#2B1D14]">
              Six Verticals. <br />
              <span className="italic font-normal text-[#8C6D53]">One Commitment.</span>
            </h2>
            <div className="space-y-4 text-[#1C1510] leading-relaxed bg-white/85 p-8 rounded-3xl backdrop-blur-md border border-[#593922]/10 shadow-lg">
              <p className="text-base font-normal">
                Gratis Group of Companies was founded in the year 2000 by Noorudheen T, built on a simple but demanding conviction: that Kerala's builders, contractors, carpenters, and homeowners deserved a dependable, quality-first source for plywood, panel products, and hardware.
              </p>
              <p className="text-sm font-light text-gray-700">
                What began as a single, organized wholesale trading operation has grown over more than two decades into a diversified conglomerate spanning manufacturing, wholesale distribution, organized retail, interior design and execution, management consulting, and international trade across Kerala, Karnataka, Tamil Nadu, and the UAE.
              </p>
              <div className="text-xs text-[#593922] font-serif italic border-l-2 border-[#8C6D53] pl-4 py-1.5 bg-[#8C6D53]/5 rounded-r-xl">
                "Gratis also carries forward a manufacturing legacy that predates the group itself. Cochin Veneers, established in 1948, joined Gratis in 2023 — bringing 75 years of hands-on craftsmanship into the fold."
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Redesign */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="relative group rounded-3xl p-8 md:p-12 bg-white/95 backdrop-blur-xl border border-[#593922]/15 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8C6D53]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D53] font-semibold bg-[#8C6D53]/10 px-3.5 py-1 rounded-full">
                  PURPOSE & DRIVE
                </span>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#593922] to-[#3B2416] text-[#FBF9F5] flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                  M
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-serif font-medium text-[#2B1D14] tracking-tight">Our Mission</h3>
                <p className="text-sm font-mono text-[#8C6D53] mt-1">EMPOWERING CRAFTSMANSHIP</p>
              </div>
              <p className="text-base text-gray-800 font-light leading-relaxed">
                To empower creativity through innovative, high-quality materials that inspire exceptional craftsmanship — giving every builder, contractor, and homeowner we serve the confidence that what they build will last.
              </p>
            </div>
            <div className="pt-6 border-t border-black/5 flex items-center gap-2 text-xs font-semibold text-[#593922]">
              <span>Quality Assurance & Durability</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C6D53]" />
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative group rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[#1C130D] via-[#2B1D14] to-[#3B2416] text-[#FBF9F5] shadow-2xl border border-white/10 overflow-hidden flex flex-col justify-between">
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#D4A373]/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D4A373] font-semibold bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
                  FUTURE DIRECTION
                </span>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4A373] to-[#8C6D53] text-[#171717] flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                  V
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-serif font-medium text-white tracking-tight">Our Vision</h3>
                <p className="text-sm font-mono text-[#D4A373] mt-1">TRANSFORMATIVE INNOVATION</p>
              </div>
              <p className="text-base text-white/85 font-light leading-relaxed">
                To be the leading brand synonymous with transformative innovation, redefining design, and elevating craftsmanship in every space we touch, across every market we enter.
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#D4A373]">
              <span>Elevating Spaces Across Markets</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
            </div>
          </div>
        </div>


        {/* Quality, Innovation, Commitment Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-[#8C6D53]">CORE PHILOSOPHY</span>
            <h3 className="text-3xl md:text-4xl font-serif font-medium text-[#2B1D14]">What Guides Us</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                desc: "Quality at Gratis is enforced through strict supplier selection, manufacturing oversight at Cochin Veneers & Astrafort, and consistent standards across every Woodmall outlet and B2B division.",
              },
              {
                title: "Innovation",
                desc: "We treat innovation as an operating habit — from project-based inventory management systems to complete interior design and execution capabilities built through G-Space Interio.",
              },
              {
                title: "Commitment",
                desc: "Decades of dedication have earned us the trust of over 500 clients across South India & UAE, fostering relationships that now span generations.",
              },
            ].map((pillar, i) => (
              <div key={i} className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-[#593922]/10 shadow-md space-y-3 hover:shadow-xl transition-all hover:-translate-y-1">
                <span className="text-xs font-mono text-[#8C6D53] font-bold tracking-wider">0{i + 1} / PILLAR</span>
                <h4 className="text-xl font-serif font-medium text-[#2B1D14]">{pillar.title}</h4>
                <p className="text-xs text-gray-700 leading-relaxed font-light">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}


      {/* SIX BUSINESS VERTICALS & WOODMALL FLAGSHIP SECTION */}
      {activeSection === "verticals" && (
      <section id="verticals" className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-20">

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#8C6D53]">
            CONGLOMERATE STRUCTURE
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2B1D14]">
            Six Verticals, One Group.
          </h2>
          <p className="text-sm text-gray-700 font-light leading-relaxed">
            Gratis Group of Companies operates across six connected business verticals — each carried by a dedicated entity.
          </p>
        </div>

        {/* FLAGSHIP FEATURE: WOODMALL RETAIL */}
        <div id="woodmall" className="bg-gradient-to-br from-[#171717] via-[#261B14] to-[#3B2416] text-[#FBF9F5] rounded-3xl p-8 md:p-14 shadow-2xl space-y-12 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8C6D53] text-white text-xs font-mono tracking-widest uppercase">
                ★ FLAGSHIP VERTICAL
              </div>
              <h3 className="text-3xl md:text-5xl font-serif text-white font-medium">
                Woodmall — <br />
                <span className="text-[#D4A373] italic">Every Interior Product Under One Roof</span>
              </h3>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                Woodmall is where Gratis meets the customer directly. Opened in 2014, it turned wholesale trading expertise into an organized retail format — one place for plywood, MDF, laminates, PVC boards, hardware, and locks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-xs font-mono uppercase text-[#D4A373] font-bold">7 LIVE KERALA OUTLETS</h4>
                <ul className="text-xs text-white/80 space-y-1 font-light">
                  <li>• Pilathara, Kannur</li>
                  <li>• Calicut</li>
                  <li>• Puthanathani, Malappuram</li>
                  <li>• Manjeri, Malappuram</li>
                  <li>• Malappuram</li>
                  <li>• Edapally, Ernakulam</li>
                  <li>• Kalamassery, Ernakulam</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
                <h4 className="text-xs font-mono uppercase text-[#D4A373] font-bold">EXPANSION PIPELINE</h4>
                <ul className="text-xs text-white/80 space-y-1 font-light">
                  <li>• Trivandrum</li>
                  <li>• Kottayam</li>
                  <li>• Trichur</li>
                  <li>• Perinthalmanna</li>
                  <li>• Kannur</li>
                  <li>• Nadapuram</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER BUSINESS VERTICAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              v: "01. MANUFACTURING",
              entity: "Cochin Veneers LLP & Astrafort Panel Products LLP",
              desc: "Cochin Veneers (established 1948, joined Gratis 2023) brings 75 years of manufacturing craftsmanship alongside Astrafort Panel Products LLP.",
            },
            {
              v: "02. INTERIOR SOLUTIONS",
              entity: "G-Space Interio Pvt Ltd",
              desc: "Delivers stylish, functional interior design and execution across Kerala, completing the journey from raw material to finished living space.",
            },
            {
              v: "03. TRADING & RETAIL",
              entity: "Gratis Panel Products Pvt Ltd",
              desc: "Holding company for Woodmall retail outlets, Mica Trade Lines (Gratis Laminates), and exclusive B2B wholesale divisions in Kalamassery & Pilathara.",
            },
            {
              v: "04. STATE EXPANSION",
              entity: "Sanear Exim Intl. (Karnataka) & Gratis Industries (Tamil Nadu)",
              desc: "Extending the group's proven operating model beyond Kerala into key South Indian growth markets.",
            },
            {
              v: "05. MANAGEMENT CONSULTING",
              entity: "GGC Alliance (Cochin)",
              desc: "Management consulting arm providing digital marketing, auditing, HR, and operational support across all group entities.",
            },
            {
              v: "06. INTERNATIONAL DIVISION",
              entity: "Gratis Building & Construction LLC (Dubai & Ajman, UAE)",
              desc: "Established in 2018, operating wholesale and retail trading desks across Dubai and Ajman in the United Arab Emirates.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-black/5 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#8C6D53] uppercase">{item.v}</span>
                <h4 className="font-serif font-semibold text-lg text-[#2B1D14]">{item.entity}</h4>
                <p className="text-xs text-gray-700 leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* 3. PRODUCT RANGE */}
      {(activeSection === "all" || activeSection === "products") && (
      <section id="products" className="py-24 plywood-texture-subtle border-t border-b border-black/5">





        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#593922]">
              OUR PRODUCT RANGE
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#2B1D14]">
              Everything You Need. <br />
              <span className="italic font-normal text-[#6E5B4B]">All in One Place.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "PVC FOAM BOARDS",
                sub: "Lightweight. Durable. Versatile.",
                img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
                link: "#pvc-boards",
              },
              {
                title: "PLYWOODS",
                sub: "Strong. Reliable. Built for demanding applications.",
                img: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=1000&auto=format&fit=crop",
                link: "#plywood",
              },
              {
                title: "OTHER PRODUCTS",
                sub: "Veneer, MDF, Laminates & Hylam Sheets.",
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
                link: "#other-products",
              },
            ].map((card, idx) => (
              <a
                key={idx}
                href={card.link}
                className="group relative h-[480px] rounded-2xl overflow-hidden shadow-xl block border border-[#3A2312]/10"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1D14]/90 via-[#2B1D14]/40 to-transparent transition-opacity group-hover:opacity-95" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white space-y-2 transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-serif font-medium text-[#FBF9F5]">{card.title}</h3>
                    <div className="p-2.5 rounded-full bg-white/10 group-hover:bg-[#593922] transition-colors">
                      <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
                    </div>
                  </div>
                  <p className="text-sm text-white/80 font-light leading-relaxed">{card.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      )}


      {/* 4. PVC FOAM BOARDS SECTION */}

      <section id="pvc-boards" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#8C6D53] uppercase">
              01 / PVC FOAM BOARDS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold leading-tight text-[#1A0E07]">
              Lightweight. <br />
              Strong. <br />
              <span className="italic font-[#3B2416] text-[#3B2416] bg-white/60 px-3 py-0.5 rounded-lg border border-black/5 shadow-sm inline-block mt-1">Built to Perform.</span>
            </h2>
          </div>
        </div>



        {/* Interactive Horizontal Product Gallery */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-400">
            PVC PRODUCTS LINEUP
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "GRATIS Standard",
                desc: "Everyday versatile PVC foam board for interior signs and display partitions.",
                img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "GRATIS HD",
                desc: "High-density formulation engineered for CNC router detailing and kitchen carcasses.",
                img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "GRATIS Xtra D",
                desc: "Extra structural rigidity for high-load wall cladding and commercial paneling.",
                img: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "GRATIS SuperD",
                desc: "Maximum density heavy-duty PVC board engineered for harsh industrial environments.",
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
              },
            ].map((prod, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm border border-black/5 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="h-44 rounded-lg overflow-hidden bg-gray-100">
                    <img src={prod.img} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-lg">{prod.name}</h4>
                    <p className="text-xs text-gray-500 font-light mt-1">{prod.desc}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <a
                    href="#contact"
                    className="w-full text-center block py-2 rounded-lg border border-black/10 text-xs font-semibold hover:bg-[#171717] hover:text-white transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. PVC MATERIAL PROPERTIES */}
      <section className="py-20 bg-[#171717] text-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-12">
            <h2 className="text-3xl md:text-4xl font-serif">
              Engineered For <br />
              <span className="italic text-[#8C6D53]">Real-World Performance.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { title: "LIGHTWEIGHT", desc: "50–60% lighter than solid PVC sheets." },
              { title: "RIGID", desc: "Strong structural performance under load." },
              { title: "MOISTURE RESISTANT", desc: "Suitable for humid Kerala environments." },
              { title: "INSULATING", desc: "Useful thermal & acoustic insulation characteristics." },
              { title: "VERSATILE", desc: "Suitable for commercial and industrial applications." },
            ].map((prop, idx) => (
              <div
                key={idx}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#8C6D53] transition-colors"
              >
                <span className="text-xs font-mono text-[#8C6D53]">0{idx + 1}</span>
                <h4 className="font-semibold text-sm uppercase tracking-wider my-2">{prop.title}</h4>
                <p className="text-xs text-white/60 font-light leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PVC APPLICATIONS */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-serif">
            Made For More <br />
            <span className="italic text-gray-500">Than One Purpose.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Signage",
              img: "https://images.unsplash.com/photo-1542744094-3a31b272c490?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Display Panels",
              img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Interior Décor",
              img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Wall Cladding",
              img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Kitchen Applications",
              img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Construction",
              img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Commercial Spaces",
              img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
            },
            {
              title: "Industrial Applications",
              img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
            },
          ].map((app, i) => (
            <div
              key={i}
              className="relative h-48 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-black/5"
            >
              <img
                src={app.img}
                alt={app.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                <span className="text-xs font-mono text-[#8C6D53] bg-black/40 px-2.5 py-1 rounded-md w-max backdrop-blur-sm">
                  #{i + 1}
                </span>
                <p className="font-serif font-medium text-lg text-white group-hover:translate-x-1 transition-transform">
                  {app.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 7, 8, 9. PLYWOOD SECTION */}
      <section id="plywood" className="py-24 plywood-texture-subtle border-t border-b border-black/5">


        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest text-[#8C6D53] uppercase">
                02 / PLYWOOD
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-medium">
                Strength Meets <br />
                <span className="italic font-normal text-[#8C6D53]">Craftsmanship.</span>
              </h2>
              <p className="text-sm text-gray-900 font-semibold leading-relaxed bg-white/70 p-3 rounded-lg backdrop-blur-sm border border-black/5 shadow-sm">
                Kerala's plywood manufacturing sector combines traditional craftsmanship with modern technology to create products focused on durability, finish and diverse project requirements.
              </p>

            </div>
            <div className="h-80 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=1200&auto=format&fit=crop"
                alt="Plywood Layers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 8. PLYWOOD PRODUCT RANGE CARDS */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-6">
              PLYWOOD PRODUCT RANGE
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: "GRATIS CLUB", desc: "Flagship structural plywood engineered for high-end heavy load architectural works." },
                { name: "GRATIS PLATINUM", desc: "Boiling water resistant marine grade plywood built for kitchens & bathrooms." },
                { name: "GRATIS TRUST", desc: "Reliable commercial grade plywood ideal for residential wardrobes & shelving." },
                { name: "GRATIS RED PREMIUM", desc: "Calibrated hardwood core plywood offering flat smooth surfaces for laminating." },
                { name: "GRATIS G PLUS", desc: "Cost-effective versatile plywood solution for internal furniture framing." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-black/5 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase bg-[#8C6D53]/10 text-[#8C6D53] px-2 py-0.5 rounded">
                      GRADE 0{idx + 1}
                    </span>
                    <h4 className="font-serif font-semibold text-lg">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                  <a
                    href="#contact"
                    className="text-xs font-semibold text-[#8C6D53] hover:underline flex items-center gap-1"
                  >
                    View Details →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 9. PLYWOOD QUALITY SECTION */}
          <div className="bg-white p-6 md:p-12 rounded-2xl border border-black/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-3xl font-serif">
                Built Around <br />
                <span className="italic text-[#8C6D53]">Quality & Reliability.</span>
              </h3>
              <ul className="space-y-3 text-xs text-gray-600 font-light">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#8C6D53] shrink-0" /> Rigorous quality control at every processing stage
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#8C6D53] shrink-0" /> Modern precision calibration technology
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#8C6D53] shrink-0" /> Sustainable practices & responsible timber sourcing
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-[#8C6D53] shrink-0" /> Dedicated customer service & technical assistance
                </li>
              </ul>
            </div>
            <div className="h-64 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop"
                alt="Quality Plywood"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY — GROUP HISTORY TIMELINE SECTION */}
      {(activeSection === "all" || activeSection === "timeline") && (
      <section id="timeline" className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#8C6D53]">OUR STORY & MILESTONES</span>
          <h2 className="text-4xl font-serif font-medium text-[#2B1D14]">A Legacy Built One Vertical At A Time</h2>
          <p className="text-xs text-gray-600 font-light">From a 1948 manufacturing root to a multi-state conglomerate spanning South India & UAE.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              year: "1948",
              title: "Manufacturing Legacy Begins",
              desc: "Cochin Veneers is established as an independent plywood & veneer manufacturer in Kerala.",
            },
            {
              year: "2000",
              title: "Gratis Group Founded",
              desc: "Noorudheen T founds Gratis, organizing wholesale trading relationships into a quality-first B2B operation.",
            },
            {
              year: "2014",
              title: "Woodmall Retail Launches",
              desc: "Opened first organized retail format: every interior product under one roof.",
            },
            {
              year: "2018",
              title: "UAE International Operations",
              desc: "Established international trading desks in Dubai and Ajman, United Arab Emirates.",
            },
            {
              year: "2023",
              title: "Cochin Veneers Joins; G-Space Opens",
              desc: "Cochin Veneers & Astrafort join Gratis; G-Space Interio completes raw-material to finished interior loop.",
            },
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-3 relative hover:shadow-md transition-shadow">
              <span className="text-2xl font-serif font-bold text-[#8C6D53]">{t.year}</span>
              <h4 className="text-sm font-serif font-semibold text-[#2B1D14] leading-snug">{t.title}</h4>
              <p className="text-xs text-gray-600 font-light leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>
      )}


      {/* 12 & 13. UNIQUE GRATIS EXPERIENCE & SUPPLY CHAIN */}
      <section className="py-16 md:py-24 bg-[#F4F0E8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#8C6D53]">
              THE UNIQUE GRATIS EXPERIENCE
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2">
              Six Pillars of <span className="italic text-gray-500">Excellence.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                { title: "CUSTOMER FIRST", desc: "The customer experience is as important as product quality." },
                { title: "COST ECONOMY", desc: "Competitive pricing through a multi-point cost economy approach." },
                { title: "QUALITY ASSURANCE", desc: "Strict quality assurance checks performed at every stage." },
                { title: "PROTECTED STORAGE", desc: "Proper warehouse storage protects products from environmental damage." },
                { title: "EFFICIENT EXECUTION", desc: "Efficient project execution without unnecessary delays or cost overruns." },
                { title: "TIMELY DELIVERY", desc: "Efficient distribution and delivery network across Kerala." },
              ].map((stage, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-black/5 shadow-sm space-y-2">
                  <span className="text-xs font-mono text-[#8C6D53]">STAGE 0{i + 1}</span>
                  <h4 className="font-serif font-medium text-lg">{stage.title}</h4>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 13. SUPPLY CHAIN JOURNEY TIMELINE */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-500">
              SUPPLY CHAIN JOURNEY
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { step: "SOURCE", desc: "Ethical timber & top resin sourcing" },
                { step: "QUALITY CHECK", desc: "Defect inspection & density test" },
                { step: "WAREHOUSE", desc: "Climate-controlled protection" },
                { step: "DISTRIBUTION", desc: "Timely dispatch across Kerala" },
                { step: "PROJECT", desc: "Flawless site delivery" },
              ].map((j, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-lg border border-black/5 text-center space-y-2 relative"
                >
                  <span className="w-6 h-6 rounded-full bg-[#8C6D53] text-white text-[10px] font-bold inline-flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h5 className="font-semibold text-xs uppercase tracking-wider">{j.step}</h5>
                  <p className="text-[11px] text-gray-500 font-light">{j.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 14, 15, 16, 17, 18. OTHER PRODUCTS (Veneer, MDF, Laminates, Hylam) */}
      <section id="other-products" className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        <div className="space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#8C6D53] uppercase">
            03 / OTHER PRODUCTS
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium">
            Beyond <span className="italic text-[#8C6D53]">Plywood.</span>
          </h2>
        </div>

        {/* 15. VENEER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 rounded-2xl border border-black/5 shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase text-[#8C6D53] tracking-widest">VENEER</span>
            <h3 className="text-3xl font-serif">Natural. Warm. Timeless.</h3>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              Veneer sheets are made from real wood and provide a natural, elegant appearance suitable for modern and traditional interiors.
            </p>
            <div className="flex gap-2 text-xs font-mono text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded">Walls</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Furniture</span>
              <span className="bg-gray-100 px-3 py-1 rounded">Interior Surfaces</span>
            </div>
          </div>
          <div className="h-64 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
              alt="Veneer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 16. MDF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#171717] text-[#FBF9F5] p-8 md:p-12 rounded-2xl">
          <div className="h-64 rounded-xl overflow-hidden order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop"
              alt="MDF Board"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 order-1 md:order-2">
            <span className="text-xs font-bold uppercase text-[#8C6D53] tracking-widest">MDF</span>
            <h3 className="text-3xl font-serif">Smooth By Nature. Versatile By Design.</h3>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Smooth and versatile material for furniture, cabinetry and paneling. Offers uniform density, termite proofing, and easy gluing/laminating capabilities.
            </p>
          </div>
        </div>

        {/* 17 & 18. LAMINATES & HYLAM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase text-[#8C6D53] tracking-widest">LAMINATES</span>
            <h3 className="text-2xl font-serif">Surface. Character. Finish.</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Decorative surfaces featuring modern wood finishes, stone finishes, contemporary designs, and classic laminates engineered for wear-resistance.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-4">
            <span className="text-xs font-bold uppercase text-[#8C6D53] tracking-widest">HYLAM SHEETS</span>
            <h3 className="text-2xl font-serif">Built For Everyday Strength.</h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Hylam sheets are suitable for industrial and residential applications because of their extreme structural strength and resistance to wear and tear.
            </p>
          </div>
        </div>
      </section>



      {/* 23. FINAL CTA */}
      <section className="py-20 bg-[#171717] text-[#FBF9F5]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif">
            Let's Build <br />
            <span className="italic text-[#8C6D53]">Something Better.</span>
          </h2>
          <p className="text-sm text-white/60 font-light max-w-md mx-auto">
            Looking for the right material for your next project? Get in touch with our team in Ernakulam today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-3.5 bg-[#8C6D53] text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#725740] transition-colors"
            >
              Talk to GRATIS →
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 bg-white/10 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors"
            >
              Request an Enquiry →
            </a>
          </div>
          <div className="pt-4 text-xs font-mono text-white/50">
            DIRECT PHONE: <span className="text-white font-semibold">+91 95440 48877</span>
          </div>
        </div>
      </section>

      {/* 24. CONTACT & ENQUIRY FORM */}
      {(activeSection === "all" || activeSection === "contact") && (
      <section id="contact" className="py-24 max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#8C6D53]">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl font-serif mt-1">
                Have A Project In Mind?
              </h2>
            </div>

            <div className="space-y-4 text-sm font-light text-gray-700">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#8C6D53] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-xs text-gray-400 uppercase">Phone & WhatsApp</p>
                  <p className="text-base font-mono text-gray-900">+91 95440 48877</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#8C6D53] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-xs text-gray-400 uppercase">Email</p>
                  <p className="text-base font-mono text-gray-900">info@gratisindia.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#8C6D53] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-xs text-gray-400 uppercase">Address</p>
                  <p className="text-sm leading-relaxed">
                    Near Cusat Bus Stop, Seaport-Airport Road, <br />
                    HMT Colony P.O, Kalamassery, <br />
                    Ernakulam, Kerala 683503
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919544048877"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider hover:bg-emerald-800 transition-colors"
            >
              WhatsApp Us →
            </a>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-md">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check size={24} />
                </div>
                <h3 className="text-2xl font-serif">Thank You!</h3>
                <p className="text-xs text-gray-500 font-light">
                  Your enquiry has been received. The GRATIS team will contact you shortly.
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
                <h3 className="text-xl font-serif mb-4">Send An Enquiry</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Name</label>
                    <input required type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-[#8C6D53]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Company</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-[#8C6D53]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Phone</label>
                    <input required type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-[#8C6D53]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Email</label>
                    <input required type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-[#8C6D53]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Product Requirement</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-[#8C6D53]">
                    <option>PVC Foam Boards</option>
                    <option>Plywood</option>
                    <option>MDF</option>
                    <option>Veneer</option>
                    <option>Laminates</option>
                    <option>Hylam Sheets</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Message / Quantity</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-[#8C6D53]" />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#171717] text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#8C6D53] transition-colors"
                >
                  Send Enquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      )}

      {/* 25. FOOTER */}


      <footer className="bg-[#171717] text-[#FBF9F5] pt-16 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <span className="font-extrabold text-2xl tracking-tighter uppercase font-serif block">
              GRATIS
            </span>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Your trusted partner for premium PVC Foam Boards, Plywood, MDF, Laminates, Veneer & Hylam Sheets.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-widest text-[#8C6D53] mb-4">PRODUCTS</h5>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#pvc-boards" className="hover:text-white">PVC Foam Boards</a></li>
              <li><a href="#plywood" className="hover:text-white">Plywood</a></li>
              <li><a href="#other-products" className="hover:text-white">MDF</a></li>
              <li><a href="#other-products" className="hover:text-white">Veneer</a></li>
              <li><a href="#other-products" className="hover:text-white">Laminates</a></li>
              <li><a href="#other-products" className="hover:text-white">Hylam Sheets</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-widest text-[#8C6D53] mb-4">COMPANY</h5>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              <li><a href="#about" className="hover:text-white">Why Choose Us</a></li>
              <li><a href="#products" className="hover:text-white">Products</a></li>
              <li><a href="#applications" className="hover:text-white">Applications</a></li>
              <li><a href="#blog" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-widest text-[#8C6D53] mb-4">CONTACT</h5>
            <div className="space-y-2 text-xs text-white/70">
              <p>+91 95440 48877</p>
              <p>info@gratisindia.com</p>
              <p className="text-white/40 leading-relaxed mt-2">
                Near Cusat Bus Stop, Seaport-Airport Road, Kalamassery, Ernakulam, Kerala 683503
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/40 font-mono">
          <p>© {new Date().getFullYear()} GRATIS India. All rights reserved.</p>
          <p>Kerala • Ernakulam • Material Excellence</p>
        </div>
      </footer>
      </div>

      <a
        href="tel:+919544048877"
        aria-label="Call GRATIS India"
        title="Call GRATIS India: +91 95440 48877"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#8C6D53] hover:bg-[#725740] text-white rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 border border-white/20"
      >
        <Phone className="w-6 h-6 shrink-0" />
      </a>
    </div>
  );
}









