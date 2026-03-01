import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Banknote,
  Clock,
  Box,
  Search,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import SectionHeading from "./SectionHeading";

const StructuralPanel = ({
  title,
  icon: Icon,
  index,
  description,
  metric,
  image,
  fallbackImage,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  index: number;
  description: string;
  metric: string;
  image: string;
  fallbackImage: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const panelRef = useRef(null);

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col md:flex-row items-center gap-12 py-16 border-b border-slate-200 cursor-none"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="hidden lg:block fixed pointer-events-none z-[100] mix-blend-difference"
            style={{
              left: "var(--mouse-x)",
              top: "var(--mouse-y)",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-32 h-32 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <Search size={12} className="text-white mb-1" />
                <div className="text-[8px] font-mono text-white uppercase tracking-widest">
                  Detail Scan
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-amber-600 text-xs font-bold tabular-nums">
            0{index + 1}
          </span>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950 group-hover:text-amber-600 transition-colors duration-500">
            {title}
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start overflow-hidden">
          <motion.p
            initial={{ opacity: 0.6 }}
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            className="max-w-sm text-slate-600 text-sm leading-relaxed"
          >
            {description}
          </motion.p>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              What This Means For You
            </span>
            <span className="text-2xl font-black text-slate-950 uppercase">
              {metric}
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-full md:w-80 aspect-[4/3] md:aspect-square flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-100 rounded-3xl rotate-2 group-hover:rotate-6 transition-transform duration-700" />
        <div className="absolute inset-0 bg-white border border-slate-200 rounded-3xl group-hover:-rotate-2 transition-transform duration-700 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-2xl">
          <div className="absolute inset-0">
            <Image
              width={320}
              height={240}
              src={image}
              className={`w-full h-full object-cover transition-all duration-1000 ${isHovered ? "scale-110 grayscale-0" : "scale-100 grayscale brightness-75 opacity-80"}`}
              alt={title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-amber-500/60 z-10 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
          />

          <div className="absolute bottom-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500 z-20">
            <Icon size={24} className="text-slate-950" />
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-6 left-6 font-mono text-[8px] text-white leading-tight uppercase tracking-wider z-20"
              >
                {"Premium materials only"}
                <br />
                {"Site inspected and tested"}
                <br />
                {"Built to local code"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const containerRef = useRef(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const root = document.documentElement;
    root.style.setProperty("--mouse-x", `${clientX}px`);
    root.style.setProperty("--mouse-y", `${clientY}px`);
  };

  const values = [
    {
      title: "Seismic Safety",
      description:
        "Homes and buildings engineered with modern structural standards so your investment is protected for decades, not just years.",
      metric: "Earthquake‑Ready Design",
      icon: ShieldCheck,
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1200",
      fallbackImage:
        "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Clear Budgeting",
      description:
        "Transparent pricing with detailed breakdowns, so you always know where your money is going and what comes next.",
      metric: "No Hidden Costs",
      icon: Banknote,
      image:
        "https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&q=80&w=800",
      fallbackImage:
        "https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "On‑Time Delivery",
      description:
        "Experienced project managers, vetted trade partners, and realistic schedules that keep your move‑in date on track.",
      metric: "98% On‑Time Handover",
      icon: Clock,
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200",
      fallbackImage:
        "https://images.unsplash.com/photo-1517089535819-3575997f3248?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Bespoke Design",
      description:
        "From first sketch to final finishes, our team works with you to design spaces that reflect how you live every day.",
      metric: "Design‑First Approach",
      icon: Box,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      fallbackImage:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="why-choose-us"
      className="py-40 bg-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <SectionHeading
              subtitle="Why Homeowners Choose Us"
              title={
                <>
                  Built On
                  <br />
                  Trust.
                </>
              }
            />
          </div>
          <div className="md:w-1/3 text-slate-500 font-mono text-[10px] leading-loose uppercase tracking-[0.2em] pt-4">
            Licensed, insured, and dedicated to clear communication from your
            first call to your final walkthrough.
          </div>
        </div>

        <div className="relative">
          {values.map((val, idx) => (
            <StructuralPanel
              key={idx}
              index={idx}
              subtitle={val.title}
              title={val.title}
              description={val.description}
              metric={val.metric}
              icon={val.icon}
              image={val.image}
              fallbackImage={val.fallbackImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
